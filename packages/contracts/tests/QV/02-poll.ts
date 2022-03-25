import { ethers } from "hardhat";
import { BigNumber, BigNumberish, Signer } from "ethers";
import chai from "chai";
import { solidity } from "ethereum-waffle";
import { Keypair, VerifyingKey } from "qaci-domainobjs";
import { G1Point, G2Point } from "qaci-crypto";

import { PoseidonT3 } from "../../typechain/PoseidonT3";
import { PoseidonT3__factory } from "../../typechain/factories/PoseidonT3__factory";

import { PoseidonT4 } from "../../typechain/PoseidonT4";
import { PoseidonT4__factory } from "../../typechain/factories/PoseidonT4__factory";

import { PoseidonT5 } from "../../typechain/PoseidonT5";
import { PoseidonT5__factory } from "../../typechain/factories/PoseidonT5__factory";

import { PoseidonT6 } from "../../typechain/PoseidonT6";
import { PoseidonT6__factory } from "../../typechain/factories/PoseidonT6__factory";

import {
  GrantRoundFactoryLibraryAddresses,
  GrantRoundFactory__factory,
} from "../../typechain/factories/GrantRoundFactory__factory";
import { PollFactory__factory, PollFactoryLibraryAddresses } from "../../typechain/factories/PollFactory__factory";

import {
  MessageAqFactory__factory,
  MessageAqFactoryLibraryAddresses,
} from "../../typechain/factories/MessageAqFactory__factory";
import { QFI__factory, QFILibraryAddresses } from "../../typechain/factories/QFI__factory";

import { GrantRoundFactory } from "../../typechain/GrantRoundFactory";
import { PollFactory } from "../../typechain/PollFactory";
import { MessageAqFactory } from "../../typechain/MessageAqFactory";
import { QFI } from "../../typechain/QFI";
import { Poll__factory } from "../../typechain/factories/Poll__factory";
import { Poll } from "../../typechain/Poll";

import { VkRegistry__factory } from "../../typechain/factories/VkRegistry__factory";
import { FreeForAllGatekeeper__factory } from "../../typechain/factories/FreeForAllGatekeeper__factory";
import { ConstantInitialVoiceCreditProxy__factory } from "../../typechain/factories/ConstantInitialVoiceCreditProxy__factory";

import { VerifyingKeyStruct, VkRegistry } from "../../typechain/VkRegistry";
import { FreeForAllGatekeeper } from "../../typechain/FreeForAllGatekeeper";
import { ConstantInitialVoiceCreditProxy } from "../../typechain/ConstantInitialVoiceCreditProxy";

import { OptimisticRecipientRegistry } from "../../typechain/OptimisticRecipientRegistry";
import { OptimisticRecipientRegistry__factory } from "../../typechain/factories/OptimisticRecipientRegistry__factory";

import { BaseERC20Token } from "../../typechain/BaseERC20Token";
import { BaseERC20Token__factory } from "../../typechain/factories/BaseERC20Token__factory";

import { PollProcessorAndTallyer } from "../../typechain/PollProcessorAndTallyer";
import { PollProcessorAndTallyer__factory } from "../../typechain/factories/PollProcessorAndTallyer__factory";

import { MockVerifier } from "../../typechain/MockVerifier";
import { MockVerifier__factory } from "../../typechain/factories/MockVerifier__factory";

chai.use(solidity);
const { expect } = chai;
const testProcessVk = new VerifyingKey(
  new G1Point(BigInt(0), BigInt(1)),
  new G2Point([BigInt(2), BigInt(3)], [BigInt(4), BigInt(5)]),
  new G2Point([BigInt(6), BigInt(7)], [BigInt(8), BigInt(9)]),
  new G2Point([BigInt(10), BigInt(11)], [BigInt(12), BigInt(13)]),
  [new G1Point(BigInt(14), BigInt(15)), new G1Point(BigInt(16), BigInt(17))]
);

const testTallyVk = new VerifyingKey(
  new G1Point(BigInt(0), BigInt(1)),
  new G2Point([BigInt(2), BigInt(3)], [BigInt(4), BigInt(5)]),
  new G2Point([BigInt(6), BigInt(7)], [BigInt(8), BigInt(9)]),
  new G2Point([BigInt(10), BigInt(11)], [BigInt(12), BigInt(13)]),
  [new G1Point(BigInt(14), BigInt(15)), new G1Point(BigInt(16), BigInt(17))]
);

type IVerifyingKey = {
  alpha1: {
    x: string;
    y: string;
  };
  beta2: {
    x: [BigNumberish, BigNumberish];
    y: string[];
  };
  gamma2: {
    x: string[];
    y: string[];
  };
  delta2: {
    x: string[];
    y: string[];
  };
  ic: {
    x: BigNumberish;
    y: BigNumberish;
  }[];
};

describe("Poll - New QV Voting Round", () => {
  let deployer: Signer;
  let user1: Signer;
  let user2: Signer;
  let user3: Signer;
  let user4: Signer;
  let user5: Signer;
  let user6: Signer;
  let user7: Signer;
  let user8: Signer;
  let user9: Signer;
  let user10: Signer;
  let user11: Signer;
  let user12: Signer;
  let user13: Signer;
  let user14: Signer;
  let user15: Signer;
  let user16: Signer;
  let user17: Signer;
  let user18: Signer;
  let user19: Signer;
  let user20: Signer;
  let user21: Signer;
  let user22: Signer;
  let user23: Signer;
  let user24: Signer;
  let user25: Signer;
  let user26: Signer;
  let project1: Signer;
  let project2: Signer;
  let project3: Signer;
  let deployerAddress: string;
  let PoseidonT3Factory: PoseidonT3__factory;
  let PoseidonT4Factory: PoseidonT4__factory;
  let PoseidonT5Factory: PoseidonT5__factory;
  let PoseidonT6Factory: PoseidonT6__factory;

  let linkedLibraryAddresses:
    | QFILibraryAddresses
    | PollFactoryLibraryAddresses
    | MessageAqFactoryLibraryAddresses
    | GrantRoundFactoryLibraryAddresses;
  let GrantRoundFactory: GrantRoundFactory__factory;
  let PollFactoryFactory: PollFactory__factory;
  let MessageAqFactoryFactory: MessageAqFactory__factory;

  let FreeForAllGateKeeperFactory: FreeForAllGatekeeper__factory;
  let ConstantInitialVoiceCreditProxyFactory: ConstantInitialVoiceCreditProxy__factory;
  let VKRegistryFactory: VkRegistry__factory;

  let RecipientRegistryFactory: OptimisticRecipientRegistry__factory;
  let BaseERC20TokenFactory: BaseERC20Token__factory;
  let PollProcessorAndTallyerFactory: PollProcessorAndTallyer__factory;
  let MockVerifierFactory: MockVerifier__factory;

  let QFIFactory: QFI__factory;

  let PoseidonT3: PoseidonT3;
  let PoseidonT4: PoseidonT4;
  let PoseidonT5: PoseidonT5;
  let PoseidonT6: PoseidonT6;
  let grantRoundFactory: GrantRoundFactory;
  let pollFactory: PollFactory;
  let messageAqFactory: MessageAqFactory;
  let messageAqFactoryGrants: MessageAqFactory;
  let vkRegistry: VkRegistry;
  let constantInitialVoiceCreditProxy: ConstantInitialVoiceCreditProxy;
  let freeForAllGateKeeper: FreeForAllGatekeeper;
  let optimisticRecipientRegistry: OptimisticRecipientRegistry;
  let baseERC20Token: BaseERC20Token;
  let pollProcessorAndTallyer: PollProcessorAndTallyer;
  let mockVerifier: MockVerifier;
  let qfi: QFI;
  let coordinator: Keypair;
  let poll: Poll;

  beforeEach(async () => {
    [
      deployer,
      user1,
      user2,
      user3,
      user4,
      user5,
      user6,
      user7,
      user8,
      user9,
      user10,
      user11,
      user12,
      user13,
      user14,
      user15,
      user16,
      user17,
      user18,
      user19,
      user20,
      user21,
      user22,
      user23,
      user24,
      user25,
      user26,
    ] = await ethers.getSigners();

    ethers.Wallet.createRandom();
    deployerAddress = await deployer.getAddress();
    PoseidonT3Factory = new PoseidonT3__factory(deployer);
    PoseidonT4Factory = new PoseidonT4__factory(deployer);
    PoseidonT5Factory = new PoseidonT5__factory(deployer);
    PoseidonT6Factory = new PoseidonT6__factory(deployer);
    PoseidonT3 = await PoseidonT3Factory.deploy();
    PoseidonT4 = await PoseidonT4Factory.deploy();
    PoseidonT5 = await PoseidonT5Factory.deploy();
    PoseidonT6 = await PoseidonT6Factory.deploy();

    linkedLibraryAddresses = {
      ["qaci-contracts/contracts/crypto/Hasher.sol:PoseidonT5"]: PoseidonT5.address,
      ["qaci-contracts/contracts/crypto/Hasher.sol:PoseidonT3"]: PoseidonT3.address,
      ["qaci-contracts/contracts/crypto/Hasher.sol:PoseidonT6"]: PoseidonT6.address,
      ["qaci-contracts/contracts/crypto/Hasher.sol:PoseidonT4"]: PoseidonT4.address,
    };

    GrantRoundFactory = new GrantRoundFactory__factory({ ...linkedLibraryAddresses }, deployer);
    PollFactoryFactory = new PollFactory__factory({ ...linkedLibraryAddresses }, deployer);
    MessageAqFactoryFactory = new MessageAqFactory__factory({ ...linkedLibraryAddresses }, deployer);
    QFIFactory = new QFI__factory({ ...linkedLibraryAddresses }, deployer);

    VKRegistryFactory = new VkRegistry__factory(deployer);
    ConstantInitialVoiceCreditProxyFactory = new ConstantInitialVoiceCreditProxy__factory(deployer);
    FreeForAllGateKeeperFactory = new FreeForAllGatekeeper__factory(deployer);
    RecipientRegistryFactory = new OptimisticRecipientRegistry__factory(deployer);
    BaseERC20TokenFactory = new BaseERC20Token__factory(deployer);
    PollProcessorAndTallyerFactory = new PollProcessorAndTallyer__factory(deployer);
    MockVerifierFactory = new MockVerifier__factory(deployer);

    optimisticRecipientRegistry = await RecipientRegistryFactory.deploy(0, 0, deployerAddress);
    grantRoundFactory = await GrantRoundFactory.deploy();
    grantRoundFactory.setRecipientRegistry(optimisticRecipientRegistry.address);
    pollFactory = await PollFactoryFactory.deploy();
    messageAqFactory = await MessageAqFactoryFactory.deploy();
    messageAqFactoryGrants = await MessageAqFactoryFactory.deploy();
    freeForAllGateKeeper = await FreeForAllGateKeeperFactory.deploy();
    //NOTE: each user recieves 100 voice credits by default
    constantInitialVoiceCreditProxy = await ConstantInitialVoiceCreditProxyFactory.deploy(100);
    vkRegistry = await VKRegistryFactory.deploy();
    baseERC20Token = await BaseERC20TokenFactory.deploy(100);
    mockVerifier = await MockVerifierFactory.deploy();
    pollProcessorAndTallyer = await PollProcessorAndTallyerFactory.deploy(mockVerifier.address);

    qfi = await QFIFactory.deploy(
      baseERC20Token.address,
      grantRoundFactory.address,
      pollFactory.address,
      freeForAllGateKeeper.address,
      constantInitialVoiceCreditProxy.address
    );
    await pollFactory.transferOwnership(qfi.address);
    await grantRoundFactory.transferOwnership(qfi.address);
    await messageAqFactory.transferOwnership(pollFactory.address);
    await messageAqFactoryGrants.transferOwnership(grantRoundFactory.address);
    await qfi.initialize(vkRegistry.address, messageAqFactory.address, messageAqFactoryGrants.address);

    const stateTreeDepth = await qfi.stateTreeDepth();
    const _stateTreeDepth = stateTreeDepth.toString();
    const _intStateTreeDepth = 1;
    const _messageTreeDepth = 4;
    const _voteOptionTreeDepth = 2;
    const _messageBatchSize = 25;
    const _processVk = <VerifyingKeyStruct>testProcessVk.asContractParam();
    const _tallyVk = <VerifyingKeyStruct>testTallyVk.asContractParam();

    const { status } = await vkRegistry
      .setVerifyingKeys(
        _stateTreeDepth,
        _intStateTreeDepth,
        _messageTreeDepth,
        _voteOptionTreeDepth,
        _messageBatchSize,
        _processVk,
        _tallyVk
      )
      .then((tx) => tx.wait());
    const pSig = await vkRegistry.genProcessVkSig(
      _stateTreeDepth,
      _messageTreeDepth,
      _voteOptionTreeDepth,
      _messageBatchSize
    );
    const tSig = await vkRegistry.genTallyVkSig(_stateTreeDepth, _intStateTreeDepth, _voteOptionTreeDepth);
    coordinator = new Keypair();
  });

  describe("User Sign Ups", () => {
    it("verify - allows one user to sign up to maci with correct parameters", async () => {
      const provider = user1.provider ?? ethers.getDefaultProvider();
      const maciKey = new Keypair();

      const _pubKey = maciKey.pubKey.asContractParam();

      const _signUpGatekeeperData = ethers.utils.defaultAbiCoder.encode(["uint256"], [1]);
      const _initialVoiceCreditProxyData = ethers.utils.defaultAbiCoder.encode(["uint256"], [0]);

      const expectedStateIndex = "1";
      const expectedIntialVoiceCredits = 100;
      const expectedPubKey = Object.values(_pubKey);
      const expectedTimeStamp = (await provider.getBlock("latest")).timestamp + 1;

      await expect(qfi.connect(user1).signUp(_pubKey, _signUpGatekeeperData, _initialVoiceCreditProxyData))
        .to.emit(qfi, "SignUp")
        .withArgs(expectedStateIndex, expectedPubKey, expectedIntialVoiceCredits, expectedTimeStamp);
    });

    it("verify - allows two users to sign up to maci with correct parameters", async () => {
      const provider = user1.provider ?? ethers.getDefaultProvider();
      const timeStamp = (await provider.getBlock("latest")).timestamp;

      const signups = await [user2, user3].map(async (user, index) => {
        const maciKey = new Keypair();
        const _pubKey = maciKey.pubKey.asContractParam();
        const _signUpGatekeeperData = ethers.utils.defaultAbiCoder.encode(["uint256"], [1]);
        const _initialVoiceCreditProxyData = ethers.utils.defaultAbiCoder.encode(["uint256"], [0]);
        const expectedPubKey = Object.values(_pubKey);
        const expectedStateIndex = index + 1 + "";
        const expectedIntialVoiceCredits = 100;
        //NOTE: each transaction will tick 1 🤷
        const expectedTimeStamp = timeStamp + index + 1;

        return expect(qfi.connect(user).signUp(_pubKey, _signUpGatekeeperData, _initialVoiceCreditProxyData))
          .to.emit(qfi, "SignUp")
          .withArgs(expectedStateIndex, expectedPubKey, expectedIntialVoiceCredits, expectedTimeStamp);
      });
      await Promise.all(signups);
    });

    it("verify - allows many users to sign up to maci with correct parameters", async () => {
      const userSigners = [
        user1,
        user2,
        user3,
        user4,
        user5,
        user6,
        user7,
        user8,
        user9,
        user10,
        user11,
        user12,
        user13,
        user14,
        user15,
        user16,
        user17,
        user18,
        user19,
        user20,
        user21,
        user22,
        user23,
        user24,
        user25,
      ];
      for (const user of userSigners) {
        const maciKey = new Keypair();
        const _pubKey = maciKey.pubKey.asContractParam();
        const _signUpGatekeeperData = ethers.utils.defaultAbiCoder.encode(["uint256"], [1]);
        const _initialVoiceCreditProxyData = ethers.utils.defaultAbiCoder.encode(["uint256"], [0]);
        await expect(qfi.connect(user).signUp(_pubKey, _signUpGatekeeperData, _initialVoiceCreditProxyData)).to.emit(
          qfi,
          "SignUp"
        );
      }
    });

    it("require fail - sign up fails with invalid keys", async () => {
      const _badPubKey = {
        x: "21888242871839275222246405745257275088548364400416034343698204186575808495617",
        y: "0",
      };
      const _signUpGatekeeperData = ethers.utils.defaultAbiCoder.encode(["uint256"], [1]);
      const _initialVoiceCreditProxyData = ethers.utils.defaultAbiCoder.encode(["uint256"], [0]);

      await expect(
        qfi.connect(user4).signUp(_badPubKey, _signUpGatekeeperData, _initialVoiceCreditProxyData)
      ).to.be.revertedWith("MACI: _pubKey values should be less than the snark scalar field");
    });
  });
  describe("Create a new Poll", () => {
    const _duration = 15;
    const _maxValues = {
      maxUsers: 25,
      maxMessages: 25,
      maxVoteOptions: 25,
    };
    const _treeDepths = {
      intStateTreeDepth: 1,
      messageTreeDepth: 4,
      messageTreeSubDepth: 2,
      voteOptionTreeDepth: 2,
    };
    const _intStateTreeDepth = 1;
    const _messageBatchSize = 25;
    const _tallyBatchSize = 5 ** _intStateTreeDepth;
    coordinator = new Keypair();
    const _coordinatorPubkey = coordinator.pubKey.asContractParam();

    const expectedPollId = "0";
    //const expectedPollAddress = "0x4aAa546748B9b4DBaa3A1C58f0DD1b2d3C6E97Ef"; // NOTE: nonce hack to get the poll address. Use this for Integration test
    const expectedPollAddress = "0xb22F17625EC8fD0173098Ae0C04485FD3F11BD19"; // NOTE: nonce hack to get the poll address. Use this for Unit test

    const expectedCoordinatorPublicKey = Object.values(_coordinatorPubkey);

    it("verify - deploys a new poll correctly", async () => {
      const provider = deployer.provider ?? ethers.getDefaultProvider();

      await expect(qfi.deployPoll(_duration, _maxValues, _treeDepths, _coordinatorPubkey))
        .to.emit(qfi, "DeployPoll")
        .withArgs(expectedPollId, expectedPollAddress, expectedCoordinatorPublicKey);

      const expectedTimeStamp = BigNumber.from((await provider.getBlock("latest")).timestamp);
      const expectedDuration = BigNumber.from(_duration);
      const pollContractAddress = await qfi.getPoll(0);
      poll = new Poll__factory({ ...linkedLibraryAddresses }, deployer).attach(pollContractAddress);
      const deployTimeandDuration = await poll.getDeployTimeAndDuration();

      expect([...deployTimeandDuration]).to.deep.equal([expectedTimeStamp, expectedDuration]);

      expect(await poll.stateAqMerged()).to.be.false;
      expect((await poll.currentSbCommitment()).toString()).to.equal("0");
      expect(Number((await poll.numSignUpsAndMessages())[0])).to.equal(0);
      expect(Number((await poll.numSignUpsAndMessages())[1])).to.equal(0);

      const onChainMaxValues = await poll.maxValues();
      expect([onChainMaxValues.maxMessages, onChainMaxValues.maxVoteOptions]).to.deep.equal([
        BigNumber.from(_maxValues.maxMessages),
        BigNumber.from(_maxValues.maxVoteOptions),
      ]);

      const onChainTreeDepths = await poll.treeDepths();
      expect([
        onChainTreeDepths.intStateTreeDepth,
        onChainTreeDepths.messageTreeSubDepth,
        onChainTreeDepths.messageTreeDepth,
        onChainTreeDepths.voteOptionTreeDepth,
      ]).to.deep.equal([
        _treeDepths.intStateTreeDepth,
        _treeDepths.messageTreeSubDepth,
        _treeDepths.messageTreeDepth,
        _treeDepths.voteOptionTreeDepth,
      ]);
      const onChainBatchSizes = await poll.batchSizes();
      expect([onChainBatchSizes.messageBatchSize, onChainBatchSizes.tallyBatchSize]).to.deep.equal([
        _messageBatchSize,
        _tallyBatchSize,
      ]);
    });
  });
});
