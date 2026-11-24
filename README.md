# Jira Alternative

Personal project tracker built on Cloudflare's edge stack.

## Tech Stack
- **Runtime:** Cloudflare Workers
- **Framework:** Hono
- **Database:** Cloudflare D1 (SQLite)
- **Language:** TypeScript
- **Frontend:** Vanilla HTML/JS + Tailwind CSS (via CDN)

## Progress
- [x] Initialize repo and devcontainer
- [x] Install Hono, Wrangler, TypeScript
- [x] Authenticate Wrangler & create D1 database
- [x] Deploy to Cloudflare Workers
- [x] Build Issues CRUD API & Basic UI (Milestone 1)
- [x] Implement Kanban board columns and status updates (Milestone 2)
- [ ] Add Drag-and-Drop for cards
- [ ] Build Automation Engine (Custom workflows)

## Current State
We have a functioning 3-column Kanban board (To Do, In Progress, Done). Issues can be created via the UI and moved between columns using the "Move" buttons. The API supports fetching all issues and updating an issue's status.