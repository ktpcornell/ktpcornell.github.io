export function LayoutPage() {
  return (
    <>
      <section className="p-6 pt-12 md:p-12 border-b border-ktp-ui-border">
        <h1 className="text-ktp-primary mb-2 tracking-normal normal-case">Layout</h1>
        <p className="text-ktp-muted">
          Structure, spacing, and responsive design rules used across the KTP site.
        </p>
      </section>

      <section className="p-6 md:p-12 flex flex-col gap-12">

        {/* Breakpoints */}
        <div>
          <h2 className="text-lg font-semibold text-ktp-primary mb-1 tracking-normal">Breakpoints</h2>
          <p className="text-ktp-muted text-sm mb-4">
            Standard Tailwind breakpoints used for responsive layouts across all pages.
          </p>
          <div className="overflow-x-auto">
            <table className="w-full text-sm border border-ktp-ui-border rounded-xl overflow-hidden">
              <thead>
                <tr className="bg-ktp-surface text-ktp-primary">
                  <th className="text-left px-4 py-3 font-semibold">Prefix</th>
                  <th className="text-left px-4 py-3 font-semibold">Min Width</th>
                  <th className="text-left px-4 py-3 font-semibold">Usage</th>
                </tr>
              </thead>
              <tbody>
                {[
                  { prefix: '(none)', width: '0px', usage: 'Mobile-first base styles' },
                  { prefix: 'sm:', width: '640px', usage: 'Small tablets and up' },
                  { prefix: 'md:', width: '768px', usage: 'Tablets and up' },
                  { prefix: 'lg:', width: '1024px', usage: 'Desktop layouts, two-column grids' },
                  { prefix: 'xl:', width: '1280px', usage: 'Wide desktop' },
                  { prefix: '2xl:', width: '1536px', usage: 'Extra wide (rarely used)' },
                ].map((row) => (
                  <tr key={row.prefix} className="border-t border-ktp-ui-border">
                    <td className="px-4 py-3 font-mono text-ktp-primary">{row.prefix}</td>
                    <td className="px-4 py-3 text-ktp-muted">{row.width}</td>
                    <td className="px-4 py-3 text-ktp-muted">{row.usage}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>

        {/* Container */}
        <div>
          <h2 className="text-lg font-semibold text-ktp-primary mb-1 tracking-normal">Container</h2>
          <p className="text-ktp-muted text-sm mb-4">
            Page content is constrained with a max-width container and horizontal padding.
          </p>
          <div className="border border-ktp-ui-border rounded-xl p-6 bg-white">
            <code className="text-sm font-mono bg-ktp-surface px-2 py-1 rounded text-ktp-primary">
              container mx-auto px-4
            </code>
            <p className="text-sm text-ktp-muted mt-3 mb-0">
              Applies <span className="font-mono">max-width</span> per breakpoint via Tailwind's{' '}
              <span className="font-mono">container</span> class, with{' '}
              <span className="font-mono">mx-auto</span> for horizontal centering and{' '}
              <span className="font-mono">px-4</span> for edge gutters.
            </p>
          </div>
        </div>

        {/* Section padding */}
        <div>
          <h2 className="text-lg font-semibold text-ktp-primary mb-1 tracking-normal">Section Padding</h2>
          <p className="text-ktp-muted text-sm mb-4">
            Two standard vertical padding patterns used for page sections.
          </p>
          <div className="flex flex-col gap-4">
            <div className="border border-ktp-ui-border rounded-xl p-6 bg-white">
              <p className="text-xs font-semibold uppercase tracking-widest text-ktp-muted mb-2">Standard section</p>
              <code className="text-sm font-mono bg-ktp-surface px-2 py-1 rounded text-ktp-primary">
                py-16 md:py-24
              </code>
              <p className="text-sm text-ktp-muted mt-2 mb-0">
                Used for full-width page sections (Values, History, Gallery, etc.).
              </p>
            </div>
            <div className="border border-ktp-ui-border rounded-xl p-6 bg-white">
              <p className="text-xs font-semibold uppercase tracking-widest text-ktp-muted mb-2">Content area (design system, portal)</p>
              <code className="text-sm font-mono bg-ktp-surface px-2 py-1 rounded text-ktp-primary">
                p-6 md:p-12
              </code>
              <p className="text-sm text-ktp-muted mt-2 mb-0">
                Used for interior content areas with all-side padding.
              </p>
            </div>
          </div>
        </div>

        {/* Grid patterns */}
        <div>
          <h2 className="text-lg font-semibold text-ktp-primary mb-1 tracking-normal">Common Grid Patterns</h2>
          <p className="text-ktp-muted text-sm mb-4">
            Responsive grid configurations used across the site.
          </p>
          <div className="flex flex-col gap-3">
            {[
              {
                label: 'Two-column (text + image/buttons)',
                code: 'grid grid-cols-1 lg:grid-cols-2 gap-8 items-center',
                usage: 'CallToAction, HistorySection',
              },
              {
                label: 'Three-column card grid',
                code: 'grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6',
                usage: 'ValuesSection pillars, design system intro',
              },
              {
                label: 'Four-column member grid',
                code: 'grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-4',
                usage: 'MemberClassSection',
              },
            ].map((item) => (
              <div key={item.label} className="border border-ktp-ui-border rounded-xl p-5 bg-white">
                <p className="text-xs font-semibold uppercase tracking-widest text-ktp-muted mb-1">{item.label}</p>
                <code className="text-sm font-mono bg-ktp-surface px-2 py-1 rounded text-ktp-primary break-all">
                  {item.code}
                </code>
                <p className="text-xs text-ktp-muted mt-2 mb-0">Used in: {item.usage}</p>
              </div>
            ))}
          </div>
        </div>

      </section>
    </>
  )
}
