import { Mail, Instagram, Linkedin } from 'lucide-react'
import { Link, useLocation } from 'react-router-dom'
import { Heading } from '@/design-system/components/Typography'
import { SIGN_IN_URL } from '@/config'

export function Footer() {
  const location = useLocation()
  const activePath = location.pathname
  const year = new Date().getFullYear()

  const linkClass = (path: string) =>
    `block text-xl no-underline transition-colors ${
      activePath === path ? 'text-ktp-accent' : 'text-white hover:text-ktp-accent'
    }`

  return (
    <footer className="bg-ktp-primary text-white py-16" id="contact-footer">
      <div className="container mx-auto px-4">
        <div className="flex flex-wrap justify-center gap-x-20 gap-y-10 mb-10">
          {/* Nav column: logo, then the page links in two columns */}
          <div className="w-full sm:w-auto">
            <Link to="/" className="flex flex-col items-center mb-4 no-underline">
              <img src="/logo.svg" alt="KTP" className="h-12" />
              <span className="text-white text-base mt-1">Cornell Chapter</span>
            </Link>
            <ul className="list-none p-0 m-0 grid grid-rows-3 grid-flow-col gap-x-14 gap-y-3">
              <li><Link to="/" className={linkClass('/')}>Home</Link></li>
              <li><Link to="/about" className={linkClass('/about')}>About Us</Link></li>
              <li><Link to="/members" className={linkClass('/members')}>Members</Link></li>
              <li><Link to="/join" className={linkClass('/join')}>Recruitment</Link></li>
              <li>
                <a
                  href="https://kappathetapi.org"
                  className="block text-xl text-white hover:text-ktp-accent no-underline transition-colors"
                >
                  Nationals
                </a>
              </li>
              {/* Same KTP Manager sign-in page as the navbar button; rounds the links out to 3x2. */}
              {SIGN_IN_URL && (
                <li>
                  <a
                    href={SIGN_IN_URL}
                    className="block text-xl text-white hover:text-ktp-accent no-underline transition-colors"
                  >
                    Member Sign In
                  </a>
                </li>
              )}
            </ul>
          </div>

          {/* Contact column */}
          <div className="w-full sm:w-auto">
            <Heading level={4} className="mb-5 text-white">Contact Us</Heading>
            <div className="flex items-center mb-4 gap-3">
              <Mail size={22} className="text-white shrink-0" />
              <p className="text-white text-xl mb-0">ktpcornell@gmail.com</p>
            </div>
            <div className="flex items-center mb-4 gap-3">
              <Instagram size={22} className="text-white shrink-0" />
              <a
                href="https://www.instagram.com/ktpcornell"
                target="_blank"
                rel="noopener noreferrer"
                className="text-white text-xl hover:text-ktp-accent no-underline transition-colors"
              >
                @ktpcornell
              </a>
            </div>
            <div className="flex items-center mb-4 gap-3">
              <Linkedin size={22} className="text-white shrink-0" />
              <a
                href="https://www.linkedin.com/company/kappa-theta-pi-cornell-chapter"
                target="_blank"
                rel="noopener noreferrer"
                className="text-white text-xl hover:text-ktp-accent no-underline transition-colors"
              >
                KTP Cornell Chapter
              </a>
            </div>
          </div>
        </div>

        <div className="text-center border-t border-ktp-border-dark pt-8">
          <p className="text-white text-base mb-2">
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
          <p className="text-white text-base mb-0">
            © Kappa Theta Pi Alpha Epsilon Chapter {year}. All rights reserved.
          </p>
        </div>
      </div>
    </footer>
  )
}
