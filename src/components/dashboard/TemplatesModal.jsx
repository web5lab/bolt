import React, { useState } from 'react';
import { Wand2, Upload, X, Globe, FileText } from 'lucide-react';

// Remix Modal Component with Tabs
export const RemixModal = ({ isOpen, onClose, template, onRemix }) => {
  const [activeTab, setActiveTab] = useState('url'); // 'url' or 'instructions'
  const [customInstructions, setCustomInstructions] = useState('');
  const [selectedImage, setSelectedImage] = useState(null);
  const [website, setWebsite] = useState('');

  const handleSubmit = () => {
    const uuidRegex = /[0-9a-f]{8}-[0-9a-f]{4}-[1-5][0-9a-f]{3}-[89ab][0-9a-f]{3}-[0-9a-f]{12}/i;
    const match = template.name.match(uuidRegex);
    const data = {
      sourceUuid: match ? match[0] : null,
      instruction: customInstructions.trim(),
      mode: activeTab == "url" ? "remix" : 'create',
      url:website.trim()
    }
    onRemix(data);
    onClose();
    setCustomInstructions('');
    setSelectedImage(null);
    setWebsite('');
  };

  const resetForm = () => {
    setCustomInstructions('');
    setSelectedImage(null);
    setWebsite('');
  };

  const handleClose = () => {
    onClose();
    resetForm();
  };

  if (!isOpen || !template) return null;

  return (
    <div className="fixed inset-0 bg-amber-900/70 backdrop-blur-md z-[110] flex items-center justify-center p-4">
      <div className="bg-white/95 backdrop-blur-sm shadow-2xl border-3 border-amber-400 w-full max-w-2xl p-6 relative" style={{
        borderRadius: '30px 20px 35px 25px',
        boxShadow: '8px 8px 0px rgba(245, 158, 11, 0.3)'
      }}>
        {/* Paper texture overlay */}
        <div className="absolute inset-0 opacity-20 pointer-events-none" style={{
          backgroundImage: `url("data:image/svg+xml,%3Csvg width='40' height='40' viewBox='0 0 40 40' xmlns='http://www.w3.org/2000/svg'%3E%3Cg fill='%23d4a574' fill-opacity='0.15'%3E%3Cpath d='M20 20c0-5.5-4.5-10-10-10s-10 4.5-10 10 4.5 10 10 10 10-4.5 10-10zm10 0c0-5.5-4.5-10-10-10s-10 4.5-10 10 4.5 10 10 10 10-4.5 10-10z'/%3E%3C/g%3E%3C/svg%3E")`
        }}></div>
        
        {/* Decorative elements */}
        <div className="absolute top-2 right-2 w-4 h-4 bg-yellow-400 opacity-60 rounded-full"></div>
        <div className="absolute top-4 left-4 w-3 h-3 border-2 border-orange-400 opacity-50 transform rotate-45"></div>
        <div className="absolute bottom-4 right-6 w-2 h-2 bg-amber-400 opacity-70 transform rotate-12" style={{borderRadius: '30% 70%'}}></div>

        <div className="flex items-center justify-between mb-6 relative z-10">
          <h3 className="text-xl font-bold text-slate-800 relative">
            Remix Template: {template.name}
            <svg className="absolute -bottom-1 left-0 w-full h-2" viewBox="0 0 200 8" fill="none">
              <path d="M2 6 Q100 2 198 6" stroke="#f59e0b" strokeWidth="2" strokeLinecap="round" fill="none" opacity="0.4"/>
            </svg>
          </h3>
          <button
            onClick={handleClose}
            className="text-slate-600 hover:text-slate-800 p-2 hover:bg-amber-200 border-2 border-amber-300 hover:border-orange-400 transition-colors" style={{borderRadius: '12px 8px 15px 10px'}}
          >
            <X className="h-5 w-5" />
          </button>
        </div>

        <div className="space-y-6 relative z-10">
          {/* Template Preview */}
          <div className="bg-gradient-to-r from-amber-50 to-orange-50 border-2 border-amber-300 p-4" style={{
            borderRadius: '20px 15px 25px 10px',
            borderStyle: 'dashed'
          }}>
            <div className="flex items-start gap-4">
              <img
                src={template.image}
                alt={template.name}
                className="w-24 h-18 object-cover flex-shrink-0 border-2 border-amber-400" style={{borderRadius: '15px 10px 20px 15px'}}
              />
              <div>
                <h4 className="font-bold text-slate-800 mb-1">{template.name}</h4>
                <p className="text-slate-600 text-sm mb-2">{template.description}</p>
                <p className="text-slate-500 text-xs">Source: {template.url}</p>
              </div>
            </div>
          </div>

          {/* Tabs */}
          <div className="border-b-2 border-amber-300" style={{borderStyle: 'dashed'}}>
            <nav className="flex space-x-8">
              <button
                onClick={() => setActiveTab('url')}
                className={`py-2 px-1 border-b-2 font-bold text-sm transition-colors ${activeTab === 'url'
                  ? 'border-amber-500 text-amber-600'
                  : 'border-transparent text-slate-600 hover:text-slate-800 hover:border-amber-300'
                  }`}
              >
                <div className="flex items-center gap-2">
                  <Globe className="h-4 w-4" />
                  Remix from URL
                </div>
              </button>
              <button
                onClick={() => setActiveTab('instructions')}
                className={`py-2 px-1 border-b-2 font-bold text-sm transition-colors ${activeTab === 'instructions'
                  ? 'border-amber-500 text-amber-600'
                  : 'border-transparent text-slate-600 hover:text-slate-800 hover:border-amber-300'
                  }`}
              >
                <div className="flex items-center gap-2">
                  <FileText className="h-4 w-4" />
                  Remix with Instructions
                </div>
              </button>
            </nav>
          </div>

          {/* Tab Content */}
          <div className="min-h-[200px]">
            {activeTab === 'url' && (
              <div className="space-y-4">
                <div>
                  <label htmlFor="website" className="block text-slate-800 font-bold mb-2">
                    Enter your website URL to redesign
                  </label>
                  <input
                    type="url"
                    id="website"
                    value={website}
                    onChange={(e) => setWebsite(e.target.value)}
                    placeholder="https://your-website.com"
                    className="w-full bg-white border-2 border-amber-300 px-4 py-3 text-slate-700 placeholder-slate-500 focus:outline-none focus:ring-2 focus:ring-amber-500 focus:border-amber-500" style={{borderRadius: '15px 20px 15px 20px'}}
                  />
                  <p className="text-slate-600 text-sm mt-2">
                    We'll analyze your website and apply the template's design principles to create a new version.
                  </p>
                </div>

                <div>
                  <label htmlFor="urlInstructions" className="block text-slate-800 font-bold mb-2">
                    Additional Instructions (Optional)
                  </label>
                  <textarea
                    id="urlInstructions"
                    value={customInstructions}
                    onChange={(e) => setCustomInstructions(e.target.value)}
                    rows={3}
                    placeholder="Any specific changes you'd like to make while applying this template..."
                    className="w-full bg-white border-2 border-amber-300 px-4 py-3 text-slate-700 placeholder-slate-500 focus:outline-none focus:ring-2 focus:ring-amber-500 focus:border-amber-500" style={{borderRadius: '15px 20px 15px 20px'}}
                  />
                </div>
              </div>
            )}

            {activeTab === 'instructions' && (
              <div className="space-y-4">
                <div>
                  <label htmlFor="remixInstructions" className="block text-slate-800 font-bold mb-2">
                    Customization Instructions
                  </label>
                  <textarea
                    id="remixInstructions"
                    value={customInstructions}
                    onChange={(e) => setCustomInstructions(e.target.value)}
                    rows={6}
                    placeholder="Describe how you'd like to customize this template (e.g., 'Change colors to blue theme', 'Add contact form', 'Make it for a restaurant', 'Convert to a portfolio site')..."
                    className="w-full bg-white border-2 border-amber-300 px-4 py-3 text-slate-700 placeholder-slate-500 focus:outline-none focus:ring-2 focus:ring-amber-500 focus:border-amber-500" style={{borderRadius: '15px 20px 15px 20px'}}
                  />
                  <p className="text-slate-600 text-sm mt-2">
                    Be as specific as possible about the changes you want. The more details you provide, the better the result.
                  </p>
                </div>
              </div>
            )}
          </div>

          {/* Action Buttons */}
          <div className="flex justify-end gap-3 pt-4 border-t-2 border-amber-300" style={{borderStyle: 'dashed'}}>
            <button
              onClick={handleClose}
              className="px-4 py-2 bg-white border-2 border-amber-300 hover:border-orange-400 text-slate-700 hover:text-amber-700 hover:bg-amber-50 transition-all duration-300 font-bold" style={{borderRadius: '15px 20px 15px 20px'}}
            >
              Cancel
            </button>
            <button
              onClick={handleSubmit}
              disabled={activeTab === 'url' ? !website.trim() : !customInstructions.trim()}
              className="flex items-center gap-2 bg-gradient-to-r from-amber-400 to-orange-500 text-white px-6 py-2 font-bold hover:from-amber-500 hover:to-orange-600 transition-all disabled:opacity-50 disabled:cursor-not-allowed transform hover:scale-105 shadow-lg" style={{
                borderRadius: '20px 15px 25px 10px',
                boxShadow: '3px 3px 0px rgba(245, 158, 11, 0.4)'
              }}
            >
              <Wand2 className="h-4 w-4" />
              Remix Template
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};