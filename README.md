# SaaS CRM (formerly Jira Alt)

## Project Overview
This repository is dedicated to building a **Multi-Tenant SaaS CRM** for service businesses (Cleaning, Renovation, Interior Design). 

**The Single Source of Truth:** The product vision is defined in `PRD (2).md`. 

## Tech Stack (Confirmed)
- **Runtime:** Cloudflare Workers
- **Deployment Tool:** Wrangler CLI
- **Backend API:** Hono
- **Frontend:** React 18+ with Vite (SPA)
- **Database:** Cloudflare D1 (SQLite)
- **Auth:** Google OAuth / Email + KV Sessions
- **UI/UX:** Mobile-First, TikTok-style vertical feed, Bottom Navigation

## Current State
The initial Vanilla JS prototype (Kanban board) has been successfully pivoted to the React + Hono architecture. The UI is a mobile-first shell (TikTok-style feed) pulling real data from a multi-tenant D1 schema.

- [x] Prototype: Initialize repo and Codespaces
- [x] Prototype: Authenticate Wrangler & create D1 database
- [x] Prototype: Deploy to Cloudflare Workers
- [x] **Phase 1:** Initialize React + Vite + Hono architecture.
- [x] **Phase 2:** Multi-tenant Database Schema (Tenants, Leads).
- [x] **Phase 3:** Mobile UI Shell (TikTok Feed & Bottom Nav) connected to API.

## Upcoming
- [ ] **Phase 4:** "Create Lead" flow (Backend POST route + Mobile Form UI).
- [ ] **Phase 5:** "View Details" page/modal.
- [ ] **Phase 6:** Auth & Tenant Isolation.