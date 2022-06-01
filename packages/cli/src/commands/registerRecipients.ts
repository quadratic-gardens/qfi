#!/usr/bin/env node

import { ethers } from "ethers";
import logSymbols from "log-symbols";
import { getProvider, connectWalletToProviderFromMnemonic } from "../lib/blockchain.js";
import { Recipient } from "../../types/index.js";
import { directoryExists, getCSVFileRecords, readJSONFile } from "../lib/files.js";
import { OptimisticRecipientRegistry__factory } from "../../../contracts/typechain/factories/OptimisticRecipientRegistry__factory.js";

/**
 * Throw an error if at least one recipient field value is not provided or malformed.
 * @param recipientRecord <Recipient>
 */
const checkForMissingRecipientProperties = (recipientRecord: Recipient) => {
  const {
    name,
    tagline,
    description,
    problemSpace,
    ethereumAddress,
    contactEmail,
    bannerImageHash,
    thumbnailImageHash
  } = recipientRecord

  if (!name)
    throw new Error(`Missing \`name\` property for the recipient`)

  if (!tagline)
    throw new Error(`Missing \`tagline\` property for the recipient`)

  if (tagline.length > 140)
    throw new Error(`Too long \`tagline\` property for the recipient`)

  if (!description)
    throw new Error(`Missing \`description\` property for the recipient`)

  if (!problemSpace)
    throw new Error(`Missing \`problemSpace\` property for the recipient`)

  if (!ethereumAddress)
    throw new Error(`Missing \`ethereumAddress\` property for the recipient`)

  if (ethereumAddress.length !== 42 || !ethereumAddress.startsWith("0x"))
    throw new Error(`Malformed \`ethereumAddress\` property for the recipient`)

  if (!contactEmail)
    throw new Error(`Missing \`contactEmail\` property for the recipient`)

  if (!RegExp(/^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/).test(contactEmail))
    throw new Error(`Malformed \`contactEmail\` property for the recipient`)

  if (!bannerImageHash)
    throw new Error(`Missing \`bannerImageHash\` property for the recipient`)

  if (!thumbnailImageHash)
    throw new Error(`Missing \`thumbnailImageHash\` property for the recipient`)
}

/**
 * Register recipients command.
 * @param network <string> - the network where the contracts are going to be deployed.
 * @param path <string> - the path of the CSV input file where the recipients data is stored.
 */
async function registerRecipients(network: string, path: string) {
  try {
    const outputDirPath = `./output`
    const deployedContractsFilePath = `${outputDirPath}/deployedContracts.json`
    const mnemonicDirPath = `${outputDirPath}/mnemonic.txt`

    if (!directoryExists(mnemonicDirPath))
      throw new Error(`missing mnemonic. Please run auth command first.`)

    // Get the provider.
    const provider = getProvider(network)
    console.log(`${logSymbols.success} Connected to ${provider.network.name} / Chain ID ${provider.network.chainId}`)

    // Connect wallet to provider from mnemonic.
    const wallet = connectWalletToProviderFromMnemonic(provider)
    const balanceInEthers = ethers.utils.formatEther((await wallet.getBalance()).toString())
    const gasPrice = await provider.getGasPrice()
    const gasLimit = 10000000

    console.log(`${logSymbols.success} Deployer address -> ${wallet.address}`)
    console.log(`${logSymbols.success} Current balance (Ξ): ${balanceInEthers}`)

    console.log(`\n${logSymbols.info} Starting to register recipients for MACI/QFI smart contracts`)

    // Retrieve deployed QFI/MACI smart contracts addresses.
    if (!directoryExists(deployedContractsFilePath))
      throw new Error(`Please, run \`deploy\` command for the ${network} network or provide manually the addresses for the MACI/QFI contracts in the ${deployedContractsFilePath} JSON file`)

    const deployedContracts = readJSONFile(`${outputDirPath}/deployedContracts.json`)

    // Get CSV records.
    const jsonRecipientsRecords: Array<Recipient> = await getCSVFileRecords(path);

    for (const recipientRecord of jsonRecipientsRecords) {
      // Check input data.
      checkForMissingRecipientProperties(recipientRecord)

      // Get deployed RecipientRegistry instance.
      const recipientRegistry = new ethers.Contract(deployedContracts.OptimisticRecipientRegistry, OptimisticRecipientRegistry__factory.abi, wallet)

      // Create metadata.
      const { ethereumAddress, ...metadataJSON } = jsonRecipientsRecords[0]
      const metadata = JSON.stringify(metadataJSON)

      const tx = await recipientRegistry.connect(wallet).addRecipient(recipientRecord.ethereumAddress, metadata, { gasPrice, gasLimit })
      await tx.wait()

      console.log(`${logSymbols.success} ${recipientRecord.name} recipient correctly registered`);
    }

    console.log(
      `\nYou have successfully registered the recipients for your MACI/QFI instance 🎊`
    )

  } catch (err: any) {
    console.log(`${logSymbols.error} Something went wrong: ${err}`)
  }
}

export default registerRecipients
