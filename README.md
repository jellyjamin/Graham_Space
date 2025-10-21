Hugo site with automated Open Graph (OG) image generation

Overview
- Generates social share images for posts using Node.js (Satori + resvg)
- Outputs images to static/og/<slug>.png
- Hugo templates automatically prefer generated images for og:image and twitter:image with absolute URLs
- Graceful fallback to page image or a site default when no generated OG image exists

Requirements
- Node.js 18+ (Node 20 recommended)
- Hugo (as configured in this repo)

Usage
1) Install dependencies
   npm ci

2) Generate OG images
   npm run build:og
This scans content/post/**/*.md and writes PNGs to static/og/.

3) Build the site
   hugo --cleanDestinationDir

Typical local build
   npm run build:og && hugo --cleanDestinationDir

Cloudflare Pages (CI) example
- Framework preset: Hugo
- Build command:
   npm ci && npm run build:og && hugo --cleanDestinationDir
- Build output directory: public
- Recommended environment variables:
  - NODE_VERSION = 20
  - HUGO_ENV = production

How it works
- Script: tools/og/generate.mjs (wraps scripts/generate-og.mjs)
- Reads front matter: title, date, author, tags (first tag used)
- Uses assets/og/template.html with Satori to render SVG
- Rasterizes SVG to PNG using @resvg/resvg-js
- Caches: skips regeneration if the output PNG is newer than its dependencies (post file, template.html, hugo.toml)

Template customization
- Edit assets/og/template.html
- Placeholders supported:
  - {{site}}   site title from hugo.toml
  - {{title}}  post title
  - {{author}} post author (falls back to site author)
  - {{date}}   formatted publish date
  - Optional block: {{#if tag}}...{{/if}} (first tag)

Hugo integration
- layouts/partials/head/seo.html checks for static/og/<slug>.png
  - If present, sets og:image and twitter:image to /og/<slug>.png (absolute URL)
  - Otherwise falls back to .Params.image, then to .Site.Params.seo.image, then to /img/avatar.png

Notes
- To force regeneration for all posts, delete files under static/og/ and run npm run build:og.
- Vendored fonts: place Inter-Regular.ttf and Inter-Bold.ttf under static/fonts/og/ to ensure consistent rendering without network access.

For more details see OG_IMAGE_PIPELINE.md.
