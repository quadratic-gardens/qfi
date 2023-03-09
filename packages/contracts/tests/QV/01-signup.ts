import { ethers } from "hardhat";
import { BigNumber, constants, Signer } from "ethers";
import chai from "chai";
import { solidity } from "ethereum-waffle";

import { Keypair, VerifyingKey } from "@qfi/macisdk";
import { G1Point, G2Point } from "@qfi/macisdk"

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
import { Jubjub } from "../../typechain/Jubjub";
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

describe("Signup - QV 6-8-3-3 Configuration Smart Contracts", () => {
  let deployer: Signer;
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

  beforeEach(async () => {
    [deployer] = await ethers.getSigners();
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
  });

  it("verify - contract deployer can set vkRegistry", async () => {
    const jubjubInstance = JubjubTemplateFactory.attach(await jubjubFactory.currentJubjub());
    const vkRegistry = await jubjubInstance.vkRegistry();
    expect(vkRegistry).to.not.equal(constants.AddressZero);
    await jubjubInstance.setVkRegistry(constants.AddressZero);
    expect(await jubjubInstance.vkRegistry()).to.equal(constants.AddressZero);
    await jubjubInstance.setVkRegistry(vkRegistry);
    expect(await jubjubInstance.vkRegistry()).to.equal(jubjubFactory.address);
  });

  it("verify - can signup one user", async () => {
    const maciKey = new Keypair();
    const [deployer, user1] = await ethers.getSigners();
    const jubjubInstance = JubjubTemplateFactory.attach(await jubjubFactory.currentJubjub());

    //NOTE: build contract call data
    const _pubKey = maciKey.pubKey.asContractParam();
    const _signUpGatekeeperData = ethers.utils.defaultAbiCoder.encode(["uint256"], [1]);
    const _initialVoiceCreditProxyData = ethers.utils.defaultAbiCoder.encode(["uint256"], [0]);

    //NOTE: call signup as user1
    await jubjubInstance.connect(user1).signUp(_pubKey, _signUpGatekeeperData, _initialVoiceCreditProxyData);
  });

  it("can signup many users", async () => {
    const maciKey = new Keypair();
    const [deployer, user1, user2, user3, user4, user5, user6] = await ethers.getSigners();
    const jubjubInstance = JubjubTemplateFactory.attach(await jubjubFactory.currentJubjub());
    const userSigners = [user1, user2, user3, user4, user5, user6];

    const done = [];
    for (const user of userSigners) {
      const maciKey = new Keypair();
      const _pubKey = maciKey.pubKey.asContractParam();
      const _signUpGatekeeperData = ethers.utils.defaultAbiCoder.encode(["uint256"], [0]);
      const _initialVoiceCreditProxyData = ethers.utils.defaultAbiCoder.encode(["uint256"], [0]);

      await jubjubInstance.connect(user).signUp(_pubKey, _signUpGatekeeperData, _initialVoiceCreditProxyData);
      done.push({ maciKey: maciKey, signer: user });
    }
    expect(Number(await jubjubInstance.numSignUps())).to.equal(6);
    expect(Number(await jubjubInstance.numMessages())).to.equal(0);
  });

  it("verify - deploys signup event on user signup", async () => {
    const maciKey = new Keypair();
    const [deployer, user1, user2, user3, user4, user5, user6] = await ethers.getSigners();
    const jubjubInstance = JubjubTemplateFactory.attach(await jubjubFactory.currentJubjub());
    const userSigners = [user1, user2, user3, user4, user5, user6];

    const done = [];
    for (const user of userSigners) {
      const maciKey = new Keypair();
      const _pubKey = maciKey.pubKey.asContractParam();
      const _signUpGatekeeperData = ethers.utils.defaultAbiCoder.encode(["uint256"], [0]);
      const _initialVoiceCreditProxyData = ethers.utils.defaultAbiCoder.encode(["uint256"], [0]);
      await expect(jubjubInstance.signUp(_pubKey, _signUpGatekeeperData, _initialVoiceCreditProxyData)).to.emit(jubjubInstance, "SignUp");
    }
    expect(Number(await jubjubInstance.numSignUps())).to.equal(6);
    expect(Number(await jubjubInstance.numMessages())).to.equal(0);
  });

  it("verify - users signed up successfully before poll deployed", async () => {
    const jubjubInstance = JubjubTemplateFactory.attach(await jubjubFactory.currentJubjub());
    expect(Number(await jubjubInstance.numSignUps())).to.equal(0);
    expect(Number(await jubjubInstance.numMessages())).to.equal(0);
  });
});