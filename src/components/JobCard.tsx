import React, { useState } from 'react';
import { Building2, MapPin, Globe, Users, Star, Award, Briefcase } from 'lucide-react';
import GradientButton from './GradientButton';
import Orb from './Orb';

interface JobCardProps {
  onViewJob?: () => void;
}

const JobCard: React.FC<JobCardProps> = ({ onViewJob = () => {} }) => {
  const [isExpanded, setIsExpanded] = useState(false);

  const jobInfo = {
    company: "Google",
    logo: "https://images.pexels.com/photos/3184291/pexels-photo-3184291.jpeg?auto=compress&cs=tinysrgb&w=600",
    location: "Mountain View, CA",
    type: "Full-time",
    salary: "$120k - $180k",
    posted: "2 days ago",
    industry: "Technology",
    description: "Join our team to build the next generation of AI-powered products that will shape the future of technology.",
    requirements: ["5+ years of experience", "Strong problem-solving skills", "Excellent communication"],
    benefits: ["Health Insurance", "401(k)", "Flexible PTO", "Remote Options"],
    perks: ["Gym Membership", "Free Meals", "Learning Budget"]
  };

  if (!isExpanded) {
    return (
      <div className="relative w-[350px]">
        <div className="flex flex-col h-[480px] p-8 rounded-3xl 
                      bg-white/10 backdrop-blur-md border border-white/20
                      shadow-xl shadow-black/20 overflow-hidden">
          
          {/* Orb Background */}
          <div className="absolute inset-0 z-0">
            <Orb
              hoverIntensity={0.5}
              rotateOnHover={true}
              hue={0}
              forceHoverState={false}
            />
          </div>
          
          <div className="relative z-10">
            {/* Company Logo and Name */}
            <div className="flex flex-col items-center mb-6">
              <div className="w-24 h-24 rounded-2xl overflow-hidden mb-4 border-2 border-white/20">
                <img 
                  src={jobInfo.logo} 
                  alt={jobInfo.company}
                  className="w-full h-full object-cover"
                />
              </div>
              <h2 className="text-2xl font-bold text-white tracking-wide text-center
                           text-shadow-glow">{jobInfo.company}</h2>
              <p className="text-white/60 mt-1">{jobInfo.industry}</p>
            </div>

            {/* Quick Info */}
            <div className="space-y-4 mb-6">
              <div className="flex items-center space-x-3">
                <MapPin className="w-5 h-5 text-white/60" />
                <span className="text-white/80">{jobInfo.location}</span>
              </div>
              <div className="flex items-center space-x-3">
                <Briefcase className="w-5 h-5 text-white/60" />
                <span className="text-white/80">{jobInfo.type}</span>
              </div>
              <div className="flex items-center space-x-3">
                <Star className="w-5 h-5 text-white/60" />
                <span className="text-white/80">{jobInfo.salary}</span>
              </div>
            </div>

            {/* Requirements */}
            <div className="mb-6">
              <h3 className="text-white/90 text-sm font-semibold mb-3">Requirements</h3>
              <div className="flex flex-wrap gap-2">
                {jobInfo.requirements.map((req, index) => (
                  <div
                    key={index}
                    className="px-3 py-1 rounded-full bg-white/10 border border-white/20
                             text-white/80 text-sm"
                  >
                    {req}
                  </div>
                ))}
              </div>
            </div>

            <div className="mt-auto flex flex-col items-center space-y-4">
              <GradientButton onClick={() => setIsExpanded(true)}>
                View Full Details
              </GradientButton>
            </div>
          </div>
        </div>
        
        <div className="absolute -bottom-2 left-1/2 transform -translate-x-1/2 w-[95%] h-4 
                      bg-black/20 blur-md rounded-full"></div>
      </div>
    );
  }

  return (
    <div className="relative w-[700px]">
      <div className="flex flex-col h-[600px] p-8 rounded-3xl 
                    bg-white/10 backdrop-blur-md border border-white/20
                    shadow-xl shadow-black/20 overflow-hidden">
        
        {/* Orb Background */}
        <div className="absolute inset-0 z-0 flex items-center justify-center">
          <div className="w-[350px] h-[480px]">
            <Orb
              hoverIntensity={0.5}
              rotateOnHover={true}
              hue={0}
              forceHoverState={false}
            />
          </div>
        </div>
        
        <div className="relative z-10">
          <div className="flex justify-between items-center mb-6">
            <div className="flex items-center space-x-4">
              <div className="w-16 h-16 rounded-xl overflow-hidden border-2 border-white/20">
                <img 
                  src={jobInfo.logo} 
                  alt={jobInfo.company}
                  className="w-full h-full object-cover"
                />
              </div>
              <div>
                <h2 className="text-2xl font-bold text-white tracking-wide
                             text-shadow-glow">{jobInfo.company}</h2>
                <p className="text-white/60">{jobInfo.industry}</p>
              </div>
            </div>
            <button
              onClick={() => setIsExpanded(false)}
              className="px-4 py-2 bg-white/10 text-white rounded-xl
                       hover:bg-white/20 transition-colors duration-200"
            >
              Collapse
            </button>
          </div>

          <div className="flex-1 overflow-y-auto pr-4 space-y-6">
            {/* Job Description */}
            <div className="bg-white/5 rounded-xl p-6">
              <h3 className="text-white font-semibold mb-4">About the Role</h3>
              <p className="text-white/80 leading-relaxed">{jobInfo.description}</p>
            </div>

            {/* Job Details */}
            <div className="bg-white/5 rounded-xl p-6">
              <h3 className="text-white font-semibold mb-4">Job Details</h3>
              <div className="grid grid-cols-2 gap-4">
                <div className="flex items-center space-x-3">
                  <MapPin className="w-5 h-5 text-white/60" />
                  <div>
                    <p className="text-white/60 text-sm">Location</p>
                    <p className="text-white">{jobInfo.location}</p>
                  </div>
                </div>
                <div className="flex items-center space-x-3">
                  <Briefcase className="w-5 h-5 text-white/60" />
                  <div>
                    <p className="text-white/60 text-sm">Job Type</p>
                    <p className="text-white">{jobInfo.type}</p>
                  </div>
                </div>
                <div className="flex items-center space-x-3">
                  <Star className="w-5 h-5 text-white/60" />
                  <div>
                    <p className="text-white/60 text-sm">Salary Range</p>
                    <p className="text-white">{jobInfo.salary}</p>
                  </div>
                </div>
                <div className="flex items-center space-x-3">
                  <Globe className="w-5 h-5 text-white/60" />
                  <div>
                    <p className="text-white/60 text-sm">Posted</p>
                    <p className="text-white">{jobInfo.posted}</p>
                  </div>
                </div>
              </div>
            </div>

            {/* Requirements */}
            <div className="bg-white/5 rounded-xl p-6">
              <h3 className="text-white font-semibold mb-4">Requirements</h3>
              <div className="space-y-3">
                {jobInfo.requirements.map((req, index) => (
                  <div key={index} className="flex items-center space-x-3 text-white/80">
                    <Star className="w-5 h-5 text-white/60" />
                    <span>{req}</span>
                  </div>
                ))}
              </div>
            </div>

            {/* Benefits */}
            <div className="bg-white/5 rounded-xl p-6">
              <h3 className="text-white font-semibold mb-4">Benefits & Perks</h3>
              <div className="grid grid-cols-2 gap-3">
                {jobInfo.benefits.map((benefit, index) => (
                  <div key={index} className="flex items-center space-x-2 text-white/80">
                    <Star className="w-4 h-4 text-white/60" />
                    <span>{benefit}</span>
                  </div>
                ))}
                {jobInfo.perks.map((perk, index) => (
                  <div key={index} className="flex items-center space-x-2 text-white/80">
                    <Award className="w-4 h-4 text-white/60" />
                    <span>{perk}</span>
                  </div>
                ))}
              </div>
            </div>
          </div>

          <div className="mt-6">
            <GradientButton onClick={onViewJob}>
              Apply Now
            </GradientButton>
          </div>
        </div>
      </div>
      
      <div className="absolute -bottom-2 left-1/2 transform -translate-x-1/2 w-[95%] h-4 
                    bg-black/20 blur-md rounded-full"></div>
    </div>
  );
};

export default JobCard; 