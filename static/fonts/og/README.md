Place vendored Open Graph fonts here to avoid network fetches during CI.

Expected files:
- Inter-Regular.ttf (weight 400)
- Inter-Bold.ttf (weight 700)

These are used by scripts/generate-og.mjs when generating OG images via Satori/Resvg.
If absent, the generator falls back to system fonts.
