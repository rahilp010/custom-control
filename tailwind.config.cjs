/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ['./components/**/*.{js,jsx}', './src/**/*.{js,jsx}', './src/styles.css'],
  corePlugins: {
    // The package must never reset the host application's styles.
    preflight: false
  },
  theme: {
    extend: {
      colors: {
        cc: {
          primary: 'rgb(var(--cc-primary) / <alpha-value>)',
          'primary-hover': 'rgb(var(--cc-primary-hover) / <alpha-value>)',
          'on-primary': 'rgb(var(--cc-on-primary) / <alpha-value>)',
          surface: 'rgb(var(--cc-surface) / <alpha-value>)',
          'surface-2': 'rgb(var(--cc-surface-2) / <alpha-value>)',
          text: 'rgb(var(--cc-text) / <alpha-value>)',
          muted: 'rgb(var(--cc-muted) / <alpha-value>)',
          subtle: 'rgb(var(--cc-subtle) / <alpha-value>)',
          overlay: 'rgb(var(--cc-overlay) / <alpha-value>)',
          scrim: 'rgb(var(--cc-scrim) / <alpha-value>)'
        }
      },
      boxShadow: {
        'cc-glow': '0 0 12px rgb(var(--cc-primary) / 0.35)'
      }
    }
  },
  plugins: []
}
