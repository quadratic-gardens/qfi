import "@fontsource/archivo";
let projects = [
  {
    name: "Notarealballot @ Prague",
    id: "1",
    address: "0x1234...890",
    url: "https://chickenNuggets.com",
    description:
      "This isn't a real project but if it was this would be a short description of it that you could use to remember how you found them.",
    image: "https://ipfs.io/ipfs/Qmdv4JLE82GuSEPh3LygDBPYpVwet4R4znLbjqrZMYKFkM",
    tagline: "This is a tagline",
    problemSpace:
      "The problem we are trying to solve is to give public goods -- in the form of chicken nuggies -- to people who need them at the conference.",
  },
  {
    name: "EthPrague community coffee",
    id: "2",
    address: "0x122...67890",
    url: "https://ethprague.com",
    description:
    "EthPrague is a community coffee project that aims to bring together cofee lovers attending the conference. We are a community of people who are passionate about coffee and coffee culture.",
    image: "https://ipfs.io/ipfs/Qmay2DQmKLVHHRkzxZCyLY1pKwMkaHcXVYGEgaFFmB2wgr",
    tagline: "This is a tagline",
    problemSpace:
    "The problem we are trying to solve is to give public goods -- in the form of coffee -- to people who need them at the conference.",
  },
  {
    name: "Prague Hackathon Project",
    id: "0",
    address: "benbitdiddle.eth",
    url: "https://hack.ethprague.com",
    description:
    "Cool Hackathon project at ethPrague, that won some prizes and could use some funding to make it a reality.",
    image: "https://c.gitcoin.co/grants/879baf14dbc03514b7f7ea0d64725866/RxC.jpg",
    tagline: "This is a tagline",
    problemSpace:
    "The problem we are trying to solve is to create public goods -- in the form of this hack -- for people who need them.",
  },
  {
    name: "EthPrague Related DAO",
    id: "3",
    address: "0x122...67890",
    url: "https://ethprague.com",
    description: "Give back to the community.",
    image: "https://ipfs.io/ipfs/QmYoqQ9W2V2gpVt5K9RVq5TYoMbd6g7Fi2yYnLzgKDFz9L",
    tagline: "This is a tagline",
    problemSpace:
    "The problem we are trying to solve is to fund public goods -- in the form of DAO things -- so that we can do things.",
  },
  {
    name: "Your Project?",
    id: "4",
    address: "0x122...67890",
    url: "https://yourproject.com",
    description: "Public goods? you got em.",
    image: "https://source.unsplash.com/random",
    tagline: "This is a tagline",
    problemSpace: "What is the problem you are trying to solve ?",
  },
];

export function getProjects() {
  return projects;
}

export function getProject(id: string) {
  return (
    projects.find((p) => p.id === id) ?? {
      name: "Your Project?",
      id: "4",
      address: "0x1234567890123456789012345678901234567890",
      url: "https://yourproject.com",
      description: "Public goods? you got em.",
      image: "https://source.unsplash.com/random",
      tagline: "This is a tagline",
      problemSpace: "What is the problem you are trying to solve ?",
    }
    );
  }