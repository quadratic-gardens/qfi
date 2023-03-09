import React, { useState } from "react";
import { Button, Heading, Flex } from "@chakra-ui/react";

import { useToast } from "@chakra-ui/react";

const Form1 = () => {
  const [step, setStep] = useState(0);
  const [poseidonT2, setT2] = React.useState("");
  const HandleClick = () => {
    useToast(poseidonT2);
    setT2("deployed");
  };
  return (
    <>
      <Heading w="100%" textAlign={"center"} fontWeight="normal" mb="2%">
        User Registration
      </Heading>
      <Flex>
        <Button
          onClick={() => {
            setStep(step + 1);
            setProgress(progress + 33.33);
            HandleClick();
          }}
          isDisabled={step !== 0}
          colorScheme="teal"
          variant="solid"
          w="7rem"
          mr="5%">
          T2
        </Button>
        <Button
          onClick={() => {
            setStep(step + 1);
            setProgress(progress + 33.33);
            HandleClick();
          }}
          isDisabled={step !== 1}
          colorScheme="teal"
          variant="solid"
          w="7rem"
          mr="5%">
          T3
        </Button>
      </Flex>
    </>
  );
};
