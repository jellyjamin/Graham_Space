Modern Responsive Image Pipeline (AVIF/WebP) and Lazy Loading

Overview
- A new reusable partial generates responsive <picture> elements with AVIF, WebP, and fallback formats.
- It supports cover/hero images, gallery tiles, and inline Markdown images via render hooks.
- Laziness is smart: likely LCP images can be hinted with fetchpriority="high" and loading="eager"; others default to loading="lazy".

What changed
1) Reusable partial
   - File: layouts/partials/helper/responsive-image.html
   - Accepts a dict with:
     - Page: .Page (optional, used for front matter switches)
     - Resource: Hugo image resource (preferred when available)
     - Src: string URL for non-resource images (external or static)
     - Alt: alt text
     - Class: optional class attribute
     - Type: "cover" | "content" | "gallery" (affects defaults)
     - Sizes: override the sizes attribute (default depends on Type)
     - Widths: override responsive widths (default depends on Type)
     - Loading: "lazy" | "eager" (default lazy)
     - FetchPriority: "high" | "low" | "auto" (optional)
     - Transform: "resize" | "fit" | "fill" (default resize)
     - FillWidth/FillHeight: required when Transform == fill
   - Behavior:
     - For Hugo Resources, generates AVIF/WebP srcsets and a fallback srcset.
     - For external/SVG/non-resource, falls back to a simple <img> without processing.
     - Honors site params:
       - params.imageProcessing.cover.enabled (default: true)
       - params.imageProcessing.content.enabled (default: true)
     - Honors page-level switches (see below).

2) Article header (hero/cover)
   - File: layouts/partials/article/components/header.html (site override)
   - Uses responsive-image partial for the article image.
   - Defaults to loading="eager" and fetchpriority="high" for LCP, unless disabled via front matter.
   - Default sizes: (max-width: 800px) 100vw, 800px with widths [480, 800, 1200, 1600].

3) Featured gallery
   - File: layouts/partials/featured-gallery.html
   - Uses responsive-image partial; for resources, performs a Fill to 400x300 with AVIF/WebP + fallback.
   - External/SVG gracefully falls back to <img>.

4) Markdown render hook for inline images
   - File: layouts/_default/_markup/render-image.html
   - Replaces default Markdown <img> with the responsive <picture> pipeline when the image is a page resource.
   - Defaults: sizes (max-width: 800px) 100vw, 800px with widths [360, 720, 1200], loading="lazy".
   - External/SVG images are passed through as a plain <img> with lazy loading.

Front matter switches
- Disable processing for a page:
  image:
    process: false
  # or
  image:
    processing: false
  # or (legacy convenience)
  disableImageProcessing: true

- Custom preload/fetch priority for the cover image:
  image:
    preload: true   # default; sets loading="eager" and fetchpriority="high" on the cover image
  # set to false to opt-out (will use loading="lazy" and no fetchpriority)

Notes
- The pipeline only processes Hugo Resources (images in page bundles or assets referenced as resources). External URLs and static files outside resources are not transformed; they render as <img> with appropriate attributes.
- SVGs are never processed by Hugo Pipes; they are emitted as plain <img>.
- Resulting optimized assets (AVIF/WebP/resized fallbacks) are emitted under the resources/ directory during builds.

Build verification
- To generate and garbage-collect optimized derivatives, run:
  hugo --gc --minify
- Validate that resources/_gen/images contains AVIF/WebP and resized variants for your pages’ images.

Customization tips
- Override Sizes/Widths in calls to the partial when you need custom responsive behavior.
- For cropped thumbnails, call the partial with Transform = "fill" and provide FillWidth/FillHeight.
- For no-crop scaling with bounding box, use Transform = "fit".
