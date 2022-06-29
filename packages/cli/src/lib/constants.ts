import figlet from "figlet"
import { G1Point, G2Point } from "qaci-crypto"
import { VerifyingKey } from "qaci-domainobjs"
import { Recipient } from "types"

/** dir/file names */
export const outputDirName = `output`
export const mnemonicDirName = `mnemonic`
export const generatedKeysGlobalDirName = `keys`
export const ethBaseDirName = `eth`
export const maciBaseDirName = `maci`
export const baseSkFileName = `sk`
export const basePkFileName = `pk`
export const baseAddressFileName = `address`
export const baseMnemonicFileName = `mnemonic`
export const baseTxtDirName = `txt`
export const baseQrPngDirName = `qr_png`
export const baseQrSvgDirName = `qr_svg`
export const basePkDirName = `public_keys`
export const baseSkDirName = `secret_keys`
export const baseAddressDirName = `addresses`
export const baseMnemonicDirName = `mnemonics`
export const ethMnemonicsCsvFileName = `mnemonics`
export const maciPrivateKeysCsvFileName = `secretKeys`
export const deployedContractsFileName = `deployedContracts`
export const csvUserSignupFileName = `userSignup`
export const deployedContractsFileExt = `.json`
export const csvUserSignupFileExt = `.csv`
export const usersStateIndexesFileName = `signedUsersStateIndexes`
export const hacksFileName = `hacks`
export const mnemonicFileName = `mnemonic`
export const mnemonicFileExt = `.txt`

/** dir/file paths */
export const outputDirPath = `./${outputDirName}`
export const generatedKeysGlobalDirPath = `${outputDirPath}/${generatedKeysGlobalDirName}`
export const ethBaseDirPath = `${outputDirPath}/${generatedKeysGlobalDirName}/${ethBaseDirName}`
export const maciBaseDirPath = `${outputDirPath}/${generatedKeysGlobalDirName}/${maciBaseDirName}`

export const ethBasePkDirPath = `${ethBaseDirPath}/${basePkDirName}`
export const ethBaseSkDirPath = `${ethBaseDirPath}/${baseSkDirName}`
export const ethBaseAddressDirPath = `${ethBaseDirPath}/${baseAddressDirName}`
export const ethBaseMnemonicDirPath = `${ethBaseDirPath}/${baseMnemonicDirName}`
export const maciBasePkDirPath = `${maciBaseDirPath}/${basePkDirName}`
export const maciBaseSkDirPath = `${maciBaseDirPath}/${baseSkDirName}`

export const ethBasePkTxtDirPath = `${ethBasePkDirPath}/${baseTxtDirName}`
export const ethBaseSkTxtDirPath = `${ethBaseSkDirPath}/${baseTxtDirName}`
export const ethBaseAddressTxtDirPath = `${ethBaseAddressDirPath}/${baseTxtDirName}`
export const ethBaseMnemonicTxtDirPath = `${ethBaseMnemonicDirPath}/${baseTxtDirName}`
export const ethBasePkQrPngDirPath = `${ethBasePkDirPath}/${baseQrPngDirName}`
export const ethBaseSkQrPngDirPath = `${ethBaseSkDirPath}/${baseQrPngDirName}`
export const ethBaseAddressQrPngDirPath = `${ethBaseAddressDirPath}/${baseQrPngDirName}`
export const ethBaseMnemonicQrPngDirPath = `${ethBaseMnemonicDirPath}/${baseQrPngDirName}`
export const ethBasePkQrSvgDirPath = `${ethBasePkDirPath}/${baseQrSvgDirName}`
export const ethBaseSkQrSvgDirPath = `${ethBaseSkDirPath}/${baseQrSvgDirName}`
export const ethBaseAddressQrSvgDirPath = `${ethBaseAddressDirPath}/${baseQrSvgDirName}`
export const ethBaseMnemonicQrSvgDirPath = `${ethBaseMnemonicDirPath}/${baseQrSvgDirName}`

export const maciBasePkTxtDirPath = `${maciBasePkDirPath}/${baseTxtDirName}`
export const maciBaseSkTxtDirPath = `${maciBaseSkDirPath}/${baseTxtDirName}`
export const maciBasePkQrPngDirPath = `${maciBasePkDirPath}/${baseQrPngDirName}`
export const maciBaseSkQrPngDirPath = `${maciBaseSkDirPath}/${baseQrPngDirName}`
export const maciBasePkQrSvgDirPath = `${maciBasePkDirPath}/${baseQrSvgDirName}`
export const maciBaseSkQrSvgDirPath = `${maciBaseSkDirPath}/${baseQrSvgDirName}`

export const ethBasePkFilePath = `${ethBasePkDirPath}/${basePkFileName}`
export const ethBaseSkFilePath = `${ethBaseSkDirPath}/${baseSkFileName}`
export const ethBaseAddressFilePath = `${ethBaseAddressDirPath}/${baseAddressFileName}`
export const ethBaseMnemonicFilePath = `${ethBaseMnemonicDirPath}/${baseMnemonicFileName}`
export const maciBasePkFilePath = `${maciBasePkDirPath}/${basePkFileName}`
export const maciBaseSkFilePath = `${maciBaseSkDirPath}/${baseSkFileName}`

export const ethBaseCsvFilePath = `${ethBaseMnemonicDirPath}/${ethMnemonicsCsvFileName}`
export const maciBaseCsvFilePath = `${maciBaseSkDirPath}/${maciPrivateKeysCsvFileName}`
export const csvUserSignupBaseDirPath = `${outputDirPath}/${csvUserSignupFileName}`
export const deployedContractsBaseDirPath = `${outputDirPath}/${deployedContractsFileName}`
export const usersStateIndexesBaseDirPath = `${outputDirPath}/${usersStateIndexesFileName}`
export const mnemonicBaseDirPath = `${outputDirPath}/${mnemonicFileName}`
export const deployedContractsFilePath = `${deployedContractsBaseDirPath}/${deployedContractsFileName}${deployedContractsFileExt}`

export const csvUserSignupFilePath = `${csvUserSignupBaseDirPath}/${csvUserSignupFileName}${csvUserSignupFileExt}`
export const usersStateIndexesFilePath = `${usersStateIndexesBaseDirPath}/${usersStateIndexesFileName}`
export const hacksFilePath = `${usersStateIndexesBaseDirPath}/${hacksFileName}`
export const mnemonicFilePath = `${mnemonicBaseDirPath}/${mnemonicFileName}${mnemonicFileExt}`

/** Header */
export const header = figlet.textSync("ETH Barcelona CLI", {
  font: "ANSI Regular",
  horizontalLayout: "full",
  verticalLayout: "default",
  whitespaceBreak: false
})

/** Networks */
export const networks = {
  localhost: {
    name: "localhost",
    rpcUrl: "http://localhost:8545", // Hardhat
    chainId: 1337,
    explorer: "http://localhost:8545/"
  },
  arbitrumRinkeby: {
    name: "arbitrum-rinkeby",
    rpcUrl: "https://rinkeby.arbitrum.io/rpc",
    chainId: 421611,
    explorer: "https://testnet.arbiscan.io/"
  },
  xdai: {
    name: "xdai",
    rpcUrl: "https://rpc.xdaichain.com/",
    chainId: 100,
    explorer: "https://blockscout.com/xdai/mainnet/"
  },
  kovan: {
    name: "kovan",
    rpcUrl: "https://kovan.poa.network",
    chainId: 42,
    explorer: "https://kovan.etherscan.io/"
  },
  polygon: {
    name: "Polygon",
    rpcUrl: "https://rpc-mainnet.maticvigil.com",
    chainId: 137,
    explorer: "https://polygonscan.com/"
  }
}

/** Parameters */
export const initialVoiceCreditBalance = 99
export const baseERC20TokenInitialSupply = "100000000000000000000000"
export const numberOfMaxRecipients = 25

export const jsonRecipientsRecords: Recipient[] = [
  {
    projectName: "Example Project",
    tagline: "",
    description:
      "We are trying to create an event that can be wholly owned by the community, and focus entirely on building a sustainable future with the help of blockchains.",
    thumbnailImageLink: "https://res.cloudinary.com/pse-qf-maci/image/upload/v1654624120/ethpraguedva_qqgxoj.png",
    ethereumAddress: "0x46022C178984bDc20658aBd1435ce6deFF87DA74",
    website: "https://ethprague.com/",
    logoCdnUrl: "https://res.cloudinary.com/pse-qf-maci/image/upload/v1654624120/ethpraguedva_qqgxoj.png",
    bannerImageLink: "https://res.cloudinary.com/pse-qf-maci/image/upload/v1654624120/ethpraguedva_qqgxoj.png"
  },
]

export const deployedContracts = {
  PoseidonT3: "0x5C4B6354130bDa43d7C2985a44b3f4cF0a6Ea980",
  PoseidonT4: "0x2255fFD6Ab1A67826871D3DB471Df82156D94B3A",
  PoseidonT5: "0x39023561823F4A9615ea8f1965b054F0D496FC09",
  PoseidonT6: "0x7e94Ee7246E0cc1aa01ED12aa08CD2b7d7530290",
  GrantRoundFactory: "0x659137fb2Ff8F39D28480DE1227DF3465B328c7F",
  PollFactory: "0xe8f707f984253cc40C869165304B21e0F0377296",
  MessageAqFactory: "0x9a89E2EcF9527Ba35ccdc902CddC72745b006e23",
  MessageAqFactoryGrants: "0x44e03A62a705d9a10DC12FC22b6eFd99aa45C099",
  SimpleHackathon: "0x649aB2a938CB5490f3bc55fE1B9443FdA60a74E1",
  VKRegistry: "0x66911F6eB43731859d249B364566BDC1cC3a1e4F",
  BaseERC20Token: "0xf25fe8fe72aEC927042B2f32B79Be134C8471f78",
  MockVerifier: "0x872B22a7ADEE42164948D609063fabD0c124EB31",
  PollProcessorAndTallier: "0x02d3b2Ce14D5B09E871091c80D08ED05f22bEC05",
  QFI: "0x7718F3716e45C1bcCd538fF756f244978747ef4d"
}
export const coordinatorPubkey = "macipk.ec4173e95d2bf03100f4c694d5c26ba6ab9817c0a5a0df593536a8ee2ec7af04"
export const userWallets = [
  "0x8fC402C39AA931f5f4FFd804CE85D4CC59899D64",
]
export const ProcessVk = new VerifyingKey(
  new G1Point(BigInt(0), BigInt(1)),
  new G2Point([BigInt(2), BigInt(3)], [BigInt(4), BigInt(5)]),
  new G2Point([BigInt(6), BigInt(7)], [BigInt(8), BigInt(9)]),
  new G2Point([BigInt(10), BigInt(11)], [BigInt(12), BigInt(13)]),
  [new G1Point(BigInt(14), BigInt(15)), new G1Point(BigInt(16), BigInt(17))]
)

export const TallyVk = new VerifyingKey(
  new G1Point(BigInt(0), BigInt(1)),
  new G2Point([BigInt(2), BigInt(3)], [BigInt(4), BigInt(5)]),
  new G2Point([BigInt(6), BigInt(7)], [BigInt(8), BigInt(9)]),
  new G2Point([BigInt(10), BigInt(11)], [BigInt(12), BigInt(13)]),
  [new G1Point(BigInt(14), BigInt(15)), new G1Point(BigInt(16), BigInt(17))]
)

export const STATE_TREE_DEPTH = 10
export const STATE_TREE_ARITY = 5
export const MESSAGE_TREE_ARITY = 5

export const treeDepths = {
  intStateTreeDepth: 3, //NOTE: actualy use tally batch size of 25
  messageTreeDepth: 9,
  messageTreeSubDepth: 2,
  voteOptionTreeDepth: 2
}

export const messageBatchSize = MESSAGE_TREE_ARITY ** treeDepths.messageTreeSubDepth
export const tallyBatchSize = STATE_TREE_ARITY ** treeDepths.intStateTreeDepth

export const maxValues = {
  maxUsers: STATE_TREE_ARITY ** STATE_TREE_DEPTH,
  maxMessages: MESSAGE_TREE_ARITY ** treeDepths.messageTreeDepth,
  maxVoteOptions: MESSAGE_TREE_ARITY ** treeDepths.voteOptionTreeDepth
}
export const userSignUps = [
  "macipk.0128c3a1b3c61c121dfd9dbebdb7be22a4d6d3b48cf35abac6f3226f5a6c8b2d",
]
