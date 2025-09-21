import React, { useState, useEffect } from 'react';
import { BrowserRouter as Router, Route, Routes, useLocation } from 'react-router-dom';
import Layout from '@/components/Layout';
import ScrollToTop from '@/components/ScrollToTop';
import HomePage from '@/pages/HomePage';
import LibraryPage from '@/pages/LibraryPage';
import AboutPage from '@/pages/AboutPage';
import ContactPage from '@/pages/ContactPage';
import ReadingPage from '@/pages/ReadingPage';
import SalvationPage from '@/pages/SalvationPage';
import PrivacyPolicyPage from '@/pages/PrivacyPolicyPage';
import TermsOfServicePage from '@/pages/TermsOfServicePage';
import { Toaster } from '@/components/ui/toaster';
import { Helmet, HelmetProvider } from 'react-helmet-async';
import PageLoader from '@/components/PageLoader';
import { AnimatePresence } from 'framer-motion';

const AppContent = () => {
  const location = useLocation();
  const [loading, setLoading] = useState(false);
  const [isInitialLoad, setIsInitialLoad] = useState(true);

  useEffect(() => {
    if (isInitialLoad) {
      setIsInitialLoad(false);
      return;
    }

    setLoading(true);
    const timer = setTimeout(() => {
      setLoading(false);
    }, 900);

    return () => clearTimeout(timer);
  }, [location.pathname]);

  return (
    <>
      <AnimatePresence mode="wait">
        {loading && <PageLoader />}
      </AnimatePresence>
      
      <div style={{ visibility: loading ? 'hidden' : 'visible' }}>
        <Layout>
          <Routes location={location} key={location.pathname}>
            <Route path="/" element={<HomePage />} />
            <Route path="/library" element={<LibraryPage />} />
            <Route path="/about" element={<AboutPage />} />
            <Route path="/contact" element={<ContactPage />} />
            <Route path="/salvation" element={<SalvationPage />} />
            <Route path="/read/:itemId" element={<ReadingPage />} />
            <Route path="/privacy-policy" element={<PrivacyPolicyPage />} />
            <Route path="/terms-of-service" element={<TermsOfServicePage />} />
          </Routes>
        </Layout>
      </div>
    </>
  );
};


function App() {
  return (
    <HelmetProvider>
      <Router>
        <ScrollToTop />
        <Helmet>
          <title>Kingdom Pages – Faith-Based Digital Library</title>
          <link rel="icon" href="/./KingdomPagesLogo.jpg" type="image/jpg"/>
          <meta name="description" content="Discover a curated collection of Christian digital material: uplifting books, engaging comics, and inspiring stories for all ages." />
          <meta property="og:title" content="Kingdom Pages - Inspiring Digital Stories" />
          <meta property="og:description" content="Nourishing faith and inspiring minds through a curated collection of Christian digital literature." />
        </Helmet>
        <AppContent />
        <Toaster />
      </Router>
    </HelmetProvider>
  );
}

export default App;