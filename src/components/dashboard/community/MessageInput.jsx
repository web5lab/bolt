import React from 'react';
import { Send, Image, Reply, X } from 'lucide-react';

const MessageInput = ({ 
  newMessage, 
  setNewMessage, 
  handleSendMessage, 
  handleShareDesign, 
  replyingTo, 
  setReplyingTo 
}) => {
  return (
    <div className="border-t-2 border-amber-200 p-4 bg-gradient-to-r from-amber-50 to-orange-50" style={{
      borderTopStyle: 'dashed',
      borderRadius: '0 0 27px 17px'
    }}>
      {replyingTo && (
        <div className="flex items-center justify-between bg-amber-100 border-2 border-amber-300 px-3 py-2 mb-2 text-sm" style={{
          borderRadius: '15px 10px 20px 15px',
          borderStyle: 'dashed'
        }}>
          <div className="flex items-center text-slate-700">
            <Reply className="h-4 w-4 mr-2 text-amber-600" />
            💬 Replying to <span className="font-medium text-amber-700 ml-1">{replyingTo.user.name}</span>
          </div>
          <button 
            onClick={() => setReplyingTo(null)}
            className="text-slate-600 hover:text-slate-800 p-1 hover:bg-amber-200 transition-colors" style={{borderRadius: '8px'}}
          >
            <X className="h-4 w-4" />
          </button>
        </div>
      )}
      <form onSubmit={handleSendMessage} className="flex gap-2">
        <input
          id="message-input"
          type="text"
          value={newMessage}
          onChange={(e) => setNewMessage(e.target.value)}
          placeholder="✍️ Type your message..."
          className="flex-1 bg-white/90 border-2 border-amber-300 px-4 py-2 text-slate-800 placeholder-slate-500 focus:outline-none focus:ring-2 focus:ring-amber-500 focus:border-amber-500 transition-all"
          style={{borderRadius: '20px 10px 25px 15px'}}
        />
        <button
          type="button"
          onClick={handleShareDesign}
          className="p-2 bg-white/90 border-2 border-amber-300 text-slate-700 hover:text-amber-600 hover:border-orange-400 hover:bg-amber-50 transition-colors transform hover:scale-105"
          style={{borderRadius: '15px 20px 10px 25px'}}
          title="Share a design"
        >
          <Image className="h-5 w-5" />
        </button>
        <button
          type="submit"
          disabled={!newMessage.trim()}
          className="p-2 bg-gradient-to-r from-amber-400 to-orange-500 text-white hover:from-amber-500 hover:to-orange-600 transition-colors disabled:opacity-50 disabled:cursor-not-allowed transform hover:scale-105 shadow-lg"
          style={{
            borderRadius: '25px 15px 20px 10px',
            boxShadow: '3px 3px 0px rgba(245, 158, 11, 0.4)'
          }}
        >
          <Send className="h-5 w-5" />
        </button>
      </form>
    </div>
  );
};

export default MessageInput;