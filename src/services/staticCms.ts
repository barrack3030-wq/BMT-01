export interface StaticCmsPayload {
  settings?: Record<string, any>;
  pages?: { about?: Record<string, any> };
  products?: any[];
  articles?: any[];
  board?: any[];
  testimonials?: any[];
  branches?: any[];
  faq?: any[];
}

const BASE = '/BMT-01/content/';

async function readJson<T>(name: string): Promise<T> {
  const response = await fetch(`${BASE}${name}?v=${Date.now()}`, {
    cache: 'no-store',
    headers: { Accept: 'application/json' },
  });
  if (!response.ok) throw new Error(`CMS file unavailable: ${name} (${response.status})`);
  return response.json() as Promise<T>;
}

export async function loadStaticCms(): Promise<StaticCmsPayload | null> {
  try {
    const [settings, about, products, articles, board, testimonials, branches, faq] = await Promise.all([
      readJson<Record<string, any>>('site-settings.json'),
      readJson<Record<string, any>>('about.json'),
      readJson<any[]>('products.json'),
      readJson<any[]>('articles.json'),
      readJson<any[]>('board-members.json'),
      readJson<any[]>('testimonials.json'),
      readJson<any[]>('branches.json'),
      readJson<any[]>('faq.json'),
    ]);

    return {
      settings,
      pages: { about },
      products,
      articles,
      board,
      testimonials,
      branches,
      faq,
    };
  } catch (error) {
    console.warn('[BMT] Pages CMS content unavailable; using local fallback.', error);
    return null;
  }
}
