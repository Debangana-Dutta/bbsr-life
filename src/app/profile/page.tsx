'use client';

import React from 'react';
import Link from 'next/link';
import { User, Award, Flame, Coins, Sparkles, Shield, RotateCcw, Calendar } from 'lucide-react';
import { useGame } from '@/lib/context/GameContext';
import { PixelCard } from '@/components/ui/PixelCard';
import { PixelButton } from '@/components/ui/PixelButton';
import { PixelAvatar } from '@/components/avatar/PixelAvatar';
import { StatBar } from '@/components/shared/StatBar';
import { BADGES_CATALOG } from '@/lib/constants/cosmetics';

export default function ProfilePage() {
  const { profile, badges, resetDemoData } = useGame();

  const userBadges = BADGES_CATALOG.filter(b => badges.includes(b.id));

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex flex-wrap items-center justify-between gap-4">
        <div>
          <h2 className="text-2xl font-black text-white font-sans flex items-center gap-2">
            <User className="w-6 h-6 text-emerald-400" /> Player Passport & Character Sheet
          </h2>
          <p className="text-xs text-slate-400 font-mono">
            View your permanent achievements, level history, and badge display case
          </p>
        </div>

        <PixelButton variant="ghost" size="sm" onClick={resetDemoData}>
          <RotateCcw className="w-4 h-4" /> RESET DEMO DATA
        </PixelButton>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
        {/* Left Column: Avatar & Core Passport */}
        <div className="lg:col-span-5 space-y-6">
          <PixelCard variant="glow" className="p-6 text-center space-y-4">
            <div className="relative mb-2">
              <PixelAvatar config={profile.avatar_config} size="xl" className="mx-auto" />
            </div>

            <div>
              <h3 className="text-2xl font-black text-white font-pixel">{profile.display_name}</h3>
              <p className="text-xs text-emerald-400 font-mono mt-1">Level {profile.level} Scholar • XIM University</p>
            </div>

            <div className="grid grid-cols-2 gap-3 pt-2 text-xs font-mono">
              <div className="bg-slate-950 p-3 rounded-xl border border-slate-800">
                <span className="text-slate-400 block mb-1">COINS BALANCE</span>
                <span className="text-lg font-black text-amber-400">{profile.coins}</span>
              </div>
              <div className="bg-slate-950 p-3 rounded-xl border border-slate-800">
                <span className="text-slate-400 block mb-1">CURRENT STREAK</span>
                <span className="text-lg font-black text-orange-400">{profile.streak} Days</span>
              </div>
            </div>

            <div className="pt-2 border-t border-slate-800 text-left text-xs font-mono space-y-2 text-slate-400">
              <div className="flex justify-between">
                <span>Longest Streak:</span>
                <span className="text-white font-bold">{profile.longest_streak} Days</span>
              </div>
              <div className="flex justify-between">
                <span>Account Created:</span>
                <span className="text-white font-bold">{new Date(profile.created_at).toLocaleDateString()}</span>
              </div>
            </div>
          </PixelCard>
        </div>

        {/* Right Column: Stats & Badge Display Case */}
        <div className="lg:col-span-7 space-y-6">
          {/* Stats Breakdown */}
          <PixelCard variant="default" className="p-6 space-y-4">
            <h3 className="text-sm font-bold text-white font-mono flex items-center gap-2">
              <Sparkles className="w-4 h-4 text-purple-400" /> CHARACTER STAT ATTRIBUTES
            </h3>
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
              <StatBar stat="intellect" value={profile.intellect} />
              <StatBar stat="strength" value={profile.strength} />
              <StatBar stat="focus" value={profile.focus} />
            </div>
          </PixelCard>

          {/* Badge Display Case */}
          <PixelCard variant="gold" className="p-6 space-y-4">
            <div className="flex items-center justify-between">
              <h3 className="text-sm font-bold text-white font-mono flex items-center gap-2">
                <Award className="w-4 h-4 text-amber-400" /> BADGE TROPHY CASE ({userBadges.length})
              </h3>
              <Link href="/shop">
                <span className="text-xs text-amber-400 hover:underline font-mono">Buy Badges in Shop</span>
              </Link>
            </div>

            {userBadges.length === 0 ? (
              <div className="text-center py-6 bg-slate-950/80 rounded-xl border border-slate-800 text-xs text-slate-400">
                No badges unlocked yet! Visit the shop to purchase status badges.
              </div>
            ) : (
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                {userBadges.map(badge => (
                  <div
                    key={badge.id}
                    className="p-3 rounded-xl bg-amber-950/40 border border-amber-500/40 flex items-center gap-3"
                  >
                    <div className="p-2 rounded-lg bg-amber-500/20 text-amber-400">
                      <Award className="w-5 h-5" />
                    </div>
                    <div>
                      <h4 className="text-xs font-bold text-white">{badge.name}</h4>
                      <p className="text-[10px] text-amber-200 line-clamp-1">{badge.description}</p>
                    </div>
                  </div>
                ))}
              </div>
            )}
          </PixelCard>
        </div>
      </div>
    </div>
  );
}
