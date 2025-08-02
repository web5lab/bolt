import React, { useState, useRef, useEffect, Suspense } from 'react';
import { X, Loader2, RefreshCw, Download, Smartphone, Monitor, Sparkles, Tablet, Expand, Shrink, Edit, Maximize, BotIcon, Redo2Icon, Undo2Icon, SaveIcon, Trash2Icon, Code2Icon, CheckCircle } from 'lucide-react';
import logo from "../assets/logo.webp"
import { useDispatch, useSelector } from 'react-redux';
import { fullScrrenPreviewSelector, UserSelector } from '../store/global.Selctor';
import toast from 'react-hot-toast';
import { AiChatHistory, DeleteAiChatHistory, updateWebsite } from '../store/global.Action';
import AiEditior from './AiEditior';
import EditorLayoutV2 from '../editior/components/EditiorLayoutV2';

const CodeEditor = React.lazy(() => import('./CodeEditior'));
import { useEditor } from '../editior/context/EditorContext';
import { setFullScrrenPreview } from '../store/global.Slice';

const DesignChat = ({ website, onClose }) => {
  const {
    html,
    setHtml,
  } = useEditor();
  const [isApplying, setIsApplying] = useState(false);
  const [messages, setMessages] = useState([
    {
      id: 1,
      role: 'model',
      content: `Hi! I'm your AI design assistant for "${website?.source || 'your website'}". I can help you with colors, layouts, content, and more. What would you like to change today?`,
      timestamp: new Date(),
    }
  ]);
  const [codeEdit, setcodeEdit] = useState(false);
  const [editMannually, seteditMannually] = useState(false)
  const [previewKey, setPreviewKey] = useState(0);
  const [previewMode, setPreviewMode] = useState('desktop');
  const [showHistory, setShowHistory] = useState(false);
  const [darkMode, setDarkMode] = useState(true);
  const [copiedMessageId, setCopiedMessageId] = useState(null);
  const [showPreview, setShowPreview] = useState(true);
  const [currentSessionId, setCurrentSessionId] = useState(null);
  const [htmlPreview, setHtmlPreview] = useState(null);
  const [fullScreenHtml, setFullScreenHtml] = useState(false);
  const user = useSelector(UserSelector);
  const fullScreenPreview = useSelector(fullScrrenPreviewSelector);
  const dispatch = useDispatch();

  const messagesEndRef = useRef(null);
  const inputRef = useRef(null);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages]);

  useEffect(() => {
    fetchChatHistory();
  }, []);

  const fetchChatHistory = async () => {
    try {
      const data = await AiChatHistory({ uuid: website.uuid })
      if (data.messages && data.messages.length > 0) {
        setMessages(data.messages);
        setCurrentSessionId(data._id);
      }
    } catch (error) {

    }
  }

  useEffect(() => {
    const handleEscape = (e) => {
      if (e.key === 'Escape') {
        if (fullScreenHtml) {
          setFullScreenHtml(false);
        } else if (fullScreenPreview) {
          dispatch(setFullScrrenPreview(false));
        }
      }
    };
    document.addEventListener('keydown', handleEscape);
    return () => document.removeEventListener('keydown', handleEscape);
  }, [fullScreenPreview, fullScreenHtml]);

  const handleRefreshPreview = () => {
    setPreviewKey(prev => prev + 1);
  };

  const handleDownload = async () => {
    try {
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
      const response = await fetch(`${import.meta.env.VITE_SERVER_URL}/download-page/${website.uuid}/zip`);
      if (!response.ok) throw new Error('Download failed');

      const blob = await response.blob();
      const url = URL.createObjectURL(blob);
      const link = document.createElement('a');
      link.href = url;
      link.download = `website.zip`;
      document.body.appendChild(link);
      link.click();
      document.body.removeChild(link);
      URL.revokeObjectURL(url);
    } catch (error) {
      console.error('Download error:', error);
    }
  };


  const handleClearChat = async () => {
    setMessages([
      {
        id: 1,
        role: 'model',
        content: `Hi! I'm your AI design assistant for "${website?.source || 'your website'}". What would you like to create today?`,
        timestamp: new Date(),
      }
    ]);
    await DeleteAiChatHistory({ uuid: website.uuid });
    setCurrentSessionId(null);
  };



  const toggleFullScreenPreview = () => {
    dispatch(setFullScrrenPreview(!fullScreenPreview));
  };


  const handleApplyChanges = async (htmlContent, manualEdit = false) => {
    try {
      setIsApplying(true);
      await updateWebsite({
        data: {
          websiteUuid: website.uuid,
          updatedHtml: htmlContent,
        }
      })
      setIsApplying(false);
      handleRefreshPreview();

      if (!manualEdit) {
        const successMessage = {
          id: Date.now(),
          role: 'model',
          content: 'HTML changes have been applied successfully! The preview has been refreshed.',
          timestamp: new Date(),
        };
        setMessages(prev => [...prev, successMessage]);
      }
      // Show success message


    } catch (error) {
      setIsApplying(false);
      console.error('Error applying HTML changes:', error);
      if (!manualEdit) {
        const errorMessage = {
          id: Date.now(),
          role: 'model',
          content: 'Sorry, there was an error applying the HTML changes. Please try again.',
          timestamp: new Date(),
          isError: true,
        };
        setMessages(prev => [...prev, errorMessage]);
      }
    }
  };


  const handleFullScreenHtml = (htmlContent) => {
    setHtmlPreview(htmlContent);
    setFullScreenHtml(true);
  };

  const handleHtmlPreview = (htmlContent) => {
    setHtmlPreview(htmlContent);
  };


  const themeClasses = darkMode ? 'bg-slate-950 text-white' : 'bg-white text-slate-900';
  const cardClasses = darkMode ? 'bg-slate-800 border-slate-700' : 'bg-white border-slate-200';
  const inputClasses = darkMode ? 'bg-slate-700/50 border-slate-600 text-white' : 'bg-slate-50 border-slate-300 text-slate-900';

  // Full Screen HTML Preview
  if (fullScreenHtml && htmlPreview) {
    return (
      <div className="fixed inset-0 z-[70] bg-black">
        <div className="absolute top-4 right-4 z-10 flex items-center gap-2">
          <div className="bg-black/50 backdrop-blur-sm rounded-lg p-2 flex items-center gap-2">
            <span className="text-white text-sm">HTML Preview</span>
            <button
              onClick={() => handleApplyChanges(htmlPreview)}
              disabled={isApplying}
              className="px-3 py-1 bg-green-500 hover:bg-green-600 rounded-md text-white text-sm transition-colors flex items-center gap-1 disabled:opacity-50 disabled:cursor-not-allowed"
              title="Apply HTML Changes"
            >
              {isApplying ? (
                <>
                  <Loader2 className="h-3 w-3 animate-spin" />
                  Applying...
                </>
              ) : (
                <>
                  <Edit className="h-3 w-3" />
                  Apply Changes
                </>
              )}
            </button>
            <div className="flex items-center gap-1">
              <button onClick={() => setPreviewMode('desktop')} className={`p-2 rounded-md transition-colors ${previewMode === 'desktop' ? 'bg-white/20' : 'hover:bg-white/10'}`} title="Desktop View">
                <Monitor className="h-4 w-4 text-white" />
              </button>
              <button onClick={() => setPreviewMode('tablet')} className={`p-2 rounded-md transition-colors ${previewMode === 'tablet' ? 'bg-white/20' : 'hover:bg-white/10'}`} title="Tablet View">
                <Tablet className="h-4 w-4 text-white" />
              </button>
              <button onClick={() => setPreviewMode('mobile')} className={`p-2 rounded-md transition-colors ${previewMode === 'mobile' ? 'bg-white/20' : 'hover:bg-white/10'}`} title="Mobile View">
                <Smartphone className="h-4 w-4 text-white" />
              </button>
            </div>
            <button onClick={() => setFullScreenHtml(false)} className="p-2 hover:bg-white/10 rounded-md transition-colors" title="Exit Full Screen">
              <Shrink className="h-4 w-4 text-white" />
            </button>
          </div>
        </div>
        <div className="w-full h-full flex items-center justify-center">
          <div className={`${previewMode === 'mobile' ? 'w-[375px] h-[667px] border-8 border-gray-800 rounded-3xl' : previewMode === 'tablet' ? 'w-[768px] h-[1024px] border-4 border-gray-800 rounded-xl' : 'w-full h-full'} overflow-hidden shadow-2xl`}>
            <iframe
              srcDoc={htmlPreview}
              className="w-full h-full border-none"
              title="HTML Preview Full Screen"
              sandbox="allow-same-origin allow-scripts allow-popups allow-forms"
            />
          </div>
        </div>
      </div>
    );
  }

  // Original Full Screen Preview
  if (fullScreenPreview) {
    return (
      <div className="fixed inset-0 z-[60] bg-black">
        <div className="absolute top-4 right-4 z-10 flex items-center gap-2">
          <div className="bg-black/50 backdrop-blur-sm rounded-lg p-2 flex items-center gap-2">
            <span className="text-white text-sm">Full Screen Preview</span>
            <div className="flex items-center gap-1">
              <button onClick={() => setPreviewMode('desktop')} className={`p-2 rounded-md transition-colors ${previewMode === 'desktop' ? 'bg-white/20' : 'hover:bg-white/10'}`} title="Desktop View">
                <Monitor className="h-4 w-4 text-white" />
              </button>
              <button onClick={() => setPreviewMode('tablet')} className={`p-2 rounded-md transition-colors ${previewMode === 'tablet' ? 'bg-white/20' : 'hover:bg-white/10'}`} title="Tablet View">
                <Tablet className="h-4 w-4 text-white" />
              </button>
              <button onClick={() => setPreviewMode('mobile')} className={`p-2 rounded-md transition-colors ${previewMode === 'mobile' ? 'bg-white/20' : 'hover:bg-white/10'}`} title="Mobile View">
                <Smartphone className="h-4 w-4 text-white" />
              </button>
            </div>
            <button onClick={handleRefreshPreview} className="p-2 hover:bg-white/10 rounded-md transition-colors" title="Refresh Preview">
              <RefreshCw className="h-4 w-4 text-white" />
            </button>
            <button onClick={toggleFullScreenPreview} className="p-2 hover:bg-white/10 rounded-md transition-colors" title="Exit Full Screen">
              <Shrink className="h-4 w-4 text-white" />
            </button>
          </div>
        </div>
        <div className="w-full h-full flex items-center justify-center">
          <div className={`${previewMode === 'mobile' ? 'w-[375px] h-[667px] border-8 border-gray-800 rounded-3xl' : previewMode === 'tablet' ? 'w-[768px] h-[1024px] border-4 border-gray-800 rounded-xl' : 'w-full h-full'} overflow-hidden shadow-2xl`}>
            <iframe
              key={`${website.uuid}-${previewKey}-fullscreen`}
              src={`${import.meta.env.VITE_FILE_SERVER_URL}/saved-pages/${website.uuid}`}
              className="w-full h-full border-none"
              title="Website Full Screen Preview"
              sandbox="allow-same-origin allow-scripts allow-popups allow-forms"
            />
          </div>
        </div>
      </div>
    );
  }

  const cn = (...classes) => classes.filter(Boolean).join(' ');
  const chatPanelClasses = darkMode ? 'bg-slate-900 border-slate-800' : 'bg-slate-50 border-slate-200';
  const buttonClasses = (active) => cn('p-2 rounded-md transition-all duration-200', active ? (darkMode ? 'bg-slate-600 text-white shadow' : 'bg-white text-indigo-600 shadow') : (darkMode ? 'text-slate-400 hover:bg-slate-700 hover:text-white' : 'text-slate-500 hover:bg-white/80'));
  const buttonGroupClasses = darkMode ? 'bg-slate-800' : 'bg-slate-200';

  return (
    <div className={`fixed inset-0 max-h-screen bg-gradient-to-br from-orange-50 via-amber-50 to-yellow-50 backdrop-blur-sm z-50 flex flex-col transition-all duration-300`}>
      <div className={`bg-white/95 border-3 border-amber-300 flex flex-col h-full overflow-hidden shadow-2xl transition-all duration-300`} style={{
        borderRadius: '30px 20px 35px 25px',
        boxShadow: '8px 8px 0px rgba(245, 158, 11, 0.3)'
      }}>
        {/* Hand-drawn decorative elements */}
        <div className="absolute top-2 right-2 w-4 h-4 bg-yellow-400 rounded-full opacity-60 pointer-events-none"></div>
        <div className="absolute top-4 left-4 w-3 h-3 border-2 border-orange-400 opacity-50 transform rotate-45 pointer-events-none"></div>
        <div className="absolute bottom-4 right-6 w-2 h-2 bg-amber-400 opacity-70 transform rotate-12 pointer-events-none" style={{borderRadius: '30% 70%'}}></div>

        {/* Header */}
        {!fullScreenPreview && <header className={`flex items-center justify-between p-2 border-b-2 border-amber-300 shrink-0 bg-gradient-to-r from-amber-50 to-orange-50`} style={{borderBottomStyle: 'dashed'}}>
          <div className="flex items-center gap-3">
            <img src={logo} className="h-9 w-9" alt="Redesignr Logo" />
            <div>
              <h1 className="font-bold text-base text-slate-800">🤖 AI Website Editor</h1>
              <p className="text-xs text-slate-600">{website?.source || 'Untitled Project'}</p>
            </div>
          </div>

          {/* Device Toggles */}
          {!codeEdit && <div className={`flex items-center gap-1 p-1 bg-amber-200/50 border-2 border-amber-300`} style={{borderRadius: '15px 10px 20px 15px'}}>
            <button onClick={() => setPreviewMode('desktop')} className={`p-2 transition-all duration-200 ${previewMode === 'desktop' ? 'bg-amber-400 text-white shadow-lg' : 'text-slate-600 hover:bg-amber-100 hover:text-amber-700'}`} style={{borderRadius: '12px 8px 15px 10px'}} title="Desktop View"><Monitor className="h-5 w-5" /></button>
            <button onClick={() => setPreviewMode('tablet')} className={`p-2 transition-all duration-200 ${previewMode === 'tablet' ? 'bg-amber-400 text-white shadow-lg' : 'text-slate-600 hover:bg-amber-100 hover:text-amber-700'}`} style={{borderRadius: '10px 15px 8px 12px'}} title="Tablet View"><Tablet className="h-5 w-5" /></button>
            <button onClick={() => setPreviewMode('mobile')} className={`p-2 transition-all duration-200 ${previewMode === 'mobile' ? 'bg-amber-400 text-white shadow-lg' : 'text-slate-600 hover:bg-amber-100 hover:text-amber-700'}`} style={{borderRadius: '8px 12px 15px 10px'}} title="Mobile View"><Smartphone className="h-5 w-5" /></button>
          </div>}


          <div className="flex items-center gap-2">
            {
              !codeEdit && !editMannually && <div className="text-xs text-center p-2 bg-amber-100 text-amber-700 font-mono border-2 border-amber-300" style={{borderRadius: '12px 8px 15px 10px'}}>
                {user?.aiToken} <span className='opacity-70'>✨ Tokens</span>
              </div>
            }

            <button
              onClick={() => {
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
                setcodeEdit(!codeEdit);
              }}
              // disabled={isDeploying}
              className={`px-4 py-2 flex items-center text-xs text-white
                      bg-gradient-to-r from-blue-400 to-indigo-500 hover:from-blue-500 hover:to-indigo-600
                      transition-all duration-150 shadow-lg transform hover:scale-105`}
              style={{
                borderRadius: '15px 10px 20px 15px',
                boxShadow: '3px 3px 0px rgba(59, 130, 246, 0.4)'
              }}
              title="Deploy to Netlify"
            >
              <Code2Icon className="w-3 h-3 mr-1.5" />
              {codeEdit ? (
                <span>❌ Close Code Editor</span>
              ) : (
                <span>💻 Open Code Editor</span>
              )}
            </button>
            {!codeEdit && <button
              onClick={() => {
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
                seteditMannually(!editMannually);
              }}
              // disabled={isDeploying}
              className={`px-4 py-2 flex items-center text-xs text-white
                      bg-gradient-to-r from-purple-400 to-pink-500 hover:from-purple-500 hover:to-pink-600
                      transition-all duration-150 shadow-lg transform hover:scale-105`}
              style={{
                borderRadius: '20px 15px 10px 25px',
                boxShadow: '3px 3px 0px rgba(147, 51, 234, 0.4)'
              }}
              title="Deploy to Netlify"
            >{
                editMannually ? (
                  <>
                    <BotIcon className="w-3 h-3 mr-1.5" />
                    <span>🤖 Edit with AI</span>
                  </>
                ) : (
                  <>
                    <Expand className="w-3 h-3 mr-1.5" />
                    <span>✏️ Edit Manually</span>
                  </>
                )
              }

            </button>}
            {
              !codeEdit && <button
                onClick={() => {
                  if (editMannually) {
                    handleApplyChanges(html, true);
                    handleRefreshPreview();
                    toast.success("HTML changes applied successfully!", {
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
                      icon: <CheckCircle className="text-yellow-300" />,
                    });
                  } else {
                    handleClearChat();
                  }
                }}
                // disabled={isDeploying}
                className={`px-4 py-2 flex items-center text-xs text-white transition-all duration-150 shadow-lg transform hover:scale-105 ${
                  editMannually 
                    ? 'bg-gradient-to-r from-emerald-400 to-green-500 hover:from-emerald-500 hover:to-green-600' 
                    : 'bg-gradient-to-r from-red-400 to-red-500 hover:from-red-500 hover:to-red-600'
                }`}
                style={{
                  borderRadius: '10px 25px 10px 25px',
                  boxShadow: editMannually ? '3px 3px 0px rgba(16, 185, 129, 0.4)' : '3px 3px 0px rgba(239, 68, 68, 0.4)'
                }}
                title="Deploy to Netlify"
              >{
                  editMannually ? (
                    <>
                      <SaveIcon className="w-3 h-3 mr-1.5" />
                      <span>💾 Save</span>
                    </>
                  ) : (
                    <>
                      <Trash2Icon className="w-3 h-3 mr-1.5" />
                      <span>🗑️ Clear Chat</span>
                    </>
                  )
                }
              </button>
            }

            {
              codeEdit && <button
                onClick={() => {
                  handleApplyChanges(html, true);
                  handleRefreshPreview();
                  toast.success("Code changes saved successfully!", {
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
                    icon: <CheckCircle className="text-yellow-300" />,
                  });
                }}
                // disabled={isDeploying}
                className={`px-4 py-2 flex items-center text-xs text-white
                    bg-gradient-to-r from-green-500 to-green-500 hover:from-green-600 hover:to-green-600
                    transition-all duration-150 shadow-lg transform hover:scale-105`}
                style={{
                  borderRadius: '25px 15px 30px 20px',
                  boxShadow: '3px 3px 0px rgba(34, 197, 94, 0.4)'
                }}
                title="Deploy to Netlify"
              >

                <Code2Icon className="w-3 h-3 mr-1.5" />
                <span>💾 Save Code</span>
              </button>
            }
            {!codeEdit && <button onClick={handleRefreshPreview} className="p-2 text-slate-600 hover:text-amber-700 hover:bg-amber-100 transition-all" style={{borderRadius: '12px 8px 15px 10px'}} title="Refresh Preview"><RefreshCw className="h-5 w-5" /></button>}
            {!codeEdit && <button onClick={handleDownload} className="p-2 text-slate-600 hover:text-amber-700 hover:bg-amber-100 transition-all" style={{borderRadius: '10px 15px 8px 12px'}} title="Download Code"><Download className="h-5 w-5" /></button>}
            {!codeEdit && <button onClick={() => dispatch(setFullScrrenPreview(true))} className="p-2 text-slate-600 hover:text-amber-700 hover:bg-amber-100 transition-all" style={{borderRadius: '8px 12px 15px 10px'}} title="Fullscreen"><Maximize className="h-5 w-5" /></button>}
            {!codeEdit && <div className={`w-px h-6 mx-1 bg-amber-300`}></div>}
            <button onClick={onClose} className="p-2 text-slate-600 hover:text-white hover:bg-red-400 transition-all shadow-lg transform hover:scale-105" style={{borderRadius: '15px 10px 20px 15px', boxShadow: '2px 2px 0px rgba(239, 68, 68, 0.3)'}} title="Close"><X className="h-5 w-5" /></button>
          </div>
        </header>}

        {editMannually && !codeEdit &&
          <div className="min-h-screen bg-gradient-to-br from-orange-50 via-amber-50 to-yellow-50">
            <EditorLayoutV2 viewport={previewMode} />
          </div>
        }
        {!editMannually && !codeEdit && <AiEditior
          fullScreenPreview={fullScreenPreview}
          showPreview={showPreview}
          showHistory={showHistory}
          currentSessionId={currentSessionId}
          messages={messages}
          setMessages={setMessages}
          setCurrentSessionId={setCurrentSessionId}
          inputClasses={inputClasses}
          darkMode={darkMode}
          setDarkMode={setDarkMode}
          copiedMessageId={copiedMessageId}
          previewMode={previewMode}
          htmlPreview={htmlPreview}
          handleHtmlPreview={handleHtmlPreview}
          website={website}
          previewKey={previewKey}
          messagesEndRef={messagesEndRef}
          inputRef={inputRef}
          fullScreenHtml={fullScreenHtml}
          handleFullScreenHtml={handleFullScreenHtml}
          isApplying={isApplying}
          handleApplyChanges={handleApplyChanges}
        />}
        {
          codeEdit &&
          <Suspense fallback={<div className="text-slate-800 p-8 text-center">🔄 Loading Editor...</div>}>
            <CodeEditor />
          </Suspense>

        }
      </div>
    </div>
  );
};
export default DesignChat;
