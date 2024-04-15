import type { Config } from 'tailwindcss'

const config: Config = {
  future: {
    hoverOnlyWhenSupported: true,
  },
  // darkMode: 'class',
  content: [
    './src/pages/**/*.{js,ts,jsx,tsx,mdx}',
    './src/components/**/*.{js,ts,jsx,tsx,mdx}',
    './src/app/**/*.{js,ts,jsx,tsx,mdx}',
  ],
  theme: {
    extend: {
      backgroundImage: {
        'gradient-radial': 'radial-gradient(var(--tw-gradient-stops))',
        'gradient-conic':
          'conic-gradient(from 180deg at 50% 50%, var(--tw-gradient-stops))',
      },
      colors: {
        primary: {
          100: '#f9d7d7',
          200: '#f2afaf',
          300: '#ec8787',
          400: '#e55f5f',
          500: '#df3737',
          600: '#b22c2c',
          700: '#862121',
          800: '#591616',
          900: '#2d0b0b',
        },
      },
    },
  },
  plugins: [],
}
export default config
