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
    projectName: "守護者聯盟2.0",
    tagline:
      "我們是「守護者聯盟2.0」，分別是由公、私部門及NGO共同組成的團隊， 我們的理念是運用科技，結合民間彼此的力量來配合政府，一同守護社會安...",
    description:
      "我們是「守護者聯盟2.0」，分別是由公、私部門及NGO共同組成的團隊， 我們的理念是運用科技，結合民間彼此的力量來配合政府，一同守護社會安全，用實際的行動用心守護我們珍視的每一個人，所以我們提出了「安居永續平安福」計畫，希望能達成全民安居、服務永續、平安是福的目標",
    ethereumAddress: "0x766F38b58bfBFAe53F52cDeEa7e347A9A1E9dFe2",
    website: "https://www.facebook.com/SFGuardians",
    thumbnailImageLink:
      "https://static.wixstatic.com/media/d21407_6655af4ef85d490bac38703af0170e5a~mv2.png/v1/fill/w_200,h_200,al_c,q_85,usm_0.66_1.00_0.01,enc_auto/%E5%AE%88%E8%AD%B7%E8%80%85.png",
    logoCdnUrl:
      "https://static.wixstatic.com/media/d21407_6655af4ef85d490bac38703af0170e5a~mv2.png/v1/fill/w_200,h_200,al_c,q_85,usm_0.66_1.00_0.01,enc_auto/%E5%AE%88%E8%AD%B7%E8%80%85.png",
    bannerImageLink:
      "https://static.wixstatic.com/media/d21407_6655af4ef85d490bac38703af0170e5a~mv2.png/v1/fill/w_200,h_200,al_c,q_85,usm_0.66_1.00_0.01,enc_auto/%E5%AE%88%E8%AD%B7%E8%80%85.png"
  },
  {
    projectName: "文譯之間",
    tagline:
      "文譯之間團隊，有不同領域的工程師：醫院、半導體業、資訊安全、系統整合等，協力合作夥伴有公部門與NGO。這兩年疫情影響，醫院配合政策常需要快速更新當下的公告...",
    description:
      "文譯之間團隊，有不同領域的工程師：醫院、半導體業、資訊安全、系統整合等，協力合作夥伴有公部門與NGO。這兩年疫情影響，醫院配合政策常需要快速更新當下的公告，通常會透過圖卡的形式發佈，以利民眾轉貼分享，這也是目前公部門政策宣導最常用的一種形式，然而，圖卡不利於翻譯、被搜尋等，而我們提供一種更友善的服務。",
    ethereumAddress: "0xeE52564be3c2D562C8a4Ca7D3311B790154f9649",
    website: "https://inkrosetta.tw/",
    thumbnailImageLink:
      "https://static.wixstatic.com/media/d21407_0da45008ef03415daaa6f6411490e8fa~mv2.png/v1/fill/w_200,h_200,al_c,q_85,usm_0.66_1.00_0.01,enc_auto/inkrosetta_logo.png",
    logoCdnUrl:
      "https://static.wixstatic.com/media/d21407_0da45008ef03415daaa6f6411490e8fa~mv2.png/v1/fill/w_200,h_200,al_c,q_85,usm_0.66_1.00_0.01,enc_auto/inkrosetta_logo.png",
    bannerImageLink:
      "https://static.wixstatic.com/media/d21407_0da45008ef03415daaa6f6411490e8fa~mv2.png/v1/fill/w_200,h_200,al_c,q_85,usm_0.66_1.00_0.01,enc_auto/inkrosetta_logo.png"
  },
  {
    projectName: "CEASEFIRE",
    tagline:
      "解方主要效益：使林火發生後在最短時間偵測到，火勢初生即有效抑制和撲滅，使森林不受破壞繼續發揮其生態及固碳功能。建議林務局成立林火消防救護基金會...",
    description:
      "解方主要效益：使林火發生後在最短時間偵測到，火勢初生即有效抑制和撲滅，使森林不受破壞繼續發揮其生態及固碳功能。建議林務局成立林火消防救護基金會，作為土地活化平台，釋出國家未充分使用林地，供企業認養。基金會成員，由產官學民共同參與，Ceasefire團隊自願為創始成員，為竹林地活化展開新的合作模式。",
    ethereumAddress: "0x1F1c209bdCd4AF1944Df1706005c3DF4DF2A8bc5",
    website: "https://www.linkedin.com/in/lin-harrison-378550b1/",
    thumbnailImageLink:
      "https://static.wixstatic.com/media/d21407_9033d1cd3ca0438aaf7f389c44c4d989~mv2.png/v1/fill/w_200,h_200,al_c,q_85,usm_0.66_1.00_0.01,enc_auto/ceasefire%20logo.png",
    logoCdnUrl:
      "https://static.wixstatic.com/media/d21407_9033d1cd3ca0438aaf7f389c44c4d989~mv2.png/v1/fill/w_200,h_200,al_c,q_85,usm_0.66_1.00_0.01,enc_auto/ceasefire%20logo.png",
    bannerImageLink:
      "https://static.wixstatic.com/media/d21407_9033d1cd3ca0438aaf7f389c44c4d989~mv2.png/v1/fill/w_200,h_200,al_c,q_85,usm_0.66_1.00_0.01,enc_auto/ceasefire%20logo.png"
  },
  {
    projectName: "透明足跡",
    tagline:
      "綠色公民行動聯盟透明足跡計畫致力於通過資訊公開與應用，推動企業永續轉型。目前推出的工具有:監督企業環境裁罰紀錄的透明足跡網站...",
    description:
      "綠色公民行動聯盟透明足跡計畫致力於通過資訊公開與應用，推動企業永續轉型。目前推出的工具有:監督企業環境裁罰紀錄的透明足跡網站、消費者環境運動APP掃了再買、整合企業永續資料的ESG 檢測儀、以及檢視企業減碳承諾與成效的淨零路徑模擬器。",
    ethereumAddress: "0x504E31a144e4B17DDcd07AC05a429d6eA1C208e4",
    website: "https://thaubing.gcaa.org.tw/",
    thumbnailImageLink:
      "https://static.wixstatic.com/media/d21407_d5ece5e722d34464b8389bdbf1675b47~mv2.png/v1/fill/w_200,h_200,al_c,q_85,usm_0.66_1.00_0.01,enc_auto/%E9%80%8F%E6%98%8E%E8%B6%B3%E8%B7%A1-LOGO.png",
    logoCdnUrl:
      "https://static.wixstatic.com/media/d21407_d5ece5e722d34464b8389bdbf1675b47~mv2.png/v1/fill/w_200,h_200,al_c,q_85,usm_0.66_1.00_0.01,enc_auto/%E9%80%8F%E6%98%8E%E8%B6%B3%E8%B7%A1-LOGO.png",
    bannerImageLink:
      "https://static.wixstatic.com/media/d21407_d5ece5e722d34464b8389bdbf1675b47~mv2.png/v1/fill/w_200,h_200,al_c,q_85,usm_0.66_1.00_0.01,enc_auto/%E9%80%8F%E6%98%8E%E8%B6%B3%E8%B7%A1-LOGO.png"
  },
  {
    projectName: "Turing Certs",
    tagline:
      "圖靈證書（Turing Certs）正在世界解決造假問題，透過區塊鏈為所有人建立一個數位身分與歷程檔案。目前已經有 9 個國家與地區的 120 間的政府、學校...",
    description:
      "圖靈證書（Turing Certs）正在世界解決造假問題，透過區塊鏈為所有人建立一個數位身分與歷程檔案。目前已經有 9 個國家與地區的 120 間的政府、學校、機構開始使用我們的數位憑證工具，發行上萬張的數位證書，解決畢業證書、專業能力證明、不動產合約書、農產品歷程、綠電憑證、碳權憑證。讓我們一起建立一個無紙化、安全隱私、100% 零碳數位化的未來。",
    ethereumAddress: "0x40CFa7260e67e118575b3D62db126C77fa1B6742",
    website: "https://certs.turingchain.tech/",
    thumbnailImageLink:
      "https://static.wixstatic.com/media/d21407_13ec422f15f74074b12b360e99abb052~mv2.png/v1/fill/w_200,h_200,al_c,q_85,usm_0.66_1.00_0.01,enc_auto/Logo-2.png",
    logoCdnUrl:
      "https://static.wixstatic.com/media/d21407_13ec422f15f74074b12b360e99abb052~mv2.png/v1/fill/w_200,h_200,al_c,q_85,usm_0.66_1.00_0.01,enc_auto/Logo-2.png",
    bannerImageLink:
      "https://static.wixstatic.com/media/d21407_13ec422f15f74074b12b360e99abb052~mv2.png/v1/fill/w_200,h_200,al_c,q_85,usm_0.66_1.00_0.01,enc_auto/Logo-2.png"
  },
  {
    projectName: "FinTech大聯盟",
    tagline:
      "FinTech大聯盟旨在是透過履行社會責任，了解人民真實需求，作為銜接人民與政府之監理協作及監理溝通之橋樑，並透過政府授權或合作來提前反映爭點...",
    description:
      "FinTech大聯盟旨在是透過履行社會責任，了解人民真實需求，作為銜接人民與政府之監理協作及監理溝通之橋樑，並透過政府授權或合作來提前反映爭點，降低未來新創與沙盒試驗之難度，同時因為教育之落實，理論與實作之經驗取得，金融科技教育得以向下普遍扎根。",
    ethereumAddress: "0xa436EE110D177cEc4cE18AAA8f04C82A2C1be74C",
    website: "https://presidential-hackathon.mic.org.tw/2020/ProposedContent.aspx",
    thumbnailImageLink:
      "https://static.wixstatic.com/media/nsplsh_3049566f703576344d4d55~mv2_d_4139_2759_s_4_2.jpg/v1/fill/w_200,h_200,al_c,q_80,usm_0.66_1.00_0.01,enc_auto/Image%20by%20Jonas%20Leupe.jpg",
    logoCdnUrl:
      "https://static.wixstatic.com/media/nsplsh_3049566f703576344d4d55~mv2_d_4139_2759_s_4_2.jpg/v1/fill/w_200,h_200,al_c,q_80,usm_0.66_1.00_0.01,enc_auto/Image%20by%20Jonas%20Leupe.jpg",
    bannerImageLink:
      "https://static.wixstatic.com/media/nsplsh_3049566f703576344d4d55~mv2_d_4139_2759_s_4_2.jpg/v1/fill/w_200,h_200,al_c,q_80,usm_0.66_1.00_0.01,enc_auto/Image%20by%20Jonas%20Leupe.jpg"
  },
  {
    projectName: "海闊天空隊",
    tagline:
      "我們是一群熱愛海洋的人們，來自於學校、企業、NGOs、相關政府單位，我們共同看見台灣的海洋面臨著危險，平常一起參與淨灘的活動中...",
    description:
      "我們是一群熱愛海洋的人們，來自於學校、企業、NGOs、相關政府單位，我們共同看見台灣的海洋面臨著危險，平常一起參與淨灘的活動中，發現海洋廢棄物可以重複再利用，經過企業夥伴們的嘗試，提出藍色經濟循環，希望將更多海廢清出大海，減少對海洋持續的破壞，並將每個環節都上鏈紀錄，為我們的海洋環境作出一些努力及貢獻。",
    ethereumAddress: "0x45b11644013D1b34C2ba8da474b605A6C66a6446",
    website: "-",
    thumbnailImageLink:
      "https://static.wixstatic.com/media/d21407_1e84e5929bdf4500ac5d96905d3e44f8~mv2.png/v1/fill/w_200,h_200,al_c,q_85,usm_0.66_1.00_0.01,enc_auto/%E6%B5%B7%E9%97%8A%E5%A4%A9%E7%A9%BA-Logo.png",
    logoCdnUrl:
      "https://static.wixstatic.com/media/d21407_1e84e5929bdf4500ac5d96905d3e44f8~mv2.png/v1/fill/w_200,h_200,al_c,q_85,usm_0.66_1.00_0.01,enc_auto/%E6%B5%B7%E9%97%8A%E5%A4%A9%E7%A9%BA-Logo.png",
    bannerImageLink:
      "https://static.wixstatic.com/media/d21407_1e84e5929bdf4500ac5d96905d3e44f8~mv2.png/v1/fill/w_200,h_200,al_c,q_85,usm_0.66_1.00_0.01,enc_auto/%E6%B5%B7%E9%97%8A%E5%A4%A9%E7%A9%BA-Logo.png"
  },
  {
    projectName: "街道醫生",
    tagline:
      "街道醫生團隊透過「全民參與街道改善決策方案平台」建置與民眾溝通的管道，藉由人行道現況、社經環境資料的大數據疊加分析以及民眾參與...",
    description:
      "街道醫生團隊透過「全民參與街道改善決策方案平台」建置與民眾溝通的管道，藉由人行道現況、社經環境資料的大數據疊加分析以及民眾參與，找出最迫切需要改善之路段。我們結合社福團體-身心障礙者聯盟、中華視障聯盟的鞭策，政府單位-內政部營建署的資源及補助機制、新北市政府的案件配合執行，產業界-鼎漢工程顧問公司、台科大資工系的技術指導，更結合民眾倡議並通過中央政府經費協助，形成街道永續安全的共識，逐一排除街道步行阻礙，打通街道經脈，讓民眾都能夠通行無礙。",
    ethereumAddress: "0x1c8AC6b9a0A5a363f076bA7C140EE1c98B923eF0",
    website: "-",
    thumbnailImageLink:
      "https://static.wixstatic.com/media/d21407_2d4a781193a248ba9f49fa0cdef3b66f~mv2.png/v1/fill/w_200,h_200,al_c,q_85,usm_0.66_1.00_0.01,enc_auto/%E8%A1%97%E9%81%93%E9%86%AB%E7%94%9Flogo.png",
    logoCdnUrl:
      "https://static.wixstatic.com/media/d21407_2d4a781193a248ba9f49fa0cdef3b66f~mv2.png/v1/fill/w_200,h_200,al_c,q_85,usm_0.66_1.00_0.01,enc_auto/%E8%A1%97%E9%81%93%E9%86%AB%E7%94%9Flogo.png",
    bannerImageLink:
      "https://static.wixstatic.com/media/d21407_2d4a781193a248ba9f49fa0cdef3b66f~mv2.png/v1/fill/w_200,h_200,al_c,q_85,usm_0.66_1.00_0.01,enc_auto/%E8%A1%97%E9%81%93%E9%86%AB%E7%94%9Flogo.png"
  },
  {
    projectName: "事實查核平台",
    tagline:
      "事實查核預測市場平台（Decentralized Fact Auditor）針對此問題提出了解決方案，希望以去中心化預測市場的方式（預測市場是一種開放大眾針對單一事件進行判斷與下注的活動 ...",
    description:
      "事實查核預測市場平台（Decentralized Fact Auditor）針對此問題提出了解決方案，希望以去中心化預測市場的方式（預測市場是一種開放大眾針對單一事件進行判斷與下注的活動。判斷正確即可贏得籌碼，判斷失敗便會失去籌碼），透過大眾的力量即時分辨資訊的真偽： 「藉由預測市場的運作原理，將能在市場作用下產生對於單一客觀事實相當精確的指標。讓民眾可以藉由該指標作為即時的真偽判斷依據，在事實查核報告完成前即可在第一時間得知來自群眾智慧的參考資訊。」",
    ethereumAddress: "0xB2AB55b15d0B03DC1c89eFcBefC6B80D09C05fBB",
    website: "-",
    thumbnailImageLink:
      "https://static.wixstatic.com/media/d21407_26884feb964446689187bbba7035ba71~mv2.png/v1/fill/w_400,h_400,al_c,q_85,usm_0.66_1.00_0.01,enc_auto/DFA_logo.png",
    logoCdnUrl:
      "https://static.wixstatic.com/media/d21407_26884feb964446689187bbba7035ba71~mv2.png/v1/fill/w_400,h_400,al_c,q_85,usm_0.66_1.00_0.01,enc_auto/DFA_logo.png",
    bannerImageLink:
      "https://static.wixstatic.com/media/d21407_26884feb964446689187bbba7035ba71~mv2.png/v1/fill/w_400,h_400,al_c,q_85,usm_0.66_1.00_0.01,enc_auto/DFA_logo.png"
  }
]

export const deployedContracts = {
  PoseidonT3: "0xd6E3F1b7D098ED668b37A3493AaA78c3DB0A9175",
  PoseidonT4: "0x99c42C6D9C6C1E31D72D0A85ff0B66e06933133b",
  PoseidonT5: "0x14558e7a08B9dE5D5Be1AC72BC6CCaDDF70868B6",
  PoseidonT6: "0x43475437385E5491807d9bddc4F908770233F122",
  GrantRoundFactory: "0x41f16A3C47580B8391C7Ea405d7530b5d08f6243",
  PollFactory: "0x9AdF4b8f9ddA5d1065feB714C4e48aDF58881c08",
  MessageAqFactory: "0xe20982eb383aDEe6Ad6240D86FDc2b220Ff296ba",
  MessageAqFactoryGrants: "0x86829f67c77489781642daBF330018d204158bB2",
  SimpleHackathon: "0x9F5220ba8a8DAb34540534eA58CD3AaDd3c256eB",
  VKRegistry: "0xC76d35f2000550bfBB0b1C9c4B2038b41cE279e8",
  BaseERC20Token: "0x6C38dDB7B7C1a2cB05C33fada53CD2Fa19D0fB6E",
  MockVerifier: "0x1E23C8B4DbDe09063854c44937aE7264E3d6b7A6",
  PollProcessorAndTallier: "0x340502DaE5105D421aA0890C88a4b523723CC44D",
  QFI: "0x342B55688aD07AFEFCF30069fAEA4213eFd09ce1"
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
  "macipk.9713a67022173b02556c2f7f4ae0f8fb184aa754df61cce2ad9679bba4c60a19",
  "macipk.09952db43685010863d9980fd41bfaa1b961d1f9859e191a6f282de33a66c996",
  "macipk.a3ad7b1b4f99502c2c77905a518b22d425464ff2662d3d57ea791e09c027ef2e",
  "macipk.f51b42388a699c781c14b6e3fcdaa2312ae9e0e2ef52121a650ee8520ffad18b",
  "macipk.9e840650a891a85f5240aaf4681f6f7f0d4e72d1edc219f98bdce9ecc04457a7",
  "macipk.9aa834dbdc17b8c6bff3217e2d0c71166687ce37d829abf4640723fc5ea31f0a",
  "macipk.e73483ce9fa9d2e91c2092ce3dcec7f0070f10e3715bde4bbf4bb0096cc386a0",
  "macipk.f60330b4ce3720a55fb705db8eefa5d4b80c03ce4efb0fa1eb9b5ee98ddc1b9f",
  "macipk.27fe842cb524ead3bc7d68035ec6522baa482fd1248cf15cc3fb4e0988e0f81c",
  "macipk.dd7a4a5139a011b2512bb472e1e08524042275f3b9b38b638ed389429ce6b922",
  "macipk.8a2cc014e16aea58f7a35c1265c23957317be1e0c259901e064113d022cc64ae",
  "macipk.4793f088578fb85f7108f67b3812ad907dc11b21bf57ee4215ed3896a89cfb20",
  "macipk.9ba263f65b5d69ef1323aaad15d021653ebf28683e46af8c92dccb89c654bf21",
  "macipk.4f4964ae48bf8ebeecdce4e6ecf7f6122864c2d3884316b8f5c6cad4b17ac4ac",
  "macipk.011134bc59010e410204ae67c584d16d7e45b63b18bc7c59fc59ba5dcf5f3791",
  "macipk.c4cc5667761a058fab3226e0e7311c0d6212b6897d065a462c738eced97afdaf",
  "macipk.94dd9a2575bcb072e0c08522fb8fed5db9807ecf6346f69772727be0a415c71e",
  "macipk.2a0a0dcff0933a3ac75327010ab5c53d2fbd8a451096adc0dba34a458812d78b",
  "macipk.a65e0f837dc046df3891bb00ea36ad6a69172c56ecbeb0cc58d6449f40da351e",
  "macipk.2ab3fb7773a329d968365324805e1d028caeff384a08431af70afba8669d4307",
  "macipk.c597c0a964a7cb9a6427964d9d132287d97725d4c3cdaba6dbac3684c286c008",
  "macipk.dc3de50445eb9101e3d5595c7971a36a289d29db922df7c887ff351f08d08c08",
  "macipk.f1e6199b33371cea1902ea4d5f8c77f2c76b49b3984071e2a98f5b2043faa109",
  "macipk.0865da6910388e1d3c237e9eaab90a1f4f43044445cc1a0a9e563295d7f29e81",
  "macipk.369994240fe7518d10c5cd65d05c69c1e4bceb6d3206fa33399c34236801b489",
  "macipk.a240ffc0f9244741bbffd0d83dc49752586e3dce9c86989cb023b8bc14a3b029",
  "macipk.a91e302d066e44e08bd4916c95364133d15680e5b1082b817ff8977a7e3d0d12",
  "macipk.456826786440846e6a19d8991b969b3c6114343c1e9372f23cece9937e297716",
  "macipk.66fa3278f04b53efafcfebec673fbe96765bfcca06b8039165c80bdc8c935224",
  "macipk.3488c312524c3e228f413ef2226ff4d54fb69199be60b69c42c1f8daca0482a6",
  "macipk.c5a5f010c94aff9c08756ae55777e584d5f471ac543f0b1594b354be455ccb89",
  "macipk.48c2d5d8a440dc2c6a80f2b758b1a5ab32890242cb202a3ab58d2d09c2024310",
  "macipk.fb27d6872bda501ca966451300c1f54d3716ee869986920d8edb9535e5aa9588",
  "macipk.9774d62ba567957fb18eeb1d8b987f343dcd0b7ffe16492131eb7f873a2b94a3",
  "macipk.3a0e2c3eb7c161421cdcb846ef072051e7aa392e56e2d6ed1944bbc012232580",
  "macipk.dd39ec602c4f0b1fc811579f526bc1208fd6ddac66cae4afee431958d82d6390",
  "macipk.82c02b46ec7322873ec215191d01b11bb9f02642f1fa5bf18670759a565d3e1e",
  "macipk.5c1553be47fa5d749d811b70e0a9f6ba3a383a4725760b7f6e07c79d06e80996",
  "macipk.bf6ee17d455e7ade314dd4b876b1858a240c9422b7eca920b4736ec7d193a51d",
  "macipk.2a916e7b6561981ad34713055b42825b427c4feb2010d2088830fdb0c97d7b12",
  "macipk.05c41d9ca95bd2a2f2a991a687c16a1493d825b5d6dcf1dfd55e135f2333018c",
  "macipk.8fa1e9032193a1ef5dd54a8c0719a9c2c376bfb7f628c947f014256461cf360c",
  "macipk.e61b34ae20beacee138a0145973d19134bace82ee93085e6d1a3acf81e60e897",
  "macipk.d5bf2766e7d12707faa6e4294c54afb7a57334adf09f81e2d20efd8bcb1f029a",
  "macipk.31b514aee0d6b3b03ab83a3d9a38f863042aa45acc6303aa894bea6739e13025",
  "macipk.0d49a46f374b22d536972dffe849022e1920b5dd4f1de9670c27057458663730",
  "macipk.6f84133318be730c6cd0badca7f78d5816613c2ab6f452cd0151de4b724f77a2",
  "macipk.c97aabea966820265d0f0bb41216fb1f8e093b228174b8f8178c0f69a0d40a11",
  "macipk.f777cb170a82f901fb10779d2985484a610536d24cb23a81ac4d6b94db293b22",
  "macipk.3e47d735ccc7792264f436822d4d7da47b7d059d406c1fe1f41d7dc319f32325",
  "macipk.13bc4433383afc6cd58b05505a2c6a10b6cc8b1ce6d1ab987b14599d2a0cc60d",
  "macipk.346edec45c040d68c1c42833904604f720eafeeec00ac4c5cdf11a143b4ae1aa",
  "macipk.9a2c35334f166e57bef86978aef31d295a714d6ecb3809ce532a46691097078d",
  "macipk.3338685a131adde738eba1777d4a46b9d2942a7ac279dce8b5e10a08ed017313",
  "macipk.16490ec44b000e31642efa307782b0f875dc6e11ecd56ad92fa89d7f7e494ea9",
  "macipk.eb114296c9a4cc9d3a950517e1a7406b5a54d7c6b5c65f420c9879f9d538b3a3",
  "macipk.097894c92dce17c768af4a93dd1b7f8848111d66c15846c9d5b8d91702b6d12e",
  "macipk.cdebe64d260b4fc5d7d5e05137d8d7c8914d91630476cd4b1adda97f360e6e07",
  "macipk.1ed96fdac4d28054677980c7806ef9d03b7d0d724b2eb9a42460c7cc5cc9c02b",
  "macipk.2c091d8238c2aae9af7b6aaa2cea2d4344e2d039f11b8cca112b7d92a1f0e190",
  "macipk.a46dddd849db5cef8c621fe6cfa2324273f1c116f3f7929124701d1f7a39ac0a",
  "macipk.77f069dba1a9ed213f088816beb5dbc38fd621c5dfa66b3d7dd36f94e0d24998",
  "macipk.72cde849ae6550d0968a1d9d114e41e53400e61c1e854662769e9aa7f4818b13",
  "macipk.b3fc3b128436afa54b6a966039ea741a15796615b23c2a81b9eadfcfd2376e03",
  "macipk.5c56b75924709abbf949cd3d26be96e7a1b4c24068268b49f9c1cd111f117916",
  "macipk.2a2d14f93272dd2ad434a739f687010c780270d5cea42c981081f30764102696",
  "macipk.78de0049daf0d152c9a58cb56947a6dc4882f86ecccd9535733931d0abae762a",
  "macipk.abb80d8b8a09feb0bcc52d725f19b84f3e2ec4c27d640b618d0b6ffd972ca9a6",
  "macipk.0d2ce0347f6e9b3a364d75b76969303e0ce149a0196dff8be2603e9ef5a16987",
  "macipk.7e41a2005ec781182ca6908905af431bed3a54db1a8bbca03d027384e86ca506",
  "macipk.f90530f8f88b23d491cefbb1f061a5aba5cce1f8345087db30c8e56c4a298317",
  "macipk.443e3e33a5e6b0bd5eba3c8685a28c4b0eb49e9ea7d4d8e35dd861f87fd52786",
  "macipk.04d1089717d012bdaadf9ac59549962d29c768e938145617f4c61ac017993e1c",
  "macipk.1de4039d1fdb881a6d49abc93ba9da96811c0b6890b3abed0ff68466d31d9e2b",
  "macipk.681e5b98297125858f07cdb99fcbb0cf336842499228ec4789134c8ab622039f",
  "macipk.c7e33de0113728bb20f8a16fb4e1e09c63becf82714b867358bd99f28e6cc82b",
  "macipk.3ab1b1b0b3d6f5f22632e0d33d99aa2300cb1b9bd290771209d0cf8d3e06488b",
  "macipk.dbb81b67d5ab70f21862537efef5f89fefd0bcddb788eb31e4cee3ec2623bc2b",
  "macipk.00f9ba9bef5c329c6f5966a1da559e63556e61bdb75cbeaefb19cdba2e2d609f",
  "macipk.23e8592aa550f260b837f263d1cbd2b038a8bfcef19f703f2a5449f93c96cf15"
]
