import React from "react";
import { ChakraProvider, Text, useDisclosure } from "@chakra-ui/react";
import { theme } from "@qfi/ui";
import { Route, Routes } from "react-router-dom";
import { HowItWorks } from "./pages/HowItWorks";
import { Admin } from "./pages/Admin";
import { Project } from "./pages/Project";
import { Projects } from "./pages/Projects";
import { Ballot } from "./pages/Ballot";
import { Home } from "./pages/Home";
import { Layout } from "./pages/Layout";

export const App = () => {
  const { isOpen, onOpen: onSettingsOpen, onClose } = useDisclosure();
  return (
    <ChakraProvider theme={theme}>
      <Routes>
        <Route path="/" element={<Layout isOpen={isOpen} onSettingsOpen={onSettingsOpen} onClose={onClose} />}>
          <Route index element={<Home isOpen={isOpen} onSettingsOpen={onSettingsOpen} />} />
          <Route path="ballot" element={<Ballot />} />
          <Route path="projects" element={<Projects />}></Route>
          <Route path="projects/:projectId" element={<Project />} />
          <Route path="howitworks" element={<HowItWorks />} />
          <Route path="admin" element={<Admin />} />
          <Route path="*" element={<Text> 404 </Text>} />
        </Route>
      </Routes>
    </ChakraProvider>
  );
};
