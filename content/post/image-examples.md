---
title: How to Add Images to Your Hugo Posts
date: 2025-01-27
tags:
  - hugo
  - images
  - tutorial
categories:
  - technology
draft: true
summary: Learn different ways to add images to your Hugo blog posts with the Stack theme.
image: /img/posts/featured-image.jpg
---

# How to Add Images to Your Hugo Posts

This post demonstrates different ways to add images to your Hugo blog posts using the Stack theme.

## 1. Featured Image (Header Image)

The featured image is set in the front matter using the `image` field. This image will appear:
- At the top of the post
- In post listings and cards
- In social media previews

```yaml
---
title: "Your Post Title"
image: "/img/posts/your-featured-image.jpg"
---
```

## 2. Inline Images in Content

You can add images anywhere in your post content using standard Markdown:

```markdown
![Alt text](/img/posts/your-image.jpg "Optional title")
```

Or with HTML for more control:

```html
<img src="/img/posts/your-image.jpg" alt="Alt text" title="Optional title" width="500">
```

## 3. Responsive Images

For responsive images that work well on all devices:

```html
<img src="/img/posts/your-image.jpg" 
     alt="Alt text" 
     style="max-width: 100%; height: auto;">
```

## 4. Image with Caption

You can create images with captions using HTML:

```html
<figure>
    <img src="/img/posts/your-image.jpg" alt="Alt text">
    <figcaption>Your caption text here</figcaption>
</figure>
```

## 5. Image Gallery

For multiple images, you can create a simple gallery:

```html
<div style="display: grid; grid-template-columns: repeat(auto-fit, minmax(200px, 1fr)); gap: 10px;">
    <img src="/img/posts/image1.jpg" alt="Image 1">
    <img src="/img/posts/image2.jpg" alt="Image 2">
    <img src="/img/posts/image3.jpg" alt="Image 3">
</div>
```

## Best Practices

1. **Optimize Images**: Compress images before uploading to reduce file size
2. **Use Descriptive Alt Text**: Always include alt text for accessibility
3. **Consistent Sizing**: Use consistent dimensions for featured images
4. **Organize Files**: Keep images organized in folders like `/static/img/posts/`
5. **Web Formats**: Use JPEG for photos, PNG for graphics with transparency, WebP for modern browsers

## Image Processing

Hugo with the Stack theme automatically processes images for:
- Responsive sizing
- Lazy loading
- WebP conversion (if enabled)

## Example: Adding a Featured Image

To add a featured image to any post:

1. Place your image in `/static/img/posts/`
2. Add the image field to your front matter:

```yaml
---
title: "Your Post Title"
date: 2025-01-27
image: "/img/posts/your-image.jpg"
---
```

That's it! The image will automatically appear as the header image for your post.

---

*Need help with images? Check the [Hugo documentation](https://gohugo.io/content-management/image-processing/) for more advanced image processing options.*
