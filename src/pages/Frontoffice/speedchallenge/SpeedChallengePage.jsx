/**
 * SpeedChallengePage – /speed-challenge
 *
 * New-user placement test:
 *   • 3 problems (Easy → Medium → Hard)
 *   • 15-minute countdown
 *   • Automatic rank assignment on finish/timeout
 *
 * Layout: Intro → [Problem panel | Editor panel] → Result
 */
import React, { useState, useEffect, useRef, useCallback } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../auth/context/AuthContext';
import {
    Box, Flex, Text, Button, VStack, HStack, Image,
} from '@chakra-ui/react';
import { motion, AnimatePresence } from 'framer-motion';

import {
    SPEED_CHALLENGE_PROBLEMS,
    computePlacement,
    TOTAL_SECONDS,
} from './data/speedChallengeProblems';
import SpeedTimer from './components/SpeedTimer';
import ProblemStepper from './components/ProblemStepper';
import SpeedProblemPanel from './components/SpeedProblemPanel';
import SpeedCodeEditor from './components/SpeedCodeEditor';
import PlacementResult from './components/PlacementResult';
import { userService } from '../../../services/userService';

import Logo from '../../../assets/logo_algoarena.png';

// Key used to persist the placement so the SignIn page can read it
const PLACEMENT_STORAGE_KEY = 'sc_placement';

const MotionBox = motion.create(Box);
const MotionFlex = motion.create(Flex);

// ─── Phase enum ──────────────────────────────────────────────────
const PHASE = {
    INTRO: 'INTRO',
    CHALLENGE: 'CHALLENGE',
    RESULT: 'RESULT',
};

// ─── Intro screen ────────────────────────────────────────────────
const IntroScreen = ({ onStart }) => (
    <Box
        minH="100vh"
        bg="#0f172a"
        display="flex"
        alignItems="center"
        justifyContent="center"
        position="relative"
        overflow="hidden"
    >
        {/* Background decoration */}
        <Box position="absolute" inset={0} pointerEvents="none" zIndex={0}>
            <Box
                position="absolute"
                inset={0}
                opacity={0.25}
                backgroundSize="40px 40px"
                backgroundImage="linear-gradient(to right, rgba(30,41,59,0.6) 1px, transparent 1px), linear-gradient(to bottom, rgba(30,41,59,0.6) 1px, transparent 1px)"
            />
            <Box
                position="absolute"
                top="10%"
                left="15%"
                w="360px"
                h="360px"
                bg="blue.800"
                borderRadius="full"
                filter="blur(120px)"
                opacity={0.15}
            />
            <Box
                position="absolute"
                bottom="10%"
                right="15%"
                w="360px"
                h="360px"
                bg="cyan.700"
                borderRadius="full"
                filter="blur(120px)"
                opacity={0.15}
                className="animate-pulse-glow"
                style={{ animationDelay: '1.5s' }}
            />
            {/* Floating code snippets */}
            <Text
                position="absolute"
                top="18%"
                left="8%"
                fontFamily="mono"
                fontSize="xs"
                color="brand.500"
                opacity={0.2}
                className="float-animation"
            >
                O(n log n) → Platinum
            </Text>
            <Text
                position="absolute"
                bottom="25%"
                right="10%"
                fontFamily="mono"
                fontSize="xs"
                color="green.400"
                opacity={0.2}
                className="float-animation"
                style={{ animationDelay: '2s' }}
            >
                {'// 15 minutes. 3 problems.'}
            </Text>
        </Box>

        <MotionBox
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, ease: 'easeOut' }}
            maxW="580px"
            w="100%"
            mx={4}
            position="relative"
            zIndex={10}
        >
            <Box
                bg="rgba(15,23,42,0.95)"
                backdropFilter="blur(20px)"
                borderRadius="24px"
                border="1px solid rgba(34,211,238,0.15)"
                boxShadow="0 0 60px rgba(34,211,238,0.08), 0 24px 48px rgba(0,0,0,0.5)"
                overflow="hidden"
            >
                {/* Top gradient bar */}
                <Box h="3px" bgGradient="linear(to-r, #22d3ee, #a855f7, #22d3ee)" />

                <VStack spacing={8} p={10} align="center">
                    {/* Logo */}
                    <Image src={Logo} alt="AlgoArena" h="40px" objectFit="contain" />

                    {/* Badge */}
                    <HStack
                        spacing={2}
                        px={3}
                        py={1.5}
                        borderRadius="full"
                        bg="rgba(34,211,238,0.08)"
                        border="1px solid rgba(34,211,238,0.2)"
                    >
                        <Box w="8px" h="8px" borderRadius="full" bg="brand.500" className="animate-pulse-glow" />
                        <Text fontSize="xs" fontFamily="mono" color="brand.500" letterSpacing="0.1em">
                            NEW USER PLACEMENT TEST
                        </Text>
                    </HStack>

                    {/* Title */}
                    <VStack spacing={3} textAlign="center">
                        <Text
                            fontSize={{ base: '3xl', md: '4xl' }}
                            fontWeight="black"
                            fontFamily="heading"
                            color="white"
                            lineHeight={1.1}
                        >
                            ⚡ Speed Challenge
                        </Text>
                        <Text fontSize="sm" color="gray.400" maxW="380px" lineHeight="1.8">
                            Complete 3 coding problems in <strong style={{ color: '#22d3ee' }}>15 minutes</strong> to discover your true level. Your rank will be <strong style={{ color: 'white' }}>automatically assigned</strong> and applied to your new account.
                        </Text>
                    </VStack>

                    {/* Rules */}
                    <Box
                        w="100%"
                        p={5}
                        borderRadius="14px"
                        bg="rgba(255,255,255,0.03)"
                        border="1px solid rgba(255,255,255,0.07)"
                    >
                        <Text
                            fontSize="xs"
                            fontFamily="mono"
                            color="gray.500"
                            letterSpacing="0.1em"
                            textTransform="uppercase"
                            mb={4}
                        >
                            Rules
                        </Text>
                        <VStack spacing={3} align="stretch">
                            {[
                                { icon: '📝', text: '3 algorithmic problems — Easy, Medium, Hard' },
                                { icon: '⏱️', text: '15 minutes total — the clock is always ticking' },
                                { icon: '🔀', text: 'Solve in any order — skip and come back' },
                                { icon: '🏆', text: 'Your rank is computed from speed + problems solved' },
                                { icon: '🔑', text: 'Sign in after the test — your rank will be waiting!' },
                            ].map((rule, i) => (
                                <HStack key={i} spacing={3} align="flex-start">
                                    <Text fontSize="lg" lineHeight={1.5}>{rule.icon}</Text>
                                    <Text fontSize="sm" color="gray.300" lineHeight="1.6">
                                        {rule.text}
                                    </Text>
                                </HStack>
                            ))}
                        </VStack>
                    </Box>

                    {/* Rank preview */}
                    <Box w="100%">
                        <Text
                            fontSize="xs"
                            fontFamily="mono"
                            color="gray.500"
                            letterSpacing="0.1em"
                            textTransform="uppercase"
                            mb={3}
                        >
                            Possible ranks
                        </Text>
                        <Flex gap={2} flexWrap="wrap" justify="center">
                            {[
                                { label: '🥉 Bronze', color: '#cd7f32' },
                                { label: '🥈 Silver', color: '#c0c0c0' },
                                { label: '🥇 Gold', color: '#facc15' },
                                { label: '🔷 Platinum', color: '#22d3ee' },
                                { label: '💎 Diamond', color: '#a855f7' },
                            ].map((r) => (
                                <Box
                                    key={r.label}
                                    px={3}
                                    py={1}
                                    borderRadius="8px"
                                    border="1px solid"
                                    borderColor={`${r.color}40`}
                                    bg={`${r.color}10`}
                                    fontSize="xs"
                                    fontWeight="semibold"
                                    color={r.color}
                                >
                                    {r.label}
                                </Box>
                            ))}
                        </Flex>
                    </Box>

                    {/* CTA */}
                    <Button
                        w="100%"
                        h="52px"
                        onClick={onStart}
                        bgGradient="linear(to-r, brand.500, cyan.400)"
                        color="#0f172a"
                        fontWeight="bold"
                        fontSize="md"
                        borderRadius="12px"
                        boxShadow="0 4px 30px rgba(34,211,238,0.45)"
                        _hover={{ transform: 'translateY(-2px)', boxShadow: '0 8px 40px rgba(34,211,238,0.6)' }}
                        _active={{ transform: 'translateY(0)' }}
                        transition="all 0.3s ease"
                        role="group"
                        position="relative"
                        overflow="hidden"
                    >
                        <Box
                            position="absolute"
                            inset={0}
                            bg="whiteAlpha.200"
                            transform="translateX(-100%) skewX(-12deg)"
                            _groupHover={{ transform: 'translateX(100%) skewX(-12deg)' }}
                            transition="transform 0.5s"
                        />
                        <HStack spacing={2} position="relative">
                            <Text>Start the Challenge</Text>
                            <Text>⚡</Text>
                        </HStack>
                    </Button>
                </VStack>
            </Box>
        </MotionBox>
    </Box>
);

// ─── Main Challenge Arena ─────────────────────────────────────────
const ChallengeArena = ({
    problems,
    currentIndex,
    setCurrentIndex,
    codes,
    onCodeChange,
    languages,
    onLanguageChange,
    secondsLeft,
    elapsedSeconds,
    solvedIds,
    onMarkSolved,
    onFinish,
}) => {
    const problem = problems[currentIndex];
    const [submitState, setSubmitState] = useState('idle'); // idle | running | success | error
    const [feedback, setFeedback] = useState('');

    const handleSubmit = useCallback(() => {
        if (!codes[problem.id]?.trim()) {
            setFeedback('⚠️ Please write some code before submitting.');
            setSubmitState('error');
            return;
        }
        setSubmitState('running');
        setFeedback('');
        // Simulate test run (1.5s)
        setTimeout(() => {
            const isCorrect = Math.random() > 0.25; // 75% success for demo
            if (isCorrect) {
                setSubmitState('success');
                setFeedback('✅ All test cases passed!');
                onMarkSolved(problem.id);
                // Auto-advance after 1.5s
                setTimeout(() => {
                    setSubmitState('idle');
                    setFeedback('');
                    const next = currentIndex + 1;
                    if (next < problems.length) {
                        setCurrentIndex(next);
                    } else {
                        onFinish();
                    }
                }, 1500);
            } else {
                setSubmitState('error');
                setFeedback('❌ Some test cases failed. Review your solution.');
            }
        }, 1500);
    }, [codes, problem, currentIndex, problems, onMarkSolved, onFinish, setCurrentIndex]);

    const isExpired = secondsLeft <= 0;
    const isSolved = solvedIds.includes(problem?.id);

    return (
        <Flex direction="column" minH="100vh" maxH="100vh" bg="#0f172a" overflow="hidden">
            {/* ── Top Navigation Bar ── */}
            <Flex
                as="header"
                align="center"
                justify="space-between"
                px={4}
                py={2.5}
                bg="#0b1220"
                borderBottom="1px solid rgba(255,255,255,0.06)"
                flexShrink={0}
                gap={2}
                flexWrap="wrap"
            >
                {/* Left: logo + challenge name */}
                <HStack spacing={3}>
                    <Image src={Logo} alt="AlgoArena" h="28px" objectFit="contain" />
                    <Box w="1px" h="20px" bg="rgba(255,255,255,0.08)" />
                    <HStack spacing={2}>
                        <Text fontSize="xs" color="brand.500" fontFamily="mono" fontWeight="bold">
                            ⚡
                        </Text>
                        <Text fontSize="sm" fontWeight="semibold" color="white">
                            Speed Challenge
                        </Text>
                    </HStack>
                </HStack>

                {/* Center: stepper */}
                <ProblemStepper
                    currentIndex={currentIndex + 1}
                    solvedIds={solvedIds}
                    problems={problems}
                />

                {/* Right: timer + finish */}
                <HStack spacing={3}>
                    <SpeedTimer secondsLeft={secondsLeft} elapsedSeconds={elapsedSeconds} isExpired={isExpired} />
                    <Button
                        size="sm"
                        variant="outline"
                        colorScheme="red"
                        borderColor="rgba(239,68,68,0.3)"
                        color="red.400"
                        _hover={{ bg: 'rgba(239,68,68,0.08)', borderColor: 'red.400' }}
                        onClick={onFinish}
                        fontSize="xs"
                        fontFamily="mono"
                    >
                        Finish
                    </Button>
                </HStack>
            </Flex>

            {/* ── Problem tabs (mobile: top, desktop: inside panel) ── */}
            <Flex
                px={3}
                py={1.5}
                bg="rgba(11,18,32,0.9)"
                borderBottom="1px solid rgba(255,255,255,0.04)"
                gap={1}
                flexShrink={0}
            >
                {problems.map((p, i) => {
                    const active = i === currentIndex;
                    const solved = solvedIds.includes(p.id);
                    return (
                        <Button
                            key={p.id}
                            size="xs"
                            onClick={() => setCurrentIndex(i)}
                            px={3}
                            py={1}
                            h="auto"
                            borderRadius="6px"
                            bg={active ? `${p.difficultyColor}18` : 'transparent'}
                            border="1px solid"
                            borderColor={active ? `${p.difficultyColor}50` : 'transparent'}
                            color={solved ? '#22c55e' : active ? p.difficultyColor : 'gray.500'}
                            fontFamily="mono"
                            fontSize="xs"
                            fontWeight={active ? 'bold' : 'normal'}
                            _hover={{ bg: `${p.difficultyColor}10`, color: p.difficultyColor }}
                            transition="all 0.2s"
                            leftIcon={
                                solved ? (
                                    <svg width="10" height="10" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5">
                                        <path d="M20 6 9 17l-5-5" />
                                    </svg>
                                ) : undefined
                            }
                        >
                            {p.index}. {p.title}
                        </Button>
                    );
                })}
            </Flex>

            {/* ── Split layout ── */}
            <Flex flex={1} overflow="hidden" minH={0}>
                {/* LEFT: Problem panel */}
                <Box
                    w={{ base: '100%', lg: '42%' }}
                    display={{ base: 'none', lg: 'flex' }}
                    flexDirection="column"
                    bg="#0f172a"
                    borderRight="1px solid rgba(255,255,255,0.06)"
                    overflow="hidden"
                >
                    <AnimatePresence mode="wait">
                        <MotionBox
                            key={problem?.id}
                            initial={{ opacity: 0, x: -20 }}
                            animate={{ opacity: 1, x: 0 }}
                            exit={{ opacity: 0, x: 20 }}
                            transition={{ duration: 0.25 }}
                            flex={1}
                            overflow="hidden"
                            display="flex"
                            flexDirection="column"
                        >
                            <SpeedProblemPanel problem={problem} />
                        </MotionBox>
                    </AnimatePresence>
                </Box>

                {/* RIGHT: Editor & submit */}
                <Flex
                    w={{ base: '100%', lg: '58%' }}
                    direction="column"
                    overflow="hidden"
                    minH={0}
                >
                    {/* Code editor */}
                    <AnimatePresence mode="wait">
                        <MotionFlex
                            key={problem?.id + '-editor'}
                            initial={{ opacity: 0 }}
                            animate={{ opacity: 1 }}
                            exit={{ opacity: 0 }}
                            transition={{ duration: 0.2 }}
                            flex={1}
                            overflow="hidden"
                            minH={0}
                        >
                            <SpeedCodeEditor
                                code={codes[problem?.id] || ''}
                                onChange={(val) => onCodeChange(problem?.id, val)}
                                language={languages[problem?.id] || 'javascript'}
                                onLanguageChange={(lang) => onLanguageChange(problem?.id, lang)}
                            />
                        </MotionFlex>
                    </AnimatePresence>

                    {/* Bottom action bar */}
                    <Box
                        px={4}
                        py={3}
                        bg="#0b1220"
                        borderTop="1px solid rgba(255,255,255,0.06)"
                        flexShrink={0}
                    >
                        <Flex align="center" justify="space-between" gap={3} flexWrap="wrap">
                            {/* Feedback message */}
                            <Box flex={1}>
                                <AnimatePresence>
                                    {feedback && (
                                        <MotionBox
                                            initial={{ opacity: 0, y: 8 }}
                                            animate={{ opacity: 1, y: 0 }}
                                            exit={{ opacity: 0, y: -8 }}
                                            transition={{ duration: 0.2 }}
                                        >
                                            <Text
                                                fontSize="sm"
                                                fontFamily="mono"
                                                color={submitState === 'success' ? 'green.400' : 'red.400'}
                                            >
                                                {feedback}
                                            </Text>
                                        </MotionBox>
                                    )}
                                </AnimatePresence>

                                {isSolved && !feedback && (
                                    <HStack spacing={2}>
                                        <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="#22c55e" strokeWidth="2.5">
                                            <path d="M20 6 9 17l-5-5" />
                                        </svg>
                                        <Text fontSize="xs" color="green.400" fontFamily="mono">
                                            Solved!
                                        </Text>
                                    </HStack>
                                )}
                            </Box>

                            <HStack spacing={2}>
                                {/* Skip to next */}
                                {currentIndex < problems.length - 1 && (
                                    <Button
                                        size="sm"
                                        variant="ghost"
                                        color="gray.500"
                                        _hover={{ color: 'gray.300' }}
                                        fontSize="xs"
                                        fontFamily="mono"
                                        onClick={() => {
                                            setFeedback('');
                                            setSubmitState('idle');
                                            setCurrentIndex(currentIndex + 1);
                                        }}
                                    >
                                        Skip →
                                    </Button>
                                )}

                                {/* Submit */}
                                <Button
                                    size="sm"
                                    h="36px"
                                    px={5}
                                    onClick={handleSubmit}
                                    isLoading={submitState === 'running'}
                                    loadingText="Running..."
                                    isDisabled={isExpired || isSolved}
                                    bgGradient={isSolved ? undefined : 'linear(to-r, brand.500, cyan.400)'}
                                    bg={isSolved ? 'rgba(34,197,94,0.15)' : undefined}
                                    border={isSolved ? '1px solid rgba(34,197,94,0.3)' : 'none'}
                                    color={isSolved ? 'green.400' : '#0f172a'}
                                    fontWeight="bold"
                                    fontSize="xs"
                                    borderRadius="8px"
                                    boxShadow={isSolved ? 'none' : '0 0 20px rgba(34,211,238,0.3)'}
                                    _hover={isSolved ? {} : { transform: 'translateY(-1px)', boxShadow: '0 4px 20px rgba(34,211,238,0.5)' }}
                                    transition="all 0.2s"
                                >
                                    {isSolved ? '✓ Solved' : 'Submit →'}
                                </Button>
                            </HStack>
                        </Flex>
                    </Box>
                </Flex>
            </Flex>
        </Flex>
    );
};

// ─── SpeedChallengePage ───────────────────────────────────────────
const SpeedChallengePage = () => {
    const navigate = useNavigate();
    const { updateCurrentUser } = useAuth();
    const [phase, setPhase] = useState(PHASE.INTRO);
    const [secondsLeft, setSecondsLeft] = useState(TOTAL_SECONDS);
    const [currentIndex, setCurrentIndex] = useState(0);
    const [solvedIds, setSolvedIds] = useState([]);
    const [placement, setPlacement] = useState(null);
    const [elapsedSeconds, setElapsedSeconds] = useState(0);
    const timerRef = useRef(null);

    // Codes per problem
    const [codes, setCodes] = useState(() =>
        Object.fromEntries(
            SPEED_CHALLENGE_PROBLEMS.map((p) => [p.id, p.starterCode.javascript])
        )
    );

    // Language per problem
    const [languages, setLanguages] = useState(() =>
        Object.fromEntries(SPEED_CHALLENGE_PROBLEMS.map((p) => [p.id, 'javascript']))
    );

    // Start timer on challenge phase
    useEffect(() => {
        if (phase !== PHASE.CHALLENGE) return;
        timerRef.current = setInterval(() => {
            setSecondsLeft((s) => {
                if (s <= 1) {
                    clearInterval(timerRef.current);
                    handleFinish(true);
                    return 0;
                }
                return s - 1;
            });
            setElapsedSeconds((e) => e + 1);
        }, 1000);
        return () => clearInterval(timerRef.current);
    }, [phase]); // eslint-disable-line react-hooks/exhaustive-deps

    const handleStart = () => {
        setPhase(PHASE.CHALLENGE);
        setSecondsLeft(TOTAL_SECONDS);
        setElapsedSeconds(0);
        setSolvedIds([]);
        setCurrentIndex(0);
    };

    const handleFinish = useCallback(
        (timeout = false) => {
            clearInterval(timerRef.current);
            const used = TOTAL_SECONDS - (timeout ? 0 : secondsLeft);
            const result = computePlacement(solvedIds, used);

            // Persist to backend (fire-and-forget; errors don't block the result screen)
            userService.updatePlacement({
                rank: result.rank,
                xp: result.xp,
                level: result.rank,
            }).then(() => {
                // Immediately reflect rank + XP in the navbar
                updateCurrentUser({ rank: result.rank, xp: result.xp, level: result.rank });
            }).catch(() => { /* silent — user still sees result */ });

            // Also keep in localStorage as a local cache
            try {
                localStorage.setItem(PLACEMENT_STORAGE_KEY, JSON.stringify({
                    rank: result.rank,
                    label: result.label,
                    color: result.color,
                    xp: result.xp,
                    message: result.message,
                }));
            } catch (_) { }
            setPlacement(result);
            setElapsedSeconds(used);
            setPhase(PHASE.RESULT);
        },
        [secondsLeft, solvedIds]
    );

    const handleMarkSolved = useCallback((id) => {
        setSolvedIds((prev) => (prev.includes(id) ? prev : [...prev, id]));
    }, []);

    const handleCodeChange = useCallback((id, val) => {
        setCodes((prev) => ({ ...prev, [id]: val }));
    }, []);

    const handleLanguageChange = useCallback((id, lang) => {
        setLanguages((prev) => ({ ...prev, [id]: lang }));
        setCodes((prev) => ({
            ...prev,
            [id]: SPEED_CHALLENGE_PROBLEMS.find((p) => p.id === id)?.starterCode[lang] || '',
        }));
    }, []);

    const handleDone = () => navigate('/', { replace: true });

    // ── Render ──
    if (phase === PHASE.INTRO) return <IntroScreen onStart={handleStart} />;

    if (phase === PHASE.RESULT) {
        return (
            <PlacementResult
                placement={placement}
                solvedIds={solvedIds}
                totalSeconds={elapsedSeconds}
                problems={SPEED_CHALLENGE_PROBLEMS}
                onDone={handleDone}
            />
        );
    }

    return (
        <ChallengeArena
            problems={SPEED_CHALLENGE_PROBLEMS}
            currentIndex={currentIndex}
            setCurrentIndex={setCurrentIndex}
            codes={codes}
            onCodeChange={handleCodeChange}
            languages={languages}
            onLanguageChange={handleLanguageChange}
            secondsLeft={secondsLeft}
            elapsedSeconds={elapsedSeconds}
            solvedIds={solvedIds}
            onMarkSolved={handleMarkSolved}
            onFinish={() => handleFinish(false)}
        />
    );
};

export default SpeedChallengePage;
