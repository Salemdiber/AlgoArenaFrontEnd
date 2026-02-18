/**
 * ChangePasswordSection – change-password form with strength meter + requirement checklist.
 *
 * All validation logic lives in the usePasswordStrength hook.
 */
import React, { useState } from 'react';
import {
    Box,
    Flex,
    Text,
    Button,
    Input,
    InputGroup,
    InputRightElement,
    IconButton,
    Icon,
    useToast,
} from '@chakra-ui/react';
import { ViewIcon, ViewOffIcon } from '@chakra-ui/icons';
import { motion, useReducedMotion } from 'framer-motion';
import usePasswordStrength from '../hooks/usePasswordStrength';
import PasswordStrengthMeter from './PasswordStrengthMeter';
import RequirementChecklist from './RequirementChecklist';

const MotionBox = motion.create(Box);

/* Input style token */
const inputStyles = {
    bg: '#0f172a',
    border: '1px solid',
    borderColor: '#334155',
    borderRadius: '6px',
    color: 'gray.100',
    py: '10px',
    _focus: { borderColor: '#22d3ee', boxShadow: '0 0 0 1px #22d3ee' },
    _placeholder: { color: '#475569' },
};

const ChangePasswordSection = () => {
    const toast = useToast();
    const prefersReducedMotion = useReducedMotion();

    const [currentPw, setCurrentPw] = useState('');
    const [newPw, setNewPw] = useState('');
    const [confirmPw, setConfirmPw] = useState('');

    const [showCurrent, setShowCurrent] = useState(false);
    const [showNew, setShowNew] = useState(false);
    const [showConfirm, setShowConfirm] = useState(false);

    const { score, label, color, glowColor, percent, requirements } = usePasswordStrength(newPw);

    const passwordsMatch = newPw.length > 0 && newPw === confirmPw;
    const canSubmit = score === 4 && passwordsMatch && currentPw.length > 0;

    const handleSubmit = () => {
        if (!canSubmit) return;
        // TODO: call API
        toast({
            title: 'Password updated',
            description: 'Your password has been changed successfully.',
            status: 'success',
            duration: 3000,
            isClosable: true,
            position: 'top',
        });
        setCurrentPw('');
        setNewPw('');
        setConfirmPw('');
    };

    return (
        <MotionBox
            initial={prefersReducedMotion ? false : { opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={prefersReducedMotion ? { duration: 0 } : { duration: 0.5, delay: 0.2, ease: 'easeOut' }}
            bg="#1e293b"
            borderRadius="12px"
            boxShadow="0 4px 20px rgba(0,0,0,0.4)"
            borderTop="2px solid #22d3ee"
            p={{ base: 6, md: 8 }}
        >
            <Box mb={6}>
                <Text fontFamily="heading" fontSize="lg" fontWeight="600" color="gray.100">
                    Change Password
                </Text>
                <Text color="gray.400" fontSize="sm" mt={1}>
                    Ensure your account stays secure with a strong password.
                </Text>
            </Box>

            <Flex direction="column" gap={5}>
                {/* Current Password */}
                <Box>
                    <Text fontSize="sm" fontWeight="500" color="gray.300" mb="6px">
                        Current Password
                    </Text>
                    <InputGroup>
                        <Input
                            type={showCurrent ? 'text' : 'password'}
                            placeholder="Enter current password"
                            value={currentPw}
                            onChange={(e) => setCurrentPw(e.target.value)}
                            {...inputStyles}
                        />
                        <InputRightElement>
                            <IconButton
                                aria-label="Toggle current password visibility"
                                variant="unstyled"
                                size="sm"
                                color="gray.500"
                                _hover={{ color: '#22d3ee' }}
                                icon={showCurrent ? <ViewOffIcon /> : <ViewIcon />}
                                onClick={() => setShowCurrent((v) => !v)}
                            />
                        </InputRightElement>
                    </InputGroup>
                </Box>

                {/* New Password */}
                <Box>
                    <Text fontSize="sm" fontWeight="500" color="gray.300" mb="6px">
                        New Password
                    </Text>
                    <InputGroup>
                        <Input
                            type={showNew ? 'text' : 'password'}
                            placeholder="Enter new password"
                            value={newPw}
                            onChange={(e) => setNewPw(e.target.value)}
                            {...inputStyles}
                        />
                        <InputRightElement>
                            <IconButton
                                aria-label="Toggle new password visibility"
                                variant="unstyled"
                                size="sm"
                                color="gray.500"
                                _hover={{ color: '#22d3ee' }}
                                icon={showNew ? <ViewOffIcon /> : <ViewIcon />}
                                onClick={() => setShowNew((v) => !v)}
                            />
                        </InputRightElement>
                    </InputGroup>

                    {/* Strength meter */}
                    <PasswordStrengthMeter
                        score={score}
                        label={label}
                        color={color}
                        glowColor={glowColor}
                        percent={percent}
                    />

                    {/* Requirements */}
                    <RequirementChecklist requirements={requirements} />
                </Box>

                {/* Confirm Password */}
                <Box>
                    <Text fontSize="sm" fontWeight="500" color="gray.300" mb="6px">
                        Confirm New Password
                    </Text>
                    <InputGroup>
                        <Input
                            type={showConfirm ? 'text' : 'password'}
                            placeholder="Re-enter new password"
                            value={confirmPw}
                            onChange={(e) => setConfirmPw(e.target.value)}
                            {...inputStyles}
                        />
                        <InputRightElement>
                            <IconButton
                                aria-label="Toggle confirm password visibility"
                                variant="unstyled"
                                size="sm"
                                color="gray.500"
                                _hover={{ color: '#22d3ee' }}
                                icon={showConfirm ? <ViewOffIcon /> : <ViewIcon />}
                                onClick={() => setShowConfirm((v) => !v)}
                            />
                        </InputRightElement>
                    </InputGroup>
                    {confirmPw.length > 0 && !passwordsMatch && (
                        <Text fontSize="xs" color="#ef4444" mt={1}>
                            Passwords do not match
                        </Text>
                    )}
                </Box>

                {/* Submit */}
                <Box pt={2}>
                    <Button
                        w="100%"
                        bg="#22d3ee"
                        color="#0f172a"
                        fontWeight="600"
                        borderRadius="6px"
                        py="10px"
                        boxShadow="0 4px 14px rgba(34, 211, 238, 0.2)"
                        _hover={{
                            bg: '#67e8f9',
                            boxShadow: '0 8px 24px rgba(34, 211, 238, 0.4)',
                            transform: 'translateY(-2px)',
                        }}
                        _active={{ transform: 'translateY(0)' }}
                        transition="all 0.2s"
                        isDisabled={!canSubmit}
                        onClick={handleSubmit}
                    >
                        Update Password
                    </Button>
                </Box>
            </Flex>
        </MotionBox>
    );
};

export default ChangePasswordSection;
