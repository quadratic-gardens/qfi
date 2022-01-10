// SPDX-License-Identifier: MIT
pragma experimental ABIEncoderV2;
pragma solidity ^0.7.2;

import {Poll, PollFactory, PollProcessorAndTallyer, MessageAqFactory} from "../Poll.sol";

import "./FundingRound.sol";
import "@openzeppelin/contracts/token/ERC20/ERC20.sol";
import "@openzeppelin/contracts/token/ERC20/SafeERC20.sol";
import "@openzeppelin/contracts/utils/EnumerableSet.sol";

/*
 * Minimum Quadratic Funding Infrastructure
 * Version 1
 */
contract ClrFund is IQuadraticFunding, ClrHelper, MACI {
    using EnumerableSet for EnumerableSet.AddressSet;
    using SafeERC20 for ERC20;

    // Structs
    struct ContributorStatus {
        uint256 voiceCredits;
        bool isRegistered;
        FundingRound lastContribution;
    }

    // State
    FundingRound[] private rounds;
    mapping(address => ContributorStatus) private contributors;

    event SignUp(
        uint256 _stateIndex,
        PubKey _userPubKey,
        uint256 _voiceCreditBalance,
        uint256 _timestamp
    );
    event RoundStarted(address _round);
    event RoundFinalized(address _round);
    event DeployPoll(uint256 _pollId, address _pollAddr, PubKey _pubKey);

    /*
     * Allows any eligible user sign up. The sign-up gatekeeper should prevent
     * double sign-ups or ineligible users from doing so.  This function will
     * only succeed if the sign-up deadline has not passed. It also enqueues a
     * fresh state leaf into the state AccQueue.
     * @param _userPubKey The user's desired public key.
     * @param _signUpGatekeeperData Data to pass to the sign-up gatekeeper's
     *     register() function. For instance, the POAPGatekeeper or
     *     SignUpTokenGatekeeper requires this value to be the ABI-encoded
     *     token ID.
     * @param _initialVoiceCreditProxyData Data to pass to the
     *     InitialVoiceCreditProxy, which allows it to determine how many voice
     *     credits this user should have.
     */
    function signUp(PubKey memory _pubKey, uint256 _initialVoiceCreditBalance)
        internal
        afterInit
    {
        // The circuits only support up to (5 ** 10 - 1) signups
        require(
            numSignUps < STATE_TREE_ARITY**stateTreeDepth,
            "MACI: maximum number of signups reached"
        );

        require(
            _pubKey.x < SNARK_SCALAR_FIELD && _pubKey.y < SNARK_SCALAR_FIELD,
            "MACI: _pubKey values should be less than the snark scalar field"
        );

        // The limit on voice credits is 2 ^ 32 which is hardcoded into the
        // MessageValidator circuit, specifically at check that there are
        // sufficient voice credits (using GreaterEqThan(32)).
        // TODO: perhaps increase this to 2 ^ 50 = 1125899906842624?
        require(
            _initialVoiceCreditBalance <= 4294967296,
            "MACI: too many voice credits"
        );
        uint256 timestamp = block.timestamp;
        // Create a state leaf and enqueue it.
        uint256 stateLeaf = hashStateLeaf(
            StateLeaf(_pubKey, voiceCreditBalance, timestamp)
        );
        uint256 stateIndex = stateAq.enqueue(stateLeaf);

        // Increment the number of signups
        numSignUps++;

        emit SignUp(stateIndex, _pubKey, voiceCreditBalance, timestamp);
    }

    /**
     * @dev Register user for voting.
     * This function is part of SignUpGatekeeper interface.
     * @param _data Encoded address of a contributor.
     */
    function register(PubKey memory _pubKey) public override {
        address user = msg.sender;
        bool verified = userRegistry.isVerifiedUser(user);
        require(verified, "FundingRound: User has not been verified");
        require(
            !contributors[user].isRegistered,
            "FundingRound: User already registered"
        );
        contributors[user].isRegistered = true;
    }

    /**
     * @dev Contribute tokens to this funding round.
     * @param pubKey Contributor's public key.
     * @param amount Contribution amount.
     */
    function contribute(
        PubKey calldata _pubKey,
        uint256 amount,
        FundingRound _fundingRound
    ) external {
        require(address(maci) != address(0), "FundingRound: MACI not deployed");
        require(
            contributors[user].isRegistered == true,
            "FundingRound: user not registered"
        );
        // require(!_fundingRound.isAfterVotingDeadline(), 'FundingRound: Voting has not been finished');
        // require(!_fundingRound.isFinalized, "FundingRound: Round finalized");
        // require( amount > 0,  "FundingRound: Contribution amount must be greater than zero");

        //NOTE: if they try to contribute not to the current round then throw
        if (_fundingRound != getCurrentRound()) {
            require(
                false,
                "FundingRound: can only contribute to current funding round"
            );
        }
        // NOTE: if they have never contributed then just sign them up with MACI and add to stateAQ
        else if (contributors[msg.sender].lastContribution == address(0)) {
            uint256 voiceCredits = amount / voiceCreditFactor;
            contributors[msg.sender] = ContributorStatus(
                voiceCredits,
                true,
                true
            );
            contributorCount += 1;
            nativeToken.safeTransferFrom(msg.sender, address(this), amount);

            //NOTE: actually top up the voice credits
            signUp(_pubKey, voiceCredits);
            emit Contribution(msg.sender, amount);
        } else if (_fundingRound == getCurrentRound()) {
            //NOTE: if they have contributed before to this round then top up
            if (
                contributors[msg.sender].lastContribution == getCurrentRound()
            ) {
                require(false, "FundingRound: feature not supported");
                //NOTE: implement "topups"
                // uint256 voiceCredits = (amount + contributors[msg.sender].voiceCredits)  / voiceCreditFactor;
                // contributors[msg.sender] = ContributorStatus(voiceCredits, true, true));
                // contributorCount += 1;
                // nativeToken.safeTransferFrom(msg.sender, address(this), amount);

                // topUp(_pubKey, voiceCredits);
            }
            //NOTE: if they have contributed before but not to this round then clear previous balance and top up'
            else {
                require(false, "FundingRound: feature not supported");
                //NOTE: implement "topups"
                // uint256 voiceCredits = (amount / voiceCreditFactor;
                // contributors[msg.sender] = ContributorStatus(voiceCredits, true, true));
                // contributorCount += 1;
                // nativeToken.safeTransferFrom(msg.sender, address(this), amount);

                // topUp(_pubKey, voiceCredits);
            }
        }
    }

    /**
     * @dev Get the amount of voice credits for a given address.
     * This function is a part of the InitialVoiceCreditProxy interface.
     * @param _data Encoded address of a user.
     */
    function getVoiceCredits(
        address, /* _caller */
        bytes memory _data
    ) public view override returns (uint256) {
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
        require(isCancelled, "FundingRound: Round not cancelled");
        // Reconstruction of exact contribution amount from VCs may not be possible due to a loss of precision
        uint256 amount = contributors[msg.sender].voiceCredits *
            voiceCreditFactor;
        require(amount > 0, "FundingRound: Nothing to withdraw");
        contributors[msg.sender].voiceCredits = 0;
        nativeToken.safeTransfer(msg.sender, amount);
        emit ContributionWithdrawn(msg.sender);
    }

    /**
     * @dev Transfer funds from matching pool to current funding round and finalize it.
     * @param _totalSpent Total amount of spent voice credits.
     * @param _totalSpentSalt The salt.
     */
    function transferMatchingFunds(uint256 _totalSpent, uint256 _totalSpentSalt)
        external
        onlyOwner
    {
        FundingRound currentRound = getCurrentRound();
        require(
            address(currentRound) != address(0),
            "Factory: Funding round has not been deployed"
        );
        ERC20 roundToken = currentRound.nativeToken();
        // Factory contract is the default funding source
        uint256 matchingPoolSize = roundToken.balanceOf(address(this));
        if (matchingPoolSize > 0) {
            roundToken.safeTransfer(address(currentRound), matchingPoolSize);
        }
        // Pull funds from other funding sources
        for (uint256 index = 0; index < fundingSources.length(); index++) {
            address fundingSource = fundingSources.at(index);
            uint256 allowance = roundToken.allowance(
                fundingSource,
                address(this)
            );
            uint256 balance = roundToken.balanceOf(fundingSource);
            uint256 contribution = allowance < balance ? allowance : balance;
            if (contribution > 0) {
                roundToken.safeTransferFrom(
                    fundingSource,
                    address(currentRound),
                    contribution
                );
            }
        }
        //NOTE: requires poll.verifySpentVoiceCredits(_totalSpent,_totalSpentSalt);
        currentRound.finalize(_totalSpent, _totalSpentSalt);
        emit RoundFinalized(address(currentRound));
    }

    function getCurrentRound()
        public
        view
        returns (FundingRound _currentRound)
    {
        if (rounds.length == 0) {
            return FundingRound(address(0));
        }
        return rounds[rounds.length - 1];
    }

    /*
     * Deploy new FundingRound and Poll contracts.
     */
    function deployNewRound(
        uint256 _duration,
        MaxValues memory _maxValues,
        TreeDepths memory _treeDepths,
        PubKey memory _coordinatorPubKey
    ) external afterInit {
        uint256 pollId = nextPollId;

        // The message batch size and the tally batch size
        BatchSizes memory batchSizes = BatchSizes(
            MESSAGE_TREE_ARITY**uint8(_treeDepths.messageTreeSubDepth),
            STATE_TREE_ARITY**uint8(_treeDepths.intStateTreeDepth)
        );

        Poll p = pollFactory.deploy(
            _duration,
            _maxValues,
            _treeDepths,
            batchSizes,
            _coordinatorPubKey,
            vkRegistry,
            this,
            owner()
        );

        polls[pollId] = p;

        // Increment the poll ID for the next poll
        nextPollId++;

        emit DeployPoll(pollId, address(p), _coordinatorPubKey);

        require(
            p.owner() == address(this),
            "Factory: MACI factory is not owned by FR factory"
        );
        require(
            address(userRegistry) != address(0),
            "Factory: User registry is not set"
        );
        require(
            address(recipientRegistry) != address(0),
            "Factory: Recipient registry is not set"
        );
        require(
            address(nativeToken) != address(0),
            "Factory: Native token is not set"
        );
        require(coordinator != address(0), "Factory: No coordinator");
        FundingRound currentRound = getCurrentRound();
        require(
            address(currentRound) == address(0) || currentRound.isFinalized(),
            "Factory: Current round is not finalized"
        );
        //Make sure that the max number of recipients is set correctly
        //NOTE: Deploy funding round and link to Poll contracts
        FundingRound newRound = new FundingRound(
            p,
            nativeToken,
            userRegistry,
            recipientRegistry,
            coordinator
        );
        rounds.push(newRound);
        emit DeployFundingRound(address(newRound));
    }

    /**
     * @dev Cancel current round.
     */
    function cancelCurrentRound() external onlyOwner {
        FundingRound currentRound = getCurrentRound();
        require(
            address(currentRound) != address(0),
            "Factory: Funding round has not been deployed"
        );
        require(
            !currentRound.isFinalized(),
            "Factory: Current round is finalized"
        );
        currentRound.cancel();
        emit RoundFinalized(address(currentRound));
    }
}
