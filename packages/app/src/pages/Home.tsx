import React from "react";
import {
  VStack,
  Container, Flex, Text,
  Heading,
  Button,
  Link,
  useColorModeValue
} from "@chakra-ui/react";
import { animateText, MagikText } from "@qfi/ui";
import { Hero } from "../components/Hero";
import { ColorModeSwitcher } from "../components/ColorModeSwitcher";


export type HomeProps = {
  isSettingsOpen: boolean;
  onSettingsOpen: () => void;
  isGuideOpen: boolean;
  onGuideOpen: () => void;
};


export const Home = ({ isSettingsOpen, onSettingsOpen, isGuideOpen, onGuideOpen }: HomeProps) => {
  const color = useColorModeValue("gray.800", "gray.700");
  return (
    <Flex
      as="main"
      h="full"
      flex={1}
      borderRightColor={color}
      borderRightWidth={1}
      position={"relative"}
      overflow="hidden">
      <Hero
        position={"absolute"}
        overflow="hidden"
        zIndex={-1}
        maxW={"1600px"}
        left={{ base: "-260px", md: "0px", lg: "0px", xl: "-80px" }}
        top={{ base: "100px", md: "0px", lg: "0px", xl: "160px" }} />

      <Container maxWidth={{ lg: "container.md", md: "container.md" }} py={100}>
        <VStack spacing={0} w="full" alignItems={"flex-end"}>
        <ColorModeSwitcher position="absolute" top={0} right={0} m={4} zIndex={1} />
      </VStack>
        <VStack spacing={2} h="full" alignItems={"flex-start"}>
          <VStack
            spacing={6}
            h="full"
            pb={8}
            alignItems={{ base: "flex-start", xl: "center" }}
            display="contents"
            mt={{ base: "80px", xl: "60px" }}>
            <MagikText
              fontFamily="Arial"
              text="ZERO KNOWLEDGE QUADRATIC PRIZE POOL"
              charPoses={animateText.bottomLeft(0)}
              mt={10}
              fontWeight={"black"}
              lineHeight={{ base: "40px", xl: "80px" }}
              fontSize={{ base: "40px", xl: "80px" }}
              letterSpacing={"-4px"}
              textAlign={{ base: "left", xl: "center" }} />
            <Heading></Heading>
            <Text maxW={"50ch"} fontFamily={"archivo"} display={{ base: "flex", xl: "none" }}>
              Quadratic Funding at ETH Prague!
            </Text>

            <VStack display={{ base: "flex", xl: "none" }} pt="0" alignItems={"flex-start"} w="full">
              <Button as={Link} href="https://cf23uhv4kuq.typeform.com/to/VodVOdg9" isExternal h="60px" w="full" background="#FFFF00" color="black" variant={"solid"}>
                <Text fontSize="lg"  color={color} fontWeight={"black"}>
                  REGISTER YOUR PROJECT
                </Text>
              </Button>
              <Button
                onClick={onGuideOpen}
                fontSize="lg"
                fontWeight={"black"}
                bg={"black"}
                color="white"
                h="60px"
                w="full"
                background="#5400FF">
                LEARN MORE
              </Button>
            </VStack>

            <VStack w="full" display={{ base: "none", xl: "flex" }} pt="10" justifyContent={"center"}>
              <Button as={Link} href="https://cf23uhv4kuq.typeform.com/to/VodVOdg9" isExternal h="80px" w="full" background="#FFFF00"color={color} variant={"solid"}>
                <Text fontSize="xl" fontWeight={"black"} fontFamily={"archivo"}>
                  Register your Project
                </Text>
              </Button>
            </VStack>
          </VStack>
        </VStack>
      </Container>
    </Flex>
  );
};
