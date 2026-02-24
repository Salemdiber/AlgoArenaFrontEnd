/**
 * ForgotPasswordPage – /forgot-password
 *
 * Email input with validation. On submit → redirects to /email-sent.
 * Matches the "Reset Your Password" card from forget_pwd_process.html.
 */
import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import {
    Box,
    Button,
    FormControl,
    FormLabel,
    FormErrorMessage,
    Input,
    Icon,
    Link,
    HStack,
    Text,
    Divider,
} from '@chakra-ui/react';
import { Link as RouterLink } from 'react-router-dom';
import AuthCard from '../components/AuthCard';
import AuthHeader from '../components/AuthHeader';
import ReCAPTCHA from 'react-google-recaptcha';
import { authService } from '../../../../services/authService';
import { useToast } from '@chakra-ui/react';

/* Icons */
const ShieldIcon = (props) => (
    <Icon
        viewBox="0 0 24 24" fill="none" stroke="currentColor"
        strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" {...props}
    >
        <path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z" />
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

const ForgotPasswordPage = () => {
    const navigate = useNavigate();
    const [email, setEmail] = useState('');
    const [error, setError] = useState('');
    const [isLoading, setIsLoading] = useState(false);

    const [recaptchaToken, setRecaptchaToken] = useState(null);
    const toast = useToast();

    const validateEmail = (value) => /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(value);

    const handleSubmit = async (e) => {
        e.preventDefault();
        if (!validateEmail(email)) {
            setError('Please enter a valid email address');
            return;
        }
        if (!recaptchaToken) {
            setError('Please complete reCAPTCHA');
            return;
        }
        setError('');
        setIsLoading(true);

        try {
            await authService.forgotPassword(email, recaptchaToken);
            navigate('/email-sent', { state: { email } });
        } catch (err) {
            setError(err.message || 'Failed to send reset link');
        } finally {
            setIsLoading(false);
        }
    };

    return (
        <AuthCard>
            <AuthHeader
                icon={<ShieldIcon w={5} h={5} color="#22d3ee" />}
                title="Reset Your Password"
                subtitle="Enter your email and we'll send you a reset link."
            />

            <form onSubmit={handleSubmit}>
                {/* Email input */}
                <FormControl isInvalid={!!error} mb={6}>
                    <FormLabel fontSize="sm" fontWeight="medium" color="gray.300">
                        Email Address
                    </FormLabel>
                    <Input
                        type="email"
                        placeholder="you@example.com"
                        value={email}
                        onChange={(e) => { setEmail(e.target.value); setError(''); }}
                        bg="#0f172a"
                        border="1px solid"
                        borderColor="gray.600"
                        borderRadius="8px"
                        color="gray.100"
                        h="48px"
                        fontSize="sm"
                        _placeholder={{ color: 'gray.500' }}
                        _focus={{
                            borderColor: '#22d3ee',
                            boxShadow: '0 0 0 2px rgba(34, 211, 238, 0.2)',
                            outline: 'none',
                        }}
                        _hover={{ borderColor: 'gray.500' }}
                        transition="all 0.2s"
                    />
                    <FormErrorMessage fontSize="xs" mt={2}>{error}</FormErrorMessage>
                </FormControl>

                <Box w="100%" display="flex" flexDirection="column" alignItems="center" mb={6}>
                    <ReCAPTCHA
                        sitekey="6LdKIHMsAAAAACo6AkNg2KChjBhGcVCj2Rwj-rey"
                        onChange={(token) => { setRecaptchaToken(token); setError(''); }}
                        theme="dark"
                    />
                </Box>

                {/* Submit */}
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
                    loadingText="Sending..."
                    _hover={{
                        bg: '#06b6d4',
                        transform: 'translateY(-1px)',
                        boxShadow: '0 6px 24px rgba(34, 211, 238, 0.35)',
                    }}
                    _active={{ transform: 'translateY(0)' }}
                    transition="all 0.2s"
                    mb={6}
                >
                    Send Reset Link
                </Button>
            </form>

            {/* Divider */}
            <Divider borderColor="gray.600" my={6} />

            {/* Back to login */}
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

export default ForgotPasswordPage;
