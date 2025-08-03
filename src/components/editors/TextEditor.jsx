import React, { useState, useEffect } from 'react';
import { useEditor } from '../../context/EditorContext';
import { updateElementContent } from '../../utils/domUtils';
import { Type } from 'lucide-react';

const TextEditor = () => {
  const { selectedElement, html, setHtml, iframeRef, addToHistory } = useEditor();
  const [text, setText] = useState('');

  useEffect(() => {
    if (selectedElement) {
      setText(selectedElement.textContent || '');
    }
  }, [selectedElement]);

  const handleTextChange = (e) => {
    setText(e.target.value);
  };

  const handleApplyText = () => {
    if (!selectedElement || !iframeRef.current) return;
    
    const newHtml = updateElementContent(
      selectedElement, 
      text, 
      iframeRef.current,
      html
    );
    
    if (newHtml !== null && newHtml !== undefined) {
      setHtml(newHtml);
      addToHistory(newHtml);
    }
  };

  if (!selectedElement) return null;

  return (
    <div className="bg-white/90 backdrop-blur-sm border-3 border-amber-300 p-6 mb-6 relative" style={{
      borderRadius: '25px 15px 30px 20px',
      boxShadow: '4px 4px 0px rgba(245, 158, 11, 0.3)'
    }}>
      {/* Decorative corner elements */}
      <div className="absolute top-2 left-2 w-3 h-3 bg-amber-400 opacity-40 rounded-full"></div>
      <div className="absolute top-2 right-2 w-2 h-2 bg-orange-400 opacity-50 transform rotate-45"></div>
      <div className="absolute bottom-2 right-2 w-4 h-4 border-2 border-yellow-400 opacity-30 transform rotate-12" style={{borderRadius: '40% 60%'}}></div>
      
      <h3 className="flex items-center text-lg font-bold text-slate-800 mb-4 relative">
        <div className="p-2 bg-gradient-to-r from-amber-200 to-orange-200 mr-3" style={{borderRadius: '12px 8px 15px 10px'}}>
          <Type className="w-5 h-5 text-amber-600" />
        </div>
        <span className="relative">
          📝 Text Content
          <svg className="absolute -bottom-1 left-0 w-full h-1" viewBox="0 0 100 4" fill="none">
            <path d="M2 2 Q50 1 98 2" stroke="#f59e0b" strokeWidth="1" strokeLinecap="round" fill="none" opacity="0.6"/>
          </svg>
        </span>
      </h3>
      
      <textarea
        value={text}
        onChange={handleTextChange}
        className="w-full p-4 border-2 border-amber-300 bg-white text-slate-800 mb-4 min-h-32 focus:ring-2 focus:ring-amber-500 focus:border-orange-400 placeholder-slate-500 font-medium transition-all duration-300"
        style={{borderRadius: '20px 15px 25px 10px'}}
        placeholder="✏️ Enter your text content here..."
      />
      
      <button
        onClick={handleApplyText}
        className="w-full bg-gradient-to-r from-amber-400 to-orange-500 hover:from-amber-500 hover:to-orange-600 text-white px-6 py-3 font-bold transition-all duration-300 transform hover:scale-105 shadow-lg"
        style={{
          borderRadius: '20px 15px 25px 10px',
          boxShadow: '3px 3px 0px rgba(245, 158, 11, 0.4)'
        }}
      >
        ✨ Apply Changes
      </button>
    </div>
  );
};

export default TextEditor;