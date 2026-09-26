'use client';

import React from 'react';
import { soundFx } from '@/lib/utils/sound';

interface PixelButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  children: React.ReactNode;
  variant?: 'primary' | 'secondary' | 'accent' | 'danger' | 'gold' | 'ghost';
  size?: 'sm' | 'md' | 'lg';
  fullWidth?: boolean;
}

export const PixelButton: React.FC<PixelButtonProps> = ({
  children,
  variant = 'primary',
  size = 'md',
  fullWidth = false,
  onClick,
  className = '',
  disabled,
  ...props
}) => {
  const handleClick = (e: React.MouseEvent<HTMLButtonElement>) => {
    if (!disabled) {
      soundFx.playButtonClick();
      if (onClick) onClick(e);
    }
  };

  const getVariantStyles = () => {
    switch (variant) {
      case 'secondary':
        return 'bg-purple-600 hover:bg-purple-500 text-white border-b-4 border-purple-800 active:border-b-0 active:translate-y-1 shadow-[0_4px_0_#581c87]';
      case 'accent':
        return 'bg-cyan-500 hover:bg-cyan-400 text-slate-950 font-bold border-b-4 border-cyan-700 active:border-b-0 active:translate-y-1 shadow-[0_4px_0_#0e7490]';
      case 'gold':
        return 'bg-amber-400 hover:bg-amber-300 text-amber-950 font-extrabold border-b-4 border-amber-600 active:border-b-0 active:translate-y-1 shadow-[0_4px_0_#b45309]';
      case 'danger':
        return 'bg-rose-600 hover:bg-rose-500 text-white border-b-4 border-rose-800 active:border-b-0 active:translate-y-1 shadow-[0_4px_0_#9f1239]';
      case 'ghost':
        return 'bg-slate-800/60 hover:bg-slate-700/80 text-slate-200 border border-slate-600 active:translate-y-0.5';
      default: // primary
        return 'bg-emerald-500 hover:bg-emerald-400 text-slate-950 font-bold border-b-4 border-emerald-700 active:border-b-0 active:translate-y-1 shadow-[0_4px_0_#047857]';
    }
  };

  const getSizeStyles = () => {
    switch (size) {
      case 'sm':
        return 'px-3 py-1.5 text-xs font-semibold';
      case 'lg':
        return 'px-6 py-3.5 text-base font-extrabold tracking-wide';
      default:
        return 'px-4 py-2.5 text-sm font-bold';
    }
  };

  return (
    <button
      onClick={handleClick}
      disabled={disabled}
      className={`inline-flex items-center justify-center gap-2 rounded-lg font-pixel tracking-wide transition-all uppercase ${getVariantStyles()} ${getSizeStyles()} ${
        fullWidth ? 'w-full' : ''
      } ${disabled ? 'opacity-50 cursor-not-allowed border-b-0 translate-y-0 shadow-none' : 'cursor-pointer'} ${className}`}
      {...props}
    >
      {children}
    </button>
  );
};
