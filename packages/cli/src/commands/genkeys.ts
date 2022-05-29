#!/usr/bin/env node
import logSymbols from "log-symbols"
import { cleanDir, toTextFile } from "../lib/files.js"
import { KeyPair, QRCodeFileType } from "../../types/index.js"
import { generateEthereumKeyPair, generateMaciKeyPair } from "../lib/keypair.js"
import toQRCodeFile from "../lib/qrcode.js"

/**
 * Genkeys command.
 * @param quantity <number> - amount of MACI and ETH keypairs to be generated.
 */
async function genkeys(quantity: number) {
  const dirPath = `generated`
  const ethBaseName = `eth_key`
  const maciBaseName = `maci_key`

  // Erase old keys.
  cleanDir(`./${dirPath}`)

  if (quantity === 0) throw new Error(`Please, provide an amount greater than zero!`)

  for (let i = 0; i < quantity; i += 1) {
    // Generate an Ethereum keypair.
    const ethKeyPair: KeyPair = generateEthereumKeyPair()

    // Generate a MACI keypair.
    const maciKeyPair: KeyPair = generateMaciKeyPair()

    /* Store as plaintext */
    const ethDirPath = `./${dirPath}/${ethBaseName}_${i}`
    const maciDirPath = `./${dirPath}/${maciBaseName}_${i}`
    cleanDir(ethDirPath)
    cleanDir(maciDirPath)

    // Eth.
    toTextFile(ethDirPath, `${ethBaseName}_${i}_sk`, ethKeyPair.privateKey)
    toTextFile(ethDirPath, `${ethBaseName}_${i}_pk`, ethKeyPair.publicKey)

    // Maci.
    toTextFile(maciDirPath, `${maciBaseName}_${i}_sk`, maciKeyPair.privateKey)
    toTextFile(maciDirPath, `${maciBaseName}_${i}_pk`, maciKeyPair.publicKey)

    /* Store as QR Code */

    // Eth.
    toQRCodeFile(ethDirPath, `${ethBaseName}_${i}_sk`, ethKeyPair.privateKey, QRCodeFileType.PNG)
    toQRCodeFile(ethDirPath, `${ethBaseName}_${i}_sk`, ethKeyPair.privateKey, QRCodeFileType.SVG)
    toQRCodeFile(ethDirPath, `${ethBaseName}_${i}_sk`, ethKeyPair.privateKey, QRCodeFileType.UTF8)

    toQRCodeFile(ethDirPath, `${ethBaseName}_${i}_pk`, ethKeyPair.publicKey, QRCodeFileType.PNG)
    toQRCodeFile(ethDirPath, `${ethBaseName}_${i}_pk`, ethKeyPair.publicKey, QRCodeFileType.SVG)
    toQRCodeFile(ethDirPath, `${ethBaseName}_${i}_pk`, ethKeyPair.publicKey, QRCodeFileType.UTF8)

    // Maci.
    toQRCodeFile(maciDirPath, `${maciBaseName}_${i}_sk`, maciKeyPair.privateKey, QRCodeFileType.PNG)
    toQRCodeFile(maciDirPath, `${maciBaseName}_${i}_sk`, maciKeyPair.privateKey, QRCodeFileType.SVG)
    toQRCodeFile(maciDirPath, `${maciBaseName}_${i}_sk`, maciKeyPair.privateKey, QRCodeFileType.UTF8)

    toQRCodeFile(maciDirPath, `${maciBaseName}_${i}_pk`, maciKeyPair.publicKey, QRCodeFileType.PNG)
    toQRCodeFile(maciDirPath, `${maciBaseName}_${i}_pk`, maciKeyPair.publicKey, QRCodeFileType.SVG)
    toQRCodeFile(maciDirPath, `${maciBaseName}_${i}_pk`, maciKeyPair.publicKey, QRCodeFileType.UTF8)

    console.log(`Keypair #${i} - ${logSymbols.success} Ethereum / ${logSymbols.success} MACI`)
  }

  console.log(
    `\nYou have successfully completed the key generation 🎊 You can find everything inside the \`${dirPath}/\` folder!`
  )
}

export default genkeys
