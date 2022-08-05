import React from "react";
import {
  VStack,
  Container,
  HStack,
  IconButton,
  Icon,
  Text,
  Heading,
  Link,
  Image,
  AspectRatio,
  Accordion,
  AccordionButton,
  AccordionIcon,
  AccordionItem,
  AccordionPanel,
  ListItem,
  OrderedList,
  List,
  UnorderedList,
} from "@chakra-ui/react";
import { MagikButton } from "@qfi/ui";
import { MdDashboard } from "react-icons/md";
import { HiCollection, HiExternalLink, HiLink, HiQrcode } from "react-icons/hi";
import { ColorModeSwitcher } from "../ColorModeSwitcher";
import ethCard from "../assets/ethCard.png";
import maciCard from "../assets/maciCard.png";

import { useTranslation, Trans } from 'react-i18next';

export const Quickstart = () => {
  const { t } = useTranslation();

  return (
    <Container
      h="full"
      w="full"
      overflowY={"scroll"}
      right="-24px"
      top={0}
      left={0}
      position="absolute"
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
      <VStack mt={20} spacing={10} h="full" alignItems="flex-start">
        <VStack spacing={6} alignItems="flex-start">
          <Heading size="4xl">{t("Voter Guide")}</Heading>
        </VStack>
        <VStack spacing={6} alignItems="flex-start">
          <Heading size="xl">{t("How it works?")}</Heading>
          <Text>
            {t("All event attendes that bought tickets are able to cast a Ballot for which project should get the funding. Casting a Ballot requires you to have a Gnosis Chain/Etherum wallet with some MATIC to pay for the transaction gas and a valid ballot key. Voting is pseudoanonymous, but to submit your Ballot you will be sent your MACI key to your email address by the ETHLatam team.")}
          </Text>
          <Text>
            {t("During the event you can ask questions to the team behind this funding process and make have a workaround if you are not able to use the MACI key sent to your email. If in doubt ask any of the ETHLatam volunteers to point you to them if you have questions.")}
          </Text>
          <Accordion allowToggle>
            <AccordionItem border="none">
              <VStack>
                <Text px={0} textAlign={"left"} as={AccordionButton} fontSize="md">
                  {t("How to use the keys")}
                  <AccordionIcon></AccordionIcon>
                </Text>
              </VStack>
              <AccordionPanel pb={4}>
                <VStack spacing={6} alignItems="flex-start">
                  <Heading size="xs">{t("A wallet ... that is also a ballot")}</Heading>
                  <Image h="full" w="auto" position="relative" src={ethCard} alt={"Ethereum card"} />
                  <Text fontSize="xs">
                    {t("On the left side of your inventory card is a mnemonic and QR code. These are keys to a Gnosis Chain Chain wallet which you will use to build your ballot for the Quadratic Funding round.")}
                  </Text>
                  <Image h="full" w="auto" position="relative" src={maciCard} alt={"MACI card"} />
                  <Text fontSize="xs">
                    {t("On the other side is your MACI key, a unique identifier that you will use to submit your ballot.")}
                  </Text>
                  <Text as="u" fontSize="xs">
                    {t("Keep these keys safe! Anyone who gets their hands on your MACI key can vote on your behalf - and even invalidate your previous votes!")}
                  </Text>
                </VStack>
              </AccordionPanel>
            </AccordionItem>
          </Accordion>
        </VStack>
        <VStack spacing={6} alignItems="flex-start">
          <Heading size="xl">{t("Register")}</Heading>
          <Text>{t("Once you have got your keys, it is time to register!")}</Text>
          <Text>
            {t("We recommend the Status app for the smoothest experience since it has wallet, browser and Gnosis Chain RPC already integrated (plus you can use it to send super-private messages to all your new hackathon friends!).")}
          </Text>
          <Accordion allowToggle>
            <AccordionItem border="none">
              <VStack>
                <Text px={0} textAlign={"left"} as={AccordionButton} fontSize="md">
                  {t("Using Status")}
                  <AccordionIcon></AccordionIcon>
                </Text>
              </VStack>
              <AccordionPanel pb={4}>
                <VStack spacing={6} alignItems="flex-start">
                  <Heading size="xs">{t("Add your wallet")}</Heading>
                  <Text fontSize="xs">
                    {t("In the wallet tab, tap “Add Account”. Now either")}:
                    <OrderedList>
                      <ListItem>
                        {t("Select “Enter a seed phrase” and enter the 12 word mnemonic from your card, or")}
                      </ListItem>
                      <ListItem>
                        {t("Select “Enter a private key”, open your camera or QR reader and scan the QR code, which will copy the private key to your clipboard, and then paste into the “Private key” field in the Status app.")}
                      </ListItem>
                    </OrderedList>
                  </Text>
                  <Heading size="xs">{t("Change network")}</Heading>
                  <Text fontSize="xs">
                    {t("In your profile, go to Advanced =`{ > }` Network and change to Gnosis Chain Chain. You will need to restart the app for the network change to take effect.")}
                  </Text>
                  <Heading size="xs">{t("Set up your ballot")}</Heading>
                  <Text fontSize="xs">
                    {t("In the Status browser, tap the colored icon at the bottom center of the screen to connect the account you just added. Go to qf.ethlatam.com/#/begin. Hit “Connect” and authorize the app to access your address. Scan the QR to add your MACI key and hit “Save” - and you are all set! Go forth and vote.")}
                  </Text>
                  <Text fontSize="xs">
                    {t("You can get the Status app here")}
                    <Link href="https://status.im/get/" isExternal>
                      <Icon as={HiExternalLink} boxSize={4} color="gray.500" />
                    </Link>
                  </Text>
                </VStack>
              </AccordionPanel>
            </AccordionItem>
          </Accordion>
          <Accordion allowToggle>
            <AccordionItem border="none">
              <VStack>
                <Text px={0} textAlign={"left"} as={AccordionButton} fontSize="md">
                  {t("Using browser + WalletConnect")}
                  <AccordionIcon></AccordionIcon>
                </Text>
              </VStack>
              <AccordionPanel pb={4}>
                <VStack spacing={6} alignItems="flex-start">
                  <Heading size="xs">{t("Add your wallet")}</Heading>
                  <Text fontSize="xs">
                    {t("In your wallet app")}:
                    <OrderedList>
                      <ListItem>
                        {t("Switch network to Gnosis Chain Chain. There are instructions for MetaMask")}{" "}
                        <Link
                          href="https://metamask.zendesk.com/hc/en-us/articles/360052711572-How-to-connect-to-the-Gnosis Chain-Chain-network-formerly-Gnosis Chain"
                          isExternal>
                          <Icon as={HiExternalLink} boxSize={4} color="gray.500" />
                        </Link>{" "}
                        {t("or you can use Chainlist")}
                        <Link href="https://chainlist.org/" isExternal>
                          <Icon as={HiExternalLink} boxSize={4} color="gray.500" />
                        </Link>{" "}
                        {t("to automatically add Gnosis Chain Chain in many Web3 wallets. Always use caution when connecting to new networks!")}
                      </ListItem>
                      <ListItem>
                        {t("Create a new account using the Gnosis Chain mnemonic or private key QR from your card.")}
                      </ListItem>
                    </OrderedList>
                  </Text>
                  <Text fontSize="xs">
                    {t("Choose your favorite browser and navigate to")}
                    <Link href="https://qf.ethlatam.com/#/begin"> qf.ethlatam.com/#/begin</Link>
                  </Text>
                  <Text fontSize="xs">
                    {t("Hit “Connect” and follow the instructions to connect your wallet of choice. Once your wallet is connected, enter your MACI key and hit “Save”.")}
                  </Text>
                </VStack>
              </AccordionPanel>
            </AccordionItem>
          </Accordion>
        </VStack>
        <VStack spacing={6} alignItems="flex-start">
          <Heading size="xl">{t("Vote")}</Heading>
          <Text>
            <Accordion allowToggle>
              <UnorderedList>
                <ListItem>
                  <AccordionItem border="none">
                    <VStack>
                      <Text px={0} textAlign={"left"} as={AccordionButton} fontSize="md">
                        {t("Get to know the Recipients")}
                        <AccordionIcon></AccordionIcon>
                      </Text>
                    </VStack>
                    <AccordionPanel pb={4}>
                      <VStack spacing={6} alignItems="flex-start">
                        <Text fontSize="xs">
                          {t("Projects from across the Spain community have signed up to receive funding. Learn about them on the Project Directory page or in the Quadratic Funding booth, then add projects you like to your ballot. [image of ballot button]")}
                        </Text>
                        <Text fontSize="xs">{t("You can include up to 8 projects on your ballot.")}</Text>
                      </VStack>
                    </AccordionPanel>
                  </AccordionItem>
                </ListItem>
                <ListItem>
                  <AccordionItem border="none">
                    <VStack>
                      <Text px={0} textAlign={"left"} as={AccordionButton} fontSize="md">
                        {t("Pick your priorities")}
                        <AccordionIcon></AccordionIcon>
                      </Text>
                    </VStack>
                    <AccordionPanel pb={4}>
                      <VStack spacing={6} alignItems="flex-start">
                        <Text fontSize="xs">
                          {t("You can distribute your voice credits between them however you like, but voice credits and votes are not 1:1. This is where the “quadratic” part comes in: voting for a project will cost the square of the number of votes you want to cast. For example, if you want to cast 1 vote for Project A, it will cost you 1 voice credit; 2 votes cost 4 credits; 5 votes cost 25 credits and so on.")}
                        </Text>
                      </VStack>
                    </AccordionPanel>
                  </AccordionItem>
                </ListItem>
                <ListItem>
                  <AccordionItem border="none">
                    <VStack>
                      <Text px={0} textAlign={"left"} as={AccordionButton} fontSize="md">
                        {t("Submit your ballot")}
                        <AccordionIcon></AccordionIcon>
                      </Text>
                    </VStack>
                    <AccordionPanel pb={4}>
                      <VStack spacing={6} alignItems="flex-start">
                        <Text fontSize="xs">
                          {t("Once you are happy with your votes, just hit “Submit”. Changed your mind? You can always submit a new ballot - only the last one you submit will be counted.")}
                        </Text>
                        <Text fontSize="xs">
                          {t("Remember that as long as the vote is open, anyone who has your MACI key will be able to submit a new ballot and invalidate your old one. If you’re going to dispose of the card with your keys on it, do it securely - we recommend ritual burning. Better yet, take it home as proof that you voted in the FIRST EVER (as far as we know) in-person Quadratic Funding round!")}
                        </Text>
                      </VStack>
                    </AccordionPanel>
                  </AccordionItem>
                </ListItem>
              </UnorderedList>
            </Accordion>
          </Text>
        </VStack>
      </VStack>
    </Container>
  );
};
