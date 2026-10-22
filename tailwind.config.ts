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
        brand: {
          dark: "#070D18",
          darker: "#040810",
          surface: "#0F1A2E",
          card: "#14233D",
          border: "#1E3357",
          navy: {
            DEFAULT: "#0F2744",
            light: "#1E3A8A",
            dark: "#0A192F",
          },
          blue: {
            DEFAULT: "#2563EB",
            hover: "#1D4ED8",
            light: "#60A5FA",
          },
          gold: {
            DEFAULT: "#F59E0B",
            hover: "#D97706",
            light: "#FCD34D",
            glow: "rgba(245, 158, 11, 0.25)",
          },
        },
      },
      fontFamily: {
        sans: ["var(--font-jakarta)", "sans-serif"],
        display: ["var(--font-outfit)", "sans-serif"],
      },
      backgroundImage: {
        "gradient-radial": "radial-gradient(var(--tw-gradient-stops))",
        "gradient-conic": "conic-gradient(from 180deg at 50% 50%, var(--tw-gradient-stops))",
        "hero-glow": "radial-gradient(ellipse at 50% 0%, rgba(37,99,235,0.25) 0%, rgba(11,26,48,0) 70%)",
        "gold-glow": "radial-gradient(ellipse at 50% 50%, rgba(245,158,11,0.15) 0%, rgba(11,26,48,0) 70%)",
      },
      animation: {
        "pulse-slow": "pulse 4s cubic-bezier(0.4, 0, 0.6, 1) infinite",
        "float": "float 6s ease-in-out infinite",
      },
      keyframes: {
        float: {
          "0%, 100%": { transform: "translateY(0px)" },
          "50%": { transform: "translateY(-10px)" },
        },
      },
    },
  },
  plugins: [],
};
export default config;
