import React from 'react';
import { Github, Mail, Zap, ArrowRight, PenTool } from 'lucide-react';
import { useSelector } from 'react-redux';
import { UserSelector } from '../store/global.Selctor';
import { Navigate, useNavigate } from 'react-router-dom';
import logo from '../assets/logo.webp';

const Login = () => {
  const [isNewUser, setIsNewUser] = React.useState(false);
  const user = useSelector(UserSelector);
  const navigate = useNavigate();

  if (user) {
    return <Navigate to="/dashboard" replace />;
  }

  const handleGithubLogin = () => {
    window.location.href = `${import.meta.env.VITE_SERVER_URL}/auth/github`;
  };

  const handleGoogleLogin = () => {
    window.location.href = `${import.meta.env.VITE_SERVER_URL}/auth/google`;
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-orange-50 via-amber-50 to-yellow-50 flex items-center justify-center px-4 relative overflow-hidden">
      {/* Paper texture overlay */}
      <div className="absolute inset-0 opacity-20" style={{
        backgroundImage: `url("data:image/svg+xml,%3Csvg width='60' height='60' viewBox='0 0 60 60' xmlns='http://www.w3.org/2000/svg'%3E%3Cg fill='none' fill-rule='evenodd'%3E%3Cg fill='%23d4a574' fill-opacity='0.1'%3E%3Ccircle cx='7' cy='7' r='1'/%3E%3Ccircle cx='53' cy='53' r='1'/%3E%3Ccircle cx='13' cy='43' r='1'/%3E%3Ccircle cx='47' cy='17' r='1'/%3E%3C/g%3E%3C/g%3E%3C/svg%3E")`
      }}></div>

      {/* Hand-drawn decorative elements */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <div className="absolute top-20 left-10 w-16 h-16 border-2 border-amber-400 opacity-30 transform rotate-12" style={{
          borderRadius: '60% 40% 70% 30%',
          borderStyle: 'dashed'
        }}></div>
        <div className="absolute top-40 right-20 w-12 h-12 border-2 border-orange-400 opacity-25 transform -rotate-12" style={{
          borderRadius: '40% 60% 30% 70%',
          borderStyle: 'dotted'
        }}></div>
        <div className="absolute bottom-32 left-1/4 w-20 h-20 border-3 border-yellow-400 opacity-20 transform rotate-45" style={{
          borderRadius: '50% 30% 60% 40%',
          borderStyle: 'dashed'
        }}></div>
        
        {/* Floating elements */}
        <div className="absolute top-1/3 right-1/3 text-yellow-500 opacity-50">
          <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
            <path d="M12 2 L15 9 L22 9 L17 14 L19 22 L12 18 L5 22 L7 14 L2 9 L9 9 Z" strokeDasharray="1,1"/>
          </svg>
        </div>
      </div>

      <div className="max-w-md w-full">
        <div className="text-center mb-8">
          <div className="flex items-center justify-center gap-2 text-amber-600 font-bold text-2xl mb-4">
            <img src={logo} className="h-12 w-12" />
            <span onClick={() => {
              navigate('/');
            }} className="cursor-pointer relative">
              redesignr<span className="text-orange-500">.ai</span>
              <svg className="absolute -bottom-1 left-0 w-full h-1" viewBox="0 0 100 4" fill="none">
                <path d="M2 2 Q50 1 98 2" stroke="#f59e0b" strokeWidth="1" strokeLinecap="round" fill="none" opacity="0.6"/>
              </svg>
            </span>
          </div>
          <h2 className="text-2xl font-bold text-slate-800 mb-2 relative">
            {isNewUser ? 'Create your account ✨' : 'Welcome back 👋'}
            <svg className="absolute -bottom-1 left-1/2 transform -translate-x-1/2 w-32 h-2" viewBox="0 0 128 8" fill="none">
              <path d="M2 6 Q64 2 126 6" stroke="#f59e0b" strokeWidth="2" strokeLinecap="round" fill="none" opacity="0.5"/>
            </svg>
          </h2>
          <p className="text-slate-600">
            {isNewUser 
              ? 'Start your creative journey with redesignr.ai 🎨'
              : 'Sign in to continue creating amazing websites 🚀'
            }
          </p>
        </div>

        <div className="bg-white/90 backdrop-blur-sm border-3 border-amber-300 p-6 shadow-2xl relative" style={{
          borderRadius: '30px 20px 35px 25px',
          boxShadow: '8px 8px 0px rgba(245, 158, 11, 0.2)'
        }}>
          {/* Decorative corner elements */}
          <div className="absolute top-2 left-2 w-4 h-4 bg-amber-400 opacity-40 rounded-full"></div>
          <div className="absolute top-2 right-2 w-3 h-3 border-2 border-orange-400 opacity-50 transform rotate-45"></div>
          <div className="absolute bottom-2 left-2 w-5 h-5 bg-yellow-300 opacity-40 rounded-full"></div>
          <div className="absolute bottom-2 right-2 w-4 h-4 border-2 border-red-400 opacity-40 transform rotate-12" style={{borderRadius: '30% 70% 70% 30%'}}></div>

          {/* Hand-drawn badge */}
          <div className="text-center mb-6">
            <div className="inline-block px-4 py-2 bg-gradient-to-r from-amber-100 to-orange-100 border-2 border-amber-300" style={{
              borderRadius: '20px 15px 25px 10px'
            }}>
              <span className="text-amber-700 text-sm font-semibold flex items-center gap-2">
                <PenTool className="h-4 w-4" />
                🎨 AI-Powered Web Creation
              </span>
            </div>
          </div>

          <div className="flex p-2 bg-amber-50 mb-6" style={{
            borderRadius: '20px 15px 25px 10px',
            border: '2px dashed #f59e0b'
          }}>
            <button
              onClick={() => setIsNewUser(false)}
              className={`flex-1 px-4 py-3 text-sm font-bold transition-all duration-300 transform hover:scale-105 ${
                !isNewUser
                  ? 'bg-gradient-to-r from-amber-400 to-orange-500 text-white shadow-lg'
                  : 'text-slate-700 hover:bg-white hover:text-amber-700'
              }`}
              style={{borderRadius: '15px 10px 20px 15px'}}
            >
              👋 Sign In
            </button>
            <button
              onClick={() => setIsNewUser(true)}
              className={`flex-1 px-4 py-3 text-sm font-bold transition-all duration-300 transform hover:scale-105 ${
                isNewUser
                  ? 'bg-gradient-to-r from-amber-400 to-orange-500 text-white shadow-lg'
                  : 'text-slate-700 hover:bg-white hover:text-amber-700'
              }`}
              style={{borderRadius: '10px 15px 15px 20px'}}
            >
              ✨ Sign Up
            </button>
          </div>

          <div className="space-y-4">
            <button
              onClick={handleGithubLogin}
              className="w-full flex items-center justify-center gap-3 bg-white border-2 border-slate-300 hover:border-amber-400 text-slate-700 hover:text-amber-700 px-4 py-3 font-semibold transition-all duration-300 hover:scale-105 hover:bg-amber-50 group shadow-lg"
              style={{
                borderRadius: '20px 15px 25px 10px',
                boxShadow: '3px 3px 0px rgba(148, 163, 184, 0.3)'
              }}
            >
              <Github className="h-5 w-5" />
              {isNewUser ? '🚀 Sign up with GitHub' : '🔗 Continue with GitHub'}
              <ArrowRight className="h-5 w-5 opacity-0 -ml-4 group-hover:opacity-100 group-hover:ml-0 transition-all duration-300" />
            </button>
            
            <button
              onClick={handleGoogleLogin}
              className="w-full flex items-center justify-center gap-3 bg-gradient-to-r from-amber-400 to-orange-500 hover:from-amber-500 hover:to-orange-600 text-white px-4 py-3 font-bold transition-all duration-300 hover:scale-105 group shadow-lg"
              style={{
                borderRadius: '15px 25px 10px 20px',
                boxShadow: '4px 4px 0px rgba(245, 158, 11, 0.4)'
              }}
            >
              <Mail className="h-5 w-5" />
              {isNewUser ? '✨ Sign up with Gmail' : '📧 Continue with Gmail'}
              <ArrowRight className="h-5 w-5 opacity-0 -ml-4 group-hover:opacity-100 group-hover:ml-0 transition-all duration-300" />
            </button>
          </div>

          <div className="mt-6 text-center">
            <p className="text-sm text-slate-600">
              {isNewUser ? 'By signing up, you agree to our ' : 'By continuing, you agree to our '}
              <a href="#" className="text-amber-600 hover:text-orange-600 font-semibold">Terms of Service</a>
              {' '}and{' '}
              <a href="#" className="text-amber-600 hover:text-orange-600 font-semibold">Privacy Policy</a>
            </p>
          </div>
        </div>
        
        <div className="mt-6 text-center">
          <div className="inline-block p-4 bg-white/80 backdrop-blur-sm border-2 border-amber-300" style={{
            borderRadius: '20px 15px 25px 10px',
            borderStyle: 'dashed'
          }}>
            <p className="text-sm text-slate-600">
            {isNewUser ? 'Already have an account? ' : "Don't have an account? "}
            <button 
              onClick={() => setIsNewUser(!isNewUser)}
              className="text-amber-600 hover:text-orange-600 font-semibold"
            >
              {isNewUser ? '👋 Sign in' : '✨ Sign up'}
            </button>
          </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Login;