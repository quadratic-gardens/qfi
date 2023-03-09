// SPDX-License-Identifier: MIT
pragma solidity ^0.8.1;

/**
 * @dev Interface of the InitialVoiceCreditProxy contract.
 * the contract is used to get the initial voice credit balance of a user
 */
abstract contract IInitialVoiceCreditProxy {
  function getVoiceCredits(
    address _user,
    bytes memory _data
  ) public view virtual returns (uint256) {}
}
