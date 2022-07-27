import React from "react";
import {
  VStack,
  Container,
  Flex,
  Text,
  Heading,
  Button,
  useColorModeValue,
  Link,
  Box,
  Accordion,
  AccordionButton,
  AccordionIcon,
  AccordionItem,
  AccordionPanel,
  HStack,
} from "@chakra-ui/react";
import { useSearchParams, Link as RouterLink } from "react-router-dom";
import { animateText, MagikText } from "@qfi/ui";
import { Hero } from "../components/Hero";
import { ColorModeSwitcher } from "../components/ColorModeSwitcher";
import { RecipientGuide } from "../components/prague/RecipientGuide";

export type HomeProps = {
  isSettingsOpen: boolean;
  onSettingsOpen: () => void;
  isGuideOpen: boolean;
  onGuideOpen: () => void;
};

export const Home = ({ isSettingsOpen, onSettingsOpen, isGuideOpen, onGuideOpen }: HomeProps) => {
  const color = useColorModeValue("gray.800", "gray.700");
  const backgroundColor = useColorModeValue("#FAFAFA", "gray.700");
  let [searchParams] = useSearchParams();
  return (
    <Flex
      as="main"
      h="full"
      flex={1}
      borderRightColor={color}
      borderRightWidth={1}
      position={"relative"}
      overflow="hidden">
      {/* <Hero
        position={"absolute"}
        overflow="hidden"
        zIndex={-1}
        maxW={"1600px"}
        left={{ base: "-260px", md: "0px", lg: "0px", xl: "-80px" }}
        top={{ base: "100px", md: "0px", lg: "0px", xl: "160px" }}
      /> */}

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
        {/* <VStack spacing={0} w="full" alignItems={"flex-end"}>
          <ColorModeSwitcher position="absolute" top={0} right={0} m={4} zIndex={1} />
        </VStack> */}
        <VStack mt={20} spacing={10} h="full" alignItems="flex-start">
          <VStack spacing={6} alignItems="flex-start">
            <Heading fontFamily={"DahliaCondensed"} fontSize={{ base: "76px", xl: "120px" }}>
              QF @ ETH BARCELONA
            </Heading>
            <Text fontSize={"sm"} maxW="60ch">
              Welcome! If you’re here, you’re probably working on something awesome in the Eth Barcelona community -
              Thanks for everything you do :)
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
                <Button as={RouterLink} variant={"barcelona"} fontSize={{ base: "lg", xl: "xl" }}  to={`/begin?${searchParams.toString()}`} 
                          >
                  Get Started
                </Button>
              </Box>

              <Text as={RouterLink} color={"gray.700"} to={`/projects?${searchParams.toString()}`} fontFamily={"Dahlia"} fontWeight={"bold"} fontSize={{ base: "lg", xl: "xl" }}>
                Checkout the Projects
              </Text>
            </HStack>
          </VStack>
          <VStack w="full" spacing={6}>
          <VStack spacing={6} alignItems="flex-start" w={"full"}>
            <Accordion allowToggle w={"full"} bg={backgroundColor} defaultIndex={0}>
              <AccordionItem border="none" w={"full"}>
                <HStack as={AccordionButton} w={"full"} justifyContent={"space-between"} py={4}>
                  <Heading textAlign={"left"} size="md">
                    What does it mean to VOTE?
                  </Heading>
                  <AccordionIcon></AccordionIcon>
                </HStack>

                <AccordionPanel pb={4}>
                  <Text  fontSize="sm" py={2}>
                  Voting for your favorite project makes them eligible to receive funds from the pooled funds from donors and 5% of the ticket sales of ETHBarcelona, but doesn’t guarantee funding. How much each project receives will be decided by ETHBarcelona attendees who vote during the event.
                  </Text>
                
                  <Text  fontSize="sm"  py={2}>
                  Please be aware the team will NEVER ask you to share the seed phrase or private key of this wallet, they will NEVER reach out to you via social media or other channels, and will not send you a seed phrase or private key to use. These are common scam tactics and we wish to avoid these bad actors stealing your funds.
                  </Text>
                  <Text fontSize={"sm"} py={2}>
                  If you are posting on Twitter, remember to tag @ETHBarcelona and use the hashtags within to have more reach.
                  </Text>
                </AccordionPanel>
              </AccordionItem>
            </Accordion>
          </VStack>
          <VStack spacing={6} alignItems="flex-start" w={"full"}>
            <Accordion allowToggle w={"full"} bg={backgroundColor} >
              <AccordionItem border="none" w={"full"}>
                <HStack as={AccordionButton} w={"full"} justifyContent={"space-between"} py={4}>
                  <Heading size="md">What is Quadratic Funding?</Heading>
                  <AccordionIcon></AccordionIcon>
                </HStack>

                <AccordionPanel pb={4}>
                  <Text  fontSize="sm">
                    Quadratic Funding (QF) is a more democratic way for communities to decide how to allocate funds to
                    public goods. A pool of matching funds is distributed among recipient projects according to a
                    formula that takes into account both how many people value something, and the strength of people’s
                    individual preferences.
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
                   Eligibility Criteria
                  </Heading>
                  <AccordionIcon></AccordionIcon>
                </HStack>

                <AccordionPanel pb={4}>
                  <Text  fontSize="sm"  py={2}>
                    - Project needs to be based or working with local communities or the environment in Catalunya or elsewhere in Spain.
                  </Text>
                  <Text  fontSize="sm"  py={2}>
                  - Public good focused Web3 / impact DAOs / decentralized projects can also apply, this is not exclusive to any project regardless of their use of blockchain technologies.
                  </Text>
                  <Text  fontSize="sm"  py={2}>
                  - Projects are required to have a public good focus or impact, often defined as non-rivalrous (use by one person doesn’t prevent access by others) and non-excludable (anyone can access or use it).
                  </Text>
                  <Text  fontSize="sm"  py={2}>
                  - Public good can be one of the many impacts of the project but it must be explicit what you will use the funds for if you are granted them. For example: funding a free permaculture education course for children in a village in Catalunya.
                  </Text>
                  <Text  fontSize="sm"  py={2}>
                  - Projects are not required to be web3 or crypto-native, but they must submit a Polygon wallet which they control as part of the application process. We encourage the use of self-custody solutions.
                  </Text>
                </AccordionPanel>
              </AccordionItem>
            </Accordion>
          </VStack> */}
        </VStack>
          {/* <VStack spacing={6} h="full" pb={8} alignItems={{ base: "flex-start", xl: "center" }} display="contents">
            <MagikText
              fontFamily="Dahlia"
              fontWeight="400"
              text="Featured Projects"
              charPoses={animateText.bottomLeft(0)}
              mt={10}
              lineHeight={{ base: "100px", xl: "180px" }}
              fontSize={{ base: "65px", xl: "100px" }}
              textAlign={{ base: "left", xl: "center" }}
            />
            <Heading my={10} py={"40px"} fontFamily="Dahlia" fontWeight="400">
              {" "}
              Stay Tuned! Projects will be announced soon after applications close.
            </Heading>
          </VStack> */}
        </VStack>
      </Container>
    </Flex>
  );
};
