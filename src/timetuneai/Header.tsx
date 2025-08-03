import React, { useState } from 'react';
import { Bell, X } from 'lucide-react';
import logo from '../assets/logo.png';
const Header: React.FC = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  const closeMenu = () => {
    setIsMenuOpen(false);
  };

  return (
    <header className="fixed top-0 left-0 right-0 z-50 bg-white/95 backdrop-blur-md shadow-lg border-b-2 border-blue-200 transition-all duration-300" style={{
      borderRadius: '0 0 20px 20px'
    }}>
      <nav className="container mx-auto px-4 sm:px-6 py-3 sm:py-4">
        <div className="flex justify-between items-center">
          {/* Logo - Responsive sizing */}
          <a href="#" className="flex items-center group hover:scale-105 transition-transform duration-300">
            <div className="rounded-full flex items-center justify-center text-white">
              <img src={logo} className="w-10 h-10 " />
            </div>
            <span className="text-lg sm:text-xl lg:text-2xl font-bold bg-gradient-to-r from-blue-600 to-indigo-600 bg-clip-text text-transparent relative">
              TimeTuneAI
              <svg className="absolute -bottom-1 left-0 w-full h-1" viewBox="0 0 100 4" fill="none">
                <path d="M2 2 Q50 1 98 2" stroke="#3b82f6" strokeWidth="1" strokeLinecap="round" fill="none" opacity="0.6"/>
              </svg>
            </span>
          </a>
          
          {/* Desktop Navigation */}
          <div className="hidden lg:flex space-x-6 xl:space-x-8">
            <a href="#features" className="text-gray-600 dark:text-gray-300 hover:text-primary-500 transition duration-200 font-medium">
            </a>
            <a href="#features" className="text-slate-700 hover:text-blue-600 transition-colors font-medium relative group">
              Features
              <span className="absolute -bottom-1 left-0 w-0 h-0.5 bg-blue-400 transition-all duration-300 group-hover:w-full"></span>
            </a>
            <a href="#how-it-works" className="text-slate-700 hover:text-blue-600 transition-colors font-medium relative group">
              How It Works
              <span className="absolute -bottom-1 left-0 w-0 h-0.5 bg-blue-400 transition-all duration-300 group-hover:w-full"></span>
            </a>
            <a href="#pricing" className="text-slate-700 hover:text-blue-600 transition-colors font-medium relative group">
              Pricing
              <span className="absolute -bottom-1 left-0 w-0 h-0.5 bg-blue-400 transition-all duration-300 group-hover:w-full"></span>
            </a>
            <a href="#testimonials" className="text-slate-700 hover:text-blue-600 transition-colors font-medium relative group">
              Testimonials
              <span className="absolute -bottom-1 left-0 w-0 h-0.5 bg-blue-400 transition-all duration-300 group-hover:w-full"></span>
            </a>
            <a href="#faq" className="text-slate-700 hover:text-blue-600 transition-colors font-medium relative group">
              FAQ
              <span className="absolute -bottom-1 left-0 w-0 h-0.5 bg-blue-400 transition-all duration-300 group-hover:w-full"></span>
            </a>
          </div>
          
          {/* Desktop Actions */}
          <div className="hidden lg:flex items-center space-x-3 xl:space-x-4">
          
            <a 
              href="/app" 
              className="px-4 py-2 xl:px-6 xl:py-2 bg-gradient-to-r from-blue-500 to-indigo-600 text-white font-semibold hover:from-blue-600 hover:to-indigo-700 transition-all duration-300 shadow-lg hover:shadow-blue-500/25 transform hover:scale-105 text-sm xl:text-base"
              style={{
                borderRadius: '20px 10px 25px 15px',
                boxShadow: '3px 3px 0px rgba(59, 130, 246, 0.3)'
              }}
            >
              Get the App
            </a>
          </div>

          {/* Mobile Actions */}
          <div className="flex lg:hidden items-center space-x-2 sm:space-x-3">
          
            {/* Get App Button - Mobile */}
            <a 
              href="/app" 
              className="px-3 py-1.5 sm:px-4 sm:py-2 bg-gradient-to-r from-blue-500 to-indigo-600 text-white font-semibold hover:from-blue-600 hover:to-indigo-700 transition-all duration-300 shadow-lg text-xs sm:text-sm"
              style={{borderRadius: '15px 10px 20px 15px'}}
            >
              Get App
            </a>

          
          </div>
        </div>
      </nav>

      {/* Mobile Menu Overlay */}
      {isMenuOpen && (
        <div className="lg:hidden fixed inset-0 bg-white/95 backdrop-blur-md z-40 transition-all duration-300 ease-in-out">
          {/* Mobile Menu Header */}
          <div className="flex items-center justify-between p-4 sm:p-6 border-b-2 border-blue-200" style={{borderStyle: 'dashed'}}>
            <a href="#" className="flex items-center" onClick={closeMenu}>
              <div className="p-1.5 sm:p-2 mr-2 bg-gradient-to-br from-blue-500 to-indigo-600 flex items-center justify-center text-white" style={{borderRadius: '15px 10px 20px 15px'}}>
                <Bell className="w-4 h-4 sm:w-5 sm:h-5" />
              </div>
              <span className="text-lg sm:text-xl font-bold bg-gradient-to-r from-blue-600 to-indigo-600 bg-clip-text text-transparent">
                TimeTuneAI
              </span>
            </a>
            <button
              onClick={closeMenu}
              className="p-2 rounded-full hover:bg-gray-100 dark:hover:bg-gray-800 transition-colors"
              aria-label="Close menu"
            >
              <X className="w-5 h-5 sm:w-6 sm:h-6 text-gray-600 dark:text-gray-300" />
            </button>
          </div>

          {/* Mobile Menu Content */}
          <div className="flex flex-col h-full">
            {/* Navigation Links */}
            <div className="flex-1 px-4 sm:px-6 py-6 sm:py-8 space-y-6 sm:space-y-8">
              <a 
                href="#features" 
                className="block text-xl sm:text-2xl font-medium text-slate-800 hover:text-blue-600 transition-colors py-2 hover:bg-blue-50 px-4 rounded-lg" 
                onClick={closeMenu}
                style={{borderRadius: '15px 10px 15px 10px'}}
              >
                Features
              </a>
              <a 
                href="#how-it-works" 
                className="block text-xl sm:text-2xl font-medium text-gray-800 dark:text-gray-200 hover:text-primary-500 transition-colors py-2" 
                onClick={closeMenu}
              >
                How It Works
              </a>
              <a 
                href="#pricing" 
                className="block text-xl sm:text-2xl font-medium text-gray-800 dark:text-gray-200 hover:text-primary-500 transition-colors py-2" 
                onClick={closeMenu}
              >
                Pricing
              </a>
              <a 
                href="#testimonials" 
                className="block text-xl sm:text-2xl font-medium text-gray-800 dark:text-gray-200 hover:text-primary-500 transition-colors py-2" 
                onClick={closeMenu}
              >
                Testimonials
              </a>
              <a 
                href="#faq" 
                className="block text-xl sm:text-2xl font-medium text-gray-800 dark:text-gray-200 hover:text-primary-500 transition-colors py-2" 
                onClick={closeMenu}
              >
                FAQ
              </a>
            </div>

            {/* Mobile Menu Footer */}
            <div className="px-4 sm:px-6 py-6 sm:py-8 border-t border-gray-200 dark:border-gray-700 space-y-4">
            
              {/* Get App Button - Mobile Menu */}
              <a 
                href="/app" 
                className="block w-full px-6 py-4 bg-gradient-to-r from-blue-500 to-indigo-600 text-white text-lg sm:text-xl font-semibold shadow-lg text-center hover:from-blue-600 hover:to-indigo-700 transition-all duration-300"
                onClick={closeMenu}
                style={{
                  borderRadius: '20px 15px 25px 10px',
                  boxShadow: '4px 4px 0px rgba(59, 130, 246, 0.3)'
                }}
              >
                Get the App
              </a>
            </div>
          </div>
        </div>
      )}
    </header>
  );
};

export default Header;