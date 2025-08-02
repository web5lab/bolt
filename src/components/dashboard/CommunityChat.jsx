import React, { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { chatSelector, UserSelector } from '../../store/global.Selctor';
import toast from 'react-hot-toast';

// Import community components
import MessageList from './community/MessageList';
import MessageInput from './community/MessageInput';
import ShareDesignModal from './community/ShareDesignModal';
import socket from '../../socket';
import { GetChatHistory, sendMessageApi } from '../../store/global.Action';
import { setChatHistory } from '../../store/global.Slice';

const CommunityChat = ({ mainContentAnimation, setShowBilling }) => {
  const [newMessage, setNewMessage] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [replyingTo, setReplyingTo] = useState(null);
  const [showShareDesignModal, setShowShareDesignModal] = useState(false);
  const user = useSelector(UserSelector);
  const chatHistory = useSelector(chatSelector)
  const dispatch = useDispatch()

  useEffect(() => {
    dispatch(GetChatHistory())
  }, [])

  useEffect(() => {
    // Connect to socket server
    socket.emit('join-room', user); // Optional: join a public room

    // Listen for real-time new messages
    socket.on('new-message', (msg) => {
      console.log("test data",msg)
      dispatch(setChatHistory(msg));
    });

    return () => {
      socket.off('new-message');
      socket.emit('leave-room', 'community');
    };
  }, []);


  const handleSendMessage = async (e) => {
    e.preventDefault();
    if (!newMessage.trim()) return;
    await sendMessageApi({
      data: {
        content: replyingTo ? `@${replyingTo.user.name} ${newMessage}` : newMessage,
      }
    })
    setNewMessage('');
    setReplyingTo(null);
  };

  const handleShareDesign = () => {
    setShowShareDesignModal(true);
  };

  const handleShareDesignSubmit = async (data) => {
    await sendMessageApi({
      data: {
        content: data.description,
        website: data.id
      }
    })

    toast.success('Design shared with the community!');
  };

  return (
    <div className={`${mainContentAnimation} relative`} style={{ animationDelay: '0.5s' }}>
      {/* Paper background with texture */}
      <div className="absolute inset-0 bg-gradient-to-br from-orange-50 via-amber-50 to-yellow-50 opacity-50" style={{
        backgroundImage: `url("data:image/svg+xml,%3Csvg width='40' height='40' viewBox='0 0 40 40' xmlns='http://www.w3.org/2000/svg'%3E%3Cg fill='%23d4a574' fill-opacity='0.1'%3E%3Cpath d='M20 20c0-5.5-4.5-10-10-10s-10 4.5-10 10 4.5 10 10 10 10-4.5 10-10zm10 0c0-5.5-4.5-10-10-10s-10 4.5-10 10 4.5 10 10 10 10-4.5 10-10z'/%3E%3C/g%3E%3C/svg%3E")`
      }}></div>
      
      {/* Decorative elements */}
      <div className="absolute top-10 right-10 w-12 h-12 border-2 border-amber-400 opacity-30 transform rotate-12" style={{
        borderRadius: '60% 40% 70% 30%',
        borderStyle: 'dashed'
      }}></div>
      <div className="absolute bottom-20 left-10 w-8 h-8 border-2 border-orange-400 opacity-25 transform -rotate-12" style={{
        borderRadius: '40% 60% 30% 70%',
        borderStyle: 'dotted'
      }}></div>

      {/* Chat Messages */}
      <div className="bg-white/90 backdrop-blur-sm border-3 border-amber-300 min-h-[90vh] mb-4 relative z-10 shadow-lg" style={{
        borderRadius: '30px 20px 35px 25px',
        boxShadow: '6px 6px 0px rgba(245, 158, 11, 0.3)',
        borderStyle: 'dashed'
      }}>
        {/* Chat header */}
        <div className="p-4 border-b-2 border-amber-200 bg-gradient-to-r from-amber-100 to-orange-100" style={{
          borderRadius: '27px 17px 0 0',
          borderBottomStyle: 'dashed'
        }}>
          <h2 className="text-lg font-bold text-slate-800 flex items-center gap-2">
            💬 Community Chat
            <span className="text-sm font-normal text-slate-600">- Connect & Share! ✨</span>
          </h2>
        </div>
        
        <MessageList
          messages={chatHistory}
          isLoading={isLoading}
        />

        {/* Message Input */}
        <MessageInput
          newMessage={newMessage}
          setNewMessage={setNewMessage}
          handleSendMessage={handleSendMessage}
          handleShareDesign={handleShareDesign}
          replyingTo={replyingTo}
          setReplyingTo={setReplyingTo}
        />
      </div>

      <div className="text-xs text-slate-600 text-center bg-white/80 backdrop-blur-sm border-2 border-amber-200 p-3 relative z-10" style={{
        borderRadius: '20px 15px 25px 10px',
        borderStyle: 'dashed'
      }}>
        📢 Messages are public and visible to all redesignr members. Be kind and creative! 🎨
      </div>


      {/* Share Design Modal */}
      <ShareDesignModal
        isOpen={showShareDesignModal}
        onClose={() => setShowShareDesignModal(false)}
        onShare={handleShareDesignSubmit}
      />
    </div>
  );
};

export default CommunityChat;