import { ethers } from "hardhat";
import { BigNumber, constants, Signer } from "ethers";
import chai from "chai";
import { solidity } from "ethereum-waffle";

import { Keypair, VerifyingKey } from "maci-domainobjs";
import { MaciState } from "maci-core";
import { G1Point, G2Point } from "maci-crypto";
import { PCommand } from "maci-domainobjs";

import { PoseidonT3 } from "../../typechain/PoseidonT3";
import { PoseidonT3__factory } from "../../typechain/factories/PoseidonT3__factory";
import { PoseidonT4 } from "../../typechain/PoseidonT4";
import { PoseidonT4__factory } from "../../typechain/factories/PoseidonT4__factory";
import { PoseidonT5 } from "../../typechain/PoseidonT5";
import { PoseidonT5__factory } from "../../typechain/factories/PoseidonT5__factory";
import { PoseidonT6 } from "../../typechain/PoseidonT6";
import { PoseidonT6__factory } from "../../typechain/factories/PoseidonT6__factory";

import { OptimisticRecipientRegistry } from "../../typechain/OptimisticRecipientRegistry";
import { OptimisticRecipientRegistry__factory } from "../../typechain/factories/OptimisticRecipientRegistry__factory";
import { MessageTreeLibraryAddresses, MessageTree__factory } from "../../typechain/factories/MessageTree__factory";
import { JubjubLibraryAddresses, Jubjub__factory } from "../../typechain/factories/Jubjub__factory";
import { Jubjub, MessageStruct, PubKeyStruct } from "../../typechain/Jubjub";
import { JubjubFactory, VerifyingKeyStruct } from "../../typechain/JubjubFactory";
import { JubjubFactoryLibraryAddresses, JubjubFactory__factory } from "../../typechain/factories/JubjubFactory__factory";
import { ConstantInitialVoiceCreditProxy } from "../../typechain/ConstantInitialVoiceCreditProxy";
import { FreeForAllGatekeeper } from "../../typechain/FreeForAllGatekeeper";
import { ConstantInitialVoiceCreditProxy__factory } from "../../typechain/factories/ConstantInitialVoiceCreditProxy__factory";
import { FreeForAllGatekeeper__factory } from "../../typechain/factories/FreeForAllGatekeeper__factory";
import { StateTreeLibraryAddresses, StateTree__factory } from "../../typechain/factories/StateTree__factory";
import { StateTree } from "../../typechain/StateTree";
import { MessageTree } from "../../typechain/MessageTree";

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

  beforeEach(async () => {
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
    const event = iface.parseLog(logs[logs.length - 1]);

    const expectOkStatus = 1;
    const expectedMessage = message.data.map((data) => {
      return BigNumber.from(data);
    });
    expect(status).to.equal(expectOkStatus);
    expect(event.args[0][1]).to.deep.equal(expectedMessage);
  });
  it("verify - can vote multiple times", async () => {
    const jubjubInstance = JubjubTemplateFactory.attach(await jubjubFactory.currentJubjub());
    await jubjubInstance.startVoting(BigNumber.from(3), BigNumber.from(60 * 60), coordinatorPubkey);
    for (const user of users) {
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
      await expect(jubjubInstance.publishMessage(<MessageStruct>message.asContractParam(), keypair.pubKey.asContractParam()))
        .to.emit(jubjubInstance, 'PublishMessage')
    }
  });
  it.skip('verify - can vote using multisend', async () => {
    
  })
});
