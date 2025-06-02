import React from 'react';
import Avatar from './Avatar';
import SkillTag from './SkillTag';

interface ResumeViewProps {
  avatarSrc: string;
  name: string;
  title: string;
  skills: string[];
  onClose: () => void;
}

const ResumeView: React.FC<ResumeViewProps> = ({
  avatarSrc,
  name,
  title,
  skills,
  onClose
}) => {
  return (
    <div className={`
      bg-white/10 backdrop-blur-md rounded-2xl p-6
      border border-white/20 shadow-xl overflow-hidden
      transition-all duration-300 ease-in-out
      w-[700px]
    `}>
      <div className="flex h-[500px]">
        {/* Left Side - Profile Overview */}
        <div className="w-1/3 pr-4 border-r border-white/10">
          <div className="flex flex-col items-center">
            <div className="mb-6">
              <Avatar src={avatarSrc} size="large" />
            </div>
            <h2 className="text-2xl font-bold text-white mb-2">{name}</h2>
            <p className="text-white/80 mb-4">{title}</p>
            
            <div className="w-full">
              <h3 className="text-white/90 text-sm font-semibold mb-3">Skills</h3>
              <div className="flex flex-wrap gap-2">
                {skills.map((skill) => (
                  <SkillTag key={skill} label={skill} />
                ))}
              </div>
            </div>

            <button
              onClick={onClose}
              className="mt-6 px-4 py-2 bg-white/10 hover:bg-white/20 
                         text-white rounded-xl transition-colors duration-200"
            >
              Close
            </button>
          </div>
        </div>

        {/* Right Side - Detailed Resume */}
        <div className="w-2/3 pl-6">
          <div className="space-y-6">
            {/* Experience Section */}
            <section>
              <h3 className="text-xl font-bold text-white mb-4">Experience</h3>
              <div className="space-y-4">
                <div className="bg-white/5 rounded-xl p-4">
                  <h4 className="text-white font-semibold">Senior Software Engineer</h4>
                  <p className="text-white/60 text-sm">Tech Company • 2020 - Present</p>
                  <ul className="mt-2 text-white/80 text-sm list-disc list-inside space-y-1">
                    <li>Led development of core platform features</li>
                    <li>Mentored junior developers and conducted code reviews</li>
                    <li>Improved application performance by 40%</li>
                  </ul>
                </div>
                <div className="bg-white/5 rounded-xl p-4">
                  <h4 className="text-white font-semibold">Software Engineer</h4>
                  <p className="text-white/60 text-sm">Startup Inc • 2018 - 2020</p>
                  <ul className="mt-2 text-white/80 text-sm list-disc list-inside space-y-1">
                    <li>Developed and maintained multiple web applications</li>
                    <li>Implemented CI/CD pipelines</li>
                    <li>Collaborated with design team on UI/UX improvements</li>
                  </ul>
                </div>
              </div>
            </section>

            {/* Education Section */}
            <section>
              <h3 className="text-xl font-bold text-white mb-4">Education</h3>
              <div className="bg-white/5 rounded-xl p-4">
                <h4 className="text-white font-semibold">Bachelor of Science in Computer Science</h4>
                <p className="text-white/60 text-sm">University Name • 2014 - 2018</p>
                <p className="mt-2 text-white/80 text-sm">
                  Graduated with honors. Focus on software engineering and artificial intelligence.
                </p>
              </div>
            </section>

            {/* Projects Section */}
            <section>
              <h3 className="text-xl font-bold text-white mb-4">Projects</h3>
              <div className="space-y-4">
                <div className="bg-white/5 rounded-xl p-4">
                  <h4 className="text-white font-semibold">AI-Powered Analytics Platform</h4>
                  <p className="text-white/80 text-sm mt-2">
                    Developed a machine learning platform that processes and analyzes large datasets,
                    providing actionable insights for business decisions.
                  </p>
                </div>
                <div className="bg-white/5 rounded-xl p-4">
                  <h4 className="text-white font-semibold">Open Source Contribution</h4>
                  <p className="text-white/80 text-sm mt-2">
                    Active contributor to several open-source projects, focusing on performance
                    optimization and feature development.
                  </p>
                </div>
              </div>
            </section>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ResumeView; 