#!/usr/bin/env node
import logSymbols from "log-symbols"
import { cleanDir, directoryExists, makeDir, toTextFile } from "../lib/files.js"
import { KeyPair, QRCodeFileType } from "../../types/index.js"
import { generateEthereumKeyPair, generateMaciKeyPair } from "../lib/keypair.js"
import toQRCodeFile from "../lib/qrcode.js"

/**
 * Genkeys command.
 * @param quantity <number> - amount of MACI and ETH keypairs to be generated.
 */
async function genkeys(quantity: number) {
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
    cleanDir(ethKeysDirPath)
    cleanDir(maciKeysDirPath)
  }

  for (let i = 0; i < quantity; i += 1) {
    // Generate an Ethereum keypair.
    const ethKeyPair: KeyPair = generateEthereumKeyPair()

    // Generate a MACI keypair.
    const maciKeyPair: KeyPair = generateMaciKeyPair()

    const ethKeyDirPath = `${ethKeysDirPath}/${ethBaseName}_${i}`
    const maciKeyDirPath = `${maciKeysDirPath}/${maciBaseName}_${i}`

    makeDir(ethKeyDirPath)
    makeDir(maciKeyDirPath)

    /* Store as plaintext */

    // Eth.
    toTextFile(ethKeyDirPath, `${ethBaseName}_${i}_sk`, ethKeyPair.privateKey)
    toTextFile(ethKeyDirPath, `${ethBaseName}_${i}_pk`, ethKeyPair.publicKey)

    // Maci.
    toTextFile(maciKeyDirPath, `${maciBaseName}_${i}_sk`, maciKeyPair.privateKey)
    toTextFile(maciKeyDirPath, `${maciBaseName}_${i}_pk`, maciKeyPair.publicKey)

    /* Store as QR Code */

    // Eth.
    toQRCodeFile(ethKeyDirPath, `${ethBaseName}_${i}_sk`, ethKeyPair.privateKey, QRCodeFileType.PNG)
    toQRCodeFile(ethKeyDirPath, `${ethBaseName}_${i}_sk`, ethKeyPair.privateKey, QRCodeFileType.SVG)
    toQRCodeFile(ethKeyDirPath, `${ethBaseName}_${i}_sk`, ethKeyPair.privateKey, QRCodeFileType.UTF8)

    toQRCodeFile(ethKeyDirPath, `${ethBaseName}_${i}_pk`, ethKeyPair.publicKey, QRCodeFileType.PNG)
    toQRCodeFile(ethKeyDirPath, `${ethBaseName}_${i}_pk`, ethKeyPair.publicKey, QRCodeFileType.SVG)
    toQRCodeFile(ethKeyDirPath, `${ethBaseName}_${i}_pk`, ethKeyPair.publicKey, QRCodeFileType.UTF8)

    // Maci.
    toQRCodeFile(maciKeyDirPath, `${maciBaseName}_${i}_sk`, maciKeyPair.privateKey, QRCodeFileType.PNG)
    toQRCodeFile(maciKeyDirPath, `${maciBaseName}_${i}_sk`, maciKeyPair.privateKey, QRCodeFileType.SVG)
    toQRCodeFile(maciKeyDirPath, `${maciBaseName}_${i}_sk`, maciKeyPair.privateKey, QRCodeFileType.UTF8)

    toQRCodeFile(maciKeyDirPath, `${maciBaseName}_${i}_pk`, maciKeyPair.publicKey, QRCodeFileType.PNG)
    toQRCodeFile(maciKeyDirPath, `${maciBaseName}_${i}_pk`, maciKeyPair.publicKey, QRCodeFileType.SVG)
    toQRCodeFile(maciKeyDirPath, `${maciBaseName}_${i}_pk`, maciKeyPair.publicKey, QRCodeFileType.UTF8)

    console.log(`Keypair #${i} - ${logSymbols.success} Ethereum / ${logSymbols.success} MACI`)
  }

  console.log(
    `\nYou have successfully completed the key generation 🎊 You can find everything inside the \`${dirPath}/\` folder!`
  )
}

export default genkeys
