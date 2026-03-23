# Design System

Last Updated: 2026-03-23

The KTP design system lives at `/design-system` in the running app and provides a visual reference for every color token, typography scale, and shared UI component.

---

## Token Pipeline

All tokens follow a single flow — define once, use everywhere:

```
src/styles/globals.css        ← CSS variable definitions (--ktp-*)
        ↓
tailwind.config.ts            ← Exposes vars as Tailwind classes (ktp-*)
        ↓
src/pages/design-system/      ← Visual documentation (must stay in sync)
```

### CSS Variables (`globals.css`)

All KTP brand tokens are defined as CSS custom properties under `:root`. Naming convention: `--ktp-<role>`.

| Variable | Value | Usage |
| -------- | ----- | ----- |
| `--ktp-primary` | `#273053` | Navy — headers, nav, CTAs, card headers |
| `--ktp-accent` | `#0dcaf0` | Cyan — highlights, secondary buttons, focus rings |
| `--ktp-surface` | `#f0f8ff` | Light blue — alternating section backgrounds, portal pages |
| `--ktp-muted` | `#717275` | Default body copy and secondary text on **light** backgrounds |
| `--ktp-muted-light` | `#a8adb8` | Muted text on **dark** (`ktp-primary`) backgrounds |
| `--ktp-accent-pink` | `#f78fb3` | Pink accent — decorative use only |
| `--ktp-error` | `#991b1b` | Error text inside alert banners |
| `--ktp-error-bg` | `#fee2e2` | Error alert banner background |
| `--ktp-warning-bg` | `#fef3c7` | Warning alert banner background |
| `--ktp-warning-border` | `#f59e0b` | Warning banner border |
| `--ktp-warning-text` | `#92400e` | Warning banner body text |

### Tailwind Classes (`tailwind.config.ts`)

CSS variables are aliased as Tailwind utilities so they work with all modifiers (`hover:`, `dark:`, opacity `/50`, etc.).

| Tailwind class | CSS variable |
| -------------- | ------------ |
| `ktp-primary` | `--primary` (HSL, supports opacity) |
| `ktp-accent` | `--secondary` (HSL, supports opacity) |
| `ktp-surface` | `--ktp-surface` |
| `ktp-muted` | `--ktp-muted` |
| `ktp-muted-light` | `--ktp-muted-light` |
| `ktp-accent-pink` | `--ktp-accent-pink` |
| `ktp-error` | `--ktp-error` |
| `ktp-error-bg` | `--ktp-error-bg` |
| `ktp-warning-bg` | `--ktp-warning-bg` |
| `ktp-warning-border` | `--ktp-warning-border` |
| `ktp-warning-text` | `--ktp-warning-text` |

---

## Muted Text on Dark Backgrounds

`ktp-muted` (#717275) is designed for light backgrounds. On `ktp-primary` (dark navy) it does not have sufficient contrast.

**Rule:** use `text-ktp-muted-light` (#a8adb8) for muted/secondary text whenever the background is dark.

| Context | Class to use |
| ------- | ------------ |
| Body copy on white/surface bg | `text-ktp-muted` |
| Subtitle/secondary text on `bg-ktp-primary` | `text-ktp-muted-light` |
| Headings on dark bg | `text-white` |

The `SectionTitle` component handles this automatically via its `color` prop: `color="white"` switches the subtitle to `text-ktp-muted-light`.

---

## Keeping the Design System in Sync

**Every token change must be reflected in `ColorsPage.tsx`.**

When you add, rename, or remove a token:
1. Update `src/styles/globals.css` (the CSS variable)
2. Update `tailwind.config.ts` (the Tailwind alias)
3. Update `src/pages/design-system/ColorsPage.tsx` (add/edit/remove the `ColorCard`)
4. Update this doc if the usage guidance changes

Failure to do step 3 means the design system page silently drifts out of sync with the actual tokens — future contributors will rely on stale documentation.

---

## Shared Components

Components live in `src/design-system/components/` and are documented under `src/pages/design-system/`.

| Component | File | Doc page |
| --------- | ---- | -------- |
| SectionTitle | `components/SectionTitle.tsx` | `/design-system/section-title` |
| Typography | `components/Typography.tsx` | `/design-system/typography` |
| Card / CardBody | `components/Card.tsx` | `/design-system/components/cards` |
| FormField | `components/FormField.tsx` | `/design-system/components/form-fields` |
| Button (ShadCN) | via ShadCN | `/design-system/components/buttons` |
| Badge (ShadCN) | via ShadCN | `/design-system/components/badges` |
| Alert (ShadCN) | via ShadCN | `/design-system/components/alerts` |

When adding a new shared component, create a corresponding doc page and add it to the sidebar in `src/pages/design-system/DesignSystemLayout.tsx`.
