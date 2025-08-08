import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Wand2, Globe, FileText, Sparkles, ArrowRight, Zap, Github, PenTool } from 'lucide-react';
import { useDispatch } from 'react-redux';
import { setWebsiteQueqe } from '../store/global.Slice';
import { useTheme } from '../context/ThemeContext';

const Hero = () => {
  const navigate = useNavigate();
  const [showVideo, setShowVideo] = useState(false);
  const [activeTab, setActiveTab] = useState('redesign');
  const dispatch = useDispatch()
  const { isDarkMode } = useTheme();
  const [formData, setFormData] = useState({
    url: '',
    repoUrl: '',
    docsSource: 'repo',
    readmeContent: '',
    topic: '',
    instructions: '',
    theme: 'auto'
  });
  const [isSubmitting, setIsSubmitting] = useState(false);

  const videoUrl = "https://www.youtube.com/embed/QTD-_s0htu4?si=qbpLpDem1kV-z77k";

  const tabs = [
    { id: 'redesign', label: 'Redesign Website', icon: <Wand2 className="h-4 w-4" /> },
    { id: 'docs', label: 'GitHub Docs', icon: <Github className="h-4 w-4" /> },
    { id: 'create', label: 'Create New', icon: <Sparkles className="h-4 w-4" /> }
  ];

  const themes = [
    { value: 'auto', label: 'AI Choose' },
    { value: 'light', label: 'Light' },
    { value: 'dark', label: 'Dark' }
  ];

  const handleInputChange = (field, value) => {
    setFormData(prev => ({ ...prev, [field]: value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsSubmitting(true);
    console.log("form data =>", formData)
    dispatch(setWebsiteQueqe({ formData, mode: activeTab }))
    setIsSubmitting(false);
    navigate('/dashboard');
  };

  const isFormValid = () => {
    if (activeTab === 'redesign') {
      return formData.url.trim() && /^https?:\/\/.+\..+/.test(formData.url.trim());
    }
    if (activeTab === 'docs') {
      if (formData.docsSource === 'repo') {
        return formData.repoUrl.trim() && /^https?:\/\/github\.com\/.+\/.+/.test(formData.repoUrl.trim());
      } else {
        return formData.readmeContent.trim();
      }
    }
    if (activeTab === 'blog') {
      return formData.topic.trim();
    }
    if (activeTab === 'create') {
      return formData.instructions.trim();
    }
    return false;
  };

  return (
    <section className={`pt-20 pb-12 min-h-[100vh] md:pt-24 md:pb-16 relative overflow-hidden transition-colors duration-300 ${
      isDarkMode 
        ? 'bg-gradient-to-br from-slate-900 via-slate-800 to-slate-900' 
        : 'bg-gradient-to-br from-orange-50 via-yellow-50 to-amber-50'
    }`}>
      {/* Paper texture overlay */}
      <div className="absolute inset-0 opacity-30" style={{
        backgroundImage: `url("data:image/svg+xml,%3Csvg width='60' height='60' viewBox='0 0 60 60' xmlns='http://www.w3.org/2000/svg'%3E%3Cg fill='none' fill-rule='evenodd'%3E%3Cg fill='%23d4a574' fill-opacity='0.1'%3E%3Ccircle cx='7' cy='7' r='1'/%3E%3Ccircle cx='53' cy='53' r='1'/%3E%3Ccircle cx='13' cy='43' r='1'/%3E%3Ccircle cx='47' cy='17' r='1'/%3E%3C/g%3E%3C/g%3E%3C/svg%3E")`
      }}></div>

      {/* Hand-drawn doodles */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        {/* Sketchy circles */}
        <div className="absolute top-20 left-10 w-16 h-16 border-2 border-amber-400 rounded-full opacity-40 transform rotate-12" style={{
          borderStyle: 'dashed',
          animation: 'float 6s ease-in-out infinite'
        }}></div>
        <div className="absolute top-40 right-20 w-12 h-12 border-2 border-orange-400 rounded-full opacity-30 transform -rotate-12" style={{
          borderStyle: 'dotted',
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
      </div>

      <div className="container mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <div className="max-w-7xl mx-auto">
          {/* Main Grid Layout */}
          <div className="grid lg:grid-cols-2 gap-8 lg:gap-16 items-center min-h-[80vh]">
            
            {/* Left Content */}
            <div className="space-y-8">
              {/* Hand-drawn badge */}
              <div className="inline-block px-6 py-2 bg-white/80 backdrop-blur-sm border-2 border-amber-300 shadow-lg transition-all duration-300 transform hover:scale-105" style={{
              <div className={`inline-block px-6 py-2 backdrop-blur-sm border-2 shadow-lg transition-all duration-300 transform hover:scale-105 ${
                isDarkMode 
                  ? 'bg-slate-800/80 border-amber-600' 
                  : 'bg-white/80 border-amber-300'
              }`} style={{
                borderRadius: '25px 20px 30px 15px',
                boxShadow: '3px 3px 0px rgba(245, 158, 11, 0.3)'
              }}>
                <span className={`text-sm font-medium flex items-center gap-2 ${
                  isDarkMode ? 'text-amber-400' : 'text-amber-700'
                }`}>
                  <PenTool className="h-4 w-4" />
                  ✨ Hand-Crafted AI Web Creation
                </span>
              </div>

              {/* Main Heading */}
              <div>
                <h1 className={`text-4xl md:text-5xl lg:text-5xl font-bold mb-6 leading-tight ${
                  isDarkMode ? 'text-slate-200' : 'text-slate-800'
                }`}>
                  <span className="relative inline-block">
                    Create Beautiful
                    <svg className="absolute -bottom-2 left-0 w-full h-3" viewBox="0 0 300 12" fill="none">
                      <path d="M5 8 Q150 2 295 8" stroke="#f59e0b" strokeWidth="3" strokeLinecap="round" fill="none" opacity="0.6"/>
                    </svg>
                  </span>
                  <br />
                  <span className="bg-gradient-to-r from-amber-600 via-orange-500 to-red-500 bg-clip-text text-transparent relative">
                    Landing Pages
                    <svg className="absolute -top-8 -right-8 w-16 h-16 text-amber-400 opacity-60" viewBox="0 0 64 64" fill="none" stroke="currentColor" strokeWidth="2">
                      <path d="M32 8 L40 24 L56 24 L44 36 L48 52 L32 44 L16 52 L20 36 L8 24 L24 24 Z" strokeDasharray="2,2"/>
                    </svg>
                  </span>,
                  <br />
                  <span className="bg-gradient-to-r from-orange-600 via-red-500 to-pink-500 bg-clip-text text-transparent">
                    Redesign Websites
                  </span>,
                  <br />
                  <span className="bg-gradient-to-r from-amber-500 to-yellow-500 bg-clip-text text-transparent">
                    GitHub Docs
                  </span> &{' '}
                  <span className="bg-gradient-to-r from-orange-500 to-red-500 bg-clip-text text-transparent">
                    More
                  </span>
                  <br />
                  <span className="text-slate-700">— in Minutes</span>
                  <span className={isDarkMode ? 'text-slate-300' : 'text-slate-700'}>— in Minutes</span>
                </h1>

                <p className={`text-lg md:text-xl mb-8 leading-relaxed ${
                  isDarkMode ? 'text-slate-400' : 'text-slate-600'
                }`}>
                  Whether you're starting fresh or transforming existing content — our{' '}
                  <span className={`font-semibold relative ${
                    isDarkMode ? 'text-amber-400' : 'text-amber-600'
                  }`}>
                    AI Frontend Engineer
                    <svg className="absolute -bottom-1 left-0 w-full h-2" viewBox="0 0 200 8" fill="none">
                      <path d="M2 6 Q100 2 198 6" stroke="#f59e0b" strokeWidth="2" strokeLinecap="round" fill="none" opacity="0.4"/>
                    </svg>
                  </span>{' '}
                  turns your ideas, links, or repos into polished, high-converting pages. No code. Just launch.
                </p>
              </div>

              {/* CTA Buttons */}
              <div className="flex flex-col sm:flex-row gap-4">
                <button
                  onClick={() => navigate('/dashboard')}
                  className="group relative px-8 py-4 bg-gradient-to-r from-amber-400 to-orange-500 text-white font-bold text-lg shadow-lg transform hover:scale-105 transition-all duration-300 overflow-hidden"
                  style={{
                    borderRadius: '25px 15px 20px 30px',
                    boxShadow: '4px 4px 0px rgba(245, 158, 11, 0.4)'
                  }}
                >
                  <div className="absolute inset-0 bg-gradient-to-r from-amber-500 to-orange-600 opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
                  <span className="relative z-10 flex items-center gap-2">
                    🚀 Go to Dashboard
                    <ArrowRight className="h-5 w-5 group-hover:translate-x-1 transition-transform duration-300" />
                  </span>
                </button>

                <button
                  onClick={() => setShowVideo(true)}
                  className="group px-8 py-4 border-3 border-slate-400 text-slate-700 font-bold text-lg hover:border-amber-500 hover:text-amber-700 hover:bg-amber-50 transition-all duration-300"
                  style={{
                    borderRadius: '20px 30px 15px 25px',
                    borderStyle: 'dashed'
                  }}
                >
                  <span className="flex items-center gap-2">
                    📖 View Demo
                    <svg className="w-4 h-4 group-hover:translate-x-1 transition-transform duration-300" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                    </svg>
                  </span>
                </button>
              </div>

              {/* Features Info */}
              <div className={`p-6 border-2 ${
                isDarkMode 
                  ? 'bg-gradient-to-r from-slate-800 to-slate-700 border-amber-600' 
                  : 'bg-gradient-to-r from-amber-50 to-orange-50 border-amber-200'
              }`} style={{
                borderRadius: '20px 30px 15px 25px',
                borderStyle: 'dashed'
              }}>
                <div className="flex items-start gap-3">
                  <Sparkles className="h-6 w-6 text-amber-600 flex-shrink-0 mt-0.5" />
                  <div>
                    <h3 className={`font-bold mb-2 text-lg ${
                      isDarkMode ? 'text-slate-200' : 'text-slate-800'
                    }`}>What you'll get: ✨</h3>
                    <ul className={`space-y-2 ${
                      isDarkMode ? 'text-slate-300' : 'text-slate-700'
                    }`}>
                      <li className="flex items-center gap-2">
                        <span className="w-2 h-2 bg-amber-400 rounded-full"></span>
                        Production-ready HTML/CSS code
                      </li>
                      <li className="flex items-center gap-2">
                        <span className="w-2 h-2 bg-orange-400 rounded-full"></span>
                        Responsive design for all devices
                      </li>
                      <li className="flex items-center gap-2">
                        <span className="w-2 h-2 bg-yellow-400 rounded-full"></span>
                        SEO-optimized structure
                      </li>
                      <li className="flex items-center gap-2">
                        <span className="w-2 h-2 bg-purple-400 rounded-full"></span>
                        Clean, maintainable code
                      </li>
                    </ul>
                  </div>
                </div>
              </div>
            </div>

            {/* Right Form */}
            <div className="lg:sticky lg:top-24">
              <div className={`backdrop-blur-sm border-3 p-6 md:p-8 shadow-2xl relative ${
                isDarkMode 
                  ? 'bg-slate-800/90 border-amber-600' 
                  : 'bg-white/90 border-amber-300'
              }`} style={{
                borderRadius: '30px 20px 35px 25px',
                boxShadow: '8px 8px 0px rgba(245, 158, 11, 0.2)'
              }}>
                {/* Decorative corner doodles */}
                <div className="absolute top-2 left-2 w-6 h-6 border-2 border-amber-400 rounded-full opacity-40"></div>
                <div className="absolute top-2 right-2 w-4 h-4 bg-orange-300 opacity-40 transform rotate-45"></div>
                <div className="absolute bottom-2 left-2 w-5 h-5 bg-yellow-300 opacity-40 rounded-full"></div>
                <div className="absolute bottom-2 right-2 w-6 h-6 border-2 border-red-400 opacity-40 transform rotate-12" style={{borderRadius: '30% 70% 70% 30%'}}></div>

                <div className="text-center mb-6">
                  <h2 className={`text-2xl font-bold mb-2 relative ${
                    isDarkMode ? 'text-slate-200' : 'text-slate-800'
                  }`}>
                    Start Creating Now
                    <svg className="absolute -bottom-1 left-1/2 transform -translate-x-1/2 w-32 h-2" viewBox="0 0 128 8" fill="none">
                      <path d="M2 6 Q64 2 126 6" stroke="#f59e0b" strokeWidth="2" strokeLinecap="round" fill="none" opacity="0.5"/>
                    </svg>
                  </h2>
                  <p className={isDarkMode ? 'text-slate-400' : 'text-slate-600'}>
                    Choose your creation mode and let AI do the magic ✨
                  </p>
                </div>

                {/* Tabs */}
                <div className="hidden md:flex flex-wrap justify-center gap-3 mb-6">
                  {tabs.map((tab, index) => (
                    <button
                      key={tab.id}
                      onClick={() => setActiveTab(tab.id)}
                      className={`flex items-center gap-2 px-4 py-2 font-semibold transition-all duration-300 transform hover:scale-105 ${
                        activeTab === tab.id
                          ? 'bg-gradient-to-r from-amber-400 to-orange-400 text-white shadow-lg'
                          : 'bg-white border-2 border-slate-300 text-slate-700 hover:border-amber-400 hover:bg-amber-50'
                      }`}
                      style={{
                        borderRadius: index % 2 === 0 ? '20px 10px 25px 15px' : '15px 25px 10px 20px',
                        boxShadow: activeTab === tab.id ? '3px 3px 0px rgba(245, 158, 11, 0.3)' : '2px 2px 0px rgba(148, 163, 184, 0.2)'
                      }}
                    >
                      {tab.icon}
                      <span className="text-sm">{tab.label}</span>
                    </button>
                  ))}
                </div>

                <div className="md:hidden mb-6">
                  <select
                    value={activeTab}
                    onChange={(e) => setActiveTab(e.target.value)}
                    className={`w-full border-2 px-4 py-3 focus:outline-none focus:ring-2 focus:ring-amber-500 ${
                      isDarkMode
                        ? 'bg-slate-700 text-slate-200 border-amber-600'
                        : 'bg-white text-slate-700 border-amber-300'
                    }`}
                    style={{borderRadius: '15px 25px 15px 25px'}}
                  >
                    {tabs.map((tab) => (
                      <option key={tab.id} value={tab.id}>
                        {tab.label}
                      </option>
                    ))}
                  </select>
                </div>

                {/* Form */}
                <form onSubmit={handleSubmit} className="space-y-6">
                  {/* Redesign Tab */}
                  {activeTab === 'redesign' && (
                    <div className="space-y-4">
                      <div>
                        <label htmlFor="url" className={`block font-semibold mb-2 ${
                          isDarkMode ? 'text-slate-200' : 'text-slate-800'
                        }`}>
                          Website URL to Redesign 🎨
                        </label>
                        <input
                          type="url"
                          id="url"
                          value={formData.url}
                          onChange={(e) => handleInputChange('url', e.target.value)}
                          placeholder="https://example.com"
                          className={`w-full border-2 px-4 py-3 focus:outline-none focus:ring-2 focus:ring-amber-500 focus:border-amber-500 ${
                            isDarkMode
                              ? 'bg-slate-700 border-slate-600 text-slate-200 placeholder-slate-400'
                              : 'bg-white border-slate-300 text-slate-800 placeholder-slate-500'
                          }`}
                          style={{borderRadius: '15px 20px 15px 20px'}}
                        />
                      </div>
                      <div>
                        <label htmlFor="redesignInstructions" className={`block font-semibold mb-2 ${
                          isDarkMode ? 'text-slate-200' : 'text-slate-800'
                        }`}>
                          Special Instructions (Optional) ✏️
                        </label>
                        <input
                          type="text"
                          id="redesignInstructions"
                          value={formData.instructions}
                          onChange={(e) => handleInputChange('instructions', e.target.value)}
                          placeholder="e.g., Make it more modern, improve mobile design"
                          className={`w-full border-2 px-4 py-3 focus:outline-none focus:ring-2 focus:ring-amber-500 focus:border-amber-500 ${
                            isDarkMode
                              ? 'bg-slate-700 border-slate-600 text-slate-200 placeholder-slate-400'
                              : 'bg-white border-slate-300 text-slate-800 placeholder-slate-500'
                          }`}
                          style={{borderRadius: '20px 15px 20px 15px'}}
                        />
                      </div>
                    </div>
                  )}

                  {/* GitHub Docs Tab */}
                  {activeTab === 'docs' && (
                    <div className="space-y-4">
                      {/* Source Selection */}
                      <div className={`flex p-2 mb-4 ${
                        isDarkMode ? 'bg-slate-700' : 'bg-amber-50'
                      }`} style={{
                        borderRadius: '20px 15px 25px 10px', 
                        border: isDarkMode ? '2px dashed #d97706' : '2px dashed #f59e0b'
                      }}>
                        <button
                          type="button"
                          onClick={() => handleInputChange('docsSource', 'repo')}
                          className={`flex-1 flex items-center justify-center gap-2 py-3 px-4 text-sm font-semibold transition-all ${
                            (formData.docsSource || 'repo') === 'repo'
                              ? 'bg-amber-400 text-white shadow-lg'
                              : isDarkMode
                                ? 'text-slate-300 hover:bg-slate-600 hover:text-amber-400'
                                : 'text-slate-700 hover:bg-white hover:text-amber-700'
                          }`}
                          style={{borderRadius: '15px 10px 20px 15px'}}
                        >
                          <Github className="h-4 w-4" />
                          From Repository
                        </button>
                        <button
                          type="button"
                          onClick={() => handleInputChange('docsSource', 'readme')}
                          className={`flex-1 flex items-center justify-center gap-2 py-3 px-4 text-sm font-semibold transition-all ${
                            formData.docsSource === 'readme'
                              ? 'bg-amber-400 text-white shadow-lg'
                              : isDarkMode
                                ? 'text-slate-300 hover:bg-slate-600 hover:text-amber-400'
                                : 'text-slate-700 hover:bg-white hover:text-amber-700'
                          }`}
                          style={{borderRadius: '10px 15px 15px 20px'}}
                        >
                          <FileText className="h-4 w-4" />
                          From README
                        </button>
                      </div>

                      {/* Repository URL Input */}
                      {(formData.docsSource || 'repo') === 'repo' && (
                        <div>
                          <label htmlFor="repoUrl" className={`block font-semibold mb-2 ${
                            isDarkMode ? 'text-slate-200' : 'text-slate-800'
                          }`}>
                            GitHub Repository URL 📚
                          </label>
                          <input
                            type="url"
                            id="repoUrl"
                            value={formData.repoUrl}
                            onChange={(e) => handleInputChange('repoUrl', e.target.value)}
                            placeholder="https://github.com/username/repository"
                            className={`w-full border-2 px-4 py-3 focus:outline-none focus:ring-2 focus:ring-amber-500 focus:border-amber-500 ${
                              isDarkMode
                                ? 'bg-slate-700 border-slate-600 text-slate-200 placeholder-slate-400'
                                : 'bg-white border-slate-300 text-slate-800 placeholder-slate-500'
                            }`}
                            style={{borderRadius: '15px 20px 15px 20px'}}
                          />
                          <p className={`text-sm mt-2 ${
                            isDarkMode ? 'text-slate-400' : 'text-slate-600'
                          }`}>
                            We'll analyze your repository and create beautiful documentation ✨
                          </p>
                        </div>
                      )}

                      {/* README Content Input */}
                      {formData.docsSource === 'readme' && (
                        <div>
                          <label htmlFor="readmeContent" className={`block font-semibold mb-2 ${
                            isDarkMode ? 'text-slate-200' : 'text-slate-800'
                          }`}>
                            README Content 📝
                          </label>
                          <textarea
                            id="readmeContent"
                            value={formData.readmeContent}
                            onChange={(e) => handleInputChange('readmeContent', e.target.value)}
                            rows={6}
                            placeholder="Paste your README.md content here..."
                            className={`w-full border-2 px-4 py-3 focus:outline-none focus:ring-2 focus:ring-amber-500 focus:border-amber-500 font-mono text-sm ${
                              isDarkMode
                                ? 'bg-slate-700 border-slate-600 text-slate-200 placeholder-slate-400'
                                : 'bg-white border-slate-300 text-slate-800 placeholder-slate-500'
                            }`}
                            style={{borderRadius: '20px 15px 25px 10px'}}
                          />
                          <p className={`text-sm mt-2 ${
                            isDarkMode ? 'text-slate-400' : 'text-slate-600'
                          }`}>
                            Paste your README.md content and we'll transform it into beautiful documentation 🎨
                          </p>
                        </div>
                      )}

                      <div>
                        <label htmlFor="docsInstructions" className={`block font-semibold mb-2 ${
                          isDarkMode ? 'text-slate-200' : 'text-slate-800'
                        }`}>
                          Documentation Focus (Optional) 🎯
                        </label>
                        <textarea
                          id="docsInstructions"
                          value={formData.instructions}
                          onChange={(e) => handleInputChange('instructions', e.target.value)}
                          rows={3}
                          placeholder="e.g., Focus on API documentation, include installation guide, highlight key features"
                          className={`w-full border-2 px-4 py-3 focus:outline-none focus:ring-2 focus:ring-amber-500 focus:border-amber-500 ${
                            isDarkMode
                              ? 'bg-slate-700 border-slate-600 text-slate-200 placeholder-slate-400'
                              : 'bg-white border-slate-300 text-slate-800 placeholder-slate-500'
                          }`}
                          style={{borderRadius: '15px 25px 15px 25px'}}
                        />
                      </div>
                    </div>
                  )}

                  {/* Create Tab */}
                  {activeTab === 'create' && (
                    <div className="space-y-4">
                      <div>
                        <label htmlFor="createInstructions" className={`block font-semibold mb-2 ${
                          isDarkMode ? 'text-slate-200' : 'text-slate-800'
                        }`}>
                          Describe Your Website 💭
                        </label>
                        <textarea
                          id="createInstructions"
                          value={formData.instructions}
                          onChange={(e) => handleInputChange('instructions', e.target.value)}
                          rows={4}
                          placeholder="e.g., A landing page for a SaaS product with pricing, testimonials, and signup form"
                          className={`w-full border-2 px-4 py-3 focus:outline-none focus:ring-2 focus:ring-amber-500 focus:border-amber-500 ${
                            isDarkMode
                              ? 'bg-slate-700 border-slate-600 text-slate-200 placeholder-slate-400'
                              : 'bg-white border-slate-300 text-slate-800 placeholder-slate-500'
                          }`}
                          style={{borderRadius: '20px 15px 25px 10px'}}
                        />
                      </div>
                    </div>
                  )}

                  {/* Submit Button */}
                  <div className="flex justify-center pt-4">
                    <button
                      type="submit"
                      disabled={!isFormValid() || isSubmitting}
                      className={`flex items-center gap-3 px-10 py-4 font-bold text-lg transition-all duration-300 transform hover:scale-105 w-full justify-center ${
                        isFormValid() && !isSubmitting
                          ? 'bg-gradient-to-r from-amber-400 to-orange-500 text-white hover:from-amber-500 hover:to-orange-600 shadow-lg'
                          : 'bg-slate-300 text-slate-500 cursor-not-allowed'
                      }`}
                      style={{
                        borderRadius: '25px 15px 30px 20px',
                        boxShadow: isFormValid() && !isSubmitting ? '4px 4px 0px rgba(245, 158, 11, 0.4)' : 'none'
                      }}
                    >
                      {isSubmitting ? (
                        <>
                          <div className="w-5 h-5 border-2 border-white/30 border-t-white rounded-full animate-spin"></div>
                          Creating Magic...
                        </>
                      ) : (
                        <>
                          <Zap className="h-5 w-5" />
                          {activeTab === 'redesign' ? 'Redesign Website' :
                            activeTab === 'docs' ? 'Generate Docs' :
                              activeTab === 'blog' ? 'Generate Blog' : 'Create Website'}
                          <ArrowRight className="h-5 w-5" />
                        </>
                      )}
                    </button>
                  </div>
                </form>
              </div>
            </div>
          </div>

          {/* Mobile-only content for smaller screens */}
          <div className="lg:hidden text-center mt-12">
            {/* Hand-drawn badge */}
           <div className={`inline-block px-6 py-2 mb-6 backdrop-blur-sm border-2 shadow-lg transition-all duration-300 transform hover:scale-105 ${
             isDarkMode 
               ? 'bg-slate-800/80 border-amber-600' 
               : 'bg-white/80 border-amber-300'
           }`} style={{
              borderRadius: '25px 20px 30px 15px',
              boxShadow: '3px 3px 0px rgba(245, 158, 11, 0.3)'
            }}>
             <span className={`text-sm font-medium flex items-center gap-2 ${
               isDarkMode ? 'text-amber-400' : 'text-amber-700'
             }`}>
                <PenTool className="h-4 w-4" />
                ✨ Hand-Crafted AI Web Creation
              </span>
            </div>

            {/* Hand-drawn heading */}
           <h1 className={`text-4xl md:text-5xl font-bold mb-6 leading-tight ${
             isDarkMode ? 'text-slate-200' : 'text-slate-800'
           }`}>
              <span className="relative inline-block">
                Create Beautiful
                <svg className="absolute -bottom-2 left-0 w-full h-3" viewBox="0 0 300 12" fill="none">
                  <path d="M5 8 Q150 2 295 8" stroke="#f59e0b" strokeWidth="3" strokeLinecap="round" fill="none" opacity="0.6"/>
                </svg>
              </span>
              <br />
              <span className="bg-gradient-to-r from-amber-600 via-orange-500 to-red-500 bg-clip-text text-transparent relative">
                Landing Pages
                <svg className="absolute -top-8 -right-8 w-16 h-16 text-yellow-400 opacity-60" viewBox="0 0 64 64" fill="none" stroke="currentColor" strokeWidth="2">
                  <path d="M32 8 L40 24 L56 24 L44 36 L48 52 L32 44 L16 52 L20 36 L8 24 L24 24 Z" strokeDasharray="2,2"/>
                </svg>
              </span>,
              <br />
              <span className="bg-gradient-to-r from-blue-600 via-indigo-500 to-purple-500 bg-clip-text text-transparent">
                Redesign Websites
              </span>,
              <br />
              <span className="bg-gradient-to-r from-emerald-500 to-teal-500 bg-clip-text text-transparent">
                GitHub Docs
              </span> &{' '}
              <span className="bg-gradient-to-r from-pink-500 to-rose-500 bg-clip-text text-transparent">
                More
              </span>
              <br />
              <span className="text-slate-700">— in Minutes</span>
            </h1>

            <p className={`text-lg mb-8 leading-relaxed max-w-3xl mx-auto ${
              isDarkMode ? 'text-slate-400' : 'text-slate-600'
            }`}>
              Whether you're starting fresh or transforming existing content — our{' '}
              <span className={`font-semibold relative ${
                isDarkMode ? 'text-amber-400' : 'text-amber-600'
              }`}>
                AI Frontend Engineer
                <svg className="absolute -bottom-1 left-0 w-full h-2" viewBox="0 0 200 8" fill="none">
                  <path d="M2 6 Q100 2 198 6" stroke="#f59e0b" strokeWidth="2" strokeLinecap="round" fill="none" opacity="0.4"/>
                </svg>
              </span>{' '}
              turns your ideas, links, or repos into polished, high-converting pages. No code. Just launch.
            </p>
          </div>
        </div>
      </div>

      {/* Modal */}
      {showVideo && (
        <div className="fixed inset-0 bg-black/50 z-50 flex items-center justify-center p-4">
          <div className="relative w-full max-w-7xl">
            <div className="pb-[56.25%] relative h-0 overflow-hidden rounded-lg shadow-2xl">
              <iframe
                className="absolute top-0 left-0 w-full h-full"
                src={videoUrl}
                title="YouTube Video"
                frameBorder="0"
                allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                allowFullScreen
              />
            </div>
            <button
              onClick={() => setShowVideo(false)}
              className="absolute top-2 right-2 bg-white text-black w-8 h-8 rounded-full flex items-center justify-center hover:bg-gray-200"
              aria-label="Close"
            >
              ✕
            </button>
          </div>
        </div>
      )}

      {/* Custom animations */}
      <style jsx>{`
        @keyframes float {
          0%, 100% { transform: translateY(0px) rotate(0deg); }
          50% { transform: translateY(-10px) rotate(5deg); }
        }
      `}</style>
    </section>
  );
};

export default Hero;