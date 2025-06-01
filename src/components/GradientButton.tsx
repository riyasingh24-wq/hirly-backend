import React from 'react';

interface GradientButtonProps {
  label: string;
  onClick?: () => void;
}

const GradientButton: React.FC<GradientButtonProps> = ({ label, onClick }) => {
  return (
    <button
      onClick={onClick}
      className="w-full py-3 px-6 rounded-xl font-semibold text-white text-lg
                bg-gradient-to-r from-purple-600 to-pink-500
                transition-all duration-300 transform
                hover:from-purple-700 hover:to-pink-600
                hover:shadow-lg hover:shadow-purple-500/30
                active:scale-[0.98] focus:outline-none"
    >
      {label}
    </button>
  );
};

export default GradientButton;