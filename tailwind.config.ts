import type { Config } from "tailwindcss";

const config: Config = {
  content: [
    "./src/pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/components/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/app/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/layout/**/*.{js,ts,jsx,tsx,mdx}", // Ensure your layout folder is scanned
  ],
  theme: {
    extend: {
      // 1. Move all your CSS custom variables here
      colors: {
        color1: "#6b7280",
        color2: "#ffffff",
        color3: "#d9d9d9",
        color4: "#2772cc",
        color5: "#244f84",
        color6: "#030712",
        color7: "#99d7f7",
        color8: "#f3f4f8",
        color9: "#1f2937",
        color10: "#1a3151",
        color11: "#e5e7eb",
        color12: "#45a5ec",
        color13: "#d97706",
        "color-14": "#f0f9fe",
        "color-15": "#f59e0b",
        "color-16": "#fbbf24",
        "color-17": "#d1d5db",
      },
      // 2. Map your fonts
      fontFamily: {
        outfit: ["var(--font-outfit)", "sans-serif"],
        albert: ["var(--font-albert)", "sans-serif"],
      },
      // 3. Move your complex CSS gradients here
      backgroundImage: {
        "faq-glow": "radial-gradient(circle, rgba(69, 165, 236, 0.22) 0%, rgba(69, 165, 236, 0.12) 28%, rgba(69, 165, 236, 0.06) 52%, transparent 75%)",
        "about-banner": "linear-gradient(to bottom, rgba(255,255,255,0.32) 0%, rgba(255, 255, 255, 0.274) 50%, rgba(255,255,255) 100%), url('/assets/images/2.hero.png')",
        "coverage-map": "url('/assets/images/location.png')",
      },
      // 4. Move your loading animation here
      keyframes: {
        loading: {
          "0%": { width: "0%" },
          "100%": { width: "100%" },
        },
      },
      animation: {
        "loading-bar": "loading 3s ease forwards",
      },
    },
  },
  plugins: [],
};

export default config;