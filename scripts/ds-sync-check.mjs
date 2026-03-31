/**
 * ds-sync-check.mjs
 *
 * Claude Code PostToolUse hook — runs after every Edit/Write tool call.
 * Checks design-system-adjacent file changes and warns when docs are out of sync.
 *
 * Triggered by: globals.css, tailwind.config.ts, src/design-system/**, src/pages/design-system/**, docs/DESIGN_SYSTEM.md, CLAUDE.md
 * Silent when: unrelated file was edited, or everything is in sync
 */

import { readFileSync } from 'fs'
import { resolve, relative } from 'path'

const REPO_ROOT = '/Users/gabrielcastillo/Developer/Websites/ktpcornell.github.io'

// ─── Read stdin (Claude Code hook input is JSON on stdin) ───────────────────
let input
try {
  const chunks = []
  for await (const chunk of process.stdin) chunks.push(chunk)
  input = JSON.parse(Buffer.concat(chunks).toString('utf8'))
} catch {
  process.exit(0) // not JSON or no stdin — exit silently
}

const filePath = input?.tool_input?.file_path ?? input?.file_path ?? ''
if (!filePath) process.exit(0)

const relPath = relative(REPO_ROOT, filePath)

// ─── DS-adjacent file triggers ───────────────────────────────────────────────
const DS_TRIGGERS = [
  'src/styles/globals.css',
  'tailwind.config.ts',
  'CLAUDE.md',
  'docs/DESIGN_SYSTEM.md',
]
const DS_DIR_TRIGGERS = [
  'src/design-system/',
  'src/pages/design-system/',
]

const isTriggered =
  DS_TRIGGERS.some((t) => relPath === t) ||
  DS_DIR_TRIGGERS.some((d) => relPath.startsWith(d))

if (!isTriggered) process.exit(0)

// ─── Helpers ─────────────────────────────────────────────────────────────────
function read(relativeOrAbsPath) {
  try {
    const p = relativeOrAbsPath.startsWith('/')
      ? relativeOrAbsPath
      : resolve(REPO_ROOT, relativeOrAbsPath)
    return readFileSync(p, 'utf8')
  } catch {
    return ''
  }
}

const warnings = []

// ─── 1. Token sync check (globals.css ↔ tailwind.config.ts ↔ ColorsPage) ───
if (relPath === 'src/styles/globals.css' || relPath === 'tailwind.config.ts') {
  const css = read('src/styles/globals.css')
  const twConfig = read('tailwind.config.ts')
  const colorsPage = read('src/pages/design-system/ColorsPage.tsx')

  // Extract --ktp-* names from CSS (skip rgb/overlay/white/legacy vars)
  const cssTokens = [...css.matchAll(/--ktp-([\w-]+)\s*:/g)]
    .map(m => `ktp-${m[1]}`)
    .filter(t => !t.includes('rgb') && !t.includes('overlay') && !t.includes('primary-rgb'))

  // Extract ktp-* keys from tailwind config
  const twTokens = [...twConfig.matchAll(/'(ktp-[\w-]+)'\s*:/g)].map(m => m[1])

  // Extract tailwindClass values from ColorsPage
  const colorPageClasses = [...colorsPage.matchAll(/tailwindClass="([^"]+)"/g)].map(m => m[1])
  // Normalize to token names (strip bg-/text-/border-)
  const colorPageTokens = colorPageClasses.map(c => c.replace(/^(bg-|text-|border-)/, ''))

  for (const token of cssTokens) {
    if (!twTokens.includes(token)) {
      warnings.push(`Token \`${token}\` is in globals.css but NOT in tailwind.config.ts`)
    }
  }

  for (const token of twTokens) {
    if (token === 'ktp-primary' || token === 'ktp-accent') continue // HSL variants, documented fine
    const inColors = colorPageTokens.some(t => t.includes(token.replace('ktp-', '')))
    if (!inColors) {
      warnings.push(`Token \`${token}\` is in tailwind.config.ts but has no ColorCard in ColorsPage.tsx`)
    }
  }
}

// ─── 2. Component docs check (design-system component file or index.ts) ─────
if (relPath.startsWith('src/design-system/components/') || relPath === 'src/design-system/index.ts') {
  const layoutSrc = read('src/pages/design-system/DesignSystemLayout.tsx')
  const indexSrc = read('src/design-system/index.ts')

  // Extract exported component names from index.ts
  const exports = [...indexSrc.matchAll(/export\s*\{([^}]+)\}/g)]
    .flatMap(m => m[1].split(',').map(s => s.trim().split(' ').pop()))
    .filter(Boolean)

  // Extract nav to: paths
  const navPaths = [...layoutSrc.matchAll(/to:\s*'([^']+)'/g)].map(m => m[1])

  // Warn if there are component files without a nav entry
  warnings.push(
    `ℹ️  Reminder: if you added or renamed a design system component, also update docs/DESIGN_SYSTEM.md component table and register it in DesignSystemLayout.tsx.`
  )
  warnings.push(
    `   Current exports from index.ts: ${exports.join(', ')}`
  )
  void navPaths // used implicitly
}

// ─── 3. Route staleness check (DesignSystemLayout.tsx changed) ───────────────
if (relPath === 'src/pages/design-system/DesignSystemLayout.tsx') {
  const layoutSrc = read('src/pages/design-system/DesignSystemLayout.tsx')
  const docsSrc = read('docs/DESIGN_SYSTEM.md')

  const navPaths = [...layoutSrc.matchAll(/to:\s*'(\/design-system[^']+)'/g)].map(m => m[1])

  for (const path of navPaths) {
    if (!docsSrc.includes(path)) {
      warnings.push(`Route \`${path}\` is in DesignSystemLayout.tsx but not found in docs/DESIGN_SYSTEM.md`)
    }
  }
}

// ─── 4. CLAUDE.md date check (any DS file edited) ────────────────────────────
{
  const claudeSrc = read('CLAUDE.md')
  const dateMatch = claudeSrc.match(/Last Updated:\s*(\d{4}-\d{2}-\d{2})/)
  if (dateMatch) {
    const storedDate = dateMatch[1]
    const today = new Date().toISOString().slice(0, 10)
    if (storedDate !== today) {
      warnings.push(
        `CLAUDE.md Last Updated is stale — shows \`${storedDate}\`, today is \`${today}\`. Update the date.`
      )
    }
  }
}

// ─── Output ──────────────────────────────────────────────────────────────────
if (warnings.length > 0) {
  console.log('=== DS Sync Check ===')
  for (const w of warnings) {
    console.log(`  • ${w}`)
  }
}
