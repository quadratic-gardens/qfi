import { ethers } from "ethers"
import { Keypair } from "maci-domainobjs"
import { KeyPair } from "../../types/index.js"

/**
 * Generate a new Ethereum keypair.
 * @returns <KeyPair>
 */
export const generateEthereumKeyPair = (): KeyPair => {
  // Generate a new Ethereum wallet.
  const wallet = ethers.Wallet.createRandom()

  // Extract keys.
  const { privateKey } = wallet
  const { publicKey } = wallet

  return {
    privateKey,
    publicKey
  }
}

/**
 * Generate a new MACI keypair.
 * @returns <KeyPair>
 */
export const generateMaciKeyPair = (): KeyPair => {
  // Generate a new Ethereum wallet.
  const wallet = new Keypair()

  // Extract keys.
  const privateKey = wallet.privKey.serialize()
  const publicKey = wallet.pubKey.serialize()

  return {
    privateKey,
    publicKey
  }
}
