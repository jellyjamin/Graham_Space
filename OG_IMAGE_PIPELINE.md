Automated Open Graph (OG) Image Generation Pipeline

Overview
- A simple, fast pipeline generates social share images (Open Graph / Twitter Card) for each post.
- Images are created from a lightweight HTML template using Satori and rendered to PNG via resvg.
- Generated files are saved to static/og/<slug>.png and automatically referenced by the head/seo partial when present.

What’s included
- Template: assets/og/template.html (easy to edit HTML/CSS)
- Generator: scripts/generate-og.mjs (Node.js, ESM)
- Build integration: package.json provides prebuild hook and og:generate script
- Caching: regeneration is skipped if the PNG is newer than its dependencies (post file, template.html, or hugo.toml)

Prerequisites
- Node.js 18+ (Node 20 recommended)
- Hugo is unchanged; this pipeline runs before or independently of Hugo builds.

Install dependencies
- npm install

Generate OG images
- npm run og:generate
This scans content/post/**/*.md and outputs images in static/og/.

Build integration
- The generator runs automatically before any npm run build via the prebuild script. If your CI or local workflow builds the site directly with hugo rather than npm, run npm run og:generate prior to hugo.

Cloudflare Pages
- Framework preset: Hugo
- Build command:
  npm ci && npm run og:generate && hugo --cleanDestinationDir
- Build output directory: public
- Recommended environment variables:
  - NODE_VERSION = 20
  - HUGO_ENV = production
  - HUGO_VERSION = e.g., 0.134.2

How it works
1. Parse post front matter to get title, date, author, tags, and slug (falls back to filename-based slug).
2. Read site title from hugo.toml for branding.
3. Load assets/og/template.html, replace placeholders, convert to a Satori VDOM, and render SVG.
4. Rasterize SVG to PNG using @resvg/resvg-js.
5. Cache: If static/og/<slug>.png is newer than the post file, template.html, and hugo.toml, generation is skipped.

Customizing the template
- Edit assets/og/template.html. Placeholders supported:
  - {{site}}  → site title from hugo.toml
  - {{title}} → post title
  - {{author}} → post author (falls back to site author)
  - {{date}} → formatted publish date
  - {{#if tag}} ... {{/if}} → optional block showing the first tag
- Use inline CSS to style the layout. The default canvas is 1200x630.
- After editing, re-run npm run og:generate.

Fonts
- The generator downloads Inter Regular and ExtraBold (TTF) into assets/og/fonts/ on first run and embeds them in the SVG so rendering is consistent.
- If font download fails (e.g., no network), the generator will proceed without custom fonts; visual results may differ.

SEO integration
- layouts/partials/head/seo.html now prefers a generated image when present:
  - static/og/<slug>.png → /og/<slug>.png
  - Falls back to page image (.Params.image) or the site default.

Tips
- To force regeneration for all posts, delete the files in static/og/ and run npm run og:generate.
- If you change global branding (title in hugo.toml) or the template, the cache automatically invalidates and images get regenerated.

Troubleshooting
- Images not appearing in shares: use social debuggers to refresh caches
  - Facebook: https://developers.facebook.com/tools/debug/
  - X/Twitter: https://cards-dev.twitter.com/validator
- Ensure that /og/<slug>.png resolves in your deployed site.

License
- Fonts: Inter by Rasmus Andersson (OFL). See the Inter project for details.
