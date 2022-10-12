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
    light: "#69A197",
    dark: "#69A197",
  },
  primaryAlpha: rgba("#10153d", 0.9),
  secondary: {
    light: "#F9DC5C",
    dark: "#F9DC5C",
    
  },
  border: {
    light: "#E3514F",
    dark: "#E2E8F0",
    
  },
 
  secondaryAlpha: rgba("#10153d", 0.75),
  background: {
    light: "#F4FDD2",
    dark: "#2D3748",
  },
  backgroundAlpha: "#F4FDD2",
  backgroundOverlayOpacity: 0.75,
  mode: "#FFFFFF",
  headingFont: "Helvetica",
  bodyFont: "Helvetica",
  monoFont: "Times",
  avatarImg: BrandImg,
  bgImg: BgImg,
  text: { light: "#FFFFFF", dark: "#151616" },
  link: "#FFFFFF",
  branding: {
    projects: "Projects",
    project: "Project",
  },
};