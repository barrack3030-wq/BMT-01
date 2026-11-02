import React, { useEffect, useState } from 'react';
import { ArrowRight, ChevronRight, MessageSquare, CheckCircle2 } from 'lucide-react';
import { ARTICLES_DATA, PRODUCTS_DATA, SITE_SETTINGS } from '../data/content';
import { articlePath, SITE_BASE_PATH } from '../utils/seo';
import { useIntersectionObserver } from '../hooks/useIntersectionObserver';

interface HomePageProps {
  onOpenRegister: (service?: 'simpanan' | 'pembiayaan' | 'qurban', amount?: number) => void;
  productsRef: React.RefObject<HTMLDivElement | null>;
  onNavigateToNews?: () => void;
  onNavigateToProducts?: () => void;
}

export const HomePage: React.FC<HomePageProps> = ({ onOpenRegister, productsRef, onNavigateToNews, onNavigateToProducts }) => {
  // Intersection observers for smooth scroll reveal
  const section2Observer = useIntersectionObserver(0.06);
  const section3Observer = useIntersectionObserver(0.06);

  // Hero image slider — managed from CMS.
  const heroSource = SITE_SETTINGS.heroImages.filter(Boolean).slice(0, 4);
  const heroImages = (heroSource.length ? heroSource : [
    'https://images.unsplash.com/photo-1500382017468-9049fed747ef?auto=format&fit=crop&w=2000&q=85',
  ]).map((src, index) => ({
    src,
    alt: `Gambar hero ${index + 1} BMT Al-Muhajirin`,
  }));

  const [heroSlide, setHeroSlide] = useState(0);

  useEffect(() => {
    const timer = window.setInterval(() => {
      setHeroSlide((current) => (current + 1) % heroImages.length);
    }, 6500);

    return () => window.clearInterval(timer);
  }, [heroImages.length]);

  const handleScrollToProducts = () => {
    productsRef.current?.scrollIntoView({ behavior: 'smooth' });
  };

  return (
    <div className="w-full flex flex-col">
      {/* ========================================================
          SECTION 1 — HERO FULL-WIDTH BACKGROUND FOTO TOILI
          ======================================================== */}
      <section className="relative w-full min-h-[500px] sm:min-h-[560px] lg:min-h-[620px] flex items-center bg-[#083B24] overflow-hidden border-b border-[#0F4D2E]">
        {/* Four-image background slider */}
        <div className="absolute inset-0 animate-hero-bg" aria-hidden="true">
          {heroImages.map((image, index) => (
            <div
              key={image.src}
              className={`absolute inset-0 bg-cover bg-center bg-no-repeat hero-cinematic-bg transition-opacity duration-1000 ease-in-out ${
                heroSlide === index ? 'opacity-100' : 'opacity-0'
              }`}
              style={{ backgroundImage: `url('${image.src}')` }}
            />
          ))}
        </div>

        {/* Elegant Dark Green Institutional Overlay with Subtle Fade */}
        <div
          className="absolute inset-0 bg-gradient-to-r from-[#083B24]/95 via-[#083B24]/85 to-[#0F4D2E]/65 animate-hero-overlay"
          aria-hidden="true"
        />

        {/* Subtle Islamic Geometric Pattern Overlay (3-4% Opacity) */}
        <div
          className="absolute inset-0 pointer-events-none islamic-pattern-dark pattern-mask-radial"
          aria-hidden="true"
        />

        {/* Slider indicators */}
        <div className="absolute z-10 bottom-6 right-5 sm:bottom-8 sm:right-8 flex items-center gap-1.5" aria-label="Pilihan foto hero">
          {heroImages.map((image, index) => (
            <button
              key={image.src}
              type="button"
              onClick={() => setHeroSlide(index)}
              aria-label={`Tampilkan foto hero ${index + 1}`}
              aria-current={heroSlide === index ? 'true' : undefined}
              className={`h-1.5 transition-all duration-300 cursor-pointer ${
                heroSlide === index
                  ? 'w-8 bg-white'
                  : 'w-4 bg-white/40 hover:bg-white/70'
              }`}
            />
          ))}
        </div>

        {/* Content Container (Left-aligned, max 1200px / 7xl) */}
        <div className="relative z-10 w-full max-w-7xl mx-auto px-6 sm:px-8 lg:px-12 py-14 sm:py-20 lg:py-24">
          <div className="max-w-3xl space-y-6">
            <h1 className="font-headline font-bold text-3xl sm:text-5xl lg:text-[54px] text-white leading-[1.15] tracking-tight hero-title-premium">
              <span className="hero-title-line hero-title-line-1">Berjuang Bersama Ummat</span>
              <span className="hero-title-line hero-title-line-2 text-[#EAF4EC]">Keluar Dari Riba</span>
              <span className="hero-title-accent" aria-hidden="true" />
            </h1>

            <p className="text-base sm:text-lg text-white/90 leading-relaxed font-normal max-w-2xl pt-1 animate-hero-fade delay-desc">
              Layanan simpanan dan pembiayaan syariah bagi masyarakat, petani, pedagang, dan pelaku UMKM di wilayah Toili.
            </p>

            <div className="pt-2 flex flex-wrap items-center gap-4 animate-hero-fade delay-cta">
              <button
                onClick={handleScrollToProducts}
                className="btn-institutional bg-[#0F4D2E] text-white text-xs sm:text-sm font-semibold tracking-wider uppercase px-7 py-3.5 border border-white/20 hover:bg-[#083B24] flex items-center gap-2 card-shadow-sm cursor-pointer"
              >
                <span>LIHAT PRODUK & LAYANAN</span>
                <ArrowRight className="w-4 h-4 btn-arrow-icon" />
              </button>

              <button
                onClick={() => onOpenRegister('simpanan')}
                className="btn-institutional bg-white text-[#083B24] text-xs sm:text-sm font-semibold tracking-wider uppercase px-7 py-3.5 border border-white hover:bg-[#EAF4EC] flex items-center gap-2 cursor-pointer"
              >
                <MessageSquare className="w-4 h-4" />
                <span>HUBUNGI KAMI</span>
              </button>
            </div>

            <div className="pt-5 flex items-center gap-4 text-xs text-white/70 border-t border-white/15 animate-hero-fade delay-footer">
              <span>Kantor Pusat: Toili, Kab. Banggai</span>
              <span>•</span>
              <span>Pengawasan Dewan Pengawas Syariah (DPS)</span>
            </div>
          </div>
        </div>
      </section>

      {/* ========================================================
          SECTION 2 — PRODUK & LAYANAN + SIMULASI
          ======================================================== */}
      <section
        ref={(el) => {
          if (productsRef) {
            (productsRef as React.MutableRefObject<any>).current = el;
          }
          if (section2Observer.ref) {
            (section2Observer.ref as React.MutableRefObject<any>).current = el;
          }
        }}
        className={`relative bg-[#F4F6F3] text-[#17201B] py-14 sm:py-20 lg:py-24 border-b border-[#DDE5DF] overflow-hidden section-reveal ${
          section2Observer.isVisible ? 'is-visible' : ''
        }`}
      >
        {/* Subtle institutional background treatment */}
        <div
          className="absolute inset-0 pointer-events-none islamic-pattern-light opacity-60"
          aria-hidden="true"
        />
        <div
          className="absolute -top-24 right-[-8rem] w-80 h-80 rounded-full bg-[#0F4D2E]/[0.045] blur-3xl"
          aria-hidden="true"
        />
        <div
          className="absolute bottom-0 left-[-7rem] w-72 h-72 rounded-full bg-[#C9A45C]/[0.06] blur-3xl"
          aria-hidden="true"
        />

        <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          {/* Section heading */}
          <div className="max-w-3xl mx-auto mb-10 sm:mb-12 text-center">
            <div className="inline-flex items-center justify-center gap-2 text-[10px] sm:text-[11px] font-semibold tracking-[0.18em] uppercase text-[#0F4D2E] mb-3">
              <span className="w-8 h-px bg-[#0F4D2E]" />
              <span>Layanan Keuangan Syariah</span>
              <span className="w-8 h-px bg-[#0F4D2E]" />
            </div>
            <h2 className="font-headline font-bold text-3xl sm:text-4xl lg:text-[44px] text-[#17201B] tracking-tight leading-[1.08]">
              Produk & Layanan
            </h2>
            <p className="text-sm sm:text-base text-[#66736A] mt-3 max-w-2xl mx-auto leading-relaxed">
              Pilihan layanan untuk kebutuhan simpanan, modal usaha, pertanian, dan perencanaan ibadah anggota.
            </p>
          </div>

          {/* Product cards */}
          <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-5 lg:gap-6">
            {PRODUCTS_DATA.filter((product) => product.showOnHome === true).slice(0, 3).map((product, index) => (
              <article
                key={product.id}
                className="group bg-white border border-[#DDE5DF] card-shadow card-hover-subtle overflow-hidden flex flex-col"
              >
                <div className="relative h-52 sm:h-56 overflow-hidden bg-[#E9EEEA] border-b border-[#DDE5DF]">
                  <img
                    src={product.image}
                    alt={product.imageAlt}
                    className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-[1.035]"
                    loading="lazy"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-[#083B24]/55 via-transparent to-transparent" />

                  <div className="absolute top-4 left-4 flex items-center gap-2">
                    <span className="w-8 h-8 bg-[#0F4D2E] text-white border border-white/25 flex items-center justify-center text-[11px] font-bold">
                      {String(index + 1).padStart(2, '0')}
                    </span>
                    <span className="bg-white/95 text-[#0F4D2E] text-[10px] font-semibold uppercase tracking-wider px-2.5 py-1 border border-white">
                      {product.badge}
                    </span>
                  </div>

                  <div className="absolute bottom-4 left-5 right-5">
                    <span className="inline-block text-[10px] font-medium uppercase tracking-wider text-white/80 mb-1">
                      {product.akad}
                    </span>
                    <h3 className="font-headline font-bold text-[22px] sm:text-2xl text-white leading-tight">
                      {product.title}
                    </h3>
                  </div>
                </div>

                <div className="p-5 sm:p-6 flex flex-col flex-1">
                  <p className="text-sm text-[#66736A] leading-relaxed">
                    {product.description}
                  </p>

                  <div className="mt-5 pt-4 border-t border-[#E6EBE7]">
                    <p className="text-[10px] font-semibold uppercase tracking-[0.15em] text-[#0F4D2E] mb-3">
                      Yang Anda Dapatkan
                    </p>
                    <ul className="space-y-2.5">
                      {product.features.map((feat, fIdx) => (
                        <li key={fIdx} className="flex items-start gap-2.5 text-xs text-[#17201B] leading-relaxed">
                          <CheckCircle2 className="w-4 h-4 text-[#0F4D2E] shrink-0 mt-0.5" />
                          <span>{feat}</span>
                        </li>
                      ))}
                    </ul>
                  </div>

                  <div className="mt-6 pt-4 border-t border-[#E6EBE7] flex items-center justify-between gap-3">
                    <span className="text-[11px] text-[#66736A]">
                      Layanan anggota
                    </span>
                    <button
                      onClick={() =>
                        onOpenRegister(
                          product.id === 'simpanan-mudharabah'
                            ? 'simpanan'
                            : product.id === 'pembiayaan-syariah'
                            ? 'pembiayaan'
                            : 'qurban'
                        )
                      }
                      className="btn-institutional bg-[#0F4D2E] text-white text-[11px] font-semibold uppercase tracking-wider px-4 py-2.5 border border-[#083B24] hover:bg-[#083B24] flex items-center gap-1.5 cursor-pointer"
                    >
                      <span>Pilih Layanan</span>
                      <ArrowRight className="w-3.5 h-3.5 btn-arrow-icon" />
                    </button>
                  </div>
                </div>
              </article>
            ))}
          </div>

          <div className="mt-7 flex justify-center">
            <button
              type="button"
              onClick={() => onNavigateToProducts?.()}
              className="btn-institutional bg-white text-[#0F4D2E] text-xs sm:text-sm font-semibold uppercase tracking-wider px-6 py-3 border border-[#0F4D2E] hover:bg-[#EAF4EC] flex items-center gap-2 card-shadow-sm cursor-pointer"
            >
              <span>Lihat Produk Lainnya</span>
              <ArrowRight className="w-4 h-4 btn-arrow-icon" />
            </button>
          </div>

        </div>
      </section>

      {/* ========================================================
          SECTION 4 — KABAR & KEGIATAN
          ======================================================== */}
      <section
        ref={section3Observer.ref as any}
        className={`bg-white border-b border-[#DDE5DF] py-14 sm:py-20 relative overflow-hidden section-reveal ${
          section3Observer.isVisible ? 'is-visible' : ''
        }`}
      >
        {/* Subtle Islamic Geometric Corner Texture */}
        <div
          className="absolute inset-0 pointer-events-none islamic-pattern-light pattern-mask-corner"
          aria-hidden="true"
        />

        <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-4 mb-10 pb-5 border-b border-[#DDE5DF]">
            <div>
              <h2 className="font-headline font-bold text-3xl sm:text-4xl text-[#17201B] tracking-tight">
                Kabar & Kegiatan
              </h2>
              <p className="text-xs sm:text-sm text-[#66736A] mt-1 max-w-md leading-relaxed">
                Informasi seputar kegiatan operasional dan layanan anggota di wilayah Toili.
              </p>
            </div>
            <a
              href={`${SITE_BASE_PATH}/berita/`}
              className="self-start sm:self-auto text-xs font-semibold uppercase tracking-wider text-[#0F4D2E] hover:text-[#083B24] transition-colors flex items-center gap-1.5 group"
            >
              <span>LIHAT SEMUA BERITA</span>
              <ArrowRight className="w-3.5 h-3.5 btn-arrow-icon" />
            </a>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
            {/* FEATURED ARTICLE (Col Span 7) */}
            <a
              href={articlePath(ARTICLES_DATA[0].title)}
              className="lg:col-span-7 bg-white border border-[#DDE5DF] card-shadow card-hover-subtle flex flex-col justify-between group transition-all hover:border-[#0F4D2E]"
            >
              <div>
                <div className="relative aspect-[16/10] overflow-hidden border-b border-[#DDE5DF] bg-gray-100">
                  <img
                    src={ARTICLES_DATA[0].image}
                    alt={ARTICLES_DATA[0].imageAlt}
                    className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-103"
                    loading="lazy"
                  />
                  <div className="absolute top-4 left-4 flex gap-2">
                    {ARTICLES_DATA[0].tags?.map((tag) => (
                      <span
                        key={tag}
                        className="bg-[#0F4D2E] text-white text-[10px] font-semibold uppercase tracking-wider px-2.5 py-1 border border-[#083B24]"
                      >
                        {tag}
                      </span>
                    ))}
                  </div>
                </div>

                <div className="p-6 sm:p-8">
                  <div className="text-xs font-semibold tracking-wider text-[#0F4D2E]">
                    {ARTICLES_DATA[0].meta}
                  </div>

                  <h3 className="font-headline font-bold text-2xl text-[#17201B] mt-2.5 leading-snug group-hover:text-[#0F4D2E] transition-colors">
                    {ARTICLES_DATA[0].title}
                  </h3>

                  <p className="mt-3 text-sm sm:text-base text-[#66736A] leading-relaxed">
                    {ARTICLES_DATA[0].excerpt}
                  </p>
                </div>
              </div>

              <div className="p-6 sm:p-8 pt-0 flex items-center gap-2 text-xs font-semibold text-[#0F4D2E] group-hover:text-[#083B24]">
                <span>BACA SELENGKAPNYA</span>
                <ArrowRight className="w-4 h-4 btn-arrow-icon" />
              </div>
            </a>

            {/* 3 STACKED ARTICLES (Col Span 5) */}
            <div className="lg:col-span-5 space-y-4">
              {ARTICLES_DATA.slice(1, 4).map((art) => (
                <a
                  key={art.id}
                  href={articlePath(art.title)}
                  className="bg-white border border-[#DDE5DF] card-shadow-sm p-4 sm:p-5 flex flex-col sm:flex-row gap-4 group hover:border-[#0F4D2E] hover:bg-[#F8F9F6] transition-all"
                >
                  <div className="w-full sm:w-36 h-28 shrink-0 border border-[#DDE5DF] overflow-hidden bg-gray-100">
                    <img
                      src={art.image}
                      alt={art.imageAlt}
                      className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                      loading="lazy"
                    />
                  </div>

                  <div className="flex flex-col justify-between">
                    <div>
                      <span className="text-[11px] font-semibold text-[#0F4D2E]">
                        {art.meta}
                      </span>
                      <h4 className="font-headline font-bold text-sm sm:text-base text-[#17201B] mt-1 leading-snug group-hover:text-[#0F4D2E] transition-colors line-clamp-2">
                        {art.title}
                      </h4>
                      <p className="text-xs text-[#66736A] mt-1 leading-relaxed line-clamp-2">
                        {art.excerpt}
                      </p>
                    </div>

                    <div className="mt-2 text-[11px] font-semibold text-[#0F4D2E] flex items-center gap-1">
                      <span>Selengkapnya</span>
                      <ChevronRight className="w-3.5 h-3.5" />
                    </div>
                  </div>
                </a>
              ))}
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};
