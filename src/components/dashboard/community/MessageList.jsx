import React, { useRef, useEffect } from 'react';
import { MessageSquare } from 'lucide-react';
import MessageItem from './MessageItem';
import { useSelector } from 'react-redux';
import { UserSelector } from '../../../store/global.Selctor';

const MessageList = ({ messages, isLoading }) => {
  const messagesEndRef = useRef(null);
  const user = useSelector(UserSelector);

  useEffect(() => {
    // Scroll to bottom when messages change
    if (messagesEndRef.current) {
      messagesEndRef.current.scrollIntoView({ behavior: 'smooth' });
    }
  }, [messages]);

  return (
    <div className="max-h-[80vh] overflow-y-auto p-4 custom-scrollbar bg-gradient-to-b from-white/50 to-amber-50/30">
      {isLoading ? (
        <div className="flex flex-col items-center justify-center h-full">
          <div className="w-8 h-8 border-2 border-amber-500 border-t-transparent rounded-full animate-spin mb-2"></div>
          <p className="text-slate-700">📨 Loading messages...</p>
        </div>
      ) : messages.length === 0 ? (
        <div className="flex flex-col items-center justify-center h-full text-center">
          <div className="p-4 bg-gradient-to-br from-amber-200 to-orange-200 border-2 border-amber-400 mb-4" style={{borderRadius: '50% 40% 60% 50%'}}>
            <MessageSquare className="h-12 w-12 text-amber-600" />
          </div>
          <h3 className="text-slate-700 font-medium mb-1">💭 No messages yet</h3>
          <p className="text-slate-600 text-sm">Be the first to start the conversation! 🚀</p>
        </div>
      ) : (
        <>
          {messages.map((message) => (
            <MessageItem 
              key={message.id} 
              message={message}
              currentUser={user}
            />
          ))}
          <div ref={messagesEndRef} />
        </>
      )}
    </div>
  );
};

export default MessageList;