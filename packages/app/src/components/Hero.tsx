import {
  chakra,
  keyframes,
  ImageProps,
  forwardRef,
  usePrefersReducedMotion,
  useColorModeValue,
} from "@chakra-ui/react";

import logo2 from "./assets/logo2.svg";
import logo3 from "./assets/logo3.svg";
import logo5 from "./assets/logo5.svg";
import logo6 from "./assets/logo6.svg";
import logo7 from "./assets/logo7.svg";
import logo8 from "./assets/logo8.svg";
import logo9 from "./assets/logo9.svg";

const spin = keyframes`
  from { transform: rotate(0deg); }
  to { transform: rotate(360deg); }
`;

export const Logo = forwardRef<ImageProps, "img">((props, ref) => {
  const prefersReducedMotion = usePrefersReducedMotion();

  const SwitchIcon = useColorModeValue(logo2, logo9);
  const animation = prefersReducedMotion ? undefined : `${spin} infinite 20s linear`;

  return <chakra.img animation={animation} src={SwitchIcon} ref={ref} {...props} />;
});

export const Hero = forwardRef<ImageProps, "img">((props, ref) => {
  const prefersReducedMotion = usePrefersReducedMotion();
  //2,3,6,7
  const RandomHeroLight = () => {
    const rand = Math.floor(Math.random() * 6) + 2;
    switch (rand) {
      case 2:
        return logo2;
      case 3:
        return logo3;
      case 6:
        return logo6;
      case 7:
        return logo7;
      default:
        return logo2;
    }
  };
  const RandomHeroDark = () => {
    const rand = Math.floor(Math.random() * 6) + 2;
    switch (rand) {
      case 2:
        return logo7;
      case 3:
        return logo8;
      case 6:
        return logo9;
      case 7:
        return logo5;
      default:
        return logo8;
    }
  };
  const SwitchIcon = useColorModeValue(RandomHeroLight(), RandomHeroDark());

  const animation = prefersReducedMotion ? undefined : `${spin} infinite 200000000s linear`;

  const light = <chakra.img animation={animation} src={SwitchIcon} ref={ref} {...props} />;
  return light;
});
