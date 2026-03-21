# Firebase Setup

## Project

**Project ID:** `ktpcornell-app`
**Auth domain:** `ktpcornell-app.firebaseapp.com`
**Hosting:** Firebase Hosting (custom domain `ktpcornell.com`)

---

## Firestore Collections

### `users/{uid}`

Created automatically on first login with `isAdmin: false`. Only updated via the Admin dashboard or Firebase Console.

| Field | Type | Notes |
|---|---|---|
| `uid` | string | Firebase Auth UID |
| `email` | string | |
| `displayName` | string? | optional |
| `isAdmin` | boolean | `false` by default |
| `createdAt` | Timestamp | set on first login |

### `announcements/{docId}`

| Field | Type | Notes |
|---|---|---|
| `id` | string | Firestore doc ID |
| `title` | string | |
| `body` | string | plain text |
| `authorUid` | string | |
| `authorName` | string | |
| `pinned` | boolean | pinned announcements appear first |
| `createdAt` | Timestamp | |
| `updatedAt` | Timestamp | |

**Query order:** `pinned DESC, createdAt DESC` — requires composite index (already in `firestore.indexes.json`).

### `alumni/{docId}`

| Field | Type | Notes |
|---|---|---|
| `id` | string | Firestore doc ID |
| `name` | string | |
| `ktpClass` | string | e.g. `"Alpha"`, `"Beta"`, `"Gamma"` |
| `graduationYear` | number | e.g. `2025` |
| `major` | string | |
| `currentCompany` | string | |
| `currentRole` | string | |
| `linkedin` | string? | full URL |
| `email` | string? | |
| `notes` | string? | internal notes |
| `createdAt` | Timestamp | |
| `updatedAt` | Timestamp | |

**Query order:** `ktpClass ASC, graduationYear ASC` — composite index in `firestore.indexes.json`.

---

## Security Rules

`firestore.rules` enforces:

- **Announcements / Alumni:** any authenticated user can read; only users whose `users/{uid}` document has `isAdmin: true` can write (create, update, delete).
- **Users:** a user can only read their own document; only admins can write (toggle `isAdmin`).

The `isAdmin()` helper function does a cross-document `get()` on `users/{request.auth.uid}` — this counts as one extra read per write operation.

```
function isAdmin() {
  return get(/databases/$(database)/documents/users/$(request.auth.uid)).data.isAdmin == true;
}
```

---

## Firestore Indexes

Defined in `firestore.indexes.json`. Two composite indexes:

1. `announcements` — `pinned DESC, createdAt DESC`
2. `alumni` — `ktpClass ASC, graduationYear ASC`

Deploy indexes with:
```bash
firebase deploy --only firestore:indexes
```

---

## Storage Rules

`storage.rules` — currently only admins can upload. If you add member-uploaded content in the future, update accordingly.

---

## Environment Variables

All Firebase config values are stored in `.env` (gitignored). See `.env.example` for required keys:

```
VITE_FIREBASE_API_KEY
VITE_FIREBASE_AUTH_DOMAIN
VITE_FIREBASE_PROJECT_ID
VITE_FIREBASE_STORAGE_BUCKET
VITE_FIREBASE_MESSAGING_SENDER_ID
VITE_FIREBASE_APP_ID
VITE_FIREBASE_MEASUREMENT_ID
```

These are accessed in `src/lib/firebase.ts` via `import.meta.env.VITE_*`.

---

## Firebase Emulator (Local Development)

To run Firestore and Auth locally without hitting production:

```bash
firebase emulators:start --only firestore,auth
```

Then add to `.env.local`:
```
VITE_USE_EMULATORS=true
```

And in `src/lib/firebase.ts`, connect to emulators when that flag is set:
```ts
if (import.meta.env.VITE_USE_EMULATORS === 'true') {
  connectFirestoreEmulator(db, 'localhost', 8080)
  connectAuthEmulator(auth, 'http://localhost:9099')
}
```

(This is not wired up by default — add it if you need local testing without touching production data.)
