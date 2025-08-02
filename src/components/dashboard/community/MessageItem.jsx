import React, { useState } from 'react';
import { Clock, ExternalLink, Link as LinkIcon, Sparkles } from 'lucide-react';
import toast from 'react-hot-toast';
import { RemixModal } from '../TemplatesModal';

const MessageItem = ({ message }) => {
  const [showRemixModal, setShowRemixModal] = useState(false);
  const [selectedTemplate, setSelectedTemplate] = useState(null);

  const formatTime = (timestamp) => {
    const date = new Date(timestamp);
    const now = new Date();
    const diffMs = now - date;
    const diffMins = Math.floor(diffMs / 60000);
    const diffHours = Math.floor(diffMs / 3600000);
    const diffDays = Math.floor(diffMs / 86400000);

    if (diffMins < 60) return `${diffMins} min${diffMins !== 1 ? 's' : ''} ago`;
    if (diffHours < 24) return `${diffHours} hour${diffHours !== 1 ? 's' : ''} ago`;
    if (diffDays < 7) return `${diffDays} day${diffDays !== 1 ? 's' : ''} ago`;
    return date.toLocaleDateString();
  };

  const copyLink = (uuid) => {
    const link = `${import.meta.env.VITE_FILE_SERVER_URL}/saved-pages/${uuid}`;
    navigator.clipboard.writeText(link)
      .then(() => toast.success('Link copied to clipboard!'))
      .catch(() => toast.error('Failed to copy link'));
  };

  const handleUseDesign = (website) => {
    setSelectedTemplate({
      name: `Design ${website.uuid}`,
      image: `${import.meta.env.VITE_FILE_SERVER_URL}/saved-pages/${website.uuid}/screenshot-cropped.png`,
      url: `${import.meta.env.VITE_FILE_SERVER_URL}/saved-pages/${website.uuid}`,
      description: 'Generated design ready to be remixed.',
    });
    setShowRemixModal(true);
  };

  const handleRemix = (data) => {
    console.log('Remix Request:', data);
    // Trigger remix flow here (e.g., API call or redirect)
  };

  return (
    <div className="mb-6 last:mb-0">
      <div className="flex items-start gap-3">
        <img
          src={message.user.avatar}
          alt={message.user.name}
          className="w-10 h-10 object-cover cursor-pointer hover:ring-2 hover:ring-amber-500 transition-all border-2 border-amber-300"
          style={{borderRadius: '50% 40% 60% 50%'}}
        />
        <div className="flex-1">
          <div className="flex items-center gap-2 mb-1 flex-wrap">
            <span className="font-medium text-slate-800 cursor-pointer hover:text-amber-700 transition-colors">
              {message.user.name}
            </span>

            {message.user.tag && (
              <span className="text-[10px] px-2 py-0.5 bg-gradient-to-r from-amber-400 to-orange-500 text-white uppercase tracking-wide font-bold" style={{borderRadius: '12px 8px 15px 10px'}}>
                {message.user.tag}
              </span>
            )}

            <span className="text-xs text-slate-600 flex items-center">
              <Clock className="inline h-3 w-3 mr-1" />
              {formatTime(message.createdAt)}
            </span>
          </div>


          <div className="bg-white/90 backdrop-blur-sm max-w-xl p-3 text-slate-700 border-2 border-amber-200 shadow-lg" style={{
            borderRadius: '20px 15px 25px 10px',
            boxShadow: '3px 3px 0px rgba(245, 158, 11, 0.2)'
          }}>
            {/* Shared Design Preview */}
            {message.messageType === 'website' && message.website.uuid && (
              <div className="mt-3 bg-white/80 overflow-hidden border-2 border-amber-300 shadow-md" style={{
                borderRadius: '15px 20px 10px 25px'
              }}>
                <div className="relative aspect-video">
                  <img
                    src={`${import.meta.env.VITE_FILE_SERVER_URL}/saved-pages/${message.website.uuid}/screenshot-cropped.png`}
                    alt="website preview"
                    className="w-full h-full object-cover"
                  />
                </div>

                <div className="p-3">
                  <div className="flex items-center justify-between mt-2">
                    <a
                      href={`${import.meta.env.VITE_FILE_SERVER_URL}/saved-pages/${message.website.uuid}`}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="text-xs text-amber-600 hover:text-orange-600 transition-colors flex items-center gap-1 font-medium"
                    >
                      <ExternalLink className="h-3 w-3" />
                      🔗 View Full Design
                    </a>
                    <button
                      onClick={() => copyLink(message.website.uuid)}
                      className="text-xs text-amber-600 hover:text-orange-600 transition-colors flex items-center gap-1 font-medium"
                    >
                      <LinkIcon className="h-3 w-3" />
                      📋 Copy Link
                    </button>
                  </div>

                  <div className="mt-3">
                    <button
                      onClick={() => handleUseDesign(message.website)}
                      className="text-xs bg-gradient-to-r from-amber-400 to-orange-500 hover:from-amber-500 hover:to-orange-600 text-white px-3 py-1 flex items-center gap-1 transition font-medium transform hover:scale-105 shadow-md"
                      style={{
                        borderRadius: '15px 10px 20px 15px',
                        boxShadow: '2px 2px 0px rgba(245, 158, 11, 0.3)'
                      }}
                    >
                      <Sparkles className="h-4 w-4" />
                      ✨ Remix This Design
                    </button>
                  </div>
                </div>
              </div>
            )}
            <p className="leading-relaxed">{message.content}</p>
          </div>
        </div>
      </div>

      {/* Modal for Remixing Design */}
      {showRemixModal && selectedTemplate && (
        <RemixModal
          isOpen={showRemixModal}
          onClose={() => setShowRemixModal(false)}
          template={selectedTemplate}
          onRemix={handleRemix}
        />
      )}
    </div>
  );
};

export default MessageItem;
