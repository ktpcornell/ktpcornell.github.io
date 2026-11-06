import { IMAGE_MANIFEST, type ManifestEntry } from '@/lib/imageManifest'

/**
 * Turn a repo image path into `<img src srcset>` attributes backed by WebP copies.
 *
 * Given a repo image path as it appears in data or constants (e.g.
 * "images/headshots/GammaClass/Linda Gu.jpg", with or without a leading "/"), returns the
 * attributes for an <img>. `src` is ALWAYS the original file, so anything not optimized
 * still renders. `srcSet` is only present when optimized copies exist.
 *
 * Ported from Il Colosseo (plan row S13 there). The generator is `scripts/media-images.mjs`;
 * its header documents the derivative naming scheme mirrored by `derivedBase` below.
 *
 * THE ORIGINAL STAYS THE `src`. It is the fallback that makes this safe: a stale manifest,
 * a copy that failed to generate, or a headshot that profile sync added since the last
 * build all resolve to the file that is really there. The worst case is today's behaviour,
 * never a broken image.
 *
 * URL ENCODING. File names here contain spaces (`Gregory Parent.jpeg`) and an ampersand
 * (`p&g.png`). `srcset` is split on whitespace and commas, so every URL in it is encoded
 * per path segment with `encodeURIComponent` (space -> %20, comma -> %2C, & -> %26,
 * # -> %23, ? -> %3F). `src` gets the same encoding so `#` or `?` in a name can't truncate
 * it. Input that is already percent-encoded is decoded first, so nothing is double-encoded.
 */
export interface ResponsiveImage {
  src: string
  srcSet?: string
}

const DERIVED_PREFIX = '/images-derived/'

/**
 * Default `sizes` when a caller gives none. Errs LARGE on purpose (Il Colosseo's rule): a
 * tile that downloads a slightly bigger file costs a few KB; one that downloads a smaller
 * file than it needs looks soft.
 */
export function defaultSizes(fullBleed = false): string {
  return fullBleed ? '100vw' : '(max-width: 768px) 100vw, 50vw'
}

/** Anything with a scheme (http:, https:, data:, blob:) or protocol-relative: not ours. */
function isExternal(path: string): boolean {
  return /^[a-z][a-z0-9+.-]*:/i.test(path) || path.startsWith('//')
}

function safeDecode(s: string): string {
  try {
    return decodeURIComponent(s)
  } catch {
    return s
  }
}

/** Percent-encode each path segment, keeping the slashes. */
export function encodePath(path: string): string {
  return path.split('/').map(encodeURIComponent).join('/')
}

interface Resolved {
  /** Manifest key, e.g. "images/headshots/AlphaClass/Gregory Parent.jpeg". */
  key: string
  entry?: ManifestEntry
  /** Query/hash split off a path that isn't in the manifest, re-attached to `src`. */
  suffix: string
}

function resolve(path: string): Resolved {
  const bare = path.startsWith('/') ? path.slice(1) : path
  // Try as-is first (a real file name may contain '#' or '?'), then decoded, then with a
  // query string or hash stripped.
  for (const candidate of [bare, safeDecode(bare)]) {
    const entry = IMAGE_MANIFEST[candidate]
    if (entry) return { key: candidate, entry, suffix: '' }
  }
  const cut = bare.search(/[?#]/)
  const clean = safeDecode(cut === -1 ? bare : bare.slice(0, cut))
  return { key: clean, entry: IMAGE_MANIFEST[clean], suffix: cut === -1 ? '' : bare.slice(cut) }
}

/** `images/a/b c.JPG` -> `a/b c-jpg`, or the manifest's `d` override. */
function derivedBase(key: string, entry: ManifestEntry): string {
  if (entry.d) return entry.d
  const rel = key.startsWith('images/') ? key.slice('images/'.length) : key
  const slash = rel.lastIndexOf('/')
  const dot = rel.lastIndexOf('.')
  if (dot <= slash) return rel
  return `${rel.slice(0, dot)}-${rel.slice(dot + 1).toLowerCase()}`
}

function copyUrl(key: string, entry: ManifestEntry, width: number): string {
  return `${DERIVED_PREFIX}${encodePath(`${derivedBase(key, entry)}-${width}.webp`)}`
}

export function responsiveImage(path: string): ResponsiveImage {
  if (!path) return { src: path }
  if (isExternal(path)) return { src: path }

  const { key, entry, suffix } = resolve(path)
  const src = `/${encodePath(key)}${suffix}`
  if (!entry || entry.widths.length === 0) return { src }

  const srcSet = entry.widths.map((w) => `${copyUrl(key, entry, w)} ${w}w`).join(', ')
  return { src, srcSet }
}

/**
 * URL of the smallest generated copy at least `targetWidth` px wide, else the largest copy,
 * else the original. For CSS `background-image`, which has no srcset. Pass the rendered
 * width times the device pixel ratio you want to cover.
 */
export function derivedUrl(path: string, targetWidth: number): string {
  if (!path || isExternal(path)) return path
  const { key, entry, suffix } = resolve(path)
  if (!entry || entry.widths.length === 0) return `/${encodePath(key)}${suffix}`
  const widths = [...entry.widths].sort((a, b) => a - b)
  const pick = widths.find((w) => w >= targetWidth) ?? widths[widths.length - 1]
  return copyUrl(key, entry, pick)
}

/** Intrinsic (EXIF-oriented) size of the original, when the manifest knows it. */
export function imageDimensions(path: string): { width: number; height: number } | undefined {
  if (!path || isExternal(path)) return undefined
  const { entry } = resolve(path)
  return entry ? { width: entry.w, height: entry.h } : undefined
}
