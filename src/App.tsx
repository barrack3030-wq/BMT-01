import React, { useState, useRef } from 'react';
import { Page } from './types';
import { Navbar } from './components/Navbar';
import { Footer } from './components/Footer';
import { RegistrationModal } from './components/RegistrationModal';
import { HomePage } from './pages/HomePage';
import { ProfilePage } from './pages/ProfilePage';
import { NewsPage } from './pages/NewsPage';
import { LocationPage } from './pages/LocationPage';
import { FaqPage } from './pages/FaqPage';

export default function App() {
  const [activePage, setActivePage] = useState<Page>('home');
  const [registerModalOpen, setRegisterModalOpen] = useState(false);
  const [modalDefaultService, setModalDefaultService] = useState<'simpanan' | 'pembiayaan' | 'qurban'>('simpanan');
  const [modalDefaultAmount, setModalDefaultAmount] = useState<number | undefined>(11000000);

  const productsRef = useRef<HTMLDivElement>(null);

  const handleOpenRegister = (
    service: 'simpanan' | 'pembiayaan' | 'qurban' = 'simpanan',
    amount?: number
  ) => {
    setModalDefaultService(service);
    setModalDefaultAmount(amount);
    setRegisterModalOpen(true);
  };

  const handleScrollToProducts = () => {
    if (activePage !== 'home') {
      setActivePage('home');
      setTimeout(() => {
        if (productsRef.current) {
          productsRef.current.scrollIntoView({ behavior: 'smooth' });
        }
      }, 100);
    } else {
      if (productsRef.current) {
        productsRef.current.scrollIntoView({ behavior: 'smooth' });
      }
    }
  };

  return (
    <div className="min-h-screen flex flex-col bg-[#F8F9F6] text-[#17201B] selection:bg-[#0F4D2E] selection:text-white">
      {/* Top Banner Notice (Dignified Institutional Bar) */}
      <aside aria-label="Pengumuman Resmi" className="bg-[#083B24] text-white text-[11px] font-normal py-2 px-4 text-center border-b border-[#0F4D2E]">
        <div className="max-w-7xl mx-auto flex items-center justify-center sm:justify-between gap-4">
          <span className="hidden sm:inline tracking-wider uppercase text-white/80">
            KANTOR PUSAT TOILI
          </span>
          <span className="text-[#EAF4EC] font-medium">
            Senin – Jumat 08.00 – 16.00 WITA • WhatsApp: +62 821-9876-5432
          </span>
        </div>
      </aside>

      {/* Main Institutional Navbar */}
      <Navbar
        activePage={activePage}
        onNavigate={(page) => setActivePage(page)}
        onOpenRegister={() => handleOpenRegister('simpanan')}
        onScrollToProducts={handleScrollToProducts}
      />

      {/* Main Body View */}
      <main className="flex-1">
        <div key={activePage} className="spa-page-enter">
          {activePage === 'home' && (
            <HomePage
              onOpenRegister={handleOpenRegister}
              productsRef={productsRef}
              onNavigateToNews={() => {
                setActivePage('news');
                window.scrollTo({ top: 0, behavior: 'smooth' });
              }}
            />
          )}

          {activePage === 'profile' && (
            <ProfilePage
              onBackToHome={() => {
                setActivePage('home');
                window.scrollTo({ top: 0, behavior: 'smooth' });
              }}
              onOpenRegister={() => handleOpenRegister('simpanan')}
            />
          )}

          {activePage === 'news' && (
            <NewsPage
              onBackToHome={() => {
                setActivePage('home');
                window.scrollTo({ top: 0, behavior: 'smooth' });
              }}
            />
          )}

          {activePage === 'location' && (
            <LocationPage
              onBackToHome={() => {
                setActivePage('home');
                window.scrollTo({ top: 0, behavior: 'smooth' });
              }}
              onOpenRegister={() => handleOpenRegister('simpanan')}
            />
          )}

          {activePage === 'faq' && (
            <FaqPage
              onBackToHome={() => {
                setActivePage('home');
                window.scrollTo({ top: 0, behavior: 'smooth' });
              }}
              onOpenRegister={() => handleOpenRegister('simpanan')}
            />
          )}
        </div>
      </main>

      {/* Institutional Footer */}
      <Footer
        onNavigate={(page) => setActivePage(page)}
        onScrollToProducts={handleScrollToProducts}
      />

      {/* Registration & Consultation Modal */}
      <RegistrationModal
        isOpen={registerModalOpen}
        onClose={() => setRegisterModalOpen(false)}
        defaultService={modalDefaultService}
        defaultAmount={modalDefaultAmount}
      />
    </div>
  );
}
