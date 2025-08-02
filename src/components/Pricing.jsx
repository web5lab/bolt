import React, { useState } from 'react';
import { Check, X, Plus, Minus, Star, Zap, Crown, Rocket, PenTool } from 'lucide-react';
import { useSelector } from 'react-redux';
import { UserSelector } from '../store/global.Selctor';

const PricingPlan = ({ name, price, description, features, isPopular, icon: Icon, gradient, index }) => {
  const [isHovered, setIsHovered] = useState(false);

  return (
    <div
      className={`relative flex flex-col h-full group transition-all duration-500 transform hover:scale-105 ${
        isPopular
          ? 'bg-gradient-to-br from-amber-100 via-white to-orange-100 border-3 border-amber-400 shadow-2xl'
          : 'bg-white border-2 border-slate-300 hover:border-amber-400 shadow-lg hover:shadow-xl'
      } overflow-hidden backdrop-blur-sm`}
      style={{
        borderRadius: index % 2 === 0 ? '30px 20px 35px 25px' : '25px 35px 20px 30px',
        boxShadow: isPopular ? '8px 8px 0px rgba(245, 158, 11, 0.3)' : '4px 4px 0px rgba(148, 163, 184, 0.2)'
      }}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
    >
      {/* Hand-drawn decorative elements */}
      {isPopular && (
        <>
          <div className="absolute top-2 right-2 w-4 h-4 bg-yellow-400 rounded-full opacity-60"></div>
          <div className="absolute top-4 left-4 w-3 h-3 border-2 border-orange-400 opacity-50 transform rotate-45"></div>
          <div className="absolute bottom-4 right-6 w-2 h-2 bg-amber-400 opacity-70 transform rotate-12" style={{borderRadius: '30% 70%'}}></div>
        </>
      )}

      {/* Popular badge */}
      {isPopular && (
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

      <div className="p-6 border-b-2 border-slate-200 relative z-10">
        {/* Icon and name */}
        <div className="flex items-center gap-3 mb-3">
          <div className={`p-3 transition-all duration-300 group-hover:scale-110 ${
            isPopular ? 'bg-gradient-to-r from-amber-200 to-orange-200' : 'bg-slate-100'
          }`} style={{borderRadius: '15px 10px 20px 15px'}}>
            <Icon className={`h-6 w-6 ${isPopular ? 'text-amber-600' : 'text-slate-600'} group-hover:text-amber-600 transition-colors duration-300`} />
          </div>
          <h3 className="text-xl font-bold text-slate-800 group-hover:text-amber-700 transition-colors duration-300">{name}</h3>
        </div>

        <p className="text-slate-600 mb-4 group-hover:text-slate-700 transition-colors duration-300 leading-relaxed">{description}</p>

        <div className="mb-6">
          <div className="flex items-baseline gap-1">
            <span className={`text-4xl font-bold transition-all duration-300 ${
              isPopular
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

        <button className={`w-full py-3 px-4 font-bold transition-all duration-300 transform hover:scale-105 shadow-lg relative overflow-hidden ${
          isPopular
            ? 'bg-gradient-to-r from-amber-400 to-orange-500 text-white hover:from-amber-500 hover:to-orange-600'
            : 'bg-white border-2 border-slate-300 text-slate-700 hover:bg-amber-50 hover:border-amber-400 hover:text-amber-700'
        }`} style={{
          borderRadius: '20px 15px 25px 10px',
          boxShadow: isPopular ? '3px 3px 0px rgba(245, 158, 11, 0.4)' : '2px 2px 0px rgba(148, 163, 184, 0.3)'
        }}>
          <span className="relative z-10 flex items-center justify-center gap-2">
            {isPopular ? (
              <>
                <Rocket className="h-4 w-4" />
                Get Started 🚀
              </>
            ) : (
              <>
                <PenTool className="h-4 w-4" />
                Choose Plan
              </>
            )}
          </span>
        </button>
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
                    <div className="w-5 h-5 bg-emerald-100 flex items-center justify-center" style={{borderRadius: '8px 12px 8px 12px'}}>
                      <Check className="h-3 w-3 text-emerald-600" />
                    </div>
                  </div>
                ) : (
                  <div className="w-5 h-5 bg-slate-100 flex items-center justify-center" style={{borderRadius: '8px 12px 8px 12px'}}>
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
        isPopular
          ? 'shadow-2xl shadow-amber-500/20'
          : 'shadow-xl shadow-slate-400/10'
      }`} style={{
        borderRadius: index % 2 === 0 ? '30px 20px 35px 25px' : '25px 35px 20px 30px'
      }}></div>
    </div>
  );
};

const Pricing = () => {
  const user = useSelector(UserSelector);

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
      productId: "",
      icon: Zap,
      gradient: "bg-gradient-to-br from-emerald-500/20 to-green-500/20"
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
        { text: "No retention limits", included: true }
      ],
      isPopular: false,
      productId: "pdt_nc4U0FwEgLcBMJ1qTqKGL",
      icon: Star,
      gradient: "bg-gradient-to-br from-blue-500/20 to-cyan-500/20"
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
      productId: "pdt_1xPNCsEnCy3zS6hbaP4WY",
      icon: Crown,
      gradient: "bg-gradient-to-br from-purple-500/20 to-indigo-500/20"
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
      productId: "pdt_U7VV5fU4SaAh47BhHuANz",
      icon: Rocket,
      gradient: "bg-gradient-to-br from-orange-500/20 to-red-500/20"
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
        { text: "Site retention: 2 hours", included: true }
      ],
      isPopular: false,
      productId: "",
      icon: Zap,
      gradient: "bg-gradient-to-br from-emerald-500/20 to-green-500/20"
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
      productId: "pdt_1xPNCsEnCy3zS6hbaP4WY",
      icon: Crown,
      gradient: "bg-gradient-to-br from-purple-500/20 to-indigo-500/20"
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
      productId: "pdt_U7VV5fU4SaAh47BhHuANz",
      icon: Rocket,
      gradient: "bg-gradient-to-br from-orange-500/20 to-red-500/20"
    }
  ];

  return (
    <section id="pricing" className="py-20 relative overflow-hidden bg-gradient-to-br from-orange-50 via-yellow-50 to-amber-50">
      {/* Paper texture overlay */}
      <div className="absolute inset-0 opacity-20" style={{
        backgroundImage: `url("data:image/svg+xml,%3Csvg width='60' height='60' viewBox='0 0 60 60' xmlns='http://www.w3.org/2000/svg'%3E%3Cg fill='none' fill-rule='evenodd'%3E%3Cg fill='%23d4a574' fill-opacity='0.1'%3E%3Ccircle cx='7' cy='7' r='1'/%3E%3Ccircle cx='53' cy='53' r='1'/%3E%3Ccircle cx='13' cy='43' r='1'/%3E%3Ccircle cx='47' cy='17' r='1'/%3E%3C/g%3E%3C/g%3E%3C/svg%3E")`
      }}></div>

      {/* Hand-drawn decorative elements */}
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

      <div className="container mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        {/* Header section */}
        <div className="max-w-4xl mx-auto text-center mb-16">
          {/* Badge */}
          <div className="inline-block px-6 py-2 mb-6 bg-white/80 backdrop-blur-sm border-2 border-amber-300 shadow-lg" style={{
            borderRadius: '25px 15px 30px 20px'
          }}>
            <span className="text-amber-700 text-sm font-semibold flex items-center gap-2">
              <PenTool className="h-4 w-4" />
              💎 Choose Your Perfect Plan
            </span>
          </div>

          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-bold mb-6 leading-tight text-slate-800">
            Simple,{' '}
            <span className="bg-gradient-to-r from-amber-500 to-orange-500 bg-clip-text text-transparent relative">
              Transparent
              <svg className="absolute -bottom-2 left-0 w-full h-3" viewBox="0 0 200 12" fill="none">
                <path d="M5 8 Q100 4 195 8" stroke="#f59e0b" strokeWidth="2" strokeLinecap="round" fill="none" opacity="0.6"/>
              </svg>
            </span>{' '}
            Pricing ✨
          </h2>
          <p className="text-slate-600 text-lg md:text-xl leading-relaxed max-w-3xl mx-auto">
            Start free and scale as you grow.{' '}
            <span className="text-emerald-600 font-semibold">
              No credit card required
            </span>{' '}
            for the free plan. Upgrade anytime to unlock more{' '}
            <span className="text-amber-600 font-semibold">
              AI-powered features
            </span>
            . 🎨
          </p>
        </div>

        {/* Pricing cards */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 mb-16">
          {plans.map((plan, index) => (
            <PricingPlan
              key={index}
              name={plan.name}
              price={plan.price}
              description={plan.description}
              features={plan.features}
              isPopular={plan.isPopular}
              icon={plan.icon}
              gradient={plan.gradient}
              index={index}
            />
          ))}
        </div>

        {/* Hand-drawn guarantee section */}
        <div className="text-center">
          <div className="inline-block p-8 bg-gradient-to-r from-emerald-50 to-green-50 border-3 border-emerald-300" style={{
            borderRadius: '30px 20px 35px 25px',
            borderStyle: 'dashed'
          }}>
            <h3 className="text-2xl font-bold text-slate-800 mb-4">
              30-Day Money-Back Guarantee 💰
            </h3>
            <p className="text-slate-600 max-w-2xl leading-relaxed">
              Not happy with your AI-powered creations? We'll refund every penny, no questions asked.
              That's how confident we are in our hand-crafted AI magic! ✨
            </p>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Pricing;