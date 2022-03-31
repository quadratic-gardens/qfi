import { PopoverProps } from "@chakra-ui/react";

type CustomPopoverProps = Omit<PopoverProps, "width"> & {
  width: number;
};
const Popover = {
  parts: ["popper"],
  baseStyle: (props: CustomPopoverProps) => ({
    popper: {
      zIndex: 10,
      maxW: props.width ? props.width : "xs",
      w: "100%",
    },
  }),
};

export default Popover;
