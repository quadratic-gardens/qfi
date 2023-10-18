// SPDX-License-Identifier: MIT
pragma solidity ^0.8.1;

import { ISignUpGatekeeper } from './ISignUpGatekeeper.sol';

contract FreeForAllGatekeeper is ISignUpGatekeeper {
    /*
     * Registers the user without any restrictions.
     */
    function register(address, bytes memory) public override {
    }
}
