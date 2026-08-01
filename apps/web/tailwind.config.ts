import type { Config } from "tailwindcss";

// Light marketplace direction (Clutch / Cars & Bids inspired):
// near-white surfaces, quiet ink, single rust accent — not purple/indigo.
const config: Config = {
  content: [
    "./app/**/*.{ts,tsx}",
    "./components/**/*.{ts,tsx}",
    "./features/**/*.{ts,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        paper: {
          50: "#FFFFFF",
          100: "#F7F7F5",
          200: "#EEEEEA",
          300: "#DDDDD7",
          400: "#B8B8B0",
        },
        ink: {
          500: "#6B6B64",
          600: "#4A4A45",
          700: "#2E2E2A",
          800: "#1A1A18",
          900: "#111110",
        },
        rust: {
          50: "#FDF4F0",
          100: "#F8E0D6",
          300: "#E08A66",
          500: "#C45A32",
          600: "#A34828",
          700: "#83381F",
        },
        harbor: {
          400: "#7FA69C",
          500: "#5C8A7E",
          600: "#456A61",
        },
      },
      fontFamily: {
        display: ["'Fraunces'", "Georgia", "serif"],
        sans: ["'Public Sans'", "system-ui", "sans-serif"],
      },
      borderRadius: {
        DEFAULT: "0.5rem",
        lg: "0.75rem",
        xl: "1rem",
      },
      boxShadow: {
        soft: "0 1px 2px rgba(17,17,16,0.04), 0 8px 24px rgba(17,17,16,0.06)",
      },
    },
  },
  plugins: [],
};

export default config;
