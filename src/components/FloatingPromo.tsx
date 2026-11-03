import React from 'react';
import { X } from 'lucide-react';
import { SITE_SETTINGS } from '../data/content';

interface FloatingPromoProps {
  visible: boolean;
  onClose: () => void;
}



export const FloatingPromo: React.FC<FloatingPromoProps> = ({ visible, onClose }) => {
  const [imageFailed, setImageFailed] = React.useState(false);

  const hasContent = Boolean(SITE_SETTINGS.promoImage || SITE_SETTINGS.promoTitle || SITE_SETTINGS.promoDescription);
  if (!visible || !hasContent) return null;

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

        {SITE_SETTINGS.promoImage && !imageFailed && (
          <div className="relative aspect-[4/3] bg-[#EAF4EC] overflow-hidden border-b border-[#DDE5DF]">
            <img
              src={SITE_SETTINGS.promoImage}
              alt={SITE_SETTINGS.promoTitle || 'Promo BMT Al-Muhajirin'}
              className="w-full h-full object-cover"
              onError={() => setImageFailed(true)}
            />
          </div>
        )}

        <div className="p-4 sm:p-5">
          {SITE_SETTINGS.promoTitle && (
            <h2 className="font-headline font-bold text-base sm:text-lg text-[#17201B] leading-tight">
              {SITE_SETTINGS.promoTitle}
            </h2>
          )}
          {SITE_SETTINGS.promoDescription && (
            <p className="text-[11px] sm:text-xs text-[#66736A] mt-1.5 leading-relaxed">
              {SITE_SETTINGS.promoDescription}
            </p>
          )}
        </div>
      </div>
    </div>
  );
};
