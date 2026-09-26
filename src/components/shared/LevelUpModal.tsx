'use client';

import React, { useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import confetti from 'canvas-confetti';
import { Sparkles, Trophy } from 'lucide-react';
import { PixelButton } from '../ui/PixelButton';

interface LevelUpModalProps {
  oldLevel: number;
  newLevel: number;
  onClose: () => void;
}

export const LevelUpModal: React.FC<LevelUpModalProps> = ({
  oldLevel,
  newLevel,
  onClose
}) => {
  useEffect(() => {
    // Fire celebratory confetti cannons
    confetti({
      particleCount: 100,
      spread: 70,
      origin: { y: 0.6 }
    });
  }, []);

  return (
    <AnimatePresence>
      <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-950/80 backdrop-blur-md">
        <motion.div
          initial={{ scale: 0.5, opacity: 0, y: 50 }}
          animate={{ scale: 1, opacity: 1, y: 0 }}
          exit={{ scale: 0.8, opacity: 0 }}
          transition={{ type: 'spring', damping: 15, stiffness: 200 }}
          className="relative max-w-sm w-full bg-slate-900 border-4 border-amber-400 p-6 rounded-2xl text-center shadow-[0_0_50px_rgba(251,191,36,0.5)] overflow-hidden"
        >
          {/* Background rays animation */}
          <div className="absolute inset-0 bg-gradient-to-b from-amber-500/10 via-transparent to-transparent pointer-events-none" />

          {/* Level Icon */}
          <div className="mx-auto w-20 h-20 rounded-full bg-gradient-to-tr from-amber-500 to-yellow-300 flex items-center justify-center border-4 border-amber-200 shadow-lg mb-4 animate-bounce">
            <Trophy className="w-10 h-10 text-slate-950" />
          </div>

          <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-amber-400/20 text-amber-300 text-xs font-bold uppercase mb-2">
            <Sparkles className="w-4 h-4" /> Level Up Celebration!
          </div>

          <h2 className="text-2xl font-black text-white font-pixel tracking-wide mb-1">
            LEVEL {newLevel}!
          </h2>
          <p className="text-slate-300 text-sm mb-6">
            Congratulations! You progressed from Level {oldLevel} to Level {newLevel}. Campus locations unlocked!
          </p>

          <PixelButton variant="gold" fullWidth onClick={onClose}>
            CLAIM REWARDS & CONTINUE
          </PixelButton>
        </motion.div>
      </div>
    </AnimatePresence>
  );
};
