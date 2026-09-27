import React, { useState } from 'react';
import { ARTICLES_DATA, Article } from '../data/content';
import { ArrowRight, Calendar, Tag, X, ChevronRight } from 'lucide-react';

interface NewsPageProps {
  onBackToHome: () => void;
}

export const NewsPage: React.FC<NewsPageProps> = ({ onBackToHome }) => {
  const [selectedCategory, setSelectedCategory] = useState<string>('Semua');
  const [readingArticle, setReadingArticle] = useState<Article | null>(null);

  const categories = ['Semua', 'Pemberdayaan', 'Laporan', 'Layanan', 'Pembiayaan', 'Sosial'];

  const filteredArticles =
    selectedCategory === 'Semua'
      ? ARTICLES_DATA
      : ARTICLES_DATA.filter((a) => a.category.toLowerCase() === selectedCategory.toLowerCase());

  return (
    <div className="pt-8 sm:pt-14 pb-16 sm:pb-20 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto space-y-12 sm:space-y-16">
      {/* Page Header */}
      <div className="relative overflow-hidden bg-[#EAF4EC] border border-[#DDE5DF] card-shadow p-8 sm:p-10 flex flex-col sm:flex-row sm:items-end justify-between gap-6">
        {/* Subtle Islamic Geometric Corner Texture */}
        <div
          className="absolute inset-0 pointer-events-none islamic-pattern-light pattern-mask-corner"
          aria-hidden="true"
        />

        <div className="relative z-10">
          <h1 className="font-headline font-bold text-3xl sm:text-4xl text-[#17201B] tracking-tight">
            Berita & Kegiatan
          </h1>
          <p className="text-xs sm:text-sm text-[#66736A] mt-2 max-w-xl leading-relaxed">
            Catatan kegiatan operasional, laporan tahunan, dan program kemitraan BMT Al-Muhajirin Toili.
          </p>
        </div>

        <button
          onClick={onBackToHome}
          className="btn-institutional relative z-10 self-start sm:self-auto bg-white text-[#17201B] text-xs font-semibold uppercase tracking-wider px-5 py-2.5 border border-[#DDE5DF] hover:bg-[#F8F9F6] hover:border-[#0F4D2E] cursor-pointer"
        >
          &larr; KEMBALI KE BERANDA
        </button>
      </div>

      {/* Category Filter */}
      <div className="flex flex-wrap items-center gap-2 border-b border-[#DDE5DF] pb-4">
        {categories.map((cat) => (
          <button
            key={cat}
            onClick={() => setSelectedCategory(cat)}
            className={`text-xs font-semibold uppercase tracking-wider px-4 py-2 border transition-colors cursor-pointer ${
              selectedCategory === cat
                ? 'bg-[#0F4D2E] text-white border-[#083B24]'
                : 'bg-white text-[#17201B] border-[#DDE5DF] hover:bg-[#F8F9F6]'
            }`}
          >
            {cat}
          </button>
        ))}
      </div>

      {/* Articles Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
        {filteredArticles.map((article) => (
          <div
            key={article.id}
            className="bg-white border border-[#DDE5DF] card-shadow card-hover-subtle flex flex-col justify-between group hover:border-[#0F4D2E] transition-all"
          >
            <div>
              {/* Image */}
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

              {/* Text Info */}
              <div className="p-6">
                <div className="flex items-center gap-2 text-xs text-[#66736A] mb-2">
                  <Calendar className="w-3.5 h-3.5 text-[#0F4D2E]" />
                  <span>{article.date}</span>
                </div>

                <h3 className="font-headline font-bold text-lg text-[#17201B] leading-snug group-hover:text-[#0F4D2E] transition-colors">
                  {article.title}
                </h3>

                <p className="text-xs text-[#66736A] mt-2.5 leading-relaxed line-clamp-3">
                  {article.excerpt}
                </p>
              </div>
            </div>

            <div className="p-6 pt-0">
              <button
                onClick={() => setReadingArticle(article)}
                className="btn-institutional w-full bg-[#F8F9F6] text-[#0F4D2E] text-xs font-semibold uppercase tracking-wider py-2.5 px-4 border border-[#DDE5DF] hover:bg-[#0F4D2E] hover:text-white flex items-center justify-center gap-1.5 cursor-pointer group/btn"
              >
                <span>BACA SELENGKAPNYA</span>
                <ChevronRight className="w-3.5 h-3.5 transition-transform duration-200 group-hover/btn:translate-x-1" />
              </button>
            </div>
          </div>
        ))}
      </div>

      {/* Article Detail Reading Modal */}
      {readingArticle && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/40 backdrop-blur-[2px] animate-fadeIn">
          <div className="relative w-full max-w-2xl bg-white border border-[#DDE5DF] card-shadow max-h-[90vh] overflow-y-auto">
            {/* Header */}
            <div className="p-6 border-b border-[#DDE5DF] flex items-start justify-between gap-4">
              <div>
                <span className="inline-block px-2.5 py-0.5 bg-[#EAF4EC] text-[#0F4D2E] text-[10px] font-semibold uppercase tracking-wider mb-2">
                  {readingArticle.category} • {readingArticle.date}
                </span>
                <h2 className="font-headline font-bold text-xl sm:text-2xl text-[#17201B] leading-snug">
                  {readingArticle.title}
                </h2>
              </div>
              <button
                onClick={() => setReadingArticle(null)}
                className="w-8 h-8 bg-gray-100 hover:bg-gray-200 text-[#17201B] flex items-center justify-center transition-colors cursor-pointer shrink-0"
                aria-label="Tutup artikel"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            {/* Image */}
            <div className="w-full aspect-[16/9] overflow-hidden bg-gray-100">
              <img
                src={readingArticle.image}
                alt={readingArticle.imageAlt}
                className="w-full h-full object-cover"
              />
            </div>

            {/* Content Body */}
            <div className="p-6 sm:p-8 space-y-4 text-sm sm:text-base text-[#17201B] leading-relaxed">
              {readingArticle.contentParagraphs ? (
                readingArticle.contentParagraphs.map((paragraph, idx) => (
                  <p key={idx} className="text-[#17201B]">
                    {paragraph}
                  </p>
                ))
              ) : (
                <p className="text-[#17201B]">{readingArticle.excerpt}</p>
              )}
            </div>

            {/* Footer */}
            <div className="p-6 border-t border-[#DDE5DF] bg-[#F8F9F6] flex items-center justify-between">
              <span className="text-xs text-[#66736A]">
                KSPPS BMT Al-Muhajirin Toili
              </span>
              <button
                onClick={() => setReadingArticle(null)}
                className="bg-[#0F4D2E] text-white text-xs font-semibold uppercase tracking-wider py-2.5 px-5 border border-[#083B24] hover:bg-[#083B24] transition-colors cursor-pointer"
              >
                TUTUP
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};
