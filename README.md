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
The initial Vanilla JS prototype (Kanban board) will be refactored into the React + Hono architecture defined above.

- [x] Prototype: Initialize repo and Codespaces
- [x] Prototype: Authenticate Wrangler & create D1 database
- [x] Prototype: Deploy to Cloudflare Workers

## Upcoming
- [ ] **Phase 1:** Initialize React + Vite + Hono architecture.
- [ ] **Phase 2:** Multi-tenant Database Schema (Tenant ID isolation).
- [ ] **Phase 3:** Core Features (Contacts, Leads, Jobs, Activities).
- [ ] **Phase 4:** TikTok-style Mobile UI Feed & Bottom Navigation.