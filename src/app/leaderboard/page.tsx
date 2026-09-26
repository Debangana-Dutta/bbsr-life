'use client';

import React from 'react';
import { Trophy, Coins, Flame, Medal, Award, Crown, UserCheck } from 'lucide-react';
import { useGame } from '@/lib/context/GameContext';
import { PixelCard } from '@/components/ui/PixelCard';
import { PixelAvatar } from '@/components/avatar/PixelAvatar';

export default function LeaderboardPage() {
  const { profile, getLeaderboard } = useGame();
  const leaders = getLeaderboard();

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex flex-wrap items-center justify-between gap-4">
        <div>
          <h2 className="text-2xl font-black text-white font-sans flex items-center gap-2">
            <Trophy className="w-6 h-6 text-amber-400" /> XIM University Campus Leaderboard
          </h2>
          <p className="text-xs text-slate-400 font-mono">
            Live dynamic ranking of XIM University Bhubaneswar scholars by coin fortune & streak consistency
          </p>
        </div>

        <div className="px-4 py-2 rounded-xl bg-amber-950/60 border border-amber-500/40 text-amber-300 font-mono text-xs font-bold flex items-center gap-2">
          <Coins className="w-4 h-4 text-amber-400" /> Your Coins: {profile.coins}
        </div>
      </div>

      {/* Top 3 Podium Cards */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-6">
        {leaders.slice(0, 3).map((leader, index) => {
          const isUser = leader.id === profile.id || leader.display_name === profile.display_name;
          const medals = [
            { title: '1st Place', color: 'from-amber-400 to-yellow-600', badgeColor: 'bg-amber-400 text-slate-950' },
            { title: '2nd Place', color: 'from-slate-300 to-slate-500', badgeColor: 'bg-slate-300 text-slate-950' },
            { title: '3rd Place', color: 'from-amber-700 to-amber-900', badgeColor: 'bg-amber-700 text-white' }
          ];

          return (
            <PixelCard
              key={leader.id}
              variant={index === 0 ? 'gold' : isUser ? 'glow' : 'default'}
              className="p-5 text-center relative overflow-hidden flex flex-col justify-between"
            >
              <div>
                <div className={`inline-block px-3 py-1 rounded-full text-xs font-pixel font-black ${medals[index].badgeColor} mb-3 shadow-md`}>
                  RANK #{index + 1}
                </div>

                <div className="relative my-2">
                  <PixelAvatar config={leader.avatar_config} size="lg" className="mx-auto" />
                </div>

                <h3 className="text-base font-black text-white font-pixel line-clamp-1">{leader.display_name}</h3>
                <p className="text-xs text-emerald-400 font-mono mt-0.5">Level {leader.level} Scholar</p>
              </div>

              <div className="pt-3 mt-3 border-t border-slate-800/80 flex items-center justify-around text-xs font-mono font-bold">
                <span className="flex items-center gap-1 text-amber-400">
                  <Coins className="w-3.5 h-3.5" /> {leader.coins} Coins
                </span>
                <span className="flex items-center gap-1 text-orange-400">
                  <Flame className="w-3.5 h-3.5 fill-orange-400" /> {leader.streak} d
                </span>
              </div>
            </PixelCard>
          );
        })}
      </div>

      {/* Full Dynamic Leaderboard Table */}
      <PixelCard variant="dark" className="p-4 sm:p-6">
        <div className="space-y-3">
          {leaders.map((leader, index) => {
            const isUser = leader.id === profile.id || leader.display_name === profile.display_name;
            return (
              <div
                key={leader.id}
                className={`p-3 sm:p-4 rounded-xl border flex items-center justify-between transition-all ${
                  isUser
                    ? 'bg-emerald-950/60 border-emerald-500/80 shadow-[0_0_15px_rgba(16,185,129,0.3)]'
                    : 'bg-slate-900/60 border-slate-800 hover:border-slate-700'
                }`}
              >
                <div className="flex items-center gap-3 sm:gap-4">
                  <span className={`w-8 font-pixel text-center font-bold text-sm ${index < 3 ? 'text-amber-400' : 'text-slate-500'}`}>
                    #{index + 1}
                  </span>

                  <PixelAvatar config={leader.avatar_config} size="sm" showBorder={false} />

                  <div>
                    <h4 className="text-sm font-bold text-white flex items-center gap-2">
                      {leader.display_name}
                      {isUser && (
                        <span className="px-2 py-0.5 rounded bg-emerald-500/20 text-emerald-400 text-[10px] font-mono uppercase">
                          YOU
                        </span>
                      )}
                    </h4>
                    <p className="text-xs text-slate-400 font-mono">Level {leader.level} Scholar</p>
                  </div>
                </div>

                <div className="flex items-center gap-4 text-xs font-mono font-bold">
                  <span className="flex items-center gap-1 text-amber-400">
                    <Coins className="w-4 h-4" /> {leader.coins} Points
                  </span>
                  <span className="hidden sm:flex items-center gap-1 text-orange-400">
                    <Flame className="w-4 h-4 fill-orange-400" /> {leader.streak} d
                  </span>
                </div>
              </div>
            );
          })}
        </div>
      </PixelCard>
    </div>
  );
}
