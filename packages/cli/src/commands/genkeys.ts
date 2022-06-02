#!/usr/bin/env node
import logSymbols from "log-symbols"
import clear from "clear"
import chalk from "chalk"
import { cleanDir, directoryExists } from "../lib/files.js"
import { EthKeyPair, KeyPair, QRCodeFileType } from "../../types/index.js"
import { generateEthereumKeyPair, generateMaciKeyPair } from "../lib/keypair.js"
import toQRCodeFile from "../lib/qrcode.js"
import {
  ethBaseDirPath,
  ethKeyPairBaseDirAndFileName,
  ethKeyPairBaseDirPath,
  generatedKeysGlobalDirPath,
  header,
  maciBaseDirPath,
  maciKeyPairBaseDirAndFileName,
  maciKeyPairBaseDirPath,
  outputDirPath
} from "../lib/constants.js"
import { askForConfirmation } from "../lib/prompts.js"

/**
 * Genkeys command.
 * @param quantity <number> - amount of MACI and ETH keypairs to be generated.
 */
async function genkeys(quantity: number) {
  clear()

  console.log(header)

  try {
    if (quantity === 0) throw new Error(`Sorry, but you cannot generate zero key pairs for MACI/QFI`)

    // Check for output directory.
    if (!directoryExists(outputDirPath)) cleanDir(outputDirPath)
    else if (directoryExists(ethBaseDirPath) && directoryExists(maciBaseDirPath)) {
      // Prompt for user.
      console.log(`\n${logSymbols.info} Seems that you have already generated the keys!\n`)

      const { confirmation } = await askForConfirmation(
        "Are you sure you want to continue? (nb. confirmation will override your generated keys)",
        "yes",
        "no"
      )

      if (!confirmation) {
        console.log(`\nFarewell 👋`)
        process.exit(0)
      }
    }

    cleanDir(generatedKeysGlobalDirPath)
    cleanDir(ethBaseDirPath)
    cleanDir(maciBaseDirPath)

    console.log(chalk.bold(`\nEthereum and MACI Key generation is running`))

    for (let i = 0; i < quantity; i += 1) {
      // Generate an Ethereum keypair.
      const ethKeyPair: EthKeyPair = generateEthereumKeyPair()

      // Generate a MACI keypair.
      const maciKeyPair: KeyPair = generateMaciKeyPair()

      cleanDir(`${ethKeyPairBaseDirPath}_${i}`)
      cleanDir(`${maciKeyPairBaseDirPath}_${i}`)

      /* Store as QR Code */

      // Eth.
      const ethMnemonicFilePath = `${ethKeyPairBaseDirPath}_${i}/${ethKeyPairBaseDirAndFileName}_${i}_mnemonic`
      const ethAddressFilePath = `${ethKeyPairBaseDirPath}_${i}/${ethKeyPairBaseDirAndFileName}_${i}_address`

      await toQRCodeFile(ethMnemonicFilePath, ethKeyPair.mnemonic, QRCodeFileType.PNG)
      await toQRCodeFile(ethMnemonicFilePath, ethKeyPair.mnemonic, QRCodeFileType.SVG)

      await toQRCodeFile(ethAddressFilePath, ethKeyPair.address, QRCodeFileType.PNG)
      await toQRCodeFile(ethAddressFilePath, ethKeyPair.address, QRCodeFileType.SVG)

      // Maci.
      const maciPrivateFilePath = `${maciKeyPairBaseDirPath}_${i}/${maciKeyPairBaseDirAndFileName}_${i}_sk`
      const maciPublicFilePath = `${maciKeyPairBaseDirPath}_${i}/${maciKeyPairBaseDirAndFileName}_${i}_pk`

      await toQRCodeFile(maciPrivateFilePath, maciKeyPair.privateKey, QRCodeFileType.PNG)
      await toQRCodeFile(maciPrivateFilePath, maciKeyPair.privateKey, QRCodeFileType.SVG)

      await toQRCodeFile(maciPublicFilePath, maciKeyPair.publicKey, QRCodeFileType.PNG)
      await toQRCodeFile(maciPublicFilePath, maciKeyPair.publicKey, QRCodeFileType.SVG)

      console.log(`Keypair #${i} - ${logSymbols.success} Ethereum / ${logSymbols.success} MACI`)
    }

    console.log(
      `\n${logSymbols.info} Generated keypairs for Ethereum in the ${ethBaseDirPath} folder\n${logSymbols.info} Generated keypairs for MACI in the ${maciBaseDirPath} folder
       \n${logSymbols.success} You have successfully generated the keypairs for Ethereum and MACI 🎊`
    )
  } catch (err: any) {
    console.log(`\n${logSymbols.error} Something went wrong: ${err.message ?? err}`)
  }
}

export default genkeys
