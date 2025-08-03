import React from 'react';
import { Bell } from 'lucide-react';
import logo from '../assets/logo.png';

const Footer: React.FC = () => {
  return (
    <footer className="relative overflow-hidden bg-gradient-to-br from-blue-100 via-indigo-50 to-cyan-100">
      {/* Paper texture overlay */}
      <div className="absolute inset-0 opacity-20" style={{
        backgroundImage: `url("data:image/svg+xml,%3Csvg width='60' height='60' viewBox='0 0 60 60' xmlns='http://www.w3.org/2000/svg'%3E%3Cg fill='none' fill-rule='evenodd'%3E%3Cg fill='%234f46e5' fill-opacity='0.1'%3E%3Ccircle cx='7' cy='7' r='1'/%3E%3Ccircle cx='53' cy='53' r='1'/%3E%3Ccircle cx='13' cy='43' r='1'/%3E%3Ccircle cx='47' cy='17' r='1'/%3E%3C/g%3E%3C/g%3E%3C/svg%3E")`
      }}></div>

      {/* Hand-drawn decorative elements */}
      <div className="absolute top-1/4 right-1/4 w-20 h-20 border-2 border-blue-300 opacity-30 transform rotate-12" style={{
        borderRadius: '60% 40% 70% 30%',
        borderStyle: 'dashed'
      }}></div>
      <div className="absolute bottom-1/4 left-1/4 w-16 h-16 border-2 border-indigo-300 opacity-25 transform -rotate-12" style={{
        borderRadius: '40% 60% 30% 70%',
        borderStyle: 'dotted'
      }}></div>
      <div className="absolute top-1/2 left-1/2 w-24 h-24 border-3 border-cyan-300 opacity-20 transform rotate-45" style={{
        borderRadius: '50% 30% 60% 40%',
        borderStyle: 'dashed'
      }}></div>

      <div className="container mx-auto px-6 text-center">
        <div className="pt-16 pb-8 border-b-2 border-blue-200" style={{borderStyle: 'dashed'}}>
          <div className="flex flex-col md:flex-row justify-between items-center mb-8">
            <a href="#" className="group flex items-center text-2xl font-bold mb-6 md:mb-0 hover:scale-105 transition-transform duration-300">
              <div className="relative mr-2">
                <img src={logo} className="w-10 h-10 group-hover:scale-110 transition-transform duration-300" />
                <div className="absolute -top-1 -right-1 w-2 h-2 bg-cyan-400 rounded-full opacity-70"></div>
              </div>
              <span className="bg-gradient-to-r from-blue-600 to-indigo-600 bg-clip-text text-transparent relative">
                TimeTuneAI
                <svg className="absolute -bottom-1 left-0 w-full h-1" viewBox="0 0 100 4" fill="none">
                  <path d="M2 2 Q50 1 98 2" stroke="#3b82f6" strokeWidth="1" strokeLinecap="round" fill="none" opacity="0.6"/>
                </svg>
              </span>
            </a>
            <div className="flex flex-wrap justify-center gap-4 md:gap-6">
              <a href="/privacy" className="text-slate-600 hover:text-blue-600 transition-colors duration-300 font-medium hover:translate-x-1 inline-block">🔒 Privacy Policy</a>
              <a href="#" className="text-slate-600 hover:text-indigo-600 transition-colors duration-300 font-medium hover:translate-x-1 inline-block">📋 Terms of Service</a>
              <a href="/request-data" className="text-slate-600 hover:text-cyan-600 transition-colors duration-300 font-medium hover:translate-x-1 inline-block">📊 Request Data</a>
              <a href="/request-delete" className="text-slate-600 hover:text-purple-600 transition-colors duration-300 font-medium hover:translate-x-1 inline-block">🗑️ Delete Account</a>
              <a href="mailto:support@timetuneai.com" className="text-slate-600 hover:text-blue-600 transition-colors duration-300 font-medium hover:translate-x-1 inline-block">📞 Contact Us</a>
            </div>
          </div>
        </div>

        {/* Bottom Row */}
        <div className="py-8 flex flex-col items-center md:flex-row md:justify-between gap-4 md:gap-0 text-center">
          <div className="text-slate-600 text-sm">
            © {new Date().getFullYear()}{' '}
            <span className="bg-gradient-to-r from-blue-600 to-indigo-600 bg-clip-text text-transparent font-bold">TimeTuneAI</span>. All rights reserved. Made with 💙 and AI ✨
          </div>
          <div className="flex flex-col md:flex-row md:space-x-6 space-y-2 md:space-y-0 text-sm">
            <div className="flex flex-wrap justify-center gap-4 text-xs">
              <span className="text-slate-600 font-medium">🔒 Your privacy is protected</span>
              <span className="text-slate-400">•</span>
              <span className="text-slate-600 font-medium">📧 GDPR Compliant</span>
              <span className="text-slate-400">•</span>
              <span className="text-slate-600 font-medium">🛡️ Secure by design</span>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;