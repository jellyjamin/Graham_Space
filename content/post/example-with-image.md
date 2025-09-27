---
title: Example Post with Featured Image
date: 2025-01-27
tags:
  - example
  - images
  - tutorial
  - featured
categories:
  - general
draft: true
summary: This is an example post showing how to add a featured image to your Hugo blog posts.
image: /img/posts/sample-featured.jpg
---

# Example Post with Featured Image

This post demonstrates how to add a featured image to your Hugo blog posts.

## How It Works

The featured image is specified in the front matter using the `image` field:

```yaml
---
title: "Your Post Title"
image: "/img/posts/your-image.jpg"
---
```

## Image Placement

- Place your images in the `/static/img/posts/` directory
- Reference them with `/img/posts/filename.jpg` in your front matter
- The image will automatically appear at the top of your post

## Best Practices

1. **Image Size**: Use images that are at least 1200px wide for best results
2. **File Format**: JPEG for photos, PNG for graphics
3. **File Size**: Keep images under 1MB for faster loading
4. **Alt Text**: The theme will use your post title as alt text

## Adding More Images

You can also add images within your post content using standard Markdown:

![Sample image](/img/posts/sample-featured.jpg "This is a sample image")

---

*This is just an example to show you how featured images work in Hugo with the Stack theme.*
