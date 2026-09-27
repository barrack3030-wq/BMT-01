import React, { useState } from 'react';
import { ARTICLES_DATA } from '../data/content';
import { ArrowRight, Calendar, ChevronRight } from 'lucide-react';
import { articlePath } from '../utils/seo';

interface NewsPageProps {
  onBackToHome: () => void;
}

export const NewsPage: React.FC<NewsPageProps> = ({ onBackToHome }) => {
  const [selectedCategory, setSelectedCategory] = useState<string>('Semua');
  const categories = ['Semua', 'Pemberdayaan', 'Laporan', 'Layanan', 'Pembiayaan', 'Sosial'];

  const filteredArticles =
    selectedCategory === 'Semua'
      ? ARTICLES_DATA
      : ARTICLES_DATA.filter((a) => a.category.toLowerCase() === selectedCategory.toLowerCase());

  return (
    <div className="pt-8 sm:pt-14 pb-16 sm:pb-20 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto space-y-12 sm:space-y-16">
      <div className="relative overflow-hidden bg-[#EAF4EC] border border-[#DDE5DF] card-shadow p-8 sm:p-10 flex flex-col sm:flex-row sm:items-end justify-between gap-6">
        <div className="absolute inset-0 pointer-events-none islamic-pattern-light pattern-mask-corner" aria-hidden="true" />

        <div className="relative z-10">
          <div className="text-[11px] font-semibold uppercase tracking-widest text-[#0F4D2E] mb-2">
            BMT Al-Muhajirin Toili
          </div>
          <h1 className="font-headline font-bold text-3xl sm:text-4xl text-[#17201B] tracking-tight">
            Berita & Kegiatan
          </h1>
          <p className="text-xs sm:text-sm text-[#66736A] mt-2 max-w-xl leading-relaxed">
            Catatan kegiatan operasional, laporan, layanan anggota, dan program pemberdayaan BMT Al-Muhajirin Toili.
          </p>
        </div>

        <button
          onClick={onBackToHome}
          className="btn-institutional relative z-10 self-start sm:self-auto bg-white text-[#17201B] text-xs font-semibold uppercase tracking-wider px-5 py-2.5 border border-[#DDE5DF] hover:bg-[#F8F9F6] hover:border-[#0F4D2E] cursor-pointer"
        >
          &larr; KEMBALI KE BERANDA
        </button>
      </div>

      <nav aria-label="Filter berita" className="flex flex-wrap items-center gap-2 border-b border-[#DDE5DF] pb-4">
        {categories.map((cat) => (
          <button
            key={cat}
            onClick={() => setSelectedCategory(cat)}
            aria-pressed={selectedCategory === cat}
            className={`text-xs font-semibold uppercase tracking-wider px-4 py-2 border transition-colors cursor-pointer ${
              selectedCategory === cat
                ? 'bg-[#0F4D2E] text-white border-[#083B24]'
                : 'bg-white text-[#17201B] border-[#DDE5DF] hover:bg-[#F8F9F6]'
            }`}
          >
            {cat}
          </button>
        ))}
      </nav>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
        {filteredArticles.map((article) => {
          const href = articlePath(article.title);

          return (
            <article
              key={article.id}
              className="bg-white border border-[#DDE5DF] card-shadow card-hover-subtle flex flex-col justify-between group hover:border-[#0F4D2E] transition-all"
            >
              <div>
                <a href={href} aria-label={`Baca: ${article.title}`} className="block">
                  <div className="relative aspect-[16/10] border-b border-[#DDE5DF] overflow-hidden bg-gray-100">
                    <img
                      src={article.image}
                      alt={article.imageAlt}
                      className="w-full h-full object-cover group-hover:scale-103 transition-transform duration-500"
                      loading="lazy"
                    />
                    <div className="absolute top-3 left-3 bg-[#0F4D2E] text-white text-[10px] font-semibold uppercase tracking-wider px-2.5 py-0.5 border border-[#083B24]">
                      {article.category}
                    </div>
                  </div>
                </a>

                <div className="p-6">
                  <div className="flex items-center gap-2 text-xs text-[#66736A] mb-2">
                    <Calendar className="w-3.5 h-3.5 text-[#0F4D2E]" />
                    <time>{article.date}</time>
                  </div>

                  <h2 className="font-headline font-bold text-lg text-[#17201B] leading-snug group-hover:text-[#0F4D2E] transition-colors">
                    <a href={href}>{article.title}</a>
                  </h2>

                  <p className="text-xs text-[#66736A] mt-2.5 leading-relaxed line-clamp-3">
                    {article.excerpt}
                  </p>
                </div>
              </div>

              <div className="p-6 pt-0">
                <a
                  href={href}
                  className="btn-institutional w-full bg-[#F8F9F6] text-[#0F4D2E] text-xs font-semibold uppercase tracking-wider py-2.5 px-4 border border-[#DDE5DF] hover:bg-[#0F4D2E] hover:text-white flex items-center justify-center gap-1.5 cursor-pointer group/btn"
                >
                  <span>BACA SELENGKAPNYA</span>
                  <ChevronRight className="w-3.5 h-3.5 transition-transform duration-200 group-hover/btn:translate-x-1" />
                </a>
              </div>
            </article>
          );
        })}
      </div>

      <div className="border-t border-[#DDE5DF] pt-6 flex items-center justify-between">
        <a
          href={`/BMT-01/`}
          className="inline-flex items-center gap-2 text-xs font-semibold uppercase tracking-wider text-[#0F4D2E] hover:text-[#083B24]"
        >
          <ArrowRight className="w-3.5 h-3.5 rotate-180" />
          Kembali ke beranda
        </a>
        <span className="text-xs text-[#66736A]">KSPPS Syariah Toili</span>
      </div>
    </div>
  );
};
