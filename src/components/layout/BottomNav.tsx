'use client';

import React from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { LayoutDashboard, CheckSquare, Map, ShoppingBag, Trophy, User } from 'lucide-react';

const MOBILE_NAV = [
  { label: 'Home', href: '/dashboard', icon: LayoutDashboard },
  { label: 'Quests', href: '/quests', icon: CheckSquare },
  { label: 'Map', href: '/map', icon: Map },
  { label: 'Shop', href: '/shop', icon: ShoppingBag },
  { label: 'Ranks', href: '/leaderboard', icon: Trophy },
  { label: 'Profile', href: '/profile', icon: User }
];

export const BottomNav: React.FC = () => {
  const pathname = usePathname();

  return (
    <nav className="md:hidden fixed bottom-0 left-0 right-0 z-40 bg-slate-950/95 backdrop-blur-lg border-t border-slate-800 px-2 py-2">
      <div className="flex items-center justify-around max-w-md mx-auto">
        {MOBILE_NAV.map(item => {
          const Icon = item.icon;
          const isActive = pathname === item.href;

          return (
            <Link
              key={item.href}
              href={item.href}
              className={`flex flex-col items-center gap-1 p-2 rounded-xl text-center transition-colors ${
                isActive ? 'text-emerald-400 font-bold' : 'text-slate-400 hover:text-white'
              }`}
            >
              <Icon className={`w-5 h-5 ${isActive ? 'text-emerald-400 scale-110' : 'text-slate-400'}`} />
              <span className="text-[10px] font-mono leading-none">{item.label}</span>
            </Link>
          );
        })}
      </div>
    </nav>
  );
};
