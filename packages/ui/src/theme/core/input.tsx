const Input = {
  parts: ["field", "addon"],

  variants: {
    outline: {
      field: {
        color: "mode.900",
        bg: "transparent",
        borderColor: "mode.900",
        _focus: {
          borderColor: "secondary.500",
          boxShadow: "0 0 0 2px var(--chakra-colors-secondary-500)",
        },
      },
      addon: {
        borderColor: "mode.900",
        color: "white",
        bg: "transparent",
        _focus: {
          borderColor: "secondary.500",
        },
      },
    },
    ethLatamWhite: {
      field: {
        height: "50px",
        color: "#FAF7F5",
        justifyContent: "center",
        padding: "0 36px",
        borderRadius: 0,
        alignItems: "center",
        background: "#1A1A1A",
        fontWeight: 400,
        fontFamily: "NeuePixelGrotesk",
        border: "1.79753px solid #FAF7F5",
        boxShadow: "-4.49382px 4.49382px 0px #FAF7F5",
        focus: {
          transition: "all 0s",
          color: "#FAF7F5",
          scale: "1",
          background: "#282828",
        },
      },
    },
  },
  sizes: {},
  defaultProps: {
    size: "md",
    _focus: {
      borderColor: "secondary.500",
    },
  },
};

export default Input;
