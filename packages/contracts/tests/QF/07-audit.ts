import { ethers } from "hardhat";
import { BigNumber, BigNumberish, Signer } from "ethers";
import chai from "chai";
import { solidity } from "ethereum-waffle";
import { Command, Keypair, VerifyingKey } from "qaci-domainobjs";
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

import { GrantRound } from "../../typechain/GrantRound";
import { GrantRoundFactory } from "../../typechain/GrantRoundFactory";
import { PollFactory } from "../../typechain/PollFactory";
import { MessageAqFactory } from "../../typechain/MessageAqFactory";
import { QFI } from "../../typechain/QFI";

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

import { MessageStruct } from "../../typechain/GrantRound";
import { hash4, hash5 } from "qaci-crypto";
import { MaciState } from 'qaci-core';

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

describe("End to End testing", () => {
  // Deployer and users to interact with the contracts
  let deployer: Signer;
  let user1: Signer;
  let user2: Signer;
  let user3: Signer;
  let coordinatorSigner: Signer;
  let fundingSource: Signer;
  let deployerAddress: string;
  let user1Address: string;
  let user2Address: string;
  let user3Address: string;
  let coordinatorAddress: string;
  let fundingSourceAddress: string;
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
  let grantRound: GrantRound;

  // Keys for contributions
  const contributorMaciKey = new Keypair();
  const contributorMaciPubKey = contributorMaciKey.pubKey.asContractParam();
  const coordinatorKey = new Keypair();
  const coordinatorPublicKey = new Keypair().pubKey.asContractParam();
  let message: MessageStruct;
  let hashMessangeAndEncPubKey: BigInt;

  const duration = 30;
  const maxValues = {
    maxMessages: 25,
    maxVoteOptions: 25,
  };
  const treeDepths = {
    intStateTreeDepth: 2,
    messageTreeDepth: 2,
    messageTreeSubDepth: 2,
    voteOptionTreeDepth: 2,
  };
  const defaultMessageTreeArity = 5;
  const defaultStateTreeArity = 5;
  const batchSizes = {
    messageBatchSize: defaultMessageTreeArity ** treeDepths.messageTreeSubDepth,
    tallyBatchSize: defaultStateTreeArity ** treeDepths.intStateTreeDepth,
  };
  // Finalize.
  const tallyResults = {
    alphaDenominator:BigInt(1),
    finalSbCommitment: BigInt(999999999999),
    finalTallyCommitment: BigInt(999999999999),
  };

  beforeEach(async () => {
    [deployer, user1, user2, user3, coordinatorSigner, fundingSource] = await ethers.getSigners();
    deployerAddress = await deployer.getAddress();
    user1Address = await user1.getAddress();
    user2Address = await user2.getAddress();
    user3Address = await user3.getAddress();
    coordinatorAddress = await coordinatorSigner.getAddress();
    fundingSourceAddress = await fundingSource.getAddress();
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

    // Configure factories
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

    // Deploy contracts
    optimisticRecipientRegistry = await RecipientRegistryFactory.deploy(0, 0, deployerAddress);
    grantRoundFactory = await GrantRoundFactory.deploy();
    grantRoundFactory.setRecipientRegistry(optimisticRecipientRegistry.address);
    pollFactory = await PollFactoryFactory.deploy();
    messageAqFactory = await MessageAqFactoryFactory.deploy();
    messageAqFactoryGrants = await MessageAqFactoryFactory.deploy();
    freeForAllGateKeeper = await FreeForAllGateKeeperFactory.deploy();
    constantInitialVoiceCreditProxy = await ConstantInitialVoiceCreditProxyFactory.deploy(100);
    vkRegistry = await VKRegistryFactory.deploy();
    baseERC20Token = await BaseERC20TokenFactory.deploy(10000000 * 1e5);
    mockVerifier = await MockVerifierFactory.deploy();
    pollProcessorAndTallyer = await PollProcessorAndTallyerFactory.deploy(mockVerifier.address);

    // Deploy QFI
    qfi = await QFIFactory.deploy(
      baseERC20Token.address,
      grantRoundFactory.address,
      pollFactory.address,
      freeForAllGateKeeper.address,
      constantInitialVoiceCreditProxy.address
    );

    // Transfer ownership to the correct addresses/contracts
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

    // Initialize
    await qfi.initialize(
        vkRegistry.address,
        messageAqFactory.address,
        messageAqFactoryGrants.address,
      )

    // Set verifying keys 
    const stateTreeDepth = await qfi.stateTreeDepth();
    const _stateTreeDepth = stateTreeDepth.toString();
    const _intStateTreeDepth = 1;
    const _messageTreeDepth = 4;
    const _voteOptionTreeDepth = 2;
    const _messageBatchSize = 25;
    const _processVk = <VerifyingKeyStruct>testProcessVk.asContractParam();
    const _tallyVk = <VerifyingKeyStruct>testTallyVk.asContractParam();

    let { status } = await vkRegistry
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

    expect(status).to.equal(1);

    const pSig = await vkRegistry.genProcessVkSig(
      _stateTreeDepth,
      _messageTreeDepth,
      _voteOptionTreeDepth,
      _messageBatchSize
    );

    const isPSigSet = await vkRegistry.isProcessVkSet(pSig);
    expect(isPSigSet).to.be.true;

    const tSig = await vkRegistry.genTallyVkSig(_stateTreeDepth, _intStateTreeDepth, _voteOptionTreeDepth);
    const isTSigSet = await vkRegistry.isTallyVkSet(tSig);
    expect(isTSigSet).to.be.true;

    // Check that the VKs are set
    const processVkOnChain = await vkRegistry.getProcessVk(
      _stateTreeDepth,
      _messageTreeDepth,
      _voteOptionTreeDepth,
      _messageBatchSize
    );
    expect(processVkOnChain).to.have.own.property("alpha1");

    const tallyVkOnChain = await vkRegistry.getTallyVk(_stateTreeDepth, _intStateTreeDepth, _voteOptionTreeDepth);
    expect(tallyVkOnChain).to.have.own.property("alpha1");
    expect(tallyVkOnChain.alpha1.x).to.not.be.empty;
  

    // Set PollyProcessor and Tallyer
    ( {status}  = await qfi.setPollProcessorAndTallyer(pollProcessorAndTallyer.address)
      .then((tx) => tx.wait()));

    expect(status).to.equal(1);
    expect(await qfi.pollProcessorAndTallyer()).to.not.equal(ethers.constants.AddressZero);

    // Transfer funds around 
    await baseERC20Token.connect(deployer).transfer(user1Address, 100 * 1e5);
    await baseERC20Token.connect(deployer).transfer(user2Address, 100 * 1e5);
    await baseERC20Token.connect(deployer).transfer(user3Address, 100 * 1e5);
    await baseERC20Token.connect(deployer).transfer(fundingSourceAddress, 500 * 1e5);
  });

  // Tests related to initialization of QFI
  describe('Initialization', async () => {
    it('reverts - cannot init twice', async () => {
      await expect(qfi.connect(deployer).initialize(
        vkRegistry.address,
        messageAqFactory.address,
        messageAqFactoryGrants.address
      )).to.revertedWith('QFI: Cannot initialize while not in the NOT_INITIALIZED stage');
    });

    it('reverts - only admin can call initialize', async () => {
      await expect(qfi.connect(user1).initialize(
        vkRegistry.address,
        messageAqFactory.address,
        messageAqFactoryGrants.address
      )).to.revertedWith('Ownable: caller is not the owner');
    });
  });

  // Tests related to contributions 
  describe('Contributions', async () => {
    it('allows one user to contribute', async () => {
      const contributionAmount = 10 * 1e5;
  
      const userBalanceBefore = await baseERC20Token.balanceOf(user1Address);
      // approve tokens 
      await baseERC20Token.connect(user1).approve(qfi.address, contributionAmount);
  
      const contributorCountBefore = await qfi.grantRoundToContributorsCount(await qfi.nextGrantRoundId())
  
      // Contribute 
      await qfi.connect(user1).contribute(
        contributorMaciPubKey,
        contributionAmount,
      )
  
      const userBalanceAfter = await baseERC20Token.balanceOf(user1Address);
      const delta = Number(userBalanceBefore) - Number(contributionAmount);
      expect(delta).to.be.equal(userBalanceAfter);
  
      // Check that the contributors count increased 
      const contributorCountAfter = await qfi.grantRoundToContributorsCount(await qfi.nextGrantRoundId())
      expect(Number(contributorCountBefore) + 1).to.be.equal(contributorCountAfter);
    });

    it('reverts - cannot contribute twice', async () => {
      const contributionAmount = 10 * 1e5;
  
      // approve tokens 
      await baseERC20Token.connect(user1).approve(qfi.address, contributionAmount);
  
      // Contribute 
      await qfi.connect(user1).contribute(
        contributorMaciPubKey,
        contributionAmount,
      );
  
      // Contribute twice
      await expect(qfi.connect(user1).contribute(
        contributorMaciPubKey,
        contributionAmount
      )).to.revertedWith("QFI: top ups not supported, donate to matching pool instead");
    });
  
    it('allows multiple users to contribute', async () => {
      const contributionAmount = 10 * 1e5;
      const contributors = [user1, user2];
      const contributorsBefore = await qfi.grantRoundToContributorsCount(await qfi.nextGrantRoundId());
  
      for (const user of contributors) {
        await baseERC20Token.connect(user).approve(qfi.address, contributionAmount);
        await qfi.connect(user).contribute(
          contributorMaciPubKey,
          contributionAmount
        )
      }
  
      expect(
        await qfi.grantRoundToContributorsCount(
          await qfi.nextGrantRoundId()
          )
        ).to.be.equal(Number(contributorsBefore) + contributors.length);
    });
  
    it('returns the correct number of contributions', async () => {
      const contributionAmount = 10 * 1e5;
      const contributors = [user1, user2];
  
      for (const user of contributors) {
        await baseERC20Token.connect(user).approve(qfi.address, contributionAmount);
        await qfi.connect(user).contribute(
          contributorMaciPubKey,
          contributionAmount
        )
      }
  
      expect(await qfi.getTotalContributions()).to.be.equal(contributors.length);
    });
  });

  // Tests related to withdrawals of contributions
  describe('Withdrawals', async () => {
    it('allows to withdraw', async () => {
      const contributionAmount = 10 * 1e5;
      // approve tokens 
      await baseERC20Token.connect(user1).approve(qfi.address, contributionAmount);
  
      // Contribute 
      await qfi.connect(user1).contribute(
        contributorMaciPubKey,
        contributionAmount,
      )
  
      const contributorCountAfterContribution = await qfi.grantRoundToContributorsCount(await qfi.nextGrantRoundId())
  
      // Withdraw 
      await qfi.connect(user1).withdrawContribution();
      
      const contributorCountAfterWithdraw = await qfi.grantRoundToContributorsCount(await qfi.nextGrantRoundId());
      expect(Number(contributorCountAfterContribution) - 1).to.be.equal(contributorCountAfterWithdraw);
    });
  
    it('reverts - nothing to withdraw', async () => {
      expect(qfi.connect(user1).withdrawContribution()).to.revertedWith('FundingRound: Nothing to withdraw');
    });  
  });

  // Tests related to deployment of new grant rounds
  describe('GrantRound deploy', async () => {
    it('deploys a new GrantRound', async () => {
      // Deploy a grant round 
      await qfi.connect(deployer).deployGrantRound(
        duration,
        maxValues,
        treeDepths,
        contributorMaciPubKey,
        coordinatorAddress
      );
  
      // Check that the grantRoundId increased
      expect(await qfi.nextGrantRoundId()).to.be.equal(1);
    });
  
    it('reverts - only the owner can deploy a new GrantRound', async () => {
      expect(qfi.connect(user1).deployGrantRound(
        duration,
        maxValues,
        treeDepths,
        contributorMaciPubKey,
        coordinatorAddress
      )).to.revertedWith("Ownable: caller is not the owner");
    });
  
    it('reverts - cannot deploy another GrantRound while the current is not finalized', async () => {
      // Deploy a grant round 
      await qfi.connect(deployer).deployGrantRound(
        duration,
        maxValues,
        treeDepths,
        contributorMaciPubKey,
        coordinatorAddress
      );
  
      // Check that the grantRoundId increased
      expect(await qfi.nextGrantRoundId()).to.be.equal(1);
  
      await expect(
        qfi.connect(deployer).deployGrantRound(
          duration,
          maxValues,
          treeDepths,
          contributorMaciPubKey,
          coordinatorAddress
        )
      ).to.revertedWith('MACI: Cannot deploy a new grant round while not in the WAITING_FOR_SIGNUPS_AND_TOPUPS stage');
    });
  
    it('reverts - cannot contribute once a GrantRound has been deployed', async () => {
      // Deploy a grant round 
      await qfi.connect(deployer).deployGrantRound(
        duration,
        maxValues,
        treeDepths,
        contributorMaciPubKey,
        coordinatorAddress
      );
  
      const contributionAmount = 10 * 1e5;
  
      // approve tokens 
      await baseERC20Token.connect(user1).approve(qfi.address, contributionAmount);
  
      // Contribute 
      await expect(qfi.connect(user1).contribute(
        contributorMaciPubKey,
        contributionAmount,
      )).to.revertedWith('QFI: Not accepting signups or top ups');
    });
  
    it('reverts - cannot acceptContributionsAndTopUpsBeforeNewRound while not in the FINALIZED stage', async () => {
      await expect(
        qfi.connect(deployer).acceptContributionsAndTopUpsBeforeNewRound())
        .to.revertedWith('QFI: Cannot deploy a new grant round while not in the FINALIZED stage');
    });
  
    it('reverts - cannot get non existent GrantRound', async () => {
      await expect(
        qfi.getGrantRound(0)
      ).to.revertedWith('MACI: grantRound with _grantRoundId does not exist');
    });
  
    it('returns an existing GrantRound', async () => {
      // Deploy a grant round 
      await qfi.connect(deployer).deployGrantRound(
        duration,
        maxValues,
        treeDepths,
        contributorMaciPubKey,
        coordinatorAddress
      );
  
      const grantRound = await qfi.getGrantRound(0);
      expect(grantRound).to.not.be.eq("");
    });
  });

  // Tests related to closing voting on QFI
  describe('Close voting on QFI', async () => {
    it('allows the owner to close the voting period on QFI', async () => {
      // Deploy a grant round 
      await qfi.connect(deployer).deployGrantRound(
        duration,
        maxValues,
        treeDepths,
        contributorMaciPubKey,
        coordinatorAddress
      );
  
      // Check that the grantRoundId increased
      expect(await qfi.nextGrantRoundId()).to.be.equal(1);
      await expect(qfi.connect(deployer).closeVotingAndWaitForDeadline()).to.emit(
        qfi, 'VotingPeriodClosed'
      ).withArgs(
        3 // WAITING_FOR_FINALIZATION
      );
    });

    it('reverts - only admin can call this function', async () => {
      // Deploy a grant round 
      await qfi.connect(deployer).deployGrantRound(
        duration,
        maxValues,
        treeDepths,
        contributorMaciPubKey,
        coordinatorAddress
      );
  
      // Check that the grantRoundId increased
      expect(await qfi.nextGrantRoundId()).to.be.equal(1);
      await expect(qfi.connect(user1).closeVotingAndWaitForDeadline()).to.revertedWith(
        'Ownable: caller is not the owner'
      );
    });

    it('reverts - wrong stage', async () => {
      await expect(qfi.connect(deployer).closeVotingAndWaitForDeadline()).to.revertedWith(
        'QFI: Cannot finalize a grant round while not in the VOTING_PERIOD_OPEN stage'
      );
    });
  });

  // Tests related to FundsManager (inherited by QFI)
  describe('Funding Sources', async () => {
    it('allows anyone to add a funding source', async () => {
      // Add a funding source
      await expect (qfi.connect(user1).addFundingSource(
        fundingSourceAddress
      )).to.emit(qfi, 'FundingSourceAdded').withArgs(fundingSourceAddress);
    });
  
    it('allows self to remove funding source', async () => {
      // Add a funding source
      await expect (qfi.connect(user1).addFundingSource(
        fundingSourceAddress
      )).to.emit(qfi, 'FundingSourceAdded').withArgs(fundingSourceAddress);
  
      expect(await qfi.connect(fundingSource).removeFundingSource(
        fundingSourceAddress
      )).to.emit(qfi, 'FundingSourceRemoved');
    });
  
    it('reverts - cannot remove a funding source if not owner or self', async () => {
      // Add a funding source
      await expect (qfi.connect(user1).addFundingSource(
        fundingSourceAddress
      )).to.emit(qfi, 'FundingSourceAdded').withArgs(fundingSourceAddress);
  
      await expect(qfi.connect(user1).removeFundingSource(
        fundingSourceAddress
        )).to.revertedWith('FundsManager: Funding source not found');
    });
  });

  // Testing message publishing
  describe('Publishing messages', async () => {
    beforeEach(async () => {
      // Deploy a grant round 
      await qfi.connect(deployer).deployGrantRound(
        duration,
        maxValues,
        treeDepths,
        contributorMaciPubKey,
        coordinatorAddress
      );

      // Get the GrantRound address and create the testing object
      const grantRoundAddress = await qfi.currentGrantRound()
      grantRound = await ethers.getContractAt('GrantRound', grantRoundAddress);

      // Message generation.
      const command = new Command(
        BigInt(1),
        contributorMaciKey.pubKey,
        BigInt(0),
        BigInt(9),
        BigInt(1),
        BigInt(0),
        BigInt(0)
      );
      const signature = command.sign(contributorMaciKey.privKey);
      const sharedKey = Keypair.genEcdhSharedKey(
        contributorMaciKey.privKey,
        coordinatorKey.pubKey
      );
      const encMessage = command.encrypt(signature, sharedKey);
      message = <MessageStruct>encMessage.asContractParam();

      // Hash message and public key (necessary for mock).
      // nb. can be calculated for one message because the batch is composed of three instances of the same message.
      const n: any[] = [];
      const m: any[] = [];

      n.push(message.data[0]);
      n.push(message.data[1]);
      n.push(message.data[2]);
      n.push(message.data[3]);
      n.push(message.data[4]);

      m.push(message.data[5]);
      m.push(message.data[6]);
      m.push(message.data[7]);
      m.push(message.data[8]);
      m.push(message.data[9]);

      hashMessangeAndEncPubKey = hash4([
        hash5(n),
        hash5(m),
        BigInt(coordinatorKey.pubKey.asContractParam().x),
        BigInt(coordinatorKey.pubKey.asContractParam().y),
      ]);
    });

    it('allows anyone to publish a batch of messages', async () => {
      expect(await 
        grantRound.connect(user1).publishMessageBatch(
          [message],
          [coordinatorPublicKey]
        )
      ).to.emit(grantRound, 'Voted').withArgs(user1Address);
    });

    it('reverts - publish mismatched arrays batch message', async () => {
      await expect(grantRound.connect(user1).publishMessageBatch(
        [message, message],
        [coordinatorPublicKey]
      )).to.revertedWith("GrantRound: _messages and _encPubKeys should be the same length");
    });
  });

  // Tests related to the recipient registry (Optimistic Recipient Registry)
  describe('Recipient Registry', async () => {
    beforeEach(async () => {
      // Set the base deposit
      await optimisticRecipientRegistry.connect(deployer).setBaseDeposit(
        1 * 1e5
      );
      // Set the recipient limit 
      await optimisticRecipientRegistry.connect(deployer).setMaxRecipients(
        5
      );
    });

    // Check that the baseDeposit was correct 
    it('confirms that the base deposit was set correctly', async () => {
      const baseDeposit = await optimisticRecipientRegistry.baseDeposit();
      expect(baseDeposit).to.equal(1 * 1e5);
    });

    // Set the baseDeposit with an arbitrary address
    it('reverts - arbitrary user setting base deposit', async () => {
      await expect(optimisticRecipientRegistry.connect(user1).setBaseDeposit(
        1 * 1e3)
      ).to.revertedWith("Ownable: caller is not the owner");
    });

    // Add a recipient
    it('allows anyone to add a recipient', async () => {
      const packed = ethers.utils.solidityPack(["address", "string"], [user2Address, "Metadata"]);
      const recipientId = ethers.utils.keccak256(packed);
      const blockTimestamp = (await ethers.provider.getBlock("latest")).timestamp + 1;
      await expect(optimisticRecipientRegistry.connect(user1).addRecipient(
        user2Address, 'Metadata', {value: 1 * 1e5}
      )).to.emit(optimisticRecipientRegistry, 'RequestSubmitted')
      .withArgs(
        recipientId,
        0,
        user2Address,
        'Metadata',
        blockTimestamp
      );
    });

    // Try to add a recipient with less deposit than necessary
    it('reverts - insufficient deposit amount', async () => {
      await expect(
        optimisticRecipientRegistry.connect(user1).addRecipient(
          user2Address, 'Metadata', {value: 1 * 1e4}
        )
      ).to.revertedWith('RecipientRegistry: Incorrect deposit amount');
    });

    // Adding and approving a recipient 
    it('allows the owner to approve a recipient request', async () => {
      const packed = ethers.utils.solidityPack(["address", "string"], [user2Address, "Metadata"]);
      const recipientId = ethers.utils.keccak256(packed);
      let blockTimestamp = (await ethers.provider.getBlock("latest")).timestamp + 1;
      await expect(optimisticRecipientRegistry.connect(user1).addRecipient(
        user2Address, 'Metadata', {value: 1 * 1e5}
      )).to.emit(optimisticRecipientRegistry, 'RequestSubmitted')
      .withArgs(
        recipientId,
        0,
        user2Address,
        'Metadata',
        blockTimestamp
      );

      blockTimestamp = (await ethers.provider.getBlock("latest")).timestamp + 1;
      await expect(optimisticRecipientRegistry.connect(deployer).executeRequest(
        recipientId
      )).to.emit(
        optimisticRecipientRegistry, 'RequestResolved').withArgs(
          recipientId,
          0, // RequestType.Registration
          false,
          1,
          blockTimestamp
        );
    });

    it('allows arbitrary users to acccept a request after the challenge time', async () => {
      const packed = ethers.utils.solidityPack(["address", "string"], [user2Address, "Metadata"]);
      const recipientId = ethers.utils.keccak256(packed);
      let blockTimestamp = (await ethers.provider.getBlock("latest")).timestamp + 1;
      await expect(optimisticRecipientRegistry.connect(user1).addRecipient(
        user2Address, 'Metadata', {value: 1 * 1e5}
      )).to.emit(optimisticRecipientRegistry, 'RequestSubmitted')
      .withArgs(
        recipientId,
        0,
        user2Address,
        'Metadata',
        blockTimestamp
      );

      blockTimestamp = (await ethers.provider.getBlock("latest")).timestamp + 1;
      await expect(optimisticRecipientRegistry.connect(user1).executeRequest(
        recipientId
      )).to.emit(
        optimisticRecipientRegistry, 'RequestResolved').withArgs(
          recipientId,
          0, // RequestType.Registration
          false,
          1,
          blockTimestamp
        );
    });

    it('reverts - challenge time has not passed therefore only owner can execute a request', async () => {
      await optimisticRecipientRegistry.connect(deployer).setChallengePeriodDuration(
        500000000
      );
      const packed = ethers.utils.solidityPack(["address", "string"], [user2Address, "Metadata"]);
      const recipientId = ethers.utils.keccak256(packed);
      let blockTimestamp = (await ethers.provider.getBlock("latest")).timestamp + 1;
      await expect(optimisticRecipientRegistry.connect(user1).addRecipient(
        user2Address, 'Metadata', {value: 1 * 1e5}
      )).to.emit(optimisticRecipientRegistry, 'RequestSubmitted')
      .withArgs(
        recipientId,
        0,
        user2Address,
        'Metadata',
        blockTimestamp
      );

      blockTimestamp = (await ethers.provider.getBlock("latest")).timestamp + 1;
      await expect(optimisticRecipientRegistry.connect(user1).executeRequest(
        recipientId
      )).to.revertedWith('RecipientRegistry: Challenge period is not over');
    });

    it('allows the owner to challenge a request', async () => {
      const packed = ethers.utils.solidityPack(["address", "string"], [user2Address, "Metadata"]);
      const recipientId = ethers.utils.keccak256(packed);
      let blockTimestamp = (await ethers.provider.getBlock("latest")).timestamp + 1;
      await expect(optimisticRecipientRegistry.connect(user1).addRecipient(
        user2Address, 'Metadata', {value: 1 * 1e5}
      )).to.emit(optimisticRecipientRegistry, 'RequestSubmitted')
      .withArgs(
        recipientId,
        0,
        user2Address,
        'Metadata',
        blockTimestamp
      );

      blockTimestamp = (await ethers.provider.getBlock("latest")).timestamp + 1;
      await expect(optimisticRecipientRegistry.connect(deployer).challengeRequest(
        recipientId,
        user1Address
      )).to.emit(optimisticRecipientRegistry, 'RequestResolved').withArgs(
        recipientId,
        0,
        true,
        0,
        blockTimestamp
      );
    });

    it('return false - only the owner can set the max number of recipients', async () => {
      const result = await optimisticRecipientRegistry.connect(user1).setMaxRecipients(
        5
      );
      expect(result).to.not.be.true;
    });
  });

  // All tests related to finalizing a round
  describe('Finalize a round', async () => {
    beforeEach(async () => {
      // Contribute
      const contributionAmount = 10 * 1e5;
      const contributors = [user1, user2];
      const contributorsBefore = await qfi.grantRoundToContributorsCount(await qfi.nextGrantRoundId());
  
      for (const user of contributors) {
        await baseERC20Token.connect(user).approve(qfi.address, contributionAmount);
        await qfi.connect(user).contribute(
          contributorMaciPubKey,
          contributionAmount
        )
      }
  
      // Check that the contributors increased correctly
      expect(
        await qfi.grantRoundToContributorsCount(
          await qfi.nextGrantRoundId()
          )
        ).to.be.equal(Number(contributorsBefore) + contributors.length);

      // Deploy GrantRound
      await qfi.connect(deployer).deployGrantRound(
        duration,
        maxValues,
        treeDepths,
        contributorMaciPubKey,
        coordinatorAddress
      );
  
      // Check that the grantRoundId increased
      expect(await qfi.nextGrantRoundId()).to.be.equal(1);

      // Save the GrantRound
      const grantRoundAddress = await qfi.currentGrantRound()
      grantRound = await ethers.getContractAt('GrantRound', grantRoundAddress);

      // Add a funding source (fundingSource)
      await expect (qfi.connect(user1).addFundingSource(
        fundingSourceAddress
      )).to.emit(qfi, 'FundingSourceAdded').withArgs(fundingSourceAddress);

      // Add a recipient (user3)
      await optimisticRecipientRegistry.connect(deployer).setBaseDeposit(
        1 * 1e5
      );
      const packed = ethers.utils.solidityPack(["address", "string"], [user3Address, "Metadata"]);
      const recipientId = ethers.utils.keccak256(packed);
      const blockTimestamp = (await ethers.provider.getBlock("latest")).timestamp + 1;
      await expect(optimisticRecipientRegistry.connect(user1).addRecipient(
        user2Address, 'Metadata', {value: 1 * 1e5}
        )).to.emit(optimisticRecipientRegistry, 'RequestSubmitted')
        .withArgs(
          recipientId,
          0,
          user2Address,
          'Metadata',
          blockTimestamp
      );

      // Vote
      // Message generation.
      const command = new Command(
        BigInt(1),
        contributorMaciKey.pubKey,
        BigInt(0),
        BigInt(9),
        BigInt(1),
        BigInt(0),
        BigInt(0)
      );

      const signature = command.sign(contributorMaciKey.privKey);
      const sharedKey = Keypair.genEcdhSharedKey(
        contributorMaciKey.privKey,
        coordinatorKey.pubKey
      );
      const encMessage = command.encrypt(signature, sharedKey);
      message = <MessageStruct>encMessage.asContractParam();

      // Cast the votes
      const voters = [user1, user2];
      for (const user of voters) {
        await expect(grantRound.connect(user).publishMessageBatch(
          [message],
          [coordinatorPublicKey]
        )).to.emit(grantRound, 'Voted').withArgs(await user.getAddress());
      }
    });
  });

  // Testing related to claim of funds
  describe('Claim funds', async () => {
    beforeEach(async () => {
      // Contribute
      const contributionAmount = 10 * 1e5;
      const contributors = [user1, user2];
      const contributorsBefore = await qfi.grantRoundToContributorsCount(await qfi.nextGrantRoundId());
  
      for (const user of contributors) {
        await baseERC20Token.connect(user).approve(qfi.address, contributionAmount);
        await qfi.connect(user).contribute(
          contributorMaciPubKey,
          contributionAmount
        )
      }
  
      // Check that the contributors increased correctly
      expect(
        await qfi.grantRoundToContributorsCount(
          await qfi.nextGrantRoundId()
          )
        ).to.be.equal(Number(contributorsBefore) + contributors.length);

      // Deploy GrantRound
      await qfi.connect(deployer).deployGrantRound(
        duration,
        maxValues,
        treeDepths,
        contributorMaciPubKey,
        coordinatorAddress
      );
  
      // Check that the grantRoundId increased
      expect(await qfi.nextGrantRoundId()).to.be.equal(1);

      // Save the GrantRound
      const grantRoundAddress = await qfi.currentGrantRound()
      grantRound = await ethers.getContractAt('GrantRound', grantRoundAddress);
    });
    
    it('reverts - GrantRound is not finalized', async () => {
      await expect(
        grantRound.connect(user1).claimFunds(
          1,
          5,
          [[5,5], [5,5]],
          1,
          1,
          1,
          1,
          1,
        )
      ).to.be.revertedWith("GrantRound: Round not finalized");
    });

    it('reverts - GrantRound was cancelled', async () => {
      await grantRound.connect(deployer).cancel();
      await expect(
        grantRound.connect(user1).claimFunds(
          1,
          5,
          [[5,5], [5,5]],
          1,
          1,
          1,
          1,
          1,
        )
      ).to.be.revertedWith("GrantRound: Round has been cancelled");
    });

    it.skip('reverts - Proof is not valid', async () => {
      // Cancel works 
      await expect(
        grantRound.connect(user1).claimFunds(
          1,
          5,
          [[5,5], [5,5]],
          1,
          1,
          1,
          1,
          1,
        )
      ).to.be.revertedWith("FundingRound: Incorrect tally result");
    });
  });

  // Tests related to cancelling a GrantRound
  describe('Canceling a GrantRound', async () => {
    beforeEach(async () => {
      // Deploy GrantRound
      await qfi.connect(deployer).deployGrantRound(
        duration,
        maxValues,
        treeDepths,
        contributorMaciPubKey,
        coordinatorAddress
      );

      // Check that the grantRoundId increased
      expect(await qfi.nextGrantRoundId()).to.be.equal(1);

      // Save the GrantRound
      const grantRoundAddress = await qfi.currentGrantRound()
      grantRound = await ethers.getContractAt('GrantRound', grantRoundAddress);
    });

    it('allows the owner to cancel', async () => {
      await expect(grantRound.connect(deployer).cancel())
      .to.emit(grantRound, 'GrantRoundCancelled')
      .withArgs(true, true);
    });

    it('reverts - arbitrary users cannot cancel', async () => {
      await expect(grantRound.connect(user1).cancel())
      .to.revertedWith("Ownable: caller is not the owner");
    });

    it('reverts - cannot cancel twice', async () => {
      await expect(grantRound.connect(deployer).cancel())
      .to.emit(grantRound, 'GrantRoundCancelled')
      .withArgs(true, true);

      await expect(grantRound.connect(deployer).cancel())
      .to.revertedWith("GrantRound: Already finalized");
    });
  });

  // Testing related to processing messages
  describe('Processing messages', async () => {
    beforeEach(async () => {
      // Contribute
      const contributionAmount = 10 * 1e5;
      const contributors = [user1, user2];
      const contributorsBefore = await qfi.grantRoundToContributorsCount(await qfi.nextGrantRoundId());
  
      for (const user of contributors) {
        await baseERC20Token.connect(user).approve(qfi.address, contributionAmount);
        await qfi.connect(user).contribute(
          contributorMaciPubKey,
          contributionAmount
        )
      }
  
      expect(
        await qfi.grantRoundToContributorsCount(
          await qfi.nextGrantRoundId()
          )
        ).to.be.equal(Number(contributorsBefore) + contributors.length);

      // Deploy grant round 
      await qfi.connect(deployer).deployGrantRound(
        duration,
        maxValues,
        treeDepths,
        contributorMaciPubKey,
        coordinatorAddress
      );

      // Get the GrantRound address and create the testing object
      const grantRoundAddress = await qfi.currentGrantRound()
      grantRound = await ethers.getContractAt('GrantRound', grantRoundAddress);

      // Vote 
      const command = new Command(
        BigInt(1),
        contributorMaciKey.pubKey,
        BigInt(0),
        BigInt(9),
        BigInt(1),
        BigInt(0),
        BigInt(0)
      );
      const signature = command.sign(contributorMaciKey.privKey);
      const sharedKey = Keypair.genEcdhSharedKey(
        contributorMaciKey.privKey,
        coordinatorKey.pubKey
      );
      const encMessage = command.encrypt(signature, sharedKey);
      message = <MessageStruct>encMessage.asContractParam();

      const voters = [user2, user3];
      for (const user of voters) {
        expect(await 
          grantRound.connect(user).publishMessageBatch(
            [message],
            [coordinatorPublicKey]
          )
        ).to.emit(grantRound, 'Voted').withArgs(await user.getAddress());
      }
    });

    it('merges votes on GrantRound (Poll)', async () => {
      // Get deploy time and duration 
      const deployTimeAndDuration = await grantRound.getDeployTimeAndDuration();
      const hardHatProvider = ethers.provider;
      // Move forward 
      await hardHatProvider.send("evm_increaseTime", [Number(deployTimeAndDuration[1]) + 30]);
      await hardHatProvider.send("evm_mine", []);
      await expect(grantRound.connect(deployer).mergeMessageAqSubRoots(0)).to.emit(
        grantRound, 'MergeMessageAqSubRoots'
      ).withArgs(0);
      await expect(grantRound.mergeMessageAq()).to.emit(grantRound, "MergeMessageAq");
    });

    it('reverts - voting period not passed', async () => {
      await expect(grantRound.connect(deployer).mergeMessageAqSubRoots(0))
      .to.revertedWith('PollE04');
    });

    it('merges mergeMessageAqSubRoots', async () => {
      // Get deploy time and duration 
      const deployTimeAndDuration = await grantRound.getDeployTimeAndDuration();
      const hardHatProvider = ethers.provider;
      // Move forward 
      await hardHatProvider.send("evm_increaseTime", [Number(deployTimeAndDuration[1]) + 30]);
      await hardHatProvider.send("evm_mine", []);
      // Merge
      await expect(grantRound.connect(deployer).mergeMessageAqSubRoots(0)).to.emit(
        grantRound, 'MergeMessageAqSubRoots'
      ).withArgs(0);
      await expect(grantRound.connect(deployer).mergeMessageAq()).to.emit(
        grantRound, 'MergeMessageAq'
      );
    });
  });

  // Transferring the matching funds to the receivers
  describe('transferMatchingFunds', async () => {
    beforeEach(async () => {
      // Contribute
      const contributionAmount = 10 * 1e5;
      const contributors = [user1, user2];
      const contributorsBefore = await qfi.grantRoundToContributorsCount(await qfi.nextGrantRoundId());
  
      for (const user of contributors) {
        await baseERC20Token.connect(user).approve(qfi.address, contributionAmount);
        await qfi.connect(user).contribute(
          contributorMaciPubKey,
          contributionAmount
        )
      }
  
      // Check that the contributors increased correctly
      expect(
        await qfi.grantRoundToContributorsCount(
          await qfi.nextGrantRoundId()
          )
        ).to.be.equal(Number(contributorsBefore) + contributors.length);

      // Deploy GrantRound
      await qfi.connect(deployer).deployGrantRound(
        duration,
        maxValues,
        treeDepths,
        contributorMaciPubKey,
        coordinatorAddress
      );
  
      // Check that the grantRoundId increased
      expect(await qfi.nextGrantRoundId()).to.be.equal(1);

      // Save the GrantRound
      const grantRoundAddress = await qfi.currentGrantRound()
      grantRound = await ethers.getContractAt('GrantRound', grantRoundAddress);
    });

    it.skip('reverts - GrantRound was not cancelled', async () => {
      await expect(grantRound.connect(deployer).transferMatchingFunds(
        1,
        10
      )).to.revertedWith('GrantRound: Round has been cancelled');
    }); 

    it('transfers the funds to the recipient', async () => {
      // Set max recipients
      await optimisticRecipientRegistry.connect(deployer).setMaxRecipients(
        5
      );

      // First add a recipient
      const packed = ethers.utils.solidityPack(["address", "string"], [user2Address, "Metadata"]);
      const recipientId = ethers.utils.keccak256(packed);
      let blockTimestamp = (await ethers.provider.getBlock("latest")).timestamp + 1;
      await expect(optimisticRecipientRegistry.connect(user1).addRecipient(
        user2Address, 'Metadata', {value: 0}
      )).to.emit(optimisticRecipientRegistry, 'RequestSubmitted')
      .withArgs(
        recipientId,
        0,
        user2Address,
        'Metadata',
        blockTimestamp
      );

      blockTimestamp = (await ethers.provider.getBlock("latest")).timestamp + 1;
      await expect(optimisticRecipientRegistry.connect(deployer).executeRequest(
        recipientId
      )).to.emit(
        optimisticRecipientRegistry, 'RequestResolved').withArgs(
          recipientId,
          0, // RequestType.Registration
          false,
          1,
          blockTimestamp
        );

      // Transfer tokens to the contract
      await baseERC20Token.connect(deployer).transfer(grantRound.address, 100);
      await expect(grantRound.connect(deployer).transferMatchingFunds(
        1,
        100,
      )).to.emit(grantRound, 'FundsClaimed').withArgs(
        user2Address,
        1,
        100
      );
    });

    it('reverts - not enough balance to transfer matching funds', async () => {
      // Cancel first
      await grantRound.connect(deployer).cancel();
      const balance = await baseERC20Token.balanceOf(grantRound.address);
      await expect(grantRound.connect(deployer).transferMatchingFunds(
        1,
        Number(balance)+1
      )).to.revertedWith('GrantRound: not enough funds in the contract to transfer matching funds');
    });
    
    it('reverts - only the owner can call this function', async () => {
      await expect(grantRound.connect(user1).transferMatchingFunds(
        1,
        1
      )).to.revertedWith('Ownable: caller is not the owner');
    });
  });
});