/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./src/**/*.tsx"],
  theme: {
    extend: {
      textColor: {
        brand: "var(--color-brand)",
        muted: "var(--color-muted)",
        text: "var(--color-text)",
        background: "var(--color-background)",
        paragraph: "var(--color-paragraph)",
      },
      backgroundColor: {
        brand: "var(--color-brand)",
        background: "var(--color-background)",
        "background-job": "var(--color-background-job)",
      },
    },
  },
  plugins: [],
};
