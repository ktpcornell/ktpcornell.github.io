/**
 * KTP Cornell Design Tokens
 *
 * Single source of truth for all brand colors, typography, and spacing.
 * No file outside this directory or tailwind.config.ts should hardcode hex values.
 */

export const ktpColors = {
  // Brand
  navy: '#273053',
  navyRgb: '39, 48, 83',       // for use in rgba()
  cyan: '#0dcaf0',
  sectionBg: '#f0f8ff',
  text: '#717275',
  dark: '#191c24',
  deepNavy: '#001433',
  overlayRgb: '0, 20, 60',     // for use in rgba() overlays
  pink: '#f78fb3',
  white: '#ffffff',

  // Semantic / status
  errorBg: '#fee2e2',
  error: '#991b1b',
  errorBorder: '#fca5a5',
  danger: '#dc2626',
  warningBg: '#fef3c7',
  warningBorder: '#f59e0b',
  warningText: '#92400e',
} as const

export const ktpTypography = {
  fontFamily: "'DM Sans', sans-serif",
  sizes: {
    h1: '62px',
    h2: '48px',
    h3: '36px',
    h4: '32px',
    h5: '24px',
    h6: '22px',
    p: '18px',
    menu: '16px',
    copyright: '16px',
  },
  weights: {
    normal: 400,
    medium: 500,
    bold: 700,
  },
} as const

export const ktpSpacing = {
  sectionPadding: '120px',
  borderRadius: {
    card: '14px',
    button: '9999px',
    input: '8px',
  },
} as const
