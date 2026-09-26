'use client';

import React from 'react';

interface ProgressBarProps {
  value: number;
  max: number;
  label?: string;
  subLabel?: string;
  color?: 'emerald' | 'amber' | 'purple' | 'cyan' | 'rose';
  showPercentage?: boolean;
  size?: 'sm' | 'md' | 'lg';
  className?: string;
}

export const ProgressBar: React.FC<ProgressBarProps> = ({
  value,
  max,
  label,
  subLabel,
  color = 'emerald',
  showPercentage = false,
  size = 'md',
  className = ''
}) => {
  const percentage = Math.min(100, Math.max(0, Math.round((value / max) * 100)));

  const getColorClasses = () => {
    switch (color) {
      case 'amber':
        return 'bg-gradient-to-r from-amber-500 to-yellow-300 shadow-[0_0_10px_rgba(245,158,11,0.5)]';
      case 'purple':
        return 'bg-gradient-to-r from-purple-600 to-fuchsia-400 shadow-[0_0_10px_rgba(168,85,247,0.5)]';
      case 'cyan':
        return 'bg-gradient-to-r from-cyan-500 to-blue-400 shadow-[0_0_10px_rgba(6,182,212,0.5)]';
      case 'rose':
        return 'bg-gradient-to-r from-rose-500 to-red-400 shadow-[0_0_10px_rgba(244,63,94,0.5)]';
      default: // emerald
        return 'bg-gradient-to-r from-emerald-500 to-teal-300 shadow-[0_0_10px_rgba(16,185,129,0.5)]';
    }
  };

  const getHeight = () => {
    switch (size) {
      case 'sm':
        return 'h-2.5';
      case 'lg':
        return 'h-5';
      default:
        return 'h-3.5';
    }
  };

  return (
    <div className={`w-full ${className}`}>
      {(label || subLabel || showPercentage) && (
        <div className="flex justify-between items-center mb-1 text-xs font-semibold">
          <span className="text-slate-300 flex items-center gap-1.5">{label}</span>
          <span className="text-slate-400 font-mono">
            {subLabel || `${value} / ${max} XP`}
            {showPercentage && ` (${percentage}%)`}
          </span>
        </div>
      )}
      
      <div className={`w-full bg-slate-950/80 rounded-full p-0.5 border border-slate-700/80 overflow-hidden relative ${getHeight()}`}>
        <div
          className={`h-full rounded-full transition-all duration-500 ease-out relative ${getColorClasses()}`}
          style={{ width: `${percentage}%` }}
        >
          {/* Animated Sheen / Highlight effect */}
          <div className="absolute inset-0 bg-white/20 rounded-full animate-pulse" />
        </div>
      </div>
    </div>
  );
};
