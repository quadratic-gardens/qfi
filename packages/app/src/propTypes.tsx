export type SideNavProps = {
  onSettingsOpen: () => void;
};
export type LayoutProps = {
  isOpen: boolean;
  onSettingsOpen: () => void;
  onClose: () => void;
};

export type BallotOptionProps = {
  ballotOption?: Option;
  to?: string;
  onClick?: () => void;
  lastOption?: boolean;

  votes?: number;
};

export type Option = {
  name: string;
  id: string;
  address: string;
  url: string;
  description: string;
  image: string;
  problemSpace: string;
  tagline: string;
};
