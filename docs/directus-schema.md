# Directus CMS — BMT Al-Muhajirin Toili

Frontend GitHub Pages tetap digunakan sebagai website publik. Directus menjadi headless CMS dan admin dashboard.

## Singleton collections

### site_settings
Fields:
- siteName
- tagline
- logo (file)
- logoWidth
- hero_1 (file)
- hero_2 (file)
- hero_3 (file)
- hero_4 (file)
- background_image (file)
- promo_image (file)
- promoTitle
- promoDescription
- chatLabel
- chatUrl
- instagramUrl
- facebookUrl
- topbarText
- operatingHours

### about_page
Fields:
- title
- heading
- paragraphs (JSON or text)
- vision
- mission (JSON or text)
- legality

## Collections

Create:
- products
- articles
- board_members
- testimonials
- branches
- faq

Use the current field names from src/data/content.ts wherever possible. Image fields can be Directus File relations.

## Public permissions

Give the Directus Public role READ only on the eight collections above. Keep create/update/delete restricted to authenticated admin/editor users.

## Frontend config

Set public/directus-config.js:

```js
window.BMT_DIRECTUS_URL = 'https://YOUR-PROJECT.directus.app';
window.BMT_DIRECTUS_ADMIN_URL = 'https://YOUR-PROJECT.directus.app/admin';
```

The frontend tries Directus first and falls back to the legacy Google Apps Script CMS when Directus is not configured or unavailable.
