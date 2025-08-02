import { useEffect, useRef, useState } from 'react';
import {
  FileText,
  Palette,
  BookOpen,
  User,
  Clock,
  Sparkles,
  PenTool
} from 'lucide-react';
import web5labNew from '../assets/web5labDark.webp';
import web5labOld from '../assets/web5labOld.webp';
import docNew from '../assets/docNew.png'
import docOld from '../assets/docOld.png'
import portfolioNew from '../assets/portfolioNew.png';
import portfolioOld from '../assets/portfolioOld.png';
import blogNew from '../assets/blogNew.png';

const ProblemSolution = () => {
  const sectionRef = useRef(null);
  const [activeTab, setActiveTab] = useState('redesign');

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          sectionRef.current?.classList.add('section-enter-active');
          sectionRef.current?.classList.remove('section-enter');
          observer.disconnect();
        }
      },
      { threshold: 0.1 }
    );

    if (sectionRef.current) {
      sectionRef.current.classList.add('section-enter');
      observer.observe(sectionRef.current);
    }

    return () => observer.disconnect();
  }, []);

  const capabilities = [
    {
      id: 'redesign',
      icon: <Palette className="h-6 w-6" />,
      title: 'Website Redesign',
      description: 'Transform any existing website',
      oldTitle: 'Outdated & Slow',
      oldDesc: 'Legacy websites with poor UX, slow loading times, and outdated designs that drive visitors away.',
      newTitle: 'Modern & Fast',
      newDesc: 'Lightning-fast, responsive designs with intuitive navigation and conversion-optimized layouts.',
      oldImage: web5labOld,
      newImage: web5labNew,
      stats: ['3x faster loading', '65% better conversion', 'Mobile-first design']
    },
    {
      id: 'portfolio',
      icon: <User className="h-6 w-6" />,
      title: 'Portfolio Sites',
      description: 'Create stunning professional portfolios',
      oldTitle: 'Generic & Forgettable',
      oldDesc: 'Cookie-cutter portfolio templates that fail to showcase your unique skills and personality.',
      newTitle: 'Unique & Memorable',
      newDesc: 'Custom-designed portfolios that tell your story and make you stand out from the competition.',
      oldImage: portfolioOld,
      newImage: portfolioNew,
      stats: ['Interactive showcases', 'Personal branding', 'Contact integration']
    },
    {
      id: 'docs',
      icon: <FileText className="h-6 w-6" />,
      title: 'Docs Generator',
      description: 'Generate stunning documentation from your codebase',
      oldTitle: 'Raw Repository Code',
      oldDesc: 'Unstructured source files that are difficult to navigate and understand.',
      newTitle: 'Developer-Friendly Docs',
      newDesc: 'Clean, structured, and interactive docs with search, examples, and better onboarding.',
      oldImage: docOld,
      newImage: docNew,
      stats: ['AI-powered', 'Code-aware formatting', 'Live previews']
    },
    {
      id: 'blog',
      icon: <BookOpen className="h-6 w-6" />,
      title: 'Instant Blogging',
      description: 'Launch professional blogs in minutes',
      oldTitle: 'Complex Setup',
      oldDesc: 'Hours of configuration, plugin management, and design tweaking before you can start writing.',
      newTitle: 'Write Immediately',
      newDesc: 'AI-powered blog setup with SEO optimization, responsive design, and content management built-in.',
      oldImage: 'https://images.unsplash.com/photo-1486312338219-ce68d2c6f44d?w=800&h=600&fit=crop&sat=-100',
      newImage: blogNew,
      stats: ['SEO optimized', 'Content templates', 'Analytics ready']
    }
  ];

  const activeCapability = capabilities.find(cap => cap.id === activeTab) || capabilities[0];

  return (
    <section ref={sectionRef} className="py-20 md:py-28 relative overflow-hidden bg-gradient-to-br from-orange-50 via-amber-50 to-yellow-50">
      {/* Paper texture overlay */}
      <div className="absolute inset-0 opacity-20" style={{
        backgroundImage: `url("data:image/svg+xml,%3Csvg width='40' height='40' viewBox='0 0 40 40' xmlns='http://www.w3.org/2000/svg'%3E%3Cg fill='%23d4a574' fill-opacity='0.15'%3E%3Cpath d='M20 20c0-5.5-4.5-10-10-10s-10 4.5-10 10 4.5 10 10 10 10-4.5 10-10zm10 0c0-5.5-4.5-10-10-10s-10 4.5-10 10 4.5 10 10 10 10-4.5 10-10z'/%3E%3C/g%3E%3C/svg%3E")`
      }}></div>

      {/* Hand-drawn decorative elements */}
      <div className="absolute top-1/4 right-1/4 w-32 h-32 border-3 border-amber-300 opacity-30 transform rotate-12" style={{
        borderRadius: '60% 40% 70% 30%',
        borderStyle: 'dashed'
      }}></div>
      <div className="absolute bottom-1/2 left-1/4 w-24 h-24 border-2 border-orange-400 opacity-25 transform -rotate-12" style={{
        borderRadius: '40% 60% 30% 70%',
        borderStyle: 'dotted'
      }}></div>

      <div className="container mx-auto px-6 relative z-10">
        {/* Header */}
        <div className="text-center mb-16 md:mb-20">
          <div className="inline-block px-6 py-2 mb-6 bg-white/80 backdrop-blur-sm border-2 border-amber-300 shadow-lg" style={{
            borderRadius: '25px 15px 30px 20px'
          }}>
            <span className="text-amber-700 text-sm font-semibold flex items-center gap-2">
              <PenTool className="h-4 w-4" />
              Transform Any Digital Presence
            </span>
          </div>
          <h2 className="text-3xl md:text-5xl font-bold text-slate-800 mb-4">
            From <span className="bg-gradient-to-r from-red-500 to-orange-500 bg-clip-text text-transparent relative">
              Outdated
              <svg className="absolute -bottom-2 left-0 w-full h-3" viewBox="0 0 200 12" fill="none">
                <path d="M5 8 Q100 4 195 8" stroke="#ef4444" strokeWidth="2" strokeLinecap="round" fill="none" opacity="0.6"/>
              </svg>
            </span> to{' '}
            <span className="bg-gradient-to-r from-emerald-500 to-green-500 bg-clip-text text-transparent relative">
              Outstanding
              <svg className="absolute -bottom-2 left-0 w-full h-3" viewBox="0 0 200 12" fill="none">
                <path d="M5 8 Q100 4 195 8" stroke="#10b981" strokeWidth="2" strokeLinecap="round" fill="none" opacity="0.6"/>
              </svg>
            </span>
          </h2>
          <p className="text-lg md:text-xl text-slate-600 max-w-3xl mx-auto leading-relaxed">
            Whether it's a website redesign, portfolio creation, documentation, or instant blogging -
            your AI buddy transforms any digital project in minutes, not hours. ✨
          </p>
        </div>

        {/* Capability Tabs */}
        <div className="flex flex-wrap justify-center gap-3 mb-12">
          {capabilities.map((cap, index) => (
            <button
              key={cap.id}
              onClick={() => setActiveTab(cap.id)}
              className={`flex items-center gap-2 px-6 py-3 font-semibold transition-all duration-300 transform hover:scale-105 ${
                activeTab === cap.id
                  ? 'bg-gradient-to-r from-amber-400 to-orange-500 text-white shadow-lg'
                  : 'bg-white text-slate-700 hover:bg-amber-50 border-2 border-slate-300 hover:border-amber-400'
              }`}
              style={{
                borderRadius: index % 2 === 0 ? '20px 10px 25px 15px' : '15px 25px 10px 20px',
                boxShadow: activeTab === cap.id ? '4px 4px 0px rgba(245, 158, 11, 0.3)' : '2px 2px 0px rgba(148, 163, 184, 0.2)'
              }}
            >
              {cap.icon}
              <span className="font-semibold">{cap.title}</span>
            </button>
          ))}
        </div>

        {/* Main Comparison */}
        <div className="grid md:grid-cols-2 gap-8 md:gap-12 items-center mb-16">
          {/* Before */}
          <div className="relative group">
            <div className="absolute -inset-2 bg-gradient-to-r from-red-200 to-orange-200 opacity-75 group-hover:opacity-100 transition duration-1000" style={{
              borderRadius: '30px 20px 35px 25px'
            }}></div>
            <div className="relative p-6 md:p-8 bg-white/90 backdrop-blur-sm border-3 border-red-300" style={{
              borderRadius: '25px 15px 30px 20px'
            }}>
              <div className="flex items-center mb-4">
                <div className="p-3 bg-red-100 mr-4" style={{borderRadius: '15px 10px 20px 15px'}}>
                  <Clock className="h-6 w-6 text-red-500" />
                </div>
                <h3 className="text-2xl font-bold text-red-600">{activeCapability.oldTitle}</h3>
              </div>
              <p className="text-slate-700 mb-6 leading-relaxed">{activeCapability.oldDesc}</p>
              <div className="relative overflow-hidden" style={{borderRadius: '20px 15px 25px 10px'}}>
                <img
                  src={activeCapability.oldImage}
                  alt="Before transformation"
                  loading="lazy"
                  className="w-full h-64 object-cover opacity-70"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-red-900/40 to-transparent"></div>
              </div>
              <div className="mt-4 flex flex-wrap gap-2">
                {['Slow loading', 'Poor UX', 'Outdated design'].map((issue, idx) => (
                  <span key={idx} className="px-3 py-1 bg-red-100 text-red-600 text-sm font-medium" style={{
                    borderRadius: '15px 10px 15px 10px'
                  }}>
                    ❌ {issue}
                  </span>
                ))}
              </div>
            </div>
          </div>

          {/* After */}
          <div className="relative group">
            <div className="absolute -inset-2 bg-gradient-to-r from-emerald-200 to-green-200 opacity-75 group-hover:opacity-100 transition duration-1000" style={{
              borderRadius: '30px 20px 35px 25px'
            }}></div>
            <div className="relative p-6 md:p-8 bg-white/90 backdrop-blur-sm border-3 border-emerald-300" style={{
              borderRadius: '25px 15px 30px 20px'
            }}>
              <div className="flex items-center mb-4">
                <div className="p-3 bg-emerald-100 mr-4" style={{borderRadius: '15px 10px 20px 15px'}}>
                  <Sparkles className="h-6 w-6 text-emerald-500" />
                </div>
                <h3 className="text-2xl font-bold text-emerald-600">{activeCapability.newTitle}</h3>
              </div>
              <p className="text-slate-700 mb-6 leading-relaxed">{activeCapability.newDesc}</p>
              <div className="relative overflow-hidden" style={{borderRadius: '20px 15px 25px 10px'}}>
                <img
                  src={activeCapability.newImage}
                  alt="After transformation"
                  loading="lazy"
                  className="w-full h-64 object-cover"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-emerald-900/20 to-transparent"></div>
              </div>
              <div className="mt-4 flex flex-wrap gap-2">
                {activeCapability.stats.map((stat, idx) => (
                  <span key={idx} className="px-3 py-1 bg-emerald-100 text-emerald-600 text-sm font-medium" style={{
                    borderRadius: '15px 10px 15px 10px'
                  }}>
                    ✅ {stat}
                  </span>
                ))}
              </div>
            </div>
          </div>
        </div>

        {/* Hand-drawn CTA */}
        <div className="text-center">
          <div className="inline-block p-8 bg-gradient-to-r from-amber-50 to-orange-50 border-3 border-amber-300" style={{
            borderRadius: '30px 20px 35px 25px',
            borderStyle: 'dashed'
          }}>
            <h3 className="text-2xl font-bold text-slate-800 mb-4">
              Ready to Transform Your Digital Presence? 🎨
            </h3>
            <p className="text-slate-600 mb-6 max-w-2xl">
              Join thousands of creators who've already discovered the magic of AI-powered web design.
              No coding skills required - just pure creative freedom!
            </p>
            <button className="bg-gradient-to-r from-amber-400 to-orange-500 text-white px-8 py-4 font-bold text-lg shadow-lg transform hover:scale-105 transition-all duration-300" style={{
              borderRadius: '25px 15px 30px 20px',
              boxShadow: '4px 4px 0px rgba(245, 158, 11, 0.4)'
            }}>
              🚀 Start Creating Now
            </button>
          </div>
        </div>
      </div>
    </section>
  );
};

export default ProblemSolution;