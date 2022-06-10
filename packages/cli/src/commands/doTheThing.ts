#!/usr/bin/env node

import logSymbols from "log-symbols"
import { clear } from "console"
import chalk from "chalk"
import { ethers } from "ethers"
import { connectToBlockchain, getNetworkExplorerUrl } from "../lib/blockchain.js"
import { GrantRoundFactory__factory } from "../../../contracts/typechain/factories/GrantRoundFactory__factory.js"
import { PollFactory__factory } from "../../../contracts/typechain/factories/PollFactory__factory.js"
import { MessageAqFactory__factory } from "../../../contracts/typechain/factories/MessageAqFactory__factory.js"
import { QFI__factory } from "../../../contracts/typechain/factories/QFI__factory.js"
import { SimpleHackathon__factory } from "../../../contracts/typechain/factories/SimpleHackathon__factory.js"
// import { VkRegistry__factory } from "../../../contracts/typechain/factories/VkRegistry__factory.js"

import { directoryExists, jsonToCsv, makeDir, writeLocalJsonFile } from "../lib/files.js"
import {
  coordinatorPubkey,
  deployedContracts,
  hacksFilePath,
  header,
  jsonRecipientsRecords,
  messageBatchSize,
  mnemonicBaseDirPath,
  mnemonicFilePath,
  numberOfMaxRecipients,
  outputDirPath,
  ProcessVk,
  TallyVk,
  treeDepths,
  usersStateIndexesFilePath,
  userSignUps,
  maxValues
  
} from "../lib/constants.js"
import { askForConfirmation, customSpinner } from "../lib/prompts.js"
import { VerifyingKeyStruct } from "../../../contracts/typechain/VkRegistry.js"
import { VkRegistry__factory } from "../../../contracts/typechain/factories/VkRegistry__factory.js"
import { PubKey } from "qaci-domainobjs"
import { Recipient } from "types/index.js"



/**
 * Throw an error if at least one recipient field value is not provided or malformed.
 * @param recipientRecord <Recipient>
 * @param index <number>
 */
 const checkForMissingRecipientProperties = (recipientRecord: Recipient, index: number) => {
  const {
    projectName,
    tagline,
    description,
    ethereumAddress,
    website,
    bannerImageLink,
    thumbnailImageLink,
    logoCdnUrl
  } = recipientRecord

  if (!projectName) throw new Error(`Missing \`projectName\` property for the recipient (Row #${index})`)

  if (!tagline) throw new Error(`Missing \`tagline\` property for the recipient (Row #${index})`)

  if (!description) throw new Error(`Missing \`description\` property for the recipient (Row #${index})`)

  if (!website) throw new Error(`Missing \`website\` property for the recipient (Row #${index})`)

  if (!ethereumAddress) throw new Error(`Missing \`ethereumAddress\` property for the recipient (Row #${index})`)

  if (ethereumAddress.length !== 42 || !ethereumAddress.startsWith("0x"))
    throw new Error(`Malformed \`ethereumAddress\` property for the recipient (Row #${index})`)

  if (!bannerImageLink) throw new Error(`Missing \`bannerImageLink\` property for the recipient (Row #${index})`)

  if (!thumbnailImageLink) throw new Error(`Missing \`thumbnailImageLink\` property for the recipient (Row #${index})`)

  if (!logoCdnUrl) throw new Error(`Missing \`logoCdnUrl\` property for the recipient (Row #${index})`)
}

/**
 * Initialize command.
 * @param network <string> - the network where the contracts are going to be deployed.
 */
async function doTheThing(network: string) {
  clear()

  console.log(header)

  try {
    // Check for output directory.
    if (!directoryExists(outputDirPath)) makeDir(outputDirPath)

    // Check if mnemonic already present.
    if (!directoryExists(mnemonicBaseDirPath) && !directoryExists(mnemonicFilePath))
      throw new Error(`You must first authenticate by running \`auth \"<your-mnemonic>\"\` command!`)

    // NOTE: contracts allready deployed.
    process.stdout.write(`\n`)

    const { provider, wallet } = await connectToBlockchain(network)
    const gasPrice = await provider.getGasPrice()
    const gasLimit = ethers.utils.hexlify(10000000)

    /** INIT MACI/QFI SMART CONTRACTS */
    const deployer = wallet

    console.log(chalk.bold(`\nInitialization for QFI/MACI smart contracts is running`))

    // Get deployed contracts instances.

    const simpleHackathon = new ethers.Contract(
      deployedContracts.SimpleHackathon,
      SimpleHackathon__factory.abi,
      deployer
    )

    const pollFactory = new ethers.Contract(deployedContracts.PollFactory, PollFactory__factory.abi, deployer)

    const grantRoundFactory = new ethers.Contract(
      deployedContracts.GrantRoundFactory,
      GrantRoundFactory__factory.abi,
      deployer
    )

    const messageAqFactory = new ethers.Contract(
      deployedContracts.MessageAqFactory,
      MessageAqFactory__factory.abi,
      deployer
    )

    const messageAqFactoryGrants = new ethers.Contract(
      deployedContracts.MessageAqFactoryGrants,
      MessageAqFactory__factory.abi,
      deployer
    )

    const vkRegistry = new ethers.Contract(deployedContracts.VKRegistry, VkRegistry__factory.abi, deployer)

    const qfi = new ethers.Contract(deployedContracts.QFI, QFI__factory.abi, deployer)

    // Send txs.
    let spinner = customSpinner(`Set MACI instance for SimpleHackathon contract`, "point")
    spinner.start()

    let tx = await simpleHackathon.connect(deployer).setMaciInstance(qfi.address, { gasPrice, gasLimit })
    await tx.wait()
    spinner.stop()
    console.log(`${logSymbols.success} Set MACI instance for SimpleHackathon contract`)

    spinner = customSpinner(`Max number of recipients for the SimpleHackathon base registry`, "point")
    spinner.start()

    tx = await simpleHackathon.connect(deployer).setMaxRecipients(numberOfMaxRecipients, { gasPrice, gasLimit })
    await tx.wait()
    spinner.stop()
    console.log(`${logSymbols.success} Max number of recipients for the SimpleHackathon base registry`)

    spinner = customSpinner(`Transfer PollFactory ownership to QFI contract`, "point")
    spinner.start()

    tx = await pollFactory.connect(deployer).transferOwnership(qfi.address, { gasPrice, gasLimit })
    await tx.wait()
    spinner.stop()
    console.log(`${logSymbols.success} Transfer PollFactory ownership to QFI contract`)

    spinner = customSpinner(`Transfer GrantRoundFactory ownership to QFI contract`, "point")
    spinner.start()

    tx = await grantRoundFactory.connect(deployer).transferOwnership(qfi.address, { gasPrice, gasLimit })
    await tx.wait()
    spinner.stop()
    console.log(`${logSymbols.success} Transfer GrantRoundFactory ownership to QFI contract`)

    spinner = customSpinner(`Transfer MessageAq ownership to PollFactory contract`, "point")
    spinner.start()

    tx = await messageAqFactory.connect(deployer).transferOwnership(pollFactory.address, { gasPrice, gasLimit })
    await tx.wait()
    spinner.stop()
    console.log(`${logSymbols.success} Transfer MessageAq ownership to PollFactory contract`)

    spinner = customSpinner(`Transfer MessageAqFactoryGrants ownership to GrantRoundFactory contract`, "point")
    spinner.start()

    tx = await messageAqFactoryGrants
      .connect(deployer)
      .transferOwnership(grantRoundFactory.address, { gasPrice, gasLimit })
    await tx.wait()
    spinner.stop()
    console.log(`${logSymbols.success} Transfer MessageAqFactoryGrants ownership to GrantRoundFactory contract`)

    spinner = customSpinner(`Initialize QFI contract`, "point")
    spinner.start()

    tx = await qfi
      .connect(deployer)
      .initialize(deployedContracts.VKRegistry, messageAqFactory.address, messageAqFactoryGrants.address, {
        gasPrice,
        gasLimit
      })
    await tx.wait()
    spinner.stop()
    console.log(`${logSymbols.success} Initialize QFI contract`)

    // NOTE: Set up vk registry
    const stateTreeDepth = await qfi.stateTreeDepth()
    const _stateTreeDepth = stateTreeDepth.toString()
    const _intStateTreeDepth = treeDepths.intStateTreeDepth
    const _messageTreeDepth = treeDepths.messageTreeDepth
    const _voteOptionTreeDepth = treeDepths.voteOptionTreeDepth
    const _messageBatchSize = messageBatchSize.toString()
    const _processVk = <VerifyingKeyStruct>ProcessVk.asContractParam()
    const _tallyVk = <VerifyingKeyStruct>TallyVk.asContractParam()

    spinner = customSpinner(`Set VKs`, "point")
    spinner.start()

    const vkTx = await vkRegistry.connect(deployer).setVerifyingKeys(stateTreeDepth,
      _intStateTreeDepth,
      _messageTreeDepth,
      _voteOptionTreeDepth,
      _messageBatchSize,
      _processVk,
      _tallyVk, {
      gasPrice: await provider.getGasPrice(),
      gasLimit: ethers.utils.hexlify(10000000)
    })
    await vkTx.wait()

    const genProcessVkSigTx = await vkRegistry.connect(deployer).genProcessVkSig(_stateTreeDepth, _messageTreeDepth, _voteOptionTreeDepth, _messageBatchSize, {
      gasPrice: await provider.getGasPrice(),
      gasLimit: ethers.utils.hexlify(10000000)
    })
    await genProcessVkSigTx.wait()
    const genTallyVkSigTx = await vkRegistry.connect(deployer).genTallyVkSig(_stateTreeDepth, _intStateTreeDepth, _voteOptionTreeDepth, {
      gasPrice: await provider.getGasPrice(),
      gasLimit: ethers.utils.hexlify(10000000)
    })
    await genTallyVkSigTx.wait()

    spinner.stop()
    console.log(`${logSymbols.success} Set Vks`)
    console.log(`\n${logSymbols.info} contracts initiated, continuing to project sign up step!\n`)

    const { confirmation } = await askForConfirmation(
      "You are about to register [16] projects, are you sure you want to continue? (nb. no requires you to run the steps one at a time)",
      "yes",
      "no"
    )

    if (!confirmation) {
      console.log(`\nFarewell 👋`)
      process.exit(0)
    }

    // Get CSV records.

    let i = 0
    for await (const recipientRecord of jsonRecipientsRecords) {
      const spinner = customSpinner(`Adding recipient in position ${chalk.bold(i)}`, "point")
      spinner.start()

      // Check input data.
      checkForMissingRecipientProperties(recipientRecord, i)

      // Get deployed simpleHackathon instance.
      const simpleHackathon = new ethers.Contract(
        deployedContracts.SimpleHackathon,
        SimpleHackathon__factory.abi,
        deployer
      )

      // Create metadata.
      const { ethereumAddress, ...metadataJSON } = recipientRecord
      const metadata = JSON.stringify(metadataJSON)

      // Create tx.
      const tx = await simpleHackathon.connect(deployer).addRecipient(recipientRecord.ethereumAddress, metadata, {
        gasPrice: await provider.getGasPrice(),
        gasLimit: ethers.utils.hexlify(10000000)
      })
      await tx.wait()

      spinner.stop()
      console.log(
        `${logSymbols.success} Recipient #${chalk.bold(i)} (${chalk.bold(
          recipientRecord.projectName
        )}) has been successfully registered on-chain`
      )

      i += 1
    }

    console.log(`\n${logSymbols.success} You have successfully registered the recipients on-chain 🎊\n`)

    const { confirmation:secondConfirmation } = await askForConfirmation(
      "You are about to register [400] ballots, are you sure you want to continue? (nb. no requires you to run the steps one at a time)",
      "yes",
      "no"
    )

    if (!secondConfirmation) {
      console.log(`\nFarewell 👋`)
      process.exit(0)
    }

  

    const stateIndexes = []

    const hacks: { [k: string]: string } = {}

    for await (const maciPK of userSignUps) {
      const spinner = customSpinner(`Sign up for user in position ${chalk.bold(i)}`, "point")
      spinner.start()

      // Prepare data for tx.
      const _maciPK = PubKey.unserialize(maciPK).asContractParam()
      const _signUpGatekeeperData = ethers.utils.defaultAbiCoder.encode(["uint256"], [0])
      const _initialVoiceCreditProxyData = ethers.utils.defaultAbiCoder.encode(["uint256"], [0])

      // Create tx.
      const { logs } = await qfi
        .connect(deployer)
        .signUp(_maciPK, _signUpGatekeeperData, _initialVoiceCreditProxyData)
        .then((tx: any) => tx.wait())

      // Read the event from logs.
      const iface = qfi.interface
      const signUpEvent = iface.parseLog(logs[logs.length - 1])
      const stateIndex: string = signUpEvent.args._stateIndex.toString()

      stateIndexes.push(stateIndex)

      spinner.stop()
      console.log(
        `${logSymbols.success} User #${chalk.bold(i)} (${chalk.bold(
          maciPK
        )}) has been successfully registered on-chain with a state index of ${stateIndex}`
      )

      // Store rows for CSV files.
      stateIndexes.push({
        maciPK,
        stateIndex
      })
      hacks[maciPK] = stateIndex

    }

    // Create CSV file.
    jsonToCsv(usersStateIndexesFilePath, [`maciPK`, `stateIndex`], stateIndexes)

    writeLocalJsonFile(hacksFilePath, JSON.parse(JSON.stringify(hacks)))

    console.log(`\n${logSymbols.success} You have successfully registered [400] users on-chain 🎊\n`)

    const THREEDAYS = 60 * 60 * 24 * 3;

    const grantRoundTx = await qfi
      .connect(deployer)
      .deployGrantRound(THREEDAYS, maxValues, treeDepths, coordinatorPubkey, deployer.address,{
        gasPrice,
        gasLimit
      })
    
    await grantRoundTx.wait()

    console.log(`\n${logSymbols.success} You have successfully initialized the deployed MACI/QFI smart contracts 🎊\n`)
    console.log(`\n${logSymbols.success} you grant rouns will be active once this transaction is confirmed ${grantRoundTx} n`)
  } catch (err: any) {
    console.log(err)
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

export default doTheThing
