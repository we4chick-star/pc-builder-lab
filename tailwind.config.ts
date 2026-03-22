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
        /** Chemical green — primary selection accent */
        chemical: {
          DEFAULT: "#10b981",
          dim: "#059669",
          muted: "rgba(16, 185, 129, 0.12)",
        },
        lab: {
          void: "#050505",
          deep: "#070707",
          panel: "#0a0a0a",
          glass: "rgba(10, 10, 10, 0.72)",
          border: "rgba(16, 185, 129, 0.12)",
          green: "#10b981",
          "green-dim": "#047857",
          glow: "#6ee7b7",
          amber: "#ca8a04",
          "amber-glow": "#eab308",
          danger: "#ef4444",
        },
      },
      fontFamily: {
        display: ["var(--font-geist-sans)", "system-ui", "sans-serif"],
        mono: ["var(--font-geist-mono)", "ui-monospace", "monospace"],
      },
      boxShadow: {
        glow: "0 0 48px rgba(16, 185, 129, 0.08)",
        chemical: "0 0 32px rgba(16, 185, 129, 0.22)",
        "glow-amber": "0 0 24px rgba(234, 179, 8, 0.1)",
      },
      backdropBlur: {
        xs: "2px",
      },
      keyframes: {
        checkoutGlow: {
          "0%, 100%": {
            boxShadow:
              "0 0 32px rgba(16, 185, 129, 0.5), 0 0 64px rgba(16, 185, 129, 0.2), inset 0 1px 0 rgba(255,255,255,0.12)",
          },
          "50%": {
            boxShadow:
              "0 0 56px rgba(16, 185, 129, 0.95), 0 0 120px rgba(16, 185, 129, 0.35), inset 0 1px 0 rgba(255,255,255,0.18)",
          },
        },
        orderPulse: {
          "0%, 100%": {
            boxShadow: "0 0 18px rgba(16,185,129,0.55), 0 0 40px rgba(16,185,129,0.2)",
            transform: "scale(1)",
          },
          "50%": {
            boxShadow: "0 0 36px rgba(16,185,129,1), 0 0 80px rgba(16,185,129,0.45)",
            transform: "scale(1.025)",
          },
        },
        goldPulse: {
          "0%, 100%": {
            boxShadow: "0 0 12px rgba(234,179,8,0.3), 0 0 28px rgba(234,179,8,0.1)",
            transform: "scale(1)",
            borderColor: "rgba(234,179,8,0.4)",
          },
          "50%": {
            boxShadow: "0 0 28px rgba(234,179,8,0.7), 0 0 60px rgba(234,179,8,0.25)",
            transform: "scale(1.02)",
            borderColor: "rgba(234,179,8,0.75)",
          },
        },
      },
      animation: {
        checkoutGlow: "checkoutGlow 2.4s ease-in-out infinite",
        orderPulse: "orderPulse 2s ease-in-out infinite",
        goldPulse: "goldPulse 3s ease-in-out infinite",
      },
    },
  },
  plugins: [],
};

export default config;
