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
} from "@chakra-ui/react";
import { MagikButton } from "@qfi/ui";
import { HiQrcode, HiCollection } from "react-icons/hi";
import { MdDashboard } from "react-icons/md";
import { ColorModeSwitcher } from "../ColorModeSwitcher";

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
      <VStack mt={20} spacing={10} h="full" alignItems="flex-start">
        <VStack spacing={6} alignItems="flex-start">
          <Heading size="4xl">{t("Recipient Guide")}</Heading>
          <Text >
          {t("Welcome! If you’re here, you’re probably working on something awesome in the Eth Latam community - Thanks for everything you do :)")}
          </Text>
           
        </VStack>
        <VStack spacing={6} alignItems="flex-start">
          <Heading size="md">{t("What is Quadratic Funding?")}</Heading>
          <Text >
          {t("Quadratic Funding (QF) is")}
          </Text>
          {/* <MagikButton /> */}
        </VStack>
        <VStack spacing={6} alignItems="flex-start">
          <Heading size="md">{t("What does it mean to sign up as a recipient?")}</Heading>
          <Text >
            {t("Adding your project makes you eligible to receive funds from the matching pool, but doesn’t guarantee funding. How much each project receives will be decided by ETHLatam attendees who vote during the event. You will need to be able to receive cryptocurrency (DAI/MATIC) on Gnosis Chain in order to receive funds in the QF round; if you’re uncertain about this feel free to get in touch and we’ll be happy to help.")}
          </Text>
          <IconButton w={36} h={12} color="gray.800" icon={<Icon as={HiQrcode} boxSize={10} />} aria-label="Scan" />
        </VStack>
        <VStack spacing={6} alignItems="flex-start">
          <Heading size="md">{t("Who should sign up?")}</Heading>
          <Text >
            {t("We don’t have a lot of hard eligibility criteria, but your project should be local to the Czech Republic and a public good, often defined as non-rivalrous (use by one person doesn’tprevent access by others) and non-excludable (anyone can access or use it).")}
          </Text>
          <Text >
          {t("Projects do not need to be Ethereum-specific or online/digital; public goods in this context could also include things like informational, educational or community resources, nonprofit organizations, creative work etc.")}
          </Text>
          {/* <List spacing={1} px={3}>
            <ListItem>
              <Text >• Local to Spain</Text>
            </ListItem>
            <ListItem>
              <Text >• Valuable to the Ethereum community</Text>
            </ListItem>
            <ListItem>
              <Text >• Not a scam</Text>
            </ListItem>
          </List> */}
          <IconButton
            w={36}
            h={12}
            color="gray.800"
            icon={<Icon as={HiCollection} boxSize={10} />}
            aria-label="Ballot"
          />
        </VStack>

        <VStack spacing={4}>
          <HStack justifyContent={"center"} spacing={[1, 2]}>
            <ColorModeSwitcher />
          </HStack>
          <Text > </Text>
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
