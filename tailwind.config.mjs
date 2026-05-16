/** @type {import('tailwindcss').Config} */
export default {
  content: ['./src/**/*.{astro,html,js,jsx,md,mdx,svelte,ts,tsx,vue}'],
  theme: {
    extend: {
      colors: {
        ink:    '#0c0c0e',
        paper:  '#e8e4d9',
        muted:  '#5a5858',
        line:   '#1e1e24',
        accent: '#e8ff5a',
      },
      fontFamily: {
        sans:  ['Bricolage Grotesque', 'sans-serif'],
        mono:  ['JetBrains Mono', 'monospace'],
      },
      typography: (theme) => ({
        ink: {
          css: {
            '--tw-prose-body': theme('colors.paper'),
            '--tw-prose-headings': theme('colors.paper'),
            '--tw-prose-links': theme('colors.accent'),
            '--tw-prose-code': theme('colors.accent'),
            '--tw-prose-pre-bg': theme('colors.line'),
          },
        },
      }),
    },
  },
  plugins: [require('@tailwindcss/typography')],
};
