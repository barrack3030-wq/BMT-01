# BMT Al-Muhajirin — Google Apps Script CMS Login

## Struktur Apps Script

- Code.gs
- Login.html
- Dashboard.html
- Styles.html

Database:
- Google Spreadsheet: DB_USERS
- Sheet: users
- Header: email | password_hash | role | nama
- Role yang diterima: admin | user

## Password hash

Kolom password_hash harus berisi SHA-256 hex lowercase.

Untuk membuat hash dari password, jalankan function `makePasswordHash('password')` dari editor lalu salin nilai `password_hash` ke Sheet.

Contoh:
```
email | password_hash | role | nama
admin@example.com | <SHA-256-HEX> | admin | Administrator
user@example.com  | <SHA-256-HEX> | user  | User BMT
```

## Deployment

1. Buka Apps Script dan buat file sesuai struktur.
2. Pastikan Google account pemilik script mempunyai akses ke spreadsheet `DB_USERS`.
3. Jalankan `checkDatabase()` sekali dari editor untuk memberikan authorization dan memastikan database terbaca.
4. Deploy > New deployment.
5. Type: Web app.
6. Execute as: Me.
7. Who has access: Anyone.
8. Deploy.
9. Uji URL deployment yang berakhiran `/exec`.
10. Jangan gunakan URL `/dev` untuk pengguna karena URL /dev hanya dapat diakses editor script.

## Login flow

- `doGet(e)` memeriksa `page` dan UserProperties.
- `doLogin` membaca user dari Sheet dan membandingkan SHA-256.
- Login sukses menyimpan `IS_LOGIN`, `USER_EMAIL`, `USER_ROLE`, dan `USER_NAME` di UserProperties.
- Dashboard selalu memanggil `getCurrentUser()`.
- Logout menghapus seluruh UserProperties.

## Catatan penting tentang multi-user

Karena deployment diminta menggunakan `Execute as: Me`, Apps Script menjalankan server-side code sebagai pemilik deployment. Google mendokumentasikan bahwa UserProperties bersifat per-current-user, tetapi pada web app yang execute-as-owner, identitas eksekusi bukan identitas pengunjung. Untuk aplikasi multi-user publik, session berbasis UserProperties dapat menjadi satu shared session. Untuk keamanan produksi multi-user, gunakan session token server-side yang tidak bergantung pada identitas eksekusi, atau deploy sebagai user accessing the web app bila kebutuhan OAuth/authorization memungkinkan.
