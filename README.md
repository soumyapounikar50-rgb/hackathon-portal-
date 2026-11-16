# 🚀 HackSpark 2026 — Hackathon Registration Portal

A modern, high-conversion online registration portal and management system for hackathons, built with **Next.js 14 (App Router)**, **TypeScript**, and **Tailwind CSS**. Designed specifically for easy, zero-configuration deployment on **Vercel**.

![Hackathon Portal Preview](https://images.unsplash.com/photo-1504384308090-c894fdcc538d?auto=format&fit=crop&w=1200&q=80)

---

## ✨ Features

- ⚡ **Lightning Fast & Modern Stack**: Next.js 14 App Router, React 18, TypeScript, Tailwind CSS, Lucide Icons.
- 🎯 **Solo & Team Registration Modes**: Toggle between solo hackers or teams of 2–4 members with dynamic teammate input fields.
- 🎟️ **Instant Digital Hacker Pass**: Generates a shareable, printable hologram ticket card at `/ticket/[id]` upon registration.
- 📊 **Organizer Admin Dashboard (`/admin`)**:
  - Protected with configurable passkey (`ADMIN_SECRET`).
  - Real-time metric cards (total registrants, teams count, solo hackers, track breakdown).
  - Search and filter by name, email, track, format, or ID.
  - **1-Click "Export to CSV"** button for immediate import into Google Sheets / Excel.
  - Status management (Confirm, Waitlist).
- 🏆 **Prizes & Tracks Showcases**: Highlights grand champions, track bounties, and perks.
- ⏳ **Live Interactive Countdown**: Auto-calculating countdown timer to the registration deadline.
- 🎨 **Celebratory Confetti**: Uses `canvas-confetti` upon successful registration.
- 🛡️ **Zero External Database Requirement Out-of-the-Box**:
  - Automatically caches in memory and writes to disk / `/tmp` on serverless.
  - Optional webhook integration (`REGISTRATION_WEBHOOK_URL`) to forward registrations straight to Discord, Slack, Zapier, or Google Sheets.

---

## 🚀 Quick Start (Local Development)

### 1. Install Dependencies
```bash
cd "C:\Users\HP\OneDrive\Documents\GitHub\hackathon-portal"
npm install
```

### 2. Run the Development Server
```bash
npm run dev
```

Open [http://localhost:3000](http://localhost:3000) in your browser to view the portal.
- **Main Portal**: `http://localhost:3000`
- **Organizer Dashboard**: `http://localhost:3000/admin` (Default passkey: `admin123`)

---

## 🌐 Deploy to Vercel (2 Simple Options)

### Option A: Deploy via GitHub (Recommended)

1. **Initialize Git & Push to GitHub**:
   ```bash
   git init
   git add .
   git commit -m "Initial commit of hackathon portal"
   ```
   Create a new repository on [GitHub](https://github.com/new) and push your code:
   ```bash
   git remote add origin https://github.com/<your-username>/hackathon-portal.git
   git branch -M main
   git push -u origin main
   ```

2. **Import into Vercel**:
   - Go to [vercel.com](https://vercel.com) and log in.
   - Click **"Add New..."** → **"Project"**.
   - Select your `hackathon-portal` GitHub repository.
   - Framework preset will automatically be detected as **Next.js**.
   - (Optional) Under **Environment Variables**, set:
     - `ADMIN_SECRET`: Your secure custom passkey for the `/admin` portal (e.g. `mysecretpass2026`).
     - `REGISTRATION_WEBHOOK_URL`: (Optional) Webhook URL to stream new registrations into Discord, Slack, or Google Sheets.
   - Click **Deploy**! 🚀

---

### Option B: Deploy via Vercel CLI

1. Run the Vercel deploy command directly in your terminal:
   ```bash
   npx vercel
   ```
2. Follow the on-screen prompts:
   - Log in to your Vercel account.
   - Confirm project settings (Next.js is auto-detected).
3. To deploy directly to production:
   ```bash
   npx vercel --prod
   ```

---

## 🛠️ Customization & Branding

All event details, prizes, dates, FAQs, and tracks are centralized in a single file:
👉 [`src/lib/config.ts`](./src/lib/config.ts)

You can modify:
- `name`: Name of your hackathon (e.g., `"HACKSPARK 2026"`)
- `startDate` & `registrationDeadline`: ISO dates for the countdown timers
- `prizePool`: Total prize cash and perks
- `tracks`: Customize track names, icons, and descriptions
- `faqs`: Add or edit frequently asked questions
- `schedule`: Update dates and milestone timelines

---

## 🔑 Environment Variables Reference

| Variable | Required | Description | Default |
|---|---|---|---|
| `ADMIN_SECRET` | No | Passkey to access `/admin` dashboard | `admin123` |
| `REGISTRATION_WEBHOOK_URL` | No | Optional webhook endpoint to broadcast every new registration | `undefined` |

---

## 📦 Project Structure

```text
hackathon-portal/
├── src/
│   ├── app/
│   │   ├── admin/page.tsx        # Organizer Dashboard (Search, Metrics, CSV export)
│   │   ├── api/
│   │   │   ├── admin/route.ts    # Admin API (data query, CSV export, status update)
│   │   │   └── register/route.ts # Registration submission & lookup API
│   │   ├── ticket/[id]/page.tsx  # Dynamic Digital Hacker Pass card
│   │   ├── globals.css           # Tailwind & glow styles
│   │   ├── layout.tsx            # Root layout & meta tags
│   │   └── page.tsx              # Main landing page
│   ├── components/
│   │   ├── Countdown.tsx         # Live deadline countdown
│   │   ├── FAQSection.tsx        # Accordion FAQs
│   │   ├── Footer.tsx            # Footer & sponsor showcase
│   │   ├── Navbar.tsx            # Navigation & mobile drawer
│   │   ├── PrizesSection.tsx     # Grand podium & category awards
│   │   ├── RegistrationForm.tsx  # Interactive Solo/Team form + Confetti
│   │   └── TracksSection.tsx     # Challenge tracks cards
│   ├── lib/
│   │   ├── config.ts             # Hackathon settings & data
│   │   ├── storage.ts            # Local/Serverless storage & webhook dispatcher
│   │   └── utils.ts              # CSV generator, ID generator, helper utilities
│   └── types/
│       └── index.ts              # TypeScript interfaces
├── package.json
├── tailwind.config.js
├── tsconfig.json
└── vercel.json
```
