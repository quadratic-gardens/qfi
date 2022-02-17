import { ethers } from "hardhat";
import { BigNumber, BigNumberish, Signer } from "ethers";
import chai from "chai";
import { solidity } from "ethereum-waffle";
import { Command, Keypair, Message, VerifyingKey } from "maci-domainobjs";
import { G1Point, G2Point } from "maci-crypto";
import { MaciState, genProcessVkSig, genTallyVkSig } from "maci-core";
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
import { MessageStruct, Poll } from "../../typechain/Poll";

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
import { AccQueueQuinaryMaci } from "../../typechain/AccQueueQuinaryMaci";
import { AccQueueQuinaryMaci__factory } from "../../typechain";

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

describe("Merge - Merge Signup and Message leaves", () => {
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
  let MessageAq_Factory: AccQueueQuinaryMaci__factory;
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
  let messageAq: AccQueueQuinaryMaci;

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
  let users: {
    maciKey: Keypair;
    signer: Signer;
  }[] = [];
  const duration = 15;
  const maxValues = {
    maxUsers: 25,
    maxMessages: 25,
    maxVoteOptions: 25,
  };
  const treeDepths = {
    intStateTreeDepth: 1,
    messageTreeDepth: 4,
    messageTreeSubDepth: 2,
    voteOptionTreeDepth: 2,
  };
  const stateTreeDepth = 10;
  const intStateTreeDepth = 1;
  const messageBatchSize = 25;
  const tallyBatchSize = 5 ** intStateTreeDepth;
  let maciState: MaciState;

  beforeEach(async () => {
    [deployer, user1, user2, user3, user4, user5, user6, user7, user8, user9, user10] = await ethers.getSigners();
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
      ["maci-contracts/contracts/crypto/Hasher.sol:PoseidonT5"]: PoseidonT5.address,
      ["maci-contracts/contracts/crypto/Hasher.sol:PoseidonT3"]: PoseidonT3.address,
      ["maci-contracts/contracts/crypto/Hasher.sol:PoseidonT6"]: PoseidonT6.address,
      ["maci-contracts/contracts/crypto/Hasher.sol:PoseidonT4"]: PoseidonT4.address,
    };

    GrantRoundFactory = new GrantRoundFactory__factory({ ...linkedLibraryAddresses }, deployer);
    PollFactoryFactory = new PollFactory__factory({ ...linkedLibraryAddresses }, deployer);
    MessageAqFactoryFactory = new MessageAqFactory__factory({ ...linkedLibraryAddresses }, deployer);
    MessageAq_Factory = new AccQueueQuinaryMaci__factory({ ...linkedLibraryAddresses }, deployer);
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

    await vkRegistry.setVerifyingKeys(
      _stateTreeDepth,
      _intStateTreeDepth,
      _messageTreeDepth,
      _voteOptionTreeDepth,
      _messageBatchSize,
      _processVk,
      _tallyVk
    );

    await vkRegistry.genProcessVkSig(_stateTreeDepth, _messageTreeDepth, _voteOptionTreeDepth, _messageBatchSize);
    await vkRegistry.genTallyVkSig(_stateTreeDepth, _intStateTreeDepth, _voteOptionTreeDepth);
    coordinator = new Keypair();
    const coordinatorPubkey = coordinator.pubKey.asContractParam();

    // NOTE: Create new local maci data structure
    maciState = new MaciState();
    const provider = deployer.provider ?? ethers.getDefaultProvider();

    const userSigners = [user1, user2, user3];
    users = [];
    for (const user of userSigners) {
      const maciKey = new Keypair();
      const _pubKey = maciKey.pubKey.asContractParam();
      const _signUpGatekeeperData = ethers.utils.defaultAbiCoder.encode(["uint256"], [1]);
      const _initialVoiceCreditProxyData = ethers.utils.defaultAbiCoder.encode(["uint256"], [0]);

      const { logs } = await qfi
        .connect(user)
        .signUp(_pubKey, _signUpGatekeeperData, _initialVoiceCreditProxyData)
        .then((tx) => tx.wait());

      const iface = qfi.interface;
      const signUpEvent = iface.parseLog(logs[logs.length - 1]);

      users.push({ maciKey: maciKey, signer: user });
      // NOTE: Signup users on local maci data structure
      maciState.signUp(
        maciKey.pubKey,
        BigInt(signUpEvent.args._voiceCreditBalance.toString()),
        BigInt(signUpEvent.args._timestamp.toString())
      );
    }

    const { blockHash } = await qfi
      .connect(deployer)
      .deployPoll(duration, maxValues, treeDepths, coordinatorPubkey, { gasLimit: 30000000 })
      .then((tx) => tx.wait());

    // NOTE: Deploy the poll on local maci data structure
    const deployTime = (await provider.getBlock(blockHash)).timestamp;
    const p = maciState.deployPoll(
      duration,
      BigInt(deployTime + duration),
      maxValues,
      treeDepths,
      messageBatchSize,
      coordinator
    );
    const pollContractAddress = await qfi.getPoll(0);
    poll = new Poll__factory({ ...linkedLibraryAddresses }, deployer).attach(pollContractAddress);

    for (const user of users) {
      const { maciKey, signer } = user;
      const _stateIndex = BigInt(1);
      const _newPubKey = maciKey.pubKey;
      const _voteOptionIndex = BigInt(0);
      const _newVoteWeight = BigInt(9);
      const _nonce = BigInt(1);
      const _pollId = BigInt(0);
      const _salt = BigInt(0);
      const command = new Command(_stateIndex, _newPubKey, _voteOptionIndex, _newVoteWeight, _nonce, _pollId, _salt);

      const signature = command.sign(maciKey.privKey);
      const sharedKey = Keypair.genEcdhSharedKey(maciKey.privKey, coordinator.pubKey);
      const message = command.encrypt(signature, sharedKey);
      const _message = <MessageStruct>message.asContractParam();
      const _encPubKey = maciKey.pubKey.asContractParam();
      const { logs } = await poll
        .connect(signer)
        .publishMessage(_message, _encPubKey)
        .then((tx) => tx.wait());

      // NOTE: Publish the message on local maci data structure
      maciState.polls[_pollId].publishMessage(message, maciKey.pubKey);
    }

    const dd = await poll.getDeployTimeAndDuration();
    const hardHatProvider = ethers.provider;
    await hardHatProvider.send("evm_increaseTime", [Number(dd[1]) + 1]);
    await hardHatProvider.send("evm_mine", []);

    const extContracts = await poll.extContracts();

    const messageAqAddress = extContracts.messageAq;
    messageAq = MessageAq_Factory.attach(messageAqAddress);
  });

  it("expect revert - voting period is over", async () => {
    const keypair = users[0].maciKey;

    const command = new Command(BigInt(1), keypair.pubKey, BigInt(0), BigInt(9), BigInt(1), BigInt(0), BigInt(0));

    const signature = command.sign(keypair.privKey);
    const sharedKey = Keypair.genEcdhSharedKey(keypair.privKey, coordinator.pubKey);
    const message = command.encrypt(signature, sharedKey);

    const _message = <MessageStruct>message.asContractParam();
    const _encPubKey = keypair.pubKey.asContractParam();

    await expect(poll.publishMessage(_message, _encPubKey)).to.be.revertedWith("PollE03");
  });

  describe("Merge and calculate tree roots", () => {
    // event MergeMaciStateAqSubRoots(uint256 _numSrQueueOps);
    // event MergeMaciStateAq(uint256 _stateRoot);
    // event MergeMessageAqSubRoots(uint256 _numSrQueueOps);
    // event MergeMessageAq(uint256 _messageRoot);
    it("verify - merge the message AccQueue", async () => {
      await expect(poll.mergeMessageAqSubRoots(0)).to.emit(poll, "MergeMessageAqSubRoots").withArgs(0);
      await expect(poll.mergeMessageAq()).to.emit(poll, "MergeMessageAq");
    });
    it("verify - merge the MaciStateAq ", async () => {
      await expect(poll.mergeMaciStateAqSubRoots(0, 0)).to.emit(poll, "MergeMaciStateAqSubRoots").withArgs(0);
      await expect(poll.mergeMaciStateAq(0)).to.emit(poll, "MergeMaciStateAq");
    });
    it("require fail - cannot merge messages twice", async () => {
      await expect(poll.mergeMessageAqSubRoots(0)).to.emit(poll, "MergeMessageAqSubRoots");
      await expect(poll.mergeMessageAq()).to.emit(poll, "MergeMessageAq");
      await expect(poll.mergeMessageAqSubRoots(0)).to.be.revertedWith("AccQueue: subtrees already merged");
    });
    it("require fail - cannot merge state twice", async () => {
      await expect(poll.mergeMaciStateAqSubRoots(0, 0)).to.emit(poll, "MergeMaciStateAqSubRoots");
      await expect(poll.mergeMaciStateAq(0)).to.emit(poll, "MergeMaciStateAq");
      await expect(poll.mergeMaciStateAqSubRoots(0, 0)).to.be.revertedWith("PollE07");
      await expect(poll.mergeMaciStateAq(0)).to.be.revertedWith("PollE07");
    });
    it("verify - correctly merges messageAq", async () => {
      const maciPoll = maciState.polls[0];
      maciPoll.messageAq.mergeSubRoots(0); //NOTE: 0 as input attempts to merge all subroots
      maciPoll.messageAq.merge(treeDepths.messageTreeDepth);
      const expectedMessageRoot = maciState.polls[0].messageAq.mainRoots[treeDepths.messageTreeDepth].toString();

      await expect(poll.mergeMessageAqSubRoots(0)).to.emit(poll, "MergeMessageAqSubRoots").withArgs(0);
      await expect(poll.mergeMessageAq()).to.emit(poll, "MergeMessageAq").withArgs(expectedMessageRoot);
    });

    it("verify - correctly merges stateAq", async () => {
      const maciPoll = maciState.polls[0];
      maciPoll.messageAq.mergeSubRoots(0); //NOTE: 0 as input attempts to merge all subroots
      maciPoll.messageAq.merge(treeDepths.messageTreeDepth);
      const expectedMessageRoot = maciState.polls[0].messageAq.mainRoots[treeDepths.messageTreeDepth].toString();

      await expect(poll.mergeMessageAqSubRoots(0)).to.emit(poll, "MergeMessageAqSubRoots").withArgs(0);
      await expect(poll.mergeMessageAq()).to.emit(poll, "MergeMessageAq").withArgs(expectedMessageRoot);

      const maciStateAq = maciState.stateAq;
      maciStateAq.mergeSubRoots(0); // 0 as input attempts to merge all subroots
      maciStateAq.merge(stateTreeDepth);
      const expectedStateRoot = maciState.stateAq.mainRoots[stateTreeDepth].toString();

      await expect(poll.mergeMaciStateAqSubRoots(0, 0)).to.emit(poll, "MergeMaciStateAqSubRoots").withArgs(0);
      await expect(poll.mergeMaciStateAq(0))
         .to.emit(poll, "MergeMaciStateAq")
         .withArgs(expectedStateRoot);
    });
  });

  
});
