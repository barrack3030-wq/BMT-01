export interface DirectusCmsPayload {
  settings?: Record<string, any>;
  pages?: { about?: Record<string, any> };
  products?: any[];
  articles?: any[];
  board?: any[];
  testimonials?: any[];
  branches?: any[];
  faq?: any[];
  meta?: Record<string, any>;
}

declare global {
  interface Window {
    BMT_DIRECTUS_URL?: string;
  }
}

function fileUrl(value: any, base: string): string {
  if (!value) return '';
  if (typeof value === 'string' && /^https?:\/\//i.test(value)) return value;
  const id = typeof value === 'string' ? value : value?.id;
  return id ? `${base}/assets/${encodeURIComponent(id)}` : '';
}

function asArray(value: any, splitPattern = /\n+/): any[] {
  if (Array.isArray(value)) return value;
  if (value == null || value === '') return [];
  if (typeof value === 'string') {
    try {
      const parsed = JSON.parse(value);
      if (Array.isArray(parsed)) return parsed;
    } catch {}
    return value.split(splitPattern).map((x) => x.trim()).filter(Boolean);
  }
  return [];
}

function normalizeRecord(record: any, base: string) {
  if (!record || typeof record !== 'object') return record;
  const out = { ...record };
  for (const key of ['image', 'photo', 'avatarImage', 'logoUrl', 'backgroundImage', 'promoImage']) {
    if (key in out && out[key]) out[key] = fileUrl(out[key], base);
  }
  for (const key of ['hero_1', 'hero_2', 'hero_3', 'hero_4']) {
    if (key in out && out[key]) out[key] = fileUrl(out[key], base);
  }
  return out;
}

function splitParagraphs(value: any): string[] {
  if (Array.isArray(value)) return value.map(String).map((x) => x.trim()).filter(Boolean);
  if (!value) return [];
  if (typeof value === 'string') {
    try {
      const parsed = JSON.parse(value);
      if (Array.isArray(parsed)) return parsed.map(String).map((x) => x.trim()).filter(Boolean);
    } catch {}
    return value.split(/\n\s*\n/g).map((x) => x.trim()).filter(Boolean);
  }
  return [];
}

async function getJson(url: string) {
  const response = await fetch(url, { headers: { Accept: 'application/json' } });
  if (!response.ok) throw new Error(`Directus request failed: ${response.status}`);
  return response.json();
}

async function readItems(base: string, collection: string, fields = '*') {
  const url = `${base}/items/${encodeURIComponent(collection)}?limit=-1&fields=${encodeURIComponent(fields)}`;
  const json = await getJson(url);
  return Array.isArray(json?.data) ? json.data : [];
}

async function readSingleton(base: string, collection: string, fields = '*') {
  const url = `${base}/items/${encodeURIComponent(collection)}?fields=${encodeURIComponent(fields)}`;
  const json = await getJson(url);
  return json?.data && !Array.isArray(json.data) ? json.data : (Array.isArray(json?.data) ? json.data[0] : null);
}

export async function loadDirectusCms(): Promise<DirectusCmsPayload | null> {
  const endpoint = (window.BMT_DIRECTUS_URL || '').trim().replace(/\/$/, '');
  if (!endpoint) return null;

  try {
    const [settings, about, products, articles, board, testimonials, branches, faq] = await Promise.all([
      readSingleton(endpoint, 'site_settings', '*.*'),
      readSingleton(endpoint, 'about_page', '*.*'),
      readItems(endpoint, 'products', '*.*'),
      readItems(endpoint, 'articles', '*.*'),
      readItems(endpoint, 'board_members', '*.*'),
      readItems(endpoint, 'testimonials', '*.*'),
      readItems(endpoint, 'branches', '*.*'),
      readItems(endpoint, 'faq', '*.*'),
    ]);

    const normalizedSettings = settings ? normalizeRecord({
      ...settings,
      heroImages: [
        settings.hero_1,
        settings.hero_2,
        settings.hero_3,
        settings.hero_4,
      ].filter(Boolean).map((x: any) => fileUrl(x, endpoint)),
      logoUrl: fileUrl(settings.logo ?? settings.logoUrl, endpoint),
      backgroundImage: fileUrl(settings.background_image ?? settings.backgroundImage, endpoint),
      promoImage: fileUrl(settings.promo_image ?? settings.promoImage, endpoint),
    }, endpoint) : undefined;

    const normalizedAbout = about ? {
      ...about,
      paragraphs: splitParagraphs(about.paragraphs),
      mission: splitParagraphs(about.mission),
    } : undefined;

    return {
      settings: normalizedSettings,
      pages: { about: normalizedAbout },
      products: products.map((x) => ({
        ...normalizeRecord(x, endpoint),
        features: asArray(x.features),
      })),
      articles: articles.map((x) => ({
        ...normalizeRecord(x, endpoint),
        date: x.date || x.published_at || '',
        meta: x.meta || x.date || x.published_at || '',
        tags: asArray(x.tags),
        contentParagraphs: splitParagraphs(x.contentParagraphs ?? x.content ?? x.body),
      })),
      board: board.map((x) => normalizeRecord(x, endpoint)),
      testimonials: testimonials.map((x) => normalizeRecord(x, endpoint)),
      branches: branches.map((x) => normalizeRecord(x, endpoint)),
      faq: faq.map((x) => normalizeRecord(x, endpoint)),
      meta: {
        provider: 'directus',
        baseUrl: endpoint,
        updatedAt: new Date().toISOString(),
      },
    };
  } catch (error) {
    console.warn('[BMT] Directus CMS unavailable; keeping local content.', error);
    return null;
  }
}
