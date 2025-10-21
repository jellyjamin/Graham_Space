#!/usr/bin/env node
/*
  Automated Open Graph image generator for Hugo posts
  - Reads content under content/post/**.md
  - Generates 1200x630 PNGs in static/og/<slug>.png
  - Skips regeneration if the PNG is newer than its dependencies (content file, template, hugo.toml)
*/
import fsp from 'node:fs/promises';
import path from 'node:path';
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

// Prefer vendored fonts committed into the repo
const STATIC_FONTS_DIR = path.join(projectRoot, 'static', 'fonts', 'og');
const ASSETS_FONTS_DIR = path.join(projectRoot, 'assets', 'og', 'fonts');

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

function isLikelyOpenTypeFont(buf) {
  if (!buf || buf.byteLength < 1024) return false;
  const a = new Uint8Array(buf.slice(0, 4));
  // TrueType: 0x00010000
  const isTTF = a[0] === 0x00 && a[1] === 0x01 && a[2] === 0x00 && a[3] === 0x00;
  // OpenType CFF: 'OTTO'
  const isOTF = a[0] === 0x4f && a[1] === 0x54 && a[2] === 0x54 && a[3] === 0x4f;
  // TrueType Collection: 'ttcf'
  const isTTC = a[0] === 0x74 && a[1] === 0x74 && a[2] === 0x63 && a[3] === 0x66;
  return isTTF || isOTF || isTTC;
}

// Try to load vendored fonts from disk to avoid any network access
async function ensureFonts() {
  const fonts = [];
  const candidates = [
    { dir: STATIC_FONTS_DIR, files: [
      { name: 'Inter', file: 'Inter-Regular.ttf', weight: 400 },
      { name: 'Inter', file: 'Inter-Bold.ttf', weight: 700 },
    ]},
    // Allow vendoring alternative fonts in static as well
    { dir: STATIC_FONTS_DIR, files: [
      { name: 'DejaVu Sans', file: 'DejaVuSans.ttf', weight: 400 },
      { name: 'DejaVu Sans', file: 'DejaVuSans-Bold.ttf', weight: 700 },
    ]},
    { dir: ASSETS_FONTS_DIR, files: [
      { name: 'Inter', file: 'Inter-Regular.ttf', weight: 400 },
      // some repos may have ExtraBold instead of Bold
      { name: 'Inter', file: 'Inter-ExtraBold.ttf', weight: 800 },
    ]},
    // As a final fallback, use common system fonts on Linux containers
    { dir: '/usr/share/fonts/truetype/dejavu', files: [
      { name: 'DejaVu Sans', file: 'DejaVuSans.ttf', weight: 400 },
      { name: 'DejaVu Sans', file: 'DejaVuSans-Bold.ttf', weight: 700 },
    ]},
  ];

  for (const src of candidates) {
    let added = 0;
    for (const f of src.files) {
      const p = path.join(src.dir, f.file);
      try {
        const data = await fsp.readFile(p);
        if (!isLikelyOpenTypeFont(data)) {
          if (!src.dir.includes('dejavu')) {
            console.warn(`Ignoring invalid font file: ${path.relative(projectRoot, p)}`);
          }
          continue;
        }
        fonts.push({ name: f.name, data, weight: f.weight, style: 'normal' });
        added++;
      } catch {
        // ignore missing file
      }
    }
    if (added > 0) {
      if (src.dir.includes('dejavu')) {
        console.warn('Using system DejaVu Sans fonts as fallback.');
      }
      break; // use the first source where we found at least one valid font
    }
  }

  if (!fonts.length) {
    // If absolutely nothing is available, we can't render text
    console.warn('No valid fonts found (vendored or system).');
  }
  return fonts;
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

function sanitizeCssInHtml(html) {
  // Replace unsupported CSS values and Tailwind-like class tokens
  let out = html;
  out = out.replace(/display\s*:\s*inline-flex/gi, 'display: flex');
  out = out.replace(/\binline-flex\b/gi, 'flex');
  // Future: normalize other unsupported values if needed
  return out;
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
  return sanitizeCssInHtml(html);
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
      const msg = String(err && err.message || err);
      const hint = /Invalid value for CSS property\s+\"display\"/i.test(msg)
        ? ' Hint: sanitize CSS (e.g., replace inline-flex with flex) or adjust the OG template.'
        : '';
      if (/Unsupported OpenType signature|No fonts are loaded/i.test(msg)) {
        console.warn(`Font issue encountered. Retrying ${path.relative(projectRoot, file)} with system fallback fonts...`);
        try {
          const sysFonts = await (async () => {
            try {
              const reg = await fsp.readFile('/usr/share/fonts/truetype/dejavu/DejaVuSans.ttf');
              const bold = await fsp.readFile('/usr/share/fonts/truetype/dejavu/DejaVuSans-Bold.ttf');
              return [
                { name: 'DejaVu Sans', data: reg, weight: 400, style: 'normal' },
                { name: 'DejaVu Sans', data: bold, weight: 700, style: 'normal' },
              ];
            } catch {
              return [];
            }
          })();
          const svg = await renderSVG(html, sysFonts);
          const png = await svgToPng(svg);
          await fsp.writeFile(outPath, png);
          generated++;
          console.log(`Generated OG image (system fonts): ${path.relative(projectRoot, outPath)} (from ${rel})`);
          continue;
        } catch (e2) {
          console.error(`Failed to generate OG for ${rel}: ${e2 && e2.message || e2}`);
          continue;
        }
      }
      console.error(`Failed to generate OG for ${rel}: ${msg}${hint}`);
      // continue with next file
    }
  }

  console.log(`OG generation complete. New/updated images: ${generated}.`);
}

main().catch((e) => {
  console.error(e);
  process.exit(1);
});
