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
  Text
} from "@chakra-ui/react";
import { MdDashboard } from "react-icons/md";
import { HiCollection, HiQuestionMarkCircle } from "react-icons/hi";
import { Link, useSearchParams } from "react-router-dom";
import { SideNavProps } from "../../propTypes";
import { useTranslation } from "react-i18next";

export const SideNav = ({ onGuideOpen }: SideNavProps) => {
  const backgroundColor = useColorModeValue("gray.100", "background.1000");
  let [searchParams] = useSearchParams();
  const { t } = useTranslation();

  return (
    <div style={{ display: "flex", paddingTop: 40 }}>
      <VStack
        zIndex={9}
        p={4}
        justifyContent="space-between"
        alignItems="center"
        w="full"
        bg={backgroundColor}
      >
        <VStack>
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
  const backgroundColor = useColorModeValue("gray.100", "background.0");

  let [searchParams] = useSearchParams();

  const handleLangChange = (langVal: string) => {
    i18n.changeLanguage(langVal);
    setSelectedLang(langVal);
  };

  return (
    <HStack
      zIndex={9}
      position="fixed"
      top={0}
      left={0}
      bg={backgroundColor}
      justifyContent="space-between"
      alignItems="center"
      w="full"
      minH="32px"
    >
      <IconButton
        bg={backgroundColor}
        to={`/?${searchParams.toString()}`}
        as={Link}
        p={4}
        icon={
          <img
            style={{ height: 20 }}
            src="eth-latam-full-logo.svg"
            alt="ETH LATAM"
          />
        }
        aria-label="Home"
      />

      <HStack>
        <Select
          bg={backgroundColor}
          color="black"
          value={selectedLang}
          fontFamily="NeuePixelGrotesk"
          onChange={({ target: { value } }) => handleLangChange(value)}
          w={20}
          _focus={{ border: "none" }}
        >
          <option
            value="en"
            style={{
              background: backgroundColor,
              fontFamily: "NeuePixelGrotesk",
              fontWeight: "bold",
            }}
          >
            EN
          </option>
          <option
            value="es"
            style={{
              background: backgroundColor,
              fontFamily: "NeuePixelGrotesk",
              fontWeight: "bold",
            }}
          >
            ES
          </option>
        </Select>

        <ExternalLink
          display="flex"
          variant="ethLatamGreen"
          fontSize={{ base: "lg" }}
          w={170}
          h="40px"
          href="https://www.eventbrite.com/e/ethlatam-at-buenos-aires-tickets-374680147407"
          isExternal
        >
          {t("GET TICKETS!")}
        </ExternalLink>
      </HStack>
    </HStack>
  );
};
