'use client';

import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { ShoppingBag, Coins, Flame, ShieldCheck, Check, Sparkles, AlertCircle, Shirt, Palette, Shield, Award } from 'lucide-react';
import { useGame } from '@/lib/context/GameContext';
import { PixelCard } from '@/components/ui/PixelCard';
import { PixelButton } from '@/components/ui/PixelButton';
import { SHOP_SKINS, SHOP_BORDERS, MAP_THEMES, BADGES_CATALOG } from '@/lib/constants/cosmetics';

export default function ShopPage() {
  const { profile, inventory, badges, buyShopItem, saveStreak } = useGame();

  const [activeCategory, setActiveCategory] = useState<'skins' | 'borders' | 'themes' | 'badges' | 'streak'>('skins');
  const [modalNotice, setModalNotice] = useState<{ type: 'success' | 'error'; message: string } | null>(null);

  const handlePurchase = async (itemId: string, itemType: 'skin' | 'border' | 'theme' | 'badge', price: number) => {
    const res = await buyShopItem(itemId, itemType, price);
    setModalNotice({
      type: res.success ? 'success' : 'error',
      message: res.message
    });
    setTimeout(() => setModalNotice(null), 4000);
  };

  const handleStreakSave = async () => {
    const res = await saveStreak();
    setModalNotice({
      type: res.success ? 'success' : 'error',
      message: res.message
    });
    setTimeout(() => setModalNotice(null), 4000);
  };

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex flex-wrap items-center justify-between gap-4">
        <div>
          <h2 className="text-2xl font-black text-white font-sans flex items-center gap-2">
            <ShoppingBag className="w-6 h-6 text-amber-400" /> XIM University Coin Shop & Rewards
          </h2>
          <p className="text-xs text-slate-400 font-mono">
            Spend earned in-game coins on skins, glowing borders, themes & flex badges
          </p>
        </div>

        <div className="px-4 py-2 rounded-xl bg-amber-950/60 border border-amber-500/40 text-amber-300 font-mono font-bold flex items-center gap-2">
          <Coins className="w-5 h-5 text-amber-400 animate-pulse" />
          <span className="text-lg font-black">{profile.coins}</span> Coins
        </div>
      </div>

      {/* Notice Banner */}
      {modalNotice && (
        <motion.div
          initial={{ opacity: 0, y: -10 }}
          animate={{ opacity: 1, y: 0 }}
          className={`p-4 rounded-xl text-xs font-mono font-bold flex items-center gap-2 ${
            modalNotice.type === 'success'
              ? 'bg-emerald-950/90 border border-emerald-500 text-emerald-300'
              : 'bg-rose-950/90 border border-rose-500 text-rose-300'
          }`}
        >
          {modalNotice.type === 'success' ? <Check className="w-4 h-4" /> : <AlertCircle className="w-4 h-4" />}
          {modalNotice.message}
        </motion.div>
      )}

      {/* Category Tabs */}
      <div className="flex flex-wrap gap-2 bg-slate-900/80 p-2 rounded-2xl border border-slate-800">
        {[
          { id: 'skins', label: 'Outfits & Skins', icon: Shirt },
          { id: 'borders', label: 'Profile Borders', icon: Shield },
          { id: 'themes', label: 'Map Themes', icon: Palette },
          { id: 'badges', label: 'Badges', icon: Award },
          { id: 'streak', label: 'Save Streak (50 Coins)', icon: Flame }
        ].map(cat => {
          const Icon = cat.icon;
          return (
            <button
              key={cat.id}
              onClick={() => setActiveCategory(cat.id as typeof activeCategory)}
              className={`flex items-center gap-2 px-4 py-2 rounded-xl text-xs font-bold transition-all ${
                activeCategory === cat.id
                  ? 'bg-amber-400 text-amber-950 font-black shadow-md'
                  : 'text-slate-400 hover:text-white'
              }`}
            >
              <Icon className="w-4 h-4" /> {cat.label}
            </button>
          );
        })}
      </div>

      {/* Category Content Grid */}
      {activeCategory === 'skins' && (
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          {SHOP_SKINS.map(item => {
            const isOwned = inventory.includes(item.id);
            return (
              <PixelCard key={item.id} variant="default" className="p-5 space-y-4 flex flex-col justify-between">
                <div>
                  <div className="w-full h-24 rounded-xl bg-slate-950 flex items-center justify-center border border-slate-800 mb-3">
                    <div
                      className="w-12 h-12 rounded-lg border-2"
                      style={{ backgroundColor: item.previewColor || '#0d9488' }}
                    />
                  </div>
                  <h3 className="text-base font-bold text-white">{item.name}</h3>
                  <p className="text-xs text-slate-400 leading-relaxed">{item.description}</p>
                </div>

                <div className="pt-3 border-t border-slate-800/80 flex items-center justify-between">
                  <span className="text-xs font-mono font-bold text-amber-400">{item.price} Coins</span>
                  {isOwned ? (
                    <span className="px-3 py-1 rounded-full bg-slate-800 text-slate-400 text-xs font-bold">
                      OWNED
                    </span>
                  ) : (
                    <PixelButton
                      variant="gold"
                      size="sm"
                      onClick={() => handlePurchase(item.id, 'skin', item.price)}
                    >
                      BUY SKIN
                    </PixelButton>
                  )}
                </div>
              </PixelCard>
            );
          })}
        </div>
      )}

      {activeCategory === 'borders' && (
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {SHOP_BORDERS.map(item => {
            const isOwned = inventory.includes(item.id);
            return (
              <PixelCard key={item.id} variant="default" className="p-5 space-y-4 flex flex-col justify-between">
                <div>
                  <div className={`w-full h-20 rounded-xl bg-gradient-to-r ${item.previewGradient} flex items-center justify-center mb-3 shadow-md`}>
                    <span className="text-xs font-pixel text-slate-950 font-black">PREVIEW BORDER</span>
                  </div>
                  <h3 className="text-base font-bold text-white">{item.name}</h3>
                  <p className="text-xs text-slate-400 leading-relaxed">{item.description}</p>
                </div>

                <div className="pt-3 border-t border-slate-800/80 flex items-center justify-between">
                  <span className="text-xs font-mono font-bold text-amber-400">{item.price} Coins</span>
                  {isOwned ? (
                    <span className="px-3 py-1 rounded-full bg-slate-800 text-slate-400 text-xs font-bold">
                      OWNED
                    </span>
                  ) : (
                    <PixelButton
                      variant="gold"
                      size="sm"
                      onClick={() => handlePurchase(item.id, 'border', item.price)}
                    >
                      BUY BORDER
                    </PixelButton>
                  )}
                </div>
              </PixelCard>
            );
          })}
        </div>
      )}

      {activeCategory === 'themes' && (
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          {MAP_THEMES.map(item => {
            const isOwned = inventory.includes(item.id);
            return (
              <PixelCard key={item.id} variant="default" className="p-5 space-y-4 flex flex-col justify-between">
                <div>
                  <div
                    className="w-full h-24 rounded-xl border border-slate-800 flex items-center justify-center mb-3"
                    style={{ backgroundColor: item.previewColor }}
                  >
                    <span className="text-xs font-mono text-purple-300 font-bold">MAP THEME</span>
                  </div>
                  <h3 className="text-base font-bold text-white">{item.name}</h3>
                  <p className="text-xs text-slate-400 leading-relaxed">{item.description}</p>
                </div>

                <div className="pt-3 border-t border-slate-800/80 flex items-center justify-between">
                  <span className="text-xs font-mono font-bold text-amber-400">{item.price} Coins</span>
                  {isOwned ? (
                    <span className="px-3 py-1 rounded-full bg-slate-800 text-slate-400 text-xs font-bold">
                      OWNED
                    </span>
                  ) : (
                    <PixelButton
                      variant="gold"
                      size="sm"
                      onClick={() => handlePurchase(item.id, 'theme', item.price)}
                    >
                      BUY THEME
                    </PixelButton>
                  )}
                </div>
              </PixelCard>
            );
          })}
        </div>
      )}

      {activeCategory === 'badges' && (
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {BADGES_CATALOG.map(item => {
            const isOwned = badges.includes(item.id);
            return (
              <PixelCard key={item.id} variant="gold" className="p-5 space-y-4 flex flex-col justify-between">
                <div className="flex items-start gap-4">
                  <div className="w-12 h-12 rounded-2xl bg-amber-500/20 text-amber-400 border border-amber-500/40 flex items-center justify-center shrink-0">
                    <Award className="w-6 h-6" />
                  </div>
                  <div>
                    <h3 className="text-base font-bold text-white">{item.name}</h3>
                    <p className="text-xs text-slate-300 leading-relaxed mt-1">{item.description}</p>
                  </div>
                </div>

                <div className="pt-3 border-t border-amber-500/20 flex items-center justify-between">
                  <span className="text-xs font-mono font-bold text-amber-300">{item.price} Coins</span>
                  {isOwned ? (
                    <span className="px-3 py-1 rounded-full bg-amber-400/20 text-amber-300 text-xs font-bold">
                      OWNED
                    </span>
                  ) : (
                    <PixelButton
                      variant="gold"
                      size="sm"
                      onClick={() => handlePurchase(item.id, 'badge', item.price)}
                    >
                      BUY BADGE
                    </PixelButton>
                  )}
                </div>
              </PixelCard>
            );
          })}
        </div>
      )}

      {/* Streak Preservation Card */}
      {activeCategory === 'streak' && (
        <PixelCard variant="glow" className="p-6 text-center max-w-lg mx-auto space-y-4">
          <div className="w-16 h-16 rounded-full bg-orange-500/20 text-orange-400 border-2 border-orange-500 mx-auto flex items-center justify-center">
            <Flame className="w-8 h-8 fill-orange-400 animate-bounce" />
          </div>

          <h3 className="text-xl font-black text-white font-sans">Save Your Daily Streak</h3>
          <p className="text-xs text-slate-300 leading-relaxed">
            Missed a day of quests? Restore and preserve your streak counter by spending exactly 50 Coins.
          </p>

          <div className="bg-slate-950 p-4 rounded-xl border border-slate-800 flex items-center justify-between text-xs font-mono">
            <span className="text-slate-400">Current Streak: {profile.streak} Days</span>
            <span className="text-amber-400 font-bold">Cost: 50 Coins</span>
          </div>

          <PixelButton variant="gold" fullWidth size="lg" onClick={handleStreakSave}>
            SPEND 50 COINS TO RESTORE STREAK
          </PixelButton>
        </PixelCard>
      )}
    </div>
  );
}
