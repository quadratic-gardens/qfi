import { task } from "hardhat/config";
import fs from "fs";
import path from "path";
import dotenv from "dotenv";

import { HardhatUserConfig } from "hardhat/types";
import { NetworkUserConfig } from "hardhat/types";

import "@typechain/hardhat";
import "@nomiclabs/hardhat-ethers";
// import "@nomiclabs/hardhat-waffle";
// import "@nomiclabs/hardhat-ganache";

import "solidity-coverage";
import "hardhat-gas-reporter";
import "hardhat-contract-sizer";
import "hardhat-abi-exporter";

dotenv.config();

const WALLET_MNEMONIC =
  process.env.WALLET_MNEMONIC ||
  "candy maple cake sugar pudding cream honey rich smooth crumble sweet treat";
const INFURA_API_KEY = process.env.INFURA_API_KEY || "";
const GAS_LIMIT = 30000000;
const CHAIN_IDS = {
  ganache: 1337,
  goerli: 5,
  hardhat: 31337,
  kovan: 42,
  mainnet: 1,
  rinkeby: 4,
  ropsten: 3,
  xdai: 100,
};

// This is a sample Hardhat task. To learn how to create your own go to
// https://hardhat.org/guides/create-task.html
task("accounts", "Prints the list of accounts", async (args, hre) => {
  const accounts = await hre.ethers.getSigners();

  for (const account of accounts) {
    console.log(await account.getAddress());
  }
});

function createTestnetConfig(
  network: keyof typeof CHAIN_IDS
): NetworkUserConfig {
  const url: string = "https://" + network + ".infura.io/v3/" + INFURA_API_KEY;
  return {
    accounts: {
      count: 10,
      initialIndex: 0,
      mnemonic: WALLET_MNEMONIC,
      // eslint-disable-next-line quotes
      path: "m/44'/60'/0'/0",
    },
    chainId: CHAIN_IDS[network],
    url,
  };
}

const config: HardhatUserConfig = {
  networks: {
    hardhat: {
      gas: GAS_LIMIT,
      blockGasLimit: GAS_LIMIT,
      accounts: { count: 30, mnemonic: WALLET_MNEMONIC },
      chainId: CHAIN_IDS.hardhat,
    },
    localhost: {
      url: "http://127.0.0.1:8545",
      gas: GAS_LIMIT,
      blockGasLimit: GAS_LIMIT,
      accounts: { count: 30, mnemonic: WALLET_MNEMONIC },
    },
    ganache: {
      // Workaround for https://github.com/nomiclabs/hardhat/issues/518
      url: "http://127.0.0.1:8555",
      gasLimit: GAS_LIMIT,
    } as any,
    xdai: {
      url: process.env.XDAI_JSONRPC_HTTP_URL || "https://rpc.xdaichain.com",
      timeout: 60000,
      accounts: { mnemonic: WALLET_MNEMONIC },
      chainId: CHAIN_IDS.xdai,
    },
    mainnet: createTestnetConfig("mainnet"),
    goerli: createTestnetConfig("goerli"),
    kovan: createTestnetConfig("kovan"),
    rinkeby: createTestnetConfig("rinkeby"),
    ropsten: createTestnetConfig("ropsten"),
  },
  paths: {
    artifacts: "build/contracts",
    tests: "tests",
  },
  contractSizer: {
    alphaSort: true,
    runOnCompile: true,
    disambiguatePaths: false,
  },
  gasReporter: {
    currency: "USD",
    gasPrice: 100,
    coinmarketcap: "603bd12e-d2f3-4a9f-8c82-d5e346d9d482",
  },
  typechain: {
    outDir: "typechain/",
    target: "ethers-v5",
    alwaysGenerateOverloads: false,
    externalArtifacts: [],
  },
  solidity: {
    version: "0.8.10",
    settings: {
      optimizer: {
        enabled: true,
        runs: 0,
      },
    },
    overrides: {},
  },
};

// task('compile', 'Compiles the entire project, building all artifacts', async (_, { config }, runSuper) => {
//   await runSuper();
// });

// This is a sample Hardhat task. To learn how to create your own go to
// https://hardhat.org/guides/create-task.html
task("accounts", "Prints the list of accounts", async (args, hre) => {
  const accounts = await hre.ethers.getSigners();

  for (const account of accounts) {
    console.log(await account.getAddress());
  }
});

// task('compile', 'Compiles the entire project, building all artifacts', async (_, { config }, runSuper) => {
//   await runSuper();
//   // Copy Poseidon artifacts
//   const poseidons = ['PoseidonT3', 'PoseidonT6']
//   for (const contractName of poseidons) {
//     const artifact = JSON.parse(fs.readFileSync(`precompiled/${contractName}.json`).toString())
//     fs.writeFileSync(
//       path.join(config.paths.artifacts, `${contractName}.json`),
//       JSON.stringify({ ...artifact, linkReferences: {} }),
//     )
//   }
// });
export default config;
