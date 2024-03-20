/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}"
  ],
  theme: {
    extend: {
      fontFamily: {
        poppins: ["Poppins", "sans-serif"],
      },
    },
  },
  daisyui: {
    themes: [
      {
        blue: {
          "primary": "#0080ff",
          "secondary": "#0059ff",
          "accent": "#2e00ff",
          "neutral": "#17261a",
          "base-100": "#1e2237",
          "info": "#00baff",
          "success": "#00f8cf",
          "warning": "#ff9600",
          "error": "#cd0026",
        },
      },
    ],
  },
  plugins: [require("daisyui"), require('@tailwindcss/typography'),],
  variants: {
    extend: {
      display: ["group-hover"],
    },
  },
};
