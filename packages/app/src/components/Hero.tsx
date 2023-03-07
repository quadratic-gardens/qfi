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

  const SwitchIcon = useColorModeValue(logo, logo);
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
        return hero4;
      case 3:
        return hero4;
      case 6:
        return hero4;
      case 7:
        return hero4;
      default:
        return hero4;
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
