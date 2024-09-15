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
      },

      keyframes: {
        "blob-rotate-scale": {
          "0%": { transform: "rotate(0deg) scale(1, 1)" },
          "50%": { transform: "rotate(180deg) scale(1, 1.3)" },
          "100%": { transform: "rotate(360deg) scale(1, 1)" },
        },
      },
      animation: {
        "blob-rotate-scale": "blob-rotate-scale 20s infinite",
      },

      height: {
        "34vmax": "34vmax",
        // Add other custom heights
      },
    },
  },
  plugins: [],
};
export default config;
