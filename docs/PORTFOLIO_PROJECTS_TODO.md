# Portfolio Projects TODO

## Global objective

Build eight recruiter-ready projects from `kv-web-starter` that prove the boilerplate can create distinct products, not repeated dashboards.

## Project backlog

- [x] SupportDesk Lite - support dashboard
- [x] QuotePilot - quote/business SaaS
- [x] Luma Studio - premium marketing website
- [x] API Meter - SaaS/API portal
- [x] ReserveFlow - booking system
- [x] CommerceKit - commerce checkout
- [x] ClientHub - current client portal
- [ ] EventPass - event registration and check-in

## Current project: ClientHub

### Product scope

- [x] Client-facing landing page
- [x] Portal overview
- [x] Project list
- [x] Project detail with milestones, files, and messages
- [x] Case study page
- [x] FR/EN switcher
- [x] Distinct visual direction

### Data

- [x] Add `ClientHubProject`
- [x] Add `ClientHubMilestone`
- [x] Add `ClientHubFile`
- [x] Add `ClientHubMessage`
- [x] Add `ClientHubProjectStatus`
- [ ] Apply schema to shared Supabase `kv-portfolio`

### Quality

- [x] Run `pnpm install`
- [x] Run `pnpm db:generate`
- [x] Run `pnpm lint`
- [x] Run `pnpm typecheck`
- [x] Run `pnpm test`
- [x] Run `pnpm build`
- [ ] Create public GitHub repo
- [ ] Deploy to Vercel
- [ ] Add live link to dev portfolio

## Progress log

- 2026-05-17: ClientHub copied from the starter and built as a client portal portfolio project with FR/EN, portal routes, data models, and case study.
