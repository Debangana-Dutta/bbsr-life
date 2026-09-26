'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { useGame } from '@/lib/context/GameContext';
import { PixelAvatar } from '../avatar/PixelAvatar';
import { Coins, Flame, Volume2, VolumeX, ArrowLeft, LogOut, User, ChevronDown } from 'lucide-react';

export const TopHeader: React.FC = () => {
  const router = useRouter();
  const { profile, isMuted, toggleMute, saveStreak, logout } = useGame();
  const [showProfileMenu, setShowProfileMenu] = useState(false);

  const handleLogout = async () => {
    setShowProfileMenu(false);
    await logout();
    router.push('/auth');
  };

  return (
    <header className="sticky top-0 z-40 bg-slate-950/90 backdrop-blur-lg border-b border-slate-800 px-4 py-3">
      <div className="max-w-7xl mx-auto flex items-center justify-between gap-4">
        {/* Left Section: Back Button + Brand Logo */}
        <div className="flex items-center gap-3">
          {/* Return to Previous Page Option */}
          <button
            onClick={() => router.back()}
            title="Return to previous page"
            className="flex items-center gap-1 px-2.5 py-1.5 rounded-lg bg-slate-900 border border-slate-700 text-xs font-bold text-slate-300 hover:text-white hover:border-emerald-500 transition-colors shadow-sm cursor-pointer"
          >
            <ArrowLeft className="w-4 h-4 text-emerald-400" />
            <span className="hidden sm:inline">Back</span>
          </button>

          {/* Brand Logo */}
          <Link href="/dashboard" className="flex items-center gap-2 group">
            <div className="w-8 h-8 rounded-lg bg-gradient-to-tr from-emerald-500 to-teal-400 flex items-center justify-center text-slate-950 font-black text-xs font-pixel shadow-md group-hover:scale-105 transition-transform">
              X
            </div>
            <div>
              <span className="font-pixel text-sm font-black tracking-wider bg-gradient-to-r from-emerald-400 via-teal-300 to-cyan-400 bg-clip-text text-transparent">
                BBSR LIFE
              </span>
              <span className="hidden sm:block text-[10px] text-slate-400 font-mono">
                XIM University RPG
              </span>
            </div>
          </Link>
        </div>

        {/* Currency, Streak Stats & Interactive Profile Menu */}
        <div className="flex items-center gap-3">
          {/* Level Pill */}
          <div className="px-3 py-1 rounded-full bg-slate-900 border border-emerald-500/50 flex items-center gap-1.5 shadow-sm">
            <span className="text-[10px] text-slate-400 font-bold uppercase">LVL</span>
            <span className="text-xs font-black font-mono text-emerald-400">{profile.level}</span>
          </div>

          {/* Coin Balance */}
          <div className="px-3 py-1 rounded-full bg-amber-950/40 border border-amber-500/50 flex items-center gap-1.5 shadow-sm">
            <Coins className="w-4 h-4 text-amber-400 animate-pulse" />
            <span className="text-xs font-black font-mono text-amber-300">{profile.coins}</span>
          </div>

          {/* Streak Flame */}
          <button
            onClick={() => saveStreak()}
            title="Streak Protection - Spend 50 coins if missed"
            className="px-3 py-1 rounded-full bg-orange-950/40 border border-orange-500/50 flex items-center gap-1.5 shadow-sm hover:bg-orange-900/60 transition-colors"
          >
            <Flame className="w-4 h-4 text-orange-400 fill-orange-500" />
            <span className="text-xs font-black font-mono text-orange-300">{profile.streak} d</span>
          </button>

          {/* Audio Mute Toggle */}
          <button
            onClick={toggleMute}
            className="p-2 rounded-lg bg-slate-900 border border-slate-800 text-slate-400 hover:text-white transition-colors"
            title={isMuted ? 'Unmute Sound FX' : 'Mute Sound FX'}
          >
            {isMuted ? <VolumeX className="w-4 h-4 text-rose-400" /> : <Volume2 className="w-4 h-4 text-emerald-400" />}
          </button>

          {/* Profile Dropdown Trigger */}
          <div className="relative">
            <button
              onClick={() => setShowProfileMenu(prev => !prev)}
              className="flex items-center gap-2 p-1 rounded-xl bg-slate-900 border border-slate-800 hover:border-emerald-500/60 transition-all cursor-pointer"
            >
              <PixelAvatar config={profile.avatar_config} size="sm" showBorder={false} />
              <span className="hidden md:block text-xs font-bold text-white max-w-[100px] truncate font-mono">
                {profile.display_name}
              </span>
              <ChevronDown className="w-3.5 h-3.5 text-slate-400" />
            </button>

            {/* Profile Popover Menu with Log Out */}
            {showProfileMenu && (
              <div className="absolute right-0 mt-2 w-56 rounded-2xl bg-slate-900 border-2 border-slate-700 shadow-2xl p-3 space-y-2 z-50 animate-in fade-in slide-in-from-top-2">
                <div className="p-2.5 rounded-xl bg-slate-950 border border-slate-800 text-left">
                  <div className="text-xs font-black text-white font-pixel truncate">
                    {profile.display_name}
                  </div>
                  <div className="text-[11px] text-emerald-400 font-mono">
                    Level {profile.level} Scholar
                  </div>
                </div>

                <Link
                  href="/profile"
                  onClick={() => setShowProfileMenu(false)}
                  className="flex items-center gap-2 px-3 py-2 rounded-xl text-xs font-bold text-slate-300 hover:bg-slate-800 hover:text-white transition-colors"
                >
                  <User className="w-4 h-4 text-emerald-400" /> View Profile Passport
                </Link>

                <button
                  onClick={handleLogout}
                  className="w-full flex items-center gap-2 px-3 py-2 rounded-xl text-xs font-bold text-rose-400 hover:bg-rose-950/80 hover:text-rose-300 transition-colors border border-rose-900/40 cursor-pointer"
                >
                  <LogOut className="w-4 h-4" /> LOG OUT
                </button>
              </div>
            )}
          </div>
        </div>
      </div>
    </header>
  );
};
