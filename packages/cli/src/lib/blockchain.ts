import { Network } from "types";
import { JsonRpcProvider } from "@ethersproject/providers";
import { Wallet } from "ethers";

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
 * Return a new Wallet instance obtained from mnemonic connected to the given provider.
 * @param provider <JsonRpcProvider> - the provider connected to the selected network
 * @returns <Wallet>
 */
export const connectWalletToProviderFromMnemonic = (provider: JsonRpcProvider): Wallet => {
    // Get mnemonic from local configs.
    const WALLET_MNEMONIC =
        process.env.WALLET_MNEMONIC || "candy maple cake sugar pudding cream honey rich smooth crumble sweet treat";

    // Get wallet from mnemonic.
    let wallet = Wallet.fromMnemonic(WALLET_MNEMONIC)

    // Connect to the provider.
    wallet = wallet.connect(provider)

    return wallet
}