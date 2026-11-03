export interface Article {
  id: string;
  category: string;
  date: string;
  title: string;
  excerpt: string;
  image: string;
  imageAlt: string;
  tags?: string[];
  featured?: boolean;
  contentParagraphs?: string[];
}

export interface ProductItem {
  id: string;
  badge: string;
  title: string;
  description: string;
  features: string[];
  image: string;
  imageAlt: string;
  akad: string;
  showOnHome?: boolean;
}

export interface BoardMember {
  name: string;
  role: string;
  badge: string;
  photo: string;
  quote: string;
}

export interface OfficeBranch {
  id: string;
  name: string;
  badgeTitle: string;
  address: string;
  hours: string;
  phone: string;
  whatsapp: string;
  mapsUrl: string;
  image: string;
  mapEmbedQuery: string;
}

export interface FaqItem {
  id: string;
  question: string;
  answer: string;
}

export interface TestimonialItem {
  id: string;
  name: string;
  role: string;
  location: string;
  memberSince: string;
  productUsed: string;
  quote: string;
  avatarText: string;
  avatarImage?: string;
  rating?: number;
}

export const ARTICLES_DATA: Article[] = [];
export const PRODUCTS_DATA: ProductItem[] = [];
export const BOARD_MEMBERS: BoardMember[] = [];
export const BRANCHES_DATA: OfficeBranch[] = [];
export const FAQ_DATA: FaqItem[] = [];
export const TESTIMONIALS_DATA: TestimonialItem[] = [];

export interface SiteSettings {
  logoUrl: string;
  logoWidth: number;
  heroImages: string[];
  backgroundImage: string;
  promoImage: string;
  promoTitle: string;
  promoDescription: string;
  promoEnabled: boolean;
  chatLabel: string;
  chatUrl: string;
  instagramUrl: string;
  facebookUrl: string;
  topbarText: string;
  operatingHours: string;
}

export interface AboutContent {
  title: string;
  heading: string;
  paragraphs: string[];
  vision: string;
  mission: string[];
  legality: string;
}

// Diisi dari /content/*.json saat aplikasi dimuat (lihat applyCmsContent).
export const SITE_SETTINGS: SiteSettings = {
  logoUrl: '',
  logoWidth: 160,
  heroImages: [],
  backgroundImage: '',
  promoImage: '',
  promoTitle: '',
  promoDescription: '',
  promoEnabled: false,
  chatLabel: '',
  chatUrl: '',
  instagramUrl: '',
  facebookUrl: '',
  topbarText: '',
  operatingHours: '',
};

export const ABOUT_CONTENT: AboutContent = {
  title: '',
  heading: '',
  paragraphs: [],
  vision: '',
  mission: [],
  legality: '',
};

export function applyCmsContent(payload: any) {
  if (!payload) return;
  if (payload.settings) Object.assign(SITE_SETTINGS, payload.settings);
  if (payload.pages?.about) Object.assign(ABOUT_CONTENT, payload.pages.about);

  const replaceArray = (target: any[], source: any[]) => {
    if (!Array.isArray(source) || source.length === 0) return;
    target.splice(0, target.length, ...source);
  };
  replaceArray(PRODUCTS_DATA, payload.products);
  replaceArray(ARTICLES_DATA, payload.articles);
  replaceArray(BOARD_MEMBERS as any[], payload.board);
  replaceArray(BRANCHES_DATA, payload.branches);
  replaceArray(FAQ_DATA, payload.faq);
  replaceArray(TESTIMONIALS_DATA, payload.testimonials);
}
