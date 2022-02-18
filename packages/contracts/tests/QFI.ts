import { ethers } from "hardhat";
import chai from "chai";
import { deployContract, solidity } from "ethereum-waffle";
import { Signer, constants, ContractTransaction } from "ethers";
import {
  deployMockContract,
  MockContract,
} from "@ethereum-waffle/mock-contract";
import {
  PoseidonT3__factory,
  PoseidonT4__factory,
  PoseidonT5__factory,
  PoseidonT6__factory,
  QFI,
  QFI__factory,
} from "../typechain";
import GrantRoundFactoryAbi from "../abi/contracts/GrantRoundFactory.sol/GrantRoundFactory.json";
import BaseERC20TokenAbi from "../abi/contracts/BaseERC20Token.sol/BaseERC20Token.json";
import PollFactoryAbi from "../abi/maci-contracts/contracts/Poll.sol/PollFactory.json";
import SignUpGateKeeperAbi from "../abi/maci-contracts/contracts/gatekeepers/SignUpGatekeeper.sol/SignUpGatekeeper.json";
import ConstantInitialVoiceCreditProxyAbi from "../abi/maci-contracts/contracts/initialVoiceCreditProxy/ConstantInitialVoiceCreditProxy.sol/ConstantInitialVoiceCreditProxy.json";
import VkRegistryAbi from "../abi/maci-contracts/contracts/VkRegistry.sol/VkRegistry.json";
import MessageAqFactoryAbi from "../abi/maci-contracts/contracts/Poll.sol/MessageAqFactory.json";

chai.use(solidity);
const { expect } = chai;

// Unit tests for Quadratic Funding Infrastructure (QFI) smart contract.
describe("QFI", () => {
  // Signers.
  let deployer: Signer;
  let contributor: Signer;

  // QFI instance.
  let qfi: QFI;

  // Mocks.
  let mockBaseERC20Token: MockContract;
  let mockGrantRoundFactory: MockContract;
  let mockPollFactory: MockContract;
  let mockFreeForAllGateKeeper: MockContract;
  let mockConstantInitialVoiceCreditProxy: MockContract;
  let mockVkRegistry: MockContract;
  let mockMessageAqFactoryPolls: MockContract;
  let mockMessageAqFactoryGrantRounds: MockContract;

  // Pre-computed data.
  const voiceCreditFactor =
    (BigInt(10 ** 4) * BigInt(10 ** 18)) / BigInt(10 ** 9);

  beforeEach(async () => {
    // Get signers.
    [deployer, contributor] = await ethers.getSigners();

    // Mocked contracts.
    mockBaseERC20Token = await deployMockContract(deployer, BaseERC20TokenAbi);
    mockGrantRoundFactory = await deployMockContract(
      deployer,
      GrantRoundFactoryAbi
    );
    mockPollFactory = await deployMockContract(deployer, PollFactoryAbi);
    mockFreeForAllGateKeeper = await deployMockContract(
      deployer,
      SignUpGateKeeperAbi
    );
    mockConstantInitialVoiceCreditProxy = await deployMockContract(
      deployer,
      ConstantInitialVoiceCreditProxyAbi
    );

    // Poseidon libraries.
    const poseidonT3 = await deployContract(deployer, PoseidonT3__factory, []);
    const poseidonT4 = await deployContract(deployer, PoseidonT4__factory, []);
    const poseidonT5 = await deployContract(deployer, PoseidonT5__factory, []);
    const poseidonT6 = await deployContract(deployer, PoseidonT6__factory, []);

    // nb. workaround due it's not possible to use Waffle library for linking libraries.
    // ISSUE -> https://github.com/EthWorks/Waffle/issues/429.
    const QFIFactory = new QFI__factory(
      {
        ["maci-contracts/contracts/crypto/Hasher.sol:PoseidonT5"]:
          poseidonT5.address,
        ["maci-contracts/contracts/crypto/Hasher.sol:PoseidonT3"]:
          poseidonT3.address,
        ["maci-contracts/contracts/crypto/Hasher.sol:PoseidonT6"]:
          poseidonT6.address,
        ["maci-contracts/contracts/crypto/Hasher.sol:PoseidonT4"]:
          poseidonT4.address,
      },
      deployer
    );

    // Mock decimals value (used when deploying QFI).
    await mockBaseERC20Token.mock.decimals.withArgs().returns(18);

    // Deploy QFI.
    qfi = await QFIFactory.deploy(
      mockBaseERC20Token.address,
      mockGrantRoundFactory.address,
      mockPollFactory.address,
      mockFreeForAllGateKeeper.address,
      mockConstantInitialVoiceCreditProxy.address
    );
  });

  it("verify - initializes properly", async () => {
    // Wait for the deploy tx.
    const qfiDeployTransaction: ContractTransaction = qfi.deployTransaction;
    const txReceipt = await qfiDeployTransaction.wait();

    expect(txReceipt.status).to.not.equal(0);
    expect(txReceipt.contractAddress).to.equal(qfi.address);

    // Verify new event correct emit.
    // nb. This is a workaround because there's no possibility to deploy QFI smart contract instance,
    // store it locally and then use chai matcher (.to.emit()) when using QFIFactory.deploy().
    expect(txReceipt.logs.length).to.be.equal(3);
    expect(txReceipt.events.length).to.be.equal(3);
    for (const event of txReceipt.events) {
      if (event.event === "QfiDeployed") {
        expect(event.args._grantRoundFactory).to.be.equal(
          mockGrantRoundFactory.address
        );
        expect(event.args._nativeToken).to.be.equal(mockBaseERC20Token.address);
        expect(event.args._voiceCreditFactor).to.be.equal(voiceCreditFactor);
      }
    }
  });

  it("verify - configured properly", async () => {
    // Check state (inherited from MACI.sol too).
    expect(await qfi.currentStage()).to.be.equal(0);
    expect(await qfi.voiceCreditFactor()).to.be.equal(
      (BigInt(10 ** 4) * BigInt(10 ** 18)) / BigInt(10 ** 9)
    );
    expect(await qfi.messageAqFactoryGrants()).to.be.equal(
      constants.AddressZero
    );
    expect(await qfi.currentGrantRound()).to.be.equal(constants.AddressZero);
    expect(await qfi.pollProcessorAndTallyer()).to.be.equal(
      constants.AddressZero
    );
    expect(await qfi.nextGrantRoundId()).to.be.equal(0);
    expect(await qfi.contributorCount()).to.be.equal(0);
    expect(await qfi.numSignUps()).to.be.equal(0);
    expect(await qfi.vkRegistry()).to.be.equal(constants.AddressZero);
    expect(await qfi.messageAqFactory()).to.be.equal(constants.AddressZero);
    expect(await qfi.stateAq()).to.be.not.equal(constants.AddressZero);
    expect(await qfi.signUpTimestamp()).to.be.not.equal(0);

    // Input constructor parameters contracts.
    expect(await qfi.grantRoundFactory()).to.be.equal(
      mockGrantRoundFactory.address
    );
    expect(await qfi.nativeToken()).to.be.equal(mockBaseERC20Token.address);
    expect(await qfi.pollFactory()).to.be.equal(mockPollFactory.address);
    expect(await qfi.signUpGatekeeper()).to.be.equal(
      mockFreeForAllGateKeeper.address
    );
    expect(await qfi.initialVoiceCreditProxy()).to.be.equal(
      mockConstantInitialVoiceCreditProxy.address
    );
  });

  describe("initialize()", () => {
    before(async () => {
      // Mocked contracts.
      mockVkRegistry = await deployMockContract(deployer, VkRegistryAbi);

      mockMessageAqFactoryPolls = await deployMockContract(
        deployer,
        MessageAqFactoryAbi
      );

      mockMessageAqFactoryGrantRounds = await deployMockContract(
        deployer,
        MessageAqFactoryAbi
      );
    });

    it("allows owner to initialize QFI", async () => {
      // Mocks.
      await mockGrantRoundFactory.mock.owner.withArgs().returns(qfi.address);
      await mockGrantRoundFactory.mock.setMessageAqFactory
        .withArgs(mockMessageAqFactoryGrantRounds.address)
        .returns();
      await mockGrantRoundFactory.mock.messageAqFactory
        .withArgs()
        .returns(mockMessageAqFactoryGrantRounds.address);
      await mockMessageAqFactoryGrantRounds.mock.owner
        .withArgs()
        .returns(mockGrantRoundFactory.address);
      await mockMessageAqFactoryPolls.mock.owner
        .withArgs()
        .returns(mockPollFactory.address);
      await mockPollFactory.mock.owner.withArgs().returns(qfi.address);
      await mockPollFactory.mock.setMessageAqFactory
        .withArgs(mockMessageAqFactoryPolls.address)
        .returns();
      await mockPollFactory.mock.messageAqFactory
        .withArgs()
        .returns(mockMessageAqFactoryPolls.address);
      await mockVkRegistry.mock.owner
        .withArgs()
        .returns(await deployer.getAddress());

      // Should initialize QFI correctly.
      await expect(
        qfi
          .connect(deployer)
          .initialize(
            mockVkRegistry.address,
            mockMessageAqFactoryPolls.address,
            mockMessageAqFactoryGrantRounds.address
          )
      )
        .to.emit(qfi, "Init")
        .withArgs(mockVkRegistry.address, mockMessageAqFactoryPolls.address)
        .to.emit(qfi, "QfiInitialized")
        .withArgs(mockMessageAqFactoryGrantRounds.address);
    });

    it("revert - allows only owner to initialize QFI", async () => {
      await expect(
        qfi
          .connect(contributor)
          .initialize(
            mockVkRegistry.address,
            mockMessageAqFactoryPolls.address,
            mockMessageAqFactoryGrantRounds.address
          )
      ).to.revertedWith("Ownable: caller is not the owner");
    });

    it("revert - PollFactory owner incorrectly set", async () => {
      // Mock.
      await mockPollFactory.mock.owner
        .withArgs()
        .returns(constants.AddressZero);

      await expect(
        qfi
          .connect(deployer)
          .initialize(
            mockVkRegistry.address,
            mockMessageAqFactoryPolls.address,
            mockMessageAqFactoryGrantRounds.address
          )
      ).to.revertedWith("MACI: PollFactory owner incorrectly set");
    });

    it("revert - MessageAqFactoryPolls owner incorrectly set", async () => {
      // Mock.
      await mockPollFactory.mock.owner.withArgs().returns(qfi.address);
      await mockPollFactory.mock.setMessageAqFactory
        .withArgs(mockMessageAqFactoryPolls.address)
        .returns();
      await mockPollFactory.mock.messageAqFactory
        .withArgs()
        .returns(mockMessageAqFactoryPolls.address);
      await mockMessageAqFactoryPolls.mock.owner
        .withArgs()
        .returns(constants.AddressZero);

      await expect(
        qfi
          .connect(deployer)
          .initialize(
            mockVkRegistry.address,
            mockMessageAqFactoryPolls.address,
            mockMessageAqFactoryGrantRounds.address
          )
      ).to.revertedWith("MACI: MessageAqFactory owner incorrectly set");
    });

    it("revert - VkRegistry owner incorrectly set", async () => {
      // Mock.
      await mockPollFactory.mock.owner.withArgs().returns(qfi.address);
      await mockPollFactory.mock.setMessageAqFactory
        .withArgs(mockMessageAqFactoryPolls.address)
        .returns();
      await mockPollFactory.mock.messageAqFactory
        .withArgs()
        .returns(mockMessageAqFactoryPolls.address);
      await mockMessageAqFactoryPolls.mock.owner
        .withArgs()
        .returns(mockPollFactory.address);
      await mockVkRegistry.mock.owner.withArgs().returns(constants.AddressZero);

      await expect(
        qfi
          .connect(deployer)
          .initialize(
            mockVkRegistry.address,
            mockMessageAqFactoryPolls.address,
            mockMessageAqFactoryGrantRounds.address
          )
      ).to.revertedWith("MACI: VkRegistry owner incorrectly set");
    });

    it("revert - GrantFactory owner incorrectly set", async () => {
      // Mock.
      await mockPollFactory.mock.owner.withArgs().returns(qfi.address);
      await mockPollFactory.mock.setMessageAqFactory
        .withArgs(mockMessageAqFactoryPolls.address)
        .returns();
      await mockPollFactory.mock.messageAqFactory
        .withArgs()
        .returns(mockMessageAqFactoryPolls.address);
      await mockMessageAqFactoryPolls.mock.owner
        .withArgs()
        .returns(mockPollFactory.address);
      await mockVkRegistry.mock.owner
        .withArgs()
        .returns(await deployer.getAddress());
      await mockGrantRoundFactory.mock.owner
        .withArgs()
        .returns(constants.AddressZero);

      await expect(
        qfi
          .connect(deployer)
          .initialize(
            mockVkRegistry.address,
            mockMessageAqFactoryPolls.address,
            mockMessageAqFactoryGrantRounds.address
          )
      ).to.revertedWith("MACI: GrantFactory owner incorrectly set");
    });

    it("revert - should not initialize twice", async () => {
      // Mocks.
      await mockGrantRoundFactory.mock.owner.withArgs().returns(qfi.address);
      await mockGrantRoundFactory.mock.setMessageAqFactory
        .withArgs(mockMessageAqFactoryGrantRounds.address)
        .returns();
      await mockGrantRoundFactory.mock.messageAqFactory
        .withArgs()
        .returns(mockMessageAqFactoryGrantRounds.address);
      await mockMessageAqFactoryGrantRounds.mock.owner
        .withArgs()
        .returns(mockGrantRoundFactory.address);
      await mockMessageAqFactoryPolls.mock.owner
        .withArgs()
        .returns(mockPollFactory.address);
      await mockPollFactory.mock.owner.withArgs().returns(qfi.address);
      await mockPollFactory.mock.setMessageAqFactory
        .withArgs(mockMessageAqFactoryPolls.address)
        .returns();
      await mockPollFactory.mock.messageAqFactory
        .withArgs()
        .returns(mockMessageAqFactoryPolls.address);
      await mockVkRegistry.mock.owner
        .withArgs()
        .returns(await deployer.getAddress());

      // Should initialize QFI correctly.
      await expect(
        qfi
          .connect(deployer)
          .initialize(
            mockVkRegistry.address,
            mockMessageAqFactoryPolls.address,
            mockMessageAqFactoryGrantRounds.address
          )
      )
        .to.emit(qfi, "Init")
        .withArgs(mockVkRegistry.address, mockMessageAqFactoryPolls.address)
        .to.emit(qfi, "QfiInitialized")
        .withArgs(mockMessageAqFactoryGrantRounds.address);

      // Should revert.
      await expect(
        qfi
          .connect(deployer)
          .initialize(
            mockVkRegistry.address,
            mockMessageAqFactoryPolls.address,
            mockMessageAqFactoryGrantRounds.address
          )
      ).to.revertedWith("MACI: already initialised");
    });
  });

  /*
    describe('changing signup gatekeeper', () => {
      it('allows owner to set signup gatekeeper', async () => {
      })
  
      it('allows only owner to set signup gatekeeper', async () => {
      })
  
      it('allows owner to change signup gatekeeper', async () => {
      })
    })
  
    
  
    describe('deploying funding round', () => {
      it('deploys funding round', async () => {
        
      })
  
      it('require fail - reverts if signup gatekeeper is not set', async () => {
        
      })
  
      it('require fail - reverts if recipient registry is not set', async () => {
        
      })
  
      it('require fail - reverts if native token is not set', async () => {
        
      })
  
      it('require fail - reverts if coordinator is not set', async () => {
        
      })
  
      it('require fail - reverts if current round is not finalized', async () => {
        
      })
  
      it('require fail - verify - deploys new funding round after previous round has been finalized', async () => {
       
      })
  
      it('require fail - only owner can deploy funding round', async () => {
      })
    })
  
    describe('transferring matching funds', () => {
  
      it('returns the amount of available matching funding', async () => {
       
      })
  
      it('allows owner to finalize round', async () => {
        
      })
  
      it('does not allow funds to be sent without a tally', async () => {
        
      })
  
      it('pulls funds from funding source', async () => {
        
      })
  
      it('pulls funds from funding source if allowance is greater than balance', async () => {
        
      })
  
      it('allows only owner to finalize round', async () => {
        
      })
  
      it('reverts if round has not been deployed', async () => {
        
      })
    })
  
    // describe('cancelling round', () => {
  
    //   it('allows owner to cancel round', async () => {
        
    //   })
  
    //   it('allows only owner to cancel round', async () => {
       
    //   })
  
    //   it('reverts if round has not been deployed', async () => {
       
    //   })
  
    //   it('reverts if round is finalized', async () => {
        
    //   })
    // })
  
    // it('allows owner to set native token', async () => {
      
    // })
  
    // it('only owner can set native token', async () => {
      
    // })
  
  
  
  */
});
