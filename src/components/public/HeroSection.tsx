import type { MouseEvent } from 'react'
import { ArrowDown } from 'lucide-react'
import { Img } from '@/components/media/Img'
import { Heading } from '@/design-system/components/Typography'
import { TypedText } from './TypedText'

const HERO_PHRASES = ['Cornell Chapter', 'Alpha Epsilon']

/** Live custom.js:26-45: smooth-scroll to the anchor, leaving room for the sticky navbar + 10px. */
function scrollToHistory(e: MouseEvent<HTMLAnchorElement>) {
  const target = document.getElementById('our-history')
  if (!target) return
  e.preventDefault()
  const navHeight = document.querySelector('nav')?.getBoundingClientRect().height ?? 0
  const top = target.getBoundingClientRect().top + window.scrollY - (navHeight + 10)
  const reduced = window.matchMedia?.('(prefers-reduced-motion: reduce)').matches
  window.scrollTo({ top, behavior: reduced ? 'auto' : 'smooth' })
}

export function HeroSection() {
  return (
    <section className="hero" id="section_1">
      <div className="container mx-auto px-4 h-full flex items-center">
        <div className="hero-text">
          <Heading level={1} className="text-white mt-[130px] mb-5 normal-case">
            Kappa Theta Pi{' '}
            <TypedText phrases={HERO_PHRASES} className="typing-text block" align="center" />
          </Heading>
          <a
            href="#our-history"
            onClick={scrollToHistory}
            className="arrow-icon flex items-center justify-center"
            aria-label="Scroll to Our History"
          >
            <ArrowDown size={24} />
          </a>
        </div>
      </div>

      <div className="video-wrap z-[-100]">
        <Img
          src="images/classpictures/Fall2025.jpeg"
          className="custom-video"
          style={{ marginTop: -5 }}
          alt="KTP Cornell chapter group photo"
          sizes="100vw"
          priority
        />
      </div>
    </section>
  )
}
