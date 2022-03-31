import * as React from "react";
import { Text, Box, VStack, Stack, Button } from "@chakra-ui/react";
import { animateText, MagikText, GlitchText, EaseInBottom } from "@qfi/ui";

import { Hero } from "./components/Hero";

export const LandingPage = () => {
  return (
    <VStack spacing={4} justifyContent="stretch" alignItems="center">
      <VStack spacing={2} justifyContent="stretch" alignItems="center">
        <Stack
          spacing={[4, 8, 8, 8]}
          justifyContent="flex-start"
          alignItems="center"
          w={{ base: "fit-content", md: "50ch" }}
          direction={{ base: "column", md: "column" }}>
          <EaseInBottom duration={1.2} delay={3.5} heightStart={0} heightEnd={266}>
            <Hero h={[266]} />
          </EaseInBottom>

          <MagikText
            text="CINEMATIC UX"
            charPoses={animateText.bottomLeft(0)}
            fontFamily="Futura"
            zIndex={2}
            position="relative"
            left={["-0.5ch"]}
            letterSpacing={["-2px", "-3px"]}
            fontWeight="regular"
            lineHeight={["24px", "40px"]}
            fontSize={["24px", "30px", "40px"]}
            textAlign="center"
          />
        </Stack>
        <Stack
          spacing={-4}
          justifyContent="flex-start"
          alignItems="center"
          w={{ base: "fit-content" }}
          direction={{ base: "column", md: "column" }}>
          <Box height={"100%"} flexDirection="column" position="relative" alignItems="center">
            <MagikText
              text="RADICAL MECHANISM DESIGN"
              charPoses={animateText.bottom(640)}
              fontFamily="Helvetica"
              zIndex={2}
              position="relative"
              letterSpacing={["-2px", "-5px"]}
              fontWeight="bold"
              lineHeight={["40px", "60px"]}
              fontSize={["35px", "45px", "50px"]}
              minWidth={["18ch", "18ch", "28ch"]}
              textAlign="center"
            />
            <GlitchText
              text="RADICAL MECHANISM DESIGN"
              duration={0.161}
              delay={1.8}
              zIndex={1}
              position="absolute"
              top="0"
              fontWeight="bold"
              lineHeight={["40px", "60px"]}
              px={1}
              fontSize={["35px", "45px", "50px"]}
              letterSpacing={["-2px", "-5px"]}
              minWidth={["6ch", "11ch", "28ch"]}
              textAlign="center"></GlitchText>
          </Box>
        </Stack>
      </VStack>

      <MagikText
        text="Quadratic Funding is an optimal way to fund public goods in a democratic society. Through QF people can
      contribute to a crowdfunding campaign and their contributions will be matched via a clever formula that
      maximizes the marginal utility of the group. We are pushing for adoption of QF inside and out of the Ethereum
      Ecosystem and are looking for partners that would like to adopt the mechanism in their community."
        charPoses={animateText.fancy(1300)}
        fontFamily={"Tinos"}
        w={["50ch", "55ch", "55ch", "75ch"]}
        fontSize={["xs", "sm", "md", "lg"]}
        textAlign={"center"}
        fontWeight="500"></MagikText>

      <EaseInBottom duration={1.2} delay={3.3} heightStart={250} heightEnd={100}>
        <Stack
          marginTop={4}
          direction={{ base: "row", md: "row" }}
          spacing={[4, 6, 8]}
          alignItems="stretch"
          justifyContent="center">
          <VStack minW={["18ch", "20ch", "20ch"]} spacing={8} justifyContent="flex-start" alignItems="stretch">
            <Button h={[12]} variant="outline" colorScheme={"grey"}>
              <Text fontWeight={"bold"}>Deploy QFI</Text>
            </Button>
          </VStack>
          <VStack
            spacing={8}
            justifyContent="stretch"
            minW={["18ch", "25ch", "30ch"]}
            maxW={"full"}
            alignItems="stretch"
            flexShrink={0}
            rounded="xl"
            borderColor="gray.300">
            <Button h={12} variant="solid" colorScheme={"twitter"}>
              <Text fontWeight={"bold"}>Apply to Incubator</Text>
            </Button>
          </VStack>
        </Stack>
      </EaseInBottom>
    </VStack>
  );
};
