let projects = [
  {
    projectName: "Zero-knowledge order book system (ZK-OBS)",
    tagline:
      "使用零知識證明技術解決以太坊上擴容問題，建立 zk 鏈下訂單簿交易系統，讓使用者能夠在 DeFi 中享受無 gas fee 且最高效率的交易",
    description:
      "目前在以太坊上主流的金融系統都是以流動池形式為主，像是 Uniswap, Aave, Curve 等等。但不可否認的是訂單簿系統才是更為有效率的，像是中心化交易所 Binance, FTX, Coinbase 等等交易量都是 DEX 的 10-100 倍，原因在於訂單簿系統對用戶而言有著更好的體驗（無滑點、深度夠等等），相較之下在原生以太坊上高昂的 gas fee 很難使用訂單簿及造市功能達到此優點。上述主流的 DeFi 幾乎都發跡於 2017-2018 年，但隨著時間及技術的進步，透過 ZK 的擴容特性可以將訂單簿系統移至鏈下進行，讓使用者不必每次下單、改單都支付 gas fee，大幅提升了交易的效率，最後再使用 roll-up 一次更新大量數據回到鏈上，完美解決了以上問題，同時又能保障去中心化的特性。高效率的 zk 鏈下訂單簿系統將會是 DeFi 前進的一大步，解決了目前大多數項目都無法克服的問題，使 DeFi 更加蓬勃發展！",
    ethereumAddress: "0x4B933cD816C86783B116D070818C6FCDf5bfF17a",
    website: "",
    thumbnailImageLink:
      "https://dl.airtable.com/.attachments/cab26f2c556011ad7f7f49f5ae12acdf/569235a0/zk-manic-icon.png",
    logoCdnUrl:
      "https://dl.airtable.com/.attachments/cab26f2c556011ad7f7f49f5ae12acdf/569235a0/zk-manic-icon.png",
    bannerImageLink:
      "https://dl.airtable.com/.attachments/10b82eec776c863b53b961de06af10d8/537f0325/zk-manic-banner.png",
    recipientId: 1,
    id: "1",
  },
  {
    projectName: "Property Proof ",
    tagline:
      "如何在不洩漏錢包更多資訊(包含錢包地址，所持有的所有NFT，以及該系列NFT持有的細節)，去證明你擁有該NFT",
    description:
      "現今 NFT 的應用廣泛，不論是身分證明或是資產證明都是其中一環，在許多應用的場合下，或許不需要透露太多資訊，而只是需要證明你持有該NFT。例如 在Gamefi的NFT販售場景下， 賣方不想透露過多的資訊給買方，例如持有該系列NFT的數量等等，又或者在身份認證類的 NFT 項目，持有者並不想透露身份資訊，但又必須證明是屬於此身份證明的其中一員。",
    ethereumAddress: "0xDa8100177A09FC3CE3655B98bc1434a046AD5B0C",
    website: "",
    thumbnailImageLink:
      "https://dl.airtable.com/.attachments/4ad8dfdd5f53812f7faa53d3d8660235/de04430f/NewProject1.jpg",
    logoCdnUrl:
      "https://dl.airtable.com/.attachments/4ad8dfdd5f53812f7faa53d3d8660235/de04430f/NewProject1.jpg",
    bannerImageLink:
      "https://dl.airtable.com/.attachments/d84e7334dfa004df2b82c3c67514f251/04495e75/NewProject.jpg",
    recipientId: 2,
    id: "2",
  },
  {
    projectName: "Private Ownership of SBT",
    tagline:
      "具 “持有隱私性” 的SBT方案",
    description:
      "Soul Bounded Token (SBT) 是 Vitalik 在 Decentralized Society: Finding Web3's Soul 中提到的一個概念，簡言之就是類似一個 ERC721 代幣，但它無法交易（交易後會被燒毀），可以應用在教育、金融、驗證系統中。以教育為例，未來修課後可用 SBT 作為證明，在未來可以利用這個 SBT 來向其他機構驗證。但是 SBT 的其中一個問題是隱私性太低，很容易就洩漏 SBT 與 Address 間的關係，所以我們想利用 ZKP 解決此問題。",
    ethereumAddress: "0x5C61CB743bfDcA46E829e3e6f1D3B56Efbb56E20",
    website: "",
    thumbnailImageLink:
      "https://dl.airtable.com/.attachments/2791b408027438f501c83ef9fdda50c7/7b39e579/925A6BAD-F630-4056-B96A-AB8548FFD9F1.png",
    logoCdnUrl:
      "https://dl.airtable.com/.attachments/2791b408027438f501c83ef9fdda50c7/7b39e579/925A6BAD-F630-4056-B96A-AB8548FFD9F1.png",
    bannerImageLink:
      "https://dl.airtable.com/.attachments/f3fcb42ededcb6be4de279284609e95a/66bee568/stsci-01gcvndsa55pfhd0jp3jsekaz1.png",
    recipientId: 3,
    id: "3",
  },
  {
    projectName: "ZK-KYC",
    tagline:
      "通過zk-SNARK實現KYC平台",
    description:
      "建立一個最大的KYC平台，讓合作夥伴(如CEX、dApp)通過我們平台加速KYC流程，提升使用者體驗。使用者只要在我們平台進行完KYC，日後要使用我們合作夥伴平台上的服務時，合作夥伴通過我們平台提供的zk-SNARKs驗證該使用者KYC Level後給予使用者對應的身份，不僅可以縮短合作夥伴驗證KYC的時程，也可以讓使用者能夠更快地體驗合作夥伴所提供的服務。",
    ethereumAddress: "0x8569aa5D9632813efd5f5e32c5dd6083F2ecbEB3",
    website: "",
    thumbnailImageLink:
      "https://dl.airtable.com/.attachments/5f495238857729833d8cdb7525bf0664/8b72b9be/ZK-KYC.png",
    logoCdnUrl:
      "https://dl.airtable.com/.attachments/5f495238857729833d8cdb7525bf0664/8b72b9be/ZK-KYC.png",
    bannerImageLink:
      "https://dl.airtable.com/.attachments/3f242c8e704bc9fc544be44441bc7c06/76521c13.png",
    recipientId: 4,
    id: "4",
  },
  {
    projectName: "ZK-Ownable",
    tagline:
      "不公開地址也能證明自己是某個合約的擁有者，只要有 Proof 便能進行 onlyOwner 的操作。",
    description:
      "目前鏈上常用來做 admin 的合約有兩種，Ownable 或是 AccessControl，兩者因為都會直接曝露 address 而喪失 owner 的隱私。我們希望透過 ZKP 來取代 Ownable 的功能，並結合 Relayer 或是 PaymentMaster 來保護隱私。",
    ethereumAddress: "0xD2B567D47f4F997815E6CF33D8cF4344F968b830",
    website: "",
    thumbnailImageLink:
      "https://dl.airtable.com/.attachments/44e482ce082fa689aa2be16c82a18164/53079fd8/p9IU4k5.jpg",
    logoCdnUrl:
      "https://dl.airtable.com/.attachments/44e482ce082fa689aa2be16c82a18164/53079fd8/p9IU4k5.jpg",
    bannerImageLink:
      "https://dl.airtable.com/.attachments/1b76e08e73cb81324a623ea4ad4b1a8b/be41f002/HGdB3h7.png",
    recipientId: 5,
    id: "5",
  },
  {
    projectName: "ZK Conditioner",
    tagline:
      "用 ZKP 做匿名且即時的鏈上治理",
    description:
      "區塊鏈上的合約可以經由代幣質押或註冊後進入會員系統（一個神秘的 merkle tree），並每隔一段時間放出一個訊號去控制/修正治理參數。就像一支冷氣遙控器，房間裡的人都可以按升溫或降溫，如果每個人操作的頻率有限制（比方說十分鐘一次）的話，那麼可以說房間的溫度是眾人的共識（吧？) 舉例：穩定幣專案 MakerDAO 需要靠鏈上投票決定借款利率，治理代幣持有者可以存入 100 MKR 來得到一席資格，每一席一天可以投一次票來讓利息增加或減少 1bp，投票會即時生效，沒有人知道哪些人有投票，投了什麼。",
    ethereumAddress: "0xc1F9BB72216E5ecDc97e248F65E14df1fE46600a",
    website: "",
    thumbnailImageLink:
      "https://dl.airtable.com/.attachments/50597e6d9f04f05ce963b5912369933d/a512c939/Logo.png",
    logoCdnUrl:
      "https://dl.airtable.com/.attachments/50597e6d9f04f05ce963b5912369933d/a512c939/Logo.png",
    bannerImageLink:
      "https://dl.airtable.com/.attachments/f8475c00d69a3e272324318c2e6191c7/56f15dc3/Cover.png",
    recipientId: 6,
    id: "6",
  },
  {
    projectName: "ZK Ownership",
    tagline:
      "運用 ZKP 隱藏合約上的使用者地址，並讓使用者可用同一個私鑰和不同服務互動。",
    description:
      "使用者地址常會被設定在各個服務的合約上，像是 NFT owner, smart wallet owner & guardian 或是開發者常用的 contract owner，因為地址是透明地被存放合約上，容易被找出關聯性而成為攻擊的目標。此專案讓使用者在鏈下用私鑰計算出 ZKP，再帶入驗證合約後與上述服務互動，從而讓地址不會被明記在合約中，並且看不出各個服務是由同一把私鑰控制。",
    ethereumAddress: "0x200153f4D183A95D3fC88e772234a0e7031d9487",
    website: "",
    thumbnailImageLink:
      "https://dl.airtable.com/.attachments/bf74c2b7cad2c05d6ea009ad48d68437/0941e32f/Logo.png",
    logoCdnUrl:
      "https://dl.airtable.com/.attachments/bf74c2b7cad2c05d6ea009ad48d68437/0941e32f/Logo.png",
    bannerImageLink:
      "https://dl.airtable.com/.attachments/e9c53c0bba5874181869e315a0bcfb68/1f949074/Banner.png",
    recipientId: 7,
    id: "7",
  },

  {
    projectName: "Anonymous Stand-In",
    tagline:
      "透過建立匿名替身 (Anonymous Stand-In) 來進行如投票等操作.",
    description:
      "藉由登記替身需要押金, 以及讓 qualified user 提出恰一個登記替身的  zero-knowledge proof , 我們可以建立 qualified user 的一對一匿名替身. 之後用這組匿名替身操作就如同一般的 account, 不再需要 ZKP.",
    ethereumAddress: "0x6663bFba582b8A6228c33D4b732502Ce08f6b38C",
    website: "https://docs.google.com/presentation/d/1R4X_ZomQ8GphwbYTXpxzddm-YgorPQEuPN8-wKvOCtM/edit?usp=sharing",
    thumbnailImageLink:
      "https://dl.airtable.com/.attachments/e7c80c0bc05992097f5c5a617e8d88bf/683b9870/AnonymousStandInLogo.png",
    logoCdnUrl:
      "https://dl.airtable.com/.attachments/e7c80c0bc05992097f5c5a617e8d88bf/683b9870/AnonymousStandInLogo.png",
    bannerImageLink:
      "https://dl.airtable.com/.attachments/974b03d7a3d8d355ccc997b73c6234f6/2b5dd1e1/AnonymousStandInBanner.png",
    recipientId: 8,
    id: "8",
  },
  {
    projectName: "zk-AWOS",
    tagline:
      "一套自動化的零知識經費核銷系統，廠商不需提交完整的經費核銷證明(營業秘密)資料的同時，能達到自動審查核銷的系統。",
    description:
      "利用零知識證明技術，並將以往廠商提供的請款資料進行公開與私有的分類，透過政府或投資機構的專案補助計畫合約紙本，列出經費補助條件與限制，利用零知識工具與web3 library，透過鏈上的智能合約進行自動驗證，取得驗證結果，根據驗證結果決定是否該請款單予以核銷放款。",
    ethereumAddress: "0x2cbc643ba2263fc2b3ba17eab7cfb93e2f5d9489",
    website: "",
    thumbnailImageLink:
      "https://dl.airtable.com/.attachments/431a95b97f2edd28502925de41c83f99/e1e15f9f/III_zk-AWOS_icon.png",
    logoCdnUrl:
      "https://dl.airtable.com/.attachments/431a95b97f2edd28502925de41c83f99/e1e15f9f/III_zk-AWOS_icon.png",
    bannerImageLink:
      "https://dl.airtable.com/.attachments/637437b6a83ff500a2e432db10c08361/75e50bc4/III_zk-AWOS_banner.png",
    recipientId: 9,
    id: "9",
  },
  {
    projectName: "ZK Charity Token",
    tagline:
      "Token makes donation easier and with more privacy",
    description:
      "ZK Charity Token 是一個用於慈善捐款且兼具隱私的token. 用戶購買內含一筆慈善基金的token, 並會在設定條件內定期定額捐款給慈善機構. 用戶在購買token後, 能夠在social media 上顯示出捐款證明. 用戶能夠保留實際捐款金額, 基金總額等資訊的隱私. 只提供用戶希望透露資訊的證明",
    ethereumAddress: "0xe79c90cE8c5152338348f50B5873fAf2d0EC88cD",
    website: "",
    thumbnailImageLink:
      "https://dl.airtable.com/.attachments/130229f3a03ab44a07763322932ef2b6/1cd1b978/zkcharitytoken.png",
    logoCdnUrl:
      "https://dl.airtable.com/.attachments/130229f3a03ab44a07763322932ef2b6/1cd1b978/zkcharitytoken.png",
    bannerImageLink:
      "https://dl.airtable.com/.attachments/7bfa6f3151cbd1c0f99e1bcbcdcaad0b/7ecf8619/zkcharitytokenbanner.png",
    recipientId: 10,
    id: "10",
  },
  {
    projectName: "ZKANON (TBD)",
    tagline:
      "Privacy Layer of DAO tools for NFT gated community.",
    description:
      "Since the rise of PFP projects, many communities have adopted NFT as their membership pass.Existing tools, like snapshot, do not provide privacy respected options for these token-gated communities. This project aims to provide a layer that bridges the NFT communities with the Semaphore protocol and provide privacy-respected DAO tools.Since verifying the ZK proof on the ethereum mainnet could be prohibitively expensive for many users and applications, we plan to separate the contracts on ethereum mainnet and roll up chains.An L1 contract will be deployed to verify the ownership of the NFTs as most of the prominent NFT projects are built on the ethereum mainnet. The L1 contract will also signal the L2 contracts to register and update the Semaphore group.The use of Semaphore protocol instead of building a ZK circuit from scratch will allow the users to access and better integrate or leverage the projects/tools also built on top of the Semaphore protocol.",
    ethereumAddress: "0xCacCa9E4A93dfECC4EB172634cB73DA9e0EcEAd7",
    website: "",
    thumbnailImageLink:
      "https://dl.airtable.com/.attachments/7f3a3bb3aaca2dc86ba1a8713b00e99d/c3b1bd75/logozk.png",
    logoCdnUrl:
      "https://dl.airtable.com/.attachments/7f3a3bb3aaca2dc86ba1a8713b00e99d/c3b1bd75/logozk.png",
    bannerImageLink:
      "https://dl.airtable.com/.attachments/32aa0a52453dab3648a6821f4904fe31/516466e1/banner.png",
    recipientId: 11,
    id: "11",
  },
  {
    projectName: "BillioMaZK",
    tagline:
      "建立一個去中心化的資產額證明DID，在不透露自身address與資產分佈的情況下，盤點多個address的資產並提供一個資產總額的證明以供其他服務使用。",
    description:
      "富比世排行榜會顯示富豪的資產金額與排名，但不會透露他的財務分佈，像是多少存款在什麼銀行、近期投資了什麼等。而我們打算建立一個去中心化的資產額證明DID，User註冊輸入名稱後，提供MetaMask 綁定的 address，會去計算User的資產總額，並以User所填寫的名稱顯示在前端排行榜裡面，此排行榜可以證明此User的財富狀況，並定期做更新。我們也讓User可以生成id commitment來與第三方的服務做驗證來確定User的資產總額。",
    ethereumAddress: "0xEbf29A4dc710040B12E68465331F70e42f053d7b",
    website: "",
    thumbnailImageLink:
      "https://dl.airtable.com/.attachments/a0d5862e620bc55424a93518d330c931/33b4b16b/BillioMaZK_icon.png",
    logoCdnUrl:
      "https://dl.airtable.com/.attachments/a0d5862e620bc55424a93518d330c931/33b4b16b/BillioMaZK_icon.png",
    bannerImageLink:
      "https://dl.airtable.com/.attachments/2da713079d872ecd716fdb2e16a4c6bd/6d6d60eb/BillioMaZK_project_Banner.png",
    recipientId: 12,
    id: "12",
  },
  {
    projectName: "zKarma",
    tagline:
      "吹哨者的安全出口，讓吹哨者可以安全發言的鏈上平台。",
    description:
      "在 Zkarma 裡面有兩種身份：吹哨者和一般使用者。我們會確保吹哨者的匿名性，讓他可以安心的暢所欲言，同時為了防止大量假帳號的入侵，我們也會要求想要評論文章的一般使用者使用 Interep 或是 BrightID 進行真實身份的驗證。為了避免有心人利用追哨者的身份，在平台上也會根據文章的評論數和按讚數來進行排序。",
    ethereumAddress: "0x8865d9736Ad52c6cdBbEA9bCd376108284CFd0e4",
    website: "",
    thumbnailImageLink:
      "https://dl.airtable.com/.attachments/847517bc0c5b9c1c538c4048f0b56cd7/daab0684/70e538dcde1e4c2c843d318eec8c19c4-08.png",
    logoCdnUrl:
      "https://dl.airtable.com/.attachments/847517bc0c5b9c1c538c4048f0b56cd7/daab0684/70e538dcde1e4c2c843d318eec8c19c4-08.png",
    bannerImageLink:
      "https://dl.airtable.com/.attachments/54b1a73d8433ce1fdaf60635025dbba4/7ed0d95f/70e538dcde1e4c2c843d318eec8c19c4-07.png",
    recipientId: 13,
    id: "13",
  },
];

export function getProjects() {
  return projects;
}

export function getRecipientIdbyId(id) {
  console.log(id);
  const p = projects.find((p) => p.id === id);

  return p.recipientId;
}

export function getProject(id: string) {
  return (
    projects.find((p) => p.id === id) ?? {
      projectName: "404 Project not found",
      tagline: "404 Tagline not found",
      description: "404 Description not found",
      ethereumAddress: "404 Address not found",
      website: "404 URL not found",
      thumbnailImageLink: "https://source.unsplash.com/random",
      logoCdnUrl: "https://source.unsplash.com/random",
      bannerImageLink: "https://source.unsplash.com/random",
      recipientId: 0,
      id: "0",
    }
  );
}

function shuffleFisherYates(array: any) {
  let i = array.length;
  while (i--) {
    const ri = Math.floor(Math.random() * i);
    [array[i], array[ri]] = [array[ri], array[i]];
  }
  return array;
}

//return shuffled version of allprojects array
export function getShuffledProjects() {
  return shuffleFisherYates(getProjects());
}
