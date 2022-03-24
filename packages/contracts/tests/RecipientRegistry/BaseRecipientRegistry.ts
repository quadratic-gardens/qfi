import { ethers } from "hardhat";
import { ContractTransaction, Signer, constants } from "ethers";
import chai from "chai";
import { deployContract, deployMockContract, MockContract, solidity, } from "ethereum-waffle";
import FundsManagerAbi from "../../abi/contracts/FundsManager.sol/FundsManager.json"
import { SimpleRecipientRegistry } from "../../typechain";

chai.use(solidity);
const { expect } = chai;


describe.only("Base Recipient Registry", () => {
  let deployer : Signer
  let controller : Signer
  let controllerAddress : string
  let simpleRecipientRegistry : SimpleRecipientRegistry
  let mockFundsManager: MockContract;
  
  beforeEach(async () => {
    [deployer, controller] = await ethers.getSigners();
    controllerAddress = await controller.getAddress()
    mockFundsManager = await deployMockContract(deployer, FundsManagerAbi);

    const simpleRecipientRegistryFactory = await ethers.getContractFactory("SimpleRecipientRegistry", deployer)
    simpleRecipientRegistry = await simpleRecipientRegistryFactory.deploy(controllerAddress)
  });

  it("verify - initializes properly", async () => { 
    const simpleRecipientRegistryDeployTransaction: ContractTransaction = simpleRecipientRegistry.deployTransaction;
    const txReceipt = await simpleRecipientRegistryDeployTransaction.wait();
    expect(txReceipt.status).to.not.equal(0);
    expect(txReceipt.contractAddress).to.equal(simpleRecipientRegistry.address);
  })

  it("verify - configured properly", async () => {
    expect(await simpleRecipientRegistry.owner()).to.be.equal(await deployer.getAddress());
    expect(await simpleRecipientRegistry.controller()).to.equal(controllerAddress)
    expect(await simpleRecipientRegistry.maxRecipients()).to.equal(0)
  })

  describe("setMaxRecipients()", async () => {
    
    it("only allows max recipients to be increased", async () => {
      await simpleRecipientRegistry.connect(controller).setMaxRecipients(2)
      expect(simpleRecipientRegistry.connect(controller).setMaxRecipients(1)). 
        to.be.revertedWith('RecipientRegistry: Max number of recipients can not be decreased')
    })

    it("only allows controller to update max recipients", async () => {
      expect(await simpleRecipientRegistry.callStatic.setMaxRecipients(2)).to.equal(false)
      await simpleRecipientRegistry.setMaxRecipients(2)
      expect(await simpleRecipientRegistry.maxRecipients()).to.equal(0)
    })

    it("allows max recipients to be updated", async () => {
      expect(await simpleRecipientRegistry.connect(controller).callStatic.setMaxRecipients(1)).to.equal(true)
      await simpleRecipientRegistry.connect(controller).setMaxRecipients(1)
      expect(await simpleRecipientRegistry.maxRecipients()).to.equal(1)

      expect(await simpleRecipientRegistry.connect(controller).callStatic.setMaxRecipients(2)).to.equal(true)
      await simpleRecipientRegistry.connect(controller).setMaxRecipients(2)
      expect(await simpleRecipientRegistry.maxRecipients()).to.equal(2)
    })
  })

  describe("_addRecipient()", async () => {
    it("reverts if maxRecipients is not grater than 0", async () => {
      const recipient = ethers.Wallet.createRandom()
      expect(simpleRecipientRegistry.addRecipient(recipient.address, "metadata info")).
        to.be.revertedWith('RecipientRegistry: Recipient limit is not set')
    })
    it("reverts if recipient registry already registered", async () => {
      await simpleRecipientRegistry.connect(controller).setMaxRecipients(5)

      const recipient = ethers.Wallet.createRandom()
      await simpleRecipientRegistry.addRecipient(recipient.address, "metadata info")
      expect(simpleRecipientRegistry.addRecipient(recipient.address, "metadata info")).
        to.be.revertedWith('RecipientRegistry: Recipient already registered')
    })

    it("reverts if recipient limit reached", async () => {
      await simpleRecipientRegistry.connect(controller).setMaxRecipients(1)

      let recipient = ethers.Wallet.createRandom()
      await simpleRecipientRegistry.addRecipient(recipient.address, "metadata info")

      const packed = ethers.utils.solidityPack(["address", "string"], [recipient.address, "metadata info"])
      const recipient_id = ethers.utils.keccak256(packed)
      await simpleRecipientRegistry.removeRecipient(recipient_id)

      recipient = ethers.Wallet.createRandom()
      await simpleRecipientRegistry.addRecipient(recipient.address, "metadata info")

      recipient = ethers.Wallet.createRandom()
      expect(simpleRecipientRegistry.addRecipient(recipient.address, "metadata info")).
        to.be.revertedWith('RecipientRegistry: Recipient limit reached')

    })

    it("succesfully adds a recipient", async () => {
      await simpleRecipientRegistry.connect(controller).setMaxRecipients(1)
      let recipient = ethers.Wallet.createRandom()
      const tx = await simpleRecipientRegistry.addRecipient(recipient.address, "metadata info")
      const txReceipt = await tx.wait()
      expect(txReceipt.status).to.not.equal(0);
    })
  })



  describe("getRecipientAddress()", async () => {
    it("returns 0 address when index is 0, index is greater than number of slots", async () => {
      expect(await simpleRecipientRegistry.callStatic.getRecipientAddress(0, 100, 110)).to.equal(ethers.constants.AddressZero)
      //Since slots should be of size 0 initially
      expect(await simpleRecipientRegistry.callStatic.getRecipientAddress(1, 100, 110)).to.equal(ethers.constants.AddressZero)
    })


  })

  describe("getRecipientCount()", async () => { })
})
