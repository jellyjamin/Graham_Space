#!/usr/bin/env node
/*
  Automated Open Graph image generator for Hugo posts
  - Reads content under content/post/**.md
  - Generates 1200x630 PNGs in static/og/<slug>.png
  - Skips regeneration if the PNG is newer than its dependencies (content file, template, hugo.toml)
*/
import fs from 'node:fs';
import fsp from 'node:fs/promises';
import path from 'node:path';
import crypto from 'node:crypto';
import { fileURLToPath } from 'node:url';
import matter from 'gray-matter';
import satori from 'satori';
import { html as toVNode } from 'satori-html';
import { Resvg } from '@resvg/resvg-js';
import * as TOML from 'toml';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const projectRoot = path.resolve(__dirname, '..');
const CONTENT_DIR = path.join(projectRoot, 'content', 'post');
const STATIC_OG_DIR = path.join(projectRoot, 'static', 'og');
const TEMPLATE_HTML = path.join(projectRoot, 'assets', 'og', 'template.html');
const HUGO_TOML = path.join(projectRoot, 'hugo.toml');
const FONTS_DIR = path.join(projectRoot, 'assets', 'og', 'fonts');

async function ensureDir(dir) {
  await fsp.mkdir(dir, { recursive: true });
}

/** Basic slugify replacement (ASCII only) */
function slugify(input) {
  return input
    .toLowerCase()
    .normalize('NFKD')
    .replace(/[\u0300-\u036f]/g, '')
    .replace(/[^a-z0-9]+/g, '-')
    .replace(/^-+|-+$/g, '')
    .replace(/-{2,}/g, '-');
}

function escapeHTML(str) {
  return String(str)
    .replace(/&/g, '&amp;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;')
    .replace(/"/g, '&quot;')
    .replace(/'/g, '&#039;');
}

async function readJSONIfExists(file) {
  try {
    const buf = await fsp.readFile(file, 'utf8');
    return JSON.parse(buf);
  } catch (e) {
    return null;
  }
}

async function statIfExists(file) {
  try {
    return await fsp.stat(file);
  } catch (e) {
    return null;
  }
}

async function walkMarkdown(dir) {
  const entries = await fsp.readdir(dir, { withFileTypes: true });
  const files = [];
  for (const ent of entries) {
    const full = path.join(dir, ent.name);
    if (ent.isDirectory()) {
      files.push(...await walkMarkdown(full));
    } else if (ent.isFile() && /\.(md|markdown)$/i.test(ent.name)) {
      files.push(full);
    }
  }
  return files;
}

async function loadSiteMeta() {
  let siteTitle = 'Site';
  let siteAuthor = '';
  try {
    const toml = await fsp.readFile(HUGO_TOML, 'utf8');
    const data = TOML.parse(toml);
    if (data && data.title) siteTitle = data.title;
    if (data?.params?.seo?.author) siteAuthor = String(data.params.seo.author);
  } catch {}
  return { siteTitle, siteAuthor };
}

async function ensureFonts() {
  await ensureDir(FONTS_DIR);
  const regularPath = path.join(FONTS_DIR, 'Inter-Regular.ttf');
  const boldPath = path.join(FONTS_DIR, 'Inter-ExtraBold.ttf');

  const needRegular = !(await statIfExists(regularPath));
  const needBold = !(await statIfExists(boldPath));

  const headers = { 'User-Agent': 'Mozilla/5.0 (OG Generator)' };
  const downloads = [];

  if (needRegular) {
    const url = 'https://raw.githubusercontent.com/google/fonts/main/ofl/inter/static/Inter-Regular.ttf';
    downloads.push(fetch(url, { headers }).then(async (res) => {
      if (!res.ok) throw new Error('Failed to download Inter-Regular.ttf');
      const buf = new Uint8Array(await res.arrayBuffer());
      await fsp.writeFile(regularPath, buf);
    }));
  }
  if (needBold) {
    const url = 'https://raw.githubusercontent.com/google/fonts/main/ofl/inter/static/Inter-ExtraBold.ttf';
    downloads.push(fetch(url, { headers }).then(async (res) => {
      if (!res.ok) throw new Error('Failed to download Inter-ExtraBold.ttf');
      const buf = new Uint8Array(await res.arrayBuffer());
      await fsp.writeFile(boldPath, buf);
    }));
  }

  if (downloads.length) {
    await Promise.all(downloads);
  }

  const [regular, bold] = await Promise.all([
    fsp.readFile(regularPath),
    fsp.readFile(boldPath)
  ]);

  return [
    { name: 'Inter', data: regular, weight: 400, style: 'normal' },
    { name: 'Inter', data: bold, weight: 800, style: 'normal' },
  ];
}

function formatDateISOToNice(dateStr) {
  if (!dateStr) return '';
  try {
    const d = new Date(dateStr);
    const fmt = new Intl.DateTimeFormat('en-US', { month: 'short', day: '2-digit', year: 'numeric' });
    return fmt.format(d);
  } catch {
    return String(dateStr);
  }
}

function chooseTag(tags) {
  if (Array.isArray(tags) && tags.length) return String(tags[0]);
  return '';
}

async function renderSVG(htmlStr, fonts) {
  const vnode = toVNode(htmlStr);
  return await satori(vnode, {
    width: 1200,
    height: 630,
    fonts,
  });
}

async function svgToPng(svg) {
  const resvg = new Resvg(svg, {
    fitTo: { mode: 'width', value: 1200 },
    background: 'rgba(0,0,0,0)'
  });
  const pngData = resvg.render();
  const pngBuffer = pngData.asPng();
  return pngBuffer;
}

async function buildHTML(template, data) {
  let html = template;
  // very small, safe replacement with HTML-escaped values
  const reps = {
    '{{site}}': escapeHTML(data.site),
    '{{title}}': escapeHTML(data.title),
    '{{author}}': escapeHTML(data.author || ''),
    '{{date}}': escapeHTML(data.date || ''),
  };
  for (const [needle, val] of Object.entries(reps)) {
    html = html.split(needle).join(val);
  }
  // handle optional tag block
  if (data.tag) {
    html = html.replace('{{#if tag}}', '').replace('{{/if}}', '');
    html = html.replace('{{tag}}', escapeHTML(data.tag));
  } else {
    // remove the whole optional block
    html = html.replace(/\{\{#if tag\}\}[\s\S]*?\{\{\/if\}\}/g, '');
  }
  return html;
}

async function needsRegeneration(pngPath, dependencies) {
  const pngStat = await statIfExists(pngPath);
  if (!pngStat) return true;
  for (const dep of dependencies) {
    const st = await statIfExists(dep);
    if (st && st.mtimeMs > pngStat.mtimeMs) return true;
  }
  return false;
}

async function main() {
  const { siteTitle, siteAuthor } = await loadSiteMeta();
  await ensureDir(STATIC_OG_DIR);

  const fonts = await ensureFonts().catch((e) => {
    console.warn('Font setup failed, proceeding without custom fonts (results may vary):', e.message);
    return [];
  });
  const template = await fsp.readFile(TEMPLATE_HTML, 'utf8');

  const files = (await statIfExists(CONTENT_DIR)) ? await walkMarkdown(CONTENT_DIR) : [];
  let generated = 0;
  for (const file of files) {
    const rel = path.relative(projectRoot, file);
    const fileBuf = await fsp.readFile(file, 'utf8');
    const fm = matter(fileBuf);

    // derive slug
    let slug = (fm.data && (fm.data.slug || fm.data.Slug)) ? String(fm.data.slug || fm.data.Slug) : null;
    if (!slug) {
      const base = path.basename(file, path.extname(file));
      slug = slugify(base);
    }

    const outPath = path.join(STATIC_OG_DIR, `${slug}.png`);

    const deps = [file, TEMPLATE_HTML, HUGO_TOML];
    const shouldBuild = await needsRegeneration(outPath, deps);
    if (!shouldBuild) {
      continue;
    }

    const title = String(fm.data?.title || fm.data?.Title || '');
    const author = String(fm.data?.author || fm.data?.Author || siteAuthor || '');
    const dateNice = formatDateISOToNice(fm.data?.date || fm.data?.Date);
    const tag = chooseTag(fm.data?.tags || fm.data?.Tags);

    const html = await buildHTML(template, {
      site: siteTitle,
      title,
      author,
      date: dateNice,
      tag,
    });

    try {
      const svg = await renderSVG(html, fonts);
      const png = await svgToPng(svg);
      await fsp.writeFile(outPath, png);
      generated++;
      console.log(`Generated OG image: ${path.relative(projectRoot, outPath)} (from ${rel})`);
    } catch (err) {
      console.error(`Failed to generate OG for ${rel}:`, err.message);
    }
  }

  console.log(`OG generation complete. New/updated images: ${generated}.`);
}

main().catch((e) => {
  console.error(e);
  process.exit(1);
});
