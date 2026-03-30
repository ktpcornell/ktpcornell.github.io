# Design System

Last Updated: 2026-03-30

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

## No Opacity Modifiers on Color Classes

**Never use Tailwind's opacity modifier syntax (`color/opacity`) to create one-off color values.**

Opacity modifiers produce implicit colors that:
- Composite differently over different backgrounds (`bg-gray-50/50` over `bg-white` ≠ over `bg-ktp-surface`)
- Are invisible to the design token system — they don't appear in `ColorsPage.tsx`
- Silently produce colors that are outside the brand palette and impossible to audit

**Prohibited:**
```tsx
className="bg-gray-50/50"         // implicit ~#fcfdfd — not a real token
className="bg-white/10"           // undocumented semi-transparent surface
className="text-ktp-primary/80"   // off-spec navy — use text-ktp-muted instead
```

**Allowed alternative — define a real token if a transparent surface is genuinely needed:**
```css
/* globals.css */
:root {
  --ktp-overlay: rgba(var(--ktp-overlay-rgb), 0.6);
}
```
Then use `bg-[var(--ktp-overlay)]` and document it in `ColorsPage.tsx`.

---

## Component Inventory

All design system components live in `src/design-system/components/`. The canonical import alias is `@/design-system/components/<ComponentName>`. Doc pages live under `src/pages/design-system/`.

---

### AlertBanner

**Import:** `@/design-system/components/AlertBanner`
**Exports:** `AlertBanner`
**Props:** `variant?: 'error' | 'warning' | 'info'` (default: `'info'`), plus standard `div` HTML attributes

When to use: Any user-facing message that needs visual prominence — errors, warnings, informational callouts.

```tsx
import { AlertBanner } from '@/design-system/components/AlertBanner'

<AlertBanner variant="error">Failed to load members.</AlertBanner>
<AlertBanner variant="warning">Your session expires in 5 minutes.</AlertBanner>
<AlertBanner variant="info">Recruitment opens March 15.</AlertBanner>
```

**Do not use instead:** `<p className="text-red-500">`, `<div className="bg-red-100 text-red-700 ...">`, or any raw colored `<div>`.

---

### Badge

**Import:** `@/design-system/components/Badge`
**Exports:** `Badge`, `ktpBadgeVariants`
**Props:** `variant?: 'default' | 'navy' | 'cyan' | 'pink' | 'gray' | 'warning' | 'danger'`

When to use: Inline status labels, category tags, role chips.

| Variant | Semantic use |
|---------|-------------|
| `default` | General / neutral |
| `navy` | Primary status |
| `cyan` | Active / highlighted / success |
| `pink` | Decorative / social |
| `gray` | Inactive / disabled |
| `warning` | Caution |
| `danger` | Destructive / critical |

```tsx
import { Badge } from '@/design-system/components/Badge'

<Badge variant="navy">Admin</Badge>
<Badge variant="warning">Pending</Badge>
<Badge variant="danger">Revoked</Badge>
```

**Do not use instead:** Hand-rolled `<span className="bg-... rounded-full px-2 text-xs">` chips.

---

### Button

**Import:** `@/design-system/components/Button`
**Exports:** `Button`, `ktpButtonVariants`
**Props:** `variant?: 'primary' | 'secondary' | 'outline' | 'ghost' | 'transparent' | 'danger'`, `size?: 'default' | 'sm' | 'lg'`, `asChild?: boolean`

When to use: Every interactive action.

| Variant | When to use |
|---------|-------------|
| `primary` | Main CTA on a page |
| `secondary` | Secondary CTA alongside a primary |
| `outline` | Lower-weight actions |
| `ghost` | Nav items, inline icon actions |
| `transparent` | Actions placed over dark/image backgrounds |
| `danger` | Destructive actions (delete, revoke) |

```tsx
import { Button } from '@/design-system/components/Button'

<Button variant="primary">Join KTP</Button>
<Button variant="danger" size="sm">Delete</Button>
<Button variant="outline" asChild><a href="/about">Learn more</a></Button>
```

**Do not use instead:** Raw `<button>` or `<a>` tags with hand-written Tailwind classes.

---

### Card / CardHeader / CardBody

**Import:** `@/design-system/components/Card`
**Exports:** `Card`, `CardHeader`, `CardBody`, `ktpCardVariants`

- `Card` — the container (wraps ShadCN Card with KTP variants)
- `CardHeader` — navy (`bg-primary`) title bar with `flex items-center justify-between`
- `CardBody` — alias for ShadCN `CardContent` with KTP standard padding (`px-6 py-5`)

```tsx
import { Card, CardHeader, CardBody } from '@/design-system/components/Card'

<Card>
  <CardHeader>
    <span className="text-white font-semibold">Announcements</span>
  </CardHeader>
  <CardBody>
    {/* content */}
  </CardBody>
</Card>
```

**Do not use instead:** `<div className="bg-primary px-6 py-4 flex items-center justify-between">` as a card title bar.

---

### FormField / SelectField / TextareaField

**Import:** `@/design-system/components/FormField`
**Exports:** `FormField`, `SelectField`, `TextareaField`

Each field wraps the underlying input with a `Label`, accessible `id` wiring, and `error` / `helperText` display.

| Export | Use for |
|--------|---------|
| `FormField` | Single-line text inputs |
| `SelectField` | Dropdown selects |
| `TextareaField` | Multi-line text inputs |

```tsx
import { FormField, SelectField, TextareaField } from '@/design-system/components/FormField'

<FormField label="Email" type="email" error={errors.email} />
<SelectField label="Role">
  <option value="member">Member</option>
  <option value="admin">Admin</option>
</SelectField>
<TextareaField label="Bio" helperText="Max 200 characters" />
```

**Do not use instead:** Raw `<input>`, `<select>`, or `<textarea>` elements without label/error wiring.

---

### SectionSeparator

**Import:** `@/design-system/components/SectionSeparator`
**Exports:** `SectionSeparator`

When to use: Visual horizontal rule between content sections or between list items in cards.

```tsx
import { SectionSeparator } from '@/design-system/components/SectionSeparator'

<SectionSeparator />
<SectionSeparator className="my-4" />
```

**Do not use instead:** Raw `<hr>` or `<div className="border-t border-gray-200 ...">`.

---

### SectionTitle

**Import:** `@/design-system/components/SectionTitle`
**Exports:** `SectionTitle`
**Props:** `title` (required), `label?`, `subtitle?`, `align?: 'left' | 'center' | 'right'` (default: `'center'`), `color?: 'primary' | 'white' | 'default'` (default: `'primary'`)

When to use: The heading block for any major page section. Handles muted text contrast automatically — `color="white"` switches the subtitle to `text-ktp-muted-light`.

```tsx
import { SectionTitle } from '@/design-system/components/SectionTitle'

<SectionTitle
  label="Our Team"
  title="Meet the Members"
  subtitle="Alpha Epsilon Chapter at Cornell University"
  align="center"
  color="primary"
/>

{/* On a dark (navy) background: */}
<SectionTitle title="Get Involved" subtitle="Applications open each semester" color="white" />
```

**Do not use instead:** Hand-written `<div><p className="uppercase text-xs">Label</p><h2>Title</h2><p>Subtitle</p></div>` combos.

---

### Typography — Heading, SmallTitle, SectionLabel, Body, Caption

**Import:** `@/design-system/components/Typography`
**Exports:** `Heading`, `SmallTitle`, `SectionLabel`, `Body`, `Caption`

| Export | Renders as | Use for |
|--------|-----------|---------|
| `Heading` | `h1`–`h6` | Semantic headings with brand scale. Props: `level?: 1–6`, `color?: 'primary' \| 'white' \| 'default'` |
| `SmallTitle` | `<p>` | Uppercase cyan label shown above section headings |
| `SectionLabel` | `<p>` | Uppercase muted label above design-system doc demo blocks |
| `Body` | `<p>` | Body copy in `text-ktp-muted` |
| `Caption` | `<p>` | Small (`text-xs`) muted text — metadata, timestamps, footnotes |

```tsx
import { Heading, Body, Caption } from '@/design-system/components/Typography'

<Heading level={1} color="primary">Welcome to KTP</Heading>
<Body>We are a professional technology fraternity at Cornell University.</Body>
<Caption>Last updated March 2026</Caption>
```

**Do not use instead:** Raw `<h2 className="text-2xl font-bold text-ktp-primary">`, `<p className="text-ktp-muted">` when the Typography components directly cover the need.

---

## Prohibited Patterns

The following are bugs without a `DS-SKIP` comment.

### Off-Brand Colors

| Prohibited | Use instead |
|-----------|-------------|
| `text-red-500`, `text-red-600`, `bg-red-100` | `AlertBanner variant="error"` or `text-ktp-error` / `bg-ktp-error-bg` |
| `bg-amber-400`, `bg-yellow-300`, `text-yellow-800` | `AlertBanner variant="warning"` or `Badge variant="warning"` or `bg-ktp-warning-bg` |
| `bg-green-500`, `text-green-600` | No KTP green token exists. Use `Badge variant="cyan"` for success states. Add a `ktp-success` token first if green is semantically required. |
| Any raw `blue-*`, `zinc-*`, `slate-*`, `gray-*` as brand surface colors | `ktp-primary`, `ktp-surface`, `ktp-muted`, `ktp-muted-light` |

### Opacity Modifiers

| Prohibited | Use instead |
|-----------|-------------|
| `bg-gray-50/50`, `bg-white/10`, `text-ktp-primary/80`, any `color/opacity` | Full-opacity `ktp-*` token; or define a new named token in `globals.css` and document it in `ColorsPage.tsx` |

### Duplicated Loading Spinner

The following HTML is duplicated across the codebase:
```tsx
<div className="w-8 h-8 border-4 border-ktp-accent border-t-transparent rounded-full animate-spin" />
```
Do not copy-paste this. When you next need a spinner, create `src/design-system/components/Spinner.tsx`, add a docs page, and use the component everywhere. Add `DS-SKIP` to existing raw copies noting this known gap.

### Other Prohibited Patterns

| Prohibited | Use instead |
|-----------|-------------|
| `<p className="text-red-500">` for error states | `<AlertBanner variant="error">` |
| `<div className="bg-primary px-6 py-4 ...">` as a card title bar | `<CardHeader>` |
| Raw `<input>`, `<select>`, `<textarea>` without label/error wiring | `FormField`, `SelectField`, `TextareaField` |
| `<button className="...">` with hand-written styles | `<Button variant="...">` |
| `<h2 className="text-2xl font-bold text-ktp-primary">` as a section heading | `<SectionTitle title="...">` |

---

## DS-SKIP: Documenting Design Deviations

Any code that intentionally deviates from the design system must carry a `DS-SKIP` comment. No silent deviations.

### Format

```tsx
{/* DS-SKIP: <reason> */}
```
or for plain `.ts` files:
```ts
// DS-SKIP: <reason>
```

Place the comment directly above the deviating element or class.

### When DS-SKIP is required

- Using a raw HTML element where a design system component exists (`<button>` instead of `<Button>`)
- Using an off-brand Tailwind color (`bg-amber-400`) where a `ktp-*` token should be used
- Using a Tailwind opacity modifier (`bg-gray-50/50`, `bg-white/10`)
- Using `!important` or negative margins to override design system component spacing
- A preview skeleton that intentionally uses a simplified element instead of the real component

### Valid vs. invalid reasons

| Valid DS-SKIP reason | Invalid (fix the code instead) |
|---------------------|-------------------------------|
| "ShadCN Dialog renders its own root; CardHeader padding breaks inside it" | "It was faster" |
| "Third-party map has no insertion point for AlertBanner" | "Looks similar enough" |
| "Preview skeleton — using `<span>` to avoid Button sizing interference" | No comment at all |

### Examples

```tsx
{/* DS-SKIP: self-stretch overrides parent items-center so hero fills the full preview zone height */}
<div className="w-full self-stretch bg-ktp-primary ...">

// DS-SKIP: Simplified skeleton preview — not a real Button. Using <span> to avoid
// Button sizing/padding interfering with the constrained preview zone.
const ButtonsPreview = () => (...)

{/* DS-SKIP: bg-gray-50/50 predates opacity modifier ban — replace with bg-ktp-surface */}
<aside className="bg-gray-50/50 ...">
```

Without DS-SKIP comments, future contributors will see an unusual pattern and "fix" it, breaking the intentional behavior — or assume the pattern is acceptable and copy it.

---

## Applying Visual Changes Consistently

**Before making any visual/sizing change, ask: does this pattern appear elsewhere in the codebase?**

When a user asks to change a visual property (height, padding, font size, spacing, etc.), the change may apply to a shared pattern used in multiple places. Making a local-only edit silently creates inconsistency.

**Rule:** Before applying a sizing or spacing change:
1. Search for other components or pages that use the same visual pattern
2. If the pattern exists elsewhere, apply the change consistently across all instances — or document why the instances are intentionally different
3. If you genuinely believe a change is local-only, **ask the user for confirmation before proceeding**

---

## Keeping the Design System in Sync

**Every token change must be reflected in `ColorsPage.tsx`.**

When you add, rename, or remove a token:
1. Update `src/styles/globals.css` (the CSS variable)
2. Update `tailwind.config.ts` (the Tailwind alias)
3. Update `src/pages/design-system/ColorsPage.tsx` (add/edit/remove the `ColorCard`)
4. Update this doc if the usage guidance changes

Failure to do step 3 means the design system page silently drifts out of sync — future contributors will rely on stale documentation.

---

## Shared Components Reference

Components live in `src/design-system/components/`. Each has a corresponding doc page under `src/pages/design-system/`.

| Component | File | Import path | Doc page |
|-----------|------|-------------|----------|
| AlertBanner | `components/AlertBanner.tsx` | `@/design-system/components/AlertBanner` | `/design-system/components/alerts` |
| Badge | `components/Badge.tsx` | `@/design-system/components/Badge` | `/design-system/components/badges` |
| Button | `components/Button.tsx` | `@/design-system/components/Button` | `/design-system/components/buttons` |
| Card / CardHeader / CardBody | `components/Card.tsx` | `@/design-system/components/Card` | `/design-system/components/cards` |
| FormField / SelectField / TextareaField | `components/FormField.tsx` | `@/design-system/components/FormField` | `/design-system/components/form-fields` |
| SectionSeparator | `components/SectionSeparator.tsx` | `@/design-system/components/SectionSeparator` | `/design-system/section-separator` |
| SectionTitle | `components/SectionTitle.tsx` | `@/design-system/components/SectionTitle` | `/design-system/section-title` |
| Heading / SmallTitle / SectionLabel / Body / Caption | `components/Typography.tsx` | `@/design-system/components/Typography` | `/design-system/typography` |

When adding a new shared component, create a corresponding doc page and add it to the sidebar in `src/pages/design-system/DesignSystemLayout.tsx`.
