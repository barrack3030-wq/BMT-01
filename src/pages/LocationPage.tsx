import React, { useState } from 'react';
import { BRANCHES_DATA } from '../data/content';
import { MapPin, Clock, Phone, MessageSquare, ExternalLink, Navigation } from 'lucide-react';

interface LocationPageProps {
  onBackToHome: () => void;
  onOpenRegister: () => void;
}

export const LocationPage: React.FC<LocationPageProps> = ({ onBackToHome }) => {
  const [selectedBranchId, setSelectedBranchId] = useState<string>('toili');

  const selectedBranch =
    BRANCHES_DATA.find((b) => b.id === selectedBranchId) || BRANCHES_DATA[0];

  return (
    <div className="pt-8 sm:pt-14 pb-16 sm:pb-20 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto space-y-12 sm:space-y-16">
      {/* Header */}
      <div className="relative overflow-hidden bg-[#083B24] text-white border border-[#0F4D2E] card-shadow p-8 sm:p-10 flex flex-col sm:flex-row sm:items-end justify-between gap-6">
        {/* Subtle Islamic Geometric Pattern Layer */}
        <div
          className="absolute inset-0 pointer-events-none islamic-pattern-dark pattern-mask-radial"
          aria-hidden="true"
        />

        <div className="relative z-10">
          <h1 className="font-headline font-bold text-3xl sm:text-4xl text-white tracking-tight">
            Lokasi Kantor
          </h1>
          <p className="text-xs sm:text-sm text-white/80 mt-2 max-w-xl font-normal leading-relaxed">
            Alamat kantor pusat dan cabang pelayanan BMT Al-Muhajirin Toili.
          </p>
        </div>

        <button
          onClick={onBackToHome}
          className="btn-institutional relative z-10 self-start sm:self-auto bg-white text-[#17201B] text-xs font-semibold uppercase tracking-wider px-5 py-2.5 border border-white hover:bg-[#EAF4EC] cursor-pointer"
        >
          &larr; KEMBALI KE BERANDA
        </button>
      </div>

      {/* Daftar Kantor */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        {BRANCHES_DATA.map((branch) => {
          const isSelected = selectedBranchId === branch.id;
          return (
            <div
              key={branch.id}
              className={`bg-white border card-shadow flex flex-col justify-between transition-all ${
                isSelected ? 'border-[#0F4D2E] ring-1 ring-[#0F4D2E]' : 'border-[#DDE5DF]'
              }`}
            >
              <div>
                <div className="relative aspect-[16/10] border-b border-[#DDE5DF] overflow-hidden bg-gray-100">
                  <img
                    src={branch.image}
                    alt={branch.name}
                    className="w-full h-full object-cover"
                    loading="lazy"
                  />
                  <div className="absolute top-3 left-3 bg-[#0F4D2E] text-white text-[10px] font-semibold uppercase tracking-wider px-2.5 py-0.5 border border-[#083B24]">
                    {branch.badgeTitle}
                  </div>
                </div>

                <div className="p-6 space-y-4">
                  <div>
                    <h3 className="font-headline font-bold text-lg text-[#17201B]">
                      {branch.name}
                    </h3>
                  </div>

                  <div className="space-y-2.5 text-xs text-[#17201B]">
                    <div className="flex items-start gap-2.5">
                      <MapPin className="w-4 h-4 text-[#0F4D2E] shrink-0 mt-0.5" />
                      <div>
                        <strong className="block text-[#17201B]">Alamat:</strong>
                        <span className="text-[#66736A]">{branch.address}</span>
                      </div>
                    </div>

                    <div className="flex items-start gap-2.5">
                      <Clock className="w-4 h-4 text-[#0F4D2E] shrink-0 mt-0.5" />
                      <div>
                        <strong className="block text-[#17201B]">Jam Operasional:</strong>
                        <span className="text-[#66736A]">{branch.hours}</span>
                      </div>
                    </div>

                    <div className="flex items-start gap-2.5">
                      <MessageSquare className="w-4 h-4 text-[#0F4D2E] shrink-0 mt-0.5" />
                      <div>
                        <strong className="block text-[#17201B]">WhatsApp:</strong>
                        <span className="text-[#66736A]">+62 {branch.whatsapp}</span>
                      </div>
                    </div>

                    <div className="flex items-start gap-2.5">
                      <Phone className="w-4 h-4 text-[#0F4D2E] shrink-0 mt-0.5" />
                      <div>
                        <strong className="block text-[#17201B]">Telepon:</strong>
                        <span className="text-[#66736A]">{branch.phone}</span>
                      </div>
                    </div>
                  </div>
                </div>
              </div>

              <div className="p-6 pt-0 flex flex-col gap-2">
                <a
                  href={branch.mapsUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="btn-institutional w-full bg-[#0F4D2E] text-white text-xs font-semibold uppercase tracking-wider py-2.5 px-3 border border-[#083B24] hover:bg-[#083B24] flex items-center justify-center gap-1.5 group cursor-pointer"
                >
                  <Navigation className="w-3.5 h-3.5 transition-transform duration-200 group-hover:scale-110" />
                  <span>PETUNJUK ARAH</span>
                </a>

                <button
                  onClick={() => setSelectedBranchId(branch.id)}
                  className={`btn-institutional text-xs font-semibold uppercase tracking-wider py-2 px-3 border cursor-pointer ${
                    isSelected
                      ? 'bg-[#EAF4EC] text-[#0F4D2E] border-[#0F4D2E]'
                      : 'bg-white text-[#17201B] border-[#DDE5DF] hover:bg-[#F8F9F6]'
                  }`}
                >
                  {isSelected ? '✓ TAMPIL DI PETA' : 'LIHAT DI PETA'}
                </button>
              </div>
            </div>
          );
        })}
      </div>

      {/* Peta */}
      <div className="bg-white border border-[#DDE5DF] card-shadow p-7 sm:p-8 space-y-5">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 border-b border-[#DDE5DF] pb-4">
          <div>
            <h3 className="font-headline font-bold text-xl text-[#17201B]">
              Peta Lokasi: {selectedBranch.name}
            </h3>
          </div>

          <div className="flex items-center gap-2">
            {BRANCHES_DATA.map((b) => (
              <button
                key={b.id}
                onClick={() => setSelectedBranchId(b.id)}
                className={`text-xs font-semibold uppercase tracking-wider px-3.5 py-1.5 border transition-colors cursor-pointer ${
                  selectedBranchId === b.id
                    ? 'bg-[#0F4D2E] text-white border-[#083B24]'
                    : 'bg-white text-[#17201B] border-[#DDE5DF] hover:bg-[#F8F9F6]'
                }`}
              >
                {b.id === 'toili' ? 'Pusat Toili' : b.id === 'luwuk' ? 'Luwuk' : 'Bunta'}
              </button>
            ))}
          </div>
        </div>

        <div className="w-full h-[380px] border border-[#DDE5DF] relative bg-gray-100 overflow-hidden">
          <iframe
            title={`Peta Lokasi ${selectedBranch.name}`}
            src={`https://maps.google.com/maps?q=${selectedBranch.mapEmbedQuery}&t=&z=14&ie=UTF8&iwloc=&output=embed`}
            className="w-full h-full border-0"
            loading="lazy"
            allowFullScreen
          />
        </div>

        <div className="flex flex-col sm:flex-row items-center justify-between text-xs text-[#66736A] pt-1 gap-2">
          <span>
            📍 <strong>{selectedBranch.name}:</strong> {selectedBranch.address}
          </span>
          <a
            href={selectedBranch.mapsUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="font-semibold text-[#0F4D2E] hover:underline flex items-center gap-1"
          >
            <span>Buka Google Maps</span>
            <ExternalLink className="w-3.5 h-3.5" />
          </a>
        </div>
      </div>
    </div>
  );
};
