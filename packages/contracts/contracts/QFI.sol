// SPDX-License-Identifier: MIT
pragma experimental ABIEncoderV2;
pragma solidity ^0.7.2;

import {MACI} from "maci-contracts/contracts/MACI.sol";
import {Params} from "maci-contracts/contracts/Params.sol";

import {PollFactory, Poll, PollProcessorAndTallyer, MessageAqFactory} from "maci-contracts/contracts/Poll.sol";
import {VkRegistry} from "maci-contracts/contracts/VkRegistry.sol";
import {InitialVoiceCreditProxy} from "maci-contracts/contracts/initialVoiceCreditProxy/InitialVoiceCreditProxy.sol";
import {SignUpGatekeeper} from "maci-contracts/contracts/gatekeepers/SignUpGatekeeper.sol";
import {ConstantInitialVoiceCreditProxy} from "maci-contracts/contracts/initialVoiceCreditProxy/ConstantInitialVoiceCreditProxy.sol";
import {FreeForAllGatekeeper} from "maci-contracts/contracts/gatekeepers/FreeForAllSignUpGatekeeper.sol";

import "@openzeppelin/contracts/token/ERC20/ERC20.sol";
import "@openzeppelin/contracts/token/ERC20/SafeERC20.sol";

import {GrantRound} from "./GrantRound.sol";
import {FundsManager} from "./FundsManager.sol";
import {GrantRoundFactory} from "./GrantRoundFactory.sol";

/**
 * @title Quadratic Funding Infrastructure
 * @author Q
 * @notice  Top level contract for the Quadratic Funding Infrastructure
 * @dev Special type of MACI that allows for a quadratic funding scheme.
 */
contract QFI is MACI, FundsManager {
    using SafeERC20 for ERC20;
    enum Stage {
        // The contract is not yet initialized
        NOT_INITIALIZED,
        // The current poll/grant round is NOT started and MACI is waiting for SignUp/Topups from contributions
        WAITING_FOR_SIGNUPS_AND_TOPUPS,
        // The current poll/grant round is started, voice credit balances are locked, can submit messages to current poll
        VOTING_PERIOD_OPEN,
        // The current poll/grant round is over, cannot submit messages to current poll, but votes have not been tallied yet
        WAITING_FOR_FINALIZATION,
        // The current poll/grant round is over, and votes have been tallied, and matching funds have been distributed to grant contract
        FINALIZED,
        // The current poll/grant round is cancelled, and contributions can be withdrawn
        CANCELLED
    }

    Stage public currentStage;
    // Constants
    uint256 private constant MAX_VOICE_CREDITS = 10**9; // MACI allows 2 ** 32 voice credits max
    uint256 private constant MAX_CONTRIBUTION_AMOUNT = 10**4; // In tokens

    // State
    uint256 public voiceCreditFactor;

    struct ContributorStatus {
        uint256 voiceCredits;
        bool isRegistered;
    }

    MessageAqFactory public messageAqFactoryGrants;
    GrantRoundFactory public grantRoundFactory;
    GrantRound public currentGrantRound;
    PollProcessorAndTallyer public pollProcessorAndTallyer;

    uint256 public nextGrantRoundId;
    uint256 public contributorCount;
    ERC20 public nativeToken;

    // A mapping of grantRound IDs to GrantRound contracts.
    mapping(uint256 => GrantRound) public grantRounds;
    mapping(address => ContributorStatus) private contributors;

    /**
     * @notice Constructor for the Quadratic Funding Infrastructure
     * @dev Binds the contracts that are needed for the Quadratic Funding Infrastructure
     * @param _grantRoundFactory GrantRoundFactory, the contract that will be used to create GrantRounds which are a special type of Poll
     * @param _pollFactory PollFactory, the contract that will be used to create Polls
     * @param _signUpGatekeeper SignUpGatekeeper, the contract that will be used to limit who can sign up to MACI
     * @param _initialVoiceCreditProxy InitialVoiceCreditProxy, the contract that will be used to set the initial voice credit balance for a user
     */
    constructor(
        ERC20 _nativeToken,
        GrantRoundFactory _grantRoundFactory,
        PollFactory _pollFactory,
        SignUpGatekeeper _signUpGatekeeper,
        InitialVoiceCreditProxy _initialVoiceCreditProxy
    ) MACI(_pollFactory, _signUpGatekeeper, _initialVoiceCreditProxy) {
        grantRoundFactory = _grantRoundFactory;
        currentStage = Stage.NOT_INITIALIZED;
        nativeToken = _nativeToken;
        voiceCreditFactor =
            (MAX_CONTRIBUTION_AMOUNT * uint256(10)**nativeToken.decimals()) /
            MAX_VOICE_CREDITS;
        voiceCreditFactor = voiceCreditFactor > 0 ? voiceCreditFactor : 1;
    }

    /*
     * Initialise the various factory/helper contracts. This should only be run
     * once and it must be run before deploying the first Poll.
     */
    function initialize(
        VkRegistry _vkRegistry,
        MessageAqFactory _messageAqFactoryPolls,
        MessageAqFactory _messageAqFactoryGrantRounds
    ) public onlyOwner {
        // The VkRegistry owner must be the owner of this contract, this is checked in the init function
        init(_vkRegistry, _messageAqFactoryPolls);

        messageAqFactoryGrants = _messageAqFactoryGrantRounds;

        require(
            grantRoundFactory.owner() == address(this),
            "MACI: GrantFactory owner incorrectly set"
        );

        // The PollFactory needs to store the MessageAqFactory address
        grantRoundFactory.setMessageAqFactory(_messageAqFactoryGrantRounds);

        // The MessageAQFactory owner must be the PollFactory contract
        require(
            messageAqFactoryGrants.owner() == address(grantRoundFactory),
            "MACI: MessageAqFactory owner incorrectly set"
        );
        currentStage = Stage.WAITING_FOR_SIGNUPS_AND_TOPUPS;
        // emit InitGrantsMessageAQ(_vkRegistry, _messageAqFactory);
    }

    /**
     * @notice Sets the PollProcessorAndTallyer to use for the grant round
     * @dev public function,
     * @param _pollProcessorAndTallyer PollProcessorAndTallyer stored in memory
     */
    function setPollProcessorAndTallyer(
        PollProcessorAndTallyer _pollProcessorAndTallyer
    ) public onlyOwner {
        pollProcessorAndTallyer = _pollProcessorAndTallyer;
    }

    /**
     * @notice Contribute tokens to this funding round.
     * @dev public function, allows a user to contribute to this funding round by sending tokens in exchange for voice credits.
     * @param pubKey Contributor's public key.
     * @param amount Contribution amount.
     */
    function contribute(PubKey calldata pubKey, uint256 amount) external {
        require(
            numSignUps < STATE_TREE_ARITY**stateTreeDepth,
            "MACI: maximum number of signups reached"
        );
        require(
            currentStage == Stage.WAITING_FOR_SIGNUPS_AND_TOPUPS,
            "QFI: Not accepting signups or top ups"
        );
        require(
            amount > 0,
            "QFI: Contribution amount must be greater than zero"
        );
        require(
            amount <= MAX_VOICE_CREDITS * voiceCreditFactor,
            "QFI: Contribution amount is too large"
        );
        // TODO: TOP UP CHECK
        require(
            contributors[msg.sender].voiceCredits == 0,
            "QFI: top ups not supported, donate to matching pool instead"
        );
        uint256 voiceCredits = amount / voiceCreditFactor;
        contributors[msg.sender] = ContributorStatus(voiceCredits, false);
        contributorCount += 1;
        bytes memory signUpGatekeeperData = abi.encode(
            msg.sender,
            voiceCredits
        );
        bytes memory initialVoiceCreditProxyData = abi.encode(
            msg.sender,
            voiceCredits
        );
        nativeToken.safeTransferFrom(msg.sender, address(this), amount);

        signUp(pubKey, signUpGatekeeperData, initialVoiceCreditProxyData);
        // emit Contribution(msg.sender, amount);
    }

    /**
     * @dev Get the amount of voice credits for a given address.
     * This function is a part of the InitialVoiceCreditProxy interface.
     * @param _data Encoded address of a user.
     */
    function getVoiceCredits(
        address, /* _caller */
        bytes memory _data
    ) public view returns (uint256) {
        address user = abi.decode(_data, (address));
        uint256 initialVoiceCredits = contributors[user].voiceCredits;
        require(
            initialVoiceCredits > 0,
            "FundingRound: User does not have any voice credits"
        );
        return initialVoiceCredits;
    }

    /**
     * @dev Withdraw contributed funds from the pool if the round has been cancelled.
     */
    function withdrawContribution() external {
        // require(isCancelled, 'FundingRound: Round not cancelled');
        // Reconstruction of exact contribution amount from VCs may not be possible due to a loss of precision
        uint256 amount = contributors[msg.sender].voiceCredits *
            voiceCreditFactor;
        require(amount > 0, "FundingRound: Nothing to withdraw");
        contributors[msg.sender].voiceCredits = 0;
        nativeToken.safeTransfer(msg.sender, amount);
        // emit ContributionWithdrawn(msg.sender);
    }

    /**
     * @notice Deploys a new grant round.
     * @dev Deploys a special kind of Poll called a GrantRound.
     * @param _duration uint256  stored in memory, the duration of the GrantRound
     * @param _maxValues MaxValues stored in memory, the maxMessages and maxVoteOptions of the GrantRound as uint256 values
     * @param _treeDepths TreeDepths stored in memory, intStateTreeDepth, messageTreeSubDepth, messageTreeDepth, and voteOptionTreeDepth as uint8 values
     * @param _coordinatorPubKey PubKey stored in memory, MACI pubkey of the coordinator of the GrantRounds
     */
    function deployGrantRound(
        uint256 _duration,
        MaxValues memory _maxValues,
        TreeDepths memory _treeDepths,
        PubKey memory _coordinatorPubKey,
        address coordinator
    ) public afterInit onlyOwner {
        require(
            currentStage == Stage.WAITING_FOR_SIGNUPS_AND_TOPUPS,
            "MACI: Cannot deploy a new grant round while not in the WAITING_FOR_SIGNUPS_AND_TOPUPS stage"
        );
        uint256 pollId = nextPollId;
        uint256 grantRoundId = nextGrantRoundId;

        // The message batch size and the tally batch size
        BatchSizes memory batchSizes = BatchSizes(
            MESSAGE_TREE_ARITY**uint8(_treeDepths.messageTreeSubDepth),
            STATE_TREE_ARITY**uint8(_treeDepths.intStateTreeDepth)
        );

        GrantRound g = grantRoundFactory.deployGrantRound(
            voiceCreditFactor,
            coordinator,
            nativeToken,
            _duration,
            _maxValues,
            _treeDepths,
            batchSizes,
            _coordinatorPubKey,
            vkRegistry,
            this,
            owner()
        );

        currentGrantRound = g;
        polls[pollId] = g;
        grantRounds[grantRoundId] = g;
        // Increment the grantRound ID for the next poll
        nextGrantRoundId++;
        // Increment the poll ID for the next poll
        nextPollId++;

        currentStage = Stage.VOTING_PERIOD_OPEN;
        emit DeployPoll(pollId, address(g), _coordinatorPubKey);
        // emit deployGrantRound( grantRoundId, _duration, _maxValues, _treeDepths, _coordinatorPubKey);
    }

    /**
     * @notice Retrieves the grant round contract given its ID.
     * @dev public view function, returns the Poll address given its grantRoundId.
     * @param _grantRoundId uint256 grantRoundId of the GrantRound to retrieve
     * @return returns the GrantRound contract
     */
    function getGrantRound(uint256 _grantRoundId)
        public
        view
        returns (GrantRound)
    {
        require(
            _grantRoundId < nextGrantRoundId,
            "MACI: grantRound with _grantRoundId does not exist"
        );
        return grantRounds[_grantRoundId];
    }

    /**
     * @notice Calculate the voting deadline for a grant round.
     * @dev public view function
     * @param grantRound uint256 grantRoundId of the GrantRound to use
     * @return uint256 the voting deadline for the current grant round
     */
    function getVotingDeadline(uint256 grantRound)
        public
        view
        returns (uint256)
    {
        GrantRound g = getGrantRound(grantRound);
        (uint256 deployTime, uint256 duration) = g.getDeployTimeAndDuration();
        // Require that the voting period is over
        uint256 deadline = duration + deployTime;
        return deadline;
    }

    function closeVotingAndWaitForDeadline() public onlyOwner {
        require(
            currentStage == Stage.VOTING_PERIOD_OPEN,
            "MACI: Cannot deploy a new grant round while not in the WAITING_FOR_SIGNUPS_AND_TOPUPS stage"
        );
        //TODO: ACTUALLY CLOSE THE VOTING PERIOD on the grant round contract
        currentStage = Stage.WAITING_FOR_FINALIZATION;
    }

    function finalizeCurrentRound(uint256 _totalSpent, uint256 _totalSpentSalt)
        external
        onlyOwner
    {
        require(
            currentStage == Stage.WAITING_FOR_FINALIZATION,
            "QFI: Cannot finalize a grant round while not in the WAITING_FOR_FINALIZATION stage"
        );
        bool proccesingComplete = pollProcessorAndTallyer.processingComplete();
        require(proccesingComplete, "QFI: messages have not been proccessed");
        GrantRound g = currentGrantRound;
        //NOTE: tansfer the funds to the grant round contract first before finalizing, so that the matching pool is calculated correctly
        //NOTE: matching pool will be balance of the grant contract less the totalSpent * voiceCreditFactor
        transferMatchingFunds(g);
        g.finalize(_totalSpent, _totalSpentSalt);

        currentStage = Stage.FINALIZED;
    }

    function acceptContributionsAndTopUpsBeforeNewRound() public onlyOwner {
        require(
            currentStage == Stage.FINALIZED,
            "QFI: Cannot deploy a new grant round while not in the WAITING_FOR_SIGNUPS_AND_TOPUPS stage"
        );
        currentStage = Stage.WAITING_FOR_SIGNUPS_AND_TOPUPS;
    }
}
