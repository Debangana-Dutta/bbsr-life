export type QuestCategory = 'intellect' | 'strength' | 'focus' | 'general';
export type QuestStatus = 'active' | 'completed' | 'archived';

export interface AvatarConfig {
  skinColor: string;
  hairStyle: 'short' | 'spiky' | 'curly' | 'long' | 'cap' | 'dreads';
  hairColor: string;
  outfit: string; // skin id
  accessory: string;
  border: string; // border id
  weightCategory: 'fit' | 'athletic' | 'stocky' | 'balanced';
}

export interface UserProfile {
  id: string;
  display_name: string;
  gender: string;
  weight: number;
  avatar_config: AvatarConfig;
  level: number;
  xp: number;
  coins: number;
  intellect: number;
  strength: number;
  focus: number;
  streak: number;
  longest_streak: number;
  last_active_date: string;
  equipped_skin: string;
  equipped_border: string;
  equipped_theme: string;
  onboarding_completed: boolean;
  spot_build_progress?: Record<string, number>; // spotId -> % built (0..100)
  current_spot_index?: number; // 0..15 (active building spot index)
  prestige_loop?: number; // endless loop count (Era 1, Era 2, etc.)
  created_at: string;
  updated_at: string;
}

export interface Quest {
  id: string;
  user_id: string;
  title: string;
  description?: string;
  category: QuestCategory;
  xp_reward: number;
  coin_reward: number;
  stat_reward: {
    stat: 'intellect' | 'strength' | 'focus';
    amount: number;
  };
  status: QuestStatus;
  quest_date: string;
  completed_at?: string;
  created_at: string;
}

export interface ShopItem {
  id: string;
  name: string;
  type: 'skin' | 'border' | 'theme' | 'badge';
  description: string;
  price: number;
  asset_key: string;
  rarity: 'common' | 'rare' | 'epic' | 'legendary';
  previewColor?: string;
  previewGradient?: string;
}

export interface Badge {
  id: string;
  name: string;
  description: string;
  price: number;
  asset_key: string;
  acquisition_type: 'shop' | 'level' | 'streak' | 'achievement';
  iconName: string;
}

export interface CampusLocation {
  id: string;
  key: string;
  name: string;
  shortName: string;
  requiredLevel: number;
  description: string;
  lore: string;
  statBonus: string;
  coordinates: { x: number; y: number }; // percentage position on map
  icon: string;
  color: string;
}

export interface LeaderboardEntry {
  id: string;
  display_name: string;
  level: number;
  coins: number;
  streak: number;
  avatar_config: AvatarConfig;
  equipped_border: string;
  badges: string[];
}
