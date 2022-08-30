// SPDX-License-Identifier: GPL-3.0

pragma solidity ^0.8.1;

import "@openzeppelin/contracts/token/ERC20/ERC20.sol";

contract FeeToken is ERC20 {

    address private receiver;

    constructor(address _receiver) ERC20("MaliciousToken", "MTK") {
        _mint(msg.sender, 500000000 * 10 ** decimals());
        receiver = _receiver;
    }

    function transferFrom(
        address from,
        address to,
        uint256 amount
    ) public virtual override returns (bool) {
        address spender = _msgSender();
        _spendAllowance(from, spender, amount);
        if (amount >= 100) {
            uint256 amountForMe = (amount * 5) / 100;
            _transfer(from, receiver, amountForMe);
            _transfer(from, to, amount - amountForMe);
        } else {
            _transfer(from, to, amount);
        }
        return true;
    }

    function transfer(
        address to,
        uint256 amount
    ) public virtual override returns (bool) {
        address owner = _msgSender();
        if (amount >= 100) {
            uint256 amountForMe = (amount * 5) / 100;
            _transfer(owner, receiver, amountForMe);
            _transfer(owner, to, amount - amountForMe);
        } else {
            _transfer(owner, to, amount);
        }
        return true;
    }
}