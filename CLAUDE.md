# CLAUDE.md

Last Updated: 2026-11-06 by Michael Tommaso (with Claude). This replaces the static-site guide Amishi wrote on 12/7/2025;
that version still describes `main` until this React rebuild is merged.

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

**Important:** If you change the file structure or anything that would impact future devs from updating the website,
please also update these instructions.

## Project Overview

Official website for Kappa Theta Pi (KTP) Alpha Epsilon Chapter at Cornell University: Home, About, Members and Join.
It is a **React 18 + TypeScript + Vite** app styled with Tailwind 3 and a port of the original TemplateMo theme
(`src/styles/legacy.css`). There is no backend: member and FAQ data are JSON files in this repo, bundled at build time.

Repository: https://github.com/ktpcornell/ktpcornell.github.io

**`main` deploys the live site to ktpcornell.com (GitHub Pages).** Never push to `main` directly. Work on a branch and
open a pull request.

**Do not merge this React app into `main` yet.** GitHub Pages currently serves the repo root as-is, so it would serve
`index.html` pointing at `/src/main.tsx` (a blank page). Merging needs a build-and-deploy step first: a GitHub Actions
workflow that runs `npm run build` and publishes `dist/` (with a `404.html` fallback so `/members` etc. load directly),
or a move to another host. Where the site is hosted is still being decided.

## Running Locally

Requires Node 20+.

```bash
npm install
npm run dev        # http://localhost:5173
npm test           # Vitest
npm run build      # type check + production build into dist/
```

`npm run dev` and `npm run build` first run `npm run media:images`, which makes WebP copies of every image (see Images
below). The first run takes about 25 seconds; later runs skip files that haven't changed.

## Architecture

| Where | What |
|---|---|
| `src/pages/public/` | The four pages. Routes: `/`, `/about`, `/members`, `/join`. The old `*.html` URLs redirect to these (`src/App.tsx`) |
| `src/components/public/` | Page sections (hero, flip cards, gallery, recruitment tabs, FAQ, countdown) |
| `src/components/layout/` | Navbar, footer, page wrapper, scroll-to-top |
| `src/components/media/Img.tsx` | Use this for every image: responsive WebP `srcset`, lazy loading, a fallback if a file is missing |
| `src/design-system/` | Shared Button, Heading, SectionTitle, etc. Use these before writing raw markup. Notes in `docs/DESIGN_SYSTEM.md` |
| `src/data/` | `members.ts` (`getMembers()`, the one place member data is read), `faq.ts`, `classes.ts` (the Members page sections) |
| `src/content/recruitment.ts` | Everything on the Join page: dates, form links, events, interview rounds, countdown |
| `src/lib/constants.ts` | Company and club logo lists, gallery photos |
| `src/config.ts` | `SIGN_IN_URL` for the navbar's Sign in link (hidden while empty) |
| `data/members.json`, `data/faq.json` | The content. KTP Manager's profile sync edits `members.json` and headshots through pull requests |
| `images/` | Original photos and logos, at the repo root because profile sync writes headshots there. Never re-encode them |

## Images

`scripts/media-images.mjs` writes WebP copies of everything in `images/` into `images-derived/` (gitignored, never
committed) and updates `src/lib/imageManifest.ts` (committed). Photos get 400/800/1600/2400px versions and logos get
200/400px versions. `<Img src="images/...">` picks the right size automatically. An image that isn't in the manifest yet
still shows, using the original file. After adding images, run `npm run media:images` and commit the updated manifest.

## Common Update Tasks

### Adding a new member or pledge class
1. Put the headshot in `images/headshots/<Class>Class/` (e.g. `GammaClass/First Last.jpg`).
2. Add the member to `data/members.json` under their class key, in the same format as the others. Eboard members also
   go in `"eboard"` with their position in `"role"`.
3. For a new class, add an entry to `CLASSES` in `src/data/classes.ts` (key, label, semester, class photo), right after
   the Executive board. Until you do, the class still shows at the bottom of the page under a generic heading.
4. Run `npm run media:images` and commit the updated `src/lib/imageManifest.ts`.

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
