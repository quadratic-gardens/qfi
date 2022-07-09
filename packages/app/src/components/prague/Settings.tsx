import React from "react";
import {
  VStack,
  Container,
  HStack,
  Text,
  Heading,
  Button,
  Drawer,
  DrawerOverlay,
  DrawerContent,
  DrawerCloseButton,
  PinInput,
  PinInputField,
  Divider,
  Icon,
  Link,
} from "@chakra-ui/react";
import { MagikButton } from "@qfi/ui";
import { HiExternalLink } from "react-icons/hi";

export const Settings = () => {
  const [values, setValues] = React.useState(["", "", ""]);

  return (
    <Container h="full" w="full" overflowY={"scroll"} right="-24px" top={0} left={0} position="absolute">
      <VStack mt={20} spacing={10} h="full" alignItems="flex-start">
        <VStack spacing={6} alignItems="flex-start">
          <Heading size="2xl">How it works?</Heading>

        </VStack>
        <VStack spacing={6} alignItems="flex-start">
          <Heading size="md">Polygon (MATIC) Wallet</Heading>
          <Text>
            Casting a Ballot requires you to have a Polygon/Etherum wallet with some MATIC to pay for the transaction gas (a small amount of
            MATIC will be airdropped to all NFT ticket holders) and a valid MACI private key.
          </Text>
          <Text>
            Voting is pseudoanonymous but to submit your votes you will receive your MACI private key to your email address (the one used when redeeming the ticket) sent by the ETHBarcelona team.
          </Text>
          <MagikButton />
        </VStack>
        <VStack spacing={2} alignItems="flex-start">
          <Heading size="md">Ballot (MACI) passphrase</Heading>
          <Text >
            MACI (Minimal Anti-Collusion Infrastructure) uses zero knowledge proofs to protect against censorship and collusion in blockchain voting. (read more about MACI at this page). Each voter gets a pseudo-random MACI key which is used to encrypt and validate your votes. This is the only way to vote in the round, and can be used to change your ballot at any time while the round is active, so keep it safe (”not you MACI, not your vote”)
          </Text>


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
          <HStack maxW={"container.md"}>
            <PinInput mask size="xs" type="alphanumeric">
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
          <Text fontSize="md" >
            You can send us an email at qf@ethbarcelona.com or join the ETHBarcelona Telegram group use the #QF hashtag in your post https://t.me/ethbarcelona
            <Link href='https://t.me/ethbarcelona' isExternal>
              <Icon as={HiExternalLink} boxSize={4} color="gray.500" />
            </Link>
          </Text>
        </VStack>
      </VStack>
    </Container>
  );
};
type SettingsDrawerProps = {
  isOpen: boolean;
  onClose: () => void;
};
export const SettingsDrawer = ({ isOpen, onClose }: SettingsDrawerProps) => {
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
