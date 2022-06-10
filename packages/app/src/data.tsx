import "@fontsource/archivo";
let projects = [
  {
    name: "EthPragueDva",
    tagline: "'Dva' means 'two' in Czech.",
    description:
      "EthPrague in 2022 has been a great success, with a series of talks, workshops and a hackathon. This application is the seed of an idea, to begin fundraising for a follow-up event... the second EthPrague. We are trying to create an event that can be wholly owned by the community, and focus entirely on building a sustainable future with the help of blockchains. We are beginning fundraising early, to allow the event to be as community-owned as possible, and to reduce the event's reliance on the benevolence of sponsors. We look forward to receiving your support.",
    problemSpace:
      "EthPrague in 2022 has been a great success, with a series of talks, workshops and a hackathon. This application is the seed of an idea, to begin fundraising for a follow-up event... the second EthPrague. We are beginning fundraising early, to allow the event to be as community-owned as possible, and to reduce the event's reliance on the benevolence of sponsors. We look forward to receiving your support.",
    address: "0x46022C178984bDc20658aBd1435ce6deFF87DA74",
    id: "12",
    recipientId: 1,
    url: "https://ethprague.com/",
    logo: "/logo.png",
    banner: "https://res.cloudinary.com/pse-qf-maci/image/upload/v1654624120/ethpraguedva_qqgxoj.png",
  },
  {
    name: "Bohemian DAO",
    tagline: "Funding local projects supporting the education and adoption of the Ethereum / DeFi ecosystem.",
    description:
      "We are a voluntary community of visionaries, philanthropists, users and fans of decentralized finance, and others who are willing to support a good cause with their money, educating people about the financial system of the future - and helping overall adoption. We think that information about Ethereum and DeFi in Czech, or local projects that would focus on this segment of the new free programmable money, is a scarce commodity. Therefore, we decided to try to accelerate the development of such projects and create a non-profit fund that could help them financially in the form of subsidies (grants).",
    problemSpace:
      "We think that information about Ethereum and DeFi in Czech, or local projects that would focus on this segment of the new free programmable money, is a scarce commodity. Therefore, we decided to try to accelerate the development of such projects and create a non-profit fund that could help them financially in the form of subsidies (grants).",
    address: "0x41198CE04A731ad2F3F397FA898F9f34b9fe7002",
    id: "9",
    recipientId: 2,
    url: "https://docs.bohemiandao.cz/",
    logo: "https://res.cloudinary.com/pse-qf-maci/image/upload/v1654623126/Bohemian_DAO_dtrbs4.png",
    banner: "https://res.cloudinary.com/pse-qf-maci/image/upload/v1654623126/Bohemian_DAO_dtrbs4.png",
  },
  {
    name: "Paralelní Polis",
    id: "15",
    recipientId: 3,
    address: "0x42105F249681ff262D6aB723bf19Bc854656E619",
    url: "https://twitter.com/Paralelni_Polis",
    description:
      "Building on philosophical background of Charter 77, Czechoslovak dissident movement, and cryptoanarchy from the Cypherpunk movement, Paralelní Polis was formed in 2014. As a nonprofit, Polis provides public with open space to learn, collaborate and explore. Topics of this content are represented by the triangle logo - Art, Science and Technology. For more than 8 years, Polis has served many local communities - hackers, artists, biologists and environmentalists, activists, philosophers, crypto communities, AI researchers, etc. Local and also global communities are attracted to various concepts Paralelní Polis includes: - Bitcoin Coffee: educational café where anybody can come and get his first coffee for Bitcoin with our help. The first place in the world to accept only cryptocurrencies has pioneered this topic and onboarded local people to the crypto ecosystem extensively. - PaperHub: coworking space and hub of like-minded peers from various communities. - Institute of Cryptoanarchy: hosting local meetups, events and conferences, think tank focused on sustaining ideas of cypherpunk. - YT studio: multimedia studio which serves us and the public for creating YouTube educational content, podcasts, streams, etc. - Bordel: hackerspace, manifestation of chaos where the actual tools are being built and used by local hackers. We are thrilled to welcome the Ethereum community in Prague and hope you will enjoy the best time in Paralelní Polis.",
    logo: "https://res.cloudinary.com/pse-qf-maci/image/upload/v1654623950/paralelni-polis_ydrpln.png",
    banner: "/Paralelni_Polis_Banner.jpeg",
    tagline: "An open platform for learning, researching and building free (libre) solutions for society.",
    problemSpace:
      "Traditional approaches to social change, whether bottom up or top down- systems are broken. With government coercion filling the physical space, the freedom can be achieved by uncensorable digital technologies. Parallel Polis is a society built on independent parallel systems of education, economy, culture... which are not competing or attacking the machine but provide voluntary, free and moral alternative.",
  },
  {
    name: "CZK FX rate on chain",
    id: "1",
    recipientId: 4,
    address: "0x9C81E538B9523CA46421a03F1C351b00b765b92f",
    url: "-",
    description:
      "Proposal to make CZK/USD on-chain rate available on Chainlink similar to other national currencies, serving as: - Onchain proxy towards other rates like ETH/CZK while saving gas for updates. - Source of truth for the tax,accounting or legal purposes as needed, for better DeFi adoption. Chainlink already approved the realization of CZK/USD onchain FX rate; the proposal is on the table. Current USD denomination a) further strengthens the monopoly/influence of USD on the crypto space; and b) is foreign to European citizens and its nations, thus limiting adoption. Denomination in other national currencies is needed and can become a building block for web3/DeFi projects with national impacts. For Ethereum, Arbitrum, Polygon with option for BSC, Solana, Cardano, Polkadot. $5,100 USD / year for gas fees is needed (incl. VAT). Estimated runway budget for 2 years:$10,200 USD. $1,000 USD budget for year 1 is already agreed in advance. The outcome would be communicated in crypto/dev communities and presented at local events.",
    logo: "https://res.cloudinary.com/pse-qf-maci/image/upload/v1654623126/CZK_FX_rate_on_chain_gbr5ua.png",
    banner: "https://res.cloudinary.com/pse-qf-maci/image/upload/v1654623126/CZK_FX_rate_on_chain_gbr5ua.png",
    tagline: "CZK foreign exchange rate on-chain, similar to other FIAT currencies, for any Web3 project.",
    problemSpace:
      "Web3 / DeFi projects shall denominate the values in national currencies in order for the further DeFi adoption. Current USD denomination a) further strengthens the monopoly / influence of the FIAT USD on the crypto space ; b) is foreign to the European citizens and its nations, thus limiting the adoption. Denomination in the national currencies is needed and can become the building block for the further web3 / DeFi projects with national impacts.",
  },
  {
    name: "MindfulDropin",
    id: "2",
    recipientId: 5,
    address: "0x5aB7505Af5Ee7686a1C56edb582621E1f0484A5F",
    url: "https://unifiedmindfulness.com/",
    description:
      "MindfulDropin will offer public and free weekly zoom sessions led by a certified coach in the Unified Mindfulness system developed over decades by the American mindfulness teacher and neuroscience research consultant Shinzen Young. These drop-in sessions will aim to train the participants in three core attentional skills, namely concentration power, sensory clarity, and equanimity through well-defined and reliable meditation techniques. Elevating the daily base level of these three skills directly leads to the optimization of human happiness in five fundamental domains: Minimize Suffering (Relief), Maximize Fulfillment (Fulfillment), Understand Yourself (Insight), Act Skillfully (Mastery), and Serve From Love (Service). The call for secular and science-informed mindful movement has never been so important as we are living in a century where human behaviour and decisions are determining the fate of the planet and humanity itself. Your funding will help to value the time and effort of the coaches, the costs of running online sessions and likely even in-person courses based in Prague in the coming future.",
    logo: "https://res.cloudinary.com/pse-qf-maci/image/upload/v1654623128/MindfulDropin_mli8bu.jpg",
    banner: "https://res.cloudinary.com/pse-qf-maci/image/upload/v1654623128/MindfulDropin_mli8bu.jpg",
    tagline:
      "MindfulDropin aims to spread secular science-informed mindfulness techniques to the general public with three core attentional skills which lead to the optimization of human happiness and behaviour.",
    problemSpace:
      "In this century we must do our best to bring about a shift in human understanding and behaviour in many domains of life to successfully mitigate the crisis awaiting us. Widespread secular and science-informed mindfulness training can be a catalyst for positive change in society as it is directly improving human happiness and actions. MindfulDropin will provide online and open to all drop-in sessions free of charge on a weekly basis to those interested in learning practical techniques leading to a more fulfilled, thus less harmful life.",
  },
  {
    name: "Sázíme stromy: We plant trees where others won´t",
    id: "3",
    recipientId: 6,
    address: "0x059FdC73e9bed40265D0afAC73D04B604b02722A",
    url: "https://www.sazimestromy.cz/en",
    description:
      "Our main mission is to restore and plant new tree alleys, plant shelter belts, add trees to orchards and plant trees and shrubs wherever it makes sense. We plant trees and shrubs in places that are carefully selected with municipal authorities and other owners. We receive grants from companies, and involve their employees in the planting. In addition to local schools, associations and volunteers, we work with groups of disadvantaged citizens. We act as an intermediary between sponsors, gardening and tree nursery companies, municipal authorities and volunteers. We feel that people lack awareness of how simple it can be to help nature, in ways that are joyful and beneficial for the world. We feel that there are insufficient opportunities for people to learn how they can systematically support nature in their daily lives. A planted tree is, simply put, an 'everlasting joy', because these trees will keep growing for decades or even centuries.",
    logo: "https://res.cloudinary.com/pse-qf-maci/image/upload/v1654623126/Sa%CC%81zi%CC%81me_stromy_ommcgf.png",
    banner: "https://res.cloudinary.com/pse-qf-maci/image/upload/v1654623126/Sa%CC%81zi%CC%81me_stromy_ommcgf.png",
    tagline:
      "We connect companies and municipalities with volunteers, and together we plant trees and shrubs in the places where they are most needed.",
    problemSpace:
      "We feel that people lack awareness of how simple it can be to help nature, in ways that are joyful and beneficial for the world. We feel that there are insufficient opportunities for people to learn how they can systematically support nature in their daily lives. A planted tree is, simply put, an 'everlasting joy', because these trees will keep growing for decades or even centuries.",
  },
  {
    name: "Pragashrooms",
    id: "4",
    recipientId: 7,
    address: "0x9B8BB786550749d34e56b16De4385C306540020E",
    url: "https://www.instagram.com/pragashrooms/?hl=cs",
    description:
      "Pragashrooms is a starting small-scale local indoor producer of gourmet and medicinal mushrooms. We would like to offer high quality, fresh, locally grown and distributed fungi such as Shiitake, Maitake, Lion’s Mane, Oyster, Reishi, Chestnut, King Trumpet, and other mushrooms currently unavailable on the local market. Building a trusted connection with the consumer through community supported fungiculture will remove the middleman and allow for fresh and affordable local product. Moving in the direction of urban sustainability, trusted communal partnerships and high-quality consumer-oriented products is our vision of progress. We aspire to share a part of our yield with those in need for free, supplying nonprofit organizations like Food not Bombs which are preparing food for homeless people in Prague or cooperating with Prague’s community garden Metrofarm to create more balanced vegetable and mushroom boxes. Further, we would like to be part of the leading voice of the approaching Mycological Revolution in Europe and contribute to the spread of local gourmet and medicinal mushroom cultivation and consumption via online and regional media and workshops. If our project receives considerable funding, we will offer discounted mushroom meals at the next ETH Prague Conference.",
    logo: "https://res.cloudinary.com/pse-qf-maci/image/upload/v1654623128/Pragashrooms_oxk7kx.jpg",
    banner: "https://res.cloudinary.com/pse-qf-maci/image/upload/v1654623128/Pragashrooms_oxk7kx.jpg",
    tagline:
      "Small-scale indoor producer of fresh and diverse fungi supporting urban food security and sustainability, contribute to regional mycological knowhow, build trusted producer-consumer partnerships, and help nonprofit and non-discriminatory food sharing organizations.",
    problemSpace:
      "The existing mushroom market in Czechia is heavily dominated by few large companies producing only a limited range of fungi species of often poor quality. Pragashrooms aspires to produce local high-quality gourmet and medicinal mushrooms of various types and deliver directly to the consumer, thus removing the middleman, keeping the fungi fresh and local, and building trusted producer-consumer partnerships. We in Pragashrooms are keen on sharing our myco-enthusiasm with the public and contribute to the ongoing Mycological Revolution for better and sustainable future.",
  },
  {
    name: "Indices.fi",
    tagline: "Everything about crypto indices in one place - information, data, analysis, and education materials.",
    description:
      "We often get people asking us for advice on what to invest in cryptocurrencies. We tell them to study the topic, segments, and specific projects and decide for themselves. However, this is not the way for everyone, and similar to TradFi, there are ETFs - investment instruments that make investing easier for all types of investors. So we decided to explore this market in the blockchain world and now we are the first in the market that aggregate crypto indices in one place. We analyze and research each index and provide a complete overview of information about methodology, portfolio managers, advanced data, risks, liquidity, and much more. We also categorize and rank the indices based on our methodology to make it easier for all users to make a selection. For more advanced users who are serious about investing, we write educational materials leading to the right investment decisions. The second reason our project was created is the bigger vision, where thanks to indices.fi we keep up with this market and know what is going on. So we don't miss any information from the market. In the near future we want to start taking advantage of the gaps in this market and create our own protocol that will bring together experts in individual cryptocurrency segments and provide our own products through a DAO.",
    problemSpace:
      "The problem we are solving is a lack of education in creating a diversified crypto portfolio and an overview of crypto indices and data with advanced insights.",
    address: "0xFBb777a2DDdF9309B505B0ac594b0977898c7a92",
    id: "5",
    recipientId: 8,
    url: "https://www.indices.fi/",
    logo: "https://res.cloudinary.com/pse-qf-maci/image/upload/v1654623127/indices.fi_soyeqp.png",
    banner: "https://res.cloudinary.com/pse-qf-maci/image/upload/v1654623127/indices.fi_soyeqp.png",
  },
  {
    name: "United Vision",
    tagline:
      "United Vision aims to strengthen communities and empower individuals through long-term volunteering and environmental education.",
    description:
      "United Vision is a Czech NGO founded in 2011 in Prague. The organisation focuses on the topics of community development and protection of nature, through volunteering and informal education. We promote respect towards people, animals and nature, and raise awareness of the limitations of our planet. We work with people of all ages, but primarily young people, by encouraging active participation and engagement in these topics. This is done through long-term volunteering activities, in cooperation with partner organisations and communities. In the Czech Republic, young people with disadvantaged backgrounds have few opportunities to participate in long-term activities. Due to this, they are often unable to acquire valuable life skills, such as being able to deal with unexpected situations, or to cooperate with a variety of stakeholders. As such, many are unable to actively participate in public life. We encourage volunteering as a way to empower people, regardless of any disadvantages they may face, believing that active participation, and development of key competencies are important parts of life.",
    problemSpace:
      "In the Czech Republic, young people with disadvantaged backgrounds have few opportunities to participate in long-term activities. Due to this, they are often unable to acquire valuable life skills, such as being able to deal with unexpected situations, or to cooperate with a variety of stakeholders. As such, many are unable to actively participate in public life.",
    address: "0x0C5249B8c1DbFC72C9502638243812dbBfdf8Bcb",
    id: "6",
    recipientId: 9,
    url: "https://www.united-vision.org/",
    logo: "https://res.cloudinary.com/pse-qf-maci/image/upload/v1654623126/United_Vision_eo34ua.jpg",
    banner: "https://res.cloudinary.com/pse-qf-maci/image/upload/v1654623126/United_Vision_eo34ua.jpg",
  },
  {
    name: "Crypto Portal",
    tagline:
      "Prague’s first NFT gallery, featuring NFTs from a range of well-known local and international artists, with an emphasis on education, collaboration, and exploration.",
    description:
      "Prague has the potential to become the global hub for web3 art and tech. Back in October 2021, Crypto Portal was created as an experiment due to the opportunity to convert an amazing space into the first digital-art-focused gallery in Prague. Over the last 6 months, we’ve hosted numerous exhibitions, fundraisers, and panels, bringing together artists and collectors of all nationalities, mediums, and backgrounds. NFTs have legitimized digital art. Pushing this to the next level involves display, curation, environments, and connections. By hosting events and exhibitions we are able to bring together a community of like-minded individuals who can build with each other, and prove that next-generational digital art has its place in the eyes of the public. Ushering blockchain technology to the masses via NFTs is perhaps the greatest influence from the use of this technology since the invention of Bitcoin. Using this inspiration and ethos we have been able to receive grants and funding to propel the future of this space into real-life experiences.",
    problemSpace:
      "NFTs have legitimized digital art. Pushing this to the next level involves display, curation, environments, and connections. By hosting events and exhibitions we are able to bring together a community of like-minded individuals who can build with each other, and prove that next-generational digital art has its place in the eyes of the public.",
    address: "0x3F24e9829AE70b756eD28A8cAC76C28A3AF2cD26",
    id: "7",
    recipientId: 10,
    url: "www.cryptoportal.art",
    logo: "https://res.cloudinary.com/pse-qf-maci/image/upload/v1654623126/Crypto_Portal_s67mkm.png",
    banner: "https://res.cloudinary.com/pse-qf-maci/image/upload/v1654623126/Crypto_Portal_s67mkm.png",
  },
  {
    name: "Gwei.cz",
    tagline:
      "A Czech/Slovak community of supporters of the Ethereum platform and the decentralized finance (DeFi) movement.",
    description:
      "Gwei.cz is a Czech/Slovak community of supporters of the Ethereum platform and the decentralized finance (DeFi) movement. We spread awareness of decentralised finance and provide support for local projects. We are not interested in speculating on price, but in real technological advances in open and decentralized services that are changing the world of traditional finance within DeFi. Fintech is the past - DeFi the future.",
    problemSpace: "Spreading awareness of decentralised finance. And local support for projects",
    address: "0x41198CE04A731ad2F3F397FA898F9f34b9fe7002",
    id: "8",
    recipientId: 11,
    url: "https://gwei.cz/",
    logo: "https://res.cloudinary.com/pse-qf-maci/image/upload/v1654624963/logo-gwei.cz_hy7xz7.png",
    banner: "https://res.cloudinary.com/pse-qf-maci/image/upload/v1654624963/logo-gwei.cz_hy7xz7.png",
  },
  {
    name: "Woke Framework",
    tagline: "Woke aims to provide the best tool for security analysis of Ethereum smart contracts",
    description:
      "Woke is a brand-new development and security assurance framework. Currently, a Solidity version manager and compilation module are implemented, and we're just releasing Woke's first publicly useful feature: a fuzzer. The entire framework is written in Python3, allowing you to write tests in python. The advantage of this over writing tests in Solidity is numerous: Allows for differential testing (e.g. if you are testing a square-root implementation in Solidity, you don't need to write another implementation; rather, you can use python's math.sqrt). Faster development times in python allows for faster iteration speeds An interactive console allows you to debug where your test failed Down the line, we also plan to implement: - Woke comment - adds comments to the codebase such as where a specific function is used - Woke read - takes the codebase contents and creates an html file - Woke debug - a line-by-line (not instruction-by-instruction) Solidity debugger for any chain / framework, including Hardhat and Foundry. If you are interested, come to our workshop on Sunday at 12:30 in Paralelni Polis.",
    problemSpace:
      "To provide a public-good tool for developers in the Ethereum ecosystem to assure the quality and security of their smart contracts.",
    address: "0x9C6696C44dE739b51d3aDf51c87E98e19dD33337",
    id: "10",
    recipientId: 12,
    url: "https://twitter.com/hackerdom_",
    logo: "https://res.cloudinary.com/pse-qf-maci/image/upload/v1654623126/sleeping_emoji_ds4up3.png",
    banner: "https://res.cloudinary.com/pse-qf-maci/image/upload/v1654623126/sleeping_emoji_ds4up3.png",
  },
  {
    name: "UTXO Foundation",
    tagline:
      "We are a non-profit and independent association. Our target is to spread awareness about open and decentralised technologies and connect people with similar interests.",
    description:
      "Currently, we are organising the biggest Czech crypto conference happening a week before ETHPrague. We would like to continue organising meetups and conferences in the future. We have grown from the local Czech Ethereum community gwei.cz. The first event we organised was ETHBrno which led to creating UTXO Foundation and organising the UTXO conference. We felt that conferences for new crypto users are very commercial and not really open in the Czech Republic. We are changing that as we write this! We are trying to make a really open conference. For many, this is a buzzword. For us, it's something we stand behind. Basically, events for newbies in the Czech Republic are divided between bitcoin maximalists and the others. We are different. For the first big conference we're organising we have managed to get both Bitcoin maximalists and Ethereum people together to talk! We believe that the toxic part of the community is the loudest one and that most people are kind, they are just not heard.",
    problemSpace:
      "We are trying to make a really open conference. For many, this is a buzzword. For us, it's something we stand behind. Other Czech conferences aimed at newbies are often very commercial promoting centralised platforms and we don't like that at all. Unfortunately, that's not all. Basically, all events for newbies in the Czech Republic are divided between bitcoin maximalists and the others. We are different. For the first big conference we're organising we have managed to get both Bitcoin maximalists and Ethereum people together to talk! We believe that the toxic part of the community is the loudest one and that most people are kind, they are just not heard.",
    address: "0x49A6D3e146f4C032f97B65A2c5E05B1196d69026",
    id: "11",
    recipientId: 13,
    url: "utxo.cz",
    logo: "https://res.cloudinary.com/pse-qf-maci/image/upload/v1654624116/logo-utxo_yuwws8.png",
    banner: "https://res.cloudinary.com/pse-qf-maci/image/upload/v1654624116/logo-utxo_yuwws8.png",
  },
  {
    name: "NFTurtle",
    tagline: "Machine Learning & NFT collectibles that support the protection of sea turtles",
    description:
      "NFTurtle is a decentralized non-profit organization based on the Ethereum blockchain committed to protecting sea turtles and their habitats worldwide. Our vision is a future where sea turtles and their nesting beaches are protected and safe from the main threats of poachers and other factors that are causing the rapid decline of sea turtle species. The main goal is to obtain funding to open newly protected nesting sites via a small internal crowdfunding scheme. We want to utilize the momentum of the current NFT market hype to create a strong bond between blockchain technologies and organized threatened species conservation groups. Thanks to cooperation with established non-profit organizations, we can offer NFTs that represent particular living sea turtles in the real world. So, unlike most mainstream NFT projects, we connect the virtual world with reality. How does it work? Each turtle has a unique facial scale pattern that is akin to a human fingerprint. With the use of multiple computer-assisted algorithms which are comparable to human facial recognition programs, we can identify and track the progress of the ID turtles. Once entered into the identification program we can then digitize and convert each individual turtle in the database into an NFT.",
    problemSpace:
      "Sea turtles are one of the few ancient species left on the Earth. Unfortunately, all seven species are threatened with extinction. Alongside improving fishing techniques worldwide, the essential conservation strategy is to protect nesting sites to ensure species reproduction. In South East Asia, dated conservation practices include the unnecessary handling of eggs, placing newly hatched turtles in small pools, and then manually releasing them. Through decades of research, it has been proven that this methodology does not reflect the biological needs of the species and can cause more harm than good, no matter the intentions.",
    address: "0x5Fd8bE6bd01F932D6FcBCeAB1582F8adbC92e76B",
    id: "13",
    recipientId: 14,
    url: "https://nfturtle.io/",
    logo: "https://res.cloudinary.com/pse-qf-maci/image/upload/v1654623127/NFTurtle_twtoqk.png",
    banner: "https://res.cloudinary.com/pse-qf-maci/image/upload/v1654623127/NFTurtle_twtoqk.png",
  },

  {
    name: "Bordel Hackerspace",
    tagline: "A community hackerspace within Paralelní Polis.",
    description:
      "Bordel came to life from the entropy hidden behind walls and floors of Paralelní Polis. From a messy storage unit, it grew into a a special space where the local hacker community can meet and hack together. It provides software and hardware tools to the public, including an Ethereum archival node with endpoint available at bordel.xyz. Small events, workshops and parties are organized in Bordel. This includes educational content for both members and public. Various open source projects came into life in our space. But apart from the workbench, 3D printers, soldering, synthesizers and other equipment, Bordel offers a unique experience for every visitor. Concentrated chaos in Bordel leads the inexperienced visitor on a tour trough entropy of knowledge, doubts and excitement. Chaos and entropy is what we experiment with in Bordel. When chaos comes to live in our little place in the basement of legendary Paralelní Polis, the whole building is feeling the good and chaotic vibrations of Bordel. As happens with mess and chaos, Bordel also appeared without planning or warnings. It always oscillated on the edge of entropy and complete disorder. Paralelní Polis didn't have time to figure out whether Bordel brings the order or just another separatist movement. Being part of Polis, Bordel lives its own life but in the deepest symbiosis possible. That's why we troll Polis folks and compete in the vote for funding. Bordel pays its fair share within Paralelní Polis and creates a lot of its own content and expensive tools for the community. Bordel’s archival node is also one of the projects you support by voting for us. TLDR, vote for us and come have a party in Bordel!",
    problemSpace:
      "Bordel is nothing which can be explained by words. It's an experience, daily and trip long experience which has to be integrated by your own mind. Come to have a party to Bordel during EthPrague! All the hackers are invited.* The party in our underground shady semi-legit-almost-a-bar Bordel is opened for you every night till 4:20AM. Don't hesitate to pay a visit. *We are sorry but please don't visit us if you have epilepsy or in case you are a cop",
    address: "0xe83E0b36bc68c1407B81B6d42CA4bd23FC309517",
    id: "14",
    recipientId: 15,
    url: "github.com/bordel",
    logo: "https://res.cloudinary.com/pse-qf-maci/image/upload/v1654623942/bordel-hackspace_jxlytx.png",
    banner: "https://res.cloudinary.com/pse-qf-maci/image/upload/v1654623942/bordel-hackspace_jxlytx.png",
  },
];

export function getProjects() {
  return projects;
}

export function getRecipientIdbyId(id) {
  console.log(id)
  const p = projects.find((p) => p.id === id);
  

  return p.recipientId;
}

export function getProject(id: string) {
  return (
    projects.find((p) => p.id === id) ?? {
      name: "404 Project not found",
      id: id,
      recipientId: 0,
      address: "404 Address not found",
      url: "404 URL not found",
      description: "404 Description not found",
      banner: "https://source.unsplash.com/random",
      logo: "https://source.unsplash.com/random",
      tagline: "404 Tagline not found",
      problemSpace: "404 Problem space not found",
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
