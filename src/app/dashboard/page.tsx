'use client';

import React from 'react';
import Link from 'next/link';
import { motion } from 'framer-motion';
import { Sparkles, Gamepad2, Coins, Flame, MapPin, Plus, CheckCircle2, ArrowRight, Shield } from 'lucide-react';
import { useGame } from '@/lib/context/GameContext';
import { PixelCard } from '@/components/ui/PixelCard';
import { PixelButton } from '@/components/ui/PixelButton';
import { PixelAvatar } from '@/components/avatar/PixelAvatar';
import { ProgressBar } from '@/components/ui/ProgressBar';
import { StatBar } from '@/components/shared/StatBar';
import { CAMPUS_LOCATIONS } from '@/lib/constants/mapMilestones';

export default function DashboardPage() {
  const { profile, quests, completeQuest, streakSavedNotice, saveStreak } = useGame();

  const xpNeeded = profile.level * 100;
  const activeQuests = quests.filter(q => q.status === 'active');

  // Find current campus location based on level
  const currentLocation = CAMPUS_LOCATIONS.filter(loc => profile.level >= loc.requiredLevel).pop() || CAMPUS_LOCATIONS[0];
  const nextLocation = CAMPUS_LOCATIONS.find(loc => profile.level < loc.requiredLevel);

  return (
    <div className="space-y-6">
      {/* Streak Protection Warning Notice */}
      {streakSavedNotice && (
        <motion.div
          initial={{ opacity: 0, y: -10 }}
          animate={{ opacity: 1, y: 0 }}
          className="p-4 rounded-xl bg-orange-950/90 border-2 border-orange-500 text-orange-200 text-sm font-bold flex items-center justify-between shadow-lg"
        >
          <span className="flex items-center gap-2">
            <Flame className="w-5 h-5 text-orange-400 fill-orange-400 animate-bounce" />
            STREAK PRESERVED! 50 Coins used to maintain your daily progress.
          </span>
        </motion.div>
      )}

      {/* Main Character Header Card */}
      <PixelCard variant="glow" className="p-6">
        <div className="grid grid-cols-1 md:grid-cols-12 gap-6 items-center">
          {/* Avatar Sprite & Border */}
          <div className="md:col-span-4 flex flex-col items-center justify-center text-center border-b md:border-b-0 md:border-r border-slate-800 pb-6 md:pb-0 md:pr-6">
            <div className="relative mb-3">
              <PixelAvatar config={profile.avatar_config} size="xl" />
            </div>

            <h2 className="text-xl font-black text-white font-pixel mb-1">
              {profile.display_name}
            </h2>
            <p className="text-xs text-emerald-400 font-mono">
              Level {profile.level} Scholar • XIM University
            </p>
          </div>

          {/* XP & Stats Overview */}
          <div className="md:col-span-8 space-y-6">
            {/* Level & XP Progress Bar */}
            <div className="space-y-2">
              <div className="flex justify-between items-center text-xs font-bold font-mono">
                <span className="text-emerald-400 flex items-center gap-1.5">
                  <Sparkles className="w-4 h-4" /> LEVEL {profile.level} PROGRESS
                </span>
                <span className="text-slate-400">
                  {profile.xp} / {xpNeeded} XP
                </span>
              </div>
              <ProgressBar value={profile.xp} max={xpNeeded} color="emerald" size="lg" />
            </div>

            {/* Core Stats Grid */}
            <div className="grid grid-cols-3 gap-3">
              <StatBar stat="intellect" value={profile.intellect} />
              <StatBar stat="strength" value={profile.strength} />
              <StatBar stat="focus" value={profile.focus} />
            </div>

            {/* Economy Shortcuts */}
            <div className="grid grid-cols-2 sm:grid-cols-3 gap-3 pt-2">
              <div className="bg-amber-950/40 p-3 rounded-xl border border-amber-500/40 flex items-center gap-3">
                <div className="p-2 rounded-lg bg-amber-500/20 text-amber-400">
                  <Coins className="w-5 h-5" />
                </div>
                <div>
                  <div className="text-[10px] text-amber-300 font-bold">COINS BALANCE</div>
                  <div className="text-lg font-black font-mono text-white">{profile.coins}</div>
                </div>
              </div>

              <div className="bg-orange-950/40 p-3 rounded-xl border border-orange-500/40 flex items-center gap-3">
                <div className="p-2 rounded-lg bg-orange-500/20 text-orange-400">
                  <Flame className="w-5 h-5 fill-orange-400" />
                </div>
                <div>
                  <div className="text-[10px] text-orange-300 font-bold">DAILY STREAK</div>
                  <div className="text-lg font-black font-mono text-white">{profile.streak} Days</div>
                </div>
              </div>

              <button
                onClick={saveStreak}
                className="col-span-2 sm:col-span-1 bg-slate-900 hover:bg-slate-800 p-3 rounded-xl border border-slate-700 text-left transition-colors flex items-center justify-between"
              >
                <div>
                  <div className="text-[10px] text-slate-400 font-bold">STREAK SAVE</div>
                  <div className="text-xs font-black text-amber-400">Spend 50 Coins</div>
                </div>
                <Shield className="w-4 h-4 text-amber-400" />
              </button>
            </div>
          </div>
        </div>
      </PixelCard>

      {/* Two Column Layout: Quests & Campus Map */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
        {/* Active Quests Shortcut */}
        <div className="lg:col-span-7 space-y-4">
          <div className="flex justify-between items-center">
            <h3 className="text-lg font-black text-white font-sans flex items-center gap-2">
              <Gamepad2 className="w-5 h-5 text-emerald-400" /> Active Daily Quests ({activeQuests.length})
            </h3>
            <Link href="/quests">
              <PixelButton variant="ghost" size="sm">
                View All Quests
              </PixelButton>
            </Link>
          </div>

          {activeQuests.length === 0 ? (
            <PixelCard variant="dark" className="text-center py-8 space-y-3">
              <div className="w-12 h-12 rounded-full bg-emerald-500/20 text-emerald-400 mx-auto flex items-center justify-center">
                <CheckCircle2 className="w-6 h-6" />
              </div>
              <h4 className="text-base font-bold text-white">All Quests Completed!</h4>
              <p className="text-xs text-slate-400">Great job! Create a new quest to earn more XP & coins.</p>
              <Link href="/quests">
                <PixelButton variant="primary" size="sm">
                  <Plus className="w-4 h-4" /> CREATE QUEST
                </PixelButton>
              </Link>
            </PixelCard>
          ) : (
            <div className="space-y-3">
              {activeQuests.slice(0, 3).map(quest => (
                <PixelCard key={quest.id} variant="default" className="p-4 flex items-center justify-between">
                  <div className="space-y-1 pr-4">
                    <span className="text-[10px] font-bold uppercase tracking-wider px-2 py-0.5 rounded bg-emerald-500/20 text-emerald-400">
                      +{quest.xp_reward} XP • +{quest.coin_reward} Coins
                    </span>
                    <h4 className="text-sm font-bold text-white">{quest.title}</h4>
                    {quest.description && (
                      <p className="text-xs text-slate-400 line-clamp-1">{quest.description}</p>
                    )}
                  </div>
                  <PixelButton
                    variant="primary"
                    size="sm"
                    onClick={() => completeQuest(quest.id)}
                  >
                    CLAIM
                  </PixelButton>
                </PixelCard>
              ))}
            </div>
          )}
        </div>

        {/* Campus Map Shortcut Widget */}
        <div className="lg:col-span-5 space-y-4">
          <div className="flex justify-between items-center">
            <h3 className="text-lg font-black text-white font-sans flex items-center gap-2">
              <MapPin className="w-5 h-5 text-purple-400" /> XIM Landmark
            </h3>
            <Link href="/map">
              <PixelButton variant="ghost" size="sm">
                Open Map
              </PixelButton>
            </Link>
          </div>

          <PixelCard variant="accent" className="p-5 space-y-4 relative overflow-hidden">
            <div className="flex items-center gap-3">
              <div className="p-3 rounded-xl bg-purple-500/20 text-purple-400 border border-purple-500/30 font-pixel font-bold">
                L{currentLocation.requiredLevel}
              </div>
              <div>
                <h4 className="text-base font-bold text-white">{currentLocation.name}</h4>
                <p className="text-xs text-purple-300 font-mono">Current Position • Unlocked</p>
              </div>
            </div>

            <p className="text-xs text-slate-300 leading-relaxed bg-slate-950/60 p-3 rounded-xl border border-slate-800">
              &quot;{currentLocation.description}&quot;
            </p>

            {nextLocation && (
              <div className="pt-2 border-t border-slate-800/80 flex items-center justify-between text-xs font-mono">
                <span className="text-slate-400">Next Unlock: {nextLocation.name}</span>
                <span className="text-amber-400 font-bold">Req. LVL {nextLocation.requiredLevel}</span>
              </div>
            )}
          </PixelCard>
        </div>
      </div>
    </div>
  );
}
