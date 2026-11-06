# CLAUDE.md

Last Updated: 12/7/2025 by Amishi

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

**Important:** If you change the file structure or anything that would impact future devs from updating the website, please also update these instructions. Feel free to update any instructions that might not be clear enough or any FAQs you had.

## Project Overview

Official website for Kappa Theta Pi (KTP) Alpha Epsilon Chapter at Cornell University. This is a **static site with no build step** — pure HTML/CSS/JS hosted on GitHub Pages at ktpcornell.com.

Repository: https://github.com/ktpcornell/ktpcornell.github.io

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

## Common Update Tasks

### Semester Update Checklist

Every semester:
- Prompt new members to submit the website update form
- Prompt ALL active members to update their descriptions and current companies

### Updating Company Placements ("Our Placement" and "Other Involvements" Clouds)

1. Check if the logo already exists in `images/network/` folder
2. If not, search for the logo online, copy it, and paste it in the folder
3. Rename the file to `<company>.png`
4. Go to `index.html` and scroll to the bottom until you see the list of companies
5. Copy an existing line and add: `{ name: '<company_name>', file: '<company>.png' },`
6. For club placements, follow the same process but place images in `images/clubs/`

### Adding New Members to Members Page

**Step 1: Add Headshot**
- Place the member's headshot in `images/headshots/<class_name>/` folder
- Rename the file to their name (e.g., `Gregory Parent.jpeg`)
- Create a new folder if it doesn't exist for that class

**Step 2: Update members.json**
- Go to `data/members.json`
- Add a new class if needed (e.g., `"gamma": []`)
- Add each new member following this format:

```json
{
  "name": "Gregory Parent",
  "major": "Computer Science '28",
  "photo": "images/headshots/AlphaClass/Gregory Parent.jpeg",
  "hometown": "Armonk, NY",
  "linkedin": "https://www.linkedin.com/in/gregory-parent",
  "email": "gmp89@cornell.edu",
  "description": "Outside KTP, Gregory is involved in Cornell Fintech Club. In his free time, he enjoys lifting, watching movies, and listening to Rock Music.",
  "role": ""
}
```

**Note:** If the member is on e-board, add their position in the `"role"` field.

**Step 3: Update members.html**
- Add this HTML for each new class below the e-board class
- Replace `<class_name>` tags (e.g., alpha, beta, gamma)
- Replace `<semester_year>` with the appropriate semester and year

```html
<h2 class="fw-bold text-center mb-1" style="color: var(--navbar-bg-color);"><class_name> Class</h2>
<h4 class="text-center mb-4"><semester_year></h4>
<div class="text-center mb-5">
    <img src="images/classpictures/<class_name>.png" class="img-fluid" style="max-width: 750px; width: 100%;" alt="<class_name> Class group photo">
</div>

<div id="<class_name>-root" class="row g-4 mb-5 justify-content-center">
    <div class="col-12 text-center">
        <p>Loading <class_name> Class members...</p>
    </div>
</div>
```

**Step 4: Update the Render Script**
- In the bottom fetch script in `members.html`, add:
  ```javascript
  renderMembers('<class_name>-root', data.<class_name>);
  ```

### Updating Recruitment Timeline

1. Go to `join.html`
2. Use Ctrl+F to find the events/dates you want to change
3. Update the text directly in the HTML

### Adding Images to Gallery

1. Add the image to `images/gallery/` folder
2. Rename it with a descriptive name to keep it organized
3. Go to `about.html`
4. Find the `const galleryImages` section
5. Add the path to your image, ensuring the path name matches correctly

## Getting Access

Reach out to one of the repository collaborators if you need to be added as a collaborator to make changes.
