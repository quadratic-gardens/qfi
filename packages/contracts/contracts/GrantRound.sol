//SPDX-License-Identifier: MIT
pragma experimental ABIEncoderV2;
pragma solidity ^0.7.2;

import {PollFactory, Poll, PollProcessorAndTallyer} from "maci-contracts/contracts/Poll.sol";
import {VkRegistry} from "maci-contracts/contracts/VkRegistry.sol";
import {Params} from "maci-contracts/contracts/Params.sol";
import {IMACI} from "maci-contracts/contracts/IMACI.sol";
import {AccQueue} from "maci-contracts/contracts/trees/AccQueue.sol";

import "@openzeppelin/contracts/token/ERC20/ERC20.sol";
import "@openzeppelin/contracts/token/ERC20/SafeERC20.sol";

import {IRecipientRegistry} from "./recipientRegistry/IRecipientRegistry.sol";

/**
 * @title Quadratic Funding Round Contract
 * @author Q
 * @notice This contract manages contributions, withdrawals, Voting and the distribution of funds for a particular grant round.
 * @dev Inherits from Poll Contract and uses the Poll Contract interface to manage the voting.
 */
contract GrantRound is Poll {
    using SafeERC20 for ERC20;

    uint256 public voiceCreditFactor;
    address public coordinator;
    ERC20 public nativeToken;
    IRecipientRegistry public recipientRegistry;
    mapping(uint256 => bool) private recipients;

    bool public isCancelled;
    bool public isFinalized;
    string public tallyHash;
    uint256 public totalSpent;
    uint256 public totalVotes;
    uint256 public matchingPoolSize;

    /**
     * @notice Constructor for the GrantRound, special type of poll that implements Quadratic Funding.
     * @dev Binds the contracts that will be used to tally the Poll and sets duration ans coordinator.
     * @param _voiceCreditFactor uint256 The factor by which the voiceCredit is multiplied to determine the amount of voice credits that are distributed to the contributor.
     * @param _coordinator The address of the coordinator of the GrantRound.
     * @param _nativeToken The address of the ERC20 token used for the GrantRound.
     * @param _duration uint256, the duration of the GrantRound
     * @param _maxValues MaxValues stored in memory, the maxMessages and maxVoteOptions of the GrantRound as uint256 values
     * @param _treeDepths TreeDepths stored in memory, intStateTreeDepth, messageTreeSubDepth, messageTreeDepth, and voteOptionTreeDepth as uint8 values
     * @param _batchSizes BatchSizes stored in memory, this inlcudes the message batch size and the tally batch size
     * @param _coordinatorPubKey PubKey stored in memory, MACI pubkey of the coordinator of the GrantRounds
     * @param _extContracts ExtContracts stored in memory, this includes the maci, and messageAq contracts that will be used to tally the Poll.
     */
    constructor(
        uint256 _voiceCreditFactor,
        address _coordinator,
        ERC20 _nativeToken,
        uint256 _duration,
        MaxValues memory _maxValues,
        TreeDepths memory _treeDepths,
        BatchSizes memory _batchSizes,
        PubKey memory _coordinatorPubKey,
        ExtContracts memory _extContracts,
        IRecipientRegistry _recipientRegistry
    )
        Poll(
            _duration,
            _maxValues,
            _treeDepths,
            _batchSizes,
            _coordinatorPubKey,
            _extContracts
        )
    {
        voiceCreditFactor = _voiceCreditFactor;
        coordinator = _coordinator;
        nativeToken = _nativeToken;
        recipientRegistry = _recipientRegistry;
    }

    /**
     * @notice Allows anyone to publish a batch of messages (an encrypted command and signature).
     * @dev This function also enqueues the messages.
     * @param _messages Message[] The messages to publish as an array of Message structs.
     * @param _encPubKeys PubKey[] An array of epheremal public keys which can be combined with the
     *     coordinator's private key to generate an ECDH shared key with which
     *     to encrypt the message.
     */
    function publishMessageBatch(
        Message[] calldata _messages,
        PubKey[] calldata _encPubKeys
    ) external {
        uint256 batchSize = _messages.length;
        for (uint8 i = 0; i < batchSize; i++) {
            publishMessage(_messages[i], _encPubKeys[i]);
        }
    }

    /**
     * @dev Publish the IPFS hash of the vote tally. Only coordinator can publish.
     * @param _tallyHash IPFS hash of the vote tally.
     */
    function publishTallyHash(string calldata _tallyHash) external {
        require(
            msg.sender == coordinator,
            "GrantRound: Sender is not the coordinator"
        );
        require(!isFinalized, "GrantRound: Round finalized");
        require(
            bytes(_tallyHash).length != 0,
            "GrantRound: Tally hash is empty string"
        );
        tallyHash = _tallyHash;
        // emit TallyPublished(_tallyHash);
    }

    /*
     * @dev Get the total amount of votes from MACI,
     * verify the total amount of spent voice credits across all recipients,
     * and allow recipients to claim funds.
     * @param _totalSpent Total amount of spent voice credits.
     * @param _totalSpentSalt The salt.
     */
    function finalize(uint256 _totalSpent, uint256 _totalSpentSalt)
        external
        onlyOwner
        isAfterVotingDeadline
    {
        require(!isFinalized, "GrantRound: Already finalized");
        require(stateAqMerged, "GrantRound: State AQ not merged");
        require(
            address(extContracts.maci) != address(0),
            "GrantRound: MACI not deployed"
        );
        require(
            bytes(tallyHash).length != 0,
            "GrantRound: Tally hash has not been published"
        );
        // If nobody voted, the round should be cancelled to avoid locking of matching funds
        require(numMessages > 0, "GrantRound: No votes");

        //TODO: Actually verify using new decorators
        bool verified = verifySpentVoiceCredits(_totalSpent, _totalSpentSalt);
        require(
            verified,
            "GrantRound: Incorrect total amount of spent voice credits"
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
        require(!isFinalized, "GrantRound: Already finalized");
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

    /*
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
        uint256[][] memory _tallyResultProof,
        uint256 _spentVoiceCreditsHash,
        uint256 _perVOSpentVoiceCreditsHash,
        uint256 _tallyCommitment,
        uint256 _spent,
        uint256[][] memory _spentProof,
        uint256 _spentSalt
    ) external {
        require(isFinalized, "GrantRound: Round not finalized");
        require(!isCancelled, "GrantRound: Round has been cancelled");
        require(
            !recipients[_voteOptionIndex],
            "FundingRound: Funds already claimed"
        );
        {
            bool resultVerified = verifyTallyResult(
                _voteOptionIndex,
                _tallyResult,
                _tallyResultProof,
                _spentVoiceCreditsHash,
                _perVOSpentVoiceCreditsHash,
                _tallyCommitment
            );
            require(resultVerified, "FundingRound: Incorrect tally result");

            bool spentVerified = verifyPerVOSpentVoiceCredits(
                _voteOptionIndex,
                _spent,
                _spentProof,
                _spentSalt
            );
            require(
                spentVerified,
                "FundingRound: Incorrect amount of spent voice credits"
            );
        }
        recipients[_voteOptionIndex] = true;
        (uint256 deployTime, uint256 duration) = getDeployTimeAndDuration();
        address recipient = recipientRegistry.getRecipientAddress(
            _voteOptionIndex,
            deployTime,
            deployTime + duration
        );
        if (recipient == address(0)) {
            // Send funds back to the matching pool
            recipient = owner();
        }
        uint256 allocatedAmount = getAllocatedAmount(_tallyResult, _spent);
        nativeToken.safeTransfer(recipient, allocatedAmount);
    }
}
