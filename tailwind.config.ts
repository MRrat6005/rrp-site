import type { Config } from "tailwindcss";

const config: Config = {
  content: [
    "./src/app/**/*.{ts,tsx}",
    "./src/ui/**/*.{ts,tsx}",
    "./src/components/**/*.{ts,tsx}",
    "./src/lib/**/*.{ts,tsx}"
  ],
  theme: {
    extend: {
      colors: {
        ink: "#e8eef7",
        muted: "#92a0b7",
        line: "rgba(255, 255, 255, 0.1)",
        panel: "rgba(11, 14, 23, 0.78)",
        panelStrong: "rgba(16, 20, 32, 0.92)",
        accent: "#7aacff",
        accentSoft: "#8df3d1"
      },
      boxShadow: {
        halo: "0 20px 80px rgba(63, 115, 255, 0.18)"
      },
      backgroundImage: {
        "site-grid":
          "linear-gradient(rgba(255,255,255,0.06) 1px, transparent 1px), linear-gradient(90deg, rgba(255,255,255,0.06) 1px, transparent 1px)"
      }
    }
  },
  darkMode: "class",
  plugins: []
};

export default config;

