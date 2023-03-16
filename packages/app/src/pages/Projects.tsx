import React from "react";
import { VStack, Container, HStack, Flex, Image, AspectRatio, Text, Heading, Box, Stack, Button, useColorModeValue } from "@chakra-ui/react";
import { Link, Outlet, useSearchParams } from "react-router-dom";
import { Option } from "../propTypes";
import {  Hero } from "../components/Hero";

import { useTranslation } from "react-i18next";
import { getShuffledProjects } from "../data";
const shortenEthAddress = (address: string) => {
  return address.substring(0, 6) + "..." + address.substring(address.length - 4);
};

export const Projects = () => {
  const fontColor = useColorModeValue("gray.800", "gray.200");
  const color = useColorModeValue("gray.800", "gray.700");
  let [searchParams] = useSearchParams();

  const { t } = useTranslation();
  const backgroundColor = useColorModeValue("#FAFAFA", "#222222");

  const shuffledProjects = getShuffledProjects();

  const heroLightmode = (
    <AspectRatio
      ratio={1}
      w="50%"
      h={"auto"}
      overflow="hidden"
      alignItems={"flex-start"}
      justifyContent={"flex-start"}
      flexDir={"row"}>
      <Hero></Hero>
    </AspectRatio>
  );
  const heroDarkmode = (
    <AspectRatio
      ratio={16 / 9}
      w="full"
      h={"auto"}
      overflow="hidden"
      alignItems={"flex-start"}
      justifyContent={"flex-start"}
      flexDir={"row"}>
      <Hero h={"auto !important"}></Hero>
    </AspectRatio>
  );


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
        }}>
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
            pt={20}>
            <VStack mt={10} spacing={4} h="full" alignItems="flex-start">
              <VStack pl={4} spacing={0} alignItems="flex-start" w="full">
                <VStack spacing={6} w="full" alignItems="flex-start">
                  {useColorModeValue(heroLightmode, heroDarkmode)}
                  <Heading fontWeight={"black"} fontSize={"4xl"}>
                    {t("ORGANIZER")}
                  </Heading>
                  <Heading fontWeight={"500"} fontSize={"2xl"}>
                  Impact real things in the real world. Today.
                  </Heading>
                </VStack>
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
                    w={"full"}>
                    <HStack spacing={0} alignItems="flex-start" w="full">
                      <AspectRatio borderColor={"grey.800"} borderWidth={1} zIndex="1" w={{ base: "50px", md: "50px" }} rounded="full" ratio={1} mt={1}>
                        <Image borderRadius="full" src={project.logoCdnUrl} alt={project.projectName} />
                      </AspectRatio>
                      <VStack alignItems="flex-start" w="full" spacing={1.5} px={{ base: "4", md: "3" }}>
                        <VStack alignItems="flex-start" w="full" spacing={0}>
                          <Heading my={0.5} fontSize="lg" lineHeight="24px" fontWeight="700">
                            {project.projectName}
                          </Heading>
                          {/* <Text color="gray.600" fontSize="sm" lineHeight="14px" fontWeight="400" overflow="clip">
                            {shortenEthAddress(project.ethereumAddress)}
                          </Text> */}
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
