import {
    Box,
    Container,
    Grid,
    GridItem,
    Heading,
    Text,
    VStack,
    HStack,
    Link,
    Divider,
    Flex,
} from '@chakra-ui/react';

const Footer = () => {
    return (
        <Box as="footer" bg="gray.800" borderTop="1px solid" borderColor="gray.700" py={12}>
            <Container maxW="7xl">
                <Grid templateColumns={{ base: '1fr', sm: 'repeat(2, 1fr)', lg: 'repeat(4, 1fr)' }} gap={8} mb={8}>
                    {/* Column 1 - Brand */}
                    <GridItem>
                        <Heading
                            as="h3"
                            size="md"
                            fontFamily="heading"
                            color="brand.500"
                            mb={4}
                        >
                            AlgoArena
                        </Heading>
                        <Text fontSize="sm" color="gray.300">
                            The ultimate AI-powered competitive coding platform. Battle, learn, and master algorithms through interactive simulations.
                        </Text>
                    </GridItem>

                    {/* Column 2 - Product */}
                    <GridItem>
                        <Heading as="h4" size="sm" fontFamily="heading" color="gray.100" mb={4}>
                            Product
                        </Heading>
                        <VStack align="start" spacing={2} fontSize="sm">
                            <Link href="#" color="gray.300" _hover={{ color: 'brand.500' }} transition="colors 0.3s">
                                Game Modes
                            </Link>
                            <Link href="#" color="gray.300" _hover={{ color: 'brand.500' }} transition="colors 0.3s">
                                Arena
                            </Link>
                            <Link href="#" color="gray.300" _hover={{ color: 'brand.500' }} transition="colors 0.3s">
                                Leaderboards
                            </Link>
                            <Link href="#" color="gray.300" _hover={{ color: 'brand.500' }} transition="colors 0.3s">
                                Roadmap
                            </Link>
                        </VStack>
                    </GridItem>

                    {/* Column 3 - Resources */}
                    <GridItem>
                        <Heading as="h4" size="sm" fontFamily="heading" color="gray.100" mb={4}>
                            Resources
                        </Heading>
                        <VStack align="start" spacing={2} fontSize="sm">
                            <Link href="#" color="gray.300" _hover={{ color: 'brand.500' }} transition="colors 0.3s">
                                Docs
                            </Link>
                            <Link href="#" color="gray.300" _hover={{ color: 'brand.500' }} transition="colors 0.3s">
                                API
                            </Link>
                            <Link href="#" color="gray.300" _hover={{ color: 'brand.500' }} transition="colors 0.3s">
                                Blog
                            </Link>
                            <Link href="#" color="gray.300" _hover={{ color: 'brand.500' }} transition="colors 0.3s">
                                Support
                            </Link>
                        </VStack>
                    </GridItem>

                    {/* Column 4 - Community */}
                    <GridItem>
                        <Heading as="h4" size="sm" fontFamily="heading" color="gray.100" mb={4}>
                            Community
                        </Heading>
                        <VStack align="start" spacing={2} fontSize="sm">
                            <Link href="#" color="gray.300" _hover={{ color: 'brand.500' }} transition="colors 0.3s">
                                Discord
                            </Link>
                            <Link href="#" color="gray.300" _hover={{ color: 'brand.500' }} transition="colors 0.3s">
                                GitHub
                            </Link>
                            <Link href="#" color="gray.300" _hover={{ color: 'brand.500' }} transition="colors 0.3s">
                                Twitter
                            </Link>
                        </VStack>
                    </GridItem>
                </Grid>

                {/* Bottom Section */}
                <Divider borderColor="gray.700" mb={8} />
                <Flex
                    direction={{ base: 'column', sm: 'row' }}
                    justify="space-between"
                    align="center"
                    fontSize="sm"
                    color="gray.400"
                >
                    <Text mb={{ base: 4, sm: 0 }}>© 2024 AlgoArena. All rights reserved.</Text>
                    <HStack spacing={6}>
                        <Link href="#" _hover={{ color: 'brand.500' }} transition="colors 0.3s">
                            Privacy Policy
                        </Link>
                        <Link href="#" _hover={{ color: 'brand.500' }} transition="colors 0.3s">
                            Terms
                        </Link>
                    </HStack>
                </Flex>
            </Container>
        </Box>
    );
};

export default Footer;
