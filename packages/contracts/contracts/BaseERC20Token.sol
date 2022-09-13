// SPDX-License-Identifier: GPL-3.0

pragma solidity ^0.8.1;

import '@openzeppelin/contracts/token/ERC20/ERC20.sol';

contract BaseERC20Token is ERC20 {
  constructor(uint256 initialSupply)
    ERC20('Prague Pool Token', 'PRG')
  {
    _mint(msg.sender, initialSupply);
  }

  function decimals() public view virtual override returns (uint8) {
    return 5;
  }
}
