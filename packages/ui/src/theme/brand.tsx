import { rgba } from "polished";
import BrandImg from "../assets/logo.svg";
import BgImg from "../assets/logo.svg";

export const defaultTheme: {
  primary: string;
  primaryAlpha: string;
  secondary: string;
  secondaryAlpha: string;
  background: string;
  backgroundAlpha: string;
  backgroundOverlayOpacity: number;
  mode: string;
  headingFont: string;
  bodyFont: string;
  monoFont: string;
  avatarImg: string;
  bgImg: string;
  text: string;
  link: string;
  branding: any;
} = {
  primary: "#9c1783",
  primaryAlpha: rgba("#10153d", 0.9),
  secondary: rgba("#8796FA", 0.85),
  secondaryAlpha: rgba("#10153d", 0.75),
  background: "#1A1A1A",
  backgroundAlpha: "#03061B",
  backgroundOverlayOpacity: 0.75,
  mode: "#FFFFFF",
  headingFont: "Helvetica",
  bodyFont: "Helvetica",
  monoFont: "Times",
  avatarImg: BrandImg,
  bgImg: BgImg,
  text: "#FFFFFF",
  link: "#FFFFFF",
  branding: {
    projects: "Projects",
    project: "Project",
  },
};
