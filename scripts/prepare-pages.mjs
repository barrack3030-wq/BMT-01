import { copyFileSync, existsSync, mkdirSync, readFileSync, writeFileSync } from 'node:fs';

const SITE_URL = 'https://barrack3030-wq.github.io/BMT-01';
const dist = new URL('../dist/', import.meta.url);

if (!existsSync(dist)) {
  throw new Error('dist directory not found');
}

// Sama dengan slugify() di src/utils/seo.ts
const slugify = (value) =>
  value
    .normalize('NFD')
    .replace(/[̀-ͯ]/g, '')
    .toLowerCase()
    .trim()
    .replace(/[^a-z0-9]+/g, '-')
    .replace(/^-+|-+$/g, '');

const articles = JSON.parse(
  readFileSync(new URL('../public/content/articles.json', import.meta.url), 'utf8'),
).filter((article) => article.published !== false);

const routes = [
  '/produk/',
  '/berita/',
  '/profil/',
  '/lokasi/',
  '/faq/',
  ...articles.map((article) => `/berita/${slugify(article.title)}/`),
];

const sourceIndex = new URL('index.html', dist);
copyFileSync(sourceIndex, new URL('404.html', dist));

for (const route of routes) {
  const targetDir = new URL(`.${route}`, dist);
  mkdirSync(targetDir, { recursive: true });
  copyFileSync(sourceIndex, new URL('index.html', targetDir));
}

const urls = ['/', ...routes].map((route) => `  <url><loc>${SITE_URL}${route}</loc></url>`);
writeFileSync(
  new URL('sitemap.xml', dist),
  `<?xml version="1.0" encoding="UTF-8"?>\n<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">\n${urls.join('\n')}\n</urlset>\n`,
);
