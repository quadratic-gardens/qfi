import React, { useCallback, useEffect, useState, useMemo } from "react";
import {
  VStack,
  HStack,
  Flex,
  Text,
  Heading,
  Button,
  Stack,
  useColorModeValue,
  Center,
  useToast,
  FormControl,
  FormHelperText,
  FormLabel,
  Input,
  Tooltip,
} from "@chakra-ui/react";

import { getProject, getRecipientIdbyId } from "../data";
import { Option } from "../propTypes";
import { BallotOption } from "../components/prague/BallotOption";
import { BallotExplainer } from "../components/prague/BallotExplainer";
import { Link, useSearchParams } from "react-router-dom";
import { useDappState } from "../context/DappContext";

import { Keypair, PubKey, PrivKey, Command, Message } from "qaci-domainobjs";
import { genRandomSalt } from "qaci-crypto";
import { useWallet } from "@qfi/hooks";
import { BigNumber, ethers } from "ethers";
import { GrantRound__factory } from "../typechain";
import { getStateIndex } from "../quickBallotConfig";
import { useTranslation } from "react-i18next";

const isMaciPrivKey = (key: string): boolean => {
  if ((key.length === 71 || key.length === 70) && key.startsWith("macisk.")) {
    try {
      const pubKey = new Keypair(PrivKey.unserialize(key)).pubKey.serialize();
      if (getStateIndex(pubKey)) {
        return true;
      }
      return false;
    } catch (e) {
      return false;
    }
  }

  return false;
};

export const Ballot = () => {
  const { t } = useTranslation();
  const [searchParams] = useSearchParams();
  const [key, setKey] = useState<string>();
  const { maciKey, setMaciKey } = useDappState();
  const toast = useToast();

  const isValidMaciKey = useMemo(() => {
    return isMaciPrivKey(maciKey);
  }, [maciKey]);

  const { provider, address, isConnected } = useWallet();
  const handleInputChange = (e) => {
    setKey(String(e.target.value).trim());
  };

  const handleComplete = (value: string) => {
    console.log("complete");
    try {
      if (isMaciPrivKey(value)) {
        setMaciKey(value);

        toast({
          title: t("New Maci Key"),
          description: t(
            "You have updated your MACI key, and are registered to vote."
          ),
          status: "success",
          duration: 6000,
          isClosable: true,
        });
        console.log("changed");
        console.log(new Keypair(PrivKey.unserialize(value)).pubKey.serialize());
      } else {
        throw new Error("Invalid MACI key");
      }
    } catch (e) {
      toast({
        title: t("Invalid Maci Key"),
        description: t(
          "The MACI Key you have provided is either incorrect or not registered"
        ),
        status: "error",
        duration: 3000,
        isClosable: true,
      });
      console.log(e.message);
    }
  };

  const numChars = useMemo(() => {
    if (key) {
      return key.length;
    }
  }, [key]);
  const isError = useMemo(() => {
    return key && !isMaciPrivKey(key);
  }, [key]);

  const handleSubmitMaciChange = (event) => {
    event.preventDefault();
    handleComplete(key);
  };

  useEffect(() => {
    if (maciKey) {
      setKey(maciKey);
    }
  }, [setKey, maciKey]);

  const voteOptions = useMemo(() => {
    return searchParams.getAll("option");
  }, [searchParams]);

  //TODO: IDs of all the projects on the users ballot according to recipient registry
  const recipientRegistryIds = useMemo(() => {
    return voteOptions
      .filter((s) => !isNaN(parseInt(s)))
      .map((s) => parseInt(s));
  }, [voteOptions]);

  const displayOptions: boolean = useMemo(() => {
    return recipientRegistryIds.length > 0;
  }, [recipientRegistryIds]);
  const color = useColorModeValue("gray.800", "gray.700");
  const [ballotOptions, setBallotOptions] = useState<number[]>([]);
  const [ballotData, setBallotData] = useState<Option[]>([]);
  const [voiceCreditBalance, setVoiceCreditBBalance] = useState(0);

  const isEmptyBallot = useMemo(
    () =>
      ballotOptions.reduce((p, option) => {
        return p && isNaN(option);
      }, true) === false,
    [ballotOptions]
  );

  //ballot option 1 number of votes
  const [ballotOption1Votes, setBallotOption1Votes] = useState(0);
  const [ballotOption2Votes, setBallotOption2Votes] = useState(0);
  const [ballotOption3Votes, setBallotOption3Votes] = useState(0);
  const [ballotOption4Votes, setBallotOption4Votes] = useState(0);
  const [ballotOption5Votes, setBallotOption5Votes] = useState(0);
  const [ballotOption6Votes, setBallotOption6Votes] = useState(0);
  const [ballotOption7Votes, setBallotOption7Votes] = useState(0);
  const [ballotOption8Votes, setBallotOption8Votes] = useState(0);

  //TODO: number of votes per vote option, lines up with recipientRegistryIds
  //TODO: take this data along with recipientRegistryIds and use it to populate messages, then submit
  const votes = useMemo(
    () => [
      ballotOption1Votes,
      ballotOption2Votes,
      ballotOption3Votes,
      ballotOption4Votes,
      ballotOption5Votes,
      ballotOption6Votes,
      ballotOption7Votes,
      ballotOption8Votes,
    ],
    [
      ballotOption1Votes,
      ballotOption2Votes,
      ballotOption3Votes,
      ballotOption4Votes,
      ballotOption5Votes,
      ballotOption6Votes,
      ballotOption7Votes,
      ballotOption8Votes,
    ]
  );

  const resetAllVotes = useCallback(() => {
    setBallotOption1Votes(0);
    setBallotOption2Votes(0);
    setBallotOption3Votes(0);
    setBallotOption4Votes(0);
    setBallotOption5Votes(0);
    setBallotOption6Votes(0);
    setBallotOption7Votes(0);
    setBallotOption8Votes(0);
  }, [
    setBallotOption1Votes,
    setBallotOption2Votes,
    setBallotOption3Votes,
    setBallotOption4Votes,
    setBallotOption5Votes,
    setBallotOption6Votes,
    setBallotOption7Votes,
    setBallotOption8Votes,
  ]);

  const addBallotOption1Votes = useCallback(() => {
    if (
      voiceCreditBalance +
      ballotOption1Votes ** 2 -
      (ballotOption1Votes + 1) ** 2 <
      0
    ) {
      return setBallotOption1Votes(0);
    }
    if (ballotOption1Votes < 9) {
      return setBallotOption1Votes(ballotOption1Votes + 1);
    }
    return setBallotOption1Votes(0);
  }, [ballotOption1Votes, voiceCreditBalance]);
  const addBallotOption2Votes = useCallback(() => {
    if (
      voiceCreditBalance +
      ballotOption2Votes ** 2 -
      (ballotOption2Votes + 1) ** 2 <
      0
    ) {
      return setBallotOption2Votes(0);
    }
    if (ballotOption2Votes < 9) {
      return setBallotOption2Votes(ballotOption2Votes + 1);
    }
    return setBallotOption2Votes(0);
  }, [ballotOption2Votes, voiceCreditBalance]);
  const addBallotOption3Votes = useCallback(() => {
    if (
      voiceCreditBalance +
      ballotOption3Votes ** 2 -
      (ballotOption3Votes + 1) ** 2 <
      0
    ) {
      return setBallotOption3Votes(0);
    }
    if (ballotOption3Votes < 9) {
      return setBallotOption3Votes(ballotOption3Votes + 1);
    }
    return setBallotOption3Votes(0);
  }, [ballotOption3Votes, voiceCreditBalance]);
  const addBallotOption4Votes = useCallback(() => {
    if (
      voiceCreditBalance +
      ballotOption4Votes ** 2 -
      (ballotOption4Votes + 1) ** 2 <
      0
    ) {
      return setBallotOption4Votes(0);
    }
    if (ballotOption4Votes < 9) {
      return setBallotOption4Votes(ballotOption4Votes + 1);
    }
    return setBallotOption4Votes(0);
  }, [ballotOption4Votes, voiceCreditBalance]);
  const addBallotOption5Votes = useCallback(() => {
    if (
      voiceCreditBalance +
      ballotOption5Votes ** 2 -
      (ballotOption5Votes + 1) ** 2 <
      0
    ) {
      return setBallotOption5Votes(0);
    }
    if (ballotOption5Votes < 9) {
      return setBallotOption5Votes(ballotOption5Votes + 1);
    }
    return setBallotOption5Votes(0);
  }, [ballotOption5Votes, voiceCreditBalance]);
  const addBallotOption6Votes = useCallback(() => {
    if (
      voiceCreditBalance +
      ballotOption6Votes ** 2 -
      (ballotOption6Votes + 1) ** 2 <
      0
    ) {
      return setBallotOption6Votes(0);
    }
    if (ballotOption6Votes < 9) {
      return setBallotOption6Votes(ballotOption6Votes + 1);
    }
    return setBallotOption6Votes(0);
  }, [ballotOption6Votes, voiceCreditBalance]);
  const addBallotOption7Votes = useCallback(() => {
    if (
      voiceCreditBalance +
      ballotOption7Votes ** 2 -
      (ballotOption7Votes + 1) ** 2 <
      0
    ) {
      return setBallotOption7Votes(0);
    }
    if (ballotOption7Votes < 9) {
      return setBallotOption7Votes(ballotOption7Votes + 1);
    }
    return setBallotOption7Votes(0);
  }, [ballotOption7Votes, voiceCreditBalance]);
  const addBallotOption8Votes = useCallback(() => {
    if (
      voiceCreditBalance +
      ballotOption8Votes ** 2 -
      (ballotOption8Votes + 1) ** 2 <
      0
    ) {
      return setBallotOption8Votes(0);
    }
    if (ballotOption8Votes < 9) {
      return setBallotOption8Votes(ballotOption8Votes + 1);
    }
    return setBallotOption8Votes(0);
  }, [ballotOption8Votes, voiceCreditBalance]);
  //wrap all the votes into an array

  const totalVoiceCredits = useMemo(() => {
    return votes.reduce((acc, curr) => acc + curr ** 2, 0);
  }, [votes]);
  const updateVotes = [
    addBallotOption1Votes,
    addBallotOption2Votes,
    addBallotOption3Votes,
    addBallotOption4Votes,
    addBallotOption5Votes,
    addBallotOption6Votes,
    addBallotOption7Votes,
    addBallotOption8Votes,
  ];
  useEffect(() => {
    const intialBallotOptions = [NaN, NaN, NaN, NaN, NaN, NaN, NaN, NaN];
    const options = voteOptions
      .filter((s) => !isNaN(parseInt(s)))
      .map((s) => parseInt(s));

    const initialVoiceCreditBalance = 99;
    resetAllVotes();
    setVoiceCreditBBalance(initialVoiceCreditBalance);

    setBallotOptions(options.length === 0 ? intialBallotOptions : options);
  }, [voteOptions, resetAllVotes]);

  useEffect(() => {
    const newBallotData = ballotOptions?.map((optionId) => {
      return getProject(String(optionId));
    });
    setBallotData(newBallotData);
  }, [ballotOptions]);

  useEffect(() => {
    const totalVoiceCreditsUsed = votes.reduce(
      (acc, curr) => acc + curr ** 2,
      0
    );
    const newVoiceCreditBalance = 99 - totalVoiceCreditsUsed;
    setVoiceCreditBBalance(newVoiceCreditBalance);
  }, [votes]);

  const [txLoading, setTxLoading] = useState<boolean>(false);

  const disableSubmitButton = !isConnected || !isValidMaciKey || txLoading;

  function createMessage(
    userStateIndex: number,
    userKeypair: Keypair,
    coordinatorPubKey: PubKey,
    voteOptionIndex: number | null,
    voteWeight: number | null,
    nonce: number
  ): [Message, PubKey] {
    const salt = genRandomSalt();

    const quadraticVoteWeight = voteWeight ?? 0;
    const pubkey = userKeypair.pubKey;

    // /stateIndex: BigInt,
    // newPubKey: PubKey,
    // voteOptionIndex: BigInt,
    // newVoteWeight: BigInt,
    // nonce: BigInt,
    // pollId: BigInt,
    const command = new Command(
      BigInt(userStateIndex),
      pubkey,
      BigInt(voteOptionIndex || 0),
      BigInt(quadraticVoteWeight),
      BigInt(nonce),
      BigInt(0),
      salt
    );

    const signature = command.sign(userKeypair.privKey);
    const message = command.encrypt(
      signature,
      Keypair.genEcdhSharedKey(userKeypair.privKey, coordinatorPubKey)
    );
    return [message, userKeypair.pubKey];
  }

  const handleSubmit = async () => {
    console.log(isMaciPrivKey(maciKey));
    const signer = provider.getSigner(address);
    const grantRoundAddress = "0x0079765D34B80aeD96Cd96D345071C9A2b3a4471";

    const grantRound = new ethers.Contract(
      grantRoundAddress,
      GrantRound__factory.abi,
      signer
    );

    setTxLoading(true);
    console.log("-----------------------------------------------------");
    const txData: [Message, PubKey][] = recipientRegistryIds.map(
      (projectId, index) => {
        try {
          const recipientVoteOptionIndex = getRecipientIdbyId(
            projectId.toString()
          );
          console.log("recipientVoteOptionIndex", recipientVoteOptionIndex);
          let maciKeyPair: Keypair;
          let serializedMaciPublicKey: string;
          let userStateIndex: number;
          let nonce: number;
          let voteWeight: number;

          if (isMaciPrivKey(maciKey)) {
            maciKeyPair = new Keypair(PrivKey.unserialize(maciKey));
            serializedMaciPublicKey = maciKeyPair.pubKey.serialize();
            console.log("serializedMaciPublicKey", serializedMaciPublicKey);
            userStateIndex = getStateIndex(serializedMaciPublicKey);
            console.log("stateIndex", userStateIndex);
            nonce = index;
            voteWeight = votes[index];
          }
          if (
            isMaciPrivKey(maciKey) &&
            getStateIndex(serializedMaciPublicKey)
          ) {
            console.log("User is registered, signing ballot with private key");
            const coordinatorKey = PubKey.unserialize(
              "macipk.ec4173e95d2bf03100f4c694d5c26ba6ab9817c0a5a0df593536a8ee2ec7af04"
            );

            const [message, encPubKey] = createMessage(
              userStateIndex,
              maciKeyPair,
              coordinatorKey,
              recipientVoteOptionIndex,
              voteWeight,
              nonce
            );
            return [message, encPubKey];
          } else {
            console.log("user is not registered, throw message");
            throw new Error("User is not registered");
          }
        } catch (e) {
          return [null, null];
        }
      }
    );
    const messages: Message[] = [];
    const encPubKeys: PubKey[] = [];

    for (const [message, encPubKey] of txData) {
      messages.push(message);
      encPubKeys.push(encPubKey);
    }

    console.log(messages);
    console.log(encPubKeys);
    try {
      const gasPrice = await provider.getGasPrice();
      const double = BigNumber.from("2");
      const doubleGasPrice = gasPrice.mul(double);
      const gasLimit = ethers.utils.hexlify(10000000);
      const signer = provider.getSigner(address);

      const tx = await grantRound.connect(signer).publishMessageBatch(
        messages.reverse().map((msg) => msg.asContractParam()),
        encPubKeys.reverse().map((key) => key.asContractParam()),
        { gasPrice: doubleGasPrice, gasLimit }
      );
      await tx.wait();
      toast({
        title: t("Ballot Submitted"),
        description: t(
          "You have submitted your ballot! Feel free to resubmit if you change your mind."
        ),
        status: "success",
        duration: 10000,
        isClosable: true,
      });
    } catch (e) {
      setTxLoading(false);
      console.log(e);
    }
    setTxLoading(false);
    console.log("debug log", txData);
  };

  return (
    <Flex
      as="main"
      h="full"
      w="full"
      background="black"
      alignItems="center"
      flexDir="column"
      borderRightColor={color}
      borderRightWidth={1}
      overflowY="scroll"
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
      }}
    >
      <div style={{ marginTop: 64, maxWidth: 1042 }}>
        <Heading maxW="595px">
          <img src="your_ballot_EN.svg" alt="page title in english" />
        </Heading>
        <VStack spacing={2} alignItems="flex-start" w="full">
          <BallotExplainer />
          <Heading style={{ marginTop: 56 }}>
            {t("VOICE CREDIT BALANCE")}: {voiceCreditBalance}
          </Heading>
          <Text px={"1px"}>
            {t("Voice Credits spent")}: {ballotOption1Votes ** 2} +{" "}
            {ballotOption2Votes ** 2} + {ballotOption3Votes ** 2} +
            {ballotOption4Votes ** 2} + {ballotOption5Votes ** 2} +{" "}
            {ballotOption6Votes ** 2} + {ballotOption7Votes ** 2} +{" "}
            {ballotOption8Votes ** 2} = {totalVoiceCredits}
          </Text>
        </VStack>
        {displayOptions ? (
          <VStack
            spacing={0}
            alignItems="flex-start"
            style={{ marginTop: 48 }}
            w="full"
            display={isEmptyBallot ? "flex" : "none"}
          >
            {ballotData.map((project, index) => (
              <BallotOption
                key={index}
                lastOption={index === ballotOptions.length - 1 ? true : false}
                ballotOption={project}
                votes={votes[index]}
                onClick={updateVotes[index]}
                to={`/projects/${project.id}`}
              />
            ))}
          </VStack>
        ) : (
          <VStack style={{ marginTop: 48 }} alignItems="center" w="full">
            <Button
              as={Link}
              variant="ethLatamWhite"
              fontSize={{ base: "lg", xl: "xl" }}
              to={`/projects?${searchParams.toString()}`}
            >
              {t("CHECK OUT THE PROJECTS")}
            </Button>
          </VStack>
        )}
        <Stack
          spacing={3}
          py={8}
          flexDirection={{ base: "column", md: "row" }}
          alignItems="flex-start"
          justifyContent={{ base: "center", md: "space-between" }}
          w="full"
        >
          <VStack
            mt={21}
            spacing={2}
            h="full"
            alignItems={{ base: "center", md: "flex-start" }}
          >
            <Heading alignSelf="flex-start">
              {t("BALLOT (MACI) PASSPHRASE")}
            </Heading>
            <Flex mt={8} justifyContent="space-between">
              <Text textAlign="justify" w="80%">
                {t("MACI (Minimal Anti-Collusion Infrastructure) uses")}
              </Text>
              {isConnected ? (
                <Tooltip
                  isDisabled={!disableSubmitButton}
                  label={t(
                    "Unregistered MACI Keypair: Enter a valid MACI passphrase to continue."
                  )}
                  placement="top"
                  shouldWrapChildren
                >
                  <Button
                    maxWidth="150px"
                    width="100%"
                    height="auto"
                    display="block"
                    disabled={disableSubmitButton}
                    onClick={handleSubmit}
                    variant={
                      !disableSubmitButton
                        ? "ethLatamPurple"
                        : "ethLatamDisabled"
                    }
                    fontSize={{ base: "md", xl: "lg" }}
                  >
                    <div>{t("SUBMIT")}</div>
                    <div>{t("BALLOT")}</div>
                  </Button>
                </Tooltip>
              ) : (
                <Center textAlign="center">
                  <VStack spacing={6} textAlign="center" w="full">
                    <Text
                      display={isConnected ? "none" : "flex"}
                      fontSize="xs"
                      fontWeight="extrabold"
                    >
                      {t("Not Connected: Sign in to continue")}
                    </Text>
                  </VStack>
                </Center>
              )}
            </Flex>
            <VStack spacing={1} alignItems="flex-start" w="full">
              <form style={{ width: "100%" }} onSubmit={handleSubmitMaciChange}>
                <FormControl
                  w="full"
                  isInvalid={isError}
                  variant="floating"
                  id="key"
                  isRequired
                  my={4}
                >
                  <Input
                    w="80%"
                    type="password"
                    placeholder=""
                    value={key}
                    onChange={handleInputChange}
                  />
                  {/* It is important that the Label comes after the Control due to css selectors */}
                  <FormLabel>MACI SK</FormLabel>
                  <FormHelperText>{numChars ?? "-"}/71</FormHelperText>
                  <HStack spacing={2}>
                    <VStack w="80%" pt="10" justifyContent="center">
                      <Button
                        variant="ethLatamBlack"
                        fontSize={{ base: "lg", xl: "xl" }}
                        type="submit"
                        width="full"
                      >
                        {t("SAVE")}
                      </Button>
                    </VStack>
                  </HStack>
                </FormControl>
              </form>
            </VStack>
          </VStack>
        </Stack>
      </div>
    </Flex>
  );
};
