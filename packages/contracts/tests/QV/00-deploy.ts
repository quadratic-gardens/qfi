import { ethers } from "hardhat";
import { BigNumber, Signer } from "ethers";
import chai from "chai";
import { solidity } from "ethereum-waffle";

import { Keypair, VerifyingKey } from "../../src";
import { G1Point, G2Point } from "../../src";

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

describe("Deploy - QV 6-8-3-3 Configuration Smart Contracts", () => {
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
  });

  it("verify - deploys New Poseidon Contract Implementations", async () => {
    expect(poseidonT3.address).to.not.equal(ethers.constants.AddressZero);
    expect(poseidonT4.address).to.not.equal(ethers.constants.AddressZero);
    expect(poseidonT5.address).to.not.equal(ethers.constants.AddressZero);
    expect(poseidonT6.address).to.not.equal(ethers.constants.AddressZero);
  });

  it("verify - hashes all zeros inputs correctly", async () => {
    // Expected hash values for each Poseidon contracts
    // Contract  |      Input(s)        |  expected value
    // PoseidonT3 | [ 0, 0 ]             | 0x2098f5fb9e239eab3ceac3f27b81e481dc3124d55ffed523a839ee8446b64864
    // PoseidonT4 | [ 0, 0, 0 ]          | 0x0bc188d27dcceadc1dcfb6af0a7af08fe2864eecec96c5ae7cee6db31ba599aa
    // PoseidonT5 | [ 0, 0, 0, 0 ]       | 0x0532fd436e19c70e51209694d9c215250937921b8b79060488c1206db73e9946
    // PoseidonT6 | [ 0, 0, 0, 0, 0 ]    | 0x2066be41bebe6caf7e079360abe14fbf9118c62eabc42e2fe75e342b160a95bc

    expect(await poseidonT3.hash2([BigNumber.from(0), BigNumber.from(0)])).to.be.equal(
      BigNumber.from("0x2098f5fb9e239eab3ceac3f27b81e481dc3124d55ffed523a839ee8446b64864")
    );
    expect(await poseidonT4.hash3([BigNumber.from(0), BigNumber.from(0), BigNumber.from(0)])).to.be.equal(
      BigNumber.from("0x0bc188d27dcceadc1dcfb6af0a7af08fe2864eecec96c5ae7cee6db31ba599aa")
    );
    expect(await poseidonT5.hash4([BigNumber.from(0), BigNumber.from(0), BigNumber.from(0), BigNumber.from(0)])).to.be.equal(
      BigNumber.from("0x0532fd436e19c70e51209694d9c215250937921b8b79060488c1206db73e9946")
    );
    expect(await poseidonT6.hash5([BigNumber.from(0), BigNumber.from(0), BigNumber.from(0), BigNumber.from(0), BigNumber.from(0)])).to.be.equal(
      BigNumber.from("0x2066be41bebe6caf7e079360abe14fbf9118c62eabc42e2fe75e342b160a95bc")
    );
  });

  it("verify - hashes all different inputs correctly", async () => {
    // Expected hash values for each Poseidon contracts
    // Contract  |      Input(s)        |  expected value
    // PoseidonT3 | [ 1, 2 ]             | 0x115cc0f5e7d690413df64c6b9662e9cf2a3617f2743245519e19607a4417189a
    // PoseidonT4 | [ 1, 2, 3 ]          | 0xe7732d89e6939c0ff03d5e58dab6302f3230e269dc5b968f725df34ab36d732
    // PoseidonT5 | [ 1, 2, 3, 4 ]       | 0x299c867db6c1fdd79dcefa40e4510b9837e60ebb1ce0663dbaa525df65250465
    // PoseidonT6 | [ 1, 2, 3, 4, 5 ]    | 0xdab9449e4a1398a15224c0b15a49d598b2174d305a316c918125f8feeb123c0

    expect(await poseidonT3.hash2([BigNumber.from(1), BigNumber.from(2)])).to.be.equal(
      BigNumber.from("0x115cc0f5e7d690413df64c6b9662e9cf2a3617f2743245519e19607a4417189a")
    );
    expect(await poseidonT4.hash3([BigNumber.from(1), BigNumber.from(2), BigNumber.from(3)])).to.be.equal(
      BigNumber.from("0xe7732d89e6939c0ff03d5e58dab6302f3230e269dc5b968f725df34ab36d732")
    );
    expect(await poseidonT5.hash4([BigNumber.from(1), BigNumber.from(2), BigNumber.from(3), BigNumber.from(4)])).to.be.equal(
      BigNumber.from("0x299c867db6c1fdd79dcefa40e4510b9837e60ebb1ce0663dbaa525df65250465")
    );
    expect(await poseidonT6.hash5([BigNumber.from(1), BigNumber.from(2), BigNumber.from(3), BigNumber.from(4), BigNumber.from(5)])).to.be.equal(
      BigNumber.from("0xdab9449e4a1398a15224c0b15a49d598b2174d305a316c918125f8feeb123c0")
    );
  });

  it("deploys a Jubjub instance", async () => {
    //NOTE: Deploy Factory, SignupGatekeeper, and InitialVoiceCreditProxy
    jubjubFactory = await JubjubFactoryFactory.deploy();
    freeForAllGateKeeper = await FreeForAllGatekeeperFactory.deploy();
    constantInitialVoiceCreditProxy = await ConstantInitialVoiceCreditProxyFactory.deploy(99);

    //NOTE: Deploy Jubjub Instance
    await expect(
      jubjubFactory.deployJubjub(
        "0x5445535400000000000000000000000000000000000000000000000000000000",
        freeForAllGateKeeper.address,
        constantInitialVoiceCreditProxy.address
      )
    ).to.emit(jubjubFactory, "JubjubDeployed");
  });

  it.skip("sets the verifying keys", async () => {
    const _processVk = <VerifyingKeyStruct>testProcessVk.asContractParam();
    const _tallyVk = <VerifyingKeyStruct>testTallyVk.asContractParam();

    await jubjubFactory.setVerifyingKeys(
      BigNumber.from(6),
      BigNumber.from(3),
      BigNumber.from(8),
      BigNumber.from(3),
      BigNumber.from(3),
      _processVk,
      _tallyVk
    );

    const pSig = await jubjubFactory.genProcessVkSig(BigNumber.from(6), BigNumber.from(8), BigNumber.from(3), BigNumber.from(3));

    const tSig = await jubjubFactory.genTallyVkSig(BigNumber.from(6), BigNumber.from(3), BigNumber.from(3));

    let coordinator = new Keypair();

    const isPSigSet = await jubjubFactory.isProcessVkSet(pSig);
    expect(isPSigSet).to.be.true;

    const isTSigSet = await jubjubFactory.isTallyVkSet(tSig);
    expect(isTSigSet).to.be.true;

    const coordinatorPubkey = coordinator.pubKey.asContractParam();
    console.log(coordinatorPubkey);
  });
  it("deploys a configured jubjubinstance correctly", async () => {
    //NOTE: deploy factory and set templates
    jubjubFactory = await JubjubFactoryFactory.deploy();
    expect(jubjubFactory.address).to.not.be.undefined;
    expect(await jubjubFactory.jubjubTemplate()).to.not.be.undefined;

    freeForAllGateKeeper = await FreeForAllGatekeeperFactory.deploy();
    constantInitialVoiceCreditProxy = await ConstantInitialVoiceCreditProxyFactory.deploy(99);

    const { logs } = await jubjubFactory
      .connect(deployer)
      .deployJubjub(
        "0x5445535400000000000000000000000000000000000000000000000000000000",
        freeForAllGateKeeper.address,
        constantInitialVoiceCreditProxy.address
      )
      .then((tx) => tx.wait());

    const iface = jubjubFactory.interface;
    const deployJubjubEvent = iface.parseLog(logs[logs.length - 1]).args["jubjub"];
    // console.log("deployJubjubEvent",logs);

    // console.log("deployer", await deployer.getAddress());
    // console.log("jubjubFactory", await jubjubFactory.address);
    // console.log("jubjubTemplate", await jubjubFactory.jubjubTemplate());

    // expect(deployJubjubEvent).to.not.equal(jubjubTemplate.address);
    const jubjub1 = JubjubTemplateFactory.attach(deployJubjubEvent);
    console.log("jubjubClone", await jubjub1.address);
    const stateTree1 = StateTreeFactory.attach(await jubjub1.stateAq());
    const msgTree1 = MessageTreeFactory.attach(await jubjub1.messageAq());

    // console.log("jubjubFactoryOwner", await jubjubFactory.owner());
    // console.log("jubjubOwner", await jubjub1.owner());
    // console.log("stateTree", stateTree1.address);
    // console.log("msgTree", msgTree1.address);
    // console.log("stateTreeOwner", await stateTree1.owner());
    // console.log("msgTreeOwner", await msgTree1.owner());

    // Libraries should be linked to the Jubjub contract
    expect(await jubjub1.hash(BigNumber.from(1), BigNumber.from(2))).to.be.equal(
      BigNumber.from("0x115cc0f5e7d690413df64c6b9662e9cf2a3617f2743245519e19607a4417189a")
    );

    console.log("message leaf hash", await jubjub1.blankMessageLeafHash());
    console.log("state leaf hash", await jubjub1.blankStateLeafHash());
  });
});
