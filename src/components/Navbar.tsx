import React, { useState } from 'react';
import { Page } from '../types';
import { Menu, X, ArrowRight } from 'lucide-react';

interface NavbarProps {
  activePage: Page;
  onNavigate: (page: Page) => void;
  onOpenRegister: () => void;
  onScrollToProducts: () => void;
}

export const Navbar: React.FC<NavbarProps> = ({
  activePage,
  onNavigate,
  onOpenRegister,
  onScrollToProducts,
}) => {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  const handleNavClick = (page: Page, isProducts = false) => {
    setMobileMenuOpen(false);
    if (isProducts) {
      if (activePage !== 'home') {
        onNavigate('home');
        setTimeout(() => {
          onScrollToProducts();
        }, 120);
      } else {
        onScrollToProducts();
      }
    } else {
      onNavigate(page);
      window.scrollTo({ top: 0, behavior: 'smooth' });
    }
  };

  return (
    <header className="sticky top-4 z-50 px-4 sm:px-6 w-full max-w-7xl mx-auto">
      <div className="bg-white border border-[#DDE5DF] card-shadow flex items-center justify-between px-6 sm:px-8 py-3.5 transition-all">
        {/* Logo Left */}
        <button
          onClick={() => handleNavClick('home')}
          className="flex items-center gap-3.5 text-left focus:outline-none focus-visible:ring-1 focus-visible:ring-[#0F4D2E] group"
          aria-label="Kembali ke Beranda BMT Al-Muhajirin Toili"
        >
          <div className="w-9 h-9 bg-[#0F4D2E] flex items-center justify-center text-white font-bold text-lg select-none border border-[#083B24]">
            B
          </div>
          <div>
            <span className="block font-headline font-bold text-base sm:text-lg tracking-tight text-[#17201B] leading-none group-hover:text-[#0F4D2E] transition-colors">
              BMT AL-MUHAJIRIN TOILI
            </span>
            <span className="block text-[11px] font-medium tracking-wider uppercase text-[#0F4D2E] mt-1">
              KSPPS Syariah Toili
            </span>
          </div>
        </button>

        {/* Desktop Navigation Links */}
        <nav className="hidden lg:flex items-center gap-7" aria-label="Navigasi Utama">
          <button
            onClick={() => handleNavClick('home')}
            className={`text-xs font-semibold tracking-wider uppercase py-2 nav-link-anim ${
              activePage === 'home' ? 'text-[#0F4D2E] font-bold active' : 'text-[#66736A] hover:text-[#0F4D2E]'
            }`}
          >
            BERANDA
          </button>
          <button
            onClick={() => handleNavClick('home', true)}
            className="text-xs font-semibold tracking-wider uppercase py-2 text-[#66736A] hover:text-[#0F4D2E] nav-link-anim"
          >
            PRODUK & LAYANAN
          </button>
          <button
            onClick={() => handleNavClick('profile')}
            className={`text-xs font-semibold tracking-wider uppercase py-2 nav-link-anim ${
              activePage === 'profile' ? 'text-[#0F4D2E] font-bold active' : 'text-[#66736A] hover:text-[#0F4D2E]'
            }`}
          >
            PROFIL
          </button>
          <button
            onClick={() => handleNavClick('news')}
            className={`text-xs font-semibold tracking-wider uppercase py-2 nav-link-anim ${
              activePage === 'news' ? 'text-[#0F4D2E] font-bold active' : 'text-[#66736A] hover:text-[#0F4D2E]'
            }`}
          >
            BERITA
          </button>
          <button
            onClick={() => handleNavClick('location')}
            className={`text-xs font-semibold tracking-wider uppercase py-2 nav-link-anim ${
              activePage === 'location' ? 'text-[#0F4D2E] font-bold active' : 'text-[#66736A] hover:text-[#0F4D2E]'
            }`}
          >
            LOKASI KANTOR
          </button>
          <button
            onClick={() => handleNavClick('faq')}
            className={`text-xs font-semibold tracking-wider uppercase py-2 nav-link-anim ${
              activePage === 'faq' ? 'text-[#0F4D2E] font-bold active' : 'text-[#66736A] hover:text-[#0F4D2E]'
            }`}
          >
            FAQ
          </button>
        </nav>

        {/* Desktop Right CTA Button */}
        <div className="hidden lg:flex items-center">
          <button
            onClick={onOpenRegister}
            className="btn-institutional bg-[#0F4D2E] text-white text-xs font-semibold tracking-wider uppercase px-5 py-2.5 border border-[#083B24] hover:bg-[#083B24] flex items-center gap-2 card-shadow-sm cursor-pointer group"
          >
            <span>DAFTAR ANGGOTA</span>
            <ArrowRight className="w-3.5 h-3.5 btn-arrow-icon" />
          </button>
        </div>

        {/* Mobile Toggle Button */}
        <div className="flex lg:hidden items-center gap-2.5">
          <button
            onClick={onOpenRegister}
            className="btn-institutional bg-[#0F4D2E] text-white text-[11px] font-semibold tracking-wider uppercase px-3 py-2 border border-[#083B24] flex items-center gap-1 group"
          >
            <span>DAFTAR</span>
            <ArrowRight className="w-3 h-3 btn-arrow-icon" />
          </button>
          <button
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            className="w-9 h-9 bg-white border border-[#DDE5DF] flex items-center justify-center text-[#17201B] hover:bg-[#F8F9F6] transition-colors"
            aria-label="Toggle menu navigasi"
          >
            {mobileMenuOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
          </button>
        </div>
      </div>

      {/* Mobile Dropdown Menu */}
      {mobileMenuOpen && (
        <div className="lg:hidden mt-2 bg-white border border-[#DDE5DF] card-shadow p-5 flex flex-col gap-2 animate-fadeIn">
          <button
            onClick={() => handleNavClick('home')}
            className={`text-left text-xs font-semibold uppercase tracking-wider px-3.5 py-2.5 border-l-2 ${
              activePage === 'home'
                ? 'border-[#0F4D2E] bg-[#EAF4EC] text-[#0F4D2E] font-bold'
                : 'border-transparent text-[#17201B] hover:bg-[#F8F9F6]'
            }`}
          >
            BERANDA
          </button>
          <button
            onClick={() => handleNavClick('home', true)}
            className="text-left text-xs font-semibold uppercase tracking-wider px-3.5 py-2.5 border-l-2 border-transparent text-[#17201B] hover:bg-[#F8F9F6]"
          >
            PRODUK & LAYANAN
          </button>
          <button
            onClick={() => handleNavClick('profile')}
            className={`text-left text-xs font-semibold uppercase tracking-wider px-3.5 py-2.5 border-l-2 ${
              activePage === 'profile'
                ? 'border-[#0F4D2E] bg-[#EAF4EC] text-[#0F4D2E] font-bold'
                : 'border-transparent text-[#17201B] hover:bg-[#F8F9F6]'
            }`}
          >
            PROFIL
          </button>
          <button
            onClick={() => handleNavClick('news')}
            className={`text-left text-xs font-semibold uppercase tracking-wider px-3.5 py-2.5 border-l-2 ${
              activePage === 'news'
                ? 'border-[#0F4D2E] bg-[#EAF4EC] text-[#0F4D2E] font-bold'
                : 'border-transparent text-[#17201B] hover:bg-[#F8F9F6]'
            }`}
          >
            BERITA
          </button>
          <button
            onClick={() => handleNavClick('location')}
            className={`text-left text-xs font-semibold uppercase tracking-wider px-3.5 py-2.5 border-l-2 ${
              activePage === 'location'
                ? 'border-[#0F4D2E] bg-[#EAF4EC] text-[#0F4D2E] font-bold'
                : 'border-transparent text-[#17201B] hover:bg-[#F8F9F6]'
            }`}
          >
            LOKASI KANTOR
          </button>
          <button
            onClick={() => handleNavClick('faq')}
            className={`text-left text-xs font-semibold uppercase tracking-wider px-3.5 py-2.5 border-l-2 ${
              activePage === 'faq'
                ? 'border-[#0F4D2E] bg-[#EAF4EC] text-[#0F4D2E] font-bold'
                : 'border-transparent text-[#17201B] hover:bg-[#F8F9F6]'
            }`}
          >
            FAQ
          </button>

          <div className="pt-3 border-t border-[#DDE5DF] mt-2">
            <button
              onClick={() => {
                setMobileMenuOpen(false);
                onOpenRegister();
              }}
              className="w-full bg-[#0F4D2E] text-white text-xs font-semibold uppercase tracking-wider py-3 border border-[#083B24] flex items-center justify-center gap-2"
            >
              <span>DAFTAR ANGGOTA SEKARANG</span>
              <ArrowRight className="w-4 h-4" />
            </button>
          </div>
        </div>
      )}
    </header>
  );
};
