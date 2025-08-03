import React from 'react';
import { CheckCircle, XCircle } from 'lucide-react';

const Pricing: React.FC = () => {
  const plans = [
    {
      name: "Free",
      price: 0,
      description: "Perfect for personal use and getting started.",
      features: [
        { text: "Basic Voice Reminders", included: true },
        { text: "Unlimited Text Reminders", included: true },
        { text: "Standard Notifications", included: true },
        { text: "No Calendar Sync", included: false },
        { text: "Limited AI Context", included: false }
      ],
      buttonText: "Start Free",
      buttonStyle: "bg-yellow-200 text-orange-700 hover:bg-yellow-300",
      popular: false
    },
    {
      name: "Pro",
      price: 9,
      description: "Unleash full productivity with advanced features.",
      features: [
        { text: "Unlimited Voice & Text Reminders", included: true },
        { text: "Advanced AI Context & Learning", included: true },
        { text: "Customizable Alert Types", included: true },
        { text: "Calendar Integration (Google, Outlook)", included: true },
        { text: "Priority Task Management", included: true }
      ],
      buttonText: "Go Pro Now",
      buttonStyle: "bg-gradient-to-br from-yellow-500 to-orange-600 text-white hover:from-yellow-600 hover:to-orange-700",
      popular: true
    },
    {
      name: "Premium",
      price: 19,
      description: "For power users and small teams seeking ultimate control.",
      features: [
        { text: "All Pro Features", included: true },
        { text: "Team Collaboration Tools", included: true },
        { text: "Dedicated Premium Support", included: true },
        { text: "Advanced Analytics & Reporting", included: true },
        { text: "Early Access to New Features", included: true }
      ],
      buttonText: "Get Premium",
      buttonStyle: "bg-orange-600 text-white hover:bg-orange-700",
      popular: false
    }
  ];

  return (
    <section id="pricing" className="py-20 bg-gradient-to-br from-blue-50 via-indigo-50 to-cyan-50 relative overflow-hidden">
      {/* Paper texture overlay */}
      <div className="absolute inset-0 opacity-20" style={{
        backgroundImage: `url("data:image/svg+xml,%3Csvg width='60' height='60' viewBox='0 0 60 60' xmlns='http://www.w3.org/2000/svg'%3E%3Cg fill='none' fill-rule='evenodd'%3E%3Cg fill='%234f46e5' fill-opacity='0.1'%3E%3Ccircle cx='7' cy='7' r='1'/%3E%3Ccircle cx='53' cy='53' r='1'/%3E%3Ccircle cx='13' cy='43' r='1'/%3E%3Ccircle cx='47' cy='17' r='1'/%3E%3C/g%3E%3C/g%3E%3C/svg%3E")`
      }}></div>

      {/* Hand-drawn decorative elements */}
      <div className="absolute top-20 left-10 w-16 h-16 border-2 border-blue-400 opacity-30 transform rotate-12" style={{
        borderRadius: '60% 40% 70% 30%',
        borderStyle: 'dashed'
      }}></div>
      <div className="absolute top-40 right-20 w-12 h-12 border-2 border-indigo-400 opacity-25 transform -rotate-12" style={{
        borderRadius: '40% 60% 30% 70%',
        borderStyle: 'dotted'
      }}></div>
      <div className="absolute bottom-32 left-1/4 w-20 h-20 border-3 border-cyan-400 opacity-20 transform rotate-45" style={{
        borderRadius: '50% 30% 60% 40%',
        borderStyle: 'dashed'
      }}></div>

      <div className="container mx-auto px-6 text-center">
        {/* Header */}
        <div className="mb-16">
          {/* Badge */}
          <div className="inline-block px-6 py-2 mb-6 bg-white/80 backdrop-blur-sm border-2 border-blue-300 shadow-lg" style={{
            borderRadius: '25px 15px 30px 20px',
            boxShadow: '3px 3px 0px rgba(59, 130, 246, 0.3)'
          }}>
            <span className="text-blue-700 text-sm font-semibold">💎 Choose Your Perfect Plan</span>
          </div>

          <h2 className="text-4xl md:text-5xl font-bold text-slate-800 mb-6 relative">
            Simple &{' '}
            <span className="bg-gradient-to-r from-blue-500 to-indigo-500 bg-clip-text text-transparent relative">
              Transparent
              <svg className="absolute -bottom-2 left-0 w-full h-3" viewBox="0 0 200 12" fill="none">
                <path d="M5 8 Q100 4 195 8" stroke="#3b82f6" strokeWidth="2" strokeLinecap="round" fill="none" opacity="0.6"/>
              </svg>
            </span>{' '}
            Pricing ✨
          </h2>
          <p className="text-xl text-slate-600 mb-8 max-w-3xl mx-auto leading-relaxed">
            Choose the plan that's right for you and unlock your full productivity potential.{' '}
            <span className="text-blue-600 font-semibold">Start free</span> and scale as you grow! 🚀
          </p>
        </div>
        </p>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-10 items-center">
          {plans.map((plan, index) => (
            <div 
              key={index} 
              className={`bg-white/90 backdrop-blur-sm shadow-xl p-8 flex flex-col justify-between h-full transform transition duration-300 border-2 ${
                plan.popular 
                  ? 'scale-[1.05] border-blue-500 ring-8 ring-blue-300 relative z-10' 
                  : 'hover:scale-[1.02] border-blue-200'
              }`}
              style={{
                borderRadius: index % 2 === 0 ? '30px 20px 35px 25px' : '25px 35px 20px 30px',
                boxShadow: plan.popular ? '8px 8px 0px rgba(59, 130, 246, 0.3)' : '4px 4px 0px rgba(59, 130, 246, 0.2)'
              }}
            >
              {plan.popular && (
                <div className="absolute -top-4 left-1/2 -translate-x-1/2 bg-gradient-to-r from-blue-500 to-indigo-600 text-white text-sm font-bold px-4 py-2 shadow-lg" style={{
                  borderRadius: '20px 15px 25px 10px',
                  boxShadow: '3px 3px 0px rgba(59, 130, 246, 0.4)'
                }}>
                  ⭐ Most Popular
                </div>
              )}

              {/* Decorative corner elements */}
              <div className="absolute top-2 left-2 w-3 h-3 bg-blue-400 opacity-40 rounded-full"></div>
              <div className="absolute top-2 right-2 w-2 h-2 bg-indigo-400 opacity-50 transform rotate-45"></div>
              <div className="absolute bottom-2 right-2 w-4 h-4 border-2 border-cyan-400 opacity-30 transform rotate-12" style={{borderRadius: '40% 60%'}}></div>
              
              <div>
                <h3 className="text-3xl font-bold text-slate-800 mb-4 relative">
                  {plan.name}
                  <svg className="absolute -bottom-1 left-0 w-16 h-1" viewBox="0 0 64 4" fill="none">
                    <path d="M2 2 Q32 1 62 2" stroke="#3b82f6" strokeWidth="1" strokeLinecap="round" fill="none" opacity="0.6"/>
                  </svg>
                </h3>
                <p className="text-slate-600 mb-8 leading-relaxed">{plan.description}</p>
                <div className="text-5xl font-extrabold bg-gradient-to-r from-blue-500 to-indigo-600 bg-clip-text text-transparent mb-8">
                  ${plan.price}<span className="text-xl font-medium text-slate-600">/month</span>
                </div>
                <ul className="text-left text-slate-700 space-y-4 mb-10">
                  {plan.features.map((feature, featureIndex) => (
                    <li key={featureIndex} className={`flex items-center font-medium ${!feature.included ? 'text-slate-500 opacity-75' : ''}`}>
                      {feature.included ? (
                        <CheckCircle className="w-5 h-5 text-blue-500 mr-3" />
                      ) : (
                        <XCircle className="w-5 h-5 text-slate-400 mr-3" />
                      )}
                      {feature.text}
                    </li>
                  ))}
                </ul>
              </div>
              
              <a href="#" className={`block w-full px-8 py-4 font-bold transition-all duration-300 shadow-lg text-center transform hover:scale-105 ${plan.buttonStyle}`} style={{
                borderRadius: '20px 15px 25px 10px',
                boxShadow: '3px 3px 0px rgba(59, 130, 246, 0.3)'
              }}>
                {plan.buttonText}
              </a>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Pricing;