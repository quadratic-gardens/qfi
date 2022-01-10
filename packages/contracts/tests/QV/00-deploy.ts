import { ethers } from "hardhat";
import { BigNumber, Signer } from "ethers";
import chai from "chai";
import { solidity } from "ethereum-waffle";
import { PoseidonT3 } from "../../typechain/PoseidonT3";
import { PoseidonT3__factory } from "../../typechain/factories/PoseidonT3__factory";
import { PoseidonT4 } from "../../typechain/PoseidonT4";
import { PoseidonT4__factory } from "../../typechain/factories/PoseidonT4__factory";
import { PoseidonT5 } from "../../typechain/PoseidonT5";
import { PoseidonT5__factory } from "../../typechain/factories/PoseidonT5__factory";
import { PoseidonT6 } from "../../typechain/PoseidonT6";
import { PoseidonT6__factory } from "../../typechain/factories/PoseidonT6__factory";

import {MACI} from '../../typechain/MACI'
import {MACI__factory} from '../../typechain/factories/MACI__factory'

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

import { VkRegistry__factory } from "../../typechain/factories/VkRegistry__factory";
import { FreeForAllGatekeeper__factory } from "../../typechain/factories/FreeForAllGatekeeper__factory";
import { ConstantInitialVoiceCreditProxy__factory } from "../../typechain/factories/ConstantInitialVoiceCreditProxy__factory";

import { VkRegistry } from "../../typechain/VkRegistry";
import { FreeForAllGatekeeper } from "../../typechain/FreeForAllGatekeeper";
import { ConstantInitialVoiceCreditProxy } from "../../typechain/ConstantInitialVoiceCreditProxy";

import { OptimisticRecipientRegistry } from "../../typechain/OptimisticRecipientRegistry";
import { OptimisticRecipientRegistry__factory } from "../../typechain/factories/OptimisticRecipientRegistry__factory";

import { BaseERC20Token } from "../../typechain/BaseERC20Token";
import { BaseERC20Token__factory } from "../../typechain/factories/BaseERC20Token__factory";

import { PollProcessorAndTallyer } from "../../typechain/PollProcessorAndTallyer";
import { PollProcessorAndTallyer__factory } from "../../typechain/factories/PollProcessorAndTallyer__factory";

chai.use(solidity);
const { expect } = chai;

describe("Quadratic Funding Infrastructure Deploy", () => {
  let deployer: Signer;
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

  let QFIFactory: QFI__factory;
  let MACIFactory: MACI__factory;

  let poseidonT3: PoseidonT3;
  let poseidonT4: PoseidonT4;
  let poseidonT5: PoseidonT5;
  let poseidonT6:  PoseidonT6;
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
  let qfi: QFI;
  let maci: MACI;


  beforeEach(async () => {
    [deployer] = await ethers.getSigners();
    deployerAddress = await deployer.getAddress();
    PoseidonT3Factory = new PoseidonT3__factory(deployer);
    PoseidonT4Factory = new PoseidonT4__factory(deployer);
    PoseidonT5Factory = new PoseidonT5__factory(deployer);
    PoseidonT6Factory = new PoseidonT6__factory(deployer);
    poseidonT3 = await PoseidonT3Factory.deploy();
    poseidonT4 = await PoseidonT4Factory.deploy();
    poseidonT5 = await PoseidonT5Factory.deploy();
    poseidonT6 = await PoseidonT6Factory.deploy();

    linkedLibraryAddresses = {
      ["maci-contracts/contracts/crypto/Hasher.sol:PoseidonT5"]: poseidonT5.address,
      ["maci-contracts/contracts/crypto/Hasher.sol:PoseidonT3"]: poseidonT3.address,
      ["maci-contracts/contracts/crypto/Hasher.sol:PoseidonT6"]: poseidonT6.address,
      ["maci-contracts/contracts/crypto/Hasher.sol:PoseidonT4"]: poseidonT4.address,
    };
    GrantRoundFactory = new GrantRoundFactory__factory({ ...linkedLibraryAddresses }, deployer);
    PollFactoryFactory = new PollFactory__factory({ ...linkedLibraryAddresses }, deployer);
    MessageAqFactoryFactory = new MessageAqFactory__factory({ ...linkedLibraryAddresses }, deployer);
    QFIFactory = new QFI__factory({ ...linkedLibraryAddresses }, deployer);
    MACIFactory = new MACI__factory({ ...linkedLibraryAddresses }, deployer);

    VKRegistryFactory = new VkRegistry__factory(deployer);
    ConstantInitialVoiceCreditProxyFactory = new ConstantInitialVoiceCreditProxy__factory(deployer);
    FreeForAllGateKeeperFactory = new FreeForAllGatekeeper__factory(deployer);
    RecipientRegistryFactory = new OptimisticRecipientRegistry__factory(deployer);
    BaseERC20TokenFactory = new BaseERC20Token__factory(deployer);
    PollProcessorAndTallyerFactory = new PollProcessorAndTallyer__factory(deployer);
  });

  it("deploys Poseidon Contracts", async () => {
    expect(poseidonT3.address).to.not.equal(ethers.constants.AddressZero);
    expect(poseidonT4.address).to.not.equal(ethers.constants.AddressZero);
    expect(poseidonT5.address).to.not.equal(ethers.constants.AddressZero);
    expect(poseidonT6.address).to.not.equal(ethers.constants.AddressZero);
    //NOTE: These should be correct as they are from precompiled contracts
    expect( await poseidonT3["poseidon(uint256[2])"]([BigNumber.from(0), BigNumber.from(0)]) ).to.be.equal(BigNumber.from('0x2098f5fb9e239eab3ceac3f27b81e481dc3124d55ffed523a839ee8446b64864'));
    expect( await poseidonT6["poseidon(uint256[5])"]([BigNumber.from(0), BigNumber.from(0),BigNumber.from(0), BigNumber.from(0),BigNumber.from(0)]) ).to.be.equal(BigNumber.from('0x2066be41bebe6caf7e079360abe14fbf9118c62eabc42e2fe75e342b160a95bc'));
    //NOTE: These should bbe incorrect as they are not from precompiled contracts
    expect( await poseidonT4.poseidon([BigNumber.from(0), BigNumber.from(0),BigNumber.from(0)])).to.be.equal(BigNumber.from('0x00'));
    expect( await poseidonT5.poseidon([BigNumber.from(0), BigNumber.from(0),BigNumber.from(0),BigNumber.from(0)])).to.be.equal(BigNumber.from('0x00'));
    
  });



  it("deploys GrantRoundFactory Contracts", async () => {
    grantRoundFactory = await GrantRoundFactory.deploy();
    await expect((await grantRoundFactory.deployTransaction.wait()).status).to.not.equal(0);
  });

  it("deploys PollFactory Contracts", async () => {
    pollFactory = await PollFactoryFactory.deploy();
    await expect((await pollFactory.deployTransaction.wait()).status).to.not.equal(0);
  });

  it("deploys MessageAqFactory Contract", async () => {
    messageAqFactory = await MessageAqFactoryFactory.deploy();
    await expect((await messageAqFactory.deployTransaction.wait()).status).to.not.equal(0);
  });

  it("deploys VKRegistry Contracts", async () => {
    vkRegistry = await VKRegistryFactory.deploy();
    await expect((await vkRegistry.deployTransaction.wait()).status).to.not.equal(0);
  });

  it("deploys constantInitialVoiceCreditProxy Contract", async () => {
    constantInitialVoiceCreditProxy = await ConstantInitialVoiceCreditProxyFactory.deploy(0);
    await expect((await constantInitialVoiceCreditProxy.deployTransaction.wait()).status).to.not.equal(0);
  });

  it("deploys freeForAllGateKeeper Contract", async () => {
    freeForAllGateKeeper = await FreeForAllGateKeeperFactory.deploy();
    await expect((await freeForAllGateKeeper.deployTransaction.wait()).status).to.not.equal(0);
  });

  it("deploys Recipient Registry Contract", async () => {
    optimisticRecipientRegistry = await RecipientRegistryFactory.deploy(0, 0, deployerAddress);
    await expect((await optimisticRecipientRegistry.deployTransaction.wait()).status).to.not.equal(0);
  });

  it("deploys ERC20 token Contract", async () => {
    baseERC20Token = await BaseERC20TokenFactory.deploy(100);
    await expect((await baseERC20Token.deployTransaction.wait()).status).to.not.equal(0);
  });

  it("deploys QFI Contracts", async () => {
    optimisticRecipientRegistry = await RecipientRegistryFactory.deploy(0, 0, deployerAddress);
    grantRoundFactory = await GrantRoundFactory.deploy();
    grantRoundFactory.setRecipientRegistry(optimisticRecipientRegistry.address);
    pollFactory = await PollFactoryFactory.deploy();
    freeForAllGateKeeper = await FreeForAllGateKeeperFactory.deploy();
    constantInitialVoiceCreditProxy = await ConstantInitialVoiceCreditProxyFactory.deploy(0);
    qfi = await QFIFactory.deploy(
      baseERC20Token.address,
      grantRoundFactory.address,
      pollFactory.address,
      freeForAllGateKeeper.address,
      constantInitialVoiceCreditProxy.address
    );
    await expect((await qfi.deployTransaction.wait()).status).to.not.equal(0);
  });

  it("deploys MACI Contracts", async () => {
    optimisticRecipientRegistry = await RecipientRegistryFactory.deploy(0, 0, deployerAddress);
    pollFactory = await PollFactoryFactory.deploy();
    freeForAllGateKeeper = await FreeForAllGateKeeperFactory.deploy();
    constantInitialVoiceCreditProxy = await ConstantInitialVoiceCreditProxyFactory.deploy(0);
    maci = await MACIFactory.deploy(
      pollFactory.address,
      freeForAllGateKeeper.address,
      constantInitialVoiceCreditProxy.address
    );
    
    await expect((await maci.deployTransaction.wait()).status).to.not.equal(0);
  });

  it("transfers PollFactory ownership to Quadratic Funding Infrastructure Contract", async () => {
    grantRoundFactory = await GrantRoundFactory.deploy();
    grantRoundFactory.setRecipientRegistry(optimisticRecipientRegistry.address);

    pollFactory = await PollFactoryFactory.deploy();
    freeForAllGateKeeper = await FreeForAllGateKeeperFactory.deploy();
    constantInitialVoiceCreditProxy = await ConstantInitialVoiceCreditProxyFactory.deploy(0);

    qfi = await QFIFactory.deploy(
      baseERC20Token.address,
      grantRoundFactory.address,
      pollFactory.address,
      freeForAllGateKeeper.address,
      constantInitialVoiceCreditProxy.address
    );

    await expect(pollFactory.transferOwnership(qfi.address))
      .to.emit(pollFactory, "OwnershipTransferred")
      .withArgs(deployerAddress, qfi.address);
  });

  it("transfers messageAqFactory ownership to Poll Factory Contract", async () => {
    grantRoundFactory = await GrantRoundFactory.deploy();
    grantRoundFactory.setRecipientRegistry(optimisticRecipientRegistry.address);

    pollFactory = await PollFactoryFactory.deploy();
    messageAqFactory = await MessageAqFactoryFactory.deploy();
    freeForAllGateKeeper = await FreeForAllGateKeeperFactory.deploy();
    constantInitialVoiceCreditProxy = await ConstantInitialVoiceCreditProxyFactory.deploy(0);

    qfi = await QFIFactory.deploy(
      baseERC20Token.address,
      grantRoundFactory.address,
      pollFactory.address,
      freeForAllGateKeeper.address,
      constantInitialVoiceCreditProxy.address
    );

    await expect(messageAqFactory.transferOwnership(pollFactory.address))
      .to.emit(messageAqFactory, "OwnershipTransferred")
      .withArgs(deployerAddress, pollFactory.address);
  });

  it("initializes Quadratic Funding Infrastructure", async () => {
    grantRoundFactory = await GrantRoundFactory.deploy();
    grantRoundFactory.setRecipientRegistry(optimisticRecipientRegistry.address);

    pollFactory = await PollFactoryFactory.deploy();
    messageAqFactory = await MessageAqFactoryFactory.deploy();
    messageAqFactoryGrants = await MessageAqFactoryFactory.deploy();
    freeForAllGateKeeper = await FreeForAllGateKeeperFactory.deploy();
    constantInitialVoiceCreditProxy = await ConstantInitialVoiceCreditProxyFactory.deploy(0);
    vkRegistry = await VKRegistryFactory.deploy();

    qfi = await QFIFactory.deploy(
      baseERC20Token.address,
      grantRoundFactory.address,
      pollFactory.address,
      freeForAllGateKeeper.address,
      constantInitialVoiceCreditProxy.address
    );
    await expect(pollFactory.transferOwnership(qfi.address))
      .to.emit(pollFactory, "OwnershipTransferred")
      .withArgs(deployerAddress, qfi.address);

    await expect(grantRoundFactory.transferOwnership(qfi.address))
      .to.emit(grantRoundFactory, "OwnershipTransferred")
      .withArgs(deployerAddress, qfi.address);

    await expect(messageAqFactory.transferOwnership(pollFactory.address))
      .to.emit(messageAqFactory, "OwnershipTransferred")
      .withArgs(deployerAddress, pollFactory.address);

    await expect(messageAqFactoryGrants.transferOwnership(grantRoundFactory.address))
      .to.emit(messageAqFactoryGrants, "OwnershipTransferred")
      .withArgs(deployerAddress, grantRoundFactory.address);

    await expect(qfi.initialize(vkRegistry.address, messageAqFactory.address, messageAqFactoryGrants.address))
      .to.emit(qfi, "Init")
      .withArgs(vkRegistry.address, messageAqFactory.address);
  });
});
