import React, { useState } from 'react';
import { ArrowRight, ChevronRight, Calculator, MessageSquare, ShieldCheck, CheckCircle2, Quote } from 'lucide-react';
import { ARTICLES_DATA, PRODUCTS_DATA, TESTIMONIALS_DATA } from '../data/content';
import { SimulationState } from '../types';
import { useIntersectionObserver } from '../hooks/useIntersectionObserver';

interface HomePageProps {
  onOpenRegister: (service?: 'simpanan' | 'pembiayaan' | 'qurban', amount?: number) => void;
  productsRef: React.RefObject<HTMLDivElement | null>;
  onNavigateToNews?: () => void;
}

export const HomePage: React.FC<HomePageProps> = ({ onOpenRegister, productsRef, onNavigateToNews }) => {
  // Intersection observers for smooth scroll reveal
  const section2Observer = useIntersectionObserver(0.06);
  const testimonialsObserver = useIntersectionObserver(0.06);
  const section3Observer = useIntersectionObserver(0.06);

  // Simulator state
  const [simulation, setSimulation] = useState<SimulationState>({
    type: 'simpanan',
    amount: 11000000,
    tenorMonths: 12,
  });

  const handleScrollToProducts = () => {
    if (productsRef.current) {
      productsRef.current.scrollIntoView({ behavior: 'smooth' });
    }
  };

  // Calculations
  const formatRupiah = (val: number) => {
    return new Intl.NumberFormat('id-ID', {
      style: 'currency',
      currency: 'IDR',
      maximumFractionDigits: 0,
    }).format(val);
  };

  const annualReturnRate = 0.085;
  const memberNisbahRatio = 0.65;
  const projectedProfitPerYear = simulation.amount * annualReturnRate * memberNisbahRatio;
  const projectedProfitPerMonth = Math.round(projectedProfitPerYear / 12);
  const totalProjectedProfit = Math.round((projectedProfitPerYear / 12) * simulation.tenorMonths);

  const monthlyMarginRate = 0.008;
  const totalMargin = simulation.amount * monthlyMarginRate * simulation.tenorMonths;
  const totalFinancingRepayment = simulation.amount + totalMargin;
  const monthlyFinancingInstallment = Math.round(totalFinancingRepayment / simulation.tenorMonths);

  return (
    <div className="w-full flex flex-col">
      {/* ========================================================
          SECTION 1 — HERO FULL-WIDTH BACKGROUND FOTO TOILI
          ======================================================== */}
      <section className="relative w-full min-h-[500px] sm:min-h-[560px] lg:min-h-[620px] flex items-center bg-[#083B24] overflow-hidden border-b border-[#0F4D2E]">
        {/* Full-width Photographic Background with Subtle Fade and Slow Cinematic Movement */}
        <div
          className="absolute inset-0 bg-cover bg-center bg-no-repeat hero-cinematic-bg animate-hero-bg"
          style={{
            backgroundImage: `url('https://images.unsplash.com/photo-1500382017468-9049fed747ef?auto=format&fit=crop&w=2000&q=85')`,
          }}
          aria-hidden="true"
        />

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

        {/* Content Container (Left-aligned, max 1200px / 7xl) */}
        <div className="relative z-10 w-full max-w-7xl mx-auto px-6 sm:px-8 lg:px-12 py-14 sm:py-20 lg:py-24">
          <div className="max-w-3xl space-y-6">
            <h1 className="font-headline font-bold text-3xl sm:text-5xl lg:text-[54px] text-white leading-[1.15] tracking-tight animate-hero-fade">
              Berjuang Bersama Ummat <br />
              <span className="text-[#EAF4EC]">Keluar Dari Riba</span>
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
        className={`relative bg-[#083B24] text-white py-14 sm:py-20 border-b border-[#0F4D2E] overflow-hidden section-reveal ${
          section2Observer.isVisible ? 'is-visible' : ''
        }`}
      >
        <div
          className="absolute inset-0 bg-cover bg-center opacity-10 mix-blend-luminosity pointer-events-none"
          style={{
            backgroundImage: `url('https://images.unsplash.com/photo-1450133064473-71024230f91b?auto=format&fit=crop&w=1600&q=80')`,
          }}
          aria-hidden="true"
        />

        {/* Islamic Geometric Tessellation Texture on Dark Green */}
        <div
          className="absolute inset-0 pointer-events-none islamic-pattern-dark pattern-mask-radial"
          aria-hidden="true"
        />

        <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="mb-12">
            <h2 className="font-headline font-bold text-3xl sm:text-4xl lg:text-5xl text-white tracking-tight">
              Produk & Layanan
            </h2>
            <p className="text-sm sm:text-base text-white/80 mt-2 max-w-xl font-normal leading-relaxed">
              Pilihan simpanan dan pembiayaan syariah sesuai kebutuhan usaha, pertanian, dan keluarga.
            </p>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
            {/* LEFT: 3 FORMAL FINANCIAL PRODUCT CARDS (Col Span 7) */}
            <div className="lg:col-span-7 space-y-5">
              {PRODUCTS_DATA.map((product) => (
                <div
                  key={product.id}
                  className="bg-white text-[#17201B] border border-[#DDE5DF] card-shadow card-hover-subtle p-6 sm:p-7 grid grid-cols-1 sm:grid-cols-12 gap-6 items-center hover:border-[#0F4D2E] transition-all group"
                >
                  <div className="sm:col-span-5 h-44 sm:h-full min-h-[160px] border border-[#DDE5DF] overflow-hidden bg-gray-100">
                    <img
                      src={product.image}
                      alt={product.imageAlt}
                      className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-103"
                      loading="lazy"
                    />
                  </div>

                  <div className="sm:col-span-7 flex flex-col justify-between h-full">
                    <div>
                      <div className="inline-block bg-[#EAF4EC] text-[#0F4D2E] text-[10px] font-semibold uppercase tracking-wider px-2.5 py-0.5 border border-[#DDE5DF] mb-2">
                        {product.badge}
                      </div>

                      <h3 className="font-headline font-bold text-xl sm:text-2xl text-[#17201B] leading-tight group-hover:text-[#0F4D2E] transition-colors">
                        {product.title}
                      </h3>

                      <p className="text-xs text-[#66736A] mt-2 leading-relaxed">
                        {product.description}
                      </p>

                      <ul className="mt-3 space-y-1.5 text-xs text-[#17201B]">
                        {product.features.map((feat, fIdx) => (
                          <li key={fIdx} className="flex items-center gap-2">
                            <span className="w-1.5 h-1.5 bg-[#0F4D2E] shrink-0" />
                            <span>{feat}</span>
                          </li>
                        ))}
                      </ul>
                    </div>

                    <div className="mt-5 pt-3 border-t border-[#DDE5DF] flex items-center justify-between">
                      <span className="text-[11px] font-semibold text-[#0F4D2E]">
                        {product.akad}
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
                        className="btn-institutional bg-[#0F4D2E] text-white text-[11px] font-semibold uppercase tracking-wider px-3.5 py-1.5 border border-[#083B24] hover:bg-[#083B24] flex items-center gap-1 cursor-pointer"
                      >
                        <span>PILIH</span>
                        <ArrowRight className="w-3 h-3 btn-arrow-icon" />
                      </button>
                    </div>
                  </div>
                </div>
              ))}
            </div>

            {/* RIGHT: REFINED FINANCIAL CALCULATOR (Col Span 5) */}
            <div className="lg:col-span-5">
              <div className="bg-[#F8F9F6] text-[#17201B] border border-[#DDE5DF] card-shadow p-6 sm:p-8 relative overflow-hidden">
                {/* Micro Islamic Geometric Texture */}
                <div
                  className="absolute inset-0 pointer-events-none islamic-pattern-light pattern-mask-corner"
                  aria-hidden="true"
                />

                <div className="relative z-10">
                  <div className="flex items-center justify-between border-b border-[#DDE5DF] pb-4 mb-5">
                    <div>
                      <h3 className="font-headline font-bold text-2xl text-[#17201B] tracking-tight">
                        Simulasi
                      </h3>
                      <p className="text-xs text-[#66736A] mt-0.5">
                        Perhitungan estimasi bagi hasil atau angsuran.
                      </p>
                    </div>
                    <div className="p-2.5 bg-white border border-[#DDE5DF] card-shadow-sm">
                      <Calculator className="w-5 h-5 text-[#0F4D2E]" />
                    </div>
                  </div>

                  {/* Toggle Buttons */}
                  <div className="grid grid-cols-2 gap-2 mb-5">
                    <button
                      type="button"
                      onClick={() => setSimulation({ ...simulation, type: 'simpanan' })}
                      className={`text-xs font-semibold uppercase tracking-wider py-2.5 px-2 border transition-colors cursor-pointer ${
                        simulation.type === 'simpanan'
                          ? 'bg-[#0F4D2E] text-white border-[#083B24]'
                          : 'bg-white text-[#17201B] border-[#DDE5DF] hover:bg-[#EAF4EC]'
                      }`}
                    >
                      Simpanan
                    </button>

                    <button
                      type="button"
                      onClick={() => setSimulation({ ...simulation, type: 'pembiayaan' })}
                      className={`text-xs font-semibold uppercase tracking-wider py-2.5 px-2 border transition-colors cursor-pointer ${
                        simulation.type === 'pembiayaan'
                          ? 'bg-[#0F4D2E] text-white border-[#083B24]'
                          : 'bg-white text-[#17201B] border-[#DDE5DF] hover:bg-[#EAF4EC]'
                      }`}
                    >
                      Pembiayaan
                    </button>
                  </div>

                  {/* Nominal Display & Slider */}
                  <div className="space-y-4 bg-white p-5 border border-[#DDE5DF] card-shadow-sm">
                    <div className="flex items-baseline justify-between">
                      <label className="text-xs font-semibold uppercase tracking-wider text-[#66736A]">
                        Nominal
                      </label>
                      <span className="font-headline font-bold text-2xl text-[#0F4D2E]">
                        {formatRupiah(simulation.amount)}
                      </span>
                    </div>

                    <div className="pt-1">
                      <input
                        type="range"
                        min={3000000}
                        max={50000000}
                        step={500000}
                        value={simulation.amount}
                        onChange={(e) =>
                          setSimulation({ ...simulation, amount: Number(e.target.value) })
                        }
                        className="square-slider w-full cursor-pointer"
                        aria-label="Pilih nominal simulasi"
                      />
                      <div className="flex justify-between text-[11px] font-medium text-[#66736A] mt-2">
                        <span>Rp 3 juta</span>
                        <span>Rp 50 juta</span>
                      </div>
                    </div>

                    <div className="pt-3 border-t border-[#DDE5DF]">
                      <label className="block text-xs font-semibold uppercase tracking-wider text-[#66736A] mb-2">
                        Jangka Waktu
                      </label>
                      <div className="grid grid-cols-4 gap-1.5">
                        {[6, 12, 24, 36].map((months) => (
                          <button
                            type="button"
                            key={months}
                            onClick={() => setSimulation({ ...simulation, tenorMonths: months })}
                            className={`py-1.5 text-xs font-semibold border transition-colors cursor-pointer ${
                              simulation.tenorMonths === months
                                ? 'bg-[#0F4D2E] text-white border-[#083B24]'
                                : 'bg-[#F8F9F6] text-[#17201B] border-[#DDE5DF] hover:border-[#0F4D2E]'
                            }`}
                          >
                            {months} Bln
                          </button>
                        ))}
                      </div>
                    </div>
                  </div>

                  {/* Calculation Output Box */}
                  <div className="mt-5 p-4 bg-[#EAF4EC] border border-[#DDE5DF] text-xs space-y-2">
                    {simulation.type === 'simpanan' ? (
                      <>
                        <div className="flex justify-between items-center text-[#17201B]">
                          <span>Nisbah Bagi Hasil Anggota:</span>
                          <span className="font-semibold text-[#0F4D2E]">65%</span>
                        </div>
                        <div className="flex justify-between items-center text-[#17201B]">
                          <span>Estimasi Bagi Hasil / Bulan:</span>
                          <span className="font-semibold text-[#17201B]">
                            ± {formatRupiah(projectedProfitPerMonth)}
                          </span>
                        </div>
                        <div className="flex justify-between items-center text-[#17201B]">
                          <span>Total Bagi Hasil ({simulation.tenorMonths} Bulan):</span>
                          <span className="font-semibold text-[#0F4D2E]">
                            ± {formatRupiah(totalProjectedProfit)}
                          </span>
                        </div>
                        <div className="pt-2 border-t border-[#DDE5DF] flex justify-between items-center text-[11px] text-[#66736A]">
                          <span>Biaya Administrasi:</span>
                          <span className="font-semibold text-[#0F4D2E]">Rp 0</span>
                        </div>
                      </>
                    ) : (
                      <>
                        <div className="flex justify-between items-center text-[#17201B]">
                          <span>Akad:</span>
                          <span className="font-semibold text-[#0F4D2E]">Murabahah (Jual Beli)</span>
                        </div>
                        <div className="flex justify-between items-center text-[#17201B]">
                          <span>Estimasi Angsuran / Bulan:</span>
                          <span className="font-semibold text-[#0F4D2E] text-sm">
                            {formatRupiah(monthlyFinancingInstallment)}
                          </span>
                        </div>
                        <div className="flex justify-between items-center text-[#17201B]">
                          <span>Total Angsuran ({simulation.tenorMonths} Bulan):</span>
                          <span className="font-semibold text-[#17201B]">
                            {formatRupiah(totalFinancingRepayment)}
                          </span>
                        </div>
                        <div className="pt-2 border-t border-[#DDE5DF] flex justify-between items-center text-[11px] text-[#66736A]">
                          <span>Denda Keterlambatan:</span>
                          <span className="font-semibold text-[#0F4D2E]">Tidak Ada</span>
                        </div>
                      </>
                    )}
                  </div>

                  <div className="mt-5">
                    <button
                      onClick={() =>
                        onOpenRegister(simulation.type, simulation.amount)
                      }
                      className="btn-institutional w-full bg-[#0F4D2E] text-white text-xs font-semibold uppercase tracking-wider py-3.5 px-4 border border-[#083B24] hover:bg-[#083B24] flex items-center justify-center gap-2 card-shadow-sm cursor-pointer"
                    >
                      <span>AJUKAN SESUAI SIMULASI</span>
                      <ArrowRight className="w-4 h-4 btn-arrow-icon" />
                    </button>
                    <p className="text-[10px] text-[#66736A] text-center mt-2">
                      *Estimasi ilustratif berdasar nisbah atau margin yang berlaku.
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ========================================================
          SECTION 3 — TESTIMONI ANGGOTA
          ======================================================== */}
      <section
        ref={testimonialsObserver.ref as any}
        className={`bg-[#F8F9F6] border-b border-[#DDE5DF] py-14 sm:py-20 relative overflow-hidden section-reveal ${
          testimonialsObserver.isVisible ? 'is-visible' : ''
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
              <span className="text-xs font-semibold text-[#0F4D2E] uppercase tracking-wider">
                PENGALAMAN & AMANAH
              </span>
              <h2 className="font-headline font-bold text-3xl sm:text-4xl text-[#17201B] tracking-tight mt-1">
                Testimoni Anggota
              </h2>
              <p className="text-xs sm:text-sm text-[#66736A] mt-1 max-w-lg leading-relaxed">
                Cerita nyata para petani, pedagang pasar, dan pelaku usaha di wilayah Toili yang merasakan kemudahan layanan syariah.
              </p>
            </div>

            <div className="hidden md:flex items-center gap-2 px-3 py-1.5 bg-white border border-[#DDE5DF] text-xs text-[#0F4D2E] font-medium card-shadow-sm">
              <ShieldCheck className="w-4 h-4 text-[#0F4D2E]" />
              <span>Dikelola Amanah Sesuai Syariah</span>
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 sm:gap-8">
            {TESTIMONIALS_DATA.map((item) => (
              <div
                key={item.id}
                className="bg-white border border-[#DDE5DF] card-shadow p-6 sm:p-7 flex flex-col justify-between hover:border-[#0F4D2E] transition-all relative group"
              >
                <div>
                  <div className="flex items-center justify-between border-b border-[#DDE5DF] pb-3 mb-4">
                    <Quote className="w-7 h-7 text-[#0F4D2E]/35 group-hover:text-[#0F4D2E] transition-colors" />
                    <span className="inline-flex items-center gap-1.5 px-2 py-0.5 text-[11px] font-semibold bg-[#EAF4EC] text-[#0F4D2E] border border-[#DDE5DF]">
                      <ShieldCheck className="w-3 h-3 text-[#0F4D2E]" />
                      Anggota Terdaftar
                    </span>
                  </div>

                  <blockquote className="text-xs sm:text-sm text-[#17201B] leading-relaxed italic mb-4 font-normal">
                    "{item.quote}"
                  </blockquote>

                  <div className="text-[11px] text-[#66736A] py-2.5 px-3 bg-[#F8F9F6] border border-[#DDE5DF] mb-5">
                    <span className="font-semibold text-[#0F4D2E]">Layanan: </span>
                    <span>{item.productUsed}</span>
                  </div>
                </div>

                <div className="flex items-center gap-3 pt-4 border-t border-[#DDE5DF]">
                  {item.avatarImage ? (
                    <img
                      src={item.avatarImage}
                      alt={item.name}
                      className="w-11 h-11 object-cover border border-[#DDE5DF] shrink-0"
                      loading="lazy"
                    />
                  ) : (
                    <div className="w-11 h-11 bg-[#EAF4EC] text-[#0F4D2E] border border-[#DDE5DF] flex items-center justify-center font-bold text-xs shrink-0">
                      {item.avatarText}
                    </div>
                  )}
                  <div>
                    <h4 className="font-headline font-bold text-sm sm:text-base text-[#17201B] leading-snug">
                      {item.name}
                    </h4>
                    <p className="text-xs text-[#66736A]">{item.role}</p>
                    <div className="flex items-center gap-2 text-[11px] text-[#0F4D2E] mt-0.5">
                      <span>{item.location}</span>
                      <span>•</span>
                      <span className="text-[#66736A]">{item.memberSince}</span>
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>

          {/* Consultation / Callout Bar */}
          <div className="mt-8 p-5 sm:p-6 bg-white border border-[#DDE5DF] card-shadow-sm flex flex-col sm:flex-row items-center justify-between gap-4">
            <div className="flex items-start sm:items-center gap-3.5">
              <div className="w-9 h-9 bg-[#EAF4EC] border border-[#DDE5DF] flex items-center justify-center text-[#0F4D2E] shrink-0">
                <CheckCircle2 className="w-5 h-5 text-[#0F4D2E]" />
              </div>
              <div>
                <h4 className="font-headline font-bold text-sm text-[#17201B]">
                  Ingin Bergabung Menjadi Bagian dari Anggota BMT?
                </h4>
                <p className="text-xs text-[#66736A] mt-0.5">
                  Dapatkan kemudahan simpanan dan pembiayaan modal usaha tanpa biaya tersembunyi.
                </p>
              </div>
            </div>

            <button
              onClick={() => onOpenRegister()}
              className="btn-institutional shrink-0 w-full sm:w-auto bg-[#0F4D2E] text-white text-xs font-semibold uppercase tracking-wider px-6 py-3 border border-[#083B24] hover:bg-[#083B24] flex items-center justify-center gap-2 cursor-pointer"
            >
              <span>DAFTAR SEKARANG</span>
              <ArrowRight className="w-3.5 h-3.5 btn-arrow-icon" />
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
            {onNavigateToNews && (
              <button
                onClick={onNavigateToNews}
                className="self-start sm:self-auto text-xs font-semibold uppercase tracking-wider text-[#0F4D2E] hover:text-[#083B24] transition-colors flex items-center gap-1.5 cursor-pointer group"
              >
                <span>LIHAT SEMUA BERITA</span>
                <ArrowRight className="w-3.5 h-3.5 btn-arrow-icon" />
              </button>
            )}
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
            {/* FEATURED ARTICLE (Col Span 7) */}
            <div
              onClick={onNavigateToNews}
              className="lg:col-span-7 bg-white border border-[#DDE5DF] card-shadow card-hover-subtle flex flex-col justify-between group transition-all hover:border-[#0F4D2E] cursor-pointer"
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
            </div>

            {/* 3 STACKED ARTICLES (Col Span 5) */}
            <div className="lg:col-span-5 space-y-4">
              {ARTICLES_DATA.slice(1, 4).map((art) => (
                <div
                  key={art.id}
                  onClick={onNavigateToNews}
                  className="bg-white border border-[#DDE5DF] card-shadow-sm p-4 sm:p-5 flex flex-col sm:flex-row gap-4 group hover:border-[#0F4D2E] hover:bg-[#F8F9F6] transition-all cursor-pointer"
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
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};
