import { copyFileSync, existsSync, mkdirSync } from 'node:fs';

const dist = new URL('../dist/', import.meta.url);

if (!existsSync(dist)) {
  throw new Error('dist directory not found');
}

const sourceIndex = new URL('index.html', dist);
copyFileSync(sourceIndex, new URL('404.html', dist));

const routes = [
  '/produk/',
  '/berita/',
  '/profil/',
  '/lokasi/',
  '/faq/',
  '/berita/kiprah-pemberdayaan-ekonomi-petani-dan-pedagang-di-toili/',
  '/berita/rat-aset-koperasi-tumbuh-24/',
  '/berita/armada-kas-keliling-layani-transaksi-di-pasar-sentral-toili/',
  '/berita/penyaluran-pembiayaan-musim-tanam-rp-4-5-miliar/',
  '/berita/pelatihan-pembukuan-keuangan-usaha-mikro-bagi-anggota-di-toili/',
  '/berita/penyaluran-paket-perlengkapan-sekolah-bagi-anak-yatim-dhuafa/',
];

for (const route of routes) {
  const targetDir = new URL(`.${route}`, dist);
  mkdirSync(targetDir, { recursive: true });
  copyFileSync(sourceIndex, new URL('index.html', targetDir));
}
