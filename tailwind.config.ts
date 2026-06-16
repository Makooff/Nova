import type { Config } from "tailwindcss";

const config: Config = {
  content: [
    "./pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./components/**/*.{js,ts,jsx,tsx,mdx}",
    "./app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      colors: {
        ink: "#0E0B10",
        "ink-2": "#161019",
        "ink-3": "#1E1622",
        cream: "#F5F0EC",
        "sun-1": "#FF8A3D",
        "sun-2": "#FF3D77",
        black: "#1d1d1f",
        dark: "#3d3d3f",
        mid: "#6e6e73",
        light: "#aeaeb2",
        border: "#d2d2d7",
        ghost: "#f5f5f7",
        offwhite: "#fbfbfd",
      },
      fontFamily: {
        poppins: ["var(--font-poppins)", "sans-serif"],
        sora: ["var(--font-sora)", "sans-serif"],
        jakarta: ["var(--font-jakarta)", "sans-serif"],
        mono: ["var(--font-dm-mono)", "monospace"],
      },
      letterSpacing: {
        tighter: "-0.04em",
        wider: "0.1em",
      },
    },
  },
  plugins: [],
};

export default config;
