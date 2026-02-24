import React from 'react';
import { Box } from '@chakra-ui/react';
import { Outlet } from 'react-router-dom';
import Header from '../components/Header';
import Footer from '../components/Footer';
import AIAgent from '../components/AIAgent';

const PublicLayout = () => {
    return (
        <Box minH="100vh" bg="gray.900">
            <Header />
            <Box as="main" id="main-content">
                <Outlet />
            </Box>
            <Footer />
            <AIAgent />
        </Box>
    );
};

export default PublicLayout;
