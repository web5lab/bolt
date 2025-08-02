import React, { useEffect, useState } from 'react';
import { useParams, Link, Navigate } from 'react-router-dom';
import { Calendar, Clock, User, Tag, ArrowLeft, Share2, BookOpen, ExternalLink, Star, Heart, MessageCircle, Bookmark, Eye, ThumbsUp, Copy, CheckCircle, PenTool, Sparkles } from 'lucide-react';
import { blogs } from './blogs'; // Assuming you have a blogs data file
import Navbar from './Navbar';
import Footer from './Footer';
const BlogPost = () => {
  const { slug } = useParams();
  const blog = blogs.find(b => b.slug === slug);
  const [isLiked, setIsLiked] = useState(false);
  const [isBookmarked, setIsBookmarked] = useState(false);
  const [showShareMenu, setShowShareMenu] = useState(false);
  const [copySuccess, setCopySuccess] = useState(false);
  const [readingProgress, setReadingProgress] = useState(0);

  useEffect(() => {
    const handleScroll = () => {
      const article = document.querySelector('.article-content');
      if (article) {
        const scrollTop = window.scrollY;
        const docHeight = article.offsetHeight;
        const winHeight = window.innerHeight;
        const scrollPercent = (scrollTop / (docHeight - winHeight)) * 100;
        setReadingProgress(Math.min(scrollPercent, 100));
      }
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  if (!blog) {
    return <Navigate to="/blog" replace />;
  }

  const formatDate = (dateString) => {
    const date = new Date(dateString);
    return date.toLocaleDateString('en-US', {
      year: 'numeric',
      month: 'long',
      day: 'numeric'
    });
  };

  const handleShare = async () => {
    if (navigator.share) {
      try {
        await navigator.share({
          title: blog.title,
          text: blog.excerpt,
          url: window.location.href,
        });
      } catch (err) {
        console.log('Error sharing:', err);
      }
    } else {
      setShowShareMenu(!showShareMenu);
    }
  };

  const copyToClipboard = async () => {
    try {
      await navigator.clipboard.writeText(window.location.href);
      setCopySuccess(true);
      setTimeout(() => setCopySuccess(false), 2000);
    } catch (err) {
      console.log('Failed to copy');
    }
  };

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

      <Navbar />
     
      <main className="pt-8 relative z-10">
        {/* Back to Blog Link */}
        <div className="container mx-auto px-4 sm:px-6 lg:px-8 py-8">
          <div className="max-w-4xl mx-auto">
            <Link 
              to="/blog" 
              className="inline-flex items-center gap-2 text-amber-600 hover:text-orange-600 font-bold transition-colors mb-8 group"
            >
              <ArrowLeft className="h-4 w-4 group-hover:-translate-x-1 transition-transform" />
              ← Back to Blog
            </Link>
          </div>
        </div>

        {/* Hero Section */}
        <div className="relative overflow-hidden">
          <div className="container mx-auto px-4 sm:px-6 lg:px-8 relative z-10 py-12">
            <div className="max-w-4xl mx-auto">
              {/* Article Header */}
              <header className="mb-12">
                <div className="flex flex-wrap items-center gap-4 mb-6">
                  <span className="bg-white/80 backdrop-blur-sm border-2 border-amber-300 text-amber-700 px-4 py-2 text-sm font-bold shadow-lg" style={{borderRadius: '20px 15px 25px 10px'}}>
                    {blog.category}
                  </span>
                  <div className="flex items-center text-slate-600 text-sm font-medium">
                    <Calendar className="h-4 w-4 mr-1" />
                    {formatDate(blog.date)}
                  </div>
                  <div className="flex items-center text-slate-600 text-sm font-medium">
                    <Clock className="h-4 w-4 mr-1" />
                    {blog.readTime}
                  </div>
                  <div className="flex items-center text-slate-600 text-sm font-medium">
                    <Eye className="h-4 w-4 mr-1" />
                    {blog.views.toLocaleString()} views
                  </div>
                </div>

                <h1 className="text-4xl md:text-6xl font-bold text-white mb-6 leading-tight">
                  <span className="text-slate-800 relative">
                    {blog.title}
                    <svg className="absolute -bottom-2 left-0 w-full h-3" viewBox="0 0 400 12" fill="none">
                      <path d="M5 8 Q200 2 395 8" stroke="#f59e0b" strokeWidth="3" strokeLinecap="round" fill="none" opacity="0.6"/>
                    </svg>
                  </span>
                </h1>

                <p className="text-xl text-slate-600 mb-8 leading-relaxed">
                  {blog.excerpt}
                </p>

                {/* Author and Actions */}
                <div className="flex items-center justify-between flex-wrap gap-4">
                  <div className="flex items-center gap-4">
                    <div className="w-14 h-14 bg-gradient-to-r from-amber-400 to-orange-500 flex items-center justify-center shadow-lg" style={{borderRadius: '20px 15px 25px 10px'}}>
                      <User className="h-7 w-7 text-white" />
                    </div>
                    <div>
                      <p className="text-slate-800 font-bold text-lg">{blog.author}</p>
                      <p className="text-slate-600 text-sm font-medium">✨ AI Content Specialist</p>
                    </div>
                  </div>

                  <div className="flex items-center gap-2">
                    <button
                      onClick={() => setIsLiked(!isLiked)}
                      className={`flex items-center gap-2 px-4 py-2 rounded-lg font-medium transition-all ${isLiked
                          ? 'bg-red-100 text-red-600 border-2 border-red-300'
                          : 'bg-white/80 text-slate-700 border-2 border-slate-300 hover:bg-amber-50 hover:border-amber-400'
                        }`} style={{borderRadius: '15px 10px 20px 15px'}}
                    >
                      <Heart className={`h-4 w-4 ${isLiked ? 'fill-current' : ''}`} />
                      {blog.likes + (isLiked ? 1 : 0)}
                    </button>

                    <button
                      onClick={() => setIsBookmarked(!isBookmarked)}
                      className={`p-2 rounded-lg transition-all ${isBookmarked
                          ? 'bg-yellow-100 text-yellow-600 border-2 border-yellow-300'
                          : 'bg-white/80 text-slate-700 border-2 border-slate-300 hover:bg-amber-50 hover:border-amber-400'
                        }`} style={{borderRadius: '12px 8px 15px 10px'}}
                    >
                      <Bookmark className={`h-4 w-4 ${isBookmarked ? 'fill-current' : ''}`} />
                    </button>

                    <div className="relative">
                      <button
                        onClick={handleShare}
                        className="flex items-center gap-2 bg-white/80 hover:bg-amber-50 text-slate-700 hover:text-amber-700 px-4 py-2 border-2 border-slate-300 hover:border-amber-400 transition-all transform hover:scale-105" style={{borderRadius: '15px 10px 20px 15px'}}
                      >
                        <Share2 className="h-4 w-4" />
                        Share
                      </button>

                      {showShareMenu && (
                        <div className="absolute right-0 mt-2 w-48 bg-white border-2 border-amber-300 shadow-xl z-10" style={{borderRadius: '20px 15px 25px 10px'}}>
                          <div className="p-2">
                            <button
                              onClick={copyToClipboard}
                              className="w-full flex items-center gap-2 px-3 py-2 text-slate-700 hover:text-amber-700 hover:bg-amber-50 transition-colors font-medium" style={{borderRadius: '15px 10px 20px 15px'}}
                            >
                              {copySuccess ? <CheckCircle className="h-4 w-4" /> : <Copy className="h-4 w-4" />}
                              {copySuccess ? 'Copied!' : 'Copy Link'}
                            </button>
                          </div>
                        </div>
                      )}
                    </div>
                  </div>
                </div>
              </header>

              {/* Featured Image */}
              <div className="mb-12">
                <div className="relative group">
                  <img
                    src={blog.image}
                    alt={blog.title}
                    className="w-full h-64 md:h-96 object-cover shadow-2xl transition-transform duration-300 group-hover:scale-[1.02] border-3 border-amber-300" style={{
                      borderRadius: '30px 20px 35px 25px',
                      boxShadow: '8px 8px 0px rgba(245, 158, 11, 0.3)'
                    }}
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/20 to-transparent" style={{borderRadius: '30px 20px 35px 25px'}} />
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Article Content */}
        <div className="bg-white/80 backdrop-blur-sm">
          <div className="container mx-auto px-4 sm:px-6 lg:px-8 py-16">
            <div className="max-w-4xl mx-auto">
              <article className="article-content">
                <div
                  className="prose prose-lg max-w-none"
                  dangerouslySetInnerHTML={{ __html: blog.content }}
                />
              </article>

              {/* Engagement Section */}
              <div className="mt-16 p-8 bg-gradient-to-r from-amber-50 to-orange-50 border-3 border-amber-300" style={{
                borderRadius: '30px 20px 35px 25px',
                borderStyle: 'dashed'
              }}>
                <div className="flex items-center justify-between mb-6">
                  <h3 className="text-2xl font-bold text-slate-800">Enjoyed this article? 💖</h3>
                  <div className="flex items-center gap-2">
                    <MessageCircle className="h-5 w-5 text-slate-600" />
                    <span className="text-slate-600 font-medium">{blog.comments} comments</span>
                  </div>
                </div>
                <div className="flex items-center gap-4">
                  <button
                    onClick={() => setIsLiked(!isLiked)}
                    className={`flex items-center gap-2 px-6 py-3 rounded-lg font-medium transition-all ${isLiked
                        ? 'bg-red-100 text-red-600 border-2 border-red-300'
                        : 'bg-white text-slate-700 border-2 border-slate-300 hover:bg-amber-50 hover:border-amber-400'
                      }`} style={{borderRadius: '20px 15px 25px 10px'}}
                  >
                    <Heart className={`h-5 w-5 ${isLiked ? 'fill-current' : ''}`} />
                    {isLiked ? 'Liked' : 'Like'}
                  </button>
                  <button
                    onClick={handleShare}
                    className="flex items-center gap-2 bg-white hover:bg-amber-50 text-slate-700 hover:text-amber-700 px-6 py-3 border-2 border-slate-300 hover:border-amber-400 transition-all transform hover:scale-105" style={{borderRadius: '15px 25px 10px 20px'}}
                  >
                    <Share2 className="h-5 w-5" />
                    Share
                  </button>
                </div>
              </div>

              {/* Tags */}
              <div className="mt-12 pt-8 border-t-2 border-amber-200" style={{borderStyle: 'dashed'}}>
                <div className="flex items-center gap-2 mb-4">
                  <Tag className="h-5 w-5 text-amber-600" />
                  <span className="text-slate-800 font-bold">🏷️ Tags:</span>
                </div>
                <div className="flex flex-wrap gap-2">
                  {blog.tags.map((tag) => (
                    <span
                      key={tag}
                      className="bg-amber-100 hover:bg-amber-200 text-amber-700 hover:text-amber-800 px-4 py-2 text-sm transition-all cursor-pointer border-2 border-amber-300 hover:border-amber-400 font-medium transform hover:scale-105" style={{borderRadius: '15px 10px 20px 15px'}}
                    >
                      #{tag}
                    </span>
                  ))}
                </div>
              </div>

              {/* Call to Action */}
              <div className="mt-16 p-8 bg-gradient-to-r from-amber-100 to-orange-100 border-3 border-amber-400 text-center backdrop-blur-sm relative" style={{
                borderRadius: '30px 20px 35px 25px',
                borderStyle: 'dashed'
              }}>
                {/* Decorative elements */}
                <div className="absolute top-2 right-2 w-4 h-4 bg-yellow-400 opacity-50 rounded-full"></div>
                <div className="absolute bottom-2 left-2 w-3 h-3 border-2 border-orange-400 opacity-40 transform rotate-45"></div>
                
                <div className="w-16 h-16 bg-gradient-to-r from-amber-400 to-orange-500 flex items-center justify-center mx-auto mb-6 shadow-lg" style={{borderRadius: '20px 15px 25px 10px'}}>
                  <BookOpen className="h-8 w-8 text-white" />
                </div>
                <h3 className="text-3xl font-bold text-slate-800 mb-4 relative">
                  Ready to Build Your Website? 🚀
                  <svg className="absolute -bottom-1 left-1/2 transform -translate-x-1/2 w-64 h-2" viewBox="0 0 256 8" fill="none">
                    <path d="M2 6 Q128 2 254 6" stroke="#f59e0b" strokeWidth="2" strokeLinecap="round" fill="none" opacity="0.5"/>
                  </svg>
                </h3>
                <p className="text-slate-600 mb-8 text-lg leading-relaxed max-w-2xl mx-auto">
                  Put these insights into practice with our AI-powered website builder. Create stunning, SEO-optimized websites in minutes.
                </p>
                <Link
                  to="/dashboard"
                  className="inline-flex items-center gap-3 bg-gradient-to-r from-amber-400 to-orange-500 hover:from-amber-500 hover:to-orange-600 text-white px-8 py-4 font-bold transition-all duration-300 transform hover:scale-105 shadow-lg hover:shadow-xl" style={{
                    borderRadius: '25px 15px 30px 20px',
                    boxShadow: '4px 4px 0px rgba(245, 158, 11, 0.4)'
                  }}
                >
                  ✨ Start Building Now
                  <ArrowLeft className="h-5 w-5 rotate-180" />
                </Link>
              </div>
            </div>
          </div>
        </div>
      </main>

      <style jsx>{`
        /* Base Typography */
        .prose {
          color: #64748b;
          line-height: 1.75;
        }

        .prose .lead {
          font-size: 1.25rem;
          font-weight: 300;
          color: #475569;
          margin-bottom: 2rem;
          line-height: 1.6;
        }

        .prose p {
          margin-bottom: 1.5rem;
          font-size: 1.125rem;
          line-height: 1.7;
          color: #64748b;
        }

        .prose h2 {
          font-size: 2.25rem;
          font-weight: 700;
          color: #1e293b;
          margin-top: 3rem;
          margin-bottom: 1.5rem;
          position: relative;
          padding-bottom: 0.75rem;
        }

        .prose h2::after {
          content: '';
          position: absolute;
          bottom: 0;
          left: 0;
          width: 60px;
          height: 3px;
          background: linear-gradient(to right, #f59e0b, #f97316);
          border-radius: 2px;
        }

        .prose h3 {
          font-size: 1.5rem;
          font-weight: 600;
          color: #1e293b;
          margin-top: 2rem;
          margin-bottom: 1rem;
        }

        .prose h4 {
          font-size: 1.25rem;
          font-weight: 600;
          color: #1e293b;
          margin-bottom: 0.5rem;
        }

        .prose strong {
          color: #1e293b;
          font-weight: 600;
        }

        .prose em {
          color: #f59e0b;
          font-style: italic;
        }

        /* Tools Grid */
        .tools-grid {
          display: grid;
          grid-template-columns: repeat(auto-fit, minmax(350px, 1fr));
          gap: 2rem;
          margin: 3rem 0;
        }

        .tool-card {
          background: rgba(255, 255, 255, 0.9);
          border: 3px solid #fbbf24;
          border-radius: 25px 15px 30px 20px;
          padding: 2rem;
          transition: all 0.3s ease;
          backdrop-filter: blur(10px);
          position: relative;
          overflow: hidden;
          box-shadow: 4px 4px 0px rgba(245, 158, 11, 0.3);
        }

        .tool-card::before {
          content: '';
          position: absolute;
          top: 0;
          left: 0;
          right: 0;
          height: 3px;
          background: linear-gradient(to right, #f59e0b, #f97316);
          transform: scaleX(0);
          transform-origin: left;
          transition: transform 0.3s ease;
        }

        .tool-card:hover::before {
          transform: scaleX(1);
        }

        .tool-card:hover {
          transform: translateY(-4px);
          border-color: #f97316;
          box-shadow: 6px 6px 0px rgba(245, 158, 11, 0.4);
        }

        .tool-header h3 {
          font-size: 1.5rem;
          font-weight: 700;
          color: #1e293b;
          margin: 0 0 0.5rem 0;
        }

        .tool-category {
          font-size: 0.875rem;
          color: #f59e0b;
          font-weight: 500;
          display: block;
          margin-bottom: 1rem;
        }

        .tool-card p {
          color: #64748b;
          line-height: 1.6;
          margin-bottom: 1.5rem;
        }

        .tool-actions {
          display: flex;
          gap: 0.5rem;
          flex-wrap: wrap;
        }

        .tool-badge {
          background: rgba(245, 158, 11, 0.1);
          color: #f59e0b;
          padding: 0.25rem 0.75rem;
          border-radius: 15px 10px 20px 15px;
          font-size: 0.75rem;
          font-weight: 500;
          border: 2px solid rgba(245, 158, 11, 0.2);
        }

        /* Insight Cards */
        .insight-cards {
          display: grid;
          grid-template-columns: repeat(auto-fit, minmax(250px, 1fr));
          gap: 2rem;
          margin: 3rem 0;
        }

        .insight-card {
          background: rgba(255, 255, 255, 0.9);
          border: 3px solid #fbbf24;
          border-radius: 20px 15px 25px 10px;
          padding: 2rem;
          text-align: center;
          transition: all 0.3s ease;
          backdrop-filter: blur(10px);
          box-shadow: 4px 4px 0px rgba(245, 158, 11, 0.3);
        }

        .insight-card:hover {
          transform: translateY(-2px);
          border-color: #f97316;
          box-shadow: 6px 6px 0px rgba(245, 158, 11, 0.4);
        }

        .insight-icon {
          font-size: 2.5rem;
          margin-bottom: 1rem;
          display: block;
        }

        .insight-card h4 {
          color: #1e293b;
          font-size: 1.25rem;
          font-weight: 600;
          margin-bottom: 0.5rem;
        }

        .insight-card p {
          color: #64748b;
          font-size: 0.875rem;
          margin: 0;
        }

        /* Conclusion Highlight */
        .conclusion-highlight {
          background: linear-gradient(135deg, rgba(245, 158, 11, 0.1), rgba(249, 115, 22, 0.1));
          border: 3px dashed #fbbf24;
          border-radius: 25px 15px 30px 20px;
          padding: 2rem;
          margin: 2rem 0;
          text-align: center;
          font-size: 1.25rem;
          color: #475569;
          backdrop-filter: blur(10px);
        }

        /* Lists */
        .prose ul {
          margin: 2rem 0;
          padding-left: 0;
          list-style: none;
        }

        .prose ul li {
          position: relative;
          padding-left: 2rem;
          margin-bottom: 1rem;
          color: #64748b;
          line-height: 1.6;
        }

        .prose ul li::before {
          content: '→';
          position: absolute;
          left: 0;
          color: #f59e0b;
          font-weight: bold;
          font-size: 1.2rem;
        }

        .prose ol {
          margin: 2rem 0;
          padding-left: 0;
          list-style: none;
          counter-reset: item;
        }

        .prose ol li {
          position: relative;
          padding-left: 3rem;
          margin-bottom: 2rem;
          color: #64748b;
          line-height: 1.6;
          counter-increment: item;
        }

        .prose ol li::before {
          content: counter(item);
          position: absolute;
          left: 0;
          top: 0;
          background: linear-gradient(135deg, #f59e0b, #f97316);
          color: white;
          width: 2rem;
          height: 2rem;
          border-radius: 50%;
          display: flex;
          align-items: center;
          justify-content: center;
          font-weight: bold;
          font-size: 0.875rem;
        }

        /* Blockquotes */
        .prose blockquote {
          border-left: 4px solid #f59e0b;
          padding-left: 2rem;
          margin: 2rem 0;
          background: rgba(255, 255, 255, 0.8);
          border-radius: 0 20px 15px 0;
          padding: 1.5rem 2rem;
          font-style: italic;
          color: #475569;
          backdrop-filter: blur(10px);
        }

        /* Code */
        .prose code {
          background: rgba(245, 158, 11, 0.1);
          color: #f59e0b;
          padding: 0.25rem 0.5rem;
          border-radius: 8px 12px 8px 12px;
          font-family: 'Monaco', 'Menlo', monospace;
          font-size: 0.875rem;
          border: 2px solid rgba(245, 158, 11, 0.2);
        }

        .prose pre {
          background: rgba(255, 255, 255, 0.9);
          color: #64748b;
          padding: 1.5rem;
          border-radius: 20px 15px 25px 10px;
          overflow-x: auto;
          margin: 2rem 0;
          border: 3px solid #fbbf24;
          backdrop-filter: blur(10px);
        }

        /* Links */
        .prose a {
          color: #f59e0b;
          text-decoration: none;
          font-weight: 500;
          transition: all 0.2s ease;
          position: relative;
        }

        .prose a:hover {
          color: #f97316;
        }

        .prose a::after {
          content: '';
          position: absolute;
          width: 0;
          height: 2px;
          bottom: -2px;
          left: 0;
          background: linear-gradient(to right, #f59e0b, #f97316);
          transition: width 0.3s ease;
        }

        .prose a:hover::after {
          width: 100%;
        }

        /* Tables */
        .prose table {
          width: 100%;
          border-collapse: collapse;
          margin: 2rem 0;
          background: rgba(255, 255, 255, 0.9);
          border-radius: 20px 15px 25px 10px;
          overflow: hidden;
          border: 3px solid #fbbf24;
        }

        .prose th,
        .prose td {
          padding: 1rem;
          text-align: left;
          border-bottom: 2px solid rgba(245, 158, 11, 0.2);
        }

        .prose th {
          background: rgba(245, 158, 11, 0.1);
          color: #1e293b;
          font-weight: 600;
        }

        .prose td {
          color: #64748b;
        }

        /* Responsive Design */
        @media (max-width: 768px) {
          .tools-grid {
            grid-template-columns: 1fr;
            gap: 1.5rem;
          }

          .insight-cards {
            grid-template-columns: 1fr;
            gap: 1.5rem;
          }

          .tool-card {
            padding: 1.5rem;
          }

          .insight-card {
            padding: 1.5rem;
          }

          .prose h2 {
            font-size: 1.875rem;
          }

          .prose {
            font-size: 1rem;
          }

          .prose p {
            font-size: 1rem;
          }

          .conclusion-highlight {
            padding: 1.5rem;
            font-size: 1.125rem;
          }
        }

        /* Smooth Scrolling */
        html {
          scroll-behavior: smooth;
        }

        /* Selection */
        ::selection {
          background: rgba(245, 158, 11, 0.3);
          color: #1e293b;
        }

        /* Focus States */
        button:focus,
        a:focus {
          outline: 2px solid #f59e0b;
          outline-offset: 2px;
        }

        /* Animation for elements coming into view */
        .tool-card {
          animation: fadeInUp 0.6s ease-out;
        }

        .insight-card {
          animation: fadeInUp 0.6s ease-out;
        }

        @keyframes fadeInUp {
          from {
            opacity: 0;
            transform: translateY(30px);
          }
          to {
            opacity: 1;
            transform: translateY(0);
          }
        }

        /* Stagger animation for cards */
        .tool-card:nth-child(1) { animation-delay: 0.1s; }
        .tool-card:nth-child(2) { animation-delay: 0.2s; }
        .tool-card:nth-child(3) { animation-delay: 0.3s; }
        .tool-card:nth-child(4) { animation-delay: 0.4s; }
        .tool-card:nth-child(5) { animation-delay: 0.5s; }
        .tool-card:nth-child(6) { animation-delay: 0.6s; }

        .insight-card:nth-child(1) { animation-delay: 0.1s; }
        .insight-card:nth-child(2) { animation-delay: 0.2s; }
        .insight-card:nth-child(3) { animation-delay: 0.3s; }

        /* Scrollbar Styling */
        ::-webkit-scrollbar {
          width: 8px;
        }

        ::-webkit-scrollbar-track {
          background: rgba(245, 158, 11, 0.1);
        }

        ::-webkit-scrollbar-thumb {
          background: linear-gradient(to bottom, #f59e0b, #f97316);
          border-radius: 4px;
        }

        ::-webkit-scrollbar-thumb:hover {
          background: linear-gradient(to bottom, #d97706, #ea580c);
        }
      `}</style>
      <Footer />
    </div>
  );
};

export default BlogPost;