# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Project Overview

Official website for Kappa Theta Pi (KTP) Alpha Epsilon Chapter at Cornell University. This is a **static site with no build step** — pure HTML/CSS/JS hosted on GitHub Pages at ktpcornell.com.

## Running Locally

No install or build required. Use any local HTTP server:

```bash
python -m http.server 8000
# or
npx http-server
```

There is no test suite or linter configured.

## Deployment

Push to `main` branch — GitHub Pages auto-deploys.

## Architecture

**Pages:** `index.html` (home), `about.html` (gallery/FAQ), `members.html` (member directory), `join.html` (recruitment/application)

**Client-side React:** React 18 + Babel Standalone compile JSX in the browser. React components are defined inline within HTML files (not separate `.jsx` files). Used for interactive elements like member cards (flip animation) and the photo gallery.

**Data:** Content is stored in `data/members.json` (member info by class: eboard, alpha, beta, founders) and `data/faq.json`. Components fetch these at runtime.

**Styling:** Bootstrap 5 framework + custom theme in `css/templatemo-leadership-event.css`. CSS variables define the color scheme (primary cyan `#0dcaf0`, navbar navy `#273053`). Font: DM Sans via Google Fonts CDN.

**JS:** `js/custom.js` handles navbar behavior, card flip animations, smooth scrolling, and Bootstrap tab/accordion fallbacks. jQuery and Bootstrap JS are included locally as minified files.

**Images:** Organized under `images/` with subdirectories: `headshots/` (by class), `gallery/`, `clubs/` (club logos), `network/` (company logos), `classpictures/`.
