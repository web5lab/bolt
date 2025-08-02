import React from 'react';
import { useNavigate } from 'react-router-dom';
import { 
  User, Settings, CreditCard, HelpCircle, LogOut,
  Camera, Edit2, Zap, PenTool, Star
} from 'lucide-react';
import BillingPlans from './BillingPlans';
import { useDispatch, useSelector } from 'react-redux';
import { logOutUser } from '../store/global.Slice';
import { UserSelector } from '../store/global.Selctor';

const UserProfile = ({ isOpen, onClose }) => {
  const navigate = useNavigate();
  const [isEditing, setIsEditing] = React.useState(false);
  const [showBilling, setShowBilling] = React.useState(false);
  const dispatch = useDispatch();
  const user = useSelector(UserSelector);
  
  if (!isOpen) return null;

  const handleLogout = () => {
    dispatch(logOutUser())
    navigate('/login');
  };

  return (
    <div className="fixed inset-0 bg-black/50 backdrop-blur-sm flex items-center justify-center z-50">
      <div className="bg-gradient-to-br from-orange-50 via-amber-50 to-yellow-50 border-3 border-amber-400 max-w-lg w-full mx-4 relative" style={{
        borderRadius: '30px 20px 35px 25px',
        boxShadow: '8px 8px 0px rgba(245, 158, 11, 0.3)'
      }}>
        {/* Paper texture overlay */}
        <div className="absolute inset-0 opacity-20" style={{
          backgroundImage: `url("data:image/svg+xml,%3Csvg width='40' height='40' viewBox='0 0 40 40' xmlns='http://www.w3.org/2000/svg'%3E%3Cg fill='%23d4a574' fill-opacity='0.15'%3E%3Cpath d='M20 20c0-5.5-4.5-10-10-10s-10 4.5-10 10 4.5 10 10 10 10-4.5 10-10zm10 0c0-5.5-4.5-10-10-10s-10 4.5-10 10 4.5 10 10 10 10-4.5 10-10z'/%3E%3C/g%3E%3C/svg%3E")`
        }}></div>

        {/* Hand-drawn decorative elements */}
        <div className="absolute top-4 right-4 w-4 h-4 bg-yellow-400 opacity-50 rounded-full"></div>
        <div className="absolute top-6 left-6 w-3 h-3 border-2 border-orange-400 opacity-40 transform rotate-45"></div>
        <div className="absolute bottom-6 right-8 w-2 h-2 bg-amber-400 opacity-60 transform rotate-12" style={{borderRadius: '30% 70%'}}></div>

        <div className="p-6 border-b-2 border-amber-300 relative z-10" style={{borderStyle: 'dashed'}}>
          <div className="flex items-center justify-between mb-6">
            <div className="flex items-center gap-3">
              <div className="p-3 bg-gradient-to-r from-amber-200 to-orange-200 border-2 border-amber-400" style={{borderRadius: '15px 10px 20px 15px'}}>
                <PenTool className="h-6 w-6 text-amber-600" />
              </div>
              <h2 className="text-2xl font-bold text-slate-800 relative">
                Profile Settings ✨
                <svg className="absolute -bottom-1 left-0 w-32 h-2 mt-1" viewBox="0 0 128 8" fill="none">
                  <path d="M2 6 Q64 2 126 6" stroke="#f59e0b" strokeWidth="2" strokeLinecap="round" fill="none" opacity="0.5"/>
                </svg>
              </h2>
            </div>
            <button
              onClick={onClose}
              className="p-2 hover:bg-amber-100 border-2 border-amber-300 hover:border-orange-400 transition-colors text-slate-600 hover:text-slate-800"
              style={{borderRadius: '12px 8px 15px 10px'}}
            >
              ✕
            </button>
          </div>

          <div className="flex flex-col items-center">
            <div className="relative mb-4">
              <div className="relative">
                <img
                  src={user.profilePicture || "https://images.pexels.com/photos/2379004/pexels-photo-2379004.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2"}
                  alt={user.name}
                  className="w-24 h-24 object-cover border-3 border-amber-400"
                  style={{borderRadius: '20px 15px 25px 10px'}}
                />
                <div className="absolute -top-1 -right-1 w-6 h-6 bg-green-400 border-2 border-white rounded-full flex items-center justify-center">
                  <div className="w-2 h-2 bg-white rounded-full"></div>
                </div>
              </div>
              <button className="absolute bottom-0 right-0 bg-gradient-to-r from-amber-400 to-orange-500 p-2 text-white hover:from-amber-500 hover:to-orange-600 transition-all duration-300 transform hover:scale-110 shadow-lg" style={{
                borderRadius: '12px 8px 15px 10px',
                boxShadow: '2px 2px 0px rgba(245, 158, 11, 0.4)'
              }}>
                <Camera className="w-4 h-4" />
              </button>
            </div>

            {isEditing ? (
              <div className="w-full space-y-4">
                <div>
                  <label className="block text-sm font-bold text-slate-700 mb-1">
                    Name 👤
                  </label>
                  <input
                    type="text"
                    value={user.name}
                    className="w-full bg-white/80 border-2 border-amber-300 px-4 py-2 text-slate-800 focus:outline-none focus:ring-2 focus:ring-amber-500"
                    style={{borderRadius: '15px 20px 15px 20px'}}
                  />
                </div>
                <div>
                  <label className="block text-sm font-bold text-slate-700 mb-1">
                    Email 📧
                  </label>
                  <input
                    type="email"
                    value={user.email}
                    className="w-full bg-white/80 border-2 border-amber-300 px-4 py-2 text-slate-800 focus:outline-none focus:ring-2 focus:ring-amber-500"
                    style={{borderRadius: '15px 20px 15px 20px'}}
                  />
                </div>
                <button
                  onClick={() => setIsEditing(false)}
                  className="w-full bg-gradient-to-r from-amber-400 to-orange-500 text-white px-4 py-2 font-bold hover:from-amber-500 hover:to-orange-600 transition-all duration-300 transform hover:scale-105 shadow-lg"
                  style={{
                    borderRadius: '20px 15px 25px 10px',
                    boxShadow: '3px 3px 0px rgba(245, 158, 11, 0.4)'
                  }}
                >
                  Save Changes ✅
                </button>
              </div>
            ) : (
              <div className="text-center mb-4">
                <h3 className="text-xl font-bold text-slate-800 mb-1">{user.name}</h3>
                <p className="text-slate-600 mb-2 font-medium">{user.email}</p>
                <span className="inline-block bg-white/80 border-2 border-amber-400 text-amber-700 px-4 py-2 font-bold text-sm" style={{
                  borderRadius: '15px 20px 15px 20px'
                }}>
                  <Star className="inline h-4 w-4 mr-1" />
                  {user.currentPlan || 'Free Plan'} ✨
                </span>
              </div>
            )}
          </div>
        </div>

        <div className="p-4 relative z-10">
          <div className="space-y-2">
            <button 
              onClick={() => setShowBilling(true)}
              className="w-full flex items-center gap-3 px-4 py-3 text-left text-slate-700 hover:text-amber-700 hover:bg-amber-100 transition-all duration-300 font-medium border-2 border-transparent hover:border-amber-300"
              style={{borderRadius: '15px 20px 15px 20px'}}
            >
              <div className="p-2 bg-amber-100 border border-amber-300" style={{borderRadius: '10px 15px 10px 15px'}}>
                <CreditCard className="w-5 h-5 text-amber-600" />
              </div>
              Billing & Plans 💳
            </button>
            <button
              onClick={handleLogout}
              className="w-full flex items-center gap-3 px-4 py-3 text-left text-red-600 hover:text-red-700 hover:bg-red-50 transition-all duration-300 font-medium border-2 border-transparent hover:border-red-300"
              style={{borderRadius: '15px 20px 15px 20px'}}
            >
              <div className="p-2 bg-red-100 border border-red-300" style={{borderRadius: '10px 15px 10px 15px'}}>
                <LogOut className="w-5 h-5 text-red-600" />
              </div>
              Sign Out 👋
            </button>
          </div>

          {/* Hand-drawn info box */}
          <div className="mt-6 p-4 bg-white/80 border-2 border-emerald-300 relative" style={{
            borderRadius: '20px 15px 25px 10px',
            borderStyle: 'dashed'
          }}>
            {/* Decorative elements */}
            <div className="absolute top-1 right-1 w-2 h-2 bg-emerald-400 opacity-50 rounded-full"></div>
            <div className="absolute bottom-1 left-1 w-3 h-3 border border-green-400 opacity-40 transform rotate-45" style={{borderRadius: '30% 70%'}}></div>
            
            <div className="flex items-start gap-3">
              <div className="p-2 bg-emerald-100 border border-emerald-400" style={{borderRadius: '10px 15px 10px 15px'}}>
                <Zap className="h-5 w-5 text-emerald-600" />
              </div>
              <div>
                <h4 className="font-bold text-slate-800 mb-1">Welcome to redesignr.ai! 🎉</h4>
                <p className="text-sm text-slate-600 leading-relaxed">
                  Your AI-powered web creation companion is ready to help you build amazing websites, docs, and landing pages! ✨
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
      <BillingPlans isOpen={showBilling} onClose={() => setShowBilling(false)} />
    </div>
  );
};

export default UserProfile;