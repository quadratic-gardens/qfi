const Link = {
  baseStyle: {
    transition: "all 0.15s linear",
    color: "link.500",
    _hover: { textDecoration: "none", color: "link.500" },
  },
  variants: {
    ethLatamGreen: {
      color: "black",
      justifyContent: "center",
      alignItems: "center",
      background: "#80FF9F",
      fontWeight: 400,
      fontFamily: "NeuePixelGrotesk",
      _hover: { background: "#80FF9F", color: "black" },
    },
  },
};

export default Link;
