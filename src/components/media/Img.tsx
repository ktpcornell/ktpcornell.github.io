/**
 * The site's <img>. Wraps `responsiveImage` (WebP srcset from the manifest, original as src).
 *
 *   src       repo image path, e.g. "images/gallery/x.JPEG" (leading "/" optional)
 *   alt       required; "" for decorative images
 *   priority  true for the one above-the-fold hero image: eager + fetchpriority=high.
 *             Everything else is lazy.
 *   sizes     the <img sizes> hint, e.g. "(min-width: 1024px) 25vw, 50vw". Defaults to
 *             `defaultSizes()` when there is a srcset and none is given.
 *   className / style  passed through (also onto the fallback placeholder, so layout holds)
 *   width / height     optional overrides; otherwise the original's intrinsic size from the
 *             manifest, so the browser reserves the right aspect ratio before load. Tailwind
 *             preflight's `img { max-width: 100%; height: auto }` keeps them from fixing size.
 *
 * Load errors step down: a failing WebP copy -> the original (srcset dropped); a failing
 * original -> the neutral `/ktplogo2.png` placeholder. The placeholder never retries.
 */
import { useState, type CSSProperties, type SyntheticEvent } from 'react'
import { defaultSizes, imageDimensions, responsiveImage } from '@/lib/responsiveImage'

export const IMG_PLACEHOLDER = '/ktplogo2.png'

export interface ImgProps {
  src: string
  alt: string
  priority?: boolean
  sizes?: string
  className?: string
  style?: CSSProperties
  width?: number
  height?: number
}

/**
 * React 18.3 doesn't know the camelCase `fetchPriority` prop (React 19 does) and warns on it,
 * so the attribute goes through lowercase, which React 18 passes to the DOM untouched.
 */
const HIGH_PRIORITY = { fetchpriority: 'high' } as Record<string, string>

/** 0 = srcset + original, 1 = original only, 2 = placeholder. */
type Stage = 0 | 1 | 2

export function Img({ src, alt, priority = false, sizes, className, style, width, height }: ImgProps) {
  const [state, setState] = useState<{ for: string; stage: Stage }>({ for: src, stage: 0 })
  // A new `src` starts over at stage 0 (reset during render, React's documented pattern).
  const stage: Stage = state.for === src ? state.stage : 0
  if (state.for !== src) setState({ for: src, stage: 0 })

  const { src: resolved, srcSet } = responsiveImage(src)
  const dims = imageDimensions(src)

  const onError = (e: SyntheticEvent<HTMLImageElement>) => {
    if (stage === 2) return
    const failed = e.currentTarget.currentSrc || e.currentTarget.src
    const wasCopy = stage === 0 && srcSet !== undefined && failed.includes('/images-derived/')
    setState({ for: src, stage: wasCopy ? 1 : 2 })
  }

  const useSrcSet = stage === 0 ? srcSet : undefined
  const isPlaceholder = stage === 2

  return (
    <img
      src={isPlaceholder ? IMG_PLACEHOLDER : resolved}
      srcSet={useSrcSet}
      sizes={useSrcSet ? (sizes ?? defaultSizes()) : undefined}
      width={width ?? dims?.width}
      height={height ?? dims?.height}
      alt={alt}
      loading={priority ? 'eager' : 'lazy'}
      decoding="async"
      {...(priority ? HIGH_PRIORITY : undefined)}
      className={className}
      style={isPlaceholder ? { ...style, objectFit: 'contain' } : style}
      onError={onError}
      data-img-fallback={stage === 0 ? undefined : isPlaceholder ? 'placeholder' : 'original'}
    />
  )
}
