import React, { useRef, useState } from 'react'
import { User, Bot, Loader2, Send, Copy, Check, Code,Edit, Eye, ExternalLink } from 'lucide-react';

function AiEditior({ fullScreenPreview,handleHtmlPreview, handleFullScreenHtml,isApplying,handleApplyChanges,fullScreenHtml, showPreview,setMessages, showHistory, messages,   currentSessionId,inputClasses, darkMode,   previewMode, htmlPreview, website, previewKey, messagesEndRef, setCurrentSessionId}) {
    const [copiedMessageId, setCopiedMessageId] = useState(null);
    const [inputMessage, setInputMessage] = useState('');
    const [isLoading, setIsLoading] = useState(false);
    const [discussionMode, setDiscussionMode] = useState(false);
    const inputRef = useRef(null);
    const cn = (...classes) => classes.filter(Boolean).join(' ');
    const hasHtml = (content) => {
        return /```html\s*[\s\S]*?```/i.test(content);
    };

    const extractHtml = (content) => {
        const htmlRegex = /```html\s*([\s\S]*?)```/i;
        const match = content.match(htmlRegex);
        return match ? match[1].trim() : null;
    };

    


    const handleCopyMessage = (message) => {
        navigator.clipboard.writeText(message.content);
        setCopiedMessageId(message.id);
        setTimeout(() => setCopiedMessageId(null), 2000);
    };

    const handleCopyHtml = (htmlContent) => {
        navigator.clipboard.writeText(htmlContent);
        setCopiedMessageId('html-copied');
        setTimeout(() => setCopiedMessageId(null), 2000);
    };
    const getPreviewDimensions = () => {
        if (fullScreenPreview || fullScreenHtml) {
            return { width: '100%', height: '100%' };
        }
        switch (previewMode) {
            case 'mobile':
                return { width: '375px', height: '667px' };
            case 'tablet':
                return { width: '768px', height: '1024px' };
            default:
                return { width: '100%', height: '100%' };
        }
    };

    const formatTime = (timestamp) => {
        return new Date(timestamp).toLocaleTimeString([], {
            hour: '2-digit',
            minute: '2-digit'
        });
    };

    const renderMessageContent = (message) => {
        if (hasHtml(message.content)) {
            const htmlContent = extractHtml(message.content);
            const textContent = message.content.replace(/```html\s*[\s\S]*?```/i, '').trim();

            return (
                <div className="space-y-3">
                    {textContent && (
                        <p className="text-sm leading-relaxed">✨ {textContent}</p>
                    )}

                    <div className={`border-2 border-amber-300 overflow-hidden w-full shadow-lg`} style={{borderRadius: '15px 20px 15px 20px', boxShadow: '3px 3px 0px rgba(245, 158, 11, 0.3)'}}>
                        <div className={`flex items-center justify-between p-2 bg-amber-100 border-b-2 border-amber-300`} style={{borderBottomStyle: 'dashed'}}>
                            <div className="flex items-center gap-2">
                                <Code className="h-4 w-4 text-amber-600" />
                                <span className="text-xs font-medium text-slate-700">💻 HTML Preview</span>
                            </div>
                            <div className="flex items-center gap-1">
                                <button
                                    onClick={() => handleCopyHtml(htmlContent)}
                                    className={`p-1 hover:bg-amber-200 text-xs transition-colors`}
                                    style={{borderRadius: '8px'}}
                                    title="Copy HTML"
                                >
                                    {copiedMessageId === 'html-copied' ? <Check className="h-3 w-3" /> : <Copy className="h-3 w-3" />}
                                </button>
                                <button
                                    onClick={() => handleHtmlPreview(htmlContent)}
                                    className={`p-1 hover:bg-amber-200 text-xs transition-colors`}
                                    style={{borderRadius: '8px'}}
                                    title="Preview HTML"
                                >
                                    <Eye className="h-3 w-3" />
                                </button>
                                <button
                                    onClick={() => handleFullScreenHtml(htmlContent)}
                                    className={`p-1 hover:bg-amber-200 text-xs transition-colors`}
                                    style={{borderRadius: '8px'}}
                                    title="Full Screen Preview"
                                >
                                    <ExternalLink className="h-3 w-3" />
                                </button>
                            </div>
                        </div>

                        <div className="p-3 w-full max-h-80 overflow-y-auto">
                            <iframe
                                className="w-full h-80 block border-2 border-amber-200"
                                style={{borderRadius: '12px 8px 15px 10px'}}
                                srcDoc={htmlContent}
                                sandbox="allow-scripts allow-same-origin"
                                title="HTML Preview"
                            />
                        </div>

                    </div>
                    <button
                        onClick={() => handleApplyChanges(htmlContent)}
                        disabled={isApplying}
                        className="px-3 w-full py-2 bg-emerald-400 hover:bg-emerald-500 text-white text-sm transition-colors flex items-center gap-1 disabled:opacity-50 disabled:cursor-not-allowed shadow-lg transform hover:scale-105"
                        style={{
                            borderRadius: '15px 10px 20px 15px',
                            boxShadow: '3px 3px 0px rgba(16, 185, 129, 0.4)'
                        }}
                        title="Apply HTML Changes"
                    >
                        {isApplying ? (
                            <>
                                <Loader2 className="h-3 w-3 animate-spin" />
                                🔄 Applying...
                            </>
                        ) : (
                            <>
                                <Edit className="h-3 w-3" />
                                ✅ Apply Changes
                            </>
                        )}
                    </button>
                </div>
            );
        }

        return <p className="text-sm leading-relaxed">💬 {message.content}</p>;
    };

    const handleSendMessage = async (e) => {
        e.preventDefault();
        if (!inputMessage.trim() || isLoading) return;
    
        const userMessageContent = inputMessage.trim();
        const userMessage = {
          id: Date.now(),
          role: 'user',
          content: userMessageContent,
          timestamp: new Date(),
        };
    
        const botMessageId = Date.now() + 1;
        const botMessagePlaceholder = {
          id: botMessageId,
          role: 'model',
          content: '',
          timestamp: new Date(),
        };
    
        setMessages(prev => [...prev, userMessage, botMessagePlaceholder]);
        setInputMessage('');
        setIsLoading(true);
    
        try {
          const token = localStorage.getItem('authToken');
          const response = await fetch(`${import.meta.env.VITE_SERVER_URL}/ai/chat`, {
            method: 'POST',
            headers: {
              'Content-Type': 'application/json',
              Authorization: `Bearer ${token}`
            },
            body: JSON.stringify({
              userMessage: userMessageContent,
              sessionId: currentSessionId,
              websiteUuid: website.uuid,
              discussionMode,
            }),
          });
    
          if (!response.ok || !response.body) {
            console.log('API response error:', response.status);
            const currentPlan = user?.currentPlan || 'Free';
            if (response.status === 403) {
              if (currentPlan === 'Free' || currentPlan === 'free') {
                setMessages(prev => prev.map(msg =>
                  msg.id === botMessageId
                    ? { ...msg, content: "You are on the Free plan, which doesn't include AI Edit Feature. Upgrade your plan to start using them.", isError: true }
                    : msg
                ));
                setIsLoading(false);
                return;
              } else {
                setMessages(prev => prev.map(msg =>
                  msg.id === botMessageId
                    ? { ...msg, content: "You have reached the limit of AI messages for this month. Please upgrade your plan to continue using AI Edit features.", isError: true } : msg
                ));
                setIsLoading(false);
                return;
              }
            } else {
              throw new Error(`API error: ${response.body.message}`);
            }
    
          }
    
          const reader = response.body.getReader();
          const decoder = new TextDecoder('utf-8');
          let botReply = '';
          let buffer = '';
    
          while (true) {
            const { value, done } = await reader.read();
            if (done) break;
    
            buffer += decoder.decode(value, { stream: true });
    
            // Split into SSE events
            const events = buffer.split('\n\n');
            buffer = events.pop(); // incomplete buffer
    
            for (const event of events) {
              const lines = event.split('\n');
              let eventType = 'message';
              let data = '';
    
              for (const line of lines) {
                if (line.startsWith('event:')) {
                  eventType = line.slice(6).trim();
                } else if (line.startsWith('data:')) {
                  data += line.slice(5).trim();
                }
              }
    
              if (eventType === 'session') {
                setCurrentSessionId(data);
              } else if (eventType === 'error') {
                throw new Error(data);
              } else if (eventType === 'data' || eventType === 'message') {
                if (data.trim()) {
                  botReply += data;
                  setMessages(prev =>
                    prev.map(msg =>
                      msg.id === botMessageId ? { ...msg, content: botReply } : msg
                    )
                  );
                }
              } else if (eventType === 'final') {
                // Final message – replace placeholder with clean message
                const finalReply = JSON.parse(data);
                setMessages(prev =>
                  prev.map(msg =>
                    msg.id === botMessageId
                      ? { ...msg, content: finalReply }
                      : msg
                  )
                );
              }
            }
          }
    
        } catch (error) {
          console.error('Error during chat stream:', error);
          setMessages(prev => prev.map(msg =>
            msg.id === botMessageId
              ? {
                ...msg,
                content: error.message || 'An error occurred while processing your request.',
                isError: true,
              }
              : msg
          ));
        } finally {
          setIsLoading(false);
          inputRef.current?.focus();
        }
      };
    return (
        <div className={cn("flex flex-1 overflow-hidden bg-gradient-to-br from-orange-50 via-amber-50 to-yellow-50", fullScreenPreview && "p-8")}>
            {/* Chat Panel */}
            <div className={`min-w-96 ${showPreview ? "w-96" : (showHistory ? 'flex-1' : 'w-96')} flex flex-col ${showPreview ? 'border-r-2 border-amber-300' : ''}`} style={{borderRightStyle: 'dashed'}}>
                <div className="flex-1 overflow-y-auto p-4 space-y-4 custom-scrollbar bg-white/50">
                    {messages?.map((message) => (
                        <div key={message.id} className={`flex ${message.role === 'user' ? 'justify-end' : 'justify-start'} max-w-80`}>
                            <div className={`flex items-start gap-3  ${message.role === 'user' ? 'flex-row-reverse' : ''}`}>
                                <div className={`p-2 ${message.role === 'user'
                                    ? 'bg-gradient-to-r from-blue-400 to-indigo-500'
                                    : message.isError
                                        ? 'bg-red-400'
                                        : 'bg-gradient-to-r from-emerald-400 to-teal-500'
                                    } shadow-lg border-2 ${message.role === 'user' ? 'border-blue-500' : message.isError ? 'border-red-500' : 'border-emerald-500'}`} style={{borderRadius: '50%', boxShadow: '2px 2px 0px rgba(0,0,0,0.1)'}}>
                                    {message.role === 'user' ? <User className="h-4 w-4 text-white" /> : <Bot className="h-4 w-4 text-white" />}
                                </div>
                                <div className={`p-4 relative group border-2 shadow-lg ${message.role === 'user'
                                    ? 'bg-gradient-to-r from-blue-400 to-indigo-500 text-white border-blue-500'
                                    : message.isError
                                        ? 'bg-red-100 text-red-700 border-red-300'
                                        : 'bg-white text-slate-700 border-amber-300'
                                    }`} style={{
                                        borderRadius: message.role === 'user' ? '20px 15px 5px 20px' : '15px 20px 20px 5px',
                                        boxShadow: '3px 3px 0px rgba(0,0,0,0.1)'
                                    }}>
                                    {message.role === 'model' && !message.content && isLoading ? (
                                        <div className="flex items-center gap-1 mt-1">
                                            <div className="w-2 h-2 bg-amber-400 rounded-full animate-bounce" style={{ animationDelay: '0ms' }}></div>
                                            <div className="w-2 h-2 bg-amber-400 rounded-full animate-bounce" style={{ animationDelay: '150ms' }}></div>
                                            <div className="w-2 h-2 bg-amber-400 rounded-full animate-bounce" style={{ animationDelay: '300ms' }}></div>
                                        </div>
                                    ) : (
                                        renderMessageContent(message)
                                    )}
                                    <div className="flex items-center justify-between mt-2">
                                        <p className="text-xs opacity-70">🕐 {formatTime(message.timestamp)}</p>
                                        <div className="flex items-center gap-1 opacity-0 group-hover:opacity-100 transition-opacity">
                                            <button
                                                onClick={() => handleCopyMessage(message)}
                                                className="p-1 hover:bg-white/20 transition-colors" style={{borderRadius: '8px'}}
                                            >
                                                {copiedMessageId === message.id ? <Check className="h-3 w-3" /> : <Copy className="h-3 w-3" />}
                                            </button>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    ))}
                    <div ref={messagesEndRef} />
                </div>

                {/* Input */}
                <div className={`p-4 border-t-2 border-amber-300 bg-white/80`} style={{borderTopStyle: 'dashed'}}>
                    {/* 🟢 Toggle: Discussion Mode */}
                    <div className="flex items-center justify-between mb-3">
                        <label className="flex items-center gap-2 text-sm font-medium text-slate-700">
                            <span>💬 Discussion Mode</span>
                            <button
                                onClick={() => setDiscussionMode(!discussionMode)}
                                className={`w-11 h-6 flex items-center p-1 transition-colors duration-300 border-2 ${discussionMode ? 'bg-amber-400 border-amber-500' : 'bg-slate-300 border-slate-400'
                                    }`}
                                style={{borderRadius: '15px'}}
                            >
                                <div
                                    className={`w-4 h-4 bg-white shadow-md transform transition-transform duration-300 ${discussionMode ? 'translate-x-5' : 'translate-x-0'
                                        }`}
                                    style={{borderRadius: '50%'}}
                                />
                            </button>
                        </label>
                    </div>

                    {/* 💬 Message Input Form */}
                    <form onSubmit={handleSendMessage} className="flex gap-2">
                        <input
                            ref={inputRef}
                            type="text"
                            value={inputMessage}
                            onChange={(e) => setInputMessage(e.target.value)}
                            placeholder="✨ Describe your vision... (e.g., 'Make the hero section more vibrant')"
                            disabled={isLoading}
                            className={`flex-1 bg-white border-2 border-amber-300 text-slate-800 px-4 py-3 placeholder-slate-500 focus:outline-none focus:ring-2 focus:ring-amber-500 focus:border-amber-500 disabled:opacity-50 transition-all duration-200 shadow-lg`}
                            style={{
                                borderRadius: '20px 15px 25px 10px',
                                boxShadow: '2px 2px 0px rgba(245, 158, 11, 0.3)'
                            }}
                        />
                        <button
                            type="submit"
                            disabled={!inputMessage?.trim() || isLoading}
                            className={`px-4 py-3 text-white hover:scale-105 active:scale-95 transition-all duration-200 disabled:opacity-50 disabled:cursor-not-allowed bg-gradient-to-r from-amber-400 to-orange-500 hover:from-amber-500 hover:to-orange-600 shadow-lg`}
                            style={{
                                borderRadius: '15px 20px 10px 25px',
                                boxShadow: '3px 3px 0px rgba(245, 158, 11, 0.4)'
                            }}
                        >
                            {isLoading ? <Loader2 className="h-5 w-5 animate-spin" /> : <Send className="h-5 w-5" />}
                        </button>
                    </form>
                </div>
            </div>

            {/* Preview Panel */}
            {showPreview && (
                <div className={`w-full flex flex-col bg-gradient-to-br from-white to-amber-50/30`}>

                    <div className="flex-1 relative flex items-center justify-center p-4">
                        <div className={`relative overflow-hidden shadow-2xl transition-all duration-300 border-3 border-amber-300 ${previewMode === 'mobile' ? 'border-8 border-amber-400' : ''}`} style={{
                            ...getPreviewDimensions(),
                            borderRadius: '20px 15px 25px 10px',
                            boxShadow: '6px 6px 0px rgba(245, 158, 11, 0.3)'
                        }}>
                            {htmlPreview ? (
                                <iframe
                                    srcDoc={htmlPreview}
                                    className="w-full h-full border-none"
                                    style={{borderRadius: '17px 12px 22px 7px'}}
                                    title="HTML Preview"
                                    sandbox="allow-same-origin allow-scripts allow-popups allow-forms"
                                />
                            ) : (
                                <iframe
                                    key={`${website.uuid}-${previewKey}`}
                                    src={`${import.meta.env.VITE_FILE_SERVER_URL}/saved-pages/${website.uuid}`}
                                    className="w-full h-full border-none"
                                    style={{borderRadius: '17px 12px 22px 7px'}}
                                    title="Website Preview"
                                    sandbox="allow-same-origin allow-scripts allow-popups allow-forms"
                                />
                            )}
                        </div>
                    </div>
                </div>
            )}
        </div>
    )
}

export default AiEditior