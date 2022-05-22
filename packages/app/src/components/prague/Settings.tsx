import React from "react";
import {
  VStack,
  Container, HStack, Text,
  Heading,
  Button,
  Drawer,
  DrawerOverlay,
  DrawerContent,
  DrawerCloseButton,
  PinInput,
  PinInputField,
  Divider
} from "@chakra-ui/react";
import { MagikButton } from "@qfi/ui";

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
