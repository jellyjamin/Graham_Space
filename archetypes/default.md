---
title: "{{ replace .Name "-" " " | title }}"
date: {{ .Date.Format "2006-01-02" }}
lastmod: {{ .Date.Format "2006-01-02" }}

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
image: "/img/posts/headers/{{ .Name }}/featured.jpg"
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

# {{ replace .Name "-" " " | title }}

Write your content here...

## Key Points

- Point 1
- Point 2
- Point 3

## Conclusion

Wrap up your thoughts here...

---

*Published on {{ .Date.Format "January 2, 2006" }} by Jake Graham*