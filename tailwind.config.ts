import type { Config } from 'tailwindcss'

const config: Config = {
  darkMode: ['class'],
  content: [
    './index.html',
    './src/**/*.{ts,tsx}',
  ],
  theme: {
    extend: {
      colors: {
        // KTP brand tokens — all reference globals.css CSS variables as single source of truth
        // Tokens using hsl(var() / <alpha-value>) support Tailwind opacity modifiers (e.g. bg-ktp-primary/10)
        'ktp-primary':      'hsl(var(--ktp-primary-hsl) / <alpha-value>)',
        'ktp-accent':       'hsl(var(--ktp-accent-hsl) / <alpha-value>)',
        'ktp-destructive':  'hsl(var(--ktp-destructive-hsl) / <alpha-value>)',
        'ktp-accent-pink':  'var(--ktp-accent-pink)',
        'ktp-error':        'var(--ktp-error)',
        'ktp-error-bg':     'var(--ktp-error-bg)',
        'ktp-warning-bg':   'var(--ktp-warning-bg)',
        'ktp-warning-border': 'var(--ktp-warning-border)',
        'ktp-warning-text': 'var(--ktp-warning-text)',
        // Background tokens
        'ktp-bg-surface': 'var(--ktp-bg-surface)',
        'ktp-bg-panel':   'var(--ktp-bg-panel)',
        'ktp-bg-hover':   'var(--ktp-bg-hover)',
        // Foreground tokens
        'ktp-fg-body':    'var(--ktp-fg-body)',
        'ktp-fg-subtle':  'var(--ktp-fg-subtle)',
        'ktp-fg-on-dark': 'var(--ktp-fg-on-dark)',
        // Border tokens
        'ktp-border':      'var(--ktp-border)',
        'ktp-border-dark': 'var(--ktp-border-dark)',
        // Overlay + special
        'ktp-overlay':   'var(--ktp-overlay)',
        'ktp-card-back': 'var(--ktp-card-back)',
        // Neutral
        'ktp-neutral': 'var(--ktp-neutral)',
        // Semantic utility tokens used by component internals
        'ktp-muted':    'hsl(var(--ktp-muted-hsl))',
        'ktp-muted-fg': 'hsl(var(--ktp-muted-fg-hsl))',
        'ktp-ring':     'hsl(var(--ktp-accent-hsl) / <alpha-value>)',
      },
      fontFamily: {
        sans: ['DM Sans', 'sans-serif'],
      },
      fontSize: {
        'heading-1': 'var(--h1-font-size)',
        'heading-2': 'var(--h2-font-size)',
        'heading-3': 'var(--h3-font-size)',
        'heading-4': 'var(--h4-font-size)',
        'heading-5': 'var(--h5-font-size)',
        'heading-6': 'var(--h6-font-size)',
      },
      borderRadius: {
        lg: 'var(--ktp-radius)',
        md: 'calc(var(--ktp-radius) - 2px)',
        sm: 'calc(var(--ktp-radius) - 4px)',
      },
    },
  },
  plugins: [],
}

export default config
