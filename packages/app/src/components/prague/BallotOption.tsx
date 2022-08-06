import React, { useCallback } from "react";
import {
  VStack,
  Stack,
  HStack,
  Tooltip,
  Text,
  Heading,
  IconButton,
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
      fontFamily="arial"
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
        <Text fontSize={20} fontFamily="NeuePixelGrotesk" mx={2}>
          {t("CREDITS")}
        </Text>
      </VStack>
      <VStack
        spacing={0}
        position="relative"
        justifyContent="flex-start"
        alignItems="stretch"
        w={{ base: "65%", md: "full" }}
        py={2.5}
        px={2}
      >
        <HStack alignItems="flex-start">
          <Heading fontSize={{ base: "md", md: "xl" }} fontWeight={"black"}>
            {ballotOption?.name}
          </Heading>

          <Text
            as={Link}
            to={`${to}?${searchParams.toString()}` ?? "/projects"}
            fontFamily="arial"
            fontSize={{ base: "sm", md: "sm" }}
            fontWeight="thin"
            lineHeight="base"
            display={{ base: "none", md: "flex" }}
          >
            {ballotOption?.url}
          </Text>
        </HStack>
        <Text
          fontSize="xs"
          lineHeight="short"
          fontWeight="normal"
          overflow="hidden"
        >
          {ballotOption?.tagline}
        </Text>
        <Text
          as={Link}
          to={`${to}?${searchParams.toString()}` ?? "/projects"}
          display={{ base: "flex", md: "none" }}
          fontSize="xs"
          fontWeight="light"
        >
          {ballotOption?.url}
        </Text>

        <Tooltip
          label={`remove ${ballotOption?.name} from ballot`}
          placement="left"
        >
          <IconButton
            position="absolute"
            right={0}
            top={0}
            rounded="0"
            size="sm"
            fontSize="lg"
            variant="ghost"
            color="gray.600"
            marginLeft="2"
            onClick={handleRemoveFromBallot(ballotOption?.id ?? "")}
            icon={<FaWindowClose />}
            aria-label={`remove ${ballotOption?.name} from ballot`}
          />
        </Tooltip>
      </VStack>
      {isViewportMd && (
        <VStack
          h="full"
          spacing={0}
          borderLeftColor="#FAF7F5"
          borderLeftWidth={2}
          justifyContent="center"
          alignItems="center"
          w="140px"
        >
          <img
            style={{ height: "100%", maxWidth: 90 }}
            src={ballotOption.logo}
            alt="current project logo"
          />
        </VStack>
      )}
    </Stack>
  );
};
