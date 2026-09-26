'use client';

import React from 'react';
import './globals.css';
import { GameProvider, useGame } from '@/lib/context/GameContext';
import { TopHeader } from '@/components/layout/TopHeader';
import { Sidebar } from '@/components/layout/Sidebar';
import { BottomNav } from '@/components/layout/BottomNav';
import { LevelUpModal } from '@/components/shared/LevelUpModal';
import { RewardModal } from '@/components/shared/RewardModal';
import { usePathname } from 'next/navigation';

function AppContent({ children }: { children: React.ReactNode }) {
  const pathname = usePathname();
  const { levelUpData, clearLevelUpModal, rewardClaimedData, clearRewardModal } = useGame();

  const isPublicPage = pathname === '/' || pathname === '/auth' || pathname === '/onboarding';

  return (
    <div className="min-h-screen bg-slate-950 text-slate-100 flex flex-col relative selection:bg-emerald-500 selection:text-slate-950">
      {/* Retro Scanline Subtle Filter */}
      <div className="pointer-events-none fixed inset-0 z-50 scanlines opacity-30" />

      {/* Show TopHeader & Sidebar on authenticated routes */}
      {!isPublicPage && <TopHeader />}

      <div className="flex flex-1">
        {!isPublicPage && <Sidebar />}

        <main className={`flex-1 p-4 sm:p-6 md:p-8 max-w-7xl mx-auto w-full ${!isPublicPage ? 'pb-24 md:pb-8' : ''}`}>
          {children}
        </main>
      </div>

      {!isPublicPage && <BottomNav />}

      {/* Global Level-Up Modal */}
      {levelUpData && (
        <LevelUpModal
          oldLevel={levelUpData.oldLevel}
          newLevel={levelUpData.newLevel}
          onClose={clearLevelUpModal}
        />
      )}

      {/* Global Quest Reward Modal */}
      {rewardClaimedData && (
        <RewardModal
          xp={rewardClaimedData.xp}
          coins={rewardClaimedData.coins}
          title={rewardClaimedData.title}
          onClose={clearRewardModal}
        />
      )}
    </div>
  );
}

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en" className="dark">
      <head>
        <title>BBSR Life - Gamified College Life at IIT Bhubaneswar</title>
        <meta
          name="description"
          content="Turn real college life into a pixel-art RPG game. Complete quests, earn XP & coins, level up your character, unlock campus map milestones at IIT Bhubaneswar!"
        />
      </head>
      <body>
        <GameProvider>
          <AppContent>{children}</AppContent>
        </GameProvider>
      </body>
    </html>
  );
}
