import "@fontsource/archivo";
let projects = [
  {
    projectName: "Strigo",
    tagline: "Hace que usar DeFi sea sencillo. Portfolio manager",
    description:
      "Por ahora la app corre sobre Polygon. Está basada en otro proyecto muy similar que corre sobre Celo llamado Celo Tracker. Por un lado, permite llevar control de tus inversiones en distintos proyectos como Quickswap, Uniswap, Curve, Aave y estamos agregando otros todo el tiempo. Por otro lado, también hace sencillo invertir en ellos! No hace falta navegar por todas las páginas, algunas de las cuales son muy poco intuitivas. Tenemos algunos contratos 'helper' que permiten proveer liquidez o invertir directamente en los protocolos de la manera más sencilla posible. También permite swapear tokens, revisar precios y hay algunas features como bridgear y ver NFTs que están en construcción.",
    ethereumAddress: "0x90783Eb98057E45BC08ea773B6625894CAe545F2",
    website: "https://strigo.fi/",
    thumbnailImageLink:
      "https://firebasestorage.googleapis.com/v0/b/celo-tracker-c537a.appspot.com/o/strigo-logo.png?alt=media&token=512cddcc-574b-4729-8890-a11122ce4dec",
    logoCdnUrl:
      "https://firebasestorage.googleapis.com/v0/b/celo-tracker-c537a.appspot.com/o/strigo-logo.png?alt=media&token=512cddcc-574b-4729-8890-a11122ce4dec",
    bannerImageLink:
      "https://pbs.twimg.com/profile_banners/1473447680995115009/1652019941/1500x500",
    recipientId: 1,
    id: "1",
  },

  {
    projectName: "Cafecrypto.app",
    tagline:
      "Es una web de crowfounding 100% crypto, sin comisiones, anonimo y al estar atada al dolar crypto, no se devalúa tus ingresos",
    description:
      "Es una web de crowfounding 100% crypto funcionando actualmente en la red bsc. Podes compartir proyectos para que te donen o vender contenido privado, lo diferente es que es 100% crypto, es anonimo y lo mas importante que es gratis, sin comisiones, solo tenes que tener una wallet en metamask. En argentina creo que es un punto muy importante por el tema de la inflación, al recobor BNB o BUSD (voy a agregar mas a futuro), no se te devalúa como el peso argentino hasta que llegas a tu objetivo",
    ethereumAddress: "0xbF56263439f5e455d4F6b94EB725736B3D28123E",
    website: "https://mobile.twitter.com/cafecrypto_app/",
    thumbnailImageLink:
      "https://pbs.twimg.com/profile_images/1535050423983276052/AxJ03VXq_400x400.jpg",
    logoCdnUrl:
      "https://pbs.twimg.com/profile_images/1535050423983276052/AxJ03VXq_400x400.jpg",
    bannerImageLink:
      "https://pbs.twimg.com/profile_banners/1535048674409054215/1654819517/1500x500",
    recipientId: 2,
    id: "2",
  },
  {
    projectName: "CommNode",
    tagline:
      "CommNode es un proyecto de impacto social que ayuda y acompaña a la comunidad web3 de América Latina en la búsqueda de trabajo, además facilitamos el proceso de sourcing a empresas y proyectos del ecosistema, colaborando en sus búsquedas.",
    description:
      "En CommNode ayudamos a la comunidad web3 de LATAM en la búsqueda de trabajo en el ecosistema. También colaboramos con empresas y proyectos en las búsquedas que tengan activas, ofreciéndoles servicios de full recruitment y sourcing estratégico de perfiles web3. Todo lo hacemos gratuitamente, con el objetivo de ayudar y aportar a la comunidad desde nuestro lugar. Buscamos ser el nodo entre las empresas/proyectos del ecosistema y la comunidad web3 de América Latina. Tenemos la iniciativa de armar una plataforma web3 que permita facilitar el proceso de conseguir trabajo y reclutar gente del ecosistema.",
    ethereumAddress: "0xDc22560f3fe53B957c1F9b626AD19A4524639337",
    website: "https://commnode.carrd.co/",
    thumbnailImageLink:
      "https://pbs.twimg.com/profile_images/1554587867397103618/DSgFxerb_400x400.jpg",
    logoCdnUrl:
      "https://pbs.twimg.com/profile_images/1554587867397103618/DSgFxerb_400x400.jpg",
    bannerImageLink:
      "https://pbs.twimg.com/profile_banners/1552385182170333184/1659139503/1500x500",
    recipientId: 3,
    id: "3",
  },
  {
    projectName: "DeFi LATAM",
    tagline:
      "Comunidad Web3 de educación y curación, análisis, desarrollo y difusión de tecnologías descentralizadas.",
    description:
      " *Creamos y hacemos curaduría de contenidos - Artículos - Definiciones - Tutoriales - Información de Proyectos - Investigación de incidentes - Noticias * Participación en gobernanzas (primer paso en el Colectivo Optimism) * Realizamos Community Calls semanalmente donde exponemos y discutimos los temas más recientes y resolvemos preguntas y dudas de la comunidad. * Tenemos un podcast que se puede escuchar en spotify y youtube. * Twitter Spaces con referentes del ecosistema donde abordamos información y características de los proyectos a modo educativo. * Resumen diario de temas charlados por la comunidad. * Creamos nuestro propio sistema de distribución de link POAP * Realizamos una Meetup presencial mensual en diferentes provincias Argentinas.",
    ethereumAddress: "0x0087a081a9B430fd8f688c6ac5dD24421BfB060D",
    website: "https://twitter.com/DeFi_LATAM",
    thumbnailImageLink:
      "https://drive.google.com/file/d/1dITfiQgJrPlbTA8M_cNNRmhE_hRzHVXf/view?usp=sharing",
    logoCdnUrl: "https://defilatam.com/img/logo.svg",
    bannerImageLink: "https://defilatam.com/img/logo.svg",
    recipientId: 4,
    id: "4",
  },
  {
    projectName: "Solow",
    tagline:
      "Es una ecosistema para que aprender cripto sea fácil, gratis y divertido.",
    description:
      "Solow empezó siendo un 'Duolingo para cripto'; una plataforma gratuita con cursos gamificados sobre cripto. Con el tiempo, evolucionó en una gran comunidad que hoy tiene 2500 miembros en Discord y mezcla contenido, juegos y tecnología para que cualquiera pueda aprender sobre cripto jugando: plataforma de cursos gamificados criptldle.com criptologos.com criptodex.solow.io - juego en vivo durante ETH Latam eventos y trivias en vivo Youtube, Spotify y Newsletter semanal Además, estamos construyendo una plataforma propia para incluir ejercicios prácticos con un token educativo. El usuario recibe sus primeras cripto, realiza su primer transacción, va a ver el resultado a la blockchain, deposita un contrato de staking y mintea un Soulbound Token personalizado como premio. Desarrollamos los contratos inteligentes necesarios para hacerlo posible y estamos realizando las últimas pruebas para hacer un deploy en Optimism sobre Gnosis. Demo: https://solow-alejozarate.vercel.app/ ",
    ethereumAddress: "0xAb268da15170654904ac7E4922Ef101e111E2F8f",
    website: "https://twitter.com/solowcripto",
    thumbnailImageLink:
      "https://drive.google.com/drive/folders/15v5q5HYWRuEHE4u0belIUgMwv91up507",
    logoCdnUrl:
      "https://pbs.twimg.com/profile_images/1517192513165090816/rh7QfSnS_400x400.jpg",
    bannerImageLink:
      "https://pbs.twimg.com/profile_banners/1352580840061104130/1650568233/1500x500",
    recipientId: 5,
    id: "5",
  },
  {
    projectName: "CriptoTributos",
    tagline:
      "Charlas abiertas sobre temáticas de índole legal / tributaria nacional o internacional que impactan en el ecosistema crypto",
    description:
      "Empezó como CryptoContadores & CryptoAbogados, un ciclo de charlas vía Twitter Spaces organizado por @cryptochica_arg. Con una frecuencia promedio de 1 vez por mes se desarrollan las charlas alrededor de una temática de índole legal / tributaria nacional o internacional sobre el ecosistema crypto. Ahora empezamos el camino a ser un 'Spin-off' independiente con el objetivo de consolidarse como un espacio propio y en virtud de ser de interés público y permanente el hablar sobre temáticas relativas a aspectos legales, tributarios y financieros del ecosistema crypto.",
    ethereumAddress: "0x3d1736798391d4854E36A0c5b4e89e340CaDC9D1",
    website:
      "https://docs.google.com/document/d/1XKyc6N-VNZR7kgzC-vJEu2oWLxke60OZEhCeEe2_3Lk/preview",
    thumbnailImageLink:
      "https://drive.google.com/file/d/1awjYbNwDyWWwcYmu7j3AVl0l_o5d8zKY/view",
    logoCdnUrl:
      "https://res.cloudinary.com/pse-qf-maci/image/upload/v1660391628/CriptoTributos_l3kwls.jpg",
    bannerImageLink:
      "https://res.cloudinary.com/pse-qf-maci/image/upload/v1660391628/CriptoTributos_l3kwls.jpg",
    recipientId: 6,
    id: "6",
  },
  {
    projectName: "Podcast: Bitcoin para todos.",
    tagline:
      "Bitcoin para todos representa una comunidad educativa que facilita la adopción web3.",
    description:
      "Bitcoin para todos fomenta el conocimiento y la toma de decisiones responsable e informada en este nuevo ecosistema cripto. Durante los casi 100 episodios hemos evolucionado en el conocimiento y las capacidades de interactuar con protocolos descentralizados. Iniciamos con Bitcoin, seguimos con Ethereum, profundizamos en DeFi y DAOs, entre otros conceptos críticos de la Web3. Existen más de 27 episodios dirigidos específicamente al ecosistema de Ethereum.",
    ethereumAddress: "0xAAE45BF6cC2eFc2f1BFE514c98b4c508e7f22eb7",
    website: "https://anchor.fm/diego-torres3",
    thumbnailImageLink:
      "https://drive.google.com/file/d/1TzQ9niNDuxclctCf_XeHa6Ree5u74qUk/view?usp=sharing",
    logoCdnUrl:
      "https://res.cloudinary.com/pse-qf-maci/image/upload/v1660391628/Bitcoin_para_todos_w3bivn.jpg",
    bannerImageLink:
      "https://res.cloudinary.com/pse-qf-maci/image/upload/v1660391628/Bitcoin_para_todos_w3bivn.jpg",
    recipientId: 7,
    id: "7",
  },
  {
    projectName: "L2 en Español",
    tagline:
      "Una comunidad abierta al estudio y difusión de las soluciones de escalabilidad de Ethereum.",
    description:
      "La comunidad L2 en Español se encarga de brindar un espacio gratuito dedicado para la educación sobre Layer 2 en Ethereum, noticias y todo tipo de contenido para impulsar la adopción de estas nuevas tecnologías con el ojo crítico e información de calidad con el que se merecen.",
    ethereumAddress: "0xCc167c4b4c4E2b72eE2Aedd7BfF9bd0B6eABdacB",
    website: "https://twitter.com/Layer2es",
    thumbnailImageLink:
      "https://pbs.twimg.com/profile_images/1529509507210039296/5TmYmR0p_400x400.jpg",
    logoCdnUrl:
      "https://pbs.twimg.com/profile_images/1529509507210039296/5TmYmR0p_400x400.jpg",
    bannerImageLink:
      "https://pbs.twimg.com/profile_banners/1529507056343973897/1653498629/1500x500",
    recipientId: 8,
    id: "8",
  },
  {
    projectName: "The Badge",
    tagline:
      "The Badge es una plataforma de certificación descentralizada construida en Ethereum blockchain, el objetivo es permitir tokenizar información tanto proveniente del mundo real como de la misma blockchain a través del concepto de badges.",
    description:
      "The Badge tiene como objetivo convertirse en una plataforma de certificación descentralizada que permita que los usuarios puedan obtener badges por eventos provenientes tanto de la blockchain como del exterior. Los badges tienen como características principales, ser NFTs intransferibles e inalienables de las wallets, y no se pueden obtener con dinero sino con habilidades que posee el dueño de dicha wallet o hitos logrados por el mismo. Ejemplos de eventos fuera de la blockchain son ser poseedor de una cuenta particular de Twitter, Github o Medium, o que el propietario de la cuenta tenga un diploma de una plataforma como Udemy, o incluso mejor, de una universidad. Ejemplos de eventos dentro de la blockchain son addresses que han tomado préstamos en Maker por un monto superior a 50k y nunca han sido liquidados por el mercado, o direcciones que han proporcionado más de 100k de liquidez a los cinco protocolos principales por un monto de tiempo mayor a un año. Habrá tres tipos de badges, on-chain badges, off-chain badges y third-party badges. Los on-chain badges se generan a través de información ya existente en la red y se generan utilizando The Graph. Los off-chain badge se generan por eventos e información del mundo exterior a la blockchain y se utiliza Kleros como mecanismo de verificación de la información. Por último están los Third-party badges, estos son generados por una entidad pública o privada que fue previamente verificada y obtuvo un permiso para emitir sus propios badges.",
    ethereumAddress: "0x81379D61acd06D01e2443C66aa7eF97A0A3285b6",
    website: "https://www.thebadge.xyz/",
    thumbnailImageLink:
      "https://drive.google.com/file/d/1eX95wpDYKWXtwXbv-McguNhY16uk2jtJ/view?usp=sharing",
    logoCdnUrl:
      "https://res.cloudinary.com/pse-qf-maci/image/upload/v1660391628/logo_thebadge_jtmosf.jpg",
    bannerImageLink:
      "https://res.cloudinary.com/pse-qf-maci/image/upload/v1660391628/banner_thebadge_kwmop2.png",
    recipientId: 9,
    id: "9",
  },
  {
    projectName: "Mujeres en Crypto",
    tagline:
      "Onboarding de mujeres con el fin de aumentar el liderazgo femenino en el ecosistema WEB3 a través de herramientas que impulsen su crecimiento personal y financiero",
    description:
      "Incentivamos y acompañamos en sus primeros pasos en el mundo crypto a entusiastas aprendices. Todo esto lo hacemos con encuentros presenciales, Spaces en twitter con referentes del ecosistema, Mentorias y grupos de trabajo en Discord.",
    ethereumAddress: "0x224d04AdeD92a2C422098FC924cdE41EE5Dc1B48",
    website: "ttps://twitter.com/mujeresencrypto",
    thumbnailImageLink:
      "https://drive.google.com/file/d/1z7mfX1cQZXKRH2Xl19CUBIBXWS_Ylcfh/view?usp=sharing",
    logoCdnUrl:
      "https://res.cloudinary.com/pse-qf-maci/image/upload/v1660391628/Mujeres_en_CryptoLogo_ry3get.png",
    bannerImageLink:
      "https://res.cloudinary.com/pse-qf-maci/image/upload/v1660391628/Mujeres_en_CryptoBanner_nlajfe.jpg",
    recipientId: 10,
    id: "10",
  },
  {
    projectName: "Deep Ecosystem",
    tagline:
      "Nuestra misión es descentralizar el acceso a los libros mientras democratizamos el hábito de la lectura.",
    description:
      "Somos Deep, una nueva forma de dominar tu conocimiento. Deep Ecosystem tiene 2 pilares fundamentales: Primero, Deep Platform. A través de nuestra plataforma tendrán la oportunidad de utilizar ese aprendizaje que obtienen de la lectura para construir algo real. Luego de leer un libro van a poder subir a Deep distintos contenidos (repositorio de GitHub, reseña, articulo, ficción complementaria) y reclamar el token que certifica que efectivamente leyeron el contenido. Por otro lado, Deep Editorial Descentralizada. Una página, un NFT. La nueva forma de apoyar a autores emergentes. Es una DAO que tiene por objetivo hacer crowd-founding, crear comunidades. Funciona como una estructura de espacios, categorizados por tipo de producción literaria donde cada autor puede presentar su preliminar, acceder al crowd-founding. Aquellos miembros de la DAO que apoyen el libro, acceden a beneficios exclusivos como contacto directo con el autor, voz y voto durante la edición, preventas exclusivas, y muchísimo más dentro de Deep.",
    ethereumAddress: "0x3F2e0Cf799bdF01FBf0dee3823F764Ef3B41eC26",
    website: "https://twitter.com/deep_ecosystem",
    thumbnailImageLink:
      "https://drive.google.com/file/d/1eipphk86Dl-KjuGnTh-EwEyt_IeTz-dn/view?usp=sharing",
    logoCdnUrl:
      "https://pbs.twimg.com/profile_images/1557368316364300289/Xw1Fvxnu_400x400.jpg",
    bannerImageLink:
      "https://pbs.twimg.com/profile_banners/1557364851793711105/1660143118/1500x500",
    recipientId: 11,
    id: "11",
  },
  {
    projectName: "DeFi Argentina",
    tagline: "Asistencia a comedores merenderos en situacion de calle",
    description:
      "Recaudamos fondos,  brindamos educacion cripto de manera gratuita, para luego repartir en diferentes comedores,merenderos y dar asistencia a personas en situacion de calle, como tambien colaboramos con emergencias Nacionales que requieran ayuda en suministros",
    ethereumAddress: "0x958D34aB7d992c8bDDa594e41E5BA478c7C9C92c",
    website: "https://twitter.com/defiargentina",
    thumbnailImageLink: "https://mobile.twitter.com/defiargentina/photo",
    logoCdnUrl:
      "https://pbs.twimg.com/profile_images/1451154572622417925/Alsg6gtj_400x400.jpg",
    bannerImageLink:
      "https://pbs.twimg.com/profile_banners/1446942496093790208/1634817188/1500x500",
    recipientId: 12,
    id: "12",
  },
  {
    projectName: "Expediente Cripto",
    tagline:
      "Expediente Cripto es un proyecto educativo legal vinculado con la Tecnología Blockchain",
    description:
      "Somos un grupo de tres estudiantes de abogacía que queremos compartir lo que sabemos de cripto y derecho. Comenzamos con una temporada de spaces e invitados abogados y abogadas: 1) Token en el Derecho, 2) NFT y Propiedad Intelectual, 3) Top 5 países criptofriendly en regulación, 4) Sueldos en cripto , 5) Demandas en Web3, 6) Smart Contracts y Derecho, 7) Estafas en Web3, 8) Cibercrimen, 9) Derecho Informático y programación, 10) Metaverso y Derecho. Queremos ser el primer proyecto de comunicación legal cripto para educar sobre estos temas. Ademas contamos con el armado de un panel que realizamos en eventos sobre 5 tips criptojuridicos que cualquier proyecto Web3 debe considerar a la hora de comenzar.",
    ethereumAddress: "0x1854e5e725C2e55B0C4C323a13e1ca26333F40a2",
    website: "https://twitter.com/naticchain",
    thumbnailImageLink: "https://i.im.ge/2022/08/15/Orjl3T.image.png",
    logoCdnUrl: "https://i.im.ge/2022/08/15/Orjl3T.image.png",
    bannerImageLink:
      "https://pbs.twimg.com/profile_banners/265023873/1647441035/1500x500",
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
