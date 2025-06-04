import React, { useState } from 'react';
import { ArrowLeft } from 'lucide-react';

interface ProfileCardProps {
  avatarSrc: string;
  name: string;
  title: string;
  description?: string;
  skills: string[];
  resume?: React.ReactNode; // For custom resume content
}

const ProfileCard: React.FC<ProfileCardProps> = ({
  avatarSrc,
  name,
  title,
  description,
  skills,
  resume
}) => {
  const [expanded, setExpanded] = useState(false);

  // Collapsed view
  if (!expanded) {
    return (
      <div
        className="bg-white/10 backdrop-blur-md rounded-2xl p-4 sm:p-6 border border-white/20 shadow-xl transition-all duration-300 w-full max-w-[350px] mx-auto flex flex-col items-center cursor-pointer"
        style={{ minHeight: 'min(350px, 80vh)' }}
        onClick={() => setExpanded(true)}
      >
        <img
          src={avatarSrc}
          alt={name}
          className="w-20 h-20 sm:w-24 sm:h-24 rounded-xl object-cover border-2 border-white/20 mb-4"
        />
        <h2 className="text-xl sm:text-2xl font-bold text-white text-center mb-1">{name}</h2>
        <p className="text-white/60 text-base sm:text-lg text-center mb-2">{title}</p>
        {description && <p className="text-white/50 text-sm sm:text-base text-center mb-4">{description}</p>}
        <div className="flex flex-wrap justify-center gap-2 mb-4">
          {skills.map((skill, i) => (
            <span
              key={i}
              className="px-3 py-1 sm:px-4 sm:py-2 rounded-full bg-white/10 border border-white/20 text-white/80 text-xs sm:text-sm"
            >
              {skill}
            </span>
          ))}
        </div>
        <button
          className="mt-auto w-full max-w-xs py-2 rounded-xl bg-gradient-to-r from-pink-500 to-red-500 text-white font-semibold shadow-lg hover:from-pink-600 hover:to-red-600 transition-colors"
        >
          View Profile
        </button>
      </div>
    );
  }

  // Expanded view
  return (
    <div
      className="bg-white/10 backdrop-blur-md rounded-2xl p-4 sm:p-6 border border-white/20 shadow-xl transition-all duration-300 w-full max-w-[700px] mx-auto flex flex-col sm:flex-row min-h-[500px]"
    >
      {/* Left: Profile summary */}
      <div className="w-full sm:w-1/3 sm:pr-4 flex flex-col items-center justify-center mb-6 sm:mb-0">
        <img
          src={avatarSrc}
          alt={name}
          className="w-20 h-20 sm:w-24 sm:h-24 rounded-xl object-cover border-2 border-white/20 mb-4"
        />
        <h2 className="text-xl sm:text-2xl font-bold text-white text-center mb-1">{name}</h2>
        <p className="text-white/60 text-base sm:text-lg text-center mb-2">{title}</p>
        {description && <p className="text-white/50 text-sm sm:text-base text-center mb-4">{description}</p>}
        <div className="flex flex-wrap justify-center gap-2 mb-4">
          {skills.map((skill, i) => (
            <span
              key={i}
              className="px-3 py-1 sm:px-4 sm:py-2 rounded-full bg-white/10 border border-white/20 text-white/80 text-xs sm:text-sm"
            >
              {skill}
            </span>
          ))}
        </div>
        <button
          className="mt-auto w-full max-w-xs py-2 rounded-xl bg-gradient-to-r from-pink-500 to-red-500 text-white font-semibold shadow-lg hover:from-pink-600 hover:to-red-600 transition-colors"
          onClick={() => setExpanded(false)}
        >
          <span className="flex items-center justify-center"><ArrowLeft className="w-4 h-4 mr-1" /> Back</span>
        </button>
      </div>
      {/* Right: Resume details */}
      <div className="w-full sm:w-2/3 sm:pl-4 sm:border-l border-white/10 flex flex-col overflow-y-auto">
        {resume ? (
          resume
        ) : (
          <div className="text-white/80">
            <h3 className="text-lg sm:text-xl font-bold mb-4">Resume</h3>
            {/* Experience Section */}
            <div className="mb-6">
              <h4 className="text-base sm:text-lg font-semibold mb-2">Experience</h4>
              <div className="mb-4">
                <div className="font-bold text-white text-sm sm:text-base">Senior Frontend Developer</div>
                <div className="text-white/60 text-xs sm:text-sm">Google &bull; 2020 - Present</div>
                <div className="text-white/70 text-xs sm:text-sm mt-1">Led development of core UI features, mentored junior devs, and improved app performance by 40%.</div>
              </div>
              <div>
                <div className="font-bold text-white text-sm sm:text-base">Frontend Developer</div>
                <div className="text-white/60 text-xs sm:text-sm">Facebook &bull; 2018 - 2020</div>
                <div className="text-white/70 text-xs sm:text-sm mt-1">Built and maintained React components, implemented new features, and collaborated with design team.</div>
              </div>
            </div>
            {/* Education Section */}
            <div>
              <h4 className="text-base sm:text-lg font-semibold mb-2">Education</h4>
              <div>
                <div className="font-bold text-white text-sm sm:text-base">B.S. Computer Science</div>
                <div className="text-white/60 text-xs sm:text-sm">Stanford University &bull; 2014 - 2018</div>
                <div className="text-white/70 text-xs sm:text-sm mt-1">Graduated with honors. Focus on Software Engineering and AI.</div>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default ProfileCard;