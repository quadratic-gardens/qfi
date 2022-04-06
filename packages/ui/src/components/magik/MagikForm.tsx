import * as React from "react";
import { PropsWithChildren } from "react";
import { Button, ButtonProps, ChakraProps, chakra } from "@chakra-ui/react";

type FormProps = Omit<ChakraProps, "onSubmit"> &
  PropsWithChildren<{
    formState?: {
      errorText?: string;
      txLink?: string;
      txStatus?: any;
    };
    onSubmit: (e: React.FormEvent<HTMLFormElement>) => void;
  }>;

//TODO: wrap in motion components and display form state
export const Form = ({ formState, onSubmit, children, ...rest }: FormProps) => {
  const { errorText, txLink, txStatus } = formState || {};
  return (
    <chakra.form onSubmit={onSubmit} {...rest}>
      {React.Children.toArray(children).map(
        (child) =>
          React.isValidElement(child) &&
          React.cloneElement(child, {
            my: 1,
          })
      )}
    </chakra.form>
  );
};

type SubmitProps = Omit<ButtonProps, "disabled"> &
  PropsWithChildren<{
    disabled?: boolean;
    loading: boolean;
    loadingMessage: string;
    submitText: string;
  }>;

export const FormSubmit = ({ disabled, loading, loadingMessage, submitText, children, ...rest }: SubmitProps) => {
  const buttonText = loading ? loadingMessage : submitText;
  return (
    <Button disabled={disabled} {...rest}>
      {buttonText}
    </Button>
  );
};

export const MagikForm = {
  Form: Form,
  Submit: FormSubmit,
};

export default MagikForm;
