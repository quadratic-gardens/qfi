import * as React from "react";
import { PropsWithChildren } from "react";
import {
  InputProps,
  Input,
  FormControl,
  FormHelperText,
  FormLabel,
  FormErrorMessage,
} from "@chakra-ui/react";

type BaseInputProps = Omit<InputProps, ""> &
  PropsWithChildren<{
    name: string;
    label: string;
    placeHolder: string;
    formHelperText: string;
    formErrorMessage: string;
    ref: React.Ref<HTMLInputElement>;
    isInvalid: any;
    errorMessage: any;
  }>;

export const BaseInput = ({
  name,
  label,
  placeholder,
  formHelperText,
  formErrorMessage,
  ref,
  isInvalid,
  children,
  ...rest
}: BaseInputProps) => {
  return (
    <FormControl isInvalid={isInvalid}>
      <FormLabel htmlFor={label}>{label}</FormLabel>
      {children}
      <Input name={name} placeholder={placeholder} ref={ref} id={name} {...rest} />
      {isInvalid ? (
        <FormHelperText>{formHelperText}</FormHelperText>
      ) : (
        <FormErrorMessage>{formErrorMessage}</FormErrorMessage>
      )}
    </FormControl>
  );
};


export interface RegisterHelper {
  required?: string;
  validate?: any;
  pattern?: {
    value: RegExp;
    message: string;
  };
  setValueAs?: (value: any) => any;
}
/////////////REACT-HOOK-FORM HELPERS////////////////

const registerAddress: RegisterHelper = {
  required: "This field is required",
  pattern: {
    value: /^0x[a-fA-F0-9]{40}$/,
    message: "Invalid ethereum address",
  },
  setValueAs: (value) => value,
};
const registerUint256: RegisterHelper = {
  required: "This field is required",
  pattern: {
    value: /^[0-9]+$/,
    message: "Invalid amount",
  },
  setValueAs: (value) => value,
};

const registerUint8: RegisterHelper = {
  required: "This field is required",
  pattern: {
    value: /^[0-9]+$/,
    message: "Invalid amount",
  },
  setValueAs: (value) => value,
};
const registerBytes32: RegisterHelper = {
  required: "This field is required",
  pattern: {
    value: /^0x[a-fA-F0-9]+$/,
    message: "Invalid hex in call data",
  },
  setValueAs: (value) => value,
};
const registerBytes: RegisterHelper = {
  required: "This field is required",
  pattern: {
    value: /^0x[a-fA-F0-9]+$/,
    message: "Invalid hex in call data",
  },
  setValueAs: (value) => value,
};
const registerString: RegisterHelper = {
  required: "This field is required",
  pattern: {
    value: /[a-zA-Z0-9]+/,
    message: "Invalid string in call data",
  },
  setValueAs: (value) => value,
};


export const MagikInput = {
  
  Address: BaseInput,
  Uint8: BaseInput,
  Uint256: BaseInput,
  Bytes32: BaseInput,
  Bytes: BaseInput,
  String: BaseInput,
  registerAddress: registerAddress,
  registerUint8: registerUint8,
  registerUint256: registerUint256,
  registerBytes32: registerBytes32,
  registerBytes: registerBytes,
  registerString: registerString,
};
export default MagikInput;