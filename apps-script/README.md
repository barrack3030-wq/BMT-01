# BMT Al-Muhajirin — Google Apps Script CMS

CMS hijau-putih ini memakai Google Apps Script untuk login/password dan API, Google Sheet sebagai database konten, serta Google Drive untuk upload gambar.

## Setup
1. Buat project baru di https://script.google.com/
2. Salin `Code.gs`, `Index.html`, dan `appsscript.json` dari folder `apps-script`.
3. Di Apps Script Editor jalankan:
   `setAdminPassword('GANTI-DENGAN-PASSWORD-KUAT')`
4. Jalankan `setupCms()` sekali. Google Script membuat database Google Sheet dan folder media Drive otomatis.
5. Deploy > New deployment > Web app.
   - Execute as: Me
   - Who has access: Anyone
6. Salin URL Web App ke `public/cms-config.js`.
7. Deploy ulang GitHub Pages.

## Modul
Identitas, logo + ukuran, 4 hero, background, promo, Chat Admin, Instagram, Facebook, Produk + tambah, Blog/berita + edit, Tentang Kami, visi/misi/legalitas, Pengurus + tambah, Testimoni + foto, Lokasi + tambah cabang, FAQ, backup/import.

Password hanya disimpan sebagai hash di Script Properties dan sesi admin menggunakan CacheService.

## Akses CMS dari website
Setelah GitHub Pages build, halaman admin tersedia di:
https://barrack3030-wq.github.io/BMT-01/admin/

Halaman tersebut membaca `window.BMT_CMS_ADMIN_URL` dari `public/cms-config.js` dan membuka Web App Google Apps Script.
