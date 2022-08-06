import React from "react";
import { ChakraProvider, Text, useDisclosure } from "@chakra-ui/react";
import { theme, Fonts } from "@qfi/ui";
import { Route, Routes } from "react-router-dom";

import { Admin } from "./pages/Admin";
import { Project } from "./pages/Project";
import { Projects } from "./pages/Projects";
import { Ballot } from "./pages/Ballot";
import { Home } from "./pages/Home";
import { Layout } from "./pages/Layout";

export const App = ({shuffledProjects}) => {
  const { isOpen: isSettingsOpen, onOpen: onSettingsOpen, onClose: onSettingsClose } = useDisclosure();
  const { isOpen: isGuideOpen, onOpen: onGuideOpen, onClose: onGuideClose } = useDisclosure();

  return (
    <ChakraProvider theme={theme}>
      <Fonts />
      <Routes>
        <Route
          path="/"
          element={
            <Layout
              onGuideOpen={onGuideOpen}
              onGuideClose={onGuideClose}
              isGuideOpen={isGuideOpen}
            />
          }>
          <Route
            index
            element={
              <Home
                onGuideOpen={onGuideOpen}
                isGuideOpen={isGuideOpen}
              />
            }
          />
          <Route path="ballot" element={<Ballot />} />
          <Route path="projects" element={<Projects shuffledProjects={shuffledProjects}/>}></Route>
          <Route path="projects/:projectId" element={<Project />} />
          <Route path="admin" element={<Admin />} />
          <Route path="*" element={<Text> 404 </Text>} />
        </Route>
      </Routes>
    </ChakraProvider>
  );
};
