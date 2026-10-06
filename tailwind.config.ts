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
        parchment: "#F5F0E8",
        pink: {
          accent: "#F8C8D4",
        },
        teal: {
          sarcelle: "#4A9B9B",
          dark: "#3B7A7A",
        },
        charcoal: "#2C2C2C",
      },
      fontFamily: {
        serif: ["Cormorant Garamond", "Georgia", "Cambria", "serif"],
        sans: ["Inter", "system-ui", "-apple-system", "sans-serif"],
      },
      backgroundColor: {
        skin: "#F5F0E8",
      },
    },
  },
  plugins: [],
};

export default config;
