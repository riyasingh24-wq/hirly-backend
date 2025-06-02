import React, { useState } from 'react';
import Avatar from './Avatar';
import SkillTag from './SkillTag';
import GradientButton from './GradientButton';
import ResumeView from './ResumeView';

interface ProfileCardProps {
  avatarSrc: string;
  name: string;
  title: string;
  skills: string[];
  onViewProfile: () => void;
  buttonLabel: string;
  onAction?: (action: 'star' | 'heart') => void;
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
  const [isHovered, setIsHovered] = useState(false);
  const [showResume, setShowResume] = useState(false);

  const handleViewProfile = () => {
    setShowResume(true);
    onViewProfile();
  };

  const handleAction = (action: 'close' | 'star' | 'heart') => {
    if (action === 'close') {
      setShowResume(false);
    } else if (onAction) {
      onAction(action);
      setShowResume(false);
    }
  };

  if (showResume) {
    return (
      <ResumeView
        avatarSrc={avatarSrc}
        name={name}
        title={title}
        skills={skills}
        onClose={() => setShowResume(false)}
        onAction={handleAction}
      />
    );
  }

  return (
    <div 
      className="relative w-[350px] bg-white/10 backdrop-blur-md rounded-2xl p-6
                 border border-white/20 shadow-xl overflow-hidden
                 transition-all duration-300 ease-in-out
                 hover:bg-white/15 hover:shadow-2xl
                 flex flex-col items-center"
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
    >
      {/* Animated background gradient */}
      <div className={`
        absolute inset-0 bg-gradient-to-br from-purple-500/20 to-red-500/20
        transition-opacity duration-300
        ${isHovered ? 'opacity-100' : 'opacity-0'}
      `} />

      <div className="relative z-10 w-full flex flex-col items-center">
        {/* Avatar and Name Section */}
        <div className="flex flex-col items-center mb-6">
          <div className={`
            transition-transform duration-300 mb-4
            ${isHovered ? 'scale-110' : 'scale-100'}
          `}>
            <Avatar src={avatarSrc} size="large" />
          </div>
          <div className="text-center">
            <h2 className="text-2xl font-bold text-white mb-1">{name}</h2>
            <p className="text-white/80">{title}</p>
          </div>
        </div>

        {/* Skills Section */}
        <div className="w-full mb-6">
          <h3 className="text-white/90 text-sm font-semibold mb-3 text-center">Skills</h3>
          <div className="flex flex-wrap justify-center gap-2">
            {skills.map((skill, index) => (
              <div
                key={skill}
                className={`
                  transition-all duration-300
                  ${isHovered ? 'scale-105' : 'scale-100'}
                `}
                style={{ transitionDelay: `${index * 50}ms` }}
              >
                <SkillTag label={skill} />
              </div>
            ))}
          </div>
        </div>

        {/* Button Section */}
        <div className="w-full mt-auto">
          <GradientButton
            onClick={handleViewProfile}
            className="w-full"
          >
            {buttonLabel}
          </GradientButton>
        </div>
      </div>
    </div>
  );
};

export default ProfileCard;