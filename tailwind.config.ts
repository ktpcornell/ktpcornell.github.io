import type { Config } from 'tailwindcss'
import tailwindcssAnimate from 'tailwindcss-animate'

const config: Config = {
  darkMode: ['class'],
  content: [
    './index.html',
    './src/**/*.{ts,tsx}',
  ],
  theme: {
  	extend: {
  		colors: {
  			// KTP brand aliases — reference globals.css CSS variables as single source of truth
  			// Colors that need opacity modifier support use hsl(var()) with <alpha-value>
  			'ktp-primary': 'hsl(var(--primary) / <alpha-value>)',    // = primary / #273053
  			'ktp-accent': 'hsl(var(--secondary) / <alpha-value>)',   // = secondary / #0dcaf0
  			'ktp-danger': 'hsl(var(--destructive) / <alpha-value>)', // = destructive / #dc2626
  			'ktp-surface': 'var(--ktp-surface)',
  			'ktp-muted': 'var(--ktp-muted)',
  			'ktp-accent-pink': 'var(--ktp-accent-pink)',
  			'ktp-error': 'var(--ktp-error)',
  			'ktp-error-bg': 'var(--ktp-error-bg)',
  			'ktp-warning-bg': 'var(--ktp-warning-bg)',
  			'ktp-warning-border': 'var(--ktp-warning-border)',
  			'ktp-warning-text': 'var(--ktp-warning-text)',
  			border: 'hsl(var(--border))',
  			input: 'hsl(var(--input))',
  			ring: 'hsl(var(--ring))',
  			background: 'hsl(var(--background))',
  			foreground: 'hsl(var(--foreground))',
  			primary: {
  				DEFAULT: 'hsl(var(--primary))',
  				foreground: 'hsl(var(--primary-foreground))'
  			},
  			secondary: {
  				DEFAULT: 'hsl(var(--secondary))',
  				foreground: 'hsl(var(--secondary-foreground))'
  			},
  			destructive: {
  				DEFAULT: 'hsl(var(--destructive))',
  				foreground: 'hsl(var(--destructive-foreground))'
  			},
  			muted: {
  				DEFAULT: 'hsl(var(--muted))',
  				foreground: 'hsl(var(--muted-foreground))'
  			},
  			accent: {
  				DEFAULT: 'hsl(var(--accent))',
  				foreground: 'hsl(var(--accent-foreground))'
  			},
  			popover: {
  				DEFAULT: 'hsl(var(--popover))',
  				foreground: 'hsl(var(--popover-foreground))'
  			},
  			card: {
  				DEFAULT: 'hsl(var(--card))',
  				foreground: 'hsl(var(--card-foreground))'
  			}
  		},
  		fontFamily: {
  			sans: [
  				'DM Sans',
  				'sans-serif'
  			]
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
  			lg: 'var(--radius)',
  			md: 'calc(var(--radius) - 2px)',
  			sm: 'calc(var(--radius) - 4px)'
  		},
  		keyframes: {
  			'accordion-down': {
  				from: {
  					height: '0'
  				},
  				to: {
  					height: 'var(--radix-accordion-content-height)'
  				}
  			},
  			'accordion-up': {
  				from: {
  					height: 'var(--radix-accordion-content-height)'
  				},
  				to: {
  					height: '0'
  				}
  			}
  		},
  		animation: {
  			'accordion-down': 'accordion-down 0.2s ease-out',
  			'accordion-up': 'accordion-up 0.2s ease-out'
  		}
  	}
  },
  plugins: [tailwindcssAnimate],
}

export default config
