# Kontraktus Progress Site (GitHub Pages)

The canonical source for this site is [`progress-site/` in the main Kontraktus repository](https://github.com/haresholmes/kontraktus/tree/main/progress-site). The `kontraktus-app` repository remains the GitHub Pages publishing mirror so the existing domain continues to work.

- Site: **https://gh.kontraktus.app**
- Purpose: supervisor-facing CSIT321 engineering progress dashboard + updates archive
- Homepage: root update dashboard (not a marketing landing page)

## Repository structure

- `_config.yml` — Jekyll site configuration
- `index.html` — root operations dashboard + latest update + timeline + archive
- `_posts/` — weekly Markdown updates
- `_layouts/post.html` — shared post layout
- `assets/css/style.css` — dark dashboard styles
- `CNAME` — custom domain mapping for GitHub Pages

## How to add weekly posts

Create a new Markdown file in `_posts` using:

```text
YYYY-MM-DD-week-X-title.md
```

Example:

```text
2026-05-14-week-2-proxmox-setup.md
```

### Required front matter format

```yaml
---
layout: post
title: "Week X Update — Title"
date: YYYY-MM-DD
week: X
status: "Planned / In Progress / Completed"
tags: [Capstone, AI, Contracts]
summary: "Short summary here."
---
```

Then add the weekly content below front matter.

## How GitHub Pages builds this site

This site is Jekyll-based and GitHub Pages compatible:

- Posts in `_posts` are converted from Markdown to HTML.
- `index.html` uses Liquid (`site.posts`) to render the weekly update archive (newest first).
- Pushes to `main` are automatically built/deployed by GitHub Pages.

Site edits should be committed in the main repository, then mirrored with:

```bash
git subtree push --prefix=progress-site https://github.com/haresholmes/kontraktus-app.git main
```

The prototype workflow in the publishing mirror may add generated files under `prototype/`. Before another subtree push, pull those changes into the main repository with `git subtree pull --prefix=progress-site https://github.com/haresholmes/kontraktus-app.git main` so the mirror remains a fast-forward.

No backend, database, or server-side runtime is required.

## Custom domain handling

Keep `CNAME` in repository root with:

```text
gh.kontraktus.app
```

If this file is removed or changed, custom domain routing can break.

## Local preview (optional)

If Jekyll is installed locally:

```bash
bundle exec jekyll serve
```

Then open the local address printed by Jekyll.

If not, push to GitHub and verify the Pages build output there.
