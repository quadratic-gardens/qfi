import React, { useCallback, useEffect, useState, useMemo } from "react";
import {
  VStack,
  Container, HStack,
  Flex, Text,
  Heading,
  Button, PinInput,
  PinInputField,
  Divider,
  Stack
} from "@chakra-ui/react";
import { EaseInBottom, MagikButton } from "@qfi/ui";
import { getProject } from "../data";
import { Option } from "../propTypes";
import { BallotOption } from "../components/prague/BallotOption";
import { BallotExplainer } from "../components/prague/BallotExplainer";


export const Ballot = () => {
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
                  to={`/projects/${project.id}`} />
              ))}
            </VStack>
                

            <Stack spacing={3} py={8} flexDirection={{ base:"column", md:"row"} }  alignItems={"flex-end"} justifyContent={{ base:"center", md:"space-between"} } w="full">
              <VStack spacing={1} alignItems={{ base:"center", md:"flex-start"} } >
                <Heading fontSize={"sm"} fontWeight={"bold"} alignSelf={"flex-start"}>
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
                disabled ={true}
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
            </Stack>
          </VStack>
        </Container>
      </VStack>
    </Flex>
  );
};
