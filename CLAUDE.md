# CLAUDE.md

Last Updated: 2026-11-07 by Michael Tommaso (with Claude). This replaces the static-site guide Amishi wrote on 12/7/2025;
that version still describes `main` until this React rebuild is merged.

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

**Important:** If you change the file structure or anything that would impact future devs from updating the website,
please also update these instructions.

## Project Overview

Official website for Kappa Theta Pi (KTP) Alpha Epsilon Chapter at Cornell University: Home, About, Members and Join.
It is a **React 18 + TypeScript + Vite** app styled with Tailwind 3 and a port of the original TemplateMo theme
(`src/styles/legacy.css`). There is no backend. **Member cards come from KTP Manager's database at build time** (see
Members data below); FAQ data is a JSON file in this repo. Both are bundled, so nothing loads at runtime.

Repository: https://github.com/ktpcornell/ktpcornell.github.io

**`main` deploys the live site to ktpcornell.com (GitHub Pages).** Never push to `main` directly. Work on a branch and
open a pull request.

**How it deploys:** `.github/workflows/deploy.yml` runs `npm run build` and publishes `dist/` to GitHub Pages on every
push to `main`, by hand (`workflow_dispatch`), and on a `repository_dispatch` of type `members-changed`, which KTP
Manager sends after a brother saves his profile (or the eboard edits, hides or restores one). That needs
**Settings → Pages → Source = "GitHub Actions"**. If the source is ever set back to "Deploy from a branch", Pages serves
the unbuilt repo root and the site goes blank (this happened on 2026-11-06). The build copies `index.html` to
`404.html`, so `/members` and the other routes load directly. If a deploy fails, the previous version stays live:
check the Actions tab.

The deploy needs the Actions **variable** `MEMBERS_ENDPOINT` (KTP Manager's members route) and the Actions **secret**
`MEMBERS_TOKEN` (its bearer). Without them every deploy fails on purpose. Rapid saves cancel each other's build
(`concurrency: members-build`), so five saves in a minute end in one deploy; a Pages deploy itself is never cancelled.

**Pull requests** run `.github/workflows/check.yml`: `npm test` plus a build from `data/members.json`
(`MEMBERS_SOURCE=file`), so PRs never need the secret.

## Running Locally

Requires Node 20+.

```bash
npm install
npm run dev        # http://localhost:5173
npm test           # Vitest
npm run build      # type check + production build into dist/
```

`npm run dev` and `npm run build` first run `npm run members:fetch` (writes the member data, see below), then
`npm run media:images`, which makes WebP copies of every image (see Images below). The first run takes about 25
seconds; later runs skip files that haven't changed. Locally, with no `MEMBERS_ENDPOINT`, the members come from
`data/members.json` with a loud warning. That's expected. A bare `npx tsc -b` on a fresh clone needs
`npm run members:fetch` first, because `src/data/members.generated.json` is written, not committed. `npm test` doesn't.

## Architecture

| Where | What |
|---|---|
| `src/pages/public/` | The four pages. Routes: `/`, `/about`, `/members`, `/join`. The old `*.html` URLs redirect to these (`src/App.tsx`) |
| `src/components/public/` | Page sections (hero, flip cards, gallery, recruitment tabs, FAQ, countdown) |
| `src/components/layout/` | Navbar, footer, page wrapper, scroll-to-top |
| `src/components/media/Img.tsx` | Use this for every image: responsive WebP `srcset`, lazy loading, a fallback if a file is missing |
| `src/design-system/` | Shared Button, Heading, SectionTitle, etc. Use these before writing raw markup. Notes in `docs/DESIGN_SYSTEM.md` |
| `src/data/` | `members.ts` (`getMembers()`, the one place member data is read), `eboard.ts` (the Executive board's order), `faq.ts`, `classes.ts` (the Members page sections) |
| `scripts/fetch-members.mjs` | Writes the member data at build time (pure logic and its tests in `scripts/lib/members-build*.mjs`) |
| `src/content/recruitment.ts` | Everything on the Join page: dates, form links, events, interview rounds, countdown |
| `src/lib/constants.ts` | Company and club logo lists, gallery photos |
| `src/config.ts` | `SIGN_IN_URL` for the navbar's Sign in link (hidden while empty) |
| `data/faq.json` | The FAQ |
| `data/members.json` | The old member list, now only the local-dev and PR-check fallback. Don't edit it: it's deleted once the site has built from KTP Manager |
| `images/` | Original photos and logos, at the repo root. Never re-encode them. `images/headshots/db/` is written by the build (gitignored) |

## Members data

Members come from **KTP Manager's database**, fetched when the site is built (spec
`docs/specs/2026-11-07-live-profiles-design.md` in Michael's KTP folder). A brother edits his card in KTP Manager, the
manager triggers a deploy, and the next build picks it up.

`scripts/fetch-members.mjs` decides where the data comes from:

| Environment | Source |
|---|---|
| `MEMBERS_ENDPOINT` + `MEMBERS_TOKEN` set (every deploy) | `GET` the endpoint with `Authorization: Bearer $MEMBERS_TOKEN` |
| `MEMBERS_SOURCE=file` (the PR check; also forces it locally) | `data/members.json` |
| Neither, in CI | **Fails**: a deploy never quietly publishes the old file |
| Neither, locally | `data/members.json`, with a warning |

It writes three things, all gitignored:
- `src/data/members.generated.json`, which `getMembers()` imports. Same `MembersData` shape as `members.json` had.
- `public/members-version.json`, published at `ktpcornell.com/members-version.json` as `{ version, cards }`. KTP Manager
  reads it to show a brother "Live on ktpcornell.com", and to flag a site that didn't update. File mode writes
  version `"file"`.
- `images/headshots/db/<file>`: each headshot, downloaded from a short-lived signed link. Files already there are
  skipped (CI caches the folder), and files no card uses any more are deleted, with their WebP copies.

**The build fails rather than publish a broken page** (exit 1, the last good site stays live): if the endpoint can't
be reached, answers anything but 200, returns something that isn't the expected shape, or lists fewer than
**40** members. The floor is `DEFAULT_MIN_MEMBERS` in `scripts/lib/members-build.mjs`. **Raise it as the club grows**,
or it stops protecting anything. `MIN_MEMBERS=1` overrides it for testing against a small local endpoint. A headshot
that won't download only warns: that card shows the placeholder.

The endpoint's payload types are copied in `src/types/membersPayload.ts`. KTP Manager's `src/lib/public-members.ts`
is the source of truth; change it there first, then mirror it in `membersPayload.ts` and the validator in
`scripts/lib/members-build.mjs`.

**The Executive board's order** is `EBOARD_ORDER` in `src/data/eboard.ts` (KTP Manager sends the eboard unordered).
Names must match the manager's position names. A position not in the list sorts last, then by name. A member with two
positions ("VP Finance / VP Committees") sorts by the first.

### The member card drift guard

KTP Manager's profile page shows a hand-made copy of the member card (`src/app/(app)/profile/profile-preview.tsx` in
that repo). `src/components/public/MemberCard.fingerprint.test.ts` hashes `MemberCard.tsx`, the card's rules in
`src/styles/legacy.css` and the CSS variables they use. **If you change the card, the PR check fails**: update the
manager's preview to match, then paste the new value (the failure prints it) into `CARD_FINGERPRINT`. The deploy
doesn't run the tests, so a forgotten fingerprint never blocks profile updates.

## Images

`scripts/media-images.mjs` writes WebP copies of everything in `images/` into `images-derived/` (gitignored, never
committed) and updates `src/lib/imageManifest.ts` (committed). Photos get 400/800/1600/2400px versions and logos get
200/400px versions. `<Img src="images/...">` picks the right size automatically. An image that isn't in the manifest yet
still shows, using the original file. After adding images, run `npm run media:images` and commit the updated manifest.

Downloaded headshots (`images/headshots/db/`) are the exception: their entries go to `src/lib/imageManifest.db.json`
(gitignored), which `imageManifest.ts` merges in when it exists. So a profile save never changes a committed file. CI
caches `images/headshots/db/` and `images-derived/`. Committed originals are still re-encoded on every CI run, because
a checkout gives them a fresh timestamp and the script rebuilds anything whose source is newer than its copy.

## Common Update Tasks

### Adding a new member or pledge class
- **A member** needs nothing here. He signs in to KTP Manager and fills in his Website Profile; his card appears on the
  next build. The eboard section comes from the manager's eboard positions.
- **A new pledge class still needs one line here:** add an entry to `CLASSES` in `src/data/classes.ts` (key, label,
  semester, class photo), right after the Executive board. The key is the manager's lowercase section key (e.g.
  `delta`). Until you add it, the class still shows at the bottom of the page under a generic "<Key> Class" heading.
  Put the class photo in `images/classpictures/`, run `npm run media:images`, and commit the updated
  `src/lib/imageManifest.ts`.
- **A new eboard position** goes in `EBOARD_ORDER` in `src/data/eboard.ts`, or it sorts last.

### Updating the recruitment page
Edit `src/content/recruitment.ts`: the title, intro, form links, events, interview rounds and the countdown's dates.
FAQ questions are in `data/faq.json`.

### Adding company placements or campus clubs
Put the logo in `images/network/` (companies) or `images/clubs/` (clubs) and add a line to `placements` or `campusClubs`
in `src/lib/constants.ts`.

### Adding gallery photos
Put the photo in `images/gallery/` and add `{ src, alt }` to `galleryImages` in `src/lib/constants.ts`. Describe the
photo in `alt`.

## Getting Access

Reach out to one of the repository collaborators if you need to be added as a collaborator to make changes.
