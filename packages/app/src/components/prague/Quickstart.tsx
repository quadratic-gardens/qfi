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
    <Container h="full" w="full" overflowY={"scroll"} right="-24px" top={0} left={0} position="absolute" sx={{
      scrollbarColor: "green",
      "::-webkit-scrollbar": {
        width: "0px"
      },
      
      "::-webkit-scrollbar-track": {
        boxShadow: "inset 0 0 0px grey",
        borderRadius: "0px"
      },
      
      "::-webkit-scrollbar-thumb": {
        background: "transparent",
        borderRadius: "0px"
      }
    }}>
      <VStack mt={20} spacing={10} h="full" alignItems="flex-start">
        <VStack spacing={6} alignItems="flex-start">
          <Heading size="4xl">Voter Quickstart Guide</Heading>
          <Text fontFamily={"archivo"}>
          As an ETHPrague attendee, you can play an important role in both supporting the local community, and exploring new ways of funding public goods.


          </Text>
        </VStack>
        <VStack spacing={6} alignItems="flex-start">
          <Heading size="md">A wallet specific made for you.</Heading>
          <Text fontFamily={"archivo"}>
          Below you will find instructions to help support local projects through a Quadratic Funding round taking place only at ETHPrague. To learn more about Quadratic Funding, find our team in ETHprague and register to vote!


          </Text>
          <MagikButton />
        </VStack>
        <VStack spacing={6} alignItems="flex-start">
          <Heading size="md">A wallet...that’s also a ballot.</Heading>
          <Text fontFamily={"archivo"}>
          At the bottom of your registration card is your ballot key - keep this safe! It’s an xDai wallet which you’ll use to vote in the Quadratic Funding round.
          </Text>
          <IconButton w={36} h={12} color="gray.800" icon={<Icon as={HiQrcode} boxSize={10} />} aria-label="Scan" />
        </VStack>
        <VStack spacing={6} alignItems="flex-start">
          <Heading size="md">Meet Projects</Heading>
          <Text fontFamily={"archivo"}>
          Projects from across the Prague community have signed up to receive funding. Learn about them on the website or in the Quadratic Funding booth, pick the ones you would like to support and scan their QR code to add them to your ballot. 

You can vote for up to 8 projects, and distribute your voice credits among them however you like. 
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
          One you’ve filled out your ballot, submit it onchain using your registration card to sign. Changed your mind? You can always submit a new ballot - only the last one you submit will be counted.
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
