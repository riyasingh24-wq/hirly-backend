import React, { useState } from 'react';
import Avatar from './Avatar';
import MessagePreview from './MessagePreview';

interface Message {
  id: string;
  avatarSrc: string;
  name: string;
  preview: string;
  timestamp: string;
  unread?: boolean;
  online?: boolean;
  lastMessage?: {
    text: string;
    time: string;
  };
  conversation?: {
    messages: {
      id: string;
      text: string;
      timestamp: string;
      isOwn: boolean;
    }[];
  };
}

interface MessagesCardProps {
  onViewProfile: () => void;
}

const MessagesCard: React.FC<MessagesCardProps> = ({ onViewProfile }) => {
  const [selectedMessage, setSelectedMessage] = useState<string | null>(null);
  const [newMessage, setNewMessage] = useState('');

  // Enhanced demo conversations with full chat history
  const messages: Message[] = [
    {
      id: '1',
      avatarSrc: "https://images.pexels.com/photos/415829/pexels-photo-415829.jpeg?auto=compress&cs=tinysrgb&w=600",
      name: "Sarah Miller",
      preview: "Hey, I checked out your latest design work. The UI components look amazing! Would love to discuss a potential collaboration.",
      timestamp: "2m ago",
      unread: true,
      online: true,
      lastMessage: {
        text: "The UI components look amazing!",
        time: "2m ago"
      },
      conversation: {
        messages: [
          {
            id: '1-1',
            text: "Hi! I saw your portfolio and I'm really impressed with your work.",
            timestamp: "10:30 AM",
            isOwn: false
          },
          {
            id: '1-2',
            text: "Thank you! I'm glad you like it. What caught your attention?",
            timestamp: "10:32 AM",
            isOwn: true
          },
          {
            id: '1-3',
            text: "The UI components look amazing! Would love to discuss a potential collaboration.",
            timestamp: "10:33 AM",
            isOwn: false
          }
        ]
      }
    },
    {
      id: '2',
      avatarSrc: "https://images.pexels.com/photos/1222271/pexels-photo-1222271.jpeg?auto=compress&cs=tinysrgb&w=600",
      name: "David Chen",
      preview: "The project looks great! When can we schedule a call to discuss the implementation details? I have some ideas about the architecture.",
      timestamp: "1h ago",
      online: true,
      lastMessage: {
        text: "When can we schedule a call?",
        time: "1h ago"
      }
    },
    {
      id: '3',
      avatarSrc: "https://images.pexels.com/photos/762020/pexels-photo-762020.jpeg?auto=compress&cs=tinysrgb&w=600",
      name: "Emma Wilson",
      preview: "Thanks for the feedback on the design system. I've implemented the changes you suggested. Would you mind taking a look?",
      timestamp: "3h ago",
      lastMessage: {
        text: "I've implemented the changes",
        time: "3h ago"
      }
    },
    {
      id: '4',
      avatarSrc: "https://images.pexels.com/photos/1239291/pexels-photo-1239291.jpeg?auto=compress&cs=tinysrgb&w=600",
      name: "Michael Brown",
      preview: "Let's schedule a call to discuss the new features. I think we can improve the user experience with some animations.",
      timestamp: "5h ago",
      unread: true,
      lastMessage: {
        text: "Let's schedule a call",
        time: "5h ago"
      }
    },
    {
      id: '5',
      avatarSrc: "https://images.pexels.com/photos/1181686/pexels-photo-1181686.jpeg?auto=compress&cs=tinysrgb&w=600",
      name: "Lisa Anderson",
      preview: "I've shared the project timeline with the team. Everyone is excited about the new features. Can we meet tomorrow?",
      timestamp: "1d ago",
      lastMessage: {
        text: "Can we meet tomorrow?",
        time: "1d ago"
      }
    }
  ];

  const selectedChat = messages.find(m => m.id === selectedMessage);

  const handleSendMessage = (e: React.FormEvent) => {
    e.preventDefault();
    if (!newMessage.trim() || !selectedChat) return;

    // In a real app, this would be handled by your backend
    const newMsg = {
      id: `${selectedChat.id}-${Date.now()}`,
      text: newMessage,
      timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
      isOwn: true
    };

    // Update the conversation
    if (selectedChat.conversation) {
      selectedChat.conversation.messages.push(newMsg);
    }

    setNewMessage('');
  };

  return (
    <div className="w-[700px] bg-white/10 backdrop-blur-md rounded-2xl p-6
                    border border-white/20 shadow-xl overflow-hidden">
      <div className="flex h-[500px]">
        {/* Messages List */}
        <div className={`flex flex-col ${selectedMessage ? 'w-1/3 pr-4' : 'w-full'}`}>
          {/* Header */}
          <div className="mb-6">
            <h2 className="text-2xl font-bold text-white mb-2">Messages</h2>
            <p className="text-white/60 text-sm">You have {messages.filter(m => m.unread).length} unread messages</p>
          </div>

          {/* Messages */}
          <div className="flex-1 overflow-y-auto space-y-4 pr-2">
            {messages.map((message) => (
              <div
                key={message.id}
                className={`
                  transition-all duration-200
                  ${selectedMessage === message.id ? 'bg-white/20' : 'hover:bg-white/10'}
                  rounded-xl p-3 cursor-pointer
                `}
                onClick={() => setSelectedMessage(message.id)}
              >
                <MessagePreview
                  avatarSrc={message.avatarSrc}
                  name={message.name}
                  preview={message.preview}
                  timestamp={message.timestamp}
                  unread={message.unread}
                  online={message.online}
                />
              </div>
            ))}
          </div>

          {/* Search Bar */}
          <div className="mt-4">
            <div className="relative">
              <input
                type="text"
                placeholder="Search messages..."
                className="w-full bg-white/10 border border-white/20 rounded-xl px-4 py-2
                           text-white placeholder-white/40 focus:outline-none focus:border-white/40
                           transition-all duration-200"
              />
              <div className="absolute right-3 top-1/2 -translate-y-1/2 text-white/40">
                <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
                  <path fillRule="evenodd" d="M8 4a4 4 0 100 8 4 4 0 000-8zM2 8a6 6 0 1110.89 3.476l4.817 4.817a1 1 0 01-1.414 1.414l-4.816-4.816A6 6 0 012 8z" clipRule="evenodd" />
                </svg>
              </div>
            </div>
          </div>
        </div>

        {/* Conversation View */}
        {selectedMessage && selectedChat && (
          <div className="w-2/3 pl-4 border-l border-white/10 flex flex-col">
            {/* Chat Header */}
            <div className="flex items-center space-x-3 mb-6">
              <div className="relative">
                <Avatar src={selectedChat.avatarSrc} size="md" />
                {selectedChat.online && (
                  <div className="absolute bottom-0 right-0 w-3 h-3 bg-green-500 rounded-full border-2 border-white/10" />
                )}
              </div>
              <div>
                <h3 className="text-white font-semibold">{selectedChat.name}</h3>
                <p className="text-white/60 text-sm">
                  {selectedChat.online ? 'Online' : 'Last seen recently'}
                </p>
              </div>
            </div>

            {/* Messages */}
            <div className="flex-1 overflow-y-auto space-y-4 mb-4">
              {selectedChat.conversation?.messages.map((msg) => (
                <div
                  key={msg.id}
                  className={`flex ${msg.isOwn ? 'justify-end' : 'justify-start'}`}
                >
                  <div
                    className={`
                      max-w-[80%] rounded-2xl px-4 py-2
                      ${msg.isOwn 
                        ? 'bg-purple-600 text-white' 
                        : 'bg-white/10 text-white'
                      }
                    `}
                  >
                    <p className="text-sm">{msg.text}</p>
                    <span className="text-xs opacity-60 mt-1 block">
                      {msg.timestamp}
                    </span>
                  </div>
                </div>
              ))}
            </div>

            {/* Message Input */}
            <form onSubmit={handleSendMessage} className="flex space-x-2">
              <input
                type="text"
                value={newMessage}
                onChange={(e) => setNewMessage(e.target.value)}
                placeholder="Type a message..."
                className="flex-1 bg-white/10 border border-white/20 rounded-xl px-4 py-2
                           text-white placeholder-white/40 focus:outline-none focus:border-white/40
                           transition-all duration-200"
              />
              <button
                type="submit"
                className="px-4 py-2 bg-purple-600 text-white rounded-xl
                           hover:bg-purple-500 transition-colors duration-200
                           focus:outline-none focus:ring-2 focus:ring-purple-500/50"
              >
                Send
              </button>
            </form>
          </div>
        )}
      </div>
    </div>
  );
};

export default MessagesCard;