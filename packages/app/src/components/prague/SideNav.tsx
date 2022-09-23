import React, { useState } from "react";
import {
  HStack,
  IconButton,
  Icon,
  Link as ExternalLink,
  Select,
  Tooltip,
  useColorModeValue,
  VStack,
  Text,
  Button
} from "@chakra-ui/react";
import { MdDashboard } from "react-icons/md";
import { HiCollection, HiQuestionMarkCircle } from "react-icons/hi";
import { Link, useSearchParams } from "react-router-dom";
import { SideNavProps } from "../../propTypes";
import { useTranslation } from "react-i18next";
import { ColorModeSwitcher } from "../ColorModeSwitcher";

export const SideNav = ({ onGuideOpen }: SideNavProps) => {
  const backgroundColor = useColorModeValue("gray.100", "rgb(27, 34, 58)");
  let [searchParams] = useSearchParams();
  const { t } = useTranslation();

  return (
    <div style={{ display: "flex", paddingTop: 40 }}>
      <VStack
        zIndex={1}
        p={4}
        justifyContent="space-between"
        alignItems="center"
        w="full"
        bg={backgroundColor}
      >
        <VStack py={8}>
          <Tooltip label={t("Ballot")} placement="right">
            <IconButton
              to={`/ballot?${searchParams.toString()}`}
              as={Link}
              color="gray.500"
              icon={<Icon as={MdDashboard} boxSize={4} />}
              aria-label="Ballot"
            />
          </Tooltip>
          <Tooltip label={t("Projects")} placement="right">
            <IconButton
              to={`/projects?${searchParams.toString()}`}
              as={Link}
              color="gray.500"
              icon={<Icon as={HiCollection} boxSize={4} />}
              aria-label="Projects"
            />
          </Tooltip>
        </VStack>
        <VStack>
          <Tooltip label={t("Guide")} placement="right">
            <IconButton
              onClick={onGuideOpen}
              color="gray.500"
              icon={<Icon as={HiQuestionMarkCircle} boxSize={5} />}
              aria-label="Guide"
            />
          </Tooltip>
        </VStack>
      </VStack>
    </div>
  );
};

export const Navbar = () => {
  const { i18n, t } = useTranslation();
  const [selectedLang, setSelectedLang] = useState<string>(i18n.language);
  const backgroundColor = useColorModeValue("gray.100", "rgb(27, 34, 58)");

  let [searchParams] = useSearchParams();

  const handleLangChange = (langVal: string) => {
    i18n.changeLanguage(langVal);
    setSelectedLang(langVal);
  };

  return (
    <HStack
    py={3}
      zIndex={9}
      position="fixed"
      top={0}
      left={0}
      bg={backgroundColor}
      justifyContent="space-between"
      alignItems="center"
      w="full"
      minH="40px"
    >
      <IconButton
        bg={backgroundColor}
        to={`/?${searchParams.toString()}`}
        as={Link}
        mx={4}
        icon={
          <img
            style={{ height: 40 }}
            src="logo.png"
            alt="chain.tw"
          />
        }
        aria-label="Home"
      />

      <HStack px={2}>
        <Select
          value={selectedLang}
          fontFamily="Helvetica"
          onChange={({ target: { value } }) => handleLangChange(value)}
          w={20}
          _focus={{ border: "none" }}
        >
          <option
            value="tw"
            style={{
              background: backgroundColor,
              fontFamily: "Helvetica",
              fontWeight: "bold",
            }}
          >
            TW
          </option>
          <option
            value="en"
            style={{
              background: backgroundColor,
              fontFamily: "Helvetica",
              fontWeight: "bold",
            }}
          >
            EN
          </option>
          <option
            value="es"
            style={{
              background: backgroundColor,
              fontFamily: "Helvetica",
              fontWeight: "bold",
            }}
          >
            ES
          </option>
        </Select>

        {/* <Button
              as={ExternalLink}
              variant={"magik"}
              fontSize={{ base: "lg", xl: "xl" }}
              href=""
              isExternal>
              Tickets!
            </Button> */}

        <ColorModeSwitcher color="gray.500" aria-label="dark mode" />
      </HStack>
    </HStack>
  );
};
