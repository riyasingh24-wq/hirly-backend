import React, { useState, useRef, useEffect } from 'react';
import { ChevronLeft, ChevronRight, ChevronDown, Users, MessageSquare, BarChart2, Settings, Briefcase, Building2 } from 'lucide-react';
import ProfileCard from './components/ProfileCard';
import MessagesCard from './components/MessagesCard';
import SettingsCard from './components/SettingsCard';
import ActionButtons from './components/ActionButtons';
import Dashboard from './components/Dashboard';
import CoachCard from './components/CoachCard';
import Iridescence from './components/Iridescence';
import CompanyProfileCard from './components/CompanyProfileCard';
import LandingPage from './components/LandingPage';
import JobCard from './components/JobCard';
import AboutPage from './components/AboutPage';
import { CardCarousel } from './components/CardCarousel';

function App() {
  const [selectedRole, setSelectedRole] = useState<'candidate' | 'employer' | null>(null);
  const [userType, setUserType] = useState<'candidate' | 'employer' | null>(null);
  const [currentCardIndex, setCurrentCardIndex] = useState(0);
  const [currentCandidateIndex, setCurrentCandidateIndex] = useState(0);
  const [currentJobIndex, setCurrentJobIndex] = useState(0);
  const [savedCandidates, setSavedCandidates] = useState<typeof candidateProfiles>([]);
  const [interestedCandidates, setInterestedCandidates] = useState<typeof candidateProfiles>([]);
  const [savedJobs, setSavedJobs] = useState<typeof jobListings>([]);
  const [appliedJobs, setAppliedJobs] = useState<typeof jobListings>([]);
  const [isAnimating, setIsAnimating] = useState(false);
  const [swipeDirection, setSwipeDirection] = useState<'left' | 'right' | null>(null);
  const cardRef = useRef<HTMLDivElement>(null);
  const touchStartX = useRef<number | null>(null);
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const menuRef = useRef<HTMLDivElement>(null);
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [isSidebarCollapsed, setIsSidebarCollapsed] = useState(true);

  // Job listings data
  const jobListings = [
    {
      company: "Google",
      title: "Senior Frontend Developer",
      location: "Mountain View, CA (Remote)",
      type: "Full-time",
      salary: "$120k - $180k",
      posted: "2 days ago",
      logo: "https://www.google.com/images/branding/googlelogo/1x/googlelogo_color_272x92dp.png",
      requirements: [
        "5+ years of React experience",
        "Strong TypeScript skills",
        "Experience with large-scale applications",
        "Bachelor's degree in CS or related field"
      ],
      description: "Join our team to build the next generation of web applications. You'll work with cutting-edge technologies and collaborate with world-class engineers to create products that impact millions of users.",
      benefits: [
        "Competitive salary and equity",
        "Comprehensive health coverage",
        "Flexible work arrangements",
        "Professional development budget"
      ]
    },
    {
      company: "Meta",
      title: "Full Stack Engineer",
      location: "San Francisco, CA",
      type: "Full-time",
      salary: "$130k - $190k",
      posted: "1 day ago",
      logo: "https://upload.wikimedia.org/wikipedia/commons/thumb/7/7b/Meta_Platforms_Inc._logo.svg/2560px-Meta_Platforms_Inc._logo.svg.png",
      requirements: [
        "4+ years of full stack development",
        "Experience with React and Node.js",
        "Strong system design skills",
        "Bachelor's degree in CS or related field"
      ],
      description: "Build and scale the next generation of social media platforms. Work on challenging problems that impact billions of users worldwide.",
      benefits: [
        "Competitive compensation",
        "Health and wellness benefits",
        "Remote work options",
        "Learning and development"
      ]
    },
    {
      company: "Microsoft",
      title: "Software Engineer",
      location: "Seattle, WA (Hybrid)",
      type: "Full-time",
      salary: "$110k - $170k",
      posted: "3 days ago",
      logo: "https://upload.wikimedia.org/wikipedia/commons/thumb/4/44/Microsoft_logo.svg/2560px-Microsoft_logo.svg.png",
      requirements: [
        "3+ years of software development",
        "Experience with C# and .NET",
        "Cloud platform knowledge",
        "Bachelor's degree in CS or related field"
      ],
      description: "Join our team to build enterprise solutions that help businesses transform and grow in the digital age.",
      benefits: [
        "Competitive salary",
        "Health insurance",
        "401(k) matching",
        "Professional development"
      ]
    }
  ];

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

  const handleJobAction = (action: 'pass' | 'save' | 'like') => {
    const currentJob = jobListings[currentJobIndex];
    
    if (action === 'like') {
      setAppliedJobs(prev => [...prev, currentJob]);
    } else if (action === 'save') {
      setSavedJobs(prev => [...prev, currentJob]);
    }
    
    // Move to next job
    setCurrentJobIndex(prev => 
      prev === jobListings.length - 1 ? 0 : prev + 1
    );
  };

  const menuItems = selectedRole === 'employer' ? [
    { icon: <Users className="w-5 h-5" />, label: 'Candidates', index: 0 },
    { icon: <MessageSquare className="w-5 h-5" />, label: 'Messages', index: 1 },
    { icon: <BarChart2 className="w-5 h-5" />, label: 'Dashboard', index: 2 },
    { icon: <Briefcase className="w-5 h-5" />, label: 'Coach', index: 3 },
    { icon: <Building2 className="w-5 h-5" />, label: 'Profile', index: 4 },
    { icon: <Settings className="w-5 h-5" />, label: 'Settings', index: 5 },
  ] : [
    { icon: <Briefcase className="w-5 h-5" />, label: 'Jobs', index: 0 },
    { icon: <MessageSquare className="w-5 h-5" />, label: 'Messages', index: 1 },
    { icon: <Briefcase className="w-5 h-5" />, label: 'Coach', index: 2 },
    { icon: <Building2 className="w-5 h-5" />, label: 'Profile', index: 3 },
    { icon: <Settings className="w-5 h-5" />, label: 'Settings', index: 4 },
  ];

  const cards = selectedRole === 'employer' ? [
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
      type: 'company',
      component: <CompanyProfileCard />
    },
    {
      type: 'settings',
      component: <SettingsCard />
    }
  ] : [
    {
      type: 'jobs',
      component: <JobCard job={jobListings[currentJobIndex]} />
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
      type: 'coach',
      component: <CoachCard onStartSession={() => console.log("Start session clicked")} />
    },
    {
      type: 'company',
      component: <CompanyProfileCard />
    },
    {
      type: 'settings',
      component: <SettingsCard />
    }
  ];

  const handleCardClick = (index: number) => {
    if (!isAnimating) {
      setIsAnimating(true);
      setCurrentCardIndex(index);
      setTimeout(() => setIsAnimating(false), 300);
    }
  };

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

  // Close menu when clicking outside
  useEffect(() => {
    function handleClickOutside(event: MouseEvent) {
      if (menuRef.current && !menuRef.current.contains(event.target as Node)) {
        setIsMenuOpen(false);
      }
    }
    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  const handleMenuSelect = (index: number) => {
    setCurrentCardIndex(index);
    setIsMenuOpen(false);
  };

  if (!isAuthenticated) {
    return <LandingPage onAuthSuccess={(type) => {
      setUserType(type);
      setSelectedRole(type);
      setIsAuthenticated(true);
    }} />;
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-indigo-950 via-purple-900 to-slate-900 text-white">
      {/* Mobile Menu Button */}
      <button
        className="fixed top-4 right-4 z-50 p-2 rounded-lg bg-white/15 backdrop-blur-md lg:hidden hover:bg-white/20"
        onClick={() => setIsMenuOpen(!isMenuOpen)}
      >
        <svg
          className="w-6 h-6"
          fill="none"
          stroke="currentColor"
          viewBox="0 0 24 24"
        >
          {isMenuOpen ? (
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M6 18L18 6M6 6l12 12"
            />
          ) : (
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M4 6h16M4 12h16M4 18h16"
            />
          )}
        </svg>
      </button>

      {/* Sidebar/Menu */}
      <div
        ref={menuRef}
        className={`fixed top-0 left-0 h-full bg-slate-900/95 backdrop-blur-md border-r border-white/10 transform transition-all duration-300 ease-in-out z-40 ${
          isMenuOpen ? 'translate-x-0' : '-translate-x-full'
        } lg:translate-x-0 ${
          isSidebarCollapsed ? 'w-16' : 'w-64'
        }`}
        onMouseEnter={() => setIsSidebarCollapsed(false)}
        onMouseLeave={() => setIsSidebarCollapsed(true)}
      >
        <div className="p-4">
          <div 
            className="relative mb-8 cursor-pointer"
          >
            <h1 className={`app-logo transition-all duration-300 ${isSidebarCollapsed ? 'text-xl opacity-0' : 'text-3xl opacity-100'}`}>
              Hirly
            </h1>
            {!isSidebarCollapsed && (
              <button
                onClick={(e) => {
                  e.stopPropagation();
                  setIsSidebarCollapsed(true);
                }}
                className="absolute -right-2 top-1/2 -translate-y-1/2 p-1 rounded-full bg-white/10 hover:bg-white/20"
              >
                <ChevronLeft className="w-4 h-4" />
              </button>
            )}
          </div>
          <nav className="space-y-2">
            {menuItems.map((item) => (
              <button
                key={item.label}
                onClick={() => {
                  handleMenuSelect(item.index);
                  // Don't collapse on mobile
                  if (window.innerWidth >= 1024) {
                    setIsSidebarCollapsed(true);
                  }
                }}
                className="w-full flex items-center justify-center sm:justify-start space-x-3 p-3 rounded-lg hover:bg-white/10 transition-colors text-white/90 hover:text-white group"
                title={isSidebarCollapsed ? item.label : ''}
              >
                <div className="min-w-[20px] flex items-center justify-center">
                  {item.icon}
                </div>
                <span className={`transition-all duration-300 ${isSidebarCollapsed ? 'opacity-0 w-0' : 'opacity-100'}`}>
                  {item.label}
                </span>
              </button>
            ))}
          </nav>
        </div>
      </div>

      {/* Main Content */}
      <div 
        className={`min-h-screen transition-all duration-300 ${
          isSidebarCollapsed ? 'lg:ml-16' : 'lg:ml-64'
        } ${isMenuOpen ? 'ml-64' : 'ml-0'}`}
      >
        <div className="container mx-auto px-4 py-8">
          {!selectedRole ? (
            <LandingPage onSelectRole={setSelectedRole} />
          ) : (
            <div className="flex flex-col items-center">
              <div className="w-full">
                <h2 className="max-w-7xl pl-4 mx-auto text-xl md:text-5xl font-bold text-neutral-800 dark:text-neutral-200 font-sans mb-8">
                  Explore Your Dashboard
                </h2>
                <div className="relative min-h-[600px]">
                  <div className="relative">
                    <div className="opacity-40">
                      <CardCarousel 
                        cards={cards} 
                        onCardClick={handleCardClick}
                        currentIndex={currentCardIndex}
                      />
                    </div>
                    <div className="absolute top-0 left-1/2 -translate-x-1/2 z-10">
                      <div 
                        className={`rounded-3xl overflow-visible transition-all duration-500 ${
                          isAnimating ? 'opacity-0 scale-95' : 'opacity-100 scale-100'
                        }`}
                      >
                        <div className="p-4">
                          {cards[currentCardIndex].component}
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
              <div className="mt-8 flex justify-center space-x-4">
                <button
                  onClick={handlePrevious}
                  className="p-2 rounded-full bg-white/15 hover:bg-white/20 transition-colors"
                >
                  <ChevronLeft className="w-6 h-6" />
                </button>
                <button
                  onClick={handleNext}
                  className="p-2 rounded-full bg-white/15 hover:bg-white/20 transition-colors"
                >
                  <ChevronRight className="w-6 h-6" />
                </button>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}

export default App;