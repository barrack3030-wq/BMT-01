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
