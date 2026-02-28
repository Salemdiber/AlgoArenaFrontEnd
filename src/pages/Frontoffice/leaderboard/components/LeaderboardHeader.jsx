/**
 * LeaderboardHeader – title, subtitle, and filter controls
 *
 * Filters:
 *  • Scope: Global / Friends / Country
 *  • Period: Weekly / Monthly / All-Time
 *
 * All filter state is managed via React useState.
 */
import React from 'react';
import { Box, Flex, Text, Button, ButtonGroup, Stack } from '@chakra-ui/react';
import { motion } from 'framer-motion';

const MotionBox = motion.create(Box);

const SCOPES = ['Global', 'Friends', 'Country'];
const PERIODS = ['Weekly', 'Monthly', 'All-Time'];

const FilterGroup = ({ options, activeOption, onSelect }) => (
    <ButtonGroup
        isAttached
        borderRadius="12px"
        overflow="hidden"
        bg="var(--color-bg-secondary)"
        boxShadow="0 4px 16px rgba(0, 0, 0, 0.3), inset 0 1px 0 rgba(255, 255, 255, 0.05)"
    >
        {options.map((option) => {
            const isActive = option === activeOption;
            return (
                <Button
                    key={option}
                    onClick={() => onSelect(option)}
                    px={6}
                    py={3}
                    fontFamily="body"
                    fontWeight={isActive ? 'semibold' : 'medium'}
                    fontSize="sm"
                    borderRadius={0}
                    bg={isActive ? '#22d3ee' : 'transparent'}
                    color={isActive ? '#0f172a' : 'gray.400'}
                    _hover={{
                        bg: isActive ? '#22d3ee' : 'gray.700',
                        color: isActive ? '#0f172a' : 'white',
                    }}
                    transition="all 0.3s"
                >
                    {option}
                </Button>
            );
        })}
    </ButtonGroup>
);

const LeaderboardHeader = ({
    scope,
    setScope,
    period,
    setPeriod,
}) => {
    return (
        <MotionBox
            textAlign="center"
            mb={16}
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
        >
            {/* Elite Championship pill */}
            <Flex justify="center" mb={4}>
                <Box
                    display="inline-block"
                    px={4}
                    py={2}
                    borderRadius="6px"
                    bg="rgba(34, 211, 238, 0.1)"
                    border="1px solid rgba(34, 211, 238, 0.3)"
                >
                    <Text
                        fontFamily="body"
                        fontSize="xs"
                        fontWeight="semibold"
                        textTransform="uppercase"
                        letterSpacing="wider"
                        color="#22d3ee"
                    >
                        Elite Championship
                    </Text>
                </Box>
            </Flex>

            {/* Title */}
            <Text
                as="h1"
                fontFamily="heading"
                fontSize={{ base: '5xl', sm: '6xl', lg: '7xl' }}
                fontWeight="black"
                letterSpacing="tight"
                mb={4}
                bgGradient="linear(135deg, #22d3ee, #60a5fa)"
                bgClip="text"
            >
                Global Arena
            </Text>

            {/* Subtitle */}
            <Text fontFamily="body" fontSize={{ base: 'lg', sm: 'xl' }} color="gray.400" mb={8}>
                Where legends compete for supremacy
            </Text>

            {/* Filters */}
            <Stack
                direction={{ base: 'column', sm: 'row' }}
                spacing={4}
                justify="center"
                align="center"
            >
                <FilterGroup options={SCOPES} activeOption={scope} onSelect={setScope} />
                <FilterGroup options={PERIODS} activeOption={period} onSelect={setPeriod} />
            </Stack>
        </MotionBox>
    );
};

export default LeaderboardHeader;
