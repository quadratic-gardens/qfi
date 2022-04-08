import { ethers } from "hardhat";
import { ContractTransaction, ContractReceipt, Signer, constants } from "ethers";
import chai from "chai";
import { deployContract, deployMockContract, MockContract, solidity, } from "ethereum-waffle";
import { SimpleRecipientRegistry } from "../../typechain";

chai.use(solidity);
const { expect } = chai;


describe("Base Recipient Registry", () => {
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

      const tx: ContractTransaction = await simpleRecipientRegistry.addRecipient(recipient.address, "metadata info")
      const receipt: ContractReceipt = await tx.wait();

      const event = receipt.events.filter((e) => e.event === "RecipientAdded")[0]
      const recipientId = event.args._recipientId
      await simpleRecipientRegistry.removeRecipient(recipientId)

      recipient = ethers.Wallet.createRandom()
      await simpleRecipientRegistry.addRecipient(recipient.address, "metadata info")

      recipient = ethers.Wallet.createRandom()
      expect(simpleRecipientRegistry.addRecipient(recipient.address, "metadata info")).
        to.be.revertedWith('RecipientRegistry: Recipient limit reached')
    })

    it("succesfully adds a recipient", async () => {
      await simpleRecipientRegistry.connect(controller).setMaxRecipients(1)
      const recipient = ethers.Wallet.createRandom()
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

    it("Does not select recipients added after endTime", async () => {
      await simpleRecipientRegistry.connect(controller).setMaxRecipients(3)
      const recipient = ethers.Wallet.createRandom()
      const tx: ContractTransaction = await simpleRecipientRegistry.addRecipient(recipient.address, "metadata info")
      const receipt: ContractReceipt = await tx.wait();
      const event = receipt.events.filter((e) => e.event === "RecipientAdded")[0]
      const recipientIndex = event.args._index
      const timeStamp = event.args._timestamp.toNumber()

      expect(await simpleRecipientRegistry.callStatic.getRecipientAddress(recipientIndex, 0, timeStamp - 100)).to.equal(ethers.constants.AddressZero)
    })

    it("Returns recipient added before start time if only once recipient in index", async () => {
      await simpleRecipientRegistry.connect(controller).setMaxRecipients(2)
      const recipient = ethers.Wallet.createRandom()
      const tx: ContractTransaction = await simpleRecipientRegistry.addRecipient(recipient.address, "metadata info")
      const receipt: ContractReceipt = await tx.wait();
      const event = receipt.events.filter((e) => e.event === "RecipientAdded")[0]
      const recipientIndex = event.args._index
      const timeStamp = event.args._timestamp.toNumber()

      expect(await simpleRecipientRegistry.callStatic.getRecipientAddress(recipientIndex, timeStamp + 100, timeStamp + 200)).to.equal(recipient.address)
    })

    it("succesfully returns recipient address", async () => {
      await simpleRecipientRegistry.connect(controller).setMaxRecipients(3)
      const recipient = ethers.Wallet.createRandom()
      const tx: ContractTransaction = await simpleRecipientRegistry.addRecipient(recipient.address, "metadata info")
      const receipt: ContractReceipt = await tx.wait();
      const event = receipt.events.filter((e) => e.event === "RecipientAdded")[0]
      const recipientIndex = event.args._index
      const timeStamp = event.args._timestamp.toNumber()

      expect(await simpleRecipientRegistry.callStatic.getRecipientAddress(recipientIndex, 0, timeStamp + 100)).to.equal(recipient.address)
    })

  })

  describe("getRecipientCount()", async () => { 

    it("Returns number of recipients", async () => {
      await simpleRecipientRegistry.connect(controller).setMaxRecipients(5)
      let recipient = ethers.Wallet.createRandom()
      await simpleRecipientRegistry.addRecipient(recipient.address, "metadata info")
      expect(await simpleRecipientRegistry.getRecipientCount()).to.equal(1)

      recipient = ethers.Wallet.createRandom()
      await simpleRecipientRegistry.addRecipient(recipient.address, "metadata info")
      expect(await simpleRecipientRegistry.getRecipientCount()).to.equal(2)

    })

    it("Tests removal decreases recipient count", async () => {
      await simpleRecipientRegistry.connect(controller).setMaxRecipients(2)

      let recipient = ethers.Wallet.createRandom()
      const tx: ContractTransaction = await simpleRecipientRegistry.addRecipient(recipient.address, "metadata info")
      const receipt: ContractReceipt = await tx.wait();

      expect(await simpleRecipientRegistry.getRecipientCount()).to.equal(1)

      const event = receipt.events.filter((e) => e.event === "RecipientAdded")[0]
      const recipientId = event.args._recipientId
      await simpleRecipientRegistry.removeRecipient(recipientId)

      expect(await simpleRecipientRegistry.getRecipientCount()).to.equal(0)

      recipient = ethers.Wallet.createRandom()
      await simpleRecipientRegistry.addRecipient(recipient.address, "metadata info")
      recipient = ethers.Wallet.createRandom()
      await simpleRecipientRegistry.addRecipient(recipient.address, "metadata info")
      expect(await simpleRecipientRegistry.getRecipientCount()).to.equal(2)
    })


  })

  describe("_removeRecipient()", async () => { 
    it("Reverts if recipient is not in the registry", async () => {
      const recipient = ethers.Wallet.createRandom()
      const packed = ethers.utils.solidityPack(["address", "string"], [recipient.address, "metadata info"])
      const recipientId = ethers.utils.keccak256(packed)

      expect(simpleRecipientRegistry.removeRecipient(recipientId)).
        to.be.revertedWith("RecipientRegistry: Recipient is not in the registry")

    })

    it("Reverts if recipient already removed", async () => {
      await simpleRecipientRegistry.connect(controller).setMaxRecipients(1)
      const recipient = ethers.Wallet.createRandom()
      const tx: ContractTransaction = await simpleRecipientRegistry.addRecipient(recipient.address, "metadata info")
      const receipt: ContractReceipt = await tx.wait();

      const event = receipt.events.filter((e) => e.event === "RecipientAdded")[0]
      const recipientId = event.args._recipientId

      await simpleRecipientRegistry.removeRecipient(recipientId)
      expect(simpleRecipientRegistry.removeRecipient(recipientId)).
        to.be.revertedWith("RecipientRegistry: Recipient already removed")
    })

    it("Succesfully removes recipient from registry", async () => {
      await simpleRecipientRegistry.connect(controller).setMaxRecipients(1)
      const recipient = ethers.Wallet.createRandom()
      const tx: ContractTransaction = await simpleRecipientRegistry.addRecipient(recipient.address, "metadata info")
      const receipt: ContractReceipt = await tx.wait();

      const event = receipt.events.filter((e) => e.event === "RecipientAdded")[0]
      const recipientId = event.args._recipientId

      await simpleRecipientRegistry.removeRecipient(recipientId)
      expect(await simpleRecipientRegistry.getRecipientCount()).to.equal(0)
    })
  })

})
