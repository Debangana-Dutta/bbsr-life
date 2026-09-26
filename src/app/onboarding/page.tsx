'use client';

import React, { useState } from 'react';
import { useRouter } from 'next/navigation';
import { motion } from 'framer-motion';
import { Sparkles, ArrowRight, UserCheck, Scale, Palette, Shield } from 'lucide-react';
import { PixelButton } from '@/components/ui/PixelButton';
import { PixelCard } from '@/components/ui/PixelCard';
import { PixelAvatar } from '@/components/avatar/PixelAvatar';
import { useGame } from '@/lib/context/GameContext';
import { AvatarConfig } from '@/lib/types/game';

export default function OnboardingPage() {
  const router = useRouter();
  const { updateOnboarding } = useGame();

  const [gender, setGender] = useState<string>('other');
  const [weight, setWeight] = useState<number>(65);

  const [skinColor, setSkinColor] = useState<string>('#f5c096');
  const [hairStyle, setHairStyle] = useState<AvatarConfig['hairStyle']>('short');
  const [hairColor, setHairColor] = useState<string>('#2c1b18');

  // Compute weight category for character sprite scaling
  let weightCat: AvatarConfig['weightCategory'] = 'balanced';
  if (weight < 55) weightCat = 'fit';
  else if (weight >= 55 && weight <= 75) weightCat = 'athletic';
  else weightCat = 'stocky';

  const avatarPreviewConfig: AvatarConfig = {
    skinColor,
    hairStyle,
    hairColor,
    outfit: 'default_hoodie',
    accessory: 'none',
    border: 'default',
    weightCategory: weightCat
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    updateOnboarding(gender, weight, avatarPreviewConfig);
    router.push('/dashboard');
  };

  return (
    <div className="min-h-screen flex flex-col items-center justify-center py-12 px-4">
      <motion.div
        initial={{ opacity: 0, scale: 0.95 }}
        animate={{ opacity: 1, scale: 1 }}
        className="max-w-xl w-full"
      >
        <div className="text-center mb-6">
          <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-emerald-500/10 text-emerald-400 text-xs font-bold uppercase mb-2 border border-emerald-500/30">
            <Sparkles className="w-4 h-4" /> Character Generator
          </div>
          <h2 className="text-3xl font-black text-white font-sans">
            Build Your Campus Game Character
          </h2>
          <p className="text-xs text-slate-400 font-mono mt-1">
            Customize your gender, weight & pixel avatar attributes
          </p>
        </div>

        <PixelCard variant="glow" className="p-6">
          <form onSubmit={handleSubmit} className="space-y-6">
            {/* Live Sprite Preview */}
            <div className="bg-slate-950 p-6 rounded-2xl border border-slate-800 text-center relative overflow-hidden">
              <div className="relative mb-3">
                <PixelAvatar config={avatarPreviewConfig} size="xl" className="mx-auto" />
              </div>
              <div className="inline-block px-3 py-1 rounded-full bg-slate-900 border border-slate-700 text-xs font-mono text-emerald-400">
                Category: {weightCat.toUpperCase()} HERO
              </div>
            </div>

            {/* Gender Selection */}
            <div>
              <label className="block text-xs font-bold text-slate-300 mb-2 flex items-center gap-1.5">
                <UserCheck className="w-4 h-4 text-emerald-400" /> SELECT GENDER IDENTITY
              </label>
              <div className="grid grid-cols-3 gap-2">
                {[
                  { id: 'male', label: 'Male' },
                  { id: 'female', label: 'Female' },
                  { id: 'other', label: 'Non-Binary / Other' }
                ].map(g => (
                  <button
                    key={g.id}
                    type="button"
                    onClick={() => setGender(g.id)}
                    className={`py-2.5 px-3 rounded-xl border text-xs font-bold transition-all ${
                      gender === g.id
                        ? 'bg-emerald-500 text-slate-950 border-emerald-400 shadow-md'
                        : 'bg-slate-950 text-slate-400 border-slate-800 hover:text-white'
                    }`}
                  >
                    {g.label}
                  </button>
                ))}
              </div>
            </div>

            {/* Weight Input */}
            <div>
              <div className="flex justify-between items-center mb-2">
                <label className="text-xs font-bold text-slate-300 flex items-center gap-1.5">
                  <Scale className="w-4 h-4 text-amber-400" /> WEIGHT (KG)
                </label>
                <span className="text-xs font-mono font-black text-amber-400">{weight} kg</span>
              </div>
              <input
                type="range"
                min="40"
                max="120"
                value={weight}
                onChange={e => setWeight(Number(e.target.value))}
                className="w-full h-2 bg-slate-950 rounded-lg appearance-none cursor-pointer accent-emerald-500"
              />
              <p className="text-[11px] text-slate-500 font-mono mt-1">
                Note: Used solely to synthesize your character silhouette respectfully. Never publicly exposed.
              </p>
            </div>

            {/* Hair Style */}
            <div>
              <label className="block text-xs font-bold text-slate-300 mb-2 flex items-center gap-1.5">
                <Palette className="w-4 h-4 text-purple-400" /> HAIR STYLE
              </label>
              <div className="grid grid-cols-5 gap-2">
                {[
                  { id: 'short', label: 'Short' },
                  { id: 'spiky', label: 'Spiky' },
                  { id: 'curly', label: 'Curly' },
                  { id: 'long', label: 'Long' },
                  { id: 'cap', label: 'Cap' }
                ].map(h => (
                  <button
                    key={h.id}
                    type="button"
                    onClick={() => setHairStyle(h.id as AvatarConfig['hairStyle'])}
                    className={`py-2 rounded-lg border text-[11px] font-bold transition-all ${
                      hairStyle === h.id
                        ? 'bg-purple-600 text-white border-purple-400'
                        : 'bg-slate-950 text-slate-400 border-slate-800'
                    }`}
                  >
                    {h.label}
                  </button>
                ))}
              </div>
            </div>

            {/* Colors */}
            <div className="grid grid-cols-2 gap-4">
              <div>
                <label className="block text-xs font-bold text-slate-300 mb-2">SKIN TONE</label>
                <div className="flex gap-2">
                  {['#f5c096', '#e0ac69', '#c68642', '#8d5524', '#3c2e28'].map(color => (
                    <button
                      key={color}
                      type="button"
                      onClick={() => setSkinColor(color)}
                      className={`w-7 h-7 rounded-full border-2 transition-transform ${
                        skinColor === color ? 'scale-125 border-emerald-400' : 'border-slate-800'
                      }`}
                      style={{ backgroundColor: color }}
                    />
                  ))}
                </div>
              </div>

              <div>
                <label className="block text-xs font-bold text-slate-300 mb-2">HAIR COLOR</label>
                <div className="flex gap-2">
                  {['#2c1b18', '#3b82f6', '#ec4899', '#eab308', '#a855f7'].map(color => (
                    <button
                      key={color}
                      type="button"
                      onClick={() => setHairColor(color)}
                      className={`w-7 h-7 rounded-full border-2 transition-transform ${
                        hairColor === color ? 'scale-125 border-emerald-400' : 'border-slate-800'
                      }`}
                      style={{ backgroundColor: color }}
                    />
                  ))}
                </div>
              </div>
            </div>

            <PixelButton variant="gold" fullWidth size="lg" type="submit">
              SAVE & ENTER IIT BBSR REALM <ArrowRight className="w-5 h-5 ml-1" />
            </PixelButton>
          </form>
        </PixelCard>
      </motion.div>
    </div>
  );
}
