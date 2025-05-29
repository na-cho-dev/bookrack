/** @type {import('tailwindcss').Config} */
export default {
  content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],
  theme: {
    extend: {
      colors: {
        bg: "var(--clr-bg)",
        pri: "var(--clr-pri)",
        sec: "var(--clr-sec)",
        tpri: "var(--clr-text-pri)",
        tsec: "var(--clr-text-sec)",
      },
      fontFamily: {
        quicksand: ['"Quicksand"', "sans-serif"],
        exo: ['"Exo 2"', "sans-serif"],
      },
    },
  },
  plugins: [],
};
