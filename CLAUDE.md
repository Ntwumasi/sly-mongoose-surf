# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Project Overview

Sly Mongoose Surf is a Next.js 14 website for a custom surfboard shaper. The site showcases handcrafted surfboards, alaias, paipos, and handplanes with a bold surf culture aesthetic.

## Commands

```bash
npm run dev     # Start development server (http://localhost:3000)
npm run build   # Build for production
npm run start   # Start production server
npm run lint    # Run ESLint
```

## Tech Stack

- **Framework**: Next.js 14 (App Router)
- **Styling**: Tailwind CSS v4 (using `@theme inline` in CSS)
- **Blog**: MDX files in `content/blog/` with gray-matter frontmatter
- **TypeScript**: Strict mode

## Project Structure

```
src/
├── app/                    # Next.js App Router pages
│   ├── layout.tsx          # Root layout with Header/Footer
│   ├── page.tsx            # Home page
│   ├── about/
│   ├── boards/             # Board types (traditional, alaias, paipos, handplanes)
│   ├── blog/               # Blog listing and [slug] dynamic routes
│   ├── contact/
│   ├── gallery/
│   └── links/
├── components/             # React components
│   ├── Header.tsx          # Navigation (client component)
│   ├── Footer.tsx
│   └── ContactForm.tsx     # Contact form (client component)
├── lib/
│   └── blog.ts             # MDX/blog utilities
content/
└── blog/                   # MDX blog posts
public/
└── images/                 # User-provided images (boards/, gallery/, hero/)
```

## Color Palette

Custom surf culture colors defined in `src/app/globals.css`:
- `ocean-deep`: #1a4d6e (primary dark)
- `ocean-light`: #4a90a4 (secondary)
- `sunset-orange`: #e87a41 (accent/CTA)
- `sunset-gold`: #f4a93b (hover states)
- `sand`: #f5f0e6 (background)
- `drift-wood`: #8b7355 (body text)
- `foam-white`: #fefefe (contrast)

Use with Tailwind: `bg-ocean-deep`, `text-sunset-orange`, etc.

## Blog Posts

Add new blog posts as `.mdx` files in `content/blog/`:

```mdx
---
title: "Post Title"
date: "2024-01-15"
excerpt: "Brief description"
author: "Author Name"
---

Your content here...
```

## Adding Images

1. Place images in `public/images/` subdirectories
2. Reference in components: `<Image src="/images/boards/board1.jpg" ... />`
3. Replace placeholder divs marked `[Your Image Here]` throughout the site
