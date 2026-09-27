export const SITE_BASE_PATH = '/BMT-01';
export const SITE_URL = 'https://barrack3030-wq.github.io/BMT-01';

export function slugify(value: string): string {
  return value
    .normalize('NFD')
    .replace(/[\u0300-\u036f]/g, '')
    .toLowerCase()
    .trim()
    .replace(/[^a-z0-9]+/g, '-')
    .replace(/^-+|-+$/g, '');
}

export function articlePath(title: string): string {
  return `${SITE_BASE_PATH}/berita/${slugify(title)}/`;
}

export function absoluteUrl(path: string): string {
  return path.startsWith('http') ? path : `${SITE_URL}${path}`;
}
