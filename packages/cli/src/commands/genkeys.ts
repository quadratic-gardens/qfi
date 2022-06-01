#!/usr/bin/env node
import logSymbols from "log-symbols"
import inquirer from "inquirer"
import figlet from "figlet"
import { cleanDir, directoryExists, makeDir, toTextFile } from "../lib/files.js"
import { EthKeyPair, KeyPair, QRCodeFileType } from "../../types/index.js"
import { generateEthereumKeyPair, generateMaciKeyPair } from "../lib/keypair.js"
import toQRCodeFile from "../lib/qrcode.js"

/**
 * Genkeys command.
 * @param quantity <number> - amount of MACI and ETH keypairs to be generated.
 */
async function genkeys(quantity: number) {
  try {
    const dirPath = `./output`
    const ethDirPathName = `ethKeys`
    const maciDirPathName = `maciKeys`

    const ethBaseName = `eth_key`
    const maciBaseName = `maci_key`

    const ethKeysDirPath = `${dirPath}/${ethDirPathName}`
    const maciKeysDirPath = `${dirPath}/${maciDirPathName}`

    if (quantity === 0) throw new Error(`Please, provide an amount greater than zero!`)

    // Create directories if not already generated.
    if (!directoryExists(dirPath)) {
      makeDir(dirPath)
      makeDir(ethKeysDirPath)
      makeDir(maciKeysDirPath)
    } else {

      //NOTE: prompt user to confirm deleting directory
      console.log(`\n⚠️ Carefull you already have previously generated keys`)
      const answer = await inquirer.prompt([
        {
          type: "confirm",
          name: "continue",
          message: `Do you want to continue?`,
          default: false
        }
      ])

      if (!answer.continue) {
        throw new Error(`You decided to stop the process.`)
      }

      cleanDir(ethKeysDirPath)
      cleanDir(maciKeysDirPath)
    }

    for (let i = 0; i < quantity; i += 1) {
      // Generate an Ethereum keypair.
      const ethKeyPair: EthKeyPair = generateEthereumKeyPair()

      // Generate a MACI keypair.
      const maciKeyPair: KeyPair = generateMaciKeyPair()

      const ethKeyDirPath = `${ethKeysDirPath}/${ethBaseName}_${i}`
      const maciKeyDirPath = `${maciKeysDirPath}/${maciBaseName}_${i}`

      makeDir(ethKeyDirPath)
      makeDir(maciKeyDirPath)

      /* Store as plaintext */

      // Eth.
      toTextFile(ethKeyDirPath, `${ethBaseName}_${i}_sk`, ethKeyPair.privateKey)
      toTextFile(ethKeyDirPath, `${ethBaseName}_${i}_pk`, ethKeyPair.address)

      // Maci.
      toTextFile(maciKeyDirPath, `${maciBaseName}_${i}_sk`, maciKeyPair.privateKey)
      toTextFile(maciKeyDirPath, `${maciBaseName}_${i}_pk`, maciKeyPair.publicKey)

      /* Store as QR Code */

      // Eth.
      await toQRCodeFile(ethKeyDirPath, `${ethBaseName}_${i}_mnemonic`, ethKeyPair.mnemonic, QRCodeFileType.PNG)
      await toQRCodeFile(ethKeyDirPath, `${ethBaseName}_${i}_mnemonic`, ethKeyPair.mnemonic, QRCodeFileType.SVG)
      // await toQRCodeFile(ethKeyDirPath, `${ethBaseName}_${i}_mnemonic`, ethKeyPair.mnemonic, QRCodeFileType.UTF8)

      // await toQRCodeFile(ethKeyDirPath, `${ethBaseName}_${i}_sk`, ethKeyPair.privateKey, QRCodeFileType.PNG)
      // await toQRCodeFile(ethKeyDirPath, `${ethBaseName}_${i}_sk`, ethKeyPair.privateKey, QRCodeFileType.SVG)
      // await toQRCodeFile(ethKeyDirPath, `${ethBaseName}_${i}_sk`, ethKeyPair.privateKey, QRCodeFileType.UTF8)

      await toQRCodeFile(ethKeyDirPath, `${ethBaseName}_${i}_address`, ethKeyPair.address, QRCodeFileType.PNG)
      await toQRCodeFile(ethKeyDirPath, `${ethBaseName}_${i}_address`, ethKeyPair.address, QRCodeFileType.SVG)
      // await toQRCodeFile(ethKeyDirPath, `${ethBaseName}_${i}_pk`, ethKeyPair.address, QRCodeFileType.UTF8)

      // Maci.
      await toQRCodeFile(maciKeyDirPath, `${maciBaseName}_${i}_sk`, maciKeyPair.privateKey, QRCodeFileType.PNG)
      await toQRCodeFile(maciKeyDirPath, `${maciBaseName}_${i}_sk`, maciKeyPair.privateKey, QRCodeFileType.SVG)
      // await toQRCodeFile(maciKeyDirPath, `${maciBaseName}_${i}_sk`, maciKeyPair.privateKey, QRCodeFileType.UTF8)

      await toQRCodeFile(maciKeyDirPath, `${maciBaseName}_${i}_pk`, maciKeyPair.publicKey, QRCodeFileType.PNG)
      await toQRCodeFile(maciKeyDirPath, `${maciBaseName}_${i}_pk`, maciKeyPair.publicKey, QRCodeFileType.SVG)
      // await toQRCodeFile(maciKeyDirPath, `${maciBaseName}_${i}_pk`, maciKeyPair.publicKey, QRCodeFileType.UTF8)

      console.log(`Keypair #${i} - ${logSymbols.success} Ethereum / ${logSymbols.success} MACI`)
    }

    console.log(
      "\n",
      figlet.textSync("EthPrague Step 1 Complete!", {
        font: "ANSI Regular",
        horizontalLayout: "default",
        verticalLayout: "default",
        width: 80,
        whitespaceBreak: true
      })
    )

    console.log(
      `\nYou have successfully completed the key generation 🎊 You can find everything inside the \`${dirPath}/\` folder!`
    )
  } catch (err: any) {
    console.log(`${logSymbols.error} Something went wrong: ${err.message ?? err}`)
  }
}

export default genkeys
