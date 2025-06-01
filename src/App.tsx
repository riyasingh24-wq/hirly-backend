import React, { useState } from 'react';
import { ChevronLeft, ChevronRight } from 'lucide-react';
import ProfileCard from './components/ProfileCard';
import MessagesCard from './components/MessagesCard';
import SettingsCard from './components/SettingsCard';
import ActionButtons from './components/ActionButtons';

function App() {
  const [currentCardIndex, setCurrentCardIndex] = useState(0);
  const [isAnimating, setIsAnimating] = useState(false);

  // Sample profile data
  const profileData = {
    avatarSrc: "https://images.pexels.com/photos/3763188/pexels-photo-3763188.jpeg?auto=compress&cs=tinysrgb&w=600",
    name: "Alex Johnson",
    title: "Front-End Developer",
    skills: ["React", "Tailwind", "Figma"],
  };

  const designerProfileData = {
    avatarSrc: "https://images.pexels.com/photos/1181686/pexels-photo-1181686.jpeg?auto=compress&cs=tinysrgb&w=600",
    name: "Jordan Rivers",
    title: "Product Designer",
    skills: ["UX", "Sketch", "Notion", "Adobe XD"],
  };

  const backendProfileData = {
    avatarSrc: "https://images.pexels.com/photos/2379004/pexels-photo-2379004.jpeg?auto=compress&cs=tinysrgb&w=600",
    name: "Sam Chen",
    title: "Backend Engineer",
    skills: ["Node.js", "Python", "AWS", "MongoDB"],
  };

  const fullstackProfileData = {
    avatarSrc: "https://images.pexels.com/photos/2379005/pexels-photo-2379005.jpeg?auto=compress&cs=tinysrgb&w=600",
    name: "Maya Patel",
    title: "Full Stack Developer",
    skills: ["TypeScript", "React", "Node.js", "PostgreSQL"],
  };

  const devopsProfileData = {
    avatarSrc: "https://images.pexels.com/photos/2406949/pexels-photo-2406949.jpeg?auto=compress&cs=tinysrgb&w=600",
    name: "Chris Taylor",
    title: "DevOps Engineer",
    skills: ["Docker", "Kubernetes", "CI/CD", "Terraform"],
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

  const cards = [
    {
      type: 'profile',
      component: (
        <ProfileCard 
          avatarSrc={profileData.avatarSrc}
          name={profileData.name}
          title={profileData.title}
          skills={profileData.skills}
          onViewProfile={() => console.log("View profile clicked")}
          buttonLabel="View Profile"
        />
      )
    },
    {
      type: 'designer-profile',
      component: (
        <ProfileCard 
          avatarSrc={designerProfileData.avatarSrc}
          name={designerProfileData.name}
          title={designerProfileData.title}
          skills={designerProfileData.skills}
          onViewProfile={() => console.log("View resume clicked")}
          buttonLabel="View Resume"
        />
      )
    },
    {
      type: 'backend-profile',
      component: (
        <ProfileCard 
          avatarSrc={backendProfileData.avatarSrc}
          name={backendProfileData.name}
          title={backendProfileData.title}
          skills={backendProfileData.skills}
          onViewProfile={() => console.log("View profile clicked")}
          buttonLabel="View Profile"
        />
      )
    },
    {
      type: 'fullstack-profile',
      component: (
        <ProfileCard 
          avatarSrc={fullstackProfileData.avatarSrc}
          name={fullstackProfileData.name}
          title={fullstackProfileData.title}
          skills={fullstackProfileData.skills}
          onViewProfile={() => console.log("View profile clicked")}
          buttonLabel="View Profile"
        />
      )
    },
    {
      type: 'devops-profile',
      component: (
        <ProfileCard 
          avatarSrc={devopsProfileData.avatarSrc}
          name={devopsProfileData.name}
          title={devopsProfileData.title}
          skills={devopsProfileData.skills}
          onViewProfile={() => console.log("View profile clicked")}
          buttonLabel="View Profile"
        />
      )
    },
    {
      type: 'messages',
      component: (
        <MessagesCard 
          messages={messagesData}
          onViewProfile={() => console.log("View profile clicked")}
        />
      )
    },
    {
      type: 'settings',
      component: <SettingsCard />
    }
  ];

  const handlePrevious = () => {
    if (!isAnimating) {
      setCurrentCardIndex((prev) => (prev === 0 ? cards.length - 1 : prev - 1));
    }
  };

  const handleNext = () => {
    if (!isAnimating) {
      setCurrentCardIndex((prev) => (prev === cards.length - 1 ? 0 : prev + 1));
    }
  };

  const handleCardAction = (action: 'dismiss' | 'favorite' | 'like') => {
    setIsAnimating(true);
    setTimeout(() => {
      handleNext();
      setIsAnimating(false);
    }, 300);
  };

  return (
    <div className="min-h-screen w-full flex items-center justify-center p-4 bg-gradient-to-b from-red-900 to-purple-900">
      {/* Navigation Arrows */}
      <button
        onClick={handlePrevious}
        className="fixed left-4 top-1/2 -translate-y-1/2 w-12 h-12 rounded-full 
                 bg-white/10 backdrop-blur-md border border-white/10
                 flex items-center justify-center
                 transition-all duration-300
                 hover:bg-white/20 hover:scale-105
                 active:scale-95 focus:outline-none"
      >
        <ChevronLeft className="w-6 h-6 text-white" />
      </button>

      <button
        onClick={handleNext}
        className="fixed right-4 top-1/2 -translate-y-1/2 w-12 h-12 rounded-full 
                 bg-white/10 backdrop-blur-md border border-white/10
                 flex items-center justify-center
                 transition-all duration-300
                 hover:bg-white/20 hover:scale-105
                 active:scale-95 focus:outline-none"
      >
        <ChevronRight className="w-6 h-6 text-white" />
      </button>

      <div className="flex flex-col items-center">
        <div 
          className={`transition-all duration-300 transform ${isAnimating ? 'opacity-0 translate-x-[-100vw]' : ''}`}
        >
          {cards[currentCardIndex].component}
        </div>
        <ActionButtons 
          onDismiss={() => handleCardAction('dismiss')}
          onFavorite={() => handleCardAction('favorite')}
          onLike={() => handleCardAction('like')}
        />
      </div>
    </div>
  );
}

export default App;