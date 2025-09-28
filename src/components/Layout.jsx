import React, { useState } from 'react';
import { NavLink, useLocation } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import { Button } from '@/components/ui/button';
import { BookOpenText, Home, Info, Mail, Menu, X, Library, Cross } from 'lucide-react';
import { ThemeToggle } from '@/components/ThemeToggle';
import { WavySeparator } from '@/components/WavySeparator';

const navItems = [
  { name: 'Home', path: '/', icon: Home },
  { name: 'Library', path: '/library', icon: Library },
  { name: 'About Us', path: '/about', icon: Info },
  { name: 'Salvation', path: '/salvation', icon: Cross },
  { name: 'Contact Us', path: '/contact', icon: Mail },
];

const Layout = ({ children }) => {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const location = useLocation();

  const toggleMobileMenu = () => setIsMobileMenuOpen(!isMobileMenuOpen);

  return (
    <div className="min-h-screen flex flex-col bg-background transition-colors duration-500 overflow-x-hidden">
      {/* Fixed Navbar */}
      <header className="fixed top-0 left-0 right-0 z-50 shadow-lg bg-background">
        <nav className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between h-20">
            <NavLink to="/" className="flex items-center space-x-2">
              <motion.div
                initial={{ scale: 0, rotate: -180 }}
                animate={{ scale: 1, rotate: 0 }}
                transition={{ type: 'spring', stiffness: 260, damping: 20, delay: 0.2 }}
              >
                <BookOpenText className="h-10 w-10 text-primary" />
              </motion.div>
              <span className="text-2xl gradient-text" style={{ fontFamily: "'Lexend', sans-serif" }}>
                Kingdom Pages
              </span>
            </NavLink>

            <div className="hidden md:flex items-center space-x-1">
              {navItems.map((item, index) => (
                <motion.div
                  key={item.name}
                  initial={{ y: -20, opacity: 0 }}
                  animate={{ y: 0, opacity: 1 }}
                  transition={{ delay: 0.1 * index + 0.5 }}
                >
                  <NavLink
                    to={item.path}
                    onClick={() => isMobileMenuOpen && toggleMobileMenu()}
                    className={({ isActive }) =>
                      `relative px-3 py-2 rounded-md text-sm transition-all duration-300 ease-in-out hover:text-primary transform hover:scale-105 ${
                        isActive ? 'text-primary' : 'text-muted-foreground'
                      }`
                    }
                  >
                    {({ isActive }) => (
                      <>
                        {item.name}
                        {isActive && (
                          <motion.div
                            layoutId="active-nav-underline"
                            className="absolute bottom-0 left-0 right-0 h-0.5 bg-primary"
                            initial={false}
                            transition={{ type: 'spring', stiffness: 350, damping: 30 }}
                          />
                        )}
                      </>
                    )}
                  </NavLink>
                </motion.div>
              ))}
              <motion.div
                initial={{ y: -20, opacity: 0 }}
                animate={{ y: 0, opacity: 1 }}
                transition={{ delay: 1 }}
                className="ml-4"
              >
                <ThemeToggle />
              </motion.div>
            </div>

            <div className="md:hidden flex items-center gap-2">
              <ThemeToggle />
              <Button variant="ghost" size="icon" onClick={toggleMobileMenu} aria-label="Open menu">
                {isMobileMenuOpen ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
              </Button>
            </div>
          </div>
        </nav>

        <AnimatePresence>
          {isMobileMenuOpen && (
            <motion.div
              initial={{ opacity: 0, height: 0 }}
              animate={{ opacity: 1, height: 'auto' }}
              exit={{ opacity: 0, height: 0 }}
              transition={{ duration: 0.3, ease: 'easeInOut' }}
              className="md:hidden bg-card shadow-xl origin-top"
            >
              <div className="px-2 pt-2 pb-3 space-y-1 sm:px-3 max-h-[calc(100vh-5rem)] overflow-y-auto">
                {navItems.map((item) => (
                  <NavLink
                    key={item.name}
                    to={item.path}
                    onClick={toggleMobileMenu}
                    className={({ isActive }) =>
                      `block px-3 py-2 rounded-md text-base transition-colors duration-200 ${
                        isActive ? 'bg-primary/10 text-primary' : 'text-muted-foreground hover:bg-muted/50'
                      }`
                    }
                  >
                    <div className="flex items-center space-x-3">
                      <item.icon className="h-5 w-5" />
                      <span>{item.name}</span>
                    </div>
                  </NavLink>
                ))}
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </header>

      {/* Main Content */}
      <main className="flex-grow container mx-auto px-4 sm:px-6 lg:px-8 pt-8 pb-12 relative">
        <AnimatePresence mode="wait">
          <motion.div
            key={location.pathname}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            transition={{ duration: 0.3 }}
          >
            {children}
          </motion.div>
        </AnimatePresence>
      </main>
        {/* Wavy Separator Above Footer */}
        <WavySeparator direction="up" className="text-background" />

        <footer className="bg-gradient-to-br from-purple-700 via-purple-600 to-purple-800 text-white text-center py-6">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.5, duration: 0.5 }}
            className="px-4"
          >
            <div className="flex justify-center items-center space-x-2 mb-2">
              <span className="text-sm">Kingdom Pages &copy; {new Date().getFullYear()}</span>
            </div>
            <p className="text-xs">Inspiring faith through digital stories.</p>
            <div className="mt-2 space-x-4">
              <NavLink to="/terms-of-service" className="hover:text-secondary transition-colors text-xs">
                Terms of Service
              </NavLink>
            </div>
          </motion.div>
        </footer>

    </div>
  );
};

export default Layout;
