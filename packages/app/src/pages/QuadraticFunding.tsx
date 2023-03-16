import React from "react";
import {
  ListItem,
  OrderedList,
  UnorderedList,
  VStack,
  Container,
  Flex,
  Text,
  Heading,
  useColorModeValue,
} from "@chakra-ui/react";
import {  useTranslation } from "react-i18next";

export const QuadraticFunding = () => {
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
            {t("What is Quadratic Funding?")}
          </Heading>
            <Text pb={4}>
              {t(
                "Quadratic funding is a crowdfunding mechanism that aims to distribute funds in a way that is more fair and inclusive than traditional crowdfunding. It works by matching small individual contributions with matching funds from a larger pool, using a quadratic formula."
              )}
            </Text>
            <Text pb={4} w={"full"}>
              {t(
                "In a quadratic funding campaign, donors are incentivized to contribute small amounts of money to a project or cause that they support. The matching funds are then distributed to the projects that receive the most support from the largest number of people. This helps to ensure that smaller, grassroots projects can receive funding and support, even if they don't have access to large donors or corporate sponsors."
              )}
            </Text>
            <Text pb={4} w={"full"}>
              {t("The quadratic formula used in this type of funding means that the matching funds increase exponentially with the number of individual contributors, which helps to amplify the impact of smaller donations and create a more equitable distribution of funds. This makes it possible for projects with a large number of small supporters to receive more funding than projects with just a few large supporters, which helps to level the playing field for smaller and less well-funded initiatives.")}
            </Text>
            <Text pb={4} w={"full"}>
              {t("Quadratic funding is made up of:")}
            </Text>
              <OrderedList>
                <ListItem >
                  <Text pb={4} w={"full"}>
                    {t("a pool of funds to be distributed")}
                  </Text>
                </ListItem>
                <ListItem>
                  <Text pb={4} w={"full"}>
                    {t("a voting system for distributing those funds")}
                  </Text>
                </ListItem>
              </OrderedList>
            <Text pb={4} w={"full"}>
              {t("Two common voting systems you may have used are 1-person-1-vote and 1-dollar-1-vote. Quadratic funding is a best-of-both-worlds solution where users vote with the square root of the money they spend — read on to learn more.")}
            </Text>
            <Heading size="2xl" style={{ marginBottom: 32 }}>
              {t("Problems with Existing Funding Mechanisms")}
            </Heading>
            <Text pb={4}>
              {t("The common fund-distribution systems of today all have pluses and minuses:")}
            </Text>
            <Heading size="xl" style={{ marginBottom: 32 }}>
              {t("Markets")}
            </Heading>
            <Text pb={4} w={"full"}>
              {t("Markets can be thought of as fund-distributors: sellers are the fund recipients, and buyers are the voters deciding what will be funded. In this case, the 'voting system' is 1-dollar-1-vote: each buyer has exactly as much potential influence over where funds go as they have money to spend. This is also the case for traditional crowdfunding platforms like Kickstarter.")}
            </Text>
            <Text pb={4} w={"full"}>
              {t("An advantage of this system is that each voter's influence is directly proportional to their need (at least, if we ignore wealth inequality). The more Alice needs pizza, the more pizza she'll buy, and the more funding will go to pizzerias.")}
            </Text>
            <Text pb={4} w={"full"}>
              {t("The disadvantage is that rich voters have an outsize influence on what gets funded. Alice may need pizza exactly as much as Bob needs movie tickets, but if Bob is twice as wealthy as Alice, he has twice as many 'votes' to spend on going to the movies.")}
            </Text>
            <Heading size="xl" style={{ marginBottom: 32 }}>
              {t("Private Grant-Givers")}
            </Heading>
            <Text pb={4} w={"full"}>
              {t("Privately-owned grant-giving institutions, like non-profit foundations, are quite common, but they don't have voting systems. Instead, grants committees and the like solicit grant proposals and then choose which applicants will receive funding internally.")}
            </Text>
            <Text pb={4} w={"full"}>
              {t("An advantage of non-profits is that their non-profit status binds them to **act in the interest of some public mission**, rather than seeking profit above all.")}
            </Text>
            <Text pb={4} w={"full"}>
              {t("On the other hand, the small, private interests that control these organizations lack the tools and incentives to effectively serve large publics.")}
            </Text>
            <Heading size="xl" style={{ marginBottom: 32 }}>
              {t("Democratic Governments")}
            </Heading>
            <Text pb={4} w={"full"}>
              {t("Government grants are another common fund-distribution mechanism, and in democracies, these are usually controlled by voting citizens using 1-person-1-vote policies (with elected representatives and other middlemen in between).")}
            </Text>
            <Text pb={4} w={"full"}>
              {t("On the good side, these systems are much less oligarchical than markets—if we ignore the ability to convert money into influence via the media, among other complications.")}
            </Text>
            <Text pb={4} w={"full"}>
              {t("In exchange for less oligarchy, though, influence also poorly reflects need in 1-person-1-vote systems. A half-time Florida resident has the same voting power in Florida elections as a full-time resident, as long as both qualify to vote, even though the full-time resident may have twice as much riding on the result.")}
            </Text>
            
            <Heading size="2xl" style={{ marginBottom: 32 }}>
              {t("Quadratic Funding: a better balance?")}
            </Heading>
            <Text pb={4} w={"full"}>
              {t("Quadratic funding is a compromise between 1-dollar-1-vote and 1-person-1-vote. Participants vote on how to distribute pooled funds by making individual donations, but each person's influence, rather than being the amount of money they spend, is the square root of that amount.")}
            </Text>
            <Text pb={4} w={"full"}>
              {t("Compared to 1-dollar-1-vote in the market, quadratic funding makes it exponentially easier for the influence of many poorer people to outweigh that of a single rich person:")}
            </Text>
            <UnorderedList>
              <ListItem>
                <Text pb={4} w={"full"}>
                  {t("1-person-1-vote: the two Florida voters have equal influence")}
                </Text>
              </ListItem>
              <ListItem>
                <Text pb={4} w={"full"}>
                  {t("Quadratic funding: the full-time Florida resident, who cares twice as much, pays twice as much, and as a result gets 2^(1/2) times the influence of the half-time resident")}
                </Text>
              </ListItem>
            </UnorderedList>
            <Text pb={4} w={"full"}>
              {t("(It's important to note that while these example are a good demonstration of the argument for quadratic funding, they do over-simplify these situations, which are as sociological as they are mathematical.)")}
            </Text>
            <Heading size="2xl" style={{ marginBottom: 32 }}>
              {t("Quadratic Funding Resources")}
            </Heading>
            <UnorderedList>
              <ListItem>
                <Text pb={4} w={"full"}>
                  <a href={"https://vitalik.ca/general/2019/12/07/quadratic.html"} rel="noreferrer" target="_blank">
                    {t("Quadratic Payments: A Primer")}
                  </a>
                </Text>
              </ListItem>
              <ListItem>
                <Text pb={4} w={"full"}>
                  <a href={"https://papers.ssrn.com/sol3/papers.cfm?abstract_id=3243656"} rel="noreferrer" target="_blank">
                    {t("Liberal Radicalism: A Flexible Design For Philanthropic Matching Funds")}
                  </a>
                </Text>
              </ListItem>
              <ListItem>
                <Text pb={4} w={"full"}>
                  <a href={"https://www.radicalxchange.org/concepts/plural-voting/"} rel="noreferrer" target="_blank">
                    {t("Quadratic Voting")}
                  </a>
                </Text>
              </ListItem>
              <ListItem>
                <Text pb={4} w={"full"}>
                  <a  href={"https://www.figma.com/proto/3oKhn9cHRzKiJ7bSLzWvsi/Quiz?node-id=212-9366&scaling=scale-down&page-id=0%3A1&starting-point-node-id=212%3A9366"} rel="noreferrer" target="_blank">
                    {t("Take the Quadratic Funding Quiz")}
                  </a>
                </Text>
              </ListItem>
            </UnorderedList>
          </VStack>
        </VStack>
      </Container>
    </Flex>
  );
};
