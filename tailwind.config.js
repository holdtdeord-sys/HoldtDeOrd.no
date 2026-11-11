/** Tailwind-oppsett for HoldtDeOrd.no. Kjør `npm run build` etter endringer i klasser. */
module.exports = {
  content: [
    './*.html',
    './saker/**/*.html',
    './assets/site.js'
  ],
  // Klasser som bygges dynamisk i JS (partilofter.html: bg-${statusColor}-100 / text-${statusColor}-700)
  safelist: [
    { pattern: /^bg-(emerald|amber|red)-100$/ },
    { pattern: /^text-(emerald|amber|red)-700$/ }
  ],
  theme: {
    extend: {
      transitionDuration: { DEFAULT: '200ms' },
      transitionTimingFunction: { DEFAULT: 'cubic-bezier(0.4, 0, 0.2, 1)' }
    }
  },
  plugins: []
};
