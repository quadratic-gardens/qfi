import React, { Suspense, useCallback, useEffect, useState, useMemo } from "react";
import "@fontsource/archivo";
import {
  ChakraProvider,
  VStack,
  Container,
  Stack,
  HStack,
  Flex,
  Image,
  AspectRatio,
  Tooltip,
  IconButton,
  Icon,
  Text,
  Heading,
  Button,
  Drawer,
  DrawerOverlay,
  DrawerContent,
  DrawerCloseButton,
  useDisclosure,
  PinInput,
  PinInputField,
  Divider,
  Box,
  Center,
  UnorderedList,
  ListItem,
  Accordion,
  AccordionButton,
  AccordionIcon,
  AccordionItem,
  AccordionPanel,
} from "@chakra-ui/react";
import { animateText, EaseInBottom, MagikButton, MagikText, theme } from "@qfi/ui";
import { MdDashboard, MdSettings } from "react-icons/md";
import { HiLightningBolt, HiCollection, HiBriefcase, HiQrcode, HiEye, HiArrowLeft } from "react-icons/hi";
import { Link, Outlet, Route, Routes, useParams } from "react-router-dom";
import { ColorModeSwitcher } from "./components/ColorModeSwitcher";
import { Hero, Logo } from "./components/Hero";
import Nav from "./components/Nav";
import hero2 from "./components/assets/logo.png";
import voteIcon from "./components/assets/voteIcon.svg";
type SideNavProps = {
  onSettingsOpen: () => void;
};
const SideNav = ({ onSettingsOpen }: SideNavProps) => {
  return (
    <VStack p={4} justifyContent="space-between" alignItems="center" w="full">
      <VStack>
        <IconButton to="/" as={Link} mb={6} icon={<Logo />} aria-label="Home" />

        <Tooltip label="Home" placement="right">
          <IconButton
            to="/ballot"
            as={Link}
            color="gray.500"
            icon={<Icon as={MdDashboard} boxSize={4} />}
            aria-label="Home"
          />
        </Tooltip>
        <Tooltip label="Projects" placement="right">
          <IconButton
            to="/projects"
            as={Link}
            color="gray.500"
            icon={<Icon as={HiCollection} boxSize={4} />}
            aria-label="Projects"
          />
        </Tooltip>
        {/* <Tooltip label="How it Works" placement="right">
          <IconButton
            to="/howitworks"
            as={Link}
            color="gray.500"
            icon={<Icon as={HiLightningBolt} boxSize={4} />}
            aria-label="How it Works"
          />
        </Tooltip>
        <Tooltip label="Admin" placement="right">
          <IconButton
            to="/admin"
            as={Link}
            color="gray.500"
            icon={<Icon as={HiBriefcase} boxSize={4} />}
            aria-label="Admin"
          />
        </Tooltip> */}
      </VStack>
      <Tooltip label="Settings" placement="right">
        <IconButton
          onClick={onSettingsOpen}
          color="gray.500"
          icon={<Icon as={MdSettings} boxSize={5} />}
          aria-label="Settings"
        />
      </Tooltip>
    </VStack>
  );
};
const Quickstart = () => {
  return (
    <Container h="full" w="full" overflowY={"scroll"} right="-24px" top={0} left={0} position="absolute">
      <VStack mt={20} spacing={10} h="full" alignItems="flex-start">
        <VStack spacing={6} alignItems="flex-start">
          <Heading size="4xl">Voter Quickstart Guide</Heading>
          <Text fontFamily={"archivo"}>
            Today you are playing an important role in ETHPrague, below you will find the instruction to support local
            projects by voting for them and helping them to get access to the funding.
          </Text>
        </VStack>
        <VStack spacing={6} alignItems="flex-start">
          <Heading size="md">A wallet specific made for you.</Heading>
          <Text fontFamily={"archivo"}>
            Find the private key hidden at bottom of your registration card, peel it off and keep it safe. We have just
            drop 10 xDai to that wallet!
          </Text>
          <MagikButton />
        </VStack>
        <VStack spacing={6} alignItems="flex-start">
          <Heading size="md">Get whitelisted.</Heading>
          <Text fontFamily={"archivo"}>
            Find our team in ETHprague in order to get the wallet whitelisted so you can participate the quadratic
            voting
          </Text>
          <IconButton w={36} h={12} color="gray.800" icon={<Icon as={HiQrcode} boxSize={10} />} aria-label="Scan" />
        </VStack>
        <VStack spacing={6} alignItems="flex-start">
          <Heading size="md">Meet Projects</Heading>
          <Text fontFamily={"archivo"}>
            We have line up projects from the local community, find the ones you would like to support by starting scan
            their QR code to add them to your ballot
          </Text>
          <IconButton
            w={36}
            h={12}
            color="gray.800"
            icon={<Icon as={HiCollection} boxSize={10} />}
            aria-label="Ballot"
          />
        </VStack>
        <VStack spacing={6} alignItems="flex-start">
          <Heading size="md">Submit your vote</Heading>
          <Text fontFamily={"archivo"}>
            Once you have filled out your ballot, submit it onchain using your registration card, in order to get your
            vote counted
          </Text>
          <IconButton w={36} h={12} color="gray.800" icon={<Icon as={MdDashboard} boxSize={10} />} aria-label="Vote" />
        </VStack>
        <VStack spacing={4}>
          <HStack justifyContent={"center"} spacing={[1, 2]}>
            <ColorModeSwitcher />
          </HStack>
          <Text fontFamily={"archivo"}> </Text>
        </VStack>
      </VStack>
    </Container>
  );
};
const Settings = () => {
  const [values, setValues] = React.useState(["", "", ""]);

  return (
    <Container h="full" w="full" overflowY={"scroll"} right="-24px" top={0} left={0} position="absolute">
      <VStack mt={20} spacing={10} h="full" alignItems="flex-start">
        <VStack spacing={6} alignItems="flex-start">
          <Heading size="4xl">Account Setup</Heading>
          <Text fontFamily={"archivo"}>
            Casting a Ballot requires you to have a wallet on the xDAI chain to pay for gas as well as valid Ballot
            (MACI) passphrase. Ballot distribution is done as an in-person sybil check that assigns a pseudo random maci
            key to each voter. While at the event, you will be given a passphrase to use to register your ballot. (ID
            and Signature Check required).
          </Text>
        </VStack>
        <VStack spacing={6} alignItems="flex-start">
          <Heading size="md">xDAI Wallet.</Heading>
          <Text fontFamily={"archivo"}>
            You may use the key we provide or any other wallet that you have access to.
          </Text>
          <MagikButton />
        </VStack>
        <VStack spacing={2} alignItems="flex-start">
          <Heading size="md">Ballot (MACI) passphrase</Heading>
          <Text fontFamily={"archivo"}>Keep this safe, it is the only way to vote.</Text>
        </VStack>

        <VStack spacing={1} alignItems="flex-start">
          <HStack maxW={"container.md"}>
            <PinInput defaultValue="macisk." size="xs" type="alphanumeric">
              <PinInputField />
              <PinInputField />
              <PinInputField />
              <PinInputField />
              <PinInputField />
              <PinInputField />
              <PinInputField />
            </PinInput>
          </HStack>
          <HStack maxW={"container.md"}>
            <PinInput mask size="xs" type="alphanumeric">
              <PinInputField />
              <PinInputField />
              <PinInputField />
              <PinInputField />
              <PinInputField />
              <PinInputField />
              <PinInputField />
            </PinInput>
          </HStack>
          <HStack maxW={"container.md"}>
            <PinInput mask size="xs" type="alphanumeric">
              <PinInputField />
              <PinInputField />
              <PinInputField />
              <PinInputField />
              <PinInputField />
              <PinInputField />
              <PinInputField />
            </PinInput>
          </HStack>
          <HStack maxW={"container.md"}>
            <PinInput mask size="xs" type="alphanumeric">
              <PinInputField />
              <PinInputField />
              <PinInputField />
              <PinInputField />
              <PinInputField />
              <PinInputField />
              <PinInputField />
            </PinInput>
          </HStack>
          <HStack maxW={"container.md"}>
            <PinInput mask size="xs" type="alphanumeric">
              <PinInputField />
              <PinInputField />
              <PinInputField />
              <PinInputField />
              <PinInputField />
              <PinInputField />
              <PinInputField />
            </PinInput>
          </HStack>
          <HStack maxW={"container.md"}>
            <PinInput mask size="xs" type="alphanumeric">
              <PinInputField />
              <PinInputField />
              <PinInputField />
              <PinInputField />
              <PinInputField />
              <PinInputField />
              <PinInputField />
            </PinInput>
          </HStack>
          <HStack maxW={"container.md"}>
            <PinInput mask size="xs" type="alphanumeric">
              <PinInputField />
              <PinInputField />
              <PinInputField />
              <PinInputField />
              <PinInputField />
              <PinInputField />
              <PinInputField />
            </PinInput>
          </HStack>
          <HStack maxW={"container.md"}>
            <PinInput mask size="xs" type="alphanumeric">
              <PinInputField />
              <PinInputField />
              <PinInputField />
              <PinInputField />
              <PinInputField />
              <PinInputField />
              <PinInputField />
            </PinInput>
          </HStack>
          <HStack maxW={"container.md"}>
            <PinInput mask size="xs" type="alphanumeric">
              <PinInputField />
              <PinInputField />
              <PinInputField />
              <PinInputField />
              <PinInputField />
              <PinInputField />
              <PinInputField />
            </PinInput>
          </HStack>
          <HStack maxW={"container.md"}>
            <PinInput mask size="xs" type="alphanumeric">
              <PinInputField />
              <PinInputField />
              <PinInputField />
              <PinInputField />
              <PinInputField />
              <PinInputField />
              <PinInputField />
            </PinInput>
          </HStack>
          <Divider></Divider>
          <Button colorScheme="blue" variant="outline" w="full" mt={4}>
            Save
          </Button>
        </VStack>
        <VStack spacing={2} alignItems="flex-start">
          <Heading size="md">Confused or need help?</Heading>
          <Text fontFamily={"archivo"}>You can contact us or one of the event coordinators at qb@ethereum.org</Text>
        </VStack>
      </VStack>
    </Container>
  );
};
type SettingsDrawerProps = {
  isOpen: boolean;
  onClose: () => void;
};
const SettingsDrawer = ({ isOpen, onClose }: SettingsDrawerProps) => {
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
          <Settings />
        </DrawerContent>
      </DrawerOverlay>
    </Drawer>
  );
};

type LayoutProps = {
  isOpen: boolean;
  onSettingsOpen: () => void;
  onClose: () => void;
};
const Layout = ({ isOpen, onSettingsOpen, onClose }: LayoutProps) => {
  return (
    <HStack h="100vh" spacing={0}>
      <Flex as="nav" h="full" maxW={16} w="full" bg="gray.100">
        <SideNav onSettingsOpen={onSettingsOpen} />
      </Flex>
      <Flex
        as="aside"
        display={{ base: "none", xl: "flex" }}
        h="full"
        maxW={{ lg: "md" }}
        w="full"
        position={"relative"}
        overflow={"hidden"}>
        <Quickstart />
        <SettingsDrawer isOpen={isOpen} onClose={onClose} />
      </Flex>
      <Outlet />
    </HStack>
  );
};

export default function Project() {
  let { projectId } = useParams();
  let project = getProject(projectId ?? "0");
  return (
    <Flex as="main" h="full" flex={1} borderRightColor="gray.100" borderRightWidth={1} overflowY={"scroll"}>
      <VStack spacing={0} w="full">
        <Container
          paddingInlineStart={0}
          paddingInlineEnd={0}
          h="full"
          w="full"
          maxWidth={{ xs: "full", sm: "full", md: "full", lg: "lg", xl: "xl" }}>
          <VStack
            borderColor={"gray.100"}
            borderLeftWidth={1}
            borderRightWidth={1}
            my={0}
            spacing={0}
            h="full"
            alignItems="flex-start">
            <HStack
              spacing={0}
              maxH={16}
              mt={0.5}
              py={0.5}
              w="full"
              borderBottomColor={"gray.100"}
              borderBottomWidth={1}>
              <VStack p={4} maxW={16} justifyContent="space-between" alignItems="center" w="full">
                <IconButton
                  boxSize={"34px"}
                  variant={"ghost"}
                  rounded="full"
                  to="/projects"
                  as={Link}
                  icon={<Icon as={HiArrowLeft} />}
                  aria-label="Home"
                />
              </VStack>
              <VStack alignItems="flex-start" w="full" spacing={0} overflow="hidden">
                <Heading my={0.5} px={2} fontSize={"lg"} lineHeight={"24px"} fontWeight="700">
                  {project.name}
                </Heading>
                <Text px={2} color={"gray.600"} fontSize={"xs"} lineHeight={"16px"} fontWeight="400">
                  {project.address}
                </Text>
              </VStack>
            </HStack>
            <VStack display={"block"} w="full" overflow={"hidden"}>
              <Box
                h="full"
                w="full"
                position="relative"
                paddingBottom="33.3333%"
                sx={{
                  backgroundPosition: "center",
                  backgroundRepeat: "no-repeat",
                  background: `rgb(26, 31, 41) url('${project?.image}') `,
                  backgroundSize: "cover",
                }}>
                <Image h="full" w="full" position="absolute" src={project.image} alt={project.name} />
              </Box>
            </VStack>
            <HStack pt={3} px={{ base: "4", md: "6" }} justifyContent={"space-between"} w="full" spacing={0}>
              <AspectRatio
                borderColor={"grey.300"}
                borderWidth={3}
                zIndex="1"
                w={{ base: "25%", md: "25%" }}
                mt="-15%"
                mb="12px"
                display="block"
                overflow={"visible"}
                rounded="full"
                maxW="100%"
                ratio={1}>
                <Image borderRadius="full" src={project.image} alt={project.name} />
              </AspectRatio>

              <Button
                fontSize={"15px"}
                bg="blue"
                color="white"
                rounded={"full"}
                as={Link}
                to={`/ballot`}
                height={{ base: "30px", md: "40px" }}
                marginTop={{ base: "-20px !important", md: "20px !important" }}>
                <HStack px={4}>
                  <Icon
                    color="white"
                    position="relative"
                    z-index={20}
                    boxSize={"15px"}
                    fontWeight={"black"}
                    _hover={{
                      color: "black",
                      transform: "scale(1.1)",
                    }}>
                    <path
                      fill="currentColor"
                      d="M18 13h-.68l-2 2h1.91L19 17H5l1.78-2h2.05l-2-2H6l-3 3v4c0 1.1.89 2 1.99 2H19a2 2 0 002-2v-4l-3-3zm-1-5.05l-4.95 4.95-3.54-3.54 4.95-4.95L17 7.95zm-4.24-5.66L6.39 8.66a.996.996 0 000 1.41l4.95 4.95c.39.39 1.02.39 1.41 0l6.36-6.36a.996.996 0 000-1.41L14.16 2.3a.975.975 0 00-1.4-.01z"></path>
                  </Icon>
                  <Text
                    display={{ base: "none", md: "block" }}
                    fontSize={["xs", "sm", "sm", "sm"]}
                    fontWeight="800"
                    ml={2}>
                    BALLOT
                  </Text>
                </HStack>
              </Button>
            </HStack>
            <VStack alignItems="flex-start" w="full" spacing={3} px={{ base: "4", md: "6" }}>
              <VStack alignItems="flex-start" w="full" spacing={0}>
                <Heading my={0.5} fontSize={"xl"} lineHeight={"24px"} fontWeight="700">
                  {project.name}
                </Heading>
                <Text color={"gray.600"} fontSize={"xs"} lineHeight={"14px"} fontWeight="400">
                  {project.address}
                </Text>
              </VStack>
              <Text fontSize={"sm"} lineHeight={"16px"} fontWeight="400">
                {project.description} {project.problemSpace}
              </Text>
              {/* <Text fontSize={"sm"} lineHeight={"16px"} fontWeight="400">
               
              </Text> */}
              <VStack alignItems="flex-start" w="full" spacing={1}>
                <Text fontSize={"sm"} lineHeight={"16px"} fontWeight="400">
                  <b> Project Ballot ID:</b> {project.id}
                </Text>
                <Text fontSize={"sm"} lineHeight={"16px"} fontWeight="400">
                  <b> Project Website:</b> {project.url}
                </Text>
              </VStack>
            </VStack>
          </VStack>
        </Container>
      </VStack>
    </Flex>
  );
}

const Projects = () => {
  return (
    <>
      <Flex as="main" h="full" flex={1} borderRightColor="gray.100" borderRightWidth={1} overflowY={"scroll"}>
        <VStack spacing={0} w="full">
          <Container
            h="full"
            w="full"
            maxWidth={{ base: "container.sm", md: "container.sm", lg: "container.md" }}
            px={0}>
            <VStack mt={10} spacing={4} h="full" alignItems="flex-start">
              <VStack pl={4} spacing={0} alignItems={"flex-start"} w="full">
                <Heading fontSize={"5xl"} mb={0}>
                  Project Directory
                </Heading>

                <Accordion fontSize="xs" allowToggle>
                  <AccordionItem border="none">
                    <VStack>
                      <Text px={0} textAlign={"left"} as={AccordionButton} fontSize="xs">
                        This is a directory of Dummy projects. This page will be updated once the event starts to let
                        you add projects to your ballot that you meet at the event. Tap here to learn more 📖🧐.
                        <AccordionIcon></AccordionIcon>
                      </Text>
                    </VStack>
                    <AccordionPanel pb={4}>
                      <UnorderedList marginInlineStart={"1rem !important"} fontSize="xs" w="full">
                        <ListItem>
                          When a voter is whitelisted they receive a{" "}
                          <Tooltip label="pseudo-randomly assigned" placement="top">
                            <b>MACI passphrase</b>
                          </Tooltip>{" "}
                          and voice credits.
                        </ListItem>
                        <ListItem>
                          Everyone will begin with 99 <b>voice credits</b>
                        </ListItem>
                        <ListItem>
                          These<b> voice credits </b> are used to cast <b>votes</b> for projects on your ballot
                        </ListItem>
                        <ListItem>
                          You can add up to <b>8 projects</b> to your ballot and distribute your voice credits between
                          them. Choose wisely.
                        </ListItem>

                        <ListItem>
                          Casting a vote for a project will{" "}
                          <b>cost the square of the number of votes you want to cast</b> in voice credits. For example,
                          if you would like to cast 5 votes for Project A, that will cost 25 voice credits.
                        </ListItem>
                        <ListItem>
                          {" "}
                          You <b>cannot use more voice credits than you have</b>. Since each voter starts with 99 voice
                          credits, a vote of 10 (which would cost 100 voice credits) is more than any voter can afford
                          to pay. This means that at most, a single voter can give 9 votes to a single project - at a
                          cost of 81 voice credits - and have 18 voice credits left to vote for other projects.{" "}
                        </ListItem>
                        <ListItem>
                          {" "}
                          You <b>can submit many ballots</b> during the voting period.{" "}
                        </ListItem>

                        <ListItem>
                          Only the <b>final submitted ballot will be counted</b> toward the final tally. Trust no one.
                        </ListItem>
                        <ListItem>
                          The ballot will be tallied at the end of the voting period, and the{" "}
                          <b>prize pool will be distributed between all the projects</b> based on the number of votes
                          received during the event (via quadratic funding).
                        </ListItem>
                      </UnorderedList>
                    </AccordionPanel>
                  </AccordionItem>
                </Accordion>
              </VStack>
              <VStack spacing={0} alignItems={"flex-start"} w="full">
                {getProjects().map((project) => (
                  <Box
                    _hover={{
                      boxShadow: "0px 0px 10px rgba(0, 0, 0, 0.5)",
                      backgroundColor: "gray.100",
                    }}
                    alignItems={"stretch"}
                    as={Link}
                    to={`/projects/${project.id}`}
                    key={project.id}
                    pt={3}
                    pb={3}
                    pl={4}
                    minH={"100px"}
                    w={"full"}>
                    <HStack spacing={0} alignItems="flex-start" w="full">
                      <AspectRatio
                        borderColor={"grey.800"}
                        borderWidth={1}
                        zIndex="1"
                        w={{ base: "50px", md: "50px" }}
                        rounded="full"
                        ratio={1}
                        mt={1}>
                        <Image borderRadius="full" src={project.image} alt={project.name} />
                      </AspectRatio>
                      <VStack
                        alignItems="flex-start"
                        w="full"
                        spacing={1.5}
                        px={{ base: "4", md: "3" }}
                        color="gray.800">
                        <VStack alignItems="flex-start" w="full" spacing={0}>
                          <Heading my={0.5} fontSize={"lg"} lineHeight={"24px"} fontWeight="700">
                            {project.name}
                          </Heading>
                          <Text color={"gray.600"} fontSize={"sm"} lineHeight={"14px"} fontWeight="400">
                            {project.address}
                          </Text>
                        </VStack>
                        <Text fontSize={"sm"} lineHeight={"16px"} fontWeight="400">
                          {project.problemSpace}
                        </Text>
                        {/* <Text fontSize={"sm"} lineHeight={"16px"} fontWeight="400">
               
              </Text> */}
                      </VStack>
                    </HStack>
                  </Box>
                ))}
              </VStack>
            </VStack>
          </Container>
        </VStack>
      </Flex>

      <Outlet />
    </>
  );
};

type HomeProps = {
  isOpen: boolean;
  onSettingsOpen: () => void;
};

const Home = ({ isOpen, onSettingsOpen }: HomeProps) => {
  return (
    <Flex
      as="main"
      h="full"
      flex={1}
      borderRightColor="gray.100"
      borderRightWidth={1}
      position={"relative"}
      overflow="hidden">
      <Hero
        position={"absolute"}
        overflow="hidden"
        zIndex={-1}
        maxW={"1600px"}
        left={{ base: "-260px", md: "0px", lg: "0px", xl: "-80px" }}
        top={{ base: "100px", md: "0px", lg: "0px", xl: "160px" }}
      />

      <Container maxWidth={{ lg: "container.md", md: "container.md" }} py={100}>
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
              textAlign={{ base: "left", xl: "center" }}
            />
            <Heading></Heading>
            <Text maxW={"50ch"} fontFamily={"archivo"} display={{ base: "flex", xl: "none" }}>
              Quadratic Funding at ETH Prague!
            </Text>

            <VStack display={{ base: "flex", xl: "none" }} pt="0" alignItems={"flex-start"} w="full">
              <Button h="60px" w="full" background="#FFFF00" variant={"solid"}>
                <Text fontSize="lg" fontWeight={"black"}>
                  REGISTER YOUR PROJECT
                </Text>
              </Button>
              <Button
                onClick={onSettingsOpen}
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
              <Button h="80px" w="full" background="#FFFF00" variant={"solid"}>
                <Text fontSize="xl" fontWeight={"black"} fontFamily={"archivo"}>
                  {" "}
                  Register your Project{" "}
                </Text>
              </Button>
            </VStack>
          </VStack>
        </VStack>
      </Container>
    </Flex>
  );
};

const HowItWorks = () => {
  return (
    <Flex as="main" h="full" flex={1} borderRightColor="gray.100" borderRightWidth={1}>
      <Text>How it Works</Text>
    </Flex>
  );
};

const Admin = () => {
  return (
    <Flex as="main" h="full" flex={1} borderRightColor="gray.100" borderRightWidth={1}>
      <Text>Admin</Text>
    </Flex>
  );
};

const BallotExplainer = () => {
  return (
    <Accordion fontSize="xs" allowToggle>
      <AccordionItem border="none">
        <VStack>
          <Text px={0} textAlign={"left"} as={AccordionButton} fontSize="xs">
            This is a sample ballot to demonstrate the voting process, try SPENDING ALL THE VOICE CREDITS! it might be
            less intuitive than you think. Please feel free to play around on this Dummy Ballot to get a feel for it.
            This page will be updated once the event starts to let you add projects you meet at the event. Tap here to
            learn more 📖🧐.
            <AccordionIcon></AccordionIcon>
          </Text>
        </VStack>
        <AccordionPanel pb={4}>
          <UnorderedList marginInlineStart={"1rem !important"} fontSize="xs" w="full">
            <ListItem>
              When a voter is whitelisted they receive a{" "}
              <Tooltip label="pseudo-randomly assigned" placement="top">
                <b>MACI passphrase</b>
              </Tooltip>{" "}
              and voice credits.
            </ListItem>
            <ListItem>
              Everyone will begin with 99 <b>voice credits</b>
            </ListItem>
            <ListItem>
              These<b> voice credits </b> are used to cast <b>votes</b> for projects on your ballot
            </ListItem>
            <ListItem>
              You can add up to <b>8 projects</b> to your ballot and distribute your voice credits between them. Choose
              wisely.
            </ListItem>

            <ListItem>
              Casting a vote for a project will <b>cost the square of the number of votes you want to cast</b> in voice
              credits. For example, if you would like to cast 5 votes for Project A, that will cost 25 voice credits.
            </ListItem>
            <ListItem>
              {" "}
              You <b>cannot use more voice credits than you have</b>. Since each voter starts with 99 voice credits, a
              vote of 10 (which would cost 100 voice credits) is more than any voter can afford to pay. This means that
              at most, a single voter can give 9 votes to a single project - at a cost of 81 voice credits - and have 18
              voice credits left to vote for other projects.{" "}
            </ListItem>
            <ListItem>
              {" "}
              You <b>can submit many ballots</b> during the voting period.{" "}
            </ListItem>

            <ListItem>
              Only the <b>final submitted ballot will be counted</b> toward the final tally. Trust no one.
            </ListItem>
            <ListItem>
              The ballot will be tallied at the end of the voting period, and the{" "}
              <b>prize pool will be distributed between all the projects</b> based on the number of votes received
              during the event (via quadratic funding).
            </ListItem>
          </UnorderedList>
        </AccordionPanel>
      </AccordionItem>
    </Accordion>
  );
};

type BallotOptionProps = {
  ballotOption?: Option;
  to?: string;
  onClick?: () => void;
  lastOption?: boolean;

  votes?: number;
};

type Option = {
  name: string;
  id: string;
  address: string;
  url: string;
  description: string;
  image: string;
  problemSpace: string;
  tagline: string;
};

const BallotOption = ({ ballotOption, to, onClick, votes, lastOption }: BallotOptionProps) => {
  return (
    <Stack
      boxSizing={"content-box"}
      fontFamily={"arial"}
      borderColor="black"
      borderTopWidth={2}
      borderLeftWidth={2}
      borderRightWidth={2}
      borderBottomWidth={lastOption ? 2 : 0}
      spacing={0}
      alignItems="stretch"
      justifyContent="center"
      direction={{ base: "row", md: "row" }}
      w="full"
      h="100px">
      <VStack
        py={1.5}
        borderRightColor="black"
        borderRightWidth={2}
        h="full"
        spacing={0}
        justifyContent="flex-start"
        alignItems="center"
        textAlign="center"
        maxW={{ base: "fit-content", md: "40px" }}>
        <Text fontSize={20} fontWeight="bold" mx={2}>
          {votes ?? 0}
        </Text>
      </VStack>
      <VStack
        spacing={0}
        borderRightColor="black"
        borderRightWidth={2}
        justifyContent="flex-start"
        alignItems="stretch"
        w={{ base: "full", md: "full" }}
        py={2.5}
        px={2}>
        <HStack alignItems={"flex-end"}>
          <Heading fontSize={{ base: "md", md: "xl" }} fontWeight={"black"} letterSpacing={"-1px"}>
            {ballotOption?.name}
          </Heading>
          <Text
            as={Link}
            to={to ?? "/projects"}
            fontFamily={"arial"}
            fontSize={{ base: "sm", md: "sm" }}
            fontWeight={"thin"}
            lineHeight="base"
            display={{ base: "none", md: "flex" }}>
            {ballotOption?.url}
          </Text>
        </HStack>
        <Text fontSize={"xs"} lineHeight={"short"} fontWeight={"normal"} overflow="hidden">
          {ballotOption?.description}
        </Text>
        <Text
          as={Link}
          to={to ?? "/projects"}
          display={{ base: "flex", md: "none" }}
          fontSize={"xs"}
          fontWeight={"light"}>
          {ballotOption?.url}
        </Text>
      </VStack>

      <VStack
        h="full"
        spacing={0}
        justifyContent="center"
        alignItems="center"
        maxW={{ base: "fit-content", md: "70px" }}>
        <Center boxSize={"60px"}>
          <Tooltip
            label={`Add one more vote for ${((votes ?? 0) + 1) ** 2 - (votes ?? 0) ** 2} more voice credits`}
            placement="right">
            <Button
              onClick={onClick}
              sx={{
                ":after": {
                  content: "''",
                  backgroundBlendMode: "difference",
                  position: "absolute",
                  backgroundPosition: "center",
                  backgroundRepeat: "no-repeat",
                  background: `rgb(26, 31, 41) url('${ballotOption?.image}') `,
                  backgroundSize: "cover",
                  top: 0,
                  left: 0,
                  right: 0,
                  bottom: 0,
                  zIndex: "-1",
                  filter: "blur(1px)",
                  transform: "scale(1.1)",
                },
              }}
              bg="transparent"
              overflow="hidden"
              // bgImg={hero2}
              // backgroundPosition="center"
              rounded={"full"}
              borderColor="white"
              borderWidth={1}
              boxSize="50px">
              <Center>
                <Icon
                  color="white"
                  position="relative"
                  zIndex={1}
                  boxSize={"8"}
                  letterSpacing="-0.5px"
                  fontWeight={"black"}
                  _hover={{
                    color: "black",
                    transform: "scale(1.1)",
                  }}>
                  <path
                    fill="currentColor"
                    d="M18 13h-.68l-2 2h1.91L19 17H5l1.78-2h2.05l-2-2H6l-3 3v4c0 1.1.89 2 1.99 2H19a2 2 0 002-2v-4l-3-3zm-1-5.05l-4.95 4.95-3.54-3.54 4.95-4.95L17 7.95zm-4.24-5.66L6.39 8.66a.996.996 0 000 1.41l4.95 4.95c.39.39 1.02.39 1.41 0l6.36-6.36a.996.996 0 000-1.41L14.16 2.3a.975.975 0 00-1.4-.01z"></path>
                </Icon>
              </Center>
            </Button>
          </Tooltip>
        </Center>
      </VStack>
    </Stack>
  );
};

const Ballot = () => {
  const [ballotOptions, setBallotOptions] = useState<number[]>([]);
  const [ballotData, setBallotData] = useState<Option[]>([]);
  const [voiceCreditBalance, setVoiceCreditBBalance] = useState(0);

  //ballot option 1 number of votes
  const [ballotOption1Votes, setBallotOption1Votes] = useState(0);
  const [ballotOption2Votes, setBallotOption2Votes] = useState(0);
  const [ballotOption3Votes, setBallotOption3Votes] = useState(0);
  const [ballotOption4Votes, setBallotOption4Votes] = useState(0);
  const [ballotOption5Votes, setBallotOption5Votes] = useState(0);
  const addBallotOption1Votes = useCallback(() => {
    if (voiceCreditBalance + ballotOption1Votes ** 2 - (ballotOption1Votes + 1) ** 2 < 0) {
      return setBallotOption1Votes(0);
    }
    if (ballotOption1Votes < 9) {
      return setBallotOption1Votes(ballotOption1Votes + 1);
    }
    return setBallotOption1Votes(0);
  }, [ballotOption1Votes, voiceCreditBalance]);
  const addBallotOption2Votes = useCallback(() => {
    if (voiceCreditBalance + ballotOption2Votes ** 2 - (ballotOption2Votes + 1) ** 2 < 0) {
      return setBallotOption2Votes(0);
    }
    if (ballotOption2Votes < 9) {
      return setBallotOption2Votes(ballotOption2Votes + 1);
    }
    return setBallotOption2Votes(0);
  }, [ballotOption2Votes, voiceCreditBalance]);
  const addBallotOption3Votes = useCallback(() => {
    if (voiceCreditBalance + ballotOption3Votes ** 2 - (ballotOption3Votes + 1) ** 2 < 0) {
      return setBallotOption3Votes(0);
    }
    if (ballotOption3Votes < 9) {
      return setBallotOption3Votes(ballotOption3Votes + 1);
    }
    return setBallotOption3Votes(0);
  }, [ballotOption3Votes, voiceCreditBalance]);
  const addBallotOption4Votes = useCallback(() => {
    if (voiceCreditBalance + ballotOption4Votes ** 2 - (ballotOption4Votes + 1) ** 2 < 0) {
      return setBallotOption4Votes(0);
    }
    if (ballotOption4Votes < 9) {
      return setBallotOption4Votes(ballotOption4Votes + 1);
    }
    return setBallotOption4Votes(0);
  }, [ballotOption4Votes, voiceCreditBalance]);
  const addBallotOption5Votes = useCallback(() => {
    if (voiceCreditBalance + ballotOption5Votes ** 2 - (ballotOption5Votes + 1) ** 2 < 0) {
      return setBallotOption5Votes(0);
    }
    if (ballotOption5Votes < 9) {
      return setBallotOption5Votes(ballotOption5Votes + 1);
    }
    return setBallotOption5Votes(0);
  }, [ballotOption5Votes, voiceCreditBalance]);
  //wrap all the votes into an array
  const votes = useMemo(
    () => [ballotOption1Votes, ballotOption2Votes, ballotOption3Votes, ballotOption4Votes, ballotOption5Votes],
    [ballotOption1Votes, ballotOption2Votes, ballotOption3Votes, ballotOption4Votes, ballotOption5Votes]
  );
  const totalVoiceCredits = useMemo(() => {
    return votes.reduce((acc, curr) => acc + curr ** 2, 0);
  }, [votes]);
  const updateVotes = [
    addBallotOption1Votes,
    addBallotOption2Votes,
    addBallotOption3Votes,
    addBallotOption4Votes,
    addBallotOption5Votes,
  ];
  useEffect(() => {
    const intialBallotOptions = [0, 1, 2, 3, 4];
    const initialVoiceCreditBalance = 99;
    setVoiceCreditBBalance(initialVoiceCreditBalance);
    setBallotOptions(intialBallotOptions);
  }, []);

  useEffect(() => {
    const newBallotData = ballotOptions?.map((optionId) => {
      return getProject(String(optionId));
    });
    setBallotData(newBallotData);
  }, [ballotOptions]);

  useEffect(() => {
    const totalVoiceCreditsUsed = votes.reduce((acc, curr) => acc + curr ** 2, 0);
    const newVoiceCreditBalance = 99 - totalVoiceCreditsUsed;
    setVoiceCreditBBalance(newVoiceCreditBalance);
  }, [votes]);

  return (
    <Flex as="main" h="full" flex={1} borderRightColor="gray.100" borderRightWidth={1} overflowY={"scroll"}>
      <VStack spacing={0} w="full">
        <Container h="full" w="full" maxWidth="container.sm">
          <VStack mt={10} spacing={4} h="full" alignItems="flex-start">
            <Heading mb={4}>Example Ballot</Heading>
            <VStack spacing={2} alignItems={"flex-start"} w="full">
              <BallotExplainer />

              <EaseInBottom duration={0.3} delay={0.5} heightStart={20} heightEnd={10}>
                <Text fontSize={"md"}>
                  <b>Voice Credit balance: {voiceCreditBalance}</b>
                </Text>
              </EaseInBottom>
              <Text fontSize={"xs"} pt={2} px={"1px"}>
                Voice Credits Spent: {ballotOption1Votes ** 2} + {ballotOption2Votes ** 2} + {ballotOption3Votes ** 2} +{" "}
                {ballotOption4Votes ** 2} + {ballotOption5Votes ** 2} = {totalVoiceCredits}
              </Text>
            </VStack>
            <VStack spacing={0} alignItems={"flex-start"} w="full">
              {ballotData.map((project, index) => (
                <BallotOption
                  lastOption={index === 4 ? true : false}
                  ballotOption={project}
                  votes={votes[index]}
                  onClick={updateVotes[index]}
                  to={`/projects/${project.id}`}
                />
              ))}
            </VStack>
            <HStack spacing={8} alignItems={"flex-start"} justifyContent="space-between" w="full">
              <VStack spacing={1} alignItems="flex-start">
                <Heading fontSize={"sm"} fontWeight={"bold"}>
                  Ballot (MACI) Passphrase
                </Heading>
                <Text fontSize={"xs"}>
                  Think about this like a captcha on steroids. Ballot (MACI) Passphrase distribution is done as an
                  in-person sybil check that assigns a white listed, pseudo random maci key to each voter. While at the
                  event, you will be given a passphrase to use to submit your ballot. (ID and signature check required).
                  This secret key is used to sign the ballot and is not stored on the blockchain. Keep it safe! it is
                  the only way to vote. QR scanning soon!
                </Text>
                <HStack maxW={"container.md"}>
                  <PinInput defaultValue="macisk." size="xs" type="alphanumeric">
                    <PinInputField />
                    <PinInputField />
                    <PinInputField />
                    <PinInputField />
                    <PinInputField />
                    <PinInputField />
                    <PinInputField />
                  </PinInput>
                </HStack>
                <HStack maxW={"container.md"}>
                  <PinInput mask size="xs" type="alphanumeric">
                    <PinInputField />
                    <PinInputField />
                    <PinInputField />
                    <PinInputField />
                    <PinInputField />
                    <PinInputField />
                    <PinInputField />
                  </PinInput>
                </HStack>
                <HStack maxW={"container.md"}>
                  <PinInput mask size="xs" type="alphanumeric">
                    <PinInputField />
                    <PinInputField />
                    <PinInputField />
                    <PinInputField />
                    <PinInputField />
                    <PinInputField />
                    <PinInputField />
                  </PinInput>
                </HStack>
                <HStack maxW={"container.md"}>
                  <PinInput mask size="xs" type="alphanumeric">
                    <PinInputField />
                    <PinInputField />
                    <PinInputField />
                    <PinInputField />
                    <PinInputField />
                    <PinInputField />
                    <PinInputField />
                  </PinInput>
                </HStack>
                <HStack maxW={"container.md"}>
                  <PinInput mask size="xs" type="alphanumeric">
                    <PinInputField />
                    <PinInputField />
                    <PinInputField />
                    <PinInputField />
                    <PinInputField />
                    <PinInputField />
                    <PinInputField />
                  </PinInput>
                </HStack>
                <HStack maxW={"container.md"}>
                  <PinInput mask size="xs" type="alphanumeric">
                    <PinInputField />
                    <PinInputField />
                    <PinInputField />
                    <PinInputField />
                    <PinInputField />
                    <PinInputField />
                    <PinInputField />
                  </PinInput>
                </HStack>
                <HStack maxW={"container.md"}>
                  <PinInput mask size="xs" type="alphanumeric">
                    <PinInputField />
                    <PinInputField />
                    <PinInputField />
                    <PinInputField />
                    <PinInputField />
                    <PinInputField />
                    <PinInputField />
                  </PinInput>
                </HStack>
                <HStack maxW={"container.md"}>
                  <PinInput mask size="xs" type="alphanumeric">
                    <PinInputField />
                    <PinInputField />
                    <PinInputField />
                    <PinInputField />
                    <PinInputField />
                    <PinInputField />
                    <PinInputField />
                  </PinInput>
                </HStack>
                <HStack maxW={"container.md"}>
                  <PinInput mask size="xs" type="alphanumeric">
                    <PinInputField />
                    <PinInputField />
                    <PinInputField />
                    <PinInputField />
                    <PinInputField />
                    <PinInputField />
                    <PinInputField />
                  </PinInput>
                </HStack>
                <HStack maxW={"container.md"}>
                  <PinInput mask size="xs" type="alphanumeric">
                    <PinInputField />
                    <PinInputField />
                    <PinInputField />
                    <PinInputField />
                    <PinInputField />
                    <PinInputField />
                    <PinInputField />
                  </PinInput>
                </HStack>
                <Divider></Divider>
              </VStack>
              <VStack spacing={6} alignItems="flex-start" w="full">
                <MagikButton />
                <Button
                  rounded={"full"}
                  py={6}
                  fontSize={"lg"}
                  fontWeight="extrabold"
                  fontFamily={"Helvetica"}
                  bg="blue"
                  color="white"
                  variant="solid"
                  w="full"
                  mt={4}>
                  SUBMIT BALLOT
                </Button>
              </VStack>
            </HStack>
          </VStack>
        </Container>
      </VStack>
    </Flex>
  );
};

export const App = () => {
  const { isOpen, onOpen: onSettingsOpen, onClose } = useDisclosure();
  return (
    <ChakraProvider theme={theme}>
      <Routes>
        <Route path="/" element={<Layout isOpen={isOpen} onSettingsOpen={onSettingsOpen} onClose={onClose} />}>
          <Route index element={<Home isOpen={isOpen} onSettingsOpen={onSettingsOpen} />} />
          <Route path="ballot" element={<Ballot />} />
          <Route path="projects" element={<Projects />}></Route>
          <Route path="projects/:projectId" element={<Project />} />
          <Route path="howitworks" element={<HowItWorks />} />
          <Route path="admin" element={<Admin />} />
          <Route path="*" element={<Text> 404 </Text>} />
        </Route>
      </Routes>
    </ChakraProvider>
  );
};

let projects = [
  {
    name: "Notarealballot LLC",
    id: "1",
    address: "0x1234...890",
    url: "https://chickenNuggets.com",
    description:
      "This isn't a real project but if it was this would be a short description of it that you could use to remember how you found them.",
    image: "https://ipfs.io/ipfs/Qmdv4JLE82GuSEPh3LygDBPYpVwet4R4znLbjqrZMYKFkM",
    tagline: "This is a tagline",
    problemSpace:
      "The problem we are trying to solve is to give public goods -- in the form of chicken nuggies -- to people who need them at the conference.",
  },

  {
    name: "EthPrague community coffee",
    id: "2",
    address: "0x122...67890",
    url: "https://ethprague.com",
    description:
      "EthPrague is a community coffee project that aims to bring together cofee lovers attending the conference. We are a community of people who are passionate about coffee and coffee culture.",
    image: "https://ipfs.io/ipfs/Qmay2DQmKLVHHRkzxZCyLY1pKwMkaHcXVYGEgaFFmB2wgr",
    tagline: "This is a tagline",
    problemSpace:
      "The problem we are trying to solve is to give public goods -- in the form of coffee -- to people who need them at the conference.",
  },
  {
    name: "Thisanexample Hackathon Project",
    id: "0",
    address: "benbitdiddle.eth",
    url: "https://hack.ethprague.com",
    description:
      "Cool Hackathon project at ethPrague, that won some prizes and could use some funding to make it a reality.",
    image: "https://ipfs.io/ipfs/QmXRGpfpKAx2fZCW4REEgtmExFjSzmxEf6u7pyc8YYhexk",
    tagline: "This is a tagline",
    problemSpace:
      "The problem we are trying to solve is to create public goods -- in the form of this hack -- for people who need them.",
  },
  {
    name: "EthPrague Related DAO",
    id: "3",
    address: "0x122...67890",
    url: "https://ethprague.com",
    description: "Give back to the community.",
    image: "https://ipfs.io/ipfs/QmYoqQ9W2V2gpVt5K9RVq5TYoMbd6g7Fi2yYnLzgKDFz9L",
    tagline: "This is a tagline",
    problemSpace:
      "The problem we are trying to solve is to fund public goods -- in the form of DAO things -- so that we can do things.",
  },
  {
    name: "Your Project?",
    id: "4",
    address: "0x122...67890",
    url: "https://yourproject.com",
    description: "Public goods? you got em.",
    image: "https://source.unsplash.com/random",
    tagline: "This is a tagline",
    problemSpace: "What is the problem you are trying to solve ?",
  },
];

export function getProjects() {
  return projects;
}

export function getProject(id: string) {
  return (
    projects.find((p) => p.id === id) ?? {
      name: "Your Project?",
      id: "4",
      address: "0x1234567890123456789012345678901234567890",
      url: "https://yourproject.com",
      description: "Public goods? you got em.",
      image: "https://source.unsplash.com/random",
      tagline: "This is a tagline",
      problemSpace: "What is the problem you are trying to solve ?",
    }
  );
}