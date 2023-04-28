import React, { useState } from "react";
import { HStack, IconButton, Icon, Select, Tooltip, useColorModeValue, VStack, Text, Button } from "@chakra-ui/react";

import { MdDashboard, MdSettings } from "react-icons/md";
import { HiCollection, HiQuestionMarkCircle } from "react-icons/hi";
import { Link, useSearchParams } from "react-router-dom";
import { SideNavProps } from "../../propTypes";
import { useTranslation } from "react-i18next";
import { Logo } from "../Hero";
import { ColorModeSwitcher } from "../ColorModeSwitcher";

export const SideNav = ({ onGuideOpen }: SideNavProps) => {
  const backgroundColor = useColorModeValue("gray.100", "#000000");
  let [searchParams] = useSearchParams();

  return (
    <VStack zIndex={1} p={4} justifyContent="space-between" alignItems="center" w="full" bg={backgroundColor}>
      <VStack>
        <IconButton bg={backgroundColor} to={`/?${searchParams.toString()}`} as={Link} mb={6} icon={<Logo />} aria-label="Home" />
{/* 
        <Tooltip label="Ballot" placement="right">
          <IconButton to={`/ballot?${searchParams.toString()}`} as={Link} color="gray.500" icon={<Icon as={MdDashboard} boxSize={4} />} aria-label="Ballot" />
        </Tooltip> */}
        {/* <Tooltip label="Projects" placement="right">
          <IconButton to={`/projects?${searchParams.toString()}`} as={Link} color="gray.500" icon={<Icon as={HiCollection} boxSize={4} />} aria-label="Projects" />
        </Tooltip> */}
       
        <Tooltip label="About" placement="right">
          <IconButton to={`/about?${searchParams.toString()}`} as={Link} color="gray.500" icon={<Icon as={MdDashboard } boxSize={6} />} aria-label="About" />
        </Tooltip>
        {/* <Tooltip label="Guide" placement="right">
          <IconButton
            onClick={onGuideOpen}
            color="gray.500"
            icon={<Icon as={HiCollection} boxSize={5} />}
            aria-label="Guide"
          />
        </Tooltip> */}


        <ColorModeSwitcher color="gray.500" aria-label="dark mode" h="50px" borderRadius={useColorModeValue("3px", "8px")} />
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
      <VStack></VStack>

    </VStack>
  );
};

export const Navbar = ({ onGuideOpen }: SideNavProps) => {
  const backgroundColor = useColorModeValue("gray.100", "#000000");
  const color = useColorModeValue("gray.800", "#FDFDFD");

  let [searchParams] = useSearchParams();
  const { i18n, t } = useTranslation();
  const [selectedLang, setSelectedLang] = useState<string>(i18n.language);

  const handleLangChange = (langVal: string) => {
    i18n.changeLanguage(langVal);
    setSelectedLang(langVal);
  };

  return (
    <HStack zIndex={1} position={"fixed"} top={0} left={0} bg={backgroundColor} p={4} justifyContent="space-between" alignItems="center" w="full" minH={"32px"}>
      <HStack>
        {/* <IconButton
          w={"40px"}
          bg={backgroundColor}
          to={`/?${searchParams.toString()}`}
          as={Link}
          icon={<Logo />}
          aria-label="Home"
        /> */}

        {/* 
            <Tooltip label="Admin" placement="right">
              <IconButton
                to="/admin"
                as={Link}
                color="gray.500"
                icon={<Icon as={HiBriefcase} boxSize={4} />}
                aria-label="Admin"
              />
            </Tooltip> */}
      </HStack>

      <HStack>
        {/* <Tooltip label="..." placement="right"> */}
        <Tooltip label="Guide" placement="right">
          <IconButton
            onClick={onGuideOpen}
            color="gray.500"
            icon={<Icon as={HiQuestionMarkCircle} boxSize={5} />}
            aria-label="Guide"
          />
        </Tooltip>
        <Button to={`/ballot?${searchParams.toString()}`} as={Link} height="50px" boxSizing="border-box" variant={"amsterdam"} fontSize={{ base: "lg", xl: "xl" }}>
            Vote
          </Button>
         

  
        {/* </Tooltip> */}
        <Select bg={backgroundColor} color={color} borderColor={color} borderRadius={useColorModeValue("3px", "8px")} value={selectedLang} onChange={({ target: { value } }) => handleLangChange(value)} w={20} h="50px" _focus={{ border: "none" }}>
          <option
            value="en"
            style={{
              background: backgroundColor,
              fontWeight: "bold",
            }}>
            EN
          </option>
          <option
            value="pt"
            style={{
              background: backgroundColor,
              fontWeight: "bold",
            }}>
            PT
          </option>
        </Select>
      </HStack>
    </HStack>
  );
};
