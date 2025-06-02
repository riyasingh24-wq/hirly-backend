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
        className="bg-white/10 backdrop-blur-md rounded-2xl p-6 border border-white/20 shadow-xl transition-all duration-300 w-[350px] flex flex-col items-center cursor-pointer"
        style={{ minHeight: 350 }}
        onClick={() => setExpanded(true)}
      >
        <img
          src={avatarSrc}
          alt={name}
          className="w-24 h-24 rounded-xl object-cover border-2 border-white/20 mb-4"
        />
        <h2 className="text-2xl font-bold text-white text-center mb-1">{name}</h2>
        <p className="text-white/60 text-lg text-center mb-2">{title}</p>
        {description && <p className="text-white/50 text-center mb-4">{description}</p>}
        <div className="flex flex-wrap justify-center gap-2 mb-4">
          {skills.map((skill, i) => (
            <span
              key={i}
              className="px-4 py-2 rounded-full bg-white/10 border border-white/20 text-white/80 text-sm"
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
      className="bg-white/10 backdrop-blur-md rounded-2xl p-6 border border-white/20 shadow-xl transition-all duration-300 w-[700px] flex h-[500px]"
    >
      {/* Left: Profile summary */}
      <div className="w-1/3 pr-4 flex flex-col items-center justify-center">
        <img
          src={avatarSrc}
          alt={name}
          className="w-24 h-24 rounded-xl object-cover border-2 border-white/20 mb-4"
        />
        <h2 className="text-2xl font-bold text-white text-center mb-1">{name}</h2>
        <p className="text-white/60 text-lg text-center mb-2">{title}</p>
        {description && <p className="text-white/50 text-center mb-4">{description}</p>}
        <div className="flex flex-wrap justify-center gap-2 mb-4">
          {skills.map((skill, i) => (
            <span
              key={i}
              className="px-4 py-2 rounded-full bg-white/10 border border-white/20 text-white/80 text-sm"
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
      <div className="w-2/3 pl-4 border-l border-white/10 flex flex-col overflow-y-auto">
        {resume ? (
          resume
        ) : (
          <div className="text-white/80">
            <h3 className="text-xl font-bold mb-4">Resume</h3>
            {/* Experience Section */}
            <div className="mb-6">
              <h4 className="text-lg font-semibold mb-2">Experience</h4>
              <div className="mb-4">
                <div className="font-bold text-white">Senior Frontend Developer</div>
                <div className="text-white/60 text-sm">Google &bull; 2020 - Present</div>
                <div className="text-white/70 text-sm mt-1">Led development of core UI features, mentored junior devs, and improved app performance by 40%.</div>
              </div>
              <div>
                <div className="font-bold text-white">Frontend Developer</div>
                <div className="text-white/60 text-sm">Facebook &bull; 2018 - 2020</div>
                <div className="text-white/70 text-sm mt-1">Built and maintained React components, implemented new features, and collaborated with design team.</div>
              </div>
            </div>
            {/* Education Section */}
            <div>
              <h4 className="text-lg font-semibold mb-2">Education</h4>
              <div>
                <div className="font-bold text-white">B.S. Computer Science</div>
                <div className="text-white/60 text-sm">Stanford University &bull; 2014 - 2018</div>
                <div className="text-white/70 text-sm mt-1">Graduated with honors. Focus on Software Engineering and AI.</div>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default ProfileCard;