import React, { useState } from 'react';
import { Briefcase, GraduationCap, ArrowLeft } from 'lucide-react';
import GradientButton from './GradientButton';

interface ProfileCardProps {
  avatarSrc: string;
  name: string;
  title: string;
  skills: string[];
  onViewProfile: () => void;
  buttonLabel: string;
  onAction?: () => void;
}

const ProfileCard: React.FC<ProfileCardProps> = ({
  avatarSrc,
  name,
  title,
  skills,
  onViewProfile,
  buttonLabel,
  onAction
}) => {
  const [isExpanded, setIsExpanded] = useState(false);

  return (
    <div className={`
      bg-white/10 backdrop-blur-md rounded-2xl p-6
      border border-white/20 shadow-xl overflow-hidden
      transition-all duration-300 ease-in-out
      ${isExpanded ? 'w-[700px]' : 'w-[350px]'}
    `}>
      <div className="flex h-[480px]">
        {/* Main Profile View */}
        <div className={`
          flex flex-col items-center transition-all duration-300 ease-in-out
          ${isExpanded ? 'w-1/3 pr-4' : 'w-full'}
        `}>
          {/* Profile Header */}
          <div className="flex flex-col items-center space-y-4 mb-8">
            <div className="w-24 h-24 rounded-xl overflow-hidden border-2 border-white/20">
              <img 
                src={avatarSrc} 
                alt={name}
                className="w-full h-full object-cover"
              />
            </div>
            <div className="text-center">
              <h2 className="text-2xl font-bold text-white mb-1">{name}</h2>
              <p className="text-white/60 text-lg">{title}</p>
            </div>
          </div>

          {/* Skills */}
          <div className="flex-1 w-full">
            <div className="flex flex-wrap justify-center gap-2">
              {skills.map((skill, index) => (
                <span 
                  key={index}
                  className="px-4 py-2 rounded-full bg-white/10 border border-white/20
                           text-white/80 text-sm"
                >
                  {skill}
                </span>
              ))}
            </div>
          </div>

          {/* View Profile Button */}
          <div className="mt-8 w-full">
            <GradientButton onClick={() => {
              setIsExpanded(!isExpanded);
              onViewProfile();
            }}>
              {buttonLabel}
            </GradientButton>
          </div>
        </div>

        {/* Resume View */}
        <div className={`
          w-2/3 pl-4 border-l border-white/10 flex flex-col
          transition-all duration-300 ease-in-out
          ${isExpanded ? 'opacity-100 translate-x-0' : 'opacity-0 translate-x-4'}
        `}>
          {/* Header */}
          <div className="flex justify-between items-center mb-6">
            <h3 className="text-xl font-bold text-white">Resume</h3>
            <button 
              onClick={() => setIsExpanded(false)}
              className="flex items-center text-white/60 hover:text-white transition-colors"
            >
              <ArrowLeft className="w-5 h-5 mr-1" />
              Back
            </button>
          </div>

          {/* Experience */}
          <div className="mb-6">
            <h4 className="text-white/80 font-medium mb-4 flex items-center">
              <Briefcase className="w-4 h-4 mr-2" />
              Experience
            </h4>
            <div className="space-y-4">
              <div>
                <h5 className="text-white/90 font-medium">Senior Frontend Developer</h5>
                <p className="text-white/60 text-sm">Google • 2020 - Present</p>
                <p className="text-white/70 text-sm mt-1">
                  Led development of core frontend features, mentored junior developers,
                  and improved application performance by 40%.
                </p>
              </div>
              <div>
                <h5 className="text-white/90 font-medium">Frontend Developer</h5>
                <p className="text-white/60 text-sm">Facebook • 2018 - 2020</p>
                <p className="text-white/70 text-sm mt-1">
                  Developed and maintained React components, implemented new features,
                  and collaborated with design team.
                </p>
              </div>
            </div>
          </div>

          {/* Education */}
          <div>
            <h4 className="text-white/80 font-medium mb-4 flex items-center">
              <GraduationCap className="w-4 h-4 mr-2" />
              Education
            </h4>
            <div>
              <h5 className="text-white/90 font-medium">B.S. Computer Science</h5>
              <p className="text-white/60 text-sm">Stanford University • 2014 - 2018</p>
              <p className="text-white/70 text-sm mt-1">
                Graduated with honors. Focus on Software Engineering and AI.
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProfileCard;