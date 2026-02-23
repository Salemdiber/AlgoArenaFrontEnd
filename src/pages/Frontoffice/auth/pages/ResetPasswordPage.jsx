/**
 * ResetPasswordPage – /reset-password/:token
 *
 * Simulates password reset using token from URL.
 * Includes password strength meter and requirements checklist.
 * Redirects to /reset-success if valid, or /reset-expired if invalid.
 */
import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import {
    Box,
    Button,
    FormControl,
    FormLabel,
    FormErrorMessage,
    Input,
    InputGroup,
    InputRightElement,
    Icon,
    IconButton,
    Link,
    Divider,
} from '@chakra-ui/react';
import { Link as RouterLink } from 'react-router-dom';
import AuthCard from '../components/AuthCard';
import AuthHeader from '../components/AuthHeader';
import PasswordStrengthMeter from '../components/PasswordStrengthMeter';
import RequirementChecklist from '../components/RequirementChecklist';
import usePasswordStrength from '../hooks/usePasswordStrength';
import ReCAPTCHA from 'react-google-recaptcha';
import { authService } from '../../../../services/authService';

/* Icons */
const LockIcon = (props) => (
    <Icon
        viewBox="0 0 24 24" fill="none" stroke="currentColor"
        strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" {...props}
    >
        <rect x="3" y="11" width="18" height="11" rx="2" ry="2" />
        <path d="M7 11V7a5 5 0 0 1 10 0v4" />
    </Icon>
);

const EyeIcon = (props) => (
    <Icon
        viewBox="0 0 24 24" fill="none" stroke="currentColor"
        strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" {...props}
    >
        <path d="M1 12s4-8 11-8 11 8 11 8-4 8-11 8-11-8-11-8z" />
        <circle cx="12" cy="12" r="3" />
    </Icon>
);

const EyeOffIcon = (props) => (
    <Icon
        viewBox="0 0 24 24" fill="none" stroke="currentColor"
        strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" {...props}
    >
        <path d="M17.94 17.94A10.07 10.07 0 0 1 12 20c-7 0-11-8-11-8a18.45 18.45 0 0 1 5.06-5.94M9.9 4.24A9.12 9.12 0 0 1 12 4c7 0 11 8 11 8a18.5 18.5 0 0 1-2.16 3.19m-6.72-1.07a3 3 0 1 1-4.24-4.24" />
        <line x1="1" y1="1" x2="23" y2="23" />
    </Icon>
);

const ArrowLeftIcon = (props) => (
    <Icon
        viewBox="0 0 24 24" fill="none" stroke="currentColor"
        strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" {...props}
    >
        <line x1="19" y1="12" x2="5" y2="12" />
        <polyline points="12 19 5 12 12 5" />
    </Icon>
);

const ResetPasswordPage = () => {
    const { token } = useParams();
    const navigate = useNavigate();

    const [password, setPassword] = useState('');
    const [confirmPassword, setConfirmPassword] = useState('');
    const [showPassword, setShowPassword] = useState(false);
    const [isLoading, setIsLoading] = useState(false);
    const [error, setError] = useState('');
    const [recaptchaToken, setRecaptchaToken] = useState(null);

    const { score, label, color, glowColor, percent, requirements } = usePasswordStrength(password);

    useEffect(() => {
        // Mock validation: check if token is "expired"
        if (token === 'expired-token') {
            navigate('/reset-expired');
        }
    }, [token, navigate]);

    const handleSubmit = (e) => {
        e.preventDefault();

        // Passwords match
        if (password !== confirmPassword) {
            setError('Passwords do not match');
            return;
        }

        if (score < 2) {
            setError('Password is too weak');
            return;
        }

        if (!recaptchaToken) {
            setError('Please complete reCAPTCHA');
            return;
        }

        setError('');
        setIsLoading(true);

        const doReset = async () => {
            try {
                await authService.resetPassword(token, password, confirmPassword, recaptchaToken);
                navigate('/reset-success');
            } catch (err) {
                if (err.message && err.message.toLowerCase().includes('expired')) {
                    navigate('/reset-expired');
                } else {
                    setError(err.message || 'Failed to reset password');
                }
            } finally {
                setIsLoading(false);
            }
        };
        doReset();
    };

    const inputStyles = {
        bg: '#0f172a',
        border: '1px solid',
        borderColor: 'gray.600',
        borderRadius: '8px',
        color: 'gray.100',
        h: '48px',
        fontSize: 'sm',
        _placeholder: { color: 'gray.500' },
        _focus: { borderColor: '#22d3ee', boxShadow: '0 0 0 2px rgba(34, 211, 238, 0.2)', outline: 'none' },
        _hover: { borderColor: 'gray.500' },
        transition: 'all 0.2s',
    };

    return (
        <AuthCard>
            <AuthHeader
                icon={<LockIcon w={5} h={5} color="#22d3ee" />}
                title="Create New Password"
                subtitle="Choose a strong password to secure your account."
            />

            <form onSubmit={handleSubmit}>
                {/* Password Input */}
                <FormControl mb={4} isInvalid={!!error && error.includes('weak')}>
                    <FormLabel fontSize="sm" fontWeight="medium" color="gray.300">New Password</FormLabel>
                    <InputGroup>
                        <Input
                            type={showPassword ? 'text' : 'password'}
                            placeholder="Enter new password"
                            value={password}
                            onChange={(e) => setPassword(e.target.value)}
                            {...inputStyles}
                        />
                        <InputRightElement h="100%">
                            <IconButton
                                variant="ghost"
                                size="sm"
                                onClick={() => setShowPassword(!showPassword)}
                                icon={showPassword ? <EyeOffIcon /> : <EyeIcon />}
                                color="gray.500"
                                _hover={{ bg: 'transparent', color: 'gray.300' }}
                                aria-label={showPassword ? 'Hide password' : 'Show password'}
                            />
                        </InputRightElement>
                    </InputGroup>
                </FormControl>

                {/* Strength Meter */}
                <PasswordStrengthMeter
                    score={score}
                    label={label}
                    color={color}
                    glowColor={glowColor}
                    percent={percent}
                />

                {/* Requirements Checklist */}
                <Box mb={6}>
                    <RequirementChecklist requirements={requirements} />
                </Box>

                {/* Confirm Password Input */}
                <FormControl mb={6} isInvalid={!!error}>
                    <FormLabel fontSize="sm" fontWeight="medium" color="gray.300">Confirm Password</FormLabel>
                    <Input
                        type="password"
                        placeholder="Re-enter new password"
                        value={confirmPassword}
                        onChange={(e) => { setConfirmPassword(e.target.value); setError(''); }}
                        {...inputStyles}
                    />
                    <FormErrorMessage fontSize="xs" mt={2}>{error}</FormErrorMessage>
                </FormControl>

                <Box w="100%" display="flex" flexDirection="column" alignItems="center" mb={6}>
                    <ReCAPTCHA
                        sitekey="6LdKIHMsAAAAACo6AkNg2KChjBhGcVCj2Rwj-rey"
                        onChange={(val) => { setRecaptchaToken(val); setError(''); }}
                        theme="dark"
                    />
                </Box>

                {/* Submit Button */}
                <Button
                    type="submit"
                    w="100%"
                    h="48px"
                    bg="#22d3ee"
                    color="#0f172a"
                    fontWeight="semibold"
                    borderRadius="8px"
                    boxShadow="0 4px 16px rgba(34, 211, 238, 0.2)"
                    isLoading={isLoading}
                    loadingText="Updating..."
                    isDisabled={password.length === 0 || confirmPassword.length === 0}
                    _hover={{
                        bg: '#06b6d4',
                        transform: 'translateY(-1px)',
                        boxShadow: '0 6px 24px rgba(34, 211, 238, 0.35)',
                    }}
                    _active={{ transform: 'translateY(0)' }}
                    transition="all 0.2s"
                    mb={6}
                >
                    Update Password
                </Button>
            </form>

            <Divider borderColor="gray.600" my={6} />

            {/* Back to Login */}
            <Box textAlign="center">
                <Link
                    as={RouterLink}
                    to="/signin"
                    color="#22d3ee"
                    fontSize="sm"
                    _hover={{ textDecoration: 'underline' }}
                    display="inline-flex"
                    alignItems="center"
                    gap={1}
                >
                    <ArrowLeftIcon w={4} h={4} />
                    Back to Login
                </Link>
            </Box>
        </AuthCard>
    );
};

export default ResetPasswordPage;
