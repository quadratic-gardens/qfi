// SPDX-License-Identifier: GPL-3.0
pragma experimental ABIEncoderV2;
pragma solidity ^0.7.2;


import "@openzeppelin/contracts/access/Ownable.sol";
import "@openzeppelin/contracts/token/ERC20/ERC20.sol";
import "@openzeppelin/contracts/token/ERC20/SafeERC20.sol";

import "qaci-contracts/sol/MACI.sol";
import "qaci-contracts/sol/MACISharedObjs.sol";
import "qaci-contracts/sol/gatekeepers/SignUpGatekeeper.sol";
import "qaci-contracts/sol/initialVoiceCreditProxy/InitialVoiceCreditProxy.sol";

import "./userRegistry/IUserRegistry.sol";
import "./recipientRegistry/IRecipientRegistry.sol";

contract FundingRound is
    Ownable,
    MACISharedObjs,
    SignUpGatekeeper,
    InitialVoiceCreditProxy
{
    using SafeERC20 for ERC20;

    // Constants
    uint256 private constant MAX_VOICE_CREDITS = 10**9; // MACI allows 2 ** 32 voice credits max
    uint256 private constant MAX_CONTRIBUTION_AMOUNT = 10**4; // In tokens

    // State
    uint256 public voiceCreditFactor;
    uint256 public contributorCount;
    uint256 public matchingPoolSize;
    uint256 public totalSpent;
    uint256 public totalVotes;
    bool public isFinalized = false;
    bool public isCancelled = false;

    address public coordinator;
    MACI public maci;
    Poll public poll;
    ERC20 public nativeToken;
    IUserRegistry public userRegistry;
    IRecipientRegistry public recipientRegistry;
    string public tallyHash;

    mapping(uint256 => bool) private recipients;

    // Events
    event Contribution(address indexed _sender, uint256 _amount);
    event ContributionWithdrawn(address indexed _contributor);
    event FundsClaimed(
        uint256 indexed _voteOptionIndex,
        address indexed _recipient,
        uint256 _amount
    );
    event TallyPublished(string _tallyHash);
    event Voted(address indexed _contributor);

    /**
     * @dev Set round parameters.
     * @param _nativeToken Address of a token which will be accepted for contributions.
     * @param _userRegistry Address of the registry of verified users.
     * @param _recipientRegistry Address of the recipient registry.
     * @param _coordinator Address of the coordinator.
     */
    constructor(
        Poll _poll,
        ERC20 _nativeToken,
        IUserRegistry _userRegistry,
        IRecipientRegistry _recipientRegistry,
        address _coordinator
    ) public {
        //NOTE: initiate funding round with poll
        poll = _poll;
        nativeToken = _nativeToken;
        voiceCreditFactor =
            (MAX_CONTRIBUTION_AMOUNT * uint256(10)**nativeToken.decimals()) /
            MAX_VOICE_CREDITS;
        voiceCreditFactor = voiceCreditFactor > 0 ? voiceCreditFactor : 1;
        userRegistry = _userRegistry;
        recipientRegistry = _recipientRegistry;
        coordinator = _coordinator;
    }

    /**
     * @dev Link MACI instance to this funding round.
     */
    function setPoll(Poll _poll) external onlyOwner {
        require(
            address(poll) == address(0),
            "FundingRound: Already linked to Poll instance"
        );
        // require(
        //     //TODO: feature request
        //   !_poll.isAfterVotingDeadline(),
        //   'FundingRound: Signup deadline must be in the future'
        // );
        poll = _poll;
    }

    /**
     * @dev Submit a batch of messages along with corresponding ephemeral public keys.
     */
    function vote(Message memory _message, PubKey memory _encPubKey) external {
        poll.publishMessage(_message, _encPubKey);

        emit Voted(msg.sender);
    }

    /**
     * @dev Publish the IPFS hash of the vote tally. Only coordinator can publish.
     * @param _tallyHash IPFS hash of the vote tally.
     */
    function publishTallyHash(string calldata _tallyHash) external {
        require(
            msg.sender == coordinator,
            "FundingRound: Sender is not the coordinator"
        );
        require(!isFinalized, "FundingRound: Round finalized");
        require(
            bytes(_tallyHash).length != 0,
            "FundingRound: Tally hash is empty string"
        );
        tallyHash = _tallyHash;
        emit TallyPublished(_tallyHash);
    }

    /**
     * @dev Get the total amount of votes from MACI,
     * verify the total amount of spent voice credits across all recipients,
     * and allow recipients to claim funds.
     * @param _totalSpent Total amount of spent voice credits.
     * @param _totalSpentSalt The salt.
     */
    function finalize(uint256 _totalSpent, uint256 _totalSpentSalt)
        external
        onlyOwner
    {
        require(!isFinalized, "FundingRound: Already finalized");
        require(address(poll) != address(0), "FundingRound: MACI not deployed");
        //NOTE: stub out or add extra functions to poll ABI
        // require(!poll.isAfterVotingDeadline(), 'FundingRound: Voting has not been finished');
        // require(!poll.hasUntalliedStateLeaves(), 'FundingRound: Votes has not been tallied');
        // require(bytes(tallyHash).length != 0, 'FundingRound: Tally hash has not been published');
        //NOTE: stubout or add extra functions to poll ABI ist his in PollProcessorAndTallyer?
        totalVotes = poll.totalVotes();
        // If nobody voted, the round should be cancelled to avoid locking of matching funds
        require(totalVotes > 0, "FundingRound: No votes");
        //NOTE: stubout or add extra functions to poll ABI is this in PollProcessorAndTallyer?
        // bool verified = poll.verifySpentVoiceCredits(
        //     _totalSpent,
        //     _totalSpentSalt
        // );
        require(
            verified,
            "FundingRound: Incorrect total amount of spent voice credits"
        );
        totalSpent = _totalSpent;
        // Total amount of spent voice credits is the size of the pool of direct rewards.
        // Everything else, including unspent voice credits and downscaling error,
        // is considered a part of the matching pool
        matchingPoolSize =
            nativeToken.balanceOf(address(this)) -
            totalSpent *
            voiceCreditFactor;
        isFinalized = true;
    }

    /**
     * @dev Cancel funding round.
     */
    function cancel() external onlyOwner {
        require(!isFinalized, "FundingRound: Already finalized");
        isFinalized = true;
        isCancelled = true;
    }

    /**
     * @dev Get allocated token amount (without verification).
     * @param _tallyResult The result of vote tally for the recipient.
     * @param _spent The amount of voice credits spent on the recipient.
     */
    function getAllocatedAmount(uint256 _tallyResult, uint256 _spent)
        public
        view
        returns (uint256)
    {
        return
            (matchingPoolSize * _tallyResult) /
            totalVotes +
            _spent *
            voiceCreditFactor;
    }

    /**
     * @dev Claim allocated tokens.
     * @param _voteOptionIndex Vote option index.
     * @param _tallyResult The result of vote tally for the recipient.
     * @param _tallyResultProof Proof of correctness of the vote tally.
     * @param _tallyResultSalt Salt.
     * @param _spent The amount of voice credits spent on the recipient.
     * @param _spentProof Proof of correctness for the amount of spent credits.
     * @param _spentSalt Salt.
     */
    function claimFunds(
        uint256 _voteOptionIndex,
        uint256 _tallyResult,
        uint256[][] calldata _tallyResultProof,
        uint256 _tallyResultSalt,
        uint256 _spent,
        uint256[][] calldata _spentProof,
        uint256 _newTallyCommitment
    ) external {
        require(isFinalized, "FundingRound: Round not finalized");
        require(!isCancelled, "FundingRound: Round has been cancelled");
        require(
            !recipients[_voteOptionIndex],
            "FundingRound: Funds already claimed"
        );

        // create scope to avoid 'stack too deep' error
        {
            //NOTE: Verify Tally Proof
            (uint256 numSignUps, ) = poll.numSignUpsAndMessages();
            (, uint256 tallyBatchSize) = poll.batchSizes();
            bool isValid = poll.verifyTallyProof(
                poll,
                _tallyResultProof,
                numSignUps,
                batchStartIndex,
                tallyBatchSize,
                _newTallyCommitment
            );
            //NOTE: Verify voice credits spent on the recipient trying to claim
            require(resultVerified, "FundingRound: Incorrect tally result");
            // did user spend what they are trying to withdraw?
            // did everyone's spend add up to total tally?
            //TODO add test for this once Cory finished fix


            //NOTE: stubout or add extra functions to poll ABI 
            // bool spentVerified = poll.verifyPerVOSpentVoiceCredits(
            //     voteOptionTreeDepth,
            //     _voteOptionIndex,
            //     _spent,
            //     _spentProof,
            //     _spentSalt
            // );
            // require(
            //     spentVerified,
            //     "FundingRound: Incorrect amount of spent voice credits"
            // );
        }
        recipients[_voteOptionIndex] = true;

        (uint256 deployTime, uint256 duration) = poll.getDeployTimeAndDuration();
        uint256 startTime = deployTime;
        address recipient = recipientRegistry.getRecipientAddress(
            _voteOptionIndex,
            startTime,
            startTime +
                duration
        );
        if (recipient == address(0)) {
            // Send funds back to the matching pool
            recipient = owner();
        }
        //NOTE: need to implement verifyPerVOSpentVoiceCredits
        uint256 allocatedAmount = getAllocatedAmount(_tallyResult, _spent);
        nativeToken.safeTransfer(recipient, allocatedAmount);
        emit FundsClaimed(_voteOptionIndex, recipient, allocatedAmount);
    }
}
