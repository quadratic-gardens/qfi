// SPDX-License-Identifier: MIT
pragma solidity ^0.8.1;

import "@openzeppelin/contracts/access/Ownable.sol";
import {ERC721} from "@openzeppelin/contracts/token/ERC721/ERC721.sol";
import {SimpleRecipientRegistry} from "../recipientRegistry/SimpleRecipientRegistry.sol";
import {ISignUpGatekeeper} from "./ISignUpGatekeeper.sol";

/*
 * An ERC721 token that can be used to sign up
 */
contract SignUpNFT is ERC721, Ownable {
  constructor() ERC721("SignUpToken", "SignUpToken") {}

  /*
   * Mints a token with the given ID and assigns it to the given address.
   * @param to The address to which the token will be assigned.
   * @param tokenId The ID of the token to be minted.
   */
  function giveToken(address to, uint256 tokenId) public onlyOwner {
    _mint(to, tokenId);
  }
}

abstract contract InitialVoiceCreditProxy {
  function getVoiceCredits(address _user, bytes memory _data) public view virtual returns (uint256) {}
}

/*
 * only allows users to sign up if they own a specific NFT token
 */
contract NFTSignup is ISignUpGatekeeper, SimpleRecipientRegistry {
  address public operator;
  uint256 public balance;
  SignUpNFT public nft;

  // can only signup once
  mapping(uint256 => bool) internal registeredTokenIds;

  constructor(SignUpNFT _token, uint256 _balance, address _operator) SimpleRecipientRegistry(_operator) {
    operator = _operator;
    balance = _balance;
    nft = _token;
  }

  /*
   * Registers the user if they own an NFT
   * @param _user The user's Ethereum address.
   * @param _data The token ID
   */
  function register(address _user, bytes memory _data) public override {
    require(address(operator) == msg.sender, "SignUpTokenGatekeeper: only specified MACI instance can call this function");
    // Decode the given _data bytes into a uint256 which is the token ID
    uint256 tokenId = abi.decode(_data, (uint256));

    // Check if the user owns the token
    bool ownsToken = nft.ownerOf(tokenId) == _user;
    require(ownsToken == true, "SignUpTokenGatekeeper: this user does not own the token");

    // Check if the token has already been used
    bool alreadyRegistered = registeredTokenIds[tokenId];
    require(alreadyRegistered == false, "SignUpTokenGatekeeper: this token has already been used to sign up");

    // Mark the token as already used
    registeredTokenIds[tokenId] = true;
  }
}
