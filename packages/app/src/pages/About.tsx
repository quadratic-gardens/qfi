import React from "react";
import { VStack, Container, Flex, Text, Heading, useColorModeValue } from "@chakra-ui/react";
import { useTranslation } from "react-i18next";

export const About = () => {
  const { t } = useTranslation();
  const color = useColorModeValue("gray.800", "gray.700");

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
          <VStack spacing={2} alignItems="flex-start" w="full">
            <Heading size="2xl" style={{ marginBottom: 32 }}>
              {t("About the round")}
            </Heading>
            <Text pb={4}>
              ETHDam will be held on the 20th and 21st of May 2023 in Amsterdam, to gather the best minds in the industry, working in DeFi and Privacy. We are delighted to welcome thought leaders from Polygon, Curve, Aave, Balancer, Dune, MakerDAO and many more. Join this conference and hackathon
              gathering more than 800 builders in the center of Amsterdam at Pakhuis De
              Zwijger to shape the future of crypto.
            </Text>
            <Text pb={4} w={"full"}>
              Following the arrest of Alex Pertsev, a Tornado Cash developer in the Netherlands, ETHDam 2023 is determined to counter the chilling effect and bridge worlds to discuss the future of privacy and encourage them to build on the shoulders of cypherpunk
              giants.
            </Text>
            <Text pb={4} w={"full"}>
              This year, the ETHDam hackathon will feature a never seen or done before, “All Stars Track”, a champions league for previous ETH hackathon winners to inspire them to keep building. These experienced hackers will compete in this special track for glory and have the opportunity to
              reveal their products on the main stage.
            </Text>
            <Text pb={4} w={"full"}>
              ETHDam is powered by CryptoCanal, an education and events platform growing in Amsterdam and spreading its roots to Rotterdam and Zürich. This grass root community is bound by the cypherpunk ideals of privacy, censorship resistance and ownership.
            </Text>
          </VStack>
        </VStack>
      </Container>
    </Flex>
  );
};
