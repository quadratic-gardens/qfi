import { Network } from "types";
import { JsonRpcProvider } from "@ethersproject/providers";
import { Wallet } from "ethers";
import { readFileSync } from "./files.js";

// Available networks.
// TODO: refactor with a more generic approach, just these two for EthPrague Round.
const networks = {
    localhost: {
        name: "localhost",
        rpcUrl: "http://localhost:8545", // Hardhat
        chainId: 1337
    },
    arbitrumRinkeby: {
        name: "arbitrum-rinkeby",
        rpcUrl: "https://rinkeby.arbitrum.io/rpc",
        chainId: 421611
    },
    xdai: {
        name: "xdai",
        rpcUrl: "https://rpc.xdaichain.com/",
        chainId: 100
    }
}

/**
 * Return a new JSON RPC provider object linked to the provided network.
 * @param network <string> - the provided network.
 * @return <JsonRpcProvider>
 */
export const getProvider = (network: string): JsonRpcProvider => {
    let selectedNetwork: Network

    // Connect to selected network.
    if (network === networks.xdai.name) 
        selectedNetwork = networks.xdai
    else if (network === networks.arbitrumRinkeby.name)
        selectedNetwork = networks.arbitrumRinkeby
    else
        selectedNetwork = networks.localhost

    const provider = new JsonRpcProvider(selectedNetwork.rpcUrl, selectedNetwork.name)

    return provider
}

/**
 * Return the related wallet associated to the given mnemonic.
 * @param mnemonic <string> - the secret mnemonic phrase (e.g., 12 words) separated by spaces.
 * @returns <Wallet>
 */
export const getWalletFromMnemonic = (mnemonic: string): Wallet => {
    return Wallet.fromMnemonic(mnemonic)
}

/**
 * Return a new Wallet instance obtained from mnemonic connected to the given provider.
 * @param provider <JsonRpcProvider> - the provider connected to the selected network
 * @returns <Wallet>
 */
export const connectWalletToProviderFromMnemonic = (provider: JsonRpcProvider): Wallet => {
    // Get wallet from stored mnemonic.
    const mnemonic = readFileSync(`./output/mnemonic.txt`)

    let wallet = Wallet.fromMnemonic(mnemonic)

    // Connect to the provider.
    wallet = wallet.connect(provider)

    return wallet
}