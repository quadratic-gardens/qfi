/* eslint-disable no-useless-computed-key */
import React, { useState } from "react";
import { Button, Heading, Flex, VStack, Container, useColorModeValue, Text } from "@chakra-ui/react";
import { useToast } from "@chakra-ui/react";
import { useWallet } from "@qfi/hooks";

import { PoseidonT3__factory } from "../typechain/factories/contracts/poseidon/PoseidonT3__factory";
import { PoseidonT4__factory } from "../typechain/factories/contracts/poseidon/PoseidonT4__factory";
import { PoseidonT5__factory } from "../typechain/factories/contracts/poseidon/PoseidonT5__factory";
import { PoseidonT6__factory } from "../typechain/factories/contracts/poseidon/PoseidonT6__factory";
import { PoseidonT3 } from "../typechain/contracts/poseidon/PoseidonT3";
import { PoseidonT4 } from "../typechain/contracts/poseidon/PoseidonT4";
import { PoseidonT5 } from "../typechain/contracts/poseidon/PoseidonT5";
import { PoseidonT6 } from "../typechain/contracts/poseidon/PoseidonT6";

import { JubjubFactory } from "../typechain/contracts/JubjubFactory";
import { JubjubFactoryLibraryAddresses, JubjubFactory__factory } from "../typechain/factories/contracts/JubjubFactory__factory";
import { Jubjub__factory, JubjubLibraryAddresses } from "../typechain/factories/contracts/Jubjub__factory";
import { Jubjub } from "../typechain/contracts/Jubjub";

import { SimpleHackathon__factory } from "../typechain/factories/contracts/flavors/SimpleHackathon__factory";
import { SimpleHackathon } from "../typechain/contracts/flavors/SimpleHackathon";

export const Admin = () => {
  const { provider, address, isConnected } = useWallet();
  const color = useColorModeValue("gray.800", "gray.700");
  const toast = useToast();

  const [step, setStep] = useState(0);
  const [loading, setLoading] = useState(false);

  const [poseidonT3, setT3] = useState<PoseidonT3>();
  const [poseidonT4, setT4] = useState<PoseidonT4>();
  const [poseidonT5, setT5] = useState<PoseidonT5>();
  const [poseidonT6, setT6] = useState<PoseidonT6>();

  const [jubjubFactory, setJubjubFactory] = useState<JubjubFactory>();
  const [jubjub, setJubjub] = useState<Jubjub>();
  const handleT2Deploy = async () => {
    const deployer = provider.getSigner(address);
    let t3: PoseidonT3;
    let t4: PoseidonT4;
    let t5: PoseidonT5;
    let t6: PoseidonT6;

    const PoseidonT3Factory = new PoseidonT3__factory(deployer);
    const PoseidonT4Factory = new PoseidonT4__factory(deployer);
    const PoseidonT5Factory = new PoseidonT5__factory(deployer);
    const PoseidonT6Factory = new PoseidonT6__factory(deployer);

    t3 = await PoseidonT3Factory.deploy();
    setT3(t3);
    toast({
      title: "PoseidonT3 Deployed",
      description: t3.address,
      status: "success",
      duration: 9000,
      isClosable: true,
    });
    console.log(t3);
    await new Promise((resolve) => setTimeout(resolve, 1300));
    console.log("waiting for tx to be mined");

    t4 = await PoseidonT4Factory.deploy();
    setT4(t4);
    toast({
      title: "PoseidonT4 Deployed",
      description: t4.address,
      status: "success",
      duration: 9000,
      isClosable: true,
    });
    console.log(t4);
    await new Promise((resolve) => setTimeout(resolve, 1300));
    console.log("waiting for tx to be mined");

    t5 = await PoseidonT5Factory.deploy();
    setT5(t5);
    toast({
      title: "PoseidonT5 Deployed",
      description: t5.address,
      status: "success",
      duration: 9000,
      isClosable: true,
    });
    console.log(t5);
    await new Promise((resolve) => setTimeout(resolve, 1300));
    console.log("waiting for tx to be mined");

    t6 = await PoseidonT6Factory.deploy();
    setT6(t6);
    toast({
      title: "PoseidonT6 Deployed",
      description: t4.address,
      status: "success",
      duration: 9000,
      isClosable: true,
    });
    await new Promise((resolve) => setTimeout(resolve, 10000));
    console.log("waiting for tx to be mined");
    console.log(t6);
  };
  const handleFactoryDeploy = async () => {
    const factoryLibs: JubjubFactoryLibraryAddresses = {
      ["contracts/poseidon/PoseidonT5.sol:PoseidonT5"]: poseidonT5.address,
      ["contracts/poseidon/PoseidonT6.sol:PoseidonT6"]: poseidonT6.address,
      ["contracts/poseidon/PoseidonT4.sol:PoseidonT4"]: poseidonT4.address,
      ["contracts/poseidon/PoseidonT3.sol:PoseidonT3"]: poseidonT3.address,
      ["contracts/AccQueue.sol:PoseidonT3"]: poseidonT3.address,
      ["contracts/AccQueue.sol:PoseidonT6"]: poseidonT6.address,
    };
    const deployer = provider.getSigner(address);
    let jubjubFactory: JubjubFactory;

    const jubjubFactoryFactory = new JubjubFactory__factory(factoryLibs, deployer);
    jubjubFactory = await jubjubFactoryFactory.deploy();
    setJubjubFactory(jubjubFactory);
    toast({
      title: "JubjubFactory Deployed",
      description: jubjubFactory.address,
      status: "success",
      duration: 9000,
      isClosable: true,
    });
    await new Promise((resolve) => setTimeout(resolve, 10000));
    console.log("waiting for tx to be mined");
    console.log(jubjubFactory);
  };
  const handleCheckDeploy = async () => {
    const deployer = provider.getSigner(address);
    let SimpleHackathonFactory: SimpleHackathon__factory;
    let simpleHackathon: SimpleHackathon;

    let JubjubTemplateFactory: Jubjub__factory;
    let libs: JubjubLibraryAddresses;
    libs = {
      ["contracts/poseidon/PoseidonT6.sol:PoseidonT6"]: poseidonT6.address,
      ["contracts/poseidon/PoseidonT5.sol:PoseidonT5"]: poseidonT5.address,
      ["contracts/poseidon/PoseidonT3.sol:PoseidonT3"]: poseidonT3.address,
      ["contracts/poseidon/PoseidonT4.sol:PoseidonT4"]: poseidonT4.address,
    };
    JubjubTemplateFactory = new Jubjub__factory(libs, deployer);

    SimpleHackathonFactory = new SimpleHackathon__factory(deployer);
    simpleHackathon = await SimpleHackathonFactory.deploy(99, address);
    await simpleHackathon.deployed();

    //NOTE: Deploy Jubjub Instance
    const tx = await jubjubFactory.deployJubjub("0xDEADBEEF00000000000000000000000000000000000000000000000000000000", simpleHackathon.address, simpleHackathon.address);
    console.log(tx);
    await tx.wait();
    // sunchronous timeout to wait for the tx to be mined
    
    await new Promise((resolve) => setTimeout(resolve, 10000));
    console.log("waiting for tx to be mined");
    const jubjubInstance = JubjubTemplateFactory.attach(await jubjubFactory.currentJubjub());
    setJubjub(jubjubInstance);

    console.log(jubjubInstance);
    console.log(await jubjubInstance.hash(0, 0));
  };

  // const [jubjubFactory, setjubjubFactory] = React.useState("");
  // const handleT4Deploy = () => {
  //   toast({
  //     title: "PoseidonT4 Deployed",
  //     description: poseidonT4,
  //     status: "success",
  //     duration: 9000,
  //     isClosable: true,
  //   });
  //   setT3("deployed");
  // };
  return (
    <Flex
      as="main"
      h="full"
      flex={1}
      borderRightColor={color}
      borderRightWidth={1}
      overflowY={"scroll"}
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
      <VStack spacing={0} w="full">
        <Container h="full" w="full" maxWidth="container.sm">
          <VStack mt={10} spacing={4} h="full" alignItems="flex-start">
            <Heading w="100%" textAlign={"center"} fontWeight="normal" mb="2%">
              Deploy
            </Heading>
            <VStack>
              <Button
                onClick={async () => {
                  setStep(13)
                  setLoading(true);
                  await handleT2Deploy();
                  setLoading(false);
                  setStep(1);
                }}
                isDisabled={step !== 0}
                variant="porto"
                w="100%">
                Deploy Poseidon Libs
              </Button>
              <Button

                onClick={async () => {
                  setStep(13)
                  setLoading(true);
                  await handleFactoryDeploy();
                  setLoading(false);
                  setStep(2);
                }}
                isDisabled={step !== 1}
                variant="porto"
                w="100%">
                Deploy Admin Contract
              </Button>
              <Button
                onClick={async () => {
                  setStep(13)
                  setLoading(true);
                  await handleCheckDeploy();
                  setLoading(false);
                  setStep(3);
                }}
                isDisabled={step !== 2}
                variant="porto"
                w="100%">
                Deploy Round (but dont start voting)
              </Button>
              <Button
                onClick={async () => {
                  setStep(step + 1);
                }}
                isDisabled={step !== 99}
                variant="porto"
                w="100%">
                Start Voting (Disabled)
              </Button>
              <VStack>
                {/* //loading prompt */}
                {loading ? <Heading>Processing transactions...</Heading> : <></>}
              
                <Text>Current PoseidonT3: {poseidonT3?.address}</Text>
                <Text>Current PoseidonT4: {poseidonT4?.address}</Text>
                <Text>Current PoseidonT5: {poseidonT5?.address}</Text>
                <Text>Current PoseidonT6: {poseidonT6?.address}</Text>
                <Text>Current JubjubFactory: {jubjubFactory?.address}</Text>
                <Text>Current Jubjub: {jubjub?.address}</Text>
              </VStack>
            </VStack>
          </VStack>
        </Container>
      </VStack>
    </Flex>
  );
};
