import { Link, useLocation } from 'react-router-dom'

export function Footer() {
  const location = useLocation()
  const activePath = location.pathname

  const linkClass = (path: string) =>
    `d-block mb-2 ${activePath === path ? 'text-ktp-cyan' : 'text-white'}`

  return (
    <footer className="site-footer" id="contact-footer">
      <div className="container mx-auto px-4">
        <div className="flex flex-wrap justify-center gap-8 mb-8">
          {/* Nav column */}
          <div className="w-full sm:w-64">
            <Link to="/" className="flex flex-col items-start mb-3 no-underline">
              <img src="/navbarlogo.png" alt="KTP" style={{ height: 30 }} />
              <span className="text-white" style={{ fontSize: 12 }}>Cornell Chapter</span>
            </Link>
            <ul className="list-none p-0 m-0">
              <li><Link to="/" className={linkClass('/')}>Home</Link></li>
              <li><Link to="/about" className={linkClass('/about')}>About Us</Link></li>
              <li><Link to="/members" className={linkClass('/members')}>Members</Link></li>
              <li><Link to="/join" className={linkClass('/join')}>Recruitment</Link></li>
              <li>
                <a href="https://kappathetapi.org" target="_blank" rel="noopener noreferrer" className="text-white d-block mb-2">
                  Nationals
                </a>
              </li>
            </ul>
          </div>

          {/* Contact column */}
          <div className="w-full sm:w-64">
            <h5 className="fw-bold mb-3 text-white">Contact Us</h5>
            <div className="flex items-center mb-2 gap-2">
              <span className="text-white text-xl">✉</span>
              <p className="mb-0 text-white">ktpcornell@gmail.com</p>
            </div>
            <div className="flex items-center mb-2 gap-2">
              <a
                href="https://www.instagram.com/ktpcornell"
                target="_blank"
                rel="noopener noreferrer"
                className="text-white text-xl"
              >
                IG
              </a>
              <p className="mb-0 text-white">@ktpcornell</p>
            </div>
            <div className="flex items-center mb-2 gap-2">
              <a
                href="https://www.linkedin.com/company/kappa-theta-pi-cornell-chapter"
                target="_blank"
                rel="noopener noreferrer"
                className="text-white text-xl"
              >
                in
              </a>
              <p className="mb-0 text-white">KTP Cornell Chapter</p>
            </div>
          </div>
        </div>

        <div className="text-center border-t border-white/20 pt-6">
          <p className="text-white mb-1" style={{ fontSize: 14 }}>
            This organization is a registered student organization of Cornell University.{' '}
            <a
              href="https://hr.cornell.edu/about/workplace-rights/equal-education-and-employment"
              className="text-white underline"
              target="_blank"
              rel="noopener noreferrer"
            >
              Equal Education and Employment
            </a>
          </p>
          <p className="text-white mb-0" style={{ fontSize: 14 }}>
            © Kappa Theta Pi Alpha Epsilon Chapter 2026. All rights reserved.
          </p>
        </div>
      </div>
    </footer>
  )
}
