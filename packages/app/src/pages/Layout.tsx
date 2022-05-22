import React from "react";
import {
  HStack,
  Flex
} from "@chakra-ui/react";
import { Outlet } from "react-router-dom";
import { LayoutProps } from "../propTypes";
import { SideNav } from "../components/prague/SideNav";
import { Quickstart } from "../components/prague/Quickstart";
import { SettingsDrawer } from "../components/prague/Settings";

export const Layout = ({ isOpen, onSettingsOpen, onClose }: LayoutProps) => {
  return (
    <HStack h="100vh" spacing={0}>
      <Flex as="nav" h="full" maxW={16} w="full" bg="gray.100">
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
