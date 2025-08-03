import React from 'react';
import { Mic, CheckCircle, Bell, ArrowRight, Sparkles, Clock, Bot, MessageSquare, Calendar, Zap } from 'lucide-react';

const HowItWorks: React.FC = () => {
  const steps = [
    {
      number: 1,
      title: "Speak Naturally",
      subtitle: "Just talk to TimeTuneAI",
      description: "Simply speak or type your reminder in natural language. No complex commands or rigid formats - just tell TimeTuneAI what you need to remember.",
      example: "Remind me about the presentation tomorrow at 10 AM",
      icon: Mic,
      color: "from-blue-500 to-purple-600",
      bgColor: "from-blue-50 to-purple-50",
      features: ["Natural language processing", "Voice recognition", "Smart context understanding"]
    },
    {
      number: 2,
      title: "AI Understands",
      subtitle: "Intelligent processing in seconds",
      description: "Our advanced AI instantly processes your request, extracts key details, and confirms everything with you before setting the reminder.",
      example: "✓ Presentation reminder set for Tomorrow, 10:00 AM",
      icon: Bot,
      color: "from-orange-500 to-red-500",
      bgColor: "from-orange-50 to-red-50",
      features: ["Smart date parsing", "Context awareness", "Automatic categorization"]
    },
    {
      number: 3,
      title: "Never Miss Again",
      subtitle: "Perfect timing, every time",
      description: "Receive perfectly timed notifications exactly when you need them. Smart alerts adapt to your schedule and preferences.",
      example: "🔔 Presentation in 15 minutes!",
      icon: Bell,
      color: "from-green-500 to-emerald-600",
      bgColor: "from-green-50 to-emerald-50",
      features: ["Smart notifications", "Multiple alert types", "Calendar integration"]
    }
  ];

  return (
    <section id="how-it-works" className="py-20 bg-gradient-to-br from-blue-50 via-indigo-50 to-cyan-50 relative overflow-hidden">
      {/* Paper texture overlay */}
      <div className="absolute inset-0 opacity-20" style={{
        backgroundImage: `url("data:image/svg+xml,%3Csvg width='40' height='40' viewBox='0 0 40 40' xmlns='http://www.w3.org/2000/svg'%3E%3Cg fill='%234f46e5' fill-opacity='0.15'%3E%3Cpath d='M20 20c0-5.5-4.5-10-10-10s-10 4.5-10 10 4.5 10 10 10 10-4.5 10-10zm10 0c0-5.5-4.5-10-10-10s-10 4.5-10 10 4.5 10 10 10 10-4.5 10-10z'/%3E%3C/g%3E%3C/svg%3E")`
      }}></div>

      {/* Background Elements */}
      <div className="absolute inset-0">
        <div className="absolute top-20 left-10 w-72 h-72 bg-gradient-to-r from-blue-400/10 to-indigo-400/10 rounded-full blur-3xl animate-pulse"></div>
        <div className="absolute bottom-20 right-10 w-96 h-96 bg-gradient-to-r from-indigo-400/10 to-purple-400/10 rounded-full blur-3xl animate-pulse" style={{ animationDelay: '2s' }}></div>
        
        {/* Hand-drawn decorative elements */}
        <div className="absolute top-1/4 right-1/4 w-32 h-32 border-3 border-blue-300 opacity-30 transform rotate-12" style={{
          borderRadius: '60% 40% 70% 30%',
          borderStyle: 'dashed'
        }}></div>
        <div className="absolute bottom-1/2 left-1/4 w-24 h-24 border-2 border-indigo-400 opacity-25 transform -rotate-12" style={{
          borderRadius: '40% 60% 30% 70%',
          borderStyle: 'dotted'
        }}></div>
      </div>

      <div className="container mx-auto px-6 relative z-10">
        {/* Header */}
        <div className="text-center mb-16">
          <div className="inline-flex items-center space-x-2 bg-white/80 backdrop-blur-sm px-4 py-2 shadow-lg border-2 border-blue-300 mb-6" style={{
            borderRadius: '25px 15px 30px 20px',
            boxShadow: '3px 3px 0px rgba(59, 130, 246, 0.3)'
          }}>
            <Sparkles className="w-4 h-4 text-blue-500" />
            <span className="text-sm font-semibold text-slate-700">✨ How It Works</span>
          </div>
          
          <h2 className="text-4xl md:text-5xl lg:text-6xl font-black text-slate-800 mb-6">
            <span className="block relative">
              Transform Your Day
              <svg className="absolute -bottom-2 left-0 w-full h-3" viewBox="0 0 400 12" fill="none">
                <path d="M5 8 Q200 2 395 8" stroke="#3b82f6" strokeWidth="3" strokeLinecap="round" fill="none" opacity="0.6"/>
              </svg>
            </span>
            <span className="block bg-gradient-to-r from-blue-500 via-indigo-500 to-purple-500 bg-clip-text text-transparent">
              In 3 Simple Steps
            </span>
          </h2>
          
          <p className="text-xl md:text-2xl text-slate-600 max-w-3xl mx-auto leading-relaxed">
            Experience the future of personal organization with{' '}
            <span className="text-blue-600 font-semibold">AI that understands you naturally</span> ✨
          </p>
        </div>

        {/* Steps */}
        <div className="relative">
          {/* Connection Lines */}
          <div className="hidden lg:block absolute top-1/2 left-0 right-0 h-0.5 bg-gradient-to-r from-blue-200 via-indigo-200 to-purple-200 transform -translate-y-1/2 z-0"></div>
          
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 lg:gap-12 relative z-10">
            {steps.map((step, index) => {
              const IconComponent = step.icon;
              return (
                <div key={index} className="group">
                  {/* Step Card */}
                  <div className={`relative bg-gradient-to-br ${step.bgColor} p-8 shadow-xl border-2 border-blue-200 hover:shadow-2xl transition-all duration-500 hover:scale-105 overflow-hidden`} style={{
                    borderRadius: index % 2 === 0 ? '30px 20px 35px 25px' : '25px 35px 20px 30px',
                    boxShadow: '6px 6px 0px rgba(59, 130, 246, 0.2)'
                  }}>
                    {/* Background Pattern */}
                    <div className="absolute inset-0 opacity-5">
                      <div className="w-full h-full" style={{
                        backgroundImage: `url("data:image/svg+xml,%3Csvg width='60' height='60' viewBox='0 0 60 60' xmlns='http://www.w3.org/2000/svg'%3E%3Cg fill='none' fill-rule='evenodd'%3E%3Cg fill='%23000000' fill-opacity='0.1'%3E%3Ccircle cx='30' cy='30' r='1'/%3E%3C/g%3E%3C/g%3E%3C/svg%3E")`,
                      }}></div>
                    </div>

                    {/* Hand-drawn decorative elements */}
                    <div className="absolute top-2 right-2 w-4 h-4 bg-blue-400 rounded-full opacity-40"></div>
                    <div className="absolute top-4 left-4 w-3 h-3 border-2 border-indigo-400 opacity-50 transform rotate-45"></div>
                    <div className="absolute bottom-4 right-6 w-2 h-2 bg-cyan-400 opacity-70 transform rotate-12" style={{borderRadius: '30% 70%'}}></div>

                    {/* Step Number Badge */}
                    <div className="absolute -top-3 -left-3 w-8 h-8 bg-gradient-to-r from-blue-500 to-indigo-600 text-white font-bold flex items-center justify-center shadow-lg" style={{borderRadius: '50% 30% 60% 40%'}}>
                      {step.number}
                    </div>
                  

                    {/* Icon */}
                    <div className={`w-16 h-16 bg-gradient-to-br ${step.color} flex items-center justify-center mb-6 mt-4 shadow-lg group-hover:scale-110 transition-transform duration-300`} style={{borderRadius: '20px 15px 25px 10px'}}>
                      <IconComponent className="w-8 h-8 text-white" />
                    </div>

                    {/* Content */}
                    <div className="space-y-4">
                      <div>
                        <h3 className="text-2xl font-bold text-slate-800 mb-2 relative">
                          {step.title}
                          <svg className="absolute -bottom-1 left-0 w-24 h-1" viewBox="0 0 96 4" fill="none">
                            <path d="M2 2 Q48 1 94 2" stroke="#3b82f6" strokeWidth="1" strokeLinecap="round" fill="none" opacity="0.6"/>
                          </svg>
                        </h3>
                        <p className="text-sm font-semibold text-slate-600 mb-4">{step.subtitle}</p>
                        <p className="text-slate-700 leading-relaxed">{step.description}</p>
                      </div>

                      {/* Example */}
                      <div className="bg-white/70 backdrop-blur-sm p-4 border-2 border-blue-200" style={{borderRadius: '15px 25px 15px 25px', borderStyle: 'dashed'}}>
                        <div className="flex items-center space-x-2 mb-2">
                          <div className="w-2 h-2 bg-blue-500 rounded-full animate-pulse"></div>
                          <span className="text-xs font-semibold text-slate-600 uppercase tracking-wide">✨ Example</span>
                        </div>
                        <p className="font-semibold text-slate-800 text-sm">{step.example}</p>
                      </div>

                      {/* Features */}
                      <div className="space-y-2">
                        {step.features.map((feature, featureIndex) => (
                          <div key={featureIndex} className="flex items-center space-x-2">
                            <CheckCircle className="w-4 h-4 text-blue-500 flex-shrink-0" />
                            <span className="text-sm text-slate-700 font-medium">{feature}</span>
                          </div>
                        ))}
                      </div>
                    </div>

                  </div>
                </div>
              );
            })}
          </div>
        </div>

      </div>
    </section>
  );
};

export default HowItWorks;