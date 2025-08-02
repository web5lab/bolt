import React, { useState } from 'react';
import { Copy, Twitter, Linkedin, Facebook } from 'lucide-react';
import { toast } from 'react-hot-toast';
import StyledModal from './StyledModal';

const SharePopup = ({ isOpen, onClose, website }) => {
  const [copied, setCopied] = useState(false);
  const shareUrl = `${import.meta.env.VITE_FILE_SERVER_URL}/saved-pages/${website?.uuid}`;

  if (!isOpen || !website) return null;

  const handleCopy = () => {
    navigator.clipboard.writeText(shareUrl);
    setCopied(true);
    toast.success("Link copied to clipboard!");
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <StyledModal isOpen={isOpen} onClose={onClose} title={`🎨 Share "${website.source || website.url}"`} maxWidth="max-w-lg">
      <p className="text-slate-700 text-sm mb-4">✨ Share this redesigned masterpiece:</p>
      <div className="flex flex-col sm:flex-row items-stretch sm:items-center gap-3 mb-6">
        <input
          type="text"
          value={shareUrl}
          readOnly
          className="w-full bg-white/90 border-2 border-amber-300 px-4 py-3 text-slate-800 focus:outline-none focus:ring-2 focus:ring-amber-500 caret-amber-500"
          style={{borderRadius: '20px 10px 25px 15px'}}
        />
        <button
          onClick={handleCopy}
          className={`p-3 transition-all duration-200 transform hover:scale-105 ${copied ? 'bg-green-400 text-white' : 'bg-gradient-to-r from-amber-400 to-orange-500 text-white hover:from-amber-500 hover:to-orange-600'} whitespace-nowrap sm:w-auto w-full shadow-lg`}
          style={{
            borderRadius: '15px 20px 10px 25px',
            boxShadow: '3px 3px 0px rgba(245, 158, 11, 0.4)'
          }}
          title={copied ? "Copied!" : "Copy link"}
        >
          <span className="sm:hidden">{copied ? "✅ Copied!" : "📋 Copy Link"}</span>
          <Copy className="h-5 w-5 sm:inline hidden" />
        </button>
      </div>

      <p className="text-slate-700 text-sm mb-3">🌐 Or share on social media:</p>
      <div className="flex items-center gap-3 flex-wrap">
        {[
          { Icon: Twitter, href: `https://twitter.com/intent/tweet?url=${encodeURIComponent(shareUrl)}&text=Check out this website redesign I made with redesignr.ai!`, label: "Twitter" },
          { Icon: Linkedin, href: `https://www.linkedin.com/sharing/share-offsite/?url=${encodeURIComponent(shareUrl)}`, label: "LinkedIn" },
          { Icon: Facebook, href: `https://www.facebook.com/sharer/sharer.php?u=${encodeURIComponent(shareUrl)}`, label: "Facebook" },
        ].map(({ Icon, href, label }) => (
          <a
            key={label}
            href={href}
            target="_blank"
            rel="noopener noreferrer"
            className="bg-white border-2 border-amber-300 hover:border-orange-400 p-3 text-slate-700 hover:text-amber-700 transition-colors hover:bg-amber-50 transform hover:scale-105"
            style={{borderRadius: '12px 8px 15px 10px'}}
            aria-label={`Share on ${label}`}
          >
            <Icon className="h-5 w-5" />
          </a>
        ))}
      </div>
    </StyledModal>
  );
};

export default SharePopup;