/**
 * BattlesListSkeleton – Loading state for Battles List page
 * 
 * Matches layout:
 * - Page header
 * - Filters sidebar
 * - Battle cards grid
 * - Create button
 */
import React from 'react';
import { Box, Flex, Skeleton, SkeletonText, SkeletonCircle } from '@chakra-ui/react';
import useAccessibility from '../../accessibility/hooks/useAccessibility';

const BattlesListSkeleton = () => {
    const { settings } = useAccessibility();
    const speed = settings?.reducedMotion ? 0 : 0.8;

    return (
        <Box className="battle-page" minH="100vh" bg="#0f172a" pt={24} pb={10}>
            <Box className="battle-container" maxW="7xl" mx="auto" px={{ base: 4, md: 6, lg: 8 }}>
                {/* Header */}
                <Box mb={8}>
                    <Skeleton height="48px" width="300px" mb={3} speed={speed} startColor="rgba(30,41,59,0.6)" endColor="rgba(30,41,59,0.9)" />
                    <Skeleton height="20px" width="400px" speed={speed} startColor="rgba(30,41,59,0.6)" endColor="rgba(30,41,59,0.9)" />
                </Box>

                {/* Main Layout */}
                <Flex gap={6} align="start">
                    {/* Filters Sidebar */}
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
                            {[1, 2].map((section) => (
                                <Box key={section} mb={6}>
                                    <Skeleton height="18px" width="100px" mb={3} speed={speed} startColor="rgba(30,41,59,0.8)" endColor="rgba(30,41,59,1)" />
                                    <Flex direction="column" gap={2}>
                                        {[1, 2, 3, 4].map((i) => (
                                            <Skeleton
                                                key={i}
                                                height="32px"
                                                borderRadius="6px"
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
                            <Skeleton height="40px" width="160px" borderRadius="8px" speed={speed} startColor="rgba(30,41,59,0.8)" endColor="rgba(30,41,59,1)" />
                        </Flex>

                        {/* Battle Cards Grid */}
                        <Box
                            display="grid"
                            gridTemplateColumns={{
                                base: '1fr',
                                md: 'repeat(2, 1fr)',
                                xl: 'repeat(3, 1fr)',
                            }}
                            gap={4}
                        >
                            {[...Array(6)].map((_, i) => (
                                <Box
                                    key={i}
                                    p={5}
                                    bg="rgba(30,41,59,0.6)"
                                    borderRadius="12px"
                                    border="1px solid rgba(100,116,139,0.3)"
                                >
                                    {/* Header with badges */}
                                    <Flex justify="space-between" align="center" mb={4}>
                                        <Skeleton height="20px" width="80px" borderRadius="full" speed={speed} startColor="rgba(30,41,59,0.8)" endColor="rgba(30,41,59,1)" />
                                        <Skeleton height="20px" width="60px" borderRadius="full" speed={speed} startColor="rgba(30,41,59,0.8)" endColor="rgba(30,41,59,1)" />
                                    </Flex>

                                    {/* Opponent info */}
                                    <Flex align="center" gap={3} mb={4}>
                                        <SkeletonCircle size="48px" speed={speed} startColor="rgba(30,41,59,0.8)" endColor="rgba(30,41,59,1)" />
                                        <Box flex="1">
                                            <Skeleton height="18px" width="140px" mb={2} speed={speed} startColor="rgba(30,41,59,0.8)" endColor="rgba(30,41,59,1)" />
                                            <Skeleton height="14px" width="100px" speed={speed} startColor="rgba(30,41,59,0.8)" endColor="rgba(30,41,59,1)" />
                                        </Box>
                                    </Flex>

                                    {/* Challenge info */}
                                    <Box mb={4} p={3} bg="rgba(15,23,42,0.4)" borderRadius="8px">
                                        <Skeleton height="16px" width="120px" mb={2} speed={speed} startColor="rgba(30,41,59,0.8)" endColor="rgba(30,41,59,1)" />
                                        <SkeletonText noOfLines={1} speed={speed} startColor="rgba(30,41,59,0.8)" endColor="rgba(30,41,59,1)" />
                                    </Box>

                                    {/* Action button */}
                                    <Skeleton height="40px" width="100%" borderRadius="8px" speed={speed} startColor="rgba(30,41,59,0.8)" endColor="rgba(30,41,59,1)" />
                                </Box>
                            ))}
                        </Box>
                    </Box>
                </Flex>
            </Box>
        </Box>
    );
};

export default BattlesListSkeleton;
