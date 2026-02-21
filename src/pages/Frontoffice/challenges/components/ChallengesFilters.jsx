/**
 * ChallengesFilters – sidebar filter panel.
 *
 * Difficulty checkboxes, tag checkboxes, status checkboxes,
 * recommended toggle, and search input.
 * All using Chakra components.
 */
import React from 'react';
import {
    Box,
    Text,
    Checkbox,
    Flex,
    Switch,
    Input,
    VStack,
} from '@chakra-ui/react';
import { Difficulty, ALL_TAGS, ChallengeUserStatus } from '../data/mockChallenges';

const FilterSection = ({ title, children }) => (
    <Box bg="#1e293b" borderRadius="12px" p={4}>
        <Text
            fontFamily="heading"
            fontSize="sm"
            fontWeight="semibold"
            color="gray.300"
            mb={3}
            textTransform="uppercase"
            letterSpacing="wider"
        >
            {title}
        </Text>
        {children}
    </Box>
);

const ChallengesFilters = ({
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
    difficultyCounts,
    tagCounts,
}) => {
    const difficulties = [
        { key: Difficulty.EASY, label: 'Easy' },
        { key: Difficulty.MEDIUM, label: 'Medium' },
        { key: Difficulty.HARD, label: 'Hard' },
        { key: Difficulty.EXPERT, label: 'Expert' },
    ];

    const statuses = [
        { key: ChallengeUserStatus.SOLVED, label: 'Solved' },
        { key: ChallengeUserStatus.ATTEMPTED, label: 'Attempted' },
        { key: ChallengeUserStatus.UNSOLVED, label: 'Unsolved' },
    ];

    // Show top 6 tags for compactness
    const displayTags = ALL_TAGS.slice(0, 6);

    return (
        <Box as="aside" w={{ base: 'full', lg: '256px' }} flexShrink={0}>
            <VStack spacing={4} align="stretch">

                {/* Difficulty */}
                <FilterSection title="Difficulty">
                    <VStack spacing={2} align="stretch">
                        {difficulties.map(d => (
                            <Flex
                                key={d.key}
                                as="label"
                                align="center"
                                gap={3}
                                cursor="pointer"
                                _hover={{ '& > span:first-of-type': { color: 'brand.500' } }}
                            >
                                <Checkbox
                                    isChecked={selectedDifficulties.includes(d.key)}
                                    onChange={() => toggleDifficulty(d.key)}
                                    colorScheme="cyan"
                                    size="md"
                                    borderColor="gray.600"
                                />
                                <Text color="gray.300" fontSize="sm" transition="colors 0.2s">{d.label}</Text>
                                <Text ml="auto" fontSize="xs" color="gray.500">
                                    {difficultyCounts[d.key] || 0}
                                </Text>
                            </Flex>
                        ))}
                    </VStack>
                </FilterSection>

                {/* Tags */}
                <FilterSection title="Tags">
                    <VStack spacing={2} align="stretch">
                        {displayTags.map(tag => (
                            <Flex
                                key={tag}
                                as="label"
                                align="center"
                                gap={3}
                                cursor="pointer"
                                _hover={{ '& > span:first-of-type': { color: 'brand.500' } }}
                            >
                                <Checkbox
                                    isChecked={selectedTags.includes(tag)}
                                    onChange={() => toggleTag(tag)}
                                    colorScheme="cyan"
                                    size="md"
                                    borderColor="gray.600"
                                />
                                <Text color="gray.300" fontSize="sm" transition="colors 0.2s">{tag}</Text>
                                {tagCounts[tag] && (
                                    <Text ml="auto" fontSize="xs" color="gray.500">{tagCounts[tag]}</Text>
                                )}
                            </Flex>
                        ))}
                    </VStack>
                </FilterSection>

                {/* Status */}
                <FilterSection title="Status">
                    <VStack spacing={2} align="stretch">
                        {statuses.map(s => (
                            <Flex
                                key={s.key}
                                as="label"
                                align="center"
                                gap={3}
                                cursor="pointer"
                                _hover={{ '& > span:first-of-type': { color: 'brand.500' } }}
                            >
                                <Checkbox
                                    isChecked={selectedStatuses.includes(s.key)}
                                    onChange={() => toggleStatus(s.key)}
                                    colorScheme="cyan"
                                    size="md"
                                    borderColor="gray.600"
                                />
                                <Text color="gray.300" fontSize="sm" transition="colors 0.2s">{s.label}</Text>
                            </Flex>
                        ))}
                    </VStack>
                </FilterSection>

                {/* Recommended toggle */}
                <Box bg="#1e293b" borderRadius="12px" p={4}>
                    <Flex as="label" align="center" justify="space-between" cursor="pointer">
                        <Text fontSize="sm" color="gray.300">Recommended for my rank</Text>
                        <Switch
                            isChecked={recommendedOnly}
                            onChange={(e) => setRecommendedOnly(e.target.checked)}
                            colorScheme="cyan"
                            size="md"
                        />
                    </Flex>
                </Box>

                {/* Search */}
                <Box bg="#1e293b" borderRadius="12px" p={4}>
                    <Input
                        placeholder="Search challenges..."
                        value={searchQuery}
                        onChange={(e) => setSearchQuery(e.target.value)}
                        bg="#0f172a"
                        border="1px solid"
                        borderColor="gray.700"
                        borderRadius="8px"
                        fontSize="sm"
                        color="gray.300"
                        _placeholder={{ color: 'gray.500' }}
                        _focus={{ borderColor: 'brand.500', boxShadow: 'none' }}
                    />
                </Box>
            </VStack>
        </Box>
    );
};

export default ChallengesFilters;
