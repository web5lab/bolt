import React, { useState, useEffect, useRef } from 'react';
import {
    Zap,
    ArrowRight,
    X,
    Eye,
    Sparkles,
    LayoutGrid,
    FileText,
    Newspaper,
    Briefcase,
    BookText,
    PenTool
} from 'lucide-react';
import { useSelector } from 'react-redux';
import { publicTemplatesSelector } from '../store/global.Selctor';
import { useNavigate } from 'react-router-dom';

const TemplateShowcase = () => {
    const [selectedTemplate, setSelectedTemplate] = useState(null);
    const sectionRef = useRef(null);
    const navigate = useNavigate();

    const templates = useSelector(publicTemplatesSelector);

    const [activeTab, setActiveTab] = useState('all');

    const tabCategories = [
        { id: 'all', label: 'All Templates', icon: <LayoutGrid className="h-4 w-4 mr-2" /> },
        { id: 'docs', label: 'Docs', icon: <BookText className="h-4 w-4 mr-2" /> },
        { id: 'landingPage', label: 'Landing Pages', icon: <FileText className="h-4 w-4 mr-2" /> },
        { id: 'blog', label: 'Blogs', icon: <Newspaper className="h-4 w-4 mr-2" /> },
        { id: 'portfolio', label: 'Portfolios', icon: <Briefcase className="h-4 w-4 mr-2" /> },
    ];

    useEffect(() => {
        const observer = new IntersectionObserver(
            ([entry]) => {
                if (entry.isIntersecting) {
                    sectionRef.current?.classList.add('section-enter-active');
                    sectionRef.current?.classList.remove('section-enter');
                    observer.disconnect();
                }
            },
            { threshold: 0.1 }
        );

        if (sectionRef.current) {
            sectionRef.current.classList.add('section-enter');
            observer.observe(sectionRef.current);
        }

        return () => observer.disconnect();
    }, []);

    const handleUseTemplate = (template) => {
        navigate('/dashboard');
    };

    const displayedTemplates = templates;

    return (
        <>
            {selectedTemplate && (
                <div className="fixed inset-0 bg-black/50 z-50 flex items-center justify-center p-4">
                    <div className="bg-white/95 backdrop-blur-xl border-3 border-amber-400 max-w-6xl w-full max-h-[90vh] overflow-hidden shadow-2xl relative" style={{
                        borderRadius: '30px 20px 35px 25px',
                        boxShadow: '8px 8px 0px rgba(245, 158, 11, 0.3)'
                    }}>
                        {/* Hand-drawn decorative elements */}
                        <div className="absolute top-2 right-2 w-4 h-4 bg-yellow-400 rounded-full opacity-60"></div>
                        <div className="absolute top-4 left-4 w-3 h-3 border-2 border-orange-400 opacity-50 transform rotate-45"></div>
                        <div className="absolute bottom-4 right-6 w-2 h-2 bg-amber-400 opacity-70 transform rotate-12" style={{borderRadius: '30% 70%'}}></div>

                        {/* Modal Header */}
                        <div className="flex items-center justify-between px-6 py-4 border-b-2 border-amber-300 bg-gradient-to-r from-amber-50 to-orange-50" style={{borderStyle: 'dashed'}}>
                            <div className="flex items-center gap-4">
                                <div className="p-3 bg-gradient-to-r from-amber-200 to-orange-200 border-2 border-amber-400" style={{borderRadius: '15px 10px 20px 15px'}}>
                                    <Eye className="h-6 w-6 text-amber-600" />
                                </div>
                                <div>
                                    <h3 className="text-xl font-bold text-slate-800">{selectedTemplate.name}</h3>
                                    <p className="text-sm text-slate-600">{selectedTemplate.category || 'General'} Template ✨</p>
                                </div>
                            </div>

                            <div className="flex items-center gap-3">
                                <button
                                    onClick={() => handleUseTemplate(selectedTemplate)}
                                    className="flex items-center gap-2 bg-gradient-to-r from-amber-400 to-orange-500 hover:from-amber-500 hover:to-orange-600 text-white py-2.5 px-6 font-bold transition-all duration-300 transform hover:scale-105 shadow-lg"
                                    style={{
                                        borderRadius: '20px 15px 25px 10px',
                                        boxShadow: '3px 3px 0px rgba(245, 158, 11, 0.4)'
                                    }}
                                >
                                    <Zap className="h-4 w-4" />
                                    🚀 Use This Template
                                </button>
                                <button
                                    onClick={() => setSelectedTemplate(null)}
                                    className="p-2 hover:bg-amber-100 border-2 border-amber-300 hover:border-orange-400 transition-colors"
                                    style={{borderRadius: '12px 8px 15px 10px'}}
                                >
                                    <X className="h-6 w-6 text-slate-600" />
                                </button>
                            </div>
                        </div>

                        {/* Modal Content */}
                        <div className="overflow-y-auto max-h-[calc(90vh-100px)]">
                            <div className="p-6 bg-gradient-to-br from-orange-50 via-yellow-50 to-amber-50">
                                <div className="aspect-[16/10] overflow-hidden bg-white border-3 border-amber-300 shadow-lg relative" style={{
                                    borderRadius: '25px 15px 30px 20px',
                                    boxShadow: '4px 4px 0px rgba(245, 158, 11, 0.3)'
                                }}>
                                    {/* Decorative corner elements */}
                                    <div className="absolute top-2 left-2 w-3 h-3 bg-amber-400 opacity-40 rounded-full"></div>
                                    <div className="absolute top-2 right-2 w-2 h-2 bg-orange-400 opacity-50 transform rotate-45"></div>
                                    <div className="absolute bottom-2 left-2 w-4 h-4 border-2 border-yellow-400 opacity-30 transform rotate-12" style={{borderRadius: '40% 60%'}}></div>
                                    
                                    <iframe
                                        src={selectedTemplate.previewUrl || "about:blank"}
                                        className="w-full h-full"
                                        title={`Preview of ${selectedTemplate.name}`}
                                        sandbox="allow-scripts allow-same-origin"
                                        style={{borderRadius: '22px 12px 27px 17px'}}
                                    />
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            )}

            <section ref={sectionRef} className="relative py-20 md:py-28 overflow-hidden bg-gradient-to-br from-orange-50 via-yellow-50 to-amber-50">
                {/* Paper texture overlay */}
                <div className="absolute inset-0 opacity-30" style={{
                    backgroundImage: `url("data:image/svg+xml,%3Csvg width='60' height='60' viewBox='0 0 60 60' xmlns='http://www.w3.org/2000/svg'%3E%3Cg fill='none' fill-rule='evenodd'%3E%3Cg fill='%23d4a574' fill-opacity='0.1'%3E%3Ccircle cx='7' cy='7' r='1'/%3E%3Ccircle cx='53' cy='53' r='1'/%3E%3Ccircle cx='13' cy='43' r='1'/%3E%3Ccircle cx='47' cy='17' r='1'/%3E%3C/g%3E%3C/g%3E%3C/svg%3E")`
                }}></div>

                {/* Hand-drawn decorative elements */}
                <div className="absolute inset-0 overflow-hidden pointer-events-none">
                    {/* Sketchy circles */}
                    <div className="absolute top-20 left-10 w-16 h-16 border-2 border-amber-400 opacity-40 transform rotate-12" style={{
                        borderStyle: 'dashed',
                        borderRadius: '60% 40% 70% 30%',
                        animation: 'float 6s ease-in-out infinite'
                    }}></div>
                    <div className="absolute top-40 right-20 w-12 h-12 border-2 border-orange-400 opacity-30 transform -rotate-12" style={{
                        borderStyle: 'dotted',
                        borderRadius: '40% 60% 30% 70%',
                        animation: 'float 8s ease-in-out infinite reverse'
                    }}></div>
                    
                    {/* Sketchy arrows */}
                    <div className="absolute bottom-32 left-1/4 text-amber-500 opacity-40 transform rotate-45">
                        <svg width="40" height="40" viewBox="0 0 40 40" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round">
                            <path d="M5 20 L35 20 M25 10 L35 20 L25 30" strokeDasharray="2,2"/>
                        </svg>
                    </div>
                    
                    {/* Sketchy stars */}
                    <div className="absolute top-1/3 right-1/3 text-yellow-500 opacity-50">
                        <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                            <path d="M12 2 L15 9 L22 9 L17 14 L19 22 L12 18 L5 22 L7 14 L2 9 L9 9 Z" strokeDasharray="1,1"/>
                        </svg>
                    </div>

                    {/* Additional floating elements */}
                    <div className="absolute top-1/2 left-1/6 w-6 h-6 bg-yellow-400/30 opacity-60 transform rotate-45" style={{borderRadius: '30% 70%'}}></div>
                    <div className="absolute bottom-1/4 right-1/4 w-4 h-4 border-2 border-orange-300 opacity-40 rounded-full"></div>
                    <div className="absolute top-3/4 left-1/3 w-8 h-8 border-2 border-amber-300 opacity-35 transform -rotate-12" style={{
                        borderRadius: '50% 30% 60% 40%',
                        borderStyle: 'dashed'
                    }}></div>
                </div>

                <div className="container mx-auto px-6 relative z-10">
                    <div className="text-center mb-12 md:mb-16">
                        {/* Hand-drawn badge */}
                        <div className="inline-block px-6 py-2 mb-6 bg-white/80 backdrop-blur-sm border-2 border-amber-300 shadow-lg transition-all duration-300 transform hover:scale-105" style={{
                            borderRadius: '25px 20px 30px 15px',
                            boxShadow: '3px 3px 0px rgba(245, 158, 11, 0.3)'
                        }}>
                            <span className="text-amber-700 text-sm font-bold flex items-center gap-2">
                                <PenTool className="h-4 w-4" />
                                ✨ 1600+ Hand-Crafted AI Templates
                            </span>
                        </div>

                        <h2 className="text-3xl md:text-5xl font-bold mb-6 leading-tight text-slate-800">
                            <span className="relative inline-block">
                                Choose Your Perfect
                                <svg className="absolute -bottom-2 left-0 w-full h-3" viewBox="0 0 300 12" fill="none">
                                    <path d="M5 8 Q150 2 295 8" stroke="#f59e0b" strokeWidth="3" strokeLinecap="round" fill="none" opacity="0.6"/>
                                </svg>
                            </span>
                            <br />
                            <span className="bg-gradient-to-r from-amber-600 via-orange-500 to-red-500 bg-clip-text text-transparent relative">
                                Design Template
                                <svg className="absolute -top-8 -right-8 w-16 h-16 text-yellow-400 opacity-60" viewBox="0 0 64 64" fill="none" stroke="currentColor" strokeWidth="2">
                                    <path d="M32 8 L40 24 L56 24 L44 36 L48 52 L32 44 L16 52 L20 36 L8 24 L24 24 Z" strokeDasharray="2,2"/>
                                </svg>
                            </span>
                        </h2>

                        <p className="text-lg md:text-xl text-slate-600 max-w-3xl mx-auto leading-relaxed">
                            Explore a vast collection of{' '}
                            <span className="text-amber-600 font-semibold relative">
                                professionally designed themes
                                <svg className="absolute -bottom-1 left-0 w-full h-2" viewBox="0 0 200 8" fill="none">
                                    <path d="M2 6 Q100 2 198 6" stroke="#f59e0b" strokeWidth="2" strokeLinecap="round" fill="none" opacity="0.4"/>
                                </svg>
                            </span>{' '}
                            powered by AI — tailored for performance, accessibility, and visual brilliance on every screen. 🎨
                        </p>
                    </div>

                    {/* Templates Grid */}
                    {displayedTemplates && displayedTemplates.length > 0 ? (
                        <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-8">
                            {displayedTemplates.map((template, index) => (
                                <div
                                    key={template.id || index}
                                    className={`group relative transition-all duration-500 transform hover:scale-105 ${index % 2 === 0 ? 'animate-float' : ''}`}
                                >
                                    {/* Hand-drawn card container */}
                                    <div className="relative">
                                        {/* Decorative background shadow */}
                                        <div className="absolute -inset-2 bg-gradient-to-r from-amber-200 to-orange-200 opacity-75 group-hover:opacity-100 transition duration-1000" style={{
                                            borderRadius: index % 2 === 0 ? '30px 20px 35px 25px' : '25px 35px 20px 30px'
                                        }}></div>
                                        
                                        {/* Main card */}
                                        <div className="relative bg-white/90 backdrop-blur-sm border-3 border-amber-300 group-hover:border-orange-400 overflow-hidden shadow-lg transition-all duration-300" style={{
                                            borderRadius: index % 2 === 0 ? '25px 15px 30px 20px' : '20px 30px 15px 25px',
                                            boxShadow: '4px 4px 0px rgba(245, 158, 11, 0.3)'
                                        }}>
                                            {/* Decorative corner elements */}
                                            <div className="absolute top-2 left-2 w-3 h-3 bg-amber-400 opacity-40 rounded-full"></div>
                                            <div className="absolute top-2 right-2 w-2 h-2 bg-orange-400 opacity-50 transform rotate-45"></div>
                                            <div className="absolute bottom-2 right-2 w-4 h-4 border-2 border-yellow-400 opacity-30 transform rotate-12" style={{borderRadius: '40% 60%'}}></div>

                                            {/* Image container */}
                                            <div className="relative overflow-hidden aspect-[4/3]" style={{borderRadius: '22px 12px 27px 17px 0 0 0 0'}}>
                                                <img
                                                    src={template.image || 'https://via.placeholder.com/400x300?text=No+Preview'}
                                                    alt={template.name || 'Template Preview'}
                                                    loading="lazy"
                                                    className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500"
                                                    onError={(e) => { e.currentTarget.src = 'https://via.placeholder.com/400x300?text=Error+Loading'; }}
                                                />
                                                <div className="absolute inset-0 bg-gradient-to-t from-slate-900/80 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
                                                
                                                {/* Floating preview badge */}
                                                <div className="absolute top-3 right-3 bg-white/90 backdrop-blur-sm border-2 border-amber-300 px-2 py-1 text-xs font-bold text-amber-600 opacity-0 group-hover:opacity-100 transition-all duration-300 transform translate-y-2 group-hover:translate-y-0" style={{
                                                    borderRadius: '12px 8px 15px 10px'
                                                }}>
                                                    ✨ Preview
                                                </div>
                                            </div>

                                            {/* Content */}
                                            <div className="p-6 bg-gradient-to-br from-white to-amber-50/30">
                                                <h4 className="text-lg font-bold text-slate-800 mb-1 truncate group-hover:text-amber-700 transition-colors relative">
                                                    {template.name || 'Unnamed Template'}
                                                    <svg className="absolute -bottom-1 left-0 w-0 group-hover:w-full h-1 transition-all duration-300" viewBox="0 0 100 4" fill="none">
                                                        <path d="M2 2 Q50 1 98 2" stroke="#f59e0b" strokeWidth="1" strokeLinecap="round" fill="none" opacity="0.6"/>
                                                    </svg>
                                                </h4>
                                                <p className="text-sm text-slate-600 mb-4 truncate h-5 flex items-center gap-1">
                                                    🎨 {template.category || 'General Purpose'}
                                                </p>
                                                
                                                {/* Action buttons */}
                                                <div className="flex gap-3">
                                                    <button
                                                        onClick={() => setSelectedTemplate(template)}
                                                        className="flex-1 flex items-center justify-center gap-2 bg-white border-2 border-amber-300 hover:border-orange-400 text-slate-700 hover:text-amber-700 py-2.5 px-4 font-semibold transition-all duration-300 hover:bg-amber-50 transform hover:scale-105"
                                                        style={{
                                                            borderRadius: '15px 10px 20px 15px',
                                                            boxShadow: '2px 2px 0px rgba(245, 158, 11, 0.2)'
                                                        }}
                                                    >
                                                        <Eye className="h-4 w-4" />
                                                        👁️ Preview
                                                    </button>
                                                    <button
                                                        onClick={() => handleUseTemplate(template)}
                                                        className="flex-1 flex items-center justify-center gap-2 bg-gradient-to-r from-amber-400 to-orange-500 hover:from-amber-500 hover:to-orange-600 text-white py-2.5 px-4 font-bold transition-all duration-300 transform hover:scale-105 shadow-lg"
                                                        style={{
                                                            borderRadius: '20px 15px 25px 10px',
                                                            boxShadow: '3px 3px 0px rgba(245, 158, 11, 0.4)'
                                                        }}
                                                    >
                                                        <Zap className="h-4 w-4" />
                                                        🚀 Use Now
                                                    </button>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            ))}
                        </div>
                    ) : (
                        <div className="text-center py-12">
                            <div className="inline-block p-8 bg-white/80 backdrop-blur-sm border-3 border-amber-300" style={{
                                borderRadius: '30px 20px 35px 25px',
                                borderStyle: 'dashed'
                            }}>
                                <LayoutGrid className="h-16 w-16 text-amber-500 mx-auto mb-4" />
                                <h3 className="text-xl font-bold text-slate-700 mb-2">No Templates Found 📭</h3>
                                <p className="text-slate-600 leading-relaxed">
                                    It seems there are no templates available for the selected category or at all.
                                    {activeTab !== 'all' && (
                                        <button onClick={() => setActiveTab('all')} className="text-amber-600 hover:text-orange-600 ml-1 font-semibold">
                                            View all templates. ✨
                                        </button>
                                    )}
                                </p>
                            </div>
                        </div>
                    )}

                    {/* Hand-drawn CTA section */}
                    <div className="text-center mt-16">
                        <div className="inline-block p-8 bg-gradient-to-r from-amber-50 to-orange-50 border-3 border-amber-300 relative" style={{
                            borderRadius: '30px 20px 35px 25px',
                            borderStyle: 'dashed',
                            boxShadow: '6px 6px 0px rgba(245, 158, 11, 0.3)'
                        }}>
                            {/* Decorative elements */}
                            <div className="absolute top-2 left-2 w-4 h-4 bg-yellow-400 opacity-50 rounded-full"></div>
                            <div className="absolute top-3 right-3 w-3 h-3 border-2 border-orange-400 opacity-40 transform rotate-45"></div>
                            <div className="absolute bottom-2 left-3 w-5 h-5 border-2 border-amber-400 opacity-35 transform rotate-12" style={{borderRadius: '40% 60%'}}></div>
                            
                            <h3 className="text-2xl font-bold text-slate-800 mb-4 relative">
                                Ready to Create Something Amazing? 🎨
                                <svg className="absolute -bottom-1 left-1/2 transform -translate-x-1/2 w-48 h-2" viewBox="0 0 192 8" fill="none">
                                    <path d="M2 6 Q96 2 190 6" stroke="#f59e0b" strokeWidth="2" strokeLinecap="round" fill="none" opacity="0.5"/>
                                </svg>
                            </h3>
                            <p className="text-slate-600 mb-6 max-w-2xl leading-relaxed">
                                Join thousands of creators who've already discovered the magic of{' '}
                                <span className="text-amber-600 font-semibold">AI-powered web design</span>.
                                No coding skills required - just pure creative freedom! ✨
                            </p>
                            <button className="bg-gradient-to-r from-amber-400 to-orange-500 text-white px-8 py-4 font-bold text-lg shadow-lg transform hover:scale-105 transition-all duration-300 hover:from-amber-500 hover:to-orange-600" style={{
                                borderRadius: '25px 15px 30px 20px',
                                boxShadow: '4px 4px 0px rgba(245, 158, 11, 0.4)'
                            }}>
                                <span className="flex items-center gap-2">
                                    <Sparkles className="h-5 w-5" />
                                    🚀 Start Creating Now
                                    <ArrowRight className="h-5 w-5" />
                                </span>
                            </button>
                        </div>
                    </div>
                </div>
            </section>
        </>
    );
};

export default TemplateShowcase;