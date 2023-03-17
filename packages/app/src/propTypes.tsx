export type SideNavProps = {
  onGuideOpen: () => void;
};

export type LayoutProps = {
  onGuideOpen : () => void;
  onGuideClose : () => void;
  isGuideOpen : boolean;
};

export type BallotOptionProps = {
  ballotOption?: Option;
  to?: string;
  onClick?: () => void;
  lastOption?: boolean;

  votes?: number;
};

export type Option = {
  projectName: string;
  tagline: string;
  description: string;
  ethereumAddress: string;
  website: string;
  thumbnailImageLink: string;
  logoCdnUrl:string;
  bannerImageLink: string;
  id: string;
  recipientId: number;
};
