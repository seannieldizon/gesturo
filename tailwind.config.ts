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
        primary: {
          50: "#e6f4ff",
          100: "#b3dfff",
          200: "#80caff",
          300: "#4db5ff",
          400: "#1a9fff",
          500: "#0080e6",
          600: "#0066b3",
          700: "#004d80",
          800: "#00334d",
          900: "#001a26",
        },
        accent: {
          yellow: "#fbbf24",
          orange: "#f97316",
        },
        /** Stakeholder request: cream & warm brown for Filipino cultural warmth */
        filipino: {
          cream: "#f7f1e8",
          sand: "#ede4d6",
          bark: "#6b4f3b",
          earth: "#5c4033",
          shell: "#faf6ef",
        },
      },
      maxWidth: {
        "content": "1600px",
      },
      fontFamily: {
        sans: ["var(--font-sans)", "system-ui", "-apple-system", "BlinkMacSystemFont", "Segoe UI", "sans-serif"],
      },
      boxShadow: {
        soft: "0 8px 30px rgba(0, 100, 180, 0.08)",
        "soft-lg": "0 16px 48px rgba(0, 100, 180, 0.12)",
      },
      backgroundImage: {
        "gradient-hero": "linear-gradient(135deg, #e0f2fe 0%, #f0f9ff 50%, #fff 100%)",
        "gradient-cta": "linear-gradient(90deg, #fef3c7 0%, #bfdbfe 100%)",
        "gradient-btn-learn": "linear-gradient(135deg, #3b82f6 0%, #2563eb 100%)",
        "gradient-btn-practice": "linear-gradient(135deg, #fbbf24 0%, #f59e0b 100%)",
      },
      keyframes: {
        "bounce-hand": {
          "0%, 100%": { transform: "translateY(0)" },
          "50%": { transform: "translateY(-14px)" },
        },
        "fade-in-up": {
          "0%": { opacity: "0", transform: "translateY(24px)" },
          "100%": { opacity: "1", transform: "translateY(0)" },
        },
        "fade-in": {
          "0%": { opacity: "0" },
          "100%": { opacity: "1" },
        },
        "scale-in": {
          "0%": { opacity: "0", transform: "scale(0.95)" },
          "100%": { opacity: "1", transform: "scale(1)" },
        },
      },
      animation: {
        "bounce-hand": "bounce-hand 1.8s ease-in-out infinite",
        "fade-in-up": "fade-in-up 0.6s ease-out forwards",
        "fade-in": "fade-in 0.5s ease-out forwards",
        "scale-in": "scale-in 0.4s ease-out forwards",
      },
      animationDelay: {
        "100": "100ms",
        "200": "200ms",
        "300": "300ms",
        "400": "400ms",
        "500": "500ms",
      },
    },
  },
  plugins: [],
};

export default config;
