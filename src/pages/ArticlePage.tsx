import React, { useEffect } from 'react';
import { ArrowLeft, Calendar, ChevronRight } from 'lucide-react';
import { Article } from '../data/content';
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
    <article className="w-full bg-[#F8F9F6]">
      <header className="border-b border-[#DDE5DF] bg-white">
        <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 py-8 sm:py-12">
          <a
            href={`${SITE_BASE_PATH}/berita/`}
            className="inline-flex items-center gap-2 text-xs font-semibold uppercase tracking-wider text-[#0F4D2E] hover:text-[#083B24] transition-colors"
          >
            <ArrowLeft className="w-4 h-4" />
            Kembali ke Berita
          </a>

          <div className="mt-8">
            <div className="flex flex-wrap items-center gap-3 text-xs text-[#66736A]">
              <span className="bg-[#EAF4EC] text-[#0F4D2E] px-2.5 py-1 font-semibold uppercase tracking-wider">
                {article.category}
              </span>
              <span className="inline-flex items-center gap-1.5">
                <Calendar className="w-3.5 h-3.5 text-[#0F4D2E]" />
                {article.date}
              </span>
            </div>

            <h1 className="mt-4 max-w-4xl font-headline font-bold text-3xl sm:text-5xl text-[#17201B] leading-tight tracking-tight">
              {article.title}
            </h1>

            <p className="mt-5 max-w-3xl text-base sm:text-lg text-[#66736A] leading-relaxed">
              {article.excerpt}
            </p>
          </div>
        </div>
      </header>

      <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 py-8 sm:py-12">
        <figure>
          <img
            src={article.image}
            alt={article.imageAlt}
            className="w-full aspect-[16/9] object-cover border border-[#DDE5DF]"
          />
          <figcaption className="mt-3 text-xs text-[#66736A]">
            {article.imageAlt}
          </figcaption>
        </figure>

        <div className="max-w-3xl mx-auto mt-10">
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
              href={`${SITE_BASE_PATH}/berita/`}
              className="inline-flex items-center justify-center gap-2 bg-[#0F4D2E] text-white text-xs font-semibold uppercase tracking-wider px-5 py-3 border border-[#083B24] hover:bg-[#083B24] transition-colors"
            >
              Semua Berita
              <ChevronRight className="w-4 h-4" />
            </a>
          </div>
        </div>
      </div>
    </article>
  );
};
