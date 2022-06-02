#!/usr/bin/env node

import logSymbols from "log-symbols"
import { clear } from "console"
import chalk from "chalk"
import { Recipient } from "types/index.js"
import { ethers } from "ethers"
import { connectToBlockchain, getNetworkExplorerUrl } from "../lib/blockchain.js"
import { directoryExists, getCSVFileRecords, makeDir, readJSONFile } from "../lib/files.js"
import {
  deployedContractsBaseDirPath,
  deployedContractsFilePath,
  header,
  mnemonicBaseDirPath,
  mnemonicFilePath,
  outputDirPath
} from "../lib/constants.js"
import { OptimisticRecipientRegistry__factory } from "../../../contracts/typechain/factories/OptimisticRecipientRegistry__factory.js"
import { customSpinner } from "../lib/prompts.js"

/**
 * Throw an error if at least one recipient field value is not provided or malformed.
 * @param recipientRecord <Recipient>
 * @param index <number>
 */
const checkForMissingRecipientProperties = (recipientRecord: Recipient, index: number) => {
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

  if (!name) throw new Error(`Missing \`name\` property for the recipient (Row #${index})`)

  if (!tagline) throw new Error(`Missing \`tagline\` property for the recipient (Row #${index})`)

  if (tagline.length > 140) throw new Error(`Too long \`tagline\` property for the recipient (Row #${index})`)

  if (!description) throw new Error(`Missing \`description\` property for the recipient (Row #${index})`)

  if (!problemSpace) throw new Error(`Missing \`problemSpace\` property for the recipient (Row #${index})`)

  if (!ethereumAddress) throw new Error(`Missing \`ethereumAddress\` property for the recipient (Row #${index})`)

  if (ethereumAddress.length !== 42 || !ethereumAddress.startsWith("0x"))
    throw new Error(`Malformed \`ethereumAddress\` property for the recipient (Row #${index})`)

  if (!contactEmail) throw new Error(`Missing \`contactEmail\` property for the recipient (Row #${index})`)

  if (!RegExp(/^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/).test(contactEmail))
    throw new Error(`Malformed \`contactEmail\` property for the recipient (Row #${index})`)

  if (!bannerImageHash) throw new Error(`Missing \`bannerImageHash\` property for the recipient (Row #${index})`)

  if (!thumbnailImageHash) throw new Error(`Missing \`thumbnailImageHash\` property for the recipient (Row #${index})`)
}

/**
 * Register recipients command.
 * @param network <string> - the network where the contracts are going to be deployed.
 * @param path <string> - the path of the CSV input file where the recipients data is stored.
 */
async function addRecipients(network: string, path: string) {
  clear()

  console.log(header)

  try {
    // Check for output directory.
    if (!directoryExists(outputDirPath)) makeDir(outputDirPath)

    // Check if mnemonic already present.
    if (!directoryExists(mnemonicBaseDirPath) && !directoryExists(mnemonicFilePath))
      throw new Error(`You must first authenticate by running \`auth \"<your-mnemonic>\"\` command!`)

    // Check if contracts has been already deployed.
    if (!directoryExists(deployedContractsBaseDirPath) && !directoryExists(deployedContractsFilePath))
      throw new Error(`You must first deploy QFI/MACI smart contracts by running \`deploy \"<network>\"\` command!`)

    process.stdout.write(`\n`)

    const { provider, wallet } = await connectToBlockchain(network)

    /** DEPLOY MACI/QFI SMART CONTRACTS */

    // Retrieve deployed smart contracts addresses.
    const deployedContracts = readJSONFile(deployedContractsFilePath)

    console.log(chalk.bold(`\nRecipients registration is running!`))

    // Get CSV records.
    const jsonRecipientsRecords: Array<Recipient> = await getCSVFileRecords(path)

    let i = 0
    for await (const recipientRecord of jsonRecipientsRecords) {
      const spinner = customSpinner(`Adding recipient in position ${chalk.bold(i)}`, "point")
      spinner.start()

      // Check input data.
      checkForMissingRecipientProperties(recipientRecord, i)

      // Get deployed RecipientRegistry instance.
      const recipientRegistry = new ethers.Contract(
        deployedContracts.OptimisticRecipientRegistry,
        OptimisticRecipientRegistry__factory.abi,
        wallet
      )

      // Create metadata.
      const { ethereumAddress, ...metadataJSON } = recipientRecord
      const metadata = JSON.stringify(metadataJSON)

      // Create tx.
      const tx = await recipientRegistry.connect(wallet).addRecipient(recipientRecord.ethereumAddress, metadata, {
        gasPrice: await provider.getGasPrice(),
        gasLimit: ethers.utils.hexlify(10000000)
      })
      await tx.wait()

      spinner.stop()
      console.log(
        `${logSymbols.success} Recipient #${chalk.bold(i)} (${chalk.bold(
          recipientRecord.name
        )}) has been successfully registered on-chain`
      )

      i += 1
    }

    console.log(`\n${logSymbols.success} You have successfully registered the recipients on-chain 🎊\n`)
  } catch (err: any) {
    if (!err.transactionHash) console.log(`\n${logSymbols.error} Something went wrong: ${err}`)
    else
      console.log(
        `\n${logSymbols.error} Something went wrong with the transaction! More info here: ${chalk.bold(
          `${getNetworkExplorerUrl(network)}tx/${err.transactionHash}`
        )}`
      )
    process.exit(0)
  }
}

export default addRecipients
