/**
 * CONTRACT STUB (phase 1). The image pipeline fills in srcSet, intrinsic width/height and the
 * missing-file fallback; the props below are fixed so pages can use <Img> now.
 *
 *   src       repo image path, e.g. "images/gallery/x.JPEG" (leading "/" optional)
 *   alt       required; "" for decorative images
 *   priority  true for the one above-the-fold hero image: eager + fetchpriority=high.
 *             Everything else is lazy.
 *   sizes     the <img sizes> hint, e.g. "(min-width: 1024px) 25vw, 50vw"
 *   className / style  passed through
 */
import type { CSSProperties } from 'react'
import { responsiveImage } from '@/lib/responsiveImage'

export interface ImgProps {
  src: string
  alt: string
  priority?: boolean
  sizes?: string
  className?: string
  style?: CSSProperties
}

export function Img({ src, alt, priority = false, sizes, className, style }: ImgProps) {
  const { src: resolved, srcSet } = responsiveImage(src)
  return (
    <img
      src={resolved}
      srcSet={srcSet}
      sizes={srcSet ? sizes : undefined}
      alt={alt}
      loading={priority ? 'eager' : 'lazy'}
      decoding="async"
      fetchPriority={priority ? 'high' : undefined}
      className={className}
      style={style}
    />
  )
}
