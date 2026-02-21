import React from 'react';
import { Box, Flex, HStack, Text, Button, Image } from '@chakra-ui/react';
import { Link as RouterLink } from 'react-router-dom';
import Logo from '../assets/logo_algoarena.png';

const AuthLayout = ({ children, activeTab = 'signin' }) => (
    <Box minH="100vh" bg="#0f172a" position="relative" overflow="hidden" display="flex" flexDirection="column">
        {/* Background */}
        <Box position="fixed" inset={0} zIndex={0} pointerEvents="none">
            <Box
                position="absolute" inset={0} opacity={0.4}
                backgroundSize="40px 40px"
                backgroundImage="linear-gradient(to right, rgba(30,41,59,0.5) 1px, transparent 1px), linear-gradient(to bottom, rgba(30,41,59,0.5) 1px, transparent 1px)"
                sx={{ maskImage: 'radial-gradient(circle at center, black 40%, transparent 100%)', WebkitMaskImage: 'radial-gradient(circle at center, black 40%, transparent 100%)' }}
            />
            <Text position="absolute" top="20%" left="10%" fontFamily="mono" fontSize="xs" color="brand.500" opacity={0.2} className="float-animation">
                const arena = new Arena();
            </Text>
            <Text position="absolute" bottom="40%" right="20%" fontFamily="mono" fontSize="xs" color="green.400" opacity={0.2} className="float-animation" style={{ animationDelay: '2s' }}>
                {'function optimize(O_n) { ... }'}
            </Text>
            <Box position="absolute" top="-10%" left="-10%" w="384px" h="384px" bg="blue.600" borderRadius="full" mixBlendMode="screen" filter="blur(128px)" opacity={0.2} className="animate-pulse-glow" />
            <Box position="absolute" bottom="-10%" right="-10%" w="384px" h="384px" bg="cyan.600" borderRadius="full" mixBlendMode="screen" filter="blur(128px)" opacity={0.2} className="animate-pulse-glow" style={{ animationDelay: '2s' }} />
        </Box>

        {/* Nav */}
        <Flex as="nav" position="relative" zIndex={50} w="100%" p={6} justify="space-between" align="center" maxW="7xl" mx="auto">
            <HStack as={RouterLink} to="/" spacing={2} _hover={{ textDecoration: 'none' }}>
                <Image src={Logo} alt="AlgoArena" h="40px" objectFit="contain" />
            </HStack>
            <HStack spacing={0} bg="rgba(30,41,59,0.5)" backdropFilter="blur(12px)" p={1} borderRadius="lg" border="1px solid" borderColor="whiteAlpha.100">
                <Button as={RouterLink} to="/signin" size="sm" px={4} borderRadius="md" fontSize="sm" fontWeight="medium"
                    bg={activeTab === 'signin' ? 'brand.500' : 'transparent'} color={activeTab === 'signin' ? '#0f172a' : 'gray.400'}
                    boxShadow={activeTab === 'signin' ? '0 0 20px -5px rgba(34,211,238,0.3)' : 'none'}
                    _hover={activeTab === 'signin' ? { bg: 'brand.400' } : { color: 'white' }}>
                    Sign In
                </Button>
                <Button as={RouterLink} to="/signup" size="sm" px={4} borderRadius="md" fontSize="sm" fontWeight="medium"
                    bg={activeTab === 'signup' ? 'brand.500' : 'transparent'} color={activeTab === 'signup' ? '#0f172a' : 'gray.400'}
                    boxShadow={activeTab === 'signup' ? '0 0 20px -5px rgba(34,211,238,0.3)' : 'none'}
                    _hover={activeTab === 'signup' ? { bg: 'brand.400' } : { color: 'white' }}>
                    Sign Up
                </Button>
            </HStack>
        </Flex>

        {/* Content */}
        <Flex flex={1} position="relative" zIndex={10} direction="column" align="center" justify="center" p={{ base: 4, md: 8 }} w="100%" maxW="7xl" mx="auto">
            {children}
        </Flex>
    </Box>
);

export default AuthLayout;
