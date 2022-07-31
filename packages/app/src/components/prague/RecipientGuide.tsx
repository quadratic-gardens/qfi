import React from "react";
import {
  VStack,
  Container,
  HStack,
  IconButton,
  Icon,
  Text,
  Heading,
  List,
  ListItem,
  Box,
  Button,
  Accordion,
  AccordionIcon,
  AccordionItem,
  AccordionPanel,
  Tooltip,
  UnorderedList,
  AccordionButton,
  useColorModeValue,
} from "@chakra-ui/react";
import { MagikButton } from "@qfi/ui";
import { MdDashboard } from "react-icons/md";
import { HiCollection, HiQrcode } from "react-icons/hi";
import { ColorModeSwitcher } from "../ColorModeSwitcher";

import { useTranslation, Trans } from 'react-i18next';

export const RecipientGuide = () => {
  const { t } = useTranslation();
  const backgroundColor = useColorModeValue("#FAFAFA", "gray.700");
  return (
    <Container
      h="full"
      w="full"
      overflowY={"scroll"}
      right="-24px"
      top={0}
      left={0}
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
          <Heading size="4xl">{t("Recipient Guide")}</Heading>
          <Text >
            {t("Welcome! If you’re here, you’re probably working on something awesome in the Eth Latam community - Thanks for everything you do :)")}
          </Text>
          <HStack justifyContent={"space-around"} spacing={10}>
            <Box
              sx={{
                height: "50px",
                boxSizing: "border-box",
                color: "white",
                justifyContent: "center",
                alignItems: "center",
                borderRadius: "50%",
                border: "0.8px solid rgb(53, 75, 55)",
                transition: "all 0s linear",
                _hover: { transform: "rotate(6.41deg)", scale: "1" },

                transform: "rotate(-6.41deg)",
                width: "122px",
              }}>
              {" "}
              <Button variant={"barcelona"} fontSize={{ base: "lg", xl: "xl" }}>
                {t("Sign Up!")}
              </Button>
            </Box>

            <Text fontFamily={"NeuePixelGrotesk"} fontWeight={"bold"} fontSize={{ base: "lg", xl: "xl" }}>
              {t("View Projects")}
            </Text>
          </HStack>
        </VStack>
        <VStack w="full" spacing={6}>
          <VStack spacing={6} alignItems="flex-start" w={"full"}>
            <Accordion allowToggle w={"full"} bg={backgroundColor}>
              <AccordionItem border="none" w={"full"}>
                <HStack as={AccordionButton} w={"full"} justifyContent={"space-between"} py={4}>
                  <Heading size="md">{t("What is Quadratic Funding?")}</Heading>
                  <AccordionIcon></AccordionIcon>
                </HStack>

                <AccordionPanel pb={4}>
                  <Text fontSize="sm">
                    {t("Quadratic Funding (QF) is")}
                  </Text>
                </AccordionPanel>
              </AccordionItem>
            </Accordion>

            {/* <MagikButton /> */}
          </VStack>
          <VStack spacing={6} alignItems="flex-start" w={"full"}>
            <Accordion allowToggle w={"full"} bg={backgroundColor}>
              <AccordionItem border="none" w={"full"}>
                <HStack as={AccordionButton} w={"full"} justifyContent={"space-between"} py={4}>
                  <Heading textAlign={"left"} size="md">
                    {t("What does it mean to sign up as a recipient?")}
                  </Heading>
                  <AccordionIcon></AccordionIcon>
                </HStack>

                <AccordionPanel pb={4}>
                  <Text fontSize="sm">
                    {t("Adding your project makes you eligible to receive funds from the pooled funds from donors and 5% of the ticket sales of ETHLatam, but doesn’t guarantee funding. This funding is a donation and has no associated reporting, returns, or obligations on the part of the project. How much each project receives will be decided by ETHLatam attendees who vote during the event.")}
                  </Text>
                  <Text fontSize="sm">
                    {t("The donation will be sent as a stablecoin (DAI) over Gnosis Chain to the wallet submitted during the registration process. Once they are sent the transaction is irreversible, so be 100% certain of the address you are submitting and who has control of the wallet/private keys.  If you are uncertain about this, feel free to get in touch with the team at qf@ethlatam.com.")}
                  </Text>
                  <Text fontSize="sm">
                    {t("Please be aware the team will NEVER ask you to share the seed phrase or private key of this wallet, they will NEVER reach out to you via social media or other channels, and will not send you a seed phrase or private key to use. These are common scam tactics and we wish to avoid these bad actors stealing your donated funds.")}
                  </Text>
                  <Text fontSize="sm">
                    {t("Unfortunately the projects or teams will be unable to present during ETHLatam on-stage, but we do empower you to use the #ETHBCN or #ETHLatam hashtags on posts about your social media to show and tell more about your public good impact to the attendees.")}
                  </Text>
                  <Text fontSize={"sm"}>
                    {t("If you are posting on Twitter, remember to tag @ETHLatam and use the hashtags within to have more reach. You can also post within the event’s Telegram using the #QF hashtag: https://t.me/ethlatam. Projects that are part of the ETHLatam hackathon can also apply if they fulfill the above criteria.")}
                  </Text>
                </AccordionPanel>
              </AccordionItem>
            </Accordion>
          </VStack>
          <VStack spacing={6} alignItems="flex-start" w={"full"}>
            <Accordion allowToggle w={"full"} bg={backgroundColor}>
              <AccordionItem border="none" w={"full"}>
                <HStack as={AccordionButton} w={"full"} justifyContent={"space-between"} py={4}>
                  <Heading textAlign={"left"} size="md">
                    {t("Eligibility Criteria")}
                  </Heading>
                  <AccordionIcon></AccordionIcon>
                </HStack>

                <AccordionPanel pb={4}>
                  <Text fontSize="sm">
                    {t("Project needs to be based or working with local communities or the environment in Catalunya or elsewhere in Spain.")}
                  </Text>
                  <Text fontSize="sm">
                    {t("Public good focused Web3 / impact DAOs / decentralized projects can also apply, this is not exclusive to any project regardless of their use of blockchain technologies.")}
                  </Text>
                  <Text fontSize="sm">
                    {t("Projects are required to have a public good focus or impact, often defined as non-rivalrous (use by one person doesn’t prevent access by others) and non-excludable (anyone can access or use it).")}
                  </Text>
                  <Text fontSize="sm">
                    {t("Public good can be one of the many impacts of the project but it must be explicit what you will use the funds for if you are granted them. For example: funding a free permaculture education course for children in a village in Catalunya.")}
                  </Text>
                  <Text fontSize="sm">
                    {t("Projects are not required to be web3 or crypto-native, but they must submit a Gnosis Chain wallet which they control as part of the application process. We encourage the use of self-custody solutions.")}
                  </Text>
                </AccordionPanel>
              </AccordionItem>
            </Accordion>
          </VStack>
        </VStack>
      </VStack>
    </Container>
  );
};
