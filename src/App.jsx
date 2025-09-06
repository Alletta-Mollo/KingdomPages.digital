import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import Layout from '@/components/Layout';
import ScrollToTop from '@/components/ScrollToTop';
import HomePage from '@/pages/HomePage';
import LibraryPage from '@/pages/LibraryPage';
import AboutPage from '@/pages/AboutPage';
import ContactPage from '@/pages/ContactPage';
import ReadingPage from '@/pages/ReadingPage'; 
import { Toaster } from '@/components/ui/toaster';
import { Helmet, HelmetProvider } from 'react-helmet-async';

function App() {
	return (
    <HelmetProvider>
      <Router>
        <ScrollToTop />
        <Helmet>
          <title>Kingdom Pages - Inspiring Digital Stories</title>
          <meta name="description" content="Discover a curated collection of Christian digital material: uplifting books, engaging comics, and inspiring stories for all ages." />
          <meta property="og:title" content="Kingdom Pages - Inspiring Digital Stories" />
          <meta property="og:description" content="Nourishing faith and inspiring minds through a curated collection of Christian digital literature." />
        </Helmet>
        <Layout>
          <Routes>
            <Route path="/" element={<HomePage />} />
            <Route path="/library" element={<LibraryPage />} />
            <Route path="/about" element={<AboutPage />} />
            <Route path="/contact" element={<ContactPage />} />
            <Route path="/read/:itemId" element={<ReadingPage />} />
          </Routes>
        </Layout>
        <Toaster />
      </Router>
    </HelmetProvider>
	);
}

export default App;