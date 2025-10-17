# Hugo Post Template Guide

## Quick Copy-Paste Template

```yaml
---
title: "Your Post Title Here"
date: 2025-01-27
lastmod: 2025-01-27

# SEO and Content
description: "Brief description of the post content for SEO and social sharing"
summary: "Short summary that appears in post listings and RSS feeds"
keywords: 
  - "primary keyword"
  - "secondary keyword"
  - "related topic"

# Content Organization
tags:
  - "main-tag"
  - "secondary-tag"
categories:
  - "general"

# Publishing
draft: true
featured: false

# Media
image: "/img/posts/headers/your-post-name/featured.jpg"
image_alt: "Descriptive alt text for the featured image"

# Social Sharing (optional overrides)
og_title: ""
og_description: ""
twitter_title: ""
twitter_description: ""

# Advanced SEO (optional)
canonical_url: ""
noindex: false
nofollow: false

# Reading Experience
toc: true
reading_time: true
math: false

# Custom fields
author: "Jake Graham"
series: ""
weight: 0
---
```

## Field Explanations

### **Required Fields**
- `title`: Post title (will be auto-formatted if using archetype)
- `date`: Publication date (YYYY-MM-DD format)
- `draft`: Set to `false` when ready to publish

### **SEO Fields**
- `description`: 150-160 characters for search engines
- `summary`: 1-2 sentences for post listings
- `keywords`: 3-5 relevant keywords
- `image`: Featured image path
- `image_alt`: Alt text for accessibility and SEO

### **Organization Fields**
- `tags`: 2-5 descriptive tags
- `categories`: 1-2 broad categories
- `featured`: Set to `true` to appear in featured gallery

### **Optional Fields**
- `lastmod`: Last modification date
- `canonical_url`: If republishing from another site
- `noindex`/`nofollow`: For private or duplicate content
- `series`: For multi-part posts
- `weight`: For custom ordering

## Best Practices

### **Title Guidelines**
- Keep under 60 characters
- Include primary keyword
- Make it compelling and clickable
- Use title case

### **Description Guidelines**
- 150-160 characters
- Include primary keyword naturally
- Write for humans, not just search engines
- Make it compelling for social sharing

### **Image Guidelines**
- Use descriptive filenames
- Include alt text for accessibility
- Recommended size: 1200x630px
- Save in `/static/img/posts/headers/your-post-name/`

### **Tag Strategy**
- Use 2-5 tags per post
- Mix broad and specific tags
- Be consistent with tag naming
- Check existing tags before creating new ones

### **Category Strategy**
- Use 1-2 categories maximum
- Keep categories broad and consistent
- Current categories: `general`, `technology`

## Quick Commands

### **Create New Post**
```bash
hugo new post/your-post-name.md
```

### **Create Featured Post**
```bash
hugo new post/your-post-name.md
# Then set featured: true in front matter
```

### **Publish Post**
```bash
# Change draft: false in front matter
# Then build and deploy
hugo
```

## Image Organization

```
/static/img/posts/
├── headers/
│   └── your-post-name/
│       ├── featured.jpg
│       └── additional-images.jpg
└── inlines/
    └── your-post-name/
        └── inline-images.jpg
```

This template will help you create well-optimized posts that rank well in search engines and look great when shared on social media!

## Feeds & Syndication

The site publishes full-content feeds with hero imagery and optional audio enclosures, making it easy to share updates across platforms.

- **Site-wide RSS:** `https://graham-space.pages.dev/index.xml`
- **Site-wide JSON feed:** `https://graham-space.pages.dev/index.json`
- **Per-section and topic feeds:** append `index.xml` to any section, tag, or category URL (for example, `/post/index.xml`, `/tags/self-hosting/index.xml`, `/categories/ai/index.xml`).
- Quick access icons are available in the sidebar widgets and the footer "Subscribe" area.

### Podcast & Audio Attachments

To surface an audio enclosure in the feeds, add one of the following front matter blocks to your post:

```yaml
enclosure:
  url: "https://cdn.example.com/audio/my-episode.mp3"
  type: "audio/mpeg"
  length: 12345678      # optional but recommended (bytes)
  title: "My Episode Title"
audioDuration: "32:17"   # optional (HH:MM:SS)
```

You can alternately use `podcast` or `audio` maps with the same keys—the feed template will detect any of them. Always set a high-quality `image` and `image_alt`; those values are embedded into the RSS and JSON feeds as the episode or article artwork.
