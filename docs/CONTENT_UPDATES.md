# Content Updates

## Semester Update Checklist

Every semester:
- Prompt new members to submit the website update form
- Prompt ALL active members to update their descriptions and current companies
- Update company placements if alumni have joined new companies
- Add new class photos to `public/images/classpictures/`

---

## Adding New Members to the Members Page

### Step 1: Add Headshot

Place the member's headshot in `public/images/headshots/<ClassName>/`.

- Rename the file to their name (e.g., `Gregory Parent.jpeg`)
- Create the folder if it doesn't exist for a new class (e.g., `GammaClass/`)

### Step 2: Update `public/data/members.json`

Add the new member to the appropriate class array. Add a new class key if needed (e.g., `"gamma": []`).

```json
{
  "name": "Gregory Parent",
  "major": "Computer Science '28",
  "photo": "/images/headshots/AlphaClass/Gregory Parent.jpeg",
  "hometown": "Armonk, NY",
  "linkedin": "https://www.linkedin.com/in/gregory-parent",
  "email": "gmp89@cornell.edu",
  "description": "Outside KTP, Gregory is involved in Cornell Fintech Club. In his free time, he enjoys lifting, watching movies, and listening to Rock Music.",
  "role": ""
}
```

If the member is on e-board, set `"role"` to their position (e.g., `"President"`).

### Step 3: Add a New Class Section (only for a brand-new class)

In `src/pages/public/MembersPage.tsx`, the class sections are rendered from the fetched JSON. If you add a new key in `members.json` (e.g., `gamma`), add a corresponding render call in `MembersPage.tsx`:

```tsx
{data.gamma && (
  <MemberClassSection
    title="Gamma Class"
    semester="Fall 2025"
    classPicture="/images/classpictures/gamma.png"
    members={data.gamma}
  />
)}
```

Also add `gamma` to the `KTP_CLASSES` array in `src/lib/constants.ts` so it appears in the admin alumni dropdown.

### Step 4: Add Class Picture

Place the class group photo at `public/images/classpictures/<classname>.png` (lowercase, matches the filename you used in Step 3).

---

## Updating Company Placements

The placement and campus clubs logo clouds are driven by `src/lib/constants.ts`.

### Company Logos (Our Placement cloud)

1. Check if the logo exists in `public/images/network/`
2. If not, find the logo online and save it as `<company>.png` in that folder
3. In `src/lib/constants.ts`, add an entry to the `placements` array:
   ```ts
   { name: 'Company Name', file: 'CompanyName.png' }
   ```

### Campus Club Logos (Other Involvements cloud)

Same process, but logos go in `public/images/clubs/` and entries go in the `campusClubs` array in `constants.ts`.

---

## Adding Gallery Images

1. Add the image to `public/images/gallery/`
2. Use a descriptive filename (e.g., `fall2025-retreat.jpg`)
3. In `src/lib/constants.ts`, add the path to `galleryImages`:
   ```ts
   '/images/gallery/fall2025-retreat.jpg'
   ```

---

## Updating Recruitment Timeline

The recruitment schedule is in `src/pages/public/JoinPage.tsx` and rendered by `src/components/public/RecruitmentTabs.tsx`.

1. Open `src/pages/public/JoinPage.tsx`
2. Find the events array / tab content
3. Update dates, event names, and descriptions directly in the JSX

---

## Updating FAQ

FAQ content lives in `public/data/faq.json`. Each entry is:

```json
{
  "question": "What is KTP?",
  "answer": "Kappa Theta Pi is a professional technology fraternity..."
}
```

The `FaqAccordion` component in `src/components/public/FaqAccordion.tsx` fetches and renders this file automatically.

---

## Updating Navbar / Footer Links

- **Navbar:** `src/components/layout/Navbar.tsx`
- **Footer:** `src/components/layout/Footer.tsx`

Both files have a clear links array near the top. Edit those arrays to add, remove, or rename links.
