import React from 'react';
import { User, Building2 } from 'lucide-react';
import GradientButton from './GradientButton';
import Orb from './Orb';

interface LandingPageProps {
  onSelectRole: (role: 'candidate' | 'employer') => void;
}

const LandingPage: React.FC<LandingPageProps> = ({ onSelectRole }) => {
  return (
    <div className="min-h-screen flex items-center justify-center p-8 bg-gradient-to-br from-black via-gray-900 to-black">
      <div className="relative w-full max-w-4xl">
        <div className="flex flex-col items-center p-12 rounded-3xl 
                      bg-white/10 backdrop-blur-md border border-white/20
                      shadow-xl shadow-black/20">
          
          {/* Orb Background */}
          <div className="absolute inset-0 z-0">
            <Orb
              hoverIntensity={0.5}
              rotateOnHover={true}
              hue={0}
              forceHoverState={false}
            />
          </div>
          
          <div className="relative z-10 text-center">
            <h1 className="text-4xl font-bold text-white tracking-wide mb-8
                         text-shadow-glow">Welcome to Hirly</h1>
            <p className="text-white/80 text-lg mb-12 max-w-2xl mx-auto">
              Choose your role to get started with our AI-powered hiring platform
            </p>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-8 max-w-3xl mx-auto">
              {/* Candidate Card */}
              <div className="group relative">
                <div className="absolute inset-0 bg-gradient-to-br from-blue-500/20 to-purple-500/20 
                              rounded-3xl blur-xl group-hover:blur-2xl transition-all duration-300"></div>
                <div className="relative p-8 rounded-3xl bg-white/10 backdrop-blur-md border border-white/20
                              hover:bg-white/15 transition-all duration-300 cursor-pointer"
                     onClick={() => onSelectRole('candidate')}>
                  <div className="flex flex-col items-center">
                    <div className="w-20 h-20 rounded-2xl bg-white/10 flex items-center justify-center mb-6
                                  group-hover:scale-110 transition-transform duration-300">
                      <User className="w-10 h-10 text-white" />
                    </div>
                    <h2 className="text-2xl font-bold text-white mb-4">I'm a Candidate</h2>
                    <p className="text-white/60 mb-6">
                      Find your dream job with AI-powered job matching and interview preparation
                    </p>
                    <GradientButton onClick={() => onSelectRole('candidate')}>
                      Get Started
                    </GradientButton>
                  </div>
                </div>
              </div>

              {/* Employer Card */}
              <div className="group relative">
                <div className="absolute inset-0 bg-gradient-to-br from-green-500/20 to-teal-500/20 
                              rounded-3xl blur-xl group-hover:blur-2xl transition-all duration-300"></div>
                <div className="relative p-8 rounded-3xl bg-white/10 backdrop-blur-md border border-white/20
                              hover:bg-white/15 transition-all duration-300 cursor-pointer"
                     onClick={() => onSelectRole('employer')}>
                  <div className="flex flex-col items-center">
                    <div className="w-20 h-20 rounded-2xl bg-white/10 flex items-center justify-center mb-6
                                  group-hover:scale-110 transition-transform duration-300">
                      <Building2 className="w-10 h-10 text-white" />
                    </div>
                    <h2 className="text-2xl font-bold text-white mb-4">I'm an Employer</h2>
                    <p className="text-white/60 mb-6">
                      Find the perfect candidates with AI-powered screening and interview tools
                    </p>
                    <GradientButton onClick={() => onSelectRole('employer')}>
                      Get Started
                    </GradientButton>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default LandingPage; 