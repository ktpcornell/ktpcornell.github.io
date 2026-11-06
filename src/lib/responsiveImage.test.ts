import { describe, it, expect } from 'vitest'
import { existsSync } from 'node:fs'
import { createElement } from 'react'
import { renderToStaticMarkup } from 'react-dom/server'
import {
  responsiveImage,
  derivedUrl,
  defaultSizes,
  encodePath,
  imageDimensions,
} from './responsiveImage'
import { IMAGE_MANIFEST } from '@/lib/imageManifest'
import { Img } from '@/components/media/Img'

/**
 * The contract, ported from Il Colosseo, and why each half matters:
 *
 *  1. `src` is ALWAYS the original. A stale manifest or a missing copy degrades to today's
 *     behaviour, never to a broken image.
 *  2. A `srcset` never names a width that was not generated. Browsers do not fall back
 *     within a srcset: if the candidate they pick 404s, the image fails.
 *  3. Nothing is upscaled.
 *  4. (KTP) Every URL survives spaces and commas, because srcset splits on both.
 */

const entries = Object.entries(IMAGE_MANIFEST)
const keys = Object.keys(IMAGE_MANIFEST)
const withSpace = keys.find((k) => k.includes(' ') && IMAGE_MANIFEST[k].widths.length > 1)!
const logoKey = keys.find((k) => k.startsWith('images/network/') || k.startsWith('images/clubs/'))!
const photoKey = keys.find((k) => k.startsWith('images/gallery/'))!

/** Parse a srcset the way a browser does: candidates split on ", ", URL then descriptor. */
function parseSrcSet(srcSet: string): { url: string; w: number }[] {
  return srcSet.split(', ').map((c) => {
    const parts = c.trim().split(/\s+/)
    expect(parts, `candidate "${c}" must be exactly "<url> <n>w"`).toHaveLength(2)
    return { url: parts[0], w: Number(parts[1].replace(/w$/, '')) }
  })
}

describe('responsiveImage', () => {
  it('keeps the original as src', () => {
    expect(responsiveImage(`/${photoKey}`).src).toBe(`/${encodePath(photoKey)}`)
    expect(responsiveImage(photoKey).src).toBe(`/${encodePath(photoKey)}`)
  })

  it('offers webp candidates for a manifest image', () => {
    const out = responsiveImage(photoKey)
    expect(out.srcSet).toBeDefined()
    expect(out.srcSet).toContain('.webp')
    expect(out.srcSet).toContain('/images-derived/')
  })

  it('accepts images/... and /images/... alike', () => {
    expect(responsiveImage(withSpace)).toEqual(responsiveImage(`/${withSpace}`))
  })

  it('never names a width the generator did not produce', () => {
    for (const [key, entry] of entries) {
      const ws = parseSrcSet(responsiveImage(key).srcSet ?? '').map((c) => c.w)
      expect(ws, key).toEqual(entry.widths)
    }
  })

  it('every srcset candidate exists on disk (when images-derived/ has been built)', () => {
    if (!existsSync('images-derived')) return
    for (const [key] of entries) {
      for (const { url } of parseSrcSet(responsiveImage(key).srcSet!)) {
        expect(existsSync(decodeURIComponent(url).slice(1)), url).toBe(true)
      }
    }
  })

  it('never upscales', () => {
    for (const [key, entry] of entries) {
      for (const w of entry.widths) {
        expect(w, `${key} would be upscaled past its ${entry.w}px original`).toBeLessThanOrEqual(entry.w)
      }
    }
  })

  it('keeps the source extension in the copy name, so x.png and x.jpg cannot collide', () => {
    const out = responsiveImage(photoKey)
    expect(out.srcSet).not.toMatch(/\.(jpe?g|png)-\d/i)
    expect(out.srcSet).toMatch(/-(jpe?g|png)-\d+\.webp/)
  })

  it('falls back cleanly for anything not in the manifest', () => {
    for (const src of [
      'https://example.com/a.jpg',
      'http://example.com/a.jpg',
      '/images/does-not-exist.jpg',
      '/ktplogo2.png',
      '',
    ]) {
      const out = responsiveImage(src)
      expect(out.src).toBe(src)
      expect(out.srcSet).toBeUndefined()
    }
  })

  it('adds the leading slash for a bare path not in the manifest (a headshot synced after the build)', () => {
    expect(responsiveImage('images/headshots/DeltaClass/New Member.jpg')).toEqual({
      src: '/images/headshots/DeltaClass/New%20Member.jpg',
    })
  })

  it('tolerates a query string on a manifest path', () => {
    expect(responsiveImage(`/${photoKey}?v=2`).srcSet).toBeDefined()
  })

  it('emits only src and srcSet', () => {
    expect(Object.keys(responsiveImage(photoKey)).sort()).toEqual(['src', 'srcSet'])
  })
})

describe('URL encoding', () => {
  it('encodes spaces in src and in every srcset URL', () => {
    const out = responsiveImage(withSpace)
    expect(out.src).not.toContain(' ')
    expect(out.src).toContain('%20')
    for (const { url } of parseSrcSet(out.srcSet!)) {
      expect(url).not.toContain(' ')
      expect(url).toContain('%20')
    }
  })

  it('srcset parses to exactly one candidate per generated width despite spaces', () => {
    const out = responsiveImage(withSpace)
    expect(parseSrcSet(out.srcSet!)).toHaveLength(IMAGE_MANIFEST[withSpace].widths.length)
  })

  it('encodes commas and ampersands, which would otherwise split or mangle a candidate', () => {
    expect(encodePath('images/a, b/c,d&e.jpg')).toBe('images/a%2C%20b/c%2Cd%26e.jpg')
    expect(encodePath('images/x#1?.png')).toBe('images/x%231%3F.png')
  })

  it('encodes the real ampersand file (p&g.png)', () => {
    const key = 'images/network/p&g.png'
    if (!IMAGE_MANIFEST[key]) return
    const out = responsiveImage(key)
    expect(out.src).toBe('/images/network/p%26g.png')
    expect(out.srcSet).toContain('/images-derived/network/p%26g-png-')
  })

  it('does not double-encode an already-encoded path', () => {
    const encoded = encodePath(withSpace)
    expect(responsiveImage(encoded)).toEqual(responsiveImage(withSpace))
    expect(responsiveImage('/images/x/New%20Member.jpg').src).toBe('/images/x/New%20Member.jpg')
  })

  it('a URL decodes back to the file on disk', () => {
    expect(decodeURIComponent(responsiveImage(withSpace).src)).toBe(`/${withSpace}`)
  })
})

describe('width ladders', () => {
  it('logos (network/, clubs/) use only the [200, 400] ladder', () => {
    for (const [key, e] of entries) {
      if (!/^images\/(network|clubs)\//.test(key)) continue
      for (const w of e.widths) expect([200, 400].includes(w) || w === e.w, key).toBe(true)
      expect(e.widths.length, key).toBeLessThanOrEqual(2)
    }
  })

  it('photos use only the [400, 800, 1600, 2400] ladder', () => {
    for (const [key, e] of entries) {
      if (/^images\/(network|clubs)\//.test(key)) continue
      for (const w of e.widths) expect([400, 800, 1600, 2400].includes(w) || w === e.w, key).toBe(true)
    }
  })

  it('a source narrower than the smallest rung gets one copy at its own width', () => {
    for (const [key, e] of entries) {
      const smallest = /^images\/(network|clubs)\//.test(key) ? 200 : 400
      if (e.w < smallest) expect(e.widths, key).toEqual([e.w])
    }
  })

  it('a source between two rungs also gets a copy at its own width (no stretched 1600 on big screens)', () => {
    const hero = IMAGE_MANIFEST['images/classpictures/Fall2025.jpeg']
    expect(hero.w).toBe(1920)
    expect(hero.widths).toEqual([400, 800, 1600, 1920])
    for (const [key, e] of entries) {
      const ladder = /^images\/(network|clubs)\//.test(key) ? [200, 400] : [400, 800, 1600, 2400]
      if (ladder.some((x) => x > e.w)) expect(e.widths[e.widths.length - 1], key).toBe(e.w)
      else expect(e.widths, key).toEqual(ladder)
    }
  })

  it('a wide source gets every rung it can fill', () => {
    const huge = entries.find(([k, e]) => k.startsWith('images/gallery/') && e.w >= 2400)
    expect(huge, 'at least one gallery photo is 2400px+ wide').toBeDefined()
    expect(huge![1].widths).toEqual([400, 800, 1600, 2400])
    expect(IMAGE_MANIFEST[logoKey].widths.every((w) => w <= 400)).toBe(true)
  })
})

describe('derivedUrl', () => {
  const key = keys.find((k) => IMAGE_MANIFEST[k].widths.length === 4)!
  const url = (w: number) => responsiveImage(key).srcSet!.split(', ').find((c) => c.endsWith(` ${w}w`))!.split(' ')[0]

  it('picks the smallest copy at or above the target', () => {
    expect(derivedUrl(key, 1)).toBe(url(400))
    expect(derivedUrl(key, 400)).toBe(url(400))
    expect(derivedUrl(key, 401)).toBe(url(800))
    expect(derivedUrl(key, 1600)).toBe(url(1600))
    expect(derivedUrl(`/${key}`, 2000)).toBe(url(2400))
  })

  it('falls back to the largest copy when the target is bigger than all of them', () => {
    expect(derivedUrl(key, 99999)).toBe(url(2400))
  })

  it('falls back to the original for anything not in the manifest', () => {
    expect(derivedUrl('images/nope/Not Here.jpg', 800)).toBe('/images/nope/Not%20Here.jpg')
    expect(derivedUrl('https://example.com/a.jpg', 800)).toBe('https://example.com/a.jpg')
    expect(derivedUrl('', 800)).toBe('')
  })

  it('returns an encoded URL', () => {
    expect(derivedUrl(withSpace, 400)).not.toContain(' ')
  })
})

describe('defaultSizes', () => {
  it('gives a full-bleed image the whole viewport', () => {
    expect(defaultSizes(true)).toBe('100vw')
  })
  it('errs LARGE for a tile rather than small', () => {
    expect(defaultSizes()).toContain('100vw')
    expect(defaultSizes()).toContain('50vw')
  })
})

describe('<Img>', () => {
  const html = (props: Parameters<typeof Img>[0]) => renderToStaticMarkup(createElement(Img, props))

  it('shows the placeholder straight away when there is no path (an img with no src never errors)', () => {
    const out = html({ src: '', alt: 'No photo' })
    expect(out).toContain('src="/ktplogo2.png"')
    expect(out).not.toMatch(/srcset=/i)
    expect(out).toContain('data-img-fallback="placeholder"')
  })

  it('puts loading before src, so Firefox does not start an eager fetch', () => {
    const out = html({ src: withSpace, alt: 'x' })
    expect(out.indexOf('loading=')).toBeLessThan(out.indexOf(' src='))
  })

  it('renders srcset, default sizes, intrinsic size, lazy + async', () => {
    const out = html({ src: withSpace, alt: 'x' })
    const e = IMAGE_MANIFEST[withSpace]
    expect(out).toMatch(/srcset="/i)
    expect(out).toContain(`sizes="${defaultSizes()}"`)
    expect(out).toContain(`width="${e.w}"`)
    expect(out).toContain(`height="${e.h}"`)
    expect(out).toContain('loading="lazy"')
    expect(out).toContain('decoding="async"')
    expect(out).not.toContain('fetchpriority')
  })

  it('priority means eager + fetchpriority=high', () => {
    const out = html({ src: photoKey, alt: '', priority: true })
    expect(out).toContain('loading="eager"')
    expect(out).toContain('fetchpriority="high"')
  })

  it('keeps a caller-supplied sizes', () => {
    expect(html({ src: photoKey, alt: '', sizes: '25vw' })).toContain('sizes="25vw"')
  })

  it('renders a plain original (no srcset, no sizes, no width) outside the manifest', () => {
    const out = html({ src: 'images/headshots/DeltaClass/New Member.jpg', alt: 'n', className: 'c' })
    expect(out).toContain('src="/images/headshots/DeltaClass/New%20Member.jpg"')
    expect(out).not.toMatch(/srcset/i)
    expect(out).not.toContain('sizes=')
    expect(out).not.toContain('width=')
    expect(out).toContain('class="c"')
  })

  it('knows intrinsic dimensions only for manifest images', () => {
    expect(imageDimensions(photoKey)).toEqual({ width: IMAGE_MANIFEST[photoKey].w, height: IMAGE_MANIFEST[photoKey].h })
    expect(imageDimensions('images/none.jpg')).toBeUndefined()
  })
})

describe('the manifest itself', () => {
  it('covers every image and records real dimensions', () => {
    expect(entries.length).toBeGreaterThan(150)
    for (const [key, e] of entries) {
      expect(key, 'keys are repo-relative images/ paths').toMatch(/^images\//)
      expect(key).toMatch(/\.(jpe?g|png)$/i)
      expect(e.w, key).toBeGreaterThan(0)
      expect(e.h, key).toBeGreaterThan(0)
      expect(e.widths.length, `${key} must have at least one copy`).toBeGreaterThan(0)
      expect([...e.widths].sort((a, b) => a - b), key).toEqual(e.widths)
    }
  })

  it('no two images share a copy name (case-insensitive)', () => {
    const seen = new Map<string, string>()
    for (const [key] of entries) {
      for (const { url } of parseSrcSet(responsiveImage(key).srcSet!)) {
        const k = url.toLowerCase()
        expect(seen.get(k), `${key} collides with ${seen.get(k)}`).toBeUndefined()
        seen.set(k, key)
      }
    }
  })

  it('still shows the problem this exists to fix', () => {
    // If this fails because nothing is 3000px+ any more, the originals were replaced,
    // which is the one thing the generator must never do.
    expect(Object.values(IMAGE_MANIFEST).filter((e) => e.w >= 3000).length).toBeGreaterThan(0)
  })
})
