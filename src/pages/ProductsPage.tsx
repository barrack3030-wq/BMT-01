import React from 'react';
import { ArrowRight, CheckCircle2, ShieldCheck } from 'lucide-react';
import { PRODUCTS_DATA } from '../data/content';

interface ProductsPageProps {
  onBackToHome: () => void;
  onOpenRegister: (service?: 'simpanan' | 'pembiayaan' | 'qurban', amount?: number) => void;
}

export const ProductsPage: React.FC<ProductsPageProps> = ({ onBackToHome, onOpenRegister }) => {
  const products = [...PRODUCTS_DATA].filter((product: any) => product.active !== false).sort((a: any, b: any) => (Number(a.order) || 999) - (Number(b.order) || 999));

  return (
    <div className="w-full bg-[#F4F6F3] min-h-screen">
      <section className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12 sm:py-16">
        <div className="mb-8">
          <button
            type="button"
            onClick={onBackToHome}
            className="text-[11px] font-semibold uppercase tracking-wider text-[#0F4D2E] hover:text-[#083B24] flex items-center gap-2"
          >
            ← Kembali ke Beranda
          </button>
        </div>
        <div className="flex items-center gap-3 mb-8">
          <ShieldCheck className="w-5 h-5 text-[#0F4D2E]" />
          <p className="text-xs font-semibold uppercase tracking-[0.16em] text-[#0F4D2E]">
            Semua Produk
          </p>
        </div>

        {products.length ? (
          <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-5 lg:gap-6">
            {products.map((product, index) => (
              <article key={product.id} className="group bg-white border border-[#DDE5DF] card-shadow card-hover-subtle overflow-hidden flex flex-col">
                <div className="relative h-52 sm:h-56 overflow-hidden bg-[#E9EEEA] border-b border-[#DDE5DF]">
                  {product.image ? (
                    <img src={product.image} alt={product.imageAlt || product.title} className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-[1.035]" loading="lazy" />
                  ) : (
                    <div className="w-full h-full flex items-center justify-center text-sm text-[#66736A]">Gambar produk belum tersedia</div>
                  )}
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
                    <span className="inline-block text-[10px] font-medium uppercase tracking-wider text-white/80 mb-1">{product.akad}</span>
                    <h2 className="font-headline font-bold text-[22px] sm:text-2xl text-white leading-tight">{product.title}</h2>
                  </div>
                </div>

                <div className="p-5 sm:p-6 flex flex-col flex-1">
                  <p className="text-sm text-[#66736A] leading-relaxed">{product.description}</p>
                  <div className="mt-5 pt-4 border-t border-[#E6EBE7]">
                    <p className="text-[10px] font-semibold uppercase tracking-[0.15em] text-[#0F4D2E] mb-3">Yang Anda Dapatkan</p>
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
                    <span className="text-[11px] text-[#66736A]">Layanan anggota</span>
                    <button
                      type="button"
                      onClick={() => onOpenRegister(
                        product.id === 'simpanan-mudharabah' ? 'simpanan' :
                        product.id === 'pembiayaan-syariah' ? 'pembiayaan' : 'qurban'
                      )}
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
        ) : (
          <div className="bg-white border border-[#DDE5DF] p-8 text-center text-sm text-[#66736A]">
            Belum ada produk aktif.
          </div>
        )}
      </section>
    </div>
  );
};
