import React, { useState } from 'react';
import { ChevronDown, ChevronUp, Sparkles, Code, FileText, Zap, PenTool } from 'lucide-react';

const FAQItem = ({ question, answer, icon: Icon, index }) => {
  const [isOpen, setIsOpen] = useState(false);
  
  const answerParagraphs = typeof answer === 'string' ? answer.split('\n') : [answer];

  return (
    <div className="group border-b-2 border-amber-200 px-6 last:border-b-0 hover:bg-amber-50/50 transition-all duration-300">
      <button
        className="flex justify-between items-center w-full py-6 text-left"
        onClick={() => setIsOpen(!isOpen)}
      >
        <div className="flex items-center gap-4">
          <div className={`flex-shrink-0 w-12 h-12 bg-gradient-to-br ${
            index % 4 === 0 ? 'from-amber-200 to-orange-200 border-2 border-amber-400' :
            index % 4 === 1 ? 'from-emerald-200 to-green-200 border-2 border-emerald-400' :
            index % 4 === 2 ? 'from-blue-200 to-cyan-200 border-2 border-blue-400' :
            'from-pink-200 to-purple-200 border-2 border-pink-400'
          } flex items-center justify-center group-hover:scale-110 transition-transform duration-300`} style={{
            borderRadius: index % 2 === 0 ? '15px 10px 20px 15px' : '10px 20px 15px 25px'
          }}>
            <Icon className={`h-6 w-6 ${
              index % 4 === 0 ? 'text-amber-600' :
              index % 4 === 1 ? 'text-emerald-600' :
              index % 4 === 2 ? 'text-blue-600' :
              'text-pink-600'
            }`} />
          </div>
          <h3 className="text-lg font-bold text-slate-800 group-hover:text-amber-700 transition-colors duration-300">
            {question}
          </h3>
        </div>
        <span className="ml-6 flex-shrink-0">
          {isOpen ? (
            <ChevronUp className="h-5 w-5 text-slate-600 group-hover:text-amber-600 transition-colors duration-300" />
          ) : (
            <ChevronDown className="h-5 w-5 text-slate-600 group-hover:text-amber-600 transition-colors duration-300" />
          )}
        </span>
      </button>
      {isOpen && (
        <div className="pb-6 text-slate-700 space-y-3 ml-16 animate-fadeIn">
          {answerParagraphs.map((paragraph, pIndex) => (
            <p key={pIndex} className="leading-relaxed text-slate-700">
              {paragraph}
            </p>
          ))}
        </div>
      )}
    </div>
  );
};

const FAQ = () => {
  const faqs = [
    {
      question: "How does the AI Frontend Engineer work? 🤖",
      answer: "Our AI Frontend Engineer is your intelligent web creation assistant that understands modern design principles and coding best practices. Simply provide a URL, GitHub repository, idea, or Markdown file, and it instantly generates production-ready HTML, CSS, and React code. The AI analyzes your requirements and applies cutting-edge design patterns to create stunning, functional websites without you writing a single line of code. It's like having a senior developer and designer working 24/7 just for you! ✨",
      icon: Sparkles
    },
    {
      question: "What can I build with this AI assistant? 🎨",
      answer: `Transform any idea into a professional website in minutes:\n• **SEO-Friendly Blogs:** Generate optimized blog layouts with your content and branding 📝\n• **GitHub Documentation:** Convert repositories into beautiful, searchable documentation sites 📚\n• **Landing Pages:** Create high-converting marketing pages from your specifications 🚀\n• **Website Redesigns:** Upload any URL and get modern, responsive redesigns 🎯\n• **Template Customization:** Apply professional templates to your existing content 🎪\n• **Marketing Pages:** Build conversion-focused pages with AI-optimized layouts 💰`,
      icon: Code
    },
    {
      question: "How do I create documentation from my GitHub repository? 📚",
      answer: "Creating professional documentation is incredibly simple! Just paste your public GitHub repository URL, and our AI will analyze your README, code structure, and project files to generate a complete documentation website. The AI understands code patterns, API structures, and technical writing best practices to create searchable, well-organized docs that make your project shine. You can also upload Markdown files directly for custom documentation needs. It's like having a technical writer who never sleeps! 🌙",
      icon: FileText
    },
    {
      question: "What makes this different from other website builders? ⚡",
      answer: "Unlike traditional drag-and-drop builders, our AI Frontend Engineer thinks like a professional developer and designer. It doesn't just arrange blocks—it understands your content, analyzes modern design trends, and generates clean, semantic code that's actually maintainable. You get production-ready React components and HTML/CSS that you can deploy anywhere, modify, or hand off to developers. Plus, it specializes in technical content like GitHub docs and SEO-optimized blogs. It's the difference between using building blocks and having a master craftsman! 🏗️",
      icon: Zap
    },
    {
      question: "Can I customize the generated websites and export the code? 💻",
      answer: "Absolutely! Every website generated comes with complete, production-ready source code in both React.js and HTML/CSS formats. The code is clean, well-structured, and follows modern web standards, making it easy for you or your developers to customize further. You own the code completely—deploy it on any platform, modify the design, add features, or integrate it into larger projects. No vendor lock-in, no limitations. It's your code, your way! 🎯",
      icon: Code
    },
    {
      question: "How does the AI handle SEO and performance optimization? 🚀",
      answer: "Our AI Frontend Engineer automatically implements SEO best practices and performance optimizations in every generated website. This includes semantic HTML structure, proper meta tags, optimized images, fast loading times, mobile responsiveness, and clean URL structures. For blogs, it generates SEO-friendly content layouts with proper heading hierarchies and schema markup. Your sites are built to rank well and load fast from day one. It's like having an SEO expert and performance engineer built right in! 📈",
      icon: Sparkles
    },
    {
      question: "Can I redesign existing websites or work with templates? 🎨",
      answer: "Yes! Paste any website URL and choose from multiple redesign options—get three unique design variations or specify your preferred theme (light, dark, or let AI choose). You can also start with professional templates and either apply them to your existing site's content or customize them with specific instructions. The AI understands how to preserve your content while applying modern design patterns and improved user experience. It's like having a design team that works in minutes, not weeks! ⏰",
      icon: Zap
    }
  ];

  return (
    <section id="faq" className="py-24 relative overflow-hidden bg-gradient-to-br from-orange-50 via-amber-50 to-yellow-50">
      {/* Paper texture overlay */}
      <div className="absolute inset-0 opacity-20" style={{
        backgroundImage: `url("data:image/svg+xml,%3Csvg width='40' height='40' viewBox='0 0 40 40' xmlns='http://www.w3.org/2000/svg'%3E%3Cg fill='%23d4a574' fill-opacity='0.15'%3E%3Cpath d='M20 20c0-5.5-4.5-10-10-10s-10 4.5-10 10 4.5 10 10 10 10-4.5 10-10zm10 0c0-5.5-4.5-10-10-10s-10 4.5-10 10 4.5 10 10 10 10-4.5 10-10z'/%3E%3C/g%3E%3C/svg%3E")`
      }}></div>
      
      {/* Hand-drawn decorative elements */}
      <div className="absolute top-1/4 right-1/6 w-24 h-24 border-2 border-amber-400 opacity-30 transform rotate-12" style={{
        borderRadius: '60% 40% 70% 30%',
        borderStyle: 'dashed'
      }}></div>
      <div className="absolute bottom-1/3 left-1/6 w-20 h-20 border-2 border-orange-400 opacity-25 transform -rotate-12" style={{
        borderRadius: '40% 60% 30% 70%',
        borderStyle: 'dotted'
      }}></div>
      <div className="absolute top-1/2 right-1/2 w-16 h-16 border-3 border-yellow-400 opacity-20 transform rotate-45" style={{
        borderRadius: '50% 30% 60% 40%',
        borderStyle: 'dashed'
      }}></div>
      
      {/* Sketchy arrows and stars */}
      <div className="absolute top-20 left-10 text-amber-500 opacity-40 transform rotate-45">
        <svg width="32" height="32" viewBox="0 0 32 32" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round">
          <path d="M4 16 L28 16 M20 8 L28 16 L20 24" strokeDasharray="2,2"/>
        </svg>
      </div>
      
      <div className="absolute top-1/3 right-1/5 text-orange-500 opacity-50">
        <svg width="20" height="20" viewBox="0 0 20 20" fill="none" stroke="currentColor" strokeWidth="2">
          <path d="M10 2 L12.5 7.5 L18 7.5 L14 11.5 L15.5 18 L10 15 L4.5 18 L6 11.5 L2 7.5 L7.5 7.5 Z" strokeDasharray="1,1"/>
        </svg>
      </div>
      
      <div className="container mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <div className="max-w-4xl mx-auto">
          <div className="text-center mb-20">
            {/* Badge */}
            <div className="inline-block px-6 py-2 mb-6 bg-white/80 backdrop-blur-sm border-2 border-amber-300 shadow-lg" style={{
              borderRadius: '25px 15px 30px 20px'
            }}>
              <span className="text-amber-700 text-sm font-semibold flex items-center gap-2">
                <PenTool className="h-4 w-4" />
                🤖 AI Frontend Engineer FAQ
              </span>
            </div>
            
            <h2 className="text-3xl sm:text-4xl lg:text-5xl font-bold mb-6 leading-tight text-slate-800">
              Frequently Asked{' '}
              <span className="bg-gradient-to-r from-amber-500 to-orange-500 bg-clip-text text-transparent relative">
                Questions
                <svg className="absolute -bottom-2 left-0 w-full h-3" viewBox="0 0 200 12" fill="none">
                  <path d="M5 8 Q100 4 195 8" stroke="#f59e0b" strokeWidth="2" strokeLinecap="round" fill="none" opacity="0.6"/>
                </svg>
              </span>
            </h2>
            <p className="text-slate-600 text-lg md:text-xl leading-relaxed max-w-3xl mx-auto">
              Everything you need to know about building stunning websites, GitHub docs, and SEO blogs with your{' '}
              <span className="text-amber-600 font-semibold">AI Frontend Engineer</span>
              . Get instant answers about features, customization, and code export. ✨
            </p>
          </div>
          
          <div className="bg-white/90 backdrop-blur-sm border-3 border-amber-300 overflow-hidden shadow-2xl" style={{
            borderRadius: '30px 20px 35px 25px'
          }}>
            {faqs.map((faq, index) => (
              <FAQItem 
                key={index} 
                question={faq.question} 
                answer={faq.answer}
                icon={faq.icon}
                index={index}
              />
            ))}
          </div>
          
          <div className="text-center mt-12">
            <p className="text-slate-600 mb-6 text-lg">
              Ready to build something amazing with AI? 🎨
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center items-center">
              <button className="group relative px-8 py-3 bg-gradient-to-r from-amber-400 to-orange-500 text-white font-bold shadow-lg hover:shadow-amber-500/25 transform hover:scale-105 transition-all duration-300 overflow-hidden" style={{
                borderRadius: '25px 15px 30px 20px',
                boxShadow: '4px 4px 0px rgba(245, 158, 11, 0.4)'
              }}>
                <div className="absolute inset-0 bg-gradient-to-r from-amber-500 to-orange-600 opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
                <span className="relative z-10 flex items-center gap-2">
                  🚀 Start Building Now
                </span>
              </button>
              
              <button className="group px-8 py-3 border-2 border-slate-400 text-slate-700 font-bold hover:border-amber-400 hover:text-amber-700 hover:bg-amber-50 transition-all duration-300" style={{
                borderRadius: '20px 25px 15px 30px',
                borderStyle: 'dashed'
              }}>
                <span className="flex items-center gap-2">
                  💬 Contact Support
                  <svg className="w-4 h-4 group-hover:translate-x-1 transition-transform duration-300" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                  </svg>
                </span>
              </button>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default FAQ;