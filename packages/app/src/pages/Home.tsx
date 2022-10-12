import React from "react";
import {
  VStack,
  Container,
  Flex,
  Text,
  Heading,
  Button,
  useColorModeValue,
  Accordion,
  AccordionButton,
  AccordionIcon,
  AccordionItem,
  AccordionPanel,
  HStack,
  Stack,
} from "@chakra-ui/react";
import { useTranslation } from "react-i18next";
import { useSearchParams, Link as RouterLink } from "react-router-dom";

export const Home = () => {
  const { t } = useTranslation();
  const color = useColorModeValue("gray.800", "gray.700");
  const backgroundColor = useColorModeValue("#FAFAFA", "#222222");
  let [searchParams] = useSearchParams();

  return (
    <Flex
      as="main"
      h="full"
      w="full"
      flex={1}
      borderRightColor={color}
      borderRightWidth={1}
      position={"relative"}
      overflow="hidden">
      <Container
        h="full"
        w="full"
        overflowY={"scroll"}
        right="-24px"
        top={0}
        left={0}
        sx={{
          scrollbarColor: "transparent",
          "::-webkit-scrollbar": {
            width: "0px",
          },

          "::-webkit-scrollbar-track": {
            boxShadow: "inset 0 0 0px transparent",
            borderRadius: "0px",
          },

          "::-webkit-scrollbar-thumb": {
            background: "transparent",
            borderRadius: "0px",
          },
        }}
        maxWidth={{ lg: "container.lg", md: "container.md" }}
        py={8}>
        <VStack mt={20} spacing={10} h="full" alignItems="flex-start">
          <VStack spacing={6} alignItems="flex-start">
            <Heading fontSize={{ base: "76px", xl: "120px" }}>平方募資法</Heading>
          </VStack>
          <VStack width="100%" alignItems="flex-start">
            <Text fontSize={"lg"} pb={2}>
              Quadratic Funding
            </Text>
            <Text fontSize={"md"} pb={4}>
              在 Web3 的世界中，我們透過社群自治來解決各式問題。 而平方投票法，則是一套消弭分配不均的實驗性工具。
            </Text>

            <Stack spacing={10} direction={["column", "row"]} pb={4}>
              <Button
                as={RouterLink}
                h={50}
                variant={"primary"}
                to={`/ballot?${searchParams.toString()}`}>
                {t("GET STARTED")}
              </Button>
              <Button
                as={RouterLink}
                h={50}
                variant={"secondary"}
                to={`/projects?${searchParams.toString()}`}>
                {t("CHECK OUT THE PROJECTS")}
              </Button>
            </Stack>

            {/* 
            <Text pb={4}>
              {t(
                "You can play a fundamental role as a part of the ETHCommunity community, both in supporting the local community, and in exploring new ways to finance public goods through quadratic voting."
              )}
            </Text>
            <Text pb={4} w={"full"}>
              {t(
                "During the venue, our ETHCommunity team will send you an email with a password. This is the “MACI” key you’ll use to vote."
              )}
            </Text>
            <Text pb={4} w={"full"}>
              {t("Below you will find instructions to help support local projects. Learn more about Quadratic Funding")}{" "}
              <a href={"https://wtfisqf.com/?grant=&grant=&grant=&grant=&match=1000"} rel="noreferrer" target="_blank">
                {t("here")}
              </a>
              .
            </Text>
            <Text pb={4} w={"full"} fontFamily="Helvetica" fontSize={22}>
              {t("The future is now.")}
            </Text> */}
          </VStack>
          <VStack w="full" spacing={6}>
            <VStack spacing={6} alignItems="flex-start" w={"full"}>
              <Accordion allowToggle w={"full"} bg={backgroundColor} defaultIndex={0}>
                <AccordionItem border="none" w={"full"}>
                  <HStack as={AccordionButton} w={"full"} justifyContent={"space-between"} py={4}>
                    <Heading textAlign={"left"} size="md">
                      跨界合作：總統盃黑客松
                    </Heading>
                    <AccordionIcon></AccordionIcon>
                  </HStack>

                  <AccordionPanel pb={4}>
                    <Text fontSize="sm" py={2}>
                      平方投票法是套集體決策程序。參與決策的投票者透過分配投票來表達偏好及偏好的程度。藉此，平方投票試圖解決多數決的常見難題，如投票悖論、棄保效應及配票。為推廣平方投票法的優點，本協會響應總統盃黑客松解決台灣永續相關議題之目標，並支持優良新創項目得以永續發展，將於
                      N24 台北方舟區塊鏈創新育成基地舉辦平方募資活動。
                    </Text>

                    <Text fontSize="sm" py={2}>
                      「2022 總統盃黑客松」以國家發展藍圖為本，超越 GDP (Beyond GDP)
                      的發展理念，融入國、內外發展情勢，以『安居永續‧均衡臺灣』為競賽主題，從「安居樂業」(SDGs
                      社會面)、「永續發展」(SDGs 經濟面) 及「均衡臺灣」(SDGs 環境面)
                      三大面向，號召全民許願、黑客解題，希冀透過公私協力，共創經濟、社會及環境都具幸福感的安居臺灣。
                    </Text>
                  </AccordionPanel>
                </AccordionItem>
              </Accordion>
            </VStack>
            <VStack spacing={6} alignItems="flex-start" w={"full"}>
              <Accordion allowToggle w={"full"} bg={backgroundColor}>
                <AccordionItem border="none" w={"full"}>
                  <HStack as={AccordionButton} w={"full"} justifyContent={"space-between"} py={4}>
                    <Heading size="md">什麼是「平方募資法」？</Heading>
                    <AccordionIcon></AccordionIcon>
                  </HStack>

                  <AccordionPanel pb={4}>
                    <Text fontSize="sm">
                      為避免因棄保效應、配票、80/20 法則等，導致非主流項目遭忽視與資源分配不均，以太坊創辦人 Vitalik
                      Buterin、哈佛大學經濟學者 Zoë Hitzig 以及微軟首席經濟研究員 Glen Weyl 在 2018
                      年底共同提出「平方募資法」(Quadratic
                      Funding)，平方募資基於平方投票計算與分配資金（如政府預算、慈善或企業來源、直接從參與者收集），目的在於讓資源分配變得更加平均。
                    </Text>
                  </AccordionPanel>
                </AccordionItem>
              </Accordion>

              {/* <MagikButton /> */}
            </VStack>
            {/* <VStack spacing={6} alignItems="flex-start" w={"full"}>
              <Accordion allowToggle w={"full"} bg={backgroundColor}>
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
                        <li>{t("ETHCommunity: August 11th - 13th")}</li>
                        <li>{t("Voting opens: August 13th @ 2:00 pm GTM-3")}</li>
                        <li>{t("Voting closes: August 19th")}</li>
                        <li>{t("Count of votes: August 22nd")}</li>
                        <li>{t("Distribution of funds: September 2nd")}</li>
                      </ul>
                    </Text>
                  </AccordionPanel>
                </AccordionItem>
              </Accordion>
            </VStack> */}
            <VStack spacing={6} alignItems="flex-start" w={"full"}>
              <Accordion mb={20} allowToggle w={"full"} bg={backgroundColor}>
                <AccordionItem border="none" w={"full"}>
                  <HStack as={AccordionButton} w={"full"} justifyContent={"space-between"} py={4}>
                    <Heading size="md">{t("How does it work?")}</Heading>
                    <AccordionIcon></AccordionIcon>
                  </HStack>

                  <AccordionPanel pb={4}>
                    <Text fontSize="sm" pb={8}>
                      {t("All ETHCommunity attendees will receive an email with a MACI key.")}
                    </Text>
                    <Text fontSize="sm" pb={8}>
                      {t(
                        "This key will allow them to cast votes in favor of the projects that apply to receive funds. To vote, you must have an address in your self-custodial wallet connected to Gnosis, with some $MATIC to pay for the transaction fees and a valid voting key."
                      )}
                    </Text>
                    <Text fontSize="sm" pb={8}>
                      {t(
                        "Voting is pseudo-anonymous, but to record the vote, your MACI key will be sent to your email address by the ETHCommunity team."
                      )}
                    </Text>
                    <Text fontSize="sm" pb={8}>
                      {t(
                        "During the event, you’ll be able to ask at the Ethereum Foundation booth about the funding process."
                      )}
                    </Text>
                    <Text fontSize="sm" pb={8}>
                      {t("If you have any questions, please, feel free to ask any of the ETHCommunity volunteers.")}
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
