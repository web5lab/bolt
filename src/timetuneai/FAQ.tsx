import React, { useState } from 'react';
import { ChevronDown } from 'lucide-react';

const FAQ: React.FC = () => {
  const [openIndex, setOpenIndex] = useState<number | null>(null);

  const faqs = [
    {
      question: "How does TimeTuneAI understand natural language?",
      answer: "TimeTuneAI leverages advanced AI and Machine Learning models trained on vast datasets of spoken and written language. This allows it to accurately interpret your requests, extract key information like dates, times, and tasks, and set reminders precisely as you intend."
    },
    {
      question: "Is TimeTuneAI available on iOS?",
      answer: "Currently, TimeTuneAI is exclusively available on Android. We are continuously evaluating user demand and may consider developing an iOS version in the future. Stay tuned for updates!"
    },
    {
      question: "How does the AI handle recurring reminders?",
      answer: "Simply tell TimeTuneAI the recurrence pattern. For example, \"Remind me every Monday at 9 AM to check emails\" or \"Remind me daily at noon to take my medication.\" The AI will set up the recurring reminder automatically."
    },
    {
      question: "Is my data private and secure with TimeTuneAI?",
      answer: "Yes, absolutely. We prioritize your privacy and data security. All your data is encrypted both in transit and at rest. We do not share your personal data with third parties. You can review our full privacy policy within the app."
    }
  ];

  const toggleFAQ = (index: number) => {
    setOpenIndex(openIndex === index ? null : index);
  };

  return (
    <section id="faq" className="py-20 bg-gradient-to-br from-blue-50 via-indigo-50 to-cyan-50 relative overflow-hidden">
      {/* Paper texture overlay */}
      <div className="absolute inset-0 opacity-20" style={{
        backgroundImage: `url("data:image/svg+xml,%3Csvg width='40' height='40' viewBox='0 0 40 40' xmlns='http://www.w3.org/2000/svg'%3E%3Cg fill='%234f46e5' fill-opacity='0.15'%3E%3Cpath d='M20 20c0-5.5-4.5-10-10-10s-10 4.5-10 10 4.5 10 10 10 10-4.5 10-10zm10 0c0-5.5-4.5-10-10-10s-10 4.5-10 10 4.5 10 10 10 10-4.5 10-10z'/%3E%3C/g%3E%3C/svg%3E")`
      }}></div>

      {/* Hand-drawn decorative elements */}
      <div className="absolute top-1/4 right-1/6 w-24 h-24 border-2 border-blue-400 opacity-30 transform rotate-12" style={{
        borderRadius: '60% 40% 70% 30%',
        borderStyle: 'dashed'
      }}></div>
      <div className="absolute bottom-1/3 left-1/6 w-20 h-20 border-2 border-indigo-400 opacity-25 transform -rotate-12" style={{
        borderRadius: '40% 60% 30% 70%',
        borderStyle: 'dotted'
      }}></div>
      <div className="absolute top-1/2 right-1/2 w-16 h-16 border-3 border-cyan-400 opacity-20 transform rotate-45" style={{
        borderRadius: '50% 30% 60% 40%',
        borderStyle: 'dashed'
      }}></div>

      <div className="container mx-auto px-6 text-center">
        <div className="mb-16">
          {/* Badge */}
          <div className="inline-block px-6 py-2 mb-6 bg-white/80 backdrop-blur-sm border-2 border-blue-300 shadow-lg" style={{
            borderRadius: '25px 15px 30px 20px',
            boxShadow: '3px 3px 0px rgba(59, 130, 246, 0.3)'
          }}>
            <span className="text-blue-700 text-sm font-semibold">❓ Frequently Asked Questions</span>
          </div>

          <h2 className="text-4xl md:text-5xl font-bold text-slate-800 mb-6 relative">
            Got{' '}
            <span className="bg-gradient-to-r from-blue-500 to-indigo-500 bg-clip-text text-transparent relative">
              Questions?
              <svg className="absolute -bottom-2 left-0 w-full h-3" viewBox="0 0 200 12" fill="none">
                <path d="M5 8 Q100 4 195 8" stroke="#3b82f6" strokeWidth="2" strokeLinecap="round" fill="none" opacity="0.6"/>
              </svg>
            </span>{' '}
            We've Got Answers! ✨
          </h2>
          <p className="text-xl text-slate-600 mb-8 max-w-3xl mx-auto leading-relaxed">
            Find quick answers to the most common questions about{' '}
            <span className="text-blue-600 font-semibold">TimeTuneAI</span>. 
            Still have questions? We're here to help! 🤝
          </p>
        </div>

        <div className="max-w-3xl mx-auto space-y-6">
          {faqs.map((faq, index) => (
            <div key={index} className="bg-white/90 backdrop-blur-sm shadow-lg border-2 border-blue-200 overflow-hidden transform hover:scale-[1.005] transition-all duration-300 hover:shadow-xl" style={{
              borderRadius: index % 2 === 0 ? '25px 15px 30px 20px' : '20px 30px 15px 25px',
              boxShadow: '4px 4px 0px rgba(59, 130, 246, 0.2)'
            }}>
              {/* Decorative corner elements */}
              <div className="absolute top-2 left-2 w-2 h-2 bg-blue-400 opacity-40 rounded-full"></div>
              <div className="absolute top-2 right-2 w-3 h-3 border border-indigo-400 opacity-30 transform rotate-45"></div>

              <button 
                onClick={() => toggleFAQ(index)}
                className="flex justify-between items-center w-full text-left p-6 font-bold text-lg text-slate-800 hover:bg-blue-50 focus:outline-none focus:ring-2 focus:ring-blue-500 transition-colors duration-300"
              >
                <span className="pr-4">{faq.question}</span>
                <ChevronDown 
                  className={`w-6 h-6 text-blue-500 transform transition-transform duration-300 flex-shrink-0 ${
                    openIndex === index ? 'rotate-180' : ''
                  }`} 
                />
              </button>
              {openIndex === index && (
                <div className="px-6 pb-6 text-slate-700 leading-relaxed border-t-2 border-blue-200 animate-fadeIn" style={{borderStyle: 'dashed'}}>
                  <p className="pt-4 font-medium">{faq.answer}</p>
                </div>
              )}
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default FAQ;