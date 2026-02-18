/**
 * ChallengePlayPage – /challenges/:id
 *
 * Split layout:
 *  LEFT  (45%) – ProblemTabs + ProblemDescription
 *  RIGHT (55%) – EditorToolbar + CodeEditorContainer + TerminalPanel
 *
 * Mobile: stacked with problem in a Drawer.
 * Loading skeleton state
 */
import React, { useEffect, useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import {
    Box,
    Flex,
    Text,
    Button,
    Drawer,
    DrawerOverlay,
    DrawerContent,
    DrawerCloseButton,
    DrawerBody,
    useDisclosure,
    Icon,
} from '@chakra-ui/react';
import { motion } from 'framer-motion';
import { useChallengeContext } from '../context/ChallengeContext';
import ChallengeHeader from '../components/ChallengeHeader';
import ProblemTabs from '../components/ProblemTabs';
import ProblemDescription from '../components/ProblemDescription';
import EditorToolbar from '../components/EditorToolbar';
import CodeEditorContainer from '../components/CodeEditorContainer';
import TerminalPanel from '../components/TerminalPanel';
import ChallengePlaySkeleton from '../../../../shared/skeletons/ChallengePlaySkeleton';

const MotionBox = motion.create(Box);

const MenuIcon = (props) => (
    <Icon viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" {...props}>
        <line x1="3" y1="12" x2="21" y2="12" />
        <line x1="3" y1="6" x2="21" y2="6" />
        <line x1="3" y1="18" x2="21" y2="18" />
    </Icon>
);

const ChallengePlayPage = () => {
    const { id } = useParams();
    const navigate = useNavigate();
    const {
        selectedChallenge,
        selectChallenge,
        deselectChallenge,
        code,
        setCode,
        language,
        setLanguage,
    } = useChallengeContext();

    // Loading state (simulated – will be replaced with real API call)
    const [isLoading, setIsLoading] = useState(true);

    // Mobile drawer for problem description
    const { isOpen, onOpen, onClose } = useDisclosure();

    // Select the challenge on mount
    useEffect(() => {
        if (id) selectChallenge(id);
        return () => deselectChallenge();
    }, [id]); // eslint-disable-line react-hooks/exhaustive-deps

    // Simulate data fetching
    useEffect(() => {
        // In production: replace with actual API call
        const timer = setTimeout(() => {
            setIsLoading(false);
        }, 1200);
        return () => clearTimeout(timer);
    }, [id]);

    // Show skeleton during loading
    if (isLoading) {
        return <ChallengePlaySkeleton />;
    }

    if (!selectedChallenge) {
        return (
            <Box
                minH="100vh"
                bg="#0f172a"
                display="flex"
                alignItems="center"
                justifyContent="center"
            >
                <Box textAlign="center">
                    <Text fontSize="2xl" fontWeight="bold" color="gray.100" mb={4}>
                        Challenge Not Found
                    </Text>
                    <Text color="gray.400" mb={6}>The requested challenge doesn't exist.</Text>
                    <Button variant="primary" onClick={() => navigate('/challenges')}>
                        Back to Challenges
                    </Button>
                </Box>
            </Box>
        );
    }

    return (
        <MotionBox
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.3 }}
            minH="100vh"
            bg="#0f172a"
            display="flex"
            flexDirection="column"
        >
            {/* Top nav bar */}
            <ChallengeHeader />

            {/* Mobile problem drawer toggle */}
            <Box
                display={{ base: 'block', lg: 'none' }}
                p={2}
                bg="#1e293b"
                borderBottom="1px solid"
                borderColor="gray.700"
            >
                <Button
                    size="sm"
                    variant="ghost"
                    color="gray.300"
                    leftIcon={<MenuIcon w={4} h={4} />}
                    onClick={onOpen}
                >
                    View Problem
                </Button>
            </Box>

            {/* Mobile Drawer */}
            <Drawer isOpen={isOpen} onClose={onClose} placement="left" size="full">
                <DrawerOverlay />
                <DrawerContent bg="#0f172a" color="gray.100">
                    <DrawerCloseButton color="gray.400" />
                    <DrawerBody pt={12} px={6} overflowY="auto">
                        <ProblemTabs />
                        <ProblemDescription />
                    </DrawerBody>
                </DrawerContent>
            </Drawer>

            {/* Main split layout */}
            <Flex flex={1} direction={{ base: 'column', lg: 'row' }} overflow="hidden">
                {/* LEFT PANEL – Problem */}
                <Box
                    display={{ base: 'none', lg: 'block' }}
                    w={{ lg: '45%' }}
                    bg="#0f172a"
                    overflowY="auto"
                    borderRight="1px solid"
                    borderColor="gray.700"
                    sx={{
                        '&::-webkit-scrollbar': { width: '6px' },
                        '&::-webkit-scrollbar-track': { bg: '#0f172a' },
                        '&::-webkit-scrollbar-thumb': { bg: '#334155', borderRadius: '3px' },
                    }}
                >
                    <Box p={6}>
                        <ProblemTabs />
                        <ProblemDescription />
                    </Box>
                </Box>

                {/* RIGHT PANEL – Editor */}
                <Flex
                    w={{ base: '100%', lg: '55%' }}
                    direction="column"
                    bg="#1a1a1a"
                    overflow="hidden"
                >
                    <EditorToolbar />

                    <CodeEditorContainer
                        code={code}
                        setCode={setCode}
                        language={language}
                        setLanguage={setLanguage}
                    />

                    <TerminalPanel />
                </Flex>
            </Flex>
        </MotionBox>
    );
};

export default ChallengePlayPage;
