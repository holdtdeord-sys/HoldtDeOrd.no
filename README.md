# HoldtDeOrd.no
HoldtDeOrd.no - Faktabasert oversikt over politikerløfter

## Bygge CSS (Tailwind)

Sidene bruker en ferdig kompilert Tailwind-fil, `assets/tailwind.css`, som ligger i repoet og serveres direkte av GitHub Pages. Det er ingen byggesteg ved publisering.

Når du legger til eller endrer Tailwind-klasser i en HTML-fil eller i `assets/site.js`, må CSS-en bygges på nytt og committes:

```bash
npm install      # første gang (krever Node.js 18+)
npm run build    # skriver minifisert assets/tailwind.css
```

- `npm run watch` bygger automatisk på nytt mens du jobber.
- Hvilke filer som skannes for klasser står i `content` i `tailwind.config.js`. Nye mapper med HTML må legges til der.
- Klasser som settes sammen i JavaScript (f.eks. `` `bg-${farge}-100` ``) finnes ikke som hel tekst i filene og må stå i `safelist` i `tailwind.config.js`.
- Husk å committe den oppdaterte `assets/tailwind.css` sammen med HTML-endringen.
