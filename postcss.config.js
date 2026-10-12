// Tailwind + autoprefixer (gir samme leverandørprefikser som Play CDN-en gjorde, f.eks. -webkit-backdrop-filter for Safari)
module.exports = {
  plugins: {
    tailwindcss: {},
    autoprefixer: { remove: false }
  }
};
