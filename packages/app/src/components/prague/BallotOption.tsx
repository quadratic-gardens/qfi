import React, { useCallback } from "react";
import {
  VStack,
  Stack,
  HStack,
  Tooltip,
  Text,
  Heading,
  IconButton,
  Icon,
  Center,
  Button,
} from "@chakra-ui/react";
import {
  createSearchParams,
  Link,
  useNavigate,
  useSearchParams,
} from "react-router-dom";
import { BallotOptionProps } from "../../propTypes";
import { FaWindowClose } from "react-icons/fa";
import { useTranslation } from "react-i18next";
import { useMediaQuery } from "@chakra-ui/react";

export const BallotOption = ({
  ballotOption,
  to,
  votes,
  lastOption,
  onClick
}: BallotOptionProps) => {
  const { t } = useTranslation();
  const [isViewportMd] = useMediaQuery("(min-width: 768px)");
  let [searchParams] = useSearchParams();
  let navigate = useNavigate();
  const isInBallot = useCallback(
    (projectId: string) => {
      return searchParams.getAll("option").includes(projectId ?? "notfound");
    },
    [searchParams]
  );
  const handleRemoveFromBallot = useCallback(
    (projectId: string) => {
      return () => {
        if (projectId && isInBallot(projectId)) {
          let filtered = searchParams
            .getAll("option")
            .filter((id) => id !== projectId);
          let newSearchParams = createSearchParams({
            option: filtered,
          });

          navigate("/ballot?" + newSearchParams.toString());
        }
      };
    },
    [searchParams, isInBallot, navigate]
  );
  return (
    <Stack
      boxSizing="content-box"
      fontFamily="Space Grotesk"
      borderColor="#FAF7F5"
      borderTopWidth={2}
      borderLeftWidth={2}
      borderRightWidth={2}
      borderBottomWidth={lastOption ? 2 : 0}
      spacing={0}
      alignItems="stretch"
      justifyContent={{ sm: "initial", md: "center" }}
      direction="row"
      w="full"
      h={{ sm: 150, md: 90 }}
    >
      <VStack

        borderRightColor="#FAF7F5"
        borderRightWidth={2}
        spacing={0}
        justifyContent="center"
        alignItems="center"
        textAlign="center"
        w={isViewportMd ? 140 : "35%"}
      >
        <Text fontSize={20} fontWeight="bold" mx={2}>
          {votes ?? 0}
        </Text>
        <Text fontSize={20} fontFamily="Space Grotesk" mx={2}>
          {t("CREDITS")}
        </Text>
      </VStack>
      <VStack
        spacing={0}
        position="relative"
        justifyContent="flex-start"
        alignItems="stretch"
        w={{ base: "40%", md: "full" }}
        py={2.5}
        px={2}
      >
        <HStack alignItems="flex-start">
          <Heading fontSize={{ base: "md", md: "xl" }} fontWeight={"black"}>
            {ballotOption?.projectName}
          </Heading>

          {/* <Text
            as={Link}
            to={`${to}?${searchParams.toString()}` ?? "/projects"}
            fontFamily="Space Grotesk"
            fontSize={{ base: "sm", md: "sm" }}
            fontWeight="thin"
            lineHeight="base"
            display={{ base: "none", md: "flex" }}
          >
            {ballotOption?.website}
          </Text> */}
        </HStack>
        <Text
          fontSize="xs"
          lineHeight="short"
          fontWeight="normal"
          overflow="hidden"
        >
          {ballotOption?.tagline}
        </Text>
        {/* <Text
          as={Link}
          to={`${to}?${searchParams.toString()}` ?? "/projects"}
          display={{ base: "block", md: "none" }}
          fontSize="xs"
          fontWeight="light"
        >
          {ballotOption?.website}
        </Text> */}
      </VStack>
      <VStack
        position="relative"
        justifyContent="flex-start"
        alignItems="stretch"
        spacing={0}
        maxW={{ base: "fit-content", md: "70px" }}>
        <Tooltip
          label={`remove ${ballotOption?.projectName} from ballot`}
          placement="left"
        >
          <IconButton
            rounded="0"
            size="sm"
            fontSize="lg"
            variant="ghost"
            color="gray.600"
            marginLeft="2"
            onClick={handleRemoveFromBallot(ballotOption?.id ?? "")}
            icon={<FaWindowClose />}
            aria-label={`remove ${ballotOption?.projectName} from ballot`}
          />
        </Tooltip>
        <Center boxSize={"60px"}>
          <Tooltip
            label={`Add one more vote for ${((votes ?? 0) + 1) ** 2 - (votes ?? 0) ** 2} more voice credits`}
            placement="right">
            <Button
              onClick={onClick}
              sx={{
                ":after": {
                  content: "''",
                  backgroundBlendMode: "difference",
                  position: "absolute",
                  backgroundPosition: "center",
                  backgroundRepeat: "no-repeat",
                  background: `rgb(26, 31, 41) url('${ballotOption?.logoCdnUrl}') `,
                  backgroundSize: "cover",
                  top: 0,
                  left: 0,
                  right: 0,
                  bottom: 0,
                  zIndex: "-1",
                  filter: "blur(1px)",
                  transform: "scale(0.9)",
                  rounded: "full",
                },
              }}
              bg="gray.600"
              overflow="hidden"
              // bgImg={hero2}
              // backgroundPosition="center"
              rounded={"full"}
              borderColor="#E573E5"
              _hover={{
                borderColor: "#80FF9F",
                transform: "scale(1.1)",
              }}
              borderWidth={1}
              boxSize="50px">
              <Center>
                <Icon
                  color="#E573E5"
                  position="relative"
                  zIndex={1}
                  boxSize={"8"}
                  letterSpacing="-0.5px"

                  _hover={{
                    color: "#80FF9F",
                    transform: "scale(1.1)",
                  }}>
                  <path
                    fill="currentColor"
                    d="M18 13h-.68l-2 2h1.91L19 17H5l1.78-2h2.05l-2-2H6l-3 3v4c0 1.1.89 2 1.99 2H19a2 2 0 002-2v-4l-3-3zm-1-5.05l-4.95 4.95-3.54-3.54 4.95-4.95L17 7.95zm-4.24-5.66L6.39 8.66a.996.996 0 000 1.41l4.95 4.95c.39.39 1.02.39 1.41 0l6.36-6.36a.996.996 0 000-1.41L14.16 2.3a.975.975 0 00-1.4-.01z"></path>
                </Icon>
              </Center>
            </Button>
          </Tooltip>
        </Center>
      </VStack>
    </Stack>
  );
};
