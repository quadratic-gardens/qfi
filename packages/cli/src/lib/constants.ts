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
  }
}

/** Parameters */
export const initialVoiceCreditBalance = 99
export const baseERC20TokenInitialSupply = "100000000000000000000000"
export const numberOfMaxRecipients = 125

export const jsonRecipientsRecords: Recipient[] = [
  {
    projectName: "守護者聯盟2.0",
    tagline: "我們是「守護者聯盟2.0」，分別是由公、私部門及NGO共同組成的團隊， 我們的理念是運用科技，結合民間彼此的力量來配合政府，一同守護社會安...",
    description:
      "我們是「守護者聯盟2.0」，分別是由公、私部門及NGO共同組成的團隊， 我們的理念是運用科技，結合民間彼此的力量來配合政府，一同守護社會安全，用實際的行動用心守護我們珍視的每一個人，所以我們提出了「安居永續平安福」計畫，希望能達成全民安居、服務永續、平安是福的目標",
    ethereumAddress: "0x0000000000000000000000000000000000000008",
    website: "https://www.facebook.com/SFGuardians",
    thumbnailImageLink:
      "https://static.wixstatic.com/media/d21407_6655af4ef85d490bac38703af0170e5a~mv2.png/v1/fill/w_200,h_200,al_c,q_85,usm_0.66_1.00_0.01,enc_auto/%E5%AE%88%E8%AD%B7%E8%80%85.png",
    logoCdnUrl:
      "https://static.wixstatic.com/media/d21407_6655af4ef85d490bac38703af0170e5a~mv2.png/v1/fill/w_200,h_200,al_c,q_85,usm_0.66_1.00_0.01,enc_auto/%E5%AE%88%E8%AD%B7%E8%80%85.png",
    bannerImageLink:
      "https://static.wixstatic.com/media/d21407_6655af4ef85d490bac38703af0170e5a~mv2.png/v1/fill/w_200,h_200,al_c,q_85,usm_0.66_1.00_0.01,enc_auto/%E5%AE%88%E8%AD%B7%E8%80%85.png",
  },
  {
    projectName: "文譯之間",
    tagline: "文譯之間團隊，有不同領域的工程師：醫院、半導體業、資訊安全、系統整合等，協力合作夥伴有公部門與NGO。這兩年疫情影響，醫院配合政策常需要快速更新當下的公告...",
    description:
      "文譯之間團隊，有不同領域的工程師：醫院、半導體業、資訊安全、系統整合等，協力合作夥伴有公部門與NGO。這兩年疫情影響，醫院配合政策常需要快速更新當下的公告，通常會透過圖卡的形式發佈，以利民眾轉貼分享，這也是目前公部門政策宣導最常用的一種形式，然而，圖卡不利於翻譯、被搜尋等，而我們提供一種更友善的服務。",
    ethereumAddress: "0x0000000000000000000000000000000000000007",
    website: "https://inkrosetta.tw/",
    thumbnailImageLink:
      "https://static.wixstatic.com/media/d21407_0da45008ef03415daaa6f6411490e8fa~mv2.png/v1/fill/w_200,h_200,al_c,q_85,usm_0.66_1.00_0.01,enc_auto/inkrosetta_logo.png",
    logoCdnUrl:
      "https://static.wixstatic.com/media/d21407_0da45008ef03415daaa6f6411490e8fa~mv2.png/v1/fill/w_200,h_200,al_c,q_85,usm_0.66_1.00_0.01,enc_auto/inkrosetta_logo.png",
    bannerImageLink:
      "https://static.wixstatic.com/media/d21407_0da45008ef03415daaa6f6411490e8fa~mv2.png/v1/fill/w_200,h_200,al_c,q_85,usm_0.66_1.00_0.01,enc_auto/inkrosetta_logo.png",
  },
  {
    projectName: "CEASEFIRE",
    tagline: "解方主要效益：使林火發生後在最短時間偵測到，火勢初生即有效抑制和撲滅，使森林不受破壞繼續發揮其生態及固碳功能。建議林務局成立林火消防救護基金會...",
    description:
      "解方主要效益：使林火發生後在最短時間偵測到，火勢初生即有效抑制和撲滅，使森林不受破壞繼續發揮其生態及固碳功能。建議林務局成立林火消防救護基金會，作為土地活化平台，釋出國家未充分使用林地，供企業認養。基金會成員，由產官學民共同參與，Ceasefire團隊自願為創始成員，為竹林地活化展開新的合作模式。",
    ethereumAddress: "0x0000000000000000000000000000000000000006",
    website: "https://www.linkedin.com/in/lin-harrison-378550b1/",
    thumbnailImageLink:
      "https://static.wixstatic.com/media/d21407_9033d1cd3ca0438aaf7f389c44c4d989~mv2.png/v1/fill/w_200,h_200,al_c,q_85,usm_0.66_1.00_0.01,enc_auto/ceasefire%20logo.png",
    logoCdnUrl:
      "https://static.wixstatic.com/media/d21407_9033d1cd3ca0438aaf7f389c44c4d989~mv2.png/v1/fill/w_200,h_200,al_c,q_85,usm_0.66_1.00_0.01,enc_auto/ceasefire%20logo.png",
    bannerImageLink:
      "https://static.wixstatic.com/media/d21407_9033d1cd3ca0438aaf7f389c44c4d989~mv2.png/v1/fill/w_200,h_200,al_c,q_85,usm_0.66_1.00_0.01,enc_auto/ceasefire%20logo.png",

  },
  {
    projectName: "透明足跡",
    tagline: "綠色公民行動聯盟透明足跡計畫致力於通過資訊公開與應用，推動企業永續轉型。目前推出的工具有:監督企業環境裁罰紀錄的透明足跡網站...",
    description:
      "綠色公民行動聯盟透明足跡計畫致力於通過資訊公開與應用，推動企業永續轉型。目前推出的工具有:監督企業環境裁罰紀錄的透明足跡網站、消費者環境運動APP掃了再買、整合企業永續資料的ESG 檢測儀、以及檢視企業減碳承諾與成效的淨零路徑模擬器。",
    ethereumAddress: "0x0000000000000000000000000000000000000005",
    website: "https://thaubing.gcaa.org.tw/",
    thumbnailImageLink:
      "https://static.wixstatic.com/media/d21407_d5ece5e722d34464b8389bdbf1675b47~mv2.png/v1/fill/w_200,h_200,al_c,q_85,usm_0.66_1.00_0.01,enc_auto/%E9%80%8F%E6%98%8E%E8%B6%B3%E8%B7%A1-LOGO.png",
    logoCdnUrl:
      "https://static.wixstatic.com/media/d21407_d5ece5e722d34464b8389bdbf1675b47~mv2.png/v1/fill/w_200,h_200,al_c,q_85,usm_0.66_1.00_0.01,enc_auto/%E9%80%8F%E6%98%8E%E8%B6%B3%E8%B7%A1-LOGO.png",
    bannerImageLink:
      "https://static.wixstatic.com/media/d21407_d5ece5e722d34464b8389bdbf1675b47~mv2.png/v1/fill/w_200,h_200,al_c,q_85,usm_0.66_1.00_0.01,enc_auto/%E9%80%8F%E6%98%8E%E8%B6%B3%E8%B7%A1-LOGO.png",
  },
  {
    projectName: "Turing Certs",
    tagline: "圖靈證書（Turing Certs）正在世界解決造假問題，透過區塊鏈為所有人建立一個數位身分與歷程檔案。目前已經有 9 個國家與地區的 120 間的政府、學校...",
    description:
      "圖靈證書（Turing Certs）正在世界解決造假問題，透過區塊鏈為所有人建立一個數位身分與歷程檔案。目前已經有 9 個國家與地區的 120 間的政府、學校、機構開始使用我們的數位憑證工具，發行上萬張的數位證書，解決畢業證書、專業能力證明、不動產合約書、農產品歷程、綠電憑證、碳權憑證。讓我們一起建立一個無紙化、安全隱私、100% 零碳數位化的未來。",
    ethereumAddress: "0x0000000000000000000000000000000000000004",
    website: "https://certs.turingchain.tech/",
    thumbnailImageLink:
      "https://static.wixstatic.com/media/d21407_13ec422f15f74074b12b360e99abb052~mv2.png/v1/fill/w_200,h_200,al_c,q_85,usm_0.66_1.00_0.01,enc_auto/Logo-2.png",
    logoCdnUrl:
      "https://static.wixstatic.com/media/d21407_13ec422f15f74074b12b360e99abb052~mv2.png/v1/fill/w_200,h_200,al_c,q_85,usm_0.66_1.00_0.01,enc_auto/Logo-2.png",
    bannerImageLink:
      "https://static.wixstatic.com/media/d21407_13ec422f15f74074b12b360e99abb052~mv2.png/v1/fill/w_200,h_200,al_c,q_85,usm_0.66_1.00_0.01,enc_auto/Logo-2.png",
  },
  {
    projectName: "FinTech大聯盟",
    tagline: "FinTech大聯盟旨在是透過履行社會責任，了解人民真實需求，作為銜接人民與政府之監理協作及監理溝通之橋樑，並透過政府授權或合作來提前反映爭點...",
    description:
      "FinTech大聯盟旨在是透過履行社會責任，了解人民真實需求，作為銜接人民與政府之監理協作及監理溝通之橋樑，並透過政府授權或合作來提前反映爭點，降低未來新創與沙盒試驗之難度，同時因為教育之落實，理論與實作之經驗取得，金融科技教育得以向下普遍扎根。",
    ethereumAddress: "0x0000000000000000000000000000000000000003",
    website: "https://presidential-hackathon.mic.org.tw/2020/ProposedContent.aspx",
    thumbnailImageLink:
      "https://static.wixstatic.com/media/nsplsh_3049566f703576344d4d55~mv2_d_4139_2759_s_4_2.jpg/v1/fill/w_200,h_200,al_c,q_80,usm_0.66_1.00_0.01,enc_auto/Image%20by%20Jonas%20Leupe.jpg",
    logoCdnUrl:
      "https://static.wixstatic.com/media/nsplsh_3049566f703576344d4d55~mv2_d_4139_2759_s_4_2.jpg/v1/fill/w_200,h_200,al_c,q_80,usm_0.66_1.00_0.01,enc_auto/Image%20by%20Jonas%20Leupe.jpg",
    bannerImageLink:
      "https://static.wixstatic.com/media/nsplsh_3049566f703576344d4d55~mv2_d_4139_2759_s_4_2.jpg/v1/fill/w_200,h_200,al_c,q_80,usm_0.66_1.00_0.01,enc_auto/Image%20by%20Jonas%20Leupe.jpg",
  },
  {
    projectName: "海闊天空隊",
    tagline: "我們是一群熱愛海洋的人們，來自於學校、企業、NGOs、相關政府單位，我們共同看見台灣的海洋面臨著危險，平常一起參與淨灘的活動中...",
    description:
      "我們是一群熱愛海洋的人們，來自於學校、企業、NGOs、相關政府單位，我們共同看見台灣的海洋面臨著危險，平常一起參與淨灘的活動中，發現海洋廢棄物可以重複再利用，經過企業夥伴們的嘗試，提出藍色經濟循環，希望將更多海廢清出大海，減少對海洋持續的破壞，並將每個環節都上鏈紀錄，為我們的海洋環境作出一些努力及貢獻。",
    ethereumAddress: "0x0000000000000000000000000000000000000002",
    website: "-",
    thumbnailImageLink:
      "https://static.wixstatic.com/media/d21407_1e84e5929bdf4500ac5d96905d3e44f8~mv2.png/v1/fill/w_200,h_200,al_c,q_85,usm_0.66_1.00_0.01,enc_auto/%E6%B5%B7%E9%97%8A%E5%A4%A9%E7%A9%BA-Logo.png",
    logoCdnUrl:
      "https://static.wixstatic.com/media/d21407_1e84e5929bdf4500ac5d96905d3e44f8~mv2.png/v1/fill/w_200,h_200,al_c,q_85,usm_0.66_1.00_0.01,enc_auto/%E6%B5%B7%E9%97%8A%E5%A4%A9%E7%A9%BA-Logo.png",
    bannerImageLink:
      "https://static.wixstatic.com/media/d21407_1e84e5929bdf4500ac5d96905d3e44f8~mv2.png/v1/fill/w_200,h_200,al_c,q_85,usm_0.66_1.00_0.01,enc_auto/%E6%B5%B7%E9%97%8A%E5%A4%A9%E7%A9%BA-Logo.png",
  },

  {
    projectName: "街道醫生",
    tagline: "街道醫生團隊透過「全民參與街道改善決策方案平台」建置與民眾溝通的管道，藉由人行道現況、社經環境資料的大數據疊加分析以及民眾參與...",
    description:
      "街道醫生團隊透過「全民參與街道改善決策方案平台」建置與民眾溝通的管道，藉由人行道現況、社經環境資料的大數據疊加分析以及民眾參與，找出最迫切需要改善之路段。我們結合社福團體-身心障礙者聯盟、中華視障聯盟的鞭策，政府單位-內政部營建署的資源及補助機制、新北市政府的案件配合執行，產業界-鼎漢工程顧問公司、台科大資工系的技術指導，更結合民眾倡議並通過中央政府經費協助，形成街道永續安全的共識，逐一排除街道步行阻礙，打通街道經脈，讓民眾都能夠通行無礙。",
    ethereumAddress: "0x0000000000000000000000000000000000000001",
    website: "-",
    thumbnailImageLink:
      "https://static.wixstatic.com/media/d21407_2d4a781193a248ba9f49fa0cdef3b66f~mv2.png/v1/fill/w_200,h_200,al_c,q_85,usm_0.66_1.00_0.01,enc_auto/%E8%A1%97%E9%81%93%E9%86%AB%E7%94%9Flogo.png",
    logoCdnUrl:
      "https://static.wixstatic.com/media/d21407_2d4a781193a248ba9f49fa0cdef3b66f~mv2.png/v1/fill/w_200,h_200,al_c,q_85,usm_0.66_1.00_0.01,enc_auto/%E8%A1%97%E9%81%93%E9%86%AB%E7%94%9Flogo.png",
    bannerImageLink:
      "https://static.wixstatic.com/media/d21407_2d4a781193a248ba9f49fa0cdef3b66f~mv2.png/v1/fill/w_200,h_200,al_c,q_85,usm_0.66_1.00_0.01,enc_auto/%E8%A1%97%E9%81%93%E9%86%AB%E7%94%9Flogo.png",
  },
]

export const deployedContracts = {"PoseidonT3":"0xc447A4a0c7e10a0fE84DBA4cfA09475f88F93E84","PoseidonT4":"0x4528E3B42610E9A88078513d25779dd5711c0D78","PoseidonT5":"0x51D67B72ccA1Ec6783E9cb5Ddb9Aa056e30b012e","PoseidonT6":"0x3C9e6cd399833037e3646c0d036f0B71061BE437","GrantRoundFactory":"0x58990B6bC81f22c826a78eC005593803c889389d","PollFactory":"0xCa7715561aD095265bF238A936781183699E3053","MessageAqFactory":"0xD29a8D3bd501F15a90a68E51E538415773Fc6603","MessageAqFactoryGrants":"0x085d88E7949F18df81Dbc2f69042f6c9C7fD1775","SimpleHackathon":"0xf6E0cd98e249Ec81e2a5eCdc310853BF130Ceb20","VKRegistry":"0x2a69B6e725D315439d709EaF3FfDD4c65ad7A142","BaseERC20Token":"0x77e5Cf1aB9C3ef8963bbE2002d9dfcB9369f857a","MockVerifier":"0xE779777AfFD3f9Ecc5c6762a9812a03d0BE28f34","PollProcessorAndTallier":"0xD88EA95f75E75258E11295A21F78244A7aD7a0d2","QFI":"0xB321CA3c61B7760eB2B62fE19Fef3BF37C356D64"}

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
  "macipk.9713a67022173b02556c2f7f4ae0f8fb184aa754df61cce2ad9679bba4c60a19",
  "macipk.09952db43685010863d9980fd41bfaa1b961d1f9859e191a6f282de33a66c996",
  "macipk.a3ad7b1b4f99502c2c77905a518b22d425464ff2662d3d57ea791e09c027ef2e",
  "macipk.f51b42388a699c781c14b6e3fcdaa2312ae9e0e2ef52121a650ee8520ffad18b",
  "macipk.9e840650a891a85f5240aaf4681f6f7f0d4e72d1edc219f98bdce9ecc04457a7",
  "macipk.9aa834dbdc17b8c6bff3217e2d0c71166687ce37d829abf4640723fc5ea31f0a",
]
