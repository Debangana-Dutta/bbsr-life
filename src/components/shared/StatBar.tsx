'use client';

import React from 'react';
import { Brain, Dumbbell, Target } from 'lucide-react';

interface StatBarProps {
  stat: 'intellect' | 'strength' | 'focus';
  value: number;
  max?: number;
}

export const StatBar: React.FC<StatBarProps> = ({ stat, value, max = 50 }) => {
  const getStatInfo = () => {
    switch (stat) {
      case 'intellect':
        return {
          title: 'Intellect',
          icon: Brain,
          color: 'text-purple-400',
          bgGradient: 'from-purple-600 to-indigo-500',
          badgeBg: 'bg-purple-950/80 border-purple-600/50'
        };
      case 'strength':
        return {
          title: 'Strength',
          icon: Dumbbell,
          color: 'text-rose-400',
          bgGradient: 'from-rose-600 to-red-500',
          badgeBg: 'bg-rose-950/80 border-rose-600/50'
        };
      default: // focus
        return {
          title: 'Focus',
          icon: Target,
          color: 'text-cyan-400',
          bgGradient: 'from-cyan-600 to-teal-500',
          badgeBg: 'bg-cyan-950/80 border-cyan-600/50'
        };
    }
  };

  const info = getStatInfo();
  const IconComponent = info.icon;
  const percentage = Math.min(100, Math.round((value / max) * 100));

  return (
    <div className={`p-3 rounded-xl border flex flex-col justify-between ${info.badgeBg} backdrop-blur-md`}>
      <div className="flex items-center justify-between mb-2">
        <div className="flex items-center gap-2">
          <div className={`p-1.5 rounded-lg bg-slate-900 ${info.color}`}>
            <IconComponent className="w-4 h-4" />
          </div>
          <span className="text-xs font-bold text-slate-200 tracking-wide uppercase">{info.title}</span>
        </div>
        <span className="text-sm font-black font-mono text-white">{value}</span>
      </div>

      <div className="w-full bg-slate-950/80 h-2 rounded-full overflow-hidden border border-slate-800">
        <div
          className={`h-full rounded-full transition-all duration-500 bg-gradient-to-r ${info.bgGradient}`}
          style={{ width: `${percentage}%` }}
        />
      </div>
    </div>
  );
};
