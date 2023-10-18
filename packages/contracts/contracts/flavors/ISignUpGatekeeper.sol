// SPDX-License-Identifier: MIT
pragma solidity ^0.8.1;

/**
 * @dev Interface of the SignUpGatekeeper contract.
 * SignUpGatekeeper is a contract that allows users to sign up based on some
 * condition. For example, a SignUpGatekeeper contract could allow users to
 * sign up if they own a specific NFT token or are part of a dao.
 */
abstract contract ISignUpGatekeeper {
    function register(address _user, bytes memory _data) public virtual {}
}
