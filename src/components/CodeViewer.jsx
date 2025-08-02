import { useEffect, useState, Fragment } from 'react';
import {
  XIcon, Zap, Copy, LayoutDashboard, Sparkles, Wand2, Send,
  ExternalLink,
  Globe,
  Download,
  Edit2Icon,
  BotIcon,
} from 'lucide-react';
import toast from 'react-hot-toast';
import logo from "../assets/logo.webp";
import { useDispatch, useSelector } from 'react-redux';
import { UserSelector } from '../store/global.Selctor';
import { editWebsite, GetWebsite } from '../store/global.Action';
import ChatWidget from './ChatWidget';

export function CodeViewer({ id, handleOpenDesignChat, website, onClose, multiDesignlist, handleFormatSelect, multiDesign, setPreviewWebsite }) {
  const [currentDesign, setCurrentDesign] = useState(0);
  const [designs, setDesigns] = useState([]);
  const [designNames, setDesignNames] = useState([]);
  const [sidebarOpen, setSidebarOpen] = useState(true);
  const [showConvertToWebAppModal, setShowConvertToWebAppModal] = useState(false);
  const [webAppBoltPrompt, setWebAppBoltPrompt] = useState('');
  const user = useSelector(UserSelector);

  useEffect(() => {
    if (multiDesign && multiDesignlist) {
      const mappedDesigns = multiDesignlist.map(item =>
        `${import.meta.env.VITE_FILE_SERVER_URL}/saved-pages/${item.uuid}`
      );
      const names = multiDesignlist.map((item, i) => item.name || `Variation ${i + 1}`);
      setDesigns(mappedDesigns);
      setDesignNames(names);
    } else {
      setDesigns([`${import.meta.env.VITE_FILE_SERVER_URL}/saved-pages/${id}`]);
      setDesignNames(["Current Design"]);
    }
  }, [multiDesign, multiDesignlist, id]);

  const handleOpenConvertToWebAppModal = async () => {
    const currentPlan = user?.currentPlan || 'Free';
    if (currentPlan === 'Free' || currentPlan === 'free') {
      setTimeout(() => {
        toast.success("Oops! This feature is part of our paid plans. Upgrade to unlock it!", {
          duration: 5000,
          position: 'top-center',
          style: {
            background: 'linear-gradient(to right, #6366f1, #8b5cf6)',
            color: '#fff',
            padding: '16px',
            borderRadius: '10px',
            boxShadow: '0 10px 25px -5px rgba(0,0,0,0.2), 0 20px 40px -20px rgba(0,0,0,0.3)',
            border: '1px solid rgba(255,255,255,0.1)'
          },
          icon: <Sparkles className="text-yellow-300" />,
        });
      }, 300);
      return;
    }
    const htmlCode = await fetch(`${import.meta.env.VITE_FILE_SERVER_URL}/saved-pages/${multiDesign ? multiDesignlist[currentDesign].uuid : id}`)
    const promptText = `convert this HTML code into a web app ${await htmlCode.text()}`;
    setWebAppBoltPrompt(promptText);
    setShowConvertToWebAppModal(true);
    if (window.innerWidth < 768) setSidebarOpen(false);
  };

  const currentDesignName = designNames[currentDesign] || 'Design Preview';
  const currentDesignUrl = designs[currentDesign] || '';
  const sectionAnimation = "opacity-0 animate-fadeInUp";

  return (
    <>

      <div className="flex h-screen bg-gradient-to-br from-orange-50 via-amber-50 to-yellow-50 text-slate-800 font-sans overflow-hidden">


        <main className="flex-1 flex flex-col bg-white/90 overflow-hidden relative border-3 border-amber-300" style={{
          borderRadius: '30px 20px 35px 25px',
          boxShadow: '8px 8px 0px rgba(245, 158, 11, 0.3)'
        }}>
          {/* Hand-drawn decorative elements */}
          <div className="absolute top-2 right-2 w-4 h-4 bg-yellow-400 rounded-full opacity-60 pointer-events-none"></div>
          <div className="absolute top-4 left-4 w-3 h-3 border-2 border-orange-400 opacity-50 transform rotate-45 pointer-events-none"></div>
          <div className="absolute bottom-4 right-6 w-2 h-2 bg-amber-400 opacity-70 transform rotate-12 pointer-events-none" style={{borderRadius: '30% 70%'}}></div>

          <header
            className={`${sectionAnimation} flex items-center justify-between p-1 sm:p-4 md:p-4 bg-gradient-to-r from-amber-50 to-orange-50 backdrop-blur-md border-b-2 border-amber-300 shadow-sm z-10 shrink-0`}
            style={{ 
              animationDelay: '0.2s',
              borderBottomStyle: 'dashed'
            }}
          >
            {/* Left side: Menu + Design name */}
            <button onClick={onClose} className="flex items-center gap-2 group"> {/* Changed Link to button for consistency */}
              <img src={logo} alt="Redesignr.ai Logo" className="h-8 w-8 md:h-10 md:w-10 group-hover:scale-110 transition-transform duration-300" />
              <span className="text-xl md:text-2xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-amber-600 to-orange-600 group-hover:opacity-90 transition-opacity duration-300 relative">
                redesignr<span className="text-orange-500">.ai</span>
                <svg className="absolute -bottom-1 left-0 w-full h-1" viewBox="0 0 100 4" fill="none">
                  <path d="M2 2 Q50 1 98 2" stroke="#f59e0b" strokeWidth="1" strokeLinecap="round" fill="none" opacity="0.6"/>
                </svg>
              </span>
            </button>

            {/* Center/Right: Web App button */}
            <div className="relative flex-1 flex justify-end">
              <button
                onClick={handleOpenConvertToWebAppModal}
                className="flex items-center space-x-3 px-3 py-2.5 text-sm font-medium bg-amber-100 hover:bg-amber-200 text-amber-700 hover:text-amber-800 transition-all duration-200 ease-in-out group focus:ring-2 focus:ring-amber-500 focus:outline-none border-2 border-amber-300 shadow-lg transform hover:scale-105"
                style={{
                  borderRadius: '15px 20px 15px 20px',
                  boxShadow: '3px 3px 0px rgba(245, 158, 11, 0.3)'
                }}
              >
                <Globe size={18} className="text-amber-600 group-hover:text-amber-700 transition-colors" />
                <span>🚀 Convert To Web App</span>
              </button>
            </div>

            {/* Rightmost: Close Preview button */}
            <div className={`${sectionAnimation} ml-4 gap-2 hidden md:flex`} style={{ animationDelay: '0.5s' }}>
              <button
                onClick={() => {
                  handleFormatSelect(id)
                }}
                className="flex items-center space-x-3 px-3 py-2.5 text-sm font-medium bg-blue-100 hover:bg-blue-200 text-blue-700 hover:text-blue-800 transition-all group focus:ring-2 focus:ring-blue-500 focus:outline-none border-2 border-blue-300 shadow-lg transform hover:scale-105"
                style={{
                  borderRadius: '20px 10px 25px 15px',
                  boxShadow: '3px 3px 0px rgba(59, 130, 246, 0.3)'
                }}
              >
                <Download size={18} className="text-blue-600 group-hover:text-blue-700 transition-colors" />
                <span>💾 Download Code</span>
              </button>

              <button
                onClick={() => {
                  handleOpenDesignChat(website)
                  onClose();
                }}
                className="flex items-center space-x-3 px-3 py-2.5 text-sm font-medium bg-purple-100 hover:bg-purple-200 text-purple-700 hover:text-purple-800 transition-all group focus:ring-2 focus:ring-purple-500 focus:outline-none border-2 border-purple-300 shadow-lg transform hover:scale-105"
                style={{
                  borderRadius: '10px 25px 10px 25px',
                  boxShadow: '3px 3px 0px rgba(147, 51, 234, 0.3)'
                }}
              >
                <Edit2Icon size={18} className="text-purple-600 group-hover:text-purple-700 transition-colors" />
                <span>✏️ Edit Design</span>
              </button>

              <button
                onClick={() => {
                  handleOpenDesignChat(website)
                  onClose();
                }}
                className="flex items-center space-x-3 px-3 py-2.5 text-sm font-medium bg-emerald-100 hover:bg-emerald-200 text-emerald-700 hover:text-emerald-800 transition-all group focus:ring-2 focus:ring-emerald-500 focus:outline-none border-2 border-emerald-300 shadow-lg transform hover:scale-105"
                style={{
                  borderRadius: '25px 15px 30px 20px',
                  boxShadow: '3px 3px 0px rgba(16, 185, 129, 0.3)'
                }}
              >
                <BotIcon size={18} className="text-emerald-600 group-hover:text-emerald-700 transition-colors" />
                <span>🤖 AI Chat</span>
              </button>

              <button
                onClick={onClose}
                className="flex items-center justify-center space-x-2 px-3 py-2.5 text-sm bg-red-100 hover:bg-red-200 text-red-700 hover:text-red-800 transition-all group focus:ring-2 focus:ring-red-500 focus:outline-none border-2 border-red-300 shadow-lg transform hover:scale-105"
                style={{
                  borderRadius: '15px 10px 20px 15px',
                  boxShadow: '3px 3px 0px rgba(239, 68, 68, 0.3)'
                }}
                title="Close Preview"
              >
                <XIcon size={18} />
                <span>❌ Close Preview</span>
              </button>
            </div>
          </header>


          {/* Content Area: Iframe + AI Chat */}
          <div className="flex-1 flex flex-col overflow-hidden">
            {/* Iframe Preview */}
            <div className="flex-1 relative animate-fadeIn overflow-hidden bg-gradient-to-br from-white to-amber-50/30" style={{ animationDelay: '0.3s' }}>
              {currentDesignUrl ? (

                <div className="flex-1 w-full h-full relative overflow-hidden">
                  <iframe
                    key={currentDesignUrl}
                    src={currentDesignUrl}
                    className="w-full h-full border-none bg-white border-2 border-amber-200"
                    style={{borderRadius: '15px 20px 15px 20px'}}
                    title={currentDesignName}
                    sandbox="allow-same-origin allow-scripts allow-popups allow-forms" // Recommended sandbox attributes
                  />

                  {/* Enhanced Chatbot Overlay Button/Widget */}

                </div>
              ) : (
                <div className="w-full h-full flex items-center justify-center text-slate-600 p-4 text-center bg-amber-100/50 border-2 border-amber-300" style={{borderRadius: '20px', borderStyle: 'dashed'}}>
                  <div className="text-center">
                    <div className="w-16 h-16 bg-amber-300 mx-auto mb-4" style={{borderRadius: '50%'}}></div>
                    <p className="font-medium">📭 No design to preview or URL is invalid.</p>
                  </div>
                </div>
              )}
            </div>


          </div>
        </main>
      </div>

      {/* Modals */}
      {(showConvertToWebAppModal) && (
        <div className="fixed inset-0 bg-amber-900/50 backdrop-blur-sm flex items-center justify-center z-50 p-4 animate-fadeInScaleUp">
          <div className="bg-white/95 shadow-2xl w-full max-w-sm sm:max-w-md md:max-w-lg border-3 border-amber-300 p-5 sm:p-6 md:p-8 max-h-[90vh] overflow-y-auto" style={{
            borderRadius: '30px 20px 35px 25px',
            boxShadow: '8px 8px 0px rgba(245, 158, 11, 0.3)'
          }}>
            {/* Hand-drawn decorative elements */}
            <div className="absolute top-2 right-2 w-4 h-4 bg-yellow-400 rounded-full opacity-60"></div>
            <div className="absolute top-4 left-4 w-3 h-3 border-2 border-orange-400 opacity-50 transform rotate-45"></div>
            <div className="absolute bottom-4 right-6 w-2 h-2 bg-amber-400 opacity-70 transform rotate-12" style={{borderRadius: '30% 70%'}}></div>

            {showConvertToWebAppModal && (
              <Fragment>
                <div className="flex justify-between items-center mb-4 sm:mb-6">
                  <h3 className="text-lg sm:text-xl md:text-2xl font-semibold text-transparent bg-clip-text bg-gradient-to-r from-amber-600 to-orange-600 flex items-center relative">
                    <Zap size={20} md:size={24} className="mr-2 md:mr-3 text-amber-600" /> 🚀 Convert to Web App
                    <svg className="absolute -bottom-1 left-0 w-full h-1" viewBox="0 0 200 4" fill="none">
                      <path d="M2 2 Q100 1 198 2" stroke="#f59e0b" strokeWidth="1" strokeLinecap="round" fill="none" opacity="0.6"/>
                    </svg>
                  </h3>
                  <button onClick={() => setShowConvertToWebAppModal(false)} className="text-slate-600 hover:text-red-600 p-1 hover:bg-red-100 transition-colors border-2 border-red-300 shadow-lg" style={{borderRadius: '50%', boxShadow: '2px 2px 0px rgba(239, 68, 68, 0.3)'}}>
                    <XIcon size={20} md:size={22} />
                  </button>
                </div>
                <div className="space-y-4 sm:space-y-6">
                  <div>
                    <label className="block text-slate-700 text-xs sm:text-sm font-medium mb-1 sm:mb-2">
                      📋 Step 1: Copy this tailored prompt for Bolt.new
                    </label>
                    <textarea
                      value={webAppBoltPrompt}
                      readOnly
                      rows={4}
                      className="w-full bg-amber-50 text-slate-700 px-3 py-2 sm:px-4 sm:py-2.5 border-2 border-amber-300 focus:outline-none focus:ring-2 focus:ring-amber-500 focus:border-amber-500 placeholder-slate-500 text-sm shadow-lg"
                      style={{
                        borderRadius: '15px 20px 15px 20px',
                        boxShadow: '3px 3px 0px rgba(245, 158, 11, 0.3)'
                      }}
                    />
                    <button
                      onClick={() => {
                        navigator.clipboard.writeText(webAppBoltPrompt);
                        toast.success('✅ Prompt copied to clipboard!', { icon: <Copy size={16} className="text-green-400" /> });
                      }}
                      className="mt-2 w-full bg-amber-400 hover:bg-amber-500 text-white px-3 sm:px-4 py-2 sm:py-2.5 flex items-center justify-center font-medium transition-colors shadow-lg hover:shadow-xl text-sm sm:text-base transform hover:scale-105"
                      style={{
                        borderRadius: '20px 15px 25px 10px',
                        boxShadow: '4px 4px 0px rgba(245, 158, 11, 0.4)'
                      }}
                    >
                      <Copy size={14} sm:size={16} className="mr-1 sm:mr-2" /> 📋 Copy Prompt
                    </button>
                  </div>
                  <div>
                    <label className="block text-slate-700 text-xs sm:text-sm font-medium mb-1 sm:mb-2">
                      🔗 Step 2: Paste into Bolt.new
                    </label>
                    <a
                      href="https://bolt.new"
                      target="_blank"
                      rel="noopener noreferrer"
                      className="w-full flex items-center justify-center space-x-2 px-4 py-2.5 bg-blue-400 hover:bg-blue-500 text-white font-medium transition-colors duration-200 group shadow-lg transform hover:scale-105"
                      style={{
                        borderRadius: '15px 25px 15px 25px',
                        boxShadow: '4px 4px 0px rgba(59, 130, 246, 0.4)'
                      }}
                    >
                      <span>🚀 Open Bolt.new</span>
                      <ExternalLink size={16} className="opacity-70 group-hover:opacity-100" />
                    </a>
                    <p className="text-xs text-slate-600 mt-2 text-center">✨ Bolt.new will guide you through the app creation process.</p>
                  </div>
                  <div className="pt-4 sm:pt-6 flex justify-end">
                    <button onClick={() => setShowConvertToWebAppModal(false)} className="px-4 py-2 sm:px-5 sm:py-2.5 bg-emerald-400 hover:bg-emerald-500 text-white transition-colors font-medium text-sm sm:text-base shadow-lg transform hover:scale-105" style={{
                      borderRadius: '20px 10px 25px 15px',
                      boxShadow: '3px 3px 0px rgba(16, 185, 129, 0.4)'
                    }}>
                      ✅ Done
                    </button>
                  </div>
                </div>
              </Fragment>
            )}
          </div>
        </div>
      )}
    </>
  );
}