import React, { useState } from 'react';
import { Check, Shield, X, Plus, Minus, Star, Zap, Crown, Rocket, PenTool } from 'lucide-react';
import { useSelector } from 'react-redux';
import { UserSelector } from '../store/global.Selctor';

const PricingPlan = ({ name, price, description, features, isPopular, productId, currentPlan, planValidity, onUpgrade, index }) => {
  const [isHovered, setIsHovered] = useState(false);
  
  // Determine plan status
  const isCurrentPlan = currentPlan === name.toLowerCase();
  const planRanking = { "Free": 1, "professional": 2, "developer": 3, 'business': 4 };
  const currentRank = planRanking[currentPlan?.toLowerCase()] || 0;
  const thisRank = planRanking[name.toLowerCase()] || 0;
  const canUpgrade = thisRank > currentRank;

  const getIcon = () => {
    switch (name.toLowerCase()) {
      case 'free': return Zap;
      case 'professional': return Star;
      case 'developer': return Crown;
      case 'business': return Rocket;
      default: return Star;
    }
  };

  const Icon = getIcon();

  return (
    <div
      className={`relative flex flex-col h-full group transition-all duration-500 transform hover:scale-105 ${
        isCurrentPlan
          ? 'bg-gradient-to-br from-emerald-100 via-white to-green-100 border-3 border-emerald-400 shadow-2xl'
          : isPopular
          ? 'bg-gradient-to-br from-amber-100 via-white to-orange-100 border-3 border-amber-400 shadow-2xl'
          : 'bg-white border-2 border-slate-300 hover:border-amber-400 shadow-lg hover:shadow-xl'
      } overflow-hidden backdrop-blur-sm`}
      style={{
        borderRadius: index % 2 === 0 ? '30px 20px 35px 25px' : '25px 35px 20px 30px',
        boxShadow: isCurrentPlan 
          ? '8px 8px 0px rgba(16, 185, 129, 0.3)' 
          : isPopular 
          ? '8px 8px 0px rgba(245, 158, 11, 0.3)' 
          : '4px 4px 0px rgba(148, 163, 184, 0.2)'
      }}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
    >
      {/* Hand-drawn decorative elements */}
      {(isPopular || isCurrentPlan) && (
        <>
          <div className="absolute top-2 right-2 w-4 h-4 bg-yellow-400 rounded-full opacity-60"></div>
          <div className="absolute top-4 left-4 w-3 h-3 border-2 border-orange-400 opacity-50 transform rotate-45"></div>
          <div className="absolute bottom-4 right-6 w-2 h-2 bg-amber-400 opacity-70 transform rotate-12" style={{borderRadius: '30% 70%'}}></div>
        </>
      )}

      {/* Popular badge */}
      {isPopular && !isCurrentPlan && (
        <div className="absolute -top-2 -right-2 z-10">
          <div className="relative">
            <div className="bg-gradient-to-r from-amber-400 to-orange-500 text-white text-xs font-bold px-4 py-2 shadow-lg" style={{
              borderRadius: '20px 15px 25px 10px'
            }}>
              ⭐ MOST POPULAR
            </div>
          </div>
        </div>
      )}

      {/* Current plan badge */}
      {isCurrentPlan && (
        <div className="absolute -top-2 -right-2 z-10">
          <div className="relative">
            <div className="bg-gradient-to-r from-emerald-400 to-green-500 text-white text-xs font-bold px-4 py-2 shadow-lg flex items-center gap-1" style={{
              borderRadius: '20px 15px 25px 10px'
            }}>
              <Star className="w-3 h-3" /> CURRENT PLAN
            </div>
          </div>
        </div>
      )}

      <div className="p-6 border-b-2 border-amber-200 relative z-10" style={{borderStyle: 'dashed'}}>
        {/* Icon and name */}
        <div className="flex items-center gap-3 mb-3">
          <div className={`p-3 transition-all duration-300 group-hover:scale-110 ${
            isCurrentPlan 
              ? 'bg-gradient-to-r from-emerald-200 to-green-200' 
              : isPopular 
              ? 'bg-gradient-to-r from-amber-200 to-orange-200' 
              : 'bg-slate-100'
          }`} style={{borderRadius: '15px 10px 20px 15px'}}>
            <Icon className={`h-6 w-6 ${
              isCurrentPlan 
                ? 'text-emerald-600' 
                : isPopular 
                ? 'text-amber-600' 
                : 'text-slate-600'
            } group-hover:text-amber-600 transition-colors duration-300`} />
          </div>
          <h3 className="text-xl font-bold text-slate-800 group-hover:text-amber-700 transition-colors duration-300">{name}</h3>
        </div>

        <p className="text-slate-600 mb-4 group-hover:text-slate-700 transition-colors duration-300 leading-relaxed">{description}</p>

        <div className="mb-6">
          <div className="flex items-baseline gap-1">
            <span className={`text-4xl font-bold transition-all duration-300 ${
              isCurrentPlan
                ? 'bg-gradient-to-r from-emerald-600 to-green-600 bg-clip-text text-transparent'
                : isPopular
                ? 'bg-gradient-to-r from-amber-600 to-orange-600 bg-clip-text text-transparent'
                : 'text-slate-800 group-hover:text-amber-600'
            }`}>
              {price}
            </span>
            {price !== 'Custom' && price !== 'free' && (
              <span className="text-slate-500 ml-1 group-hover:text-slate-600 transition-colors duration-300">/month</span>
            )}
          </div>
          {price === 'free' && (
            <div className="text-emerald-600 text-sm font-semibold mt-1 flex items-center gap-1">
              <Zap className="h-3 w-3" />
              Forever free ✨
            </div>
          )}
        </div>

        {isCurrentPlan && (
          <div className="bg-emerald-100 border-2 border-emerald-300 p-3 mb-4" style={{
            borderRadius: '15px 20px 15px 20px',
            borderStyle: 'dashed'
          }}>
            <p className="text-emerald-700 text-sm font-medium">
              Valid until: {new Date(planValidity).toLocaleDateString()} ✨
            </p>
          </div>
        )}

        {!isCurrentPlan ? (
          <button
            onClick={() => onUpgrade(name.toLowerCase())}
            disabled={!canUpgrade}
            className={`w-full py-3 px-4 font-bold transition-all duration-300 transform hover:scale-105 shadow-lg relative overflow-hidden ${
              canUpgrade
                ? isPopular
                  ? 'bg-gradient-to-r from-amber-400 to-orange-500 text-white hover:from-amber-500 hover:to-orange-600'
                  : 'bg-white border-2 border-slate-300 text-slate-700 hover:bg-amber-50 hover:border-amber-400 hover:text-amber-700'
                : 'bg-slate-200 text-slate-500 cursor-not-allowed border-2 border-slate-300'
            }`}
            style={{
              borderRadius: '20px 15px 25px 10px',
              boxShadow: canUpgrade 
                ? isPopular 
                  ? '3px 3px 0px rgba(245, 158, 11, 0.4)' 
                  : '2px 2px 0px rgba(148, 163, 184, 0.3)'
                : 'none'
            }}
          >
            <span className="relative z-10 flex items-center justify-center gap-2">
              {canUpgrade ? (
                <>
                  <Rocket className="h-4 w-4" />
                  Upgrade Plan 🚀
                </>
              ) : (
                'Not Available'
              )}
            </span>
          </button>
        ) : (
          <button
            disabled={true}
            className="w-full py-3 px-4 font-bold bg-emerald-200 text-emerald-700 cursor-default border-2 border-emerald-400"
            style={{
              borderRadius: '20px 15px 25px 10px',
              borderStyle: 'dashed'
            }}
          >
            Current Plan ✅
          </button>
        )}
      </div>

      <div className="p-6 flex-grow relative z-10">
        <ul className="space-y-4">
          {features.map((feature, featureIndex) => (
            <li key={featureIndex} className="flex items-start group/item">
              <div className={`mr-3 mt-0.5 flex-shrink-0 transition-all duration-300 ${
                feature.included ? 'group-hover/item:scale-110' : ''
              }`}>
                {feature.included ? (
                  <div className="relative">
                    <div className="w-5 h-5 bg-emerald-100 border-2 border-emerald-400 flex items-center justify-center" style={{borderRadius: '8px 12px 8px 12px'}}>
                      <Check className="h-3 w-3 text-emerald-600" />
                    </div>
                  </div>
                ) : (
                  <div className="w-5 h-5 bg-slate-100 border-2 border-slate-300 flex items-center justify-center" style={{borderRadius: '8px 12px 8px 12px'}}>
                    <X className="h-3 w-3 text-slate-400" />
                  </div>
                )}
              </div>
              <span className={`transition-colors duration-300 leading-relaxed ${
                feature.included
                  ? 'text-slate-700 group-hover/item:text-slate-800 font-medium'
                  : 'text-slate-500'
              }`}>
                {feature.text}
              </span>
            </li>
          ))}
        </ul>
      </div>

      {/* Hand-drawn hover effect */}
      <div className={`absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-500 pointer-events-none ${
        isCurrentPlan
          ? 'shadow-2xl shadow-emerald-500/20'
          : isPopular
          ? 'shadow-2xl shadow-amber-500/20'
          : 'shadow-xl shadow-slate-400/10'
      }`} style={{
        borderRadius: index % 2 === 0 ? '30px 20px 35px 25px' : '25px 35px 20px 30px'
      }}></div>
    </div>
  );
};

const BillingPlans = ({ isOpen, onClose }) => {
  const user = useSelector(UserSelector);
  const currentPlan = user.currentPlan || 'starter';
  const planValidity = user.planValidity || new Date().toISOString();

  const handleUpgrade = (planName) => {
    const plan = plans.find(p => p.name.toLowerCase() === planName);
    if (plan && plan.productId) {
      window.open(
        `${import.meta.env.VITE_PAYMENT_URL}/${plan.productId}?quantity=1&redirect_url=${import.meta.env.VITE_FRONTEND_URL}%2Fdashboard&metadata_userId=${user._id}`,
        '_blank'
      );
    }
  };

  const plans = user?.currentPlan === "Professional" ? [
    {
      name: "Free",
      price: "free",
      description: "Perfect for trying out our platform and creating your first masterpiece",
      features: [
        { text: "15 AI credits", included: true },
        { text: "0 AI Tokens", included: false },
        { text: "Export HTML code", included: false },
        { text: "1600+ templates", included: false },
        { text: "AI Editor", included: false },
        { text: "Site retention: 2 hours", included: true }
      ],
      isPopular: false,
      productId: ""
    },
    {
      name: "Professional",
      price: "$20",
      description: "For growing businesses and creative professionals who need more power",
      features: [
        { text: "100 AI credits", included: true },
        { text: "200K AI Tokens", included: true },
        { text: "Export HTML code", included: true },
        { text: "1600+ templates", included: true },
        { text: "AI Editor", included: true },
        { text: "No retention limits", included: true },
      ],
      isPopular: false,
      productId: "pdt_nc4U0FwEgLcBMJ1qTqKGL"
    },
    {
      name: "Developer",
      price: "$50",
      description: "For technical users who want full control and unlimited creativity",
      features: [
        { text: "250 AI credits", included: true },
        { text: "2 Million AI Tokens", included: true },
        { text: "Export HTML code", included: true },
        { text: "1600+ templates", included: true },
        { text: "AI Editor", included: true },
        { text: "No retention limits", included: true }
      ],
      isPopular: true,
      productId: "pdt_1xPNCsEnCy3zS6hbaP4WY"
    },
    {
      name: "Business",
      price: "$100",
      description: "For agencies and teams with high volume needs and premium support",
      features: [
        { text: "550 AI credits", included: true },
        { text: "10 Million AI tokens", included: true },
        { text: "Export HTML code", included: true },
        { text: "1600+ templates", included: true },
        { text: "Priority support", included: true },
        { text: "AI Editor", included: true },
        { text: "No retention limits", included: true }
      ],
      isPopular: false,
      productId: "pdt_U7VV5fU4SaAh47BhHuANz"
    }
  ] : [
    {
      name: "Free",
      price: "free",
      description: "Perfect for trying out our platform and creating your first masterpiece",
      features: [
        { text: "15 AI credits", included: true },
        { text: "0 AI Tokens", included: false },
        { text: "Export HTML code", included: false },
        { text: "1600+ templates", included: false },
        { text: "AI Editor", included: false },
        { text: "Site retention: 2 hours", included: true },
      ],
      isPopular: false,
      productId: ""
    },
    {
      name: "Developer",
      price: "$50",
      description: "For technical users who want full control and unlimited creativity",
      features: [
        { text: "250 AI credits", included: true },
        { text: "2 Million AI Tokens", included: true },
        { text: "Export HTML code", included: true },
        { text: "1600+ templates", included: true },
        { text: "AI Editor", included: true },
        { text: "No retention limits", included: true }
      ],
      isPopular: true,
      productId: "pdt_1xPNCsEnCy3zS6hbaP4WY"
    },
    {
      name: "Business",
      price: "$100",
      description: "For agencies and teams with high volume needs and premium support",
      features: [
        { text: "550 AI credits", included: true },
        { text: "10 Million AI tokens", included: true },
        { text: "Export HTML code", included: true },
        { text: "1600+ templates", included: true },
        { text: "Priority support", included: true },
        { text: "AI Editor", included: true },
        { text: "No retention limits", included: true }
      ],
      isPopular: false,
      productId: "pdt_U7VV5fU4SaAh47BhHuANz"
    }
  ];

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-black/50 backdrop-blur-sm flex items-center justify-center z-50">
      <div className="bg-gradient-to-br from-orange-50 via-amber-50 to-yellow-50 border-3 border-amber-400 max-w-7xl w-full mx-4 max-h-[90vh] overflow-y-auto relative" style={{
        borderRadius: '30px 20px 35px 25px',
        boxShadow: '8px 8px 0px rgba(245, 158, 11, 0.3)'
      }}>
        {/* Paper texture overlay */}
        <div className="absolute inset-0 opacity-20" style={{
          backgroundImage: `url("data:image/svg+xml,%3Csvg width='40' height='40' viewBox='0 0 40 40' xmlns='http://www.w3.org/2000/svg'%3E%3Cg fill='%23d4a574' fill-opacity='0.15'%3E%3Cpath d='M20 20c0-5.5-4.5-10-10-10s-10 4.5-10 10 4.5 10 10 10 10-4.5 10-10zm10 0c0-5.5-4.5-10-10-10s-10 4.5-10 10 4.5 10 10 10 10-4.5 10-10z'/%3E%3C/g%3E%3C/svg%3E")`
        }}></div>

        {/* Hand-drawn decorative elements */}
        <div className="absolute top-4 right-4 w-6 h-6 bg-yellow-400 opacity-50 rounded-full"></div>
        <div className="absolute top-6 left-6 w-4 h-4 border-2 border-orange-400 opacity-40 transform rotate-45"></div>
        <div className="absolute bottom-6 right-8 w-3 h-3 bg-amber-400 opacity-60 transform rotate-12" style={{borderRadius: '30% 70%'}}></div>

        <div className="p-6 border-b-2 border-amber-300 relative z-10" style={{borderStyle: 'dashed'}}>
          <div className="flex items-center justify-between mb-6">
            <div className="flex items-center gap-4">
              <div className="p-3 bg-gradient-to-r from-amber-200 to-orange-200 border-2 border-amber-400" style={{borderRadius: '15px 10px 20px 15px'}}>
                <PenTool className="h-6 w-6 text-amber-600" />
              </div>
              <h2 className="text-2xl font-bold text-slate-800">
                Billing & Plans ✨
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

          <div className="mb-6 bg-white/80 backdrop-blur-sm p-4 border-2 border-amber-300" style={{
            borderRadius: '20px 15px 25px 10px',
            borderStyle: 'dashed'
          }}>
            <h3 className="text-lg font-bold text-slate-800 mb-2">
              Your Current Plan: <span className="text-emerald-600">{currentPlan.charAt(0).toUpperCase() + currentPlan.slice(1)}</span> 🎯
            </h3>
            <p className="text-slate-600">
              Valid until: {new Date(planValidity).toLocaleDateString()} •
              {" "}You can only upgrade to higher tier plans. ⬆️
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 mb-8">
            {plans.map((plan, index) => (
              <PricingPlan
                key={index}
                name={plan.name}
                price={plan.price}
                description={plan.description}
                features={plan.features}
                isPopular={plan.isPopular}
                productId={plan.productId}
                currentPlan={currentPlan}
                planValidity={planValidity}
                onUpgrade={handleUpgrade}
                index={index}
              />
            ))}
          </div>

          <div className="bg-white/80 backdrop-blur-sm border-3 border-emerald-300 p-6 relative" style={{
            borderRadius: '30px 20px 35px 25px',
            borderStyle: 'dashed'
          }}>
            {/* Decorative elements */}
            <div className="absolute top-2 left-2 w-3 h-3 bg-emerald-400 opacity-40 rounded-full"></div>
            <div className="absolute top-3 right-3 w-2 h-2 border-2 border-green-400 opacity-50 transform rotate-45"></div>
            
            <div className="flex items-start gap-4">
              <div className="p-3 bg-emerald-100 border-2 border-emerald-400" style={{borderRadius: '15px 10px 20px 15px'}}>
                <Shield className="h-6 w-6 text-emerald-600" />
              </div>
              <div>
                <h3 className="text-lg font-bold text-slate-800 mb-2">
                  30-Day Money-Back Guarantee 💰
                </h3>
                <p className="text-slate-600 leading-relaxed">
                  Your payment information is securely processed and never stored on our servers.
                  All transactions are protected by industry-standard encryption. Not happy? We'll refund every penny! ✨
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default BillingPlans;