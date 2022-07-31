import React from "react";
import {
  VStack,
  Tooltip,
  Text,
  UnorderedList,
  ListItem,
  Accordion,
  AccordionButton,
  AccordionIcon,
  AccordionItem,
  AccordionPanel,
} from "@chakra-ui/react";

import { useTranslation, Trans } from "react-i18next";

export const BallotExplainer = () => {
  const { t } = useTranslation();

  return (
    <Accordion allowToggle mt={8}>
      <AccordionItem border="none">
        <VStack>
          <Text px={0} textAlign="justify" as={AccordionButton}>
            <Trans i18nKey="On this screen you can add votes to each project in your ballot. Each time you click the button it will add another vote to your project. Feel free to experiment with the votes you want to give, then you submit once you are happy with the ballot!" />
            <AccordionIcon></AccordionIcon>
          </Text>
        </VStack>
        <AccordionPanel pb={4}>
          <UnorderedList marginInlineStart="1rem !important" w="full">
            <ListItem>
              <Trans i18nKey="This page will be updated once the event starts to let you vote for projects you meet at the event." />
            </ListItem>
            <ListItem>
              <Trans i18nKey="When a voter is whitelisted they receive a" />{" "}
              <Tooltip label="pseudo-randomly assigned" placement="top">
                <strong>{t("MACI passphrase")}</strong>
              </Tooltip>{" "}
              {t("and voice credits.")}
            </ListItem>
            <ListItem>
              <Trans i18nKey="Everyone will begin with 99 <strong>voice credits</strong>" />
            </ListItem>
            <ListItem>
              <Trans i18nKey="These <strong>voice credits</strong> are used to cast <strong>votes</strong> for projects on your ballot" />
            </ListItem>
            <ListItem>
              <Trans i18nKey="You can add up to <strong>8 projects</strong> to your ballot and distribute your voice credits between them. Choose wisely." />
            </ListItem>

            <ListItem>
              <Trans i18nKey="Casting a vote for a project will <strong>cost the square of the number of votes you want to cast</strong> in voice credits. For example, if you would like to cast 5 votes for Project A, that will cost 25 voice credits." />
            </ListItem>
            <ListItem>
              <Trans i18nKey="You <strong>cannot use more voice credits than you have</strong>. Since each voter starts with 99 voice credits, a vote of 10 (which would cost 100 voice credits) is more than any voter can afford to pay. This means that at most, a single voter can give 9 votes to a single project - at a cost of 81 voice credits - and have 18 voice credits left to vote for other projects." />
            </ListItem>
            <ListItem>
              <Trans i18nKey="You <strong>can submit many ballots</strong> during the voting period." />
            </ListItem>

            <ListItem>
              <Trans i18nKey="Only the <strong>final submitted ballot will be counted</strong> toward the final tally. Trust no one." />
            </ListItem>
            <ListItem>
              <Trans i18nKey="The ballot will be tallied at the end of the voting period, and the<strong>prize pool will be distributed between all the projects</strong> based on the number of votesreceived during the event (via quadratic funding)." />
            </ListItem>
          </UnorderedList>
        </AccordionPanel>
      </AccordionItem>
    </Accordion>
  );
};
