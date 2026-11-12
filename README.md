# Prilans — Student Talent & Freelance Marketplace

---

## 🌟 Overview & Problem Statement

Many university students possess valuable technical and creative skills but struggle to find opportunities to apply them. At the same time, small businesses and individuals need affordable services such as website development, graphic design, content writing, and programming.

**Prilans** is a modern, responsive freelance platform built to bridge this gap by connecting university students with clients and small businesses seeking high-quality, affordable digital services.


## 🎨 UI Architecture (Matching Image 2 Mockup)

The interface strictly implements the mockup specifications from **Image 2**:
- **Hero Section:** `"Find Millions of Projects Here!"` with keyword search and location inputs.
- **Left Filter Sidebar:**
  - Category selector
  - Experience Level checkboxes: *Any (2450), Entry Level (930), Intermediate (1150), Expert (370)*
  - Project Type: *Hourly* vs *Fixed Price* toggle with budget tiers (*<$100, $100-$500, $500-$1k, $1k-$5k, $5k+*)
  - Number of Proposals (*<5, 5-10, 10-15, 15-20*)
- **Project Cards:**
  - Experience level badge (`Entry Level`, `Intermediate`, `Expert`)
  - Relative timestamp (`15 mins ago`, `25 mins ago`, `53 mins ago`)
  - Payment Verified badge & Client Country (`Germany`, `United States`, `Bangladesh`, `Canada`)
  - Hiring status (`Still Selecting`)
  - Skill pills (`UI Design`, `Web Design`, `Landing Page`, `WordPress`, `Figma`, etc.)
  - Hourly rate or fixed budget display
  - Real-time proposal count
  - `Apply Now` button and `Applied` status indicator

---

## 🛠️ Technology Stack

- **Frontend:** React 19, Vite 6, Tailwind CSS v4, Lucide React Icons
- **Backend / API:** Node.js, Express 4, RESTful endpoints (`/api/projects`, `/api/applications`, `/api/recommendations`)
- **Hosting / Deployment:** Vercel Serverless Function architecture (`api/index.js` + `vercel.json`)
- **State Management:** Reactive React Context with LocalStorage persistence and seed fallback
- **Test Suite:** Native Node.js test runner (`node --test server/matching.test.js`)

---

## 🚀 Quick Start & Local Setup

### 1. Prerequisites
- Node.js (v18+)
- npm or pnpm

### 2. Installation
```bash
# Clone the repository
git clone https://github.com/MuzahidRezwan/prilans-student-marketplace.git
cd prilans-student-marketplace

# Install dependencies
npm install
```

### 3. Run Development Server
```bash
# Start frontend and backend concurrently
npm run dev

# Or run client only
npm run dev:client
```
Visit `http://localhost:5173` in your browser.

### 4. Build for Production
```bash
npm run build
```

### 5. Run Automated Tests
```bash
npm test
```

---

## 👥 Demo Personas for Evaluators

Use the top-level **Persona Switcher** dropdown to test all roles immediately:
1. **Student Persona:** `Akmal Nasrulloh` (akmalnasrulloh@gmail.com) — 3rd-year Software Engineering student with active portfolio and 4.9★ rating.
2. **Student Expert Persona:** `Sarah Chen` (sarah.chen@university.edu) — Senior graphic designer with 5.0★ rating.
3. **Client Persona:** `HAV Media Group` (contact@havmedia.de) — Verified client with active posted jobs and candidate applications.
4. **Admin Persona:** `Prof. Dennis Vance` (admin.director@university.edu) — Department Head & Course Coordinator with full moderation powers.
