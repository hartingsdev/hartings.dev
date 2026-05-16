# hartings.dev

Personal website and blog of Robert Hartings — Software Engineer at itestra GmbH.

Built with [Astro](https://astro.build) and [Tailwind CSS](https://tailwindcss.com), deployed on [Cloudflare Pages](https://pages.cloudflare.com).

## Stack

- **Framework**: Astro 5 (static output)
- **Styling**: Tailwind CSS + @tailwindcss/typography
- **Fonts**: Bricolage Grotesque, JetBrains Mono (Google Fonts)
- **Deployment**: Cloudflare Pages (direct integration)

## Development

```bash
npm run dev      # Start dev server at http://localhost:4321
npm run build    # Build for production
npm run preview  # Preview production build
```

> **Note:** `node_modules/.bin/` symlinks do not work when the project is mounted from a Windows (NTFS) filesystem into a Linux environment. The npm scripts are configured to call the Astro binary directly via `node` to work around this.

## Project Structure

```
src/
├── components/     # Nav, Footer
├── layouts/        # Layout.astro, PostLayout.astro
├── pages/
│   ├── blog/       # Markdown blog posts + index
│   ├── index.astro
│   ├── about.astro
│   ├── projects.astro
│   ├── contact.astro
│   └── imprint.astro
└── styles/
    └── global.css
public/
├── favicon.svg
└── _headers        # Cloudflare security headers
```

## Blog

Blog posts live in `src/pages/blog/` as Markdown files with the following frontmatter:

```md
---
layout: ../../layouts/PostLayout.astro
title: Post title
date: YYYY-MM-DD
description: Short description for meta tags and post listing.
---
```

Reading time is calculated automatically from word count.
