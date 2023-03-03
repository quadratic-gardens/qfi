import { theme as base } from "@chakra-ui/react";
import { mode } from "@chakra-ui/theme-tools";
const Button = {
  ...base.components.Button,
  // 1. Update the base styles
  baseStyle: {
    fontWeight: "medium", // Normally, it's "semibold"
    _hover: { scale: "1.05", bg: "background.50" },
  },
  // 2. Add a new button size or extend existing
  sizes: {},
  // 3. Add a new visual variant
  variants: {
    primary: {
      color: "white",
      bg: "primary.400",
      _hover: { bg: "primary.500" },
    },
    barcelona: {
      height: "50px",
      color: "white",
      justifyContent: "center",
      alignItems: "center",
      borderRadius: "50%",
      background: "rgb(53, 75, 55) none repeat scroll 0% 0%",
      fontFamily: 'Space Grotesk',
      fontWeight: "700",
      _hover: {   transition: "all 0s", transform: "rotate(-6.41deg)",  color: "white", scale: "1" },
      transform: "rotate(6.41deg)",
      width: "122px",
    },
    porto: (props:any )=>({
      height: "50px",
      width: "auto",
      textAlign: "center",
      padding: "1rem 2rem",
      display: "inline-block",
      textDecoration: "none",
      position: "relative",
      zIndex: "20",
      textTransform: "uppercase",
      
      letterSpacing: "2px",
      fontSize: "1.4rem",
      fontWeight: "700",
      color: mode(`#6953A2`, `#f6ec10`)(props),
      
      _hover: { 
        bg: mode(`transparent`, `transparent`)(props), 
        boxShadow: `0 0 10px`,
        color: mode(`#6953A2`, `#E9D100` )(props),
        textShadow: `0 0 2px ${mode(`#9353A3`, `#f6ec10`)(props)}`,
      },
      _before :{
        content: '""',
        width: "100%",
        display: "block",
        height: "100%",
        position: "absolute",
        left: "0",
        top: "0",
        zIndex: "2",
        boxShadow: `0 0 5px ${mode(`#6953A2`, `#f6ec10`)}, inset 0 0 5px ${mode(`#6953A2`, `#f6ec10`)(props)}`,
        border: `${mode(`#6953A2`, `#f6ec10`)(props)} 2px solid`,
        borderRadius: "8px",
      },
      _after :{
        content: '""',
        width: "100px",
        display: "block",
        height: "16px",
        position: "absolute",
       
        backgroundColor: mode(`6953A2`, `#020e38`)(props),
        right: "-20px",
        bottom: "-9px",
        zIndex: "3",
      }
    }),
    sideNav: {
      bg: "transparent",
      color: "whiteAlpha.900",
      borderRadius: "9999px",
      height: "56px",
      alignItems: "center",
      justifyContent: "flex-start",
      _hover: { bg: "transparent", color: "secondary.500", scale: "1" },
      _active: {
        boxShadow: "none",
        borderColor: "transparent",
        outline: "none",
        backgroundColor: "white",
      },
      _focus: {
        boxShadow: "none",
        borderColor: "transparent",
        outline: "none",
      },
    },
    magik: (props: any) => ({
      ...base.components.Button.variants.solid(props),
      bg: mode(`gray.100`, `whiteAlpha.200`)(props),
      color: mode(`gray.800`, `whiteAlpha.900`)(props),
    }),
    // 4. Override existing variants
    outline: (props: any) => ({
      ...base.components.Button.variants.outline(props),
      bg: "transparent",
      _active: { bg: "inherit" },
    }),
  },
};

export default Button;
