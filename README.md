<div align="center">
<img width="1200" height="475" alt="GHBanner" src="https://github.com/user-attachments/assets/0aa67016-6eaf-458a-adb2-6e31a0763ed6" />
</div>

# Cyborg Frontier — 4-in-1 Engineering Suite & Backend API

This repository contains the complete cybernetic showcase frontend along with the production-ready **Node.js & TypeScript Express Backend** powered by Google Gemini AI (`@google/genai`).

## 🛠️ Tech Stack
- **Backend**: Node.js, Express, TypeScript, tsx, dotenv
- **AI Core**: Google Gemini 2.5 Flash via `@google/genai`
- **Frontend**: React 19, Vite 8, Tailwind CSS v4, Lucide Icons, Three.js
- **Persistence**: Self-contained JSON Document Store (`data/cyborg-frontier-data.json`)

---

## 🚀 Running Locally

### 1. Prerequisites
Ensure [Node.js](https://nodejs.org/) (v18+ recommended) is installed on your machine.

### 2. Install Dependencies
```bash
npm install
```

### 3. Environment Configuration
Verify your `GEMINI_API_KEY` is present in `.env` or `.env.local`:
```env
GEMINI_API_KEY=your_gemini_api_key_here
PORT=3001
```

### 4. Run the Servers
You can run the backend and frontend simultaneously:

- **Start Backend API Server (Port 3001):**
  ```bash
  npm run server
  ```
- **Start Frontend Vite Dev Server (Port 3000):**
  ```bash
  npm run dev
  ```

---

## 📡 Backend API Endpoints

### 🩺 System & Health
- `GET /api/health` — Service health check & uptime status
- `GET /api/stats` — Aggregate metrics across all 4 showcase modules & Gemini AI status

### ⚡ Task 1: Clinical Inquiries & Reservations
- `GET /api/inquiries` — List submitted clinical reservation inquiries
- `POST /api/inquiries` — Register a new clinical research inquiry

### 🦾 Task 2: 3D Mech Constructor Presets
- `GET /api/mech/presets` — Retrieve saved 3D mech configurations
- `POST /api/mech/presets` — Save a custom 3D mech loadout (materials, exploded offset, subsystems)

### 🛰️ Task 3: Telemetry & Flight Checkpoints
- `GET /api/telemetry/live` — Real-time biometric, core temperature & hydraulic telemetry
- `GET /api/telemetry/history` — Historical telemetry trends
- `POST /api/telemetry/checkpoint` — Record parallax navigation depth checkpoints

### 💡 Task 4: Cybernetic Ideation & AI Laboratory
- `POST /api/ideate/generate` — Real AI cybernetic blueprint generator powered by **Google Gemini**
- `GET /api/ideate/concepts` — Retrieve community cybernetic concepts
- `POST /api/ideate/concepts` — Submit a community proposal
- `POST /api/ideate/concepts/:id/vote` — Upvote a proposal in the registry