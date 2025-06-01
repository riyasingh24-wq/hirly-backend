import React from 'react';
import MessagePreview from './MessagePreview';

interface Message {
  id: string;
  avatarSrc: string;
  name: string;
  preview: string;
  timestamp: string;
}

interface MessagesCardProps {
  messages: Message[];
  onViewProfile?: () => void;
}

const MessagesCard: React.FC<MessagesCardProps> = ({
  messages,
  onViewProfile
}) => {
  return (
    <div className="relative w-[320px]">
      {/* Card with glassmorphism effect */}
      <div className="flex flex-col h-[480px] p-8 rounded-3xl 
                    bg-white/10 backdrop-blur-md border border-white/20
                    shadow-xl shadow-black/20">
        
        {/* Header */}
        <h2 className="text-2xl font-bold text-white tracking-wide mb-6 text-center
                     text-shadow-glow">Messages</h2>
        
        {/* Messages list with custom scrollbar */}
        <div className="flex-1 space-y-4 overflow-y-auto custom-scrollbar">
          {messages.map((message) => (
            <MessagePreview
              key={message.id}
              avatarSrc={message.avatarSrc}
              name={message.name}
              preview={message.preview}
              timestamp={message.timestamp}
            />
          ))}
        </div>
      </div>
      
      {/* Card shadow/reflection effect */}
      <div className="absolute -bottom-2 left-1/2 transform -translate-x-1/2 w-[95%] h-4 
                    bg-black/20 blur-md rounded-full"></div>
    </div>
  );
};

export default MessagesCard;