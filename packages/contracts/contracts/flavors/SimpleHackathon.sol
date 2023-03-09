// SPDX-License-Identifier: MIT
pragma solidity ^0.8.1;

import "@openzeppelin/contracts/access/Ownable.sol";
import {SimpleRecipientRegistry} from "../recipientRegistry/SimpleRecipientRegistry.sol";
import {ISignUpGatekeeper} from "./ISignUpGatekeeper.sol";
import {IInitialVoiceCreditProxy} from "./IInitialVoiceCreditProxy.sol";

contract SimpleHackathon is
  ISignUpGatekeeper,
  IInitialVoiceCreditProxy,
  SimpleRecipientRegistry
{
  uint256 internal balance;
  address internal operator;

  constructor(
    uint256 _balance,
    address _operator
  ) SimpleRecipientRegistry(_operator) {
    operator = _operator;
    balance = _balance;
  }

  /*
   * Registers the user if they own the token with the token ID encoded in
   * _data. Throws if the user is does not own the token or if the token has
   * already been used to sign up.
   * @param _user The user's Ethereum address.
   * @param _data noop
   */
  function register(address _user, bytes memory _data) public view override {
    require(
      address(operator) == msg.sender,
      "SignUpTokenGatekeeper: only specified operator instance can call this function"
    );
    require(
      _user == owner(),
      "SignUpTokenGatekeeper: only owner can call this function"
    );
  }

  function getVoiceCredits(
    address,
    bytes memory
  ) public view override returns (uint256) {
    return balance;
  }
}
