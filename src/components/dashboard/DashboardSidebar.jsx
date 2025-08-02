import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import {
  CreditCard, History, Sparkles, LogOut, X,
  BookTemplate, Component, MessageSquare, Zap, Star,
  TrendingUp, Compass, Settings,
  Gift,
  InfoIcon,
  LucideInfo
} from 'lucide-react';
import logo from "../../assets/logo.webp";
import toast from 'react-hot-toast';


const DashboardSidebar = ({
  setIsReferralPopupOpen,
  user,
  activeTab = 'websites',
  setActiveTab = () => { },
  isMobileSidebarOpen = false,
  closeMobileSidebar = () => { },
  setShowBilling = () => { },
  setIsProfileOpen = () => { },
  onLogout = () => { }
}) => {
  const handleClick = (type) => {
    const messages = {
      credits: "Credits are used to create new websites. 5 credits = 1 site.",
      tokens:
        "AI Tokens are used when using AI for chat and editing. Usage is dynamic.",
    };

    toast.success(messages[type], {
      duration: 5000,
      position: "bottom-left",
      style: {
        background: "linear-gradient(to right, #f59e0b, #ea580c)",
        color: "#1f2937",
        padding: "16px",
        borderRadius: "20px 15px 25px 10px",
        boxShadow:
          "4px 4px 0px rgba(245, 158, 11, 0.4)",
        border: "2px solid #f59e0b",
      },
      icon: <LucideInfo className="text-amber-600" />,
    });
  };
  const SidebarContent = () => (
    <div className="h-full flex flex-col bg-gradient-to-br from-orange-50 via-amber-50 to-yellow-50 relative overflow-hidden">
      {/* Paper texture overlay */}
      <div className="absolute inset-0 opacity-20" style={{
        backgroundImage: `url("data:image/svg+xml,%3Csvg width='40' height='40' viewBox='0 0 40 40' xmlns='http://www.w3.org/2000/svg'%3E%3Cg fill='%23d4a574' fill-opacity='0.15'%3E%3Cpath d='M20 20c0-5.5-4.5-10-10-10s-10 4.5-10 10 4.5 10 10 10 10-4.5 10-10zm10 0c0-5.5-4.5-10-10-10s-10 4.5-10 10 4.5 10 10 10 10-4.5 10-10z'/%3E%3C/g%3E%3C/svg%3E")`
      }}></div>
      
      {/* Hand-drawn decorative elements */}
      <div className="absolute top-10 right-4 w-8 h-8 border-2 border-amber-400 opacity-30 transform rotate-12" style={{
        borderRadius: '60% 40% 70% 30%',
        borderStyle: 'dashed'
      }}></div>
      <div className="absolute bottom-20 left-4 w-6 h-6 border-2 border-orange-400 opacity-25 transform -rotate-12" style={{
        borderRadius: '40% 60% 30% 70%',
        borderStyle: 'dotted'
      }}></div>
      
      {/* Header */}
      <div className="flex items-center justify-between mb-8 sm:mb-10 relative z-10">
        <Link
          to="/"
          className="flex items-center gap-2 text-amber-600 font-bold text-xl sm:text-2xl hover:text-orange-600 transition-colors"
          onClick={closeMobileSidebar}
        >
          <img src={logo} className="h-8 w-8 sm:h-10 sm:w-10" alt="Redesignr.ai Logo" />
          <span className="relative">
            redesignr<span className="text-orange-500">.ai</span>
            <svg className="absolute -bottom-1 left-0 w-full h-1" viewBox="0 0 100 4" fill="none">
              <path d="M2 2 Q50 1 98 2" stroke="#f59e0b" strokeWidth="1" strokeLinecap="round" fill="none" opacity="0.6"/>
            </svg>
          </span>
        </Link>
        <button onClick={closeMobileSidebar} className="md:hidden text-slate-600 hover:text-amber-600 p-1 transition-colors bg-white/80 border-2 border-amber-300" style={{borderRadius: '10px 15px 10px 15px'}}>
          <X size={24} />
        </button>
      </div>

      {/* Navigation */}
      <nav className="flex-grow space-y-6 relative z-10">
        {/* Quick Stats */}
        <div className="space-y-3">
          {/* Header */}
          <div className="flex items-center gap-2 mb-1">
            <TrendingUp className="h-4 w-4 text-amber-600" />
            <h3 className="text-xs text-slate-700 uppercase font-semibold tracking-wider">
              📊 Quick Stats
            </h3>
          </div>

          {/* Cards */}
          <div className="grid grid-cols-2 gap-3">
            {/* Credits Card */}
            <div onClick={() => {
              handleClick("credits");
            }} className="bg-white/90 backdrop-blur-sm border-2 border-amber-300 hover:border-orange-400 transition-colors p-4 cursor-pointer transform hover:scale-105" style={{
              borderRadius: '15px 10px 20px 15px',
              boxShadow: '3px 3px 0px rgba(245, 158, 11, 0.3)'
            }}>
              <div className="flex items-center justify-between">
                <div className="text-md font-bold text-amber-600">
                  {user?.AiCredits}
                </div>
                <InfoIcon
                  className="w-4 h-4 text-slate-600 hover:text-amber-600 cursor-pointer"
                />
              </div>
              <div className="text-xs text-slate-700">✨ Credits</div>
            </div>

            {/* AI Tokens Card */}
            <div onClick={() => {
              handleClick("tokens");
            }} className="bg-white/90 backdrop-blur-sm border-2 border-orange-300 hover:border-red-400 transition-colors p-4 cursor-pointer transform hover:scale-105" style={{
              borderRadius: '20px 15px 15px 20px',
              boxShadow: '3px 3px 0px rgba(251, 146, 60, 0.3)'
            }}>
              <div className="flex items-center justify-between">
                <div className="text-md font-bold text-orange-400">
                  {user?.aiToken}
                </div>
                <InfoIcon
                  className="w-4 h-4 text-slate-600 hover:text-orange-400 cursor-pointer"
                />
              </div>
              <div className="text-xs text-slate-700">🤖 AI Tokens</div>
            </div>
          </div>
        </div>

        {/* Main Navigation */}
        <div className="space-y-2">
          <div className="flex items-center gap-2 mb-4">
            <Compass className="h-4 w-4 text-amber-600" />
            <h3 className="text-xs text-slate-700 uppercase font-semibold tracking-wider">🧭 Explore</h3>
          </div>

          {[
            {
              icon: Component,
              label: "🌐 My Websites",
              value: 'Create & Manage ✨',
              tab: 'websites',
              color: 'blue',
              onClick: () => setActiveTab('websites'),
            },
            {
              icon: MessageSquare,
              label: "💬 Community Chat",
              value: "Connect & Share 🤝",
              tab: 'community',
              color: 'emerald',
              onClick: () => setActiveTab('community'),

            },
            {
              icon: BookTemplate,
              label: "🎨 Template Galaxy",
              value: "Discover 1600+ 🚀",
              tab: 'templates',
              color: 'purple',
              onClick: () => {
                const currentPlan = user?.currentPlan || 'Free';
                if (currentPlan.toLowerCase() === 'free') {
                  setTimeout(() => {
                    toast.success("Oops! This feature is part of our paid plans. Upgrade to unlock it!", {
                      duration: 5000,
                      position: 'top-center',
                      style: {
                        background: 'linear-gradient(to right, #f59e0b, #ea580c)',
                        color: '#1f2937',
                        padding: '16px',
                        borderRadius: '20px 15px 25px 10px',
                        boxShadow: '4px 4px 0px rgba(245, 158, 11, 0.4)',
                        border: '2px solid #f59e0b'
                      },
                      icon: <Sparkles className="text-amber-600" />,
                    });
                  }, 300);
                  return;
                } else {
                  setActiveTab('templates');
                }
              },
              special: true
            },
            {
              icon: Sparkles,
              label: "⚡ Power Plan",
              value: `${user?.currentPlan || 'Free'} 💎`,
              tab: 'plan',
              color: 'amber',
              onClick: () => setShowBilling(true),

            },
          ].map((item, idx) => {
            const isActive = activeTab === item.tab;
            const colorClasses = {
              blue: {
                active: 'bg-blue-100 border-blue-400 text-blue-600',
                inactive: 'text-slate-700 hover:text-blue-600 hover:border-blue-400/50',
                icon: 'bg-blue-400'
              },
              emerald: {
                active: 'bg-emerald-100 border-emerald-400 text-emerald-600',
                inactive: 'text-slate-700 hover:text-emerald-600 hover:border-emerald-400/50',
                icon: 'bg-emerald-400'
              },
              purple: {
                active: 'bg-purple-100 border-purple-400 text-purple-600',
                inactive: 'text-slate-700 hover:text-purple-600 hover:border-purple-400/50',
                icon: 'bg-purple-400'
              },
              amber: {
                active: 'bg-amber-100 border-amber-400 text-amber-600',
                inactive: 'text-slate-700 hover:text-amber-600 hover:border-amber-400/50',
                icon: 'bg-amber-400'
              }
            };

            const colors = colorClasses[item.color];

            return (
              <button
                key={idx}
                onClick={item.onClick}
                className={`w-full flex items-center p-3 transition-all duration-200 border-2 relative transform hover:scale-105
                  ${isActive
                    ? `${colors.active} shadow-lg bg-white/90 backdrop-blur-sm`
                    : `bg-white/80 backdrop-blur-sm border-slate-300 hover:bg-white/90 ${colors.inactive}`
                  }
                `}
                style={{
                  borderRadius: idx % 2 === 0 ? '20px 10px 25px 15px' : '15px 25px 10px 20px',
                  boxShadow: isActive ? '4px 4px 0px rgba(245, 158, 11, 0.3)' : '2px 2px 0px rgba(148, 163, 184, 0.2)'
                }}
              >
                {/* Icon container */}
                <div className={`p-2 mr-3 transition-colors duration-200 ${isActive ? colors.icon : 'bg-slate-200 group-hover:' + colors.icon}`} style={{
                  borderRadius: '12px 8px 15px 10px'
                }}>
                  <item.icon className="h-5 w-5 text-white" />


                </div>

                {/* Content */}
                <div className="flex-grow text-left">
                  <p className="text-sm font-medium">
                    {item.label}
                  </p>
                  <p className="text-xs text-slate-600">
                    {item.value}
                  </p>
                </div>

                {/* Special indicator */}
                {item.special && (
                  <Star className="h-4 w-4 text-yellow-500 animate-pulse ml-2" />
                )}
              </button>
            );
          })}
        </div>
      </nav>

      {/* Bottom section */}
      <div className="mt-auto border-t-2 border-amber-200 pt-6 space-y-3 relative z-10" style={{borderStyle: 'dashed'}}>
        {/* User Profile */}
        <button
          onClick={() => { setIsProfileOpen(true); closeMobileSidebar(); }}
          className="w-full flex items-center gap-3 p-4 text-left bg-white/80 backdrop-blur-sm border-2 border-amber-300 hover:bg-white/90 hover:border-orange-400 transition-all duration-200 group transform hover:scale-105"
          style={{
            borderRadius: '25px 15px 30px 20px',
            boxShadow: '3px 3px 0px rgba(245, 158, 11, 0.3)'
          }}
        >
          <div className="relative">
            <img
              src={user?.profilePicture || `https://ui-avatars.com/api/?name=${encodeURIComponent(user?.name || 'User')}&background=6366f1&color=fff`}
              alt="Profile"
              className="w-12 h-12 object-cover border-2 border-amber-400 group-hover:border-orange-400 transition-colors"
              style={{borderRadius: '50% 40% 60% 50%'}}
            />
            <div className="absolute -bottom-1 -right-1 w-4 h-4 bg-green-400 rounded-full border-2 border-white" />
          </div>

          <div className="flex-grow">
            <p className="text-sm font-medium text-slate-800 group-hover:text-amber-700 transition-colors">
              👤 {user?.name || 'User Profile'}
            </p>
            <p className="text-xs text-slate-600 group-hover:text-slate-700 transition-colors">
              {user?.email || 'User email'}
            </p>
          </div>

          <Settings className="h-4 w-4 text-slate-600 group-hover:text-amber-600 transition-colors" />
        </button>

        {/* Logout */}
        <button
          onClick={() => {
            onLogout();
            closeMobileSidebar();
          }}
          className="w-full flex items-center gap-3 p-4 text-left text-slate-700 bg-white/80 backdrop-blur-sm border-2 border-red-300 hover:bg-red-50 hover:text-red-600 hover:border-red-400 transition-all duration-200 group transform hover:scale-105"
          style={{
            borderRadius: '20px 25px 15px 30px',
            boxShadow: '3px 3px 0px rgba(239, 68, 68, 0.2)'
          }}
        >
          <div className="p-2 bg-red-100 group-hover:bg-red-200 transition-colors" style={{borderRadius: '12px 8px 15px 10px'}}>
            <LogOut className="h-4 w-4 text-red-500 group-hover:text-red-600 transition-colors" />
          </div>
          <span className="text-sm font-medium">
            🚪 Sign Out
          </span>
        </button>
      </div>
    </div>
  );

  return (
    <>
      {/* Desktop Sidebar */}
      <aside className="hidden md:fixed md:top-0 md:left-0 md:h-full md:w-80 bg-white/95 backdrop-blur-xl shadow-2xl z-50 p-6 md:flex md:flex-col border-r-3 border-amber-300" style={{borderStyle: 'dashed'}}>
        <div className="h-full overflow-y-auto scrollbar-thin scrollbar-thumb-amber-400 scrollbar-track-amber-100">
          <SidebarContent />
        </div>
      </aside>

      {/* Mobile Sidebar Overlay */}
      {isMobileSidebarOpen && (
        <div
          className="fixed inset-0 bg-amber-900/60 backdrop-blur-sm z-[55] md:hidden"
          onClick={closeMobileSidebar}
        />
      )}

      {/* Mobile Sidebar */}
      <aside
        className={`fixed top-0 left-0 h-full w-80 max-w-[85vw] bg-white/95 backdrop-blur-xl shadow-2xl z-[60] p-6 flex flex-col border-r-3 border-amber-300 transform transition-all duration-300 ease-out md:hidden
          ${isMobileSidebarOpen ? "translate-x-0 opacity-100" : "-translate-x-full opacity-0"}`}
        style={{borderStyle: 'dashed'}}
      >
        <div className="h-full overflow-y-auto scrollbar-thin scrollbar-thumb-amber-400 scrollbar-track-amber-100">
          <SidebarContent />
        </div>
      </aside>
    </>
  );
};

export default DashboardSidebar;