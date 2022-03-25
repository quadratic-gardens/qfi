import { ethers } from "hardhat";
import { ContractTransaction, Signer, constants } from "ethers";
import chai from "chai";
import {
  deployContract,
  deployMockContract,
  MockContract,
  solidity,
} from "ethereum-waffle";
import { GrantRoundFactory } from "../../typechain/GrantRoundFactory";
import {
  GrantRoundFactory__factory,
  PoseidonT3__factory,
  PoseidonT4__factory,
  PoseidonT5__factory,
  PoseidonT6__factory,
} from "../../typechain";
import MessageAqFactoryAbi from "../../abi/qaci-contracts/contracts/Poll.sol/MessageAqFactory.json";
import MessageAqAbi from "../../abi/qaci-contracts/contracts/trees/AccQueue.sol/AccQueue.json";
import RecipientRegistryAbi from "../../abi/contracts/recipientRegistry/OptimisticRecipientRegistry.sol/OptimisticRecipientRegistry.json";
import QfiAbi from "../../abi/contracts/QFI.sol/QFI.json";
import BaseERC20TokenAbi from "../../abi/@openzeppelin/contracts/token/ERC20/ERC20.sol/ERC20.json";
import VkRegistryAbi from "../../abi/qaci-contracts/contracts/VkRegistry.sol/VkRegistry.json";
import GrantRoundAbi from "../../abi/contracts/GrantRound.sol/GrantRound.json";
import { Keypair } from "qaci-domainobjs";

chai.use(solidity);
const { expect } = chai;

// Unit tests for Grant Round Factory smart contract.
describe("Grant Round Factory", () => {
  // Signers.
  let deployer: Signer;
  let coordinator: Signer;
  let coordinatorAddress: string;

  // Grant Round Factory instance.
  let grantRoundFactory: GrantRoundFactory;

  // Mock contracts.
  let mockMessageAqFactory: MockContract;
  let mockRecipientRegistry: MockContract;
  let mockBaseERC20Token: MockContract;
  let mockQfi: MockContract;
  let mockVkRegistry: MockContract;
  let mockGrantRound: MockContract;
  let mockMessageAq: MockContract;

  // Pre-computed data.
  const decimals = 5;
  const voiceCreditFactor =
    (BigInt(10 ** 4) * BigInt(10 ** decimals)) / BigInt(10 ** 9);

  // Input parameters for GrantRound methods.
  // Deploy Grant Round.
  const duration = 30;
  const maxValues = {
    maxMessages: 25,
    maxVoteOptions: 25,
  };
  const treeDepths = {
    intStateTreeDepth: 2,
    messageTreeDepth: 2,
    messageTreeSubDepth: 2,
    voteOptionTreeDepth: 2,
  };
  const defaultMessageTreeArity = 5;
  const defaultStateTreeArity = 5;
  const batchSizes = {
    messageBatchSize: defaultMessageTreeArity ** treeDepths.messageTreeSubDepth,
    tallyBatchSize: defaultStateTreeArity ** treeDepths.intStateTreeDepth,
  };

  beforeEach(async () => {
    // Get signers.
    [deployer, coordinator] = await ethers.getSigners();
    coordinatorAddress = await coordinator.getAddress();

    // Poseidon libraries.
    const poseidonT3 = await deployContract(deployer, PoseidonT3__factory, []);
    const poseidonT4 = await deployContract(deployer, PoseidonT4__factory, []);
    const poseidonT5 = await deployContract(deployer, PoseidonT5__factory, []);
    const poseidonT6 = await deployContract(deployer, PoseidonT6__factory, []);

    // nb. workaround due it's not possible to use Waffle library for linking libraries.
    // ISSUE -> https://github.com/EthWorks/Waffle/issues/429.
    const GrantRoundFactoryFactory = new GrantRoundFactory__factory(
      {
        ["qaci-contracts/contracts/crypto/Hasher.sol:PoseidonT5"]:
          poseidonT5.address,
        ["qaci-contracts/contracts/crypto/Hasher.sol:PoseidonT3"]:
          poseidonT3.address,
        ["qaci-contracts/contracts/crypto/Hasher.sol:PoseidonT6"]:
          poseidonT6.address,
        ["qaci-contracts/contracts/crypto/Hasher.sol:PoseidonT4"]:
          poseidonT4.address,
      },
      deployer
    );

    // Deploy Grant Round Factory.
    grantRoundFactory = await GrantRoundFactoryFactory.deploy();
  });

  it("verify - initializes properly", async () => {
    // Wait for the deploy tx.
    const grantRoundFactoryDeployTransaction: ContractTransaction =
      grantRoundFactory.deployTransaction;
    const txReceipt = await grantRoundFactoryDeployTransaction.wait();

    expect(txReceipt.status).to.not.equal(0);
    expect(txReceipt.contractAddress).to.equal(grantRoundFactory.address);
  });

  it("verify - configured properly", async () => {
    expect(await grantRoundFactory.messageAqFactory()).to.equal(
      constants.AddressZero
    );
    expect(await grantRoundFactory.recipientRegistry()).to.equal(
      constants.AddressZero
    );
  });

  describe("setMessageAqFactory()", async () => {
    beforeEach(async () => {
      // Mocks.
      mockMessageAqFactory = await deployMockContract(
        deployer,
        MessageAqFactoryAbi
      );
    });

    it("allow owner to set message aq factory contract", async () => {
      await expect(
        grantRoundFactory
          .connect(deployer)
          .setMessageAqFactory(mockMessageAqFactory.address)
      )
        .to.emit(grantRoundFactory, "MessageAqFactoryChanged")
        .withArgs(mockMessageAqFactory.address);
    });

    it("allow owner to change message aq factory contract", async () => {
      // Set.
      await expect(
        grantRoundFactory
          .connect(deployer)
          .setMessageAqFactory(mockMessageAqFactory.address)
      )
        .to.emit(grantRoundFactory, "MessageAqFactoryChanged")
        .withArgs(mockMessageAqFactory.address);

      mockMessageAqFactory = await deployMockContract(
        deployer,
        MessageAqFactoryAbi
      );

      expect(await grantRoundFactory.messageAqFactory()).to.be.not.equal(
        constants.AddressZero
      );
      expect(await grantRoundFactory.messageAqFactory()).to.be.not.equal(
        mockMessageAqFactory.address
      );

      // Should change.
      await expect(
        grantRoundFactory
          .connect(deployer)
          .setMessageAqFactory(mockMessageAqFactory.address)
      )
        .to.emit(grantRoundFactory, "MessageAqFactoryChanged")
        .withArgs(mockMessageAqFactory.address);
    });

    it("revert - sender is not owner", async () => {
      await expect(
        grantRoundFactory
          .connect(coordinator)
          .setMessageAqFactory(mockMessageAqFactory.address)
      ).to.be.revertedWith("Ownable: caller is not the owner");
    });
  });

  describe("setRecipientRegistry()", async () => {
    beforeEach(async () => {
      // Mocks.
      mockRecipientRegistry = await deployMockContract(
        deployer,
        RecipientRegistryAbi
      );
    });

    it("allow owner to set recipient registry contract", async () => {
      await expect(
        grantRoundFactory
          .connect(deployer)
          .setRecipientRegistry(mockRecipientRegistry.address)
      )
        .to.emit(grantRoundFactory, "RecipientRegistryChanged")
        .withArgs(mockRecipientRegistry.address);
    });

    it("allow owner to change recipient registry contract", async () => {
      // Set.
      await expect(
        grantRoundFactory
          .connect(deployer)
          .setRecipientRegistry(mockRecipientRegistry.address)
      )
        .to.emit(grantRoundFactory, "RecipientRegistryChanged")
        .withArgs(mockRecipientRegistry.address);

      mockRecipientRegistry = await deployMockContract(
        deployer,
        RecipientRegistryAbi
      );

      expect(await grantRoundFactory.recipientRegistry()).to.be.not.equal(
        constants.AddressZero
      );
      expect(await grantRoundFactory.recipientRegistry()).to.be.not.equal(
        mockRecipientRegistry.address
      );

      // Should change.
      await expect(
        grantRoundFactory
          .connect(deployer)
          .setRecipientRegistry(mockRecipientRegistry.address)
      )
        .to.emit(grantRoundFactory, "RecipientRegistryChanged")
        .withArgs(mockRecipientRegistry.address);
    });

    it("revert - sender is not owner", async () => {
      await expect(
        grantRoundFactory
          .connect(coordinator)
          .setRecipientRegistry(mockRecipientRegistry.address)
      ).to.be.revertedWith("Ownable: caller is not the owner");
    });
  });

  describe("deployGrantRound()", async () => {
    // Input parameters.
    const coordinatorKeys = new Keypair();
    // TODO: workaround to dinamically mock the
    // 'messageAq.transferOwnership(address(grantRound));' call in deployGrantRound().
    // THIS ONLY WORKS WHEN RUNNING 'yarn coverage'.
    // This address has been obtained throungh hardhat console.log() debugging feature because
    // cannot be predicted/mocked in other ways (i.e., it's a new not a method, so cannot be mocked out).
    const expectedGrantRoundAddress =
      "0x33cdaa704a16ac6c83bc90e751623b67d5182993";

    beforeEach(async () => {
      // Mocks.
      mockQfi = await deployMockContract(deployer, QfiAbi);

      mockBaseERC20Token = await deployMockContract(
        deployer,
        BaseERC20TokenAbi
      );

      mockVkRegistry = await deployMockContract(deployer, VkRegistryAbi);

      mockGrantRound = await deployMockContract(deployer, GrantRoundAbi);

      mockMessageAq = await deployMockContract(deployer, MessageAqAbi);
    });

    it("allow owner to deploy a grant round", async () => {
      // Set MessageAqFactory.
      await expect(
        grantRoundFactory
          .connect(deployer)
          .setMessageAqFactory(mockMessageAqFactory.address)
      )
        .to.emit(grantRoundFactory, "MessageAqFactoryChanged")
        .withArgs(mockMessageAqFactory.address);

      // Mocks.
      await mockMessageAqFactory.mock.deploy
        .withArgs(treeDepths.messageTreeSubDepth)
        .returns(mockMessageAq.address);
      await mockMessageAq.mock.transferOwnership
        .withArgs(expectedGrantRoundAddress)
        .returns();
      await mockGrantRound.mock.transferOwnership
        .withArgs(coordinatorAddress)
        .returns();

      await grantRoundFactory
        .connect(deployer)
        .deployGrantRound(
          voiceCreditFactor,
          coordinatorAddress,
          mockBaseERC20Token.address,
          duration,
          maxValues,
          treeDepths,
          batchSizes,
          coordinatorKeys.pubKey.asContractParam(),
          mockVkRegistry.address,
          mockQfi.address,
          coordinatorAddress
        );
    });

    it("revert - sender is not owner", async () => {
      await expect(
        grantRoundFactory
          .connect(coordinator)
          .deployGrantRound(
            voiceCreditFactor,
            coordinatorAddress,
            mockBaseERC20Token.address,
            duration,
            maxValues,
            treeDepths,
            batchSizes,
            coordinatorKeys.pubKey.asContractParam(),
            mockVkRegistry.address,
            mockQfi.address,
            coordinatorAddress
          )
      ).to.be.revertedWith("Ownable: caller is not the owner");
    });

    it("revert - invalid max values", async () => {
      const invalidMaxValues = {
        maxMessages: 1,
        maxVoteOptions: 1,
      };

      await expect(
        grantRoundFactory
          .connect(deployer)
          .deployGrantRound(
            voiceCreditFactor,
            coordinatorAddress,
            mockBaseERC20Token.address,
            duration,
            invalidMaxValues,
            treeDepths,
            batchSizes,
            coordinatorKeys.pubKey.asContractParam(),
            mockVkRegistry.address,
            mockQfi.address,
            coordinatorAddress
          )
      ).to.be.revertedWith("PollFactory: invalid _maxValues");
    });
  });
});
