import React from "react";
import {
  VStack,
  Container,
  Flex,
  Text,
  Link,
  Icon,
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
import { HiQrcode, HiCollection, HiExternalLink } from "react-icons/hi";

export const Home = () => {
  const { t } = useTranslation();
  const color = useColorModeValue("gray.800", "gray.700");
  const backgroundColor = useColorModeValue("#F9DC5C", "#222222");
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
            <Heading fontSize={{ base: "38px", xl: "60px" }}>QF @ZKPLAYGROUND</Heading>
          </VStack>
          <VStack width="100%" alignItems="flex-start">
            <Text fontSize={"md"} pb={4}>
              在 Web3 的世界中，我們透過社群自治來解決各式問題。 而平方募資法 (QF) ，則是一套消弭分配不均的實驗性工具。
            </Text>

            <Stack spacing={10} direction={["column", "row"]} pb={4}>
              <Button
                as={RouterLink}
                h={50}
                variant={"primary"}
                to={`/projects?${searchParams.toString()}`}>
                {t("CHECK OUT THE PROJECTS")}
              </Button>
              <Button
                as={RouterLink}
                h={50}
                variant={"zkstart"} //magik //secondary
                to={`/ballot?${searchParams.toString()}`}>
                {t("GET STARTED")}
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
                      為 ZKPlayground 提案項目投票的意義是什麼？
                    </Heading>
                    <AccordionIcon></AccordionIcon>
                  </HStack>

                  <AccordionPanel pb={4}>
                    <Text fontSize="sm" py={2}>
                    為您喜歡的 ZKPlayground 提案投票，使他們有資格從贊助者的集合資金池中取得資金並繼續發展，另外一方面提案方也可以由社群票數了解到提案的市場性。每個專案獲得多少資金將由 ZKPlayground Stage1 的參與者在活動期間投票決定。
                    </Text>

                    <Text fontSize="sm" py={2}>
                    請注意，投票主辦團隊永遠不會要求你分享這個錢包的種子短語或私鑰，也永遠不會通過社交媒體或其他渠道與你聯繫，也不會給你發送種子短語或私鑰來使用。這些都是常見的詐騙手段，我們希望避免這些不良分子竊取你的資金。
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
                    平方募資 (QF) 是社區決定如何將資金分配給公共產品的一種更民主的方式。一個匹配的資金池根據一個公式分配給受助項目，該公式考慮了有多少人重視某件事，以及人們個人偏好的強度。
                    </Text>
                    <Text>
                        （點擊右方圖示閱讀有關平方募資的更多信息) {" "}
                          <Link href="https://docs.google.com/presentation/d/1xmYeiLxalpINxE6f4VU8oQx0Qb_2eDJnwGCHwd1fAEo/edit?usp=sharing" isExternal>
                          <Icon as={HiExternalLink} boxSize={4} color="gray.500" />
                          </Link>
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

