import React from "react";
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
} from "@chakra-ui/react";
import { animateText, MagikButton, MagikText } from "@qfi/ui";
import { Hero } from "../components/Hero";
import { ColorModeSwitcher } from "../components/ColorModeSwitcher";

export type HomeProps = {
  isSettingsOpen: boolean;
  onSettingsOpen: () => void;
  isGuideOpen: boolean;
  onGuideOpen: () => void;
};

export const Begin = ({ isSettingsOpen, onSettingsOpen, isGuideOpen, onGuideOpen }: HomeProps) => {
  const color = useColorModeValue("gray.800", "gray.700");
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

                  <VStack spacing={1} alignItems="flex-start">
                    <HStack maxW={"container.md"}>
                      <PinInput defaultValue="macisk." size="xs" type="alphanumeric">
                        <PinInputField />
                        <PinInputField />
                        <PinInputField />
                        <PinInputField />
                        <PinInputField />
                        <PinInputField />
                        <PinInputField />
                      </PinInput>
                    </HStack>
                    <HStack maxW={"container.md"}>
                      <PinInput mask size="xs" type="alphanumeric">
                        <PinInputField />
                        <PinInputField />
                        <PinInputField />
                        <PinInputField />
                        <PinInputField />
                        <PinInputField />
                        <PinInputField />
                      </PinInput>
                    </HStack>
                    <HStack maxW={"container.md"}>
                      <PinInput mask size="xs" type="alphanumeric">
                        <PinInputField />
                        <PinInputField />
                        <PinInputField />
                        <PinInputField />
                        <PinInputField />
                        <PinInputField />
                        <PinInputField />
                      </PinInput>
                    </HStack>
                    <HStack maxW={"container.md"}>
                      <PinInput mask size="xs" type="alphanumeric">
                        <PinInputField />
                        <PinInputField />
                        <PinInputField />
                        <PinInputField />
                        <PinInputField />
                        <PinInputField />
                        <PinInputField />
                      </PinInput>
                    </HStack>
                    <HStack maxW={"container.md"}>
                      <PinInput mask size="xs" type="alphanumeric">
                        <PinInputField />
                        <PinInputField />
                        <PinInputField />
                        <PinInputField />
                        <PinInputField />
                        <PinInputField />
                        <PinInputField />
                      </PinInput>
                    </HStack>
                    <HStack maxW={"container.md"}>
                      <PinInput mask size="xs" type="alphanumeric">
                        <PinInputField />
                        <PinInputField />
                        <PinInputField />
                        <PinInputField />
                        <PinInputField />
                        <PinInputField />
                        <PinInputField />
                      </PinInput>
                    </HStack>
                    <HStack maxW={"container.md"}>
                      <PinInput mask size="xs" type="alphanumeric">
                        <PinInputField />
                        <PinInputField />
                        <PinInputField />
                        <PinInputField />
                        <PinInputField />
                        <PinInputField />
                        <PinInputField />
                      </PinInput>
                    </HStack>
                    <HStack maxW={"container.md"}>
                      <PinInput mask size="xs" type="alphanumeric">
                        <PinInputField />
                        <PinInputField />
                        <PinInputField />
                        <PinInputField />
                        <PinInputField />
                        <PinInputField />
                        <PinInputField />
                      </PinInput>
                    </HStack>
                    <HStack maxW={"container.md"}>
                      <PinInput mask size="xs" type="alphanumeric">
                        <PinInputField />
                        <PinInputField />
                        <PinInputField />
                        <PinInputField />
                        <PinInputField />
                        <PinInputField />
                        <PinInputField />
                      </PinInput>
                    </HStack>
                    <HStack maxW={"container.md"}>
                      <PinInput mask size="xs" type="alphanumeric">
                        <PinInputField />
                        <PinInputField />
                        <PinInputField />
                        <PinInputField />
                        <PinInputField />
                        <PinInputField />
                        <PinInputField />
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
