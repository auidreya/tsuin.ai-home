import type { Config } from 'tailwindcss'

const config: Config = {
  darkMode: ['class'],
  content: [
    './src/pages/**/*.{js,ts,jsx,tsx,mdx}',
    './src/components/**/*.{js,ts,jsx,tsx,mdx}',
    './src/app/**/*.{js,ts,jsx,tsx,mdx}',
  ],
  theme: {
    extend: {
      spacing: {
        // Carbon spacing scale — use within components (labels, gaps between elements)
        'sp-01': '2px',
        'sp-02': '4px',
        'sp-03': '8px',
        'sp-04': '12px',
        'sp-05': '16px',
        'sp-06': '24px',
        'sp-07': '32px',
        'sp-08': '40px',
        'sp-09': '48px',
        // Carbon layout scale — use between sections and page-level positioning
        'ly-01': '16px',
        'ly-02': '24px',
        'ly-03': '32px',
        'ly-04': '48px',
        'ly-05': '64px',
        'ly-06': '96px',
        'ly-07': '160px',
      },
      colors: {
        bg: '#111010',
        surface: '#161514',
        teal: {
          DEFAULT: '#4ecdc4',
          dark: '#3ab5ac',
          glow: 'rgba(78,205,196,0.25)',
        },
        ink: {
          primary: '#d8d4cc',
          muted: '#6e6a62',
          faint: '#2a2826',
        },
        ember: '#ff7050',
        footer: '#e8eaf0',
      },
      fontFamily: {
        mono: ['var(--font-mono)', 'JetBrains Mono', 'Fira Code', 'Courier New', 'monospace'],
        display: ['var(--font-display)', 'sans-serif'],
      },
      keyframes: {
        shake: {
          '0%,100%': { transform: 'translateX(0)' },
          '20%': { transform: 'translateX(-8px)' },
          '40%': { transform: 'translateX(8px)' },
          '60%': { transform: 'translateX(-6px)' },
          '80%': { transform: 'translateX(6px)' },
        },
        'draw-check': {
          from: { strokeDashoffset: '100' },
          to: { strokeDashoffset: '0' },
        },
        'fade-up': {
          from: { opacity: '0', transform: 'translateY(24px)' },
          to: { opacity: '1', transform: 'translateY(0)' },
        },
        'slide-up': {
          from: { transform: 'translateY(100%)' },
          to: { transform: 'translateY(0)' },
        },
        'pulse-dot': {
          '0%,100%': { opacity: '1' },
          '50%': { opacity: '0.4' },
        },
        bob: {
          '0%,100%': { transform: 'translateY(0)' },
          '50%': { transform: 'translateY(-8px)' },
        },
        wiggle: {
          '0%,100%': { transform: 'rotate(0deg)' },
          '20%': { transform: 'rotate(-6deg)' },
          '40%': { transform: 'rotate(5deg)' },
          '60%': { transform: 'rotate(-4deg)' },
          '80%': { transform: 'rotate(3deg)' },
        },
      },
      animation: {
        shake: 'shake 0.45s ease-in-out',
        'draw-check': 'draw-check 0.5s ease forwards',
        'fade-up': 'fade-up 0.6s ease forwards',
        'slide-up': 'slide-up 0.4s cubic-bezier(0.16,1,0.3,1)',
        'pulse-dot': 'pulse-dot 2s ease-in-out infinite',
        bob: 'bob 4s ease-in-out infinite',
        wiggle: 'wiggle 0.5s ease-in-out',
      },
      boxShadow: {
        teal: '0 0 0 3px rgba(78,205,196,0.2)',
        'teal-strong': '0 0 20px rgba(78,205,196,0.3)',
      },
    },
  },
  plugins: [],
}

export default config
