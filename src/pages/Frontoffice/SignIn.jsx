import React, { useState } from 'react';
import { Box, Heading, Text, Button, VStack, HStack, Input, Checkbox, Link, Flex, InputGroup, InputLeftElement } from '@chakra-ui/react';
import { Link as RouterLink } from 'react-router-dom';
import { motion } from 'framer-motion';
import AuthLayout from '../../layout/AuthLayout';

const MotionBox = motion.create(Box);

const SignIn = () => {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [rememberMe, setRememberMe] = useState(false);
    const [isLoading, setIsLoading] = useState(false);

    const handleSubmit = (e) => {
        e.preventDefault();
        setIsLoading(true);
        setTimeout(() => setIsLoading(false), 1500);
    };

    const inputStyles = {
        bg: '#0f172a', border: '1px solid', borderColor: 'gray.600', borderRadius: '8px',
        color: 'gray.100', h: '48px', fontSize: 'sm', _placeholder: { color: 'gray.500' },
        _focus: { borderColor: 'brand.500', boxShadow: '0 0 0 1px #22d3ee, 0 0 20px -5px rgba(34,211,238,0.3)', outline: 'none' },
        _hover: { borderColor: 'gray.500' }, transition: 'all 0.3s',
    };

    return (
        <AuthLayout activeTab="signin">
            <MotionBox w="100%" maxW="md" initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.6 }}>
                <Box className="glass-panel" borderRadius="16px" p={{ base: 8, md: 10 }} boxShadow="0px 8px 24px -4px rgba(15,23,42,0.5)" position="relative" overflow="hidden" role="group">
                    {/* Spotlight glow */}
                    <Box position="absolute" top="-96px" left="-96px" w="192px" h="192px" bg="rgba(34,211,238,0.2)" borderRadius="full" filter="blur(48px)" transition="all 0.7s" _groupHover={{ bg: 'rgba(34,211,238,0.3)' }} />

                    <Box position="relative" zIndex={10}>
                        <VStack spacing={2} mb={8} textAlign="center">
                            <Heading fontFamily="heading" fontSize={{ base: '2xl', md: '3xl' }} fontWeight="bold" color="white">
                                Welcome Back, <Text as="span" color="brand.500">Challenger</Text>
                            </Heading>
                            <Text color="gray.400" fontSize="sm">Continue your coding journey.</Text>
                        </VStack>

                        <form onSubmit={handleSubmit}>
                            <VStack spacing={5}>
                                {/* Email */}
                                <Box w="100%">
                                    <Text fontSize="xs" fontWeight="semibold" color="gray.400" textTransform="uppercase" letterSpacing="wider" ml={1} mb={1}>Email Address</Text>
                                    <InputGroup>
                                        <InputLeftElement pointerEvents="none" h="100%">
                                            <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="#64748b" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><rect width="20" height="16" x="2" y="4" rx="2" /><path d="m22 7-8.97 5.7a1.94 1.94 0 0 1-2.06 0L2 7" /></svg>
                                        </InputLeftElement>
                                        <Input type="email" placeholder="dev@algoarena.com" value={email} onChange={(e) => setEmail(e.target.value)} {...inputStyles} />
                                    </InputGroup>
                                </Box>

                                {/* Password */}
                                <Box w="100%">
                                    <Flex justify="space-between" align="center" ml={1} mb={1}>
                                        <Text fontSize="xs" fontWeight="semibold" color="gray.400" textTransform="uppercase" letterSpacing="wider">Password</Text>
                                        <HStack spacing={1} bg="rgba(16,185,129,0.1)" px={2} py={0.5} borderRadius="full" border="1px solid" borderColor="rgba(16,185,129,0.2)">
                                            <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="#10b981" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M8.5 14.5A2.5 2.5 0 0 0 11 12c0-1.38-.5-2-1-3-1.072-2.143-.224-4.054 2-6 .5 2.5 2 4.9 4 6.5 2 1.6 3 3.5 3 5.5a7 7 0 1 1-14 0c0-1.153.433-2.294 1-3a2.5 2.5 0 0 0 2.5 2.5z" /></svg>
                                            <Text fontSize="10px" fontFamily="mono" color="green.400">Streak: 4 days</Text>
                                        </HStack>
                                    </Flex>
                                    <InputGroup>
                                        <InputLeftElement pointerEvents="none" h="100%">
                                            <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="#64748b" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><rect width="18" height="11" x="3" y="11" rx="2" ry="2" /><path d="M7 11V7a5 5 0 0 1 10 0v4" /></svg>
                                        </InputLeftElement>
                                        <Input type="password" placeholder="••••••••" value={password} onChange={(e) => setPassword(e.target.value)} {...inputStyles} />
                                    </InputGroup>
                                </Box>

                                {/* Remember + Forgot */}
                                <Flex w="100%" justify="space-between" align="center">
                                    <Checkbox colorScheme="cyan" size="sm" isChecked={rememberMe} onChange={(e) => setRememberMe(e.target.checked)}>
                                        <Text fontSize="sm" color="gray.400">Remember me</Text>
                                    </Checkbox>
                                    <Link fontSize="sm" fontWeight="medium" color="brand.500" _hover={{ color: 'brand.300' }}>Forgot password?</Link>
                                </Flex>

                                {/* Submit */}
                                <Button type="submit" w="100%" h="48px" bgGradient="linear(to-r, brand.500, cyan.400)" color="#0f172a" fontSize="sm" fontWeight="bold" borderRadius="8px"
                                    isLoading={isLoading} loadingText="Authenticating..." boxShadow="0 0 30px -5px rgba(34,211,238,0.5)"
                                    _hover={{ bgGradient: 'linear(to-r, brand.500, cyan.300)', transform: 'translateY(-2px)' }} _active={{ transform: 'translateY(0)' }} transition="all 0.3s">
                                    Enter the Arena
                                </Button>
                            </VStack>
                        </form>

                        {/* Divider */}
                        <Box mt={8} position="relative">
                            <Box position="absolute" inset={0} display="flex" alignItems="center"><Box w="100%" borderTop="1px solid" borderColor="gray.600" /></Box>
                            <Flex position="relative" justify="center">
                                <Text px={4} fontSize="xs" color="gray.500" className="glass-panel" borderRadius="full">Or enter the arena with</Text>
                            </Flex>
                        </Box>

                        {/* Social */}
                        <HStack mt={6} spacing={3}>
                            {[
                                { label: 'Google', path: 'M12.48 10.92v3.28h7.84c-.24 1.84-.853 3.187-1.787 4.133-1.147 1.147-2.933 2.4-6.053 2.4-4.827 0-8.6-3.893-8.6-8.72s3.773-8.72 8.6-8.72c2.6 0 4.507 1.027 5.907 2.347l2.307-2.307C18.747 1.44 16.133 0 12.48 0 5.867 0 .307 5.387.307 12s5.56 12 12.173 12c3.573 0 6.267-1.173 8.373-3.36 2.16-2.16 2.84-5.213 2.84-7.667 0-.76-.053-1.467-.173-2.053H12.48z', vb: '0 0 24 24' },
                                { label: 'GitHub', path: 'M10 0C4.477 0 0 4.484 0 10.017c0 4.425 2.865 8.18 6.839 9.504.5.092.682-.217.682-.483 0-.237-.008-.868-.013-1.703-2.782.605-3.369-1.343-3.369-1.343-.454-1.158-1.11-1.466-1.11-1.466-.908-.62.069-.608.069-.608 1.003.07 1.531 1.032 1.531 1.032.892 1.53 2.341 1.088 2.91.832.092-.647.35-1.088.636-1.338-2.22-.253-4.555-1.113-4.555-4.951 0-1.093.39-1.988 1.029-2.688-.103-.253-.446-1.272.098-2.65 0 0 .84-.27 2.75 1.026A9.564 9.564 0 0110 4.844c.85.004 1.705.115 2.504.337 1.909-1.296 2.747-1.027 2.747-1.027.546 1.379.202 2.398.1 2.651.64.7 1.028 1.595 1.028 2.688 0 3.848-2.339 4.695-4.566 4.943.359.309.678.92.678 1.855 0 1.338-.012 2.419-.012 2.747 0 .268.18.58.688.482A10.019 10.019 0 0020 10.017C20 4.484 15.522 0 10 0z', vb: '0 0 20 20' },
                            ].map(({ label, path, vb }) => (
                                <Button key={label} flex={1} h="44px" bg="#0f172a" border="1px solid" borderColor="gray.600" borderRadius="8px" color="gray.300" fontSize="sm" fontWeight="medium"
                                    leftIcon={<svg width="20" height="20" fill="currentColor" viewBox={vb}><path fillRule="evenodd" clipRule="evenodd" d={path} /></svg>}
                                    _hover={{ bg: 'gray.800', borderColor: 'brand.500', color: 'white' }} transition="all 0.3s">
                                    {label}
                                </Button>
                            ))}
                        </HStack>

                        {/* Link to sign up */}
                        <Text mt={8} textAlign="center" fontSize="sm" color="gray.400">
                            New to AlgoArena?{' '}
                            <Link as={RouterLink} to="/signup" fontWeight="medium" color="brand.500" _hover={{ color: 'brand.300' }}>Sign up</Link>
                        </Text>
                    </Box>
                </Box>
            </MotionBox>
        </AuthLayout>
    );
};

export default SignIn;
