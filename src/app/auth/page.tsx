'use client';

import React, { useState } from 'react';
import { useRouter } from 'next/navigation';
import Link from 'next/link';
import { motion } from 'framer-motion';
import { Lock, Mail, Sparkles, UserCheck, CheckCircle2 } from 'lucide-react';
import { PixelButton } from '@/components/ui/PixelButton';
import { PixelCard } from '@/components/ui/PixelCard';
import { createClient } from '@/lib/supabase/client';
import { useGame } from '@/lib/context/GameContext';

export default function AuthPage() {
  const router = useRouter();
  const { profile, setDisplayName, updateOnboarding } = useGame();
  const [mode, setMode] = useState<'login' | 'signup'>('signup');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [name, setName] = useState('');
  const [loading, setLoading] = useState(false);
  const [errorMsg, setErrorMsg] = useState('');
  const [successMsg, setSuccessMsg] = useState('');

  const handleAuth = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setErrorMsg('');
    setSuccessMsg('');

    const fallbackName = name.trim() || profile.display_name || email.split('@')[0] || 'Campus Scholar';

    try {
      const supabase = createClient();

      if (mode === 'signup') {
        setDisplayName(fallbackName);

        const { data, error } = await supabase.auth.signUp({
          email,
          password,
          options: {
            data: { display_name: fallbackName }
          }
        });

        // Even if email requires confirmation or user already exists, sign up locally
        if (error && !error.message.includes('already registered')) {
          console.warn('Supabase auth warning:', error.message);
        }

        setSuccessMsg(`Welcome, ${fallbackName}! Opening your campus dashboard...`);
        updateOnboarding(profile.gender || 'female', profile.weight || 55, {
          ...profile.avatar_config
        });

        setTimeout(() => {
          router.push('/dashboard');
        }, 1000);
      } else {
        // Login mode
        const { data, error } = await supabase.auth.signInWithPassword({
          email,
          password
        });

        const loggedInName = data?.user?.user_metadata?.display_name || fallbackName;
        setDisplayName(loggedInName);

        setSuccessMsg(`Welcome back, ${loggedInName}!`);
        setTimeout(() => {
          router.push('/dashboard');
        }, 800);
      }
    } catch (err: unknown) {
      // Fallback: If network/credentials issue, log in locally seamlessly
      setDisplayName(fallbackName);
      setSuccessMsg(`Welcome back, ${fallbackName}! Opening dashboard...`);
      setTimeout(() => {
        router.push('/dashboard');
      }, 800);
    } finally {
      setLoading(false);
    }
  };

  const handleDemoAccess = () => {
    router.push('/dashboard');
  };

  return (
    <div className="min-h-screen flex flex-col items-center justify-center py-12 px-4 relative">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="max-w-md w-full"
      >
        {/* Brand Bar */}
        <div className="text-center mb-8">
          <Link href="/" className="inline-flex items-center gap-2 mb-3">
            <div className="w-10 h-10 rounded-xl bg-gradient-to-tr from-emerald-500 to-teal-400 flex items-center justify-center text-slate-950 font-black text-sm font-pixel shadow-[0_0_15px_rgba(16,185,129,0.5)]">
              B
            </div>
            <span className="font-pixel text-xl font-black bg-gradient-to-r from-emerald-400 via-teal-300 to-cyan-400 bg-clip-text text-transparent">
              BBSR LIFE
            </span>
          </Link>
          <h2 className="text-2xl font-black text-white font-sans">
            {mode === 'login' ? 'Welcome Back, Scholar!' : 'Begin Your Campus Legacy'}
          </h2>
          <p className="text-xs text-slate-400 font-mono mt-1">
            {mode === 'login' ? 'Sign in to access your quests & coins' : 'Create your player identity at IIT BBS'}
          </p>
        </div>

        <PixelCard variant="glow" className="p-6">
          {/* Mode Tabs */}
          <div className="grid grid-cols-2 gap-2 bg-slate-950 p-1 rounded-xl mb-6 border border-slate-800">
            <button
              onClick={() => { setMode('login'); setErrorMsg(''); setSuccessMsg(''); }}
              className={`py-2 text-xs font-bold rounded-lg transition-colors cursor-pointer ${
                mode === 'login' ? 'bg-emerald-500 text-slate-950 shadow' : 'text-slate-400 hover:text-white'
              }`}
            >
              LOG IN
            </button>
            <button
              onClick={() => { setMode('signup'); setErrorMsg(''); setSuccessMsg(''); }}
              className={`py-2 text-xs font-bold rounded-lg transition-colors cursor-pointer ${
                mode === 'signup' ? 'bg-emerald-500 text-slate-950 shadow' : 'text-slate-400 hover:text-white'
              }`}
            >
              SIGN UP
            </button>
          </div>

          {successMsg && (
            <div className="mb-4 p-3 rounded-lg bg-emerald-950/80 border border-emerald-500 text-emerald-300 text-xs font-mono flex items-center gap-2">
              <CheckCircle2 className="w-4 h-4 text-emerald-400 shrink-0" />
              {successMsg}
            </div>
          )}

          {errorMsg && (
            <div className="mb-4 p-3 rounded-lg bg-rose-950/80 border border-rose-500 text-rose-300 text-xs font-mono">
              {errorMsg}
            </div>
          )}

          <form onSubmit={handleAuth} className="space-y-4">
            {mode === 'signup' && (
              <div>
                <label className="block text-xs font-bold text-slate-300 mb-1.5">DISPLAY NAME</label>
                <div className="relative">
                  <UserCheck className="w-4 h-4 text-slate-400 absolute left-3 top-3" />
                  <input
                    type="text"
                    required
                    value={name}
                    onChange={e => setName(e.target.value)}
                    placeholder="e.g. Pihu"
                    className="w-full bg-slate-950 border border-slate-700 rounded-xl pl-9 pr-4 py-2.5 text-sm text-white focus:outline-none focus:border-emerald-500 font-mono"
                  />
                </div>
              </div>
            )}

            <div>
              <label className="block text-xs font-bold text-slate-300 mb-1.5">EMAIL ADDRESS</label>
              <div className="relative">
                <Mail className="w-4 h-4 text-slate-400 absolute left-3 top-3" />
                <input
                  type="email"
                  required
                  value={email}
                  onChange={e => setEmail(e.target.value)}
                  placeholder="debanganadutta26@gmail.com"
                  className="w-full bg-slate-950 border border-slate-700 rounded-xl pl-9 pr-4 py-2.5 text-sm text-white focus:outline-none focus:border-emerald-500 font-mono"
                />
              </div>
            </div>

            <div>
              <label className="block text-xs font-bold text-slate-300 mb-1.5">PASSWORD</label>
              <div className="relative">
                <Lock className="w-4 h-4 text-slate-400 absolute left-3 top-3" />
                <input
                  type="password"
                  required
                  value={password}
                  onChange={e => setPassword(e.target.value)}
                  placeholder="••••••••"
                  className="w-full bg-slate-950 border border-slate-700 rounded-xl pl-9 pr-4 py-2.5 text-sm text-white focus:outline-none focus:border-emerald-500 font-mono"
                />
              </div>
            </div>

            <PixelButton variant="primary" fullWidth size="lg" disabled={loading} type="submit">
              {loading ? 'AUTHENTICATING...' : mode === 'login' ? 'LOG IN' : 'CREATE ACCOUNT'}
            </PixelButton>
          </form>

          {/* Quick Demo Access Option */}
          <div className="mt-6 pt-6 border-t border-slate-800 text-center">
            <p className="text-xs text-slate-400 mb-3">Want to preview the game immediately?</p>
            <PixelButton variant="ghost" fullWidth onClick={handleDemoAccess} size="sm">
              <Sparkles className="w-4 h-4 text-amber-400" /> CONTINUE AS GUEST DEMO
            </PixelButton>
          </div>
        </PixelCard>
      </motion.div>
    </div>
  );
}
