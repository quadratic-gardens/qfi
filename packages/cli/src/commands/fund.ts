#!/usr/bin/env node
/* eslint-disable no-console */

import logSymbols from "log-symbols"
import { clear } from "console"
import chalk from "chalk"
import { BigNumber, ethers } from "ethers"
import { connectToBlockchain, getNetworkExplorerUrl } from "../lib/blockchain.js"

import { directoryExists, makeDir } from "../lib/files.js"
import {
  header,
  mnemonicBaseDirPath,
  mnemonicFilePath,
  outputDirPath,
  usersStateIndexesBaseDirPath,
  userWallets
} from "../lib/constants.js"
import { askForConfirmation } from "../lib/prompts.js"

async function fund(network: string) {
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
    // NOTE: contracts allready deployed.
    process.stdout.write(`\n`)

    const { provider, wallet } = await connectToBlockchain(network)
    const gasPrice = await provider.getGasPrice()
    const double = BigNumber.from("2")
    const doubleGasPrice = gasPrice.mul(double)
    const gasLimit = ethers.utils.hexlify(10000000)
    const wallets = userWallets

    console.log(chalk.bold(`\n you are about to send [0.1] to [400] people.`))
    const { confirmation: preFlightCheck1 } = await askForConfirmation("Ready?")
    if (!preFlightCheck1) {
      console.log(`\nFarewell 1👋`)
      process.exit(0)
    }

    for await (const address of wallets) {
      console.log(`\n${logSymbols.success} funding for  ${address}\n`)
      const tx = await wallet.sendTransaction({
        to: address,
        value: ethers.utils.parseEther("0.1"),
        gasPrice: doubleGasPrice,
        gasLimit
      })
      await tx.wait()
    }

    console.log(`\n${logSymbols.success} very generous 🎊\n`)
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

export default fund
