// SPDX-License-Identifier: MIT
pragma solidity ^0.7.2;

interface IFundingRound {
    function setPoll(Poll _poll) external;

    function vote(Message memory _message, PubKey memory _encPubKey) external;

    function publishTallyHash(string calldata _tallyHash) external;

    function finalize(uint256 _totalSpent, uint256 _totalSpentSalt) external;

    function cancel() external;

    function getAllocatedAmount(uint256 _tallyResult, uint256 _spent) external;

    function claimFunds(
        uint256 _voteOptionIndex,
        uint256 _tallyResult,
        uint256[][] calldata _tallyResultProof,
        uint256 _tallyResultSalt,
        uint256 _spent,
        uint256[][] calldata _spentProof,
        uint256 _newTallyCommitment
    ) external;
}
