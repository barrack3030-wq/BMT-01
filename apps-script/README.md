# BMT Al-Muhajirin — Google Apps Script CMS

CMS menggunakan pola sederhana seperti CMS Banggai Wonderland:
- Google Apps Script hanya sebagai API/backend.
- CMS frontend berada di GitHub Pages: `/cms/`.
- Satu access key dari Script Properties: `CMS_ACCESS_KEY`.
- Data website disimpan sebagai JSON di repository GitHub.
- Tidak memakai DB_USERS, UserProperties, Session.getActiveUser(), atau login session.

## 1. Apps Script files

Buat project Apps Script dan copy:
- `apps-script/Code.gs`

Manifest opsional:
- `apps-script/appsscript.json`

## 2. Script Properties

Project Settings → Script Properties:

```
CMS_ACCESS_KEY = buat-password-CMS-kamu
GITHUB_TOKEN = GitHub fine-grained token dengan Contents: Read and write
GITHUB_OWNER = barrack3030-wq
GITHUB_REPO = BMT-01
GITHUB_BRANCH = main
```

Jangan simpan nilai-nilai tersebut di GitHub/frontend.

## 3. GitHub token

Buat fine-grained token untuk repository `BMT-01` dengan:
- Repository access: Only selected repository → BMT-01
- Contents: Read and write

Token hanya disimpan di Script Properties.

## 4. Deploy

Deploy → New deployment → Web app

- Execute as: Me
- Who has access: Anyone

Salin URL `/exec`.

## 5. Hubungkan CMS

Buka `public/cms/config.js` dan isi:

```js
window.BMT_CMS_ENDPOINT = 'URL_WEB_APP_EXEC_KAMU';
window.BMT_CMS_SERVICE = 'BMT Al-Muhajirin CMS';
window.BMT_CMS_VERSION = '1.0-github-json';
```

Setelah commit, buka:

`https://barrack3030-wq.github.io/BMT-01/cms/`

## 6. Fitur

- Identitas & tampilan
- Logo + ukuran
- 4 hero image
- Background
- Promo
- Chat Admin
- Instagram/Facebook
- Produk + tambah/edit/hapus
- Blog + tambah/edit/hapus
- Isi artikel Markdown/teks
- Upload gambar ke GitHub
- Tentang Kami
- Pengurus + foto + tambah/edit/hapus
- Testimoni + foto
- Lokasi + tambah cabang
- FAQ

Setiap perubahan menjadi commit ke branch yang dipilih.


## 2026-09-28: CMS menjalankan UI langsung di Apps Script

Versi ini tidak lagi melakukan `fetch()` dari GitHub Pages ke Content Service. Browser dapat terkena masalah CORS/redirect pada Content Service. CMS sekarang menggunakan **Apps Script HTML Service + `google.script.run`**.

File Apps Script:
- `Code.gs`
- `Index.html`

### Sinkronkan ke Apps Script
1. Buka project Apps Script yang menjadi Web App.
2. Ganti isi `Code.gs` dengan file `apps-script/Code.gs` dari repo ini.
3. Tambahkan file HTML bernama **Index** dan isi dengan `apps-script/Index.html`.
4. Pastikan Script Properties tetap:
   - `CMS_ACCESS_KEY`
   - `GITHUB_TOKEN`
   - `GITHUB_OWNER=barrack3030-wq`
   - `GITHUB_REPO=BMT-01`
   - `GITHUB_BRANCH=main`
5. Deploy ulang Web App sebagai **Execute as Me** dan akses **Anyone**. Buat **New version** saat update deployment.
6. Buka `https://barrack3030-wq.github.io/BMT-01/cms/`. Halaman tersebut akan meneruskan ke Apps Script CMS.

### Endpoint
Endpoint yang ada di `public/cms/config.js` tetap dipakai sebagai alamat Web App. URL ini sekarang menjadi halaman CMS, bukan API JSON yang dipanggil lintas-domain dari GitHub Pages.
