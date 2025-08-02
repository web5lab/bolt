import React, { useEffect, useState } from 'react';
import { ExternalLink, Wand2, ChevronLeft, ChevronRight, Zap, X, Sparkles } from 'lucide-react';
import { RemixModal } from './TemplatesModal';
import { useDispatch, useSelector } from 'react-redux';
import { templateSelector, totalTemplatesPagesSelector, UserSelector } from '../../store/global.Selctor';
import { getTemplates } from '../../store/global.Action';
import toast from 'react-hot-toast';

const TemplatesTab = ({ user, setShowBilling, mainContentAnimation ,onRemixTemplate }) => {
  const [remixModal, setRemixModal] = useState({ isOpen: false, template: null });
  const [currentPage, setCurrentPage] = useState(1);
  const [selectedTemplate, setSelectedTemplate] = useState(null);
  const dispatch = useDispatch();
  const templates = useSelector(templateSelector)
  const totalPages = useSelector(totalTemplatesPagesSelector);
  const templatesPerPage = 9;


  useEffect(() => {
    dispatch(getTemplates({ page: currentPage, limit: templatesPerPage }));
  }, []);


  const startIndex = (currentPage - 1) * templatesPerPage;
  const endIndex = Math.min(startIndex + templatesPerPage, templates.length);

  const remixFunction = (template) => {
    setRemixModal({ isOpen: true, template });
  };

  const handlePageChange = (page) => {
    if (page >= 1 && page <= totalPages && page !== currentPage) {
      setCurrentPage(page);
      dispatch(getTemplates({ page: page, limit: templatesPerPage }));
    }
  };

  const handlePrevPage = () => {
    handlePageChange(currentPage - 1);
  };

  const handleNextPage = () => {
    handlePageChange(currentPage + 1);
  };

  const handlePreviewTemplate = (template) => {
    setSelectedTemplate(template);
  };

  // Generate page numbers for pagination
  const getVisiblePages = () => {
    const pages = [];
    const maxVisiblePages = 5;

    if (totalPages <= maxVisiblePages) {
      // Show all pages if total is small
      for (let i = 1; i <= totalPages; i++) {
        pages.push(i);
      }
    } else {
      // Always show first page
      pages.push(1);

      let startPage = Math.max(2, currentPage - 1);
      let endPage = Math.min(totalPages - 1, currentPage + 1);

      // Adjust range to always show at least 3 middle pages
      if (currentPage <= 3) {
        endPage = Math.min(totalPages - 1, 4);
      } else if (currentPage >= totalPages - 2) {
        startPage = Math.max(2, totalPages - 3);
      }

      // Add ellipsis if there's a gap
      if (startPage > 2) {
        pages.push('...');
      }

      // Add middle pages
      for (let i = startPage; i <= endPage; i++) {
        pages.push(i);
      }

      // Add ellipsis if there's a gap
      if (endPage < totalPages - 1) {
        pages.push('...');
      }

      // Always show last page (if more than 1 page total)
      if (totalPages > 1) {
        pages.push(totalPages);
      }
    }

    return pages;
  };

  // Pagination component for reuse
  const PaginationControls = ({ className = "" }) => (
    <div className={`flex flex-col sm:flex-row items-center justify-between gap-4 ${className}`}>
      {/* Mobile pagination info */}
      <div className="text-sm text-slate-400 sm:hidden">
        Page {currentPage} of {totalPages} ({templates.length} total)
      </div>

      <div className="flex items-center gap-2">
        {/* Previous button */}
        <button
          onClick={handlePrevPage}
          disabled={currentPage === 1}
          className="flex items-center gap-1 px-3 py-2 rounded-lg bg-slate-700 text-white hover:bg-slate-600 disabled:opacity-50 disabled:cursor-not-allowed transition-colors text-sm"
          aria-label="Previous page"
        >
          <ChevronLeft className="h-4 w-4" />
          <span className="hidden sm:inline">Previous</span>
        </button>

        {/* Page numbers */}
        <div className="flex gap-1">
          {getVisiblePages().map((page, index) => {
            if (page === '...') {
              return (
                <span key={`ellipsis-${index}`} className="px-2 py-2 text-slate-400 text-sm">
                  ...
                </span>
              );
            }

            return (
              <button
                key={page}
                onClick={() => handlePageChange(page)}
                className={`px-3 py-2 rounded-lg transition-colors text-sm min-w-[2.5rem] ${currentPage === page
                  ? 'bg-indigo-600 text-white font-medium'
                  : 'bg-slate-700 text-slate-300 hover:bg-slate-600'
                  }`}
                aria-label={`Go to page ${page}`}
                aria-current={currentPage === page ? 'page' : undefined}
              >
                {page}
              </button>
            );
          })}
        </div>

        {/* Next button */}
        <button
          onClick={handleNextPage}
          disabled={currentPage === totalPages}
          className="flex items-center gap-1 px-3 py-2 rounded-lg bg-slate-700 text-white hover:bg-slate-600 disabled:opacity-50 disabled:cursor-not-allowed transition-colors text-sm"
          aria-label="Next page"
        >
          <span className="hidden sm:inline">Next</span>
          <ChevronRight className="h-4 w-4" />
        </button>
      </div>

      {/* Desktop pagination info */}
      <div className="hidden sm:block text-sm text-slate-400">
        {startIndex + 1}-{endIndex} of {templates.length}
      </div>
    </div>
  );



  return (
    <>
      <RemixModal
        isOpen={remixModal.isOpen}
        onClose={() => setRemixModal({ isOpen: false, template: null })}
        template={remixModal.template}
        onRemix={onRemixTemplate}
      />
      {selectedTemplate && (
        <div className="fixed inset-0 bg-amber-900/60 backdrop-blur-sm z-50 flex items-center justify-center p-4">
          <div className="bg-white/95 backdrop-blur-sm border-3 border-amber-400 max-w-6xl w-full max-h-[90vh] overflow-hidden shadow-2xl" style={{
            borderRadius: '30px 20px 35px 25px',
            boxShadow: '8px 8px 0px rgba(245, 158, 11, 0.3)'
          }}>
            {/* Modal Header */}
            <div className="flex items-center justify-between px-6 py-4 border-b-2 border-amber-300 bg-gradient-to-r from-amber-100 to-orange-100" style={{
              borderBottomStyle: 'dashed',
              borderRadius: '27px 17px 0 0'
            }}>
              <div className="flex-1 min-w-0">
                <button
                  onClick={() => remixFunction(selectedTemplate)}
                  className="w-full max-w-80 flex items-center justify-center gap-2 bg-gradient-to-r from-amber-400 to-orange-500 text-white py-3 px-6 font-bold hover:from-amber-500 hover:to-orange-600 transition-all duration-200 transform hover:scale-105 shadow-lg"
                  style={{
                    borderRadius: '25px 15px 30px 20px',
                    boxShadow: '4px 4px 0px rgba(245, 158, 11, 0.4)'
                  }}
                >
                  <Zap className="h-5 w-5" />
                  ✨ Use This Template
                </button>
              </div>
              <button
                onClick={() => setSelectedTemplate(null)}
                className="p-2 hover:bg-amber-200 transition-colors flex-shrink-0 ml-4 border-2 border-amber-300 hover:border-orange-400"
                style={{borderRadius: '12px 8px 15px 10px'}}
              >
                <X className="h-6 w-6 text-slate-600" />
              </button>
            </div>
            {/* Modal Content */}
            <div className=" overflow-y-auto max-h-[calc(90vh-120px)]">
              <div className="grid grid-cols-1  gap-8">
                {/* Preview Image */}
                <div className="lg:col-">
                  <div className="aspect-[16/10] overflow-hidden bg-white border-2 border-amber-300 m-4" style={{
                    borderRadius: '20px 15px 25px 10px'
                  }}>
                    <iframe
                      src={selectedTemplate?.previewUrl}
                      className="w-full h-full"
                    />
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}
      <div className={`${mainContentAnimation} relative`} style={{ animationDelay: '0.5s' }}>
        {/* Paper background */}
        <div className="absolute inset-0 bg-gradient-to-br from-orange-50 via-amber-50 to-yellow-50 opacity-50" style={{
          backgroundImage: `url("data:image/svg+xml,%3Csvg width='40' height='40' viewBox='0 0 40 40' xmlns='http://www.w3.org/2000/svg'%3E%3Cg fill='%23d4a574' fill-opacity='0.1'%3E%3Cpath d='M20 20c0-5.5-4.5-10-10-10s-10 4.5-10 10 4.5 10 10 10 10-4.5 10-10zm10 0c0-5.5-4.5-10-10-10s-10 4.5-10 10 4.5 10 10 10 10-4.5 10-10z'/%3E%3C/g%3E%3C/svg%3E")`
        }}></div>
        
        {/* Decorative elements */}
        <div className="absolute top-10 right-10 w-12 h-12 border-2 border-amber-400 opacity-30 transform rotate-12" style={{
          borderRadius: '60% 40% 70% 30%',
          borderStyle: 'dashed'
        }}></div>
        
        <div className="mb-6">
          <div className="flex items-center justify-between mb-4">
            <h2 className="text-xl font-semibold text-slate-800 relative z-10">
              🎨 Template Categories
              <svg className="absolute -bottom-1 left-0 w-32 h-2" viewBox="0 0 128 8" fill="none">
                <path d="M2 6 Q64 2 126 6" stroke="#f59e0b" strokeWidth="2" strokeLinecap="round" fill="none" opacity="0.5"/>
              </svg>
            </h2>
            <div className="text-sm text-slate-700 bg-white/80 backdrop-blur-sm border-2 border-amber-300 px-3 py-1 relative z-10" style={{
              borderRadius: '15px 10px 20px 15px'
            }}>
              Your plan: <span className="text-amber-600 font-bold">💎 {user?.currentPlan || 'Free'}</span>
            </div>
          </div>
          <p className="text-slate-700 text-sm leading-relaxed relative z-10">
            🚀 Browse our collection of professionally designed templates. Click "Remix" to customize any template with your own content and branding! ✨
          </p>
        </div>

        {/* Top Pagination Controls */}
        <div className="relative z-10">
          <PaginationControls className="mb-6" />
        </div>

        <div className="flex-1 overflow-y-auto">
          <div className="templates-grid grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 mb-8 relative z-10">
            {templates.map((template) => (
              <div
                key={template.id}
                className="group bg-white/90 backdrop-blur-sm overflow-hidden border-2 border-amber-300 hover:border-orange-400 transition-all transform hover:scale-105 shadow-lg"
                style={{
                  borderRadius: '20px 15px 25px 10px',
                  boxShadow: '4px 4px 0px rgba(245, 158, 11, 0.3)'
                }}
              >
                <div className="aspect-[2/1] relative overflow-hidden">
                  <img
                    src={template.image}
                    alt={template.name}
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                  />
                  {template.isPremium && (
                    <div className="absolute top-2 right-2 bg-gradient-to-r from-yellow-400 to-orange-500 text-white text-xs font-bold px-2 py-1" style={{borderRadius: '12px 8px 15px 10px'}}>
                      ⭐ PRO
                    </div>
                  )}
                  <div className="absolute inset-0 bg-amber-900/60 opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-center justify-center">
                    <button
                      onClick={() => handlePreviewTemplate(template)}
                      className="bg-white/90 backdrop-blur-sm p-2 hover:bg-white transition-colors border-2 border-amber-400"
                      style={{borderRadius: '12px 8px 15px 10px'}}
                      title="Preview template"
                    >
                      <ExternalLink className="h-5 w-5 text-amber-600" />
                    </button>
                  </div>
                </div>
                <div className="p-4">
                  <h4 className="font-bold text-slate-800 mb-2 truncate">{template.name}</h4>
                  <p className="text-xs text-slate-600 mb-3 line-clamp-2">{template.description}</p>
                  <div className="flex gap-2">
                    <button
                      onClick={() => handlePreviewTemplate(template)}
                      className="flex-1 bg-white border-2 border-amber-300 hover:border-orange-400 text-slate-700 hover:text-amber-700 py-2 px-3 text-sm font-medium transition-colors hover:bg-amber-50 transform hover:scale-105"
                      style={{borderRadius: '15px 10px 20px 15px'}}
                    >
                      👁️ Preview
                    </button>
                    <button
                      onClick={() => remixFunction(template)}
                      className="flex-1 bg-gradient-to-r from-amber-400 to-orange-500 hover:from-amber-500 hover:to-orange-600 text-white py-2 px-3 text-sm font-bold transition-colors flex items-center justify-center gap-1 transform hover:scale-105 shadow-md"
                      style={{
                        borderRadius: '20px 15px 25px 10px',
                        boxShadow: '2px 2px 0px rgba(245, 158, 11, 0.3)'
                      }}
                    >
                      <Wand2 className="h-3 w-3" />
                      ✨ Remix
                    </button>
                  </div>
                </div>
              </div>
            ))}
          </div>

        </div>

        {/* Plan upgrade prompt for free users */}
        {(!user?.currentPlan || user.currentPlan.toLowerCase() === 'free') && (
          <div className="mt-8 p-6 bg-gradient-to-r from-amber-100 to-orange-100 border-3 border-amber-400 relative z-10 shadow-lg" style={{
            borderRadius: '30px 20px 35px 25px',
            borderStyle: 'dashed',
            boxShadow: '6px 6px 0px rgba(245, 158, 11, 0.3)'
          }}>
            <h3 className="text-lg font-bold text-slate-800 mb-2">🔓 Unlock Premium Templates</h3>
            <p className="text-slate-700 mb-4 leading-relaxed">
              ⚡ Upgrade your plan to access our full collection of professionally designed templates and remix them with AI magic! ✨
            </p>
            <button
              onClick={() => setShowBilling(true)}
              className="bg-gradient-to-r from-amber-400 to-orange-500 text-white px-6 py-2 font-bold hover:from-amber-500 hover:to-orange-600 transition-all transform hover:scale-105 shadow-lg"
              style={{
                borderRadius: '20px 15px 25px 10px',
                boxShadow: '3px 3px 0px rgba(245, 158, 11, 0.4)'
              }}
            >
              🚀 View Plans
            </button>
          </div>
        )}
      </div>
    </>
  );
};

export default TemplatesTab;