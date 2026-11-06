#!/usr/bin/env node
/**
 * Generate responsive WebP copies of every photo and logo in `images/`.
 *
 * WHY. The site serves its images exactly as they were uploaded: 24-megapixel camera
 * JPEGs (6000x4000, 5-7 MB each), photos saved as PNG (one is 16 MB), and a 13170x3600
 * club logo that renders 48px tall. A phone downloads all of that and throws ~98% away.
 * Ported from Il Colosseo's `scripts/media-images.mjs` (plan row S13 there), where the
 * same pipeline took a phone home page from 3924 KB to 287 KB. Spec: KTP
 * `docs/specs/2026-11-06-ktp-site-react-rebuild-design.md`, D4.
 *
 * ─── THE RULES THIS SCRIPT WORKS UNDER ──────────────────────────────────────
 *
 * 1. **Originals are never touched.** `images/` is read-only here: nothing is resized,
 *    re-encoded, moved or deleted. KTP Manager's profile sync writes full-size headshots
 *    into `images/headshots/<Class>Class/`, so re-encoding in place would drift on every
 *    sync (D4, rejected option).
 *
 * 2. **Copies are never committed.** They go to `images-derived/` (gitignored), mirroring
 *    the folder structure of `images/`. They are rebuilt from the originals on demand,
 *    which is what makes them safe to throw away.
 *
 * 3. **The manifest IS committed** as a generated TS module, `src/lib/imageManifest.ts`.
 *    The app needs it at runtime to know which widths exist: a `srcset` naming a file
 *    that is not there does not degrade, the browser picks it and the image fails.
 *
 * 4. **Never upscale.** A rung wider than the (EXIF-oriented) original is skipped. A
 *    source narrower than the smallest rung still gets one copy at its own width.
 *
 * 5. **Idempotent.** A copy is rebuilt only when its source is newer than it, so a re-run
 *    costs seconds. Copies are written to a `.part` file and renamed, so an interrupted
 *    run can never leave a truncated file that looks up to date.
 *
 * 6. A file that fails to decode is WARNED about and left out of the manifest (it then
 *    renders from its original); it never fails the run, so one bad headshot from
 *    profile sync can't break `npm run dev`.
 *
 * ─── LADDERS ────────────────────────────────────────────────────────────────
 *
 *   images/network/**, images/clubs/**   [200, 400]               logos, 48–80px tall
 *   everything else                       [400, 800, 1600, 2400]   photos
 *
 * ─── DERIVATIVE NAMES (collision-free) ──────────────────────────────────────
 *
 *   images/<dir>/<stem>.<ext>  ->  images-derived/<dir>/<stem>-<ext lowercased>-<width>.webp
 *
 *   e.g. images/headshots/AlphaClass/Gregory Parent.jpeg
 *        -> images-derived/headshots/AlphaClass/Gregory Parent-jpeg-400.webp
 *
 * The source extension stays in the name, so `x.png` and `x.jpg` in one folder can never
 * share a copy, and adding a sibling never renames an existing file's copies. The name
 * parses unambiguously from the right (`-<ext>-<width>.webp`), so distinct sources give
 * distinct names. The only collision left is one that differs by letter case alone
 * (`X.jpg` and `x.JPG`, possible on Linux, impossible on Windows/macOS where the output
 * folder is case-insensitive). Before writing anything, the script groups every planned
 * name case-insensitively; in a colliding group the first source (sorted) keeps the
 * default name and each other one gets `~<first 8 hex of sha1(manifest key)>` appended to
 * its stem, recorded in the manifest as `d` so the runtime finds it. A warning is printed.
 *
 * Run: `npm run media:images` (also runs before `npm run dev` and `npm run build`).
 */

import { readdir, stat, mkdir, writeFile, readFile, rename, rm } from 'node:fs/promises'
import { existsSync } from 'node:fs'
import { createHash } from 'node:crypto'
import { join, relative, dirname, extname, basename } from 'node:path'
import { fileURLToPath } from 'node:url'
import sharp from 'sharp'

const REPO = join(dirname(fileURLToPath(import.meta.url)), '..')
const SOURCE_DIR = join(REPO, 'images')
const OUT_DIR = join(REPO, 'images-derived')
const MANIFEST = join(REPO, 'src', 'lib', 'imageManifest.ts')

const PHOTO_WIDTHS = [400, 800, 1600, 2400]
const LOGO_WIDTHS = [200, 400]
/** Folders (relative to images/) whose files are logos and get the small ladder. */
const LOGO_DIRS = ['network/', 'clubs/']
/** Same quality Il Colosseo settled on by looking at it. WebP keeps PNG transparency. */
const QUALITY = 82
/**
 * Quality for the "native width" copy (see the widths rule in main). That copy is the largest
 * thing a big screen gets for a source that falls between rungs, and those sources are usually
 * already-compressed exports (the Fall 2025 class photos are 1920px JPEGs), so a second q82
 * pass shows. q90 keeps it close to the original at roughly the original's file size.
 */
const QUALITY_NATIVE = 90
const IMAGE_EXT = /\.(jpe?g|png)$/i
/** Files processed at once. sharp is itself multithreaded; this just keeps the CPU fed. */
const CONCURRENCY = 3

/**
 * `limitInputPixels: 100 MP`: headshots arrive from members through KTP Manager's profile
 * sync, so a decompression bomb is possible in principle. The largest legitimate file is the
 * DTI logo (13170x3600, 47 MP) and phone/camera photos top out around 50 MP, so 100 MP leaves
 * headroom; anything bigger is skipped with a warning (the page then serves the original).
 * `failOn: 'error'` tolerates the minor warnings (truncated EXIF etc.) that phone JPEGs often
 * carry instead of skipping the file.
 */
const SHARP_INPUT = { limitInputPixels: 100_000_000, failOn: 'error' }

sharp.cache(false)

const posix = (p) => p.split('\\').join('/')

async function* walk(dir) {
  for (const entry of await readdir(dir, { withFileTypes: true })) {
    if (entry.name.startsWith('.')) continue
    const full = join(dir, entry.name)
    if (entry.isDirectory()) yield* walk(full)
    else if (entry.isFile()) yield full
  }
}

/** Rebuild only when the source is newer than the copy. */
async function isStale(srcMtimeMs, out) {
  if (!existsSync(out)) return true
  return srcMtimeMs > (await stat(out)).mtimeMs
}

/** `images/a/b c.JPG` -> `a/b c-jpg` (relative to images-derived/, no width/extension). */
function defaultBase(rel) {
  const ext = extname(rel)
  const dir = dirname(rel)
  const stem = basename(rel, ext)
  const name = `${stem}-${ext.slice(1).toLowerCase()}`
  return dir === '.' ? name : `${dir}/${name}`
}

function ladderFor(rel) {
  return LOGO_DIRS.some((d) => rel.startsWith(d)) ? LOGO_WIDTHS : PHOTO_WIDTHS
}

async function pool(items, n, fn) {
  let i = 0
  const workers = Array.from({ length: Math.min(n, items.length) }, async () => {
    while (i < items.length) {
      const item = items[i++]
      await fn(item)
    }
  })
  await Promise.all(workers)
}

async function main() {
  const started = Date.now()
  if (!existsSync(SOURCE_DIR)) {
    console.error(`media-images: ${SOURCE_DIR} does not exist`)
    process.exit(1)
  }

  // ── 1. Plan: list sources, assign collision-free derivative names. ──────────
  const sources = []
  for await (const file of walk(SOURCE_DIR)) {
    if (!IMAGE_EXT.test(file)) continue
    const rel = posix(relative(SOURCE_DIR, file))
    sources.push({ file, rel, key: `images/${rel}`, base: defaultBase(rel), override: false })
  }
  sources.sort((a, b) => (a.key < b.key ? -1 : a.key > b.key ? 1 : 0))

  const groups = new Map()
  for (const s of sources) {
    const k = s.base.toLowerCase()
    if (!groups.has(k)) groups.set(k, [])
    groups.get(k).push(s)
  }
  const warnings = []
  for (const group of groups.values()) {
    if (group.length < 2) continue
    for (const s of group.slice(1)) {
      const hash = createHash('sha1').update(s.key).digest('hex').slice(0, 8)
      s.base = `${s.base}~${hash}`
      s.override = true
    }
    warnings.push(
      `name collision (case-only): ${group.map((s) => s.key).join(' | ')} -> ` +
        `disambiguated as ${group.map((s) => s.base).join(' | ')}`
    )
  }

  // ── 2. Generate. ────────────────────────────────────────────────────────────
  const manifest = {}
  let generated = 0
  let upToDate = 0
  let sourceBytes = 0
  let outputBytes = 0
  let fileCount = 0

  await pool(sources, CONCURRENCY, async (s) => {
    try {
      const st = await stat(s.file)
      const meta = await sharp(s.file, SHARP_INPUT).metadata()
      // Oriented dimensions: what the browser shows, and what the copies will be.
      const w = meta.autoOrient?.width ?? meta.width
      const h = meta.autoOrient?.height ?? meta.height
      if (!w || !h) {
        warnings.push(`SKIPPED (no dimensions) ${s.key}`)
        return
      }

      // Every rung the source can fill. A source narrower than the smallest rung gets one copy at
      // its own width. A source that falls BETWEEN rungs (1920px: above 1600, below 2400) also
      // gets a copy at its own width; otherwise its largest copy would be 1600 and a 1920+ screen
      // would stretch it (the home hero looked soft on 2026-11-06). Sources wider than the top rung
      // don't: 2400 is plenty and a 6000px copy would be megabytes.
      const ladder = ladderFor(s.rel)
      const widths = ladder.filter((x) => x <= w)
      const native = widths.length === 0 || (ladder.some((x) => x > w) && widths[widths.length - 1] < w)
      if (native) widths.push(w)

      const outSubdir = join(OUT_DIR, dirname(s.base))
      await mkdir(outSubdir, { recursive: true })

      let bytes = 0
      for (const width of widths) {
        const out = join(OUT_DIR, `${s.base}-${width}.webp`)
        if (await isStale(st.mtimeMs, out)) {
          const part = `${out}.part`
          try {
            await sharp(s.file, SHARP_INPUT)
              .rotate() // respect EXIF orientation; the copy carries no EXIF
              .resize({ width, withoutEnlargement: true })
              .webp({ quality: native && width === w ? QUALITY_NATIVE : QUALITY, effort: 5 })
              .toFile(part)
            await rename(part, out)
          } catch (err) {
            await rm(part, { force: true })
            throw err
          }
          generated++
        } else {
          upToDate++
        }
        bytes += (await stat(out)).size
      }

      sourceBytes += st.size
      outputBytes += bytes
      fileCount++
      manifest[s.key] = s.override ? { w, h, widths, d: s.base } : { w, h, widths }
    } catch (err) {
      warnings.push(`SKIPPED (${err.message}) ${s.key}`)
    }
  })

  // ── 3. Manifest. Sorted so the committed file has a stable diff. ─────────────
  const sorted = Object.fromEntries(Object.keys(manifest).sort().map((k) => [k, manifest[k]]))
  const next =
    `// GENERATED by scripts/media-images.mjs — do not edit by hand.\n` +
    `// Regenerate with \`npm run media:images\` (runs before dev and build). Committed on\n` +
    `// purpose: the app needs it to know which widths exist. A srcset naming a file that\n` +
    `// is not there does not degrade gracefully, so this cannot be guessed at runtime.\n` +
    `//\n` +
    `// Keys are repo-relative POSIX paths of the ORIGINALS. \`widths\` is per-file because\n` +
    `// originals differ in size and nothing is ever upscaled. Copies live at\n` +
    `// images-derived/<base>-<width>.webp, where <base> is \`d\` when present, else the\n` +
    `// key minus "images/" with ".<ext>" replaced by "-<ext lowercased>".\n\n` +
    `export interface ManifestEntry {\n` +
    `  /** Intrinsic width of the ORIGINAL (EXIF-oriented), in pixels. */\n  w: number\n` +
    `  /** Intrinsic height of the ORIGINAL (EXIF-oriented), in pixels. */\n  h: number\n` +
    `  /** Copy widths that actually exist on disk for this image, ascending. */\n  widths: number[]\n` +
    `  /** Derivative base path override, only set to break a case-only name collision. */\n  d?: string\n` +
    `}\n\n` +
    `export const IMAGE_MANIFEST: Record<string, ManifestEntry> = ${JSON.stringify(sorted, null, 2)}\n`
  const prev = existsSync(MANIFEST) ? await readFile(MANIFEST, 'utf8') : null
  if (prev !== next) {
    await writeFile(MANIFEST, next)
    console.log(`media-images: manifest updated (${Object.keys(sorted).length} images)`)
  }

  for (const w of warnings) console.warn(`media-images: WARNING ${w}`)
  const mb = (n) => (n / 1048576).toFixed(1)
  const secs = ((Date.now() - started) / 1000).toFixed(1)
  console.log(
    `media-images: ${fileCount} images, ${generated} copies generated, ${upToDate} up to date, ` +
      `${warnings.length} warnings, ${secs}s · sources ${mb(sourceBytes)} MB -> ` +
      `copies ${mb(outputBytes)} MB (all widths combined; a browser downloads one)`
  )
}

main().catch((err) => {
  console.error('media-images: FAILED —', err.message)
  process.exit(1)
})
