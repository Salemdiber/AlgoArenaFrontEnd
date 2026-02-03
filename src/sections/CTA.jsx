import {
    Box,
    Container,
    Heading,
    Text,
    Button,
    VStack,
    HStack,
} from '@chakra-ui/react';

const CTA = () => {
    return (
        <Box
            id="community"
            as="section"
            py={20}
            bgGradient="linear(to-br, gray.900, gray.800, cyan.900)"
            position="relative"
            overflow="hidden"
        >
            {/* Background Blur Effect */}
            <Box position="absolute" inset={0} opacity={0.2}>
                <Box
                    position="absolute"
                    top="50%"
                    left="50%"
                    transform="translate(-50%, -50%)"
                    w="96"
                    h="96"
                    bg="brand.500"
                    borderRadius="full"
                    filter="blur(64px)"
                />
            </Box>

            <Container maxW="4xl" position="relative" zIndex={10} textAlign="center">
                <VStack spacing={8}>
                    <Heading
                        as="h2"
                        fontSize={{ base: '4xl', sm: '5xl', lg: '6xl' }}
                        fontFamily="heading"
                        fontWeight="bold"
                        color="gray.100"
                    >
                        Enter the Arena.
                    </Heading>

                    <Text fontSize={{ base: 'xl', sm: '2xl' }} color="gray.300" maxW="2xl">
                        Master algorithms. Compete globally. Build elegant code.
                    </Text>

                    <HStack spacing={4} flexWrap="wrap" justify="center">
                        <Button variant="primary" size="lg" px={8} py={8} fontSize="lg">
                            Create Free Account
                        </Button>
                        <Button variant="secondary" size="lg" px={8} py={8} fontSize="lg">
                            View Leaderboard
                        </Button>
                    </HStack>
                </VStack>
            </Container>
        </Box>
    );
};

export default CTA;
