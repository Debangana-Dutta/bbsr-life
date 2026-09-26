'use client';

import React from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Coins, Zap, CheckCircle2, Hammer, Sparkles, ArrowRight } from 'lucide-react';
import { PixelButton } from '../ui/PixelButton';

interface RewardModalProps {
  xp: number;
  coins: number;
  title: string;
  spotBuilt?: string;
  spotPercent?: number;
  spotCompleted?: boolean;
  onClose: () => void;
}

export const RewardModal: React.FC<RewardModalProps> = ({
  xp,
  coins,
  title,
  spotBuilt,
  spotPercent,
  spotCompleted,
  onClose
}) => {
  return (
    <AnimatePresence>
      <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-950/80 backdrop-blur-md">
        <motion.div
          initial={{ scale: 0.8, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          exit={{ scale: 0.8, opacity: 0 }}
          className="max-w-sm w-full bg-slate-900 border-2 border-emerald-500 p-6 rounded-2xl text-center shadow-[0_0_40px_rgba(16,185,129,0.5)] space-y-4"
        >
          <div className="w-12 h-12 rounded-full bg-emerald-500/20 text-emerald-400 mx-auto flex items-center justify-center">
            <CheckCircle2 className="w-7 h-7" />
          </div>

          <div>
            <h3 className="text-xs font-bold text-emerald-400 uppercase tracking-widest mb-1">
              Quest Completed!
            </h3>
            <p className="text-white font-bold text-sm line-clamp-2">
              &quot;{title}&quot;
            </p>
          </div>

          <div className="grid grid-cols-2 gap-3">
            <div className="bg-slate-950/80 p-3 rounded-xl border border-emerald-500/30 flex flex-col items-center">
              <span className="text-[11px] text-slate-400 font-semibold mb-0.5 flex items-center gap-1">
                <Zap className="w-3.5 h-3.5 text-emerald-400" /> XP Earned
              </span>
              <span className="text-lg font-black text-emerald-400">+{xp}</span>
            </div>

            <div className="bg-slate-950/80 p-3 rounded-xl border border-amber-500/30 flex flex-col items-center">
              <span className="text-[11px] text-slate-400 font-semibold mb-0.5 flex items-center gap-1">
                <Coins className="w-3.5 h-3.5 text-amber-400" /> Coins Earned
              </span>
              <span className="text-lg font-black text-amber-400">+{coins}</span>
            </div>
          </div>

          {/* Building Construction Progress Widget */}
          {spotBuilt && (
            <div className={`p-3 rounded-xl border text-left space-y-1.5 transition-all ${
              spotCompleted
                ? 'bg-amber-950/60 border-amber-400/80 text-amber-200'
                : 'bg-slate-950/80 border-slate-800 text-slate-300'
            }`}>
              <div className="flex justify-between items-center text-xs font-bold font-mono">
                <span className="flex items-center gap-1 text-amber-400">
                  <Hammer className="w-4 h-4 text-amber-400 animate-bounce" /> {spotBuilt}
                </span>
                <span className="text-white font-mono">{spotPercent}% BUILT</span>
              </div>

              {/* Progress Bar */}
              <div className="w-full bg-slate-900 h-2.5 rounded-full overflow-hidden border border-slate-800">
                <div
                  className="h-full bg-gradient-to-r from-amber-500 to-yellow-300 rounded-full transition-all duration-500"
                  style={{ width: `${spotPercent}%` }}
                />
              </div>

              {spotCompleted ? (
                <p className="text-[11px] text-emerald-400 font-mono font-bold flex items-center gap-1 pt-1">
                  <Sparkles className="w-3.5 h-3.5" /> 100% COMPLETE! JUMPING TO NEXT SPOT <ArrowRight className="w-3.5 h-3.5" />
                </p>
              ) : (
                <p className="text-[10px] text-slate-400 font-mono">
                  Complete more quests to reach 100% and unlock the next campus spot!
                </p>
              )}
            </div>
          )}

          <PixelButton variant="primary" fullWidth onClick={onClose} size="sm">
            CONTINUE QUESTING
          </PixelButton>
        </motion.div>
      </div>
    </AnimatePresence>
  );
};
