import { ethers } from "hardhat";
import { ContractTransaction, ContractReceipt, Signer, constants } from "ethers";
import chai from "chai";
import { deployContract, deployMockContract, MockContract, solidity, } from "ethereum-waffle";
import { OptimisticRecipientRegistry } from "../../typechain";

chai.use(solidity);
const { expect } = chai;


describe("Optimistic Recipient Registry", () => {

  let deployer : Signer
  let controller : Signer
  let addr1 : Signer
  let controllerAddress : string
  let optimisticRecipientRegistry : OptimisticRecipientRegistry
  
  beforeEach(async () => {
    [deployer, controller, addr1] = await ethers.getSigners();
    controllerAddress = await controller.getAddress()

    const optimisticRecipientRegistryFactory = await ethers.getContractFactory("OptimisticRecipientRegistry", deployer)
    optimisticRecipientRegistry = await optimisticRecipientRegistryFactory.deploy(0, 60, controllerAddress)
  });

  it("verify - initializes properly", async () => { 
    const optimisticRecipientRegistryDeployTransaction: ContractTransaction = optimisticRecipientRegistry.deployTransaction;
    const txReceipt = await optimisticRecipientRegistryDeployTransaction.wait();
    expect(txReceipt.status).to.not.equal(0);
    expect(txReceipt.contractAddress).to.equal(optimisticRecipientRegistry.address);
  })

  it("verify - configured properly", async () => {
    expect(await optimisticRecipientRegistry.owner()).to.be.equal(await deployer.getAddress());
    expect(await optimisticRecipientRegistry.controller()).to.equal(controllerAddress)
    expect(await optimisticRecipientRegistry.baseDeposit()).to.equal(0)
    expect(await optimisticRecipientRegistry.challengePeriodDuration()).to.equal(60)
  })


  describe("setBaseDeposit()", async () => {
    it("Only owner can set base deposit", async () => {
      expect(optimisticRecipientRegistry.connect(addr1).setBaseDeposit(100)).
        to.be.revertedWith("Ownable: caller is not the owner")
    })

    it("Succesfully sets base deposit", async () => {
      await optimisticRecipientRegistry.setBaseDeposit(100)
      expect(await optimisticRecipientRegistry.baseDeposit()).to.equal(100)
    })
  })


  describe("setChallengePeriodDuration()", async () => {
    it("Only owner can set challenge period duration", async () => {
      expect(optimisticRecipientRegistry.connect(addr1).setChallengePeriodDuration(1)).
        to.be.revertedWith("Ownable: caller is not the owner")
    })

    it("Succesfully sets challenge period duration", async () => {
      await optimisticRecipientRegistry.setChallengePeriodDuration(1)
      expect(await optimisticRecipientRegistry.challengePeriodDuration()).to.equal(1)
    })
  })

  describe("addRecipient()", async () => {
    beforeEach(async () => {
      await optimisticRecipientRegistry.connect(controller).setMaxRecipients(2)
    })
    it("Reverts if recipient address is zero", async () => {
      expect(optimisticRecipientRegistry.addRecipient(ethers.constants.AddressZero, "metadata info")).
        to.be.revertedWith("RecipientRegistry: Recipient address is zero")
    })

    it("Reverts if metadata is empty string", async () => {
      const recipient = ethers.Wallet.createRandom()
      expect(optimisticRecipientRegistry.addRecipient(recipient.address, "")).
        to.be.revertedWith("RecipientRegistry: Metadata info is empty string")
    })

    it("Reverts if recipient already registered", async () => {
      const recipient = ethers.Wallet.createRandom()
      let tx: ContractTransaction = await optimisticRecipientRegistry.addRecipient(recipient.address, "metadata info")
      let receipt: ContractReceipt = await tx.wait();
      const event = receipt.events.filter((e) => e.event === "RequestSubmitted")[0]
      const recipientId = event.args._recipientId
      await optimisticRecipientRegistry.executeRequest(recipientId)

      expect(optimisticRecipientRegistry.addRecipient(recipient.address, "metadata info")).
        to.be.revertedWith("RecipientRegistry: Recipient already registered")
    })

    it("Reverts if recipient request already submitted", async () => {
      const recipient = ethers.Wallet.createRandom()
      await optimisticRecipientRegistry.addRecipient(recipient.address, "metadata info")
      expect(optimisticRecipientRegistry.addRecipient(recipient.address, "metadata info")).
        to.be.revertedWith("RecipientRegistry: Request already submitted")
    })

    it("Reverts if deposit amount is incorrect", async () => {
      await optimisticRecipientRegistry.setBaseDeposit(10)
      const recipient = ethers.Wallet.createRandom()
      expect(optimisticRecipientRegistry.addRecipient(
        recipient.address, "metadata info",
        { value: ethers.utils.parseEther("9.0")}
      )).
        to.be.revertedWith("RecipientRegistry: Incorrect deposit amount")
    })

    it("Succesfully adds recipient", async () => {
      const recipient = ethers.Wallet.createRandom()
      let tx: ContractTransaction = await optimisticRecipientRegistry.addRecipient(recipient.address, "metadata info")
      let receipt: ContractReceipt = await tx.wait();
      const event = receipt.events.filter((e) => e.event === "RequestSubmitted")[0]
      const packed = ethers.utils.solidityPack(["address", "string"], [recipient.address, "metadata info"])
      const recipientId = ethers.utils.keccak256(packed)

      expect(event.event).to.equal("RequestSubmitted")
      expect(event.args._recipientId).to.equal(recipientId)
      //0 is enum value for Registration
      expect(event.args._type).to.equal(0)
      expect(event.args._recipient).to.equal(recipient.address)
      expect(event.args._metadata).to.equal("metadata info")
    })
  })

  describe("removeRecipient()", async () => {
    beforeEach(async () => {
      await optimisticRecipientRegistry.connect(controller).setMaxRecipients(1)
    })
    it("Reverts if recipient not in registry", async () => {
      const recipient = ethers.Wallet.createRandom()
      const packed = ethers.utils.solidityPack(["address", "string"], [recipient.address, "metadata info"])
      const recipientId = ethers.utils.keccak256(packed)
      expect(optimisticRecipientRegistry.removeRecipient(recipientId)).
        to.be.revertedWith("RecipientRegistry: Recipient is not in the registry")
    })

    it("Reverts if recipient already removed", async () => {
      const recipient = ethers.Wallet.createRandom()
      await optimisticRecipientRegistry.addRecipient(recipient.address, "metadata info")
      const packed = ethers.utils.solidityPack(["address", "string"], [recipient.address, "metadata info"])
      const recipientId = ethers.utils.keccak256(packed)
      await optimisticRecipientRegistry.executeRequest(recipientId)

      await optimisticRecipientRegistry.removeRecipient(recipientId)
      await optimisticRecipientRegistry.executeRequest(recipientId)

      expect(optimisticRecipientRegistry.removeRecipient(recipientId)).
        to.be.revertedWith("RecipientRegistry: Recipient already removed")
    })
    
    it("Reverts if recipient removal request already submitted", async () => {
      const recipient = ethers.Wallet.createRandom()
      await optimisticRecipientRegistry.addRecipient(recipient.address, "metadata info")
      const packed = ethers.utils.solidityPack(["address", "string"], [recipient.address, "metadata info"])
      const recipientId = ethers.utils.keccak256(packed)
      await optimisticRecipientRegistry.executeRequest(recipientId)

      await optimisticRecipientRegistry.removeRecipient(recipientId)
      expect(optimisticRecipientRegistry.removeRecipient(recipientId)).
        to.be.revertedWith("RecipientRegistry: Request already submitted")
    })

    it("Reverts if incorrect deposit amount", async () => {
      const recipient = ethers.Wallet.createRandom()
      await optimisticRecipientRegistry.addRecipient(recipient.address, "metadata info")
      const packed = ethers.utils.solidityPack(["address", "string"], [recipient.address, "metadata info"])
      const recipientId = ethers.utils.keccak256(packed)
      await optimisticRecipientRegistry.executeRequest(recipientId)

      await optimisticRecipientRegistry.setBaseDeposit(10)
      expect(optimisticRecipientRegistry.removeRecipient( recipientId, { value: ethers.utils.parseEther("9.0")})).
        to.be.revertedWith("RecipientRegistry: Incorrect deposit amount")
    })

    it("Succesfully removes recipient", async () => {
      const recipient = ethers.Wallet.createRandom()
      await optimisticRecipientRegistry.addRecipient(recipient.address, "metadata info")
      const packed = ethers.utils.solidityPack(["address", "string"], [recipient.address, "metadata info"])
      const recipientId = ethers.utils.keccak256(packed)
      await optimisticRecipientRegistry.executeRequest(recipientId)


      let tx: ContractTransaction = await optimisticRecipientRegistry.removeRecipient(recipientId)
      let receipt: ContractReceipt = await tx.wait();
      const event = receipt.events.filter((e) => e.event === "RequestSubmitted")[0]
      
      expect(event.event).to.equal("RequestSubmitted")
      expect(event.args._recipientId).to.equal(recipientId)
      //1 is enum value for Removal
      expect(event.args._type).to.equal(1)
      expect(event.args._recipient).to.equal(ethers.constants.AddressZero)
      expect(event.args._metadata).to.equal("")
    })

  })

  describe("challengeRequest()", async () => {

    it("Reverts if request does not exist", async () => {
      const recipient = ethers.Wallet.createRandom()
      const beneficiary = ethers.Wallet.createRandom()
      const packed = ethers.utils.solidityPack(["address", "string"], [recipient.address, "metadata info"])
      const recipientId = ethers.utils.keccak256(packed)
      expect(optimisticRecipientRegistry.challengeRequest(recipientId, beneficiary.address)).
        to.be.revertedWith("RecipientRegistry: Request does not exist")
    })

    it("Succesfully challenges request", async () => {
      const recipient = ethers.Wallet.createRandom()
      await optimisticRecipientRegistry.addRecipient(recipient.address, "metadata info")

      const beneficiary = ethers.Wallet.createRandom()
      const packed = ethers.utils.solidityPack(["address", "string"], [recipient.address, "metadata info"])
      const recipientId = ethers.utils.keccak256(packed)

      let tx: ContractTransaction = await optimisticRecipientRegistry.challengeRequest(recipientId, beneficiary.address)
      let receipt: ContractReceipt = await tx.wait();
      const event = receipt.events.filter((e) => e.event === "RequestResolved")[0]
      expect(event.event).to.equal("RequestResolved")
      expect(event.args._recipientId).to.equal(recipientId)
      //0 is enum value for Registration
      expect(event.args._type).to.equal(0)
      expect(event.args._recipientIndex).to.equal(0)
    })
  })

  describe("executeRequest()", async () => {
    it("Reverts if request does not exist", async () => {
      const recipient = ethers.Wallet.createRandom()
      const packed = ethers.utils.solidityPack(["address", "string"], [recipient.address, "metadata info"])
      const recipientId = ethers.utils.keccak256(packed)
      expect(optimisticRecipientRegistry.executeRequest(recipientId)).
        to.be.revertedWith("RecipientRegistry: Request does not exist")
    })

    it("Reverts non owner request if challenge period is not over", async () => {
      const recipient = ethers.Wallet.createRandom()
      await optimisticRecipientRegistry.addRecipient(recipient.address, "metadata info")

      const packed = ethers.utils.solidityPack(["address", "string"], [recipient.address, "metadata info"])
      const recipientId = ethers.utils.keccak256(packed)
      expect(optimisticRecipientRegistry.connect(addr1).executeRequest(recipientId)).
        to.be.revertedWith('RecipientRegistry: Challenge period is not over')
    })

    it("Succesfully executes request as non owner is challenge period is over", async () => {
      const recipient = ethers.Wallet.createRandom()
      await optimisticRecipientRegistry.addRecipient(recipient.address, "metadata info")
      await optimisticRecipientRegistry.connect(controller).setMaxRecipients(2)
      await ethers.provider.send("evm_increaseTime", [61]);

      const packed = ethers.utils.solidityPack(["address", "string"], [recipient.address, "metadata info"])
      const recipientId = ethers.utils.keccak256(packed)

      let tx: ContractTransaction = await optimisticRecipientRegistry.connect(addr1).executeRequest(recipientId)
      let receipt: ContractReceipt = await tx.wait();
      const event = receipt.events.filter((e) => e.event === "RequestResolved")[0]
      expect(event.args._recipientId).to.equal(recipientId)
      //0 is enum value for Registration
      expect(event.args._type).to.equal(0)
      expect(event.args._recipientIndex).to.equal(1)
    })

    it("Succesfully executes request as owner before challenge period is over", async () => {
      const recipient = ethers.Wallet.createRandom()
      await optimisticRecipientRegistry.addRecipient(recipient.address, "metadata info")
      await optimisticRecipientRegistry.connect(controller).setMaxRecipients(2)

      const packed = ethers.utils.solidityPack(["address", "string"], [recipient.address, "metadata info"])
      const recipientId = ethers.utils.keccak256(packed)

      let tx: ContractTransaction = await optimisticRecipientRegistry.executeRequest(recipientId)
      let receipt: ContractReceipt = await tx.wait();
      const event = receipt.events.filter((e) => e.event === "RequestResolved")[0]
      expect(event.args._recipientId).to.equal(recipientId)
      //0 is enum value for Registration
      expect(event.args._type).to.equal(0)
      expect(event.args._recipientIndex).to.equal(1)
    })

    it("Succesfully executes request as owner after challenge period is over", async () => {
      const recipient = ethers.Wallet.createRandom()
      await optimisticRecipientRegistry.addRecipient(recipient.address, "metadata info")
      await optimisticRecipientRegistry.connect(controller).setMaxRecipients(2)
      await ethers.provider.send("evm_increaseTime", [61]);

      const packed = ethers.utils.solidityPack(["address", "string"], [recipient.address, "metadata info"])
      const recipientId = ethers.utils.keccak256(packed)

      let tx: ContractTransaction = await optimisticRecipientRegistry.executeRequest(recipientId)
      let receipt: ContractReceipt = await tx.wait();
      const event = receipt.events.filter((e) => e.event === "RequestResolved")[0]
      expect(event.args._recipientId).to.equal(recipientId)
      //0 is enum value for Registration
      expect(event.args._type).to.equal(0)
      expect(event.args._recipientIndex).to.equal(1)
    })
  })
}) 
