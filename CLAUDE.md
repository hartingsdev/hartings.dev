# hartings.dev — Claude Instructions

## Project Overview

Personal website and blog built with Astro 5 and Tailwind CSS. Static output, deployed on Cloudflare Pages via direct GitHub integration.

## Environment Notes

This project runs in a Docker sandbox with the workspace mounted from a Windows (NTFS) host. This has two important implications:

- **`node_modules/.bin/` is empty** — NTFS does not support Unix symlinks. `npm install` will fail with `EPERM: symlink`. The npm scripts are configured to call `node node_modules/astro/astro.js` directly to work around this.
- **Dev server needs `--host`** — Start with `npm run dev` (already includes `--host`) to bind on `0.0.0.0` for port forwarding to work.
- **Dev server startup is slow** — ~50 seconds on first start due to the Tailwind integration hook. No output during startup is normal.

## Running the Dev Server

```bash
npm run dev
```

The server starts on port 4321. If port 4321 is taken, Astro will try 4322, 4323, etc.

## Tech Stack

- Astro 5 (`src/pages/` for routing, `.astro` components)
- Tailwind CSS with custom theme (`tailwind.config.mjs`)
- Custom colors: `ink` (background), `paper` (text), `muted`, `line` (borders), `accent` (yellow `#e8ff5a`)
- Custom fonts: `Bricolage Grotesque` (sans), `JetBrains Mono` (mono)

## Content

- **Blog posts**: Markdown files in `src/pages/blog/` — reading time calculated automatically
- **Projects**: Defined as a data array in `src/pages/projects.astro`
- **About/Contact/Imprint**: Static `.astro` pages

## Deployment

Cloudflare Pages — direct GitHub integration. Pushes to `main` trigger automatic builds. Build command: `npm run build`. Output directory: `dist/`.

## Blog Post Frontmatter

```md
---
layout: ../../layouts/PostLayout.astro
title: "Title (quote if it contains colons)"
date: YYYY-MM-DD
description: Short description for meta/OG tags.
---
```

## Adding a Project

Edit the `projects` array in `src/pages/projects.astro`:

```js
{
  title: 'Project name',
  description: 'Description text.',
  tags: ['Tag1', 'Tag2'],
  href: 'https://github.com/...',  // or null
  status: 'live',                  // or null
}
```
