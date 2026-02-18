/**
 * ProfilePage – /profile
 *
 * Assembles all profile sections:
 *  1. AvatarSection
 *  2. ProfileInfoSection
 *  3. ChangePasswordSection
 *  4. TwoFactorSection
 *  5. Danger Zone (bonus)
 *
 * Uses the same background system as Battles / Challenges / Leaderboard:
 *   bg: #0f172a, subtle cyan grid overlay.
 */
import React from 'react';
import { Box, Text, Button, VStack, Flex } from '@chakra-ui/react';
import { motion, useReducedMotion } from 'framer-motion';

import AvatarSection from '../components/AvatarSection';
import ProfileInfoSection from '../components/ProfileInfoSection';
import ChangePasswordSection from '../components/ChangePasswordSection';
import TwoFactorSection from '../components/TwoFactorSection';

const MotionBox = motion.create(Box);

const ProfilePage = () => {
    const prefersReducedMotion = useReducedMotion();

    return (
        <MotionBox
            initial={prefersReducedMotion ? false : { opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={prefersReducedMotion ? { duration: 0 } : { duration: 0.4 }}
            minH="100vh"
            pt={{ base: 24, md: 28 }}
            pb={{ base: 10, md: 16 }}
            px={{ base: 4, sm: 6, lg: 8 }}
            bg="#0f172a"
            bgImage="linear-gradient(rgba(34, 211, 238, 0.03) 1px, transparent 1px), linear-gradient(90deg, rgba(34, 211, 238, 0.03) 1px, transparent 1px)"
            bgSize="50px 50px"
            position="relative"
            overflow="hidden"
        >
            <Box maxW="3xl" mx="auto" position="relative" zIndex={10}>
                {/* Page header */}
                <Box mb={8}>
                    <Text
                        fontFamily="heading"
                        fontSize={{ base: '2xl', md: '3xl' }}
                        fontWeight="bold"
                        color="gray.100"
                        mb={2}
                    >
                        Account Settings
                    </Text>
                    <Text color="gray.400" fontSize={{ base: 'sm', md: 'md' }}>
                        Manage your profile, security, and authentication
                    </Text>
                </Box>

                {/* Sections stack */}
                <VStack spacing={8} align="stretch">
                    <AvatarSection />
                    <ProfileInfoSection />
                    <ChangePasswordSection />
                    <TwoFactorSection />

                    {/* Danger Zone */}
                    <MotionBox
                        initial={prefersReducedMotion ? false : { opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={prefersReducedMotion ? { duration: 0 } : { duration: 0.5, delay: 0.4, ease: 'easeOut' }}
                        border="1px solid"
                        borderColor="rgba(239, 68, 68, 0.2)"
                        bg="rgba(239, 68, 68, 0.04)"
                        borderRadius="12px"
                        p={{ base: 6, md: 8 }}
                        mt={4}
                    >
                        <Text fontFamily="heading" color="#ef4444" fontWeight="600" fontSize="lg" mb={2}>
                            Danger Zone
                        </Text>
                        <Text color="gray.400" fontSize="sm" mb={6}>
                            Once you delete your account, there is no going back. Please be certain.
                        </Text>
                        <Button
                            variant="outline"
                            borderColor="rgba(239, 68, 68, 0.5)"
                            color="#ef4444"
                            fontWeight="500"
                            borderRadius="6px"
                            fontSize="sm"
                            _hover={{ bg: '#ef4444', color: 'white' }}
                            transition="all 0.2s"
                        >
                            Delete Account
                        </Button>
                    </MotionBox>
                </VStack>
            </Box>
        </MotionBox>
    );
};

export default ProfilePage;
