---
title: "PRD — CRM SaaS"
version: "1.0"
status: "Confirmed baseline for wireframes and MVP build"
source_of_truth:
  - "Handoff v0.4"
  - "Data Model v1.0"
  - "Tech Stack v1.0"
  - "Navigation Map v1.0"
deployment_baseline: "Cloudflare Pages + Pages Functions"
build_gate: "No build starts until wireframes are approved and the Product Owner says go."
note: "This PRD deliberately follows v0.4. It does not adopt the later v0.5 Workers + vinext pivot."
---

# PRD — CRM SaaS

## Document Control

| Item | Value |
|---|---|
| Product | Multi-tenant no-code SaaS CRM for service businesses |
| Document | PRD.md |
| Version | 1.0 |
| Status | Confirmed baseline |
| Owner | Product Owner |
| Primary users | Service-business owners, admins, staff |
| MVP launch plan | Free plan only |
| Deployment | Cloudflare Pages + Pages Functions |
| Dev environment | GitHub + Codespaces |
| Cloudflare management | Dashboard only; no CLI, no Wrangler |

---

## Table of Contents

1. [Product Overview](#1-product-overview)
2. [Goals and Non-Goals](#2-goals-and-non-goals)
3. [Target Users and Personas](#3-target-users-and-personas)
4. [Tenant Model and Isolation](#4-tenant-model-and-isolation)
5. [Business Types and Templates](#5-business-types-and-templates)
6. [MVP Feature Requirements](#6-mvp-feature-requirements)
7. [Data Model Summary](#7-data-model-summary)
8. [UX and Navigation](#8-ux-and-navigation)
9. [Tech Stack and Architecture](#9-tech-stack-and-architecture)
10. [Plans, Billing, and Trials](#10-plans-billing-and-trials)
11. [Integrations](#11-integrations)
12. [Privacy, Compliance, and Security](#12-privacy-compliance-and-security)
13. [Non-Functional Requirements](#13-non-functional-requirements)
14. [Release Plan and Milestones](#14-release-plan-and-milestones)
15. [Risks and Mitigations](#15-risks-and-mitigations)
16. [Open Questions](#16-open-questions)
17. [Version History](#17-version-history)

---

## 1. Product Overview

### 1.1 Problem

Service businesses — cleaning, renovation, design, and similar fields — often manage leads, jobs, recurring work, forms, and customer communication across spreadsheets, messaging apps, and disconnected tools. They need a simple, mobile-first CRM that fits their business type without requiring custom software.

### 1.2 Solution

Build a mobile-first, multi-tenant, no-code SaaS CRM for service businesses. Tenants sign up, choose a business type, receive an editable pre-built template, and manage contacts, leads, one-time jobs, recurring jobs, forms, activities, tasks, and basic pipeline stages.

### 1.3 Product Vision

A mobile-first CRM that any service business can adopt quickly, with:

- Pre-built templates by business type, editable by the tenant.
- One-time and recurring jobs.
- A built-in customizable form builder.
- Optional Google Sheets linking.
- Google Workspace integrations first.
- Strict tenant isolation by `tenant_id`.
- Hundreds of tenants, with roughly 5 users per tenant as the common case.

---

## 2. Goals and Non-Goals

### 2.1 MVP Goals

1. Let a tenant sign up, log in, and onboard with a business-type template.
2. Provide core CRM records: contacts, leads, one pipeline with editable stages, jobs, recurring jobs, activities, and tasks.
3. Provide a built-in form builder that can create leads or contacts from submissions.
4. Support optional Google Sheets export/link.
5. Enforce tenant isolation everywhere.
6. Deliver a mobile-first UI with a TikTok-style vertical feed and bottom navigation.
7. Support MVP roles: Owner, Admin, Staff.
8. Include privacy basics: consent, export, deletion, and audit logging.
9. Enforce Free-plan limits: 5 users, 5 custom fields, 100 automations/month.
10. Keep the landing page deferred until after core MVP.

### 2.2 Non-Goals / Out of Scope for MVP

- Stripe billing for tenants’ customers.
- Advanced automation builder.
- Multiple pipelines.
- Deep reporting and analytics.
- Separate databases per tenant.
- SMS.
- File uploads.
- Tenant-facing API.
- Landing page until after core MVP.
- Paid-plan billing integration; only Free plan is active at launch.
- Quote workflow UI unless separately approved. The data model may reserve the entity.

---

## 3. Target Users and Personas

### 3.1 Primary Market

Any service business, especially startups. Initial focus:

- Cleaning
- Renovation
- Design
- Other — tenant fills in a text field

### 3.2 Roles

| Role | MVP? | Permissions |
|---|---|---|
| Owner | Yes | Full access + billing |
| Admin | Yes | Full access except billing |
| Staff | Yes | Assigned records only |
| Manager | Later | Deferred |
| Read-only | Later | Deferred |
| Custom roles | Later | Deferred |

---

## 4. Tenant Model and Isolation

### 4.1 Requirements

- Multi-tenant SaaS with a shared database.
- Every record includes `tenant_id`, except the `Tenant` table.
- Tenant isolation is enforced at:
  - Database
  - API
  - Backend
  - Frontend
  - Logs
  - Tests
- Tenants can only see their own records.
- Later, larger clients may receive separate databases.

### 4.2 Acceptance Criteria

- No query returns records from another tenant.
- No API response leaks another tenant’s `tenant_id`, records, or counts.
- Automated tests cover cross-tenant access attempts.
- Logs include tenant context without exposing sensitive data.

---

## 5. Business Types and Templates

### 5.1 Business Types

- Cleaning
- Renovation
- Design
- Other — user fills in `other_business_type_text`

### 5.2 Templates

Templates are pre-built by business type and editable by the tenant:

- Rename stages.
- Add or remove fields.
- Reorder fields/stages.

### 5.3 Acceptance Criteria

- Onboarding requires selecting a business type.
- Selecting “Other” requires text input.
- The tenant sees a template preview before confirming.
- The tenant can edit the template after onboarding.

---

## 6. MVP Feature Requirements

| ID | Feature | Priority | Acceptance Criteria |
|---|---|---|---|
| F-01 | Tenant signup and login | Must | Tenant can sign up, log in, and reach onboarding/dashboard. |
| F-02 | Business type selection with pre-built template | Must | User selects type, previews template, confirms; “Other” captures text. |
| F-03 | Contacts and Leads | Must | Users can create, read, update, and list contacts and leads within their tenant. |
| F-04 | Custom fields on Contacts and Leads | Must | Tenant can define up to 5 custom fields on Free plan; values persist. |
| F-05 | One pipeline with editable stages | Must | Tenant has one default pipeline; stages can be renamed and reordered. |
| F-06 | Jobs — one-time and recurring | Must | Users can create one-time and recurring jobs; status is tracked. |
| F-07 | Recurrence rule with confirmation and skip | Must | Weekly, bi-weekly, monthly, custom; reminder before next occurrence; confirm, skip single occurrence, reschedule single occurrence; next occurrence generated automatically. |
| F-08 | Activities: calls, emails, notes | Must | Users can log activities against contacts, leads, or jobs. |
| F-09 | Tasks and reminders | Must | Users can create tasks with due dates and mark them complete. |
| F-10 | Built-in form builder | Must | Tenant can create a form with configurable fields. |
| F-11 | Form-to-CRM link | Must | Form submissions can become leads or contacts. |
| F-12 | Form-to-Google-Sheets optional link | Should | Tenant can optionally link a form to Google Sheets via OAuth. |
| F-13 | Mobile-first UI | Must | Primary flows work on mobile; desktop is secondary. |
| F-14 | Roles: Admin and Staff minimum | Must | Owner/Admin/Staff permissions are enforced. |
| F-15 | Free plan limits | Must | 5 users, 5 custom fields, 100 automations/month enforced. |
| F-16 | Per-seat add-on for 6th user | Should | Plan logic supports add-on seats; billing integration deferred. |
| F-17 | Privacy: export, deletion, consent | Must | Data export, deletion with `DELETE` confirmation, consent checkbox. |
| F-18 | Terms and Privacy Policy agreement on signup | Must | Signup requires agreement; consent record is logged. |

### 6.1 MVP Feature Notes

- **Recurring jobs:** A recurring plan is separate from individual jobs. It stores the template, recurrence rule, next occurrence, reminder timing, and confirmation requirement.
- **Forms:** Submissions may create leads or contacts. Google Sheets linking is optional.
- **Custom fields:** MVP focuses on Contacts and Leads. The data model may support Job custom fields later.
- **Automations:** Plan limits are defined, but the advanced automation builder is deferred.

---

## 7. Data Model Summary

The full Data Model v1.0 contains 20 entities. Every table includes `tenant_id` except `Tenant`.

| Entity | Purpose |
|---|---|
| Tenant | Tenant account, business type, plan |
| User | Tenant users, roles, auth provider |
| Contact | Customer/contact records |
| Lead | Prospective customer records |
| Pipeline | Sales pipeline |
| Stage | Pipeline stages |
| Deal / Opportunity | Sales opportunity |
| Job | One-time or recurring job |
| Recurring Plan | Recurrence template and schedule |
| Activity | Calls, emails, notes |
| Task | Assigned tasks and reminders |
| Form | Form schema |
| Form Submission | Submitted form data |
| Quote / Estimate | Reserved quote entity |
| Custom Field | Tenant-defined fields |
| Tag | Record tags |
| Automation | Automation trigger/action |
| Integration | Google Sheets, Google Workspace, Stripe |
| Audit Log | Security/action audit trail |
| Consent Record | Terms/privacy consent tracking |

---

## 8. UX and Navigation

### 8.1 Mobile Navigation

Bottom bar:

1. **Home** — vertical feed of cards: today’s tasks, upcoming jobs, recent leads, quick actions; role-based filtering.
2. **Contacts** — searchable list of contacts and leads.
3. **Jobs** — one-time and recurring jobs; filter by status/date.
4. **Forms** — forms, submissions, and form-builder access.
5. **Profile** — user settings, tenant settings, billing, integrations, logout.

### 8.2 Home Feed

- Full-screen vertical scroll of cards.
- Each card shows title, status, due date, assignee, and quick actions.
- Tap or swipe to open detail.
- Top bar: tenant name, search, notifications.

### 8.3 Desktop Navigation

Left sidebar: Dashboard, Contacts, Leads, Jobs, Recurring, Activities, Tasks, Forms, Quotes, Settings, Billing, Integrations, Audit Log.

### 8.4 Key Screens

- Landing page — deferred.
- Signup/Login — Google OAuth + email/password.
- Onboarding — business type, template preview, confirm.
- Dashboard/Home Feed — role-based today’s tasks.
- Contact Detail — info, activities, jobs, deals, custom fields.
- Job Detail — schedule, recurrence, confirmation/skip.
- Form Builder — fields, CRM link, Google Sheets link.
- Settings — tenant, users, roles, custom fields, pipeline stages, integrations.

---

## 9. Tech Stack and Architecture

> Baseline: v0.4. Uses Cloudflare Pages + Pages Functions. No CLI, no Wrangler.

| Layer | Decision |
|---|---|
| Frontend framework | Next.js 14+ App Router with TypeScript |
| Styling | Tailwind CSS + shadcn/ui |
| Hosting | Cloudflare Pages, connected to GitHub repo |
| Backend runtime | Cloudflare Pages Functions in `/functions`; no separate Worker files |
| Database | Cloudflare D1 |
| Cache / sessions | Cloudflare KV |
| File storage | Cloudflare R2 — future |
| Auth | Google OAuth + email/password via Pages Functions + KV sessions |
| Password hashing | Web Crypto API (PBKDF2 or compatible library) in Pages Functions |
| Cron / recurring jobs | Cloudflare Workers Cron Triggers via Dashboard, calling Pages Functions endpoints |
| Repo | GitHub `crm-saas`, private |
| Dev environment | GitHub Codespaces |
| Cloudflare management | Dashboard only; no CLI, no Wrangler |
| CI/CD | Cloudflare Pages auto-deploy on push to main |
| Secrets | Cloudflare Dashboard environment variables |
| Billing | Stripe later; Dashboard only |
| Export | CSV client-side, PDF client-side, Google Sheets via API |

### 9.1 Architecture Constraints

- No CLI and no Wrangler for deployment.
- All Cloudflare resources managed through the Dashboard.
- Pages Functions handle API/auth/form endpoints.
- Cron Triggers invoke Pages Functions endpoints for recurring jobs and reminders.
- Tenant isolation must be enforced in every Pages Function and D1 query.

---

## 10. Plans, Billing, and Trials

| Plan | Limits / Features |
|---|---|
| Free | 5 users, 5 custom fields, 100 automations/month, Google Sheets export |
| Premium | 20 users, 50 custom fields, 5,000 automations/month, Google Workspace + Stripe |
| Business | 50+ users, unlimited custom fields, 50,000 automations/month, all integrations, priority support |

- Trial: $1/month for 3 months.
- Add-on user: $5/user/month.
- Premium: $29/user/month.
- Business: $49/user/month.
- Annual: 2 months free.
- **MVP:** only Free plan active. Billing integration later.
- Free-plan limits must be enforced even before paid billing exists.

---

## 11. Integrations

### 11.1 MVP

- Google Sheets optional link for forms.
- CSV export.
- PDF export, client-side only.
- Google OAuth login.
- Email/password login.

### 11.2 Later

- Google Workspace: Gmail, Calendar, Drive.
- Stripe billing.
- Premium integrations by plan.

---

## 12. Privacy, Compliance, and Security

- GDPR and CCPA/CPRA built in.
- Consent checkbox at signup, unchecked by default.
- Log user ID, tenant ID, timestamp, IP, and version accepted.
- Data export and deletion.
- Deletion confirmation requires typing `DELETE`.
- Tenant is controller; platform is processor.
- DPA and subprocessor list available.
- Attorney review required.
- Legal draft: `CRM_SAAS_LEGAL_DRAFT.md`, approved for attorney review.
- Audit log records key actions.
- Tenant isolation enforced at DB, API, backend, frontend, logs, and tests.

---

## 13. Non-Functional Requirements

| Area | Requirement |
|---|---|
| Mobile-first | All primary flows usable on mobile; desktop secondary |
| Performance | Home feed and list views should feel responsive on typical mobile connections |
| Security | Tenant isolation, secure sessions in KV, password hashing, OAuth validation |
| Privacy | Consent, export, deletion, audit logging |
| Reliability | Recurring job generation and reminders must tolerate retries |
| Maintainability | TypeScript, shared tenant/auth helpers, clear Pages Functions structure |
| Accessibility | Forms and navigation usable with keyboard/screen readers where practical |
| Observability | Audit logs and error logs include tenant context without sensitive leakage |

---

## 14. Release Plan and Milestones

| # | Milestone | Status |
|---|---|---|
| M0 | Repo + skeleton | Pending |
| M1 | First deploy to Cloudflare Pages | Pending |
| M2 | D1 + KV provisioned via Dashboard | Pending |
| M3 | Auth — email/password | Pending |
| M4 | Auth — Google OAuth | Pending |
| M5 | Tenant onboarding | Pending |
| M6 | Home feed shell | Pending |
| M7 | Contacts + Leads CRUD | Pending |
| M8 | Jobs + Recurring | Pending |
| M9 | Forms + Google Sheets | Pending |
| M10 | Export + Deletion | Pending |
| M11 | Landing page | Deferred until after core MVP |

### 14.1 Immediate Next Step

Create wireframes for:

1. Mobile TikTok-style Home feed.
2. Signup/Login with Google + email/password.
3. Tenant onboarding with business type selection and template preview.
4. Dashboard with role-based today’s tasks.

No build starts until wireframes are approved and the Product Owner says go.

---

## 15. Risks and Mitigations

| Risk | Mitigation |
|---|---|
| Tenant data leakage | Enforce `tenant_id` in every query; test cross-tenant access |
| Stale context between chats | Use Handoff v0.4 as source of truth; update handoff after major decisions |
| Cloudflare Pages Functions limitations | Keep endpoints small; validate auth/session in shared helpers |
| Recurring job duplication | Use idempotent generation and next-occurrence tracking |
| Auth security | Use established hashing, secure KV sessions, OAuth validation |
| Legal/compliance gaps | Attorney review before launch |
| Scope creep | Enforce MVP non-goals and defer paid billing, advanced automations, multiple pipelines |

---

## 16. Open Questions

**None.** All v1.0 decisions are resolved:

- Auth: Google OAuth + email/password.
- Export: CSV, PDF client-side, Google Sheets.
- Deletion: type `DELETE` to confirm.
- Landing page: deferred.
- PDF: client-side only.
- GitHub: repo + Codespaces.
- Cloudflare: Dashboard only, Pages Functions only.

---

## 17. Version History

| Version | Date | Notes |
|---|---|---|
| 1.0 | — | PRD created from Handoff v0.4 and confirmed v1.0 artifacts. Uses Cloudflare Pages + Pages Functions baseline. Ready for wireframes. |