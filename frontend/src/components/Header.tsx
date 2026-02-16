import { useLanguage } from '@/contexts/LanguageContext';
import { AnimatePresence, motion } from 'framer-motion';
import { Menu, X } from 'lucide-react';
import { useState } from 'react';
import { Link, useLocation } from 'react-router-dom';
import LanguageToggle from './LanguageToggle';

const Header = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const { t, isNepali } = useLanguage();
  const location = useLocation();

  const navItems = [
    { key: 'nav.home', path: '/' },
    { key: 'nav.about', path: '/about' },
    { key: 'nav.vision', path: '/vision' },
    { key: 'nav.achievements', path: '/achievements' },
    { key: 'nav.news', path: '/news' },
    { key: 'nav.gallery', path: '/gallery' },
  ];

  const isActive = (path: string) => location.pathname === path;

  return (
    <header className="fixed top-0 left-0 right-0 z-50 bg-card/95 backdrop-blur-md border-b border-border">
      <div className="container-main">
        <div className="flex items-center justify-between h-16 lg:h-20">
          {/* Logo */}
          <Link to="/" className="flex items-center gap-3">
            <div className="w-10 h-10 lg:w-12 lg:h-12 rounded-full bg-primary flex items-center justify-center">
              <span className="text-primary-foreground font-bold text-lg lg:text-xl">N</span>
            </div>
            <div className="hidden sm:block">
              <p className={`font-semibold text-foreground ${isNepali ? 'font-nepali' : ''}`}>
                {isNepali ? 'जनताको नेता' : 'Metmani Chaudhary'}
              </p>
              <p className={`text-xs text-muted-foreground ${isNepali ? 'font-nepali' : ''}`}>
                {isNepali ? 'जनताको सेवामा' : 'For the People'}
              </p>
            </div>
          </Link>

          {/* Desktop Navigation */}
          <nav className="hidden lg:flex items-center gap-1">
            {navItems.map((item) => (
              <Link
                key={item.path}
                to={item.path}
                className={`px-4 py-2 rounded-lg text-sm font-medium transition-all duration-200 ${isNepali ? 'font-nepali' : ''
                  } ${isActive(item.path)
                    ? 'bg-primary text-primary-foreground'
                    : 'text-muted-foreground hover:text-foreground hover:bg-muted'
                  }`}
              >
                {t(item.key)}
              </Link>
            ))}
          </nav>

          {/* Language Toggle & Mobile Menu Button */}
          <div className="flex items-center gap-3">
            <LanguageToggle />
            <button
              onClick={() => setIsMenuOpen(!isMenuOpen)}
              className="lg:hidden p-2 rounded-lg hover:bg-muted transition-colors"
              aria-label="Toggle menu"
            >
              {isMenuOpen ? <X size={24} /> : <Menu size={24} />}
            </button>
          </div>
        </div>
      </div>

      {/* Mobile Navigation */}
      <AnimatePresence>
        {isMenuOpen && (
          <motion.nav
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: 'auto' }}
            exit={{ opacity: 0, height: 0 }}
            className="lg:hidden border-t border-border bg-card"
          >
            <div className="container-main py-4 space-y-1">
              {navItems.map((item) => (
                <Link
                  key={item.path}
                  to={item.path}
                  onClick={() => setIsMenuOpen(false)}
                  className={`block px-4 py-3 rounded-lg text-sm font-medium transition-all duration-200 ${isNepali ? 'font-nepali' : ''
                    } ${isActive(item.path)
                      ? 'bg-primary text-primary-foreground'
                      : 'text-muted-foreground hover:text-foreground hover:bg-muted'
                    }`}
                >
                  {t(item.key)}
                </Link>
              ))}
            </div>
          </motion.nav>
        )}
      </AnimatePresence>
    </header>
  );
};

export default Header;
