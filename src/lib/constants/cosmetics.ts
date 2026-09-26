import { ShopItem, Badge } from '../types/game';

export const SHOP_SKINS: ShopItem[] = [
  {
    id: 'default_hoodie',
    name: 'Freshers Hoodie',
    type: 'skin',
    description: 'Cozy campus hoodie for late night assignment grinding.',
    price: 0,
    asset_key: 'hoodie_teal',
    rarity: 'common',
    previewColor: '#0d9488'
  },
  {
    id: 'gym_bro_tank',
    name: 'Gym Bro Tank',
    type: 'skin',
    description: 'Perfect for heavy squat sessions at the IIT BBS Gymkhana.',
    price: 150,
    asset_key: 'tank_crimson',
    rarity: 'rare',
    previewColor: '#dc2626'
  },
  {
    id: 'code_wizard_cloak',
    name: 'Code Wizard Cloak',
    type: 'skin',
    description: 'Glowing arcane robes infused with 1000+ LeetCode rating.',
    price: 300,
    asset_key: 'cloak_purple',
    rarity: 'epic',
    previewColor: '#8b5cf6'
  },
  {
    id: 'cyber_armor',
    name: 'Neon Cyber Armor',
    type: 'skin',
    description: 'Futuristic futuristic exoskeleton powered by pure focused aura.',
    price: 500,
    asset_key: 'armor_cyber',
    rarity: 'legendary',
    previewColor: '#06b6d4'
  },
  {
    id: 'campus_tux',
    name: 'Convocation Tux',
    type: 'skin',
    description: 'Dapper formal attire reserved for campus royalty and toppers.',
    price: 750,
    asset_key: 'tux_gold',
    rarity: 'legendary',
    previewColor: '#eab308'
  }
];

export const SHOP_BORDERS: ShopItem[] = [
  {
    id: 'default',
    name: 'Classic Pixel Border',
    type: 'border',
    description: 'Standard retro green avatar frame.',
    price: 0,
    asset_key: 'border_classic',
    rarity: 'common',
    previewGradient: 'from-emerald-500 to-teal-700'
  },
  {
    id: 'flame_border',
    name: 'Streak Flame Frame',
    type: 'border',
    description: 'Fiery animated border for high consistency scholars.',
    price: 200,
    asset_key: 'border_flame',
    rarity: 'rare',
    previewGradient: 'from-orange-500 via-amber-500 to-red-600'
  },
  {
    id: 'cyber_neon',
    name: 'Cyber Neon Glow',
    type: 'border',
    description: 'Ultra-bright cyan & magenta pulsing aura.',
    price: 350,
    asset_key: 'border_cyber',
    rarity: 'epic',
    previewGradient: 'from-cyan-400 via-fuchsia-500 to-indigo-600'
  },
  {
    id: 'gold_legend',
    name: 'Golden Champion Crest',
    type: 'border',
    description: 'Pure 24k gold pixel frame reserved for campus legends.',
    price: 600,
    asset_key: 'border_gold',
    rarity: 'legendary',
    previewGradient: 'from-yellow-300 via-amber-400 to-yellow-600'
  }
];

export const MAP_THEMES: ShopItem[] = [
  {
    id: 'classic',
    name: 'Classic Campus Day',
    type: 'theme',
    description: 'Sunlit pixel art view of IIT Bhubaneswar campus.',
    price: 0,
    asset_key: 'theme_classic',
    rarity: 'common',
    previewColor: '#0f172a'
  },
  {
    id: 'dark_cyberpunk',
    name: 'Cyberpunk Night City',
    type: 'theme',
    description: 'Neon illuminated campus under midnight rains.',
    price: 250,
    asset_key: 'theme_cyberpunk',
    rarity: 'rare',
    previewColor: '#1e1b4b'
  },
  {
    id: 'sunset_arcade',
    name: '80s Synthwave Sunset',
    type: 'theme',
    description: 'Vibrant synthwave sunset with glowing grid horizon.',
    price: 400,
    asset_key: 'theme_synthwave',
    rarity: 'epic',
    previewColor: '#4c1d95'
  }
];

export const BADGES_CATALOG: Badge[] = [
  {
    id: 'rich_kid',
    name: 'Rich Kid',
    description: 'Show off your massive coin fortune to the entire campus!',
    price: 500,
    asset_key: 'crown_gold',
    acquisition_type: 'shop',
    iconName: 'Crown'
  },
  {
    id: 'night_owl',
    name: 'Night Owl',
    description: 'Master of late midnight study sessions.',
    price: 150,
    asset_key: 'moon_star',
    acquisition_type: 'shop',
    iconName: 'Moon'
  },
  {
    id: 'gym_bro',
    name: 'Gym Bro',
    description: 'Lifts heavy at the SAC Gymkhana daily.',
    price: 200,
    asset_key: 'dumbbell',
    acquisition_type: 'shop',
    iconName: 'Dumbbell'
  },
  {
    id: 'code_wizard',
    name: 'Code Wizard',
    description: 'Solves complex DSA algorithms before breakfast.',
    price: 300,
    asset_key: 'wand_sparkles',
    acquisition_type: 'shop',
    iconName: 'Code'
  },
  {
    id: 'campus_legend',
    name: 'Campus Legend',
    description: 'The highest honor achievable at IIT Bhubaneswar.',
    price: 1000,
    asset_key: 'trophy_gold',
    acquisition_type: 'shop',
    iconName: 'Trophy'
  }
];
