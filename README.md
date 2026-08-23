```markdown
# Soroban+

A gamified learning platform for the Japanese Soroban (abacus). Built with React, React Router, and Supabase.

🌐 **Live:** [soroban-beta.vercel.app](https://soroban-beta.vercel.app)

---

## Features

- **Interactive virtual soroban** — authentic bead movement with rod constraints and smooth animations
- **Three difficulty levels** — Beginner (ones/tens/hundreds), Intermediate (thousands), Advanced (ten-thousands), each unlocking sequentially
- **Timed challenges** — 10s/7s/5s countdowns per level difficulty
- **Lives system** — 3 lives per session, lose one on wrong answer or timeout
- **Progress tracking** — lesson position and unlocked levels saved per user across sessions and devices
- **Interactive onboarding** — action-gated tutorial that requires the user to actually interact with the abacus before advancing
- **Free Practice mode** — unrestricted sandbox with all 5 columns
- **Google OAuth** — sign in with Google, progress persists to Supabase

---

## Tech Stack

| Layer | Tech |
|---|---|
| Frontend | React.js, React Router v7, Vite |
| Auth | Supabase Auth (Google OAuth) |
| Database | Supabase (PostgreSQL) |
| Deployment | Vercel |

---

## Getting Started

```bash
git clone https://github.com/mahiii-a/soroban.git
cd soroban
npm install
npm run dev
```

Create a `.env` file in the project root:

```
VITE_SUPABASE_URL=your_supabase_url
VITE_SUPABASE_ANON_KEY=your_anon_key
```

---

## Project Structure

```
src/
  components/
    Abacus.jsx          # Core interactive abacus component
    GameScreen.jsx      # Main game logic and UI
    HomeScreen.jsx      # Level selection landing page
    FreeMode.jsx        # Sandbox practice mode
    OnBoarding.jsx      # Interactive tutorial
  Layout.jsx            # Shared layout with back navigation
  App.jsx               # Routes and global state
  supabaseClient.js     # Supabase config
```

---

## Supabase Setup

Create a `soroban` table with:

| Column | Type |
|---|---|
| id | uuid (PK) |
| user_id | uuid (unique) |
| unlocked_levels | jsonb |
| lesson_progress | jsonb |

Enable Row Level Security and add policies for authenticated users to select, insert, and update their own rows.

---

## License

MIT
```
