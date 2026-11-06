/**
 * CONTRACT STUB (phase 1). The image pipeline replaces the body; the signature is fixed.
 *
 * Given a repo image path as it appears in data or constants (e.g.
 * "images/headshots/GammaClass/Linda Gu.jpg", with or without a leading "/"), returns the
 * attributes for an <img>. `src` is ALWAYS the original file, so anything not optimized
 * still renders. `srcSet` is only present when optimized copies exist.
 */
export interface ResponsiveImage {
  src: string
  srcSet?: string
}

export function responsiveImage(path: string): ResponsiveImage {
  if (!path) return { src: path }
  if (/^https?:\/\//.test(path)) return { src: path }
  return { src: path.startsWith('/') ? path : `/${path}` }
}
