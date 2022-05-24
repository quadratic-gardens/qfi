import React from "react";
import {
  VStack,
  Container,
  HStack,
  Flex,
  Image,
  AspectRatio,
  IconButton,
  Icon,
  Text,
  Heading,
  Button,
  Box,
  useColorModeValue,
} from "@chakra-ui/react";
import { HiArrowLeft } from "react-icons/hi";
import { Link, useParams } from "react-router-dom";
import { getProject } from "../data";

export function Project() {
  let { projectId } = useParams();
  let project = getProject(projectId ?? "0");
  const color = useColorModeValue("gray.100", "gray.700");
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
        <Container
          paddingInlineStart={0}
          paddingInlineEnd={0}
          h="full"
          w="full"
          maxWidth={{ xs: "full", sm: "full", md: "full", lg: "lg", xl: "xl" }}>
          <VStack
            borderColor={color}
            borderLeftWidth={1}
            borderRightWidth={1}
            my={0}
            spacing={0}
            h="full"
            alignItems="flex-start">
            <HStack
              spacing={0}
              maxH={16}
              mt={0.5}
              py={0.5}
              w="full"
              borderBottomColor={"gray.100"}
              borderBottomWidth={1}>
              <VStack p={4} maxW={16} justifyContent="space-between" alignItems="center" w="full">
                <IconButton
                  boxSize={"34px"}
                  variant={"ghost"}
                  rounded="full"
                  to="/projects"
                  as={Link}
                  icon={<Icon as={HiArrowLeft} />}
                  aria-label="Home"
                />
              </VStack>
              <VStack alignItems="flex-start" w="full" spacing={0} overflow="hidden">
                <Heading my={0.5} px={2} fontSize={"lg"} lineHeight={"24px"} fontWeight="700">
                  {project.name}
                </Heading>
                <Text px={2} color={"gray.600"} fontSize={"xs"} lineHeight={"16px"} fontWeight="400">
                  {project.address}
                </Text>
              </VStack>
            </HStack>
            <VStack display={"block"} w="full" overflow={"hidden"}>
              <Box
                h="full"
                w="full"
                position="relative"
                paddingBottom="33.3333%"
                sx={{
                  backgroundPosition: "center",
                  backgroundRepeat: "no-repeat",
                  background: `rgb(26, 31, 41) url('${project?.image}') `,
                  backgroundSize: "cover",
                }}>
                <Image h="full" w="full" position="absolute" src={project.image} alt={project.name} />
              </Box>
            </VStack>
            <HStack pt={3} px={{ base: "4", md: "6" }} justifyContent={"space-between"} w="full" spacing={0}>
              <AspectRatio
                borderColor={"grey.300"}
                borderWidth={3}
                zIndex="1"
                w={{ base: "25%", md: "25%" }}
                mt="-15%"
                mb="12px"
                display="block"
                overflow={"visible"}
                rounded="full"
                maxW="100%"
                ratio={1}>
                <Image borderRadius="full" src={project.image} alt={project.name} />
              </AspectRatio>

              <Button
                fontSize={"15px"}
                bg="blue"
                color="white"
                rounded={"full"}
                as={Link}
                to={`/ballot`}
                height={{ base: "30px", md: "40px" }}
                marginTop={{ base: "-20px !important", md: "20px !important" }}>
                <HStack px={4}>
                  <Icon
                    color="white"
                    position="relative"
                    z-index={20}
                    boxSize={"15px"}
                    fontWeight={"black"}
                    _hover={{
                      color: "black",
                      transform: "scale(1.1)",
                    }}>
                    <path
                      fill="currentColor"
                      d="M18 13h-.68l-2 2h1.91L19 17H5l1.78-2h2.05l-2-2H6l-3 3v4c0 1.1.89 2 1.99 2H19a2 2 0 002-2v-4l-3-3zm-1-5.05l-4.95 4.95-3.54-3.54 4.95-4.95L17 7.95zm-4.24-5.66L6.39 8.66a.996.996 0 000 1.41l4.95 4.95c.39.39 1.02.39 1.41 0l6.36-6.36a.996.996 0 000-1.41L14.16 2.3a.975.975 0 00-1.4-.01z"></path>
                  </Icon>
                  <Text
                    display={{ base: "none", md: "block" }}
                    fontSize={["xs", "sm", "sm", "sm"]}
                    fontWeight="800"
                    ml={2}>
                    BALLOT
                  </Text>
                </HStack>
              </Button>
            </HStack>
            <VStack alignItems="flex-start" w="full" spacing={3} px={{ base: "4", md: "6" }}>
              <VStack alignItems="flex-start" w="full" spacing={0}>
                <Heading my={0.5} fontSize={"xl"} lineHeight={"24px"} fontWeight="700">
                  {project.name}
                </Heading>
                <Text color={"gray.600"} fontSize={"xs"} lineHeight={"14px"} fontWeight="400">
                  {project.address}
                </Text>
              </VStack>
              <Text fontSize={"sm"} lineHeight={"16px"} fontWeight="400">
                {project.description} {project.problemSpace}
              </Text>
              {/* <Text fontSize={"sm"} lineHeight={"16px"} fontWeight="400">
             
            </Text> */}
              <VStack alignItems="flex-start" w="full" spacing={1}>
                <Text fontSize={"sm"} lineHeight={"16px"} fontWeight="400">
                  <b> Project Ballot ID:</b> {project.id}
                </Text>
                <Text fontSize={"sm"} lineHeight={"16px"} fontWeight="400">
                  <b> Project Website:</b> {project.url}
                </Text>
              </VStack>
            </VStack>
          </VStack>
        </Container>
      </VStack>
    </Flex>
  );
}
