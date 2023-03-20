import React from "react";
import {
  VStack,
  Container,
  Flex,
  Text,
  Heading,
  useColorModeValue,
} from "@chakra-ui/react";
import {  useTranslation } from "react-i18next";

export const About = () => {
  const { t } = useTranslation();
  const color = useColorModeValue("gray.800", "gray.700");

  return (
    <Flex
      as="main"
      h="full"
      w="full"
      flex={1}
      borderRightColor={color}
      borderRightWidth={1}
      position={"relative"}
      overflow="hidden">
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
              {t(
                "The ETHPorto Quadratic Funding round is a collaboration between ETHPorto and Transformers in an effort to support the local community and explore new ways to finance public goods through quadratic voting."
              )}
            </Text>
            <Text pb={4} w={"full"}>
              {t(
                "During ETHPorto, our team will send you an email with a 'MACI key'. This is your private ballot passphrase you’ll use to submit your votes. Think of it like a password."
              )}
            </Text>
            <Text pb={4} w={"full"}>
              {t("You can learn more about Quadratic Funding")}{" "}
              <a href={"https://www.figma.com/proto/3oKhn9cHRzKiJ7bSLzWvsi/Tour?node-id=212-9366&scaling=scale-down-width&page-id=0%3A1&starting-point-node-id=212%3A9366"} rel="noreferrer" target="_blank">
                {t("here")}
              </a>
              .
            </Text>
            <Text pb={4} w={"full"}>
              {t("The future is now! We hope you participate in this round and help us fund the projects that matter to you!")}
            </Text>
            <Heading size="2xl" style={{ marginBottom: 32 }}>
              {t("About Transformers")}
            </Heading>
            <Text pb={4}>
              {t(
                "Movimento Transformers was born in 2010, when a breakdance group discovered that they could use what they loved (breakdance) to make a difference in their community, leading informal workshops and classes for children and youth deeply at risk of social exclusion."
              )}
            </Text>
            <Text pb={4} w={"full"}>
              {t(
                "The Movimento Transformers emerged to massively increase civic and social involvement, in Portugal and in the World. Our mission is to increase the involvement of people in their communities through what they love to do. To turn this into reality we have three axes of intervention:"
              )}
            </Text>
            <Text pb={4} w={"full"}>
              {t(
                "Volunteer - Which materializes in our project Schools of Superpowers (SPS) and Reformers. The Superpower Schools (SPS) project works weekly with 600 children and young people at risk by promoting their social awareness, talents and ensuring they are more active and participative citizens. It is with this project that this collaboration with ETF comes to life - our core value in the SPS project is Payback, which means giving back to the community. I transform you so you can transform society around you. Payback actions are implemented by our apprentices and their volunteer mentor to solve a social problem they identify within their communities. Here you will be able to vote on some of the incredible ideas our groups have come up with this year."
              )}
            </Text>
            <Text pb={4} w={"full"}>
              {t(
                "Associativism - Through two capacity projects, one focusing on secondary school association leaders (AELEAD) and the other on youth association leaders or community leaders (XLEAD)."
              )}
            </Text>
            <Text pb={4} w={"full"}>
              {t(
                "Awareness - Through T-Academy, an online community for civic and social participation, which emerges towards the democratization of knowledge and where content and training opportunities are shared in the areas of volunteering, participation, creativity, non-formal education, activism, sustainable development goals, associationism and much more! B2C model, where people pay to access the community."
              )}
            </Text>
            <Text pb={4} w={"full"}>
              {t(
                "We also have a continuous growing portfolio of tailor-made training and bootcamps, aimed at young people, youth associations, informal movements, activists."
              )}
            </Text>
            <Text pb={4} w={"full"}>
              {t("You can learn more about Transformers")}{" "}
              <a href={"https://www.movimentotransformers.org/"} rel="noreferrer" target="_blank">
                {t("here")}
              </a>
              .
            </Text>
            <Heading size="2xl" style={{ marginBottom: 32 }}>
              {t("About ETHPorto")}
            </Heading>
            <Text pb={4} w={"full"}>
              {t(
                "ETHPorto is an independently organized event with a Conference, workshops and a 48-hour Hackathon running in parallel. Bringing the first ETH event to the beautiful city of Porto!"
              )}
            </Text>
            <Text pb={4} w={"full"}>
              {t("You can learn more about ETHPorto")}{" "}
              <a href="https://ethporto.org/" rel="noreferrer" target="_blank">
                {t("here")}
              </a>
              .
            </Text>
          </VStack>
        </VStack>
      </Container>
    </Flex>
  );
};
