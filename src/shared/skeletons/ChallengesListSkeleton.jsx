/**
 * ChallengesListSkeleton – Loading state for Challenges List page
 * 
 * Matches layout:
 * - User rank stats bar
 * - Filters sidebar
 * - Challenge cards grid
 */
import React from 'react';
import { Box, Flex, Skeleton, SkeletonText, Grid } from '@chakra-ui/react';
import useAccessibility from '../../accessibility/hooks/useAccessibility';

const ChallengesListSkeleton = () => {
    const { settings } = useAccessibility();
    const speed = settings?.reducedMotion ? 0 : 0.8;

    return (
        <Box
            minH="100vh"
            pt={{ base: 24, md: 28 }}
            pb={6}
            px={{ base: 4, sm: 6, lg: 8 }}
            bg="#0f172a"
            bgImage="linear-gradient(rgba(34, 211, 238, 0.03) 1px, transparent 1px), linear-gradient(90deg, rgba(34, 211, 238, 0.03) 1px, transparent 1px)"
            bgSize="50px 50px"
        >
            <Box maxW="7xl" mx="auto">
                {/* User Rank Stats Bar Skeleton */}
                <Flex
                    mb={8}
                    p={5}
                    bg="rgba(30,41,59,0.6)"
                    borderRadius="12px"
                    border="1px solid rgba(34,211,238,0.2)"
                    justify="space-between"
                    align="center"
                    flexWrap="wrap"
                    gap={4}
                >
                    {[1, 2, 3, 4].map((i) => (
                        <Box key={i} flex="1" minW="140px">
                            <Skeleton height="14px" width="80px" mb={2} speed={speed} startColor="rgba(30,41,59,0.8)" endColor="rgba(30,41,59,1)" />
                            <Skeleton height="24px" width="60px" speed={speed} startColor="rgba(30,41,59,0.8)" endColor="rgba(30,41,59,1)" />
                        </Box>
                    ))}
                </Flex>

                {/* Main content area */}
                <Flex gap={6} align="start">
                    {/* Filters Sidebar Skeleton */}
                    <Box
                        w="280px"
                        flexShrink={0}
                        display={{ base: 'none', lg: 'block' }}
                    >
                        <Box
                            p={5}
                            bg="rgba(30,41,59,0.6)"
                            borderRadius="12px"
                            border="1px solid rgba(100,116,139,0.3)"
                        >
                            {/* Search */}
                            <Skeleton height="40px" mb={6} borderRadius="8px" speed={speed} startColor="rgba(30,41,59,0.8)" endColor="rgba(30,41,59,1)" />

                            {/* Filter sections */}
                            {[1, 2, 3].map((section) => (
                                <Box key={section} mb={6}>
                                    <Skeleton height="18px" width="100px" mb={3} speed={speed} startColor="rgba(30,41,59,0.8)" endColor="rgba(30,41,59,1)" />
                                    <Flex gap={2} flexWrap="wrap">
                                        {[1, 2, 3, 4].map((i) => (
                                            <Skeleton
                                                key={i}
                                                height="32px"
                                                width="70px"
                                                borderRadius="full"
                                                speed={speed}
                                                startColor="rgba(30,41,59,0.8)"
                                                endColor="rgba(30,41,59,1)"
                                            />
                                        ))}
                                    </Flex>
                                </Box>
                            ))}
                        </Box>
                    </Box>

                    {/* Main Content */}
                    <Box flex="1" minW={0}>
                        {/* Toolbar */}
                        <Flex justify="space-between" align="center" mb={6}>
                            <Skeleton height="20px" width="150px" speed={speed} startColor="rgba(30,41,59,0.8)" endColor="rgba(30,41,59,1)" />
                            <Skeleton height="36px" width="180px" borderRadius="8px" speed={speed} startColor="rgba(30,41,59,0.8)" endColor="rgba(30,41,59,1)" />
                        </Flex>

                        {/* Challenge Cards Grid */}
                        <Grid
                            templateColumns={{
                                base: '1fr',
                                md: 'repeat(2, 1fr)',
                                xl: 'repeat(3, 1fr)',
                            }}
                            gap={4}
                        >
                            {[...Array(9)].map((_, i) => (
                                <Box
                                    key={i}
                                    p={5}
                                    bg="rgba(30,41,59,0.6)"
                                    borderRadius="12px"
                                    border="1px solid rgba(100,116,139,0.3)"
                                >
                                    {/* Header */}
                                    <Flex justify="space-between" align="start" mb={3}>
                                        <Skeleton height="24px" width="180px" speed={speed} startColor="rgba(30,41,59,0.8)" endColor="rgba(30,41,59,1)" />
                                        <Skeleton height="24px" width="60px" borderRadius="full" speed={speed} startColor="rgba(30,41,59,0.8)" endColor="rgba(30,41,59,1)" />
                                    </Flex>

                                    {/* Description */}
                                    <SkeletonText
                                        noOfLines={2}
                                        spacing={2}
                                        mb={4}
                                        speed={speed}
                                        startColor="rgba(30,41,59,0.8)"
                                        endColor="rgba(30,41,59,1)"
                                    />

                                    {/* Tags */}
                                    <Flex gap={2} mb={4} flexWrap="wrap">
                                        {[1, 2, 3].map((j) => (
                                            <Skeleton
                                                key={j}
                                                height="20px"
                                                width="60px"
                                                borderRadius="full"
                                                speed={speed}
                                                startColor="rgba(30,41,59,0.8)"
                                                endColor="rgba(30,41,59,1)"
                                            />
                                        ))}
                                    </Flex>

                                    {/* Stats */}
                                    <Flex justify="space-between" align="center" pt={3} borderTop="1px solid rgba(100,116,139,0.2)">
                                        <Skeleton height="16px" width="80px" speed={speed} startColor="rgba(30,41,59,0.8)" endColor="rgba(30,41,59,1)" />
                                        <Skeleton height="16px" width="100px" speed={speed} startColor="rgba(30,41,59,0.8)" endColor="rgba(30,41,59,1)" />
                                    </Flex>
                                </Box>
                            ))}
                        </Grid>
                    </Box>
                </Flex>
            </Box>
        </Box>
    );
};

export default ChallengesListSkeleton;
