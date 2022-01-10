// SPDX-License-Identifier: MIT
pragma solidity ^0.7.2;
import './FundingRound.sol';
import '../DomainObjs.sol';

interface IQuadraticFunding {
    function setUserRegistry(IUserRegistry _userRegistry) external;
    function setRecipientRegistry(IRecipientRegistry _recipientRegistry) external;
    function setToken(address _token) external;
    function setCoordinator( address _coordinator, PubKey memory _coordinatorPubKey) external;

    function addFundingSource(address _source) external;
    function removeFundingSource(address _source) external;
    function getMatchingFunds(ERC20 token) external view;
    function transferMatchingFunds( uint256 _totalSpent, uint256 _totalSpentSalt )external;

    function signUp( PubKey memory _pubKey, uint256 _initialVoiceCreditBalance) internal;
    function register(PubKey memory _pubKey) external;
    function contribute( PubKey memory _pubKey, uint256 amount, address _fundingRound) external; 
    function withdrawContribution() external;

    function getCurrentRound() public view returns (FundingRound);
    function deployNewRound() external;
    function cancelCurrentRound() external;
   
}
