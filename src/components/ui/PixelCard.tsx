'use client';

import React from 'react';

interface PixelCardProps {
  children: React.ReactNode;
  className?: string;
  variant?: 'default' | 'glow' | 'accent' | 'gold' | 'dark';
  onClick?: () => void;
}

export const PixelCard: React.FC<PixelCardProps> = ({
  children,
  className = '',
  variant = 'default',
  onClick
}) => {
  const getVariantStyles = () => {
    switch (variant) {
      case 'glow':
        return 'bg-slate-900/90 border-2 border-teal-500/80 shadow-[0_0_15px_rgba(20,184,166,0.3)] hover:shadow-[0_0_25px_rgba(20,184,166,0.5)]';
      case 'accent':
        return 'bg-slate-900/90 border-2 border-purple-500/80 shadow-[0_0_15px_rgba(168,85,247,0.3)] hover:shadow-[0_0_25px_rgba(168,85,247,0.5)]';
      case 'gold':
        return 'bg-amber-950/40 border-2 border-amber-400 shadow-[0_0_15px_rgba(251,191,36,0.4)]';
      case 'dark':
        return 'bg-slate-950/90 border-2 border-slate-800 shadow-lg';
      default:
        return 'bg-slate-900/80 border-2 border-slate-700/80 hover:border-slate-500/80 shadow-md';
    }
  };

  return (
    <div
      onClick={onClick}
      className={`relative rounded-xl p-5 backdrop-blur-md transition-all duration-300 ${getVariantStyles()} ${
        onClick ? 'cursor-pointer transform hover:-translate-y-1' : ''
      } ${className}`}
    >
      {/* Corner Pixel Accent Dots */}
      <div className="absolute top-1 left-1 w-1.5 h-1.5 bg-white/30 rounded-full" />
      <div className="absolute top-1 right-1 w-1.5 h-1.5 bg-white/30 rounded-full" />
      <div className="absolute bottom-1 left-1 w-1.5 h-1.5 bg-white/30 rounded-full" />
      <div className="absolute bottom-1 right-1 w-1.5 h-1.5 bg-white/30 rounded-full" />
      
      {children}
    </div>
  );
};
