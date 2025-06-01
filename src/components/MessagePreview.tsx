import React from 'react';
import Avatar from './Avatar';

interface MessagePreviewProps {
  avatarSrc: string;
  name: string;
  preview: string;
  timestamp: string;
}

const MessagePreview: React.FC<MessagePreviewProps> = ({
  avatarSrc,
  name,
  preview,
  timestamp
}) => {
  return (
    <div className="p-4 rounded-xl bg-white/5 backdrop-blur-sm border border-white/10
                    transition-all duration-300 hover:bg-white/10
                    flex items-center space-x-4">
      <Avatar src={avatarSrc} alt={name} size="sm" />
      <div className="flex-1 min-w-0">
        <div className="flex justify-between items-start">
          <h3 className="text-white font-semibold truncate">{name}</h3>
          <span className="text-xs text-lavender-100 whitespace-nowrap ml-2">{timestamp}</span>
        </div>
        <p className="text-sm text-lavender-100 truncate">{preview}</p>
      </div>
    </div>
  );
};

export default MessagePreview;