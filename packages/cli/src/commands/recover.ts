#!/usr/bin/env node

import logSymbols from "log-symbols"
import { clear } from "console"
import chalk from "chalk"
import { BigNumber, ethers } from "ethers"
import { PubKey } from "@qfi/macisdk"

import { connectToBlockchain, getNetworkExplorerUrl } from "../lib/blockchain.js"
import { SimpleHackathon__factory } from "../../../contracts/typechain-types/factories/contracts/flavors/SimpleHackathon__factory.js"

import { directoryExists, jsonToCsv, makeDir, readJSONFile, writeLocalJsonFile } from "../lib/files.js"
import {
  coordinatorPubkey,
  hacksFilePath,
  header,
  mnemonicBaseDirPath,
  mnemonicFilePath,
  outputDirPath,
  treeDepths,
  usersStateIndexesFilePath,
  userSignUps,
  maxValues,
  usersStateIndexesBaseDirPath,
  jsonRecipientsRecords,
  deployedContractsBaseDirPath,
  deployedContractsFilePath
} from "../lib/constants.js"
import { askForConfirmation, customSpinner } from "../lib/prompts.js"

function delay(n: number) {
  return new Promise((resolve) => {
    setTimeout(resolve, n * 1000)
  })
}

/**
 * Initialize command.
 * @param network <string> - the network where the contracts are going to be deployed.
 */
async function recover(network: string) {
  clear()

  console.log(header)

  try {
    // Check for output directory.
    if (!directoryExists(outputDirPath)) makeDir(outputDirPath)

    // Check if mnemonic already present.
    if (!directoryExists(mnemonicBaseDirPath) && !directoryExists(mnemonicFilePath))
      throw new Error(`You must first authenticate by running \`auth \"<your-mnemonic>\"\` command!`)
    // Check if users has been already signed up.
    if (!directoryExists(usersStateIndexesBaseDirPath)) makeDir(usersStateIndexesBaseDirPath)
    if (!directoryExists(usersStateIndexesBaseDirPath)) makeDir(usersStateIndexesBaseDirPath)

    // Check if contracts allready deployed.

    // Check for output directory.
    if (!directoryExists(outputDirPath)) makeDir(outputDirPath)

    // Check if mnemonic already present.
    if (!directoryExists(mnemonicBaseDirPath) && !directoryExists(mnemonicFilePath))
      throw new Error(`You must first authenticate by running \`auth \"<your-mnemonic>\"\` command!`)

    // Check if contracts has been already deployed.
    if (!directoryExists(deployedContractsBaseDirPath) && !directoryExists(deployedContractsFilePath))
      throw new Error(`You must first deploy QFI/MACI smart contracts by running \`deploy \"<network>\"\` command!`)

    process.stdout.write(`\n`)

    // Retrieve deployed smart contracts addresses.
    const deployedContracts = readJSONFile(deployedContractsFilePath)
    process.stdout.write(`\n`)

    const { provider, wallet } = await connectToBlockchain(network)
    const gasPrice = await provider.getGasPrice()
    const double = BigNumber.from("2")
    const doubleGasPrice = gasPrice.mul(double)

    /** INIT MACI/QFI SMART CONTRACTS */
    const deployer = wallet

    console.log(chalk.bold(`\n For all the marbles this will take approximately [43] minutes`))
    console.log(`\n${logSymbols.info} MAKE SURE YOU HAVE A STABLE WIFI CONNECTION AND YOUR LAPTOP IS CHARGED!\n`)
    const { confirmation: preFlightCheck1 } = await askForConfirmation("Ready?")

    if (!preFlightCheck1) {
      console.log(`\nFarewell 1👋`)
      process.exit(0)
    }

    const { confirmation: preFlightCheck2 } = await askForConfirmation("Are you ABOLUTELY SURE?", "yes", "no")

    if (!preFlightCheck2) {
      console.log(`\nFarewell 2👋`)
      process.exit(0)
    }

    const { confirmation: preFlightCheck3 } = await askForConfirmation("Do you have enough gas ?", "yes", "no")

    if (!preFlightCheck3) {
      console.log(`\nFarewell3 👋`)
      process.exit(0)
    }

    const { confirmation: preFlightCheck4 } = await askForConfirmation("LETS DO THE THING?", "I HAVE NO DOUBTS", "no")

    if (!preFlightCheck4) {
      console.log(`\nFarewell4 👋`)
      process.exit(0)
    }
    // Get deployed contracts instances.

    // const qfi = new ethers.Contract(deployedContracts.QFI, QFI__factory.abi, deployer)

    // Send txs.
    let spinner = customSpinner(`SKIP: Set MACI instance for SimpleHackathon contract`, "point")
    spinner.start()
    await delay(3)

    spinner.stop()

    // NOTE: Set up vk registry

    spinner = customSpinner(`Recovery Mode Detected: calculating state diff`, "point")
    spinner.start()
    await delay(3)

    spinner.stop()

    // Get deployed simpleHackathon instance.
    const simpleHackathon = new ethers.Contract(
      deployedContracts.SimpleHackathon,
      SimpleHackathon__factory.abi,
      deployer
    )

    console.log(`\n${logSymbols.info} RECOVER: register projects\n`)

    const recipientStateIndex = Number(await simpleHackathon.getRecipientCount())

    // Get CSV records.

    // eslint-disable-next-line no-plusplus
    for (let i = recipientStateIndex; i < jsonRecipientsRecords.length; i++) {
      const recipientRecord = jsonRecipientsRecords[i]
      const spinner = customSpinner(`Adding recipient in position ${chalk.bold(i)}`, "point")
      spinner.start()

      // Check input data.

      // Create metadata.
      const { ethereumAddress, ...metadataJSON } = recipientRecord
      const metadata = JSON.stringify(metadataJSON)

      // Create tx.
      const tx = await simpleHackathon.connect(deployer).addRecipient(recipientRecord.ethereumAddress, metadata, {
        gasPrice: doubleGasPrice,
        gasLimit: ethers.utils.hexlify(10000000)
      })
      await tx.wait()

      spinner.stop()
      console.log(
        `${logSymbols.success} Recipient #${chalk.bold(i)} (${chalk.bold(
          recipientRecord.projectName
        )}) has been successfully registered on-chain`
      )
    }

    console.log(`\n${logSymbols.success} You have successfully registered the recipients on-chain 🎊\n`)

    console.log(
      `\n${logSymbols.success} You are about to register ballots, DO NOT EXIT RECOVERY FROM HERE IS HARD 🎊\n`
    )

    spinner = customSpinner(`Waiting for next block to fetch user state index`, "point")
    spinner.start()
    await delay(30)

    spinner.stop()

    const stateIndexes = []
    const _maciPK = PubKey.unserialize("maciPK").asContractParam()

    const hacks: { [k: string]: string } = {}
    // const maciStateIndex = Number(await qfi.numSignUps())

    // eslint-disable-next-line no-plusplus
    // for (let i = maciStateIndex; i < userSignUps.length; i++) {
    //   const maciPK = userSignUps[i]
    //   const spinner = customSpinner(`Sign up for user in position ${chalk.bold(i)}`, "point")
    //   spinner.start()

    //   // Prepare data for tx.
    //   const _maciPK = PubKey.unserialize(maciPK).asContractParam()
    //   const _signUpGatekeeperData = ethers.utils.defaultAbiCoder.encode(["uint256"], [0])
    //   const _initialVoiceCreditProxyData = ethers.utils.defaultAbiCoder.encode(["uint256"], [0])

    //   const tx = await qfi.connect(deployer).signUp(_maciPK, _signUpGatekeeperData, _initialVoiceCreditProxyData, {
    //     gasPrice: doubleGasPrice,
    //     gasLimit: ethers.utils.hexlify(10000000)
    //   })
    //   await tx.wait()

    //   const stateIndex: string = i.toString()

    //   spinner.stop()
    //   console.log(
    //     `${logSymbols.success} User #${chalk.bold(i)} (${chalk.bold(
    //       maciPK
    //     )}) has been successfully registered on-chain with a state index of ${stateIndex}`
    //   )

    //   // Store rows for CSV files.
    //   stateIndexes.push({
    //     maciPK,
    //     stateIndex
    //   })
    //   hacks[maciPK] = stateIndex
    // }

    // // Create CSV file.
    // jsonToCsv(usersStateIndexesFilePath, [`maciPK`, `stateIndex`], stateIndexes)

    // writeLocalJsonFile(hacksFilePath, JSON.parse(JSON.stringify(hacks)))

    // console.log(`\n${logSymbols.success} You have successfully registered users on-chain 🎊\n`)

    // console.log(`\n${logSymbols.success} We will now start the grant round. It will be active for [7] days. 🎊\n`)

    // const SEVENDAYS = 60 * 60 * 24 * 7

    // const _coordinatorPubkey = PubKey.unserialize(coordinatorPubkey).asContractParam()
    // const grantRoundTx = await qfi
    //   .connect(deployer)
    //   .deployGrantRound(SEVENDAYS, maxValues, treeDepths, _coordinatorPubkey, deployer.address, {
    //     gasPrice: doubleGasPrice,
    //     gasLimit: ethers.utils.hexlify(8000000)
    //   })

    // await grantRoundTx.wait()

    // console.log(`\n${logSymbols.success} You have successfully initialized the deployed MACI/QFI smart contracts 🎊\n`)
    // console.log(
    //   `\n${logSymbols.success} you grant round will be active once this transaction is confirmed ${grantRoundTx} n`
    // )
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

export default recover
