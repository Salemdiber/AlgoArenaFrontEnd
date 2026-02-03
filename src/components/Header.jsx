import {
    Box,
    Container,
    Flex,
    Heading,
    HStack,
    Button,
    Link,
    useColorModeValue,
} from '@chakra-ui/react';
import { useState, useEffect } from 'react';

const Header = () => {
    const [headerSpotlight, setHeaderSpotlight] = useState({ left: 0 });

    const handleMouseMove = (e) => {
        const rect = e.currentTarget.getBoundingClientRect();
        const x = e.clientX - rect.left;
        setHeaderSpotlight({ left: x - 150 });
    };

    return (
        <Box
            as="header"
            position="fixed"
            top={0}
            left={0}
            right={0}
            zIndex={50}
            backdropFilter="blur(16px)"
            bg="rgba(17, 24, 39, 0.9)"
            borderBottom="1px solid"
            borderColor="gray.800"
            onMouseMove={handleMouseMove}
        >
            {/* Header Spotlight Effect */}
            <Box
                position="absolute"
                top={0}
                left={`${headerSpotlight.left}px`}
                width="300px"
                height="100%"
                bgGradient="linear(to-r, transparent, rgba(34, 211, 238, 0.05), transparent)"
                pointerEvents="none"
                transition="left 0.1s ease-out"
            />

            <Container maxW="7xl" position="relative" zIndex={10}>
                <Flex h={16} alignItems="center" justifyContent="space-between">
                    {/* Logo */}
                    <Heading
                        as="h1"
                        size="lg"
                        fontFamily="heading"
                        color="brand.500"
                        fontWeight="bold"
                    >
                        AlgoArena
                    </Heading>

                    {/* Navigation */}
                    <HStack
                        as="nav"
                        spacing={8}
                        display={{ base: 'none', md: 'flex' }}
                    >
                        <Link href="#home" color="gray.300" _hover={{ color: 'brand.500' }} transition="colors 0.3s">
                            Home
                        </Link>
                        <Link href="#games" color="gray.300" _hover={{ color: 'brand.500' }} transition="colors 0.3s">
                            Games
                        </Link>
                        <Link href="#features" color="gray.300" _hover={{ color: 'brand.500' }} transition="colors 0.3s">
                            Features
                        </Link>
                        <Link href="#leaderboards" color="gray.300" _hover={{ color: 'brand.500' }} transition="colors 0.3s">
                            Leaderboards
                        </Link>
                        <Link href="#community" color="gray.300" _hover={{ color: 'brand.500' }} transition="colors 0.3s">
                            Community
                        </Link>
                    </HStack>

                    {/* CTA Buttons */}
                    <HStack spacing={4}>
                        <Button
                            display={{ base: 'none', sm: 'block' }}
                            variant="ghost"
                            size="md"
                        >
                            Login
                        </Button>
                        <Button variant="primary" size="md" boxShadow="custom">
                            Start Coding
                        </Button>
                    </HStack>
                </Flex>
            </Container>
        </Box>
    );
};

export default Header;
