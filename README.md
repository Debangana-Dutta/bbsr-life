# 🎓 BBSR-Life — XIM University Edition 🏛️

> **Turn your real life into a game. Complete quests, earn rewards, build your campus, and level up.**

**BBSR-Life (XIM University Edition)** is a gamified college productivity RPG built for the **IIT Bhubaneswar Web Hackathon**.

The idea is simple: traditional productivity tools turn important activities like studying, exercising, reading, and completing personal goals into ordinary checklists. BBSR-Life transforms those activities into **quests** inside an interactive RPG world.

Every completed quest gives the player immediate feedback through **XP, coins, streak progression, character progression, and campus construction**.

Instead of waiting months to see the results of real-world productivity, users receive a satisfying and visible progression loop every time they take action.

---

## 🏆 Hackathon

- **Event:** IIT Bhubaneswar Web Hackathon
- **Status:** 🟢 **Qualified for Round 2**
- **Round 2:** October 31, 2026
- **Repository:** https://github.com/Debangana-Dutta/bbsr-life
- **Hackathon:** https://unstop.com/hackathons/web-hackathon-indian-institute-of-technology-bhubaneswar-1742721

---

# 🎯 Problem We Solved

## The Problem: Life Feels Like a Chore

Traditional productivity applications such as to-do lists and habit trackers often reduce meaningful activities into simple checkboxes.

The problem is the **delayed gratification gap**.

Studying for an exam, reading a book, exercising, coding, or completing a personal goal may provide benefits only after days, weeks, or months.

Video games solve a similar motivation problem differently.

They provide:

- Immediate feedback
- XP and progression
- Rewards
- Levels
- Streaks
- Visual achievements
- Character development
- A sense of continuous progress

The challenge was to bring those mechanics into real-life productivity without creating a simple frontend-only prototype.

The application also needed:

- Secure authentication
- Persistent database storage
- User-specific data
- CRUD functionality
- Character progression
- Rewards and economy
- Historical progression
- Cross-device persistence
- Responsive and accessible UI
- A full-stack architecture

---

# 💡 Our Solution

We built **BBSR-Life**, a campus-themed **Life RPG** where real-world productivity becomes gameplay.

Instead of:

```text
Task → Checkbox → Done
```

BBSR-Life transforms the experience into:

```text
Real-Life Activity
        ↓
      Quest
        ↓
  Complete Quest
        ↓
   Instant Feedback
        ↓
+ XP + Coins + Streak
        ↓
Campus Construction
        ↓
Character Progression
        ↓
Unlock New Location
        ↓
Continue the Journey
```

The user's productivity becomes a visible world that grows with them.

### 🏗️ The Core Idea

**Your productivity builds the campus.**

Every completed quest contributes **+25% construction progress** to the campus location where the player's avatar currently stands.

```text
0%
 ↓
25%
 ↓
50%
 ↓
75%
 ↓
100%
 ↓
Campus Spot Unlocked
 ↓
Avatar Moves Forward
 ↓
Next Campus Spot
```

This creates a direct connection between a real-world action and an immediate virtual reward.

---

# 🎮 Core Game Loop

```text
Real-Life Task
      ↓
    Quest
      ↓
Complete Quest
      ↓
+25% Campus Construction
      ↓
Earn Coins & XP
      ↓
Increase Streak
      ↓
Level Up Character
      ↓
Reach 100% Construction
      ↓
Unlock Campus Spot
      ↓
Avatar Moves to Next Spot
      ↓
Continue Building the Campus
      ↓
Complete All 16 Campus Spots
      ↓
Enter Endless Prestige Loop
      ↓
Continue Building & Leveling Up
```

---

# ✨ How BBSR-Life Addresses the Problem

## 1. Solving Delayed Gratification

Instead of forcing users to wait for long-term results, BBSR-Life provides immediate feedback after completing a quest.

A single real-life action can produce:

```text
Quest Completed
      ↓
+ XP
+ Coins
+ Streak Progress
+ Campus Progress
+ Character Progress
      ↓
Immediate Visual Feedback
```

This creates a short feedback loop similar to the reward systems users experience in games.

---

## 2. Turning Chores Into Quests

Traditional productivity tools use language such as:

```text
Complete Assignment
Go to Gym
Study
Read
Practice Coding
```

BBSR-Life transforms these into RPG-style quests.

```text
Quest: Complete Assignment
Quest: Strength Training
Quest: Study Session
Quest: Read 20 Pages
Quest: Complete Coding Practice
```

The underlying real-world activity remains the same, but the interaction becomes part of a larger progression system.

---

## 3. Making Progress Visible

In a conventional to-do list:

```text
Task Completed ✓
```

The task disappears.

In BBSR-Life:

```text
Quest Completed
      ↓
+25% Campus Construction
      ↓
Visible World Changes
      ↓
Campus Gets Built
      ↓
Avatar Progresses
```

The user can physically see their progress represented inside the game world.

---

## 4. Creating Long-Term Progression

The application does not stop at completing individual quests.

Players progress through:

```text
Quests
  ↓
XP
  ↓
Levels
  ↓
Coins
  ↓
Inventory
  ↓
Character Customization
  ↓
Campus Construction
  ↓
Campus Unlocks
  ↓
Prestige Loop
```

This gives everyday productivity a persistent progression layer.

---

# 🏗️ Incremental Campus Construction

Completing a quest awards **+25% construction progress** to the campus spot where the avatar is currently standing.

```text
0% → 25% → 50% → 75% → 100%
```

When a location reaches **100%**, it becomes fully constructed and unlocked.

The avatar then automatically moves to the next campus location.

This means every four completed quests can complete one campus construction stage.

```text
Quest 1 → 25%
Quest 2 → 50%
Quest 3 → 75%
Quest 4 → 100%
```

At 100%:

```text
Campus Spot Completed
        ↓
Campus Spot Unlocked
        ↓
Avatar Automatically Moves
        ↓
Next Campus Spot
```

---

# ♾️ Endless Prestige Loop

BBSR-Life includes **16 XIM University-inspired campus landmarks**.

After progressing through the campus, the player can continue through an **endless prestige loop**.

The objective is to avoid creating a productivity system that simply reaches a final screen and stops.

Instead:

```text
Build Campus
     ↓
Complete Progression
     ↓
Prestige
     ↓
Continue Building
     ↓
Continue Leveling
     ↓
Continue Completing Quests
```

This creates a continuous productivity RPG loop.

---

# 📍 16 XIM University Campus Spots

The campus progression includes **16 XIM University-inspired locations**:

1. 🏛️ Main Gate & Admin Plaza
2. 🏢 Old Academic Building
3. 🏢 New Academic Building
4. 💻 IC Building — Innovation & Technology
5. 🎭 Main Auditorium
6. 🏠 PG Residence — Executive Quarters
7. 🏠 Girls' Hostel Block
8. 🏠 Boys' Hostel Block
9. 🏐 Volleyball Court
10. 🏀 Basketball Court
11. 🏏 Cricket Ground & Pitch
12. 🍔 Vendors Side & Food Stalls
13. 🍽️ Central Cafeteria
14. 🏥 Campus Dispensary & Health Center
15. 📚 XIM Central Library
16. 🎓 Faculty Residence & Convocation Lawn

---

# 🎁 Starter Sign-Up Bonus

Every new player starts with:

- 🪙 **120 Starter Coins**
- 🔥 **Day 0 Streak**
- ⭐ **0 XP**
- 🎮 **Level 1**

This gives new users an immediate starting point before they begin completing quests.

---

# ⚔️ Quest & XP System

Players can create and complete quests based on real-life academic and personal activities.

Completing quests provides:

- ⭐ XP
- 🪙 Coins
- 🏗️ Campus construction progress
- 🔥 Streak progression
- 📈 Character progression

The system connects productivity directly with RPG progression.

---

# 📈 RPG Progression Engine

BBSR-Life uses a progression system where users advance through levels as they earn XP.

The progression is designed around the core requirement of a **non-linear RPG leveling system**, where higher levels require progressively more XP.

```text
Complete Quests
      ↓
Earn XP
      ↓
Reach XP Threshold
      ↓
Level Up
      ↓
Unlock Further Progression
```

This prevents progression from feeling like a simple linear counter and creates a longer-term advancement system.

---

# 🔥 Streak System

BBSR-Life tracks consecutive activity through a streak system.

The streak gives users another reason to return consistently and maintain their productivity habits.

```text
Day 1 → 🔥 1 Day
Day 2 → 🔥 2 Days
Day 3 → 🔥 3 Days
...
```

The streak works alongside XP, coins, quests and campus construction to create a broader progression loop.

---

# 🧙 Custom Pixel Avatar

Every player has their own pixel-style RPG avatar.

The avatar:

- Appears directly on the campus map
- Moves between campus locations
- Represents the player's current progression
- Can be customized through the profile and shop systems
- Automatically advances when a campus spot reaches 100%

The avatar makes progression feel tangible instead of presenting everything as numerical statistics.

---

# 🎒 Inventory & Shop

Players earn coins through gameplay and can use them in the in-game shop.

The inventory system allows players to:

- View collected items
- Track rewards
- Customize their character
- Spend earned coins
- Build their personal RPG progression

The economy adds a reward layer beyond XP and levels.

```text
Complete Quest
      ↓
Earn Coins
      ↓
Visit Shop
      ↓
Purchase Items
      ↓
Customize Character
```

---

# 📊 Live Supabase Leaderboard

BBSR-Life uses **Supabase PostgreSQL** to persist player data and power the leaderboard.

Players can track progression through:

- ⭐ XP
- 🎮 Level
- 🪙 Coins
- 🔥 Streak
- 🏗️ Campus progress
- 🏆 Leaderboard position

This introduces a competitive and social layer where players can compare their progression.

---

# 🎵 Retro 8-Bit Experience

The application was designed to avoid feeling like a generic productivity SaaS dashboard.

Instead, it uses a **retro-inspired RPG aesthetic** with synthesized audio feedback.

Interactions include effects for:

- Button clicks
- Coin collection
- Quest completion
- Level-ups
- Game interactions

The visual and audio design reinforces the same game language throughout the experience.

---

# 🖱️ Alive & Tactile UI

The application is designed around the hackathon requirement that actions should feel responsive and rewarding.

Instead of treating interactions as static CRUD operations, BBSR-Life provides visual feedback for important game actions.

```text
User Action
     ↓
Immediate UI Feedback
     ↓
Game State Updates
     ↓
Progression Feedback
     ↓
Persistent Database State
```

This helps reduce the feeling of waiting for a remote backend while interacting with the application.

---

# 🔐 Full-Stack Architecture

BBSR-Life was designed as a real full-stack application rather than a static frontend prototype.

The architecture includes:

```text
                    ┌──────────────────────┐
                    │      Next.js UI      │
                    │ React + TypeScript   │
                    └──────────┬───────────┘
                               │
                               ↓
                    ┌──────────────────────┐
                    │       Supabase       │
                    │ Authentication + API │
                    └──────────┬───────────┘
                               │
                               ↓
                    ┌──────────────────────┐
                    │ PostgreSQL Database  │
                    │ Persistent Game Data │
                    └──────────────────────┘
```

This provides persistent state across sessions and devices.

---

# 🔑 Authentication & Security

BBSR-Life uses **Supabase Authentication** to provide user authentication and session management.

Users have isolated game data so that one player cannot simply access another player's private progression.

Security includes:

- Secure authentication
- User sessions
- User-specific data
- PostgreSQL database
- Row Level Security (RLS)
- Protected user records
- Client-side public Supabase configuration only

---

# 🗄️ Database & CRUD

BBSR-Life uses **Supabase PostgreSQL** for persistent application and game data.

The database handles information such as:

- User profiles
- Authentication
- Quests
- Quest completion
- XP
- Levels
- Coins
- Streaks
- Campus construction progress
- Inventory
- Shop items
- Leaderboard data

The application supports the required CRUD workflow for quests and maintains persistent player progression.

---

# 🔄 Persistence

A key requirement of the hackathon was proving that game state survives page refreshes.

BBSR-Life stores game state in Supabase rather than relying only on local browser state.

```text
User Completes Quest
        ↓
Game State Changes
        ↓
Database Updated
        ↓
Page Refresh
        ↓
Data Retrieved From Supabase
        ↓
Progress Remains
```

This makes the application suitable for real-world multi-session usage.

---

# 📱 Responsive Experience

BBSR-Life is designed to provide a responsive experience across:

- 💻 Desktop
- 💻 Laptop
- 📱 Mobile
- 📟 Tablet

The interface adapts:

- Dashboard
- Campus map
- Quests
- Inventory
- Shop
- Profile
- Leaderboard

for different screen sizes.

---

# ♿ Accessibility

The interface is designed with accessibility in mind, including:

- Semantic UI structure
- Keyboard-friendly interaction
- Clear visual hierarchy
- Responsive layouts
- Readable interface elements
- Structured navigation

The goal is to ensure the RPG experience remains usable beyond a single desktop viewport.

---

# 🎯 Requirement → Our Implementation

| Hackathon Requirement | BBSR-Life Implementation |
|---|---|
| Life RPG | Real-life activities become RPG quests |
| Immediate feedback | XP, coins, streaks and construction progress |
| User authentication | Supabase Authentication |
| Secure user data | PostgreSQL + Row Level Security |
| Database persistence | Supabase PostgreSQL |
| CRUD | Quest creation, viewing, updating and completion |
| Non-linear progression | XP-based progressive leveling |
| Streaks | Consecutive activity tracking |
| Attributes / progression | Quest-driven character progression |
| Rewards / economy | Coins + inventory + shop |
| Character customization | Pixel avatar + shop/profile systems |
| Visual progression | Campus construction system |
| Gamification | Quests, XP, levels, coins, streaks and prestige |
| Responsive UI | Desktop, laptop, tablet and mobile layouts |
| Cross-device persistence | Server-side Supabase state |
| Thematic design | Retro pixel-art campus RPG |
| Database history | Persistent quest and progression records |
| Leaderboard | Live Supabase-backed leaderboard |

---

# 🎯 Why BBSR-Life?

Traditional productivity apps often represent progress as:

```text
Task Completed ✓
```

BBSR-Life makes the same action part of a larger world:

```text
Your Task
   ↓
Your Quest
   ↓
Your XP
   ↓
Your Coins
   ↓
Your Streak
   ↓
Your Character
   ↓
Your Campus
```

Every real-life action contributes to an evolving virtual environment.

The result is a productivity system where the user can **see their progress instead of simply checking it off**.

---

# 🛠️ Tech Stack

## Frontend

- **Next.js**
- **React**
- **TypeScript**
- **Tailwind CSS**
- Responsive UI

## Backend & Database

- **Supabase**
- **PostgreSQL**
- **Supabase Authentication**
- **Row Level Security (RLS)**

## Deployment

- **Vercel**
- **GitHub**

---

# 🗄️ Database

BBSR-Life uses **Supabase PostgreSQL** for persistent application and game data.

The database handles:

- User profiles
- Authentication
- Quests
- Quest completion
- XP
- Levels
- Coins
- Streaks
- Campus construction progress
- Inventory
- Shop items
- Leaderboard data

Row Level Security policies are used to protect user-specific data.

---

# 🔐 Environment Variables

Create a `.env.local` file in the project root:

```env
NEXT_PUBLIC_SUPABASE_URL=https://your-supabase-project-id.supabase.co
NEXT_PUBLIC_SUPABASE_ANON_KEY=your-supabase-anon-key-here
```

> **Never commit private Supabase secret keys or other sensitive credentials to GitHub.**

---

# 🚀 Run Locally

## 1. Clone the repository

```bash
git clone https://github.com/Debangana-Dutta/bbsr-life.git
cd bbsr-life
```

## 2. Install dependencies

```bash
npm install
```

## 3. Configure environment variables

Create `.env.local` and add your Supabase project URL and publishable/anonymous key.

## 4. Start the development server

```bash
npm run dev
```

Open:

```text
http://localhost:3000
```

---

# ☁️ Deployment

BBSR-Life is designed to be deployed using **Vercel**.

Connect the GitHub repository to Vercel and configure:

```text
NEXT_PUBLIC_SUPABASE_URL
NEXT_PUBLIC_SUPABASE_ANON_KEY
```

Then deploy the `main` branch.

---

# 📁 Project Structure

```text
bbsr-life/
├── public/
│   └── assets/
├── src/
│   ├── app/
│   │   ├── auth/
│   │   ├── dashboard/
│   │   ├── quests/
│   │   ├── map/
│   │   ├── inventory/
│   │   ├── shop/
│   │   ├── leaderboard/
│   │   └── profile/
│   ├── components/
│   ├── lib/
│   └── types/
├── supabase/
│   └── schema.sql
├── .env.example
├── package.json
├── README.md
└── tsconfig.json
```

---

# 🔒 Security

BBSR-Life uses Supabase's authentication and database security features.

- Supabase Authentication handles user authentication.
- PostgreSQL stores persistent game data.
- Row Level Security protects user-specific records.
- Client-side environment variables contain only public Supabase configuration.
- Private Supabase secret keys are never exposed to the client.

---

# 🏆 Hackathon Status

## IIT Bhubaneswar Web Hackathon

🟢 **Qualified for Round 2**

📅 **Round 2: October 31, 2026**

BBSR-Life was developed as a campus-focused productivity RPG that addresses the delayed-gratification problem of traditional productivity tools by combining:

- Real-world task management
- RPG progression
- XP and levels
- Streaks
- Virtual currency
- Character customization
- Campus construction
- Database persistence
- Authentication
- Leaderboards
- Responsive design
- Retro game aesthetics

---

# 💡 Vision

The idea behind BBSR-Life is simple:

> **Turn everyday productivity into a game.**

Instead of treating tasks as a checklist, every completed task contributes to a visible world that grows with the player's progress.

**Your productivity builds the campus.**

**Your quests earn your rewards.**

**Your progress moves your character forward.**

---

# 🔮 Future Improvements

Possible future improvements include:

- More campus locations
- More character customization
- Additional quest categories
- More shop items
- Achievements and badges
- Expanded leaderboard statistics
- More RPG progression mechanics
- Multiplayer/social features
- More campus-specific events
- More advanced character attributes
- Additional game-world interactions

---

# 📄 License

This project was developed for educational and hackathon purposes.
