import React from "react";
import { VStack, Container, Flex, Text, Heading, Button, useColorModeValue, Accordion, AccordionButton, AccordionIcon, AccordionItem, AccordionPanel, HStack, Stack, AspectRatio } from "@chakra-ui/react";
import { useTranslation } from "react-i18next";
import { useSearchParams, Link as RouterLink } from "react-router-dom";
import { Hero } from "../components/Hero";

export const Home = () => {
  const { t } = useTranslation();
  const color = useColorModeValue("gray.800", "gray.700");
  const backgroundColor = useColorModeValue("#FAFAFA", "#000000");
  let [searchParams] = useSearchParams();
  const heroLightmode = (
    <AspectRatio ratio={16 / 9} w="full" h={"auto"} overflow="hidden" alignItems={"flex-start"} justifyContent={"flex-start"} flexDir={"row"}>
      <Hero></Hero>
    </AspectRatio>
  );
  const heroDarkmode = (
    <AspectRatio ratio={16 / 9} w="full" h={"auto"} overflow="hidden" alignItems={"flex-start"} justifyContent={"flex-start"} flexDir={"row"}>
        <Hero></Hero>
    </AspectRatio>
  );

  return (
    <Flex as="main" h="full" w="full" flex={1} borderRightColor={color} borderRightWidth={1} position={"relative"} overflow="hidden">
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
        }}
        maxWidth={{ lg: "container.lg", md: "container.md" }}
        py={8}>
        <VStack mt={20} spacing={10} h="full" w="full" alignItems="flex-start">
          <VStack spacing={6} w="full" alignItems="flex-start">
            {useColorModeValue(heroLightmode, heroDarkmode)}
            <Heading fontWeight={"black"} fontSize={"4xl"}>
              {t("ORGANIZER")}
            </Heading>
            <Stack spacing={10} direction={["column", "row"]} w="full">
              <Button as={RouterLink} h={50} variant={"amsterdam"} fontSize={{ base: "md", xl: "xl" }} to={`/ballot?${searchParams.toString()}`}>
                {t("GET STARTED")}
              </Button>
              <Button as={RouterLink} variant={"amsterdam"} fontSize={{ base: "md", xl: "xl" }} to={`/projects?${searchParams.toString()}`}>
                {t("CHECK OUT THE PROJECTS")}
              </Button>
            </Stack>
          </VStack>
          <VStack width="100%">
            <Text pb={4}>{t("You can play a fundamental role as a part of the ETHDam community, both in supporting the local community, and in exploring new ways to finance public goods through quadratic voting.")}</Text>
            <Text pb={4} w={"full"}>
              {t("During the venue, our ETHDam team will send you an email with a password. This is the “MACI” key you’ll use to vote.")}
            </Text>
            <Text pb={4} w={"full"}>
              {t("Below you will find instructions to help support local projects. Learn more about Quadratic Funding")}{" "}
              <a href={"https://wtfisqf.com/?grant=&grant=&grant=&grant=&match=1000"} rel="noreferrer" target="_blank">
                {t("here")}
              </a>
              .
            </Text>
            <Text pb={4} w={"full"} fontSize={22}>
              {t("The future is now.")}
            </Text>
          </VStack>
          <VStack w="full" spacing={6}>
            <VStack spacing={6} alignItems="flex-start" w={"full"}>
              <Accordion variant={"porto"} allowToggle w={"full"} defaultIndex={0}>
                <AccordionItem border="none" w={"full"}>
                  <HStack as={AccordionButton} w={"full"} justifyContent={"space-between"} py={4}>
                    <Heading textAlign={"left"} size="md">
                      {t("Timeline")}
                    </Heading>
                    <AccordionIcon></AccordionIcon>
                  </HStack>

                  <AccordionPanel pb={4}>
                    <Text lineHeight={8} pl={8} fontSize="sm" py={2}>
                      <ul>
                        <li>{t("Project submission deadline: August 11th")}</li>
                        <li>{t("ETHDam: August 11th - 13th")}</li>
                        <li>{t("Voting opens: August 13th @ 2:00 pm GTM-3")}</li>
                        <li>{t("Voting closes: August 19th")}</li>
                        <li>{t("Count of votes: August 22nd")}</li>
                        <li>{t("Distribution of funds: September 2nd")}</li>
                      </ul>
                    </Text>
                  </AccordionPanel>
                </AccordionItem>
              </Accordion>
            </VStack>
            <VStack spacing={6} alignItems="flex-start" w={"full"}>
              <Accordion variant={"porto"} mb={20} allowToggle w={"full"}>
                <AccordionItem border="none" w={"full"}>
                  <HStack as={AccordionButton} w={"full"} justifyContent={"space-between"} py={4}>
                    <Heading size="md">{t("How does it work?")}</Heading>
                    <AccordionIcon></AccordionIcon>
                  </HStack>

                  <AccordionPanel pb={4}>
                    <Text fontSize="sm" pb={8}>
                      {t("All ETHDam attendees will receive an email with a MACI key.")}
                    </Text>
                    <Text fontSize="sm" pb={8}>
                      {t("This key will allow them to cast votes in favor of the projects that apply to receive funds. To vote, you must have an address in your self-custodial wallet connected to Gnosis, with some $MATIC to pay for the transaction fees and a valid voting key.")}
                    </Text>
                    <Text fontSize="sm" pb={8}>
                      {t("Voting is pseudo-anonymous, but to record the vote, your MACI key will be sent to your email address by the ETHDam team.")}
                    </Text>
                    <Text fontSize="sm" pb={8}>
                      {t("During the event, you’ll be able to ask at the Ethereum Foundation booth about the funding process.")}
                    </Text>
                    <Text fontSize="sm" pb={8}>
                      {t("If you have any questions, please, feel free to ask any of the ETHDam volunteers.")}
                    </Text>
                  </AccordionPanel>
                </AccordionItem>
              </Accordion>
            </VStack>
          </VStack>
        </VStack>
      </Container>
    </Flex>
  );
};
