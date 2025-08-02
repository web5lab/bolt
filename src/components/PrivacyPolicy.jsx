import React, { useEffect } from 'react';
import Navbar from '../components/Navbar';
import Footer from '../components/Footer';
import { ArrowLeft, PenTool, Shield } from 'lucide-react';
import { Link } from 'react-router-dom';

const PrivacyPolicy = () => {
  useEffect(() => {
    // Update page title and meta description for SEO
    document.title = 'Privacy Policy | redesignr.ai';
    
    const metaDescription = document.querySelector('meta[name="description"]');
    if (metaDescription) {
      metaDescription.setAttribute('content', 'Privacy Policy for redesignr.ai - Learn how we collect, use, and protect your personal information when you use our AI website builder and redesign services.');
    }
    
    // Scroll to top on page load
    window.scrollTo(0, 0);
  }, []);

  return (
    <div className="min-h-screen bg-gradient-to-br from-orange-50 via-amber-50 to-yellow-50 relative overflow-hidden">
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
      </div>

      <Navbar />
      
      <main className="pt-20 pb-20 relative z-10">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="max-w-4xl mx-auto">
            {/* Breadcrumb */}
            <nav className="mb-8 pt-8">
              <Link 
                to="/" 
                className="inline-flex items-center text-amber-600 hover:text-orange-600 transition-colors font-semibold"
              >
                <ArrowLeft className="h-4 w-4 mr-2" />
                🏠 Back to Home
              </Link>
            </nav>

            <div className="bg-white/90 backdrop-blur-sm border-3 border-amber-300 p-8 shadow-2xl relative" style={{
              borderRadius: '30px 20px 35px 25px',
              boxShadow: '8px 8px 0px rgba(245, 158, 11, 0.2)'
            }}>
              {/* Decorative corner elements */}
              <div className="absolute top-2 left-2 w-4 h-4 bg-amber-400 opacity-40 rounded-full"></div>
              <div className="absolute top-2 right-2 w-3 h-3 border-2 border-orange-400 opacity-50 transform rotate-45"></div>
              <div className="absolute bottom-2 left-2 w-5 h-5 bg-yellow-300 opacity-40 rounded-full"></div>
              <div className="absolute bottom-2 right-2 w-4 h-4 border-2 border-red-400 opacity-40 transform rotate-12" style={{borderRadius: '30% 70% 70% 30%'}}></div>

              {/* Header with badge */}
              <div className="text-center mb-8">
                <div className="inline-block px-6 py-2 mb-4 bg-gradient-to-r from-amber-100 to-orange-100 border-2 border-amber-300" style={{
                  borderRadius: '25px 15px 30px 20px'
                }}>
                  <span className="text-amber-700 text-sm font-semibold flex items-center gap-2">
                    <Shield className="h-4 w-4" />
                    🔒 Your Privacy Matters
                  </span>
                </div>
                
                <h1 className="text-3xl font-bold text-slate-800 mb-4 relative">
                  Privacy Policy 🛡️
                  <svg className="absolute -bottom-2 left-1/2 transform -translate-x-1/2 w-48 h-3" viewBox="0 0 192 12" fill="none">
                    <path d="M5 8 Q96 4 187 8" stroke="#f59e0b" strokeWidth="2" strokeLinecap="round" fill="none" opacity="0.6"/>
                  </svg>
                </h1>
              </div>
              
              <div className="prose prose-lg prose-invert max-w-none">
                <div className="inline-block p-3 bg-gradient-to-r from-emerald-100 to-green-100 border-2 border-emerald-300 mb-6" style={{
                  borderRadius: '15px 20px 15px 20px'
                }}>
                  <p className="text-emerald-700 font-semibold text-sm mb-0">📅 Last Updated: January 15, 2025</p>
                </div>
                
                <h2 className="text-xl font-bold text-slate-800 mt-8 mb-4 relative">
                  1. Introduction 👋
                  <svg className="absolute -bottom-1 left-0 w-32 h-2" viewBox="0 0 128 8" fill="none">
                    <path d="M2 6 Q64 2 126 6" stroke="#f59e0b" strokeWidth="2" strokeLinecap="round" fill="none" opacity="0.5"/>
                  </svg>
                </h2>
                <p className="text-slate-700 mb-4 leading-relaxed">
                  Welcome to redesignr.ai ("we," "our," or "us"). We respect your privacy and are committed to protecting your personal information. This Privacy Policy explains how we collect, use, disclose, and safeguard your information when you use our website, products, and services.
                </p>
                <p className="text-slate-700 mb-4 leading-relaxed">
                  By accessing or using redesignr.ai, you agree to this Privacy Policy. If you do not agree with our policies and practices, please do not use our services.
                </p>

                <h2 className="text-xl font-bold text-slate-800 mt-8 mb-4 relative">
                  2. Information We Collect 📊
                  <svg className="absolute -bottom-1 left-0 w-40 h-2" viewBox="0 0 160 8" fill="none">
                    <path d="M2 6 Q80 2 158 6" stroke="#f59e0b" strokeWidth="2" strokeLinecap="round" fill="none" opacity="0.5"/>
                  </svg>
                </h2>
                
                <h3 className="text-lg font-bold text-slate-800 mt-6 mb-3">2.1 Personal Information 👤</h3>
                <p className="text-slate-700 mb-4 leading-relaxed">
                  We may collect personal information that you voluntarily provide when using our services, including:
                </p>
                <ul className="text-slate-700 mb-4 list-none pl-0 space-y-2">
                  <li className="flex items-center gap-2">
                    <span className="w-2 h-2 bg-amber-400 rounded-full"></span>
                    Name, email address, and contact details
                  </li>
                  <li className="flex items-center gap-2">
                    <span className="w-2 h-2 bg-orange-400 rounded-full"></span>
                    Account credentials
                  </li>
                  <li className="flex items-center gap-2">
                    <span className="w-2 h-2 bg-yellow-400 rounded-full"></span>
                    Billing and payment information
                  </li>
                  <li className="flex items-center gap-2">
                    <span className="w-2 h-2 bg-emerald-400 rounded-full"></span>
                    Profile information
                  </li>
                  <li className="flex items-center gap-2">
                    <span className="w-2 h-2 bg-blue-400 rounded-full"></span>
                    Content you upload, such as website URLs for redesign
                  </li>
                  <li className="flex items-center gap-2">
                    <span className="w-2 h-2 bg-purple-400 rounded-full"></span>
                    Communications with us
                  </li>
                </ul>

                <h3 className="text-lg font-bold text-slate-800 mt-6 mb-3">2.2 Automatically Collected Information 🤖</h3>
                <p className="text-slate-700 mb-4 leading-relaxed">
                  When you use our services, we may automatically collect certain information, including:
                </p>
                <ul className="text-slate-700 mb-4 list-none pl-0 space-y-2">
                  <li className="flex items-center gap-2">
                    <span className="w-2 h-2 bg-amber-400 rounded-full"></span>
                    Device information (browser type, operating system, device type)
                  </li>
                  <li className="flex items-center gap-2">
                    <span className="w-2 h-2 bg-orange-400 rounded-full"></span>
                    IP address and location information
                  </li>
                  <li className="flex items-center gap-2">
                    <span className="w-2 h-2 bg-yellow-400 rounded-full"></span>
                    Usage data and browsing history on our platform
                  </li>
                  <li className="flex items-center gap-2">
                    <span className="w-2 h-2 bg-emerald-400 rounded-full"></span>
                    Cookies and similar tracking technologies
                  </li>
                </ul>

                <h2 className="text-xl font-bold text-slate-800 mt-8 mb-4 relative">
                  3. How We Use Your Information 🎯
                  <svg className="absolute -bottom-1 left-0 w-48 h-2" viewBox="0 0 192 8" fill="none">
                    <path d="M2 6 Q96 2 190 6" stroke="#f59e0b" strokeWidth="2" strokeLinecap="round" fill="none" opacity="0.5"/>
                  </svg>
                </h2>
                <p className="text-slate-700 mb-4 leading-relaxed">
                  We use the information we collect for various purposes, including:
                </p>
                <ul className="text-slate-700 mb-4 list-none pl-0 space-y-2">
                  <li className="flex items-center gap-2">
                    <span className="w-2 h-2 bg-amber-400 rounded-full"></span>
                    Providing, maintaining, and improving our services
                  </li>
                  <li className="flex items-center gap-2">
                    <span className="w-2 h-2 bg-orange-400 rounded-full"></span>
                    Processing transactions and managing your account
                  </li>
                  <li className="flex items-center gap-2">
                    <span className="w-2 h-2 bg-yellow-400 rounded-full"></span>
                    Personalizing your experience
                  </li>
                  <li className="flex items-center gap-2">
                    <span className="w-2 h-2 bg-emerald-400 rounded-full"></span>
                    Communicating with you about updates, offers, and support
                  </li>
                  <li className="flex items-center gap-2">
                    <span className="w-2 h-2 bg-blue-400 rounded-full"></span>
                    Analyzing usage patterns to enhance our platform
                  </li>
                  <li className="flex items-center gap-2">
                    <span className="w-2 h-2 bg-purple-400 rounded-full"></span>
                    Protecting our services and users
                  </li>
                  <li className="flex items-center gap-2">
                    <span className="w-2 h-2 bg-pink-400 rounded-full"></span>
                    Complying with legal obligations
                  </li>
                </ul>

                <h2 className="text-xl font-bold text-slate-800 mt-8 mb-4 relative">
                  4. Sharing Your Information 🤝
                  <svg className="absolute -bottom-1 left-0 w-44 h-2" viewBox="0 0 176 8" fill="none">
                    <path d="M2 6 Q88 2 174 6" stroke="#f59e0b" strokeWidth="2" strokeLinecap="round" fill="none" opacity="0.5"/>
                  </svg>
                </h2>
                <p className="text-slate-700 mb-4 leading-relaxed">
                  We may share your information with:
                </p>
                <ul className="text-slate-700 mb-4 list-none pl-0 space-y-2">
                  <li className="flex items-center gap-2">
                    <span className="w-2 h-2 bg-amber-400 rounded-full"></span>
                    Service providers who perform services on our behalf
                  </li>
                  <li className="flex items-center gap-2">
                    <span className="w-2 h-2 bg-orange-400 rounded-full"></span>
                    Business partners with your consent
                  </li>
                  <li className="flex items-center gap-2">
                    <span className="w-2 h-2 bg-yellow-400 rounded-full"></span>
                    Legal authorities when required by law
                  </li>
                  <li className="flex items-center gap-2">
                    <span className="w-2 h-2 bg-emerald-400 rounded-full"></span>
                    In connection with a business transaction (merger, acquisition, etc.)
                  </li>
                </ul>
                
                <div className="p-4 bg-gradient-to-r from-emerald-100 to-green-100 border-2 border-emerald-300 mb-4" style={{
                  borderRadius: '20px 15px 25px 10px',
                  borderStyle: 'dashed'
                }}>
                  <p className="text-emerald-700 font-semibold mb-0">
                    🛡️ <strong>Important:</strong> We do not sell your personal information to third parties.
                  </p>
                </div>

                <h2 className="text-xl font-bold text-slate-800 mt-8 mb-4 relative">
                  5. Cookies and Tracking Technologies 🍪
                  <svg className="absolute -bottom-1 left-0 w-56 h-2" viewBox="0 0 224 8" fill="none">
                    <path d="M2 6 Q112 2 222 6" stroke="#f59e0b" strokeWidth="2" strokeLinecap="round" fill="none" opacity="0.5"/>
                  </svg>
                </h2>
                <p className="text-slate-700 mb-4 leading-relaxed">
                  We use cookies and similar tracking technologies to collect information about your browsing activities. You can control cookies through your browser settings, but disabling cookies may limit your use of certain features.
                </p>

                <h2 className="text-xl font-bold text-slate-800 mt-8 mb-4 relative">
                  6. Data Security 🔐
                  <svg className="absolute -bottom-1 left-0 w-32 h-2" viewBox="0 0 128 8" fill="none">
                    <path d="M2 6 Q64 2 126 6" stroke="#f59e0b" strokeWidth="2" strokeLinecap="round" fill="none" opacity="0.5"/>
                  </svg>
                </h2>
                <p className="text-slate-700 mb-4 leading-relaxed">
                  We implement appropriate security measures to protect your personal information from unauthorized access, alteration, disclosure, or destruction. However, no method of transmission over the internet or electronic storage is 100% secure, and we cannot guarantee absolute security.
                </p>

                <h2 className="text-xl font-bold text-slate-800 mt-8 mb-4 relative">
                  7. Your Privacy Rights ⚖️
                  <svg className="absolute -bottom-1 left-0 w-40 h-2" viewBox="0 0 160 8" fill="none">
                    <path d="M2 6 Q80 2 158 6" stroke="#f59e0b" strokeWidth="2" strokeLinecap="round" fill="none" opacity="0.5"/>
                  </svg>
                </h2>
                <p className="text-slate-700 mb-4 leading-relaxed">
                  Depending on your location, you may have certain rights regarding your personal information, including:
                </p>
                <ul className="text-slate-700 mb-4 list-none pl-0 space-y-2">
                  <li className="flex items-center gap-2">
                    <span className="w-2 h-2 bg-amber-400 rounded-full"></span>
                    Access to your personal information
                  </li>
                  <li className="flex items-center gap-2">
                    <span className="w-2 h-2 bg-orange-400 rounded-full"></span>
                    Correction of inaccurate information
                  </li>
                  <li className="flex items-center gap-2">
                    <span className="w-2 h-2 bg-yellow-400 rounded-full"></span>
                    Deletion of your information
                  </li>
                  <li className="flex items-center gap-2">
                    <span className="w-2 h-2 bg-emerald-400 rounded-full"></span>
                    Restriction of processing
                  </li>
                  <li className="flex items-center gap-2">
                    <span className="w-2 h-2 bg-blue-400 rounded-full"></span>
                    Data portability
                  </li>
                  <li className="flex items-center gap-2">
                    <span className="w-2 h-2 bg-purple-400 rounded-full"></span>
                    Objection to processing
                  </li>
                </ul>
                <p className="text-slate-700 mb-4 leading-relaxed">
                  To exercise these rights, please contact us using the information provided in the "Contact Us" section.
                </p>

                <h2 className="text-xl font-semibold text-white mt-8 mb-4">8. Children's Privacy</h2>
                <p className="text-slate-300 mb-4">
                  Our services are not intended for children under 16 years of age. We do not knowingly collect personal information from children. If you are a parent or guardian and believe your child has provided us with personal information, please contact us.
                </p>

                <h2 className="text-xl font-semibold text-white mt-8 mb-4">9. International Data Transfers</h2>
                <p className="text-slate-300 mb-4">
                  Your information may be transferred to and processed in countries other than your country of residence. These countries may have different data protection laws. We take appropriate measures to ensure your information remains protected.
                </p>

                <h2 className="text-xl font-semibold text-white mt-8 mb-4">10. Changes to This Privacy Policy</h2>
                <p className="text-slate-300 mb-4">
                  We may update this Privacy Policy from time to time. The updated version will be indicated by an updated "Last Updated" date. We encourage you to review this Privacy Policy periodically.
                </p>

                <h2 className="text-xl font-bold text-slate-800 mt-8 mb-4 relative">
                  11. Contact Us 📞
                  <svg className="absolute -bottom-1 left-0 w-28 h-2" viewBox="0 0 112 8" fill="none">
                    <path d="M2 6 Q56 2 110 6" stroke="#f59e0b" strokeWidth="2" strokeLinecap="round" fill="none" opacity="0.5"/>
                  </svg>
                </h2>
                <p className="text-slate-700 mb-4 leading-relaxed">
                  If you have questions or concerns about this Privacy Policy or our data practices, please contact us at:
                </p>
                
                <div className="p-6 bg-gradient-to-r from-amber-100 to-orange-100 border-2 border-amber-300" style={{
                  borderRadius: '25px 15px 30px 20px'
                }}>
                  <div className="space-y-2">
                    <p className="text-slate-800 font-semibold flex items-center gap-2">
                      📧 <strong>Email:</strong> privacy@redesignr.ai
                    </p>
                    <p className="text-slate-800 font-semibold flex items-center gap-2">
                      🏢 <strong>Address:</strong> 123 AI Boulevard, San Francisco, CA 94105
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </main>

      <Footer />
    </div>
  );
};

export default PrivacyPolicy;