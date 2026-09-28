import React from 'react';
import { Page } from '../types';
import { MapPin, MessageSquare, ShieldCheck, Instagram, Facebook } from 'lucide-react';

interface FooterProps {
  onNavigate: (page: Page) => void;
  onScrollToProducts: () => void;
}

export const Footer: React.FC<FooterProps> = ({ onNavigate, onScrollToProducts }) => {
  return (
    <footer className="relative bg-[#083B24] text-white border-t border-[#0F4D2E] overflow-hidden">
      {/* Subtle Islamic Geometric Foundation Texture (5-6% Opacity) */}
      <div
        className="absolute inset-0 pointer-events-none islamic-pattern-footer"
        aria-hidden="true"
      />

      <div className="relative z-10 max-w-7xl mx-auto px-6 lg:px-8 py-12">
        <div className="grid grid-cols-1 md:grid-cols-12 gap-10 items-start">
          {/* Brand & Identity */}
          <div className="md:col-span-5 space-y-4">
            <div className="flex items-center">
              <img
                src="/BMT-01/images/logo/logo%20BMT.png"
                alt="Logo BMT Al-Muhajirin"
                className="w-14 h-14 object-contain"
                loading="lazy"
              />
            </div>

            <p className="text-xs text-[#E2E8E4] leading-relaxed max-w-sm">
              Koperasi simpan pinjam dan pembiayaan syariah yang melayani simpanan anggota dan permodalan usaha riil di wilayah Toili.
            </p>

            <div className="pt-1">
              <span className="inline-flex items-center gap-2 px-3 py-1.5 text-[11px] font-medium tracking-wider uppercase bg-[#0F4D2E] text-[#EAF4EC] border border-white/10">
                <ShieldCheck className="w-3.5 h-3.5 text-white" />
                Pengawasan Dewan Pengawas Syariah (DPS)
              </span>
            </div>

            <div className="pt-2 flex items-center gap-2.5">
              <a
                href="https://www.instagram.com/bmtalmuhajirin_official/"
                target="_blank"
                rel="noopener noreferrer"
                aria-label="Instagram BMT Al-Muhajirin Official"
                className="group inline-flex items-center gap-2 border border-white/15 bg-white/5 px-3 py-2 text-[11px] text-white/80 hover:bg-white/10 hover:text-white hover:border-white/30 transition-all"
              >
                <Instagram className="w-4 h-4" />
                <span>Instagram</span>
              </a>

              <a
                href="https://web.facebook.com/profile.php?id=61573199156163"
                target="_blank"
                rel="noopener noreferrer"
                aria-label="Facebook BMT Al-Muhajirin"
                className="group inline-flex items-center gap-2 border border-white/15 bg-white/5 px-3 py-2 text-[11px] text-white/80 hover:bg-white/10 hover:text-white hover:border-white/30 transition-all"
              >
                <Facebook className="w-4 h-4" />
                <span>Facebook</span>
              </a>
            </div>
          </div>

          {/* Quick Navigation */}
          <div className="md:col-span-3 space-y-3">
            <h4 className="text-xs font-semibold uppercase tracking-wider text-[#EAF4EC] border-b border-white/10 pb-2">
              NAVIGASI
            </h4>
            <ul className="space-y-2 text-xs font-normal text-white/80">
              <li>
                <button
                  onClick={() => {
                    onNavigate('home');
                    window.scrollTo({ top: 0, behavior: 'smooth' });
                  }}
                  className="hover:text-white transition-colors"
                >
                  Beranda
                </button>
              </li>
              <li>
                <button
                  onClick={() => {
                    onNavigate('home');
                    setTimeout(onScrollToProducts, 100);
                  }}
                  className="hover:text-white transition-colors"
                >
                  Produk & Layanan
                </button>
              </li>
              <li>
                <button
                  onClick={() => {
                    onNavigate('profile');
                    window.scrollTo({ top: 0, behavior: 'smooth' });
                  }}
                  className="hover:text-white transition-colors"
                >
                  Profil Lembaga
                </button>
              </li>
              <li>
                <button
                  onClick={() => {
                    onNavigate('news');
                    window.scrollTo({ top: 0, behavior: 'smooth' });
                  }}
                  className="hover:text-white transition-colors"
                >
                  Berita & Kegiatan
                </button>
              </li>
              <li>
                <button
                  onClick={() => {
                    onNavigate('location');
                    window.scrollTo({ top: 0, behavior: 'smooth' });
                  }}
                  className="hover:text-white transition-colors"
                >
                  Lokasi Kantor
                </button>
              </li>
              <li>
                <button
                  onClick={() => {
                    onNavigate('faq');
                    window.scrollTo({ top: 0, behavior: 'smooth' });
                  }}
                  className="hover:text-white transition-colors"
                >
                  Pertanyaan Umum (FAQ)
                </button>
              </li>
            </ul>
          </div>

          {/* Contact & Branch Info */}
          <div className="md:col-span-4 space-y-3">
            <h4 className="text-xs font-semibold uppercase tracking-wider text-[#EAF4EC] border-b border-white/10 pb-2">
              KANTOR PUSAT & PELAYANAN
            </h4>
            <div className="space-y-2.5 text-xs text-white/80">
              <div className="flex items-start gap-2.5">
                <MapPin className="w-4 h-4 text-[#EAF4EC] shrink-0 mt-0.5" />
                <span>
                  <strong className="text-white">Kantor Pusat Toili:</strong> Jl. Trans Sulawesi, Toili, Kabupaten Banggai, Sulawesi Tengah
                </span>
              </div>
              <div className="flex items-start gap-2.5">
                <MapPin className="w-4 h-4 text-[#EAF4EC] shrink-0 mt-0.5" />
                <span>
                  <strong className="text-white">Cabang Luwuk:</strong> Jl. Trans Sulawesi Luwuk
                </span>
              </div>
              <div className="flex items-center gap-2.5 pt-0.5">
                <MessageSquare className="w-4 h-4 text-[#EAF4EC] shrink-0" />
                <span>
                  <strong className="text-white">WhatsApp:</strong> +62 821-9876-5432
                </span>
              </div>
            </div>
          </div>
        </div>

        {/* Bottom divider */}
        <div className="mt-10 pt-6 border-t border-white/10 flex flex-col sm:flex-row items-center justify-between gap-3 text-[11px] text-white/60">
          <p>© 2026 KSPPS BMT Al-Muhajirin Toili. Seluruh hak cipta dilindungi.</p>
          <p className="tracking-wide uppercase text-[10px] text-white/50">
            Toili, Kabupaten Banggai, Sulawesi Tengah
          </p>
        </div>
      </div>
    </footer>
  );
};
