import "@fontsource/tinos";
import { ChakraProvider, VStack, Container } from "@chakra-ui/react";
import { theme } from "@qfi/ui";
import { LandingPage } from "./LandingPage";
import { Nav } from "./components/Nav";

export const App = () => (
  <ChakraProvider theme={theme}>
    <Container maxWidth={["360px", "490px", "container.md", "container.lg"]} py={10}>
      <VStack spacing={[14, 20, 24]} alignItems="stretch">
        <Nav />
        <LandingPage />
      </VStack>
    </Container>
  </ChakraProvider>
);


