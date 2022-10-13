import React from "react";
import {
  VStack,
  Text,
  UnorderedList,
  ListItem,
  Image,
  Accordion,
  AccordionButton,
  AccordionItem,
  AccordionPanel,
} from "@chakra-ui/react";

import { Trans, useTranslation } from "react-i18next";

export const BallotExplainer = () => {
  const { t } = useTranslation();

  return (
    <Accordion allowToggle mt={8}>
      <AccordionItem border="none">
        {({ isExpanded }) => (
          <>
            <VStack
              p={0}
              flexDirection="row"
              justifyContent="space-between"
              alignItems="start"
              as={AccordionButton}
            >
              <Text w={{ base: "85%", md: "95%" }} textAlign="justify">
                <Trans i18nKey="On this screen you can add votes to each project in your ballot. Each time you click the button it will add another vote to your project. Feel free to experiment with the votes you want to give, then you submit once you are happy with the ballot!" />
              </Text>
              {isExpanded ? (
                <Image src="chevron_up.svg" alt={t("Collapse")} />
              ) : (
                <Image src="chevron_down.svg" alt={t("Expand")} />
              )}
            </VStack>
            <AccordionPanel pb={4}>
              <UnorderedList
                fontFamily="Noto Sans TC"
                marginInlineStart="1rem !important"
                w="full"
              >
                <ListItem>
                  <Trans i18nKey="You can distribute your voice credits between the projects as you see fit, but voice credits and votes are not 1:1." />
                </ListItem>
                <ListItem>
                  <Trans i18nKey="This is where the 'quadratic' part comes into play: voting on a project will cost the square of the number of votes you want to cast." />
                </ListItem>
                <ListItem>
                  <Trans i18nKey="For example, if you want to cast 1 vote for project A, it will cost you 1 voice credit; 2 votes will cost 4 credits; 5 votes will cost 25 credits, and so on." />
                </ListItem>
                <ListItem>
                  <Trans i18nKey="Everyone will start with 99 <strong>voice credits</strong>." />
                </ListItem>
                <ListItem>
                  <Trans i18nKey="These credits will be used to cast votes for projects you have selected to support." />
                </ListItem>
                <ListItem>
                  <Trans i18nKey="You can add up to <strong>8 projects</strong> to your ballot, and distribute your voice credits among them. Choose wisely." />
                </ListItem>
                <ListItem>
                  <Trans i18nKey="You <strong>cannot use more voice credits than you have allotted</strong>. Since each voter starts with 99 voice credits, a vote of 10 (which costs 100 voice credits) is more than any one voter can afford. This means that at most, a voter can give 9 votes to a single project - at a cost of 81 voice credits - and will have 18 voice credits left to vote for other projects." />
                </ListItem>
              </UnorderedList>
            </AccordionPanel>
          </>
        )}
      </AccordionItem>
    </Accordion>
  );
};
