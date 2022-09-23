import React, { useCallback, useMemo } from "react";
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
  useToast,
} from "@chakra-ui/react";
import { HiArrowLeft } from "react-icons/hi";
import {
  createSearchParams,
  Link,
  useNavigate,
  useParams,
  useSearchParams,
} from "react-router-dom";
import { getProject } from "../data";

import { useTranslation } from "react-i18next";

const shortenEthAddress = (address: string) => {
  return (
    address.substring(0, 6) + "..." + address.substring(address.length - 4)
  );
};

export function Project() {
  const { t } = useTranslation();

  const backgroundColor = useColorModeValue("gray.100", "rgb(27, 34, 58)");
  const toast = useToast();
  let { projectId } = useParams();
  let navigate = useNavigate();
  let [searchParams] = useSearchParams();
  const isInBallot = useMemo(() => {
    return searchParams.getAll("option").includes(projectId ?? "notfound");
  }, [searchParams, projectId]);

  const handleRemoveFromBallot = useCallback(
    (projectId: string) => {
      return () => {
        if (projectId && isInBallot) {
          let filtered = searchParams
            .getAll("option")
            .filter((id) => id !== projectId);
          let newSearchParams = createSearchParams({
            option: filtered,
          });
          toast({
            title: t("Removed from ballot"),
            description: t("You can add it back to the ballot later"),
            status: "success",
            duration: 3000,
            isClosable: true,
          });

          navigate("/projects/" + projectId + "?" + newSearchParams.toString());
          return;
        }
      };
    },
    [searchParams, isInBallot, navigate, toast]
  );

  let project = getProject(projectId ?? "0");

  const color = useColorModeValue("gray.100", "gray.700");
  const handleAddToBallot = useCallback(() => {
    if (searchParams.getAll("option").length >= 8) {
      toast({
        title: t("Too many options"),
        description: t("You can only add up to 8 options to your ballot"),
        status: "error",
        duration: 3000,
        isClosable: true,
      });
      return;
    }

    if (!isInBallot && projectId) {
      searchParams.append("option", projectId);
      toast({
        title: t("Added to ballot"),
        description: t("You can now vote on this project"),
        status: "success",
        duration: 3000,
        isClosable: true,
      });
      navigate("/projects/" + projectId + "?" + searchParams.toString());
      return;
    }
  }, [searchParams, isInBallot, projectId, navigate, toast]);
  return (
    <Flex
      bg={backgroundColor}
      zIndex={99}
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
          paddingInlineStart={0}
          paddingInlineEnd={0}
          h="full"
          w="full"
          maxWidth={{ xs: "full", sm: "full", md: "full", lg: "lg", xl: "xl" }}
        >
          <VStack
            pb={120}
            borderColor={color}
            borderLeftWidth={1}
            borderRightWidth={1}
            my={0}
            spacing={0}
            h="full"
            alignItems="flex-start"
          >
            <HStack
              spacing={0}
              maxH={16}
              mt={0.5}
              py={0.5}
              w="full"
              borderBottomColor="gray.100"
              borderBottomWidth={1}
            >
              <VStack
                p={4}
                maxW={16}
                justifyContent="space-between"
                alignItems="center"
                w="full"
              >
                <IconButton
                  boxSize="34px"
                  variant="ghost"
                  rounded="full"
                  to={`/projects?${searchParams.toString()}`}
                  as={Link}
                  icon={<Icon as={HiArrowLeft} />}
                  aria-label="Home"
                />
              </VStack>
              <VStack
                alignItems="flex-start"
                w="full"
                spacing={0}
                overflow="hidden"
              >
                <Heading my={0.5} px={2} fontSize="lg" lineHeight="24px">
                  {project.projectName}
                </Heading>
                <Text
                  px={2}
                  color="gray.600"
                  fontSize="xs"
                  lineHeight="16px"
                  fontWeight="400"
                >
                  {shortenEthAddress(project.ethereumAddress)}
                </Text>
              </VStack>
            </HStack>
            <VStack
              display="block"
              w="full"
              minH={{ base: "100px", md: "200px" }}
              overflow="hidden"
            >
              <Box
                h="full"
                w="full"
                position="relative"
                mt="-13%"
                sx={{
                  backgroundPosition: "center",
                  backgroundRepeat: "no-repeat",
                  
                  background: `linear-gradient(340deg, #FFB9E5 22.344970703125%, #ECF872 51.0040283203125%, #BEE0E6 76.86767578125%)  `,
                  backgroundSize: "cover",
                }}
              >
                <AspectRatio position="relative" ratio={16 / 9}>
                  <Box
                    h="full"
                    w="auto"
                    position="relative"
                    background= "linear-gradient(340deg, #FFB9E5 22.344970703125%, #ECF872 51.0040283203125%, #BEE0E6 76.86767578125%)"
                    
                  />
                </AspectRatio>
              </Box>
            </VStack>
            <HStack
              pt={3}
              px={{ base: "4", md: "6" }}
              justifyContent={"space-between"}
              w="full"
              spacing={0}
            >
              <AspectRatio
                borderColor="grey.300"
                borderWidth={3}
                zIndex="1"
                w={{ base: "25%", md: "25%" }}
                mt={{ sm: "-15%", md: "-15%" }}
                mb="12px"
                display="block"
                overflow="visible"
                rounded="full"
                maxW="100%"
                ratio={1}
              >
                <Image
                  borderRadius="full"
                  src={project.logoCdnUrl}
                  alt={project.projectName}
                />
              </AspectRatio>

              <Button
                fontSize="15px"
                variant="ethLatamBlack"
                onClick={
                  isInBallot
                    ? handleRemoveFromBallot(projectId?.toString() ?? "noop")
                    : handleAddToBallot
                }
                height={{ base: "30px", md: "40px" }}
                marginTop={{
                  base: "-12% !important",
                  sm: "-5% !important",
                  md: "-6% !important",
                  lg: "-2% !important",
                }}
              >
                <HStack px={4}>
                  <Icon
                    color="white"
                    position="relative"
                    z-index={20}
                    boxSize="15px"
                    fontWeight="black"
                    _hover={{
                      color: "black",
                      transform: "scale(1.1)",
                    }}
                  >
                    <path
                      fill="currentColor"
                      d="M18 13h-.68l-2 2h1.91L19 17H5l1.78-2h2.05l-2-2H6l-3 3v4c0 1.1.89 2 1.99 2H19a2 2 0 002-2v-4l-3-3zm-1-5.05l-4.95 4.95-3.54-3.54 4.95-4.95L17 7.95zm-4.24-5.66L6.39 8.66a.996.996 0 000 1.41l4.95 4.95c.39.39 1.02.39 1.41 0l6.36-6.36a.996.996 0 000-1.41L14.16 2.3a.975.975 0 00-1.4-.01z"
                    ></path>
                  </Icon>
                  <Text
                    display={{ base: "none", md: "block" }}
                    fontSize={["xs", "sm", "sm", "sm"]}
                    fontWeight="800"
                    ml={2}
                  >
                    {t(isInBallot ? "Remove" : "Add to Ballot")}
                  </Text>
                </HStack>
              </Button>
            </HStack>
            <VStack
              alignItems="flex-start"
              w="full"
              spacing={3}
              px={{ base: "4", md: "6" }}
            >
              <VStack alignItems="flex-start" w="full" spacing={0}>
                <Heading
                  my={0.5}
                  fontSize={"xl"}
                  lineHeight={"24px"}
                  fontWeight="700"
                >
                  {project.projectName}
                </Heading>
                <Text
                  color="gray.600"
                  fontSize="xs"
                  lineHeight="14px"
                  fontWeight="400"
                >
                  {shortenEthAddress(project.ethereumAddress)}
                </Text>
              </VStack>
              <Text fontSize="sm" lineHeight="16px" fontWeight="400">
                {project.description}
              </Text>

              <VStack alignItems="flex-start" w="full" spacing={1}>
                <Text fontSize="sm" lineHeight="16px" fontWeight="400">
                  <b>{t("Project Ballot ID")}:</b> {project.id}
                </Text>
                <Text fontSize="sm" lineHeight="16px" fontWeight="400">
                  <b>{t("Project Website")}:</b> {project.website}
                </Text>
              </VStack>
            </VStack>
          </VStack>
        </Container>
      </VStack>
    </Flex>
  );
}
