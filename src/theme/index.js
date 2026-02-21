import { extendTheme } from '@chakra-ui/react';

const theme = extendTheme({
    config: {
        initialColorMode: 'dark',
        useSystemColorMode: false,
    },
    fonts: {
        heading: `'Montserrat', sans-serif`,
        body: `'Inter', sans-serif`,
    },
    colors: {
        brand: {
            50: '#e0f7fa',
            100: '#b2ebf2',
            200: '#80deea',
            300: '#4dd0e1',
            400: '#26c6da',
            500: '#22d3ee', // cyan-400
            600: '#00bcd4',
            700: '#00acc1',
            800: '#0097a7',
            900: '#006064',
        },
        gray: {
            50: '#f9fafb',
            100: '#f3f4f6',
            200: '#e5e7eb',
            300: '#d1d5db',
            400: '#9ca3af',
            500: '#6b7280',
            600: '#4b5563',
            700: '#374151',
            800: '#1f2937',
            900: '#111827',
        },
    },
    styles: {
        global: {
            body: {
                bg: 'gray.900',
                color: 'gray.100',
            },
        },
    },
    components: {
        Button: {
            baseStyle: {
                fontWeight: 'semibold',
                borderRadius: '8px',
            },
            variants: {
                primary: {
                    bg: 'brand.500',
                    color: 'gray.900',
                    _hover: {
                        bg: 'brand.600',
                        transform: 'translateY(-2px)',
                        boxShadow: '0 8px 24px rgba(34, 211, 238, 0.5)',
                    },
                    transition: 'all 0.3s',
                },
                secondary: {
                    bg: 'gray.800',
                    color: 'gray.100',
                    border: '2px solid',
                    borderColor: 'brand.500',
                    _hover: {
                        bg: 'gray.700',
                    },
                },
                ghost: {
                    bg: 'transparent',
                    color: 'gray.300',
                    border: '1px solid',
                    borderColor: 'gray.600',
                    _hover: {
                        bg: 'gray.800',
                    },
                },
            },
        },
    },
    shadows: {
        custom: '0px 4px 16px rgba(34, 211, 238, 0.3)',
        customHover: '0px 8px 24px rgba(34, 211, 238, 0.5)',
    },
});

export default theme;
