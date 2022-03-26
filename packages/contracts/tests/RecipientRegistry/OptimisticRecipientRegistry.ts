import { ethers } from "hardhat";
import { ContractTransaction, ContractReceipt, Signer, constants } from "ethers";
import chai from "chai";
import { deployContract, deployMockContract, MockContract, solidity, } from "ethereum-waffle";
import FundsManagerAbi from "../../abi/contracts/FundsManager.sol/FundsManager.json"
import { SimpleRecipientRegistry } from "../../typechain";

chai.use(solidity);
const { expect } = chai;


describe("Optimistic Recipient Registry", () => {
}) 
