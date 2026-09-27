import React, { useState } from 'react';
import { FAQ_DATA } from '../data/content';
import { Plus, Minus, MessageCircle } from 'lucide-react';

interface FaqPageProps {
  onBackToHome: () => void;
  onOpenRegister: () => void;
}

export const FaqPage: React.FC<FaqPageProps> = ({ onBackToHome, onOpenRegister }) => {
  const [openIds, setOpenIds] = useState<string[]>(['faq-1', 'faq-3']);

  const toggleItem = (id: string) => {
    if (openIds.includes(id)) {
      setOpenIds(openIds.filter((item) => item !== id));
    } else {
      setOpenIds([...openIds, id]);
    }
  };

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
            Pertanyaan Umum (FAQ)
          </h1>
          <p className="text-xs sm:text-sm text-[#66736A] mt-2 max-w-xl leading-relaxed">
            Jawaban seputar simpanan, pembiayaan, dan tata cara keanggotaan BMT Al-Muhajirin Toili.
          </p>
        </div>

        <button
          onClick={onBackToHome}
          className="btn-institutional relative z-10 self-start sm:self-auto bg-white text-[#17201B] text-xs font-semibold uppercase tracking-wider px-5 py-2.5 border border-[#DDE5DF] hover:bg-[#F8F9F6] hover:border-[#0F4D2E] cursor-pointer"
        >
          &larr; KEMBALI KE BERANDA
        </button>
      </div>

      {/* Accordion List with Smooth Expand Animation */}
      <div className="bg-white border border-[#DDE5DF] card-shadow divide-y divide-[#DDE5DF] max-w-5xl mx-auto">
        {FAQ_DATA.map((item, index) => {
          const isOpen = openIds.includes(item.id);
          return (
            <div
              key={item.id}
              className="transition-colors hover:bg-[#F8F9F6]/50"
            >
              <button
                onClick={() => toggleItem(item.id)}
                className="w-full text-left p-6 sm:p-7 flex items-center justify-between gap-6 focus:outline-none focus-visible:bg-[#EAF4EC] group cursor-pointer"
                aria-expanded={isOpen}
              >
                <div className="flex items-center gap-4">
                  <span className="text-xs font-semibold text-[#0F4D2E] tracking-wider">
                    {String(index + 1).padStart(2, '0')}
                  </span>
                  <h3 className="font-headline font-semibold text-base sm:text-lg text-[#17201B] leading-snug group-hover:text-[#0F4D2E] transition-colors">
                    {item.question}
                  </h3>
                </div>

                <div className={`w-8 h-8 shrink-0 border flex items-center justify-center transition-all duration-200 ${
                  isOpen ? 'bg-[#0F4D2E] text-white border-[#083B24]' : 'bg-[#F8F9F6] text-[#0F4D2E] border-[#DDE5DF] group-hover:border-[#0F4D2E]'
                }`}>
                  {isOpen ? <Minus className="w-4 h-4" /> : <Plus className="w-4 h-4" />}
                </div>
              </button>

              <div
                className={`grid transition-all duration-300 ease-in-out ${
                  isOpen ? 'grid-rows-[1fr] opacity-100' : 'grid-rows-[0fr] opacity-0'
                }`}
              >
                <div className="overflow-hidden">
                  <div className="px-6 sm:px-7 pb-7 pt-1 text-xs sm:text-sm text-[#66736A] leading-relaxed pl-14">
                    {item.answer}
                  </div>
                </div>
              </div>
            </div>
          );
        })}
      </div>

      {/* Bantuan Layanan */}
      <div className="relative overflow-hidden bg-white border border-[#DDE5DF] card-shadow p-8 sm:p-9 flex flex-col sm:flex-row items-center justify-between gap-6 max-w-5xl mx-auto">
        {/* Micro Islamic Geometric Corner Texture */}
        <div
          className="absolute inset-0 pointer-events-none islamic-pattern-light pattern-mask-corner"
          aria-hidden="true"
        />

        <div className="relative z-10 flex items-start gap-4">
          <div className="p-3 bg-[#EAF4EC] border border-[#DDE5DF] shrink-0">
            <MessageCircle className="w-6 h-6 text-[#0F4D2E]" />
          </div>
          <div>
            <h4 className="font-headline font-bold text-lg text-[#17201B]">
              Perlu Informasi Tambahan?
            </h4>
            <p className="text-xs text-[#66736A] mt-1 max-w-lg leading-relaxed">
              Hubungi layanan WhatsApp kantor atau ajukan permohonan keanggotaan langsung.
            </p>
          </div>
        </div>

        <div className="relative z-10 flex items-center gap-3 shrink-0">
          <a
            href="https://wa.me/6282198765432?text=Assalamu'alaikum%2C%20saya%20ingin%20bertanya%20seputar%20layanan%20BMT%20Al-Muhajirin%20Toili"
            target="_blank"
            rel="noopener noreferrer"
            className="btn-institutional bg-[#0F4D2E] text-white text-xs font-semibold uppercase tracking-wider px-5 py-3 border border-[#083B24] hover:bg-[#083B24] flex items-center gap-1.5 group cursor-pointer"
          >
            <span>HUBUNGI WHATSAPP</span>
            <span className="btn-arrow-icon">&rarr;</span>
          </a>
          <button
            onClick={onOpenRegister}
            className="btn-institutional bg-white text-[#17201B] text-xs font-semibold uppercase tracking-wider px-5 py-3 border border-[#DDE5DF] hover:bg-[#F8F9F6] hover:border-[#0F4D2E] cursor-pointer"
          >
            DAFTAR ANGGOTA
          </button>
        </div>
      </div>
    </div>
  );
};
