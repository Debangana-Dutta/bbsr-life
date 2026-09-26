'use client';

import React from 'react';
import { AvatarConfig } from '@/lib/types/game';

interface PixelAvatarProps {
  config: AvatarConfig;
  size?: 'sm' | 'md' | 'lg' | 'xl';
  className?: string;
  showBorder?: boolean;
}

export const PixelAvatar: React.FC<PixelAvatarProps> = ({
  config,
  size = 'md',
  className = '',
  showBorder = true
}) => {
  const dimensionMap = {
    sm: 'w-10 h-10',
    md: 'w-20 h-20',
    lg: 'w-32 h-32',
    xl: 'w-48 h-48'
  };

  const borderStyle = showBorder ? getBorderGlowClass(config.border) : '';
  const skinTone = config.skinColor || '#f5c096';
  const hairColor = config.hairColor || '#2c1b18';
  const outfit = config.outfit || 'default_hoodie';

  // Body width calculation based on weightCategory (tasteful game-like sprite silhouette scaling)
  const bodyWidth = config.weightCategory === 'athletic' ? 70 : config.weightCategory === 'stocky' ? 78 : 64;

  return (
    <div
      className={`relative flex items-center justify-center rounded-xl transition-all duration-300 ${dimensionMap[size]} ${borderStyle} ${className}`}
    >
      {/* Sprite Container */}
      <svg
        viewBox="0 0 100 100"
        className="w-full h-full drop-shadow-[0_4px_8px_rgba(0,0,0,0.5)]"
        shapeRendering="crispEdges"
      >
        {/* Background Aura */}
        <circle cx="50" cy="50" r="46" fill="rgba(15, 23, 42, 0.6)" />
        
        {/* Character Base Body / Shoulders */}
        {/* Torso / Outfit */}
        <rect
          x={50 - bodyWidth / 2}
          y="56"
          width={bodyWidth}
          height="38"
          rx="6"
          fill={getOutfitColor(outfit)}
        />
        {/* Outfit Trim / Accents */}
        <path
          d={getOutfitDetailPath(outfit, bodyWidth)}
          fill={getOutfitAccentColor(outfit)}
        />

        {/* Neck */}
        <rect x="42" y="46" width="16" height="12" fill={skinTone} />

        {/* Head */}
        <rect x="30" y="18" width="40" height="32" rx="4" fill={skinTone} />
        <rect x="28" y="24" width="44" height="20" rx="3" fill={skinTone} />

        {/* Eyes (Pixelated style) */}
        <rect x="36" y="28" width="6" height="6" fill="#000" />
        <rect x="58" y="28" width="6" height="6" fill="#000" />
        <rect x="38" y="29" width="2" height="2" fill="#fff" />
        <rect x="60" y="29" width="2" height="2" fill="#fff" />

        {/* Cheeks */}
        <rect x="34" y="36" width="6" height="3" fill="rgba(244, 63, 94, 0.4)" />
        <rect x="60" y="36" width="6" height="3" fill="rgba(244, 63, 94, 0.4)" />

        {/* Smile / Mouth */}
        <rect x="45" y="38" width="10" height="3" rx="1" fill="#7f1d1d" />

        {/* Hair Styles */}
        <path d={getHairPath(config.hairStyle)} fill={hairColor} />

        {/* Outfit Emblem / Accessories */}
        {outfit === 'code_wizard_cloak' && (
          <circle cx="50" cy="72" r="5" fill="#a855f7" className="animate-pulse" />
        )}
        {outfit === 'gym_bro_tank' && (
          <path d="M 40 68 L 60 68 L 50 78 Z" fill="#b91c1c" />
        )}
        {outfit === 'campus_tux' && (
          <path d="M 45 60 L 55 60 L 50 68 Z" fill="#eab308" />
        )}
      </svg>
    </div>
  );
};

function getOutfitColor(outfit: string): string {
  switch (outfit) {
    case 'gym_bro_tank':
      return '#dc2626'; // Crimson
    case 'code_wizard_cloak':
      return '#6b21a8'; // Arcane Purple
    case 'cyber_armor':
      return '#0891b2'; // Neon Cyan
    case 'campus_tux':
      return '#1e1b4b'; // Deep Onyx
    default:
      return '#0d9488'; // Campus Teal
  }
}

function getOutfitAccentColor(outfit: string): string {
  switch (outfit) {
    case 'gym_bro_tank':
      return '#fef08a';
    case 'code_wizard_cloak':
      return '#c084fc';
    case 'cyber_armor':
      return '#67e8f9';
    case 'campus_tux':
      return '#fde047';
    default:
      return '#99f6e4';
  }
}

function getOutfitDetailPath(outfit: string, bw: number): string {
  const left = 50 - bw / 2;
  switch (outfit) {
    case 'gym_bro_tank':
      return `M ${left + 10} 56 L 50 72 L ${50 + bw / 2 - 10} 56 Z`;
    case 'code_wizard_cloak':
      return `M 46 56 L 54 56 L 54 94 L 46 94 Z`;
    case 'cyber_armor':
      return `M ${left + 5} 66 L ${50 + bw / 2 - 5} 66 L 50 86 Z`;
    default:
      return `M 47 56 L 53 56 L 53 90 L 47 90 Z`;
  }
}

function getHairPath(hairStyle: string): string {
  switch (hairStyle) {
    case 'spiky':
      return 'M 26 22 L 32 10 L 38 20 L 46 8 L 54 20 L 62 10 L 68 20 L 74 24 L 72 32 L 28 32 Z';
    case 'curly':
      return 'M 26 24 C 26 12 36 12 40 14 C 44 10 56 10 60 14 C 64 12 74 12 74 24 L 74 32 L 26 32 Z';
    case 'long':
      return 'M 26 18 L 74 18 L 76 52 L 68 52 L 68 30 L 32 30 L 32 52 L 24 52 Z';
    case 'cap':
      return 'M 22 20 L 78 20 L 84 26 L 16 26 Z M 28 16 L 72 16 L 72 20 L 28 20 Z';
    default: // short
      return 'M 28 18 L 72 18 L 74 28 L 26 28 Z';
  }
}

function getBorderGlowClass(borderId: string): string {
  switch (borderId) {
    case 'flame_border':
      return 'ring-4 ring-orange-500 shadow-[0_0_20px_rgba(249,115,22,0.8)] animate-pulse';
    case 'cyber_neon':
      return 'ring-4 ring-cyan-400 shadow-[0_0_25px_rgba(34,211,238,0.9)] animate-pulse';
    case 'gold_legend':
      return 'ring-4 ring-amber-400 shadow-[0_0_30px_rgba(251,191,36,1)]';
    default:
      return 'ring-2 ring-emerald-500/60 shadow-[0_0_12px_rgba(16,185,129,0.3)]';
  }
}
