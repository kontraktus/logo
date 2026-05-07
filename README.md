# Kontraktus Weekly Updates (GitHub Pages + Jekyll)

This repository powers the capstone update site for our professor at:

- **https://gh.kontraktus.app**

The root page is intentionally the update tracker/blog index (not a startup landing page).

## Site structure

- `_config.yml` — Jekyll site config
- `index.html` — homepage/blog index and progress dashboard sections
- `_posts/` — weekly updates in Markdown
- `_layouts/post.html` — post template
- `assets/css/style.css` — visual style (dark legal-tech SaaS look)
- `CNAME` — custom domain for GitHub Pages

## 1) How to add a new weekly post

Create a new file in `_posts` with this naming pattern:

```text
YYYY-MM-DD-week-X-title.md
```

Example:

```text
2026-05-14-week-2-proxmox-setup.md
```

Each post must include front matter:

```yaml
---
layout: post
title:
date:
week:
status:
tags:
summary:
---
```

Then write your weekly content below the front matter.

## 2) Where to edit styles

All visual styling is in:

- `assets/css/style.css`

You can customize cards, timeline blocks, badges, pipeline chips, post callouts, and progress bars there.

## 3) How GitHub Pages builds the site

This project uses **Jekyll** (native GitHub Pages support):

- Markdown files in `_posts` are converted into blog posts.
- `index.html` uses Liquid to list posts from newest to oldest.
- Any push to `main` triggers GitHub Pages build/deploy.

No backend or database is required.

## 4) How to keep the custom domain

The `CNAME` file must remain in repository root with:

```text
gh.kontraktus.app
```

Do not delete this file, or the custom domain mapping may break.

## Local preview (optional)

If Ruby/Jekyll is available locally:

```bash
bundle exec jekyll serve
```

Or rely on GitHub Pages deployment after pushing.
