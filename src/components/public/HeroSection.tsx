import { ArrowDown } from 'lucide-react'
import { Link } from 'react-router-dom'
import { useTypingEffect } from '@/hooks/useTypingEffect'

const HERO_PHRASES = ['Cornell Chapter', 'Alpha Epsilon']

export function HeroSection() {
  const typedText = useTypingEffect({ phrases: HERO_PHRASES })

  return (
    <section className="hero" id="section_1">
      <div className="container mx-auto px-4 h-full flex items-center">
        <div className="hero-text">
          <h1 className="text-white mt-[130px] mb-5">
            Kappa Theta Pi{' '}
            <span className="typing-text block">{typedText}</span>
          </h1>
          <Link to="/about" className="arrow-icon flex items-center justify-center">
            <ArrowDown size={24} />
          </Link>
        </div>
      </div>

      <div className="video-wrap z-[-100]">
        <img
          src="/images/classpictures/Fall2025.jpeg"
          className="custom-video"
          alt="KTP group photo"
        />
      </div>
    </section>
  )
}
