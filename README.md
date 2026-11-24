# Jira Alternative

Personal project tracker built on Cloudflare's edge stack.

## Tech Stack
- **Runtime:** Cloudflare Workers
- **Framework:** Hono
- **Database:** Cloudflare D1 (SQLite)
- **Language:** TypeScript
- **Frontend:** Vanilla HTML/JS + Tailwind CSS

## Progress
- [x] Initialize repo and devcontainer
- [x] Install Hono, Wrangler, TypeScript
- [x] Authenticate Wrangler & create D1 database
- [x] Deploy to Cloudflare Workers
- [x] Build Issues CRUD API & Basic UI (Milestone 1)
- [x] Implement Kanban board columns and status updates (Milestone 2)
- [x] Premium SaaS Light Mode UI, Routing Tabs (Board, Issues, Activity, Prefs), Edit/Delete (Milestone 3)
- [ ] Issue Metadata: Priority, Assignee, Due Date
- [ ] Automation Engine (Custom workflows)

## Current State
Full functioning Kanban board and list view. Users can create, edit, delete, and move issues. Sidebar routing works with client-side rendering.