import {
  VStack,
  Container,
  HStack,
  Text,
  Heading,
  Drawer,
  DrawerOverlay,
  DrawerContent,
  DrawerCloseButton,
  IconButton,
  Icon,
  List,
  ListItem,
  Link,
  Accordion,
  AccordionButton,
  AccordionIcon,
  AccordionItem,
  Image,
  AccordionPanel,
  UnorderedList,
  OrderedList,
} from "@chakra-ui/react";
import { MagikButton } from "@qfi/ui";
import { HiQrcode, HiCollection, HiExternalLink } from "react-icons/hi";
import { MdDashboard } from "react-icons/md";
import { ColorModeSwitcher } from "../ColorModeSwitcher";
import ethCard from "../assets/ethCard.png"
import maciCard from "../assets/maciCard.png"

import { useTranslation, Trans } from 'react-i18next';

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
      }}>
      <VStack mt={20} spacing={10} h="full" alignItems="flex-start" fontSize={"xs"}>
        <VStack spacing={6} alignItems="flex-start">
          <Heading size="4xl">{t("Voter Guide")}</Heading>
          <Text>
            {t("As an ETHLatam participant, you can play an important role in both supporting the local community, and exploring new ways of funding public goods through secure quadratic voting. The future is now!")}
          </Text>
          <Text>
            {t("Below you will find instructions to help support local projects through a Quadratic Funding (QF) round taking place only at ETHLatam. In order to vote, you will need access to a Gnosis Chain/Ethereum wallet and will receive the MACI private key by email.")}
          </Text>
          <Text>
            {t("Learn more about QF")}{" "}
            <Link href="https://wtfisqf.com/" isExternal>
              <Icon as={HiExternalLink} boxSize={4} color="gray.500" />
            </Link>
          </Text>
        </VStack>
        <VStack spacing={6} alignItems="flex-start">
          <Heading size="xl">{t("How it works?")}</Heading>
          <Text>
            {t("All event ticket holders will receive a MACI key used to vote via email. Casting a Ballot requires you to have a Gnosis Chain/Etherum wallet with some MATIC to pay for the transaction gas and a valid ballot key. Voting is pseudonymous because to submit your Ballot you will need the MACI private key sent by the ETHLatam team to your signup email address.")}
          </Text>
        </VStack>
        <VStack spacing={6} alignItems="flex-start">
          <Heading size="xl">{t("Registration")}</Heading>

          <Accordion allowToggle>
            <UnorderedList>
              <ListItem>
                <AccordionItem border="none">
                  <VStack>
                    <Text px={0} textAlign={"left"} as={AccordionButton} fontSize="md">
                      {t("Get your unique MACI key")}
                      <AccordionIcon></AccordionIcon>
                    </Text>
                  </VStack>
                  <AccordionPanel pb={4}>
                    <VStack spacing={6} alignItems="flex-start">
                      <Text fontSize="xs">{t("ETHLatam team will email you with the MACI private key to your signup email. If this email is inaccessible, get in touch with the team in-person at the event if you are experiencing difficulties with getting your MACI private key for casting your ballot.")}</Text>
                    </VStack>
                  </AccordionPanel>
                </AccordionItem>
              </ListItem>
              <ListItem>
                <AccordionItem border="none">
                  <VStack>
                    <Text px={0} textAlign={"left"} as={AccordionButton} fontSize="md">
                      {t("Connect your wallet")}
                      <AccordionIcon></AccordionIcon>
                    </Text>
                  </VStack>
                  <AccordionPanel pb={4}>
                    <VStack spacing={6} alignItems="flex-start">
                      <Text fontSize="xs">{t("Just tap the “Connect” button within the page and follow the instructions to connect the wallet that you have used to buy your ticket (both MetaMask and Wallet Connect are available). Switch network to Gnosis Chain Chain (the one you used to buy the ticket). There are instructions for MetaMask")} <Link href='https://metamask.zendesk.com/hc/en-us/articles/360052711572-How-to-connect-to-the-Gnosis Chain-Chain-network-formerly-Gnosis Chain' isExternal>
                        <Icon as={HiExternalLink} boxSize={4} color="gray.500" />
                      </Link> {t("or you can use Chainlist")}
                        <Link href='https://chainlist.org/' isExternal>
                          <Icon as={HiExternalLink} boxSize={4} color="gray.500" />
                        </Link> {t("to automatically add Gnosis Chain Chain in many Web3 wallets. Always use caution when connecting to new networks!")}</Text>
                      <Text fontSize="xs">{t("Once your wallet is connected, enter your MACI key in the field below it and tap “Save”. You are now successfully registered to vote in the QF Round")}</Text>
                    </VStack>
                  </AccordionPanel>
                </AccordionItem>
              </ListItem>
            </UnorderedList>
          </Accordion>
          {/* <Accordion allowToggle>
            <AccordionItem border="none">
              <VStack>
                <Text px={0} textAlign={"left"} as={AccordionButton} fontSize="md">
                  Using Status
                  <AccordionIcon></AccordionIcon>
                </Text>
              </VStack>
              <AccordionPanel pb={4}>
                <VStack spacing={6} alignItems="flex-start">
                  <Heading size="xs">Add your wallet</Heading>
                  <Text fontSize="xs" >
                    In the wallet tab, tap “Add Account”. Now either:
                    <OrderedList>
                      <ListItem>Select “Enter a seed phrase” and enter the 12 word mnemonic from your card, or</ListItem>
                      <ListItem>Select “Enter a private key”, open your camera or QR reader and scan the QR code, which will copy the private key to your clipboard, and then paste into the “Private key” field in the Status app.</ListItem>
                    </OrderedList>
                  </Text>
                  <Heading size="xs">Change network</Heading>
                  <Text fontSize="xs" >
                    In your profile, go to Advanced =`{'>'}` Network and change to Gnosis Chain Chain. You will need to restart the app for the network change to take effect.
                  </Text>
                  <Heading size="xs">Set up your ballot</Heading>
                  <Text fontSize="xs" >
                    In the Status browser, tap the colored icon at the bottom center of the screen to connect the account you just added. Go to qf.ethbarcelona.com/#/begin. Hit “Connect” and authorize the app to access your address. Scan the QR to add your MACI key and hit “Save” - and you are all set! Go forth and vote.
                  </Text>
                  <Text fontSize="xs" >
                    You can get the Status app here
                    <Link href='https://status.im/get/' isExternal>
                      <Icon as={HiExternalLink} boxSize={4} color="gray.500" />
                    </Link>
                  </Text>
                </VStack>
              </AccordionPanel>
            </AccordionItem>
          </Accordion> */}
          {/* <Accordion allowToggle>
            <AccordionItem border="none">
              <VStack>
                <Text px={0} textAlign={"left"} as={AccordionButton} fontSize="md">
                  Using browser + WalletConnect
                  <AccordionIcon></AccordionIcon>
                </Text>
              </VStack>
              <AccordionPanel pb={4}>
                <VStack spacing={6} alignItems="flex-start">
                  <Heading size="xs">Add your wallet</Heading>
                  <Text fontSize="xs" >
                    In your wallet app:
                    <OrderedList>
                      <ListItem>Switch network to Gnosis Chain Chain. There are instructions for MetaMask <Link href='https://metamask.zendesk.com/hc/en-us/articles/360052711572-How-to-connect-to-the-Gnosis Chain-Chain-network-formerly-Gnosis Chain' isExternal>
                        <Icon as={HiExternalLink} boxSize={4} color="gray.500" />
                      </Link> or you can use Chainlist
                        <Link href='https://chainlist.wtf/' isExternal>
                          <Icon as={HiExternalLink} boxSize={4} color="gray.500" />
                        </Link> to automatically add Gnosis Chain Chain in many Web3 wallets. Always use caution when connecting to new networks!</ListItem>
                      <ListItem>Create a new account using the Gnosis Chain mnemonic or private key QR from your card.</ListItem>
                    </OrderedList>
                  </Text>
                  <Text fontSize="xs" >
                    Choose your favorite browser and navigate to
                    <Link href='https://qf.ethbarcelona.com/#/begin'> qf.ethbarcelona.com/#/begin</Link>
                  </Text>
                  <Text fontSize="xs" >
                    Hit “Connect” and follow the instructions to connect your wallet of choice. Once your wallet is connected, enter your MACI key and hit “Save”.
                  </Text>
                </VStack>
              </AccordionPanel>
            </AccordionItem>
          </Accordion> */}
        </VStack>
        <VStack spacing={6} alignItems="flex-start">
          <Heading size="xl">{t("Vote")}</Heading>
          <Text >
            <Accordion allowToggle>
              <UnorderedList>
                <ListItem>
                  <AccordionItem border="none">
                    <VStack>
                      <Text px={0} textAlign={"left"} as={AccordionButton} fontSize="md">
                        {t("Get to know the Recipients")}
                        <AccordionIcon></AccordionIcon>
                      </Text>
                    </VStack>
                    <AccordionPanel pb={4}>
                      <VStack spacing={6} alignItems="flex-start">
                        <Text fontSize="xs" >
                          {t("Projects from the local web3 Barcelona and greater Catalunya community, non-web3 social causes, and global impact DAOs are eligible to receive funding. Within the ‘Project Directory’ page of the website you can learn more about them by visiting their external references or social media!")}
                        </Text>
                        <Text fontSize="xs" >
                          {t("If you want to vote for the project on your Ballot then tap the blue button with the vote icon on the project page, a pop-up should confirm that it has been added to your Ballot. See all the projects and pick the ones you wish to support.")}
                        </Text>
                        <Text fontSize="xs" >
                          {t("These projects will not be presented during the event, it is up to you to read and choose carefully where to spend your voting power! You can include up to 8 projects on your ballot, or less, as you prefer. If you change your ideas, you could use your MACI private key to re-submit your votes before the voting period ends.")}
                        </Text>
                      </VStack>
                    </AccordionPanel>
                  </AccordionItem>
                </ListItem>
                <ListItem>
                  <AccordionItem border="none">
                    <VStack>
                      <Text px={0} textAlign={"left"} as={AccordionButton} fontSize="md">
                        {t("Pick your priorities")}
                        <AccordionIcon></AccordionIcon>
                      </Text>
                    </VStack>
                    <AccordionPanel pb={4}>
                      <VStack spacing={6} alignItems="flex-start">
                        <Text fontSize="xs" >
                          {t("Return to ‘your Ballot’ using the navigation menu on the left hand side of the screen (symbol with 4 squares) to see the projects you selected before. On this screen you can add your voting power (i.e., Voice Credits) to each project in your ballot. Each time you click the button it will add another credit to your project.")}
                        </Text>
                        <Text fontSize="xs" >
                          {t("You can distribute your voice credits quadratically: voting for a project will cost the square of the number of votes you want to cast. For example, if you want to cast 1 vote for Project A, it will cost you 1 voice credit; 2 votes cost 4 credits; 5 votes cost 25 credits and so on.")}
                        </Text>
                      </VStack>
                    </AccordionPanel>
                  </AccordionItem>
                </ListItem>
                <ListItem>
                  <AccordionItem border="none">
                    <VStack>
                      <Text px={0} textAlign={"left"} as={AccordionButton} fontSize="md">
                        {t("Submit your ballot")}
                        <AccordionIcon></AccordionIcon>
                      </Text>
                    </VStack>
                    <AccordionPanel pb={4}>
                      <VStack spacing={6} alignItems="flex-start">
                        <Text fontSize="xs" >
                          {t("Once you are happy with your votes, submit your ballot by tapping on the submit button on the website. You will get a transaction confirmation prompt within your wallet, and sign the transaction to send it via the Gnosis Chain network.")}
                        </Text>
                        <Text fontSize="xs" >
                          {t("The ballot will be tallied at the end of the voting period, and the prize pool will be distributed between all the projects based on the number of votes received during the event (via QF).")}
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
          justifyContent="flex-start">
          <DrawerCloseButton zIndex={999} onClick={onClose} />
          <Guide />
        </DrawerContent>
      </DrawerOverlay>
    </Drawer>
  );
};
