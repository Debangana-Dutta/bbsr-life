'use client';

import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { Plus, CheckCircle2, Sparkles, Brain, Dumbbell, Target, Check, Calendar } from 'lucide-react';
import { useGame } from '@/lib/context/GameContext';
import { PixelCard } from '@/components/ui/PixelCard';
import { PixelButton } from '@/components/ui/PixelButton';
import { QuestCategory } from '@/lib/types/game';

export default function QuestsPage() {
  const { quests, createQuest, completeQuest } = useGame();

  const [activeTab, setActiveTab] = useState<'active' | 'completed'>('active');
  const [filterCategory, setFilterCategory] = useState<string>('all');
  const [showModal, setShowModal] = useState<boolean>(false);

  // Form State
  const [title, setTitle] = useState('');
  const [category, setCategory] = useState<QuestCategory>('intellect');
  const [customXp, setCustomXp] = useState(30);
  const [customCoins, setCustomCoins] = useState(20);

  const filteredQuests = quests.filter(q => {
    const matchesTab = activeTab === 'active' ? q.status === 'active' : q.status === 'completed';
    const matchesCategory = filterCategory === 'all' || q.category === filterCategory;
    return matchesTab && matchesCategory;
  });

  const handleCreateSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!title.trim()) return;
    createQuest(title, category, customXp, customCoins);
    setTitle('');
    setShowModal(false);
  };

  const getCategoryIcon = (cat: QuestCategory) => {
    switch (cat) {
      case 'intellect':
        return <Brain className="w-4 h-4 text-purple-400" />;
      case 'strength':
        return <Dumbbell className="w-4 h-4 text-rose-400" />;
      case 'focus':
        return <Target className="w-4 h-4 text-cyan-400" />;
      default:
        return <Sparkles className="w-4 h-4 text-emerald-400" />;
    }
  };

  return (
    <div className="space-y-6">
      {/* Header Bar */}
      <div className="flex flex-wrap items-center justify-between gap-4">
        <div>
          <h2 className="text-2xl font-black text-white font-sans flex items-center gap-2">
            <CheckCircle2 className="w-6 h-6 text-emerald-400" /> Quest Log & Daily Work
          </h2>
          <p className="text-xs text-slate-400 font-mono">
            Complete real-life tasks to earn XP, Coins & character stat boosts
          </p>
        </div>

        <PixelButton variant="primary" onClick={() => setShowModal(true)}>
          <Plus className="w-4 h-4" /> CREATE NEW QUEST
        </PixelButton>
      </div>

      {/* Tabs & Category Filter */}
      <div className="flex flex-wrap items-center justify-between gap-3 bg-slate-900/80 p-2 rounded-2xl border border-slate-800">
        <div className="flex gap-2">
          <button
            onClick={() => setActiveTab('active')}
            className={`px-4 py-2 rounded-xl text-xs font-bold transition-colors ${
              activeTab === 'active'
                ? 'bg-emerald-500 text-slate-950 font-black shadow-md'
                : 'text-slate-400 hover:text-white'
            }`}
          >
            ACTIVE QUESTS ({quests.filter(q => q.status === 'active').length})
          </button>
          <button
            onClick={() => setActiveTab('completed')}
            className={`px-4 py-2 rounded-xl text-xs font-bold transition-colors ${
              activeTab === 'completed'
                ? 'bg-emerald-500 text-slate-950 font-black shadow-md'
                : 'text-slate-400 hover:text-white'
            }`}
          >
            COMPLETED ({quests.filter(q => q.status === 'completed').length})
          </button>
        </div>

        <div className="flex items-center gap-2 overflow-x-auto">
          {['all', 'intellect', 'strength', 'focus'].map(cat => (
            <button
              key={cat}
              onClick={() => setFilterCategory(cat)}
              className={`px-3 py-1.5 rounded-lg text-xs font-mono uppercase transition-colors ${
                filterCategory === cat
                  ? 'bg-slate-800 text-emerald-400 border border-emerald-500/40'
                  : 'text-slate-400 hover:text-white'
              }`}
            >
              {cat}
            </button>
          ))}
        </div>
      </div>

      {/* Quest Cards Grid */}
      {filteredQuests.length === 0 ? (
        <PixelCard variant="dark" className="text-center py-12 space-y-3">
          <div className="w-12 h-12 rounded-full bg-slate-800 text-slate-500 mx-auto flex items-center justify-center">
            <CheckCircle2 className="w-6 h-6" />
          </div>
          <h4 className="text-base font-bold text-white">No Quests Found</h4>
          <p className="text-xs text-slate-400">
            {activeTab === 'active'
              ? 'You have finished all active quests! Create a new quest to keep your streak alive.'
              : 'No completed quest history yet.'}
          </p>
        </PixelCard>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {filteredQuests.map(quest => (
            <PixelCard key={quest.id} variant="default" className="p-5 space-y-4 flex flex-col justify-between">
              <div>
                <div className="flex items-center justify-between mb-2">
                  <span className="flex items-center gap-1.5 text-xs font-bold uppercase tracking-wider text-slate-300">
                    {getCategoryIcon(quest.category)} {quest.category}
                  </span>
                  <span className="text-[10px] font-mono text-slate-500 flex items-center gap-1">
                    <Calendar className="w-3 h-3" /> {quest.quest_date}
                  </span>
                </div>

                <h3 className="text-base font-bold text-white mb-1">{quest.title}</h3>
                {quest.description && (
                  <p className="text-xs text-slate-400 leading-relaxed mb-3">{quest.description}</p>
                )}
              </div>

              <div className="pt-3 border-t border-slate-800/80 flex items-center justify-between">
                <div className="flex items-center gap-3 text-xs font-mono font-bold">
                  <span className="text-emerald-400">+{quest.xp_reward} XP</span>
                  <span className="text-amber-400">+{quest.coin_reward} Coins</span>
                  <span className="text-purple-400 capitalize">
                    +{quest.stat_reward.amount || 1} {quest.stat_reward.stat}
                  </span>
                </div>

                {quest.status === 'active' ? (
                  <PixelButton variant="primary" size="sm" onClick={() => completeQuest(quest.id)}>
                    COMPLETE
                  </PixelButton>
                ) : (
                  <span className="px-3 py-1 rounded-full bg-emerald-500/20 text-emerald-400 text-xs font-bold flex items-center gap-1">
                    <Check className="w-3.5 h-3.5" /> DONE
                  </span>
                )}
              </div>
            </PixelCard>
          ))}
        </div>
      )}

      {/* Create Quest Modal */}
      {showModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-950/80 backdrop-blur-md">
          <motion.div
            initial={{ scale: 0.9, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            className="max-w-md w-full"
          >
            <PixelCard variant="glow" className="p-6">
              <h3 className="text-lg font-black text-white font-sans mb-4 flex items-center gap-2">
                <Sparkles className="w-5 h-5 text-emerald-400" /> Create Real-Life Quest
              </h3>

              <form onSubmit={handleCreateSubmit} className="space-y-4">
                <div>
                  <label className="block text-xs font-bold text-slate-300 mb-1.5">QUEST TITLE</label>
                  <input
                    type="text"
                    required
                    value={title}
                    onChange={e => setTitle(e.target.value)}
                    placeholder="e.g. Go to Gym, Study DSA for 1 hour"
                    className="w-full bg-slate-950 border border-slate-700 rounded-xl px-4 py-2.5 text-sm text-white focus:outline-none focus:border-emerald-500 font-mono"
                  />
                </div>

                <div>
                  <label className="block text-xs font-bold text-slate-300 mb-1.5">CATEGORY & STAT TYPE</label>
                  <div className="grid grid-cols-3 gap-2">
                    {[
                      { id: 'intellect', label: 'Intellect', icon: Brain },
                      { id: 'strength', label: 'Strength', icon: Dumbbell },
                      { id: 'focus', label: 'Focus', icon: Target }
                    ].map(cat => {
                      const Icon = cat.icon;
                      return (
                        <button
                          key={cat.id}
                          type="button"
                          onClick={() => setCategory(cat.id as QuestCategory)}
                          className={`p-3 rounded-xl border flex flex-col items-center gap-1.5 transition-colors ${
                            category === cat.id
                              ? 'bg-emerald-500/20 border-emerald-400 text-emerald-300'
                              : 'bg-slate-950 border-slate-800 text-slate-400'
                          }`}
                        >
                          <Icon className="w-4 h-4" />
                          <span className="text-xs font-bold">{cat.label}</span>
                        </button>
                      );
                    })}
                  </div>
                </div>

                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <label className="block text-xs font-bold text-slate-300 mb-1">XP REWARD</label>
                    <input
                      type="number"
                      min="10"
                      max="100"
                      value={customXp}
                      onChange={e => setCustomXp(Number(e.target.value))}
                      className="w-full bg-slate-950 border border-slate-700 rounded-xl px-3 py-2 text-sm text-emerald-400 font-mono font-bold"
                    />
                  </div>
                  <div>
                    <label className="block text-xs font-bold text-slate-300 mb-1">COIN REWARD</label>
                    <input
                      type="number"
                      min="5"
                      max="100"
                      value={customCoins}
                      onChange={e => setCustomCoins(Number(e.target.value))}
                      className="w-full bg-slate-950 border border-slate-700 rounded-xl px-3 py-2 text-sm text-amber-400 font-mono font-bold"
                    />
                  </div>
                </div>

                <div className="flex gap-3 pt-2">
                  <PixelButton variant="ghost" fullWidth onClick={() => setShowModal(false)} type="button">
                    CANCEL
                  </PixelButton>
                  <PixelButton variant="primary" fullWidth type="submit">
                    CREATE QUEST
                  </PixelButton>
                </div>
              </form>
            </PixelCard>
          </motion.div>
        </div>
      )}
    </div>
  );
}
