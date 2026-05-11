import type { Config } from "tailwindcss";

// ============================================================
// Design Tokens — CAS-17
// Tokens sémantiques ajustables une fois CAS-16 livré.
// Toute modification visuelle passe par ce fichier uniquement.
// ============================================================

const config: Config = {
  content: [
    "./src/pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/components/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      colors: {
        // ── Couleur de marque (vert santé) ──────────────────
        brand: {
          50:  "#f0fdf4",
          100: "#dcfce7",
          200: "#bbf7d0",
          300: "#86efac",
          500: "#22c55e",
          600: "#16a34a",
          700: "#15803d",
          800: "#166534",
          900: "#14532d",
        },
        // ── Accent CTA (orange conversion) ──────────────────
        cta: {
          50:  "#fff7ed",
          100: "#ffedd5",
          500: "#f97316",
          600: "#ea580c",
          700: "#c2410c",
        },
        // ── Étoiles de note ─────────────────────────────────
        star: {
          filled: "#fbbf24",
          empty:  "#e5e7eb",
        },
        // ── Surfaces sémantiques ────────────────────────────
        surface: {
          page:    "#ffffff",
          card:    "#ffffff",
          muted:   "#f9fafb",
          dark:    "#111827",
        },
      },
      fontFamily: {
        sans: ["var(--font-geist-sans)", "system-ui", "sans-serif"],
        mono: ["var(--font-geist-mono)", "monospace"],
      },
      fontSize: {
        // Échelle typographique harmonieuse
        "display": ["clamp(2rem, 5vw, 3.5rem)", { lineHeight: "1.1", fontWeight: "800" }],
        "heading":  ["clamp(1.5rem, 3vw, 2.25rem)", { lineHeight: "1.2", fontWeight: "700" }],
        "subhead":  ["clamp(1.125rem, 2vw, 1.5rem)", { lineHeight: "1.3", fontWeight: "600" }],
      },
      borderRadius: {
        "2xl": "1rem",
        "3xl": "1.5rem",
      },
      boxShadow: {
        "card":   "0 1px 3px 0 rgb(0 0 0 / .07), 0 1px 2px -1px rgb(0 0 0 / .07)",
        "card-hover": "0 4px 12px 0 rgb(0 0 0 / .10), 0 2px 4px -1px rgb(0 0 0 / .06)",
        "cta":    "0 4px 14px 0 rgb(22 163 74 / .35)",
        "cta-hover": "0 6px 20px 0 rgb(22 163 74 / .45)",
      },
    },
  },
  plugins: [require("@tailwindcss/typography")],
};

export default config;
