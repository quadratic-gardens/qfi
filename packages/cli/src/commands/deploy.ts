#!/usr/bin/env node

import { ethers } from "ethers"
import logSymbols from "log-symbols"
import { getProvider, connectWalletToProviderFromMnemonic } from "../lib/blockchain.js"
import { PoseidonT3__factory } from "../../../contracts/typechain/factories/PoseidonT3__factory.js"
import { PoseidonT4__factory } from "../../../contracts/typechain/factories/PoseidonT4__factory.js"
import { PoseidonT5__factory } from "../../../contracts/typechain/factories/PoseidonT5__factory.js"
import { PoseidonT6__factory } from "../../../contracts/typechain/factories/PoseidonT6__factory.js"
import { GrantRoundFactory__factory } from "../../../contracts/typechain/factories/GrantRoundFactory__factory.js"
import { PollFactory__factory } from "../../../contracts/typechain/factories/PollFactory__factory.js"
import { MessageAqFactory__factory } from "../../../contracts/typechain/factories/MessageAqFactory__factory.js"
import { QFI__factory } from "../../../contracts/typechain/factories/QFI__factory.js"
import { VkRegistry__factory } from "../../../contracts/typechain/factories/VkRegistry__factory.js"
import { ConstantInitialVoiceCreditProxy__factory } from "../../../contracts/typechain/factories/ConstantInitialVoiceCreditProxy__factory.js"
import { FreeForAllGatekeeper__factory } from "../../../contracts/typechain/factories/FreeForAllGatekeeper__factory.js"
import { OptimisticRecipientRegistry__factory } from "../../../contracts/typechain/factories/OptimisticRecipientRegistry__factory.js"
import { BaseERC20Token__factory } from "../../../contracts/typechain/factories/BaseERC20Token__factory.js"
import { PollProcessorAndTallyer__factory } from "../../../contracts/typechain/factories/PollProcessorAndTallyer__factory.js"
import { MockVerifier__factory } from "../../../contracts/typechain/factories/MockVerifier__factory.js"
import { directoryExists, makeDir, writeLocalJsonFile } from "../lib/files.js"

/**
 * Deploy command.
 * @param network <string> - the network where the contracts are going to be deployed.
 */
async function deploy(network: string) {
    try {
        const outputDirPath = `./output`
        const mnemonicDirPath = `${outputDirPath}/mnemonic.txt`

        if (!directoryExists(outputDirPath))
            makeDir(outputDirPath)

        if (!directoryExists(mnemonicDirPath))
            throw new Error(`missing mnemonic. Please run auth command first.`)
        
        // Get the provider.
        const provider = getProvider(network)
        console.log(`${logSymbols.success} Connected to ${provider.network.name} / Chain ID ${provider.network.chainId}`)

        // Connect wallet to provider from mnemonic.
        const wallet = connectWalletToProviderFromMnemonic(provider)
        const balanceInEthers = ethers.utils.formatEther((await wallet.getBalance()).toString())

        console.log(`${logSymbols.success} Deployer address -> ${wallet.address}`)
        console.log(`${logSymbols.success} Current balance (Ξ): ${balanceInEthers}`)

        console.log(`\n${logSymbols.info} Starting the deploy for QFI/MACI smart contracts`)

        /** DEPLOY MACI/QFI SMART CONTRACTS */

        const PoseidonT3Factory = new PoseidonT3__factory(wallet);
        const PoseidonT4Factory = new PoseidonT4__factory(wallet);
        const PoseidonT5Factory = new PoseidonT5__factory(wallet);
        const PoseidonT6Factory = new PoseidonT6__factory(wallet);

        const PoseidonT3 = await PoseidonT3Factory.deploy();
        console.log(`${logSymbols.success} PoseidonT3 deployed at ${PoseidonT3.address}`);

        const PoseidonT4 = await PoseidonT4Factory.deploy();
        console.log(`${logSymbols.success} PoseidonT4 deployed at ${PoseidonT4.address}`);

        const PoseidonT5 = await PoseidonT5Factory.deploy();
        console.log(`${logSymbols.success} PoseidonT5 deployed at ${PoseidonT5.address}`);

        const PoseidonT6 = await PoseidonT6Factory.deploy();
        console.log(`${logSymbols.success} PoseidonT6 deployed at ${PoseidonT6.address}`);

        const linkedLibraryAddresses = {
            ["qaci-contracts/contracts/crypto/Hasher.sol:PoseidonT5"]: PoseidonT5.address,
            ["qaci-contracts/contracts/crypto/Hasher.sol:PoseidonT3"]: PoseidonT3.address,
            ["qaci-contracts/contracts/crypto/Hasher.sol:PoseidonT6"]: PoseidonT6.address,
            ["qaci-contracts/contracts/crypto/Hasher.sol:PoseidonT4"]: PoseidonT4.address,
        };

        const GrantRoundFactory = new GrantRoundFactory__factory({ ...linkedLibraryAddresses }, wallet);
        const PollFactoryFactory = new PollFactory__factory({ ...linkedLibraryAddresses }, wallet);
        const MessageAqFactoryFactory = new MessageAqFactory__factory({ ...linkedLibraryAddresses }, wallet);
        const QFIFactory = new QFI__factory({ ...linkedLibraryAddresses }, wallet);

        const VKRegistryFactory = new VkRegistry__factory(wallet);
        const ConstantInitialVoiceCreditProxyFactory = new ConstantInitialVoiceCreditProxy__factory(wallet);
        const FreeForAllGateKeeperFactory = new FreeForAllGatekeeper__factory(wallet);
        const RecipientRegistryFactory = new OptimisticRecipientRegistry__factory(wallet);
        const BaseERC20TokenFactory = new BaseERC20Token__factory(wallet);
        const PollProcessorAndTallyerFactory = new PollProcessorAndTallyer__factory(wallet);
        const MockVerifierFactory = new MockVerifier__factory(wallet);

        const optimisticRecipientRegistry = await RecipientRegistryFactory.deploy(0, 0, wallet.address);
        console.log(`${logSymbols.success} OptimisticRecipientRegistry deployed at ${optimisticRecipientRegistry.address}`);

        const grantRoundFactory = await GrantRoundFactory.deploy();
        console.log(`${logSymbols.success} GrantRoundFactory deployed at ${grantRoundFactory.address}`);

        const tx = await grantRoundFactory.setRecipientRegistry(optimisticRecipientRegistry.address);
        await tx.wait()
        console.log(`${logSymbols.success} GrantRoundFactory registry correctly set!`);

        const pollFactory = await PollFactoryFactory.deploy();
        console.log(`${logSymbols.success} PollFactory deployed at ${pollFactory.address}`);

        const messageAqFactory = await MessageAqFactoryFactory.deploy();
        console.log(`${logSymbols.success} MessageAqFactory deployed at ${messageAqFactory.address}`);

        const messageAqFactoryGrants = await MessageAqFactoryFactory.deploy();
        console.log(`${logSymbols.success} MessageAqFactoryGrants deployed at ${messageAqFactoryGrants.address}`);

        const freeForAllGateKeeper = await FreeForAllGateKeeperFactory.deploy();
        console.log(`${logSymbols.success} FreeForAllGateKeeper deployed at ${freeForAllGateKeeper.address}`);

        const constantInitialVoiceCreditProxy = await ConstantInitialVoiceCreditProxyFactory.deploy(0);
        console.log(`${logSymbols.success} ConstantInitialVoiceCreditProxy deployed at ${constantInitialVoiceCreditProxy.address}`);

        const vkRegistry = await VKRegistryFactory.deploy();
        console.log(`${logSymbols.success} VKRegistry deployed at ${vkRegistry.address}`);

        const baseERC20Token = await BaseERC20TokenFactory.deploy(100);
        console.log(`${logSymbols.success} BaseERC20Token deployed at ${baseERC20Token.address}`);

        const mockVerifier = await MockVerifierFactory.deploy();
        console.log(`${logSymbols.success} MockVerifier deployed at ${mockVerifier.address}`);

        const pollProcessorAndTallyer = await PollProcessorAndTallyerFactory.deploy(mockVerifier.address);
        console.log(`${logSymbols.success} PollProcessorAndTallyer deployed at ${pollProcessorAndTallyer.address}`);

        const qfi = await QFIFactory.deploy(
            baseERC20Token.address,
            grantRoundFactory.address,
            pollFactory.address,
            freeForAllGateKeeper.address,
            constantInitialVoiceCreditProxy.address
        );
        console.log(`${logSymbols.success} QFI deployed at ${qfi.address}`);

        // Store addresses in a local JSON file.
        const contractsInJson = `{
        "PoseidonT3": \"${PoseidonT3.address}\",
        "PoseidonT4": \"${PoseidonT4.address}\",
        "PoseidonT5": \"${PoseidonT5.address}\",
        "PoseidonT6": \"${PoseidonT6.address}\",
        "OptimisticRecipientRegistry": \"${optimisticRecipientRegistry.address}\",
        "GrantRoundFactory": \"${grantRoundFactory.address}\",
        "PollFactory": \"${pollFactory.address}\",
        "MessageAqFactory": \"${messageAqFactory.address}\",
        "MessageAqFactoryGrants": \"${messageAqFactoryGrants.address}\",
        "FreeForAllGateKeeper": \"${freeForAllGateKeeper.address}\",
        "ConstantInitialVoiceCreditProxy": \"${constantInitialVoiceCreditProxy.address}\",
        "VKRegistry": \"${vkRegistry.address}\",
        "BaseERC20Token": \"${baseERC20Token.address}\", 
        "MockVerifier": \"${mockVerifier.address}\", 
        "PollProcessorAndTallier": \"${pollProcessorAndTallyer.address}\", 
        "QFI": \"${qfi.address}\"
    }`

        writeLocalJsonFile(`./output/deployedContracts.json`, JSON.parse(contractsInJson))

        console.log(
            `\nYou have successfully deployed the MACI/QFI smart contracts 🎊 You can find everything inside the \`deployedContracts.json\` file!`
        )
    } catch (err: any) {
        console.log(`${logSymbols.error} Something went wrong: ${err}`)
    }
}

export default deploy
