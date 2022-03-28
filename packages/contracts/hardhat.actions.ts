import { task } from "hardhat/config";

import {
  PoseidonT3__factory,
  PoseidonT4__factory,
  PoseidonT5__factory,
  PoseidonT6__factory,
  GrantRoundFactory__factory,
  PollFactory__factory,
  MessageAqFactory__factory,
  QFI__factory,
  VkRegistry__factory,
  ConstantInitialVoiceCreditProxy__factory,
  FreeForAllGatekeeper__factory,
  OptimisticRecipientRegistry__factory,
  BaseERC20Token__factory,
  PollProcessorAndTallyer__factory,
  MockVerifier__factory,
} from "./typechain";

task("deploy", "Deploys and initializes QFI smart contracts", async (args, hre) => {
  //_baseDeposit: BigNumberish, _challengePeriodDuration: BigNumberish, _balance: BigNumberish
  const [deployer] = await hre.ethers.getSigners();
  const deployerAddress = await deployer.getAddress();
  const PoseidonT3Factory = new PoseidonT3__factory(deployer);
  const PoseidonT4Factory = new PoseidonT4__factory(deployer);
  const PoseidonT5Factory = new PoseidonT5__factory(deployer);
  const PoseidonT6Factory = new PoseidonT6__factory(deployer);
  const PoseidonT3 = await PoseidonT3Factory.deploy();
  const PoseidonT4 = await PoseidonT4Factory.deploy();
  const PoseidonT5 = await PoseidonT5Factory.deploy();
  const PoseidonT6 = await PoseidonT6Factory.deploy();

  const linkedLibraryAddresses = {
    ["qaci-contracts/contracts/crypto/Hasher.sol:PoseidonT5"]: PoseidonT5.address,
    ["qaci-contracts/contracts/crypto/Hasher.sol:PoseidonT3"]: PoseidonT3.address,
    ["qaci-contracts/contracts/crypto/Hasher.sol:PoseidonT6"]: PoseidonT6.address,
    ["qaci-contracts/contracts/crypto/Hasher.sol:PoseidonT4"]: PoseidonT4.address,
  };

  const GrantRoundFactory = new GrantRoundFactory__factory({ ...linkedLibraryAddresses }, deployer);
  const PollFactoryFactory = new PollFactory__factory({ ...linkedLibraryAddresses }, deployer);
  const MessageAqFactoryFactory = new MessageAqFactory__factory({ ...linkedLibraryAddresses }, deployer);
  const QFIFactory = new QFI__factory({ ...linkedLibraryAddresses }, deployer);

  const VKRegistryFactory = new VkRegistry__factory(deployer);
  const ConstantInitialVoiceCreditProxyFactory = new ConstantInitialVoiceCreditProxy__factory(deployer);
  const FreeForAllGateKeeperFactory = new FreeForAllGatekeeper__factory(deployer);
  const RecipientRegistryFactory = new OptimisticRecipientRegistry__factory(deployer);
  const BaseERC20TokenFactory = new BaseERC20Token__factory(deployer);
  const PollProcessorAndTallyerFactory = new PollProcessorAndTallyer__factory(deployer);
  const MockVerifierFactory = new MockVerifier__factory(deployer);

  const optimisticRecipientRegistry = await RecipientRegistryFactory.deploy(0, 0, deployerAddress);
  const grantRoundFactory = await GrantRoundFactory.deploy();
  grantRoundFactory.setRecipientRegistry(optimisticRecipientRegistry.address);
  const pollFactory = await PollFactoryFactory.deploy();
  const messageAqFactory = await MessageAqFactoryFactory.deploy();
  const messageAqFactoryGrants = await MessageAqFactoryFactory.deploy();
  const freeForAllGateKeeper = await FreeForAllGateKeeperFactory.deploy();
  const constantInitialVoiceCreditProxy = await ConstantInitialVoiceCreditProxyFactory.deploy(0);
  const vkRegistry = await VKRegistryFactory.deploy();
  const baseERC20Token = await BaseERC20TokenFactory.deploy(100);
  const mockVerifier = await MockVerifierFactory.deploy();
  const pollProcessorAndTallyer = await PollProcessorAndTallyerFactory.deploy(mockVerifier.address);
  const qfi = await QFIFactory.deploy(
    baseERC20Token.address,
    grantRoundFactory.address,
    pollFactory.address,
    freeForAllGateKeeper.address,
    constantInitialVoiceCreditProxy.address
  );
  console.log(`Deployed QFI at ${qfi.address}`);
  console.log(`Deployed FreeForAllGateKeeper at ${freeForAllGateKeeper.address}`);
  console.log(`Deployed ConstantInitialVoiceCreditProxy at ${constantInitialVoiceCreditProxy.address}`);
  console.log(`Deployed VkRegistry at ${vkRegistry.address}`);
  console.log(`Deployed BaseERC20Token at ${baseERC20Token.address}`);
  console.log(`Deployed MockVerifier at ${mockVerifier.address}`);
  console.log(`Deployed PollProcessorAndTallyer at ${pollProcessorAndTallyer.address}`);
  console.log(`Deployed RecipientRegistry at ${optimisticRecipientRegistry.address}`);
  console.log(`Deployed GrantRoundFactory at ${grantRoundFactory.address}`);
  console.log(`Deployed PollFactory at ${pollFactory.address}`);
  console.log(`Deployed MessageAqFactory at ${messageAqFactory.address}`);
  console.log(`Deployed MessageAqFactoryGrants at ${messageAqFactoryGrants.address}`);
});