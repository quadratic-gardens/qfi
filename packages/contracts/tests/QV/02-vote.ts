import { ethers } from "hardhat";
import { BigNumber, constants, Signer } from "ethers";
import chai from "chai";
import { solidity } from "ethereum-waffle";

import { Keypair, VerifyingKey } from "@qfi/macisdk";
import { MaciState } from "@qfi/macisdk";
import { G1Point, G2Point } from "@qfi/macisdk";
import { PCommand } from "@qfi/macisdk";

import { PoseidonT3__factory } from "../../typechain-types/factories/contracts/poseidon/PoseidonT3__factory";
import { PoseidonT4__factory } from "../../typechain-types/factories/contracts/poseidon/PoseidonT4__factory";
import { PoseidonT5__factory } from "../../typechain-types/factories/contracts/poseidon/PoseidonT5__factory";
import { PoseidonT6__factory } from "../../typechain-types/factories/contracts/poseidon/PoseidonT6__factory";
import { MessageTreeLibraryAddresses, MessageTree__factory } from "../../typechain-types/factories/contracts/MessageTree__factory";
import { JubjubLibraryAddresses, Jubjub__factory } from "../../typechain-types/factories/contracts/Jubjub__factory";
import { JubjubFactoryLibraryAddresses, JubjubFactory__factory } from "../../typechain-types/factories/contracts/JubjubFactory__factory";
import { ConstantInitialVoiceCreditProxy__factory } from "../../typechain-types/factories/contracts/flavors/ConstantInitialVoiceCreditProxy.sol/ConstantInitialVoiceCreditProxy__factory";
import { FreeForAllGatekeeper__factory } from "../../typechain-types/factories/contracts/flavors/F.sol/FreeForAllGatekeeper__factory";
import { StateTreeLibraryAddresses, StateTree__factory } from "../../typechain-types/factories/contracts/StateTree__factory";

import { PoseidonT3 } from "../../typechain-types/contracts/poseidon/PoseidonT3";
import { PoseidonT4 } from "../../typechain-types/contracts/poseidon/PoseidonT4";
import { PoseidonT5 } from "../../typechain-types/contracts/poseidon/PoseidonT5";
import { PoseidonT6 } from "../../typechain-types/contracts/poseidon/PoseidonT6";
import { Jubjub } from "../../typechain-types/contracts/Jubjub";
import { JubjubFactory, VerifyingKeyStruct } from "../../typechain-types/contracts/JubjubFactory";
import { ConstantInitialVoiceCreditProxy } from "../../typechain-types/contracts/flavors/ConstantInitialVoiceCreditProxy.sol/ConstantInitialVoiceCreditProxy";
import { FreeForAllGatekeeper } from "../../typechain-types/contracts/flavors/F.sol/FreeForAllGatekeeper";
import { StateTree } from "../../typechain-types/contracts/StateTree";
import { MessageTree } from "../../typechain-types/contracts/MessageTree";

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

describe("Vote - QV 6-8-3-3 Configuration Smart Contracts", () => {
  let maciState: MaciState;
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
  let users: {
    maciKey: Keypair;
    signer: Signer;
  }[] = [];
  let deployerAddress: string;
  let libs: JubjubLibraryAddresses;
  let factoryLibs: JubjubFactoryLibraryAddresses;
  let messageTreeLibs: MessageTreeLibraryAddresses;
  let stateTreeLibs: StateTreeLibraryAddresses;

  let PoseidonT3Factory: PoseidonT3__factory;
  let PoseidonT4Factory: PoseidonT4__factory;
  let PoseidonT5Factory: PoseidonT5__factory;
  let PoseidonT6Factory: PoseidonT6__factory;

  let JubjubFactoryFactory: JubjubFactory__factory;
  let ConstantInitialVoiceCreditProxyFactory: ConstantInitialVoiceCreditProxy__factory;
  let FreeForAllGatekeeperFactory: FreeForAllGatekeeper__factory;

  let JubjubTemplateFactory: Jubjub__factory;
  let StateTreeFactory: StateTree__factory;
  let MessageTreeFactory: MessageTree__factory;
  let jubjubTemplate: Jubjub;
  let stateTreeTemplate: StateTree;
  let messageTreeTemplate: MessageTree;

  let poseidonT3: PoseidonT3;
  let poseidonT4: PoseidonT4;
  let poseidonT5: PoseidonT5;
  let poseidonT6: PoseidonT6;

  let jubjubFactory: JubjubFactory;
  let constantInitialVoiceCreditProxy: ConstantInitialVoiceCreditProxy;
  let freeForAllGateKeeper: FreeForAllGatekeeper;
  let coordinator: Keypair;
  let coordinatorPubkey: PubKeyStruct;
  const duration = 15 * 60;
  const stateTreeDepth = 6;
  const intStateTreeDepth = 3;
  const treeDepths = {
    intStateTreeDepth: 3,
    messageTreeDepth: 8,
    messageTreeSubDepth: 3,
    voteOptionTreeDepth: 3,
  };
  const messageBatchSize = 5 ** treeDepths.messageTreeSubDepth;
  const tallyBatchSize = 5 ** intStateTreeDepth;
  const maxValues = {
    maxUsers: 5 ** stateTreeDepth,
    maxMessages: 5 ** treeDepths.messageTreeDepth,
    maxVoteOptions: 5 ** treeDepths.voteOptionTreeDepth,
  };

  beforeEach(async function () {
    this?.timeout(40000);
    coordinator = new Keypair();
    coordinatorPubkey = coordinator.pubKey.asContractParam();
    [deployer, user1, user2, user3, user4, user5, user6, user7, user8, user9, user10] = await ethers.getSigners();
    deployerAddress = await deployer.getAddress();

    // NOTE: Deploy Libs
    PoseidonT3Factory = new PoseidonT3__factory(deployer);
    PoseidonT4Factory = new PoseidonT4__factory(deployer);
    PoseidonT5Factory = new PoseidonT5__factory(deployer);
    PoseidonT6Factory = new PoseidonT6__factory(deployer);
    poseidonT3 = await PoseidonT3Factory.deploy();
    poseidonT4 = await PoseidonT4Factory.deploy();
    poseidonT5 = await PoseidonT5Factory.deploy();
    poseidonT6 = await PoseidonT6Factory.deploy();
    libs = {
      ["contracts/poseidon/PoseidonT6.sol:PoseidonT6"]: poseidonT6.address,
      ["contracts/poseidon/PoseidonT5.sol:PoseidonT5"]: poseidonT5.address,
      ["contracts/poseidon/PoseidonT3.sol:PoseidonT3"]: poseidonT3.address,
      ["contracts/poseidon/PoseidonT4.sol:PoseidonT4"]: poseidonT4.address,
    };
    factoryLibs = {
      ["contracts/poseidon/PoseidonT6.sol:PoseidonT6"]: poseidonT6.address,
      ["contracts/poseidon/PoseidonT5.sol:PoseidonT5"]: poseidonT5.address,
      ["contracts/poseidon/PoseidonT3.sol:PoseidonT3"]: poseidonT3.address,
      ["contracts/poseidon/PoseidonT4.sol:PoseidonT4"]: poseidonT4.address,
      ["contracts/AccQueue.sol:PoseidonT3"]: poseidonT3.address,
      ["contracts/AccQueue.sol:PoseidonT6"]: poseidonT6.address,
    };
    stateTreeLibs = {
      ["contracts/AccQueue.sol:PoseidonT3"]: poseidonT3.address,
      ["contracts/AccQueue.sol:PoseidonT6"]: poseidonT6.address,
    };
    messageTreeLibs = {
      ["contracts/AccQueue.sol:PoseidonT3"]: poseidonT3.address,
      ["contracts/AccQueue.sol:PoseidonT6"]: poseidonT6.address,
    };

    // NOTE: Deploy templates

    JubjubTemplateFactory = new Jubjub__factory(libs, deployer);
    StateTreeFactory = new StateTree__factory(stateTreeLibs, deployer);
    MessageTreeFactory = new MessageTree__factory(messageTreeLibs, deployer);

    jubjubTemplate = await JubjubTemplateFactory.deploy();
    stateTreeTemplate = await StateTreeFactory.deploy(6);
    messageTreeTemplate = await MessageTreeFactory.deploy(8);

    // NOTE: Setup factories

    JubjubFactoryFactory = new JubjubFactory__factory(factoryLibs, deployer);
    ConstantInitialVoiceCreditProxyFactory = new ConstantInitialVoiceCreditProxy__factory(deployer);
    FreeForAllGatekeeperFactory = new FreeForAllGatekeeper__factory(deployer);

    //NOTE: Deploy Factory, SignupGatekeeper, and InitialVoiceCreditProxy
    jubjubFactory = await JubjubFactoryFactory.deploy();
    freeForAllGateKeeper = await FreeForAllGatekeeperFactory.deploy();
    constantInitialVoiceCreditProxy = await ConstantInitialVoiceCreditProxyFactory.deploy(99);

    //NOTE: Deploy Jubjub Instance
    const tx = await jubjubFactory.deployJubjub(
      "0xDEADBEEF00000000000000000000000000000000000000000000000000000000",
      freeForAllGateKeeper.address,
      constantInitialVoiceCreditProxy.address
    );
    tx.wait(0);

    const jubjubInstance = JubjubTemplateFactory.attach(await jubjubFactory.currentJubjub());

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

      const { logs } = await jubjubInstance
        .connect(user)
        .signUp(_pubKey, _signUpGatekeeperData, _initialVoiceCreditProxyData)
        .then((tx) => tx.wait());

      const iface = jubjubInstance.interface;
      const signUpEvent = iface.parseLog(logs[logs.length - 1]);

      users.push({ maciKey: maciKey, signer: user });
      // NOTE: Signup users on local maci data structure
      maciState.signUp(maciKey.pubKey, BigInt(signUpEvent.args._voiceCreditBalance.toString()), BigInt(signUpEvent.args._timestamp.toString()));
    }
  });

  it("verify - vote triggers event with encrypted message", async () => {
    const jubjubInstance = JubjubTemplateFactory.attach(await jubjubFactory.currentJubjub());
    await jubjubInstance.startVoting(BigNumber.from(3), BigNumber.from(60 * 60), coordinatorPubkey);

    const keypair = users[0].maciKey;

    const _stateIndex = BigInt(1);
    const _newPubKey = keypair.pubKey;
    const _voteOptionIndex = BigInt(0);
    const _newVoteWeight = BigInt(9);
    const _nonce = BigInt(1);
    const _pollId = BigInt(0);
    const _salt = BigInt(0);

    const sharedKey = Keypair.genEcdhSharedKey(keypair.privKey, coordinator.pubKey);
    const command = new PCommand(_stateIndex, _newPubKey, _voteOptionIndex, _newVoteWeight, _nonce, _pollId, _salt);
    const signature = command.sign(keypair.privKey);
    const message = command.encrypt(signature, sharedKey);

    const { status, logs } = await jubjubInstance
      .publishMessage(<MessageStruct>message.asContractParam(), keypair.pubKey.asContractParam())
      .then((tx) => tx.wait());
    const iface = jubjubInstance.interface;
    console.log(logs);
    const event = iface.parseLog(logs[logs.length - 1]);

    const expectOkStatus = 1;
    const expectedMessage = message.data.map((data) => {
      return BigNumber.from(data);
    });
    expect(status).to.equal(expectOkStatus);
    expect(event.args[0][1].map((n) => n.toString())).to.deep.equal(expectedMessage.map((n) => n.toString()));
  });
  it("verify - can vote multiple times", async () => {
    const jubjubInstance = JubjubTemplateFactory.attach(await jubjubFactory.currentJubjub());
    await jubjubInstance.startVoting(BigNumber.from(3), BigNumber.from(60 * 60), coordinatorPubkey);
    let _stateIndex = BigInt(0);
    for (const user of users) {
      const keypair = user.maciKey;

      _stateIndex + 1n;
      const _newPubKey = keypair.pubKey;
      const _voteOptionIndex = BigInt(0);
      const _newVoteWeight = BigInt(9);
      const _nonce = BigInt(1);
      const _pollId = BigInt(0);
      const _salt = BigInt(0);

      const sharedKey = Keypair.genEcdhSharedKey(keypair.privKey, coordinator.pubKey);
      const command = new PCommand(_stateIndex, _newPubKey, _voteOptionIndex, _newVoteWeight, _nonce, _pollId, _salt);
      const signature = command.sign(keypair.privKey);
      const message = command.encrypt(signature, sharedKey);
      await expect(jubjubInstance.publishMessage(<MessageStruct>message.asContractParam(), keypair.pubKey.asContractParam())).to.emit(
        jubjubInstance,
        "PublishMessage"
      );
    }
  });
  it("fails - can vote before voting starts", async () => {
    const jubjubInstance = JubjubTemplateFactory.attach(await jubjubFactory.currentJubjub());
    // await jubjubInstance.startVoting(BigNumber.from(3), BigNumber.from(60 * 60), coordinatorPubkey);
    let _stateIndex = BigInt(0);
    for (const user of users) {
      const keypair = user.maciKey;

      _stateIndex + 1n;
      const _newPubKey = keypair.pubKey;
      const _voteOptionIndex = BigInt(0);
      const _newVoteWeight = BigInt(9);
      const _nonce = BigInt(1);
      const _pollId = BigInt(0);
      const _salt = BigInt(0);

      const sharedKey = Keypair.genEcdhSharedKey(keypair.privKey, coordinator.pubKey);
      const command = new PCommand(_stateIndex, _newPubKey, _voteOptionIndex, _newVoteWeight, _nonce, _pollId, _salt);
      const signature = command.sign(keypair.privKey);
      const message = command.encrypt(signature, sharedKey);
      await expect(jubjubInstance.publishMessage(<MessageStruct>message.asContractParam(), keypair.pubKey.asContractParam())).to.be.revertedWith(
        "ERROR_VOTING_PERIOD_PASSED"
      );
    }
  });
  it("verify - can process votes locally", async function () {
    this?.timeout(800000);
    const provider = deployer.provider ?? ethers.getDefaultProvider();
    // //NOTE: this is where the coordinator key is set on the local maci data structure
    const jubjubInstance = JubjubTemplateFactory.attach(await jubjubFactory.currentJubjub());

    const { blockHash } = await jubjubInstance
      .connect(deployer)
      .startVoting(3, BigNumber.from(duration), coordinatorPubkey)
      .then((tx) => tx.wait());
    const deployTime = (await provider.getBlock(blockHash)).timestamp;
    const _duration = await jubjubInstance.voteDurationSeconds();
    console.log(_duration);
    const p = maciState.deployPoll(_duration, BigInt(deployTime + _duration), maxValues, treeDepths, messageBatchSize, coordinator);
    let index = 1;
    for (const user of users) {
      const { maciKey: keypair, signer } = user;
      const _stateIndex = BigInt(index);

      const _newPubKey = keypair.pubKey;
      const _voteOptionIndex = BigInt(index);
      const _newVoteWeight = BigInt(index);
      const _nonce = BigInt(1);
      const _pollId = BigInt(0);
      const _salt = BigInt(1);
      const command = new PCommand(_stateIndex, _newPubKey, _voteOptionIndex, _newVoteWeight, _nonce, _pollId, _salt);

      const signature = command.sign(keypair.privKey);
      const sharedKey = Keypair.genEcdhSharedKey(keypair.privKey, coordinator.pubKey);
      const message = command.encrypt(signature, sharedKey);
      maciState.polls[0].publishMessage(message, keypair.pubKey);

      const _message = <MessageStruct>message.asContractParam();
      const _encPubKey = keypair.pubKey.asContractParam();
      await expect(jubjubInstance.publishMessage(_message, keypair.pubKey.asContractParam())).to.emit(jubjubInstance, "PublishMessage");
    }

    console.log(await jubjubInstance.voteDeadline());

    // const dd = await poll.getDeployTimeAndDuration();
    const hardHatProvider = ethers.provider;
    await hardHatProvider.send("evm_increaseTime", [duration + 1]);
    await hardHatProvider.send("evm_mine", []);

    const maciPoll = maciState.polls[0];
    maciPoll.messageAq.mergeSubRoots(0); //NOTE: 0 as input attempts to merge all subroots
    maciPoll.messageAq.merge(treeDepths.messageTreeDepth);

    await jubjubInstance.mergeMessageAqSubRoots(0);
    await jubjubInstance.mergeMessageAq();

    const maciStateAq = maciState.stateAq;
    maciStateAq.mergeSubRoots(0); // 0 as input attempts to merge all subroots
    maciStateAq.merge(stateTreeDepth);

    await jubjubInstance.mergeStateAqSubRoots(0);
    await jubjubInstance.mergeStateAq();
  });
});
