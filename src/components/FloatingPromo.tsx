import React from 'react';
import { X, Megaphone } from 'lucide-react';

interface FloatingPromoProps {
  visible: boolean;
  onClose: () => void;
}

const PROMO_IMAGE_SRC = '';

export const FloatingPromo: React.FC<FloatingPromoProps> = ({ visible, onClose }) => {
  const [imageFailed, setImageFailed] = React.useState(false);

  if (!visible) return null;

  return (
    <div className="fixed z-[55] bottom-24 right-4 sm:bottom-24 sm:right-7 w-[min(88vw,340px)]">
      <div className="relative overflow-hidden bg-white border border-[#DDE5DF] shadow-[0_18px_50px_rgba(8,59,36,0.22)]">
        <button
          type="button"
          onClick={onClose}
          aria-label="Tutup promo"
          title="Tutup"
          className="absolute z-20 top-2 right-2 w-8 h-8 bg-[#083B24]/90 text-white border border-white/20 flex items-center justify-center hover:bg-[#0F4D2E] transition-colors"
        >
          <X className="w-4 h-4" />
        </button>

        <div className="relative aspect-[4/3] bg-[#EAF4EC] overflow-hidden border-b border-[#DDE5DF]">
          {PROMO_IMAGE_SRC && !imageFailed ? (
            <img
              src={PROMO_IMAGE_SRC}
              alt="Promo atau ucapan BMT Al-Muhajirin"
              className="w-full h-full object-cover"
              onError={() => setImageFailed(true)}
            />
          ) : (
            <div className="w-full h-full bg-gradient-to-br from-[#083B24] via-[#0F4D2E] to-[#164F35] text-white flex flex-col items-center justify-center p-8 text-center">
              <div className="w-12 h-12 border border-white/20 bg-white/10 flex items-center justify-center mb-4">
                <Megaphone className="w-5 h-5" />
              </div>
              <p className="text-[10px] font-semibold uppercase tracking-[0.2em] text-[#CFE5D5]">
                Area Promo
              </p>
              <p className="font-headline font-bold text-lg mt-1">
                Promo / Ucapan Hari Besar
              </p>
              <p className="text-[11px] text-white/65 mt-2 leading-relaxed">
                Gambar promo dapat dipasang pada area ini.
              </p>
            </div>
          )}
        </div>

        <div className="p-4 sm:p-5">
          <p className="text-[10px] font-semibold uppercase tracking-[0.16em] text-[#0F4D2E]">
            INFORMASI
          </p>
          <h2 className="font-headline font-bold text-base sm:text-lg text-[#17201B] mt-1 leading-tight">
            Promo & Ucapan Hari Besar
          </h2>
          <p className="text-[11px] sm:text-xs text-[#66736A] mt-1.5 leading-relaxed">
            Kolom ini dapat digunakan untuk promo produk, pengumuman, atau ucapan hari besar Islam.
          </p>
        </div>
      </div>
    </div>
  );
};
