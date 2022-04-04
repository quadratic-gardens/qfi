import { ethers } from "hardhat";
import { ContractTransaction, ContractReceipt, Signer, constants } from "ethers";
import chai from "chai";
import { deployContract, deployMockContract, MockContract, solidity, } from "ethereum-waffle";
import { SimpleRecipientRegistry } from "../../typechain";

chai.use(solidity);
const { expect } = chai;

describe("Simple Recipient Registry", () => {

  let deployer : Signer
  let controller : Signer
  let controllerAddress : string
  let simpleRecipientRegistry : SimpleRecipientRegistry
  
  beforeEach(async () => {
    [deployer, controller] = await ethers.getSigners();
    controllerAddress = await controller.getAddress()

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


  describe("addRecipient()", async () => {
    it("Reverts if recipient address is zero", async () => {
      expect(simpleRecipientRegistry.addRecipient(ethers.constants.AddressZero, "metadata info")).
        to.be.revertedWith('RecipientRegistry: Recipient address is zero')
    })

    it("Reverts if metadata is empty string", async () => {
      const recipient = ethers.Wallet.createRandom()
      expect(simpleRecipientRegistry.addRecipient(recipient.address, "")).
        to.be.revertedWith('RecipientRegistry: Metadata info is empty string')
    })

    it("Succesfully adds recipient", async () => {
      await simpleRecipientRegistry.connect(controller).setMaxRecipients(1)

      const recipient = ethers.Wallet.createRandom()
      let tx: ContractTransaction = await simpleRecipientRegistry.addRecipient(recipient.address, "metadata info")
      let receipt: ContractReceipt = await tx.wait();
      const event = receipt.events.filter((e) => e.event === "RecipientAdded")[0]

      const packed = ethers.utils.solidityPack(["address", "string"], [recipient.address, "metadata info"])
      const recipientId = ethers.utils.keccak256(packed)
      expect(event.event).to.equal("RecipientAdded")
      expect(event.args._recipientId).to.equal(recipientId)
      expect(event.args._recipient).to.equal(recipient.address)
      expect(event.args._metadata).to.equal("metadata info")
      expect(event.args._index).to.equal(1)
    })

  })

  describe("removeRecipient()", async () => {
    it("Succesfully removes recipient", async () => {
      await simpleRecipientRegistry.connect(controller).setMaxRecipients(1)
      const recipient = ethers.Wallet.createRandom()
      await simpleRecipientRegistry.addRecipient(recipient.address, "metadata info")
      const packed = ethers.utils.solidityPack(["address", "string"], [recipient.address, "metadata info"])
      const recipientId = ethers.utils.keccak256(packed)

      let tx: ContractTransaction = await simpleRecipientRegistry.removeRecipient(recipientId)
      let receipt: ContractReceipt = await tx.wait();
      const event = receipt.events[0]
      expect(event.event).to.equal("RecipientRemoved")
      expect(event.args._recipientId).to.equal(recipientId)
    })
  })
}) 
