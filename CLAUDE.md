# CLAUDE.md

Last Updated: 2026-03-30 by Claude (Gabriel Castillo)

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Commit Convention

Use conventional commits with a single subject line — no body, no bullet points:

```
type: short description
```

Types: `feat`, `fix`, `chore`, `refactor`, `docs`, `style`, `test`

Examples from this repo:
- `feat: add SectionLabel typography component`
- `fix: build errors from Caption → SectionLabel migration`
- `chore: fix .gitignore — add .vite/, Firebase debug logs`

**Important:** If you change the file structure, add new Firestore collections, or alter anything that would impact future devs, also update the relevant file in `/docs/`.

## Project Overview

Official website for Kappa Theta Pi (KTP) Alpha Epsilon Chapter at Cornell University.

**Stack:** Vite + React 18 + TypeScript + Firebase (Auth, Firestore, Hosting) + Tailwind CSS + ShadCN/ui

- **Public site** — Home, About, Members, Join pages; no login required
- **Members portal** (`/portal`) — Announcements feed and alumni database; email/password login required
- **Admin dashboard** (`/admin`) — Manage announcements, alumni entries, and user roles; `isAdmin: true` in Firestore required

Repository: https://github.com/ktpcornell/ktpcornell.github.io

## Design System — Component-First Rule

**Before writing any UI code, check this section.**

The KTP design system provides purpose-built components for every common UI need. Using raw HTML or off-brand Tailwind instead of these components is a bug, not a shortcut. Every contributor reads this codebase and relies on consistent patterns.

### Pre-Task UI Checklist

Before writing or modifying any UI code:
- [ ] Does a design system component already cover this need? (See Component Inventory below.)
- [ ] Am I only using `ktp-*` tokens for colors — not raw Tailwind palette colors like `red-500`, `amber-400`, `gray-50`?
- [ ] Am I avoiding opacity modifiers (`/50`, `/75`, etc.) on color classes? These create implicit colors that are invisible to the design system.
- [ ] If I cannot use a design system component, have I added a `DS-SKIP` comment?

### No Opacity Modifiers on Color Classes

**Never use Tailwind opacity modifiers (e.g. `bg-gray-50/50`, `text-ktp-primary/80`) to create one-off color values.**

Opacity modifiers produce implicit colors that composite differently over different backgrounds, are invisible to the token system, cannot be documented in `ColorsPage.tsx`, and create exactly the kind of silent drift this design system is designed to prevent.

**Prohibited:**
```tsx
className="bg-gray-50/50"         // What color is this? Depends on background.
className="bg-white/10"           // Undocumented semi-transparent surface
className="text-ktp-primary/80"   // Off-spec navy — use text-ktp-muted instead
```

**Allowed:**
- `ktp-*` tokens at full opacity (`bg-ktp-surface`, `bg-ktp-primary`, `text-ktp-muted`)
- `rgba(...)` in `globals.css` using `--ktp-primary-rgb` or `--ktp-overlay-rgb` when a transparent value is genuinely required for an overlay or animation, with a `DS-SKIP` comment

### DS-SKIP Comment Format

Any intentional deviation from the design system **must** have a `DS-SKIP` comment placed directly above the deviating element. No silent deviations.

```tsx
{/* DS-SKIP: <reason why the design system component cannot be used here> */}
```
or for plain TS:
```ts
// DS-SKIP: <reason>
```

**Valid reasons:**
- "ShadCN Dialog renders its own root; CardHeader padding breaks inside it"
- "Third-party library has no insertion point for AlertBanner"
- "Preview skeleton — using `<span>` to avoid Button sizing interference"

**Invalid reasons (fix the code instead):**
- "It was faster" / "Looks close enough" / no comment at all

### Component Inventory

All design system components import from `@/design-system/components/<Name>`.

| Component | Exports | When to use | Never use instead |
|-----------|---------|-------------|-------------------|
| **AlertBanner** | `AlertBanner` | Error, warning, info messages. Variants: `error`, `warning`, `info` | `<p className="text-red-500">`, raw colored `<div>` |
| **Badge** | `Badge`, `ktpBadgeVariants` | Inline status chips/tags. Variants: `default`, `navy`, `cyan`, `pink`, `gray`, `warning`, `danger` | Hand-rolled `<span className="bg-... rounded-full">` |
| **Button** | `Button`, `ktpButtonVariants` | Every clickable action. Variants: `primary`, `secondary`, `outline`, `ghost`, `transparent`, `danger`. Sizes: `default`, `sm`, `lg` | Raw `<button>` or `<a>` with arbitrary classes |
| **Card / CardHeader / CardBody** | `Card`, `CardHeader`, `CardBody` | Content containers. `CardHeader` = navy title bar; `CardBody` = padded content area | `<div className="bg-primary px-6 py-4">` header bars |
| **FormField / SelectField / TextareaField** | `FormField`, `SelectField`, `TextareaField` | All labeled form inputs. Includes label, error, and helper text wiring | Raw `<input>`, `<select>`, `<textarea>` |
| **SectionSeparator** | `SectionSeparator` | Horizontal rule between content sections | Raw `<hr>` or `<div className="border-t ...">` |
| **SectionTitle** | `SectionTitle` | Section heading block with optional label + subtitle. Props: `title`, `label?`, `subtitle?`, `align?`, `color?` | Hand-written `<h2>` + `<p>` combos for section headings |
| **Heading / SmallTitle / SectionLabel / Body / Caption** | `Heading`, `SmallTitle`, `SectionLabel`, `Body`, `Caption` | All typographic content | Raw `<h2>`, `<p>`, `<span>` with manual color/size classes |

### Component Decision Tree

- **Error/warning/info message** → `AlertBanner variant="error/warning/info"`
- **Status chip or tag** → `Badge variant="..."`
- **Any clickable action** → `Button variant="..."`
- **Content card with optional navy header** → `Card` + `CardHeader` + `CardBody`
- **Text input** → `FormField` · **Dropdown** → `SelectField` · **Multi-line** → `TextareaField`
- **Section heading with label/subtitle** → `SectionTitle`
- **Standalone h1–h6** → `Heading level={n}`
- **Body paragraph** → `Body`
- **Small metadata/timestamp** → `Caption`
- **Uppercase label above heading** → `SmallTitle`
- **Horizontal divider** → `SectionSeparator`
- **Loading spinner** → No shared component exists yet. When you need one, create `src/design-system/components/Spinner.tsx`, add a docs page, then use it everywhere. Add `DS-SKIP` to any existing raw spinner copies noting the gap — do not copy-paste the raw Tailwind spinner a ninth time.

### Prohibited Patterns

These patterns are bugs. If you see them without a `DS-SKIP` comment, fix them.

| Prohibited | Use instead |
|-----------|-------------|
| `text-red-500`, `bg-red-100`, `<p className="text-red-500">` | `AlertBanner variant="error"` or `text-ktp-error` / `bg-ktp-error-bg` |
| `bg-amber-400`, `bg-yellow-300` | `bg-ktp-warning-bg` / `Badge variant="warning"` |
| `bg-green-500`, `text-green-600` | No KTP green token exists. Use `Badge variant="cyan"` for success states. Add a token first if green is semantically required. |
| Any raw `blue-*`, `zinc-*`, `slate-*`, `gray-*` as brand surface colors | `ktp-primary`, `ktp-surface`, `ktp-muted`, `ktp-muted-light` |
| `bg-gray-50/50` or any `color/opacity` modifier | Full-opacity `ktp-*` token, or define a new token in `globals.css` |
| Duplicated inline spinner: `w-8 h-8 border-4 border-ktp-accent border-t-transparent rounded-full animate-spin` | Extract `Spinner.tsx` design system component |
| `<div className="bg-primary px-6 py-4 ...">` as a card title bar | `<CardHeader>` |
| Raw `<input>`, `<select>`, `<textarea>` without label/error wiring | `FormField`, `SelectField`, `TextareaField` |

### Design System Sync Rules

See `docs/DESIGN_SYSTEM.md` for full token and component reference.

**CRITICAL — always keep the design system page in sync:**

> Whenever you add, rename, or remove a color token in `src/styles/globals.css` or `tailwind.config.ts`, you MUST **also** update `src/pages/design-system/ColorsPage.tsx`.

If you add a new component under `src/design-system/components/`, add a documentation page under `src/pages/design-system/` and register it in `DesignSystemLayout.tsx`.

If you change the visual appearance, sizing, spacing, or behavior of a component that has a design system docs page, update that docs page to match.

| Path | Purpose |
|------|---------|
| `src/styles/globals.css` | CSS variable definitions — single source of truth for all tokens |
| `tailwind.config.ts` | Exposes CSS variables as Tailwind utilities (`ktp-*`) |
| `src/pages/design-system/ColorsPage.tsx` | Visual documentation of every color token — **must stay in sync** |
| `src/design-system/components/` | Shared UI components |
| `src/pages/design-system/` | Per-component and per-token documentation pages |

## Navigation Patterns

There are two distinct navigation patterns in this codebase — do not conflate them:

| Pattern | Used on | Component | Style |
| ------- | ------- | --------- | ----- |
| **Public Navbar** | `/`, `/about`, `/members`, `/join` (via `PageWrapper`) | `src/components/layout/Navbar.tsx` | Tall (`py-5`), large logo (`h-14`), `text-base` links, hamburger on mobile — prioritizes brand presence |
| **Internal tooling nav** | `/design-system` (sidebar layout), `/portal` (top bar), `/admin` (sidebar) | `DesignSystemLayout.tsx`, `PortalNavbar.tsx`, `AdminSidebar.tsx` | Compact (`h-16` / `py-4`), `text-sm`, density-first — not intended to be branded |

When making changes to one pattern, do not apply them to the other unless explicitly asked.

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

## Getting Access

Reach out to one of the repository collaborators to be added as a collaborator.
