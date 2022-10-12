import { rgba } from "polished";
import BrandImg from "../assets/logo.png";
import BgImg from "../assets/logo.png";


export const defaultTheme: {
  primary: { light: string; dark: string; };
  primaryAlpha: string;
  secondary: { light: string; dark: string; };
  secondaryAlpha: string;
  background: { light: string; dark: string; };
  backgroundAlpha: string;
  backgroundOverlayOpacity: number;
  mode: string;
  headingFont: string;
  bodyFont: string;
  monoFont: string;
  avatarImg: string;
  bgImg: string;
  text: { light: string; dark: string; };
  border: { light: string; dark: string; };
  link: string;
  branding: any;
} = {
  primary: {
    light: "#FAFAFA",
    dark: "#222222",
  },
  primaryAlpha: rgba("#10153d", 0.9),
  secondary: {
    light: "#FAFAFA",
    dark: "#222222",
    
  },
  border: {
    light: "#4A5568",
    dark: "#E2E8F0",
    
  },
 
  secondaryAlpha: rgba("#10153d", 0.75),

  background: {
    light: "#EDF2F7",
    dark: "#2D3748",
  },
  backgroundAlpha: "#03061B",
  backgroundOverlayOpacity: 0.75,
  mode: "#FFFFFF",
  headingFont: "Helvetica",
  bodyFont: "Helvetica",
  monoFont: "Times",
  avatarImg: BrandImg,
  bgImg: BgImg,
  text: { light: "#FFFFFF", dark: "#222222" },
  link: "#FFFFFF",
  branding: {
    projects: "Projects",
    project: "Project",
  },
};