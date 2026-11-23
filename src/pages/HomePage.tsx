import React, { useEffect, useState } from 'react';
import {
  ArrowRight, ChevronLeft, ChevronRight, Handshake,
  ShieldCheck, Users, Sprout, HeartHandshake, BookOpenCheck, Building2,
  Heart, Headset, Star, Quote
} from 'lucide-react';
import { ARTICLES_DATA, TESTIMONIALS_DATA, SITE_SETTINGS } from '../data/content';
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
  const section3Observer = useIntersectionObserver(0.06);
  const testimonialObserver = useIntersectionObserver(0.08);

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
    onNavigateToProducts?.();
  };

  const featuredArticles = ARTICLES_DATA.filter((article) => article && article.title);
  const leadArticle = featuredArticles[0];
  const otherArticles = featuredArticles.slice(1, 4);

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

      {/* WHY CHOOSE US */}
      <section className="relative py-20 sm:py-24 lg:py-28 bg-[#FBFCFA]">
        <div className="max-w-7xl mx-auto px-5 sm:px-8 lg:px-12">
          <div className="max-w-3xl mb-12 sm:mb-16">
            <div className="flex items-center gap-3 text-[10px] sm:text-xs font-bold tracking-[0.18em] uppercase text-[#A47E36] mb-4">
              <span className="w-8 h-px bg-[#C6A45D]" /> Mengapa Memilih Kami
            </div>
            <h2 className="font-headline text-3xl sm:text-4xl lg:text-5xl font-bold leading-tight tracking-[-0.025em] text-[#123D2B]">
              Tumbuh Bersama, Membangun Ekonomi yang Lebih Berkah
            </h2>
            <p className="mt-5 max-w-2xl text-sm sm:text-base leading-relaxed text-[#64736A]">
              BMT Al-Muhajirin hadir sebagai mitra keuangan syariah yang mendukung pertumbuhan ekonomi umat melalui layanan simpanan dan pembiayaan, dengan semangat kebersamaan dan prinsip muamalah syariah.
            </p>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-5">
            {[
              { icon: Handshake, title: 'Berlandaskan Syariah', text: 'Mengutamakan prinsip muamalah syariah dalam layanan keuangan.' },
              { icon: ShieldCheck, title: 'Mengutamakan Kepercayaan', text: 'Membangun hubungan jangka panjang melalui pelayanan yang bertanggung jawab.' },
              { icon: Users, title: 'Berorientasi pada Anggota', text: 'Menempatkan kebutuhan dan perkembangan anggota sebagai perhatian utama.' },
              { icon: Sprout, title: 'Mendukung Usaha Produktif', text: 'Mendorong perkembangan usaha dan aktivitas ekonomi masyarakat.' },
              { icon: Heart, title: 'Semangat Kebersamaan', text: 'Mengembangkan ekonomi umat melalui semangat saling mendukung.' },
              { icon: Headset, title: 'Pelayanan Bersahabat', text: 'Memberikan informasi produk dan layanan secara komunikatif dan mudah dipahami.' },
            ].map(({ icon: Icon, title, text }, index) => (
              <article key={title} className="group bg-white border border-[#E1E9E2] rounded-2xl p-6 sm:p-7 hover:border-[#B9D2C0] hover:shadow-[0_14px_34px_rgba(17,55,34,0.07)] transition-all duration-300">
                <span className="w-11 h-11 rounded-xl bg-[#EAF4ED] text-[#0F6842] flex items-center justify-center group-hover:bg-[#0F4D2E] group-hover:text-white transition-colors">
                  <Icon className="w-5 h-5" />
                </span>
                <h3 className="mt-5 font-headline text-lg font-bold text-[#123D2B]">{title}</h3>
                <p className="mt-2 text-sm leading-relaxed text-[#68776E]">{text}</p>
              </article>
            ))}
          </div>

          <div className="grid lg:grid-cols-2 gap-6 sm:gap-8 mt-16 sm:mt-20">
            <section className="rounded-2xl border border-[#E1E9E2] bg-white p-6 sm:p-8 lg:p-9">
              <div className="flex items-center gap-3 mb-5">
                <span className="w-10 h-10 rounded-xl bg-[#F5F0E3] text-[#9A7736] flex items-center justify-center"><Star className="w-5 h-5" /></span>
                <div>
                  <p className="text-[10px] font-bold tracking-[0.16em] uppercase text-[#A47E36]">Apresiasi & Pencapaian</p>
                  <h3 className="font-headline text-xl sm:text-2xl font-bold text-[#123D2B]">Penghargaan</h3>
                </div>
              </div>
              <p className="text-sm leading-relaxed text-[#68776E]">
                Setiap pencapaian menjadi bagian dari perjalanan BMT Al-Muhajirin dalam melayani anggota dan masyarakat. Dokumentasi penghargaan resmi akan ditampilkan pada ruang ini.
              </p>
              <div className="mt-6 min-h-32 rounded-xl border border-dashed border-[#D7E2D9] bg-[#F8FBF8] flex flex-col items-center justify-center text-center px-5 py-6">
                <BookOpenCheck className="w-6 h-6 text-[#7A9A83]" />
                <span className="mt-3 text-xs font-semibold text-[#45624E]">Galeri penghargaan</span>
                <span className="mt-1 text-[11px] text-[#829087]">Menunggu dokumentasi dan informasi resmi</span>
              </div>
            </section>

            <section className="rounded-2xl border border-[#E1E9E2] bg-white p-6 sm:p-8 lg:p-9">
              <div className="flex items-center gap-3 mb-5">
                <span className="w-10 h-10 rounded-xl bg-[#EAF4ED] text-[#0F6842] flex items-center justify-center"><Building2 className="w-5 h-5" /></span>
                <div>
                  <p className="text-[10px] font-bold tracking-[0.16em] uppercase text-[#A47E36]">Kolaborasi & Kemitraan</p>
                  <h3 className="font-headline text-xl sm:text-2xl font-bold text-[#123D2B]">Mitra Bisnis</h3>
                </div>
              </div>
              <p className="text-sm leading-relaxed text-[#68776E]">
                Kolaborasi menjadi bagian penting dalam memperkuat ekosistem ekonomi dan memperluas manfaat bagi anggota serta masyarakat.
              </p>
              <div className="mt-6 min-h-32 rounded-xl border border-dashed border-[#D7E2D9] bg-[#F8FBF8] flex flex-col items-center justify-center text-center px-5 py-6">
                <Handshake className="w-6 h-6 text-[#7A9A83]" />
                <span className="mt-3 text-xs font-semibold text-[#45624E]">Jaringan mitra BMT</span>
                <span className="mt-1 text-[11px] text-[#829087]">Logo dan profil mitra ditampilkan setelah data terverifikasi</span>
              </div>
            </section>
          </div>

          <div className="mt-10 sm:mt-12 flex flex-col sm:flex-row sm:items-center justify-between gap-5 rounded-2xl bg-[#EFF6F0] border border-[#E0EAE1] p-6 sm:p-8">
            <div>
              <h3 className="font-headline text-xl sm:text-2xl font-bold text-[#123D2B]">Temukan Layanan yang Sesuai Kebutuhan Anda</h3>
              <p className="mt-2 text-sm text-[#68776E]">Kenali pilihan simpanan dan pembiayaan syariah BMT Al-Muhajirin.</p>
            </div>
            <button onClick={() => onNavigateToProducts?.()} className="shrink-0 inline-flex items-center justify-center gap-2 rounded-full bg-[#0F4D2E] hover:bg-[#083B24] text-white px-6 py-3.5 text-xs sm:text-sm font-bold transition-colors">
              Produk & Layanan <ArrowRight className="w-4 h-4" />
            </button>
          </div>
        </div>
      </section>

      {/* TESTIMONIALS */}
      <section
        ref={testimonialObserver.ref as any}
        className={`relative py-16 sm:py-20 lg:py-24 bg-[#EFF6F0] section-reveal ${testimonialObserver.isVisible ? 'is-visible' : ''}`}
      >
        <div className="max-w-7xl mx-auto px-5 sm:px-8 lg:px-12">
          <div className="max-w-3xl mb-9 sm:mb-11">
            <div className="flex items-center gap-3 text-[10px] sm:text-xs font-bold tracking-[0.18em] uppercase text-[#A47E36] mb-3">
              <span className="w-8 h-px bg-[#C6A45D]" /> Cerita Anggota
            </div>
            <h2 className="font-headline text-3xl sm:text-4xl font-bold text-[#123D2B]">Kepercayaan yang Tumbuh Bersama</h2>
            <p className="mt-3 text-sm text-[#68776E]">Pengalaman anggota dalam memanfaatkan layanan BMT Al-Muhajirin.</p>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-5">
            {TESTIMONIALS_DATA.filter((item: any) => item && item.active !== false && item.quote).slice(0, 3).map((item) => (
              <article key={item.id} className="rounded-2xl bg-white border border-[#E0EAE1] p-6 sm:p-7 flex flex-col shadow-[0_5px_22px_rgba(17,55,34,0.04)]">
                <Quote className="w-7 h-7 text-[#C6A45D]" />
                <p className="mt-4 text-sm leading-relaxed text-[#526258] flex-1">“{item.quote}”</p>
                <div className="mt-6 pt-5 border-t border-[#E8EEE9] flex items-center gap-3">
                  {item.avatarImage ? (
                    <img src={item.avatarImage} alt="" className="w-11 h-11 rounded-full object-cover bg-[#EAF4ED]" loading="lazy" />
                  ) : (
                    <span className="w-11 h-11 rounded-full bg-[#EAF4ED] text-[#0F6842] flex items-center justify-center text-xs font-bold">{item.avatarText || item.name?.slice(0, 2)}</span>
                  )}
                  <span className="min-w-0">
                    <strong className="block text-sm text-[#123D2B]">{item.name}</strong>
                    <span className="block mt-0.5 text-[11px] text-[#748078]">{item.role}</span>
                    <span className="block mt-0.5 text-[10px] text-[#9A7736]">{item.location}</span>
                  </span>
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
