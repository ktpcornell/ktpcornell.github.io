import { ArrowDown } from 'lucide-react'

export function HeroPage() {
  return (
    <>
      <section className="p-6 pt-12 md:p-12 border-b border-ktp-ui-border">
        <h1 className="text-ktp-primary mb-2 tracking-normal normal-case">Hero</h1>
        <p className="text-ktp-muted">
          Top section of the home page with a full-height background image, a typing animation, and
          a scroll arrow. Import from{' '}
          <code className="text-sm font-mono bg-ktp-surface px-1.5 py-0.5 rounded text-ktp-primary">
            @/components/public/HeroSection
          </code>
          . No props — self-contained.
        </p>
        <p className="text-ktp-muted mt-2">
          The live hero relies on legacy CSS classes (<code className="text-sm font-mono">.hero</code>,{' '}
          <code className="text-sm font-mono">.hero-text</code>,{' '}
          <code className="text-sm font-mono">.typing-text</code>,{' '}
          <code className="text-sm font-mono">.video-wrap</code>) defined in{' '}
          <code className="text-sm font-mono bg-ktp-surface px-1.5 py-0.5 rounded text-ktp-primary">
            src/styles/legacy.css
          </code>{' '}
          and the{' '}
          <code className="text-sm font-mono bg-ktp-surface px-1.5 py-0.5 rounded text-ktp-primary">
            useTypingEffect
          </code>{' '}
          hook. The preview below shows the structural layout only.
        </p>
      </section>

      <section className="p-6 md:p-12 flex flex-col gap-8">
        <div>
          <p className="text-sm text-ktp-muted mb-4">Structure preview (simplified, no background image)</p>
          <div className="border border-ktp-ui-border rounded-xl overflow-hidden">
            <div className="bg-ktp-primary relative flex items-center min-h-[320px]">
              <div className="container mx-auto px-4">
                <div className="max-w-lg">
                  <h1 className="text-white mt-0 mb-5">
                    Kappa Theta Pi{' '}
                    <span className="block text-ktp-accent">Cornell Chapter</span>
                  </h1>
                  {/* DS-SKIP: border-white/40, text-white/70 — decorative scroll indicator on hero dark bg; requires --ktp-white-dim token to eliminate opacity modifiers */}
                  <div className="w-10 h-10 rounded-full border-2 border-white/40 flex items-center justify-center text-white/70">
                    <ArrowDown size={18} />
                  </div>
                </div>
              </div>
              {/* DS-SKIP: from-ktp-primary/80 — gradient overlay on hero video; opacity modifier required for gradient; rgba() in CSS not supported by Tailwind gradient utilities */}
              <div className="absolute inset-0 bg-gradient-to-r from-ktp-primary/80 to-transparent pointer-events-none" />
            </div>
          </div>
        </div>

        <div>
          <h2 className="text-lg font-semibold text-ktp-primary mb-3 tracking-normal">Structure</h2>
          <div className="flex flex-col gap-3">
            {[
              {
                label: '.hero',
                description: 'Full-height section with fixed background image via legacy CSS.',
              },
              {
                label: '.video-wrap',
                description: 'Absolutely-positioned image layer behind content (z-index: -100).',
              },
              {
                label: '.hero-text',
                description: 'Positioned text container with h1 and scroll arrow.',
              },
              {
                label: '.typing-text',
                description: 'Cycling phrase driven by useTypingEffect hook (Cornell Chapter / Alpha Epsilon).',
              },
            ].map((item) => (
              <div key={item.label} className="border border-ktp-ui-border rounded-xl p-5 bg-white flex gap-4">
                <code className="text-sm font-mono text-ktp-primary shrink-0">{item.label}</code>
                <p className="text-sm text-ktp-muted mb-0">{item.description}</p>
              </div>
            ))}
          </div>
        </div>
      </section>
    </>
  )
}
