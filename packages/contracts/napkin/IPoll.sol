// SPDX-License-Identifier: MIT
pragma solidity ^0.7.2;

interface IPoll {
    function numSignUpsAndMessages() external returns (uint256, uint256);

    function batchSizes() external returns (uint256, uint256);

    function publishMessage(Message memory _message, PubKey memory _encPubKey);

    function isAfterVotingDeadline() external view returns (bool);

    function hasUntalliedStateLeaves() external view returns (bool);

    function verifyPerVOSpentVoiceCredits(
        uint256 voteOptionTreeDepth,
        uint256_voteOptionIndex,
        uint256 _spent,
        uint256 _spentProof,
        uint256 spentSalt
    ) external returns (bool);

    function verifyTallyResult(
        uint256 voteOptionTreeDepth,
        uint256 voteOptionIndex,
        uint256 tallyResult,
        uint256 tallyResultProof,
        uint256 tallyResultSalt
    ) external returns (bool);

    function verifySpentVoiceCredits(
        uint256 _totalSpent,
        uint256 _totalSpentSalt
    ) external returns (bool);

    function verifyTallyProof(
        Poll _poll,
        uint256[8] memory _proof,
        uint256 _numSignUps,
        uint256 _batchStartIndex,
        uint256 _tallyBatchSize,
        uint256 _newTallyCommitment
    ) external view returns (bool);

}
