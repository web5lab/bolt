import React, { useState } from 'react';
import { Check, Star, Rocket, Crown, Code, Palette, Database, Smartphone, Globe, ExternalLink, PenTool, Sparkles, Users, Award, Zap, ArrowLeft, Calendar, DollarSign, Clock, User, Mail, Phone, MessageSquare, Send, Eye, Github, Play, X } from 'lucide-react';

const ServiceTier = ({ name, price, description, features, isPopular, icon: Icon, gradient, index, onContact }) => {
  const [isHovered, setIsHovered] = useState(false);

  return (
    <div
      className={`relative flex flex-col h-full group transition-all duration-500 transform hover:scale-105 ${
        isPopular
          ? 'bg-gradient-to-br from-blue-100 via-white to-indigo-100 border-3 border-blue-400 shadow-2xl'
          : 'bg-white border-2 border-slate-300 hover:border-blue-400 shadow-lg hover:shadow-xl'
      } overflow-hidden backdrop-blur-sm`}
      style={{
        borderRadius: index % 2 === 0 ? '30px 20px 35px 25px' : '25px 35px 20px 30px',
        boxShadow: isPopular ? '8px 8px 0px rgba(59, 130, 246, 0.3)' : '4px 4px 0px rgba(148, 163, 184, 0.2)'
      }}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
    >
      {/* Hand-drawn decorative elements */}
      {isPopular && (
        <>
          <div className="absolute top-2 right-2 w-4 h-4 bg-blue-400 rounded-full opacity-60"></div>
          <div className="absolute top-4 left-4 w-3 h-3 border-2 border-indigo-400 opacity-50 transform rotate-45"></div>
          <div className="absolute bottom-4 right-6 w-2 h-2 bg-blue-400 opacity-70 transform rotate-12" style={{borderRadius: '30% 70%'}}></div>
        </>
      )}

      {/* Popular badge */}
      {isPopular && (
        <div className="absolute -top-2 -right-2 z-10">
          <div className="relative">
            <div className="bg-gradient-to-r from-blue-400 to-indigo-500 text-white text-xs font-bold px-4 py-2 shadow-lg" style={{
              borderRadius: '20px 15px 25px 10px'
            }}>
              ⭐ MOST POPULAR
            </div>
          </div>
        </div>
      )}

      <div className="p-6 border-b-2 border-blue-200 relative z-10" style={{borderStyle: 'dashed'}}>
        {/* Icon and name */}
        <div className="flex items-center gap-3 mb-3">
          <div className={`p-3 transition-all duration-300 group-hover:scale-110 ${
            isPopular ? 'bg-gradient-to-r from-blue-200 to-indigo-200' : 'bg-slate-100'
          }`} style={{borderRadius: '15px 10px 20px 15px'}}>
            <Icon className={`h-6 w-6 ${isPopular ? 'text-blue-600' : 'text-slate-600'} group-hover:text-blue-600 transition-colors duration-300`} />
          </div>
          <h3 className="text-xl font-bold text-slate-800 group-hover:text-blue-700 transition-colors duration-300">{name}</h3>
        </div>

        <p className="text-slate-600 mb-4 group-hover:text-slate-700 transition-colors duration-300 leading-relaxed">{description}</p>

        <div className="mb-6">
          <div className="flex items-baseline gap-1">
            <span className={`text-4xl font-bold transition-all duration-300 ${
              isPopular
                ? 'bg-gradient-to-r from-blue-600 to-indigo-600 bg-clip-text text-transparent'
                : 'text-slate-800 group-hover:text-blue-600'
            }`}>
              {price}
            </span>
            {price !== 'Custom' && (
              <span className="text-slate-500 ml-1 group-hover:text-slate-600 transition-colors duration-300">+</span>
            )}
          </div>
          <div className="text-blue-600 text-sm font-semibold mt-1 flex items-center gap-1">
            <Zap className="h-3 w-3" />
            Professional development ✨
          </div>
        </div>

        <button
          onClick={() => onContact(name)}
          className={`w-full py-3 px-4 font-bold transition-all duration-300 transform hover:scale-105 shadow-lg relative overflow-hidden ${
            isPopular
              ? 'bg-gradient-to-r from-blue-400 to-indigo-500 text-white hover:from-blue-500 hover:to-indigo-600'
              : 'bg-white border-2 border-slate-300 text-slate-700 hover:bg-blue-50 hover:border-blue-400 hover:text-blue-700'
          }`}
          style={{
            borderRadius: '20px 15px 25px 10px',
            boxShadow: isPopular ? '3px 3px 0px rgba(59, 130, 246, 0.4)' : '2px 2px 0px rgba(148, 163, 184, 0.3)'
          }}
        >
          <span className="relative z-10 flex items-center justify-center gap-2">
            {isPopular ? (
              <>
                <Rocket className="h-4 w-4" />
                Get Started 🚀
              </>
            ) : (
              <>
                <PenTool className="h-4 w-4" />
                Contact Us
              </>
            )}
          </span>
        </button>
      </div>

      <div className="p-6 flex-grow relative z-10">
        <ul className="space-y-4">
          {features.map((feature, featureIndex) => (
            <li key={featureIndex} className="flex items-start group/item">
              <div className="mr-3 mt-0.5 flex-shrink-0 transition-all duration-300 group-hover/item:scale-110">
                <div className="relative">
                  <div className="w-5 h-5 bg-blue-100 border-2 border-blue-400 flex items-center justify-center" style={{borderRadius: '8px 12px 8px 12px'}}>
                    <Check className="h-3 w-3 text-blue-600" />
                  </div>
                </div>
              </div>
              <span className="text-slate-700 group-hover/item:text-slate-800 font-medium transition-colors duration-300 leading-relaxed">
                {feature}
              </span>
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
};

const ProjectCard = ({ title, description, tech, image, index, onViewDetails }) => {
  return (
    <div
      className="bg-white/90 backdrop-blur-sm border-3 border-blue-300 overflow-hidden shadow-lg hover:shadow-xl transition-all duration-300 transform hover:scale-105 group relative"
      style={{
        borderRadius: index % 2 === 0 ? '25px 15px 30px 20px' : '20px 30px 15px 25px',
        boxShadow: '4px 4px 0px rgba(59, 130, 246, 0.3)'
      }}
    >
      {/* Decorative elements */}
      <div className="absolute top-2 right-2 w-3 h-3 bg-blue-400 opacity-40 rounded-full"></div>
      <div className="absolute top-3 left-3 w-2 h-2 border-2 border-indigo-400 opacity-50 transform rotate-45"></div>
      
      <div className="relative overflow-hidden h-48">
        <img
          src={image}
          alt={title}
          className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-blue-900/40 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
      </div>
      
      <div className="p-6">
        <h3 className="text-xl font-bold text-slate-800 mb-2 group-hover:text-blue-700 transition-colors duration-300">
          {title}
        </h3>
        <p className="text-slate-600 mb-4 leading-relaxed">{description}</p>
        
        <div className="flex flex-wrap gap-2">
          {tech.map((item, techIndex) => (
            <span
              key={techIndex}
              className="px-3 py-1 bg-blue-100 text-blue-700 text-sm font-medium border-2 border-blue-200"
              style={{borderRadius: '12px 8px 15px 10px'}}
            >
              {item}
            </span>
          ))}
        </div>
        
        <button
          onClick={() => onViewDetails({ title, description, tech, image })}
          className="mt-4 w-full bg-gradient-to-r from-blue-400 to-indigo-500 text-white px-4 py-2 font-bold hover:from-blue-500 hover:to-indigo-600 transition-all duration-300 transform hover:scale-105 flex items-center justify-center gap-2"
          style={{
            borderRadius: '15px 20px 15px 20px',
            boxShadow: '3px 3px 0px rgba(59, 130, 246, 0.3)'
          }}
        >
          <Eye className="h-4 w-4" />
          View Details
        </button>
      </div>
    </div>
  );
};

const ProjectDetailModal = ({ project, isOpen, onClose }) => {
  if (!isOpen || !project) return null;

  const projectDetails = {
    "E-commerce Platform": {
      fullDescription: "A comprehensive e-commerce solution built with modern technologies. Features include advanced product catalog management, secure payment processing with Stripe integration, real-time inventory tracking, customer account management, order processing workflow, and detailed analytics dashboard for business insights.",
      features: [
        "Advanced product catalog with categories and filters",
        "Secure payment processing with multiple gateways",
        "Real-time inventory management",
        "Customer account and order history",
        "Admin dashboard with analytics",
        "Mobile-responsive design",
        "SEO optimization",
        "Email notifications and marketing"
      ],
      timeline: "8-12 weeks",
      teamSize: "4 developers",
      liveUrl: "https://demo-ecommerce.redesignr.ai",
      githubUrl: "https://github.com/redesignr/ecommerce-demo"
    },
    "SaaS Analytics Tool": {
      fullDescription: "A powerful analytics platform that provides real-time data visualization and comprehensive reporting capabilities. Built for businesses to track KPIs, generate custom reports, and gain actionable insights from their data with interactive dashboards and automated reporting features.",
      features: [
        "Real-time data visualization with D3.js",
        "Custom dashboard builder",
        "Automated report generation",
        "Multi-tenant architecture",
        "API integrations for data sources",
        "Role-based access control",
        "Export capabilities (PDF, Excel)",
        "Mobile analytics app"
      ],
      timeline: "10-14 weeks",
      teamSize: "5 developers",
      liveUrl: "https://demo-analytics.redesignr.ai",
      githubUrl: "https://github.com/redesignr/analytics-demo"
    },
    "Healthcare Management": {
      fullDescription: "A comprehensive healthcare management system designed for clinics and hospitals. Features patient record management, appointment scheduling, telemedicine capabilities, billing integration, and compliance with healthcare regulations including HIPAA standards.",
      features: [
        "Patient record management system",
        "Appointment scheduling and calendar",
        "Telemedicine video consultations",
        "Prescription management",
        "Billing and insurance integration",
        "HIPAA compliant security",
        "Medical history tracking",
        "Staff management portal"
      ],
      timeline: "12-16 weeks",
      teamSize: "6 developers",
      liveUrl: "https://demo-healthcare.redesignr.ai",
      githubUrl: "https://github.com/redesignr/healthcare-demo"
    }
  };

  const details = projectDetails[project.title] || {
    fullDescription: project.description,
    features: ["Feature 1", "Feature 2", "Feature 3"],
    timeline: "6-8 weeks",
    teamSize: "3 developers",
    liveUrl: "#",
    githubUrl: "#"
  };

  return (
    <div className="fixed inset-0 bg-black/50 backdrop-blur-sm flex items-center justify-center z-50 p-4">
      <div className="bg-gradient-to-br from-blue-50 via-indigo-50 to-cyan-50 border-3 border-blue-400 max-w-4xl w-full max-h-[90vh] overflow-y-auto relative" style={{
        borderRadius: '30px 20px 35px 25px',
        boxShadow: '8px 8px 0px rgba(59, 130, 246, 0.3)'
      }}>
        {/* Paper texture overlay */}
        <div className="absolute inset-0 opacity-20" style={{
          backgroundImage: `url("data:image/svg+xml,%3Csvg width='40' height='40' viewBox='0 0 40 40' xmlns='http://www.w3.org/2000/svg'%3E%3Cg fill='%2359a3f6' fill-opacity='0.15'%3E%3Cpath d='M20 20c0-5.5-4.5-10-10-10s-10 4.5-10 10 4.5 10 10 10 10-4.5 10-10zm10 0c0-5.5-4.5-10-10-10s-10 4.5-10 10 4.5 10 10 10 10-4.5 10-10z'/%3E%3C/g%3E%3C/svg%3E")`
        }}></div>

        <div className="p-6 relative z-10">
          {/* Header */}
          <div className="flex items-center justify-between mb-6 border-b-2 border-blue-300 pb-4" style={{borderStyle: 'dashed'}}>
            <div className="flex items-center gap-4">
              <div className="p-3 bg-gradient-to-r from-blue-200 to-indigo-200 border-2 border-blue-400" style={{borderRadius: '15px 10px 20px 15px'}}>
                <Eye className="h-6 w-6 text-blue-600" />
              </div>
              <h2 className="text-2xl font-bold text-slate-800">
                {project.title} 🚀
              </h2>
            </div>
            <button
              onClick={onClose}
              className="p-2 hover:bg-blue-100 border-2 border-blue-300 hover:border-indigo-400 transition-colors text-slate-600 hover:text-slate-800"
              style={{borderRadius: '12px 8px 15px 10px'}}
            >
              <X className="h-5 w-5" />
            </button>
          </div>

          <div className="grid md:grid-cols-2 gap-8">
            {/* Left Column - Image and Links */}
            <div>
              <div className="relative overflow-hidden mb-6" style={{borderRadius: '20px 15px 25px 10px'}}>
                <img
                  src={project.image}
                  alt={project.title}
                  className="w-full h-64 object-cover"
                />
              </div>
              
              <div className="flex gap-4 mb-6">
                <a
                  href={details.liveUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex-1 bg-gradient-to-r from-blue-400 to-indigo-500 text-white px-4 py-3 font-bold hover:from-blue-500 hover:to-indigo-600 transition-all duration-300 flex items-center justify-center gap-2"
                  style={{
                    borderRadius: '15px 20px 15px 20px',
                    boxShadow: '3px 3px 0px rgba(59, 130, 246, 0.3)'
                  }}
                >
                  <Play className="h-4 w-4" />
                  Live Demo
                </a>
                <a
                  href={details.githubUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex-1 bg-white border-2 border-blue-300 hover:border-indigo-400 text-slate-700 hover:text-blue-700 px-4 py-3 font-bold hover:bg-blue-50 transition-all duration-300 flex items-center justify-center gap-2"
                  style={{borderRadius: '20px 15px 20px 15px'}}
                >
                  <Github className="h-4 w-4" />
                  Code
                </a>
              </div>

              <div className="bg-white/80 backdrop-blur-sm border-2 border-blue-300 p-4" style={{
                borderRadius: '20px 15px 25px 10px',
                borderStyle: 'dashed'
              }}>
                <h4 className="font-bold text-slate-800 mb-3">Project Stats 📊</h4>
                <div className="space-y-2">
                  <div className="flex items-center gap-2">
                    <Clock className="h-4 w-4 text-blue-600" />
                    <span className="text-sm text-slate-700">Timeline: {details.timeline}</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <Users className="h-4 w-4 text-blue-600" />
                    <span className="text-sm text-slate-700">Team: {details.teamSize}</span>
                  </div>
                </div>
              </div>
            </div>

            {/* Right Column - Details */}
            <div>
              <h3 className="text-xl font-bold text-slate-800 mb-4">Project Overview ✨</h3>
              <p className="text-slate-600 mb-6 leading-relaxed">{details.fullDescription}</p>

              <h4 className="text-lg font-bold text-slate-800 mb-4">Key Features 🎯</h4>
              <ul className="space-y-3 mb-6">
                {details.features.map((feature, index) => (
                  <li key={index} className="flex items-start gap-3">
                    <div className="w-5 h-5 bg-blue-100 border-2 border-blue-400 flex items-center justify-center mt-0.5" style={{borderRadius: '8px 12px 8px 12px'}}>
                      <Check className="h-3 w-3 text-blue-600" />
                    </div>
                    <span className="text-slate-700 leading-relaxed">{feature}</span>
                  </li>
                ))}
              </ul>

              <h4 className="text-lg font-bold text-slate-800 mb-4">Technologies Used 🛠️</h4>
              <div className="flex flex-wrap gap-2">
                {project.tech.map((tech, index) => (
                  <span
                    key={index}
                    className="px-3 py-1 bg-blue-100 text-blue-700 text-sm font-medium border-2 border-blue-200"
                    style={{borderRadius: '12px 8px 15px 10px'}}
                  >
                    {tech}
                  </span>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

const ProjectSubmissionForm = ({ isOpen, onClose }) => {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    company: '',
    projectType: '',
    budget: '',
    timeline: '',
    description: '',
    features: '',
    additionalInfo: ''
  });

  const handleInputChange = (field, value) => {
    setFormData(prev => ({ ...prev, [field]: value }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    
    // Create email content
    const subject = encodeURIComponent(`New Project Submission - ${formData.projectType || 'Custom Project'}`);
    const body = encodeURIComponent(`
Project Submission Details:

Contact Information:
- Name: ${formData.name}
- Email: ${formData.email}
- Phone: ${formData.phone}
- Company: ${formData.company}

Project Details:
- Project Type: ${formData.projectType}
- Budget Range: ${formData.budget}
- Timeline: ${formData.timeline}

Project Description:
${formData.description}

Required Features:
${formData.features}

Additional Information:
${formData.additionalInfo}

Please contact me to discuss this project further.
    `);
    
    window.open(`mailto:shiva@redesignr.ai?subject=${subject}&body=${body}`, '_blank');
    onClose();
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-black/50 backdrop-blur-sm flex items-center justify-center z-50 p-4">
      <div className="bg-gradient-to-br from-blue-50 via-indigo-50 to-cyan-50 border-3 border-blue-400 max-w-2xl w-full max-h-[90vh] overflow-y-auto relative" style={{
        borderRadius: '30px 20px 35px 25px',
        boxShadow: '8px 8px 0px rgba(59, 130, 246, 0.3)'
      }}>
        {/* Paper texture overlay */}
        <div className="absolute inset-0 opacity-20" style={{
          backgroundImage: `url("data:image/svg+xml,%3Csvg width='40' height='40' viewBox='0 0 40 40' xmlns='http://www.w3.org/2000/svg'%3E%3Cg fill='%2359a3f6' fill-opacity='0.15'%3E%3Cpath d='M20 20c0-5.5-4.5-10-10-10s-10 4.5-10 10 4.5 10 10 10 10-4.5 10-10zm10 0c0-5.5-4.5-10-10-10s-10 4.5-10 10 4.5 10 10 10 10-4.5 10-10z'/%3E%3C/g%3E%3C/svg%3E")`
        }}></div>

        <div className="p-6 relative z-10">
          {/* Header */}
          <div className="flex items-center justify-between mb-6 border-b-2 border-blue-300 pb-4" style={{borderStyle: 'dashed'}}>
            <div className="flex items-center gap-4">
              <div className="p-3 bg-gradient-to-r from-blue-200 to-indigo-200 border-2 border-blue-400" style={{borderRadius: '15px 10px 20px 15px'}}>
                <Send className="h-6 w-6 text-blue-600" />
              </div>
              <h2 className="text-2xl font-bold text-slate-800">
                Submit Your Project 📝
              </h2>
            </div>
            <button
              onClick={onClose}
              className="p-2 hover:bg-blue-100 border-2 border-blue-300 hover:border-indigo-400 transition-colors text-slate-600 hover:text-slate-800"
              style={{borderRadius: '12px 8px 15px 10px'}}
            >
              <X className="h-5 w-5" />
            </button>
          </div>

          <form onSubmit={handleSubmit} className="space-y-6">
            {/* Contact Information */}
            <div className="bg-white/80 backdrop-blur-sm border-2 border-blue-300 p-6" style={{
              borderRadius: '25px 15px 30px 20px',
              borderStyle: 'dashed'
            }}>
              <h3 className="text-lg font-bold text-slate-800 mb-4 flex items-center gap-2">
                <User className="h-5 w-5 text-blue-600" />
                Contact Information
              </h3>
              <div className="grid md:grid-cols-2 gap-4">
                <div>
                  <label className="block text-slate-700 font-semibold mb-2">Name *</label>
                  <input
                    type="text"
                    required
                    value={formData.name}
                    onChange={(e) => handleInputChange('name', e.target.value)}
                    className="w-full bg-white border-2 border-blue-300 px-4 py-3 text-slate-800 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                    style={{borderRadius: '15px 20px 15px 20px'}}
                    placeholder="Your full name"
                  />
                </div>
                <div>
                  <label className="block text-slate-700 font-semibold mb-2">Email *</label>
                  <input
                    type="email"
                    required
                    value={formData.email}
                    onChange={(e) => handleInputChange('email', e.target.value)}
                    className="w-full bg-white border-2 border-blue-300 px-4 py-3 text-slate-800 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                    style={{borderRadius: '20px 15px 20px 15px'}}
                    placeholder="your@email.com"
                  />
                </div>
                <div>
                  <label className="block text-slate-700 font-semibold mb-2">Phone</label>
                  <input
                    type="tel"
                    value={formData.phone}
                    onChange={(e) => handleInputChange('phone', e.target.value)}
                    className="w-full bg-white border-2 border-blue-300 px-4 py-3 text-slate-800 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                    style={{borderRadius: '15px 20px 15px 20px'}}
                    placeholder="+1 (555) 123-4567"
                  />
                </div>
                <div>
                  <label className="block text-slate-700 font-semibold mb-2">Company</label>
                  <input
                    type="text"
                    value={formData.company}
                    onChange={(e) => handleInputChange('company', e.target.value)}
                    className="w-full bg-white border-2 border-blue-300 px-4 py-3 text-slate-800 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                    style={{borderRadius: '20px 15px 20px 15px'}}
                    placeholder="Your company name"
                  />
                </div>
              </div>
            </div>

            {/* Project Details */}
            <div className="bg-white/80 backdrop-blur-sm border-2 border-blue-300 p-6" style={{
              borderRadius: '25px 15px 30px 20px',
              borderStyle: 'dashed'
            }}>
              <h3 className="text-lg font-bold text-slate-800 mb-4 flex items-center gap-2">
                <Code className="h-5 w-5 text-blue-600" />
                Project Details
              </h3>
              <div className="grid md:grid-cols-2 gap-4 mb-4">
                <div>
                  <label className="block text-slate-700 font-semibold mb-2">Project Type *</label>
                  <select
                    required
                    value={formData.projectType}
                    onChange={(e) => handleInputChange('projectType', e.target.value)}
                    className="w-full bg-white border-2 border-blue-300 px-4 py-3 text-slate-800 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                    style={{borderRadius: '15px 20px 15px 20px'}}
                  >
                    <option value="">Select project type</option>
                    <option value="Web Application">Web Application</option>
                    <option value="E-commerce Platform">E-commerce Platform</option>
                    <option value="SaaS Product">SaaS Product</option>
                    <option value="Mobile App">Mobile App</option>
                    <option value="API Development">API Development</option>
                    <option value="Custom Software">Custom Software</option>
                  </select>
                </div>
                <div>
                  <label className="block text-slate-700 font-semibold mb-2">Budget Range *</label>
                  <select
                    required
                    value={formData.budget}
                    onChange={(e) => handleInputChange('budget', e.target.value)}
                    className="w-full bg-white border-2 border-blue-300 px-4 py-3 text-slate-800 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                    style={{borderRadius: '20px 15px 20px 15px'}}
                  >
                    <option value="">Select budget range</option>
                    <option value="$1,000 - $5,000">$1,000 - $5,000</option>
                    <option value="$5,000 - $15,000">$5,000 - $15,000</option>
                    <option value="$15,000 - $50,000">$15,000 - $50,000</option>
                    <option value="$50,000+">$50,000+</option>
                  </select>
                </div>
              </div>
              <div className="mb-4">
                <label className="block text-slate-700 font-semibold mb-2">Timeline *</label>
                <select
                  required
                  value={formData.timeline}
                  onChange={(e) => handleInputChange('timeline', e.target.value)}
                  className="w-full bg-white border-2 border-blue-300 px-4 py-3 text-slate-800 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                  style={{borderRadius: '15px 20px 15px 20px'}}
                >
                  <option value="">Select timeline</option>
                  <option value="ASAP (Rush job)">ASAP (Rush job)</option>
                  <option value="1-2 months">1-2 months</option>
                  <option value="2-4 months">2-4 months</option>
                  <option value="4-6 months">4-6 months</option>
                  <option value="6+ months">6+ months</option>
                </select>
              </div>
              <div className="mb-4">
                <label className="block text-slate-700 font-semibold mb-2">Project Description *</label>
                <textarea
                  required
                  rows={4}
                  value={formData.description}
                  onChange={(e) => handleInputChange('description', e.target.value)}
                  className="w-full bg-white border-2 border-blue-300 px-4 py-3 text-slate-800 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                  style={{borderRadius: '20px 15px 25px 10px'}}
                  placeholder="Describe your project in detail..."
                />
              </div>
              <div className="mb-4">
                <label className="block text-slate-700 font-semibold mb-2">Required Features</label>
                <textarea
                  rows={3}
                  value={formData.features}
                  onChange={(e) => handleInputChange('features', e.target.value)}
                  className="w-full bg-white border-2 border-blue-300 px-4 py-3 text-slate-800 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                  style={{borderRadius: '15px 25px 15px 25px'}}
                  placeholder="List the key features you need..."
                />
              </div>
              <div>
                <label className="block text-slate-700 font-semibold mb-2">Additional Information</label>
                <textarea
                  rows={3}
                  value={formData.additionalInfo}
                  onChange={(e) => handleInputChange('additionalInfo', e.target.value)}
                  className="w-full bg-white border-2 border-blue-300 px-4 py-3 text-slate-800 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                  style={{borderRadius: '20px 15px 25px 10px'}}
                  placeholder="Any additional requirements or questions..."
                />
              </div>
            </div>

            {/* Submit Button */}
            <div className="flex justify-end gap-4">
              <button
                type="button"
                onClick={onClose}
                className="px-6 py-3 bg-white border-2 border-blue-300 hover:border-indigo-400 text-slate-700 hover:text-blue-700 font-bold hover:bg-blue-50 transition-all duration-300"
                style={{borderRadius: '15px 20px 15px 20px'}}
              >
                Cancel
              </button>
              <button
                type="submit"
                className="px-8 py-3 bg-gradient-to-r from-blue-400 to-indigo-500 text-white font-bold hover:from-blue-500 hover:to-indigo-600 transition-all duration-300 transform hover:scale-105 shadow-lg flex items-center gap-2"
                style={{
                  borderRadius: '20px 15px 25px 10px',
                  boxShadow: '4px 4px 0px rgba(59, 130, 246, 0.4)'
                }}
              >
                <Send className="h-4 w-4" />
                Submit Project
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};

const ProfessionalServices = ({ isOpen, onClose }) => {
  const [selectedProject, setSelectedProject] = useState(null);
  const [showProjectForm, setShowProjectForm] = useState(false);
  const [activeSection, setActiveSection] = useState('services'); // 'services', 'projects', 'process'

  const handleContact = (serviceName) => {
    const subject = encodeURIComponent(`Professional Development Service Inquiry - ${serviceName}`);
    const body = encodeURIComponent(`Hi redesignr.ai team,

I'm interested in your ${serviceName} service. Please provide more details about:
- Project timeline
- Detailed pricing
- Development process
- Team expertise

Looking forward to hearing from you!`);
    
    window.open(`mailto:shiva@redesignr.ai?subject=${subject}&body=${body}`, '_blank');
  };

  const handleViewProjectDetails = (project) => {
    setSelectedProject(project);
  };

  const services = [
    {
      name: "Startup MVP",
      price: "$1,000",
      description: "Perfect for startups looking to build their first product with professional quality",
      features: [
        "Custom web application development",
        "Responsive design for all devices",
        "Basic user authentication",
        "Database integration",
        "2 weeks development time",
        "1 month post-launch support",
        "Source code ownership"
      ],
      isPopular: false,
      icon: Rocket
    },
    {
      name: "Business Solution",
      price: "$5,000",
      description: "Comprehensive business applications with advanced features and integrations",
      features: [
        "Full-stack web application",
        "Advanced user management",
        "Payment gateway integration",
        "API development & documentation",
        "Admin dashboard",
        "4-6 weeks development time",
        "3 months post-launch support",
        "Performance optimization"
      ],
      isPopular: true,
      icon: Crown
    },
    {
      name: "Enterprise Platform",
      price: "$15,000",
      description: "Large-scale enterprise solutions with custom architecture and scalability",
      features: [
        "Microservices architecture",
        "Advanced security features",
        "Third-party integrations",
        "Custom analytics dashboard",
        "Multi-tenant support",
        "8-12 weeks development time",
        "6 months post-launch support",
        "Dedicated project manager",
        "Load testing & optimization"
      ],
      isPopular: false,
      icon: Award
    }
  ];

  const projects = [
    {
      title: "E-commerce Platform",
      description: "Modern online store with advanced product management, payment processing, and analytics dashboard.",
      tech: ["React", "Node.js", "MongoDB", "Stripe"],
      image: "https://images.unsplash.com/photo-1556742049-0cfed4f6a45d?w=600&h=400&fit=crop"
    },
    {
      title: "SaaS Analytics Tool",
      description: "Comprehensive analytics platform with real-time data visualization and custom reporting features.",
      tech: ["Vue.js", "Python", "PostgreSQL", "D3.js"],
      image: "https://images.unsplash.com/photo-1551288049-bebda4e38f71?w=600&h=400&fit=crop"
    },
    {
      title: "Healthcare Management",
      description: "Patient management system with appointment scheduling, medical records, and telemedicine features.",
      tech: ["Angular", "Java", "MySQL", "WebRTC"],
      image: "https://images.unsplash.com/photo-1576091160399-112ba8d25d1f?w=600&h=400&fit=crop"
    },
    {
      title: "Learning Management System",
      description: "Educational platform with course creation, student tracking, and interactive learning modules.",
      tech: ["React", "Express", "MongoDB", "Socket.io"],
      image: "https://images.unsplash.com/photo-1522202176988-66273c2fd55f?w=600&h=400&fit=crop"
    },
    {
      title: "Real Estate Portal",
      description: "Property listing platform with advanced search, virtual tours, and agent management system.",
      tech: ["Next.js", "GraphQL", "PostgreSQL", "AWS"],
      image: "https://images.unsplash.com/photo-1560518883-ce09059eeffa?w=600&h=400&fit=crop"
    },
    {
      title: "Fintech Dashboard",
      description: "Financial management platform with portfolio tracking, investment analysis, and risk assessment.",
      tech: ["React", "Python", "Redis", "Chart.js"],
      image: "https://images.unsplash.com/photo-1611974789855-9c2a0a7236a3?w=600&h=400&fit=crop"
    }
  ];

  const developmentProcess = [
    {
      step: 1,
      title: "Discovery & Planning",
      description: "We analyze your requirements, define project scope, and create detailed technical specifications.",
      duration: "1-2 weeks",
      deliverables: ["Project roadmap", "Technical specifications", "UI/UX wireframes", "Timeline & milestones"]
    },
    {
      step: 2,
      title: "Design & Architecture",
      description: "Our team creates the system architecture and designs the user interface for optimal user experience.",
      duration: "1-3 weeks",
      deliverables: ["System architecture", "Database design", "UI/UX mockups", "Technical documentation"]
    },
    {
      step: 3,
      title: "Development & Testing",
      description: "We build your application using modern technologies with continuous testing and quality assurance.",
      duration: "4-12 weeks",
      deliverables: ["Working application", "Test coverage", "Code documentation", "Performance optimization"]
    },
    {
      step: 4,
      title: "Deployment & Support",
      description: "We deploy your application and provide ongoing support to ensure smooth operation.",
      duration: "1-2 weeks + ongoing",
      deliverables: ["Live deployment", "Monitoring setup", "User training", "Maintenance plan"]
    }
  ];

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-black/50 backdrop-blur-sm flex items-center justify-center z-50">
      <div className="bg-gradient-to-br from-blue-50 via-indigo-50 to-cyan-50 border-3 border-blue-400 max-w-7xl w-full mx-4 max-h-[90vh] overflow-y-auto relative" style={{
        borderRadius: '30px 20px 35px 25px',
        boxShadow: '8px 8px 0px rgba(59, 130, 246, 0.3)'
      }}>
        {/* Paper texture overlay */}
        <div className="absolute inset-0 opacity-20" style={{
          backgroundImage: `url("data:image/svg+xml,%3Csvg width='40' height='40' viewBox='0 0 40 40' xmlns='http://www.w3.org/2000/svg'%3E%3Cg fill='%2359a3f6' fill-opacity='0.15'%3E%3Cpath d='M20 20c0-5.5-4.5-10-10-10s-10 4.5-10 10 4.5 10 10 10 10-4.5 10-10zm10 0c0-5.5-4.5-10-10-10s-10 4.5-10 10 4.5 10 10 10 10-4.5 10-10z'/%3E%3C/g%3E%3C/svg%3E")`
        }}></div>

        {/* Hand-drawn decorative elements */}
        <div className="absolute top-4 right-4 w-6 h-6 bg-blue-400 opacity-50 rounded-full"></div>
        <div className="absolute top-6 left-6 w-4 h-4 border-2 border-indigo-400 opacity-40 transform rotate-45"></div>
        <div className="absolute bottom-6 right-8 w-3 h-3 bg-blue-400 opacity-60 transform rotate-12" style={{borderRadius: '30% 70%'}}></div>

        <div className="p-6 relative z-10">
          <div className="flex items-center justify-between mb-8 border-b-2 border-blue-300 pb-6" style={{borderStyle: 'dashed'}}>
            <div className="flex items-center gap-4">
              <div className="p-3 bg-gradient-to-r from-blue-200 to-indigo-200 border-2 border-blue-400" style={{borderRadius: '15px 10px 20px 15px'}}>
                <Users className="h-6 w-6 text-blue-600" />
              </div>
              <div>
                <h2 className="text-3xl font-bold text-slate-800 relative">
                  Professional Development Services 💼
                  <svg className="absolute -bottom-1 left-0 w-full h-2 mt-1" viewBox="0 0 400 8" fill="none">
                    <path d="M2 6 Q200 2 398 6" stroke="#3b82f6" strokeWidth="2" strokeLinecap="round" fill="none" opacity="0.5"/>
                  </svg>
                </h2>
                <p className="text-slate-600 mt-2">Hire the redesignr.ai team for your custom software requirements</p>
              </div>
            </div>
            <button
              onClick={onClose}
              className="p-2 hover:bg-blue-100 border-2 border-blue-300 hover:border-indigo-400 transition-colors text-slate-600 hover:text-slate-800"
              style={{borderRadius: '12px 8px 15px 10px'}}
            >
              ✕
            </button>
          </div>

          {/* Navigation Tabs */}
          <div className="flex flex-wrap justify-center gap-3 mb-8">
            {[
              { id: 'services', label: 'Our Services', icon: Rocket },
              { id: 'projects', label: 'Portfolio', icon: Palette },
              { id: 'process', label: 'Our Process', icon: Code }
            ].map((tab, index) => (
              <button
                key={tab.id}
                onClick={() => setActiveSection(tab.id)}
                className={`flex items-center gap-2 px-6 py-3 font-semibold transition-all duration-300 transform hover:scale-105 ${
                  activeSection === tab.id
                    ? 'bg-gradient-to-r from-blue-400 to-indigo-500 text-white shadow-lg'
                    : 'bg-white text-slate-700 hover:bg-blue-50 border-2 border-blue-300 hover:border-indigo-400'
                }`}
                style={{
                  borderRadius: index % 2 === 0 ? '20px 10px 25px 15px' : '15px 25px 10px 20px',
                  boxShadow: activeSection === tab.id ? '4px 4px 0px rgba(59, 130, 246, 0.3)' : '2px 2px 0px rgba(59, 130, 246, 0.2)'
                }}
              >
                <tab.icon className="h-4 w-4" />
                <span>{tab.label}</span>
              </button>
            ))}
          </div>

          {/* Services Section */}
          {activeSection === 'services' && (
          <div className="mb-8">
            <div className="text-center mb-8">
              <div className="inline-block px-6 py-2 mb-4 bg-white/80 backdrop-blur-sm border-2 border-blue-300 shadow-lg" style={{
                borderRadius: '25px 15px 30px 20px'
              }}>
                <span className="text-blue-700 text-sm font-semibold flex items-center gap-2">
                  <Code className="h-4 w-4" />
                  🚀 Development Services
                </span>
              </div>
              <h3 className="text-2xl font-bold text-slate-800 mb-4">
                Choose Your Development Package
              </h3>
              <p className="text-slate-600 max-w-2xl mx-auto">
                From startup MVPs to enterprise solutions, we build custom software tailored to your needs
              </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 mb-8">
              {services.map((service, index) => (
                <ServiceTier
                  key={index}
                  name={service.name}
                  price={service.price}
                  description={service.description}
                  features={service.features}
                  isPopular={service.isPopular}
                  icon={service.icon}
                  index={index}
                  onContact={handleContact}
                />
              ))}
            </div>
            
            {/* Quick Action Buttons */}
            <div className="text-center">
              <div className="flex flex-col sm:flex-row gap-4 justify-center">
                <button
                  onClick={() => setShowProjectForm(true)}
                  className="bg-gradient-to-r from-blue-400 to-indigo-500 text-white px-8 py-4 font-bold text-lg shadow-lg transform hover:scale-105 transition-all duration-300 flex items-center justify-center gap-2"
                  style={{
                    borderRadius: '25px 15px 30px 20px',
                    boxShadow: '4px 4px 0px rgba(59, 130, 246, 0.4)'
                  }}
                >
                  <Send className="h-5 w-5" />
                  Submit Your Project
                </button>
                <button
                  onClick={() => handleContact('Consultation')}
                  className="bg-white border-2 border-blue-300 hover:border-indigo-400 text-slate-700 hover:text-blue-700 px-8 py-4 font-bold text-lg hover:bg-blue-50 transition-all duration-300 flex items-center justify-center gap-2"
                  style={{
                    borderRadius: '20px 30px 15px 25px',
                    boxShadow: '3px 3px 0px rgba(59, 130, 246, 0.3)'
                  }}
                >
                  <Calendar className="h-5 w-5" />
                  Free Consultation
                </button>
              </div>
            </div>
          </div>
          )}

          {/* Projects Gallery */}
          {activeSection === 'projects' && (
          <div className="mb-8">
            <div className="text-center mb-8">
              <div className="inline-block px-6 py-2 mb-4 bg-white/80 backdrop-blur-sm border-2 border-blue-300 shadow-lg" style={{
                borderRadius: '25px 15px 30px 20px'
              }}>
                <span className="text-blue-700 text-sm font-semibold flex items-center gap-2">
                  <Palette className="h-4 w-4" />
                  🎨 Our Work
                </span>
              </div>
              <h3 className="text-2xl font-bold text-slate-800 mb-4">
                Projects We've Built
              </h3>
              <p className="text-slate-600 max-w-2xl mx-auto">
                Explore some of the amazing software solutions we've created for our clients
              </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {projects.map((project, index) => (
                <ProjectCard
                  key={index}
                  title={project.title}
                  description={project.description}
                  tech={project.tech}
                  image={project.image}
                  index={index}
                  onViewDetails={handleViewProjectDetails}
                />
              ))}
            </div>
          </div>
          )}

          {/* Development Process */}
          {activeSection === 'process' && (
          <div className="mb-8">
            <div className="text-center mb-8">
              <div className="inline-block px-6 py-2 mb-4 bg-white/80 backdrop-blur-sm border-2 border-blue-300 shadow-lg" style={{
                borderRadius: '25px 15px 30px 20px'
              }}>
                <span className="text-blue-700 text-sm font-semibold flex items-center gap-2">
                  <Code className="h-4 w-4" />
                  🔄 Our Process
                </span>
              </div>
              <h3 className="text-2xl font-bold text-slate-800 mb-4">
                How We Build Your Software
              </h3>
              <p className="text-slate-600 max-w-2xl mx-auto">
                Our proven development process ensures quality, transparency, and timely delivery
              </p>
            </div>

            <div className="space-y-8">
              {developmentProcess.map((phase, index) => (
                <div
                  key={index}
                  className="bg-white/90 backdrop-blur-sm border-3 border-blue-300 p-6 relative"
                  style={{
                    borderRadius: index % 2 === 0 ? '30px 20px 35px 25px' : '25px 35px 20px 30px',
                    boxShadow: '4px 4px 0px rgba(59, 130, 246, 0.3)'
                  }}
                >
                  <div className="flex items-start gap-6">
                    {/* Step Number */}
                    <div className="flex-shrink-0">
                      <div className="w-16 h-16 bg-gradient-to-r from-blue-400 to-indigo-500 text-white font-bold text-xl flex items-center justify-center border-3 border-blue-600" style={{
                        borderRadius: '50% 40% 60% 30%'
                      }}>
                        {phase.step}
                      </div>
                    </div>
                    
                    {/* Content */}
                    <div className="flex-1">
                      <div className="flex flex-col md:flex-row md:items-start md:justify-between mb-4">
                        <h4 className="text-xl font-bold text-slate-800 mb-2 md:mb-0">
                          {phase.title}
                        </h4>
                        <div className="flex items-center gap-2 text-blue-600 font-semibold">
                          <Clock className="h-4 w-4" />
                          {phase.duration}
                        </div>
                      </div>
                      
                      <p className="text-slate-600 mb-4 leading-relaxed">
                        {phase.description}
                      </p>
                      
                      <div>
                        <h5 className="font-semibold text-slate-800 mb-2">Deliverables:</h5>
                        <div className="flex flex-wrap gap-2">
                          {phase.deliverables.map((deliverable, dIndex) => (
                            <span
                              key={dIndex}
                              className="px-3 py-1 bg-blue-100 text-blue-700 text-sm font-medium border-2 border-blue-200"
                              style={{borderRadius: '12px 8px 15px 10px'}}
                            >
                              {deliverable}
                            </span>
                          ))}
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
          )}

          {/* Contact Section - Always visible */}
          <div className="bg-white/80 backdrop-blur-sm border-3 border-blue-300 p-8 relative" style={{
            borderRadius: '30px 20px 35px 25px',
            borderStyle: 'dashed'
          }}>
            {/* Decorative elements */}
            <div className="absolute top-2 left-2 w-3 h-3 bg-blue-400 opacity-40 rounded-full"></div>
            <div className="absolute top-3 right-3 w-2 h-2 border-2 border-indigo-400 opacity-50 transform rotate-45"></div>
            
            <div className="text-center">
              <div className="flex items-center justify-center gap-4 mb-6">
                <div className="p-3 bg-blue-100 border-2 border-blue-400" style={{borderRadius: '15px 10px 20px 15px'}}>
                  <Sparkles className="h-6 w-6 text-blue-600" />
                </div>
                <h3 className="text-2xl font-bold text-blue-800">
                  Ready to Start Your Project?
                </h3>
              </div>
              <p className="text-slate-600 leading-relaxed mb-6 max-w-2xl mx-auto">
                Let's discuss your requirements and create something amazing together. 
                Our team of expert developers is ready to bring your vision to life.
              </p>
              <div className="flex flex-col sm:flex-row gap-4 justify-center">
                <button
                  onClick={() => setShowProjectForm(true)}
                  className="bg-gradient-to-r from-blue-400 to-indigo-500 text-white px-8 py-4 font-bold text-lg shadow-lg transform hover:scale-105 transition-all duration-300"
                  style={{
                    borderRadius: '25px 15px 30px 20px',
                    boxShadow: '4px 4px 0px rgba(59, 130, 246, 0.4)'
                  }}
                >
                  🚀 Submit Your Project
                </button>
                <a
                  href="mailto:shiva@redesignr.ai"
                  className="bg-white border-2 border-blue-300 hover:border-indigo-400 text-slate-700 hover:text-blue-700 px-8 py-4 font-bold text-lg hover:bg-blue-50 transition-all duration-300"
                  style={{
                    borderRadius: '20px 30px 15px 25px',
                    boxShadow: '3px 3px 0px rgba(59, 130, 246, 0.3)'
                  }}
                >
                  📧 Contact Us
                </a>
              </div>
            </div>
          </div>
        </div>
      </div>
      
      {/* Modals */}
      <ProjectDetailModal
        project={selectedProject}
        isOpen={!!selectedProject}
        onClose={() => setSelectedProject(null)}
      />
      
      <ProjectSubmissionForm
        isOpen={showProjectForm}
        onClose={() => setShowProjectForm(false)}
      />
    </div>
  );
};

export default ProfessionalServices;