import {
    Box,
    Container,
    Heading,
    Text,
    Grid,
    VStack,
} from '@chakra-ui/react';

const statsData = [
    { value: '12,450', label: 'Battles Completed', color: 'brand.400', bg: 'rgba(34, 211, 238, 0.05)' },
    { value: '3,200', label: 'Active Coders', color: 'green.400', bg: 'rgba(72, 187, 120, 0.05)' },
    { value: '1,050', label: 'Daily AI Challenges', color: 'yellow.400', bg: 'rgba(236, 201, 75, 0.05)' },
    { value: '98%', label: 'Success Rate', color: 'purple.400', bg: 'rgba(159, 122, 234, 0.05)' },
];

const Stats = () => {
    return (
        <Box id="leaderboards" as="section" py={20} bg="rgba(31, 41, 55, 0.3)">
            <Container maxW="7xl">
                <VStack spacing={16}>
                    <VStack spacing={4} textAlign="center">
                        <Heading as="h2" size="2xl" color="gray.100" fontFamily="heading">
                            Join the Arena
                        </Heading>
                        <Text fontSize="xl" color="gray.300">
                            Thousands of developers competing daily
                        </Text>
                    </VStack>

                    <Grid templateColumns={{ base: '1fr', sm: 'repeat(2, 1fr)', lg: 'repeat(4, 1fr)' }} gap={6} width="100%">
                        {statsData.map((stat, index) => (
                            <Box
                                key={index}
                                bg="gray.900"
                                borderRadius="16px"
                                p={8}
                                textAlign="center"
                                border="1px solid"
                                borderColor="gray.700"
                                boxShadow="custom"
                                position="relative"
                                overflow="hidden"
                            >
                                <Box position="absolute" inset={0} bg={stat.bg} filter="blur(30px)" />
                                <Box position="relative" zIndex={10}>
                                    <Text fontSize="5xl" fontWeight="bold" color={stat.color} mb={2}>
                                        {stat.value}
                                    </Text>
                                    <Text color="gray.300">
                                        {stat.label}
                                    </Text>
                                </Box>
                            </Box>
                        ))}
                    </Grid>
                </VStack>
            </Container>
        </Box>
    );
};

export default Stats;
