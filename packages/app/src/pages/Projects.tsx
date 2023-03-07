import React from "react";
import {
  VStack,
  Container,
  HStack,
  Flex,
  Image,
  AspectRatio,
  Text,
  Heading,
  Box,
  UnorderedList,
  ListItem,
  Accordion,
  AccordionButton,
  AccordionItem,
  AccordionPanel,
  useColorModeValue,
} from "@chakra-ui/react";
import { Link, Outlet, useSearchParams } from "react-router-dom";
import { Option } from "../propTypes";

import { useTranslation, Trans } from "react-i18next";

const shortenEthAddress = (address: string) => {
  return (
    address.substring(0, 6) + "..." + address.substring(address.length - 4)
  );
};

export const Projects = ({ shuffledProjects }) => {
  const fontColor = useColorModeValue("gray.800", "gray.200");
  const color = useColorModeValue("gray.800", "gray.700");
  let [searchParams] = useSearchParams();

  const { t } = useTranslation();

  return (
    <>
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
        }}
      >
        <VStack spacing={0} w="full">
          <Container
            h="full"
            w="full"
            maxWidth={{
              base: "container.sm",
              md: "container.sm",
              lg: "container.md",
            }}
            px={0}
            pt={20}
          >
            <VStack mt={10} spacing={4} h="full" alignItems="flex-start">
              <VStack pl={4} spacing={0} alignItems="flex-start" w="full">
                <Heading fontSize="5xl" mb={0}>
                  {t("Project Directory")}
                </Heading>

                <Accordion allowToggle>
                  <AccordionItem border="none">
                    {({ isExpanded }) => (
                      <>
                        <VStack
                          px={0}
                          flexDirection="row"
                          justifyContent="space-between"
                          alignItems="start"
                          as={AccordionButton}
                        >
                          <Text
                            w={{ base: "85%", md: "95%" }}
                            textAlign="justify"
                          >
                            <Trans i18nKey="This is a directory of projects!" />
                          </Text>
                          {isExpanded ? (
                            <Image src="chevron_up.svg" alt={t("Collapse")} />
                          ) : (
                            <Image src="chevron_down.svg" alt={t("Expand")} />
                          )}
                        </VStack>
                        <AccordionPanel pb={4}>
                          <UnorderedList
                            fontFamily="Space Grotesk"
                            marginInlineStart="1rem !important"
                            w="full"
                          >
                            <ListItem>
                              <Trans i18nKey="When a voter is whitelisted" />
                            </ListItem>
                            <ListItem>
                              <Trans i18nKey="Everyone will begin with 99 voice credits" />
                            </ListItem>
                            <ListItem>
                              <Trans i18nKey="These voice credits are used to cast votes" />
                            </ListItem>
                            <ListItem>
                              <Trans i18nKey="You can add up to 8 projects" />
                            </ListItem>
                            <ListItem>
                              <Trans i18nKey="Casting a vote" />
                            </ListItem>
                            <ListItem>
                              <Trans i18nKey="You cannot use more voice credits than you have" />
                            </ListItem>
                            <ListItem>
                              <Trans i18nKey="You can submit many ballots" />
                            </ListItem>
                            <ListItem>
                              <Trans i18nKey="Only the final submitted ballot will be counted" />
                            </ListItem>
                            <ListItem>
                              <Trans i18nKey="The ballot will be tallied at the end of the voting period" />
                            </ListItem>
                          </UnorderedList>
                        </AccordionPanel>
                      </>
                    )}
                  </AccordionItem>
                </Accordion>
              </VStack>
              <VStack spacing={0} alignItems="flex-start" w="full">
                {shuffledProjects.map((project: Option) => (
                  <Box
                    _hover={{
                      boxShadow: "0px 0px 10px rgba(0, 0, 0, 0.5)",
                      backgroundColor: "gray.100",
                    }}
                    alignItems={"stretch"}
                    as={Link}
                    to={`/projects/${project.id}?${searchParams.toString()}`}
                    color={fontColor}
                    key={project.id}
                    pt={3}
                    pb={3}
                    pl={4}
                    minH={"100px"}
                    w={"full"}
                  >
                    <HStack spacing={0} alignItems="flex-start" w="full">
                      <AspectRatio
                        borderColor={"grey.800"}
                        borderWidth={1}
                        zIndex="1"
                        w={{ base: "50px", md: "50px" }}
                        rounded="full"
                        ratio={1}
                        mt={1}
                      >
                        <Image
                          borderRadius="full"
                          src={project.logoCdnUrl}
                          alt={project.projectName}
                        />
                      </AspectRatio>
                      <VStack
                        alignItems="flex-start"
                        w="full"
                        spacing={1.5}
                        px={{ base: "4", md: "3" }}
                      >
                        <VStack alignItems="flex-start" w="full" spacing={0}>
                          <Heading
                            my={0.5}
                            fontSize="lg"
                            lineHeight="24px"
                            fontWeight="700"
                          >
                            {project.projectName}
                          </Heading>
                          <Text
                            color="gray.600"
                            fontSize="sm"
                            lineHeight="14px"
                            fontWeight="400"
                            overflow="clip"
                          >
                            {shortenEthAddress(project.ethereumAddress)}
                          </Text>
                        </VStack>
                        <Text fontSize="sm" lineHeight="16px" fontWeight="400">
                          {project.tagline}
                        </Text>
                      </VStack>
                    </HStack>
                  </Box>
                ))}
              </VStack>
            </VStack>
          </Container>
        </VStack>
      </Flex>

      <Outlet />
    </>
  );
};
