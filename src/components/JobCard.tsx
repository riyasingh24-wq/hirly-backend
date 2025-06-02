import React, { useState } from 'react';
import { MapPin, Clock, DollarSign, Briefcase, Building2, ChevronRight } from 'lucide-react';
import GradientButton from './GradientButton';

interface JobCardProps {
  onViewJob?: () => void;
}

const JobCard: React.FC<JobCardProps> = ({ onViewJob = () => {} }) => {
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
      {/* Company Logo */}
      <div className="absolute top-6 left-6 w-16 h-16 rounded-xl bg-white/20 backdrop-blur-md border border-white/20 flex items-center justify-center">
        <Building2 className="w-8 h-8 text-white" />
      </div>

      {/* Job Info */}
      <div className="absolute top-6 right-6 text-right">
        <h3 className="text-white/60 text-sm font-medium">Full Time</h3>
        <p className="text-white/40 text-xs">Posted 2 days ago</p>
      </div>

      {/* Main Content */}
      <div className="absolute bottom-0 left-0 right-0 p-6">
        <h2 className="text-2xl font-bold text-white mb-2">Senior Frontend Developer</h2>
        <h3 className="text-xl text-white/80 mb-4">Google</h3>

        <div className="space-y-3 mb-6">
          <div className="flex items-center text-white/60">
            <MapPin className="w-4 h-4 mr-2" />
            <span>Mountain View, CA (Remote)</span>
          </div>
          <div className="flex items-center text-white/60">
            <Clock className="w-4 h-4 mr-2" />
            <span>Full-time</span>
          </div>
          <div className="flex items-center text-white/60">
            <DollarSign className="w-4 h-4 mr-2" />
            <span>$120k - $180k</span>
          </div>
        </div>

        <div className="mb-6">
          <h4 className="text-white/80 font-medium mb-2">Requirements</h4>
          <ul className="text-white/60 text-sm space-y-1">
            <li>• 5+ years of React experience</li>
            <li>• Strong TypeScript skills</li>
            <li>• Experience with large-scale applications</li>
            <li>• Bachelor's degree in CS or related field</li>
          </ul>
        </div>

        <div className="flex justify-between items-center">
          <button 
            onClick={() => setIsExpanded(!isExpanded)}
            className="text-white/60 hover:text-white transition-colors flex items-center"
          >
            {isExpanded ? 'Show Less' : 'Show More'}
            <ChevronRight className={`w-4 h-4 ml-1 transition-transform ${isExpanded ? 'rotate-90' : ''}`} />
          </button>
          <GradientButton onClick={onViewJob}>
            Apply Now
          </GradientButton>
        </div>
      </div>

      {/* Expanded Content */}
      {isExpanded && (
        <div className="absolute bottom-0 left-0 right-0 p-6 bg-gradient-to-t from-black/50 to-transparent">
          <div className="mb-4">
            <h4 className="text-white/80 font-medium mb-2">About the Role</h4>
            <p className="text-white/60 text-sm">
              Join our team to build the next generation of web applications. You'll work with cutting-edge technologies
              and collaborate with world-class engineers to create products that impact millions of users.
            </p>
          </div>
          <div>
            <h4 className="text-white/80 font-medium mb-2">Benefits</h4>
            <ul className="text-white/60 text-sm space-y-1">
              <li>• Competitive salary and equity</li>
              <li>• Comprehensive health coverage</li>
              <li>• Flexible work arrangements</li>
              <li>• Professional development budget</li>
            </ul>
          </div>
        </div>
      )}
    </div>
  );
};

export default JobCard; 