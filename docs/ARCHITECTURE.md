# Architecture

## Stack

| Layer | Technology |
|---|---|
| Build tool | Vite 5 |
| UI framework | React 18 + TypeScript |
| Routing | React Router v6 |
| Styling | Tailwind CSS v3 + ShadCN/ui (New York variant) |
| Component library | ShadCN/ui (Radix UI primitives) |
| Backend / DB | Firebase (Auth, Firestore, Storage, Hosting) |
| Icons | Lucide React |
| Font | DM Sans (Google Fonts CDN) |

---

## Route Tree

```
/                      → HomePage           (public)
/about                 → AboutPage          (public)
/members               → MembersPage        (public)
/join                  → JoinPage           (public)
/login                 → LoginPage          (public — redirects to /portal if already authed)

/portal                → PortalHomePage     (ProtectedRoute)
/portal/alumni         → AlumniPage         (ProtectedRoute)

/admin                 → AdminDashboardPage     (AdminRoute)
/admin/announcements   → AdminAnnouncementsPage (AdminRoute)
/admin/alumni          → AdminAlumniPage        (AdminRoute)
/admin/users           → AdminUsersPage         (AdminRoute)

*                      → redirect to /
```

**`ProtectedRoute`** (`src/router/ProtectedRoute.tsx`): if `currentUser === null`, redirect to `/login?redirect=<path>`. After login the user is sent back to the original path.

**`AdminRoute`** (`src/router/AdminRoute.tsx`): wraps `ProtectedRoute`. Additionally checks `appUser.isAdmin === true`. If false, redirect to `/portal`.

---

## Auth Flow

```
Browser                       Firebase Auth           Firestore
  │                                │                      │
  │── signInWithEmailAndPassword ──►│                      │
  │◄── User object ────────────────│                      │
  │                                │                      │
  │── getDoc(users/{uid}) ─────────────────────────────►  │
  │◄── { isAdmin, email, ... } ────────────────────────   │
  │                                │                      │
  │  (if doc doesn't exist)        │                      │
  │── setDoc(users/{uid}, { isAdmin: false }) ──────────► │
```

`AuthContext` (`src/context/AuthContext.tsx`) provides:
- `currentUser` — Firebase `User` object or `null`
- `appUser` — Firestore `users/{uid}` document or `null` (includes `isAdmin`)
- `loading` — true while the initial `onAuthStateChanged` fires

Components consume these via `useAuth()` (`src/hooks/useAuth.ts`) and `useAdmin()` (`src/hooks/useAdmin.ts`).

---

## CSS Architecture

Two CSS files are loaded in `src/main.tsx`:

1. **`globals.css`** — Tailwind directives + ShadCN CSS variable overrides mapped to KTP brand:
   ```css
   --primary:   228 36% 24%;   /* #273053 navy */
   --secondary: 193 89% 50%;   /* #0dcaf0 cyan */
   --ring:      193 89% 50%;
   ```
   Also preserves legacy variable names (`--navbar-bg-color`, `--primary-color`, `--section-bg-color`, `--p-color`) so that ported components continue to work.

2. **`legacy.css`** — Full port of `templatemo-leadership-event.css`. Contains the 3D card-flip keyframes, typing animation, hero section gradient, highlight strip, placement logo fade-in, gallery image wrapper, footer, etc. These class names are used verbatim in components.

Custom Tailwind utilities (`bg-ktp-navy`, `text-ktp-cyan`, `border-ktp-cyan`, etc.) are defined in `tailwind.config.ts`.

---

## Data Flow

### Static member data
`public/data/members.json` is fetched by `membersService.fetchMembers()` at runtime via `fetch()`. It is **not** in Firestore — this avoids read costs and adds zero latency since it's served from the CDN.

### Dynamic Firestore data
- **Announcements** — realtime `onSnapshot` listener in `useAnnouncements` hook; ordered `pinned DESC, createdAt DESC` (composite index required — see `firestore.indexes.json`).
- **Alumni** — `getDocs` with optional `where('ktpClass', '==', filter)` + `orderBy('graduationYear')`.
- **Users** — `getDocs` for the admin user table; individual `getDoc` in `AuthContext` to read `isAdmin`.

---

## Public Site Component Map

```
HomePage
  ├── PageWrapper (Navbar + Footer)
  ├── HeroSection        ← useTypingEffect hook
  ├── HighlightStrip
  ├── HistorySection
  ├── CallToAction
  ├── PlacementsCloud    ← constants.placements[]
  ├── CampusCloud        ← constants.campusClubs[]
  └── ValuesSection

AboutPage
  ├── Gallery            ← constants.galleryImages[]
  └── FaqAccordion       ← /data/faq.json

MembersPage
  └── MemberClassSection × N
        └── MemberCard   ← 3D flip (legacy.css .member-card / .flipped)

JoinPage
  ├── RecruitmentHero
  └── RecruitmentTabs
```

---

## Admin / Portal Component Map

```
PortalHomePage
  └── AnnouncementList → AnnouncementCard × N   (useAnnouncements onSnapshot)

AlumniPage (portal)
  ├── AlumniSearch
  └── AlumniCard × N                            (useAlumni getDocs)

AdminDashboardPage
  └── AdminSidebar + stat cards (getCountFromServer)

AdminAnnouncementsPage
  └── AdminSidebar + table + AnnouncementForm (modal)

AdminAlumniPage
  └── AdminSidebar + table + AlumniForm (modal)

AdminUsersPage
  └── AdminSidebar + UserTable (isAdmin toggle)
```
