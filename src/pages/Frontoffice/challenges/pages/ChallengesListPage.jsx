/**
 * ChallengesListPage – /challenges
 *
 * Shows:
 *  • UserRankStatsBar
 *  • ChallengesFilters (sidebar)
 *  • Filtered challenge cards (main)
 *  • Sort dropdown & count
 *  • Loading skeleton state
 */
import React, { useState, useEffect } from 'react';
import {
    Box,
    Flex,
    Text,
    Select,
    VStack,
} from '@chakra-ui/react';
import { motion, AnimatePresence } from 'framer-motion';
import UserRankStatsBar from '../components/UserRankStatsBar';
import ChallengesFilters from '../components/ChallengesFilters';
import ChallengeCard from '../components/ChallengeCard';
import useChallenges from '../hooks/useChallenges';
import ChallengesListSkeleton from '../../../../shared/skeletons/ChallengesListSkeleton';

const MotionBox = motion.create(Box);

const ChallengesListPage = () => {
    // Loading state (simulated – will be replaced with real API call)
    const [isLoading, setIsLoading] = useState(true);

    const {
        filteredChallenges,
        filteredCount,
        selectedDifficulties,
        toggleDifficulty,
        selectedTags,
        toggleTag,
        selectedStatuses,
        toggleStatus,
        recommendedOnly,
        setRecommendedOnly,
        searchQuery,
        setSearchQuery,
        sortOption,
        setSortOption,
        SORT_OPTIONS,
        difficultyCounts,
        tagCounts,
    } = useChallenges();

    // Simulate data fetching
    useEffect(() => {
        // In production: replace with actual API call
        const timer = setTimeout(() => {
            setIsLoading(false);
        }, 1000);
        return () => clearTimeout(timer);
    }, [selectedDifficulties, selectedTags, selectedStatuses]);

    // Show skeleton during loading
    if (isLoading) {
        return <ChallengesListSkeleton />;
    }

    return (
        <MotionBox
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.4 }}
            minH="100vh"
            pt={{ base: 24, md: 28 }}
            pb={6}
            px={{ base: 4, sm: 6, lg: 8 }}
            bg="#0f172a"
            bgImage="linear-gradient(rgba(34, 211, 238, 0.03) 1px, transparent 1px), linear-gradient(90deg, rgba(34, 211, 238, 0.03) 1px, transparent 1px)"
            bgSize="50px 50px"
        >
            <Box maxW="7xl" mx="auto">
                {/* Header */}
                <Box mb={8}>
                    <Text
                        as="h1"
                        fontFamily="heading"
                        fontSize={{ base: '4xl', sm: '5xl' }}
                        fontWeight="bold"
                        color="gray.50"
                        mb={2}
                    >
                        Challenges
                    </Text>
                    <Text fontSize="lg" color="gray.400" mb={6}>
                        Sharpen your skills. Climb your rank.
                    </Text>

                    <UserRankStatsBar />
                </Box>

                {/* Main layout */}
                <Flex direction={{ base: 'column', lg: 'row' }} gap={6}>
                    {/* Sidebar */}
                    <ChallengesFilters
                        selectedDifficulties={selectedDifficulties}
                        toggleDifficulty={toggleDifficulty}
                        selectedTags={selectedTags}
                        toggleTag={toggleTag}
                        selectedStatuses={selectedStatuses}
                        toggleStatus={toggleStatus}
                        recommendedOnly={recommendedOnly}
                        setRecommendedOnly={setRecommendedOnly}
                        searchQuery={searchQuery}
                        setSearchQuery={setSearchQuery}
                        difficultyCounts={difficultyCounts}
                        tagCounts={tagCounts}
                    />

                    {/* Main content */}
                    <Box flex={1}>
                        {/* Toolbar */}
                        <Flex justify="space-between" align="center" mb={6}>
                            <Text color="gray.400">
                                Showing{' '}
                                <Text as="span" color="brand.500" fontWeight="semibold">
                                    {filteredCount}
                                </Text>{' '}
                                challenges
                            </Text>
                            <Select
                                value={sortOption}
                                onChange={(e) => setSortOption(e.target.value)}
                                bg="#1e293b"
                                border="1px solid"
                                borderColor="gray.700"
                                borderRadius="8px"
                                fontSize="sm"
                                color="gray.300"
                                w="220px"
                                _focus={{ borderColor: 'brand.500', boxShadow: 'none' }}
                            >
                                {SORT_OPTIONS.map(opt => (
                                    <option key={opt.value} value={opt.value} style={{ background: '#1e293b' }}>
                                        Sort by: {opt.label}
                                    </option>
                                ))}
                            </Select>
                        </Flex>

                        {/* Challenge cards */}
                        <VStack spacing={4} align="stretch">
                            {filteredChallenges.length === 0 ? (
                                <Box bg="#1e293b" borderRadius="12px" p={10} textAlign="center">
                                    <Text fontSize="2xl" mb={2}>🔍</Text>
                                    <Text color="gray.400">No challenges match your current filters.</Text>
                                    <Text color="gray.500" fontSize="sm" mt={1}>
                                        Try adjusting your filters or search query.
                                    </Text>
                                </Box>
                            ) : (
                                filteredChallenges.map(challenge => (
                                    <ChallengeCard key={challenge.id} challenge={challenge} />
                                ))
                            )}
                        </VStack>
                    </Box>
                </Flex>
            </Box>
        </MotionBox>
    );
};

export default ChallengesListPage;
