import type { Config } from 'tailwindcss';

export default {
  content: [
    './src/pages/**/*.{js,ts,jsx,tsx,mdx}',
    './src/components/**/*.{js,ts,jsx,tsx,mdx}',
    './src/app/**/*.{js,ts,jsx,tsx,mdx}',
  ],
  theme: {
    extend: {
      colors: {
        primary: {
          maru: '#002968',
          egg: '#F0F2F6',
        },
        monotone: {
          black: '#19181d',
          'black-50': 'rgba(25, 24, 29, 0.5)',
          white: '#ffffff',
        },
        grayscale: {
          'gray-90': '#252528',
          'gray-80': '#3D3D42',
          'gray-70': '#56565D',
          'gray-60': '#6E6E77',
          'gray-50': '#888891',
          'gray-40': '#A2A2A9',
          'gray-30': '#BDBDC2',
          'gray-20': '#D7D7DA',
          'gray-10': '#F2F2F3',
        },
        calendar: {
          saturday: '#057CFF',
          sunday: '#FE4A4A',
        },
        error: '#F60000',
      },
      fontFamily: {
        sans: ['Pretendard', 'sans-serif'],
      },
    },
  },
  plugins: [],
} satisfies Config;
