import React from 'react';
import { Download as DownloadIcon, Star, Users, Shield, Zap, ArrowRight, Play, Quote } from 'lucide-react';
import logo from '../assets/logo.png'

const Download: React.FC = () => {
  const stats = [
    { icon: Users, value: '50K+', label: 'Active Users' },
    { icon: Star, value: '4.9', label: 'App Rating' },
    { icon: Shield, value: '100%', label: 'Secure' },
    { icon: Zap, value: '99.9%', label: 'Uptime' },
  ];

  const features = [
    'Voice-powered reminders',
    'Smart AI assistance',
    'Calendar integration',
    'Cross-platform sync',
    'Offline functionality',
    'Privacy-first design'
  ];

  const testimonials = [
    {
      id: 1,
      name: "Sarah Johnson",
      role: "Marketing Manager",
      avatar: "SJ",
      rating: 5,
      text: "TimeTuneAI has completely transformed how I manage my daily tasks. The voice commands are incredibly intuitive!"
    },
    {
      id: 2,
      name: "Mike Chen",
      role: "Software Developer",
      avatar: "MC",
      rating: 5,
      text: "Finally, an AI assistant that actually understands natural language. Setting reminders has never been easier."
    },
    {
      id: 3,
      name: "Emily Rodriguez",
      role: "Project Manager",
      avatar: "ER",
      rating: 5,
      text: "The smart scheduling feature saved me countless hours. It learns my preferences and suggests optimal times."
    },
    {
      id: 4,
      name: "David Thompson",
      role: "Entrepreneur",
      avatar: "DT",
      rating: 5,
      text: "I've tried dozens of reminder apps, but TimeTuneAI is the only one that feels truly intelligent and helpful."
    },
    {
      id: 5,
      name: "Jessica Lee",
      role: "Designer",
      avatar: "JL",
      rating: 5,
      text: "The UI is beautiful and the AI actually helps me stay organized. Worth every penny!"
    },
    {
      id: 6,
      name: "Alex Kumar",
      role: "Student",
      avatar: "AK",
      rating: 5,
      text: "Perfect for managing my study schedule and deadlines. The natural language processing is amazing!"
    }
  ];

  return (
    <section className="py-20 bg-gradient-to-br from-blue-50 via-indigo-50 to-cyan-50 relative overflow-hidden">
      {/* Paper texture overlay */}
      <div className="absolute inset-0 opacity-20" style={{
        backgroundImage: `url("data:image/svg+xml,%3Csvg width='60' height='60' viewBox='0 0 60 60' xmlns='http://www.w3.org/2000/svg'%3E%3Cg fill='none' fill-rule='evenodd'%3E%3Cg fill='%234f46e5' fill-opacity='0.1'%3E%3Ccircle cx='7' cy='7' r='1'/%3E%3Ccircle cx='53' cy='53' r='1'/%3E%3Ccircle cx='13' cy='43' r='1'/%3E%3Ccircle cx='47' cy='17' r='1'/%3E%3C/g%3E%3C/g%3E%3C/svg%3E")`
      }}></div>

      {/* Background Elements */}
      <div className="absolute inset-0">
        <div className="absolute top-20 left-10 w-72 h-72 bg-gradient-to-r from-blue-400/20 to-indigo-400/20 rounded-full blur-3xl animate-pulse"></div>
        <div className="absolute bottom-20 right-10 w-96 h-96 bg-gradient-to-r from-indigo-400/20 to-purple-400/20 rounded-full blur-3xl animate-pulse" style={{ animationDelay: '2s' }}></div>
        <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-64 h-64 bg-gradient-to-r from-cyan-400/10 to-blue-400/10 rounded-full blur-2xl animate-bounce" style={{ animationDuration: '6s' }}></div>
        
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
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
          
          {/* Left Side - Content */}
          <div className="text-center lg:text-left space-y-8">
            {/* Badge */}
            <div className="inline-flex items-center space-x-2 bg-white/80 backdrop-blur-sm px-4 py-2 border-2 border-blue-300 shadow-lg" style={{
              borderRadius: '25px 15px 30px 20px',
              boxShadow: '3px 3px 0px rgba(59, 130, 246, 0.3)'
            }}>
              <DownloadIcon className="w-4 h-4 text-blue-500" />
              <span className="text-sm font-semibold text-slate-700">📱 Available Now</span>
            </div>

            {/* Main Headline */}
            <div className="space-y-4">
              <h2 className="text-4xl md:text-5xl lg:text-6xl font-black leading-tight">
                <span className="block text-slate-800 relative">
                  Download
                  <svg className="absolute -bottom-2 left-0 w-full h-3" viewBox="0 0 200 12" fill="none">
                    <path d="M5 8 Q100 2 195 8" stroke="#3b82f6" strokeWidth="3" strokeLinecap="round" fill="none" opacity="0.6"/>
                  </svg>
                </span>
                <span className="block bg-gradient-to-r from-blue-500 via-indigo-500 to-purple-500 bg-clip-text text-transparent relative">
                  TimeTuneAI
                  <svg className="absolute -top-8 -right-8 w-16 h-16 text-blue-400 opacity-60" viewBox="0 0 64 64" fill="none" stroke="currentColor" strokeWidth="2">
                    <path d="M32 8 L40 24 L56 24 L44 36 L48 52 L32 44 L16 52 L20 36 L8 24 L24 24 Z" strokeDasharray="2,2"/>
                  </svg>
                </span>
                <span className="block text-slate-800">Today! 🚀</span>
              </h2>
              <p className="text-xl md:text-2xl text-slate-600 max-w-2xl leading-relaxed">
                Join thousands who have transformed their productivity. Get the{' '}
                <span className="text-blue-600 font-semibold">app</span>{' '}
                and never miss anything important again. ✨
              </p>
            </div>

            {/* Stats Grid */}
            <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 py-6">
              {stats.map((stat, index) => {
                const IconComponent = stat.icon;
                return (
                  <div key={index} className="text-center p-4 bg-white/60 backdrop-blur-sm border-2 border-blue-200 hover:bg-white/80 transition-all duration-300 shadow-lg hover:scale-105" style={{
                    borderRadius: index % 2 === 0 ? '20px 15px 25px 10px' : '15px 25px 10px 20px'
                  }}>
                    <IconComponent className="w-6 h-6 text-blue-500 mx-auto mb-2" />
                    <div className="text-2xl font-bold text-slate-800">{stat.value}</div>
                    <div className="text-sm text-slate-600 font-medium">{stat.label}</div>
                  </div>
                );
              })}
            </div>

            {/* Features List */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 py-4">
              {features.map((feature, index) => (
                <div key={index} className="flex items-center space-x-3">
                  <div className="w-2 h-2 bg-gradient-to-r from-blue-500 to-indigo-500 rounded-full"></div>
                  <span className="text-slate-700 font-medium">{feature}</span>
                </div>
              ))}
            </div>

            {/* Download Buttons */}
            <div className="flex flex-col sm:flex-row gap-4 pt-4">
              <a 
                href="https://play.google.com/store" 
                target="_blank" 
                rel="noopener noreferrer"
                className="group relative px-8 py-4 bg-gradient-to-r from-blue-500 to-indigo-600 text-white font-bold shadow-xl hover:shadow-2xl transform hover:scale-105 transition-all duration-300 overflow-hidden"
                style={{
                  borderRadius: '25px 15px 30px 20px',
                  boxShadow: '4px 4px 0px rgba(59, 130, 246, 0.4)'
                }}
              >
                <div className="absolute inset-0 bg-gradient-to-r from-blue-600 to-indigo-700 opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
                <div className="relative flex items-center justify-center space-x-3">
                  <DownloadIcon className="w-6 h-6" />
                  <span className="text-lg">📱 Download for Android</span>
                  <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform duration-300" />
                </div>
              </a>
              
              <button className="group px-8 py-4 bg-white/80 backdrop-blur-sm text-slate-800 font-bold border-2 border-blue-400 hover:border-indigo-500 hover:bg-blue-50 transition-all duration-300 flex items-center justify-center space-x-3" style={{
                borderRadius: '20px 30px 15px 25px',
                borderStyle: 'dashed'
              }}>
                <Play className="w-5 h-5 text-blue-500" />
                <span>📖 Watch Demo</span>
              </button>
            </div>

            {/* Trust Indicators */}
            <div className="flex flex-col sm:flex-row items-center justify-center lg:justify-start space-y-4 sm:space-y-0 sm:space-x-8 pt-6">
              <div className="flex items-center space-x-2">
                <Shield className="w-5 h-5 text-blue-500" />
                <span className="text-sm text-slate-600 font-medium">🔒 100% Secure Download</span>
              </div>
              <div className="flex items-center space-x-2">
                <Star className="w-5 h-5 text-indigo-500 fill-current" />
                <span className="text-sm text-slate-600 font-medium">⭐ No Ads or Tracking</span>
              </div>
              <div className="flex items-center space-x-2">
                <Zap className="w-5 h-5 text-cyan-500" />
                <span className="text-sm text-slate-600 font-medium">⚡ Instant Setup</span>
              </div>
            </div>
          </div>

          {/* Right Side - Testimonials */}
          <div className="space-y-6">
            <div className="text-center lg:text-left mb-8">
              <h3 className="text-2xl font-bold text-slate-800 mb-2 relative">
                What Our Users Say ✨
                <svg className="absolute -bottom-1 left-0 w-32 h-1" viewBox="0 0 128 4" fill="none">
                  <path d="M2 2 Q64 1 126 2" stroke="#3b82f6" strokeWidth="1" strokeLinecap="round" fill="none" opacity="0.6"/>
                </svg>
              </h3>
              <p className="text-slate-600">Join thousands of satisfied users who love TimeTuneAI 💙</p>
            </div>

               {/* App Store Badge */}
               <div className="text-center mt-8 p-6 bg-white/60 backdrop-blur-sm border-2 border-blue-200 shadow-lg" style={{
                 borderRadius: '25px 15px 30px 20px',
                 boxShadow: '4px 4px 0px rgba(59, 130, 246, 0.2)'
               }}>
              {/* Decorative corner elements */}
              <div className="absolute top-2 left-2 w-3 h-3 bg-blue-400 opacity-40 rounded-full"></div>
              <div className="absolute top-2 right-2 w-2 h-2 bg-indigo-400 opacity-50 transform rotate-45"></div>
              <div className="absolute bottom-2 right-2 w-4 h-4 border-2 border-cyan-400 opacity-30 transform rotate-12" style={{borderRadius: '40% 60%'}}></div>

              <div className="flex items-center justify-center space-x-4 mb-4">
                <div className="w-16 h-16 flex items-center justify-center shadow-lg border-2 border-blue-200" style={{borderRadius: '20px 15px 25px 10px'}}>
                  <img src={logo} className="w-16 h-16" alt="TimeTuneAI Logo" />
                </div>
                <div className="text-left">
                  <h4 className="text-xl font-bold text-slate-800">TimeTuneAI</h4>
                  <p className="text-slate-600 font-medium">📱 Productivity App</p>
                </div>
              </div>
              
              <div className="flex items-center justify-center space-x-2 mb-4">
                <div className="flex space-x-1">
                  {[1, 2, 3, 4, 5].map((i) => (
                    <Star key={i} className="w-5 h-5 text-blue-500 fill-current" />
                  ))}
                </div>
                <span className="text-slate-800 font-bold">4.9</span>
                <span className="text-slate-600 font-medium">(2,847 reviews)</span>
              </div>

              <div className="grid grid-cols-3 gap-4 text-sm text-slate-600">
                <div className="text-center">
                  <div className="font-bold text-slate-800">12.4 MB</div>
                  <div>Size</div>
                </div>
                <div className="text-center">
                  <div className="font-bold text-slate-800">Productivity</div>
                  <div>Category</div>
                </div>
                <div className="text-center">
                  <div className="font-bold text-slate-800">Android 6.0+</div>
                  <div>Compatibility</div>
                </div>
              </div>
            </div>

            {/* Testimonials Grid */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 max-h-[600px] overflow-y-auto pr-2">
              {testimonials.map((testimonial) => (
                <div key={testimonial.id} className="bg-white/80 backdrop-blur-sm p-6 border-2 border-blue-200 shadow-lg hover:shadow-xl transition-all duration-300 hover:scale-105 relative" style={{
                  borderRadius: testimonial.id % 2 === 0 ? '25px 15px 30px 20px' : '20px 30px 15px 25px',
                  boxShadow: '3px 3px 0px rgba(59, 130, 246, 0.2)'
                }}>
                  {/* Decorative corner elements */}
                  <div className="absolute top-2 left-2 w-2 h-2 bg-blue-400 opacity-40 rounded-full"></div>
                  <div className="absolute top-2 right-2 w-3 h-3 border border-indigo-400 opacity-30 transform rotate-45"></div>

                  {/* Quote Icon */}
                  <div className="flex items-center justify-between mb-4">
                    <Quote className="w-6 h-6 text-blue-500" />
                    <div className="flex space-x-1">
                      {[...Array(testimonial.rating)].map((_, i) => (
                        <Star key={i} className="w-4 h-4 text-blue-500 fill-current" />
                      ))}
                    </div>
                  </div>

                  {/* Testimonial Text */}
                  <p className="text-slate-700 mb-4 text-sm leading-relaxed font-medium">
                    "{testimonial.text}"
                  </p>

                  {/* User Info */}
                  <div className="flex items-center space-x-3">
                    <div className="w-10 h-10 bg-gradient-to-r from-blue-500 to-indigo-500 flex items-center justify-center text-white font-bold text-sm" style={{borderRadius: '50% 30% 60% 40%'}}>
                      {testimonial.avatar}
                    </div>
                    <div>
                      <div className="font-bold text-slate-800 text-sm">{testimonial.name}</div>
                      <div className="text-slate-600 text-xs font-medium">{testimonial.role}</div>
                    </div>
                  </div>
                </div>
              ))}
            </div>

         
          </div>
        </div>
      </div>
    </section>
  );
};

export default Download;