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
export const maciPublicKeysCsvFileName = `publicKeys`
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

export const maciPkBaseCsvFilePath = `${maciBasePkDirPath}/${maciPublicKeysCsvFileName}`
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
export const header = figlet.textSync("ETH Taiwan CLI", {
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
    rpcUrl: "https://rpc.gnosischain.com/",
    chainId: 100,
    explorer: "https://blockscout.com/xdai/mainnet/"
  },
  kovan: {
    name: "kovan",
    rpcUrl: "https://kovan.poa.network",
    chainId: 42,
    explorer: "https://kovan.etherscan.io/"
  },
  matic: {
    name: "matic",
    rpcUrl: "https://polygon-mainnet.g.alchemy.com/v2/7afvptVsZxjFBz8Mcdm4dpu84IekOGds",
    chainId: 137,
    explorer: "https://polygonscan.com/"
  },
  goerli: {
    name: "goerli",
    rpcUrl: "https://eth-goerli.g.alchemy.com/v2/Yj6TVGlMl_otB1yDvpMTsb8vLFm1oGqg",
    chainId: 5,
    explorer: "https://goerli.etherscan.io/"
  }
}

/** Parameters */
export const initialVoiceCreditBalance = 99
export const baseERC20TokenInitialSupply = "100000000000000000000000"
export const numberOfMaxRecipients = 125

export const jsonRecipientsRecords: Recipient[] = [
  {
    projectName: "Zero-knowledge order book system (ZK-OBS)",
    tagline:
      "使用零知識證明技術解決以太坊上擴容問題，建立 zk 鏈下訂單簿交易系統，讓使用者能夠在 DeFi 中享受無 gas fee 且最高效率的交易",
    description:
      "目前在以太坊上主流的金融系統都是以流動池形式為主，像是 Uniswap, Aave, Curve 等等。但不可否認的是訂單簿系統才是更為有效率的，像是中心化交易所 Binance, FTX, Coinbase 等等交易量都是 DEX 的 10-100 倍，原因在於訂單簿系統對用戶而言有著更好的體驗（無滑點、深度夠等等），相較之下在原生以太坊上高昂的 gas fee 很難使用訂單簿及造市功能達到此優點。上述主流的 DeFi 幾乎都發跡於 2017-2018 年，但隨著時間及技術的進步，透過 ZK 的擴容特性可以將訂單簿系統移至鏈下進行，讓使用者不必每次下單、改單都支付 gas fee，大幅提升了交易的效率，最後再使用 roll-up 一次更新大量數據回到鏈上，完美解決了以上問題，同時又能保障去中心化的特性。高效率的 zk 鏈下訂單簿系統將會是 DeFi 前進的一大步，解決了目前大多數項目都無法克服的問題，使 DeFi 更加蓬勃發展！",
    ethereumAddress: "0x4B933cD816C86783B116D070818C6FCDf5bfF17a",
    website: "https://www.youtube.com/watch?v=lftWYbVEbq8&list=PLf_RyQYF8N3w2XWq5rroPcF8b1yVQd212&index=11",
    thumbnailImageLink:
      "https://dl.airtable.com/.attachments/cab26f2c556011ad7f7f49f5ae12acdf/569235a0/zk-manic-icon.png",
    logoCdnUrl: "https://dl.airtable.com/.attachments/cab26f2c556011ad7f7f49f5ae12acdf/569235a0/zk-manic-icon.png",
    bannerImageLink:
      "https://dl.airtable.com/.attachments/10b82eec776c863b53b961de06af10d8/537f0325/zk-manic-banner.png"
  },
  {
    projectName: "Property Proof ",
    tagline: "如何在不洩漏錢包更多資訊(包含錢包地址，所持有的所有NFT，以及該系列NFT持有的細節)，去證明你擁有該NFT",
    description:
      "現今 NFT 的應用廣泛，不論是身分證明或是資產證明都是其中一環，在許多應用的場合下，或許不需要透露太多資訊，而只是需要證明你持有該NFT。例如 在Gamefi的NFT販售場景下， 賣方不想透露過多的資訊給買方，例如持有該系列NFT的數量等等，又或者在身份認證類的 NFT 項目，持有者並不想透露身份資訊，但又必須證明是屬於此身份證明的其中一員。",
    ethereumAddress: "0xDa8100177A09FC3CE3655B98bc1434a046AD5B0C",
    website: "https://www.youtube.com/watch?v=yX9eMvWf7Mc&list=PLf_RyQYF8N3w2XWq5rroPcF8b1yVQd212&index=9",
    thumbnailImageLink:
      "https://dl.airtable.com/.attachments/4ad8dfdd5f53812f7faa53d3d8660235/de04430f/NewProject1.jpg",
    logoCdnUrl: "https://dl.airtable.com/.attachments/4ad8dfdd5f53812f7faa53d3d8660235/de04430f/NewProject1.jpg",
    bannerImageLink: "https://dl.airtable.com/.attachments/d84e7334dfa004df2b82c3c67514f251/04495e75/NewProject.jpg"
  },
  {
    projectName: "Private Ownership of SBT",
    tagline: "具 “持有隱私性” 的SBT方案",
    description:
      "Soul Bounded Token (SBT) 是 Vitalik 在 Decentralized Society: Finding Web3's Soul 中提到的一個概念，簡言之就是類似一個 ERC721 代幣，但它無法交易（交易後會被燒毀），可以應用在教育、金融、驗證系統中。以教育為例，未來修課後可用 SBT 作為證明，在未來可以利用這個 SBT 來向其他機構驗證。但是 SBT 的其中一個問題是隱私性太低，很容易就洩漏 SBT 與 Address 間的關係，所以我們想利用 ZKP 解決此問題。",
    ethereumAddress: "0x5C61CB743bfDcA46E829e3e6f1D3B56Efbb56E20",
    website: "https://www.youtube.com/watch?v=CZMWb-3WlTA&list=PLf_RyQYF8N3w2XWq5rroPcF8b1yVQd212&index=4",
    thumbnailImageLink:
      "https://dl.airtable.com/.attachments/2791b408027438f501c83ef9fdda50c7/7b39e579/925A6BAD-F630-4056-B96A-AB8548FFD9F1.png",
    logoCdnUrl:
      "https://dl.airtable.com/.attachments/2791b408027438f501c83ef9fdda50c7/7b39e579/925A6BAD-F630-4056-B96A-AB8548FFD9F1.png",
    bannerImageLink:
      "https://dl.airtable.com/.attachments/f3fcb42ededcb6be4de279284609e95a/66bee568/stsci-01gcvndsa55pfhd0jp3jsekaz1.png"
  },
  {
    projectName: "ZK-KYC",
    tagline: "通過zk-SNARK實現KYC平台",
    description:
      "建立一個最大的KYC平台，讓合作夥伴(如CEX、dApp)通過我們平台加速KYC流程，提升使用者體驗。使用者只要在我們平台進行完KYC，日後要使用我們合作夥伴平台上的服務時，合作夥伴通過我們平台提供的zk-SNARKs驗證該使用者KYC Level後給予使用者對應的身份，不僅可以縮短合作夥伴驗證KYC的時程，也可以讓使用者能夠更快地體驗合作夥伴所提供的服務。",
    ethereumAddress: "0x8569aa5D9632813efd5f5e32c5dd6083F2ecbEB3",
    website: "https://www.youtube.com/watch?v=x5e6278rKpI&list=PLf_RyQYF8N3w2XWq5rroPcF8b1yVQd212&index=1",
    thumbnailImageLink: "https://dl.airtable.com/.attachments/5f495238857729833d8cdb7525bf0664/8b72b9be/ZK-KYC.png",
    logoCdnUrl: "https://dl.airtable.com/.attachments/5f495238857729833d8cdb7525bf0664/8b72b9be/ZK-KYC.png",
    bannerImageLink: "https://dl.airtable.com/.attachments/3f242c8e704bc9fc544be44441bc7c06/76521c13.png"
  },
  {
    projectName: "ZK-Ownable",
    tagline: "不公開地址也能證明自己是某個合約的擁有者，只要有 Proof 便能進行 onlyOwner 的操作。",
    description:
      "目前鏈上常用來做 admin 的合約有兩種，Ownable 或是 AccessControl，兩者因為都會直接曝露 address 而喪失 owner 的隱私。我們希望透過 ZKP 來取代 Ownable 的功能，並結合 Relayer 或是 PaymentMaster 來保護隱私。",
    ethereumAddress: "0xD2B567D47f4F997815E6CF33D8cF4344F968b830",
    website: "https://www.youtube.com/watch?v=HnXbAFqfNQg&list=PLf_RyQYF8N3w2XWq5rroPcF8b1yVQd212&index=3",
    thumbnailImageLink: "https://dl.airtable.com/.attachments/44e482ce082fa689aa2be16c82a18164/53079fd8/p9IU4k5.jpg",
    logoCdnUrl: "https://dl.airtable.com/.attachments/44e482ce082fa689aa2be16c82a18164/53079fd8/p9IU4k5.jpg",
    bannerImageLink: "https://dl.airtable.com/.attachments/1b76e08e73cb81324a623ea4ad4b1a8b/be41f002/HGdB3h7.png"
  },
  {
    projectName: "ZK Conditioner",
    tagline: "用 ZKP 做匿名且即時的鏈上治理",
    description:
      "區塊鏈上的合約可以經由代幣質押或註冊後進入會員系統（一個神秘的 merkle tree），並每隔一段時間放出一個訊號去控制/修正治理參數。就像一支冷氣遙控器，房間裡的人都可以按升溫或降溫，如果每個人操作的頻率有限制（比方說十分鐘一次）的話，那麼可以說房間的溫度是眾人的共識（吧？) 舉例：穩定幣專案 MakerDAO 需要靠鏈上投票決定借款利率，治理代幣持有者可以存入 100 MKR 來得到一席資格，每一席一天可以投一次票來讓利息增加或減少 1bp，投票會即時生效，沒有人知道哪些人有投票，投了什麼。",
    ethereumAddress: "0xc1F9BB72216E5ecDc97e248F65E14df1fE46600a",
    website: "https://www.youtube.com/watch?v=oWryi7fj4m0&list=PLf_RyQYF8N3w2XWq5rroPcF8b1yVQd212&index=2",
    thumbnailImageLink: "https://dl.airtable.com/.attachments/50597e6d9f04f05ce963b5912369933d/a512c939/Logo.png",
    logoCdnUrl: "https://dl.airtable.com/.attachments/50597e6d9f04f05ce963b5912369933d/a512c939/Logo.png",
    bannerImageLink: "https://dl.airtable.com/.attachments/f8475c00d69a3e272324318c2e6191c7/56f15dc3/Cover.png"
  },
  {
    projectName: "ZK Ownership",
    tagline: "運用 ZKP 隱藏合約上的使用者地址，並讓使用者可用同一個私鑰和不同服務互動。",
    description:
      "使用者地址常會被設定在各個服務的合約上，像是 NFT owner, smart wallet owner & guardian 或是開發者常用的 contract owner，因為地址是透明地被存放合約上，容易被找出關聯性而成為攻擊的目標。此專案讓使用者在鏈下用私鑰計算出 ZKP，再帶入驗證合約後與上述服務互動，從而讓地址不會被明記在合約中，並且看不出各個服務是由同一把私鑰控制。",
    ethereumAddress: "0x200153f4D183A95D3fC88e772234a0e7031d9487",
    website: "https://www.youtube.com/watch?v=3yuSidzrlf0&list=PLf_RyQYF8N3w2XWq5rroPcF8b1yVQd212&index=10",
    thumbnailImageLink: "https://dl.airtable.com/.attachments/bf74c2b7cad2c05d6ea009ad48d68437/0941e32f/Logo.png",
    logoCdnUrl: "https://dl.airtable.com/.attachments/bf74c2b7cad2c05d6ea009ad48d68437/0941e32f/Logo.png",
    bannerImageLink: "https://dl.airtable.com/.attachments/e9c53c0bba5874181869e315a0bcfb68/1f949074/Banner.png"
  },

  {
    projectName: "Anonymous Stand-In",
    tagline: "透過建立匿名替身 (Anonymous Stand-In) 來進行如投票等操作.",
    description:
      "藉由登記替身需要押金, 以及讓 qualified user 提出恰一個登記替身的  zero-knowledge proof , 我們可以建立 qualified user 的一對一匿名替身. 之後用這組匿名替身操作就如同一般的 account, 不再需要 ZKP.",
    ethereumAddress: "0x6663bFba582b8A6228c33D4b732502Ce08f6b38C",
    website: "https://www.youtube.com/watch?v=-S6gNtPGP6c&list=PLf_RyQYF8N3w2XWq5rroPcF8b1yVQd212&index=8",
    thumbnailImageLink:
      "https://dl.airtable.com/.attachments/e7c80c0bc05992097f5c5a617e8d88bf/683b9870/AnonymousStandInLogo.png",
    logoCdnUrl:
      "https://dl.airtable.com/.attachments/e7c80c0bc05992097f5c5a617e8d88bf/683b9870/AnonymousStandInLogo.png",
    bannerImageLink:
      "https://dl.airtable.com/.attachments/974b03d7a3d8d355ccc997b73c6234f6/2b5dd1e1/AnonymousStandInBanner.png"
  },
  {
    projectName: "zk-AWOS",
    tagline:
      "一套自動化的零知識經費核銷系統，廠商不需提交完整的經費核銷證明(營業秘密)資料的同時，能達到自動審查核銷的系統。",
    description:
      "利用零知識證明技術，並將以往廠商提供的請款資料進行公開與私有的分類，透過政府或投資機構的專案補助計畫合約紙本，列出經費補助條件與限制，利用零知識工具與web3 library，透過鏈上的智能合約進行自動驗證，取得驗證結果，根據驗證結果決定是否該請款單予以核銷放款。",
    ethereumAddress: "0x2cbc643ba2263fc2b3ba17eab7cfb93e2f5d9489",
    website: "https://www.youtube.com/watch?v=4h0rKBf-lyg&list=PLf_RyQYF8N3w2XWq5rroPcF8b1yVQd212&index=12",
    thumbnailImageLink:
      "https://dl.airtable.com/.attachments/431a95b97f2edd28502925de41c83f99/e1e15f9f/III_zk-AWOS_icon.png",
    logoCdnUrl: "https://dl.airtable.com/.attachments/431a95b97f2edd28502925de41c83f99/e1e15f9f/III_zk-AWOS_icon.png",
    bannerImageLink:
      "https://dl.airtable.com/.attachments/637437b6a83ff500a2e432db10c08361/75e50bc4/III_zk-AWOS_banner.png"
  },
  {
    projectName: "ZK Charity Token",
    tagline: "Token makes donation easier and with more privacy",
    description:
      "ZK Charity Token 是一個用於慈善捐款且兼具隱私的token. 用戶購買內含一筆慈善基金的token, 並會在設定條件內定期定額捐款給慈善機構. 用戶在購買token後, 能夠在social media 上顯示出捐款證明. 用戶能夠保留實際捐款金額, 基金總額等資訊的隱私. 只提供用戶希望透露資訊的證明",
    ethereumAddress: "0xe79c90cE8c5152338348f50B5873fAf2d0EC88cD",
    website: "https://www.youtube.com/watch?v=-CHZW9RBybo&list=PLf_RyQYF8N3w2XWq5rroPcF8b1yVQd212&index=5",
    thumbnailImageLink:
      "https://dl.airtable.com/.attachments/130229f3a03ab44a07763322932ef2b6/1cd1b978/zkcharitytoken.png",
    logoCdnUrl: "https://dl.airtable.com/.attachments/130229f3a03ab44a07763322932ef2b6/1cd1b978/zkcharitytoken.png",
    bannerImageLink:
      "https://dl.airtable.com/.attachments/7bfa6f3151cbd1c0f99e1bcbcdcaad0b/7ecf8619/zkcharitytokenbanner.png"
  },
  {
    projectName: "ZKANON (TBD)",
    tagline: "Privacy Layer of DAO tools for NFT gated community.",
    description:
      "Since the rise of PFP projects, many communities have adopted NFT as their membership pass.Existing tools, like snapshot, do not provide privacy respected options for these token-gated communities. This project aims to provide a layer that bridges the NFT communities with the Semaphore protocol and provide privacy-respected DAO tools.Since verifying the ZK proof on the ethereum mainnet could be prohibitively expensive for many users and applications, we plan to separate the contracts on ethereum mainnet and roll up chains.An L1 contract will be deployed to verify the ownership of the NFTs as most of the prominent NFT projects are built on the ethereum mainnet. The L1 contract will also signal the L2 contracts to register and update the Semaphore group.The use of Semaphore protocol instead of building a ZK circuit from scratch will allow the users to access and better integrate or leverage the projects/tools also built on top of the Semaphore protocol.",
    ethereumAddress: "0xCacCa9E4A93dfECC4EB172634cB73DA9e0EcEAd7",
    website: "https://www.youtube.com/watch?v=4h0rKBf-lyg&list=PLf_RyQYF8N3w2XWq5rroPcF8b1yVQd212&index=13",
    thumbnailImageLink: "https://dl.airtable.com/.attachments/7f3a3bb3aaca2dc86ba1a8713b00e99d/c3b1bd75/logozk.png",
    logoCdnUrl: "https://dl.airtable.com/.attachments/7f3a3bb3aaca2dc86ba1a8713b00e99d/c3b1bd75/logozk.png",
    bannerImageLink: "https://dl.airtable.com/.attachments/32aa0a52453dab3648a6821f4904fe31/516466e1/banner.png"
  },
  {
    projectName: "BillioMaZK",
    tagline:
      "建立一個去中心化的資產額證明DID，在不透露自身address與資產分佈的情況下，盤點多個address的資產並提供一個資產總額的證明以供其他服務使用。",
    description:
      "富比世排行榜會顯示富豪的資產金額與排名，但不會透露他的財務分佈，像是多少存款在什麼銀行、近期投資了什麼等。而我們打算建立一個去中心化的資產額證明DID，User註冊輸入名稱後，提供MetaMask 綁定的 address，會去計算User的資產總額，並以User所填寫的名稱顯示在前端排行榜裡面，此排行榜可以證明此User的財富狀況，並定期做更新。我們也讓User可以生成id commitment來與第三方的服務做驗證來確定User的資產總額。",
    ethereumAddress: "0xEbf29A4dc710040B12E68465331F70e42f053d7b",
    website: "https://www.youtube.com/watch?v=iiKHAhX_4bg&list=PLf_RyQYF8N3w2XWq5rroPcF8b1yVQd212&index=7",
    thumbnailImageLink:
      "https://dl.airtable.com/.attachments/a0d5862e620bc55424a93518d330c931/33b4b16b/BillioMaZK_icon.png",
    logoCdnUrl: "https://dl.airtable.com/.attachments/a0d5862e620bc55424a93518d330c931/33b4b16b/BillioMaZK_icon.png",
    bannerImageLink:
      "https://dl.airtable.com/.attachments/2da713079d872ecd716fdb2e16a4c6bd/6d6d60eb/BillioMaZK_project_Banner.png"
  },
  {
    projectName: "zKarma",
    tagline: "吹哨者的安全出口，讓吹哨者可以安全發言的鏈上平台。",
    description:
      "在 Zkarma 裡面有兩種身份：吹哨者和一般使用者。我們會確保吹哨者的匿名性，讓他可以安心的暢所欲言，同時為了防止大量假帳號的入侵，我們也會要求想要評論文章的一般使用者使用 Interep 或是 BrightID 進行真實身份的驗證。為了避免有心人利用追哨者的身份，在平台上也會根據文章的評論數和按讚數來進行排序。",
    ethereumAddress: "0x8865d9736Ad52c6cdBbEA9bCd376108284CFd0e4",
    website: "https://www.youtube.com/watch?v=_z1TSCVX6iM&list=PLf_RyQYF8N3w2XWq5rroPcF8b1yVQd212&index=6",
    thumbnailImageLink:
      "https://dl.airtable.com/.attachments/847517bc0c5b9c1c538c4048f0b56cd7/daab0684/70e538dcde1e4c2c843d318eec8c19c4-08.png",
    logoCdnUrl:
      "https://dl.airtable.com/.attachments/847517bc0c5b9c1c538c4048f0b56cd7/daab0684/70e538dcde1e4c2c843d318eec8c19c4-08.png",
    bannerImageLink:
      "https://dl.airtable.com/.attachments/54b1a73d8433ce1fdaf60635025dbba4/7ed0d95f/70e538dcde1e4c2c843d318eec8c19c4-07.png"
  }
]

export const deployedContracts = {
  PoseidonT3: "0x2BE63c9Fa837D1E2f31f5878596E1258c683FF05",
  PoseidonT4: "0xe392e6C401646746Ac6E676088F1498c0E1cd5b7",
  PoseidonT5: "0x5C3EbDf02D7aB7B5aB6AdD2f3E0c4dcd4F39152d",
  PoseidonT6: "0x827bfd6bfd690E0Ac2fDaFBDD000302489C8E176",
  GrantRoundFactory: "0xb2491007E6Ca5Ca03ed1dc99dF22A459A2Fb133F",
  PollFactory: "0x98550A670A5b2b538849548453AC204aB2Ef1305",
  MessageAqFactory: "0x98fBbD71dA3ace0Aa67731E58103d112006E8c78",
  MessageAqFactoryGrants: "0xb01966f1FE51d3E1740d8c1475A0D0156d74068C",
  SimpleHackathon: "0x9800429Ecc5798FF7D8557d42b9d71cc34Ce4680",
  VKRegistry: "0x4bB2fa1bF454E9706316d8865401452EdD2066d2",
  BaseERC20Token: "0xEac99f7a55bAEF2FF12BC16b9b1AB94F0478F033",
  MockVerifier: "0x6a5F5107EbF4C058138D3688630d1A406dC42e04",
  PollProcessorAndTallier: "0x2a67B257757Ea4f5658FCE5d8D981639e5C714Df",
  QFI: "0x9F4696A093a3850d52c7F1560B9091cB1fD1Be91"
}

export const coordinatorPubkey = "macipk.ec4173e95d2bf03100f4c694d5c26ba6ab9817c0a5a0df593536a8ee2ec7af04"
export const userWallets = ["0x8fC402C39AA931f5f4FFd804CE85D4CC59899D64"]
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
  intStateTreeDepth: 3,
  messageTreeDepth: 9,
  messageTreeSubDepth: 2,
  voteOptionTreeDepth: 3
}

export const messageBatchSize = MESSAGE_TREE_ARITY ** treeDepths.messageTreeSubDepth
export const tallyBatchSize = STATE_TREE_ARITY ** treeDepths.intStateTreeDepth

export const maxValues = {
  maxUsers: STATE_TREE_ARITY ** STATE_TREE_DEPTH,
  maxMessages: MESSAGE_TREE_ARITY ** treeDepths.messageTreeDepth,
  maxVoteOptions: MESSAGE_TREE_ARITY ** treeDepths.voteOptionTreeDepth
}
export const userSignUps = [
  "macipk.7acf52461a12be91c4c7b91b3360b1bf20afd6c174b8c0dba1da0a8f9f68ec2c",
  "macipk.e36e2fcbbbc74a6135f33a78a79846ad168839c6c979304ffd8c84fd093a540d",
  "macipk.a07761a461759de5c775e522c8922f5ebd536db5a226eb37adbe505576f8a72c",
  "macipk.dc8129b005bca2bbffb072c5922388fdac5e56c86865b51410a218e9485b9101",
  "macipk.b61e233aa83fbe59e0ee4a3c3ab6e09023bdc8d09f12de01e3f170ac251a1e9e",
  "macipk.758df40f69743896c9ae0faaeaabcd695c479598cbd9a6908010e05ccb42e595",
  "macipk.82043866260a20de001bdd0d81af1fea7bff3556fee21c61bbf0280747b0dd95",
  "macipk.53348b2e8175cbb4e07002fec9bb9133016a4afcbae2bc8026d7f28b9c1d1d15",
  "macipk.01b22b51c8c992ca39208bbd93de0278c7e218eea655c370c004fa39f52a479b",
  "macipk.e3bdb347f8409cb7f488c193f15464f84f8e37a968b5bc4643df07f17e14f381",
  "macipk.dc795fa0d4803cf67acb0c23d4b0e7618307fe682685afcf48735f51c12d93ae",
  "macipk.67fd38c9a38c26fa3abc5d0d0cdd8bb7de66369b59501c443b42fd6ff46e6592",
  "macipk.fca12aaa0160ca3f643e24bcd18e4045a5821a1d8590a0fb0ab9639dbbda9e03",
  "macipk.42aaec7124eb41e18aacc1ad2797bfa683317ea963fd4d44d0116e2811b14316",
  "macipk.617f333945f5e101f01d1bad13831493da31b658886be2bc1a9b3dc13c733a21",
  "macipk.6e3400cf9c7be9b1020954139e0fe6fbc6f6074c464b8a6d3d5d12025cdfb39a",
  "macipk.75f4b6afaff2ba5307c90c1cf5663e642724063a5f7965ae79622acbbe340010",
  "macipk.db66a214b936b2fda722b83cba519d2f42dc16bbca759e9cc5a9dcafc6d0f081",
  "macipk.cb45e2818af75af5745aa975cadfbc5f54507a39d941a230851439bcc737ea00",
  "macipk.71085cef9ab0626004fae20ebbac3453827d9655435c04caf132ceac381f8c0a",
  "macipk.12c44c2f34d9cdb0585240b8d6e578f8ade78f8a5548f80c4b3dee3a88bdaf2b",
  "macipk.6e352a0b7927b5265af7daa060bf24776b79197e6633dfde65eaebc2c69bc680",
  "macipk.81ede7391323bca3a14e1ad283806c5900e2cd9087a35a142faf7da5a8464d0d",
  "macipk.4ba4c3cf3d88040f2efdca0fb0e6c95fcfbd3dc516d8531b98816eaa94cbacaa",
  "macipk.9ce49ee7692f4de7ab0baeeec6f4655abd491fc25a4fc35af3b7a6a41627fa06",
  "macipk.2f0050f87285ebb8e38102a048ef26427f0b2f4a55ef538df73227635c895224",
  "macipk.0f8701db018253fb2efe5052df166f43a329285840e68772b8ca872d55f5a612",
  "macipk.de7b527af39520e5671f75451edd26112b44ce6e9998d86bfc9a3badfe635913",
  "macipk.235774d7642e6b86e74bdbf258c90ffbf00788a68dbddc152956890cc032d620",
  "macipk.33d70896110e9a3653b95be1fe28c70b36cd5f76895035eaad8e0530fd85e32a",
  "macipk.db44e0322c59a259fe2aedf326eda03048ceec64de4862ede6b73f51270bc517",
  "macipk.41113f7412cb3d7c26f8111f7cb2d20e267a5aa5c22b874430df8e446409e0ad",
  "macipk.8c98c8bf5521f385d259c261c41dc7cefc59384b8bcfca7ffd8356e8594c0c1f",
  "macipk.163c8ebed4d124cfb3100016697809261ecb3142c4e23930667aa961dd635cab",
  "macipk.07cce0d773c10a956a93e8687ea6a31530ccc0459f3e623392a3a8481723a49b",
  "macipk.ebcaea3da3125e7031552e443b35a70d85f666b5d4c389edca4071379d884030",
  "macipk.5c08184f9bc083104ae262a40ca92d4300c76ddb76dfceb61a8f14cfad531f1e",
  "macipk.357dc6ad57d2e761a6bd3e4515baeb33e2fb2ac91fa946cd0097f59845d966a7",
  "macipk.0a3a28efa8dbea4090e65f65d185536c633db583cc09e034554c3866db3627a9",
  "macipk.082cf3b264ce41d79ddfdb0a7f478f8bccd3fd4c82afc57b3fdefa464a0b028b",
  "macipk.fa31366dc9971efab18f0dc4467447b4954ed2a23766e17be69ff7a6cef30b95",
  "macipk.57cacd7986497d84ae1e40541ba08a89536d4c95082a9500fdd1cb650369e50d",
  "macipk.b9075c8568b89ba7da62fb4ebb82104116ba95080a989f2f1346170045137d99",
  "macipk.64d364b9ade0161d12fdacb4ca97f58b941c5a85c30156fa7fcb7270ce37f12b",
  "macipk.ddda96351a23048a903eed4948c06daaad48c050307a1f405d928dba89515e91",
  "macipk.da5ac337489b145230b53a0b8f85683dc95d8795e15f72b9dcd8f53c3035a00a",
  "macipk.bf818a92fdb9c2df1d9aa13b18dc1fd8e1785e9c9247b821d43e1fca4535e690",
  "macipk.073e833a49fd16655d1d74361e451054193c1cf8ac48e95a5a99a383f0c3699f",
  "macipk.c0224a4a604ea2af53bfa1390f247997af8ac8bb80cfdeb053aef953d91a3e81",
  "macipk.61afbe134eed69a9d21d7763051ac8a38487501ca370be00af82cff7d76fd588",
  "macipk.3c33d6a79c19aa9c000d20806920d6438111660ab2bf8c318568925f171fa311",
  "macipk.def7a2915e9d00f28b7343e7ae3c815a6c6ab86efb7fd03198c73f66a86a250e",
  "macipk.3a70add1803f41a9dfcdf698dd3d309dbde0796ce9504bf33d25959cd0fe599f",
  "macipk.a503c7ebf6174520934c8895c7880f6e88692c52f36dfb4f763b19d611191029",
  "macipk.2020318bf6f906fab338c448a1cf96e323ec3ed0fe684dc1bfc7c1631ef43a82",
  "macipk.09c708f23c1b43bbf4192ce29fc0bff9ee44f9236811a39dc3a3a1a3c9f82917",
  "macipk.63f6cde677a266f077833f0f9b1fce005ae2fbe702b30c98179610599bd7d71f",
  "macipk.79eb9b92b0db56b686db6abb95b124461d72c47aead590bb5ec3ebcda15c5d06",
  "macipk.8bbeda639fece67c2f1e44e4aa8589082ea69cba662ad2ef6ebe972153825c17",
  "macipk.27089e665ce1dc25307ea1515b0df0e366d242073c01399a5483bb0fd04bc0a4",
  "macipk.1cfc9dbd0bda14e39ae4ec4d73ea0adcdf071c641dfa8d066718714389020c2a",
  "macipk.be9e48ff87ffa77788d8890e6c71253f23b831089a7fc33838d3b6197e0daa2b",
  "macipk.1625c10a58d827793a862ad97091e3bd2adddd2c568af7aba0cb263227b1020a",
  "macipk.54305870061253c927d1bebb625b3c82021a1643868bad9faaaf693fd6a7d003",
  "macipk.425eeea2e6ce0976f337e2dcb33cdba884b2c0476aeae0f8e1d1e88031b5c919",
  "macipk.4393255c972acbd28d447a84456b8cc31472de88363df4d99dfd08d95d0f0523",
  "macipk.c7d6dd2c3d7a376840e2442035868c87d8a1c09cd792ece55bf2470a4a64cb84",
  "macipk.2561f4418077f39856626b1f30da334bf7c73a0df87b82e5e0020624cfa62217",
  "macipk.05e76f189495a63b9fe7392918e7a852852bcd454cc4961eaa3506dbf742c809",
  "macipk.73bbd1aaf69cf19cf25385c9a6abe01442d6e271495ac504062889513b9e9929",
  "macipk.5a36e183de773974a64ed3c935eecc09a863f7fc904b4da85c8b937babfeee14",
  "macipk.2344ccae7465f6d3594a55b20840e0597e0f569f5aa56e4689a4fbc4373585a8",
  "macipk.a7539236ce77313b21131356c0cc9639dd17c98d7955e0593207d3ac1c0ca517",
  "macipk.1bf516c09851ed844986a91a926c39d39d80a483d7d74fb39557e53022252925",
  "macipk.a45e15eb8eab66ead65dd9f5009a6ee33f3aa9da5ca33b919b3d5bd62f542f8c",
  "macipk.0d04f9c5200b1956a5a9e5d75cf0f8f7e66b28b9409bbf92048db5eb17a8b4a3",
  "macipk.ece38d581f326793a7bce2eec54df540d1dc78b424577eabaeeaf19cec1ad22b",
  "macipk.81120757d10da64a21c6ab366fac1aabd4b0a27624f7713f80cf7d0117429685",
  "macipk.fc85009333c675be35c0fb4724f41cf4d0efa5e95ced2f5497de7d617f39b916",
  "macipk.fdd3a330aae8de111b742ab5d2c3b5cd0283162e6ca54f070562dfe9b2fb031e",
  "macipk.23cbc42c1116542f48b6d05656300e6b10bbc691c74c28f6b6a9d2438e407911",
  "macipk.ffd064427367e91e45149428e8b128038966da3f4c065d1dd2f92d73dd796c8d",
  "macipk.9f08b1d6c7a0af1836c880a19e4b68d4cbf00dcdee1e54b94c9d1aa193b5748f",
  "macipk.609e655d312864091fc60aa4b80cd7f58e8700be0088716732c6fc7eaaf7e805",
  "macipk.cdc9ea12b19ae35186b506241490429d2c443b587418bb6a1d350af1ac50d992",
  "macipk.cc2ceefc0d9f92a67b2150868e6ffa9ceb52370acb9083b99b2d517a1b490485",
  "macipk.5b32e9f25ba09a8cddc991bf3eeeb261731052f274d1746e7c660c50331ce2a3",
  "macipk.42859a7f60bd73e3dcac13e441a9062067d540eba6351186fbdb32fd647f4d25",
  "macipk.d4dc8e47d815617cc07d058f8db3d0e75e8c1341124a128385cc2500eb9c0121",
  "macipk.cdde3a220539bf8ba3f96160d81f6376487a9dd2574c3e8bb95732b72d2c2f0b",
  "macipk.25c38c6d092bce46e45e64a50ea4f477fe147078602115b52bf3a00a89f99f8e",
  "macipk.a121e3cc035ab450b5a2a0846b6ed667716f2cd6d95985ecf040fe4d5fb48c81",
  "macipk.e345454a6e56266498278dd82a837410eb3558113be42330954da05105ebab8b",
  "macipk.f57342e466d9677b6a5a1adb7e89025662064076213f6d9d79101b1369726d95",
  "macipk.e1ed56c9f033f5a1490b857456a90f35831f758254ba1abf7438ec8b9252ee04",
  "macipk.e5a35b020de252b2cb2c63135f7072080d0c032c51a6f78a4b63e22a378d1ca8",
  "macipk.cdf8492034f98faa033889e18edfa638c92e273e01645dac25fa8d2e420bbb14",
  "macipk.c5490cd9dc70b3b287d201f5ed306ff69d5983fa03cdb39e3b475718b3c99d2f",
  "macipk.c1e776dcde996a78e25a3870133d912550776dee99243e7dc3dd488b1e4e642c",
  "macipk.f5ee5b2bb0ea9b8559137e2721f2cbf27ab366b9e14615260ce537a56b85e1ac",
  "macipk.b4cce4e36b2b366f88a1e7d79af17c0381f25c79c52dad1d027adf2ae556242c",
  "macipk.84564a0333d28e58805f016d02f031328e6ce543310257e56bc969d0e8f3af22",
  "macipk.2eb3db017928cd54e43c38cc496b3c9906848498abbbfbf6165d38cdef39da14",
  "macipk.14cc13d37d36eb674a9d2f8480fdfe2c7d465f0779003c7f24d7f56535421628",
  "macipk.a20e67817fda802842d2e75647e37f7a11b5cf9611dbe89c20c9ad1f7e455206",
  "macipk.39cfbd36aebdb8de223401f9d6ea2fdd88456c474c0d5e9306ba17b8c98e961a",
  "macipk.de7a2bdfb129716152755b47a66f72a3838e534b3af6cd0bbfc97f6470a89f22",
  "macipk.f3894aaf89d6b5aff7ba91dab6c72793142bf6e1783b3b77b71777461b574b2a",
  "macipk.5a062998af5507154ab387b5e4fdbd1d4dd9f2deb40715799e8a8bcfde63651d",
  "macipk.57584f2b1f6bfb15d9c42a03dc920ef0ea279718ecf6f11d033b88db9d87219d",
  "macipk.6b226bb321a2048e1fb69b400dfc2a9113a56331d3f62153d2077a09c589b28a",
  "macipk.df016e9bdfba9e7951ed3fd75e8a6a2f774fbd24eb4f809778ee11c2e4371930",
  "macipk.5cd9072611ccf6da3f3a244ba84163deeb4917a0cf4d2943a6e1ecf6616edf01",
  "macipk.7563a9fa5b666f502d15ac8327e460169846149e9aac2a3402040e53a51231a8",
  "macipk.d5c575d11288dd7456a54c03574ab1a5c3eececa19734352c6c770e3c6bde896",
  "macipk.3aa7f2f33b2b7cbc25a67418880d6cd4a141ebf7048535f007c490a279e7c02c",
  "macipk.d1a9318aa4a0fa9706399d75d12e3333211020fb0699e70baddcf4870acddd05",
  "macipk.aab411f64714fcaa2b884651f72e417c01424e210c98772d5f6e607b1be33227",
  "macipk.73538ad6ee4cb7121d52e3ce90791fcde82b2eeb6a8abc8388457c351bd48b91",
  "macipk.c3232e0df0dbe7ecb8f4c0e09eb1d9da03f0477f47088d78d7364c57ed6ef20e",
  "macipk.48bb6e76818793ee53e02653fd2a7f75bb131d1104789c433e43c74f28bb36aa",
  "macipk.de657f26b4f03f79c438e8b443f8fa03a3b459904f0e088d5ab998e22eff5f0b",
  "macipk.5b1bbea6bf646051a304cbe2b3ffd4e7d439e53f9f78e07530022681dd62c027",
  "macipk.6e5e272468f8dfb52a02d08ca41d28f7d18975654d7919d310a9d9687b53b9a7",
  "macipk.e1d12535f6eb92c645514d0429090e7558f8cf5a278f025ea28555fa927dcb98",
  "macipk.7fcb89a68909f80ae61d106b36a6f154d09511ff362bdd98f32347a694f8b10e",
  "macipk.0d008871e4df7297890d490c7a1361a4a248458e0855bc65d5590d767b163919",
  "macipk.79d66d1bde82d9a7673c4028119048dd40d9536cba14abd143d93b693e98d304",
  "macipk.4ff547d0d8373d3bbaf4b6eba7c3674d23e86e0b25c39d00bac4d2113f95ce0a",
  "macipk.758a51f56a3637297703643c11c23bede357a8b6adbff8526a94c273060690ac",
  "macipk.c487fee48fa21bb0ccc55ad4d12a69da6e71714a13ac21a9a9c6189829d1fd88",
  "macipk.42f76d145a82e413a5a2022187ea68dee674fe59db8bfe38bc255f9781fd8b22",
  "macipk.ea829ddade2f9f7aff6916f9ce8d5bb5b16a77ecb2a2fc4510105f7408d3e987",
  "macipk.2cf3ffe0f0f5c16fef2d2dec317f7262f97bc989b9352d76122b88bb1bbd2507",
  "macipk.a4656008d36cbdaafa884321cfea0bbbdbed4a445d6065e181c8f50492f3e613",
  "macipk.bd9d9018e71f8cbfb7bb8e7aed36a7aa7c3a02c25c8f942b0dc5c40e8de28991",
  "macipk.d388a224ce8cd1ae8215cb9f88e3ded74002aea596b63efaa7a941458213359c",
  "macipk.5f9e4cac8a1ed86a344bd513418b29e74b72f70393021ef3d3aa077f96b78a15",
  "macipk.d2f3a16823f5569d0dcb2d8f00b455710a221db00f68645bfee4593912c51e8b",
  "macipk.384bb7307827b10376c78a53d31a070e2d8e6202f034507a4e0a2da355e42dac",
  "macipk.09e91acf7777d5e335f541cb0db656bdf530a92cfe7f4d22b96850c61b6b7608",
  "macipk.07482971b89f082a71418c5ad3654cbb8eba20ab9f00acf84e056c8bfe345794",
  "macipk.e85a6fb087badb5e68f2413b06f1583c3c086a388c6cc05aa8e4b5546490d02e",
  "macipk.539f0594bec9c82a24df1a464cd24a2bf33f40baadee85e57cf75032d5ad4219",
  "macipk.8ae53549b06bdddb199235097908d47e30b0fff9cd2f46956b091b593cbf942a",
  "macipk.ab1bb4e779e0cf8cdc8f0b709fb7fa9fa6c5d037a49ad65f0a9bde9618880d0f",
  "macipk.6c38ad238ecab62201a0cb0a685fc4dfc4c00fee31386618619de521273f9917",
  "macipk.4924231a9c56ddecef18c8f652ccf2233b2047ef4d771c06a6b90717b375bf9b",
  "macipk.c722dc9725c6a4332eeacbcb9132366249b04b316e3019280e55c992ffa6b920",
  "macipk.ef2b8aaa3e86d8462c5ff35703944afb44f41f0b46ec5437b37462fb6e98b201",
  "macipk.5c9d1f229b844f477216417058945befc94ffe51b057f76ed02cead6b4d06218",
  "macipk.141e7129e62337a21dded2c9d1a078f75cb10a097fc349236fd77e771719b315",
  "macipk.2b37c409322707319ebf77d94bdc5c17f77dc5b43d70327f17ddf1e4baa48007",
  "macipk.4acac6c0c20b4a3add03066a2eabe52c9775e859256196c08210031699e91e01",
  "macipk.7d67d868d6c991ff025b8d7383cf7b981649669aca036fed65e775b07d7d1783",
  "macipk.0bde8fb38e505a191f4c9df28d0bfa2c319fef1f2b07ff3f88f3d772e5bc0914",
  "macipk.98b155d3b43e5a63c286309ebb9cf7ebb8fa01ee68dec1ffa647695fce30ed8c",
  "macipk.59a7e45bdc828533c56bdacce7e65cb2be4a900f8caea15af7ef2a171c055319",
  "macipk.0c92ddaf764cff6210ac31f9ab47cd3bb287b67dfcb1ffa536fc4e4c9e27a69b",
  "macipk.0615ef20953e72f318b04d86a4c2563e9b57f76a799d0f70f73b65452b0d461a",
  "macipk.616e41f5a5f925890a4c22e57f9cdab04c6217bc56d7b91f31535531e1643426",
  "macipk.9f00c78eb7a842cad96a8b3ffa9c1d454500ca66614131f6b66231fe9dd96614",
  "macipk.246dcf44f707d9b67a698f9970186425a3d283a99111a90736b787cb3e66fea3",
  "macipk.687c55144c25c6cc0432b8e3616d035c1304e2a6b1ce6670389957bb7aec5213",
  "macipk.ffc9ccf4f8a85970faaec74ec29fb10c54813218910fc7e541ee2c66f9af8f17",
  "macipk.e3596ce2093a06f274e1ef1d9651830fbb167548eef94c700c380b679f49632b",
  "macipk.11acd69c82733bd365dba5ee9710515b5eb289411a72ee37e1872b7f1ece1294",
  "macipk.cc9892257110b03d14ea838077c2c43dff3ed4551095e3e9ee85f48e942cdf17",
  "macipk.87b0fb4ecbec10b18b1a5f4bfbda018074fb3ff76e7caa55ad1e1769870aaa9c",
  "macipk.de1b056e8cbed4026744d5aa57062176cb980f70ddbf45214e691ca11b92ec88",
  "macipk.35de751d8fbbcc4fcc72a41294f9aff9f443657be724482b8f69b9a45aa5350c",
  "macipk.78a856669cab220ed65c85ca45bca785e204557d94caaf8c236f17fb50ee8290",
  "macipk.a3eaac07279200ec76b59602a70333c50534d779700e8fb60aea2dcdfb4fed1e",
  "macipk.109dfbdace0fdf5b1d5f19aa6613b7692b0eb2b247311ec1b2775d6726963d0e",
  "macipk.752d7a8f4aa099f95b8ece92ede006c69e79b04b2252fd2181891ab6e3060c0f",
  "macipk.f4f535947468ca481594204759c362cf8cf61065b135684f2b00b6713962bc06",
  "macipk.bc0002871c8bd1dcdd5e364d46982f374c55620d922eb6fd35297a958a5c6a24",
  "macipk.6ee22be0c94b54fb92197f1d1dd8f6157cdd98450b320fa24e37f7ca83e0282f",
  "macipk.dc1234fefb23052e00202e72caaf27ab0ac8372765d95c76718645ef5d1acf12",
  "macipk.086bb20b87f46f873b07511b0fbbd63576ab91b5135b48c0dfbd4590ad705e1a",
  "macipk.ffaa746127fb254e8b230554a980fc7615e8320a65a8901f3dfc2d4216a9bf88",
  "macipk.70a74aa21f31fe94a36a2f418881fd36b2318a9c7dd52b2e706dd79519db2fac",
  "macipk.de34010e544f7fffb50cb9f7c641601947e8f866c31cdd3a6891c972b7fe77a8",
  "macipk.b9d9cc07984adffb6094bcb59a1ea81c9d6ee9abfe8a7d665b51bc3cafd4a301",
  "macipk.fb1e9b76a0c43104a31588fbc2109c13736d4391805194fa28536f187ceb6281",
  "macipk.96dee4c12ab9c88227d7d8ff584c62feaa6db0f88fa5a4a4ca576e8a67ffb82a",
  "macipk.d5f9cdfbfae667cc861df310fcf90f17d7a7c2d141006eb51ce6c8070871b60f",
  "macipk.0269b75dd47ed582db2509306d76dfc1e6651f178bce2bf3e45d86b9b99fb1a4",
  "macipk.a59998f1c0da2dad4783a908a4d7dee9d36c3e17c76cf1cc8f79c6dcc2d66186",
  "macipk.b4f6fda38d7170c0ec017cfa47f96bc9ff7b50cbf62bf5d5acf43a9df9eb012e",
  "macipk.6c20017c6ffa00650ea6c249ee369ecec500698a7af7a3d827267171f4de370e",
  "macipk.6ea7150d3e9b8cf6311054b3f9556a11f7ec9f7c4bac1d947d0ed14f56cfd9a3",
  "macipk.dedc7028b12e52fa484fecc47427579cb1442e32238c93064c2ba76df5ebeca3",
  "macipk.2777944d3743801bcee01c405c0dd5d41b26c6e5fb280816f2f4fe24dcedae0c",
  "macipk.ce3bb715f4e9516e3bcf9003ec62914d549798959c8c0f11aa8ca413a9376d2e",
  "macipk.11792877102e05adabcae2e57e02733e64c3c5ee2c8e33358650178184a63dae",
  "macipk.866224fefde120e0d92c3f2665d53b783e57e38604b359f11ef0af064fa62a13",
  "macipk.6fcda486ba62fecd0a43617d67e8250e729d20a128e44f5514082f609a5ac09b",
  "macipk.249f9fe08765a321fad66803b1fa2863816dd2cbbda830377133dd5ae0159a2f",
  "macipk.d3b28c77a553cb387043cac815b035d76ea32ff7e57c57475304c28ed08dd79d",
  "macipk.81ac48216c06c5555b2f97652caebd3cb732ef851ddcb5dae5bd715efec4662e",
  "macipk.7fddff872f89a5c07fc2b2e4bf95bd9f38851d2170148ed775d79fa7b776fe04",
  "macipk.f2680ffeb29367fbd53a8d93c2f932d0255b2865fa7cb113a9157b707b19d1a2",
  "macipk.9cf9600a666b20222be213d01ada56f478171269453a19f5ed7ddf5eb638d99e",
  "macipk.98ac6016fb44aadee9400ab935aa85e90e04780876236b6c8b27c9ab3fdf5922",
  "macipk.8488e91100510d32c8e89472520afd55a76fa5c2f672d37650ef5aecf727d202",
  "macipk.1839b9fd95d17790bd6e8802e1efe762020edf81a45b04e8bf02eb607999d50c",
  "macipk.7739dfc4106f120a83172dfc9e8bc622d00f56584db40808018c16ca9b30a208",
  "macipk.deeb650ba143ce92e29d75002ed9c9fcc1edfaa68be0e4b1d82b4ee927815b2a",
  "macipk.31e3b690500b62a50f6414a7dd62612a9719c35f968d55b296baf477253c42ab",
  "macipk.568b87085f29a9c45c2e55438810f54c877795322a8a67e994c531dcda195086",
  "macipk.44760887b50a947128d190ddf36009aafde57de85c723a70e64793f5ac7cb5a0",
  "macipk.777b14b1e52022e8f3a73ccdb7246f6521abde17625c5a066b215974c55e4007",
  "macipk.668cdcbf4369c164bd0813a9008ff0624eb06eedad2c7c8bac1a936bdb36e5a1",
  "macipk.9ac08be92a577e973b88227ccf62934204a5daf9ce6bfd4d1440c591fe9140ad",
  "macipk.eef7ce2d4fd5a7243163684c6e67e82c762d8aba25c0c2cbd35705a59a2ae394",
  "macipk.545df3fb2317630c206d350570ffc67d659fbb65058b6a88f07322fe06ff91a1",
  "macipk.17b42bd033b9186a6630f905299e68184e62aac654e031ddc37fa93287746817",
  "macipk.36d9b827628b3b7ebf786f2c35f483788ea8a9dd2b09a2c659f585a9cdca2715",
  "macipk.9a3ad9e8889aba7e0c085d27ca976a5096eab4663b3f9372b4a489fe0c240195",
  "macipk.2927f9bd7eb8c0aabbee7098d0f1bf0e102209c179ba4b29fcfacda52e7813a3",
  "macipk.999ef514e3364c0df40e783cf20f9496b1c440bb15eea2c18eb84b059cfe2909",
  "macipk.7bda015cc1e5cb9ffd110599903d86ac4bbb1ac34a8eb66a5ed62f1305ec972d",
  "macipk.52d74eec161678e0f0700dc709b9a47007c2b949612906342184426a10af320e",
  "macipk.08eb5bda816b04c206536cb37f17c8ae40b3bd5c3d06fa1e7514a574e6311a9e",
  "macipk.1dea3d6d2c04f5563200cb95ba81305578740a7af95b9648800384685ffca780",
  "macipk.ebac1d77711e06ba7a7ffea55e306efa3613fa4043780f63b589a820ce4aba07",
  "macipk.4c0d31b087728b71248090e21be4a27db26e40d93184088fee5561272684c912",
  "macipk.8f0612d01016034d1b32ba3c67f0122883f856f4386bd8aed2f80ad9d320b095",
  "macipk.372f083ed702f9fad73fddb34e10b1bdce2090d7061bf5241d869f3ff9cab188",
  "macipk.b9273c4f3092192ba25c8914d50abe1571791603159511ef7000c2309edc4787",
  "macipk.f38bf0b70d2ae1367f31f368ded62c5fe7e652fc1f7bba2499e0e59d40fcd81c",
  "macipk.2b920ab2e138537725fff6e779d773da7a33d111f5952398a520d0749026ed06",
  "macipk.76bf639283d55ff69ec58731bee7440fb8074a2232c511c4041ac892f103a81a",
  "macipk.c8a428d0288ed981c581ee1612f66a88429b3857238a4292330e439d7db9c613",
  "macipk.c71790af39d6289ceaa337a3ad8536bdb51572368349aad8d7f34fbb592c3b05",
  "macipk.f11c6e93bb421eaeb5340758f9961225a42c268b0db1002c580bd97b528f7229",
  "macipk.3393f0abcb319eae1e3d2576cadb2c414eafd1a2dd97bcb8adafac75680eef0a",
  "macipk.90d3e444cbdc080d358916c6b959a935f80614b7010ee9ceb7d5912216fc3d25",
  "macipk.3c3fe09e902d909f78e91a8ee7ec5c6f73dfa20188652732ec4e21e2467e4612",
  "macipk.bb74b1ced25d2227d06978fd15a0fbf9b24ffb87883f36dfc560981a5d0fb781",
  "macipk.bb311fab73b6e5a2350fea75b3ecb042a465f2d8e4cd5da3ea7f00beb89faf0b",
  "macipk.4fd54b186852b3cfc6577ff52eb5ebcca6d001dacf19952501ccffa366cc0194",
  "macipk.e66fcb03cc08d5bf854496937f629507a50f335775300b3caf995c4d9f03bf14",
  "macipk.48f635daa65158c35691041888cd76ca189d493ebbe6f6fb2e987156c762ca82",
  "macipk.5830c976933a42e106762a81d13e7b41960717d087883d898d223b3d9938f5ad",
  "macipk.33efe36e03b164ce95c554bcd2d591b7e6783459a0b8a1f4230c030d169de8a1",
  "macipk.7f9bb272fcf20d3943e7af9844d404bf2b6f60aafe3c47f129c38f8fc3062e0a",
  "macipk.d0d3392619a353f8f43a569e1885a5d81dae4bf779f591507a7e5e5aa2859f2f",
  "macipk.cd7bb722e95d120de8795d79474cef9a91074d8101ccc565ed6c47860616098e",
  "macipk.67b58de8881d20bf1cc2a4a99ecf0eb727b6905097a928d2fd08c88820cc5c1f",
  "macipk.27f5442f4e13c47281cba576d9ea88ed65f2df76dfb7ceac83a8fbba15cba0af",
  "macipk.5e62f503e21bea517bebc42da01cdaac538ef10d23aca96ed87f1a75c90a0e83",
  "macipk.a1a11fea85cb026600e049c66c65ba7473901b3af9d8cf8901dad245d02e340a",
  "macipk.5c13c2f168a28397129b91de14b98131edef5a25da8be88010f98c4b11b86c25",
  "macipk.f57ed6048efc562ae47e805498fbe0728afe7943939e531196c14d3d01911521",
  "macipk.f2970daa63ada125cf7d07ef184849c4f06d94bb641a9508dad02bb5f71bea2d",
  "macipk.5f1b6e79282afbd97bc2fddd5850f11fff9148133c4239115708d68888c8648d",
  "macipk.49b6b26efc5a27167e588bc8877738f7f258074314cfda93014ddec4dad90d0c",
  "macipk.182f6fcbe4a9f05719a70611fc6a56cc7c355a58941867a82db8daaf24dfc9a8",
  "macipk.bcf35b509b00d2b575cbc80fe35f72874686b0b1441f3da3d10dcc3507b2f1a3",
  "macipk.e2ba1649334990cfe3f8b64f14ec2b77a2bf95a841d434489e56ef53d0ab4e27",
  "macipk.d41458b4a2d87398f487d1921e97f51e552f5fd5f90d613016b7a4ec2e46c086",
  "macipk.32139696986d3d09cda0a345513121f73849b2f4bcf55ad79cab19a9db0e1a80",
  "macipk.dc7904fef6b2cd2718a51a68620671f02b11211860da8d2ded3a978b38ecff01",
  "macipk.bbb786546f643744d54974412bb4fa42c5a9de36f8716e68e2e843559645c814",
  "macipk.c3582041ad1a4bc1ea5074bd5487c33fe1b24221ca4f395984ce10d6219ee129",
  "macipk.eb6ff83fbc9dccbaa7ebe01fecf8c952b9edaca38a8d9dcc8f6408d20e1e49af",
  "macipk.7a6d58f49e5069772fdba5cfcfe9bfb0c4772d19f8fe8ec9ee871b6296fbf710",
  "macipk.134514a09e444d973b55eb9e46698dc73dda7bf6c383532fdf81d9b48389c68c",
  "macipk.ae015632d129dc5d3c2268beae3d8a41bbf4222c11c46ea4443b888975cfd189",
  "macipk.b6e7c3357a4187fc93bd35fc5d3cfd539f0edda38c3b062fd863817ef7c18985",
  "macipk.9e2c9ee2bce68c29e81237df058b75eaaedc8e77ebbcbfcccfed169a543a36a6",
  "macipk.ede0b9113b94a4351d866d396d79cd4e7f7f75e3ae485b8159fbd0a540e4bd1c",
  "macipk.529577fd6ac888c8553aa82b26e381e9c7e4227056e686042845af8ef2ec01a0",
  "macipk.34719ce4909e08820f7c9dfafdc05409a1c2c87b8fb658b9c622bdb554251897",
  "macipk.b9039a1e724a353cb62ac1584ff739fe6e284b8cbd0267b0ee27bfeb0deb2c0b",
  "macipk.a53a4c223c4256f3267c3eb9f40da8be5964eacadec97a3fcb73f668123cfc92",
  "macipk.ec255bec436b6d4f55a849e9d523446bac3f0ec45aa168247b4287b50824c113",
  "macipk.13350fe542762a3a3f4788557c1e40090679995f892369fe7fbc4ef7e25d8c89",
  "macipk.4ebc84af993eb12fabd20a48e4ad50cf2f61cc86350b01bb6e08154e9e744a2b",
  "macipk.02add540d7f2b2c00d3f88c3267176658add825b835899b2b27dd6b72504461e",
  "macipk.726d90981331e5e5957a9fea81af698738d8a618cdd0bc66273d100a12d3700c",
  "macipk.50d44201fabee868855a5a518461cd09bb8db7bcfe72ec2ad2dbfd72983349aa",
  "macipk.5eb4d79415ea39e7336468616a6800b1613c545270a5151173ee5348f5a06e1d",
  "macipk.8b4ccfbc1d93585afe3a93f0432e05f0d99022de075b9ff3805e5d4215708e20",
  "macipk.8ce2e76513b3f34e23bb533456c498f398a9095b05c7db29c6f91fcc31166804",
  "macipk.cd9164bfed25cc28accdf02f7546feeb56852d257ed1039c7523fd8dd25a8a0c",
  "macipk.feacb113fa981ac2870aca9bd0f514b121f141673dff5bbae06fcdee618d1d16",
  "macipk.d06cb79d6f1d90f0e4037c8699ae0f973e9a2218a47a0bc963ea5957fd44b78b",
  "macipk.26e8812662e413d0e8e9740c4fbda174371ccde7634b20b62d72c630730a3dab",
  "macipk.6c004cbdf9f80e08e0654884053dff09c8b41ebca66ac3d767f967daed5e08a4",
  "macipk.1b28b353b29613a630cb8e0a3206ef5b94acafa3fd830f3f5e76aefe07d81688",
  "macipk.3a516e852bb9449dcd904ce05a10c07cef8d34c2553248431be67a8435b43498",
  "macipk.50c49c407ea9a23f9445b7b9aa93c44c79aee22190c9fb669c1839eb0dd5c42d",
  "macipk.40eb73fb3c9bcfd4c145e13c0c83ee719aef99a190243d15a2006e0c4b4f760a",
  "macipk.8247290f2103529a247454a1af542f973364a47036e287158238dcc6682d6504",
  "macipk.ee4dc692de089a659da48d1bb69e90591e01b0995465dc34250160122877cbaf",
  "macipk.80b85bd48f820601709740f1a89633f365e781e760f177529ef5209e9b1db31c",
  "macipk.bca7089bc3858d1190eaba62e7b40d0cc3507c733416260e561f77591fdd6f2a",
  "macipk.977fbf6812ca88994f4514a74eba071135d44dc93036208c5927ca0f0c1a69a6",
  "macipk.df55b186986c372cbd69257e20ffcc1b8937defc1f261edd9399672f6f67950f",
  "macipk.7fa56de4232b2fb9ac76f4f7cb3615a3f2b8540d470c837b65059f685403d986",
  "macipk.ee7406ce477a023b241f9eec0f502590bcf96654abf5572c26bb009870681127",
  "macipk.7c2e8bb1e68ccbd3b8aa272896de93a6694c6936a8ed71c061bbfe8660cd1fa0",
  "macipk.220d90dafa89f1a1a3052360e84e2ab904ef6c93f26212b46f7db754c2c2f118",
  "macipk.7e1d72ca52d35a09055a556ec2b87b80a4a62f510ac0b96c22142e6501d93a98",
  "macipk.d29114658200f68010a6970b1234dee5b0a0353df803f0c375f914df6d19a60a",
  "macipk.ea5a0b323c49e14bfefd32b3b5a0c2a7f716297b3160c644c7aceec70d22b480",
  "macipk.2d15b2c16d968543f683f8d65886401677ecca37d55857e084a4fcbd1ee36a05",
  "macipk.e3285fb111fbcb7e66b695255ecbc43df2d1007133dbae57be9fbeb0f6f8b918",
  "macipk.cd68f0b48ea9d1329ca06e2651ddb7b34a6d27f9484dba127f66b3053507c494",
  "macipk.7fe59fe404f35a2d829960623af467c209fff36ebf6412d22a8969b92805dc0d",
  "macipk.07b0ca137cb9e24d1943cc2f7cac184e0c74f70d9cd8c13ceec964f31b85d31e",
  "macipk.4e8d70b379d591b82ae9ada34532f44f71c7a8b2de59f3f3a47b7f794b5bc70f",
  "macipk.382b1d228a5d2e73d302ee346b9fd70108ecde7da072942a5dbb5e378bc7098b",
  "macipk.b7c0b4789622f53b0ec9cf470d7ca6a8b4a674e1f9aebf57f3eacf59d77a4329",
  "macipk.c053ad84a22954756fa0a5f44030f55db01d9953bad151fdd7ee9154a35d2b8e",
  "macipk.2e4ee9c5c093d782242f195904bea4d8d3f27fa97451e743557fe957fcd6e817",
  "macipk.6ed32abc252e4b82e9dfb9bbf5695094478d946fba70a65421be7c22eef0812c",
  "macipk.fd9f485a8a3a94853397391736dca1d709ff0823d7294f3620fd199e3729c006",
  "macipk.5775f9545352bdd22db2151ef09f4e4ea277e9010de43bd4249f4a23f7ab67a6",
  "macipk.af3bced2a724c9e9b76c3de01c8711eb1306aebddc89656522088edb2cfbe72d",
  "macipk.2b88dcccb72566929eeb5d0402a48190510e426809e1b4916bfab901dc210d2e",
  "macipk.2ef92f5ac72f7f8c196abb12616950f47bcffb04848093cd39eef7d17b8ff78c",
  "macipk.08322f4f972d9583e550a3f27ae8e849c2ef2550a22c718ee3c3a9b65ab6239b",
  "macipk.7c78bafbcae033067aceef8ecdaeeb91012d9481de292be4bf160af633db0505",
  "macipk.02221b60dd3f58bb4729ce9545eb1e56a37ba6be9fd80c6251319936fd57580f",
  "macipk.049ebcb501119477e0941c5fe7718931dcf164c5219605f18b260ef00280a017",
  "macipk.f1150c3a44b1845d5bda8907167b9c1b35d1a8d02dec18c4d4f7c5491d6f8115",
  "macipk.1452143bcfcee65b505eab6dc49beb5c24141fff74be9dd57130c6596951b917",
  "macipk.1c5f9a1a0b64ea7c7fc0666b4b41c5cac02b684b2aee9822e1e74173ab883c96",
  "macipk.ea1ed29a2a3d149338fcac4584553cb03a5c6f51b3cc3a1e42f82d990b97f112",
  "macipk.15addd7c839351b71b6c7e3a86e8ee6259aaf94cf734fe5dbb6d039a0e6986ae",
  "macipk.181b77224a3f25f1d1591f0f5599ee6e805dbcac5a32289b5f87ea6d4e24c895",
  "macipk.6a3dc2ce5f80b0115d28bebe44d813ee362070e747f30fe9593112bc7010f992",
  "macipk.0677fcf24955e306c73aba37b924cd0eecf97ecc54198759c461ee152e7f6995",
  "macipk.13215b91085547409bc6cead074a3f6a252e0c4ff0147c6a401c08690af11994",
  "macipk.fe3f2637e37648c2da221a38d16c750ed1e8c6309f842787894ae352c9cccd88",
  "macipk.74bfd5fc2cb6c267b5a06e9b5595ad532044c26bac790a48a5e19bd98769c825",
  "macipk.e1fb215e08dbf9ce7b75c4bc9e0479f01df8a46f52733966e01ec5b57106da1f",
  "macipk.420358d69b815f59687de92498e2d91761a3f52b6a610eade290bd06d539f9ab",
  "macipk.84204e3858a0d3c2141f1980d5e5cae8ca0ebe9dddd888834a69354f09efd929",
  "macipk.2b3e802006b6d1407eeeb6a9a03b6dd20ce47bf38966418fa8b94a9504ae9304",
  "macipk.757cec61479ecc0062e621747e2aca43e9eda4cefd704f2662b9d91d2acc4206",
  "macipk.477bfbf3e1d68edd999b490a5b266a06ff63a336aa01fa0f48c906da934c39a2",
  "macipk.889858f98001c83d6a73e9ff30eace43b88b4e6052db7ab77c3a38a7683537a7",
  "macipk.1f0e1c8df662529d702f374bab4957cb9d40ddf5d9757f2119a731b387659aa0",
  "macipk.93bc296b000ebe450bbd9523e423ea1b262d6a0f3bb83833e8cac358fcab7e1e",
  "macipk.87a50c2c5e1542096efff08643e29e9a0a80dae00cab90d4729eec7b64002ea1",
  "macipk.31507cdafa48b5461304d2a704009bfb0b953ff542c90da7ec42b2710a323627",
  "macipk.c67cc7fc493d29d741f50278082e7d2d9a2b869e7772895d8476b155e49f48ac",
  "macipk.12411ef6cc170f58c8d29ab65ed8bd9ce2fcd9a3af459fd4aec8f1a7fd9d002c",
  "macipk.f29886a51a44bc69279f795ded8339b0a1b08a20e40fc3b50e46da54c0903ea9",
  "macipk.d1e5f03f0acac32e950794b389016cd8141637fe71b9126ed1ef438ee4fd1599",
  "macipk.580abf307f9e583d62a719ca9fa4dbd0426d47c5c5b2807d8a11ffb85a09d893",
  "macipk.f2ea6203c222bc89b61fe586c8ad30aba8d8c57270e0f6d5839d78e98f1e96a6",
  "macipk.2bdfc61cbc791bf5caef483af313930885d75c2fe34e8f945042d83213999f91",
  "macipk.90c76c4118df214dde1f5eaa64e27b5def2470fa673cd3302efcca896b415606",
  "macipk.742d49d43c3dd5e660c7a9138a9a52048fdaba023d41eb9bf9014036222cf790",
  "macipk.597be075444c2b61a7c3abceeb5160581a198de9724baf62cb4ae9e7da5ef525",
  "macipk.f089d6fdafc47ec561972dcf7666496dbe77163d5ac5250d2ec24d9a21180580",
  "macipk.3249968b752ce50f16d33d9b65fb85b9e270dd5f34054e7b0f91d81ecb41dd9d",
  "macipk.37894ea00170540f9fb7875e45c2fb3c0c6b2868b697e9fe3f7b169fd3374e30",
  "macipk.2bd6595178a7e77c1b31a340e95b73b8d10dbe4dc2ea3ed5583dbe04c9ca3e8b",
  "macipk.1ab8f587d8510d9793b28ee93c8b14931644b73329204a149a52e68cfe799812",
  "macipk.fd9f483e969b1c680f8e010b87e7ba38b25823a456c3d4fabde99d7aa14cea8c",
  "macipk.d5fc701264f186a8b382bc403ff655e6eb1016e52b74e83e00ed2b736c07cd1f",
  "macipk.501152b9ecb0a4dbef119f1e0f6f1a05c96eae96593519b9872550fc8822f38f",
  "macipk.23c1f867ce23551be56f526f23418e1d28d35925254ddb6fe80fa091b27aae08",
  "macipk.8ae4c45d82caad3f2a514d932696d56f513aec27f49795dc5063b764d01e4aab",
  "macipk.a91540a652a9bc31b64b0150c1f72180c926831b5c3b6eb29a50b1028913171f",
  "macipk.0439ee1aff1824d6e6a7f3d04b7a4bf1950d18d74276637c427ad975ce12e10d",
  "macipk.5605fac571539c82be593a026374ec101db3b8d3c73acbc3f41e53da9611089f",
  "macipk.842be505e87c80fdf040a19c0c22dfc2df14cf2cf6ba5ff118059158c36e0014",
  "macipk.122acf25208f347c58509c8840698176619542b480983d25195a274c3863d81b",
  "macipk.90fc8e6f9f2e705dff213343d91c1ca74587b37bd7a0cdb4c0a6948c801e1f01",
  "macipk.1d6aa0347c737e26956ee8e5bf71e9bf39cf835c5757e52d5809dac157895123",
  "macipk.0b6ca730cf637f5dd880de5039efa3f1fb021265751adc5aca0579872de8de10",
  "macipk.25989d5f76a1a6982653f8a35bd4e3ea8d534d2b5775f05aa8e03f2bd223c22f",
  "macipk.f3979b9db7dc69ad9703c6fb4b52f1a0157e19e90efd514ea63c8b6a9af6188d",
  "macipk.099d55d88779c24c390366b484db2f4dc70cce4e60ac2c24a209de71fc77ee97",
  "macipk.5bf123a0933658ca649ae5893b04fc7fea97b34602db8942529c45f1a935c19d",
  "macipk.2bf56b37997664c5bda0cc1fa70e893c715412531e992cbd0d394595cf85098a",
  "macipk.813276b42deef978bfea6bb38b0bb85384c6f9122a9607b1f0f5d699427b8025",
  "macipk.71f4a761f2be80b86c805a1295832efb0f936f31ccee58d8b71c67be5b795381",
  "macipk.4d166879cd224b418acd721e6c0baf4620ec7285c1810c52634bca99fdc12f2c",
  "macipk.e130ce23608f5446c4427bf3dc4b1c2bf334581069575ebda71f3e777b5acf08",
  "macipk.3ea6584ae41c9059b55ab0e918fbf594c368ec35855eb18ab91b948ce9365f2b",
  "macipk.29fce56567dcb415be460bdf8708d35ef2ae97a7398d82d687da96af59b903aa",
  "macipk.02bf71666c299de6702c8e31f032334800a4426468c6c281e47e59c5a650a52f",
  "macipk.d45de057e7f64b9d803da256dc8f637833cca55e4aa3ee3ca5d15f27e8f5e21e",
  "macipk.bc9634a0e8f396aab35578c88db294acab9abc66cd37aadd72277f26946ffe16",
  "macipk.8068a5e5d9bece5070fd0deff7573aa7787517e59ec1c9bc1ce727c733739e80",
  "macipk.80f2c46d8770747449eaeeb1fc069dfafdb1f371c19b75928aecda804f7e319d",
  "macipk.e9330e6c81f9f89a2f772c3aa10279c6928f25575389ff92ba1bbf76e2faaa89",
  "macipk.fa73d02a88ef768cc9190261941dfd6a38c74b2f5c44caafbbf85a435569aa17",
  "macipk.53fc2bb3c328e7505a12f6a91e877b82ea1f49c8ceba403d22587666a7a0441b",
  "macipk.0960258e2fdca908dc7e48a3a8bb514fd0189d627a8fe35f1d372c6101abda0f",
  "macipk.57f70f06d46a2838a61a3ec257ea489744c11e781d06a8c2fa22489f86f68d1b",
  "macipk.82a6a1ea15082fe9f2d43919eb84209474ae472d4907b131a8ca7f60c11e3530",
  "macipk.dc86475d157b28808376d684eb48032f2059ef9c9fb8bfa6674c2de34369d78b",
  "macipk.1179044bd532977d53cbd2e3c4e2c6fb914e86167885aa104a11d6787e77919a",
  "macipk.db9128d70db863087729e86a6bd989f02e99807a02ae51c644cbdbee434e540f",
  "macipk.cea7cf9d88d0ee5dc81928d7691c1f9e4abb8101567984a3f6864962dcaf44ad",
  "macipk.46a9b1e745a0524a3926e8b8f6ca83c63a59bed9422835ec99a9033541a21396",
  "macipk.9032b1988e30168e896de8a87fb92c726389146320d23fa80cfb59773b5e5b89",
  "macipk.0d57122bc5014662223c571d1416459c3ca56fd5b417314bd0002ca5f78fdb9f",
  "macipk.ebbb6f8969cd972dbe699f51468a6553f658bd3b48e8f61de459eb2a73bab398",
  "macipk.51384da81587151443af6d53caed15476384560699690cef626759da13d87505",
  "macipk.6a9b6b6fe073ea26235565f6d00a21a925809020ad6cae0254b8fab30196f7a5",
  "macipk.907023c8eeab2f15bfb25cce848a7a657583f4bccbf4b8b83ba9b4eae1a94b13",
  "macipk.df6e1f4ef468ec758a0bcd1579b625aa9a54e7a9aae33f1af9b730655e6c161f",
  "macipk.6e1003af00159b25b71dae9d9a9b540293b8e6a43afb07aee236ff2275af350a",
  "macipk.ebcdd0dc02e001760f580d0f084c40d26891fb3646f9ee45716955eea011cfa6",
  "macipk.ce4f3c82458b48a77f38161900b53bc720beb5efcbba4779863a2bfae577c607",
  "macipk.cc34c0a029c7886ac8a2e44ce997e59e4f3624d6aed047a912fdd85dc4dd9f22",
  "macipk.580c48c43668a478f99d2df51103af1f8ebab82e4ea877754b07846e902af4a4",
  "macipk.bcdde3df17ead45a179899299aa29c7dc140baface632132849b31e48781d885",
  "macipk.70674a9bae521fbfd90d369efdcb1463d5c33fc034ee7f0a1a6ecd532937922d",
  "macipk.1ee7c714c77af67e6af8ff4bf6d7bf6b5f4f95f92958ca53fad07741689c8a8e",
  "macipk.8ce8eb1057e04a9b2432f9aa9dba86ff2bf1d09d1ecc73269c1e757f4569b22e",
  "macipk.143fb923012341c8017aa814ca4104d0d132c4e5e9253ca04e5a8023b60d6003",
  "macipk.4e1016e7fe1115a0e0cba4015fd68ba8dad28f84d4ed554b0010f5b775ff2405",
  "macipk.03897bb26e410a94083c274d749cc3d05422f6d1fee5c0b6dd3f34edf9cbd72a",
  "macipk.86c615de323f733c9da87044467f89899a2c65e206f269c892139f7af1e8c320",
  "macipk.ee7225099b1108368da440a75f4c1b0ec6548e77076241f242760275c0759727",
  "macipk.b9c09207bda255a5d889bdd482dc98b0f14801bcec2843575a5a0665d79960a2",
  "macipk.307eaae8e838e5d20b95d88b90c7410d098a5bd7b2e3b245f897aab11162a2ac",
  "macipk.4cd8ab02a56fd1929c02cd81ff391fb987ceab6b61be1234c6abf8c123e2d714",
  "macipk.aaa914a707e04a5b1dd45b4d615650b450c185290031074a5a074b94f4372ca2",
  "macipk.f82fbe9d8da6281b31b9c4ae1b820ad71782f02d15d22a0df1092b7c0714b025",
  "macipk.9320be0b5238a039d5aa9a7d0b386c9f48fdda57443043aed01577bf67247d2c",
  "macipk.3fc0c7eb1a4a97fe814668e028ae5c61c8e28e22c1e5682a66d8f07be07639a9",
  "macipk.52fea1d4463467c08013e74a137d6f98e0392dad6aec5f123d337da31e9e3c99",
  "macipk.956dd5d67e55fb42b68db951f472834ad058fd3d3966747a0f8d2d2ec3541e0d",
  "macipk.6d8ae9275cc1cc113e0bca103f56803013bb74b6b73d17393ef84c0e67ed2899",
  "macipk.11ce8c8a31a4b334f6f63fa84ae32705e36e49b5ce778cafcce403adff40a1ad",
  "macipk.ff11409ed2e5301ea3319383284003685d23c1ce07c12b95e5db69e5adf5eba6",
  "macipk.7a50b7388994a9d0ec0232918c22cb87160a3381a3d68e156d898854e7fb0da4",
  "macipk.d5067da46396aa242e4cd7bcc8f4f9060104acf9a5e2e37383c2d2b73edfe898",
  "macipk.ebd34c547cf9c8d48cf730ba9280af55f91a4338cd6b0054ec6c3bab86341185",
  "macipk.78af7766df0c44b329171957603673984748b0587b9bedcb802e374bd3f8fa08",
  "macipk.72e5d8463b0c1846e88f20bcfe09f03d06f0a2579a9cc053f29e5231b8ad86a9",
  "macipk.ab03322d86d2c27cd43d021f799b085ca500165495e272cb08ecbbecf446c522",
  "macipk.b95aded8d20fcf8b871501661554600df94042b36725a88654edecb72786fe22",
  "macipk.fd45c797cc5b02e8b64a50c284e8048c106097a382d5394b18ce8aa555131420",
  "macipk.5c0429983179d81b96e4c08e9316a63a0fd31f59d35ca4368a9a139a2b71f729",
  "macipk.9afed85c98d42f8a9cb4a9d3502e4ad1f1d621c68ad1b61d55c8a2fb43db03a1",
  "macipk.aca5e9bb547d629aed698e4904b840a8a0ba62e438d1788ff31d781c16978715",
  "macipk.9ad592c2c402757c70ad3c26255ce7c4fc67407ec28a5b333b50d112dbf5ae24",
  "macipk.a304bbdec849a23b4aca6a5fb72437e45288b901f68f3b69fa4cfe76f5ff3312",
  "macipk.96baba87d724d8f82cb3c78edeba6f69c78db96ab0a00993e4982462a785a091",
  "macipk.b48fe15dd3db04c3ff3bc6cc01196d51cd26982f26c9d3c3096fcb16d05f3d83",
  "macipk.aaf636248f6b6dba1ae66cf5cc6ddb3eb7ae9b1214ba00747fe3f2fc6559aa08",
  "macipk.321a29c49250caa356aa10237984d56973df2897dcb438527d21462eb76de6a5",
  "macipk.0365d6b8f50652d7b7ed8e644b8725362e9be5d8735cfa8a1c4879a6cc5236a4",
  "macipk.0bbb3d4049e1e9c095fba7800c4ab8d68858bd4b6cf9eb15de42a7a1a554908b",
  "macipk.ccc98c0a75fbdf61115e75ab18a12f3cd079b4d027750d7121b79f0f36383e06",
  "macipk.87a964965cd8b0180d2b517280caf367d59253268c149cb13d17e45b47d3c79b",
  "macipk.be8f31325d7e72e2db5ea038c910e7eb05007271f36ef02087dc771699c7dea4",
  "macipk.95c195600fb97512d83e723dc41d15201105b7d3a87dbe4cd284ab7c2c4e828b",
  "macipk.359eeaefe98762df998938e220c008218b06190070f63e1666d8e9c738d081a3",
  "macipk.c33a36bcba82376233d29c4f52b0e2e2076c5ac6eb2bfd08d1c293a87a3bc79e",
  "macipk.d6a10d6ab869e87bba5e59d947008349f65631b1d05481799ccf3e8d460ed09b",
  "macipk.c44bc5d05169531647168d0073ea4878ba80d072e8a39a7f25a716d1d2c35aaf",
  "macipk.612dc246e00d13eace08043a0f0dc9a42a6d6b8ab689cbe44b3e05599cc47380",
  "macipk.1798208ab696f8eb321ea8785f71fdb484625711016c0f068c51f814998f9f1b",
  "macipk.03fdc3d86494bd006e496173cf4ff1c5ca707188e43ecdf46763a6296f0a1f9d",
  "macipk.f463deced904a46248bc33e925a7692531040adec91daf979180fec2a0e4cb17",
  "macipk.a25baee2c05279973dd82e21b2776f4781518f4dc5623ad59900bd972bdafe83",
  "macipk.43da83942a1cb935dc679d80ca53b2651427a595a1ae2f87afe702891df18809",
  "macipk.82830b5a5e131a3d15202a2e4235b4282306420035eb9b4d40451af8c1c50094",
  "macipk.bdf59e6c919ed2fe03ab3f4b6ede4a83f54bc92ba9484373779203375908e09a",
  "macipk.c1eb2d9b0c3a293b64d0eb3e3d8d07fbd1acbd43e98631a8c99a8ae156ae0995",
  "macipk.6a02a18283150f0b6cc9022c30013bccc5a658e97dc667f54c53e1d079eab6a8",
  "macipk.317cbb8c285a2df2284a9a69c87f72d9831346bdc6f049f7633ad8fe6bc5efa1",
  "macipk.b8b4c027d460e0f624c87a7aa7798784f12c437b7252661e4d11e95909117608",
  "macipk.87cdc9f8eb2fd84b4fb09d12748d7bbd35724ebfdc63b441d4fa9a24cd732388",
  "macipk.e758c741481b1340b9b6c7aaa29e868fe96d5b297345569209a6eff68b25269d",
  "macipk.26d8e66dd3c58387c6f1da42681f7a2bea79cd3a613076da0a555ba9c3120e1f",
  "macipk.fe3fbf12c8f7553c555e1d5ce2e0e5d935d34963094b7770eef819ecf494a194",
  "macipk.f94c29f0d6b8c5dacef4c555b6cbf0500c1907dc39878ec186d9a631a5e1858f",
  "macipk.f49528941d93b9f61cfb216e0e15a57e916417a4c41b885fee8c97d1f3e93a03",
  "macipk.ce5fa1d65eda098fa72e046a095aa0d8e171e1d0573e0883670efe31e1988aa0",
  "macipk.d23ee2bf95779d97987bf680fe859c0861036229d8313b3dab697caf2943782c",
  "macipk.23b1123d126d95323a5113853237fc32c710b66a2eb7a367844d4c7d2e49ba13",
  "macipk.4ba35bf40693b7a12eb765f27c00ff5eb14ad9604ebe0a757d372e0ee10e9196",
  "macipk.f91718b07508e6111b8b41644e2ebb1ce544c007c9051345a6ea863f43f264a3",
  "macipk.c5d92a2af0a39934f7565c2793c0cb5b14b3765bc7f405f8df8ff1b7521f600d",
  "macipk.53eda4e2be3029191e1b426c9c7a4ff744814c7b217aded353f51c900170fe86",
  "macipk.22363eab958d557dd884eddf47003b1ef60a90a4e0cc19c0d95950d779d6729d",
  "macipk.17f4889451d7c17face9c74e6d244063eaae1ebd1963e4bffbc302a71504cd8e",
  "macipk.68a52df67e0131f3da20cef9ae3eac38e959019457330778ac7b871ed9db2d9b",
  "macipk.ba178d4617f890fb14d16e090fe7980c3b56b8011efbe8efb1dcbc19ad97ec9f",
  "macipk.b316d0e82f08f9f7de1ebd71e7eeab6d123f6a9bbcb5cfb78b968345a7603c84",
  "macipk.5e14b5c7ff7c3050cc40e4f93c063df53e80182b25c168d083ccd986e699fd09",
  "macipk.e39ecf9348e81b7af25e6f20d5e9b796ad32119f6948e721651243855c41d9ae",
  "macipk.ad1ea8383d6b61c6e4e3a5017e9990bd95b7da75d0dcbc1966607cad80774625",
  "macipk.81f1a37132de3a1da6bdc0ce11c966697491faf6b895dccdabde633489b71817"
]
