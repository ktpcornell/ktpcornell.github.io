import { useEffect, useRef, useState, type CSSProperties } from 'react'
import { Img } from '@/components/media/Img'
import { placements } from '@/lib/constants'
import { Heading } from '@/design-system/components/Typography'

interface Logo {
  name: string
  file: string
}

/** true once the element has scrolled into view (and from then on). */
function useSeenOnce<T extends Element>() {
  const ref = useRef<T>(null)
  const [seen, setSeen] = useState(false)

  useEffect(() => {
    const el = ref.current
    if (!el || seen) return
    if (typeof IntersectionObserver === 'undefined') {
      setSeen(true)
      return
    }
    const io = new IntersectionObserver(
      (entries) => {
        if (entries.some((e) => e.isIntersecting)) {
          setSeen(true)
          io.disconnect()
        }
      },
      { rootMargin: '0px 0px -10% 0px' },
    )
    io.observe(el)
    return () => io.disconnect()
  }, [seen])

  return [ref, seen] as const
}

function fadeStyle(index: number, seen: boolean): CSSProperties {
  // Longhands only: the old inline `animation` shorthand reset `animationDelay` and killed
  // the stagger. `backwards` holds each logo at opacity 0 through its delay, so the 50 ms
  // stagger from live .placement-logo (css:948, index.html:188) actually shows.
  if (!seen) return { opacity: 0 }
  return {
    animationName: 'simple-fade-in',
    animationDuration: '0.5s',
    animationTimingFunction: 'ease-out',
    animationDelay: `${index * 50}ms`,
    animationFillMode: 'backwards',
  }
}

/**
 * A heading plus a wrapped cloud of logos that fade in one after another the first time the
 * cloud scrolls into view. Matches live index.html:251-262 (`.placements-cloud`, gap-3 /
 * gap-lg-4, `.placement-logo` img max-height 48px). Shared by Placements and Campus.
 */
export function LogoCloud({ title, items, dir }: { title: string; items: Logo[]; dir: string }) {
  const [ref, seen] = useSeenOnce<HTMLDivElement>()
  const reduced =
    typeof window !== 'undefined' && window.matchMedia?.('(prefers-reduced-motion: reduce)').matches

  return (
    <div className="text-center mx-auto mb-6 min-[992px]:w-5/6">
      <Heading level={2} className="mb-3 text-ktp-primary">{title}</Heading>
      <div
        ref={ref}
        className="placements-cloud max-w-[1100px] mx-auto flex flex-wrap justify-center gap-4 min-[992px]:gap-6"
      >
        {items.map((item, i) => (
          <div
            key={item.name}
            className="placement-logo inline-block w-auto min-w-[40px] max-w-[120px] transition-transform duration-200 hover:scale-105"
            style={reduced ? undefined : fadeStyle(i, seen)}
          >
            <Img
              src={`images/${dir}/${item.file}`}
              alt={`${item.name} logo`}
              sizes="120px"
              className="max-h-12 max-w-full w-auto object-contain grayscale-[10%]"
            />
          </div>
        ))}
      </div>
    </div>
  )
}

export function PlacementsCloud() {
  return <LogoCloud title="Chapter Placements" items={placements} dir="network" />
}
