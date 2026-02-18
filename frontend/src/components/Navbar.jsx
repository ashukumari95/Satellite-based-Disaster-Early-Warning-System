import React, { useState, useEffect, useRef } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useTranslation } from 'react-i18next';
import LanguageSwitcher from './LanguageSwitcher';

const Navbar = () => {
  const { t } = useTranslation();
  const navigate = useNavigate();
  const [user, setUser] = useState(null);
  const [settingsOpen, setSettingsOpen] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);
  const settingsRef = useRef(null);
  const menuRef = useRef(null);

  useEffect(() => {
    // Check if user info is stored in localStorage (or any other storage)
    const storedUser = localStorage.getItem('user');
    if (storedUser) {
      setUser(JSON.parse(storedUser));
    }
  }, []);

  // close settings dropdown and mobile menu when clicking outside
  useEffect(() => {
    const handleClick = (e) => {
      if (settingsRef.current && !settingsRef.current.contains(e.target)) {
        setSettingsOpen(false);
      }
      if (menuRef.current && !menuRef.current.contains(e.target)) {
        setMenuOpen(false);
      }
    };
    document.addEventListener('mousedown', handleClick);
    return () => document.removeEventListener('mousedown', handleClick);
  }, []);

  const handleLogout = () => {
    localStorage.removeItem('user');
    setUser(null);
    navigate('/login');
  };

  return (
    <nav className="bg-gradient-to-r from-blue-600 to-blue-800 p-4 text-white shadow-lg">
      <div className="container mx-auto flex justify-between items-center">
        <Link to="/" className="flex items-center space-x-3 hover:opacity-95 transition-opacity">
          <div className="w-10 h-10 rounded-lg bg-white/10 flex items-center justify-center shadow-inner ring-1 ring-white/10">
            <svg xmlns="http://www.w3.org/2000/svg" className="w-6 h-6 text-white" viewBox="0 0 24 24" fill="none" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M12 2a10 10 0 100 20 10 10 0 000-20zM2 12h20M12 2c2.5 3 4 7 4 10s-1.5 7-4 10M12 2C9.5 5 8 9 8 12s1.5 7 4 10" />
            </svg>
          </div>
          <div className="leading-tight">
            <div className="text-3xl md:text-2xl font-extrabold tracking-tight">Satellite Disaster <span className="hidden sm:inline">Warning</span></div>
            <div className="text-xs text-white/80 hidden md:block">Real-time satellite alerts</div>
          </div>
        </Link>

        {/* Desktop Menu */}
        <div className="hidden md:flex space-x-6 items-center">
          <Link to="/" className="hover:text-blue-200 transition duration-300">{t('navbar.home')}</Link>
          <Link to="/alerts" className="hover:text-blue-200 transition duration-300">{t('navbar.alerts')}</Link>
          <Link to="/map" className="hover:text-blue-200 transition duration-300">{t('navbar.map')}</Link>
          <Link to="/about" className="hover:text-blue-200 transition duration-300">{t('navbar.about')}</Link>
          <Link to="/contact" className="hover:text-blue-200 transition duration-300">{t('navbar.contact')}</Link>
          {!user && (
            <>
              <Link to="/login" className="hover:text-blue-200 transition duration-300">{t('navbar.login')}</Link>
              <Link to="/register" className="hover:text-blue-200 transition duration-300">{t('navbar.register')}</Link>
            </>
          )}
          <LanguageSwitcher />
          {/* Settings gear with dropdown */}
          <div className="relative" ref={settingsRef}>
            <button
              onClick={() => setSettingsOpen((s) => !s)}
              className="p-2 rounded hover:bg-blue-500/20 focus:outline-none"
              aria-label="Settings"
              aria-expanded={settingsOpen}
            >
              <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M11.049 2.927c.3-.921 1.603-.921 1.902 0a1.724 1.724 0 002.293 1.07c.87-.38 1.83.37 1.45 1.24a1.724 1.724 0 001.07 2.293c.921.3.921 1.603 0 1.902a1.724 1.724 0 00-1.07 2.293c.38.87-.37 1.83-1.24 1.45a1.724 1.724 0 00-2.293 1.07c-.3.921-1.603.921-1.902 0a1.724 1.724 0 00-2.293-1.07c-.87.38-1.83-.37-1.45-1.24a1.724 1.724 0 00-1.07-2.293c-.921-.3-.921-1.603 0-1.902a1.724 1.724 0 001.07-2.293c-.38-.87.37-1.83 1.24-1.45.86.37 1.96-.09 2.29-1.07z" />
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
              </svg>
            </button>
            {settingsOpen && (
              <div className="absolute right-0 mt-2 w-56 bg-white text-black rounded shadow-lg z-50">
                <div className="p-2">
                  <Link to="/settings" className="block px-3 py-2 rounded hover:bg-gray-100">General Settings</Link>
                  <Link to="/settings#notifications" className="block px-3 py-2 rounded hover:bg-gray-100">Notifications</Link>
                  <Link to="/settings#privacy" className="block px-3 py-2 rounded hover:bg-gray-100">Privacy</Link>
                  <Link to="/settings#security" className="block px-3 py-2 rounded hover:bg-gray-100">Security</Link>
                </div>
              </div>
            )}
          </div>
          {user && (
            <div className="relative group">
              <button className="flex items-center space-x-2 focus:outline-none">
                <span className="font-medium">{user.username || user.email}</span>
              </button>
              <div className="absolute right-0 mt-2 w-32 bg-white text-black rounded shadow-lg opacity-0 group-hover:opacity-100 transition-opacity">
                <button
                  onClick={handleLogout}
                  className="block w-full text-left px-4 py-2 hover:bg-gray-200"
                >
                  {t('navbar.logout')}
                </button>
              </div>
            </div>
          )}
        </div>

        {/* Mobile Menu Button */}
        <div className="md:hidden flex items-center space-x-2">
          <LanguageSwitcher />
          <button
            onClick={() => setMenuOpen(!menuOpen)}
            className="p-2 rounded hover:bg-blue-500/20 focus:outline-none"
            aria-label="Toggle menu"
            aria-expanded={menuOpen}
          >
            <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              {menuOpen ? (
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
              ) : (
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
              )}
            </svg>
          </button>
        </div>
      </div>

      {/* Mobile Menu */}
      {menuOpen && (
        <div ref={menuRef} className="md:hidden bg-blue-700 text-white px-4 py-4 space-y-4">
          <Link to="/" className="block hover:text-blue-200 transition duration-300" onClick={() => setMenuOpen(false)}>{t('navbar.home')}</Link>
          <Link to="/alerts" className="block hover:text-blue-200 transition duration-300" onClick={() => setMenuOpen(false)}>{t('navbar.alerts')}</Link>
          <Link to="/map" className="block hover:text-blue-200 transition duration-300" onClick={() => setMenuOpen(false)}>{t('navbar.map')}</Link>
          <Link to="/about" className="block hover:text-blue-200 transition duration-300" onClick={() => setMenuOpen(false)}>{t('navbar.about')}</Link>
          <Link to="/contact" className="block hover:text-blue-200 transition duration-300" onClick={() => setMenuOpen(false)}>{t('navbar.contact')}</Link>
          {!user && (
            <>
              <Link to="/login" className="block hover:text-blue-200 transition duration-300" onClick={() => setMenuOpen(false)}>{t('navbar.login')}</Link>
              <Link to="/register" className="block hover:text-blue-200 transition duration-300" onClick={() => setMenuOpen(false)}>{t('navbar.register')}</Link>
            </>
          )}
          {/* Settings in mobile menu */}
          <div className="border-t pt-4">
            <Link to="/settings" className="block hover:text-blue-200 transition duration-300" onClick={() => setMenuOpen(false)}>Settings</Link>
          </div>
          {user && (
            <button
              onClick={() => { handleLogout(); setMenuOpen(false); }}
              className="block w-full text-left hover:text-blue-200 transition duration-300"
            >
              {t('navbar.logout')}
            </button>
          )}
        </div>
      )}
    </nav>
  );
};

export default Navbar;
