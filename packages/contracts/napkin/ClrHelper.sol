// SPDX-License-Identifier: MIT
pragma experimental ABIEncoderV2;
pragma solidity ^0.7.2;

import "@openzeppelin/contracts/token/ERC20/ERC20.sol";
import "@openzeppelin/contracts/token/ERC20/SafeERC20.sol";
import "@openzeppelin/contracts/utils/EnumerableSet.sol";

/*
 * Minimum Quadratic Funding Infrastructure
 * Version 1
 */
contract ClrHelper {
    using EnumerableSet for EnumerableSet.AddressSet;
    using SafeERC20 for ERC20;

    // Events
    event FundingSourceAdded(address _source);
    event FundingSourceRemoved(address _source);
    event TokenChanged(address _token);
    event CoordinatorChanged(address _coordinator);

    // State
    address public coordinator;

    ERC20 public nativeToken;
    IUserRegistry public userRegistry;
    IRecipientRegistry public recipientRegistry;
    PubKey public coordinatorPubKey;

    EnumerableSet.AddressSet private fundingSources;

    /**
     * @dev Set registry of verified users.
     * @param _userRegistry Address of a user registry.
     */
    function setUserRegistry(IUserRegistry _userRegistry) external onlyOwner {
        userRegistry = _userRegistry;
    }

    /**
     * @dev Set recipient registry.
     * @param _recipientRegistry Address of a recipient registry.
     */
    function setRecipientRegistry(IRecipientRegistry _recipientRegistry)
        external
        onlyOwner
    {
        recipientRegistry = _recipientRegistry;
        (, , uint256 maxVoteOptions) = maciFactory.maxValues();
        recipientRegistry.setMaxRecipients(maxVoteOptions);
    }

     /**
     * @dev Set token in which contributions are accepted.
     * @param _token Address of the token contract.
     */
    function setToken(address _token) external onlyOwner {
        nativeToken = ERC20(_token);
        emit TokenChanged(_token);
    }

    /**
     * @dev Set coordinator's address and public key.
     * @param _coordinator Coordinator's address.
     * @param _coordinatorPubKey Coordinator's public key.
     */
    function setCoordinator(
        address _coordinator,
        PubKey memory _coordinatorPubKey
    ) external onlyOwner {
        coordinator = _coordinator;
        coordinatorPubKey = _coordinatorPubKey;
        emit CoordinatorChanged(_coordinator);
    }
    
    /**
     * @dev Add matching funds source.
     * @param _source Address of a funding source.
     */
    function addFundingSource(address _source) external onlyOwner {
        bool result = fundingSources.add(_source);
        require(result, "Factory: Funding source already added");
        emit FundingSourceAdded(_source);
    }

    /**
     * @dev Remove matching funds source.
     * @param _source Address of the funding source.
     */
    function removeFundingSource(address _source) external onlyOwner {
        bool result = fundingSources.remove(_source);
        require(result, "Factory: Funding source not found");
        emit FundingSourceRemoved(_source);
    }

    /**
     * @dev Get total amount of matching funds.
     */
    function getMatchingFunds(ERC20 token) external view returns (uint256) {
        uint256 matchingPoolSize = token.balanceOf(address(this));
        for (uint256 index = 0; index < fundingSources.length(); index++) {
            address fundingSource = fundingSources.at(index);
            uint256 allowance = token.allowance(fundingSource, address(this));
            uint256 balance = token.balanceOf(fundingSource);
            uint256 contribution = allowance < balance ? allowance : balance;
            matchingPoolSize += contribution;
        }
        return matchingPoolSize;
    }

   
    
}
