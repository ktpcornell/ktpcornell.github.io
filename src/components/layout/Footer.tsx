import { Mail, Instagram, Linkedin } from 'lucide-react'
import { Link, useLocation } from 'react-router-dom'
import { Heading } from '@/design-system/components/Typography'

export function Footer() {
  const location = useLocation()
  const activePath = location.pathname
  const year = new Date().getFullYear()

  const linkClass = (path: string) =>
    `block mb-2 text-sm no-underline transition-colors ${
      activePath === path ? 'text-ktp-accent' : 'text-white hover:text-ktp-accent'
    }`

  return (
    <footer className="bg-ktp-primary text-white py-16" id="contact-footer">
      <div className="container mx-auto px-4">
        <div className="flex flex-wrap justify-center gap-8 mb-8">
          {/* Nav column */}
          <div className="w-full sm:w-64">
            <Link to="/" className="flex flex-col items-start mb-4 no-underline">
              <img src="/logo.svg" alt="KTP" className="h-8" />
              <span className="text-white text-xs mt-1">Cornell Chapter</span>
            </Link>
            <ul className="list-none p-0 m-0">
              <li><Link to="/" className={linkClass('/')}>Home</Link></li>
              <li><Link to="/about" className={linkClass('/about')}>About Us</Link></li>
              <li><Link to="/members" className={linkClass('/members')}>Members</Link></li>
              <li><Link to="/join" className={linkClass('/join')}>Recruitment</Link></li>
              <li>
                <a
                  href="https://kappathetapi.org"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="block mb-2 text-sm text-white hover:text-ktp-accent no-underline transition-colors"
                >
                  Nationals
                </a>
              </li>
            </ul>
          </div>

          {/* Contact column */}
          <div className="w-full sm:w-64">
            <Heading level={5} className="mb-4 text-white">Contact Us</Heading>
            <div className="flex items-center mb-3 gap-2">
              <Mail size={18} className="text-white shrink-0" />
              <p className="text-white text-sm mb-0">ktpcornell@gmail.com</p>
            </div>
            <div className="flex items-center mb-3 gap-2">
              <Instagram size={18} className="text-white shrink-0" />
              <a
                href="https://www.instagram.com/ktpcornell"
                target="_blank"
                rel="noopener noreferrer"
                className="text-white text-sm hover:text-ktp-accent no-underline transition-colors"
              >
                @ktpcornell
              </a>
            </div>
            <div className="flex items-center mb-3 gap-2">
              <Linkedin size={18} className="text-white shrink-0" />
              <a
                href="https://www.linkedin.com/company/kappa-theta-pi-cornell-chapter"
                target="_blank"
                rel="noopener noreferrer"
                className="text-white text-sm hover:text-ktp-accent no-underline transition-colors"
              >
                KTP Cornell Chapter
              </a>
            </div>
          </div>
        </div>

        <div className="text-center border-t border-ktp-border-dark pt-6">
          <p className="text-white text-sm mb-1">
            This organization is a registered student organization of Cornell University.{' '}
            <a
              href="https://hr.cornell.edu/about/workplace-rights/equal-education-and-employment"
              className="text-white underline hover:text-ktp-accent transition-colors"
              target="_blank"
              rel="noopener noreferrer"
            >
              Equal Education and Employment
            </a>
          </p>
          <p className="text-white text-sm mb-0">
            © Kappa Theta Pi Alpha Epsilon Chapter {year}. All rights reserved.
          </p>
        </div>
      </div>
    </footer>
  )
}
