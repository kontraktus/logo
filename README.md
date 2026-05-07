# Kontraktus logo & brand kit

Canonical assets live in [`brand/primary/`](brand/primary/). Open [`brand/preview.html`](brand/preview.html) locally (or via a static server from `brand/`) for a visual survey.

older exploration sets are preserved under [`brand/archive/partner-explorations/`](brand/archive/partner-explorations/).

Rebuild vectors from the authoring script:

```bash
python3 brand/build-primary-mark.py
```

Regenerate PNGs (ImageMagick):

```bash
./brand/export-pngs.sh
```

## PNG quick usage guide (`brand/png/primary`)

- `logo-horizontal-on-light@4x.png` -> Website headers, pitch decks, document covers on light backgrounds.
- `logo-horizontal-on-dark@4x.png` -> Dark UI nav bars, dashboards, dark hero sections.
- `logo-stacked-on-light@4x.png` -> Social posts, one-column layouts, title slides.
- `logo-stacked-on-dark@4x.png` -> Dark one-column layouts and splash screens.
- `logo-monochrome@4x.png` -> Contracts, printouts, stamps/watermarks, black-only docs.
- `icon-circle-on-dark@4x.png` -> Profile picture / avatar (Teams, Slack, GitHub org icon style).
- `icon-circle-on-light@4x.png` -> Profile picture where white background is required.
- `icon-square-on-dark-512.png` -> App icon master for mobile/store submissions.
- `icon-square-on-light-512.png` -> App icon master for light UI ecosystems.
- `icon-only-minimal@4x.png` -> Tiny product marks, compact badges.
- `favicon-on-light-32.png` -> Browser tab favicon for light browser chrome.
- `favicon-on-dark-32.png` -> Browser tab favicon for dark browser chrome.
- `favicon-on-light-180.png` -> Apple touch icon.
- `favicon-on-dark-180.png` -> Alternate dark touch icon.

### Size suffix meaning

- `@4x` = highest quality general-purpose export (preferred source file).
- `-2x` = medium size for docs/slides.
- `-512` = app/store icon size.
- `-180` = touch icon size.
- `-32` = favicon size.

The Vite app in repo root previews the [`KontraktusLogo`](src/app/components/KontraktusLogo.tsx) React component (`pnpm install` / `pnpm build` as needed).
