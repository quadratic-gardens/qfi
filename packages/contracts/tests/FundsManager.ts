import { ethers } from "hardhat"
import chai from "chai"
import { deployMockContract, MockContract, solidity } from "ethereum-waffle"
import { ContractTransaction, Signer } from "ethers"
import { FundsManager, FundsManager__factory } from "../typechain"
import BaseERC20TokenAbi from "../abi/@openzeppelin/contracts/token/ERC20/ERC20.sol/ERC20.json"

chai.use(solidity)
const { expect } = chai

// Unit tests for Funds Manager smart contract.
describe("Funds Manager", () => {
  // Signers.
  let deployer: Signer
  let fundingSource: Signer
  let deployerAddress: string
  let fundingSourceAddress: string

  // Funds Manager instance.
  let fundsManager: FundsManager

  // Mocked contracts.
  let mockBaseERC20Token: MockContract

  beforeEach(async () => {
    // Get signers.
    ;[deployer, fundingSource] = await ethers.getSigners()
    deployerAddress = await deployer.getAddress()
    fundingSourceAddress = await fundingSource.getAddress()

    // Mocked contracts.
    mockBaseERC20Token = await deployMockContract(deployer, BaseERC20TokenAbi)

    // nb. workaround due it's not possible to use Waffle library for linking libraries.
    // ISSUE -> https://github.com/EthWorks/Waffle/issues/429.
    const FundsManagerFactory = new FundsManager__factory(deployer)

    // Deploy Funds Manager.
    fundsManager = await FundsManagerFactory.deploy()
  })

  it("verify - initializes properly", async () => {
    // Wait for the deploy tx.
    const fundsManagerDeployTransaction: ContractTransaction =
      fundsManager.deployTransaction
    const txReceipt = await fundsManagerDeployTransaction.wait()

    expect(txReceipt.status).to.not.equal(0)
    expect(txReceipt.contractAddress).to.equal(fundsManager.address)
  })

  it("verify - configured properly", async () => {
    expect(await fundsManager.owner()).to.be.equal(deployerAddress)
  })

  describe("addFundingSource()", async () => {
    it("allow to add a funding source", async () => {
      await expect(
        fundsManager.connect(deployer).addFundingSource(fundingSourceAddress)
      )
        .to.emit(fundsManager, "FundingSourceAdded")
        .withArgs(fundingSourceAddress)
    })

    it("revert - funding source already added", async () => {
      // Add the funding source.
      await expect(
        fundsManager.connect(deployer).addFundingSource(fundingSourceAddress)
      )
        .to.emit(fundsManager, "FundingSourceAdded")
        .withArgs(fundingSourceAddress)

      // Should revert.
      await expect(
        fundsManager.connect(deployer).addFundingSource(fundingSourceAddress)
      ).to.be.revertedWith("Factory: Funding source already added")
    })
  })

  describe("removeFundingSource()", async () => {
    it("allow to remove a funding source", async () => {
      // Add.
      await expect(
        fundsManager.connect(deployer).addFundingSource(fundingSourceAddress)
      )
        .to.emit(fundsManager, "FundingSourceAdded")
        .withArgs(fundingSourceAddress)

      // Should remove.
      await expect(
        fundsManager.connect(deployer).removeFundingSource(fundingSourceAddress)
      )
        .to.emit(fundsManager, "FundingSourceRemoved")
        .withArgs(fundingSourceAddress)
    })

    it("revert - funding source not found", async () => {
      // Should revert.
      await expect(
        fundsManager.connect(deployer).removeFundingSource(fundingSourceAddress)
      ).to.be.revertedWith("Factory: Funding source not found")
    })
  })

  describe("getMatchingFunds()", async () => {
    // Expected values.
    const fundingAmount = 100
    const expectedMatchingPoolSizeNoFundingSources = 100
    const expectedMatchingPoolSizeWithFundingSources = 200

    it("allow to retrieve the total amount of matching funds when there are no funding sources", async () => {
      // Mocks.
      await mockBaseERC20Token.mock.balanceOf
        .withArgs(fundsManager.address)
        .returns(expectedMatchingPoolSizeNoFundingSources)

      const matchingPoolSize = await fundsManager.getMatchingFunds(
        mockBaseERC20Token.address
      )

      expect(Number(matchingPoolSize)).to.be.equal(
        expectedMatchingPoolSizeNoFundingSources
      )
    })

    it("allow to retrieve the total amount of matching funds when there are other funding sources", async () => {
      // Add funding source.
      await fundsManager
        .connect(deployer)
        .addFundingSource(fundingSourceAddress)

      // Mocks.
      await mockBaseERC20Token.mock.balanceOf
        .withArgs(fundsManager.address)
        .returns(expectedMatchingPoolSizeNoFundingSources)
      await mockBaseERC20Token.mock.allowance
        .withArgs(fundingSourceAddress, fundsManager.address)
        .returns(fundingAmount)
      await mockBaseERC20Token.mock.balanceOf
        .withArgs(fundingSourceAddress)
        .returns(fundingAmount)

      const matchingPoolSize = await fundsManager.getMatchingFunds(
        mockBaseERC20Token.address
      )

      expect(Number(matchingPoolSize)).to.be.equal(
        expectedMatchingPoolSizeWithFundingSources
      )
    })
  })
})
