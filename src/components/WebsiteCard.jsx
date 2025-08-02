import { Code2Icon, Edit3, Eye, LayoutGrid, Sparkles, Wand2, X, Plus, FileEdit, Share2Icon, CodeIcon, LayoutDashboard, Globe, MessageSquare, ChevronDown, ChevronUp, Clock, AlertTriangle } from 'lucide-react';
import React, { useEffect, useState } from 'react';
import toast from 'react-hot-toast';
import { useDispatch, useSelector } from 'react-redux';
import { UserSelector } from '../store/global.Selctor';
import ShareSingleDesign from './dashboard/community/ShareSingleDesign';
import { setEditiorPage } from '../store/global.Slice';

function WebsiteCard({ website, setShowBilling, handleFormatSelect, index, handlePreview, handleOpenEditDesignPopup, handleOpenConvertToWebAppModal, setSharePopup, openNewWebsiteModal, onOpenDesignChat }) {
    const [timeLeft, setTimeLeft] = useState('');
    const [deletionTimeLeft, setDeletionTimeLeft] = useState('');
    const [isDeleted, setIsDeleted] = useState(false);
    const [isHovered, setIsHovered] = useState(false);
    const [imageLoaded, setImageLoaded] = useState(false);
    const [imageError, setImageError] = useState(false);
    const [showShareDesign, setShowShareDesign] = useState(false);
    const mainContentAnimation = "opacity-0 animate-fadeInUp";
    const cn = (...classes) => classes.filter(Boolean).join(' ');
    const user = useSelector(UserSelector);

    // Check deletion status for free users
    useEffect(() => {
        if (user?.currentPlan?.toLowerCase() !== 'free') return;

        const checkDeletionStatus = () => {
            const created = new Date(website.createdAt);
            const now = new Date();
            const sixHoursInMs = 2 * 60 * 60 * 1000; // 2 hours in milliseconds
            const deletionTime = new Date(created.getTime() + sixHoursInMs);
            const timeDiff = deletionTime - now;

            if (timeDiff <= 0) {
                // Website should be deleted
                setIsDeleted(true);
                setDeletionTimeLeft('');
            } else {
                // Website will be deleted in the future
                setIsDeleted(false);
                const hours = Math.floor(timeDiff / (1000 * 60 * 60));
                const minutes = Math.floor((timeDiff % (1000 * 60 * 60)) / (1000 * 60));
                const seconds = Math.floor((timeDiff % (1000 * 60)) / 1000);

                if (hours > 0) {
                    setDeletionTimeLeft(`${hours}h ${minutes}m`);
                } else if (minutes > 0) {
                    setDeletionTimeLeft(`${minutes}m ${seconds}s`);
                } else {
                    setDeletionTimeLeft(`${seconds}s`);
                }
            }
        };

        checkDeletionStatus();
        const interval = setInterval(checkDeletionStatus, 1000);

        return () => clearInterval(interval);
    }, [user?.currentPlan, website.createdAt]);

    useEffect(() => {
        if (website.status !== 'pending') return;

        const interval = setInterval(() => {
            const created = new Date(website.createdAt);
            const now = new Date();
            const end = new Date(created.getTime() + 4 * 60 * 1000); // 4 mins from createdAt
            const diff = end - now;

            if (diff <= 0) {
                setTimeLeft('Less than a minute');
                clearInterval(interval);
                return;
            }

            const minutes = Math.floor(diff / 60000);
            const seconds = Math.floor((diff % 60000) / 1000);
            setTimeLeft(`${minutes}m ${seconds < 10 ? '0' : ''}${seconds}s`);
        }, 1000);

        return () => clearInterval(interval);
    }, [website.status, website.createdAt]);

    const getStatusConfig = (status) => {
        switch (status) {
            case 'completed':
                return {
                    badgeClass: 'bg-emerald-400 text-white border-2 border-emerald-500 shadow-lg',
                    icon: <Sparkles className="w-3 h-3" />,
                    text: '✨ Ready',
                    description: 'Website is ready to use'
                };
            case 'pending':
                return {
                    badgeClass: 'bg-amber-400 text-white border-2 border-amber-500 animate-pulse shadow-lg',
                    icon: <div className="w-2 h-2 bg-white rounded-full animate-ping scale-75"></div>,
                    text: '🔨 Building',
                    description: 'Creating your website'
                };
            case 'editing':
                return {
                    badgeClass: 'bg-blue-400 text-white border-2 border-blue-500 shadow-lg',
                    icon: <FileEdit className="w-3 h-3" />,
                    text: '✏️ Editing',
                    description: 'Making changes to your website'
                };
            case 'addingPage':
                return {
                    badgeClass: 'bg-purple-400 text-white border-2 border-purple-500 shadow-lg',
                    icon: <Plus className="w-3 h-3" />,
                    text: '➕ Adding Page',
                    description: 'Adding a new page to your website'
                };
            case 'error':
            default:
                return {
                    badgeClass: 'bg-red-400 text-white border-2 border-red-500 shadow-lg',
                    icon: <X className="w-3 h-3" />,
                    text: '❌ Error',
                    description: 'Something went wrong'
                };
        }
    };

    const handleCardClick = () => {
        // If website is deleted for free users, show upgrade message
        if (isDeleted && user?.currentPlan?.toLowerCase() === 'free') {
            setShowBilling(true);
            return;
        }

        if (website.status === 'completed') {
            handlePreview(website);
        } else if (website.status === 'pending') {
            toast.custom((t) => (
                <div className={`${t.visible ? 'animate-enter' : 'animate-leave'} max-w-md w-full bg-white/95 backdrop-blur-sm shadow-xl pointer-events-auto flex ring-1 ring-amber-200 border-2 border-amber-300`} style={{borderRadius: '20px 15px 25px 10px', boxShadow: '4px 4px 0px rgba(245, 158, 11, 0.3)'}}>
                    <div className="flex-1 w-0 p-4">
                        <div className="flex items-start">
                            <div className="flex-shrink-0 pt-0.5">
                                <div className="w-10 h-10 border-2 border-t-amber-400 border-amber-400/30 animate-spin" style={{borderRadius: '50%'}}></div>
                            </div>
                            <div className="ml-3 flex-1">
                                <p className="text-sm font-medium text-amber-700">🔨 Still Building...</p>
                                <p className="mt-1 text-sm text-slate-600">Your website is being created. Estimated time: {timeLeft}</p>
                            </div>
                        </div>
                    </div>
                    <div className="flex border-l-2 border-amber-300" style={{borderStyle: 'dashed'}}>
                        <button onClick={() => toast.dismiss(t.id)} className="w-full border border-transparent p-4 flex items-center justify-center text-sm font-medium text-slate-600 hover:text-amber-700 focus:outline-none focus:ring-2 focus:ring-amber-500 transition-colors" style={{borderRadius: '0 22px 7px 0'}}>
                            Close
                        </button>
                    </div>
                </div>
            ), { duration: 5000 });
        } else if (website.status === 'editing') {
            toast.custom((t) => (
                <div className={`${t.visible ? 'animate-enter' : 'animate-leave'} max-w-md w-full bg-white/95 backdrop-blur-sm shadow-xl pointer-events-auto flex ring-1 ring-blue-200 border-2 border-blue-300`} style={{borderRadius: '20px 15px 25px 10px', boxShadow: '4px 4px 0px rgba(59, 130, 246, 0.3)'}}>
                    <div className="flex-1 w-0 p-4">
                        <div className="flex items-start">
                            <div className="flex-shrink-0 pt-0.5">
                                <FileEdit className="w-10 h-10 text-blue-500" />
                            </div>
                            <div className="ml-3 flex-1">
                                <p className="text-sm font-medium text-blue-700">✏️ Currently Editing</p>
                                <p className="mt-1 text-sm text-slate-600">Changes are being applied to your website.</p>
                            </div>
                        </div>
                    </div>
                    <div className="flex border-l-2 border-blue-300" style={{borderStyle: 'dashed'}}>
                        <button onClick={() => toast.dismiss(t.id)} className="w-full border border-transparent p-4 flex items-center justify-center text-sm font-medium text-slate-600 hover:text-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500 transition-colors" style={{borderRadius: '0 22px 7px 0'}}>
                            Close
                        </button>
                    </div>
                </div>
            ), { duration: 5000 });
        } else if (website.status === 'addingPage') {
            toast.custom((t) => (
                <div className={`${t.visible ? 'animate-enter' : 'animate-leave'} max-w-md w-full bg-white/95 backdrop-blur-sm shadow-xl pointer-events-auto flex ring-1 ring-purple-200 border-2 border-purple-300`} style={{borderRadius: '20px 15px 25px 10px', boxShadow: '4px 4px 0px rgba(147, 51, 234, 0.3)'}}>
                    <div className="flex-1 w-0 p-4">
                        <div className="flex items-start">
                            <div className="flex-shrink-0 pt-0.5">
                                <Plus className="w-10 h-10 text-purple-500" />
                            </div>
                            <div className="ml-3 flex-1">
                                <p className="text-sm font-medium text-purple-700">➕ Adding New Page</p>
                                <p className="mt-1 text-sm text-slate-600">A new page is being added to your website.</p>
                            </div>
                        </div>
                    </div>
                    <div className="flex border-l-2 border-purple-300" style={{borderStyle: 'dashed'}}>
                        <button onClick={() => toast.dismiss(t.id)} className="w-full border border-transparent p-4 flex items-center justify-center text-sm font-medium text-slate-600 hover:text-purple-700 focus:outline-none focus:ring-2 focus:ring-purple-500 transition-colors" style={{borderRadius: '0 22px 7px 0'}}>
                            Close
                        </button>
                    </div>
                </div>
            ), { duration: 5000 });
        }
    };

    const handleUpgradeClick = () => {
        toast.custom((t) => (
            <div className={`${t.visible ? 'animate-enter' : 'animate-leave'} max-w-md w-full bg-gradient-to-r from-amber-400 to-orange-500 backdrop-blur-sm shadow-xl pointer-events-auto flex ring-1 ring-amber-300 border-2 border-amber-400`} style={{borderRadius: '25px 15px 30px 20px', boxShadow: '4px 4px 0px rgba(245, 158, 11, 0.4)'}}>
                <div className="flex-1 w-0 p-4">
                    <div className="flex items-start">
                        <div className="flex-shrink-0 pt-0.5">
                            <Sparkles className="w-10 h-10 text-yellow-200" />
                        </div>
                        <div className="ml-3 flex-1">
                            <p className="text-sm font-medium text-white">✨ Upgrade to Paid Plans</p>
                            <p className="mt-1 text-sm text-indigo-100">
                                Upgrade your plan to remove deletion limits and recover previously deleted websites anytime.
                            </p>
                        </div>
                    </div>
                </div>
                <div className="flex border-l-2 border-orange-400" style={{borderStyle: 'dashed'}}>
                    <button onClick={() => toast.dismiss(t.id)} className="w-full border border-transparent p-4 flex items-center justify-center text-sm font-medium text-orange-100 hover:text-white focus:outline-none focus:ring-2 focus:ring-orange-300 transition-colors" style={{borderRadius: '0 27px 17px 0'}}>
                        Close
                    </button>
                </div>
            </div>
        ), { duration: 6000 });
        setShowBilling(true);
    };

    const statusConfig = getStatusConfig(website.status);
    const isCompleted = website.status === 'completed';
    const isProcessing = ['pending', 'editing', 'addingPage'].includes(website.status);
    const isFreeUser = user?.currentPlan?.toLowerCase() === 'free';

    return (
        <>
            <ShareSingleDesign website={website} onClose={() => {
                setShowShareDesign(false);
            }} isOpen={showShareDesign} />
            <div
                key={website._id || website.uuid}
                className={`group relative border-3 border-amber-300 bg-white/90 backdrop-blur-sm overflow-hidden shadow-lg hover:shadow-xl hover:shadow-amber-500/20 transition-all duration-500 hover:border-orange-400 hover:bg-white/95 ${mainContentAnimation} ${isDeleted && isFreeUser ? 'opacity-60' : ''}`}
                style={{ 
                    borderRadius: index % 2 === 0 ? '25px 15px 30px 20px' : '20px 30px 15px 25px',
                    boxShadow: '4px 4px 0px rgba(245, 158, 11, 0.3)',
                    animationDelay: `${0.4 + index * 0.1}s`
                }}
                onMouseEnter={() => setIsHovered(true)}
                onMouseLeave={() => setIsHovered(false)}
            >
                {/* Hand-drawn decorative elements */}
                <div className="absolute top-2 left-2 w-3 h-3 bg-amber-400 opacity-40 rounded-full"></div>
                <div className="absolute top-2 right-2 w-2 h-2 bg-orange-400 opacity-50 transform rotate-45"></div>
                <div className="absolute bottom-2 right-2 w-4 h-4 border-2 border-yellow-400 opacity-30 transform rotate-12" style={{borderRadius: '40% 60%'}}></div>

                {/* Deletion Warning Banner for Free Users */}
                {isFreeUser && !isDeleted && deletionTimeLeft && (
                    <div className="absolute top-0 left-0 right-0 z-30 bg-gradient-to-r from-orange-400 to-red-400 text-white text-xs font-medium px-3 py-2 flex items-center justify-between border-b-2 border-orange-500" style={{borderRadius: '22px 17px 0 0', borderBottomStyle: 'dashed'}}>
                        <div className="flex items-center gap-2">
                            <Clock className="w-3 h-3" />
                            <span>⏰ Deletes in {deletionTimeLeft}</span>
                        </div>
                        <button
                            onClick={handleUpgradeClick}
                            className="text-white/90 hover:text-white underline text-xs font-medium px-2 py-1 bg-white/20 hover:bg-white/30 transition-colors" style={{borderRadius: '8px 12px 8px 12px'}}
                        >
                            ✨ Upgrade
                        </button>
                    </div>
                )}

                {/* Deleted State Banner for Free Users */}
                {isFreeUser && isDeleted && (
                    <div className="absolute top-0 left-0 right-0 z-30 bg-gradient-to-r from-red-500 to-red-600 text-white text-xs font-medium px-3 py-2 flex items-center justify-between border-b-2 border-red-600" style={{borderRadius: '22px 17px 0 0', borderBottomStyle: 'dashed'}}>
                        <div className="flex items-center gap-2">
                            <AlertTriangle className="w-3 h-3" />
                            <span>❌ Website Deleted</span>
                        </div>
                        <button
                            onClick={handleUpgradeClick}
                            className="text-white/90 hover:text-white underline text-xs font-medium px-2 py-1 bg-white/20 hover:bg-white/30 transition-colors" style={{borderRadius: '8px 12px 8px 12px'}}
                        >
                            🔄 Recover
                        </button>
                    </div>
                )}

                {/* Status Badge */}
                <div className={`absolute ${(isFreeUser && (deletionTimeLeft || isDeleted)) ? 'top-10' : 'top-3'} right-3 sm:right-4 z-20`}>
                    <div className={cn("px-3 py-1.5 text-xs font-medium shadow-lg flex items-center gap-2 transition-all duration-300", statusConfig.badgeClass)} style={{borderRadius: '15px 10px 20px 15px', boxShadow: '2px 2px 0px rgba(0,0,0,0.1)'}}>
                        {statusConfig.icon}
                        <span className="hidden sm:inline">{statusConfig.text}</span>
                    </div>
                </div>

                {/* Type Badge */}
                {website.type && (
                    <div className={`absolute ${(isFreeUser && (deletionTimeLeft || isDeleted)) ? 'top-10' : 'top-3'} left-3 sm:left-4 z-20 bg-blue-400 text-white text-xs font-medium px-3 py-1.5 shadow-lg border-2 border-blue-500 flex items-center gap-1.5 transition-all duration-300`} style={{borderRadius: '20px 10px 25px 15px', boxShadow: '2px 2px 0px rgba(59, 130, 246, 0.3)'}}>
                        <LayoutGrid className="w-3 h-3" />
                        <span className="hidden sm:inline">🎨 {website.type}</span>
                    </div>
                )}

                {/* Preview Section */}
                <div className={`aspect-[16/10] relative cursor-pointer overflow-hidden bg-gradient-to-br from-amber-50 to-orange-50 group ${(isFreeUser && (deletionTimeLeft || isDeleted)) ? 'mt-8' : ''}`} onClick={handleCardClick} style={{borderRadius: index % 2 === 0 ? '22px 12px 27px 17px 0 0 0 0' : '17px 27px 12px 22px 0 0 0 0'}}>
                    {/* Deleted State Overlay */}
                    {isDeleted && isFreeUser && (
                        <div className="absolute inset-0 bg-red-100/90 backdrop-blur-sm z-10 flex flex-col items-center justify-center p-4 border-2 border-red-300" style={{borderRadius: 'inherit', borderStyle: 'dashed'}}>
                            <AlertTriangle className="w-12 h-12 text-red-500 mb-3" />
                            <p className="text-sm font-medium text-red-700 text-center mb-2">❌ Website Deleted</p>
                            <p className="text-xs text-red-600 text-center mb-4">Upgrade your plan to recover this website</p>
                            <button
                                onClick={(e) => {
                                    e.stopPropagation();
                                    handleUpgradeClick();
                                }}
                                className="px-4 py-2 bg-red-400 hover:bg-red-500 text-white text-xs font-medium transition-colors shadow-lg" style={{borderRadius: '15px 10px 20px 15px', boxShadow: '2px 2px 0px rgba(239, 68, 68, 0.3)'}}
                            >
                                ✨ Upgrade Now
                            </button>
                        </div>
                    )}

                    {/* Completed State */}
                    {isCompleted && !isDeleted && (
                        <div className="absolute inset-0 bg-white/20">
                            <img
                                src={`${import.meta.env.VITE_FILE_SERVER_URL}/saved-pages/${website?.uuid}/screenshot-cropped.png`}
                                alt="Website preview"
                                className={`w-full h-full object-cover transition-all duration-500 ${imageLoaded ? 'opacity-100 scale-100' : 'opacity-0 scale-105'} ${isHovered ? 'scale-105' : 'scale-100'}`}
                                onLoad={() => setImageLoaded(true)}
                                onError={() => setImageError(true)}
                            />
                            {!imageLoaded && !imageError && (
                                <div className="absolute inset-0 flex items-center justify-center bg-amber-100/80 backdrop-blur-sm">
                                    <div className="animate-pulse flex flex-col items-center">
                                        <div className="w-12 h-12 bg-amber-300 mb-2" style={{borderRadius: '12px 8px 15px 10px'}}></div>
                                        <div className="w-24 h-2 bg-amber-300" style={{borderRadius: '10px 15px 10px 15px'}}></div>
                                    </div>
                                </div>
                            )}
                            {imageError && (
                                <div className="absolute inset-0 flex items-center justify-center bg-amber-100/80">
                                    <div className="text-center">
                                        <Wand2 className="w-12 h-12 text-amber-600 mx-auto mb-2" />
                                        <p className="text-sm text-amber-700">✨ Preview Available</p>
                                    </div>
                                </div>
                            )}
                            <div className="absolute inset-0 bg-amber-400/20 opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-center justify-center">
                                <div className="bg-white/80 backdrop-blur-sm p-3 border-2 border-amber-400 shadow-lg" style={{borderRadius: '50%', boxShadow: '2px 2px 0px rgba(245, 158, 11, 0.3)'}}>
                                    <Eye className="w-6 h-6 text-white" />
                                </div>
                            </div>
                        </div>
                    )}

                    {/* Pending State */}
                    {website.status === 'pending' && !isDeleted && (
                        <div className="absolute inset-0 flex flex-col items-center justify-center bg-gradient-to-br from-amber-100/80 to-orange-100/80 backdrop-blur-sm p-4 border-2 border-amber-300" style={{borderRadius: 'inherit', borderStyle: 'dashed'}}>
                            <div className="relative mb-4">
                                <div className="w-12 h-12 border-4 border-amber-400/30 border-t-amber-400 animate-spin" style={{borderRadius: '50%'}}></div>
                                <div className="absolute inset-0 w-12 h-12 border-4 border-transparent border-t-amber-500/50 animate-spin" style={{ animationDuration: '3s', borderRadius: '50%' }}></div>
                            </div>
                            <p className="text-sm font-medium text-amber-700 mb-1">🔨 Creating Your Website</p>
                            <p className="text-xs text-slate-600 text-center">Time remaining: {timeLeft}</p>
                            <div className="mt-3 w-24 h-1 bg-amber-400/20 overflow-hidden" style={{borderRadius: '10px'}}>
                                <div className="h-full bg-gradient-to-r from-amber-400 to-orange-400 animate-pulse" style={{borderRadius: '10px'}}></div>
                            </div>
                        </div>
                    )}

                    {/* Editing State */}
                    {website.status === 'editing' && !isDeleted && (
                        <div className="absolute inset-0 flex flex-col items-center justify-center bg-gradient-to-br from-blue-100/80 to-indigo-100/80 backdrop-blur-sm p-4 border-2 border-blue-300" style={{borderRadius: 'inherit', borderStyle: 'dashed'}}>
                            <div className="bg-blue-200/50 p-4 mb-3 border-2 border-blue-400" style={{borderRadius: '50%', boxShadow: '2px 2px 0px rgba(59, 130, 246, 0.3)'}}>
                                <FileEdit className="w-8 h-8 text-blue-600 animate-pulse" />
                            </div>
                            <p className="text-sm font-medium text-blue-700 text-center mb-1">✏️ Editing in Progress</p>
                            <p className="text-xs text-slate-600 text-center">Applying your changes...</p>
                        </div>
                    )}

                    {/* Adding Page State */}
                    {website.status === 'addingPage' && !isDeleted && (
                        <div className="absolute inset-0 flex flex-col items-center justify-center bg-gradient-to-br from-purple-100/80 to-pink-100/80 backdrop-blur-sm p-4 border-2 border-purple-300" style={{borderRadius: 'inherit', borderStyle: 'dashed'}}>
                            <div className="bg-purple-200/50 p-4 mb-3 border-2 border-purple-400" style={{borderRadius: '50%', boxShadow: '2px 2px 0px rgba(147, 51, 234, 0.3)'}}>
                                <Plus className="w-8 h-8 text-purple-600 animate-bounce" />
                            </div>
                            <p className="text-sm font-medium text-purple-700 text-center mb-1">➕ Adding New Page</p>
                            <p className="text-xs text-slate-600 text-center">Expanding your website...</p>
                        </div>
                    )}

                    {/* Error State */}
                    {website.status === 'error' && !isDeleted && (
                        <div className="absolute inset-0 flex flex-col items-center justify-center bg-gradient-to-br from-red-100/80 to-red-100/80 backdrop-blur-sm p-4 border-2 border-red-300" style={{borderRadius: 'inherit', borderStyle: 'dashed'}}>
                            <div className="bg-red-200/50 p-4 mb-3 border-2 border-red-400" style={{borderRadius: '50%', boxShadow: '2px 2px 0px rgba(239, 68, 68, 0.3)'}}>
                                <X className="w-8 h-8 text-red-600" />
                            </div>
                            <p className="text-sm font-medium text-red-700 text-center mb-1">❌ Generation Failed</p>
                            <p className="text-xs text-slate-600 text-center">Please try again</p>
                        </div>
                    )}
                </div>

                {/* Content Section */}
                <div className="p-4 sm:p-5 bg-gradient-to-br from-white to-amber-50/30">
                    <div className="flex items-start justify-between mb-2">
                        <div className="flex-1 min-w-0">
                            <h3 className="text-slate-800 font-semibold text-base sm:text-lg leading-tight mb-1 truncate group-hover:text-amber-700 transition-colors relative" title={website.source || website?.instruction || 'Untitled Website'}>
                                {website.source || website?.instruction || 'Untitled Website'}
                                <svg className="absolute -bottom-1 left-0 w-0 group-hover:w-full h-1 transition-all duration-300" viewBox="0 0 100 4" fill="none">
                                    <path d="M2 2 Q50 1 98 2" stroke="#f59e0b" strokeWidth="1" strokeLinecap="round" fill="none" opacity="0.6"/>
                                </svg>
                            </h3>
                            <div className="flex items-center gap-2 text-xs text-slate-600">
                                <span>📅 Updated: {new Date(website.updatedAt).toLocaleDateString()}</span>
                                {isProcessing && (
                                    <>
                                        <span>•</span>
                                        <span className="text-amber-600">{statusConfig.description}</span>
                                    </>
                                )}
                            </div>
                        </div>
                    </div>

                    {/* Deleted State Actions for Free Users */}
                    {isDeleted && isFreeUser && (
                        <div className="space-y-2">
                            <div className="flex items-center justify-center py-6 text-sm text-red-600 bg-red-100/50 border-2 border-red-300" style={{borderRadius: '15px 20px 15px 20px', borderStyle: 'dashed'}}>
                                <div className="text-center">
                                    <AlertTriangle className="w-6 h-6 mx-auto mb-2" />
                                    <p className="font-medium">❌ Website Deleted</p>
                                    <p className="text-xs text-slate-600 mt-1">Upgrade to recover and prevent future deletions</p>
                                </div>
                            </div>
                            <button
                                onClick={handleUpgradeClick}
                                className="w-full flex items-center justify-center gap-2 px-4 py-2.5 text-sm font-medium text-white bg-gradient-to-r from-amber-400 to-orange-500 hover:from-amber-500 hover:to-orange-600 transition-all duration-300 shadow-md hover:shadow-lg focus:outline-none focus:ring-2 focus:ring-amber-300 transform hover:scale-105"
                                style={{
                                    borderRadius: '20px 15px 25px 10px',
                                    boxShadow: '3px 3px 0px rgba(245, 158, 11, 0.4)'
                                }}
                            >
                                <Sparkles className="w-4 h-4" />
                                ✨ Upgrade to Recover
                            </button>
                        </div>
                    )}

                    {/* Action Buttons */}
                    {!isDeleted && (
                        <div className="space-y-2">
                            {isCompleted && (
                                <>
                                    {/* Primary Actions */}
                                    <div className="grid grid-cols-2 gap-2">
                                        <button
                                            onClick={() => handlePreview(website)}
                                            className="flex items-center justify-center gap-2 px-4 py-2.5 text-sm font-medium text-white bg-gradient-to-r from-blue-400 to-indigo-500 hover:from-blue-500 hover:to-indigo-600 transition-all duration-300 shadow-md hover:shadow-lg focus:outline-none focus:ring-2 focus:ring-blue-300 transform hover:scale-105"
                                            style={{
                                                borderRadius: '15px 20px 15px 20px',
                                                boxShadow: '3px 3px 0px rgba(59, 130, 246, 0.4)'
                                            }}
                                        >
                                            <Eye className="w-4 h-4" />
                                            👁️ Preview
                                        </button>

                                        <button
                                            onClick={() => onOpenDesignChat(website)}
                                            className="flex items-center justify-center gap-2 px-4 py-2.5 text-sm font-medium text-white bg-gradient-to-r from-emerald-400 to-teal-500 hover:from-emerald-500 hover:to-teal-600 transition-all duration-300 shadow-md hover:shadow-lg focus:outline-none focus:ring-2 focus:ring-emerald-300 transform hover:scale-105"
                                            style={{
                                                borderRadius: '20px 10px 25px 15px',
                                                boxShadow: '3px 3px 0px rgba(16, 185, 129, 0.4)'
                                            }}
                                        >
                                            <MessageSquare className="w-4 h-4" />
                                            💬 Chat & Edit
                                        </button>
                                    </div>

                                    {/* Secondary Actions - Collapsible */}
                                    <div className="space-y-2">
                                        <div className="grid grid-cols-2 gap-2 animate-fadeIn">
                                            <button
                                                onClick={() => openNewWebsiteModal(website)}
                                                className="flex items-center justify-center gap-2 px-4 py-2.5 text-sm font-medium text-white bg-gradient-to-r from-pink-400 to-rose-500 hover:from-pink-500 hover:to-rose-600 transition-all duration-300 shadow-md hover:shadow-lg focus:outline-none focus:ring-2 focus:ring-pink-300 transform hover:scale-105"
                                                style={{
                                                    borderRadius: '10px 25px 10px 25px',
                                                    boxShadow: '3px 3px 0px rgba(236, 72, 153, 0.4)'
                                                }}
                                            >
                                                <LayoutDashboard className="w-4 h-4" />
                                                ➕ Add Page
                                            </button>

                                            <button
                                                onClick={() => setSharePopup({ isOpen: true, website })}
                                                className="flex items-center justify-center gap-2 px-4 py-2.5 text-sm font-medium text-white bg-gradient-to-r from-cyan-400 to-blue-500 hover:from-cyan-500 hover:to-blue-600 transition-all duration-300 shadow-md hover:shadow-lg focus:outline-none focus:ring-2 focus:ring-cyan-300 transform hover:scale-105"
                                                style={{
                                                    borderRadius: '25px 10px 20px 15px',
                                                    boxShadow: '3px 3px 0px rgba(6, 182, 212, 0.4)'
                                                }}
                                            >
                                                <Share2Icon className="w-4 h-4" />
                                                🔗 Share
                                            </button>

                                            <button
                                                onClick={() => {
                                                    handleFormatSelect(website?.uuid);
                                                }}
                                                className="flex items-center justify-center gap-2 px-4 py-2.5 text-sm font-medium text-white bg-gradient-to-r from-violet-400 to-purple-500 hover:from-violet-500 hover:to-purple-600 transition-all duration-300 shadow-md hover:shadow-lg focus:outline-none focus:ring-2 focus:ring-violet-300 transform hover:scale-105"
                                                style={{
                                                    borderRadius: '15px 10px 30px 20px',
                                                    boxShadow: '3px 3px 0px rgba(139, 92, 246, 0.4)'
                                                }}
                                            >
                                                <CodeIcon className="w-4 h-4" />
                                                💻 Download Code
                                            </button>

                                            <button
                                                onClick={() => handleOpenConvertToWebAppModal(website)}
                                                className="flex items-center justify-center gap-2 px-4 py-2.5 text-sm font-medium text-white bg-gradient-to-r from-orange-400 to-red-500 hover:from-orange-500 hover:to-red-600 transition-all duration-300 shadow-md hover:shadow-lg focus:outline-none focus:ring-2 focus:ring-orange-300 transform hover:scale-105"
                                                style={{
                                                    borderRadius: '20px 15px 10px 25px',
                                                    boxShadow: '3px 3px 0px rgba(249, 115, 22, 0.4)'
                                                }}
                                            >
                                                <CodeIcon className="w-4 h-4" />
                                                🚀 Edit in Bolt
                                            </button>
                                        </div>
                                    </div>
                                    <button
                                        onClick={() => setShowShareDesign(true)}
                                        className="w-full flex items-center justify-center gap-2 px-4 py-2.5 text-sm font-medium text-white bg-gradient-to-r from-yellow-400 to-amber-500 hover:from-yellow-500 hover:to-amber-600 transition-all duration-300 shadow-md hover:shadow-lg focus:outline-none focus:ring-2 focus:ring-yellow-300 transform hover:scale-105"
                                        style={{
                                            borderRadius: '25px 15px 30px 20px',
                                            boxShadow: '4px 4px 0px rgba(245, 158, 11, 0.4)'
                                        }}
                                    >
                                        <Globe className="w-4 h-4" />
                                        🌍 Share in Community
                                    </button>
                                </>
                            )}

                            {/* Processing States */}
                            {isProcessing && (
                                <div className="flex items-center justify-center py-6 text-sm text-slate-600 bg-amber-100/50 border-2 border-amber-300" style={{borderRadius: '15px 20px 15px 20px', borderStyle: 'dashed'}}>
                                    <div className="text-center">
                                        <div className="mb-2">
                                            {website.status === 'pending' && <div className="w-6 h-6 border-2 border-amber-400/30 border-t-amber-400 animate-spin mx-auto" style={{borderRadius: '50%'}}></div>}
                                            {website.status === 'editing' && <FileEdit className="w-6 h-6 text-blue-500 animate-pulse mx-auto" />}
                                            {website.status === 'addingPage' && <Plus className="w-6 h-6 text-purple-500 animate-bounce mx-auto" />}
                                        </div>
                                        <p className="font-medium">{statusConfig.description}</p>
                                        <p className="text-xs text-slate-600 mt-1">Actions will be available once complete</p>
                                    </div>
                                </div>
                            )}

                            {/* Error State */}
                            {website.status === 'error' && (
                                <div className="flex items-center justify-center py-6 text-sm text-red-600 bg-red-100/50 border-2 border-red-300" style={{borderRadius: '15px 20px 15px 20px', borderStyle: 'dashed'}}>
                                    <div className="text-center">
                                        <X className="w-6 h-6 mx-auto mb-2" />
                                        <p className="font-medium">❌ Generation Failed</p>
                                        <p className="text-xs text-slate-600 mt-1">Please try creating a new website</p>
                                    </div>
                                </div>
                            )}
                        </div>
                    )}
                </div>
            </div>
        </>
    );
}

export default WebsiteCard;