---
title: Getting Started with Hugo - A Static Site Generator
date: 2025-01-27
tags:
  - hugo
  - static-site-generator
  - web-development
  - tutorial
categories:
  - technology
draft: true
summary: Learn how to set up and use Hugo, the fast and flexible static site generator written in Go.
---

# Getting Started with Hugo

Hugo is one of the most popular static site generators available today. It's fast, flexible, and perfect for blogs, documentation sites, and portfolios. In this post, I'll walk you through the basics of getting started with Hugo.

## What is Hugo?

Hugo is a static site generator written in Go. It takes your content (usually Markdown files) and templates, then generates a complete static website. The key benefits include:

- **Speed**: Hugo is incredibly fast at building sites
- **Simplicity**: Easy to learn and use
- **Flexibility**: Highly customizable with themes and layouts
- **No Database**: Everything is file-based

## Installation

### Using Package Managers

**macOS (Homebrew):**
```bash
brew install hugo
```

**Windows (Chocolatey):**
```bash
choco install hugo
```

**Linux (Snap):**
```bash
sudo snap install hugo
```

### Manual Installation

Download the latest release from the [Hugo releases page](https://github.com/gohugoio/hugo/releases) and extract it to your PATH.

## Creating Your First Site

1. **Create a new site:**
```bash
hugo new site my-blog
cd my-blog
```

2. **Add a theme:**
```bash
git init
git submodule add https://github.com/theNewDynamic/gohugo-theme-ananke.git themes/ananke
```

3. **Configure your site:**
Edit `config.toml`:
```toml
baseURL = 'https://example.org/'
languageCode = 'en-us'
title = 'My New Hugo Site'
theme = 'ananke'
```

4. **Add content:**
```bash
hugo new posts/my-first-post.md
```

5. **Start the development server:**
```bash
hugo server -D
```

## Basic File Structure

```
my-blog/
├── archetypes/          # Content templates
├── content/            # Your content (Markdown files)
├── data/               # Data files (YAML, JSON, TOML)
├── layouts/            # Custom layouts (optional)
├── static/             # Static assets (images, CSS, JS)
├── themes/             # Installed themes
├── config.toml         # Site configuration
└── public/             # Generated site (after build)
```

## Content Organization

Hugo uses a simple file-based content organization:

- **Pages**: Regular content pages
- **Posts**: Blog posts (usually in `content/posts/`)
- **Sections**: Collections of content

## Front Matter

Every content file starts with front matter (metadata):

```yaml
---
title: "My Post Title"
date: 2025-01-27
tags: ["hugo", "tutorial"]
draft: false
---
```

## Building and Deployment

**Build for production:**
```bash
hugo
```

This creates a `public/` directory with your static site ready for deployment.

**Deploy to GitHub Pages:**
```bash
hugo --minify
cd public
git add .
git commit -m "Deploy site"
git push origin gh-pages
```

## Next Steps

- Explore the [Hugo documentation](https://gohugo.io/documentation/)
- Browse available themes on [Hugo Themes](https://themes.gohugo.io/)
- Learn about Hugo's templating system
- Set up automated deployment with GitHub Actions

Hugo is a powerful tool that can grow with your needs. Start simple and gradually add more features as you become comfortable with the basics.

---

*Have questions about Hugo? Feel free to reach out!*
