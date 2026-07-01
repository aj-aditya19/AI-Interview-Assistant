# AI Interview Assistant

> An AI-powered career preparation platform — practice real interviews and SSB-style PPDT tests with instant, structured feedback.

**Status:** In Development
**Target Deployment Date:** **20 July 2026** (estimate — see Roadmap & Timeline below)

---

## Overview

AI Interview Assistant helps students and freshers practice for real interviews and defense-exam (NDA/SSB) style assessments through realistic, AI-driven simulations — not generic question banks.

The platform has **4 modules**, built and rolled out in phases:

| Module | Status | Description |
|---|---|---|
| AI Interview | **Live** | Multi-round mock interview (HR, Technical, Other) with an AI interviewer, scored question-by-question |
| PPDT | **Live** | Picture Perception & Discussion Test practice — view an image, then describe and analyze it under time pressure |
| Communication | Coming Soon | Practice conversations (chat / voice / video) with AI personas in a topic or role of your choice |
| ATS Resume Score | Coming Soon | Upload your resume and get an ATS match score against your target role and company |

---

## Key Features

### AI Interview
- Choose your interview reason (Internship / Placement / Other), target role, target company, skills, and experience
- Multi-round format in a single continuous session: HR → Technical → Other
- Per-question score breakdown (accuracy, confidence, vocabulary, English, overall) shown right after each answer
- Full session summary at the end: strengths, weaknesses, recommendations, and a readiness label
- AI interviewer avatar with a speaking animation (lightweight — no heavy video generation)

### PPDT (Picture Perception & Discussion Test)
- Image is shown for a fixed duration based on difficulty (chosen at interview setup)
- Image is then hidden; user describes and analyzes what they saw, within a timed window
- Scored on observation, imagination, communication, confidence, story structure, and officer-like qualities

### Coming Soon — Communication & ATS Score
- Shown as disabled tiles on the dashboard with a "Notify me" option — used purely to gauge interest before building

---

## Tech Stack

**Frontend:** React + Vite
**Backend:** Node.js + Express.js
**Database:** MongoDB (Mongoose)
**AI / NLP:** Groq API (LLM-based question generation, answer evaluation, and summarization)
**Speech:** Browser-native Web Speech API (recognition + synthesis) — no paid voice/video services
**Auth:** JWT-based, with email-based forgot/reset password flow

---

## UI Theme

Light theme only — clean, minimal, premium educational SaaS look.

| Token | Color | Hex |
|---|---|---|
| Primary | Royal Emerald Green | `#157A6E` |
| Secondary | Royal Gold | `#D4A017` |
| Background | Warm Ivory | `#FAF9F6` |
| Cards | Pure White | `#FFFFFF` |
| Primary Text | Charcoal | `#2D2D2D` |
| Secondary Text | Soft Gray | `#6B7280` |

Design rules: rounded corners, spacious layout, no gradients, no shadows, no blur/glassmorphism, no animations beyond a basic hover (background/border change only). Fully responsive.

---

## Project Structure

```
AI-Interview-Assistant/
├── backend/
│   ├── config/         # DB connection
│   ├── middleware/      # auth, isAdmin
│   ├── models/          # Mongoose schemas
│   ├── routes/           # auth, interview, ppdt, admin
│   ├── services/         # groq.service.js, mail.service.js
│   └── server.js
├── frontend/
│   ├── src/
│   │   ├── content/      # JSON files — all on-screen text lives here
│   │   ├── pages/
│   │   ├── components/
│   │   └── utils/
└── README.md
```

---

## How to Run Locally

```bash
# Clone the repository
git clone https://github.com/aj-aditya19/AI-Interview-Assistant
cd AI-Interview-Assistant

# Terminal 1: Backend
cd backend
npm install
npm run dev

# Terminal 2: Frontend
cd frontend
npm install
npm run dev
```

### Environment Variables

```env
# backend/.env
PORT=5000
MONGO_URI=your_mongodb_url
JWT_SECRET=your_jwt_secret
CLIENT_URL=http://localhost:3000
GROQ_API_KEY=your_groq_key
MAIL_USER=your_gmail_address
MAIL_PASS=your_gmail_app_password

# frontend/.env
VITE_API_URL=http://localhost:5000/api
```

---

## Demo Credentials

| Role | Email | Password |
|---|---|---|
| Regular User | ajaditya1908@gmail.com | AkiJ1907 |
| Admin (`/admin/login`) | ajaditya1908@gmail.com | AkiJ1907 |

> Note: these are demo credentials for evaluators/recruiters. Don't reuse this password on any real account.

---

## Roadmap & Timeline

| Phase | Work | Estimated Duration |
|---|---|---|
| 1 | Database schema migration + permanent interview records + multi-round (HR/Technical/Other) logic | ~1 week |
| 2 | PPDT module (JSON image bank, timer flow, scoring) | ~1 week |
| 3 | UI redesign (new theme, JSON content system, admin portal, forgot-password flow) | ~1.5 weeks |
| 4 | Testing, deployment, polish | ~4 days |

**Estimated deployment window: 15–25 July 2026.** This assumes consistent part-time work as a solo student developer; college schedule may shift this by a few days.

### Future (v2 and beyond)
- Communication module (chat / voice / video roleplay)
- ATS resume scoring
- Real face/eye-contact proctoring during interviews (ML-based)
- Filler-word (umm/ahh) detection in voice answers
- Leaderboard and ranking system

---

## Author

**Aditya Jaiswal** ([@aj-aditya19](https://github.com/aj-aditya19))

## Contribution

Suggestions and improvements are welcome.
