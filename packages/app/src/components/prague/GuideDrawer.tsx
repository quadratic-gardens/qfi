import { VStack, Container, Text,useBreakpointValue, Heading, Drawer, Code, useClipboard, Button, DrawerOverlay, DrawerContent, DrawerCloseButton, ListItem, Accordion, AccordionButton, AccordionIcon, AccordionItem, AccordionPanel, UnorderedList } from "@chakra-ui/react";
import { MagikButton } from "@qfi/ui";

import { useTranslation, Trans } from "react-i18next";

const Guide = () => {
  const { t } = useTranslation();
  const placeholder =
    '[ { "inputs": [ { "internalType": "uint256[2]", "name": "", "type": "uint256[2]" } ], "name": "hash2", "outputs": [ { "internalType": "uint256", "name": "", "type": "uint256" } ], "stateMutability": "pure", "type": "function" }, { "inputs": [ { "internalType": "uint256", "name": "_left", "type": "uint256" }, { "internalType": "uint256", "name": "_right", "type": "uint256" } ], "name": "hashLeftRight", "outputs": [ { "internalType": "uint256", "name": "", "type": "uint256" } ], "stateMutability": "pure", "type": "function" } ]';
  const { onCopy, value, hasCopied } = useClipboard(placeholder);

  return (
    <Container
      h="full"
      w="full"
      overflowY={"scroll"}
      right="-24px"
      top={0}
      left={0}
      position="relative"
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
      <VStack mt={20} spacing={10} h="full" alignItems="flex-start" fontSize={"sm"}>
        {" "}
        <VStack spacing={6} alignItems="flex-start">
          <Heading size="4xl">{t("Voter Guide")}</Heading>
        </VStack>
        <VStack spacing={6} alignItems="flex-start">
          <Heading size="2xl">How it works</Heading>
          <Text as="div">
            Casting a Ballot requires you to have:
            <UnorderedList>
              <ListItem>a wallet on Gnosis Chain</ListItem>
              <ListItem>xDAI to pay for gas</ListItem>
              <ListItem>a valid ballot passphrase (MACI key)</ListItem>
            </UnorderedList>
            Voting is anonymous but your ballot key is sent to you via email to prevent fraud.
          </Text>
        </VStack>
        <VStack spacing={6} alignItems="flex-start">
          <Heading size="md">Gnosis Chain (xDAI) Wallet</Heading>

          <Accordion allowToggle width="full">
            <AccordionItem border="none" width="full">
              <VStack>
                <Text px={0} textAlign={"left"} as={AccordionButton} fontSize="md">
                  Step 1: Download a wallet that supports Gnosis Chain (xDAI)
                  <AccordionIcon></AccordionIcon>
                </Text>
              </VStack>
              <AccordionPanel pb={4} width="full">
                <VStack spacing={6} alignItems="flex-start" width="full">
                  <iframe title="guide" src="https://scribehow.com/page-embed/Mobile_Wallet_Set_up__OZiM3PehSGmXB73cXh85KQ" width="100%"  height="640" allowFullScreen frameBorder="0"></iframe>
                </VStack>
              </AccordionPanel>
            </AccordionItem>
          </Accordion>
          <Accordion allowToggle width="full">
            <AccordionItem border="none" width="full">
              <VStack>
                <Text px={0} textAlign={"left"} as={AccordionButton} fontSize="md">
                  Step 2A: Get some xDAI on Gnosis Chain (xDAI) by using a bridge such as xDAI Bridge
                  <AccordionIcon></AccordionIcon>
                </Text>
              </VStack>
              <AccordionPanel pb={4} width="full">
                <VStack spacing={6} alignItems="flex-start" width="full">
                  <iframe title="onramp" src="https://scribehow.com/page-embed/Voters_guide__Desktop__08cXvIydQrWdpcHMfhSuDQ" width="100%"  height="640" allowFullScreen frameBorder="0"></iframe>
                </VStack>
              </AccordionPanel>
            </AccordionItem>
          </Accordion>
          <Accordion allowToggle width="full">
            <AccordionItem border="none">
              <VStack>
                <Text px={0} textAlign={"left"} as={AccordionButton} fontSize="md">
                  Step 2A: OR get free funds from the xDAI Faucet
                  <AccordionIcon></AccordionIcon>
                </Text>
              </VStack>
              <AccordionPanel pb={4}>
                <VStack textAlign={"left"} alignItems={"flex-start"}>
                  <Text>
                    Copy the following JSON to your clipboard and paste it into the "ABI" field of the{" "}
                    <a href="https://gnosisfaucet.com/" rel="noreferrer" target="_blank">
                      xDAI Faucet
                    </a>{" "}
                    to request 0.01 xDAI.
                  </Text>

                  <Button onClick={onCopy}>{hasCopied ? "Copied!" : "Copy"}</Button>
                  <Code bg="#424242" px={8} py={4} color={"white"}>
                    {" "}
                    {
                      '[ { "inputs": [ { "internalType": "uint256[2]", "name": "", "type": "uint256[2]" } ], "name": "hash2", "outputs": [ { "internalType": "uint256", "name": "", "type": "uint256" } ], "stateMutability": "pure", "type": "function" }, { "inputs": [ { "internalType": "uint256", "name": "_left", "type": "uint256" }, { "internalType": "uint256", "name": "_right", "type": "uint256" } ], "name": "hashLeftRight", "outputs": [ { "internalType": "uint256", "name": "", "type": "uint256" } ], "stateMutability": "pure", "type": "function" } ]'
                    }{" "}
                  </Code>
                </VStack>
              </AccordionPanel>
            </AccordionItem>
          </Accordion>

          <Accordion allowToggle width="full">
            <AccordionItem border="none">
              <VStack>
                <Text px={0} textAlign={"left"} as={AccordionButton} fontSize="md">
                  Step 3: Vote
                  <AccordionIcon></AccordionIcon>
                </Text>
              </VStack>
              <AccordionPanel pb={4} width="full">
                <VStack spacing={6} alignItems="flex-start" width="full">
                  <iframe title="voteGuide" src="https://scribehow.com/page-embed/Voter_Guide_Mobile__H5p5wifzRUeBMmSFYcGWdQ" width="100%" allowFullScreen height="640" frameBorder="0"></iframe>
                </VStack>
              </AccordionPanel>
            </AccordionItem>
          </Accordion>
        </VStack>
        <VStack spacing={6} alignItems="flex-start">
          <Heading size="xl">{t("Ballot Passphrase (MACI key)")}</Heading>
        </VStack>
        <VStack spacing={6} alignItems="flex-start">
          <Heading size="lg">{t("What is the MACI key?")}</Heading>
          <Text>{t("The MACI (Minimum Anti-Collision Infrastructure) uses zero-knowledge proofs as a protection against censorship and collisions in blockchain voting.")}</Text>
          <Text>
            {t("Each voter gets a pseudo-random MACI key, which is used to encrypt and validate your votes. This is the only way to vote in the round, and it can be used to change your vote at any time while the round is active, so keep it safe and don't share it. Think of it like a password.")}
          </Text>
          <Text fontWeight={"bold"}>{t("'Not your MACI, not your vote'.")}</Text>
          <Text>{t("Keep it safe! Anyone who has your MACI key will be able to vote on your behalf - and even invalidate your previous votes. Thanks to your vote, community projects can access funds to continue building.  Your vote matters. Make it count!")}</Text>
        </VStack>
      </VStack>
    </Container>
  );
};
type GuideDrawerProps = {
  isOpen: boolean;
  onClose: () => void;
};
export const GuideDrawer = ({ isOpen, onClose }: GuideDrawerProps) => {
  const drawerSize = useBreakpointValue({ base: 'sm', md:'md', lg: 'lg', xl: 'lg' })
  return (
    <Drawer size={drawerSize} isOpen={isOpen} placement="right" onClose={onClose}>
      <DrawerOverlay>
        <DrawerContent pt={8} h="full" w="full"    position={"relative"} overflow={"hidden"} justifyContent="flex-start">
          <DrawerCloseButton zIndex={999} onClick={onClose} />
          <Guide />
        </DrawerContent>
      </DrawerOverlay>
    </Drawer>
  );
};
