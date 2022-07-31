import React from "react";
import { VStack, Tooltip, IconButton, Icon, useColorModeValue, HStack, Box, Button, Link as ExternalLink } from "@chakra-ui/react";
import { MdDashboard, MdSettings } from "react-icons/md";
import { HiCollection, HiQuestionMarkCircle } from "react-icons/hi";
import { Link, useSearchParams } from "react-router-dom";
import { SideNavProps } from "../../propTypes";
import { ColorModeSwitcher } from "../ColorModeSwitcher";
import { useTranslation } from 'react-i18next';

export const SideNav = ({ onSettingsOpen, onGuideOpen }: SideNavProps) => {
  const backgroundColor = useColorModeValue("gray.100", "background.1000");
  let [searchParams] = useSearchParams();
  const { t } = useTranslation();

  return (
    <div style={{ display: 'flex', paddingTop: 84 }}>
      <VStack zIndex={9} p={4} justifyContent="space-between" alignItems="center" w="full" bg={backgroundColor}>
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
        <VStack>
          <Tooltip label={t("Guide")} placement="right">
            <IconButton
              onClick={onGuideOpen}
              color="gray.500"
              icon={<Icon as={HiQuestionMarkCircle} boxSize={5} />}
              aria-label="Guide"
            />
          </Tooltip>
          <Tooltip label={t("Settings")} placement="right">
            <IconButton
              onClick={onSettingsOpen}
              color="gray.500"
              icon={<Icon as={MdSettings} boxSize={5} />}
              aria-label="Settings"
            />
          </Tooltip>
        </VStack>
      </VStack>
    </div>
  );
};

export const Navbar = ({ onSettingsOpen, onGuideOpen }: SideNavProps) => {
  const backgroundColor = useColorModeValue("gray.100", "background.0");
  let [searchParams] = useSearchParams();

  return (
    <HStack
      zIndex={9}
      position={"fixed"}
      top={0}
      left={0}
      bg={backgroundColor}
      p={4}
      justifyContent="space-between"
      alignItems="center"
      w="full"
      minH={"32px"}>
      <IconButton
        bg={backgroundColor}
        to={`/?${searchParams.toString()}`}
        as={Link}
        icon={<img style={{ height: 20 }} src="eth-latam-full-logo.svg" alt="ETH LATAM" />}
        aria-label="Home"
      />
      
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
        <Tooltip label="5% of ticket sales go toward the QF pool" placement="right">
          <Box
            sx={{
              height: "50px",
              boxSizing: "border-box",
              color: "white",
              justifyContent: "center",
              alignItems: "center",
              borderRadius: "50%",
              border: "0.8px solid rgb(53, 75, 55)",
              transition: "all 0s linear",
              _hover: { transform: "rotate(6.41deg)", scale: "1" },

              transform: "rotate(-6.41deg)",
              width: "122px",
            }}>
            {" "}
            <Button
              as={ExternalLink}
              variant={"barcelona"}
              fontSize={{ base: "lg", xl: "xl" }}
              href="https://doingud.com/creation/0xe570d586fbeb0dc23c46bfcf047ec3e46e88e5a7000000000023"
              isExternal>
              Tickets!
            </Button>
          </Box>
        </Tooltip>
      </HStack>
    </HStack>
  );
};
