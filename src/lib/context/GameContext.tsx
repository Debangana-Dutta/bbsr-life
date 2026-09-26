'use client';

import React, { createContext, useContext, useState, useEffect } from 'react';
import { UserProfile, Quest, QuestCategory, AvatarConfig, LeaderboardEntry } from '../types/game';
import { soundFx } from '../utils/sound';
import { createClient } from '../supabase/client';
import { CAMPUS_LOCATIONS } from '../constants/mapMilestones';

interface LevelUpInfo {
  oldLevel: number;
  newLevel: number;
}

interface GameContextType {
  profile: UserProfile;
  quests: Quest[];
  inventory: string[]; // owned item IDs
  badges: string[]; // owned badge IDs
  equippedSkin: string;
  equippedBorder: string;
  equippedTheme: string;
  isMuted: boolean;
  levelUpData: LevelUpInfo | null;
  rewardClaimedData: { xp: number; coins: number; title: string; spotBuilt?: string; spotPercent?: number; spotCompleted?: boolean } | null;
  streakSavedNotice: boolean;
  dynamicLeaderboard: LeaderboardEntry[];
  
  // Actions
  setDisplayName: (name: string) => void;
  updateOnboarding: (gender: string, weight: number, config: AvatarConfig) => void;
  createQuest: (title: string, category: QuestCategory, xpReward?: number, coinReward?: number) => void;
  completeQuest: (questId: string) => Promise<boolean>;
  buyShopItem: (itemId: string, itemType: 'skin' | 'border' | 'theme' | 'badge', price: number) => Promise<{ success: boolean; message: string }>;
  equipItem: (itemId: string, itemType: 'skin' | 'border' | 'theme' | 'badge') => void;
  saveStreak: () => Promise<{ success: boolean; message: string }>;
  toggleMute: () => void;
  clearLevelUpModal: () => void;
  clearRewardModal: () => void;
  getLeaderboard: () => LeaderboardEntry[];
  logout: () => Promise<void>;
  resetDemoData: () => void;
}

const DEFAULT_AVATAR: AvatarConfig = {
  skinColor: '#f5c096',
  hairStyle: 'short',
  hairColor: '#2c1b18',
  outfit: 'default_hoodie',
  accessory: 'none',
  border: 'default',
  weightCategory: 'fit'
};

// Default Day 0 & 120 Starter Points on Signup with Endless Spot Building Loop
const DEFAULT_PROFILE: UserProfile = {
  id: 'user_default',
  display_name: 'XIM Scholar',
  gender: 'female',
  weight: 55,
  avatar_config: DEFAULT_AVATAR,
  level: 1,
  xp: 0,
  coins: 120, // 120 starter points credited upon signup
  intellect: 10,
  strength: 10,
  focus: 10,
  streak: 0, // Default Day 0 initial streak
  longest_streak: 0,
  last_active_date: new Date().toISOString().split('T')[0],
  equipped_skin: 'default_hoodie',
  equipped_border: 'default',
  equipped_theme: 'classic',
  onboarding_completed: false,
  spot_build_progress: { xim_main_gate: 0 },
  current_spot_index: 0,
  prestige_loop: 1,
  created_at: new Date().toISOString(),
  updated_at: new Date().toISOString()
};

const INITIAL_QUESTS: Quest[] = [
  {
    id: 'q1',
    user_id: 'user_default',
    title: 'Attend Morning Lecture at XIM LHC',
    description: 'Be on time at the Lecture Hall Complex with notebook ready.',
    category: 'intellect',
    xp_reward: 35,
    coin_reward: 20,
    stat_reward: { stat: 'intellect', amount: 2 },
    status: 'active',
    quest_date: new Date().toISOString().split('T')[0],
    created_at: new Date().toISOString()
  },
  {
    id: 'q2',
    user_id: 'user_default',
    title: 'Workout Session at XIM Sports Complex',
    description: '45 minutes of fitness & strength training at the Sports Complex.',
    category: 'strength',
    xp_reward: 30,
    coin_reward: 25,
    stat_reward: { stat: 'strength', amount: 2 },
    status: 'active',
    quest_date: new Date().toISOString().split('T')[0],
    created_at: new Date().toISOString()
  },
  {
    id: 'q3',
    user_id: 'user_default',
    title: 'Study at XIM Central Library',
    description: '2 hours of deep research & study in the Learning Commons.',
    category: 'intellect',
    xp_reward: 50,
    coin_reward: 40,
    stat_reward: { stat: 'intellect', amount: 3 },
    status: 'active',
    quest_date: new Date().toISOString().split('T')[0],
    created_at: new Date().toISOString()
  }
];

const GameContext = createContext<GameContextType | undefined>(undefined);

export const GameProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [profile, setProfile] = useState<UserProfile>(DEFAULT_PROFILE);
  const [quests, setQuests] = useState<Quest[]>(INITIAL_QUESTS);
  const [inventory, setInventory] = useState<string[]>(['default_hoodie', 'default', 'classic']);
  const [badges, setBadges] = useState<string[]>([]);
  const [isMuted, setIsMuted] = useState<boolean>(false);
  const [levelUpData, setLevelUpData] = useState<LevelUpInfo | null>(null);
  const [rewardClaimedData, setRewardClaimedData] = useState<{ xp: number; coins: number; title: string; spotBuilt?: string; spotPercent?: number; spotCompleted?: boolean } | null>(null);
  const [streakSavedNotice, setStreakSavedNotice] = useState<boolean>(false);
  const [dynamicLeaderboard, setDynamicLeaderboard] = useState<LeaderboardEntry[]>([]);

  // Sync Supabase Auth User profile on mount / auth change
  useEffect(() => {
    const supabase = createClient();
    supabase.auth.getUser().then(({ data }) => {
      if (data?.user) {
        const userMetaName = data.user.user_metadata?.display_name || data.user.email?.split('@')[0];
        if (userMetaName) {
          setProfile(prev => ({
            ...prev,
            id: data.user.id,
            display_name: userMetaName
          }));
        }
      }
    });

    const { data: authListener } = supabase.auth.onAuthStateChange((_event, session) => {
      if (session?.user) {
        const userMetaName = session.user.user_metadata?.display_name || session.user.email?.split('@')[0];
        if (userMetaName) {
          setProfile(prev => ({
            ...prev,
            id: session.user.id,
            display_name: userMetaName
          }));
        }
      }
    });

    return () => {
      authListener.subscription.unsubscribe();
    };
  }, []);

  // Fetch real dynamic leaderboard from Supabase profiles table
  const fetchDynamicLeaderboard = async () => {
    try {
      const supabase = createClient();
      const { data, error } = await supabase
        .from('profiles')
        .select('id, display_name, level, coins, streak, avatar_config, equipped_border')
        .order('coins', { ascending: false })
        .limit(20);

      if (!error && data && data.length > 0) {
        const mappedEntries: LeaderboardEntry[] = data.map((p: Record<string, unknown>) => ({
          id: (p.id as string) || 'p_' + Math.random(),
          display_name: (p.display_name as string) || 'XIM Scholar',
          level: (p.level as number) || 1,
          coins: (p.coins as number) || 120,
          streak: (p.streak as number) || 0,
          avatar_config: (p.avatar_config as AvatarConfig) || DEFAULT_AVATAR,
          equipped_border: (p.equipped_border as string) || 'default',
          badges: []
        }));
        setDynamicLeaderboard(mappedEntries);
      }
    } catch {
      // Ignore network errors
    }
  };

  useEffect(() => {
    fetchDynamicLeaderboard();
  }, [profile.coins, profile.level]);

  // Load state from localStorage on mount
  useEffect(() => {
    if (typeof window === 'undefined') return;

    try {
      const savedProfile = localStorage.getItem('bbsr_life_profile');
      const savedQuests = localStorage.getItem('bbsr_life_quests');
      const savedInventory = localStorage.getItem('bbsr_life_inventory');
      const savedBadges = localStorage.getItem('bbsr_life_badges');

      if (savedProfile) {
        const parsed = JSON.parse(savedProfile);
        setProfile(prev => ({ ...prev, ...parsed }));
      }
      if (savedQuests) setQuests(JSON.parse(savedQuests));
      if (savedInventory) setInventory(JSON.parse(savedInventory));
      if (savedBadges) setBadges(JSON.parse(savedBadges));
    } catch (err) {
      console.warn('Could not read saved game state from localStorage', err);
    }
  }, []);

  // Save changes to localStorage
  useEffect(() => {
    if (typeof window === 'undefined') return;
    try {
      localStorage.setItem('bbsr_life_profile', JSON.stringify(profile));
      localStorage.setItem('bbsr_life_quests', JSON.stringify(quests));
      localStorage.setItem('bbsr_life_inventory', JSON.stringify(inventory));
      localStorage.setItem('bbsr_life_badges', JSON.stringify(badges));
    } catch (err) {
      console.warn('Could not save game state to localStorage', err);
    }
  }, [profile, quests, inventory, badges]);

  // Set Display Name directly on fresh signup
  const setDisplayName = (name: string) => {
    if (!name.trim()) return;
    setProfile(prev => ({
      ...prev,
      display_name: name.trim(),
      level: 1,
      xp: 0,
      coins: 120, // 120 starter points credited upon signup
      intellect: 10,
      strength: 10,
      focus: 10,
      streak: 0, // Day 0 initial streak
      longest_streak: 0,
      spot_build_progress: { xim_main_gate: 0 },
      current_spot_index: 0,
      prestige_loop: 1,
      updated_at: new Date().toISOString()
    }));
    setQuests(INITIAL_QUESTS);
    setInventory(['default_hoodie', 'default', 'classic']);
    setBadges([]);
  };

  // Update Onboarding Profile
  const updateOnboarding = (gender: string, weight: number, config: AvatarConfig) => {
    let weightCat: AvatarConfig['weightCategory'] = 'balanced';
    if (weight < 55) weightCat = 'fit';
    else if (weight >= 55 && weight <= 75) weightCat = 'athletic';
    else weightCat = 'stocky';

    const updatedConfig: AvatarConfig = {
      ...config,
      weightCategory: weightCat
    };

    setProfile(prev => ({
      ...prev,
      gender,
      weight,
      avatar_config: updatedConfig,
      onboarding_completed: true,
      updated_at: new Date().toISOString()
    }));
  };

  // Create a new Quest
  const createQuest = (title: string, category: QuestCategory, customXp?: number, customCoins?: number) => {
    soundFx.playButtonClick();
    const xp = customXp || (category === 'intellect' ? 40 : category === 'strength' ? 35 : 30);
    const coins = customCoins || (category === 'intellect' ? 25 : category === 'strength' ? 20 : 15);
    const statKey = category === 'intellect' ? 'intellect' : category === 'strength' ? 'strength' : 'focus';

    const newQuest: Quest = {
      id: 'quest_' + Date.now(),
      user_id: profile.id,
      title,
      category,
      xp_reward: xp,
      coin_reward: coins,
      stat_reward: { stat: statKey, amount: 2 },
      status: 'active',
      quest_date: new Date().toISOString().split('T')[0],
      created_at: new Date().toISOString()
    };

    setQuests(prev => [newQuest, ...prev]);
  };

  // Complete Quest & Award Incremental Building Progress + Idempotent Rewards
  const completeQuest = async (questId: string): Promise<boolean> => {
    const targetQuest = quests.find(q => q.id === questId);
    if (!targetQuest || targetQuest.status === 'completed') {
      return false;
    }

    soundFx.playQuestComplete();
    soundFx.playCoin();

    // Calculate XP & Level progression
    let currentXp = profile.xp + targetQuest.xp_reward;
    let currentLevel = profile.level;
    let xpNeeded = currentLevel * 100;
    let didLevelUp = false;

    while (currentXp >= xpNeeded) {
      currentXp -= xpNeeded;
      currentLevel += 1;
      xpNeeded = currentLevel * 100;
      didLevelUp = true;
    }

    // Calculate Incremental Building Progress (+25% per completed quest)
    const activeIdx = profile.current_spot_index ?? 0;
    const activeSpot = CAMPUS_LOCATIONS[activeIdx % CAMPUS_LOCATIONS.length];
    const currentProgressMap = profile.spot_build_progress || {};
    const oldBuildPct = currentProgressMap[activeSpot.id] || 0;
    const newBuildPct = Math.min(100, oldBuildPct + 25);
    const isSpotCompleted = newBuildPct >= 100;

    let nextSpotIdx = activeIdx;
    let nextPrestige = profile.prestige_loop || 1;
    const updatedProgressMap = { ...currentProgressMap, [activeSpot.id]: newBuildPct };

    if (isSpotCompleted) {
      nextSpotIdx = activeIdx + 1;
      if (nextSpotIdx >= CAMPUS_LOCATIONS.length) {
        nextSpotIdx = 0;
        nextPrestige += 1;
      }
    }

    // Update character stats & streak on quest completion
    const statToBoost = targetQuest.stat_reward.stat;
    const boostAmt = targetQuest.stat_reward.amount || 1;
    const newStreak = profile.streak === 0 ? 1 : profile.streak;

    setProfile(prev => ({
      ...prev,
      level: currentLevel,
      xp: currentXp,
      coins: prev.coins + targetQuest.coin_reward,
      intellect: statToBoost === 'intellect' ? prev.intellect + boostAmt : prev.intellect,
      strength: statToBoost === 'strength' ? prev.strength + boostAmt : prev.strength,
      focus: statToBoost === 'focus' ? prev.focus + boostAmt : prev.focus,
      streak: newStreak,
      longest_streak: Math.max(prev.longest_streak, newStreak),
      spot_build_progress: updatedProgressMap,
      current_spot_index: nextSpotIdx,
      prestige_loop: nextPrestige,
      updated_at: new Date().toISOString()
    }));

    // Update quest status
    setQuests(prev =>
      prev.map(q =>
        q.id === questId
          ? { ...q, status: 'completed', completed_at: new Date().toISOString() }
          : q
      )
    );

    // Show Reward Popup with Building Progress
    setRewardClaimedData({
      xp: targetQuest.xp_reward,
      coins: targetQuest.coin_reward,
      title: targetQuest.title,
      spotBuilt: activeSpot.name,
      spotPercent: newBuildPct,
      spotCompleted: isSpotCompleted
    });

    if (didLevelUp) {
      soundFx.playLevelUp();
      setLevelUpData({
        oldLevel: profile.level,
        newLevel: currentLevel
      });
    }

    return true;
  };

  // Buy Shop Item (Skin, Border, Theme, Badge)
  const buyShopItem = async (itemId: string, itemType: 'skin' | 'border' | 'theme' | 'badge', price: number) => {
    soundFx.playButtonClick();

    // Check if already owned
    const isOwned = itemType === 'badge' ? badges.includes(itemId) : inventory.includes(itemId);
    if (isOwned) {
      return { success: false, message: 'You already own this item!' };
    }

    // Check balance
    if (profile.coins < price) {
      return { success: false, message: `Insufficient Coins! You need ${price - profile.coins} more coins.` };
    }

    // Deduct coins & add to inventory
    setProfile(prev => ({
      ...prev,
      coins: prev.coins - price,
      updated_at: new Date().toISOString()
    }));

    if (itemType === 'badge') {
      setBadges(prev => [...prev, itemId]);
    } else {
      setInventory(prev => [...prev, itemId]);
    }

    soundFx.playPurchase();
    return { success: true, message: 'Item purchased successfully!' };
  };

  // Equip Item
  const equipItem = (itemId: string, itemType: 'skin' | 'border' | 'theme' | 'badge') => {
    soundFx.playButtonClick();

    setProfile(prev => {
      const updatedConfig = { ...prev.avatar_config };

      if (itemType === 'skin') {
        updatedConfig.outfit = itemId;
        return { ...prev, equipped_skin: itemId, avatar_config: updatedConfig };
      } else if (itemType === 'border') {
        updatedConfig.border = itemId;
        return { ...prev, equipped_border: itemId, avatar_config: updatedConfig };
      } else if (itemType === 'theme') {
        return { ...prev, equipped_theme: itemId };
      }
      return prev;
    });
  };

  // Save Streak for 50 Coins
  const saveStreak = async () => {
    soundFx.playButtonClick();
    if (profile.coins < 50) {
      return { success: false, message: 'You need at least 50 Coins to save your streak!' };
    }

    setProfile(prev => ({
      ...prev,
      coins: prev.coins - 50,
      streak: prev.streak + 1,
      longest_streak: Math.max(prev.longest_streak, prev.streak + 1),
      updated_at: new Date().toISOString()
    }));

    soundFx.playPurchase();
    setStreakSavedNotice(true);
    setTimeout(() => setStreakSavedNotice(false), 4000);
    return { success: true, message: 'Streak preserved! 50 Coins spent.' };
  };

  const toggleMute = () => {
    const muted = soundFx.toggleMute();
    setIsMuted(muted);
  };

  const clearLevelUpModal = () => setLevelUpData(null);
  const clearRewardModal = () => setRewardClaimedData(null);

  // Dynamic Leaderboard: Uses real signed-up users only
  const getLeaderboard = (): LeaderboardEntry[] => {
    const currentEntry: LeaderboardEntry = {
      id: profile.id,
      display_name: profile.display_name,
      level: profile.level,
      coins: profile.coins,
      streak: profile.streak,
      avatar_config: profile.avatar_config,
      equipped_border: profile.equipped_border,
      badges
    };

    // Filter out duplicate current profile entry if present in dynamicLeaderboard
    const otherEntries = dynamicLeaderboard.filter(e => e.display_name !== profile.display_name && e.id !== profile.id);
    const combined = [currentEntry, ...otherEntries];

    return combined.sort((a, b) => b.coins - a.coins);
  };

  const logout = async () => {
    soundFx.playButtonClick();
    try {
      const supabase = createClient();
      await supabase.auth.signOut();
    } catch (err) {
      console.warn('Signout error', err);
    }
    setProfile(DEFAULT_PROFILE);
    if (typeof window !== 'undefined') {
      localStorage.removeItem('bbsr_life_profile');
    }
  };

  const resetDemoData = () => {
    setProfile(DEFAULT_PROFILE);
    setQuests(INITIAL_QUESTS);
    setInventory(['default_hoodie', 'default', 'classic']);
    setBadges([]);
    localStorage.clear();
  };

  return (
    <GameContext.Provider
      value={{
        profile,
        quests,
        inventory,
        badges,
        equippedSkin: profile.equipped_skin,
        equippedBorder: profile.equipped_border,
        equippedTheme: profile.equipped_theme,
        isMuted,
        levelUpData,
        rewardClaimedData,
        streakSavedNotice,
        dynamicLeaderboard,
        setDisplayName,
        updateOnboarding,
        createQuest,
        completeQuest,
        buyShopItem,
        equipItem,
        saveStreak,
        toggleMute,
        clearLevelUpModal,
        clearRewardModal,
        getLeaderboard,
        logout,
        resetDemoData
      }}
    >
      {children}
    </GameContext.Provider>
  );
};

export const useGame = () => {
  const context = useContext(GameContext);
  if (!context) {
    throw new Error('useGame must be used within a GameProvider');
  }
  return context;
};
