import React from 'react';
import { Wand2, Plus } from 'lucide-react';

const EmptyState = ({ onCreateNew }) => {
  return (
    <div className="flex flex-col items-center justify-center text-center p-6 sm:p-10 bg-white/90 backdrop-blur-sm border-3 border-amber-300 shadow-xl min-h-[300px] sm:min-h-[400px] animate-fadeInUp relative overflow-hidden" style={{
      borderRadius: '30px 20px 35px 25px',
      boxShadow: '8px 8px 0px rgba(245, 158, 11, 0.3)',
      borderStyle: 'dashed'
    }}>
      {/* Paper texture overlay */}
      <div className="absolute inset-0 opacity-20" style={{
        backgroundImage: `url("data:image/svg+xml,%3Csvg width='40' height='40' viewBox='0 0 40 40' xmlns='http://www.w3.org/2000/svg'%3E%3Cg fill='%23d4a574' fill-opacity='0.15'%3E%3Cpath d='M20 20c0-5.5-4.5-10-10-10s-10 4.5-10 10 4.5 10 10 10 10-4.5 10-10zm10 0c0-5.5-4.5-10-10-10s-10 4.5-10 10 4.5 10 10 10 10-4.5 10-10z'/%3E%3C/g%3E%3C/svg%3E")`
      }}></div>
      
      {/* Decorative elements */}
      <div className="absolute top-4 right-4 w-6 h-6 border-2 border-amber-400 opacity-40 transform rotate-12" style={{borderRadius: '60% 40%', borderStyle: 'dotted'}}></div>
      <div className="absolute bottom-4 left-4 w-4 h-4 bg-orange-300 opacity-50 transform -rotate-12" style={{borderRadius: '40% 60%'}}></div>
      
      <div className="p-4 sm:p-5 bg-gradient-to-br from-amber-200 to-orange-200 mb-4 sm:mb-6 shadow-lg border-2 border-amber-400 relative z-10" style={{
        borderRadius: '50% 40% 60% 50%'
      }}>
        <Wand2 className="h-10 w-10 sm:h-12 sm:w-12 text-amber-600 transform group-hover:scale-110 transition-transform" />
      </div>
      <h3 className="text-xl sm:text-2xl font-semibold text-slate-800 mb-2 sm:mb-3 relative z-10">
        ✨ Embark on Your First Website Journey! 🚀
        <svg className="absolute -bottom-1 left-1/2 transform -translate-x-1/2 w-48 h-2" viewBox="0 0 192 8" fill="none">
          <path d="M2 6 Q96 2 190 6" stroke="#f59e0b" strokeWidth="2" strokeLinecap="round" fill="none" opacity="0.5"/>
        </svg>
      </h3>
      <p className="text-slate-700 mb-6 sm:mb-8 max-w-md sm:max-w-lg text-sm sm:text-base leading-relaxed relative z-10">
        🎨 Paste a website link, pick a template, or create from scratch. Our AI magic turns it into a polished landing page instantly! ⚡
      </p>
      <button
        onClick={onCreateNew}
        className="group inline-flex items-center gap-2 sm:gap-3 bg-gradient-to-r from-amber-400 to-orange-500 text-white px-6 py-3 sm:px-8 sm:py-3.5 font-semibold hover:shadow-xl hover:from-amber-500 hover:to-orange-600 transition-all duration-300 transform hover:scale-105 focus:outline-none focus:ring-2 focus:ring-amber-400 focus:ring-offset-2 focus:ring-offset-white text-sm sm:text-base relative z-10"
        style={{
          borderRadius: '25px 15px 30px 20px',
          boxShadow: '4px 4px 0px rgba(245, 158, 11, 0.4)'
        }}
      >
        <Plus className="h-4 w-4 sm:h-5 sm:w-5 transition-transform duration-300 group-hover:rotate-90" />
        🎯 Create Your First Website
      </button>
    </div>
  );
};

export default EmptyState;