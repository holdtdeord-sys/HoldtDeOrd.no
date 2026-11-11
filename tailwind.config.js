/** Tailwind-oppsett for HoldtDeOrd.no. Kjør `npm run build` etter endringer i klasser. */
module.exports = {
  content: [
    './*.html',
    './saker/**/*.html',
    './assets/site.js'
  ],
  // Klasser som bygges dynamisk i JS (partilofter.html: bg-${st.color}-100 / text-${st.color}-700)
  safelist: [
    { pattern: /^bg-(amber)-100$/ },
    { pattern: /^text-(amber)-700$/ }
  ],
  theme: {
    extend: {
      transitionDuration: { DEFAULT: '200ms' },
      transitionTimingFunction: { DEFAULT: 'cubic-bezier(0.4, 0, 0.2, 1)' }
    }
  },
  plugins: []
};
