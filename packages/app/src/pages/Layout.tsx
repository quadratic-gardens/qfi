import React from "react";
import {
  HStack,
  Flex,
  useColorModeValue
} from "@chakra-ui/react";
import { Outlet } from "react-router-dom";
import { LayoutProps } from "../propTypes";
import { SideNav } from "../components/prague/SideNav";
import { Quickstart } from "../components/prague/Quickstart";
import { SettingsDrawer } from "../components/prague/Settings";
import { ColorModeSwitcher } from "../components/ColorModeSwitcher";
export const Layout = ({ isOpen, onSettingsOpen, onClose }: LayoutProps) => {
  const backgroundColor = useColorModeValue("gray.100", "gray.700");
  return (
    <HStack h="100vh" spacing={0}>
      <ColorModeSwitcher position="absolute" top={0} right={0} m={4} zIndex={1} />
      <Flex as="nav" h="full" maxW={16} w="full" bg={backgroundColor}>
        <SideNav onSettingsOpen={onSettingsOpen} />
      </Flex>
      <Flex
        as="aside"
        display={{ base: "none", xl: "flex" }}
        h="full"
        maxW={{ lg: "md" }}
        w="full"
        position={"relative"}
        overflow={"hidden"}>
          
        <Quickstart />
        <SettingsDrawer isOpen={isOpen} onClose={onClose} />
      </Flex>
      <Outlet />
    </HStack>
  );
};
