import { Box } from '@chakra-ui/react';
import Header from './components/Header';
import Footer from './components/Footer';
import Hero from './sections/Hero';
import Games from './sections/Games';
import Arena from './sections/Arena';
import Features from './sections/Features';
import Stats from './sections/Stats';
import CTA from './sections/CTA';

function App() {
  return (
    <Box minH="100vh" bg="gray.900">
      <Header />
      <Box as="main">
        <Hero />
        <Games />
        <Arena />
        <Features />
        <Stats />
        <CTA />
      </Box>
      <Footer />
    </Box>
  );
}

export default App;
