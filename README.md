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

The Vite app in repo root previews the [`KontraktusLogo`](src/app/components/KontraktusLogo.tsx) React component (`pnpm install` / `pnpm build` as needed).
