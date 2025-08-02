import React from 'react';
import { Facebook, Twitter, Instagram, Linkedin, Disc2Icon, X, PenTool } from 'lucide-react';
import { Link } from 'react-router-dom';
import logo from "../assets/logo.webp";

const Footer = () => {
  return (
    <footer className="relative overflow-hidden bg-gradient-to-br from-amber-100 via-orange-50 to-yellow-100">
      {/* Paper texture overlay */}
      <div className="absolute inset-0 opacity-20" style={{
        backgroundImage: `url("data:image/svg+xml,%3Csvg width='60' height='60' viewBox='0 0 60 60' xmlns='http://www.w3.org/2000/svg'%3E%3Cg fill='none' fill-rule='evenodd'%3E%3Cg fill='%23d4a574' fill-opacity='0.1'%3E%3Ccircle cx='7' cy='7' r='1'/%3E%3Ccircle cx='53' cy='53' r='1'/%3E%3Ccircle cx='13' cy='43' r='1'/%3E%3Ccircle cx='47' cy='17' r='1'/%3E%3C/g%3E%3C/g%3E%3C/svg%3E")`
      }}></div>

      {/* Hand-drawn decorative elements */}
      <div className="absolute top-1/4 right-1/4 w-20 h-20 border-2 border-amber-300 opacity-30 transform rotate-12" style={{
        borderRadius: '60% 40% 70% 30%',
        borderStyle: 'dashed'
      }}></div>
      <div className="absolute bottom-1/4 left-1/4 w-16 h-16 border-2 border-orange-300 opacity-25 transform -rotate-12" style={{
        borderRadius: '40% 60% 30% 70%',
        borderStyle: 'dotted'
      }}></div>
      <div className="absolute top-1/2 left-1/2 w-24 h-24 border-3 border-yellow-300 opacity-20 transform rotate-45" style={{
        borderRadius: '50% 30% 60% 40%',
        borderStyle: 'dashed'
      }}></div>

      {/* Floating hand-drawn elements */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <div className="absolute top-10 left-10 w-3 h-3 bg-amber-400/40 opacity-60 transform rotate-12" style={{borderRadius: '30% 70%'}}></div>
        <div className="absolute top-20 right-20 w-2 h-2 bg-orange-400/50 rounded-full opacity-50"></div>
        <div className="absolute bottom-20 left-1/3 w-4 h-4 bg-yellow-400/40 opacity-60 transform rotate-45" style={{borderRadius: '40% 60%'}}></div>
        <div className="absolute top-1/3 right-1/3 w-2 h-2 bg-amber-300/40 rounded-full opacity-40"></div>
        <div className="absolute bottom-10 right-10 w-3 h-3 bg-orange-300/40 opacity-50 transform -rotate-12" style={{borderRadius: '60% 40%'}}></div>
      </div>

      <div className="container mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <div className="pt-16 pb-8 border-b-2 border-amber-200" style={{borderStyle: 'dashed'}}>
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-2 lg:grid-cols-4 gap-10">
            <div>
              <a href="#" className="group flex items-center gap-2 text-amber-600 font-bold text-xl mb-4 hover:text-orange-600 transition-colors duration-300">
                <div className="relative">
                  <img src={logo} className="h-6 w-6 group-hover:scale-110 transition-transform duration-300" alt="Logo" />
                  <div className="absolute -top-1 -right-1 w-2 h-2 bg-yellow-400 rounded-full opacity-70"></div>
                </div>
                <span className="relative">
                  redesignr
                  <span className="text-orange-500">.ai</span>
                  <svg className="absolute -bottom-1 left-0 w-full h-1" viewBox="0 0 100 4" fill="none">
                    <path d="M2 2 Q50 1 98 2" stroke="#f59e0b" strokeWidth="1" strokeLinecap="round" fill="none" opacity="0.6"/>
                  </svg>
                </span>
              </a>
              <p className="text-slate-700 mb-6 text-sm sm:text-base leading-relaxed">
                Transform your website with{' '}
                <span className="text-amber-600 font-semibold">AI-powered redesigns</span>{' '}
                that look amazing and convert better. Hand-crafted by AI, perfected by you! ✨
              </p>

              {/* Featured Badge */}
              <a
                href="https://theresanaiforthat.com/ai/redesignr/?ref=featured&v=6100518"
                target="_blank"
                rel="nofollow"
                className="inline-block mb-6"
              >
                <img
                  width="300"
                  src="https://media.theresanaiforthat.com/featured-on-taaft.png?width=600"
                  alt="Featured on There's an AI for That"
                  className="shadow-md hover:scale-105 transition-transform duration-300 border-2 border-amber-200" 
                  style={{borderRadius: '15px 10px 20px 15px'}}
                />
              </a>

              <div className="flex flex-wrap gap-3">
                <a href="https://x.com/redesignrai" className="group p-3 bg-white/80 border-2 border-amber-300 text-slate-700 hover:text-amber-600 hover:border-orange-400 hover:bg-amber-50 transition-all duration-300 transform hover:scale-110" style={{
                  borderRadius: '12px 8px 15px 10px'
                }}>
                  <X className="h-5 w-5 group-hover:scale-110 transition-transform duration-300" />
                </a>
                <a href="https://x.com/redesignrai" className="group p-3 bg-white/80 border-2 border-amber-300 text-slate-700 hover:text-blue-500 hover:border-blue-400 hover:bg-blue-50 transition-all duration-300 transform hover:scale-110" style={{
                  borderRadius: '10px 15px 8px 12px'
                }}>
                  <Twitter className="h-5 w-5 group-hover:scale-110 transition-transform duration-300" />
                </a>
                <a href="https://www.linkedin.com/company/redesignrai" className="group p-3 bg-white/80 border-2 border-amber-300 text-slate-700 hover:text-blue-600 hover:border-blue-500 hover:bg-blue-50 transition-all duration-300 transform hover:scale-110" style={{
                  borderRadius: '8px 12px 15px 10px'
                }}>
                  <Linkedin className="h-5 w-5 group-hover:scale-110 transition-transform duration-300" />
                </a>
              </div>
            </div>

            {/* Product Links */}
            <div className='hidden md:block'>
              <h3 className="text-slate-800 font-bold mb-6 text-lg relative">
                <span className="bg-gradient-to-r from-amber-600 to-orange-600 bg-clip-text text-transparent">Product</span>
                <svg className="absolute -bottom-1 left-0 w-16 h-1" viewBox="0 0 64 4" fill="none">
                  <path d="M2 2 Q32 1 62 2" stroke="#f59e0b" strokeWidth="1" strokeLinecap="round" fill="none" opacity="0.6"/>
                </svg>
              </h3>
              <ul className="space-y-3 text-sm">
                <li><a href="#" className="text-slate-600 hover:text-amber-600 transition-colors duration-300 hover:translate-x-1 inline-block font-medium">Features 🎨</a></li>
                <li><a href="#" className="text-slate-600 hover:text-orange-600 transition-colors duration-300 hover:translate-x-1 inline-block font-medium">Pricing 💰</a></li>
                <li><a href="#" className="text-slate-600 hover:text-yellow-600 transition-colors duration-300 hover:translate-x-1 inline-block font-medium">Case Studies 📊</a></li>
                <li><a href="#" className="text-slate-600 hover:text-emerald-600 transition-colors duration-300 hover:translate-x-1 inline-block font-medium">Reviews ⭐</a></li>
                <li><a href="#" className="text-slate-600 hover:text-purple-600 transition-colors duration-300 hover:translate-x-1 inline-block font-medium">Updates 🚀</a></li>
              </ul>
            </div>

            {/* Company Links */}
            <div className='hidden md:block'>
              <h3 className="text-slate-800 font-bold mb-6 text-lg relative">
                <span className="bg-gradient-to-r from-emerald-600 to-green-600 bg-clip-text text-transparent">Company</span>
                <svg className="absolute -bottom-1 left-0 w-20 h-1" viewBox="0 0 80 4" fill="none">
                  <path d="M2 2 Q40 1 78 2" stroke="#10b981" strokeWidth="1" strokeLinecap="round" fill="none" opacity="0.6"/>
                </svg>
              </h3>
              <ul className="space-y-3 text-sm">
                <li><a href="#" className="text-slate-600 hover:text-emerald-600 transition-colors duration-300 hover:translate-x-1 inline-block font-medium">About 👋</a></li>
                <li><a href="#" className="text-slate-600 hover:text-green-600 transition-colors duration-300 hover:translate-x-1 inline-block font-medium">Blog 📝</a></li>
                <li><a href="#" className="text-slate-600 hover:text-blue-600 transition-colors duration-300 hover:translate-x-1 inline-block font-medium">Careers 💼</a></li>
                <li><a href="#" className="text-slate-600 hover:text-indigo-600 transition-colors duration-300 hover:translate-x-1 inline-block font-medium">Press 📰</a></li>
                <li><a href="#" className="text-slate-600 hover:text-purple-600 transition-colors duration-300 hover:translate-x-1 inline-block font-medium">Contact 📞</a></li>
              </ul>
            </div>

            {/* Resources Links */}
            <div className='hidden md:block'>
              <h3 className="text-slate-800 font-bold mb-6 text-lg relative">
                <span className="bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">Resources</span>
                <svg className="absolute -bottom-1 left-0 w-24 h-1" viewBox="0 0 96 4" fill="none">
                  <path d="M2 2 Q48 1 94 2" stroke="#3b82f6" strokeWidth="1" strokeLinecap="round" fill="none" opacity="0.6"/>
                </svg>
              </h3>
              <ul className="space-y-3 text-sm">
                <li><a href="#" className="text-slate-600 hover:text-blue-600 transition-colors duration-300 hover:translate-x-1 inline-block font-medium">Help Center 🆘</a></li>
                <li><a href="#" className="text-slate-600 hover:text-indigo-600 transition-colors duration-300 hover:translate-x-1 inline-block font-medium">Documentation 📚</a></li>
                <li><a href="#" className="text-slate-600 hover:text-purple-600 transition-colors duration-300 hover:translate-x-1 inline-block font-medium">API Reference 🔧</a></li>
                <li><a href="#" className="text-slate-600 hover:text-pink-600 transition-colors duration-300 hover:translate-x-1 inline-block font-medium">Privacy Policy 🔒</a></li>
                <li><a href="#" className="text-slate-600 hover:text-red-600 transition-colors duration-300 hover:translate-x-1 inline-block font-medium">Terms of Service 📋</a></li>
              </ul>
            </div>
          </div>
        </div>

        {/* Bottom Row */}
        <div className="py-8 flex flex-col items-center sm:flex-row sm:justify-between gap-4 sm:gap-0 text-center">
          <div className="text-slate-600 text-sm">
            © {new Date().getFullYear()}{' '}
            <span className="bg-gradient-to-r from-amber-600 to-orange-600 bg-clip-text text-transparent font-semibold">redesignr.ai</span>. All rights reserved. Made with ❤️ and AI ✨
          </div>
          <div className="flex flex-col sm:flex-row sm:space-x-6 space-y-2 sm:space-y-0 text-sm">
            <Link to="/privacy-policy" className="text-slate-600 hover:text-amber-600 transition-colors duration-300 font-medium">Privacy Policy 🔒</Link>
            <Link to="/terms-of-service" className="text-slate-600 hover:text-orange-600 transition-colors duration-300 font-medium">Terms of Service 📋</Link>
            <a href="#" className="text-slate-600 hover:text-yellow-600 transition-colors duration-300 font-medium">Cookies 🍪</a>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;