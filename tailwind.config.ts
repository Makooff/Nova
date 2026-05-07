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
        black: "#1d1d1f",
        dark: "#3d3d3f",
        mid: "#6e6e73",
        light: "#aeaeb2",
        border: "#d2d2d7",
        ghost: "#f5f5f7",
        offwhite: "#fbfbfd",
        "qw-blue": "#5B6BF5",
        "qw-purple": "#9B5CF6",
      },
      fontFamily: {
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
