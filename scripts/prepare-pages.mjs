import { copyFileSync, mkdirSync, existsSync } from 'node:fs';

const dist = new URL('../dist/', import.meta.url);

if (!existsSync(dist)) {
  throw new Error('dist directory not found');
}

copyFileSync(new URL('index.html', dist), new URL('404.html', dist));
