import React from 'react';
import { Box } from '@chakra-ui/react';
import { Outlet } from 'react-router-dom';
import Header from '../components/Header';
import Footer from '../components/Footer';

const PublicLayout = () => {
    return (
        <Box minH="100vh" bg="gray.900">
            <Header />
            <Box as="main" id="main-content">
                <Outlet />
            </Box>
            <Footer />
        </Box>
    );
};

export default PublicLayout;
