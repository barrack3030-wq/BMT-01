# BMT Al-Muhajirin Toili — Website Resmi

Website resmi Kantor Pusat **BMT Al-Muhajirin Toili (KSPPS Syariah Toili)**: informasi simpanan dan pembiayaan syariah, profil, berita, lokasi cabang, dan FAQ.

- **Situs:** https://barrack3030-wq.github.io/BMT-01/
- **CMS:** https://barrack3030-wq.github.io/BMT-01/cms/

## Teknologi

React 19 · Vite · Tailwind CSS 4 · TypeScript · GitHub Pages · Google Apps Script (CMS)

## Struktur folder

```
src/                 Aplikasi React (pages, components, services, utils)
public/content/      Konten situs dalam JSON (artikel, produk, cabang, FAQ, dll.)
public/content/media Gambar yang diunggah lewat CMS
public/cms/          Pintu masuk CMS (meneruskan ke Apps Script)
apps-script/         Backend/UI CMS di Google Apps Script
scripts/             Skrip pasca-build untuk GitHub Pages
.github/workflows/   Deploy otomatis ke GitHub Pages
```

## Menjalankan secara lokal

Butuh Node.js 22 atau lebih baru.

```bash
npm install
npm run dev      # http://localhost:3000
npm run lint     # cek tipe TypeScript
npm run build    # build produksi ke dist/
```

Aplikasi membaca konten dari `/BMT-01/content/*.json`, sesuai `base` di `vite.config.ts`.

## Alur konten (CMS)

1. Admin membuka halaman CMS dan masuk dengan `CMS_ACCESS_KEY`.
2. Google Apps Script menulis perubahan sebagai JSON (dan gambar) ke folder `public/content/` lewat GitHub API.
3. Setiap perubahan menjadi satu commit ke branch `main`.
4. Commit tersebut memicu workflow deploy, dan situs diperbarui.

Cara pemasangan Apps Script, Script Properties, dan token GitHub ada di [`apps-script/README.md`](apps-script/README.md). Token dan access key hanya disimpan di Script Properties, **jangan** dimasukkan ke repository.

## Deploy

Push ke `main` menjalankan `.github/workflows/deploy-pages.yml`: `npm install`, `npm run build`, lalu publikasi `dist/` ke GitHub Pages. Workflow juga bisa dijalankan manual (`workflow_dispatch`).

Setelah build, `scripts/prepare-pages.mjs` menyalin `index.html` menjadi `404.html` dan ke folder rute, supaya URL langsung seperti `/berita/` berfungsi di GitHub Pages.

### Catatan

- Daftar rute di `scripts/prepare-pages.mjs` dan `public/sitemap.xml` ditulis manual. Artikel baru dari CMS tetap bisa dibuka lewat fallback `404.html`, tetapi belum masuk sitemap sampai daftar itu diperbarui.
