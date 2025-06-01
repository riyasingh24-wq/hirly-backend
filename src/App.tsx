import React from 'react';
import ProfileCard from './components/ProfileCard';
import ActionButtons from './components/ActionButtons';

function App() {
  // Sample profile data
  const profileData = {
    avatarSrc: "https://images.pexels.com/photos/3763188/pexels-photo-3763188.jpeg?auto=compress&cs=tinysrgb&w=600",
    name: "Alex Johnson",
    title: "Front-End Developer",
    skills: ["React", "Tailwind", "Figma"],
  };

  // Event handlers (can be extended with actual functionality)
  const handleViewProfile = () => {
    console.log("View profile clicked");
  };

  const handleDismiss = () => {
    console.log("Dismiss clicked");
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
        <ProfileCard 
          avatarSrc={profileData.avatarSrc}
          name={profileData.name}
          title={profileData.title}
          skills={profileData.skills}
          onViewProfile={handleViewProfile}
        />
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