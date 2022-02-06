import { ethers } from 'hardhat';
import { Signer } from "ethers";
import chai from 'chai';
import { solidity } from 'ethereum-waffle';
import { GrantRoundFactory } from "../typechain/GrantRoundFactory";


chai.use(solidity);
const { expect } = chai;

describe('Grant Round Factory', () => {
  let deployer: Signer;
  let addr1: Signer;
  let grantRoundFactory: GrantRoundFactory;

  beforeEach(async () => {
    [deployer, addr1] = await ethers.getSigners();
    const PoseidonT3Factory =await  ethers.getContractFactory("PoseidonT3", deployer)
    const PoseidonT4Factory = await ethers.getContractFactory("PoseidonT4", deployer)
    const PoseidonT5Factory = await ethers.getContractFactory("PoseidonT5", deployer)
    const PoseidonT6Factory = await ethers.getContractFactory("PoseidonT6", deployer)

    const poseidonT3 = await PoseidonT3Factory.deploy();
    const poseidonT4 = await PoseidonT4Factory.deploy();
    const poseidonT5 = await PoseidonT5Factory.deploy();
    const poseidonT6 = await PoseidonT6Factory.deploy();

    const linkedLibraryAddresses = {
      ["maci-contracts/contracts/crypto/Hasher.sol:PoseidonT5"]: poseidonT5.address,
      ["maci-contracts/contracts/crypto/Hasher.sol:PoseidonT3"]: poseidonT3.address,
      ["maci-contracts/contracts/crypto/Hasher.sol:PoseidonT6"]: poseidonT6.address,
      ["maci-contracts/contracts/crypto/Hasher.sol:PoseidonT4"]: poseidonT4.address,
    }
    const GrantRoundFactory = await ethers.getContractFactory( "GrantRoundFactory", {
      signer: deployer,
      libraries: { ...linkedLibraryAddresses }
    })
    grantRoundFactory = await GrantRoundFactory.deploy();

  })

  it('verify - initializes properly', async () => {
    const deployTransaction = await grantRoundFactory.deployTransaction.wait()
    expect(deployTransaction.status).to.not.equal(0);
    expect(deployTransaction.contractAddress).to.equal(grantRoundFactory.address);
  })

  it('verify - configured properly', async () => {
    expect(await grantRoundFactory.messageAqFactory()).to.not.equal(null)
    expect(await grantRoundFactory.recipientRegistry()).to.not.equal(null)
  })

  describe('changing recipient registry', () => {
    it('verify - allows owner to set recipient registry', async () => { 
      const RecipientRegistryFactory = await ethers.getContractFactory("OptimisticRecipientRegistry")
      const recipientRegistry = await RecipientRegistryFactory.deploy(0, 0, await deployer.getAddress());
      grantRoundFactory.setRecipientRegistry(recipientRegistry.address);
      const contractRecipientRegistry = await grantRoundFactory.recipientRegistry()
      expect(contractRecipientRegistry).to.equal(recipientRegistry.address)
    })

    it('require fail - allows only owner to set recipient registry', async () => {
      const RecipientRegistryFactory = await ethers.getContractFactory("OptimisticRecipientRegistry")
      const recipientRegistry = await RecipientRegistryFactory.deploy(0, 0, await deployer.getAddress());
     expect(
        grantRoundFactory.connect(addr1).setRecipientRegistry(recipientRegistry.address)
      ).to.be.revertedWith("Ownable: caller is not the owner");
    })

    it('verify - allows owner to change recipient registry', async () => {
      const RecipientRegistryFactory = await ethers.getContractFactory("OptimisticRecipientRegistry")
      let recipientRegistry = await RecipientRegistryFactory.deploy(0, 0, await deployer.getAddress());
      grantRoundFactory.setRecipientRegistry(recipientRegistry.address);
      let contractRecipientRegistry = await grantRoundFactory.recipientRegistry()
      expect(contractRecipientRegistry).to.equal(recipientRegistry.address)

      recipientRegistry = await RecipientRegistryFactory.deploy(0, 0, await addr1.getAddress());
      grantRoundFactory.setRecipientRegistry(recipientRegistry.address);
      contractRecipientRegistry = await grantRoundFactory.recipientRegistry()
      expect(contractRecipientRegistry).to.equal(recipientRegistry.address)
    })
  })

  
})
