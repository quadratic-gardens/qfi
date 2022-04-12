import React, { Suspense } from "react";
import "@fontsource/tinos";
import { ChakraProvider, VStack, Container, Stack, HStack } from "@chakra-ui/react";
import { Logo, theme } from "@qfi/ui";

const Nav = React.lazy(() => import("./components/Nav"));
const LandingPage = React.lazy(() => import("./LandingPage"));

const LoadingComponent = () => {
  return (
    <Stack
      direction={{ base: "row", md: "row" }}
      justifyContent="center"
      alignItems={{ base: "center", md: "center" }}
      w="full"
      minH="500px">
      <HStack alignItems={"center"} spacing={[1, 2, 2]}>
        <Logo h={[100, 200, 200]} />
      </HStack>
    </Stack>
  );
};

export const App = () => {
  return (
    <ChakraProvider theme={theme}>
      <Container maxWidth={["360px", "490px", "container.md", "container.lg"]} py={10}>
        <VStack spacing={[14, 20, 24]} alignItems="stretch">
          <Suspense fallback={<LoadingComponent />}>
            <Nav />
            <LandingPage />
          </Suspense>
        </VStack>
      </Container>
    </ChakraProvider>
  );
};
