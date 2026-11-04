import React, { useEffect, useState } from 'react';
import {
  ArrowRight, ChevronLeft, ChevronRight, CheckCircle2, Handshake,
  ShieldCheck, Users, Sprout, HeartHandshake
} from 'lucide-react';
import { ABOUT_CONTENT, ARTICLES_DATA, PRODUCTS_DATA, SITE_SETTINGS } from '../data/content';
import { articlePath, SITE_BASE_PATH } from '../utils/seo';
import { useIntersectionObserver } from '../hooks/useIntersectionObserver';

interface HomePageProps {
  onOpenRegister: (service?: 'simpanan' | 'pembiayaan' | 'qurban', amount?: number) => void;
  productsRef: React.RefObject<HTMLDivElement | null>;
  onNavigateToNews?: () => void;
  onNavigateToProducts?: () => void;
}

const fallbackHero = [
  'https://images.unsplash.com/photo-1500382017468-9049fed747ef?auto=format&fit=crop&w=2000&q=85',
  'https://images.unsplash.com/photo-1595974482597-4b8da8879bc5?auto=format&fit=crop&w=2000&q=85',
  'https://images.unsplash.com/photo-1542838132-92c53300491e?auto=format&fit=crop&w=2000&q=85',
];

const heroCopy = [
  {
    eyebrow: 'KSPPS BMT AL-MUHAJIRIN TOILI',
    title: 'Berjuang Bersama Ummat',
    accent: 'Keluar Dari Riba.',
    description: 'Layanan simpanan dan pembiayaan syariah bagi masyarakat, petani, pedagang, dan pelaku UMKM di wilayah Toili.',
    primary: 'Kenali Lebih Dekat',
  },
  {
    eyebrow: 'TUMBUH BERSAMA MASYARAKAT',
    title: 'Dukung Usaha',
    accent: 'Bangun Kemandirian.',
    description: 'Mendukung kebutuhan usaha dan sektor riil melalui layanan keuangan yang berlandaskan prinsip syariah.',
    primary: 'Lihat Produk Kami',
  },
  {
    eyebrow: 'BAITUL MAAL & BAITUL TAMWIL',
    title: 'Menguatkan Kepedulian',
    accent: 'Menggerakkan Ummat.',
    description: 'Menghubungkan layanan simpanan dan pembiayaan dengan semangat ta’awun serta pengelolaan dana sosial keagamaan.',
    primary: 'Tentang BMT',
  },
];

export const HomePage: React.FC<HomePageProps> = ({ onOpenRegister, productsRef, onNavigateToNews, onNavigateToProducts }) => {
  const section2Observer = useIntersectionObserver(0.06);
  const section3Observer = useIntersectionObserver(0.06);
  const aboutObserver = useIntersectionObserver(0.08);

  const configuredImages = (SITE_SETTINGS.heroImages || []).filter(Boolean).slice(0, 4);
  const heroImages = configuredImages.length ? configuredImages : fallbackHero;
  const slides = heroImages.map((src, index) => ({
    src,
    alt: index === 0
      ? 'Kegiatan dan lingkungan BMT Al-Muhajirin Toili'
      : index === 1
        ? 'Aktivitas pertanian dan masyarakat di wilayah Toili'
        : 'Aktivitas ekonomi dan lingkungan usaha masyarakat',
    copy: heroCopy[index % heroCopy.length],
  }));

  const [heroSlide, setHeroSlide] = useState(0);
  const [isPaused, setIsPaused] = useState(false);

  useEffect(() => {
    if (isPaused || slides.length < 2) return;
    const timer = window.setInterval(() => {
      setHeroSlide((current) => (current + 1) % slides.length);
    }, 6000);
    return () => window.clearInterval(timer);
  }, [slides.length, isPaused]);

  const goToSlide = (direction: number) => {
    setHeroSlide((current) => (current + direction + slides.length) % slides.length);
  };

  const handleScrollToProducts = () => {
    productsRef.current?.scrollIntoView({ behavior: 'smooth', block: 'start' });
  };

  const featuredArticles = ARTICLES_DATA.filter((article) => article && article.title);
  const leadArticle = featuredArticles[0];
  const otherArticles = featuredArticles.slice(1, 4);
  const aboutText = ABOUT_CONTENT.paragraphs?.[0] || 'BMT Al-Muhajirin hadir untuk mendukung kegiatan ekonomi masyarakat melalui layanan keuangan yang berlandaskan prinsip syariah.';
  const aboutImage = heroImages[0] || fallbackHero[0];

  return (
    <div className="w-full flex flex-col bg-[#FBFCFA]">
      {/* HERO SLIDER */}
      <section
        className="relative isolate min-h-[540px] sm:min-h-[590px] lg:min-h-[650px] flex items-center overflow-hidden bg-[#073B27] text-white"
        onMouseEnter={() => setIsPaused(true)}
        onMouseLeave={() => setIsPaused(false)}
        onFocus={() => setIsPaused(true)}
        onBlur={(event) => {
          if (!event.currentTarget.contains(event.relatedTarget as Node | null)) setIsPaused(false);
        }}
        aria-roledescription="carousel"
        aria-label="Sorotan BMT Al-Muhajirin"
      >
        <div className="absolute inset-0" aria-hidden="true">
          {slides.map((slide, index) => (
            <div
              key={slide.src}
              className={`absolute inset-0 bg-cover bg-center transition-[opacity,transform] duration-[1100ms] ease-in-out ${heroSlide === index ? 'opacity-100 scale-100' : 'opacity-0 scale-[1.035]'}`}
              style={{ backgroundImage: `url("${slide.src}")` }}
            />
          ))}
        </div>
        <div className="absolute inset-0 bg-gradient-to-r from-[#052D1E]/95 via-[#073B27]/80 to-[#073B27]/25" aria-hidden="true" />
        <div className="absolute inset-0 bg-gradient-to-t from-[#052D1E]/45 via-transparent to-[#052D1E]/10" aria-hidden="true" />
        <div className="absolute inset-0 islamic-pattern-dark opacity-30 pointer-events-none" aria-hidden="true" />

        <div className="relative z-10 w-full max-w-7xl mx-auto px-5 sm:px-8 lg:px-12 py-20 sm:py-24">
          <div key={heroSlide} className="max-w-3xl animate-hero-fade">
            <div className="flex items-center gap-3 mb-5 text-[10px] sm:text-xs font-bold tracking-[0.2em] uppercase text-[#E8D39A]">
              <span>{slides[heroSlide].copy.eyebrow}</span>
              <span className="w-12 h-px bg-[#D8B96D]" />
            </div>
            <h1 className="font-headline font-bold text-[2.55rem] sm:text-5xl lg:text-[4.25rem] leading-[1.04] tracking-[-0.035em] max-w-3xl">
              {slides[heroSlide].copy.title}
              <span className="block text-[#F1E5C4] mt-1">{slides[heroSlide].copy.accent}</span>
            </h1>
            <p className="mt-6 max-w-xl text-sm sm:text-lg leading-relaxed text-white/90">
              {slides[heroSlide].copy.description}
            </p>
            <div className="mt-8 flex flex-wrap gap-3">
              <button
                onClick={() => onOpenRegister('simpanan')}
                className="btn-institutional inline-flex items-center gap-2 rounded-full bg-[#D9B96E] hover:bg-[#E7CC8D] text-[#153B2A] px-6 sm:px-7 py-3.5 text-xs sm:text-sm font-bold shadow-lg shadow-black/15"
              >
                {slides[heroSlide].copy.primary}
                <ArrowRight className="w-4 h-4" />
              </button>
              <button
                onClick={handleScrollToProducts}
                className="btn-institutional inline-flex items-center gap-2 rounded-full border border-white/65 bg-white/10 hover:bg-white/20 text-white px-6 sm:px-7 py-3.5 text-xs sm:text-sm font-semibold backdrop-blur-sm"
              >
                Produk & Layanan
              </button>
            </div>
          </div>
        </div>

        {slides.length > 1 && (
          <>
            <button
              type="button"
              onClick={() => goToSlide(-1)}
              aria-label="Slide sebelumnya"
              className="absolute z-20 left-3 sm:left-6 top-1/2 -translate-y-1/2 w-10 h-10 sm:w-12 sm:h-12 rounded-full border border-white/35 bg-[#052D1E]/45 hover:bg-[#052D1E]/80 text-white backdrop-blur-sm flex items-center justify-center transition-colors"
            >
              <ChevronLeft className="w-5 h-5 sm:w-6 sm:h-6" />
            </button>
            <button
              type="button"
              onClick={() => goToSlide(1)}
              aria-label="Slide berikutnya"
              className="absolute z-20 right-3 sm:right-6 top-1/2 -translate-y-1/2 w-10 h-10 sm:w-12 sm:h-12 rounded-full border border-white/35 bg-[#052D1E]/45 hover:bg-[#052D1E]/80 text-white backdrop-blur-sm flex items-center justify-center transition-colors"
            >
              <ChevronRight className="w-5 h-5 sm:w-6 sm:h-6" />
            </button>
            <div className="absolute z-20 bottom-8 left-1/2 -translate-x-1/2 flex items-center gap-2" aria-label="Navigasi slide">
              {slides.map((slide, index) => (
                <button
                  key={slide.src}
                  type="button"
                  onClick={() => setHeroSlide(index)}
                  aria-label={`Tampilkan slide ${index + 1}`}
                  aria-current={heroSlide === index ? 'true' : undefined}
                  className={`h-2.5 rounded-full transition-all duration-300 ${heroSlide === index ? 'w-8 bg-[#E6C77E]' : 'w-2.5 bg-white/65 hover:bg-white'}`}
                />
              ))}
            </div>
            <div className="absolute bottom-8 right-5 sm:right-10 z-20 hidden sm:block text-[11px] tracking-[0.18em] text-white/75 tabular-nums">
              {String(heroSlide + 1).padStart(2, '0')} <span className="mx-1 text-white/40">/</span> {String(slides.length).padStart(2, '0')}
            </div>
          </>
        )}
      </section>

      {/* TRUST STRIP */}
      <section className="relative z-10 -mt-7 sm:-mt-9 mx-4 sm:mx-8 lg:mx-auto lg:w-[calc(100%-4rem)] max-w-7xl rounded-2xl bg-white border border-[#E4EAE5] shadow-[0_12px_36px_rgba(12,55,34,0.10)]">
        <div className="grid grid-cols-2 md:grid-cols-4 divide-x divide-y md:divide-y-0 divide-[#E5EBE6]">
          {[
            { icon: Handshake, title: 'Koperasi Syariah', sub: 'Berlandaskan prinsip syariah' },
            { icon: ShieldCheck, title: 'Layanan Amanah', sub: 'Mengutamakan kepercayaan' },
            { icon: Users, title: 'Bersama Anggota', sub: 'Tumbuh melalui kebersamaan' },
            { icon: Sprout, title: 'Ekonomi Ummat', sub: 'Mendukung sektor riil' },
          ].map(({ icon: Icon, title, sub }) => (
            <div key={title} className="flex items-center gap-3 sm:gap-4 px-4 sm:px-6 py-5 sm:py-6">
              <span className="w-10 h-10 sm:w-12 sm:h-12 shrink-0 rounded-full bg-[#EAF4ED] text-[#0F6842] flex items-center justify-center">
                <Icon className="w-5 h-5 sm:w-6 sm:h-6" />
              </span>
              <span>
                <strong className="block text-xs sm:text-sm text-[#123D2B]">{title}</strong>
                <span className="block mt-1 text-[10px] sm:text-xs text-[#718078] leading-snug">{sub}</span>
              </span>
            </div>
          ))}
        </div>
      </section>

      {/* ABOUT */}
      <section
        ref={aboutObserver.ref as any}
        className={`py-16 sm:py-20 lg:py-24 section-reveal ${aboutObserver.isVisible ? 'is-visible' : ''}`}
      >
        <div className="max-w-7xl mx-auto px-5 sm:px-8 lg:px-12 grid lg:grid-cols-2 gap-9 lg:gap-16 items-center">
          <div className="relative">
            <div className="absolute -left-3 -top-3 w-24 h-24 rounded-tl-[2rem] border-l-4 border-t-4 border-[#D8B96D]" aria-hidden="true" />
            <img
              src={aboutImage}
              alt="Lingkungan dan kegiatan BMT Al-Muhajirin Toili"
              className="relative w-full aspect-[5/3.7] object-cover rounded-2xl shadow-xl"
              loading="lazy"
            />
            <div className="absolute -bottom-4 right-4 sm:right-8 rounded-xl bg-[#0F4D2E] text-white px-5 py-3 shadow-lg">
              <span className="block text-[10px] uppercase tracking-widest text-white/70">BMT Al-Muhajirin</span>
              <strong className="font-headline text-lg">Toili, Banggai</strong>
            </div>
          </div>
          <div className="pt-3 lg:pt-0">
            <div className="flex items-center gap-3 text-[10px] sm:text-xs font-bold tracking-[0.18em] uppercase text-[#A47E36] mb-4">
              <span className="w-8 h-px bg-[#C6A45D]" /> Tentang Kami
            </div>
            <h2 className="font-headline text-3xl sm:text-4xl lg:text-[2.7rem] font-bold leading-tight text-[#123D2B]">
              {ABOUT_CONTENT.heading || 'KSPPS BMT Al-Muhajirin Toili'}
            </h2>
            <p className="mt-5 text-sm sm:text-base leading-relaxed text-[#64736A]">{aboutText}</p>
            <p className="mt-3 text-sm sm:text-base leading-relaxed text-[#64736A]">
              {ABOUT_CONTENT.paragraphs?.[1] || 'Mengembangkan layanan Baitul Maal dan Baitul Tamwil untuk mendukung kebutuhan anggota dan masyarakat.'}
            </p>
            <button
              onClick={() => window.location.assign(`${SITE_BASE_PATH}/profil/`)}
              className="mt-7 inline-flex items-center gap-2 rounded-full bg-[#0F4D2E] hover:bg-[#083B24] text-white px-6 py-3 text-xs sm:text-sm font-semibold transition-colors"
            >
              Profil BMT <ArrowRight className="w-4 h-4" />
            </button>
          </div>
        </div>
      </section>

      {/* PRODUCTS */}
      <section
        ref={(el) => {
          if (productsRef) (productsRef as React.MutableRefObject<HTMLDivElement | null>).current = el;
          if (section2Observer.ref) (section2Observer.ref as React.MutableRefObject<HTMLDivElement | null>).current = el;
        }}
        className={`relative py-16 sm:py-20 bg-[#EFF6F0] section-reveal ${section2Observer.isVisible ? 'is-visible' : ''}`}
      >
        <div className="max-w-7xl mx-auto px-5 sm:px-8 lg:px-12">
          <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-4 mb-9">
            <div>
              <div className="flex items-center gap-3 text-[10px] sm:text-xs font-bold tracking-[0.18em] uppercase text-[#A47E36] mb-3">
                <span className="w-8 h-px bg-[#C6A45D]" /> Produk & Layanan
              </div>
              <h2 className="font-headline text-3xl sm:text-4xl font-bold text-[#123D2B]">Solusi Keuangan Syariah</h2>
              <p className="mt-2 text-sm text-[#68776E] max-w-xl">Pilihan layanan simpanan dan pembiayaan sesuai kebutuhan anggota.</p>
            </div>
            <button onClick={() => onNavigateToProducts?.()} className="inline-flex items-center gap-2 text-xs font-bold text-[#0F4D2E] hover:text-[#A47E36] transition-colors">
              Lihat Semua Layanan <ArrowRight className="w-4 h-4" />
            </button>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-3 gap-5">
            {PRODUCTS_DATA.filter((product) => product.showOnHome === true).slice(0, 3).map((product) => (
              <article key={product.id} className="group overflow-hidden rounded-2xl bg-white border border-[#E0EAE1] shadow-[0_5px_22px_rgba(17,55,34,0.06)] hover:shadow-[0_14px_32px_rgba(17,55,34,0.12)] hover:-translate-y-1 transition-all duration-300">
                <div className="relative h-48 overflow-hidden bg-[#E4EEE6]">
                  <img src={product.image} alt={product.imageAlt} className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700" loading="lazy" />
                  <span className="absolute left-4 top-4 rounded-full bg-white/95 px-3 py-1.5 text-[10px] font-semibold text-[#0F4D2E] shadow-sm">{product.badge}</span>
                </div>
                <div className="p-5 sm:p-6">
                  <p className="text-[10px] font-bold uppercase tracking-widest text-[#A47E36]">{product.akad}</p>
                  <h3 className="mt-2 font-headline text-xl font-bold text-[#123D2B]">{product.title}</h3>
                  <p className="mt-3 text-sm leading-relaxed text-[#68776E]">{product.description}</p>
                  <ul className="mt-4 space-y-2">
                    {product.features.slice(0, 2).map((feature, index) => (
                      <li key={index} className="flex items-start gap-2 text-xs leading-relaxed text-[#46564C]">
                        <CheckCircle2 className="w-4 h-4 text-[#168052] shrink-0 mt-0.5" /> {feature}
                      </li>
                    ))}
                  </ul>
                  <button
                    onClick={() => onOpenRegister(product.id === 'simpanan-mudharabah' ? 'simpanan' : product.id === 'pembiayaan-syariah' ? 'pembiayaan' : 'qurban')}
                    className="mt-5 inline-flex items-center gap-2 text-xs font-bold text-[#0F4D2E] hover:text-[#A47E36] transition-colors"
                  >
                    Pelajari Layanan <ArrowRight className="w-4 h-4" />
                  </button>
                </div>
              </article>
            ))}
          </div>
        </div>
      </section>

      {/* NEWS */}
      <section
        ref={section3Observer.ref as any}
        className={`relative py-16 sm:py-20 bg-white section-reveal ${section3Observer.isVisible ? 'is-visible' : ''}`}
      >
        <div className="max-w-7xl mx-auto px-5 sm:px-8 lg:px-12">
          <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-4 mb-9">
            <div>
              <div className="flex items-center gap-3 text-[10px] sm:text-xs font-bold tracking-[0.18em] uppercase text-[#A47E36] mb-3">
                <span className="w-8 h-px bg-[#C6A45D]" /> Berita & Kegiatan
              </div>
              <h2 className="font-headline text-3xl sm:text-4xl font-bold text-[#123D2B]">Informasi Terbaru</h2>
              <p className="mt-2 text-sm text-[#68776E]">Kabar, program, dan informasi kegiatan BMT Al-Muhajirin.</p>
            </div>
            <button onClick={() => onNavigateToNews?.()} className="inline-flex items-center gap-2 text-xs font-bold text-[#0F4D2E] hover:text-[#A47E36] transition-colors">
              Semua Berita <ArrowRight className="w-4 h-4" />
            </button>
          </div>

          {leadArticle && (
            <div className="grid lg:grid-cols-12 gap-5">
              <a href={articlePath(leadArticle.title)} className="lg:col-span-7 group overflow-hidden rounded-2xl border border-[#E4EAE5] bg-white shadow-sm hover:shadow-xl transition-all">
                <div className="relative aspect-[16/9] overflow-hidden bg-[#E8EEE9]">
                  <img src={leadArticle.image} alt={leadArticle.imageAlt} className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700" loading="lazy" />
                  <span className="absolute left-4 top-4 rounded-full bg-[#0F4D2E] text-white text-[10px] font-semibold px-3 py-1.5">{leadArticle.category}</span>
                </div>
                <div className="p-5 sm:p-7">
                  <span className="text-xs text-[#A47E36] font-semibold">{leadArticle.date}</span>
                  <h3 className="mt-2 font-headline text-xl sm:text-2xl font-bold text-[#123D2B] group-hover:text-[#0F6842] leading-snug">{leadArticle.title}</h3>
                  <p className="mt-3 text-sm leading-relaxed text-[#68776E]">{leadArticle.excerpt}</p>
                  <span className="mt-5 inline-flex items-center gap-2 text-xs font-bold text-[#0F4D2E]">Baca selengkapnya <ArrowRight className="w-4 h-4" /></span>
                </div>
              </a>
              <div className="lg:col-span-5 flex flex-col gap-4">
                {otherArticles.map((article) => (
                  <a key={article.id} href={articlePath(article.title)} className="group flex gap-4 rounded-xl border border-[#E4EAE5] p-3 hover:border-[#B9D2C0] hover:bg-[#F8FBF8] transition-all">
                    <img src={article.image} alt={article.imageAlt} className="w-28 sm:w-36 aspect-square object-cover rounded-lg shrink-0" loading="lazy" />
                    <span className="min-w-0 flex flex-col justify-center">
                      <span className="text-[10px] font-semibold text-[#A47E36]">{article.date} · {article.category}</span>
                      <strong className="mt-1 font-headline text-sm sm:text-base text-[#123D2B] leading-snug group-hover:text-[#0F6842] line-clamp-3">{article.title}</strong>
                      <span className="mt-2 text-[11px] font-bold text-[#0F4D2E] inline-flex items-center gap-1">Selengkapnya <ArrowRight className="w-3 h-3" /></span>
                    </span>
                  </a>
                ))}
              </div>
            </div>
          )}
        </div>
      </section>

      {/* CONTACT CTA */}
      <section className="px-5 sm:px-8 lg:px-12 pb-12 bg-white">
        <div className="relative max-w-7xl mx-auto overflow-hidden rounded-2xl bg-[#073B27] text-white px-6 sm:px-10 py-8 sm:py-10 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-6">
          <div className="absolute inset-0 islamic-pattern-dark opacity-50 pointer-events-none" aria-hidden="true" />
          <div className="relative z-10 flex items-center gap-4">
            <span className="w-12 h-12 rounded-full bg-white/10 flex items-center justify-center"><HeartHandshake className="w-6 h-6 text-[#E7CC8D]" /></span>
            <span>
              <strong className="block font-headline text-xl sm:text-2xl">Mari Tumbuh Bersama</strong>
              <span className="block mt-1 text-xs sm:text-sm text-white/75">Hubungi BMT Al-Muhajirin untuk informasi layanan dan keanggotaan.</span>
            </span>
          </div>
          <button onClick={() => onOpenRegister('simpanan')} className="relative z-10 inline-flex items-center gap-2 rounded-full bg-[#E7CC8D] text-[#173B2A] hover:bg-white px-6 py-3 text-xs font-bold transition-colors">
            Hubungi Kami <ArrowRight className="w-4 h-4" />
          </button>
        </div>
      </section>
    </div>
  );
};
