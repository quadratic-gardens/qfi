import "@fontsource/archivo";
let projects = [
  {
    "recipientId": 1,
    "projectName": "zkPoEX",
    "tagline": "zkPoEX: Bridging DeFi Security. Developed at ETH Denver, it enables white hat hackers to privately report live vulnerabilities in smart contracts, fostering collaboration among security experts and DeFi teams.",
    "description": "zkPoEX (zk proof of exploit) is a Proof-of-Concept developed at ETH Denver Hackathon with the aim to facilitate communication and collaboration between security experts and teams in the decentralized finance (DeFi) space by enabling white hat hackers to report live vulnerabilities in smart contracts while maintaining the confidentiality of the exploit.",
    "ethereumAddress": "0x000000000000000000000000000000000000dEaD",
    "website": "https://github.com/zkoranges/zkPoEX",
    "thumbnailImageLink": "https://pbs.twimg.com/profile_images/1632255570135719937/9I6BLDPW_400x400.jpg",
    "logoCdnUrl": "https://pbs.twimg.com/profile_images/1632255570135719937/9I6BLDPW_400x400.jpg",
    "bannerImageLink": "https://raw.githubusercontent.com/zkoranges/zkPoEX/main/img.jpg",
    "id": "1"
  },
  {
    "recipientId": 2,
    "projectName": "Revoke Cash",
    "tagline": "Manage your token allowances and protect yourself from scams on 40+ chains, including Ethereum, BSC and Polygon",
    "description": "Do you ever feel uneasy about the different dapps that you gave approval to spend ERC20 tokens from your account? revoke.cash allows you to inspect all the contracts you've approved to spend money on your behalf, and revoke their access for the ones you no longer need. If you don't want to completely revoke access, it's also possible to update the amount they are allowed to spend instead.",
    "ethereumAddress": "0x000000000000000000000000000000000000dEaD",
    "website": "https://github.com/RevokeCash/revoke.cash",
    "thumbnailImageLink": "https://pbs.twimg.com/profile_images/1552013577443221505/lS1ukRjh_400x400.jpg",
    "logoCdnUrl": "https://pbs.twimg.com/profile_images/1552013577443221505/lS1ukRjh_400x400.jpg",
    "bannerImageLink": "https://pbs.twimg.com/profile_banners/1495312249833017344/1674669807/1500x500",
    "id": "2"
  }
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
