/** @type {import('tailwindcss').Config} */
module.exports = {
  corePlugins: {
    backdropOpacity: false,
    backgroundOpacity: false,
    borderOpacity: false,
    divideOpacity: false,
    ringOpacity: false,
    textOpacity: false
},
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
      borderColor: {
        brand: "var(--color-brand)",
      },
      letterSpacing: {
        tighter: '-0.5625px'
      },
      outlineColor: {
        brand: "var(--color-brand)",
      },
      keyframes: {
        pulsar: {
          '0%, 100%': { transform: 'scale(0.8)', opacity: .5 },
          '50%': { transform: 'scale(1)', opacity: 1},
        },
        animation: {
          pulsar: 'pulsar 2s cubic-bezier(0.4, 0, 0.6, 1) infinite'
        }
      }
    },
  },
  plugins: [],
};
