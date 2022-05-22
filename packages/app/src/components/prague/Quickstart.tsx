import React from "react";
import {
  VStack,
  Container, HStack, IconButton,
  Icon,
  Text,
  Heading
} from "@chakra-ui/react";
import { MagikButton } from "@qfi/ui";
import { MdDashboard } from "react-icons/md";
import { HiCollection, HiQrcode } from "react-icons/hi";
import { ColorModeSwitcher } from "../ColorModeSwitcher";

export const Quickstart = () => {
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
            aria-label="Ballot" />
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
