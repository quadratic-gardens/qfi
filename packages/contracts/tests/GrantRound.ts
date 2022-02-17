import { ethers } from "hardhat";
import chai from "chai";
import { solidity } from "ethereum-waffle";
import { BigNumberish, Signer } from "ethers";
import {
  AccQueueQuinaryMaci,
  AccQueueQuinaryMaci__factory,
  BaseERC20Token,
  BaseERC20Token__factory,
  ConstantInitialVoiceCreditProxy,
  ConstantInitialVoiceCreditProxy__factory,
  FreeForAllGatekeeper,
  FreeForAllGatekeeper__factory,
  GrantRound,
  GrantRoundFactory,
  GrantRoundFactory__factory,
  GrantRound__factory,
  MessageAqFactory,
  MessageAqFactory__factory,
  MockVerifier,
  MockVerifier__factory,
  OptimisticRecipientRegistry,
  OptimisticRecipientRegistry__factory,
  PollFactory,
  PollFactory__factory,
  PollProcessorAndTallyer,
  PollProcessorAndTallyer__factory,
  PoseidonT3__factory,
  PoseidonT4__factory,
  PoseidonT5__factory,
  PoseidonT6__factory,
  QFI,
  QFI__factory,
  VkRegistry,
  VkRegistry__factory,
} from "../typechain";
import { VerifyingKeyStruct } from "../typechain/VkRegistry";
import { G1Point, G2Point } from "maci-crypto";
import { Command, Keypair, VerifyingKey } from "maci-domainobjs";
import { GrantRoundFactoryLibraryAddresses } from "../typechain/factories/GrantRoundFactory__factory";
import { MessageAqFactoryLibraryAddresses } from "../typechain/factories/MessageAqFactory__factory";
import { PollFactoryLibraryAddresses } from "../typechain/factories/PollFactory__factory";
import { QFILibraryAddresses } from "../typechain/factories/QFI__factory";
import { MessageStruct } from "../typechain/GrantRound";
import { MaciState } from "maci-core";
import { sha256 } from "ethers/lib/utils";

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

// Unit tests for GrantRound smart contract.
describe("Grant Round", () => {
  let deployer: Signer;
  let coordinator: Signer;
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

  let deployerAddress: string;
  let coordinatorAddress: string;
  let coordinatorKeyPair: Keypair;

  // Factories.
  let messageAqQuinaryMaciFactory: AccQueueQuinaryMaci__factory;
  let grantRoundFactory: GrantRoundFactory;
  let pollFactory: PollFactory;
  let messageAqFactoryPolls: MessageAqFactory;
  let messageAqFactoryGrantRounds: MessageAqFactory;
  let messageAqQuinaryMaci: AccQueueQuinaryMaci;
  let vkRegistry: VkRegistry;
  let constantInitialVoiceCreditProxy: ConstantInitialVoiceCreditProxy;
  let freeForAllGateKeeper: FreeForAllGatekeeper;
  let optimisticRecipientRegistry: OptimisticRecipientRegistry;
  let baseERC20Token: BaseERC20Token;
  let mockVerifier: MockVerifier;
  let pollProcessorAndTallyer: PollProcessorAndTallyer;
  let qfi: QFI;
  let grantRound: GrantRound;
  let linkedLibraryAddresses:
    | QFILibraryAddresses
    | PollFactoryLibraryAddresses
    | MessageAqFactoryLibraryAddresses
    | GrantRoundFactoryLibraryAddresses;
  let grantRoundContractAddress: string;

  // Off-chain QFI/MACI state local copy (useful for off-chain sbcommitment generation).
  let maciState: MaciState;

  // QFI/MACI Signed users.
  let users: {
    maciKey: Keypair;
    signer: Signer;
    stateIndex: number;
  }[] = [];

  // GrantRound info.
  const duration = 35;
  const maxValues = {
    maxUsers: 25,
    maxMessages: 25,
    maxVoteOptions: 25,
  };
  const treeDepths = {
    intStateTreeDepth: 2, //NOTE: actualy use tally batch size of 25
    messageTreeDepth: 4,
    messageTreeSubDepth: 2,
    voteOptionTreeDepth: 2,
  };
  const MESSAGE_TREE_ARITY = 5;
  const messageBatchSize = MESSAGE_TREE_ARITY ** treeDepths.messageTreeSubDepth;
  let stateTreeDepth = 0;

  let tallyFileData: {
    maci: string;
    pollId: number;
    newTallyCommitment: any;
    results: {
      tally: any;
      salt: any;
    };
    totalSpentVoiceCredits: {
      spent: any;
      salt: any;
    };
    perVOSpentVoiceCredits: {
      tally: any;
      salt: any;
    };
  };

  beforeEach(async () => {
    // Get signers info.
    [
      deployer,
      coordinator,
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
    ] = await ethers.getSigners();
    deployerAddress = await deployer.getAddress();
    coordinatorAddress = await coordinator.getAddress();

    // Poseidon libraries.
    const PoseidonT3Factory = new PoseidonT3__factory(deployer);
    const PoseidonT4Factory = new PoseidonT4__factory(deployer);
    const PoseidonT5Factory = new PoseidonT5__factory(deployer);
    const PoseidonT6Factory = new PoseidonT6__factory(deployer);

    const poseidonT3 = await PoseidonT3Factory.deploy();
    const poseidonT4 = await PoseidonT4Factory.deploy();
    const poseidonT5 = await PoseidonT5Factory.deploy();
    const poseidonT6 = await PoseidonT6Factory.deploy();

    linkedLibraryAddresses = {
      ["maci-contracts/contracts/crypto/Hasher.sol:PoseidonT5"]:
        poseidonT5.address,
      ["maci-contracts/contracts/crypto/Hasher.sol:PoseidonT3"]:
        poseidonT3.address,
      ["maci-contracts/contracts/crypto/Hasher.sol:PoseidonT6"]:
        poseidonT6.address,
      ["maci-contracts/contracts/crypto/Hasher.sol:PoseidonT4"]:
        poseidonT4.address,
    };

    // Smart contracts factories.
    const GrantRoundFactory = new GrantRoundFactory__factory(
      { ...linkedLibraryAddresses },
      deployer
    );
    const PollFactory = new PollFactory__factory(
      { ...linkedLibraryAddresses },
      deployer
    );
    const MessageAqFactoryFactory = new MessageAqFactory__factory(
      { ...linkedLibraryAddresses },
      deployer
    );
    const QFIFactory = new QFI__factory(
      { ...linkedLibraryAddresses },
      deployer
    );
    messageAqQuinaryMaciFactory = new AccQueueQuinaryMaci__factory(
      { ...linkedLibraryAddresses },
      deployer
    );
    const VKRegistryFactory = new VkRegistry__factory(deployer);
    const ConstantInitialVoiceCreditProxyFactory =
      new ConstantInitialVoiceCreditProxy__factory(deployer);
    const FreeForAllGateKeeperFactory = new FreeForAllGatekeeper__factory(
      deployer
    );
    const RecipientRegistryFactory = new OptimisticRecipientRegistry__factory(
      deployer
    );
    const BaseERC20TokenFactory = new BaseERC20Token__factory(deployer);
    const MockVerifierFactory = new MockVerifier__factory(deployer);
    const PollProcessorAndTallyerFactory = new PollProcessorAndTallyer__factory(
      deployer
    );

    // Deploy smart contracts instances.
    grantRoundFactory = await GrantRoundFactory.deploy();
    pollFactory = await PollFactory.deploy();
    messageAqFactoryPolls = await MessageAqFactoryFactory.deploy();
    messageAqFactoryGrantRounds = await MessageAqFactoryFactory.deploy();
    vkRegistry = await VKRegistryFactory.deploy();
    constantInitialVoiceCreditProxy =
      await ConstantInitialVoiceCreditProxyFactory.deploy(100);
    freeForAllGateKeeper = await FreeForAllGateKeeperFactory.deploy();
    optimisticRecipientRegistry = await RecipientRegistryFactory.deploy(
      0,
      0,
      deployerAddress
    );
    baseERC20Token = await BaseERC20TokenFactory.deploy(100);
    mockVerifier = await MockVerifierFactory.deploy();
    pollProcessorAndTallyer = await PollProcessorAndTallyerFactory.deploy(
      mockVerifier.address
    );

    // Set recipient for GrantRoundFactory.
    await grantRoundFactory
      .connect(deployer)
      .setRecipientRegistry(optimisticRecipientRegistry.address);

    // Deploy QFI.
    qfi = await QFIFactory.deploy(
      baseERC20Token.address,
      grantRoundFactory.address,
      pollFactory.address,
      freeForAllGateKeeper.address,
      constantInitialVoiceCreditProxy.address
    );

    // Init QFI.
    await pollFactory.transferOwnership(qfi.address);
    await grantRoundFactory.transferOwnership(qfi.address);
    await messageAqFactoryPolls.transferOwnership(pollFactory.address);
    await messageAqFactoryGrantRounds.transferOwnership(
      grantRoundFactory.address
    );
    await qfi.initialize(
      vkRegistry.address,
      messageAqFactoryPolls.address,
      messageAqFactoryGrantRounds.address
    );

    // Set Verifying Keys (vk) in VkRegistry smart contract.
    stateTreeDepth = await qfi.stateTreeDepth();
    const _stateTreeDepth = stateTreeDepth.toString();
    const _intStateTreeDepth = treeDepths.intStateTreeDepth;
    const _messageTreeDepth = treeDepths.messageTreeDepth;
    const _voteOptionTreeDepth = treeDepths.voteOptionTreeDepth;
    const _messageBatchSize = messageBatchSize.toString();
    const _processVk = <VerifyingKeyStruct>testProcessVk.asContractParam();
    const _tallyVk = <VerifyingKeyStruct>testTallyVk.asContractParam();

    await vkRegistry
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

    await vkRegistry.genProcessVkSig(
      _stateTreeDepth,
      _messageTreeDepth,
      _voteOptionTreeDepth,
      _messageBatchSize
    );
    await vkRegistry.genTallyVkSig(
      _stateTreeDepth,
      _intStateTreeDepth,
      _voteOptionTreeDepth
    );

    // Get Coordinator.
    coordinatorKeyPair = new Keypair();
    const coordinatorPubkey = coordinatorKeyPair.pubKey.asContractParam();
    maciState = new MaciState();
    const provider = deployer.provider ?? ethers.getDefaultProvider();

    // Deploy PPT smart contract.
    await qfi.setPollProcessorAndTallyer(pollProcessorAndTallyer.address);

    // Users SignUp without contributions.
    const userSigners = [user1, user2, user3, user4];
    users = [];

    for (const user of userSigners) {
      const maciKey = new Keypair();
      const _pubKey = maciKey.pubKey.asContractParam();
      const _signUpGatekeeperData = ethers.utils.defaultAbiCoder.encode(
        ["uint256"],
        [1]
      );
      const _initialVoiceCreditProxyData = ethers.utils.defaultAbiCoder.encode(
        ["uint256"],
        [0]
      );

      const tx = await qfi
        .connect(user)
        .signUp(_pubKey, _signUpGatekeeperData, _initialVoiceCreditProxyData);
      // Retrieve SignUp event.
      const { events } = await tx.wait();
      const [SignUp] = events;

      maciState.signUp(
        maciKey.pubKey,
        BigInt(SignUp.args._voiceCreditBalance.toString()),
        BigInt(SignUp.args._timestamp.toString())
      );

      users.push({
        maciKey: maciKey,
        signer: user,
        stateIndex: Number(SignUp.args._stateIndex),
      });
    }

    // Users signup w/ contribution.
    const contributors = [user5, user6, user7, user8];
    const totalContributionAmount = 40;

    for (const user of contributors) {
      // Mock token transfers for contributions.
      await baseERC20Token
        .connect(deployer)
        .transfer(
          await user.getAddress(),
          totalContributionAmount / contributors.length
        );
      await baseERC20Token
        .connect(user)
        .increaseAllowance(
          qfi.address,
          totalContributionAmount / contributors.length
        );

      const maciKey = new Keypair();
      const _pubKey = maciKey.pubKey.asContractParam();

      const tx = await qfi
        .connect(user)
        .contribute(_pubKey, totalContributionAmount / contributors.length);

      // Retrieve SignUp event.
      const { events } = await tx.wait();
      const [, , SignUp] = events;

      maciState.signUp(
        maciKey.pubKey,
        BigInt(SignUp.args._voiceCreditBalance.toString()),
        BigInt(SignUp.args._timestamp.toString())
      );

      users.push({
        maciKey: maciKey,
        signer: user,
        stateIndex: Number(SignUp.args._stateIndex),
      });
    }

    // Deploy the GrantRound.
    const { blockHash } = await qfi
      .connect(deployer)
      .deployGrantRound(
        duration,
        maxValues,
        treeDepths,
        coordinatorPubkey,
        coordinatorAddress,
        { gasLimit: "30000000" }
      );
    grantRoundContractAddress = await qfi.getGrantRound(0);
    grantRound = new GrantRound__factory(
      { ...linkedLibraryAddresses },
      deployer
    ).attach(grantRoundContractAddress);

    const deployTime = (await provider.getBlock(blockHash)).timestamp;
    maciState.deployPoll(
      duration,
      BigInt(deployTime + duration),
      maxValues,
      treeDepths,
      messageBatchSize,
      coordinatorKeyPair
    );
  });

  it("verify - initializes properly", async () => {
    expect(Number((await grantRound.numSignUpsAndMessages())[0])).to.equal(8); // signups.
    expect(Number((await grantRound.numSignUpsAndMessages())[1])).to.equal(0); // messages.
    expect(await grantRound.isCancelled()).to.be.false;
    expect(await grantRound.isFinalized()).to.be.false;
    expect(await grantRound.tallyHash()).to.be.empty;
    expect(Number(await grantRound.totalSpent())).to.be.equal(0);
    expect(Number(await grantRound.totalVotes())).to.be.equal(0);
    expect(Number(await grantRound.matchingPoolSize())).to.be.equal(0);

    // Inherited from Poll.
    const { maxMessages, maxVoteOptions } = await grantRound.maxValues();
    const {
      intStateTreeDepth,
      messageTreeDepth,
      messageTreeSubDepth,
      voteOptionTreeDepth,
    } = await grantRound.treeDepths();
    expect(maxMessages).to.be.equal(maxValues.maxMessages);
    expect(maxVoteOptions).to.be.equal(maxValues.maxVoteOptions);
    expect(intStateTreeDepth).to.be.equal(treeDepths.intStateTreeDepth);
    expect(messageTreeDepth).to.be.equal(treeDepths.messageTreeDepth);
    expect(messageTreeSubDepth).to.be.equal(treeDepths.messageTreeSubDepth);
    expect(voteOptionTreeDepth).to.be.equal(treeDepths.voteOptionTreeDepth);
  });

  it("verify - configured properly", async () => {
    expect(await grantRound.coordinator()).to.be.equal(coordinatorAddress);
    expect((await grantRound.coordinatorPubKey()).x).to.be.equal(
      coordinatorKeyPair.pubKey.asContractParam().x
    );
    expect((await grantRound.coordinatorPubKey()).y).to.be.equal(
      coordinatorKeyPair.pubKey.asContractParam().y
    );
    expect(await grantRound.coordinatorPubKeyHash()).to.be.equal(
      coordinatorKeyPair.pubKey.hash()
    );
    expect(await grantRound.voiceCreditFactor()).to.be.equal(
      await qfi.voiceCreditFactor()
    );
    expect(await grantRound.nativeToken()).to.be.equal(baseERC20Token.address);
    expect(await grantRound.recipientRegistry()).to.be.equal(
      optimisticRecipientRegistry.address
    );
    expect((await grantRound.extContracts()).maci).to.be.equal(qfi.address);
    expect((await grantRound.extContracts()).vkRegistry).to.be.equal(
      vkRegistry.address
    );
  });

  it("verify - users can signup after Grant Round deploy", async () => {
    // Mock token transfers for contributions.
    const maciKey = new Keypair();
    const _pubKey = maciKey.pubKey.asContractParam();
    const _signUpGatekeeperData = ethers.utils.defaultAbiCoder.encode(
      ["uint256"],
      [1]
    );
    const _initialVoiceCreditProxyData = ethers.utils.defaultAbiCoder.encode(
      ["uint256"],
      [0]
    );

    const tx = await qfi
      .connect(user9)
      .signUp(_pubKey, _signUpGatekeeperData, _initialVoiceCreditProxyData);

    // Retrieve SignUp event.
    const { events } = await tx.wait();
    const [SignUp] = events;

    maciState.signUp(
      maciKey.pubKey,
      BigInt(SignUp.args._voiceCreditBalance.toString()),
      BigInt(SignUp.args._timestamp.toString())
    );

    expect(Number((await grantRound.numSignUpsAndMessages())[0])).to.equal(9); // signups.
    users.push({
      maciKey: maciKey,
      signer: user9,
      stateIndex: Number(SignUp.args._stateIndex),
    });
  });

  it("verify - users cannot contribute after Grant Round deploy", async () => {
    // Mock token transfers for contributions.
    await baseERC20Token
      .connect(deployer)
      .transfer(await user10.getAddress(), 1);
    await baseERC20Token.connect(user10).increaseAllowance(qfi.address, 1);

    const maciKey = new Keypair();
    const _pubKey = maciKey.pubKey.asContractParam();

    await expect(qfi.connect(user10).contribute(_pubKey, 1)).to.be.revertedWith(
      "QFI: Not accepting signups or top ups"
    );
    expect(Number((await grantRound.numSignUpsAndMessages())[0])).to.equal(8); // signups.
  });

  describe("Voting", () => {
    let voter: Signer;
    let voterAddress: string;
    let keypair: Keypair;
    let message: MessageStruct;
    let encPubKey: {
      x: string;
      y: string;
    };

    before(async () => {
      voter = users[0].signer;
      voterAddress = await voter.getAddress();
      keypair = users[0].maciKey;

      // Create a new command w/ a vote for vote option 1 (spent -> 9 VCs).
      const command = new Command(
        BigInt(1),
        keypair.pubKey,
        BigInt(0),
        BigInt(9),
        BigInt(1),
        BigInt(0),
        BigInt(0)
      );
      // Sign the command.
      const signature = command.sign(keypair.privKey);
      // Generate a new ECDH shared key w/ coordinator.
      const sharedKey = Keypair.genEcdhSharedKey(
        keypair.privKey,
        coordinatorKeyPair.pubKey
      );
      // Create the message (encrypted command).
      const encMessage = command.encrypt(signature, sharedKey);

      message = <MessageStruct>encMessage.asContractParam();
      encPubKey = keypair.pubKey.asContractParam();
    });

    it("submits a vote", async () => {
      await expect(
        grantRound.connect(voter).publishMessage(message, encPubKey)
      ).to.emit(grantRound, "PublishMessage");
      expect(Number((await grantRound.numSignUpsAndMessages())[1])).to.equal(1); // messages.
    });

    it("submits a batch of messages (votes)", async () => {
      // Generate a new message.
      const command = new Command(
        BigInt(1),
        keypair.pubKey,
        BigInt(0),
        BigInt(9),
        BigInt(1),
        BigInt(0),
        BigInt(0)
      );
      const signature = command.sign(keypair.privKey);
      const sharedKey = Keypair.genEcdhSharedKey(
        keypair.privKey,
        coordinatorKeyPair.pubKey
      );
      const encMessage = command.encrypt(signature, sharedKey);

      const message2 = <MessageStruct>encMessage.asContractParam();

      await expect(
        grantRound
          .connect(voter)
          .publishMessageBatch([message, message2], [encPubKey, encPubKey])
      )
        .to.emit(grantRound, "PublishMessage")
        .to.emit(grantRound, "PublishMessage")
        .to.emit(grantRound, "Voted")
        .withArgs(voterAddress); // Check new event emit.

      expect(Number((await grantRound.numSignUpsAndMessages())[1])).to.equal(2); // messages.
    });

    it("submits a key-changing message", async () => {
      // Create a new pubKey for the user.
      const newUserMaciKey = new Keypair();

      const command = new Command(
        BigInt(1),
        newUserMaciKey.pubKey,
        BigInt(0),
        BigInt(9),
        BigInt(1),
        BigInt(0),
        BigInt(0)
      );
      const signature = command.sign(newUserMaciKey.privKey);
      const sharedKey = Keypair.genEcdhSharedKey(
        newUserMaciKey.privKey,
        coordinatorKeyPair.pubKey
      );
      const message = command.encrypt(signature, sharedKey);

      const _message = <MessageStruct>message.asContractParam();
      const _encPubKey = newUserMaciKey.pubKey.asContractParam();

      expect(newUserMaciKey !== keypair).to.be.true;
      await expect(
        grantRound.connect(voter).publishMessage(_message, _encPubKey)
      ).to.emit(grantRound, "PublishMessage");
      expect(Number((await grantRound.numSignUpsAndMessages())[1])).to.equal(1); // messages.
    });

    it("submits an invalid vote", async () => {
      // Submit a vote changing the key.
      const newUserMaciKey = new Keypair();

      const command = new Command(
        BigInt(1),
        newUserMaciKey.pubKey,
        BigInt(0),
        BigInt(9),
        BigInt(1),
        BigInt(0),
        BigInt(0)
      );
      const signature = command.sign(newUserMaciKey.privKey);
      const sharedKey = Keypair.genEcdhSharedKey(
        newUserMaciKey.privKey,
        coordinatorKeyPair.pubKey
      );
      const encMessage = command.encrypt(signature, sharedKey);

      const _message = <MessageStruct>encMessage.asContractParam();
      const _encPubKey = newUserMaciKey.pubKey.asContractParam();

      expect(newUserMaciKey !== users[0].maciKey).to.be.true;
      await expect(
        grantRound.connect(voter).publishMessage(_message, _encPubKey)
      ).to.emit(grantRound, "PublishMessage");

      // Submit the old message.
      await expect(
        grantRound.connect(voter).publishMessage(message, encPubKey)
      ).to.emit(grantRound, "PublishMessage");
      expect(Number((await grantRound.numSignUpsAndMessages())[1])).to.equal(2); // messages.
    });

    it("submits a vote for invalid vote option", async () => {
      const wrongVoteOptionIndex = 100;

      const command = new Command(
        BigInt(1),
        keypair.pubKey,
        BigInt(wrongVoteOptionIndex),
        BigInt(9),
        BigInt(1),
        BigInt(0),
        BigInt(0)
      );
      const signature = command.sign(keypair.privKey);
      const sharedKey = Keypair.genEcdhSharedKey(
        keypair.privKey,
        coordinatorKeyPair.pubKey
      );
      const message = command.encrypt(signature, sharedKey);

      const _message = <MessageStruct>message.asContractParam();
      const _encPubKey = keypair.pubKey.asContractParam();

      await expect(
        grantRound.connect(voter).publishMessage(_message, _encPubKey)
      ).to.emit(grantRound, "PublishMessage");
      expect(Number((await grantRound.numSignUpsAndMessages())[1])).to.equal(1); // messages.
      expect(
        Number((await grantRound.maxValues()).maxVoteOptions)
      ).to.be.lessThan(wrongVoteOptionIndex);
    });

    it("should revert when a user vote after voting period expired", async () => {
      const deployTD = await grantRound.getDeployTimeAndDuration();
      const provider = ethers.provider;

      const expectedTime = deployTD[1].add(deployTD[0]).toNumber();

      expect((await provider.getBlock("latest")).timestamp).to.be.lt(
        expectedTime
      );

      await provider.send("evm_increaseTime", [Number(deployTD[1]) + 1]);
      await provider.send("evm_mine", []);

      expect((await provider.getBlock("latest")).timestamp).to.be.gt(
        expectedTime
      );

      await expect(
        grantRound.connect(voter).publishMessage(message, encPubKey)
      ).to.be.revertedWith("PollE03");
    });

    it("should revert when a user vote after max number of messages is reached", async () => {
      // Send the same message for maxMessages - 1 times.
      for (let i = 0; i <= maxValues.maxMessages; i++) {
        await expect(
          grantRound.connect(voter).publishMessage(message, encPubKey)
        ).to.emit(grantRound, "PublishMessage");
      }

      // Should revert.
      await expect(
        grantRound.connect(voter).publishMessage(message, encPubKey)
      ).to.be.revertedWith("PollE06");
    }).timeout(35000);
  });

  describe("Publishing Tally Hash", () => {
    let tallyHash: string;

    beforeEach(async () => {
      const maciPoll = maciState.polls[0];

      let index = 1;
      for (const user of users) {
        const { maciKey, signer, stateIndex } = user;
        const _stateIndex = BigInt(stateIndex);
        const _newPubKey = maciKey.pubKey;
        const _voteOptionIndex = BigInt(index);
        const _newVoteWeight = BigInt(index);
        const _nonce = BigInt(1);
        const _pollId = BigInt(0);
        const _salt = BigInt(1);
        const command = new Command(
          _stateIndex,
          _newPubKey,
          _voteOptionIndex,
          _newVoteWeight,
          _nonce,
          _pollId,
          _salt
        );
        index++;

        const signature = command.sign(maciKey.privKey);
        const sharedKey = Keypair.genEcdhSharedKey(
          maciKey.privKey,
          coordinatorKeyPair.pubKey
        );
        const message = command.encrypt(signature, sharedKey);
        const _message = <MessageStruct>message.asContractParam();
        const _encPubKey = maciKey.pubKey.asContractParam();

        // NOTE: Publish the message on local maci data structure
        maciPoll.publishMessage(message, maciKey.pubKey);

        await expect(
          grantRound.connect(signer).publishMessage(_message, _encPubKey)
        ).to.emit(grantRound, "PublishMessage");
      }

      // Close voting period.
      await qfi.connect(deployer).closeVotingAndWaitForDeadline();
      expect(await qfi.currentStage()).to.be.equal(3);

      // Merge.
      const deployTD = await grantRound.getDeployTimeAndDuration();
      const hardHatProvider = ethers.provider;
      await hardHatProvider.send("evm_increaseTime", [Number(deployTD[1]) + 1]);
      await hardHatProvider.send("evm_mine", []);

      const extContracts = await grantRound.extContracts();

      const messageAqAddress = extContracts.messageAq;
      messageAqQuinaryMaci =
        messageAqQuinaryMaciFactory.attach(messageAqAddress);

      maciPoll.messageAq.mergeSubRoots(0); //NOTE: 0 as input attempts to merge all subroots
      maciPoll.messageAq.merge(treeDepths.messageTreeDepth);

      await grantRound.mergeMessageAqSubRoots(0);
      await grantRound.mergeMessageAq();

      const maciStateAq = maciState.stateAq;
      maciStateAq.mergeSubRoots(0); // 0 as input attempts to merge all subroots
      maciStateAq.merge(stateTreeDepth);

      await grantRound.mergeMaciStateAqSubRoots(0, 0);
      await grantRound.mergeMaciStateAq(0);

      // Process messages (state-ballot root commitment) off-chain.
      const { newSbCommitment: _maciNewSbCommitment } =
        maciPoll.processMessages(0);

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

      // Process messages on-chain.
      await pollProcessorAndTallyer.processMessages(
        grantRound.address,
        _maciNewSbCommitment,
        dummyProof
      );

      // Tally votes off-chain.
      const maciTallyCircuitInputs = maciPoll.tallyVotes(0);

      // Tally votes on-chain.
      await pollProcessorAndTallyer.tallyVotes(
        grantRound.address,
        maciTallyCircuitInputs.newTallyCommitment,
        dummyProof
      );

      // Reproduce the tally.json file data.
      const newTallyCommitment = maciTallyCircuitInputs.newTallyCommitment;
      const tallyResults = maciPoll.results.map((x: any) => x.toString());
      const tallySalt = maciTallyCircuitInputs.newResultsRootSalt;
      const voiceCreditsSpent = maciPoll.totalSpentVoiceCredits.toString();
      const voiceCreditsSalt =
        maciTallyCircuitInputs.newSpentVoiceCreditSubtotalSalt;
      const perVOSpentTally = maciPoll.perVOSpentVoiceCredits.map((x: any) =>
        x.toString()
      );
      const perVOSpentSalt =
        maciTallyCircuitInputs.newPerVOSpentVoiceCreditsRootSalt;
      tallyFileData = {
        maci: qfi.address,
        pollId: 0,
        newTallyCommitment: newTallyCommitment,
        results: {
          tally: tallyResults,
          salt: tallySalt,
        },
        totalSpentVoiceCredits: {
          spent: voiceCreditsSpent,
          salt: voiceCreditsSalt,
        },
        perVOSpentVoiceCredits: {
          tally: perVOSpentTally,
          salt: perVOSpentSalt,
        },
      };
      // Mocked tally IPFS hash.
      tallyHash = sha256("0x1234");
    });

    it("allows coordinator to publish vote tally hash", async () => {
      // Check new event emit.
      await expect(grantRound.connect(coordinator).publishTallyHash(tallyHash))
        .to.emit(grantRound, "TallyPublished")
        .withArgs(tallyHash);
      expect(await grantRound.tallyHash()).to.be.equal(tallyHash);
    });

    it("allows only coordinator to publish tally hash", async () => {
      await expect(
        grantRound.connect(user1).publishTallyHash(tallyHash)
      ).to.be.revertedWith("GrantRound: Sender is not the coordinator");
    });

    it("rejects empty string", async () => {
      await expect(
        grantRound.connect(coordinator).publishTallyHash("")
      ).to.be.revertedWith("GrantRound: Tally hash is empty string");
    });

    it("reverts if round has been finalized", async () => {
      // Transfer the ownership to QFI to finalize the GrantRound.
      await grantRound.connect(deployer).transferOwnership(qfi.address);

      // Publish the tally hash.
      await expect(grantRound.connect(coordinator).publishTallyHash(tallyHash))
        .to.emit(grantRound, "TallyPublished")
        .withArgs(tallyHash);
      expect(await grantRound.tallyHash()).to.be.equal(tallyHash);

      // Finalize.
      await qfi
        .connect(deployer)
        .finalizeCurrentRound(
          BigInt(tallyFileData.totalSpentVoiceCredits.spent),
          BigInt(tallyFileData.perVOSpentVoiceCredits.salt)
        );
      expect(await grantRound.isFinalized()).to.be.true;

      // Should revert after finalization.
      await expect(
        grantRound.connect(coordinator).publishTallyHash(tallyHash)
      ).to.revertedWith("GrantRound: Round finalized");
    });
  });
  /*
  describe('Finalizing Grant Round', () => {

    it('allows owner to finalize round', async () => {

    })

    it('allows owner to finalize round when matching pool is empty', async () => {

    })

    it('counts direct token transfers to funding round as matching pool contributions', async () => {

    })

    it('reverts if round has been finalized already', async () => {

    })


    it('reverts if voting is still in progress', async () => {

    })

    it('reverts if votes has not been tallied', async () => {

    })

    it('reverts if tally hash has not been published', async () => {

    })

    it('reverts if total votes is zero', async () => {

    })

    it('reverts if total amount of spent voice credits is incorrect', async () => {

    })

    it('allows only owner to finalize round', async () => {
    })
  })

      describe('cancelling round', () => {
        it('allows owner to cancel round', async () => {
  
        })
  
        it('reverts if round has been finalized already', async () => {
  
        })
  
        it('reverts if round has been cancelled already', async () => {
  
        })
  
        it('allows only owner to cancel round', async () => {
  
        })
      })
  
  
  
      describe('claiming funds', () => {
  
        it('allows recipient to claim allocated funds', async () => {
  
        })
  
        it('allows address different than recipient to claim allocated funds', async () => {
  
        })
  
        it('allows recipient to claim zero amount', async () => {
  
        })
  
        it('allows recipient to claim if the matching pool is empty', async () => {
  
        })
  
        it('should not allow recipient to claim funds if round has not been finalized', async () => {
  
        })
  
        it('should not allow recipient to claim funds if round has been cancelled', async () => {
  
        })
  
        it('sends funds allocated to unverified recipients back to matching pool', async () => {
  
        })
  
        it('allows recipient to claim allocated funds only once', async () => {
  
        })
  
        it('should verify that tally result is correct', async () => {
  
        })
  
        it('should verify that amount of spent voice credits is correct', async () => {
  
        })
      })
    })
  
    describe('cancelling round', () => {
  
      it('allows owner to cancel round', async () => {
  
      })
  
      it('allows only owner to cancel round', async () => {
  
      })
  
      it('reverts if round has not been deployed', async () => {
  
      })
  
      it('reverts if round is finalized', async () => {
  
      })
    })
  
  */
});
