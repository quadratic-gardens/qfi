import { ColorMode, extendTheme, Theme,  } from "@chakra-ui/react";
import { theme as defaultTheme } from "@chakra-ui/theme";
import { StepsStyleConfig as Steps } from "chakra-ui-steps";
import { lighten, darken } from "polished";
import { mode } from '@chakra-ui/theme-tools';


import Badge from "./core/badge";
import Button from "./core/button";
import FormLabel from "./core/formLabel";
import Heading from "./core/heading";
import IconButton from "./core/iconButton";
import Input from "./core/input";
import Link from "./core/link";
import Menu from "./core/menu";
import Modal from "./core/modal";
import NumberInput from "./core/numberInput";
import Popover from "./core/popover";
import Tabs from "./core/tabs";
import Textarea from "./core/textarea";

import { defaultTheme as customTheme } from "./brand";
const activeLabelStyles = {
  transform: "scale(0.85) translateY(-24px)",
};

export interface Brand extends Theme {
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
  link: string;
  branding: any;
  border: { light: string; dark: string; };
}

const themeKeys = Object.keys(customTheme);
const brand: Brand  = {
  ...defaultTheme,
  ...themeKeys.reduce((acc: any, prop): {} => {
    //@ts-ignore
    acc[prop] = customTheme[prop] || defaultTheme[prop];
    return acc;
  }, {}),
};
// Add color mode config
const colormode: ColorMode | undefined = "light";
const config = {
  initialColorMode: colormode,
  useSystemColorMode: false,
};

export const theme = extendTheme({
  active: true,
  colors: {
    secondaryAlpha: brand.secondaryAlpha,
    primaryAlpha: brand.primaryAlpha,

    link: {
      50: lighten(0.4, brand.link),
      100: lighten(0.3, brand.link),
      200: lighten(0.2, brand.link),
      300: lighten(0.1, brand.link),
      400: lighten(0.05, brand.link),
      500: brand.link,
      600: darken(0.05, brand.link),
      700: darken(0.1, brand.link),
      800: darken(0.15, brand.link),
      900: darken(0.2, brand.link),
    },
    text: {
      0: brand.text.light,
      50: lighten(0.05, brand.text.light),
      100: lighten(0.1, brand.text.light),
      200: lighten(0.2, brand.text.light),
      300: lighten(0.3, brand.text.light),
      400: lighten(0.4, brand.text.light),
      500: brand.text.light,
      600: darken(0.2, brand.text.dark),
      700: darken(0.15, brand.text.dark),
      800: darken(0.1, brand.text.dark),
      900: darken(0.05, brand.text.dark),
      1000: brand.text.dark
    },
    border: {
      0: brand.border.light,
      50: lighten(0.05, brand.border.light),
      100: lighten(0.1, brand.border.light),
      200: lighten(0.2, brand.border.light),
      300: lighten(0.3, brand.border.light),
      400: lighten(0.4, brand.border.light),
      500: brand.border.light,
      600: darken(0.2, brand.border.dark),
      700: darken(0.15, brand.border.dark),
      800: darken(0.1, brand.border.dark),
      900: darken(0.05, brand.border.dark),
      1000: brand.border.dark
    },
    primary: {
      0: brand.primary.light,
      50: lighten(0.05, brand.primary.light),
      100: lighten(0.1, brand.primary.light),
      200: lighten(0.2, brand.primary.light),
      300: lighten(0.3, brand.primary.light),
      400: lighten(0.4, brand.primary.light),
      500: brand.primary.light,
      600: darken(0.2, brand.primary.dark),
      700: darken(0.15, brand.primary.dark),
      800: darken(0.1, brand.primary.dark),
      900: darken(0.05, brand.primary.dark),
      1000: brand.primary.dark
    },
    background: {
      0: brand.background.light,
      50: lighten(0.05, brand.background.light),
      100: lighten(0.1, brand.background.light),
      200: lighten(0.2, brand.background.light),
      300: lighten(0.3, brand.background.light),
      400: lighten(0.4, brand.background.light),
      500: brand.background.light,
      600: darken(0.2, brand.background.dark),
      700: darken(0.15, brand.background.dark),
      800: darken(0.1, brand.background.dark),
      900: darken(0.05, brand.background.dark),
      1000: brand.background.dark
    },
    secondary: {
      0: brand.secondary.light,
      50: lighten(0.05, brand.secondary.light),
      100: lighten(0.1, brand.secondary.light),
      200: lighten(0.2, brand.secondary.light),
      300: lighten(0.3, brand.secondary.light),
      400: lighten(0.4, brand.secondary.light),
      500: brand.secondary.light,
      600: darken(0.2, brand.secondary.dark),
      700: darken(0.15, brand.secondary.dark),
      800: darken(0.1, brand.secondary.dark),
      900: darken(0.05, brand.secondary.dark),
      1000: brand.secondary.dark
    },
  },
  images: {
    avatarImg: brand.avatarImg,
    bgImg: brand.bgImg,
  },
  fonts: {
    heading: `'Helvetica', serif`,
    body: `'Helvetica', sans-serif`,
    mono: brand.monoFont,
    accessory: "Roboto Mono",
    space: "Space Mono",
  },
  meta: {
    projects: brand.branding.projects,
    project: brand.branding.project,
  },
  components: {
    // core components
    Button,
    Badge,
    FormLabel,
    Heading,
    IconButton,
    Input,
    Link,
    Menu,
    Modal,
    NumberInput,
    Popover,
    Tabs,
    Textarea,
    Steps,
    Form: {
      variants: {
        floating: (props: any) => ({
          container: {
            _focusWithin: {
              label: {
                ...activeLabelStyles,
              },
            },
            "input:not(:placeholder-shown) + label, .chakra-select__wrapper + label": {
              ...activeLabelStyles,
            },
            label: {
              top: 0,
              left: 0,
              zIndex: 2,
              position: "absolute",
              backgroundColor: mode(`background.0`, `background.1000`)(props),
              pointerEvents: "none",
              mx: 3,
              px: 1,
              my: 2,
              transformOrigin: "left top",
            },
          },
        }),
      },
    },

    // custom components
  },
  styles: {
    bgOverlayOpacity: brand.backgroundOverlayOpacity,
    global: (props: any) => ({
      "html, body": {
        fontSize: "m",
        lineHeight: "tall",
      },
      body:{
        bg: mode(`background.0`, `background.1000`)(props),
        color: mode(`text.1000`, `text.0`)(props),
      },
      a: {
        transition: "all 0.15s linear",
        color: "secondary.400",
        _hover: { textDecoration: "none", color: "gray.500" },
      },
    }),
  },
  config,
});

export default theme;
