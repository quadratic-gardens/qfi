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

const Guide = () => {
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
        <Heading size="4xl">Voter Guide</Heading>
          <Text>
            As an ETHBarcelona participant, you can play an important role in both supporting the local community, and
            exploring new ways of funding public goods through secure quadratic voting. The future is now.
          </Text>
          <Text>
            Below you will find instructions to help support local projects through a Quadratic Funding (QF) round
            taking place only at ETHBarcelona. You will need access to your polygon wallet with the NFT ticket to vote,
            some MATIC to transmit the transaction (a few cents worth will be airdropped to you), and the MACI key that
            will be sent to your email address.
          </Text>
          <Text>
            Learn more about QF{" "}
            <Link href="https://wtfisqf.com/" isExternal>
              <Icon as={HiExternalLink} boxSize={4} color="gray.500" />
            </Link>
          </Text>
        </VStack>
        <VStack spacing={6} alignItems="flex-start">
          <Heading size="xl">How it works?</Heading>
          <Text>
            All wallets that hold a redeemed NFT ticket are able to cast a Ballot for which project should get the
            funding. Casting a Ballot requires you to have a Polygon/Etherum wallet with some MATIC to pay for the
            transaction gas (a small amount of MATIC will be airdropped to all NFT ticket holders) and a valid ballot
            key. Voting is pseudonymous, but to submit your Ballot you will be sent your MACI key to your email
            address by the ETHBarcelona team.
          </Text>
          <Text>
            During the event you can ask questions to the team behind this funding process and make have a workaround if
            you are not able to use the MACI key sent to your email. The team will be on stage to briefly present this
            process during the event, if in doubt ask any of the ETHBarcelona volunteers to point you to them if you
            have questions.
          </Text>
          {/* <Accordion allowToggle>
            <AccordionItem border="none">
              <VStack>
                <Text px={0} textAlign={"left"} as={AccordionButton} fontSize="md">
                  How to use the keys
                  <AccordionIcon></AccordionIcon>
                </Text>
              </VStack>
              <AccordionPanel pb={4}>
                <VStack spacing={6} alignItems="flex-start">
                  <Heading size="xs">A wallet ... that is also a ballot</Heading>
                  <Image h="full" w="auto" position="relative" src={ethCard} alt={"Ethereum card"} />
                  <Text fontSize="xs">
                    On the left side of your inventory card is a mnemonic and QR code. These are keys to a Polygon Chain
                    wallet which you will use to build your ballot for the Quadratic Funding round.
                  </Text>
                  <Image h="full" w="auto" position="relative" src={maciCard} alt={"MACI card"} />
                  <Text fontSize="xs">
                    On the other side is your MACI key, a unique identifier that you will use to submit your ballot.
                  </Text>
                  <Text as="u" fontSize="xs">
                    Keep these keys safe! Anyone who gets their hands on your MACI key can vote on your behalf - and
                    even invalidate your previous votes!
                  </Text>
                </VStack>
              </AccordionPanel>
            </AccordionItem>
          </Accordion> */}
        </VStack>
        <VStack spacing={6} alignItems="flex-start">
          <Heading size="xl">Register</Heading>
          <Text >
            Once you have got your keys, it is time to register!
          </Text>
          <Text >
          Step1: Get your unique MACI passphrase**

ETHBarcelona will email you the MACI key to the email you used to register for the event. If this email is inaccessible, get in touch with the team in-person at the event if you are experiencing difficulties with getting your MACI key.          
</Text>
          <Accordion allowToggle>
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
                    In your profile, go to Advanced =`{'>'}` Network and change to Polygon Chain. You will need to restart the app for the network change to take effect.
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
          </Accordion>
          <Accordion allowToggle>
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
                      <ListItem>Switch network to Polygon Chain. There are instructions for MetaMask <Link href='https://metamask.zendesk.com/hc/en-us/articles/360052711572-How-to-connect-to-the-Polygon-Chain-network-formerly-Polygon' isExternal>
                        <Icon as={HiExternalLink} boxSize={4} color="gray.500" />
                      </Link> or you can use Chainlist
                        <Link href='https://chainlist.wtf/' isExternal>
                          <Icon as={HiExternalLink} boxSize={4} color="gray.500" />
                        </Link> to automatically add Polygon Chain in many Web3 wallets. Always use caution when connecting to new networks!</ListItem>
                      <ListItem>Create a new account using the Polygon mnemonic or private key QR from your card.</ListItem>
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
          </Accordion>
        </VStack>
        <VStack spacing={6} alignItems="flex-start">
          <Heading size="xl">Vote</Heading>
          <Text >
            <Accordion allowToggle>
              <UnorderedList>
                <ListItem>
                  <AccordionItem border="none">
                    <VStack>
                      <Text px={0} textAlign={"left"} as={AccordionButton} fontSize="md">
                        Get to know the Recipients
                        <AccordionIcon></AccordionIcon>
                      </Text>
                    </VStack>
                    <AccordionPanel pb={4}>
                      <VStack spacing={6} alignItems="flex-start">
                        <Text fontSize="xs" >
                        Projects from the local web3 community and greater Catalunya, non-web3 social causes, and global impact DAOs will have signed up to receive funding. Within the ‘Project Directory’ page of the website could can learn about them and visit their external websites or social media to know more.  [image of ballot button]
                        </Text>
                        <Text fontSize="xs" >
                          If you want to vote for the project on your Ballot then tap the blue button with the vote icon on the project page, a pop-up should confirm that it has been added to your Ballot. See all the projects and pick the ones you wish to support (up to 8 in total).
                        </Text>
                        <Text fontSize="xs" >
                        These projects will not be presented during the event, it is up to you to read and choose which ones you wish to vote get the funds available by the generous donors. You can include up to 8 projects on your ballot, or less, as you prefer. With your MACI key you can change your vote before the voting closes.
                        </Text>
                      </VStack>
                    </AccordionPanel>
                  </AccordionItem>
                </ListItem>
                <ListItem>
                  <AccordionItem border="none">
                    <VStack>
                      <Text px={0} textAlign={"left"} as={AccordionButton} fontSize="md">
                        Pick your priorities
                        <AccordionIcon></AccordionIcon>
                      </Text>
                    </VStack>
                    <AccordionPanel pb={4}>
                      <VStack spacing={6} alignItems="flex-start">
                        <Text fontSize="xs" >
                        Return to ‘your Ballot’ using the navigation menu on the left hand side of the screen (symbol with 4 squares) and you will see the projects you selected before listed. On this screen you can add voice credits to each project in your ballot. Each time you click the button it will add another credit to your project.
                        </Text>
                        <Text fontSize="xs" >
                        You can distribute your voice credits between them however you like, but voice credits and votes are not 1:1. This is where the ‘quadratic’ part comes in: voting for a project will cost the square of the number of votes you want to cast. For example, if you want to cast 1 vote for Project A, it will cost you 1 voice credit; 2 votes cost 4 credits; 5 votes cost 25 credits and so on.
                        </Text>
                      </VStack>
                    </AccordionPanel>
                  </AccordionItem>
                </ListItem>
                <ListItem>
                  <AccordionItem border="none">
                    <VStack>
                      <Text px={0} textAlign={"left"} as={AccordionButton} fontSize="md">
                        Submit your ballot
                        <AccordionIcon></AccordionIcon>
                      </Text>
                    </VStack>
                    <AccordionPanel pb={4}>
                      <VStack spacing={6} alignItems="flex-start">
                        <Text fontSize="xs" >
                        Once you are happy with your votes, submit your ballot by tapping on the submit button on the website.
                        </Text>
                        <Text fontSize="xs" >
                        You will get a transaction confirmation prompt within your wallet, and sign the transaction to transmit it via the Polygon network.
                        </Text>
                        <Text fontSize="xs" >
                        The ballot will be tallied at the end of the voting period, and the prize pool will be distributed between all the projects based on the number of votes received during the event (via quadratic funding).
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
