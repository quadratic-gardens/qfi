import React from "react";
import { Flex, Text } from "@chakra-ui/react";
import { useTranslation } from 'react-i18next';


export const HowItWorks = () => {
  const { t } = useTranslation();

  return (
    <Flex as="main" h="full" flex={1} borderRightColor="gray.100" borderRightWidth={1}>
      <Text>{t("How it Works")}</Text>
    </Flex>
  );
};


