import "@fontsource/archivo";
let projects = [
  {
    name: "Example Project",
    tagline: "This is an example project",
    description:
      "This application is the seed of an idea, to begin fundraising for a follow-up event",
    problemSpace:
    "This application is the seed of an idea, to begin fundraising for a follow-up event",
    address: "-",
    id: "1",
    recipientId: 1,
    url: "https://ethbarcelona.com/",
    logo: "https://source.unsplash.com/random",
    banner: "https://source.unsplash.com/random",
  }
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
