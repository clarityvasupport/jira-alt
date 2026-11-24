# Multi-Tenant SaaS CRM

## Project Overview
A mobile-first, TikTok-style CRM designed for service businesses (Cleaning, Renovation, Interior Design). 

**The Single Source of Truth:** The product vision is defined in `PRD (2).md`. 

## Tech Stack
- **Runtime:** Cloudflare Workers
- **Deployment:** Wrangler CLI
- **Backend API:** Hono
- **Frontend:** React 18+ (Vite) + Tailwind CSS
- **Icons:** Lucide React
- **Database:** Cloudflare D1 (SQLite)

## File Tree
```text
├── .devcontainer/
├── migrations/
│   ├── 0001_create_issues.sql    (Prototype schema)
│   ├── 0002_saas_schema.sql      (Multi-tenant schema)
│   └── 0003_expand_schema.sql    (Jobs, Tasks, Stages, Automations)
├── public/
├── src/
│   ├── assets/
│   ├── worker/
│   │   └── index.ts              (Hono API Backend)
│   ├── App.tsx                   (Main React UI & Client Routing)
│   ├── index.css                 (Tailwind Import)
│   └── main.tsx                  (React Entry Point)
├── .gitignore
├── package.json
├── PRD (2).md
├── PROJECT_RULES.md
├── README.md
├── tsconfig.json
├── vite.config.ts                (Vite + Cloudflare + Tailwind config)
└── wrangler.jsonc                (Cloudflare Worker & D1 binding)
```

## Navigation Routes (UI State)
Since this is a Single Page Application (SPA), routing is handled via React state in `App.tsx`.

**Main Tabs (Bottom Nav):**
- `/` (Home) -> `activeTab === 'home'`: TikTok-style vertical feed of Leads.
- `/pipeline` -> `activeTab === 'pipeline'`: Kanban board of leads by stage.
- `/contacts` -> `activeTab === 'contacts'`: Searchable list of contacts.
- `/jobs` -> `activeTab === 'jobs'`: List of One-time and Recurring jobs.
- `/settings` -> `activeTab === 'settings'`: Menu for Team, Fields, Automations.

**Overlays & Modals:**
- `Lead Drawer`: Opens when clicking a lead. Tabs for Details, Activity, Jobs.
- `Job Drawer`: Opens when clicking a job. Shows task checklist.
- `Create Lead Modal`: Opens via FAB (+) button.
- `Settings Sub-pages`: Replaces Settings view with Team/Fields/Automations.

## Current State
The entire Frontend UI shell is **100% complete** with realistic mock data. The D1 database schema has been expanded to support all entities.

- [x] **Phase 1:** Initialize React + Vite + Hono architecture.
- [x] **Phase 2:** Multi-tenant Database Schema (Tenants, Leads).
- [x] **Phase 3:** Mobile UI Shell (TikTok Feed & Bottom Nav) connected to API.
- [x] **Phase 4:** Global Detail Drawer (Details, Activity, Jobs) with Mock Data.
- [x] **Phase 5:** Detailed Jobs UI (Task Checklists, Progress Bars).
- [x] **Phase 6:** Settings Sub-pages (Team Limits, Custom Fields, Automations).
- [x] **Phase 7:** Expanded D1 Schema (Jobs, Tasks, Pipeline Stages, Automations).

## Upcoming
- [ ] **Phase 8:** Build Hono CRUD routes for Jobs, Activities, and Custom Fields.
- [ ] **Phase 9:** Wire the React Frontend to the Backend API (Replace all mock data with `fetch`).
- [ ] **Phase 10:** Auth & Tenant Isolation (Google OAuth).