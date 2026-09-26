-- BBSR LIFE - Supabase Database Schema & RLS Policies
-- Compatible with PostgreSQL 15+ and Supabase Auth

-- Enable UUID extension if not enabled
CREATE EXTENSION IF NOT EXISTS "uuid-ossp";

-- 1. PROFILES TABLE
CREATE TABLE IF NOT EXISTS public.profiles (
    id UUID PRIMARY KEY REFERENCES auth.users(id) ON DELETE CASCADE,
    display_name TEXT NOT NULL DEFAULT 'Campus Scholar',
    gender TEXT DEFAULT 'other',
    weight NUMERIC DEFAULT 65.0,
    avatar_config JSONB NOT NULL DEFAULT '{
        "skinColor": "#f5c096",
        "hairStyle": "short",
        "hairColor": "#2c1b18",
        "outfit": "default_hoodie",
        "accessory": "none",
        "border": "default",
        "weightCategory": "normal"
    }'::jsonb,
    level INTEGER NOT NULL DEFAULT 1,
    xp INTEGER NOT NULL DEFAULT 0,
    coins INTEGER NOT NULL DEFAULT 100,
    intellect INTEGER NOT NULL DEFAULT 10,
    strength INTEGER NOT NULL DEFAULT 10,
    focus INTEGER NOT NULL DEFAULT 10,
    streak INTEGER NOT NULL DEFAULT 1,
    longest_streak INTEGER NOT NULL DEFAULT 1,
    last_active_date DATE DEFAULT CURRENT_DATE,
    equipped_skin TEXT DEFAULT 'default_hoodie',
    equipped_border TEXT DEFAULT 'default',
    equipped_theme TEXT DEFAULT 'classic',
    onboarding_completed BOOLEAN DEFAULT FALSE,
    created_at TIMESTAMPTZ DEFAULT NOW(),
    updated_at TIMESTAMPTZ DEFAULT NOW()
);

-- 2. QUESTS TABLE
CREATE TABLE IF NOT EXISTS public.quests (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    user_id UUID NOT NULL REFERENCES public.profiles(id) ON DELETE CASCADE,
    title TEXT NOT NULL,
    description TEXT,
    category TEXT NOT NULL CHECK (category IN ('intellect', 'strength', 'focus', 'general')),
    xp_reward INTEGER NOT NULL DEFAULT 25,
    coin_reward INTEGER NOT NULL DEFAULT 15,
    stat_reward JSONB NOT NULL DEFAULT '{"stat": "intellect", "amount": 1}'::jsonb,
    status TEXT NOT NULL DEFAULT 'active' CHECK (status IN ('active', 'completed', 'archived')),
    quest_date DATE DEFAULT CURRENT_DATE,
    completed_at TIMESTAMPTZ,
    created_at TIMESTAMPTZ DEFAULT NOW()
);

-- 3. QUEST COMPLETIONS (Idempotency ledger)
CREATE TABLE IF NOT EXISTS public.quest_completions (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    quest_id UUID NOT NULL REFERENCES public.quests(id) ON DELETE CASCADE,
    user_id UUID NOT NULL REFERENCES public.profiles(id) ON DELETE CASCADE,
    xp_granted INTEGER NOT NULL,
    coins_granted INTEGER NOT NULL,
    completed_at TIMESTAMPTZ DEFAULT NOW(),
    CONSTRAINT unique_quest_user UNIQUE (quest_id, user_id)
);

-- 4. INVENTORY TABLE
CREATE TABLE IF NOT EXISTS public.inventory (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    user_id UUID NOT NULL REFERENCES public.profiles(id) ON DELETE CASCADE,
    item_id TEXT NOT NULL,
    item_type TEXT NOT NULL CHECK (item_type IN ('skin', 'border', 'theme', 'badge')),
    purchased_at TIMESTAMPTZ DEFAULT NOW(),
    equipped BOOLEAN DEFAULT FALSE,
    CONSTRAINT unique_user_item UNIQUE (user_id, item_id)
);

-- 5. BADGES CATALOG TABLE
CREATE TABLE IF NOT EXISTS public.badges (
    id TEXT PRIMARY KEY,
    name TEXT NOT NULL,
    description TEXT NOT NULL,
    price INTEGER NOT NULL DEFAULT 0,
    asset_key TEXT NOT NULL,
    acquisition_type TEXT NOT NULL CHECK (acquisition_type IN ('shop', 'level', 'streak', 'achievement'))
);

-- 6. USER BADGES TABLE
CREATE TABLE IF NOT EXISTS public.user_badges (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    user_id UUID NOT NULL REFERENCES public.profiles(id) ON DELETE CASCADE,
    badge_id TEXT NOT NULL REFERENCES public.badges(id) ON DELETE CASCADE,
    purchased_at TIMESTAMPTZ DEFAULT NOW(),
    equipped BOOLEAN DEFAULT FALSE,
    CONSTRAINT unique_user_badge UNIQUE (user_id, badge_id)
);

-- 7. COIN TRANSACTIONS (Auditable Ledger)
CREATE TABLE IF NOT EXISTS public.coin_transactions (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    user_id UUID NOT NULL REFERENCES public.profiles(id) ON DELETE CASCADE,
    amount INTEGER NOT NULL,
    transaction_type TEXT NOT NULL CHECK (transaction_type IN ('quest_reward', 'shop_purchase', 'streak_save', 'onboarding_bonus')),
    reference_id TEXT,
    description TEXT,
    created_at TIMESTAMPTZ DEFAULT NOW()
);

-- 8. MAP PROGRESS TABLE
CREATE TABLE IF NOT EXISTS public.map_progress (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    user_id UUID NOT NULL REFERENCES public.profiles(id) ON DELETE CASCADE,
    location_key TEXT NOT NULL,
    unlocked_at TIMESTAMPTZ DEFAULT NOW(),
    CONSTRAINT unique_user_location UNIQUE (user_id, location_key)
);

-- 9. STREAK EVENTS TABLE
CREATE TABLE IF NOT EXISTS public.streak_events (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    user_id UUID NOT NULL REFERENCES public.profiles(id) ON DELETE CASCADE,
    event_date DATE NOT NULL DEFAULT CURRENT_DATE,
    status TEXT NOT NULL CHECK (status IN ('completed', 'missed', 'saved')),
    saved_with_coins BOOLEAN DEFAULT FALSE,
    created_at TIMESTAMPTZ DEFAULT NOW()
);

-- SEED BADGES DATA
INSERT INTO public.badges (id, name, description, price, asset_key, acquisition_type)
VALUES 
    ('rich_kid', 'Rich Kid', 'Flex your wealth with 500 Coins badge', 500, 'crown_gold', 'shop'),
    ('night_owl', 'Night Owl', 'Study late into the midnight hours', 150, 'moon_star', 'shop'),
    ('gym_bro', 'Gym Bro', 'Consistency at the XIM BBS Gymkhana', 200, 'dumbbell', 'shop'),
    ('code_wizard', 'Code Wizard', 'Mastered Data Structures & Algorithms', 300, 'wand_sparkles', 'shop'),
    ('campus_legend', 'Campus Legend', 'Reached Level 10 at XIM Bhubaneswar', 1000, 'trophy_gold', 'shop')
ON CONFLICT (id) DO NOTHING;

-- ROW LEVEL SECURITY (RLS) POLICIES
ALTER TABLE public.profiles ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.quests ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.quest_completions ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.inventory ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.user_badges ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.coin_transactions ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.map_progress ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.streak_events ENABLE ROW LEVEL SECURITY;

-- Profiles: Users can select all profiles (for leaderboard), but edit only their own
CREATE POLICY "Public profiles are viewable by everyone" ON public.profiles FOR SELECT USING (true);
CREATE POLICY "Users can update own profile" ON public.profiles FOR UPDATE USING (auth.uid() = id);

-- Quests: Users access only their own quests
CREATE POLICY "Users can CRUD own quests" ON public.quests FOR ALL USING (auth.uid() = user_id);

-- Quest Completions: Users insert/read own completions
CREATE POLICY "Users can manage own quest completions" ON public.quest_completions FOR ALL USING (auth.uid() = user_id);

-- Inventory: Users manage own inventory
CREATE POLICY "Users view and manage own inventory" ON public.inventory FOR ALL USING (auth.uid() = user_id);

-- User Badges: Users manage own badges
CREATE POLICY "Users view own badges" ON public.user_badges FOR ALL USING (auth.uid() = user_id);

-- Coin Transactions: Read-only for user
CREATE POLICY "Users view own coin transactions" ON public.coin_transactions FOR SELECT USING (auth.uid() = user_id);

-- Map Progress: Users manage own map unlocks
CREATE POLICY "Users manage own map progress" ON public.map_progress FOR ALL USING (auth.uid() = user_id);

-- Streak Events: Users manage own streak events
CREATE POLICY "Users manage own streak events" ON public.streak_events FOR ALL USING (auth.uid() = user_id);

-- ATOMIC STORED PROCEDURES (RPCs) FOR DATA INTEGRITY

-- RPC: Claim Quest Reward Idempotently
CREATE OR REPLACE FUNCTION public.claim_quest_reward(p_quest_id UUID)
RETURNS JSONB
LANGUAGE plpgsql
SECURITY DEFINER
AS $$
DECLARE
    v_user_id UUID;
    v_quest RECORD;
    v_new_xp INTEGER;
    v_new_level INTEGER;
    v_new_coins INTEGER;
    v_xp_needed INTEGER;
    v_stat_type TEXT;
    v_stat_amt INTEGER;
    v_already_completed BOOLEAN;
BEGIN
    v_user_id := auth.uid();
    IF v_user_id IS NULL THEN
        RAISE EXCEPTION 'Not authenticated';
    END IF;

    -- Check if quest exists and belongs to user
    SELECT * INTO v_quest FROM public.quests WHERE id = p_quest_id AND user_id = v_user_id;
    IF v_quest IS NULL THEN
        RAISE EXCEPTION 'Quest not found';
    END IF;

    -- Check idempotency
    SELECT EXISTS(
        SELECT 1 FROM public.quest_completions WHERE quest_id = p_quest_id AND user_id = v_user_id
    ) INTO v_already_completed;

    IF v_already_completed THEN
        RAISE EXCEPTION 'Quest reward already claimed!';
    END IF;

    -- Record completion
    INSERT INTO public.quest_completions (quest_id, user_id, xp_granted, coins_granted)
    VALUES (p_quest_id, v_user_id, v_quest.xp_reward, v_quest.coin_reward);

    -- Update quest status
    UPDATE public.quests SET status = 'completed', completed_at = NOW() WHERE id = p_quest_id;

    -- Fetch current user profile
    SELECT level, xp, coins INTO v_new_level, v_new_xp, v_new_coins FROM public.profiles WHERE id = v_user_id;

    v_new_xp := v_new_xp + v_quest.xp_reward;
    v_new_coins := v_new_coins + v_quest.coin_reward;

    -- Level calculation: level up if XP >= level * 100
    v_xp_needed := v_new_level * 100;
    WHILE v_new_xp >= v_xp_needed LOOP
        v_new_xp := v_new_xp - v_xp_needed;
        v_new_level := v_new_level + 1;
        v_xp_needed := v_new_level * 100;
    END LOOP;

    -- Extract stat reward
    v_stat_type := v_quest.stat_reward->>'stat';
    v_stat_amt := COALESCE((v_quest.stat_reward->>'amount')::INTEGER, 1);

    -- Update Profile
    UPDATE public.profiles
    SET level = v_new_level,
        xp = v_new_xp,
        coins = v_new_coins,
        intellect = CASE WHEN v_stat_type = 'intellect' THEN intellect + v_stat_amt ELSE intellect END,
        strength = CASE WHEN v_stat_type = 'strength' THEN strength + v_stat_amt ELSE strength END,
        focus = CASE WHEN v_stat_type = 'focus' THEN focus + v_stat_amt ELSE focus END,
        updated_at = NOW()
    WHERE id = v_user_id;

    -- Log transaction
    INSERT INTO public.coin_transactions (user_id, amount, transaction_type, reference_id, description)
    VALUES (v_user_id, v_quest.coin_reward, 'quest_reward', p_quest_id::TEXT, 'Reward for completing quest: ' || v_quest.title);

    RETURN jsonb_build_object(
        'success', true,
        'xp_granted', v_quest.xp_reward,
        'coins_granted', v_quest.coin_reward,
        'new_level', v_new_level,
        'new_xp', v_new_xp,
        'new_coins', v_new_coins
    );
END;
$$;

-- RPC: Buy Shop Item Atomically
CREATE OR REPLACE FUNCTION public.buy_shop_item(p_item_id TEXT, p_item_type TEXT, p_price INTEGER)
RETURNS JSONB
LANGUAGE plpgsql
SECURITY DEFINER
AS $$
DECLARE
    v_user_id UUID;
    v_current_coins INTEGER;
    v_already_owned BOOLEAN;
BEGIN
    v_user_id := auth.uid();
    IF v_user_id IS NULL THEN RAISE EXCEPTION 'Not authenticated'; END IF;

    SELECT coins INTO v_current_coins FROM public.profiles WHERE id = v_user_id;

    IF v_current_coins < p_price THEN
        RAISE EXCEPTION 'Insufficient coins!';
    END IF;

    IF p_item_type = 'badge' THEN
        SELECT EXISTS(SELECT 1 FROM public.user_badges WHERE user_id = v_user_id AND badge_id = p_item_id) INTO v_already_owned;
        IF v_already_owned THEN RAISE EXCEPTION 'Badge already owned!'; END IF;

        INSERT INTO public.user_badges (user_id, badge_id) VALUES (v_user_id, p_item_id);
    ELSE
        SELECT EXISTS(SELECT 1 FROM public.inventory WHERE user_id = v_user_id AND item_id = p_item_id) INTO v_already_owned;
        IF v_already_owned THEN RAISE EXCEPTION 'Item already owned!'; END IF;

        INSERT INTO public.inventory (user_id, item_id, item_type) VALUES (v_user_id, p_item_id, p_item_type);
    END IF;

    -- Deduct coins
    UPDATE public.profiles SET coins = coins - p_price, updated_at = NOW() WHERE id = v_user_id;

    -- Record transaction
    INSERT INTO public.coin_transactions (user_id, amount, transaction_type, reference_id, description)
    VALUES (v_user_id, -p_price, 'shop_purchase', p_item_id, 'Purchased ' || p_item_type || ': ' || p_item_id);

    RETURN jsonb_build_object('success', true, 'remaining_coins', v_current_coins - p_price);
END;
$$;

-- RPC: Save Streak for 50 Coins
CREATE OR REPLACE FUNCTION public.save_user_streak()
RETURNS JSONB
LANGUAGE plpgsql
SECURITY DEFINER
AS $$
DECLARE
    v_user_id UUID;
    v_current_coins INTEGER;
    v_current_streak INTEGER;
BEGIN
    v_user_id := auth.uid();
    IF v_user_id IS NULL THEN RAISE EXCEPTION 'Not authenticated'; END IF;

    SELECT coins, streak INTO v_current_coins, v_current_streak FROM public.profiles WHERE id = v_user_id;

    IF v_current_coins < 50 THEN
        RAISE EXCEPTION 'Need 50 coins to save streak!';
    END IF;

    -- Deduct 50 coins and restore streak
    UPDATE public.profiles SET coins = coins - 50, streak = v_current_streak + 1, updated_at = NOW() WHERE id = v_user_id;

    -- Record streak save event
    INSERT INTO public.streak_events (user_id, event_date, status, saved_with_coins)
    VALUES (v_user_id, CURRENT_DATE - INTERVAL '1 day', 'saved', TRUE);

    -- Log transaction
    INSERT INTO public.coin_transactions (user_id, amount, transaction_type, reference_id, description)
    VALUES (v_user_id, -50, 'streak_save', CURRENT_DATE::TEXT, 'Saved daily streak with 50 Coins');

    RETURN jsonb_build_object('success', true, 'new_streak', v_current_streak + 1, 'remaining_coins', v_current_coins - 50);
END;
$$;

-- AUTOMATIC PROFILE CREATION TRIGGER ON AUTH SIGNUP
CREATE OR REPLACE FUNCTION public.handle_new_user()
RETURNS TRIGGER
LANGUAGE plpgsql
SECURITY DEFINER
AS $$
BEGIN
    INSERT INTO public.profiles (id, display_name)
    VALUES (
        NEW.id,
        COALESCE(NEW.raw_user_meta_data->>'full_name', NEW.raw_user_meta_data->>'display_name', 'Campus Hero')
    )
    ON CONFLICT (id) DO NOTHING;
    RETURN NEW;
END;
$$;

DROP TRIGGER IF EXISTS on_auth_user_created ON auth.users;
CREATE TRIGGER on_auth_user_created
    AFTER INSERT ON auth.users
    FOR EACH ROW EXECUTE FUNCTION public.handle_new_user();
