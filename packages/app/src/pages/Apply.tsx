import {
    Container,
    VStack,
    Grid,
    GridItem,
    Flex,
    Text,
    Heading,
    Button,
    useColorModeValue,
    useToast,
    FormControl,
    FormHelperText,
    Input,
    Tooltip,
    useMediaQuery,
    AccordionPanel,
    HStack,
    AccordionIcon,
    AccordionItem,
    Accordion,
    AccordionButton,
    UnorderedList,
    ListItem,
    Alert,
    AlertIcon,
} from "@chakra-ui/react";
import React from "react";
import { useTranslation, Trans } from "react-i18next";


export const Apply = () => {
    const { t, i18n } = useTranslation();
    const color = useColorModeValue("gray.800", "gray.700");
    const [isViewportMd] = useMediaQuery("(min-width: 768px)");
    const currLang = i18n.language;
    const backgroundColor = useColorModeValue("#FAFAFA", "#222222");

    const headerYourBallotLogo = {
        en: "project_submission_EN.svg",
        es: "project_submission_ES.svg",
    };

    return (
        <Flex
            as="main"
            h="full"
            w="full"
            background="black"
            alignItems="center"
            flexDir="column"
            borderRightColor={color}
            borderRightWidth={1}
            overflowY="scroll"
            sx={{
                scrollbarColor: "green",
                "::-webkit-scrollbar": {
                    width: "0px",
                },

                "::-webkit-scrollbar-track": {
                    boxShadow: "inset 0 0 0px grey",
                    borderRadius: "0px",
                },

                "::-webkit-scrollbar-thumb": {
                    background: "transparent",
                    borderRadius: "0px",
                },
            }}
        >
            <Container style={{ marginTop: 64, maxWidth: 1042 }}>
                {isViewportMd ? (
                    <Heading maxW={{ md: 595, base: 250 }}>
                        <img src={headerYourBallotLogo[currLang]} alt={t("PROJECT SUBMISSION")} />
                    </Heading>
                ) : (
                    <Flex w="full" alignItems="center" flexDirection="column">
                        <Heading maxW={{ md: 595, base: 250 }}>
                            <img
                                src={headerYourBallotLogo[currLang]}
                                alt={t("PROJECT SUBMISSION")}
                            />
                        </Heading>
                    </Flex>
                )}
                <VStack
                    spacing={3}
                    py={8}
                    alignItems={{ base: "center", md: "flex-start" }}
                    justifyContent={{ base: "center", md: "space-between" }}
                    w="full"
                >
                    {isViewportMd ? (
                        <Flex w="full" alignItems="center" justifyContent="space-between">
                            <Heading textAlign={{ base: "center" }}>
                                {t("ELIGIBILITY CRITERIA")}
                            </Heading>
                        </Flex>
                    ) : (
                        <Heading textAlign={{ base: "center" }}>
                            {t("ELIGIBILITY CRITERIA")}
                        </Heading>
                    )}
                    <Grid
                        w="full"
                        minH={180}
                        mt={8}
                        gridTemplateColumns={{
                            base: "repeat(1, minmax(0, 1fr))",
                            md: "repeat(10, minmax(0, 1fr))",
                        }}
                        templateRows={{
                            base: "repeat(1, minmax(0, 1fr))",
                            md: "repeat(2, minmax(0, 1fr))",
                        }}
                    >
                        <GridItem colSpan={{ base: 1, md: 8 }} rowSpan={{ md: 2 }}>
                            <Text textAlign="justify">
                                {t("Apply for the quadratic funding round with your project! If you are building tools for the Ethereum ecosystem or L2, if you are involved in Ethereum community education, if you do research or other activities for the Ethereum ecosystem, don't hesitate to apply!")}
                            </Text>
                            <GridItem colSpan={{ base: 1, md: 8 }} rowSpan={{ md: 2 }}>
                                <Accordion mb={10} mt={10} allowToggle w={"full"} bg={backgroundColor}>
                                    <AccordionItem border="none" w={"full"}>
                                        <HStack
                                            as={AccordionButton}
                                            w={"full"}
                                            justifyContent={"space-between"}
                                            py={4}
                                        >
                                            <Heading size="md">{t("Remember")}</Heading>
                                            <AccordionIcon></AccordionIcon>
                                        </HStack>
                                        <AccordionPanel pb={4}>
                                            <Text textAlign="justify" fontSize="md">
                                                <UnorderedList>
                                                    <ListItem mb={4}>
                                                        {t(
                                                            "The project needs to be based, or working with local communities, or in the surroundings of Porto."
                                                        )}
                                                    </ListItem>
                                                    <ListItem mb={4}>
                                                        {t(
                                                            "Public goods focused on Web3 / impact DAOs / decentralized projects can also participate."
                                                        )}
                                                    </ListItem>
                                                    <ListItem mb={4}>
                                                        {t(
                                                            "Projects are required to have a focus on public goods or social impact, so they must have the quality of non-rivalry (the use by one individual does not prevent the use of others) and must be non-exclusive (any can access or use it). Read more about public goods"
                                                        )}{" "}
                                                        <a
                                                            href={
                                                                "http://www.linfo.org/public_good.html"
                                                            }
                                                            rel="noreferrer"
                                                            target="_blank"
                                                        >
                                                            {t("here")}
                                                        </a>.
                                                    </ListItem>
                                                    <ListItem mb={4}>
                                                        {t(
                                                            "Public goods can be one of the various impacts of the project but it must explicitly mention how the funds will be used if they’re received. Example: Funding a free Ethereum course for a high school in Mendoza."
                                                        )}
                                                    </ListItem>
                                                    <ListItem mb={4}>
                                                        {t(
                                                            "Projects are not required to be web3 or crypto-native, but will need to submit an Ethereum wallet that they control as part of the application process. We encourage the use of self-custody solutions but any valid Ethereum address will be accepted."
                                                        )}
                                                    </ListItem>
                                                </UnorderedList>
                                            </Text>
                                        </AccordionPanel>
                                    </AccordionItem>
                                </Accordion>
                            </GridItem>
                        </GridItem>
                        <GridItem colSpan={{ base: 1, md: 8 }} rowSpan={{ md: 2 }}>
                            {isViewportMd ? (
                                <Flex w="full" alignItems="center" justifyContent="space-between">
                                    <Heading textAlign={{ base: "center" }}>
                                        {t("What does it mean to enroll as a beneficiary?")}
                                    </Heading>
                                </Flex>
                            ) : (
                                <Heading textAlign={{ base: "center" }}>
                                    {t("What does it mean to enroll as a beneficiary?")}
                                </Heading>
                            )}
                            <Text textAlign="justify" mb={4}>
                                <Trans i18nKey="Submitting your project makes you eligible to receive funds provided for the QF initiative at Porto, <strong>but does not guarantee funding</strong>. There will be a filter to the initiatives presented carried out by a group of volunteers from QF Porto to determine that the initiatives are in accordance with the requirements and that they’re initiatives that do not go against the law." />
                            </Text>
                            <Text textAlign="justify" mb={4}>
                                {t("This financing is a donation and has no associated reports, returns, or obligations on the part of the project. How much each project receives will be decided by Porto attendees who vote during the event. If you are unsure about this, feel free to contact the team at sponsors@Porto.org.")}
                            </Text>
                            <Text textAlign="justify" mb={4}>
                                {t("This donation will be sent in stablecoin (DAI) via Polygon to the wallet entered during the registration process. Once the funds are sent the transaction is irreversible, so you must be 100% sure of the address you will enter and who has control of the wallet/private keys. If you are unsure about this, feel free to contact the team at the following email address sponsors@Porto.org.")}
                            </Text>
                            <Alert status='warning' mb={4}>
                                <AlertIcon />
                                <Text textAlign="justify" fontSize={12}>
                                    <Trans i18nKey="<strong>Please note that the team will NEVER ask you to share your wallet private keys or seed phrase, we will NEVER write to you on social media or other channels, and we will not send you a private key or seed phrase for you to use.</strong> These are common scam tactics and we want to prevent these bad actors from stealing your donated funds." />
                                </Text>
                            </Alert>

                            <Text textAlign="justify" mb={4}>
                                <Trans i18nKey="Unfortunately, the projects or teams will not be able to appear on stage during Porto, but we do empower them to use the hashtag #PortoQF in your social media posts so that you show and tell attendees about your impact on public goods." />
                            </Text>
                            <Text textAlign="justify" mb={4}>
                                {t("If you post on Twitter, tag @Porto and use the corresponding hashtags to achieve greater reach. You can also post within the")}{" "}
                                <a href={"https://t.me/Porto"} rel="noreferrer" target="_blank">
                                    {t("Porto Telegram group")}
                                </a>{" "}
                                {t("using the hashtag #QF in your post.")}
                            </Text>
                        </GridItem>
                        <GridItem colSpan={{ base: 1, md: 8 }} rowSpan={{ md: 2 }}>
                            <Accordion mb={10} mt={10} allowToggle w={"full"} bg={backgroundColor}>
                                <AccordionItem border="none" w={"full"}>
                                    <HStack
                                        as={AccordionButton}
                                        w={"full"}
                                        justifyContent={"space-between"}
                                        py={4}
                                    >
                                        <Heading size="md">{t("What do you need to do to sign up?")}</Heading>
                                        <AccordionIcon></AccordionIcon>
                                    </HStack>
                                    <AccordionPanel pb={4}>
                                        <Text textAlign="justify" fontSize="md">
                                            <UnorderedList>
                                                <ListItem mb={4}>
                                                    {t(
                                                        "The registration deadline is August 11th at 11:55 pm (Porto time)."
                                                    )}
                                                </ListItem>
                                                <ListItem mb={4}>
                                                    {t(
                                                        "Submit your project using this form:"
                                                    )}: <a
                                                        href={
                                                            "https://forms.gle/JnHUU5suGk7JK5LH6"
                                                        }
                                                        rel="noreferrer"
                                                        target="_blank"
                                                    >
                                                        https://forms.gle/JnHUU5suGk7JK5LH6
                                                    </a>.
                                                </ListItem>
                                                <ListItem mb={4}>
                                                    {t(
                                                        "The Porto team will contact you if they need to clarify something or if they need more details."
                                                    )}
                                                </ListItem>
                                                <ListItem mb={4}>
                                                    {t(
                                                        "If you have any questions during the application process, send an email to sponsors@Porto.org before the submission deadline."
                                                    )}
                                                </ListItem>
                                            </UnorderedList>
                                        </Text>
                                    </AccordionPanel>
                                </AccordionItem>
                            </Accordion>
                        </GridItem>
                    </Grid>
                </VStack>
            </Container >
        </Flex >
    );
};
