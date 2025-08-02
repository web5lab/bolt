import React from 'react';
import { Star, PenTool } from 'lucide-react';

const Testimonial = ({ content, author, role, company, image, index }) => {
  return (
    <div className={`relative bg-white/90 backdrop-blur-sm border-3 border-amber-300 p-6 flex flex-col h-full group transition-all duration-500 transform hover:scale-105 ${
      index % 2 === 0 ? 'hover:rotate-1' : 'hover:-rotate-1'
    }`} style={{
      borderRadius: index % 2 === 0 ? '30px 20px 35px 25px' : '25px 35px 20px 30px',
      boxShadow: '6px 6px 0px rgba(245, 158, 11, 0.3)'
    }}>
      {/* Hand-drawn decorative elements */}
      <div className="absolute top-2 right-2 w-3 h-3 bg-yellow-400 opacity-50 rounded-full"></div>
      <div className="absolute top-4 left-4 w-2 h-2 border-2 border-orange-400 opacity-40 transform rotate-45"></div>
      <div className="absolute bottom-4 right-6 w-4 h-4 border-2 border-amber-400 opacity-30 transform rotate-12" style={{borderRadius: '40% 60%'}}></div>

      <div className="flex mb-4">
        {[...Array(5)].map((_, i) => (
          <Star key={i} className="h-5 w-5 text-yellow-400 fill-yellow-400 group-hover:scale-110 transition-transform duration-300" style={{
            animationDelay: `${i * 0.1}s`
          }} />
        ))}
      </div>
      <p className="text-slate-700 mb-6 flex-grow leading-relaxed font-medium group-hover:text-slate-800 transition-colors duration-300">
        "{content}"
      </p>
      <div className="flex items-center">
        <div className="relative">
          <img 
            src={image} 
            alt={author} 
            className="w-12 h-12 object-cover mr-4 border-2 border-amber-300 group-hover:border-orange-400 transition-colors duration-300" 
            style={{borderRadius: '15px 10px 20px 15px'}}
          />
          <div className="absolute -top-1 -right-1 w-3 h-3 bg-green-400 rounded-full opacity-70"></div>
        </div>
        <div>
          <h4 className="text-slate-800 font-bold group-hover:text-amber-700 transition-colors duration-300">{author}</h4>
          <p className="text-slate-600 text-sm font-medium">{role}</p>
          <p className="text-amber-600 text-xs font-semibold">{company}</p>
        </div>
      </div>
    </div>
  );
};

const Testimonials = () => {
  const testimonials = [
    {
      content: "redesignr.ai transformed our outdated website into a modern masterpiece in just hours. Our conversion rate increased by 45% within the first month after implementation.",
      author: "Sarah Johnson",
      role: "Marketing Director",
      company: "TechVision",
      image: "https://images.pexels.com/photos/774909/pexels-photo-774909.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2"
    },
    {
      content: "I was skeptical about AI-generated designs, but redesignr.ai blew me away. The platform understood our brand perfectly and created a website that looks custom-made by a top agency.",
      author: "Michael Chen",
      role: "CEO",
      company: "StartupLaunch",
      image: "https://images.pexels.com/photos/614810/pexels-photo-614810.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2"
    },
    {
      content: "As a small business owner, I couldn't afford a professional redesign. redesignr.ai gave us an enterprise-quality website at a fraction of the cost. Our customers love the new look!",
      author: "Emily Rodriguez",
      role: "Owner",
      company: "Craft Coffee Co.",
      image: "https://images.pexels.com/photos/733872/pexels-photo-733872.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2"
    }
  ];

  return (
    <section className="py-20 relative overflow-hidden bg-gradient-to-br from-orange-50 via-amber-50 to-yellow-50">
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
      <div className="absolute top-1/2 right-1/2 w-16 h-16 border-3 border-yellow-400 opacity-20 transform rotate-45" style={{
        borderRadius: '50% 30% 60% 40%',
        borderStyle: 'dashed'
      }}></div>

      {/* Floating hand-drawn elements */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <div className="absolute top-10 left-10 w-3 h-3 bg-amber-400/40 opacity-60 transform rotate-12" style={{borderRadius: '30% 70%'}}></div>
        <div className="absolute top-20 right-20 w-2 h-2 bg-orange-400/50 rounded-full opacity-50"></div>
        <div className="absolute bottom-20 left-1/3 w-4 h-4 bg-yellow-400/40 opacity-60 transform rotate-45" style={{borderRadius: '40% 60%'}}></div>
        <div className="absolute top-1/3 right-1/3 w-2 h-2 bg-amber-300/40 rounded-full opacity-40"></div>
        <div className="absolute bottom-10 right-10 w-3 h-3 bg-orange-300/40 opacity-50 transform -rotate-12" style={{borderRadius: '60% 40%'}}></div>
      </div>
      
      <div className="container mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <div className="max-w-3xl mx-auto text-center mb-16">
          {/* Hand-drawn badge */}
          <div className="inline-block px-6 py-2 mb-6 bg-white/80 backdrop-blur-sm border-2 border-amber-300 shadow-lg transition-all duration-300 transform hover:scale-105" style={{
            borderRadius: '25px 20px 30px 15px',
            boxShadow: '3px 3px 0px rgba(245, 158, 11, 0.3)'
          }}>
            <span className="text-amber-700 text-sm font-bold flex items-center gap-2">
              <PenTool className="h-4 w-4" />
              ✨ What Our Users Say
            </span>
          </div>

          <h2 className="text-3xl sm:text-4xl font-bold mb-4 text-slate-800">
            Loved by{' '}
            <span className="bg-gradient-to-r from-amber-500 to-orange-500 bg-clip-text text-transparent relative">
              Businesses
              <svg className="absolute -bottom-2 left-0 w-full h-3" viewBox="0 0 200 12" fill="none">
                <path d="M5 8 Q100 4 195 8" stroke="#f59e0b" strokeWidth="2" strokeLinecap="round" fill="none" opacity="0.6"/>
              </svg>
            </span>{' '}
            Worldwide 🌍
          </h2>
          <p className="text-slate-600 text-lg leading-relaxed">
            Join hundreds of satisfied customers who have transformed their online presence with{' '}
            <span className="text-amber-600 font-semibold relative">
              redesignr.ai
              <svg className="absolute -bottom-1 left-0 w-full h-2" viewBox="0 0 100 8" fill="none">
                <path d="M2 6 Q50 2 98 6" stroke="#f59e0b" strokeWidth="1" strokeLinecap="round" fill="none" opacity="0.4"/>
              </svg>
            </span>
            . ✨
          </p>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-20">
          {testimonials.map((testimonial, index) => (
            <Testimonial 
              key={index}
              content={testimonial.content}
              author={testimonial.author}
              role={testimonial.role}
              company={testimonial.company}
              image={testimonial.image}
              index={index}
            />
          ))}
        </div>
        
        {/* Hand-drawn Stats */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-8 text-center">
          {[
            { number: "1600+", label: "Websites Redesigned", icon: "🎨" },
            { number: "28%", label: "Avg. Conversion Increase", icon: "📈" },
            { number: "4.5/5", label: "Customer Satisfaction", icon: "⭐" },
            { number: "15+", label: "Industries Served", icon: "🏢" }
          ].map((stat, index) => (
            <div key={index} className={`relative bg-white/80 backdrop-blur-sm border-2 border-amber-300 p-6 group hover:scale-105 transition-all duration-300 ${
              index % 2 === 0 ? 'hover:rotate-1' : 'hover:-rotate-1'
            }`} style={{
              borderRadius: index % 2 === 0 ? '25px 15px 30px 20px' : '20px 30px 15px 25px',
              boxShadow: '4px 4px 0px rgba(245, 158, 11, 0.3)'
            }}>
              {/* Decorative corner elements */}
              <div className="absolute top-1 right-1 w-2 h-2 bg-yellow-400 opacity-50 rounded-full"></div>
              <div className="absolute bottom-1 left-1 w-3 h-3 border border-orange-400 opacity-40 transform rotate-45" style={{borderRadius: '30% 70%'}}></div>
              
              <div className="text-2xl mb-2">{stat.icon}</div>
              <div className="text-3xl md:text-4xl font-bold text-slate-800 mb-2 group-hover:text-amber-600 transition-colors duration-300">
                {stat.number}
              </div>
              <div className="text-slate-600 font-medium group-hover:text-slate-700 transition-colors duration-300">
                {stat.label}
              </div>
            </div>
          ))}
        </div>

        {/* Hand-drawn CTA */}
        <div className="text-center mt-16">
          <div className="inline-block p-8 bg-gradient-to-r from-amber-50 to-orange-50 border-3 border-amber-300 relative" style={{
            borderRadius: '30px 20px 35px 25px',
            borderStyle: 'dashed',
            boxShadow: '6px 6px 0px rgba(245, 158, 11, 0.3)'
          }}>
            {/* Decorative elements */}
            <div className="absolute top-2 left-2 w-4 h-4 bg-yellow-400 opacity-50 rounded-full"></div>
            <div className="absolute top-3 right-3 w-3 h-3 border-2 border-orange-400 opacity-40 transform rotate-45"></div>
            <div className="absolute bottom-2 left-3 w-5 h-5 border-2 border-amber-400 opacity-35 transform rotate-12" style={{borderRadius: '40% 60%'}}></div>
            
            <h3 className="text-2xl font-bold text-slate-800 mb-4 relative">
              Ready to Join Them? 🚀
              <svg className="absolute -bottom-1 left-1/2 transform -translate-x-1/2 w-32 h-2" viewBox="0 0 128 8" fill="none">
                <path d="M2 6 Q64 2 126 6" stroke="#f59e0b" strokeWidth="2" strokeLinecap="round" fill="none" opacity="0.5"/>
              </svg>
            </h3>
            <p className="text-slate-600 mb-6 max-w-2xl leading-relaxed">
              Transform your website today and see why thousands of businesses trust{' '}
              <span className="text-amber-600 font-semibold">redesignr.ai</span>{' '}
              for their digital transformation! ✨
            </p>
            <button className="bg-gradient-to-r from-amber-400 to-orange-500 text-white px-8 py-4 font-bold text-lg shadow-lg transform hover:scale-105 transition-all duration-300 hover:from-amber-500 hover:to-orange-600" style={{
              borderRadius: '25px 15px 30px 20px',
              boxShadow: '4px 4px 0px rgba(245, 158, 11, 0.4)'
            }}>
              🎨 Start Your Transformation
            </button>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Testimonials;