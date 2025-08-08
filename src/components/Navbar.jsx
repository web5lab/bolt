import { useState, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { Menu, X, User, PenTool, Moon, Sun } from 'lucide-react';
import { useSelector } from 'react-redux';
import { UserSelector } from '../store/global.Selctor';
import { useTheme } from '../context/ThemeContext';
import logo from "../assets/logo.webp"

const Navbar = () => {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const user = useSelector(UserSelector);
  const navigate = useNavigate();
  const { isDarkMode, toggleDarkMode } = useTheme();

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 10);
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const toggleMobileMenu = () => {
    setIsMobileMenuOpen(!isMobileMenuOpen);
  };

  const closeMobileMenu = () => {
    setIsMobileMenuOpen(false);
  };

  return (
    <header
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
        isScrolled 
          ? isDarkMode
            ? 'bg-slate-900/95 backdrop-blur-md shadow-lg border-b-2 border-amber-600'
            : 'bg-white/95 backdrop-blur-md shadow-lg border-b-2 border-amber-200'
          : isDarkMode
            ? 'bg-slate-900/90 backdrop-blur-sm'
            : 'bg-white/90 backdrop-blur-sm'
      }`}
      style={{
        borderRadius: isScrolled ? '0 0 20px 20px' : '0'
      }}
    >
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
          {/* Logo */}
          <div className="flex items-center">
            <Link to="/" className={`flex items-center gap-2 font-bold text-xl transition-colors ${
              isDarkMode 
                ? 'text-amber-400 hover:text-orange-400' 
                : 'text-amber-600 hover:text-orange-600'
            }`}>
              <div className="relative">
                <img src={logo} className="h-10 w-10" alt="Logo" />
                <div className="absolute -top-1 -right-1 w-3 h-3 bg-yellow-400 rounded-full opacity-70"></div>
              </div>
              <span className="relative">
                redesignr
                <span className="text-orange-500">.ai</span>
                <svg className="absolute -bottom-1 left-0 w-full h-1" viewBox="0 0 100 4" fill="none">
                  <path d="M2 2 Q50 1 98 2" stroke="#f59e0b" strokeWidth="1" strokeLinecap="round" fill="none" opacity="0.6"/>
                </svg>
              </span>
            </Link>
          </div>

          {/* Desktop Navigation */}
          <nav className="hidden lg:block">
            <ul className="flex space-x-8">
              <li>
                <a 
                  href="#features" 
                  className={`transition-colors font-medium relative group ${
                    isDarkMode 
                      ? 'text-slate-300 hover:text-amber-400' 
                      : 'text-slate-700 hover:text-amber-600'
                  }`}
                >
                  Features
                  <span className="absolute -bottom-1 left-0 w-0 h-0.5 bg-amber-400 transition-all duration-300 group-hover:w-full"></span>
                </a>
              </li>
              <li>
                <Link 
                  to="/blog" 
                  className={`transition-colors font-medium relative group ${
                    isDarkMode 
                      ? 'text-slate-300 hover:text-amber-400' 
                      : 'text-slate-700 hover:text-amber-600'
                  }`}
                >
                  Blog
                  <span className="absolute -bottom-1 left-0 w-0 h-0.5 bg-amber-400 transition-all duration-300 group-hover:w-full"></span>
                </Link>
              </li>
              <li>
                <a 
                  href="#how-it-works" 
                  className={`transition-colors font-medium relative group ${
                    isDarkMode 
                      ? 'text-slate-300 hover:text-amber-400' 
                      : 'text-slate-700 hover:text-amber-600'
                  }`}
                >
                  How It Works
                  <span className="absolute -bottom-1 left-0 w-0 h-0.5 bg-amber-400 transition-all duration-300 group-hover:w-full"></span>
                </a>
              </li>
              <li>
                <a 
                  href="#pricing" 
                  className={`transition-colors font-medium relative group ${
                    isDarkMode 
                      ? 'text-slate-300 hover:text-amber-400' 
                      : 'text-slate-700 hover:text-amber-600'
                  }`}
                >
                  Pricing
                  <span className="absolute -bottom-1 left-0 w-0 h-0.5 bg-amber-400 transition-all duration-300 group-hover:w-full"></span>
                </a>
              </li>
              <li>
                <a 
                  href="#faq" 
                  className={`transition-colors font-medium relative group ${
                    isDarkMode 
                      ? 'text-slate-300 hover:text-amber-400' 
                      : 'text-slate-700 hover:text-amber-600'
                  }`}
                >
                  FAQ
                  <span className="absolute -bottom-1 left-0 w-0 h-0.5 bg-amber-400 transition-all duration-300 group-hover:w-full"></span>
                </a>
              </li>
            </ul>
          </nav>

          {/* Desktop User Section */}
          <div className="hidden lg:flex items-center space-x-4">
            {/* Dark Mode Toggle */}
            <button
              onClick={toggleDarkMode}
              className={`p-2 transition-all duration-300 transform hover:scale-110 ${
                isDarkMode
                  ? 'bg-slate-800 border-2 border-amber-600 text-amber-400 hover:bg-slate-700'
                  : 'bg-white border-2 border-amber-400 text-amber-600 hover:bg-amber-50'
              }`}
              style={{borderRadius: '12px 8px 15px 10px'}}
              aria-label="Toggle dark mode"
            >
              {isDarkMode ? <Sun className="h-5 w-5" /> : <Moon className="h-5 w-5" />}
            </button>

            {user && user.name ? (
              <div className="flex items-center space-x-4">
                <div className="flex items-center space-x-2 cursor-pointer group">
                  {user.profilePicture ? (
                    <img
                      onClick={() => navigate('/dashboard')}
                      src={user.profilePicture}
                      alt="Profile"
                      className="h-8 w-8 rounded-full object-cover border-2 border-amber-300 group-hover:border-orange-400 transition-colors"
                    />
                  ) : (
                    <div className="h-8 w-8 rounded-full bg-gradient-to-r from-amber-400 to-orange-500 flex items-center justify-center border-2 border-amber-300 group-hover:border-orange-400 transition-colors">
                      <User className="h-4 w-4 text-white" />
                    </div>
                  )}
                  <span 
                    onClick={() => navigate('/dashboard')}
                    className={`cursor-pointer font-medium transition-colors ${
                      isDarkMode 
                        ? 'text-slate-300 group-hover:text-amber-400' 
                        : 'text-slate-700 group-hover:text-amber-600'
                    }`}
                  >
                    {user.name}
                  </span>
                </div>
                <Link
                  to="/dashboard"
                  className="bg-gradient-to-r from-amber-400 to-orange-500 text-white px-6 py-2 font-semibold hover:from-amber-500 hover:to-orange-600 transition-all duration-300 shadow-lg hover:shadow-amber-500/25 transform hover:scale-105"
                  style={{
                    borderRadius: '20px 10px 25px 15px',
                    boxShadow: '3px 3px 0px rgba(245, 158, 11, 0.3)'
                  }}
                >
                  Dashboard
                </Link>
              </div>
            ) : (
              <>
                <a
                  href="https://discord.gg/mg7Z4XeF3k"
                  className={`border-2 px-6 py-2 font-semibold transition-all duration-300 shadow-md hover:shadow-lg transform hover:scale-105 ${
                    isDarkMode
                      ? 'bg-slate-800 border-amber-600 text-amber-400 hover:bg-slate-700 hover:border-orange-500 hover:text-orange-400'
                      : 'bg-white border-amber-400 text-amber-600 hover:bg-amber-50 hover:border-orange-400 hover:text-orange-600'
                  }`}
                  style={{
                    borderRadius: '15px 25px 15px 25px'
                  }}
                >
                  Contact Us
                </a>
                <Link
                  to="/login"
                  className="bg-gradient-to-r from-amber-400 to-orange-500 text-white px-6 py-2 font-semibold hover:from-amber-500 hover:to-orange-600 transition-all duration-300 shadow-lg hover:shadow-amber-500/25 transform hover:scale-105"
                  style={{
                    borderRadius: '20px 10px 25px 15px',
                    boxShadow: '3px 3px 0px rgba(245, 158, 11, 0.3)'
                  }}
                >
                  Dashboard
                </Link>
              </>
            )}
          </div>

          {/* Tablet User Section */}
          <div className="hidden md:flex lg:hidden items-center space-x-3">
            {/* Dark Mode Toggle */}
            <button
              onClick={toggleDarkMode}
              className={`p-2 transition-all duration-300 ${
                isDarkMode
                  ? 'bg-slate-800 border-2 border-amber-600 text-amber-400'
                  : 'bg-white border-2 border-amber-400 text-amber-600'
              }`}
              style={{borderRadius: '12px 8px 15px 10px'}}
              aria-label="Toggle dark mode"
            >
              {isDarkMode ? <Sun className="h-4 w-4" /> : <Moon className="h-4 w-4" />}
            </button>

            {user && user.name ? (
              <div className="flex items-center space-x-3">
                <div className="flex items-center space-x-2 cursor-pointer">
                  {user.profilePicture ? (
                    <img
                      onClick={() => navigate('/dashboard')}
                      src={user.profilePicture}
                      alt="Profile"
                      className="h-8 w-8 rounded-full object-cover border-2 border-amber-300"
                    />
                  ) : (
                    <div className="h-8 w-8 rounded-full bg-gradient-to-r from-amber-400 to-orange-500 flex items-center justify-center border-2 border-amber-300">
                      <User className="h-4 w-4 text-white" />
                    </div>
                  )}
                  <span 
                    onClick={() => navigate('/dashboard')}
                    className={`cursor-pointer text-sm font-medium ${
                      isDarkMode ? 'text-slate-300' : 'text-slate-700'
                    }`}
                  >
                    {user.name.length > 10 ? `${user.name.substring(0, 10)}...` : user.name}
                  </span>
                </div>
                <Link
                  to="/dashboard"
                  className="bg-gradient-to-r from-amber-400 to-orange-500 text-white px-4 py-2 font-semibold hover:from-amber-500 hover:to-orange-600 transition-all duration-300 text-sm"
                  style={{borderRadius: '15px 10px 20px 15px'}}
                >
                  Dashboard
                </Link>
              </div>
            ) : (
              <>
                <a
                  href="https://discord.gg/mg7Z4XeF3k"
                  className={`border-2 px-4 py-2 font-semibold text-sm ${
                    isDarkMode
                      ? 'bg-slate-800 border-amber-600 text-amber-400 hover:bg-slate-700'
                      : 'bg-white border-amber-400 text-amber-600 hover:bg-amber-50'
                  }`}
                  style={{borderRadius: '15px 20px 15px 20px'}}
                >
                  Contact
                </a>
                <Link
                  to="/login"
                  className="bg-gradient-to-r from-amber-400 to-orange-500 text-white px-4 py-2 font-semibold hover:from-amber-500 hover:to-orange-600 transition-all duration-300 text-sm"
                  style={{borderRadius: '15px 10px 20px 15px'}}
                >
                  Dashboard
                </Link>
              </>
            )}
          </div>

          {/* Mobile Menu Button and Dashboard Link */}
          <div className="flex md:hidden items-center space-x-2">
            {/* Dark Mode Toggle */}
            <button
              onClick={toggleDarkMode}
              className={`p-2 transition-all duration-300 ${
                isDarkMode
                  ? 'bg-slate-800 border-2 border-amber-600 text-amber-400'
                  : 'bg-white border-2 border-amber-400 text-amber-600'
              }`}
              style={{borderRadius: '10px 15px 10px 15px'}}
              aria-label="Toggle dark mode"
            >
              {isDarkMode ? <Sun className="h-4 w-4" /> : <Moon className="h-4 w-4" />}
            </button>

            {user && user.name && (
              <Link
                to="/dashboard"
                className="bg-gradient-to-r from-amber-400 to-orange-500 text-white px-3 py-2 text-sm font-semibold"
                style={{borderRadius: '15px 10px 15px 10px'}}
              >
                Dashboard
              </Link>
            )}
            <button
              onClick={toggleMobileMenu}
              className={`p-2 transition-colors border-2 ${
                isDarkMode
                  ? 'text-slate-300 hover:bg-slate-800 border-amber-600 hover:border-orange-500'
                  : 'text-slate-700 hover:bg-amber-50 border-amber-300 hover:border-orange-400'
              }`}
              style={{borderRadius: '10px 15px 10px 15px'}}
              aria-label="Toggle menu"
            >
              {isMobileMenuOpen ? <X size={20} /> : <Menu size={20} />}
            </button>
          </div>
        </div>

        {/* Mobile Menu */}
        {isMobileMenuOpen && (
          <div className={`md:hidden mt-2 pb-4 border-t-2 ${
            isDarkMode ? 'border-amber-600' : 'border-amber-200'
          }`} style={{
            background: isDarkMode 
              ? 'linear-gradient(135deg, #1e293b 0%, #334155 100%)'
              : 'linear-gradient(135deg, #fef3c7 0%, #fed7aa 100%)',
            borderRadius: '0 0 20px 20px'
          }}>
            <nav className="pt-4">
              <ul className="space-y-2">
                <li>
                  <a 
                    href="#features" 
                    className={`block transition-colors py-2 px-4 font-medium ${
                      isDarkMode
                        ? 'text-slate-300 hover:text-amber-400 hover:bg-slate-800/50'
                        : 'text-slate-700 hover:text-amber-600 hover:bg-white/50'
                    }`}
                    onClick={closeMobileMenu}
                    style={{borderRadius: '15px 10px 15px 10px'}}
                  >
                    Features
                  </a>
                </li>
                <li>
                  <Link 
                    to="/blog" 
                    className={`block transition-colors py-2 px-4 font-medium ${
                      isDarkMode
                        ? 'text-slate-300 hover:text-amber-400 hover:bg-slate-800/50'
                        : 'text-slate-700 hover:text-amber-600 hover:bg-white/50'
                    }`}
                    onClick={closeMobileMenu}
                    style={{borderRadius: '10px 15px 10px 15px'}}
                  >
                    Blog
                  </Link>
                </li>
                <li>
                  <a 
                    href="#how-it-works" 
                    className={`block transition-colors py-2 px-4 font-medium ${
                      isDarkMode
                        ? 'text-slate-300 hover:text-amber-400 hover:bg-slate-800/50'
                        : 'text-slate-700 hover:text-amber-600 hover:bg-white/50'
                    }`}
                    onClick={closeMobileMenu}
                    style={{borderRadius: '15px 10px 15px 10px'}}
                  >
                    How It Works
                  </a>
                </li>
                <li>
                  <a 
                    href="#pricing" 
                    className={`block transition-colors py-2 px-4 font-medium ${
                      isDarkMode
                        ? 'text-slate-300 hover:text-amber-400 hover:bg-slate-800/50'
                        : 'text-slate-700 hover:text-amber-600 hover:bg-white/50'
                    }`}
                    onClick={closeMobileMenu}
                    style={{borderRadius: '10px 15px 10px 15px'}}
                  >
                    Pricing
                  </a>
                </li>
                <li>
                  <a 
                    href="#faq" 
                    className={`block transition-colors py-2 px-4 font-medium ${
                      isDarkMode
                        ? 'text-slate-300 hover:text-amber-400 hover:bg-slate-800/50'
                        : 'text-slate-700 hover:text-amber-600 hover:bg-white/50'
                    }`}
                    onClick={closeMobileMenu}
                    style={{borderRadius: '15px 10px 15px 10px'}}
                  >
                    FAQ
                  </a>
                </li>
              </ul>
              
              {/* Mobile User Section */}
              {user && user.name ? (
                <div className={`mt-4 pt-4 border-t-2 ${
                  isDarkMode ? 'border-amber-600' : 'border-amber-200'
                }`}>
                  <div className="flex items-center space-x-3 px-4 py-2">
                    {user.profilePicture ? (
                      <img
                        src={user.profilePicture}
                        alt="Profile"
                        className="h-8 w-8 rounded-full object-cover border-2 border-amber-300"
                      />
                    ) : (
                      <div className="h-8 w-8 rounded-full bg-gradient-to-r from-amber-400 to-orange-500 flex items-center justify-center border-2 border-amber-300">
                        <User className="h-4 w-4 text-white" />
                      </div>
                    )}
                    <span className={`font-medium ${
                      isDarkMode ? 'text-slate-300' : 'text-slate-700'
                    }`}>{user.name}</span>
                  </div>
                </div>
              ) : (
                <div className={`mt-4 pt-4 border-t-2 space-y-2 ${
                  isDarkMode ? 'border-amber-600' : 'border-amber-200'
                }`}>
                  <a
                    href="https://discord.gg/mg7Z4XeF3k"
                    className={`block border-2 px-4 py-2 font-semibold text-center mx-4 ${
                      isDarkMode
                        ? 'bg-slate-800 border-amber-600 text-amber-400 hover:bg-slate-700'
                        : 'bg-white border-amber-400 text-amber-600 hover:bg-amber-50'
                    }`}
                    onClick={closeMobileMenu}
                    style={{borderRadius: '15px 20px 15px 20px'}}
                  >
                    Contact Us
                  </a>
                  <Link
                    to="/login"
                    className="block bg-gradient-to-r from-amber-400 to-orange-500 text-white px-4 py-2 font-semibold hover:from-amber-500 hover:to-orange-600 transition-all duration-300 text-center mx-4"
                    onClick={closeMobileMenu}
                    style={{borderRadius: '20px 15px 25px 10px'}}
                  >
                    Dashboard
                  </Link>
                </div>
              )}
            </nav>
          </div>
        )}
      </div>
    </header>
  );
};

export default Navbar;