import React, { useEffect, useState } from "react";
import {
  VStack,
  Container,
  Flex,
  Text,
  Heading,
  Button,
  Link,
  useColorModeValue,
  Divider,
  HStack,
  PinInput,
  PinInputField,
  Wrap,
} from "@chakra-ui/react";
import { animateText, MagikButton, MagikText } from "@qfi/ui";
import { Hero } from "../components/Hero";
import { ColorModeSwitcher } from "../components/ColorModeSwitcher";
import { useDappState } from "../context/DappContext";
import { QrReader } from "react-qr-reader";

export type HomeProps = {
  isSettingsOpen: boolean;
  onSettingsOpen: () => void;
  isGuideOpen: boolean;
  onGuideOpen: () => void;
};

export const Begin = ({ isSettingsOpen, onSettingsOpen, isGuideOpen, onGuideOpen }: HomeProps) => {
  const color = useColorModeValue("gray.800", "gray.700");

  const [key, setKey] = useState<string>();
  const [keyType, setKeyType] = useState<string>();
  const [openQRCodeReader, setOpenQRCodeReader] = useState(false);
  const onClickSetOpenQRCodeReader = () => setOpenQRCodeReader(!openQRCodeReader);

  const { maciKey, setMaciKey } = useDappState();

  useEffect(() => {
    if(maciKey) {
      setKey(maciKey);
    }
  },[setKey, maciKey])
  const handleChange = (value: string) => {
    setKey(value);
    console.log("changed");
  };

  const handleComplete = (value: string) => {
    console.log("complete");
    setMaciKey(value);
  };
  console.log("maciKey", maciKey);
  return (
    <Flex
      as="main"
      h="full"
      flex={1}
      borderRightColor={color}
      borderRightWidth={1}
      overflowY={"scroll"}
      sx={{
        scrollbarColor: "green",
        "::-webkit-scrollbar": {
          width: "0px",
        },

        "::-webkit-scrollbar-track": {
          boxShadow: "inset 0 0 0px grey",
          borderRadius: "0px",
        },

        "::-webkit-scrollbar-thumb": {
          background: "transparent",
          borderRadius: "0px",
        },
      }}>
      <VStack spacing={0} w="full">
        <Container h="full" w="full" maxWidth="container.sm">
          <VStack mt={10} spacing={4} h="full" alignItems="flex-start">
            <Container maxWidth={{ lg: "container.md", md: "container.md" }} py={100}>
              <VStack spacing={0} w="full" alignItems={"flex-end"}>
                <ColorModeSwitcher position="absolute" top={0} right={0} m={4} zIndex={1} />
              </VStack>
              <VStack spacing={2} h="full" alignItems={"flex-start"}>
                <VStack
                  spacing={6}
                  h="full"
                  pb={8}
                  alignItems={{ base: "flex-start", xl: "center" }}
                  display="contents"
                  mt={{ base: "80px", xl: "60px" }}>
                  <VStack spacing={6} alignItems="flex-start">
                    <Heading size="4xl">Account Setup</Heading>
                    <Text fontFamily={"archivo"}>
                      Casting a Ballot requires you to have a wallet on the Gnosis Chain chain, xDAI to pay for gas and
                      a valid ballot key.
                    </Text>
                  </VStack>
                  <VStack spacing={6} alignItems="flex-start">
                    <Heading size="md">GnosisChain Wallet.</Heading>
                    <Text fontFamily={"archivo"}>
                      The wallet contained in your registration card is pre-loaded with xDAI to pay for gas, but you can
                      also use any other wallet that you have access to. Voting is anonymous, but ballot registration
                      happens in person as a sybil check. At the event, visit the Quadratic Funding booth to get your
                      wallet registered.
                    </Text>
                    <MagikButton />
                  </VStack>
                  <VStack spacing={2} alignItems="flex-start">
                    <Heading size="md">Ballot (MACI) passphrase</Heading>
                    <Text fontFamily={"archivo"}>
                      MACI (Minimal Anti-Collusion Infrastructure) uses zero knowledge proofs to protect against
                      censorship and collusion in blockchain voting. Each voter gets a pseudo-random MACI key which is
                      used to encrypt and validate your votes. This is the only way to vote in the round, and can be
                      used to change your ballot at any time while the round is active, so keep it safe.
                    </Text>
                  </VStack>

                  <VStack w="full" pt="10" justifyContent={"center"}>
                    <Button
                      h="80px"
                      w="full"
                      background="#FFFF00"
                      color={color}
                      variant={"solid"}
                      onClick={onClickSetOpenQRCodeReader}>
                      <Text fontSize="xl" fontWeight={"black"} fontFamily={"archivo"}>
                        {" "}
                        Scan key QR Code{" "}
                      </Text>
                    </Button>
                    {openQRCodeReader && (
                      <Container h="full" w="full" maxWidth="container.sm">
                        <QrReader
                          scanDelay={1000}
                          onResult={(result: any, error: any) => {
                            if (!!result) {
                              setMaciKey(result.text);
                              setKey(result.text);
                            }

                            if (!!error) {
                              console.info(`Something went wrong while reading the QR Code: ${error}`);
                            }
                          }}
                          constraints={{ facingMode: "environment" }}
                        />
                      </Container>
                    )}
                    <Text fontSize="xl" fontWeight={"black"} fontFamily={"archivo"}>
                      {keyType}
                    </Text>
                    <Text fontSize="sm" fontWeight={"black"} fontFamily={"archivo"}>
                      {key}
                    </Text>
                  </VStack>

                  <VStack spacing={1} alignItems="flex-start">
                    <HStack flexWrap="wrap" maxW="240px">
                      <PinInput
                        defaultValue="macisk."
                        size="xs"
                        type="alphanumeric"
                        value={key}
                        onChange={handleChange}
                        onComplete={handleComplete}>
                        <PinInputField marginInlineStart={"0px !important"} />
                        <PinInputField marginInlineStart={"0px !important"} />
                        <PinInputField marginInlineStart={"0px !important"} />
                        <PinInputField marginInlineStart={"0px !important"} />
                        <PinInputField marginInlineStart={"0px !important"} />
                        <PinInputField marginInlineStart={"0px !important"} />
                        <PinInputField marginInlineStart={"0px !important"} />
                        <PinInputField marginInlineStart={"0px !important"} />
                        <PinInputField marginInlineStart={"0px !important"} />
                        <PinInputField marginInlineStart={"0px !important"} />
                        <PinInputField marginInlineStart={"0px !important"} />
                        <PinInputField marginInlineStart={"0px !important"} />
                        <PinInputField marginInlineStart={"0px !important"} />
                        <PinInputField marginInlineStart={"0px !important"} />
                        <PinInputField marginInlineStart={"0px !important"} />
                        <PinInputField marginInlineStart={"0px !important"} />
                        <PinInputField marginInlineStart={"0px !important"} />
                        <PinInputField marginInlineStart={"0px !important"} />
                        <PinInputField marginInlineStart={"0px !important"} />
                        <PinInputField marginInlineStart={"0px !important"} />
                        <PinInputField marginInlineStart={"0px !important"} />
                        <PinInputField marginInlineStart={"0px !important"} />
                        <PinInputField marginInlineStart={"0px !important"} />
                        <PinInputField marginInlineStart={"0px !important"} />
                        <PinInputField marginInlineStart={"0px !important"} />
                        <PinInputField marginInlineStart={"0px !important"} />
                        <PinInputField marginInlineStart={"0px !important"} />
                        <PinInputField marginInlineStart={"0px !important"} />
                        <PinInputField marginInlineStart={"0px !important"} />
                        <PinInputField marginInlineStart={"0px !important"} />
                        <PinInputField marginInlineStart={"0px !important"} />
                        <PinInputField marginInlineStart={"0px !important"} />
                        <PinInputField marginInlineStart={"0px !important"} />
                        <PinInputField marginInlineStart={"0px !important"} />
                        <PinInputField marginInlineStart={"0px !important"} />
                        <PinInputField marginInlineStart={"0px !important"} />
                        <PinInputField marginInlineStart={"0px !important"} />
                        <PinInputField marginInlineStart={"0px !important"} />
                        <PinInputField marginInlineStart={"0px !important"} />
                        <PinInputField marginInlineStart={"0px !important"} />
                        <PinInputField marginInlineStart={"0px !important"} />
                        <PinInputField marginInlineStart={"0px !important"} />
                        <PinInputField marginInlineStart={"0px !important"} />
                        <PinInputField marginInlineStart={"0px !important"} />
                        <PinInputField marginInlineStart={"0px !important"} />
                        <PinInputField marginInlineStart={"0px !important"} />
                        <PinInputField marginInlineStart={"0px !important"} />
                        <PinInputField marginInlineStart={"0px !important"} />
                        <PinInputField marginInlineStart={"0px !important"} />
                        <PinInputField marginInlineStart={"0px !important"} />
                        <PinInputField marginInlineStart={"0px !important"} />
                        <PinInputField marginInlineStart={"0px !important"} />
                        <PinInputField marginInlineStart={"0px !important"} />
                        <PinInputField marginInlineStart={"0px !important"} />
                        <PinInputField marginInlineStart={"0px !important"} />
                        <PinInputField marginInlineStart={"0px !important"} />
                        <PinInputField marginInlineStart={"0px !important"} />
                        <PinInputField marginInlineStart={"0px !important"} />
                        <PinInputField marginInlineStart={"0px !important"} />
                        <PinInputField marginInlineStart={"0px !important"} />
                        <PinInputField marginInlineStart={"0px !important"} />
                        <PinInputField marginInlineStart={"0px !important"} />
                        <PinInputField marginInlineStart={"0px !important"} />
                        <PinInputField marginInlineStart={"0px !important"} />
                        <PinInputField marginInlineStart={"0px !important"} />
                        <PinInputField marginInlineStart={"0px !important"} />
                        <PinInputField marginInlineStart={"0px !important"} />
                        <PinInputField marginInlineStart={"0px !important"} />
                        <PinInputField marginInlineStart={"0px !important"} />
                        <PinInputField marginInlineStart={"0px !important"} />
                      </PinInput>
                    </HStack>

                    <Divider></Divider>
                    <Button colorScheme="blue" variant="outline" w="full" mt={4}>
                      Save
                    </Button>
                  </VStack>
                  <VStack spacing={2} alignItems="flex-start">
                    <Heading size="md">Confused or need help?</Heading>
                    <Text fontFamily={"archivo"}>
                      You can contact us at qb@ethereum.org, or visit us at the Quadratic Funding booth in the Few
                      sponsor area at ETHPrague.
                    </Text>
                  </VStack>
                </VStack>
              </VStack>
            </Container>
          </VStack>
        </Container>
      </VStack>
    </Flex>
  );
};
