/**
 * ChallengeHeader – top navigation bar for the play page.
 *
 * Shows back arrow, challenge title + meta, timer, reset & submit buttons.
 */
import React, { useState, useEffect, useRef } from 'react';
import {
    Flex,
    Box,
    Text,
    Button,
    Icon,
    IconButton,
} from '@chakra-ui/react';
import { useNavigate } from 'react-router-dom';
import { useChallengeContext } from '../context/ChallengeContext';
import { DIFFICULTY_META } from '../data/mockChallenges';
import useChallengeExecution from '../hooks/useChallengeExecution';

const ArrowLeftIcon = (props) => (
    <Icon viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" {...props}>
        <path d="M19 12H5M12 19l-7-7 7-7" />
    </Icon>
);

const ClockIcon = (props) => (
    <Icon viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" {...props}>
        <circle cx="12" cy="12" r="10" />
        <path d="M12 6v6l4 2" />
    </Icon>
);

const ChallengeHeader = () => {
    const navigate = useNavigate();
    const { selectedChallenge, resetCode, isSubmitting } = useChallengeContext();
    const { submitCode } = useChallengeExecution();

    // Simple elapsed timer
    const [elapsed, setElapsed] = useState(0);
    const timerRef = useRef(null);

    useEffect(() => {
        timerRef.current = setInterval(() => setElapsed(e => e + 1), 1000);
        return () => clearInterval(timerRef.current);
    }, [selectedChallenge?.id]);

    const mins = Math.floor(elapsed / 60);
    const secs = elapsed % 60;
    const timerStr = `${mins}:${secs.toString().padStart(2, '0')}`;

    if (!selectedChallenge) return null;

    const diffMeta = DIFFICULTY_META[selectedChallenge.difficulty];

    return (
        <Flex
            bg="#1e293b"
            borderBottom="1px solid"
            borderColor="gray.700"
            px={4}
            py={3}
            align="center"
            justify="space-between"
        >
            {/* Left: Back + title */}
            <Flex align="center" gap={4}>
                <IconButton
                    icon={<ArrowLeftIcon w={6} h={6} />}
                    variant="ghost"
                    color="gray.400"
                    _hover={{ color: 'gray.100' }}
                    onClick={() => navigate('/challenges')}
                    aria-label="Back to challenges"
                    size="sm"
                />
                <Box>
                    <Text fontFamily="heading" fontWeight="bold" color="gray.100" fontSize="md">
                        {selectedChallenge.title}
                    </Text>
                    <Text fontSize="xs" color="gray.400">
                        {diffMeta.label} • {selectedChallenge.tags.join(' • ')}
                    </Text>
                </Box>
            </Flex>

            {/* Right: Timer + actions */}
            <Flex align="center" gap={4}>
                <Flex align="center" gap={2} fontSize="sm" color="gray.400">
                    <ClockIcon w={4} h={4} color="brand.500" />
                    <Text fontFamily="mono" color="brand.500" fontWeight="bold">{timerStr}</Text>
                </Flex>
                <Button
                    size="sm"
                    bg="gray.700"
                    color="gray.300"
                    _hover={{ bg: 'gray.600' }}
                    fontWeight="semibold"
                    onClick={resetCode}
                >
                    Reset
                </Button>
                <Button
                    size="sm"
                    variant="primary"
                    fontWeight="bold"
                    onClick={submitCode}
                    isLoading={isSubmitting}
                    loadingText="Submitting"
                >
                    Submit
                </Button>
            </Flex>
        </Flex>
    );
};

export default ChallengeHeader;
