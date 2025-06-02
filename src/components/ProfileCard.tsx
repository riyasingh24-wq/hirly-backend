import React, { useState } from 'react';
import { MapPin, Mail, Phone, Globe, Github, Linkedin, Briefcase, Award, GraduationCap, ChevronRight } from 'lucide-react';
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
    <div 
      className={`
        relative w-[350px] h-[480px] rounded-2xl overflow-hidden
        bg-white/10 backdrop-blur-md border border-white/20
        shadow-xl shadow-black/20
        transition-all duration-300 ease-in-out
        ${isExpanded ? 'h-[600px]' : ''}
      `}
    >
      {/* Profile Header */}
      <div className="absolute top-6 left-6 right-6 flex items-center space-x-4">
        <div className="w-16 h-16 rounded-xl overflow-hidden border-2 border-white/20">
          <img 
            src={avatarSrc} 
            alt={name}
            className="w-full h-full object-cover"
          />
        </div>
        <div>
          <h2 className="text-xl font-bold text-white">{name}</h2>
          <p className="text-white/60">{title}</p>
        </div>
      </div>

      {/* Contact Info */}
      <div className="absolute top-6 right-6 text-right">
        <div className="flex flex-col items-end space-y-2">
          <button className="text-white/60 hover:text-white transition-colors">
            <Mail className="w-5 h-5" />
          </button>
          <button className="text-white/60 hover:text-white transition-colors">
            <Phone className="w-5 h-5" />
          </button>
        </div>
      </div>

      {/* Main Content */}
      <div className="absolute top-32 left-6 right-6">
        {/* Skills */}
        <div className="mb-6">
          <h3 className="text-white/80 font-medium mb-2">Skills</h3>
          <div className="flex flex-wrap gap-2">
            {skills.map((skill, index) => (
              <span 
                key={index}
                className="px-3 py-1 rounded-full bg-white/10 border border-white/20
                         text-white/80 text-sm"
              >
                {skill}
              </span>
            ))}
          </div>
        </div>

        {/* Quick Info */}
        <div className="space-y-3 mb-6">
          <div className="flex items-center text-white/60">
            <MapPin className="w-4 h-4 mr-2" />
            <span>San Francisco, CA</span>
          </div>
          <div className="flex items-center text-white/60">
            <Globe className="w-4 h-4 mr-2" />
            <span>www.example.com</span>
          </div>
          <div className="flex items-center space-x-4">
            <button className="text-white/60 hover:text-white transition-colors">
              <Github className="w-5 h-5" />
            </button>
            <button className="text-white/60 hover:text-white transition-colors">
              <Linkedin className="w-5 h-5" />
            </button>
          </div>
        </div>

        <div className="flex justify-between items-center">
          <button 
            onClick={() => setIsExpanded(!isExpanded)}
            className="text-white/60 hover:text-white transition-colors flex items-center"
          >
            {isExpanded ? 'Show Less' : 'Show More'}
            <ChevronRight className={`w-4 h-4 ml-1 transition-transform ${isExpanded ? 'rotate-90' : ''}`} />
          </button>
          <GradientButton onClick={onViewProfile}>
            {buttonLabel}
          </GradientButton>
        </div>
      </div>

      {/* Expanded Content */}
      {isExpanded && (
        <div className="absolute bottom-0 left-0 right-0 p-6 bg-gradient-to-t from-black/50 to-transparent">
          {/* Experience */}
          <div className="mb-4">
            <h4 className="text-white/80 font-medium mb-2 flex items-center">
              <Briefcase className="w-4 h-4 mr-2" />
              Experience
            </h4>
            <div className="space-y-3">
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
            <h4 className="text-white/80 font-medium mb-2 flex items-center">
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
      )}
    </div>
  );
};

export default ProfileCard;