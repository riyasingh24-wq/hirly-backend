import React from 'react';

interface AvatarProps {
  src: string;
  alt: string;
  size?: 'sm' | 'md' | 'lg';
}

const Avatar: React.FC<AvatarProps> = ({ src, alt, size = 'lg' }) => {
  const sizeClasses = {
    sm: 'w-16 h-16',
    md: 'w-24 h-24',
    lg: 'w-28 h-28'
  };

  return (
    <div className="relative flex items-center justify-center">
      <div className={`${sizeClasses[size]} rounded-full overflow-hidden relative z-10`}>
        <img 
          src={src} 
          alt={alt} 
          className="w-full h-full object-cover"
        />
      </div>
      {/* Glow effect */}
      <div className={`absolute ${sizeClasses[size]} rounded-full bg-purple-300 opacity-30 blur-md -z-10`}></div>
      {/* Soft border */}
      <div className={`absolute ${sizeClasses[size]} rounded-full border border-white/20 z-20 pointer-events-none`}></div>
    </div>
  );
};

export default Avatar;