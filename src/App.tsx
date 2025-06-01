import React, { useState } from 'react';
import ProfileCard from './components/ProfileCard';
import MessagesCard from './components/MessagesCard';
import ActionButtons from './components/ActionButtons';

function App() {
  const [activeView, setActiveView] = useState<'profile' | 'messages'>('profile');

  // Sample profile data
  const profileData = {
    avatarSrc: "https://images.pexels.com/photos/3763188/pexels-photo-3763188.jpeg?auto=compress&cs=tinysrgb&w=600",
    name: "Alex Johnson",
    title: "Front-End Developer",
    skills: ["React", "Tailwind", "Figma"],
  };

  // Sample messages data
  const messagesData = [
    {
      id: '1',
      avatarSrc: "https://images.pexels.com/photos/415829/pexels-photo-415829.jpeg?auto=compress&cs=tinysrgb&w=600",
      name: "Sarah Miller",
      preview: "Hey, I checked out your latest design...",
      timestamp: "2m ago"
    },
    {
      id: '2',
      avatarSrc: "https://images.pexels.com/photos/1222271/pexels-photo-1222271.jpeg?auto=compress&cs=tinysrgb&w=600",
      name: "David Chen",
      preview: "The project looks great! When can we...",
      timestamp: "1h ago"
    },
    {
      id: '3',
      avatarSrc: "https://images.pexels.com/photos/762020/pexels-photo-762020.jpeg?auto=compress&cs=tinysrgb&w=600",
      name: "Emma Wilson",
      preview: "Thanks for the feedback on the...",
      timestamp: "3h ago"
    },
    {
      id: '4',
      avatarSrc: "https://images.pexels.com/photos/1239291/pexels-photo-1239291.jpeg?auto=compress&cs=tinysrgb&w=600",
      name: "Michael Brown",
      preview: "Let's schedule a call to discuss...",
      timestamp: "5h ago"
    }
  ];

  // Event handlers
  const handleViewProfile = () => {
    console.log("View profile clicked");
  };

  const handleDismiss = () => {
    setActiveView(activeView === 'profile' ? 'messages' : 'profile');
  };

  const handleFavorite = () => {
    console.log("Favorite clicked");
  };

  const handleLike = () => {
    console.log("Like clicked");
  };

  return (
    <div className="min-h-screen w-full flex items-center justify-center p-4 bg-gradient-to-b from-red-900 to-purple-900">
      <div className="flex flex-col items-center">
        {activeView === 'profile' ? (
          <ProfileCard 
            avatarSrc={profileData.avatarSrc}
            name={profileData.name}
            title={profileData.title}
            skills={profileData.skills}
            onViewProfile={handleViewProfile}
          />
        ) : (
          <MessagesCard 
            messages={messagesData}
            onViewProfile={handleViewProfile}
          />
        )}
        <ActionButtons 
          onDismiss={handleDismiss}
          onFavorite={handleFavorite}
          onLike={handleLike}
        />
      </div>
    </div>
  );
}

export default App;