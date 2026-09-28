import React, { useEffect, useRef, useState } from 'react';
import { Page } from './types';
import { Navbar } from './components/Navbar';
import { Footer } from './components/Footer';
import { RegistrationModal } from './components/RegistrationModal';
import { HomePage } from './pages/HomePage';
import { ProfilePage } from './pages/ProfilePage';
import { NewsPage } from './pages/NewsPage';
import { ArticlePage } from './pages/ArticlePage';
import { LocationPage } from './pages/LocationPage';
import { FaqPage } from './pages/FaqPage';
import { FloatingChatAdmin } from './components/FloatingChatAdmin';
import { FloatingPromo } from './components/FloatingPromo';
import { ARTICLES_DATA, applyCmsContent, SITE_SETTINGS } from './data/content';
import { loadRemoteCms } from './services/cms';
import { SITE_BASE_PATH, SITE_URL, slugify } from './utils/seo';

type RouteState = { page: Page; articleSlug?: string };

function readRoute(): RouteState {
  const rawPath = window.location.pathname.replace(/\/+$/, '') || '/';
  const path = rawPath.startsWith(SITE_BASE_PATH)
    ? rawPath.slice(SITE_BASE_PATH.length) || '/'
    : rawPath;

  const articleMatch = path.match(/^\/berita\/(.+)$/);
  if (articleMatch?.[1]) {
    return { page: 'news', articleSlug: decodeURIComponent(articleMatch[1]) };
  }

  if (path === '/profil') return { page: 'profile' };
  if (path === '/berita') return { page: 'news' };
  if (path === '/lokasi') return { page: 'location' };
  if (path === '/faq') return { page: 'faq' };
  return { page: 'home' };
}

function pagePath(page: Page): string {
  const map: Record<Page, string> = {
    home: '/',
    profile: '/profil/',
    news: '/berita/',
    location: '/lokasi/',
    faq: '/faq/',
  };
  return `${SITE_BASE_PATH}${map[page]}`;
}

function setMeta(name: string, content: string) {
  let meta = document.head.querySelector<HTMLMetaElement>(`meta[name="${name}"]`);
  if (!meta) {
    meta = document.createElement('meta');
    meta.setAttribute('name', name);
    document.head.appendChild(meta);
  }
  meta.content = content;
}

function setCanonical(url: string) {
  let link = document.head.querySelector<HTMLLinkElement>('link[rel="canonical"]');
  if (!link) {
    link = document.createElement('link');
    link.rel = 'canonical';
    document.head.appendChild(link);
  }
  link.href = url;
}

export default function App() {
  const [route, setRoute] = useState<RouteState>(readRoute());
  const [registerModalOpen, setRegisterModalOpen] = useState(false);
  const [modalDefaultService, setModalDefaultService] = useState<'simpanan' | 'pembiayaan' | 'qurban'>('simpanan');
  const [modalDefaultAmount, setModalDefaultAmount] = useState<number | undefined>(11000000);
  const [showFloatingPromo, setShowFloatingPromo] = useState(() => readRoute().page === 'home');
  const productsRef = useRef<HTMLDivElement>(null);

  const article = route.articleSlug
    ? ARTICLES_DATA.find((item) => slugify(item.title) === route.articleSlug)
    : undefined;

  useEffect(() => {
    let cancelled = false;
    loadRemoteCms().then((payload) => {
      if (cancelled || !payload) return;
      applyCmsContent(payload);
    });
    return () => { cancelled = true; };
  }, []);

  useEffect(() => {
    const handlePopState = () => setRoute(readRoute());
    window.addEventListener('popstate', handlePopState);
    return () => window.removeEventListener('popstate', handlePopState);
  }, []);

  useEffect(() => {
    if (article) return;

    const metadata: Record<Page, { title: string; description: string }> = {
      home: {
        title: 'BMT Al-Muhajirin Toili – KSPPS Syariah Toili',
        description: 'Website resmi BMT Al-Muhajirin Toili. Informasi simpanan, pembiayaan syariah, layanan anggota, kegiatan koperasi, dan pemberdayaan masyarakat di Toili, Banggai.',
      },
      profile: {
        title: 'Profil BMT Al-Muhajirin Toili | KSPPS Syariah',
        description: 'Profil BMT Al-Muhajirin Toili, KSPPS syariah yang melayani masyarakat, petani, pedagang, dan UMKM di Kabupaten Banggai.',
      },
      news: {
        title: 'Berita & Kegiatan BMT Al-Muhajirin Toili',
        description: 'Berita, kegiatan, laporan, layanan, pembiayaan, dan program sosial BMT Al-Muhajirin Toili.',
      },
      location: {
        title: 'Lokasi Kantor BMT Al-Muhajirin Toili',
        description: 'Informasi lokasi kantor dan layanan BMT Al-Muhajirin Toili di Toili, Luwuk, dan Bunta.',
      },
      faq: {
        title: 'FAQ BMT Al-Muhajirin Toili | Layanan Syariah',
        description: 'Pertanyaan umum tentang keanggotaan, simpanan, pembiayaan, akad syariah, dan layanan BMT Al-Muhajirin Toili.',
      },
    };

    const current = metadata[route.page];
    document.title = current.title;
    setMeta('description', current.description);
    setMeta('robots', 'index, follow');
    setCanonical(`${SITE_URL}${pagePath(route.page).replace(SITE_BASE_PATH, '') || '/'}`);
  }, [route.page, article]);

  const navigateToPage = (page: Page) => {
    const url = pagePath(page);
    window.history.pushState({}, '', url);
    setRoute({ page });
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const handleOpenRegister = (
    service: 'simpanan' | 'pembiayaan' | 'qurban' = 'simpanan',
    amount?: number
  ) => {
    setModalDefaultService(service);
    setModalDefaultAmount(amount);
    setRegisterModalOpen(true);
  };

  const handleScrollToProducts = () => {
    if (route.page !== 'home' || route.articleSlug) {
      navigateToPage('home');
      setTimeout(() => productsRef.current?.scrollIntoView({ behavior: 'smooth' }), 120);
    } else {
      productsRef.current?.scrollIntoView({ behavior: 'smooth' });
    }
  };

  const activePage = route.page;

  return (
    <div className="min-h-screen flex flex-col bg-[#F8F9F6] text-[#17201B] selection:bg-[#0F4D2E] selection:text-white">
      <aside aria-label="Pengumuman Resmi" className="bg-[#083B24] text-white text-[11px] font-normal py-2 px-4 text-center border-b border-[#0F4D2E]">
        <div className="max-w-7xl mx-auto flex items-center justify-center sm:justify-between gap-4">
          <span className="hidden sm:inline tracking-wider uppercase text-white/80">{SITE_SETTINGS.topbarText}</span>
          <span className="text-[#EAF4EC] font-medium">{SITE_SETTINGS.operatingHours}</span>
        </div>
      </aside>

      <Navbar
        activePage={activePage}
        onNavigate={navigateToPage}
        onOpenRegister={() => handleOpenRegister('simpanan')}
        onScrollToProducts={handleScrollToProducts}
      />

      <main className="flex-1" style={SITE_SETTINGS.backgroundImage ? { backgroundImage: `url("${SITE_SETTINGS.backgroundImage}")`, backgroundSize: "cover", backgroundAttachment: "fixed" } : undefined}>
        <div key={route.articleSlug ?? activePage} className="spa-page-enter">
          {route.articleSlug ? (
            article ? <ArticlePage article={article} /> : <NewsPage onBackToHome={() => navigateToPage('home')} />
          ) : (
            <>
              {activePage === 'home' && (
                <HomePage
                  onOpenRegister={handleOpenRegister}
                  productsRef={productsRef}
                  onNavigateToNews={() => navigateToPage('news')}
                />
              )}
              {activePage === 'profile' && (
                <ProfilePage onBackToHome={() => navigateToPage('home')} onOpenRegister={() => handleOpenRegister('simpanan')} />
              )}
              {activePage === 'news' && <NewsPage onBackToHome={() => navigateToPage('home')} />}
              {activePage === 'location' && (
                <LocationPage onBackToHome={() => navigateToPage('home')} onOpenRegister={() => handleOpenRegister('simpanan')} />
              )}
              {activePage === 'faq' && (
                <FaqPage onBackToHome={() => navigateToPage('home')} onOpenRegister={() => handleOpenRegister('simpanan')} />
              )}
            </>
          )}
        </div>
      </main>

      <Footer onNavigate={navigateToPage} onScrollToProducts={handleScrollToProducts} />

      <RegistrationModal
        isOpen={registerModalOpen}
        onClose={() => setRegisterModalOpen(false)}
        defaultService={modalDefaultService}
        defaultAmount={modalDefaultAmount}
      />

      <FloatingPromo
        visible={showFloatingPromo && route.page === 'home' && !route.articleSlug}
        onClose={() => setShowFloatingPromo(false)}
      />

      <FloatingChatAdmin />
    </div>
  );
}
