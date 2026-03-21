# Deployment

## Environment Variables

The app requires a `.env` file in the repo root. Copy `.env.example` and fill in the values:

```bash
cp .env.example .env
```

Ask a collaborator for the Firebase config values. They correspond to the `ktpcornell-app` Firebase project.

The `.env` file is gitignored and must never be committed.

---

## Manual Deployment

```bash
npm install
npm run build           # TypeScript check + Vite build → dist/
firebase deploy         # deploys Hosting, Firestore rules, Storage rules
```

To deploy only specific services:
```bash
firebase deploy --only hosting
firebase deploy --only firestore
firebase deploy --only firestore:rules
firebase deploy --only firestore:indexes
```

---

## CI/CD via GitHub Actions

`.github/workflows/firebase-deploy.yml` runs automatically:

| Trigger | Action |
|---|---|
| Push to `main` | Build + deploy to **live** channel (production) |
| Pull request to `main` | Build + deploy to a **preview** channel (temporary URL posted to PR) |

### Required GitHub Secrets

Add these in the repository settings under **Settings → Secrets and variables → Actions**:

| Secret | Value |
|---|---|
| `FIREBASE_SERVICE_ACCOUNT` | JSON key from Firebase Console → Project Settings → Service accounts → Generate new private key |
| `VITE_FIREBASE_API_KEY` | From Firebase project config |
| `VITE_FIREBASE_AUTH_DOMAIN` | From Firebase project config |
| `VITE_FIREBASE_PROJECT_ID` | `ktpcornell-app` |
| `VITE_FIREBASE_STORAGE_BUCKET` | From Firebase project config |
| `VITE_FIREBASE_MESSAGING_SENDER_ID` | From Firebase project config |
| `VITE_FIREBASE_APP_ID` | From Firebase project config |
| `VITE_FIREBASE_MEASUREMENT_ID` | From Firebase project config |

---

## Custom Domain

The site is served at `ktpcornell.com`. DNS is configured to point to Firebase Hosting.

To verify or reconfigure the domain:
1. Firebase Console → Hosting → Custom domains
2. Follow the DNS verification steps (TXT record + A records)

The `public/CNAME` file is preserved for GitHub Pages compatibility but is not used by Firebase Hosting.

---

## Rollback

To roll back to a previous deployment:
1. Firebase Console → Hosting → your site → Release history
2. Find the previous release and click **Rollback**

Or re-deploy a previous Git commit:
```bash
git checkout <commit-sha>
npm run build
firebase deploy --only hosting
git checkout main
```

---

## Firebase CLI Setup (First Time)

```bash
npm install -g firebase-tools
firebase login
firebase use ktpcornell-app
```

Verify you have access to the `ktpcornell-app` project. Contact a collaborator to be added to the Firebase project if needed.
