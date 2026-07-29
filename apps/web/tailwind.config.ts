import type { Config } from "tailwindcss";

// Design direction (see design-tokens.md for rationale):
// - Warm, paper-like neutral base instead of default slate/zinc/gray
// - Single accent: a muted rust/copper, evoking cargo-ship rust and JDM
//   tail-light amber without going full "orange CTA button" cliché
// - Deliberately NOT purple/indigo (the default "AI product" gradient)
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
          50: "#FBFAF7",
          100: "#F5F2EB",
          200: "#EDE8DC",
          300: "#DDD5C2",
          400: "#C3B8A0",
        },
        ink: {
          600: "#57534A",
          700: "#3F3B33",
          800: "#2B2822",
          900: "#1B1915",
        },
        rust: {
          50: "#FCF1EC",
          100: "#F5DACB",
          300: "#DDA07C",
          500: "#B85C38", // primary accent
          600: "#9A4A2C",
          700: "#7A3A22",
        },
        harbor: {
          // secondary accent for status/timeline states — muted teal, not a
          // generic "success green"
          400: "#7FA69C",
          500: "#5C8A7E",
          600: "#456A61",
        },
      },
      fontFamily: {
        // Pairing: a display serif with a bit of character for headings,
        // a workmanlike grotesk for body/UI text. Neither is Inter.
        display: ["'Fraunces'", "serif"],
        sans: ["'Public Sans'", "system-ui", "sans-serif"],
      },
      borderRadius: {
        DEFAULT: "0.5rem",
        lg: "0.75rem",
        xl: "1.25rem",
      },
    },
  },
  plugins: [],
};

export default config;
