import React, { useState, useEffect } from 'react';
import { Box, Heading, Text, Button, VStack, HStack, Input, IconButton, Icon } from '@chakra-ui/react';
import { useLocation, useNavigate } from 'react-router-dom';
import AuthLayout from '../../../../layout/AuthLayout';
import { apiClient } from '../../../../services/apiClient';
import { useAuth, redirectBasedOnRole } from '../context/AuthContext';

const TwoFactorPage = () => {
    const location = useLocation();
    const navigate = useNavigate();
    const { reload, currentUser } = useAuth();
    const urlParams = new URLSearchParams(location.search);
    const username = location.state?.username || urlParams.get('username') || '';
    const from = location.state?.from || '/';

    const [sending, setSending] = useState(false);
    const [method, setMethod] = useState('');
    const [code, setCode] = useState('');
    const [message, setMessage] = useState('');
    const [verifying, setVerifying] = useState(false);
    const [phone, setPhone] = useState('');

    useEffect(() => {
        if (!username) {
            navigate('/signin', { replace: true });
        }
    }, [username, navigate]);

    const sendCode = async (m) => {
        setMessage('');
        const resolvedUsername = username || currentUser?.username || currentUser?.email || '';
        if (!resolvedUsername) {
            setMessage('Missing username — cannot send code');
            return;
        }
        if (m === 'sms' && !phone) {
            setMessage('Please enter your phone number');
            return;
        }
        setSending(true);
        try {
            const body = { username: resolvedUsername, method: m };
            if (m === 'sms' && phone) body.phone = phone;
            const resp = await apiClient('/auth/2fa/send', {
                method: 'POST',
                body: JSON.stringify(body),
                credentials: 'include',
            });
            if (resp && resp.ok === false) throw new Error(resp.message || 'Failed to send code');
            setMethod(m);
            setMessage(`Verification code sent via ${m}.`);
        } catch (e) {
            setMessage(e.message || 'Failed to send code');
        } finally {
            setSending(false);
        }
    };

    const verify = async () => {
        setMessage('');
        setVerifying(true);
        try {
            const resp = await apiClient('/auth/2fa/verify', {
                method: 'POST',
                body: JSON.stringify({ username, code }),
                credentials: 'include',
            });
            if (resp && resp.ok === false) throw new Error(resp.message || 'Verification failed');

            // Refresh auth state (backend should have issued tokens/cookies on success)
            await reload();

            // If reload populated user, navigate to original destination
            const dest = from || redirectBasedOnRole(currentUser);
            navigate(dest, { replace: true });
        } catch (e) {
            setMessage(e.message || 'Verification failed');
        } finally {
            setVerifying(false);
        }
    };

    return (
        <AuthLayout activeTab="signin">
            <Box maxW="md" mx="auto" mt={8} p={8} className="glass-panel" borderRadius="16px">
                <VStack spacing={4} align="stretch">
                    <Heading size="lg">Two-Factor Authentication</Heading>
                    <Text color="gray.400">Choose where to receive your verification code for <strong>{username}</strong>.</Text>

                    <HStack spacing={3}>
                        <Button flex={1} isLoading={sending && method === 'email'} onClick={() => sendCode('email')} isDisabled={!username && !currentUser?.username && !currentUser?.email}>
                            Send code to Email
                        </Button>
                        <Button flex={1} isLoading={sending && method === 'sms'} onClick={() => setMethod('phone-input')} isDisabled={!username && !currentUser?.username && !currentUser?.phone}>
                            Send code to Phone
                        </Button>
                    </HStack>

                    {method === 'phone-input' && (
                        <>
                            <Text fontSize="sm" color="gray.300">Enter your phone number to send the code via SMS.</Text>
                            <Input placeholder="+1234567890" value={phone} onChange={(e) => setPhone(e.target.value)} />
                            <Button colorScheme="cyan" isLoading={sending} onClick={() => sendCode('sms')}>Send Code</Button>
                        </>
                    )}

                    {(method === 'email' || method === 'sms') && (
                        <>
                            <Text fontSize="sm" color="gray.300">Enter the code sent to your {method}.</Text>
                            <Input placeholder="123456" value={code} onChange={(e) => setCode(e.target.value)} />
                            <Button colorScheme="cyan" isLoading={verifying} onClick={verify}>Verify code</Button>
                        </>
                    )}

                    {message && <Text color="yellow.200">{message}</Text>}
                </VStack>
            </Box>
        </AuthLayout>
    );
};

export default TwoFactorPage;
