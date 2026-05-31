# Spreat Website

Marketing site for [Spreat](https://spreat.com) — the commerce engine for physical retail.

## Stack

Static site. Plain HTML, CSS, vanilla JS. No build step.

## Structure

```
.
├── index.html            # SPA with four pages (home, stores, brands, about)
├── css/styles.css        # All styles
├── js/script.js          # Navigation, language toggle, ROI calc, modal
└── assets/
    ├── img/              # Photos and logo SVGs
    ├── img/logos/        # Partner brand logos (SVG)
    ├── dashboard-umsatz.png
    ├── freenet-creator.jpg
    ├── kasse.png
    ├── rhede.jpeg
    └── viertelladen-web.mp4
```

## Local preview

```bash
python3 -m http.server 8765
```

Then open <http://localhost:8765>.

## Languages

The site toggles between DE and EN via a `.en` class on `<body>`. Content is wrapped in either `<span data-de>` or `<span data-en>`. The hide rules use `!important` to beat layout-specific `display` overrides:

```css
body:not(.en) [data-en] { display: none !important; }
body.en [data-de]      { display: none !important; }
```

## Deployment

Hosted via GitHub Pages from the `main` branch (root). Live at <https://mattis-24.github.io/spreat-website/>.
