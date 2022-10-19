import {
  VStack,
  Container,
  Text,
  Heading,
  Drawer,
  DrawerOverlay,
  DrawerContent,
  DrawerCloseButton,
  ListItem,
  Accordion,
  AccordionButton,
  AccordionIcon,
  AccordionItem,
  AccordionPanel,
  UnorderedList,
} from "@chakra-ui/react";

import { useTranslation, Trans } from "react-i18next";

const Guide = () => {
  const { t } = useTranslation();

  return (
    <Container
      h="full"
      w="full"
      overflowY={"scroll"}
      right="-24px"
      top={0}
      left={0}
      position="absolute"
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
      <VStack
        mt={20}
        spacing={10}
        h="full"
        alignItems="flex-start"
        fontSize={"xs"}
      >
        <VStack spacing={6} alignItems="flex-start">
          <Heading size="4xl">{t("Voter Guide")}</Heading>
        </VStack>
        <VStack spacing={6} alignItems="flex-start">
          <Heading size="xl">{t("Ballot Passphrase (MACI)")}</Heading>
        </VStack>
        <VStack spacing={6} alignItems="flex-start">
          <Heading size="lg">{t("What is the MACI key?")}</Heading>
          <Text>
            {t(
              "The MACI (Minimum Anti-Collision Infrastructure) uses zero-knowledge proofs as a protection against censorship and collisions in blockchain voting (read more about MACI on this page)."
            )}
          </Text>
          <Text>
            {t(
              "Each voter gets a pseudo-random MACI key, which is used to encrypt and validate your votes. This is the only way to vote in the round, and it can be used to change your vote at any time while the round is active, so keep it safe and don't share it."
            )}
          </Text>
          <Text fontWeight={"bold"}>
            {t("'Not your MACI, not your vote'.")}
          </Text>
          <Text>
            {t(
              "Keep it safe! Anyone who logs in with your MACI key will be able to vote on your behalf - and even invalidate your previous votes. Thanks to your vote, community projects can access funds to continue building.  Your vote matters, make it count."
            )}
          </Text>
          <Heading size="md" fontWeight={"bold"}>
            {t("We know this might be confusing, need help?")}
          </Heading>
          <Text>
            {t("Drop us a line at sponsors@ETHCommunity.org or join the")}{" "}
            <a href={"https://t.me/ETHCommunity"} rel="noreferrer" target="_blank">
              {t("ETHCommunity Telegram group")}
            </a>{" "}
            {t("using the hashtag #QF in your post.")}
          </Text>
        </VStack>

        <VStack spacing={6} alignItems="flex-start">
          <Heading size="lg">{t("Registration")}</Heading>
          <Accordion allowToggle>
            <UnorderedList>
              <ListItem>
                <AccordionItem border="none">
                  <VStack>
                    <Text
                      px={0}
                      textAlign={"left"}
                      as={AccordionButton}
                      fontSize="md"
                    >
                      {t("Step 1: Get your unique MACI key")}
                      <AccordionIcon></AccordionIcon>
                    </Text>
                  </VStack>
                  <AccordionPanel pb={4}>
                    <VStack spacing={6} alignItems="flex-start">
                      <Text fontSize="xs">
                        {t(
                          "ETHCommunity team will send your MACI key the email address you used to register for the event."
                        )}
                      </Text>
                    </VStack>
                  </AccordionPanel>
                </AccordionItem>
              </ListItem>
              <ListItem>
                <AccordionItem border="none">
                  <VStack>
                    <Text
                      px={0}
                      textAlign={"left"}
                      as={AccordionButton}
                      fontSize="md"
                    >
                      {t("Step 2: Connect your wallet and enter your MACI key")}
                      <AccordionIcon></AccordionIcon>
                    </Text>
                  </VStack>
                  <AccordionPanel pb={4}>
                    <VStack spacing={6} alignItems="flex-start">
                      <Text fontSize="xs">
                        <UnorderedList>
                          <ListItem mb={4}>
                            {t(
                              "Click on ‘START’ and it’ll direct you to the voting website."
                            )}
                          </ListItem>
                          <ListItem mb={4}>
                            {t(
                              "Tap 'Connect' and follow the instructions to successfully connect your Wallet, (WalletConnect is also available)."
                            )}
                          </ListItem>
                          <ListItem>
                            {t(
                              "Once your wallet is connected, enter your MACI key in the field below and press 'Save'."
                            )}
                          </ListItem>
                        </UnorderedList>
                      </Text>
                    </VStack>
                  </AccordionPanel>
                </AccordionItem>
              </ListItem>
            </UnorderedList>
          </Accordion>
          <Text fontWeight="bold" fontSize="14">
            {t("Congratulations! You have just successfully registered.")}
          </Text>
        </VStack>
        <VStack spacing={6} alignItems="flex-start">
          <Heading size="lg">{t("Vote")}</Heading>
          <Text>
            <Accordion allowToggle>
              <UnorderedList>
                <ListItem>
                  <AccordionItem border="none">
                    <VStack>
                      <Text
                        px={0}
                        textAlign={"left"}
                        as={AccordionButton}
                        fontSize="md"
                      >
                        {t("Meet the projects")}
                        <AccordionIcon></AccordionIcon>
                      </Text>
                    </VStack>
                    <AccordionPanel pb={4}>
                      <VStack spacing={6} alignItems="flex-start">
                        <Text fontSize="xs">
                          {t(
                            "You can choose up to 8 projects to vote for, or fewer, as you prefer. With your MACI password you can change your vote before voting closes."
                          )}
                        </Text>
                      </VStack>
                    </AccordionPanel>
                  </AccordionItem>
                </ListItem>
                <ListItem>
                  <AccordionItem border="none">
                    <VStack>
                      <Text
                        px={0}
                        textAlign={"left"}
                        as={AccordionButton}
                        fontSize="md"
                      >
                        {t("Define your priorities")}
                        <AccordionIcon></AccordionIcon>
                      </Text>
                    </VStack>
                    <AccordionPanel pb={4}>
                      <VStack spacing={6} alignItems="flex-start">
                        <Text fontSize="xs">
                          <Trans i18nKey="Go back to 'Your vote' using the navigation menu on the left of the screen (the 4 squares symbol) and you will see the projects you’ve selected. On this screen, you’ll be able to add voice credits to each selected project. Each time you click the button, a credit will be added to your selected project." />
                        </Text>
                        <Text fontSize="xs">
                          <Trans i18nKey="You can distribute your voice credits between the projects as you see fit, but voice credits and votes are not 1:1." />
                        </Text>
                        <Text fontSize="xs">
                          <Trans i18nKey="This is where the 'quadratic' part comes into play: voting on a project will cost the square of the number of votes you want to cast." />
                        </Text>
                        <Text fontSize="xs">
                          <Trans i18nKey="For example, if you want to cast 1 vote for project A, it will cost you 1 voice credit; 2 votes will cost 4 credits; 5 votes will cost 25 credits, and so on." />
                        </Text>
                        <Text fontSize="xs">
                          <Trans i18nKey="Everyone will start with 99 <strong>voice credits</strong>." />{" "}
                          <Trans i18nKey="These credits will be used to cast votes for projects you have selected to support." />{" "}
                          <Trans i18nKey="You can add up to <strong>8 projects</strong> to your ballot, and distribute your voice credits among them. Choose wisely." />
                        </Text>
                        <Text fontSize="xs">
                          <Trans i18nKey="Casting a vote on a project will <strong>cost you the square of the number of votes you want to cast</strong> in voice credits. For example, if you want to cast 5 votes for project A, it will cost you 25 voice credits." />
                        </Text>
                        <Text fontSize="xs">
                          <Trans i18nKey="You <strong>cannot use more voice credits than you have allotted</strong>. Since each voter starts with 99 voice credits, a vote of 10 (which costs 100 voice credits) is more than any one voter can afford. This means that at most, a voter can give 9 votes to a single project - at a cost of 81 voice credits - and will have 18 voice credits left to vote for other projects." />
                        </Text>
                      </VStack>
                    </AccordionPanel>
                  </AccordionItem>
                </ListItem>
                <ListItem>
                  <AccordionItem border="none">
                    <VStack>
                      <Text
                        px={0}
                        textAlign={"left"}
                        as={AccordionButton}
                        fontSize="md"
                      >
                        {t("Register your vote")}
                        <AccordionIcon></AccordionIcon>
                      </Text>
                    </VStack>
                    <AccordionPanel pb={4}>
                      <VStack spacing={6} alignItems="flex-start">
                        <Text fontSize="xs">
                          {t(
                            "Once you’re satisfied with your votes, register them by pressing the 'Submit' button on the website."
                          )}
                        </Text>
                        <Text fontSize="xs">
                          {t(
                            "Then, you’ll receive a transaction confirmation request in your wallet, accept it."
                          )}
                        </Text>
                        <Text fontSize="xs">
                          {t(
                            "Remember that as long as voting is open, anyone who has your MACI password can register a new vote and invalidate the previous one."
                          )}
                        </Text>
                        <Text fontSize="xs">
                          {t(
                            "You can register multiple votes during the voting period. Only your last recorded vote will be considered in the vote count."
                          )}
                        </Text>
                        <Text fontSize="xs">
                          {t(
                            "The vote count will be given at the end of the voting period, and the prizes will be distributed among the projects based on the number of votes received during the event (via quadratic funding)."
                          )}
                        </Text>
                      </VStack>
                    </AccordionPanel>
                  </AccordionItem>
                </ListItem>
              </UnorderedList>
            </Accordion>
          </Text>
        </VStack>
      </VStack>
    </Container>
  );
};
type GuideDrawerProps = {
  isOpen: boolean;
  onClose: () => void;
};
export const GuideDrawer = ({ isOpen, onClose }: GuideDrawerProps) => {
  return (
    <Drawer isOpen={isOpen} placement="right" onClose={onClose}>
      <DrawerOverlay>
        <DrawerContent
          pt={8}
          h="full"
          maxW={{ sm: "sm", md: "md" }}
          w="full"
          position={"relative"}
          overflow={"hidden"}
          justifyContent="flex-start"
        >
          <DrawerCloseButton zIndex={999} onClick={onClose} />
          <Guide />
        </DrawerContent>
      </DrawerOverlay>
    </Drawer>
  );
};

