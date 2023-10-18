import { ColorMode, extendTheme } from "@chakra-ui/react";
import { theme as defaultTheme } from "@chakra-ui/theme";
import { StepsStyleConfig as Steps } from "chakra-ui-steps";
import { lighten, darken } from "polished";
import { mode } from "@chakra-ui/theme-tools";
import { theme as base } from "@chakra-ui/react";

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

const themeKeys = Object.keys(customTheme);
const brand = {
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
      50: lighten(0.4, brand.text),
      100: lighten(0.3, brand.text),
      200: lighten(0.2, brand.text),
      300: lighten(0.1, brand.text),
      400: lighten(0.05, brand.text),
      500: brand.text,
      600: darken(0.05, brand.text),
      700: darken(0.1, brand.text),
      800: darken(0.15, brand.text),
      900: darken(0.2, brand.text),
    },
    primary: {
      50: lighten(0.4, brand.primary),
      100: lighten(0.3, brand.primary),
      200: lighten(0.2, brand.primary),
      300: lighten(0.1, brand.primary),
      400: lighten(0.05, brand.primary),
      500: brand.primary,
      600: darken(0.05, brand.primary),
      700: darken(0.1, brand.primary),
      800: darken(0.15, brand.primary),
      900: darken(0.2, brand.primary),
    },
    background: {
      50: lighten(0.4, brand.background),
      100: lighten(0.3, brand.background),
      200: lighten(0.2, brand.background),
      300: lighten(0.1, brand.background),
      400: lighten(0.05, brand.background),
      500: brand.background,
      600: darken(0.05, brand.background),
      700: darken(0.1, brand.background),
      800: darken(0.15, brand.background),
      900: darken(0.2, brand.background),
    },
    secondary: {
      50: lighten(0.4, brand.secondary),
      100: lighten(0.3, brand.secondary),
      200: lighten(0.2, brand.secondary),
      300: lighten(0.1, brand.secondary),
      400: lighten(0.05, brand.secondary),
      500: brand.secondary,
      600: darken(0.05, brand.secondary),
      700: darken(0.1, brand.secondary),
      800: darken(0.15, brand.secondary),
      900: darken(0.2, brand.secondary),
    },
  },
  images: {
    avatarImg: brand.avatarImg,
    bgImg: brand.bgImg,
  },
  fonts: {
    heading: `'Space Grotesk', serif`,
    body: `'Space Grotesk', sans-serif`,
    mono: brand.monoFont,
    accessory: "Space Grotesk",
    space: "Space Grotesk",
  },
  meta: {
    projects: brand.branding.projects,
    project: brand.branding.project,
  },
  components: {
    // core components
    Accordion: {
      variants: {
        porto: (props: any) => ({
          container: {
            padding: "3rem 3rem",
            borderRadius: mode("3px", "16px")(props),
            position: "relative",
            display: "flex",
            flexDirection: "column",

            justifyContent: "flex-start",
            _before: {
              content: '""',
              zIndex: "-3",
              boxShadow: `0 0 10px ${mode(`gray.100`, `#9eeafd`)(props)}, inset 0 0 10px ${mode(`gray.100`, `#9eeafd`)(props)} !important`,
              border: `${mode(`#6953A2`, `#9eeafd`)(props)} 2px solid`,
              borderRadius: mode("3px", "16px")(props),
              width: "98% !important",

              height: "100%",
              position: "absolute",
              left: "0",
              top: "0",
              right: "0",
            },
            _after: {
              content: '""',
              width: "200px",
              height: "30px",
              position: "absolute",
              backgroundColor: mode(`transparent`, `#0D1429`)(props),
              right: "-20px",
              top: "-15px",
              zIndex: "-2",
            },
          },
          button: {
            _focus: {
              boxShadow: "none",
            },
            _hover: { 
              bg: mode(`transparent`, `transparent`)(props), 
              boxShadow: mode(`0`, `1px 1px 0px 1px`)(props),
              color: mode(`#6953A2`, `#E9D100` )(props),
              textShadow: `0 0 2px ${mode(`grey.100`, `#f6ec10`)(props)}`,
            },
          },
        }),
      },
    },
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
              backgroundColor: mode(`gray.100`, `#020e38`)(props),
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
    bgOverlayOpacity: brand.bgOverlayOpacity,
    global: (props: any) => ({
      "html, body": {
        fontSize: "m",
        color: "mode.900",
        lineHeight: "tall",
      },
      body: {
        bg: mode(`gray.100`, `#0D1429`)(props),
        color: mode(`gray.800`, `whiteAlpha.900`)(props),
      },
      a: {
        transition: "all 0.15s linear",
        color:  mode(`secondary.400`, `blue.500`)(props),
        _hover: { textDecoration: "none", color: "secondary.500" },
      },
    }),
  },
  config,
});

export default theme;
