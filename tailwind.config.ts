import type { Config } from "tailwindcss";

const config: Config = {
  content: [
    "./src/pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/components/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      colors: {
        background: "var(--background)",
        foreground: "var(--foreground)",
        primary: "#e11d48", // red tone for accents matching the car
      },
      fontFamily: {
        sans: ['var(--font-inter)'],
        display: ['var(--font-bebas-neue)'], // For the big bold text
        script: ['var(--font-great-vibes)'],
      },
      animation: {
        'equalizer': 'equalizer 1s ease-in-out infinite',
      },
      keyframes: {
        equalizer: {
          '0%, 100%': { transform: 'scaleY(0.2)' },
          '50%': { transform: 'scaleY(1)' },
        }
      }
    },
  },
  plugins: [],
};
export default config;
