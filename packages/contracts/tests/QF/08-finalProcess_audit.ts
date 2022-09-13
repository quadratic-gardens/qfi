import { ethers } from "hardhat";
import { BigNumber, BigNumberish, Signer } from "ethers";
import chai from "chai";
import { solidity } from "ethereum-waffle";
import { Command, Keypair, Message, VerifyingKey } from "qaci-domainobjs";
import { G1Point, G2Point } from "qaci-crypto";
import { MaciState, genProcessVkSig, genTallyVkSig } from "qaci-core";
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
import { AccQueueQuinaryMaci__factory, GrantRound, GrantRound__factory } from "../../typechain";

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

describe("Transfer matching funds", () => {
  let deployer: Signer;
  let user1: Signer;
  let user2: Signer;
  let user3: Signer;
  let coordinatorSigner: Signer;
  let user5: Signer;
  let user6: Signer;
  let user7: Signer;
  let user8: Signer;
  let user9: Signer;
  let user10: Signer;

  let project1: Signer;
  let project2: Signer;
  let project3: Signer;

  let contributionAmount: BigNumberish;
  let deployerAddress: string;
  let user1Address: string;
  let user2Address: string;
  let user3Address: string 
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

  let grantRound: GrantRound;
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
    [deployer, user1, user2, user3, coordinatorSigner, user5, user6, user7, user8, user9, user10] = await ethers.getSigners();
    deployerAddress = await deployer.getAddress();
    user1Address = await user1.getAddress();
    user2Address = await user2.getAddress();
    user3Address = await user3.getAddress();
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
    baseERC20Token = await BaseERC20TokenFactory.deploy(10000 * 1e5);
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
    // Set pollProcessorAndTallier
    await qfi.connect(deployer).setPollProcessorAndTallyer(pollProcessorAndTallyer.address);

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

    // Transfer tokens for contribution
    await baseERC20Token.connect(deployer).transfer(user1Address, 100 * 1e5);
    await baseERC20Token.connect(deployer).transfer(user2Address, 100 * 1e5);
    await baseERC20Token.connect(deployer).transfer(user3Address, 100 * 1e5);
    contributionAmount = 10e5;

    // NOTE: Create new local maci data structure
    maciState = new MaciState();
    const provider = deployer.provider ?? ethers.getDefaultProvider();

    const userSigners = [user1, user2, user3];
    users = [];
    for (const user of userSigners) {
        const maciKey = new Keypair();
        const _pubKey = maciKey.pubKey.asContractParam();

        // approve tokens
        await baseERC20Token.connect(user).approve(qfi.address, contributionAmount);

        // Contribute
        const { logs } = await qfi.connect(user).contribute(
            _pubKey, contributionAmount
        ).then((tx) => tx.wait());

        const iface = qfi.interface;
        // First event is signup from inherited MACI 
        const signUpEvent = iface.parseLog(logs[0]);
        
        users.push({ maciKey: maciKey, signer: user });
        // NOTE: Signup users on local maci data structure
        maciState.signUp(
            maciKey.pubKey,
            BigInt(signUpEvent.args._voiceCreditBalance.toString()),
            BigInt(signUpEvent.args._timestamp.toString())
        );
    }

    const { blockHash } = await qfi.connect(deployer).deployGrantRound(
        duration, maxValues, treeDepths, coordinatorPubkey, await coordinatorSigner.getAddress()
    ).then((tx) => tx.wait());

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


    const grantRoundContractAddress = await qfi.getPoll(0);
    grantRound = new GrantRound__factory({ ...linkedLibraryAddresses }, deployer).attach(grantRoundContractAddress);

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
      const { logs } = await grantRound
        .connect(signer)
        .publishMessage(_message, _encPubKey)
        .then((tx) => tx.wait());

      // NOTE: Publish the message on local maci data structure
      maciState.polls[_pollId].publishMessage(message, maciKey.pubKey);
    }

    // Close voting on QFI
    await qfi.connect(deployer).closeVotingAndWaitForDeadline();

    // Move forward in time 
    const dd = await grantRound.getDeployTimeAndDuration();
    const hardHatProvider = ethers.provider;
    await hardHatProvider.send("evm_increaseTime", [Number(dd[1]) + 1]);
    await hardHatProvider.send("evm_mine", []);

    const extContracts = await grantRound.extContracts();

    const messageAqAddress = extContracts.messageAq;
    messageAq = MessageAq_Factory.attach(messageAqAddress);

    // Merge stateAq
    const maciPoll = maciState.polls[0];
    maciPoll.messageAq.mergeSubRoots(0); //NOTE: 0 as input attempts to merge all subroots
    maciPoll.messageAq.merge(treeDepths.messageTreeDepth);
    const expectedMessageRoot = maciState.polls[0].messageAq.mainRoots[treeDepths.messageTreeDepth].toString();

    await expect(grantRound.mergeMessageAqSubRoots(0)).to.emit(grantRound, "MergeMessageAqSubRoots").withArgs(0);
    await expect(grantRound.mergeMessageAq()).to.emit(grantRound, "MergeMessageAq").withArgs(expectedMessageRoot);

    const maciStateAq = maciState.stateAq;
    maciStateAq.mergeSubRoots(0); // 0 as input attempts to merge all subroots
    maciStateAq.merge(stateTreeDepth);
    const expectedStateRoot = maciState.stateAq.mainRoots[stateTreeDepth].toString();

    await expect(grantRound.mergeMaciStateAqSubRoots(0, 0)).to.emit(grantRound, "MergeMaciStateAqSubRoots").withArgs(0);
    await expect(grantRound.mergeMaciStateAq(0))
       .to.emit(grantRound, "MergeMaciStateAq")
       .withArgs(expectedStateRoot);

    //NOTE: new state root and ballot root commitment calculated off chain
    const { newSbCommitment: maciNewSbCommitment } = maciPoll.processMessages(0);
    //TODO: why does this work?
    const dummyProof: [
      BigNumberish,
      BigNumberish,
      BigNumberish,
      BigNumberish,
      BigNumberish,
      BigNumberish,
      BigNumberish,
      BigNumberish
    ] = [0, 0, 0, 0, 0, 0, 0, 0];
    const { status } = await pollProcessorAndTallyer
      .processMessages(grantRound.address, maciNewSbCommitment, dummyProof)
      .then((tx) => tx.wait());
    expect(status).to.equal(1);
    expect(await pollProcessorAndTallyer.processingComplete()).to.be.true;

    const onChainNewSbCommitment = await pollProcessorAndTallyer.sbCommitment();
    expect(maciNewSbCommitment).to.equal(onChainNewSbCommitment.toString());

    const maciGeneratedInputs = maciPoll.tallyVotes(0);
    const { status: tallyVotesStatus } = await pollProcessorAndTallyer
      .tallyVotes(grantRound.address, maciGeneratedInputs.newTallyCommitment, dummyProof)
      .then((tx) => tx.wait());
    expect(tallyVotesStatus).to.equal(1);

    const onChainNewTallyCommitment = await pollProcessorAndTallyer.tallyCommitment();
    expect(maciGeneratedInputs.newTallyCommitment).to.equal(onChainNewTallyCommitment);

  });

  it('allows to publish the tally hash', async () => {
    const tallyHash = "QmYA2fn8cMbVWo4v95RwcwJVyQsNtnEwHerfWR8UNtEwoE";

    await expect(grantRound.connect(coordinatorSigner).publishTallyHash(
        tallyHash
    )).to.emit(grantRound, 'TallyPublished').withArgs(tallyHash);
  });

  it('reverts - only coordinator can publish the tally hash', async () => {
    await expect(grantRound.connect(user1).publishTallyHash('1')).to.revertedWith(
        'GrantRound: Sender is not the coordinator');
  });

  it("finalizes current round", async () => {
    // 1. publish tally Hash
    const tallyHash = "QmYA2fn8cMbVWo4v95RwcwJVyQsNtnEwHerfWR8UNtEwoE";
    await expect(grantRound.connect(coordinatorSigner).publishTallyHash(
        tallyHash
    )).to.emit(grantRound, 'TallyPublished').withArgs(tallyHash);

    // 2. finalize
    await expect(qfi.connect(deployer).finalizeCurrentRound(
        1
    )).to.emit(qfi, 'GrantRoundFinalized').withArgs(grantRound.address, 4);

    // Check that balances are correct
    const balanceAfter = await baseERC20Token.balanceOf(grantRound.address);

    expect(balanceAfter).to.be.equal(Number(contributionAmount) * users.length);
  });

  it('finalizes current round with matching funding sources', async () => {
    // Add a funding source
    await expect (qfi.connect(user1).addFundingSource(
        user3Address
    )).to.emit(qfi, 'FundingSourceAdded').withArgs(user3Address);

    // approve tokens to QFI
    await baseERC20Token.connect(user3).approve(qfi.address, 20e5);

    const user3BalanceBefore = await baseERC20Token.balanceOf(user3Address);

    // finalize
    const tallyHash = "QmYA2fn8cMbVWo4v95RwcwJVyQsNtnEwHerfWR8UNtEwoE";
    await expect(grantRound.connect(coordinatorSigner).publishTallyHash(
        tallyHash
    )).to.emit(grantRound, 'TallyPublished').withArgs(tallyHash);

    await expect(qfi.connect(deployer).finalizeCurrentRound(
        1
    )).to.emit(qfi, 'GrantRoundFinalized').withArgs(grantRound.address, 4);

    const user3BalanceAfter = await baseERC20Token.balanceOf(user3Address);
    const grantRoundBalance = await baseERC20Token.balanceOf(grantRound.address);

    // verify 
    expect(Number(user3BalanceBefore) - 20e5).to.be.equal(user3BalanceAfter);
    expect(Number(grantRoundBalance)).to.be.equal(Number(contributionAmount) * users.length + 20e5);
  });

  it('only transfers contributions because of no allowance on funding sources', async () => {
    // Add funding sources
    for (const user of [user2, user3]) {
      await expect (qfi.connect(user).addFundingSource(
        await user.getAddress()
      )).to.emit(qfi, 'FundingSourceAdded').withArgs(await user.getAddress());
    }

    // finalize
    const tallyHash = "QmYA2fn8cMbVWo4v95RwcwJVyQsNtnEwHerfWR8UNtEwoE";
    await expect(grantRound.connect(coordinatorSigner).publishTallyHash(
        tallyHash
    )).to.emit(grantRound, 'TallyPublished').withArgs(tallyHash);

    await expect(qfi.connect(deployer).finalizeCurrentRound(
        1
    )).to.emit(qfi, 'GrantRoundFinalized').withArgs(grantRound.address, 4);

    const grantRoundBalance = await baseERC20Token.balanceOf(grantRound.address);
    expect(Number(grantRoundBalance)).to.be.equal(Number(contributionAmount) * users.length);
  });

  it('reverts - user cannot withdraw contributions from previous rounds', async () => {
    // 1. Finalize
    const tallyHash = "QmYA2fn8cMbVWo4v95RwcwJVyQsNtnEwHerfWR8UNtEwoE";
    await expect(grantRound.connect(coordinatorSigner).publishTallyHash(
        tallyHash
    )).to.emit(grantRound, 'TallyPublished').withArgs(tallyHash);

    await expect(qfi.connect(deployer).finalizeCurrentRound(
        1
    )).to.emit(qfi, 'GrantRoundFinalized').withArgs(grantRound.address, 4);

    // 2. Allow contributions again
    await qfi.connect(deployer).acceptContributionsAndTopUpsBeforeNewRound();

    // 3. Try to withdraw
    expect(qfi.connect(user1).withdrawContribution()).to.revertedWith('FundingRound: Nothing to withdraw');
  });
});