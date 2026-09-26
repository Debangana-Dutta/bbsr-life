'use client';

import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { Lock, Sparkles, DoorOpen, GraduationCap, BookOpen, Dumbbell, Cpu, Compass, Flag, Building, HeartPulse, Coffee, CheckCircle2, Hammer, ArrowRight } from 'lucide-react';
import Link from 'next/link';
import { useGame } from '@/lib/context/GameContext';
import { PixelCard } from '@/components/ui/PixelCard';
import { PixelButton } from '@/components/ui/PixelButton';
import { PixelAvatar } from '@/components/avatar/PixelAvatar';
import { CAMPUS_LOCATIONS } from '@/lib/constants/mapMilestones';
import { CampusLocation } from '@/lib/types/game';

export default function CampusMapPage() {
  const { profile, quests } = useGame();
  const activeSpotIndex = (profile.current_spot_index ?? 0) % CAMPUS_LOCATIONS.length;

  const [selectedLocation, setSelectedLocation] = useState<CampusLocation>(
    CAMPUS_LOCATIONS[activeSpotIndex] || CAMPUS_LOCATIONS[0]
  );
  const [filterType, setFilterType] = useState<'all' | 'academic' | 'sports' | 'hostels'>('all');

  const getIconComponent = (iconName: string) => {
    switch (iconName) {
      case 'DoorOpen':
        return DoorOpen;
      case 'GraduationCap':
        return GraduationCap;
      case 'BookOpen':
        return BookOpen;
      case 'Dumbbell':
        return Dumbbell;
      case 'Cpu':
        return Cpu;
      case 'Building':
        return Building;
      case 'HeartPulse':
        return HeartPulse;
      case 'Coffee':
        return Coffee;
      default:
        return Hammer;
    }
  };

  const activeQuests = quests.filter(q => q.status === 'active');

  const filteredLocations = CAMPUS_LOCATIONS.filter(loc => {
    if (filterType === 'academic') return ['xim_old_academic', 'xim_new_academic', 'xim_ic_building', 'xim_library'].includes(loc.id);
    if (filterType === 'sports') return ['xim_basketball', 'xim_volley', 'xim_cricket'].includes(loc.id);
    if (filterType === 'hostels') return ['xim_boys_hostel', 'xim_girls_hostel', 'xim_pg_hostel', 'xim_cafeteria', 'xim_vendors', 'xim_dispensary'].includes(loc.id);
    return true;
  });

  // Selected spot construction progress
  const selectedIndex = CAMPUS_LOCATIONS.findIndex(l => l.id === selectedLocation.id);
  const isSelectedCompleted = selectedIndex < activeSpotIndex;
  const isSelectedActive = selectedIndex === activeSpotIndex;
  const selectedPct = isSelectedCompleted
    ? 100
    : isSelectedActive
    ? (profile.spot_build_progress?.[selectedLocation.id] || 0)
    : 0;

  return (
    <div className="space-y-6">
      {/* Top RPG Header Bar */}
      <div className="flex flex-wrap items-center justify-between gap-4 bg-slate-900/90 p-4 rounded-2xl border-2 border-amber-500/40 shadow-xl">
        <div className="flex items-center gap-3">
          <div className="p-2 rounded-xl bg-amber-500/20 text-amber-400 border border-amber-500/40">
            <Compass className="w-6 h-6 animate-spin" />
          </div>
          <div>
            <h2 className="text-xl font-black text-white font-sans flex items-center gap-2">
              XIM Campus Building Realm (Loop {profile.prestige_loop || 1})
            </h2>
            <p className="text-xs text-amber-200/80 font-mono">
              Spot {activeSpotIndex + 1} of 16 • Complete tasks to build +25% per quest!
            </p>
          </div>
        </div>

        {/* Category Filter Pills */}
        <div className="flex items-center gap-1.5 overflow-x-auto">
          {[
            { id: 'all', label: 'All 16 Spots' },
            { id: 'academic', label: 'Academics' },
            { id: 'sports', label: 'Sports Arena' },
            { id: 'hostels', label: 'Hostels & Dining' }
          ].map(tab => (
            <button
              key={tab.id}
              onClick={() => setFilterType(tab.id as typeof filterType)}
              className={`px-3 py-1 rounded-xl text-xs font-mono font-bold transition-all cursor-pointer ${
                filterType === tab.id
                  ? 'bg-amber-400 text-slate-950 font-black shadow-md'
                  : 'bg-slate-950 text-slate-400 border border-slate-800 hover:text-white'
              }`}
            >
              {tab.label}
            </button>
          ))}
        </div>
      </div>

      {/* Main Fantasy RPG Map Canvas */}
      <div className="relative rounded-2xl border-4 border-amber-600/60 overflow-hidden shadow-[0_0_50px_rgba(245,158,11,0.2)] bg-slate-950">
        {/* Background Map Artwork */}
        <div
          className="w-full h-[580px] sm:h-[650px] bg-cover bg-center relative transition-all"
          style={{
            backgroundImage: `url('/assets/xim_campus_map.png')`,
            backgroundBlendMode: 'overlay',
            backgroundColor: 'rgba(15, 23, 42, 0.25)'
          }}
        >
          {/* Subtle Scanline Overlay */}
          <div className="absolute inset-0 bg-gradient-to-b from-slate-950/40 via-transparent to-slate-950/70 pointer-events-none" />

          {/* Left HUD Overlay Panel: Legend & Building Quest Progress */}
          <div className="absolute top-4 left-4 z-20 space-y-3 w-52 sm:w-64 hidden sm:block">
            {/* Legend Panel */}
            <div className="bg-slate-950/90 backdrop-blur-md p-3.5 rounded-xl border border-amber-500/40 text-xs font-mono shadow-2xl">
              <div className="font-bold text-amber-400 uppercase tracking-wider mb-2 flex items-center gap-1.5 border-b border-amber-500/20 pb-1">
                <Flag className="w-3.5 h-3.5" /> XIM BUILDING PROGRESS
              </div>
              <div className="space-y-1.5 text-slate-300 text-[11px]">
                <div className="flex items-center gap-2">
                  <span className="w-2.5 h-2.5 rounded-full bg-emerald-400" /> 100% Fully Built
                </div>
                <div className="flex items-center gap-2">
                  <span className="w-2.5 h-2.5 rounded-full bg-amber-400 animate-ping" /> Currently Building (+25%)
                </div>
                <div className="flex items-center gap-2">
                  <span className="w-2.5 h-2.5 rounded-full bg-slate-600" /> Locked Future Spot
                </div>
              </div>
            </div>

            {/* Quests Overlay Box */}
            <div className="bg-slate-950/90 backdrop-blur-md p-3.5 rounded-xl border border-amber-500/40 text-xs font-mono shadow-2xl">
              <div className="font-bold text-emerald-400 uppercase tracking-wider mb-2 flex items-center gap-1.5 border-b border-amber-500/20 pb-1">
                <Sparkles className="w-3.5 h-3.5" /> ACTIVE TASKS ({activeQuests.length})
              </div>
              <div className="space-y-1.5 text-[11px]">
                {activeQuests.length > 0 ? (
                  activeQuests.slice(0, 3).map(q => (
                    <div key={q.id} className="text-slate-300 truncate flex items-center gap-1.5">
                      <span className="text-amber-400 font-bold">!</span> {q.title}
                    </div>
                  ))
                ) : (
                  <p className="text-slate-500 italic">No active tasks. Add a quest to build!</p>
                )}
              </div>
            </div>
          </div>

          {/* Interactive Landmark Node Markers for all 16 spots */}
          {filteredLocations.map(loc => {
            const locIndex = CAMPUS_LOCATIONS.findIndex(l => l.id === loc.id);
            const isCompleted = locIndex < activeSpotIndex;
            const isActiveSpot = locIndex === activeSpotIndex;
            const isSelected = selectedLocation.id === loc.id;
            const IconComp = getIconComponent(loc.icon);

            const pct = isCompleted
              ? 100
              : isActiveSpot
              ? (profile.spot_build_progress?.[loc.id] || 0)
              : 0;

            return (
              <div
                key={loc.id}
                style={{
                  left: `${loc.coordinates.x}%`,
                  top: `${loc.coordinates.y}%`,
                  transform: 'translate(-50%, -50%)',
                  zIndex: isActiveSpot ? 30 : 10
                }}
                className="absolute flex flex-col items-center group cursor-pointer"
                onClick={() => setSelectedLocation(loc)}
              >
                {/* ONE AND ONLY SINGLE CHARACTER PINPOINT (Sitting on the active building spot) */}
                {isActiveSpot && (
                  <motion.div
                    animate={{ y: [0, -10, 0] }}
                    transition={{ repeat: Infinity, duration: 2 }}
                    className="absolute -top-16 z-30 flex flex-col items-center"
                  >
                    <div className="bg-amber-400 text-slate-950 px-2 py-0.5 rounded-full text-[9px] font-black uppercase shadow-lg border border-amber-300 whitespace-nowrap mb-1 flex items-center gap-1">
                      <Hammer className="w-2.5 h-2.5 animate-spin" /> BUILDING ({pct}%)
                    </div>
                    <PixelAvatar config={profile.avatar_config} size="sm" />
                  </motion.div>
                )}

                {/* Node Ring Icon */}
                <div
                  className={`w-10 h-10 sm:w-12 sm:h-12 rounded-full flex items-center justify-center border-2 sm:border-4 transition-all duration-300 shadow-2xl ${
                    isActiveSpot
                      ? 'bg-amber-500 text-slate-950 border-white ring-4 ring-amber-400/80 scale-125 shadow-[0_0_30px_rgba(245,158,11,1)]'
                      : isCompleted
                      ? isSelected
                        ? 'bg-emerald-500 text-slate-950 border-white scale-110 shadow-[0_0_20px_rgba(16,185,129,0.8)]'
                        : 'bg-emerald-950 text-emerald-400 border-emerald-500 hover:scale-110 shadow-[0_0_15px_rgba(16,185,129,0.4)]'
                      : 'bg-slate-950/90 text-slate-600 border-slate-800 opacity-60'
                  }`}
                >
                  {isCompleted ? (
                    <CheckCircle2 className="w-5 h-5 text-emerald-400" />
                  ) : isActiveSpot ? (
                    <IconComp className="w-5 h-5 text-slate-950" />
                  ) : (
                    <Lock className="w-3.5 h-3.5" />
                  )}
                </div>

                {/* Node Label Badge */}
                <div
                  className={`mt-1 px-2 py-0.5 rounded-md text-[10px] sm:text-[11px] font-mono font-bold whitespace-nowrap shadow-md ${
                    isActiveSpot
                      ? 'bg-amber-500 text-slate-950 font-black border border-amber-300'
                      : isCompleted
                      ? 'bg-slate-950/95 text-emerald-300 border border-emerald-500/50'
                      : 'bg-slate-950/80 text-slate-500 border border-slate-800'
                  }`}
                >
                  {loc.shortName} ({pct}%)
                </div>
              </div>
            );
          })}

          {/* Right Bottom HUD: Location Detail Card */}
          <div className="absolute bottom-4 right-4 left-4 sm:left-auto z-20 max-w-sm w-full">
            <PixelCard variant="gold" className="p-4 bg-slate-950/95 backdrop-blur-md border-2 border-amber-500/80 shadow-2xl space-y-3">
              <div className="flex items-center justify-between">
                <span
                  className={`px-2.5 py-0.5 rounded text-[10px] font-mono font-bold uppercase ${
                    isSelectedCompleted
                      ? 'bg-emerald-500/20 text-emerald-400 border border-emerald-500/40'
                      : isSelectedActive
                      ? 'bg-amber-500/20 text-amber-300 border border-amber-500/40 animate-pulse'
                      : 'bg-slate-900 text-slate-500 border border-slate-800'
                  }`}
                >
                  {isSelectedCompleted
                    ? '100% FULLY BUILT'
                    : isSelectedActive
                    ? `CURRENTLY BUILDING (${selectedPct}%)`
                    : 'LOCKED SPOT'}
                </span>

                <span className="text-[11px] font-mono text-amber-300 font-bold">
                  {selectedLocation.statBonus}
                </span>
              </div>

              <div>
                <h3 className="text-base font-black text-white font-sans">{selectedLocation.name}</h3>
                <p className="text-xs text-slate-300 leading-relaxed mt-1">{selectedLocation.description}</p>
              </div>

              {/* Spot Construction Progress Bar */}
              <div className="space-y-1">
                <div className="flex justify-between text-[11px] font-mono font-bold text-amber-300">
                  <span>Construction Progress:</span>
                  <span>{selectedPct}% / 100%</span>
                </div>
                <div className="w-full h-2.5 bg-slate-900 rounded-full overflow-hidden border border-amber-500/30">
                  <div
                    className={`h-full transition-all duration-500 ${
                      isSelectedCompleted ? 'bg-emerald-400' : 'bg-gradient-to-r from-amber-500 to-amber-300'
                    }`}
                    style={{ width: `${selectedPct}%` }}
                  />
                </div>
              </div>

              <div className="p-2.5 rounded-lg bg-slate-900 border border-amber-500/20 text-[11px] text-amber-200/90 font-mono italic">
                &quot;{selectedLocation.lore}&quot;
              </div>

              <div className="flex items-center gap-2 pt-1">
                {isSelectedActive ? (
                  <Link href="/quests" className="w-full">
                    <PixelButton variant="gold" fullWidth size="sm">
                      <Sparkles className="w-4 h-4" /> COMPLETE TASKS TO BUILD (+25%) <ArrowRight className="w-4 h-4" />
                    </PixelButton>
                  </Link>
                ) : (
                  <PixelButton
                    variant="accent"
                    fullWidth
                    size="sm"
                    onClick={() => setSelectedLocation(CAMPUS_LOCATIONS[activeSpotIndex])}
                  >
                    <Compass className="w-4 h-4" /> JUMP TO ACTIVE BUILDING SPOT
                  </PixelButton>
                )}
              </div>
            </PixelCard>
          </div>
        </div>
      </div>
    </div>
  );
}

