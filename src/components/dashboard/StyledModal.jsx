import React from 'react';
import { X } from 'lucide-react';

const StyledModal = ({ isOpen, onClose, children, title, maxWidth = 'max-w-md' }) => {
  if (!isOpen) return null;

  return (
    <div
      className="fixed inset-0 bg-amber-900/70 backdrop-blur-md flex items-center justify-center z-[100] p-4 transition-opacity duration-300 ease-in-out animate-fadeIn"
      onClick={onClose}
    >
      <div
        className={`bg-white/95 backdrop-blur-sm shadow-2xl border-3 border-amber-400 w-full ${maxWidth} p-6 sm:p-8 transform transition-all duration-300 ease-in-out animate-scaleUp relative overflow-hidden`}
        style={{
          borderRadius: '30px 20px 35px 25px',
          boxShadow: '8px 8px 0px rgba(245, 158, 11, 0.3)'
        }}
        onClick={e => e.stopPropagation()}
      >
        {/* Paper texture overlay */}
        <div className="absolute inset-0 opacity-20" style={{
          backgroundImage: `url("data:image/svg+xml,%3Csvg width='40' height='40' viewBox='0 0 40 40' xmlns='http://www.w3.org/2000/svg'%3E%3Cg fill='%23d4a574' fill-opacity='0.15'%3E%3Cpath d='M20 20c0-5.5-4.5-10-10-10s-10 4.5-10 10 4.5 10 10 10 10-4.5 10-10zm10 0c0-5.5-4.5-10-10-10s-10 4.5-10 10 4.5 10 10 10 10-4.5 10-10z'/%3E%3C/g%3E%3C/svg%3E")`
        }}></div>
        
        {/* Decorative elements */}
        <div className="absolute top-2 right-2 w-4 h-4 bg-yellow-400 opacity-60 rounded-full"></div>
        <div className="absolute top-4 left-4 w-3 h-3 border-2 border-orange-400 opacity-50 transform rotate-45"></div>
        <div className="absolute bottom-4 right-6 w-2 h-2 bg-amber-400 opacity-70 transform rotate-12" style={{borderRadius: '30% 70%'}}></div>
        
        <div className="flex items-center justify-between mb-6">
          <h2 className="text-xl sm:text-2xl font-bold text-slate-800 relative z-10">
            {title}
            <svg className="absolute -bottom-1 left-0 w-full h-2" viewBox="0 0 200 8" fill="none">
              <path d="M2 6 Q100 2 198 6" stroke="#f59e0b" strokeWidth="2" strokeLinecap="round" fill="none" opacity="0.4"/>
            </svg>
          </h2>
          <button
            onClick={onClose}
            className="text-slate-600 hover:text-slate-800 p-1 hover:bg-amber-200 transition-colors border-2 border-amber-300 hover:border-orange-400 relative z-10"
            style={{borderRadius: '12px 8px 15px 10px'}}
          >
            <X className="h-5 w-5" />
          </button>
        </div>
        <div className="relative z-10">
          {children}
        </div>
      </div>
    </div>
  );
};

export default StyledModal;