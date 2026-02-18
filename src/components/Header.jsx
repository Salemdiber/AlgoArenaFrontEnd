import {
    Box,
    Container,
    Flex,
    HStack,
    Button,
    Link,
    IconButton,
    Icon,
    Drawer,
    DrawerOverlay,
    DrawerContent,
    DrawerCloseButton,
    DrawerBody,
    VStack,
    useDisclosure,
    Image,
} from '@chakra-ui/react';
import { Link as RouterLink, NavLink, useLocation } from 'react-router-dom';
import { useState } from 'react';
import { HamburgerIcon } from '@chakra-ui/icons';
import Logo from '../assets/logo_algoarena.png';
import AccessibilityDrawer from '../accessibility/components/AccessibilityDrawer';

/* Inline accessibility icon (universal figure) */
const AccessibilityIcon = (props) => (
    <Icon viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" {...props}>
        <circle cx="12" cy="4" r="2" fill="currentColor" stroke="none" />
        <path d="M5 8l7 1 7-1" />
        <path d="M12 9v5" />
        <path d="M9 21l3-7 3 7" />
    </Icon>
);

const navItems = [
    { label: 'Home', to: '/' },
    { label: 'Battles', to: '/battles' },
    { label: 'Challenges', to: '/challenges' },
    { label: 'Leaderboard', to: '/leaderboard' },
    { label: 'Community', to: '/#community' },
    { label: 'Dashboard', to: '/admin' },
];

const Header = () => {
    const [headerSpotlight, setHeaderSpotlight] = useState({ left: 0 });
    const { isOpen, onOpen, onClose } = useDisclosure();
    const {
        isOpen: isA11yOpen,
        onOpen: onA11yOpen,
        onClose: onA11yClose,
    } = useDisclosure();
    const location = useLocation();

    const handleMouseMove = (e) => {
        const rect = e.currentTarget.getBoundingClientRect();
        const x = e.clientX - rect.left;
        setHeaderSpotlight({ left: x - 150 });
    };

    const isActive = (path) => {
        if (path === '/') return location.pathname === '/';
        return location.pathname.startsWith(path) && !path.startsWith('/#');
    };

    return (
        <Box
            as="header"
            position="fixed"
            top={0}
            left={0}
            right={0}
            zIndex={50}
            backdropFilter="blur(16px)"
            bg="rgba(17, 24, 39, 0.9)"
            borderBottom="1px solid"
            borderColor="gray.800"
            onMouseMove={handleMouseMove}
        >
            {/* Header Spotlight Effect */}
            <Box
                position="absolute"
                top={0}
                left={`${headerSpotlight.left}px`}
                width="300px"
                height="100%"
                bgGradient="linear(to-r, transparent, rgba(34, 211, 238, 0.05), transparent)"
                pointerEvents="none"
                transition="left 0.1s ease-out"
            />

            <Container maxW="7xl" position="relative" zIndex={10}>
                <Flex h={16} alignItems="center" justifyContent="space-between">
                    {/* Logo */}
                    <Box display="flex" alignItems="center">
                        <Image src={Logo} alt="AlgoArena Logo" h="60px" objectFit="contain" />
                    </Box>

                    {/* Desktop Navigation */}
                    <HStack
                        as="nav"
                        spacing={8}
                        display={{ base: 'none', md: 'flex' }}
                    >
                        {navItems.map((item) => (
                            <Link
                                key={item.to}
                                as={NavLink}
                                to={item.to}
                                color={isActive(item.to) ? 'brand.500' : 'gray.300'}
                                fontWeight={isActive(item.to) ? 'semibold' : 'normal'}
                                _hover={{ color: 'brand.500' }}
                                transition="all 0.3s"
                                position="relative"
                                _after={isActive(item.to) ? {
                                    content: '""',
                                    position: 'absolute',
                                    bottom: '-4px',
                                    left: '0',
                                    right: '0',
                                    height: '2px',
                                    bg: 'brand.500',
                                    borderRadius: 'full',
                                } : {}}
                            >
                                {item.label}
                            </Link>
                        ))}
                    </HStack>

                    {/* CTA Buttons + A11y + Mobile Hamburger */}
                    <HStack spacing={3}>
                        {/* Accessibility icon */}
                        <IconButton
                            aria-label="Open accessibility settings"
                            icon={<AccessibilityIcon w={5} h={5} />}
                            variant="ghost"
                            color="gray.400"
                            fontSize="20px"
                            size="sm"
                            borderRadius="8px"
                            onClick={onA11yOpen}
                            _hover={{ color: 'brand.500', bg: 'rgba(34, 211, 238, 0.1)' }}
                        />

                        <Button
                            as={RouterLink}
                            to="/signin"
                            display={{ base: 'none', sm: 'inline-flex' }}
                            variant="ghost"
                            size="md"
                        >
                            Login
                        </Button>
                        <Button
                            as={RouterLink}
                            to="/signup"
                            variant="primary"
                            size="md"
                            boxShadow="custom"
                            display={{ base: 'none', sm: 'inline-flex' }}
                        >
                            Create Account
                        </Button>

                        {/* Hamburger – mobile only */}
                        <IconButton
                            aria-label="Open menu"
                            icon={<HamburgerIcon />}
                            variant="ghost"
                            color="gray.300"
                            fontSize="24px"
                            display={{ base: 'flex', md: 'none' }}
                            onClick={onOpen}
                            _hover={{ color: 'brand.500' }}
                        />
                    </HStack>
                </Flex>
            </Container>

            {/* Mobile Nav Drawer */}
            <Drawer isOpen={isOpen} placement="right" onClose={onClose} size="xs">
                <DrawerOverlay bg="rgba(0, 0, 0, 0.6)" backdropFilter="blur(4px)" />
                <DrawerContent bg="#0f172a" borderLeft="1px solid" borderColor="gray.800">
                    <DrawerCloseButton color="gray.400" _hover={{ color: 'brand.500' }} mt={2} />
                    <DrawerBody pt={16}>
                        <VStack spacing={6} align="stretch">
                            {navItems.map((item) => (
                                <Link
                                    key={item.to}
                                    as={NavLink}
                                    to={item.to}
                                    color={isActive(item.to) ? 'brand.500' : 'gray.300'}
                                    fontWeight={isActive(item.to) ? 'bold' : 'medium'}
                                    fontSize="lg"
                                    fontFamily="heading"
                                    _hover={{ color: 'brand.500' }}
                                    onClick={onClose}
                                    borderLeft={isActive(item.to) ? '3px solid' : '3px solid transparent'}
                                    borderColor={isActive(item.to) ? 'brand.500' : 'transparent'}
                                    pl={4}
                                    transition="all 0.3s"
                                >
                                    {item.label}
                                </Link>
                            ))}

                            {/* Accessibility link in mobile drawer */}
                            <Box
                                as="button"
                                display="flex"
                                alignItems="center"
                                gap={3}
                                color="gray.400"
                                fontSize="lg"
                                fontFamily="heading"
                                fontWeight="medium"
                                pl={4}
                                _hover={{ color: 'brand.500' }}
                                onClick={() => { onClose(); onA11yOpen(); }}
                                borderLeft="3px solid transparent"
                                transition="all 0.3s"
                                textAlign="left"
                            >
                                <AccessibilityIcon w={5} h={5} />
                                Accessibility
                            </Box>

                            {/* Mobile CTA */}
                            <Box pt={4} borderTop="1px solid" borderColor="gray.800">
                                <VStack spacing={3}>
                                    <Button
                                        as={RouterLink}
                                        to="/signin"
                                        variant="ghost"
                                        size="md"
                                        w="full"
                                        onClick={onClose}
                                    >
                                        Login
                                    </Button>
                                    <Button
                                        as={RouterLink}
                                        to="/signup"
                                        variant="primary"
                                        size="md"
                                        w="full"
                                        onClick={onClose}
                                    >
                                        Create Account
                                    </Button>
                                </VStack>
                            </Box>
                        </VStack>
                    </DrawerBody>
                </DrawerContent>
            </Drawer>

            {/* Accessibility Settings Drawer */}
            <AccessibilityDrawer isOpen={isA11yOpen} onClose={onA11yClose} />
        </Box>
    );
};

export default Header;
