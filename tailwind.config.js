/** @type {import('tailwindcss').Config} */
const config = {
  content: [
    "./src/app/**/*.{js,jsx,ts,tsx}",
    "./src/components/**/*.{js,jsx,ts,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        brand: {
          // bestehend (Akzent)
          green: "#17E800",

          // neutrals / light theme
          bg: "#F7F8FA",        // Seitenhintergrund (hell)
          surface: "#FFFFFF",   // Karten/Boxen
          border: "#E6E8EC",    // Linien/Border
          text: "#0F172A",      // Haupttext (dunkel)
          textMuted: "#475569", // sekundärer Text

          // optional: dunkle Variante für Hero/Nav
          dark: "#050505",
          muted: "#0A0A0A",
        },
      },

      keyframes: {
        logoFloat: {
          "0%": { transform: "translateY(0px)" },
          "50%": { transform: "translateY(-10px)" },
          "100%": { transform: "translateY(0px)" },
        },
        heroPop: {
          "0%": { opacity: "0", transform: "translateY(18px) scale(0.96)" },
          "60%": { opacity: "1", transform: "translateY(0px) scale(1.02)" },
          "100%": { opacity: "1", transform: "translateY(0px) scale(1)" },
        },
        menuOverlayIn: {
          "0%": { opacity: "0", transform: "translateY(8px) scale(0.98)" },
          "100%": { opacity: "1", transform: "translateY(0px) scale(1)" },
        },
        menuLinkIn: {
          "0%": { opacity: "0", transform: "translateY(12px)" },
          "100%": { opacity: "1", transform: "translateY(0px)" },
        },
        menuCtaIn: {
          "0%": { opacity: "0", transform: "translateY(16px) scale(0.9)" },
          "70%": { opacity: "1", transform: "translateY(0px) scale(1.03)" },
          "100%": { opacity: "1", transform: "translateY(0px) scale(1)" },
        },
      },

      animation: {
        "logo-float": "logoFloat 5s ease-in-out infinite",
        "hero-pop":
          "heroPop 1.5s cubic-bezier(0.22, 0.61, 0.36, 1) 0.15s both",
        "menu-overlay": "menuOverlayIn 0.25s ease-out forwards",
        "menu-link": "menuLinkIn 0.35s ease-out forwards",
        "menu-cta":
          "menuCtaIn 0.8s cubic-bezier(0.22, 0.61, 0.36, 1) 0.34s forwards",
      },
    },
  },
  plugins: [],
};

export default config;
