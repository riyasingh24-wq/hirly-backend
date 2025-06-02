import React, { useState, useRef, useEffect } from 'react';
import { ChevronLeft, ChevronRight } from 'lucide-react';
import ProfileCard from './components/ProfileCard';
import MessagesCard from './components/MessagesCard';
import SettingsCard from './components/SettingsCard';
import ActionButtons from './components/ActionButtons';
import Dashboard from './components/Dashboard';
import CoachCard from './components/CoachCard';
import Iridescence from './components/Iridescence';

function App() {
  const [currentCardIndex, setCurrentCardIndex] = useState(0);
  const [currentCandidateIndex, setCurrentCandidateIndex] = useState(0);
  const [savedCandidates, setSavedCandidates] = useState<typeof candidateProfiles>([]);
  const [interestedCandidates, setInterestedCandidates] = useState<typeof candidateProfiles>([]);
  const [isAnimating, setIsAnimating] = useState(false);
  const [swipeDirection, setSwipeDirection] = useState<'left' | 'right' | null>(null);
  const cardRef = useRef<HTMLDivElement>(null);
  const touchStartX = useRef<number | null>(null);

  // All candidate profiles
  const candidateProfiles = [
    {
      avatarSrc: "https://images.pexels.com/photos/3763188/pexels-photo-3763188.jpeg?auto=compress&cs=tinysrgb&w=600",
      name: "Alex Johnson",
      title: "Front-End Developer",
      skills: ["React", "Tailwind", "Figma"],
    },
    {
      avatarSrc: "https://images.pexels.com/photos/1181686/pexels-photo-1181686.jpeg?auto=compress&cs=tinysrgb&w=600",
      name: "Jordan Rivers",
      title: "Product Designer",
      skills: ["UX", "Sketch", "Notion", "Adobe XD"],
    },
    {
      avatarSrc: "https://images.pexels.com/photos/2379004/pexels-photo-2379004.jpeg?auto=compress&cs=tinysrgb&w=600",
      name: "Sam Chen",
      title: "Backend Engineer",
      skills: ["Node.js", "Python", "AWS", "MongoDB"],
    },
    {
      avatarSrc: "https://images.pexels.com/photos/2379005/pexels-photo-2379005.jpeg?auto=compress&cs=tinysrgb&w=600",
      name: "Maya Patel",
      title: "Full Stack Developer",
      skills: ["TypeScript", "React", "Node.js", "PostgreSQL"],
    },
    {
      avatarSrc: "https://images.pexels.com/photos/2406949/pexels-photo-2406949.jpeg?auto=compress&cs=tinysrgb&w=600",
      name: "Chris Taylor",
      title: "DevOps Engineer",
      skills: ["Docker", "Kubernetes", "CI/CD", "Terraform"],
    }
  ];

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

  const handleSwipeStart = (e: React.TouchEvent) => {
    touchStartX.current = e.touches[0].clientX;
  };

  const handleSwipeMove = (e: React.TouchEvent) => {
    if (!touchStartX.current) return;
    
    const currentX = e.touches[0].clientX;
    const diff = currentX - touchStartX.current;
    
    if (Math.abs(diff) > 50) {
      setSwipeDirection(diff > 0 ? 'right' : 'left');
    }
  };

  const handleSwipeEnd = () => {
    if (swipeDirection === 'left') {
      handleNext();
    } else if (swipeDirection === 'right') {
      handlePrevious();
    }
    setSwipeDirection(null);
    touchStartX.current = null;
  };

  const handleNextCandidate = () => {
    setIsAnimating(true);
    setTimeout(() => {
      setCurrentCandidateIndex((prev) => 
        prev === candidateProfiles.length - 1 ? 0 : prev + 1
      );
      setIsAnimating(false);
    }, 300);
  };

  const handleCandidateAction = (action: 'pass' | 'save' | 'like') => {
    const currentCandidate = candidateProfiles[currentCandidateIndex];
    
    if (action === 'save') {
      setSavedCandidates(prev => [...prev, currentCandidate]);
    } else if (action === 'like') {
      setInterestedCandidates(prev => [...prev, currentCandidate]);
    }
    
    handleNextCandidate();
  };

  const cards = [
    {
      type: 'candidates',
      component: (
        <ProfileCard 
          avatarSrc={candidateProfiles[currentCandidateIndex].avatarSrc}
          name={candidateProfiles[currentCandidateIndex].name}
          title={candidateProfiles[currentCandidateIndex].title}
          skills={candidateProfiles[currentCandidateIndex].skills}
          onViewProfile={() => console.log("View profile clicked")}
          buttonLabel="View Profile"
        />
      )
    },
    {
      type: 'messages',
      component: (
        <MessagesCard 
          onViewProfile={() => console.log("View profile clicked")}
        />
      )
    },
    {
      type: 'dashboard',
      component: <Dashboard />
    },
    {
      type: 'coach',
      component: <CoachCard onStartSession={() => console.log("Start session clicked")} />
    },
    {
      type: 'settings',
      component: <SettingsCard />
    }
  ];

  const handlePrevious = () => {
    if (!isAnimating) {
      setIsAnimating(true);
      setCurrentCardIndex((prev) => (prev === 0 ? cards.length - 1 : prev - 1));
      setTimeout(() => setIsAnimating(false), 300);
    }
  };

  const handleNext = () => {
    if (!isAnimating) {
      setIsAnimating(true);
      setCurrentCardIndex((prev) => (prev === cards.length - 1 ? 0 : prev + 1));
      setTimeout(() => setIsAnimating(false), 300);
    }
  };

  const handleViewProfile = () => {
    console.log('View Profile clicked');
  };

  const handleAction = (action: 'star' | 'heart') => {
    console.log(`${action} action clicked`);
  };

  return (
    <div className="min-h-screen w-full flex items-center justify-center p-4">
      <Iridescence 
        color={[0.4, 0.2, 0.8]} // Deeper purple/blue color
        speed={0.2} // Much slower speed for subtle effect
        amplitude={0.05} // Keeping the same amplitude
      />
      
      {/* Logo */}
      <div className="fixed top-8 left-8 z-20">
        <h1 className="app-logo">Hirly</h1>
      </div>

      {/* Navigation Arrows */}
      <button
        onClick={handlePrevious}
        className="fixed left-4 top-1/2 -translate-y-1/2 w-12 h-12 rounded-full 
                 bg-white/10 backdrop-blur-md border border-white/10
                 flex items-center justify-center
                 transition-all duration-300
                 hover:bg-white/20 hover:scale-105
                 active:scale-95 focus:outline-none
                 z-10"
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
                 active:scale-95 focus:outline-none
                 z-10"
      >
        <ChevronRight className="w-6 h-6 text-white" />
      </button>

      <div className="flex flex-col items-center">
        <div 
          ref={cardRef}
          onTouchStart={handleSwipeStart}
          onTouchMove={handleSwipeMove}
          onTouchEnd={handleSwipeEnd}
          className={`
            transition-all duration-300 transform
            ${isAnimating ? 'opacity-0 scale-95' : 'opacity-100 scale-100'}
            ${swipeDirection === 'left' ? 'translate-x-[-100vw]' : ''}
            ${swipeDirection === 'right' ? 'translate-x-[100vw]' : ''}
            hover:scale-[1.02] transition-transform
          `}
        >
          {cards[currentCardIndex].component}
        </div>
        {currentCardIndex === 0 && (
          <div className={`
            transition-all duration-300
            ${isAnimating ? 'opacity-0 translate-y-4' : 'opacity-100 translate-y-0'}
          `}>
            <ActionButtons 
              onDismiss={() => handleCandidateAction('pass')}
              onFavorite={() => handleCandidateAction('save')}
              onLike={() => handleCandidateAction('like')}
            />
          </div>
        )}
      </div>
    </div>
  );
}

export default App;