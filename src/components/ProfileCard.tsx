import React, { useState } from 'react';
import Avatar from './Avatar';
import SkillTag from './SkillTag';
import GradientButton from './GradientButton';

interface ProfileCardProps {
  avatarSrc: string;
  name: string;
  title: string;
  skills: string[];
  onViewProfile: () => void;
  buttonLabel: string;
}

const ProfileCard: React.FC<ProfileCardProps> = ({
  avatarSrc,
  name,
  title,
  skills,
  onViewProfile,
  buttonLabel
}) => {
  const [isHovered, setIsHovered] = useState(false);

  return (
    <div 
      className="relative w-[350px] bg-white/10 backdrop-blur-md rounded-2xl p-6
                 border border-white/20 shadow-xl overflow-hidden
                 transition-all duration-300 ease-in-out
                 hover:bg-white/15 hover:shadow-2xl"
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
    >
      {/* Animated background gradient */}
      <div className={`
        absolute inset-0 bg-gradient-to-br from-purple-500/20 to-red-500/20
        transition-opacity duration-300
        ${isHovered ? 'opacity-100' : 'opacity-0'}
      `} />

      <div className="relative z-10">
        <div className="flex items-center space-x-4 mb-6">
          <div className={`
            transition-transform duration-300
            ${isHovered ? 'scale-110' : 'scale-100'}
          `}>
            <Avatar src={avatarSrc} size="large" />
          </div>
          <div>
            <h2 className="text-2xl font-bold text-white mb-1">{name}</h2>
            <p className="text-white/80">{title}</p>
          </div>
        </div>

        <div className="mb-6">
          <h3 className="text-white/90 text-sm font-semibold mb-3">Skills</h3>
          <div className="flex flex-wrap gap-2">
            {skills.map((skill, index) => (
              <div
                key={skill}
                className={`
                  transition-all duration-300
                  ${isHovered ? 'translate-y-0 opacity-100' : 'translate-y-2 opacity-0'}
                `}
                style={{ transitionDelay: `${index * 50}ms` }}
              >
                <SkillTag label={skill} />
              </div>
            ))}
          </div>
        </div>

        <div className={`
          transition-all duration-300
          ${isHovered ? 'translate-y-0 opacity-100' : 'translate-y-4 opacity-0'}
        `}>
          <GradientButton
            onClick={onViewProfile}
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