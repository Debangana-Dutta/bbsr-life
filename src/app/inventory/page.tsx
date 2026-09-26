'use client';

import React from 'react';
import { Shirt, Check, Sparkles, Shield, Palette } from 'lucide-react';
import { useGame } from '@/lib/context/GameContext';
import { PixelCard } from '@/components/ui/PixelCard';
import { PixelButton } from '@/components/ui/PixelButton';
import { PixelAvatar } from '@/components/avatar/PixelAvatar';
import { SHOP_SKINS, SHOP_BORDERS, MAP_THEMES } from '@/lib/constants/cosmetics';

export default function InventoryPage() {
  const { profile, inventory, equippedSkin, equippedBorder, equippedTheme, equipItem } = useGame();

  const ownedSkins = SHOP_SKINS.filter(s => inventory.includes(s.id));
  const ownedBorders = SHOP_BORDERS.filter(b => inventory.includes(b.id));
  const ownedThemes = MAP_THEMES.filter(t => inventory.includes(t.id));

  return (
    <div className="space-y-6">
      {/* Header */}
      <div>
        <h2 className="text-2xl font-black text-white font-sans flex items-center gap-2">
          <Shirt className="w-6 h-6 text-cyan-400" /> Wardrobe & Cosmetic Inventory
        </h2>
        <p className="text-xs text-slate-400 font-mono">
          Equip owned character skins, profile borders, and map themes
        </p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
        {/* Live Character Outfit Preview */}
        <div className="lg:col-span-5">
          <PixelCard variant="glow" className="p-6 text-center sticky top-24">
            <h3 className="text-xs font-bold text-emerald-400 uppercase tracking-widest mb-4">
              CURRENT CHARACTER LOOK
            </h3>
            <div className="relative mb-6">
              <PixelAvatar config={profile.avatar_config} size="xl" className="mx-auto" />
            </div>

            <h4 className="text-lg font-black text-white font-pixel">{profile.display_name}</h4>
            <p className="text-xs text-slate-400 font-mono mt-1">Level {profile.level} Scholar</p>
          </PixelCard>
        </div>

        {/* Owned Items Selection list */}
        <div className="lg:col-span-7 space-y-6">
          {/* Skins Section */}
          <div className="space-y-3">
            <h3 className="text-sm font-bold text-white font-mono flex items-center gap-2">
              <Shirt className="w-4 h-4 text-emerald-400" /> OWNED OUTFIT SKINS ({ownedSkins.length})
            </h3>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
              {ownedSkins.map(skin => {
                const isEquipped = equippedSkin === skin.id;
                return (
                  <PixelCard key={skin.id} variant="default" className="p-4 flex items-center justify-between">
                    <div>
                      <h4 className="text-sm font-bold text-white">{skin.name}</h4>
                      <p className="text-[11px] text-slate-400">{skin.rarity.toUpperCase()}</p>
                    </div>
                    {isEquipped ? (
                      <span className="px-3 py-1 rounded-full bg-emerald-500/20 text-emerald-400 text-xs font-bold flex items-center gap-1">
                        <Check className="w-3.5 h-3.5" /> EQUIPPED
                      </span>
                    ) : (
                      <PixelButton
                        variant="ghost"
                        size="sm"
                        onClick={() => equipItem(skin.id, 'skin')}
                      >
                        EQUIP
                      </PixelButton>
                    )}
                  </PixelCard>
                );
              })}
            </div>
          </div>

          {/* Borders Section */}
          <div className="space-y-3 pt-4 border-t border-slate-800">
            <h3 className="text-sm font-bold text-white font-mono flex items-center gap-2">
              <Shield className="w-4 h-4 text-amber-400" /> OWNED PROFILE BORDERS ({ownedBorders.length})
            </h3>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
              {ownedBorders.map(border => {
                const isEquipped = equippedBorder === border.id;
                return (
                  <PixelCard key={border.id} variant="default" className="p-4 flex items-center justify-between">
                    <div>
                      <h4 className="text-sm font-bold text-white">{border.name}</h4>
                      <p className="text-[11px] text-slate-400">{border.rarity.toUpperCase()}</p>
                    </div>
                    {isEquipped ? (
                      <span className="px-3 py-1 rounded-full bg-emerald-500/20 text-emerald-400 text-xs font-bold flex items-center gap-1">
                        <Check className="w-3.5 h-3.5" /> EQUIPPED
                      </span>
                    ) : (
                      <PixelButton
                        variant="ghost"
                        size="sm"
                        onClick={() => equipItem(border.id, 'border')}
                      >
                        EQUIP
                      </PixelButton>
                    )}
                  </PixelCard>
                );
              })}
            </div>
          </div>

          {/* Map Themes Section */}
          <div className="space-y-3 pt-4 border-t border-slate-800">
            <h3 className="text-sm font-bold text-white font-mono flex items-center gap-2">
              <Palette className="w-4 h-4 text-purple-400" /> OWNED MAP THEMES ({ownedThemes.length})
            </h3>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
              {ownedThemes.map(theme => {
                const isEquipped = equippedTheme === theme.id;
                return (
                  <PixelCard key={theme.id} variant="default" className="p-4 flex items-center justify-between">
                    <div>
                      <h4 className="text-sm font-bold text-white">{theme.name}</h4>
                      <p className="text-[11px] text-slate-400">{theme.rarity.toUpperCase()}</p>
                    </div>
                    {isEquipped ? (
                      <span className="px-3 py-1 rounded-full bg-emerald-500/20 text-emerald-400 text-xs font-bold flex items-center gap-1">
                        <Check className="w-3.5 h-3.5" /> EQUIPPED
                      </span>
                    ) : (
                      <PixelButton
                        variant="ghost"
                        size="sm"
                        onClick={() => equipItem(theme.id, 'theme')}
                      >
                        EQUIP
                      </PixelButton>
                    )}
                  </PixelCard>
                );
              })}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
