import React, { useEffect } from 'react';
import { Link } from 'react-router-dom';
import { Calendar, Clock, User, ArrowRight, Search, Filter, PenTool, Sparkles } from 'lucide-react';
import Navbar from '../components/Navbar';
import Footer from '../components/Footer';

const BlogList = () => {
  useEffect(() => {
    // Update page title and meta description for SEO
    document.title = 'Blog - AI Website Design Insights | redesignr.ai';
    
    const metaDescription = document.querySelector('meta[name="description"]');
    if (metaDescription) {
      metaDescription.setAttribute('content', 'Discover the latest insights, tutorials, and best practices in AI-powered web design, development, and digital strategy. Expert articles on website optimization, SEO, and modern web technologies.');
    }

    // Add structured data for blog list page
    const structuredData = {
      "@context": "https://schema.org",
      "@type": "Blog",
      "name": "redesignr.ai Blog",
      "description": "Expert insights on AI-powered web design, development, and digital strategy",
      "url": "https://redesignr.ai/blog",
      "publisher": {
        "@type": "Organization",
        "name": "redesignr.ai",
        "logo": {
          "@type": "ImageObject",
          "url": "https://redesignr.ai/logo.webp"
        }
      }
    };

    const script = document.createElement('script');
    script.type = 'application/ld+json';
    script.textContent = JSON.stringify(structuredData);
    document.head.appendChild(script);

    return () => {
      document.title = 'redesignr.ai - AI Website Builder';
      const scriptToRemove = document.querySelector('script[type="application/ld+json"]');
      if (scriptToRemove) {
        scriptToRemove.remove();
      }
    };
  }, []);

  const blogs = [
    {
      id: 1,
      title: "How AI is Revolutionizing Website Design in 2025",
      excerpt: "Discover how artificial intelligence is transforming the web design industry, from automated layouts to intelligent content generation.",
      slug: "ai-revolutionizing-website-design-2025",
      author: "Sarah Chen",
      date: "2025-01-15",
      readTime: "8 min read",
      category: "AI Technology",
      tags: ["AI", "Web Design", "Technology", "Future"],
      image: "https://images.pexels.com/photos/3861969/pexels-photo-3861969.jpeg?auto=compress&cs=tinysrgb&w=800",
      featured: true
    },
    {
      id: 2,
      title: "Complete Guide to Converting GitHub Repositories into Documentation",
      excerpt: "Learn how to transform your GitHub repos into beautiful, searchable documentation sites that developers will love.",
      slug: "github-repositories-documentation-guide",
      author: "Mike Rodriguez",
      date: "2025-01-12",
      readTime: "12 min read",
      category: "Documentation",
      tags: ["GitHub", "Documentation", "Developer Tools"],
      image: "https://images.pexels.com/photos/11035380/pexels-photo-11035380.jpeg?auto=compress&cs=tinysrgb&w=800"
    },
    {
      id: 3,
      title: "SEO Best Practices for AI-Generated Websites",
      excerpt: "Maximize your website's search engine visibility with these proven SEO strategies specifically for AI-generated content.",
      slug: "seo-best-practices-ai-generated-websites",
      author: "Emma Thompson",
      date: "2025-01-10",
      readTime: "10 min read",
      category: "SEO",
      tags: ["SEO", "AI", "Content Marketing", "Search Engine"],
      image: "https://images.pexels.com/photos/270637/pexels-photo-270637.jpeg?auto=compress&cs=tinysrgb&w=800"
    },
    {
      id: 4,
      title: "Building Responsive Websites: Mobile-First Design Principles",
      excerpt: "Master the art of responsive web design with mobile-first principles that ensure your site looks perfect on every device.",
      slug: "responsive-websites-mobile-first-design",
      author: "David Kim",
      date: "2025-01-08",
      readTime: "15 min read",
      category: "Web Design",
      tags: ["Responsive Design", "Mobile", "CSS", "UX"],
      image: "https://images.pexels.com/photos/196644/pexels-photo-196644.jpeg?auto=compress&cs=tinysrgb&w=800"
    }
  ];

  const featuredBlog = blogs.find(blog => blog.featured);
  const regularBlogs = blogs.filter(blog => !blog.featured);

  const formatDate = (dateString) => {
    const date = new Date(dateString);
    return date.toLocaleDateString('en-US', { 
      year: 'numeric', 
      month: 'long', 
      day: 'numeric' 
    });
  };

  const categories = [...new Set(blogs.map(blog => blog.category))];

  return (
    <div className="min-h-screen bg-gradient-to-br from-orange-50 via-amber-50 to-yellow-50 relative overflow-hidden">
      {/* Paper texture overlay */}
      <div className="absolute inset-0 opacity-20" style={{
        backgroundImage: `url("data:image/svg+xml,%3Csvg width='40' height='40' viewBox='0 0 40 40' xmlns='http://www.w3.org/2000/svg'%3E%3Cg fill='%23d4a574' fill-opacity='0.15'%3E%3Cpath d='M20 20c0-5.5-4.5-10-10-10s-10 4.5-10 10 4.5 10 10 10 10-4.5 10-10zm10 0c0-5.5-4.5-10-10-10s-10 4.5-10 10 4.5 10 10 10 10-4.5 10-10z'/%3E%3C/g%3E%3C/svg%3E")`
      }}></div>

      {/* Hand-drawn decorative elements */}
      <div className="absolute top-1/4 right-1/4 w-24 h-24 border-2 border-amber-400 opacity-30 transform rotate-12" style={{
        borderRadius: '60% 40% 70% 30%',
        borderStyle: 'dashed'
      }}></div>
      <div className="absolute bottom-1/3 left-1/4 w-20 h-20 border-2 border-orange-400 opacity-25 transform -rotate-12" style={{
        borderRadius: '40% 60% 30% 70%',
        borderStyle: 'dotted'
      }}></div>
      <div className="absolute top-1/2 right-1/2 w-16 h-16 border-3 border-yellow-400 opacity-20 transform rotate-45" style={{
        borderRadius: '50% 30% 60% 40%',
        borderStyle: 'dashed'
      }}></div>

      <Navbar />
      
      <main className="pt-20 relative z-10">
        {/* Header Section */}
        <section className="py-16">
          <div className="container mx-auto px-4 sm:px-6 lg:px-8">
            <div className="max-w-4xl mx-auto text-center">
              {/* Hand-drawn badge */}
              <div className="inline-block px-6 py-2 mb-6 bg-white/80 backdrop-blur-sm border-2 border-amber-300 shadow-lg" style={{
                borderRadius: '25px 15px 30px 20px'
              }}>
                <span className="text-amber-700 text-sm font-semibold flex items-center gap-2">
                  <PenTool className="h-4 w-4" />
                  ✨ AI Design Insights & Tutorials
                </span>
              </div>

              <h1 className="text-4xl md:text-6xl font-bold mb-6 leading-tight text-slate-800">
                <span className="relative inline-block">
                  Design Blog
                  <svg className="absolute -bottom-2 left-0 w-full h-3" viewBox="0 0 200 12" fill="none">
                    <path d="M5 8 Q100 4 195 8" stroke="#f59e0b" strokeWidth="2" strokeLinecap="round" fill="none" opacity="0.6"/>
                  </svg>
                </span>
                <br />
                <span className="bg-gradient-to-r from-amber-600 to-orange-600 bg-clip-text text-transparent">
                  & Insights
                </span>
              </h1>
              <p className="text-slate-600 text-lg md:text-xl leading-relaxed max-w-3xl mx-auto">
                Discover the latest insights, tutorials, and best practices in{' '}
                <span className="text-amber-600 font-semibold relative">
                  AI-powered web design
                  <svg className="absolute -bottom-1 left-0 w-full h-2" viewBox="0 0 200 8" fill="none">
                    <path d="M2 6 Q100 2 198 6" stroke="#f59e0b" strokeWidth="2" strokeLinecap="round" fill="none" opacity="0.4"/>
                  </svg>
                </span>
                , development, and digital strategy. 🎨
              </p>
            </div>
          </div>
        </section>

        {/* Featured Blog */}
        {featuredBlog && (
          <section className="pb-20">
            <div className="container mx-auto px-4 sm:px-6 lg:px-8">
              <div className="max-w-6xl mx-auto">
                <h2 className="text-2xl font-bold text-slate-800 mb-8 relative">
                  📌 Featured Article
                  <svg className="absolute -bottom-1 left-0 w-32 h-2" viewBox="0 0 128 8" fill="none">
                    <path d="M2 6 Q64 2 126 6" stroke="#f59e0b" strokeWidth="2" strokeLinecap="round" fill="none" opacity="0.5"/>
                  </svg>
                </h2>
                <Link to={`/blog/${featuredBlog.slug}`} className="block group">
                  <div className="bg-white/90 backdrop-blur-sm border-3 border-amber-300 overflow-hidden shadow-2xl hover:shadow-amber-500/20 transition-all duration-300 transform hover:scale-105" style={{
                    borderRadius: '30px 20px 35px 25px',
                    boxShadow: '8px 8px 0px rgba(245, 158, 11, 0.3)'
                  }}>
                    {/* Decorative corner elements */}
                    <div className="absolute top-2 right-2 w-4 h-4 bg-yellow-400 rounded-full opacity-60"></div>
                    <div className="absolute top-4 left-4 w-3 h-3 border-2 border-orange-400 opacity-50 transform rotate-45"></div>
                    
                    <div className="grid grid-cols-1 lg:grid-cols-2 gap-0">
                      <div className="relative overflow-hidden">
                        <img
                          src={featuredBlog.image}
                          alt={featuredBlog.title}
                          className="w-full h-64 lg:h-full object-cover group-hover:scale-105 transition-transform duration-500"
                        />
                        <div className="absolute top-4 left-4">
                          <span className="bg-gradient-to-r from-amber-400 to-orange-500 text-white px-3 py-1 text-sm font-bold shadow-lg" style={{borderRadius: '15px 10px 20px 15px'}}>
                            Featured
                          </span>
                        </div>
                      </div>
                      <div className="p-8 lg:p-12 flex flex-col justify-center">
                        <div className="flex items-center gap-4 mb-4">
                          <span className="bg-amber-100 text-amber-700 px-3 py-1 text-sm font-bold border-2 border-amber-300" style={{borderRadius: '15px 10px 20px 15px'}}>
                            {featuredBlog.category}
                          </span>
                          <div className="flex items-center text-slate-600 text-sm font-medium">
                            <Calendar className="h-4 w-4 mr-1" />
                            {formatDate(featuredBlog.date)}
                          </div>
                        </div>
                        <h3 className="text-2xl lg:text-3xl font-bold text-slate-800 mb-4 group-hover:text-amber-700 transition-colors">
                          {featuredBlog.title}
                        </h3>
                        <p className="text-slate-600 mb-6 leading-relaxed">
                          {featuredBlog.excerpt}
                        </p>
                        <div className="flex items-center justify-between">
                          <div className="flex items-center gap-3">
                            <div className="w-10 h-10 bg-gradient-to-r from-amber-400 to-orange-500 flex items-center justify-center shadow-lg" style={{borderRadius: '15px 10px 20px 15px'}}>
                              <User className="h-5 w-5 text-white" />
                            </div>
                            <div>
                              <p className="text-slate-800 font-bold">{featuredBlog.author}</p>
                              <div className="flex items-center text-slate-600 text-sm">
                                <Clock className="h-3 w-3 mr-1" />
                                {featuredBlog.readTime}
                              </div>
                            </div>
                          </div>
                          <div className="flex items-center gap-2 text-amber-600 hover:text-orange-600 font-bold transition-colors">
                            Read More
                            <ArrowRight className="h-4 w-4 group-hover:translate-x-1 transition-transform" />
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                </Link>
              </div>
            </div>
          </section>
        )}

        {/* Blog Grid */}
        <section className="pb-20">
          <div className="container mx-auto px-4 sm:px-6 lg:px-8">
            <div className="max-w-6xl mx-auto">
              <h2 className="text-2xl font-bold text-slate-800 mb-8 relative">
                📚 Latest Articles
                <svg className="absolute -bottom-1 left-0 w-32 h-2" viewBox="0 0 128 8" fill="none">
                  <path d="M2 6 Q64 2 126 6" stroke="#f59e0b" strokeWidth="2" strokeLinecap="round" fill="none" opacity="0.5"/>
                </svg>
              </h2>
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                {regularBlogs.map((blog) => (
                  <Link key={blog.id} to={`/blog/${blog.slug}`} className="block group">
                    <article className="bg-white/90 backdrop-blur-sm border-3 border-amber-300 overflow-hidden shadow-lg hover:shadow-amber-500/20 transition-all duration-300 hover:transform hover:scale-105 h-full relative" style={{
                      borderRadius: '25px 15px 30px 20px',
                      boxShadow: '4px 4px 0px rgba(245, 158, 11, 0.3)'
                    }}>
                      {/* Decorative corner elements */}
                      <div className="absolute top-2 left-2 w-3 h-3 bg-amber-400 opacity-40 rounded-full"></div>
                      <div className="absolute top-2 right-2 w-2 h-2 bg-orange-400 opacity-50 transform rotate-45"></div>
                      
                      <div className="relative overflow-hidden">
                        <img
                          src={blog.image}
                          alt={blog.title}
                          className="w-full h-48 object-cover group-hover:scale-110 transition-transform duration-500"
                        />
                        <div className="absolute top-3 left-3">
                          <span className="bg-white/90 backdrop-blur-sm text-amber-700 px-2 py-1 text-xs font-bold border border-amber-300" style={{borderRadius: '12px 8px 15px 10px'}}>
                            {blog.category}
                          </span>
                        </div>
                      </div>
                      
                      <div className="p-6 flex flex-col h-full">
                        <div className="flex items-center gap-3 mb-3 text-xs text-slate-600 font-medium">
                          <div className="flex items-center">
                            <Calendar className="h-3 w-3 mr-1" />
                            {formatDate(blog.date)}
                          </div>
                          <div className="flex items-center">
                            <Clock className="h-3 w-3 mr-1" />
                            {blog.readTime}
                          </div>
                        </div>
                        
                        <h3 className="text-lg font-bold text-slate-800 mb-3 group-hover:text-amber-700 transition-colors line-clamp-2 flex-grow">
                          {blog.title}
                        </h3>
                        
                        <p className="text-slate-600 text-sm mb-4 line-clamp-3 flex-grow">
                          {blog.excerpt}
                        </p>
                        
                        <div className="flex items-center justify-between mt-auto">
                          <div className="flex items-center gap-2">
                            <div className="w-6 h-6 bg-gradient-to-r from-amber-400 to-orange-500 flex items-center justify-center" style={{borderRadius: '8px 12px 8px 12px'}}>
                              <User className="h-3 w-3 text-white" />
                            </div>
                            <span className="text-slate-600 text-xs font-medium">{blog.author}</span>
                          </div>
                          
                          <div className="flex items-center gap-1 text-amber-600 hover:text-orange-600 text-sm font-bold transition-colors">
                            Read
                            <ArrowRight className="h-3 w-3 group-hover:translate-x-1 transition-transform" />
                          </div>
                        </div>
                        
                        {/* Tags */}
                        <div className="flex flex-wrap gap-1 mt-4">
                          {blog.tags.slice(0, 3).map((tag) => (
                            <span
                              key={tag}
                              className="bg-amber-100 text-amber-700 px-2 py-1 text-xs font-medium border border-amber-300" style={{borderRadius: '8px 12px 8px 12px'}}
                            >
                              #{tag}
                            </span>
                          ))}
                        </div>
                      </div>
                    </article>
                  </Link>
                ))}
              </div>
            </div>
          </div>
        </section>
      </main>

      <style jsx>{`
        @keyframes float {
          0%, 100% { transform: translateY(0px) rotate(0deg); }
          50% { transform: translateY(-10px) rotate(5deg); }
        }
        .animate-float {
          animation: float 6s ease-in-out infinite;
        }
      `}</style>

      <Footer />
    </div>
  );
};

export default BlogList;