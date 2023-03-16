import {
  chakra,
  keyframes,
  ImageProps,
  forwardRef,
  usePrefersReducedMotion,
  useColorModeValue,
  AspectRatio,
} from "@chakra-ui/react";

import logo from "./assets/logo.png";
import hero from "./assets/Hero.png";
import hero4 from "./assets/hero4.gif";

const spin = keyframes`
  from { transform: rotate(360deg); }
  to { transform: rotate(0deg); }
`;

export const Logo = forwardRef<ImageProps, "img">((props, ref) => {
  const prefersReducedMotion = usePrefersReducedMotion();

  const SwitchIcon = useColorModeValue("https://res.cloudinary.com/pse-qf-maci/image/upload/v1678967923/transformersAnimated_lilhwd.gif", "https://res.cloudinary.com/pse-qf-maci/image/upload/v1678967923/transformersAnimated_lilhwd.gif");
  // const animation = prefersReducedMotion ? undefined : `${spin} infinite 60s linear`;

  return <chakra.img  src={SwitchIcon} ref={ref} {...props} rounded="full" />;
});

export const Hero = forwardRef<ImageProps, "img">((props, ref) => {
  const prefersReducedMotion = usePrefersReducedMotion();
  //2,3,6,7
  const RandomHeroLight = () => {
    const rand = Math.floor(Math.random() * 6) + 2;
    switch (rand) {
      case 2:
        return "https://res.cloudinary.com/pse-qf-maci/image/upload/v1678968535/transformersAnimated_nokpma.gif";
      case 3:
        return "https://res.cloudinary.com/pse-qf-maci/image/upload/v1678968535/transformersAnimated_nokpma.gif";
      case 6:
        return "https://res.cloudinary.com/pse-qf-maci/image/upload/v1678968535/transformersAnimated_nokpma.gif";
      case 7:
        return "https://res.cloudinary.com/pse-qf-maci/image/upload/v1678968535/transformersAnimated_nokpma.gif";
      default:
        return "https://res.cloudinary.com/pse-qf-maci/image/upload/v1678968535/transformersAnimated_nokpma.gif";
    }
  };
  const RandomHeroDark = () => {
    const rand = Math.floor(Math.random() * 6) + 2;
    switch (rand) {
      case 2:
        return hero;
      case 3:
        return hero;
      case 6:
        return hero;
      case 7:
        return hero;
      default:
        return hero;
    }
  };
  const SwitchIcon = useColorModeValue(RandomHeroLight(), RandomHeroDark());

  // const animation = prefersReducedMotion ? undefined : `${spin} infinite 200000000s linear`;


  return (
      <chakra.img  src={SwitchIcon} ref={ref} {...props} />
  );
});
