import React from 'react';
import Preview from './Preview';
import PropertiesPanel from './PropertiesPanel';
import { useEditor } from '../context/EditorContext';

function EditorLayoutV2 ({ viewport = "desktop" }) {
    const { selectedElement } = useEditor();
    return (
        <div className="flex flex-col h-screen bg-gradient-to-br from-orange-50 via-amber-50 to-yellow-50 text-slate-800 antialiased relative overflow-hidden">
            {/* Paper texture overlay */}
            <div className="absolute inset-0 opacity-20 pointer-events-none" style={{
                backgroundImage: `url("data:image/svg+xml,%3Csvg width='60' height='60' viewBox='0 0 60 60' xmlns='http://www.w3.org/2000/svg'%3E%3Cg fill='none' fill-rule='evenodd'%3E%3Cg fill='%23d4a574' fill-opacity='0.1'%3E%3Ccircle cx='7' cy='7' r='1'/%3E%3Ccircle cx='53' cy='53' r='1'/%3E%3Ccircle cx='13' cy='43' r='1'/%3E%3Ccircle cx='47' cy='17' r='1'/%3E%3C/g%3E%3C/g%3E%3C/svg%3E")`
            }}></div>
            
            {/* Hand-drawn decorative elements */}
            <div className="absolute top-10 left-10 w-12 h-12 border-2 border-amber-400 opacity-30 transform rotate-12 pointer-events-none" style={{
                borderRadius: '60% 40% 70% 30%',
                borderStyle: 'dashed'
            }}></div>
            <div className="absolute bottom-20 right-20 w-8 h-8 border-2 border-orange-400 opacity-25 transform -rotate-12 pointer-events-none" style={{
                borderRadius: '40% 60% 30% 70%',
                borderStyle: 'dotted'
            }}></div>
            
            <div className="flex flex-col md:flex-row flex-grow overflow-hidden">
                <div className="w-full max-w-[360px] md:w-2/5 lg:w-1/3 h-1/2 md:h-full overflow-hidden flex flex-col bg-white/90 backdrop-blur-sm border-r-3 border-amber-300 relative z-10" style={{
                    borderRadius: '0 25px 25px 0',
                    boxShadow: '4px 0 0px rgba(245, 158, 11, 0.2)'
                }}>
                    {/* Decorative corner elements */}
                    <div className="absolute top-2 right-2 w-3 h-3 bg-amber-400 opacity-40 rounded-full"></div>
                    <div className="absolute bottom-2 right-2 w-2 h-2 bg-orange-400 opacity-50 transform rotate-45"></div>
                    
                    <div className="flex-grow overflow-y-auto custom-scrollbar">
                        <div className="h-full">
                            <PropertiesPanel />
                            {!selectedElement && (
                                <div className="flex items-center justify-center h-full text-center p-8 relative">
                                    <div className="max-w-sm">
                                        <div className="mx-auto h-16 w-16 bg-gradient-to-r from-amber-200 to-orange-200 flex items-center justify-center mb-4" style={{
                                            borderRadius: '15px 10px 20px 15px'
                                        }}>
                                            <svg className="h-8 w-8 text-amber-600" fill="none" viewBox="0 0 24 24" stroke="currentColor" aria-hidden="true">
                                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                                            </svg>
                                        </div>
                                        <h3 className="text-xl font-bold text-slate-800 mb-2 relative">
                                            No Element Selected ✨
                                            <svg className="absolute -bottom-1 left-1/2 transform -translate-x-1/2 w-32 h-2" viewBox="0 0 128 8" fill="none">
                                                <path d="M2 6 Q64 2 126 6" stroke="#f59e0b" strokeWidth="2" strokeLinecap="round" fill="none" opacity="0.5"/>
                                            </svg>
                                        </h3>
                                        <div className="p-4 bg-gradient-to-r from-amber-50 to-orange-50 border-2 border-amber-300" style={{
                                            borderRadius: '20px 15px 25px 10px',
                                            borderStyle: 'dashed'
                                        }}>
                                            <p className="text-sm text-slate-600 leading-relaxed">
                                                🎯 Click on any element in the preview canvas to see and edit its properties.
                                                Start creating your masterpiece! 🎨
                                            </p>
                                        </div>
                                    </div>
                                </div>
                            )}
                        </div>
                    </div>
                </div>
                <div className="w-full md:w-3/5 lg:w-full h-1/2 md:h-full overflow-auto bg-gradient-to-br from-slate-100 to-slate-200 relative z-10">
                    <Preview viewport={viewport} />
                </div>
            </div>
        </div>
    );
}

export default EditorLayoutV2;
