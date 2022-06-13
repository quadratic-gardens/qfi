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
          <Text fontFamily={"archivo"}>
            Casting a Ballot requires you to have a wallet on Gnosis Chain, xDai to pay for gas, and a valid ballot key. Voting is anonymous, but ballot registration happens in person as a sybil check. At the event, visit the Quadratic Funding booth to get your ballot keys.
          </Text>
        </VStack>
        <VStack spacing={6} alignItems="flex-start">
          <Heading size="md">GnosisChain (xDai) Wallet</Heading>
          <Text fontFamily={"archivo"}>
            You will receive keys for an xDai address that is whitelisted for this voting round, pre-loaded with enough gas to cover the transaction fees for ballot submission.
          </Text>
          <MagikButton />
        </VStack>
        <VStack spacing={2} alignItems="flex-start">
          <Heading size="md">Ballot (MACI) passphrase</Heading>
          <Text fontFamily={"archivo"}>
            MACI (Minimal Anti-Collusion Infrastructure) uses zero knowledge proofs to protect against censorship and collusion in blockchain voting.
            Each voter gets a pseudo-random MACI key which is used to encrypt and validate your votes. This is the only way to vote in the round, and can be used to change your ballot at any time while the round is active, so keep it safe.
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
          <Text fontSize="md" fontFamily={"archivo"}>
            You can send us an email at privacy.scaling.explorations@gmail.com or join the ETHPrague Telegram group
            <Link href='https://t.me/ethprague' isExternal>
              <Icon as={HiExternalLink} boxSize={4} color="gray.500" />
            </Link>
          </Text>
          <Text fontSize="md" fontFamily={"archivo"}>
            Visit us at the Quadratic Funding booth in the Looks Rare sponsor area at ETHPrague.
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
