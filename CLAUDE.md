# CLAUDE.md

Last Updated: 2026-03-23 by Gabriel Castillo

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

**Important:** If you change the file structure, add new Firestore collections, or alter anything that would impact future devs, also update the relevant file in `/docs/`.

## Project Overview

Official website for Kappa Theta Pi (KTP) Alpha Epsilon Chapter at Cornell University.

**Stack:** Vite + React 18 + TypeScript + Firebase (Auth, Firestore, Hosting) + Tailwind CSS + ShadCN/ui

- **Public site** — Home, About, Members, Join pages; no login required
- **Members portal** (`/portal`) — Announcements feed and alumni database; email/password login required
- **Admin dashboard** (`/admin`) — Manage announcements, alumni entries, and user roles; `isAdmin: true` in Firestore required

Repository: https://github.com/ktpcornell/ktpcornell.github.io

## Running Locally

```bash
npm install
npm run dev        # Vite dev server → http://localhost:5173
```

Requires a `.env` file in the repo root with Firebase credentials. Copy `.env.example` and fill in the values (ask a collaborator). See `docs/DEPLOYMENT.md`.

## Building

```bash
npm run build      # TypeScript check + Vite production build → dist/
```

## Deploying

```bash
npm run build && firebase deploy
```

Push to `main` triggers automatic CI/CD via GitHub Actions. See `docs/DEPLOYMENT.md`.

## Architecture

See `docs/ARCHITECTURE.md` for the full stack diagram, route tree, and auth flow.

## Common Update Tasks

### Adding / Updating Members

See `docs/CONTENT_UPDATES.md` — covers headshots, `public/data/members.json`, new class sections, gallery images, company logos, and the recruitment timeline.

### Managing Announcements / Alumni

Log in as an admin and use the dashboard at `/admin`. See `docs/ADMIN_GUIDE.md`.

### Granting Admin Access

The first admin must be set manually in Firebase Console (`Firestore > users > {uid} > isAdmin: true`). After that, use the Users tab in the admin dashboard. See `docs/ADMIN_GUIDE.md`.

## Firestore & Firebase

See `docs/FIREBASE_SETUP.md` for collection schemas, security rules explanation, indexes, and emulator setup.

## Key Files

| Path                            | Purpose                                                                    |
| ------------------------------- | -------------------------------------------------------------------------- |
| `src/App.tsx`                   | Root component — BrowserRouter + AuthProvider + all Routes                 |
| `src/context/AuthContext.tsx`   | Auth state: `currentUser` (Firebase User) + `appUser` (includes `isAdmin`) |
| `src/router/ProtectedRoute.tsx` | Redirects unauthenticated users to `/login`                                |
| `src/router/AdminRoute.tsx`     | Redirects non-admins to `/portal`                                          |
| `src/lib/firebase.ts`           | Firebase app init; exports `auth`, `db`, `storage`                         |
| `src/lib/constants.ts`          | Static data: placements, clubs, gallery images, KTP class names            |
| `src/styles/globals.css`        | Tailwind directives + ShadCN CSS variable overrides (KTP brand colors)     |
| `src/styles/legacy.css`         | Ported CSS from original site (card flip, typing animation, hero, etc.)    |
| `public/data/members.json`      | Member data — source of truth for the Members page                         |
| `public/data/faq.json`          | FAQ content for the About page accordion                                   |
| `firestore.rules`               | Firestore security rules                                                   |
| `firebase.json`                 | Firebase Hosting + Firestore + Storage config                              |
| `.env.example`                  | Template for required environment variables                                |

## Design System

The `/design-system` route is a living documentation site for KTP's UI tokens and components. See `docs/DESIGN_SYSTEM.md` for full details.

**CRITICAL RULE — always keep the design system page in sync with the code:**

> Whenever you add, rename, or remove a color token in `src/styles/globals.css` or `tailwind.config.ts`, you MUST **also** update `src/pages/design-system/ColorsPage.tsx` to reflect the change. Before finishing any token-related task, open `ColorsPage.tsx` and verify every token in `globals.css` has a corresponding `ColorCard`.

The same applies to new design system components: if you add a component under `src/design-system/components/`, add a documentation page for it under `src/pages/design-system/`.

| Path | Purpose |
| ---- | ------- |
| `src/styles/globals.css` | CSS variable definitions — single source of truth for all tokens |
| `tailwind.config.ts` | Exposes CSS variables as Tailwind utility classes (`ktp-*`) |
| `src/pages/design-system/ColorsPage.tsx` | Visual documentation of every color token — **must stay in sync** |
| `src/design-system/components/` | Shared UI components (SectionTitle, Typography, Card, etc.) |
| `src/pages/design-system/` | Per-component and per-token documentation pages |

## Getting Access

Reach out to one of the repository collaborators to be added as a collaborator.
