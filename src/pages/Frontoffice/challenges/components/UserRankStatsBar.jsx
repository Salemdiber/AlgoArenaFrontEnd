/**
 * UserRankStatsBar – displays current rank, XP progress, and streak.
 * All values are derived from context, nothing hardcoded.
 */
import React from 'react';
import {
    Box,
    Flex,
    Text,
    Badge,
    Progress,
    Icon,
    useColorModeValue,
} from '@chakra-ui/react';
import { useChallengeContext } from '../context/ChallengeContext';
import { RANK_META } from '../data/mockChallenges';

const FlameIcon = (props) => (
    <Icon viewBox="0 0 20 20" fill="currentColor" {...props}>
        <path d="M12.395 2.553a1 1 0 00-1.45-.385c-.345.23-.614.558-.822.88-.214.33-.403.713-.57 1.116-.334.804-.614 1.768-.84 2.734a31.365 31.365 0 00-.613 3.58 2.64 2.64 0 01-.945-1.067c-.328-.68-.398-1.534-.398-2.654A1 1 0 005.05 6.05 6.981 6.981 0 003 11a7 7 0 1011.95-4.95c-.592-.591-.98-.985-1.348-1.467-.363-.476-.724-1.063-1.207-2.03zM12.12 15.12A3 3 0 017 13s.879.5 2.5.5c0-1 .5-4 1.25-4.5.5 1 .786 1.293 1.371 1.879A2.99 2.99 0 0113 13a2.99 2.99 0 01-.879 2.121z" />
    </Icon>
);

const UserRankStatsBar = () => {
    const { user, rankMeta, xpToNextRank, progressPercent } = useChallengeContext();

    // Next rank label
    const rankKeys = Object.keys(RANK_META);
    const currentIdx = rankKeys.indexOf(user.rank);
    const nextRank = currentIdx < rankKeys.length - 1
        ? RANK_META[rankKeys[currentIdx + 1]].label
        : 'Max Rank';

    return (
        <Flex
            bg="var(--color-bg-secondary)"
            borderRadius="12px"
            p={4}
            flexWrap="wrap"
            alignItems="center"
            gap={6}
        >
            {/* Rank badge */}
            <Flex alignItems="center" gap={3}>
                <Badge
                    bgGradient={`linear(to-r, ${rankMeta.gradient[0]}, ${rankMeta.gradient[1]})`}
                    color="#0f172a"
                    fontWeight="bold"
                    px={4}
                    py={2}
                    borderRadius="8px"
                    fontSize="sm"
                    textTransform="uppercase"
                >
                    {rankMeta.label} Rank
                </Badge>
                <Box>
                    <Text fontSize="xs" color={useColorModeValue("gray.500","gray.400")}>Current XP</Text>
                    <Text fontFamily="heading" fontWeight="bold" color={useColorModeValue("gray.800","gray.100")}>
                        {user.xp.toLocaleString()} / {xpToNextRank.toLocaleString()}
                    </Text>
                </Box>
            </Flex>

            {/* Progress bar */}
            <Box flex={1} minW="200px">
                <Flex justify="space-between" fontSize="xs" color={useColorModeValue("gray.500","gray.400")} mb={1}>
                    <Text>Progress to {nextRank}</Text>
                    <Text>{progressPercent}%</Text>
                </Flex>
                <Progress
                    value={progressPercent}
                    size="sm"
                    borderRadius="full"
                    bg="var(--color-tag-bg)"
                    sx={{
                        '& > div': {
                            bgGradient: 'linear(to-r, brand.500, #06b6d4)',
                            borderRadius: 'full',
                        },
                    }}
                />
            </Box>

            {/* Streak */}
            <Flex alignItems="center" gap={2}>
                <FlameIcon w={5} h={5} color="red.500" />
                <Box>
                    <Text fontSize="xs" color={useColorModeValue("gray.500","gray.400")}>Streak</Text>
                    <Text fontFamily="heading" fontWeight="bold" color="red.500">
                        {user.streak} days
                    </Text>
                </Box>
            </Flex>
        </Flex>
    );
};

export default UserRankStatsBar;
