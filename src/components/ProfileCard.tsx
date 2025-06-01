import React from 'react';
import Avatar from './Avatar';
import SkillTag from './SkillTag';
import GradientButton from './GradientButton';

interface ProfileCardProps {
  avatarSrc: string;
  name: string;
  title: string;
  skills: string[];
  onViewProfile?: () => void;
}

const ProfileCard: React.FC<ProfileCardProps> = ({
  avatarSrc,
  name,
  title,
  skills,
  onViewProfile
}) => {
  return (
    <div className="relative w-full max-w-xs mx-auto">
      {/* Card with glassmorphism effect */}
      <div className="flex flex-col items-center p-8 pt-10 pb-8 rounded-3xl 
                    bg-white/10 backdrop-blur-md border border-white/20
                    shadow-xl shadow-black/20">
        
        {/* Avatar */}
        <div className="mb-5">
          <Avatar src={avatarSrc} alt={name} />
        </div>
        
        {/* Profile details */}
        <h2 className="text-2xl font-bold text-white tracking-wide mb-1">{name}</h2>
        <p className="text-lavender-100 font-medium mb-6">{title}</p>
        
        {/* Skills */}
        <div className="flex flex-wrap justify-center gap-2 mb-8">
          {skills.map((skill, index) => (
            <SkillTag key={index} label={skill} />
          ))}
        </div>
        
        {/* Button */}
        <GradientButton label="View Profile" onClick={onViewProfile} />
      </div>
      
      {/* Card shadow/reflection effect */}
      <div className="absolute -bottom-2 left-1/2 transform -translate-x-1/2 w-[95%] h-4 
                    bg-black/20 blur-md rounded-full"></div>
    </div>
  );
};

export default ProfileCard;