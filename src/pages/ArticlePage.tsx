import React, { useEffect } from 'react';
import { ArrowLeft, Calendar, ChevronRight } from 'lucide-react';
import { ARTICLES_DATA, Article } from '../data/content';
import { articlePath, SITE_URL, SITE_BASE_PATH } from '../utils/seo';

interface ArticlePageProps {
  article: Article;
}

function upsertMeta(attribute: 'name' | 'property', key: string, content: string) {
  let element = document.head.querySelector<HTMLMetaElement>(`meta[${attribute}="${key}"]`);
  if (!element) {
    element = document.createElement('meta');
    element.setAttribute(attribute, key);
    document.head.appendChild(element);
  }
  element.content = content;
}

function upsertLink(rel: string, href: string) {
  let element = document.head.querySelector<HTMLLinkElement>(`link[rel="${rel}"]`);
  if (!element) {
    element = document.createElement('link');
    element.rel = rel;
    document.head.appendChild(element);
  }
  element.href = href;
}

export const ArticlePage: React.FC<ArticlePageProps> = ({ article }) => {
  const canonical = `${SITE_URL}${articlePath(article.title)}`;
  const description = article.excerpt;
  const image = article.image;

  const relatedArticles = ARTICLES_DATA
    .filter((item) => item.id !== article.id)
    .sort((a, b) => {
      const aSameCategory = a.category === article.category ? 0 : 1;
      const bSameCategory = b.category === article.category ? 0 : 1;
      return aSameCategory - bSameCategory;
    })
    .slice(0, 3);

  useEffect(() => {
    document.title = `${article.title} | BMT Al-Muhajirin Toili`;

    upsertMeta('name', 'description', description);
    upsertMeta('property', 'og:title', article.title);
    upsertMeta('property', 'og:description', description);
    upsertMeta('property', 'og:type', 'article');
    upsertMeta('property', 'og:url', canonical);
    upsertMeta('property', 'og:image', image);
    upsertMeta('property', 'article:published_time', article.date);
    upsertMeta('property', 'article:section', article.category);
    upsertMeta('name', 'twitter:title', article.title);
    upsertMeta('name', 'twitter:description', description);
    upsertMeta('name', 'twitter:image', image);
    upsertLink('canonical', canonical);

    const jsonLdId = 'article-jsonld';
    document.getElementById(jsonLdId)?.remove();
    const script = document.createElement('script');
    script.id = jsonLdId;
    script.type = 'application/ld+json';
    script.textContent = JSON.stringify({
      '@context': 'https://schema.org',
      '@type': 'NewsArticle',
      headline: article.title,
      description,
      image: [image],
      datePublished: article.date,
      articleSection: article.category,
      mainEntityOfPage: canonical,
      author: {
        '@type': 'Organization',
        name: 'BMT Al-Muhajirin Toili',
      },
      publisher: {
        '@type': 'Organization',
        name: 'BMT Al-Muhajirin Toili',
        url: SITE_URL,
      },
    });
    document.head.appendChild(script);

    return () => {
      document.getElementById(jsonLdId)?.remove();
    };
  }, [article, canonical, description, image]);

  return (
    <article className="w-full bg-[#F8F9F6] article-shell">
      <header className="border-b border-[#DDE5DF] bg-white article-header-reveal">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-8 sm:py-12">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-10 items-start">
          <div className="lg:col-span-8">
            <figure>
              <img
                src={article.image}
                alt={article.imageAlt}
                className="w-full aspect-[16/9] object-cover border border-[#DDE5DF] article-image-reveal"
              />
              <figcaption className="mt-3 text-xs text-[#66736A]">
                {article.imageAlt}
              </figcaption>
            </figure>

            <div className="mt-10 article-content-reveal">
              <div className="space-y-6 text-base sm:text-lg text-[#17201B] leading-[1.9]">
                {(article.contentParagraphs ?? [article.excerpt]).map((paragraph, index) => (
                  <p key={index}>{paragraph}</p>
                ))}
              </div>

              {article.tags && article.tags.length > 0 && (
                <div className="mt-10 pt-6 border-t border-[#DDE5DF] flex flex-wrap gap-2">
                  {article.tags.map((tag) => (
                    <span
                      key={tag}
                      className="px-3 py-1.5 bg-white border border-[#DDE5DF] text-xs font-medium text-[#66736A]"
                    >
                      {tag}
                    </span>
                  ))}
                </div>
              )}

              <div className="mt-12 pt-6 border-t border-[#DDE5DF] flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
                <div>
                  <p className="text-sm font-semibold text-[#17201B]">
                    BMT Al-Muhajirin Toili
                  </p>
                  <p className="text-xs text-[#66736A] mt-1">
                    KSPPS Syariah Toili
                  </p>
                </div>

                <a
                  href={SITE_BASE_PATH + '/berita/'}
                  className="inline-flex items-center justify-center gap-2 bg-[#0F4D2E] text-white text-xs font-semibold uppercase tracking-wider px-5 py-3 border border-[#083B24] hover:bg-[#083B24] transition-colors"
                >
                  Semua Berita
                  <ChevronRight className="w-4 h-4" />
                </a>
              </div>
            </div>
          </div>

          <aside className="lg:col-span-4 lg:sticky lg:top-28 article-related-reveal" aria-label="Artikel terkait">
            <div className="bg-white border border-[#DDE5DF] card-shadow p-5 sm:p-6">
              <div className="pb-4 border-b border-[#DDE5DF]">
                <span className="text-[10px] font-semibold uppercase tracking-[0.18em] text-[#0F4D2E]">
                  BMT Al-Muhajirin Toili
                </span>
                <h2 className="font-headline font-bold text-xl text-[#17201B] mt-1">
                  Artikel Terkait
                </h2>
                <p className="text-xs text-[#66736A] mt-1.5 leading-relaxed">
                  Baca informasi lain yang masih relevan dengan artikel ini.
                </p>
              </div>

              <div className="mt-5 space-y-5">
                {relatedArticles.map((related) => (
                  <a
                    key={related.id}
                    href={articlePath(related.title)}
                    className="group block related-article-card"
                  >
                    <div className="flex gap-3">
                      <div className="w-24 h-20 shrink-0 overflow-hidden border border-[#DDE5DF] bg-gray-100">
                        <img
                          src={related.image}
                          alt={related.imageAlt}
                          className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
                          loading="lazy"
                        />
                      </div>

                      <div className="min-w-0">
                        <div className="flex items-center gap-2 text-[10px] text-[#66736A] mb-1">
                          <span className="font-semibold text-[#0F4D2E] uppercase tracking-wide">
                            {related.category}
                          </span>
                          <span>•</span>
                          <time>{related.date}</time>
                        </div>

                        <h3 className="font-headline font-bold text-sm leading-snug text-[#17201B] group-hover:text-[#0F4D2E] transition-colors line-clamp-3">
                          {related.title}
                        </h3>

                        <div className="mt-2 inline-flex items-center gap-1 text-[11px] font-semibold text-[#0F4D2E]">
                          Baca artikel
                          <ChevronRight className="w-3.5 h-3.5 transition-transform duration-200 group-hover:translate-x-1" />
                        </div>
                      </div>
                    </div>
                  </a>
                ))}
              </div>

              <a
                href={SITE_BASE_PATH + '/berita/'}
                className="mt-6 pt-4 border-t border-[#DDE5DF] flex items-center justify-between text-xs font-semibold uppercase tracking-wider text-[#0F4D2E] hover:text-[#083B24]"
              >
                Semua berita
                <ChevronRight className="w-4 h-4" />
              </a>
            </div>
          </aside>
        </div>
      </div>
    </article>
  );
};
