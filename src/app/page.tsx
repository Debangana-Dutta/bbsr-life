'use client';

import React from 'react';
import Link from 'next/link';
import { motion } from 'framer-motion';
import { Sparkles, Gamepad2, Coins, MapPin, Trophy, ShieldCheck, Flame, ArrowRight } from 'lucide-react';
import { PixelButton } from '@/components/ui/PixelButton';
import { PixelCard } from '@/components/ui/PixelCard';
import { PixelAvatar } from '@/components/avatar/PixelAvatar';

export default function LandingPage() {
  const sampleAvatar = {
    skinColor: '#f5c096',
    hairStyle: 'spiky' as const,
    hairColor: '#3b82f6',
    outfit: 'code_wizard_cloak',
    accessory: 'none',
    border: 'cyber_neon',
    weightCategory: 'athletic' as const
  };

  return (
    <div className="min-h-screen flex flex-col justify-between max-w-6xl mx-auto py-8 px-4">
      {/* Header Bar */}
      <header className="flex items-center justify-between py-4 border-b border-slate-800/80 mb-12">
        <div className="flex items-center gap-3">
          <div className="w-10 h-10 rounded-xl bg-gradient-to-tr from-emerald-500 to-teal-400 flex items-center justify-center text-slate-950 font-black text-sm font-pixel shadow-[0_0_15px_rgba(16,185,129,0.5)]">
            X
          </div>
          <div>
            <h1 className="font-pixel text-lg font-black bg-gradient-to-r from-emerald-400 via-teal-300 to-cyan-400 bg-clip-text text-transparent">
              BBSR LIFE
            </h1>
            <p className="text-xs text-slate-400 font-mono">XIM University Bhubaneswar RPG</p>
          </div>
        </div>

        <div className="flex items-center gap-3">
          <Link href="/auth">
            <PixelButton variant="ghost" size="sm">
              Log In
            </PixelButton>
          </Link>
          <Link href="/onboarding">
            <PixelButton variant="primary" size="sm">
              Play Game
            </PixelButton>
          </Link>
        </div>
      </header>

      {/* Hero Section */}
      <section className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center mb-16">
        <motion.div
          initial={{ opacity: 0, x: -30 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.6 }}
          className="lg:col-span-7 space-y-6 text-left"
        >
          <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-emerald-500/10 border border-emerald-500/30 text-emerald-400 text-xs font-bold uppercase tracking-wider">
            <Sparkles className="w-4 h-4 animate-spin" /> XIM University Productivity RPG
          </div>

          <h2 className="text-4xl sm:text-5xl lg:text-6xl font-black text-white leading-tight font-sans tracking-tight">
            Turn Real College Life Into A <span className="bg-gradient-to-r from-emerald-400 via-teal-300 to-cyan-400 bg-clip-text text-transparent">Pixel-Art Game</span>
          </h2>

          <p className="text-slate-300 text-base sm:text-lg leading-relaxed max-w-xl">
            Stop using boring to-do lists. Complete real-life quests at XIM University Bhubaneswar, earn XP & Coins, grow character stats, unlock campus milestones, and climb the student leaderboard!
          </p>

          {/* Action CTAs */}
          <div className="flex flex-wrap items-center gap-4 pt-2">
            <Link href="/onboarding">
              <PixelButton variant="gold" size="lg" className="shadow-[0_0_25px_rgba(251,191,36,0.4)]">
                CREATE CHARACTER <ArrowRight className="w-5 h-5 ml-1" />
              </PixelButton>
            </Link>
            <Link href="/dashboard">
              <PixelButton variant="ghost" size="lg">
                INSTANT DEMO
              </PixelButton>
            </Link>
          </div>

          {/* Quick Metrics */}
          <div className="grid grid-cols-3 gap-4 pt-6 border-t border-slate-800">
            <div>
              <div className="text-2xl font-black font-pixel text-emerald-400">120 Points</div>
              <p className="text-xs text-slate-400">Signup Starter Bonus</p>
            </div>
            <div>
              <div className="text-2xl font-black font-pixel text-amber-400">50 Coins</div>
              <p className="text-xs text-slate-400">Streak Protection</p>
            </div>
            <div>
              <div className="text-2xl font-black font-pixel text-cyan-400">6 Areas</div>
              <p className="text-xs text-slate-400">XIM Campus Map</p>
            </div>
          </div>
        </motion.div>

        {/* Hero Character Showcase Card */}
        <motion.div
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.6, delay: 0.2 }}
          className="lg:col-span-5"
        >
          <PixelCard variant="glow" className="p-6 text-center relative overflow-hidden">
            <div className="absolute -top-12 -right-12 w-40 h-40 bg-teal-500/20 rounded-full blur-3xl" />
            
            <div className="relative mb-6">
              <PixelAvatar config={sampleAvatar} size="xl" className="mx-auto" />
            </div>

            <h3 className="text-xl font-bold text-white font-pixel mb-1">
              XIM Scholar
            </h3>
            <p className="text-xs text-emerald-400 font-mono mb-4">Level 7 Scholar • XIM University</p>

            {/* Reward Loop Badge */}
            <div className="bg-slate-950/80 p-3 rounded-xl border border-slate-800 flex items-center justify-around text-xs font-bold">
              <span className="flex items-center gap-1 text-emerald-400">
                <Gamepad2 className="w-4 h-4" /> 450 XP
              </span>
              <span className="flex items-center gap-1 text-amber-400">
                <Coins className="w-4 h-4" /> 120 Coins
              </span>
              <span className="flex items-center gap-1 text-orange-400">
                <Flame className="w-4 h-4" /> 12 Streak
              </span>
            </div>
          </PixelCard>
        </motion.div>
      </section>

      {/* Core Loop Features */}
      <section className="space-y-8 mb-16">
        <div className="text-center space-y-2">
          <h3 className="text-xs font-bold text-emerald-400 uppercase tracking-widest font-mono">
            How It Works
          </h3>
          <h2 className="text-3xl font-black text-white font-sans">
            The Ultimate Motivation Loop
          </h2>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
          <PixelCard variant="default" className="space-y-3">
            <div className="w-10 h-10 rounded-xl bg-emerald-500/20 text-emerald-400 flex items-center justify-center font-bold font-pixel">
              1
            </div>
            <h4 className="text-lg font-bold text-white">Do Real Quests</h4>
            <p className="text-xs text-slate-400 leading-relaxed">
              Study at XIM Library, workout at XIM SAC, or attend morning lectures.
            </p>
          </PixelCard>

          <PixelCard variant="default" className="space-y-3">
            <div className="w-10 h-10 rounded-xl bg-amber-500/20 text-amber-400 flex items-center justify-center font-bold font-pixel">
              2
            </div>
            <h4 className="text-lg font-bold text-white">Earn XP & Coins</h4>
            <p className="text-xs text-slate-400 leading-relaxed">
              Immediate satisfying visual feedback, coin ledger updates, and stat boosts.
            </p>
          </PixelCard>

          <PixelCard variant="default" className="space-y-3">
            <div className="w-10 h-10 rounded-xl bg-purple-500/20 text-purple-400 flex items-center justify-center font-bold font-pixel">
              3
            </div>
            <h4 className="text-lg font-bold text-white">Unlock Campus Map</h4>
            <p className="text-xs text-slate-400 leading-relaxed">
              Progress from XIM Main Gate to Academic Block, Central Library, and Convocation Pavilion.
            </p>
          </PixelCard>

          <PixelCard variant="default" className="space-y-3">
            <div className="w-10 h-10 rounded-xl bg-cyan-500/20 text-cyan-400 flex items-center justify-center font-bold font-pixel">
              4
            </div>
            <h4 className="text-lg font-bold text-white">Buy Skins & Flex</h4>
            <p className="text-xs text-slate-400 leading-relaxed">
              Spend coins on outfits, glowing profile borders, neon map themes, and top leaderboards.
            </p>
          </PixelCard>
        </div>
      </section>

      {/* Footer */}
      <footer className="border-t border-slate-800/80 pt-8 text-center text-xs text-slate-500 font-mono">
        <p>BBSR LIFE • Crafted for XIM University Bhubaneswar Students</p>
      </footer>
    </div>
  );
}
