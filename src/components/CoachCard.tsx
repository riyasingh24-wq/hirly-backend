import React, { useState } from 'react';
import { MessageSquare, Mic, Brain, ChevronRight } from 'lucide-react';
import GradientButton from './GradientButton';

interface CoachCardProps {
  onStartSession?: () => void;
}

const CoachCard: React.FC<CoachCardProps> = ({ onStartSession = () => {} }) => {
  const [isExpanded, setIsExpanded] = useState(false);

  const features = [
    {
      icon: <Brain className="w-5 h-5" />,
      title: "AI-Powered Insights",
      description: "Get real-time feedback and suggestions during practice interviews"
    },
    {
      icon: <MessageSquare className="w-5 h-5" />,
      title: "Smart Questions",
      description: "Access a curated list of industry-specific interview questions"
    },
    {
      icon: <Mic className="w-5 h-5" />,
      title: "Voice Analysis",
      description: "Analyze tone, pace, and clarity of your interview responses"
    }
  ];

  if (!isExpanded) {
    return (
      <div className="relative w-[350px]">
        <div className="flex flex-col h-[480px] p-8 rounded-3xl 
                      bg-white/10 backdrop-blur-md border border-white/20
                      shadow-xl shadow-black/20">
          
          <h2 className="text-2xl font-bold text-white tracking-wide mb-6 text-center
                       text-shadow-glow">AI Interview Coach</h2>
          
          <div className="flex-1 space-y-6">
            {features.map((feature, index) => (
              <div key={index} className="flex items-start space-x-4">
                <div className="p-2 bg-white/10 rounded-xl">
                  {feature.icon}
                </div>
                <div>
                  <h3 className="text-white font-semibold mb-1">{feature.title}</h3>
                  <p className="text-white/60 text-sm">{feature.description}</p>
                </div>
              </div>
            ))}
          </div>
          
          <div className="mt-auto flex flex-col items-center space-y-4">
            <GradientButton onClick={() => setIsExpanded(true)}>
              Start Practice Session
            </GradientButton>
            <button 
              onClick={() => setIsExpanded(true)}
              className="text-white/60 hover:text-white text-sm flex items-center space-x-1
                       transition-colors duration-200"
            >
              <span>View More</span>
              <ChevronRight className="w-4 h-4" />
            </button>
          </div>
        </div>
        
        <div className="absolute -bottom-2 left-1/2 transform -translate-x-1/2 w-[95%] h-4 
                      bg-black/20 blur-md rounded-full"></div>
      </div>
    );
  }

  return (
    <div className="relative w-[700px]">
      <div className="flex flex-col h-[600px] p-8 rounded-3xl 
                    bg-white/10 backdrop-blur-md border border-white/20
                    shadow-xl shadow-black/20">
        
        <div className="flex justify-between items-center mb-6">
          <h2 className="text-2xl font-bold text-white tracking-wide
                       text-shadow-glow">AI Interview Coach</h2>
          <button
            onClick={() => setIsExpanded(false)}
            className="px-4 py-2 bg-white/10 text-white rounded-xl
                     hover:bg-white/20 transition-colors duration-200"
          >
            Collapse
          </button>
        </div>

        <div className="flex-1 overflow-y-auto pr-4 space-y-6">
          {/* Practice Session Setup */}
          <div className="bg-white/5 rounded-xl p-6">
            <h3 className="text-white font-semibold mb-4">Start a Practice Session</h3>
            <div className="space-y-4">
              <div className="flex items-center space-x-4">
                <select className="flex-1 bg-white/10 border border-white/20 rounded-xl px-4 py-2
                                text-white focus:outline-none focus:border-white/40">
                  <option value="">Select Interview Type</option>
                  <option value="technical">Technical Interview</option>
                  <option value="behavioral">Behavioral Interview</option>
                  <option value="leadership">Leadership Interview</option>
                </select>
                <select className="flex-1 bg-white/10 border border-white/20 rounded-xl px-4 py-2
                                text-white focus:outline-none focus:border-white/40">
                  <option value="">Select Industry</option>
                  <option value="tech">Technology</option>
                  <option value="finance">Finance</option>
                  <option value="healthcare">Healthcare</option>
                </select>
              </div>
              <div className="flex items-center space-x-4">
                <select className="flex-1 bg-white/10 border border-white/20 rounded-xl px-4 py-2
                                text-white focus:outline-none focus:border-white/40">
                  <option value="">Select Experience Level</option>
                  <option value="entry">Entry Level</option>
                  <option value="mid">Mid Level</option>
                  <option value="senior">Senior Level</option>
                </select>
                <select className="flex-1 bg-white/10 border border-white/20 rounded-xl px-4 py-2
                                text-white focus:outline-none focus:border-white/40">
                  <option value="">Select Duration</option>
                  <option value="15">15 minutes</option>
                  <option value="30">30 minutes</option>
                  <option value="45">45 minutes</option>
                </select>
              </div>
            </div>
          </div>

          {/* Features Section */}
          <div className="bg-white/5 rounded-xl p-6">
            <h3 className="text-white font-semibold mb-4">Features</h3>
            <div className="grid grid-cols-2 gap-4">
              {features.map((feature, index) => (
                <div key={index} className="bg-white/5 rounded-xl p-4">
                  <div className="flex items-center space-x-3 mb-2">
                    <div className="p-2 bg-white/10 rounded-lg">
                      {feature.icon}
                    </div>
                    <h4 className="text-white font-medium">{feature.title}</h4>
                  </div>
                  <p className="text-white/60 text-sm">{feature.description}</p>
                </div>
              ))}
            </div>
          </div>

          {/* Recent Sessions */}
          <div className="bg-white/5 rounded-xl p-6">
            <h3 className="text-white font-semibold mb-4">Recent Sessions</h3>
            <div className="space-y-3">
              {[1, 2, 3].map((session) => (
                <div key={session} className="flex items-center justify-between p-3 bg-white/5 rounded-xl">
                  <div>
                    <h4 className="text-white font-medium">Technical Interview Practice</h4>
                    <p className="text-white/60 text-sm">Completed 2 days ago</p>
                  </div>
                  <button className="px-4 py-2 bg-white/10 text-white rounded-lg
                                  hover:bg-white/20 transition-colors duration-200">
                    Review
                  </button>
                </div>
              ))}
            </div>
          </div>
        </div>

        <div className="mt-6">
          <GradientButton onClick={onStartSession}>
            Start New Session
          </GradientButton>
        </div>
      </div>
      
      <div className="absolute -bottom-2 left-1/2 transform -translate-x-1/2 w-[95%] h-4 
                    bg-black/20 blur-md rounded-full"></div>
    </div>
  );
};

export default CoachCard; 