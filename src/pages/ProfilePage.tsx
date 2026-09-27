import React from 'react';
import { BOARD_MEMBERS } from '../data/content';
import { ShieldCheck, Compass, HeartHandshake, Quote, ArrowRight } from 'lucide-react';

interface ProfilePageProps {
  onBackToHome: () => void;
  onOpenRegister: () => void;
}

export const ProfilePage: React.FC<ProfilePageProps> = ({ onBackToHome, onOpenRegister }) => {
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
            Profil Lembaga
          </h1>
          <p className="text-xs sm:text-sm text-[#66736A] mt-2 max-w-xl leading-relaxed">
            Sejarah pendirian, visi, misi, dan susunan pengurus KSPPS BMT Al-Muhajirin Toili.
          </p>
        </div>

        <button
          onClick={onBackToHome}
          className="relative z-10 self-start sm:self-auto bg-white text-[#17201B] text-xs font-semibold uppercase tracking-wider px-5 py-2.5 border border-[#DDE5DF] hover:bg-[#F8F9F6] hover:border-[#0F4D2E] transition-colors cursor-pointer"
        >
          &larr; KEMBALI KE BERANDA
        </button>
      </div>

      {/* ========================================================
          TENTANG KAMI
          ======================================================== */}
      <div className="relative overflow-hidden bg-white border border-[#DDE5DF] card-shadow p-8 sm:p-12 space-y-6">
        {/* Micro Islamic Geometric Texture */}
        <div
          className="absolute inset-0 pointer-events-none islamic-pattern-light pattern-mask-corner"
          aria-hidden="true"
        />

        <div className="relative z-10">
          <span className="text-xs text-[#0F4D2E] font-semibold uppercase tracking-wider">
            Tentang Kami
          </span>
          <h2 className="font-headline font-bold text-2xl sm:text-3xl text-[#17201B] mt-1 leading-snug">
            KSPPS BMT Al-Muhajirin Toili
          </h2>
        </div>

        <div className="relative z-10 space-y-4 text-sm sm:text-base text-[#66736A] leading-relaxed max-w-4xl">
          <p className="font-medium text-[#17201B]">
            BMT AL-MUHAJIRIN didirikan dengan niat membebaskan masyarakat Toili dari transaksi ribawi, rentenir desa, serta sistem ijon pertanian melalui semangat ta'awun.
          </p>
          <p>
            Lembaga menjalankan dua fungsi utama: Baitul Maal untuk pengelolaan dana sosial keagamaan (Zakat, Infaq, Sedekah, dan Wakaf), serta Baitul Tamwil untuk layanan simpanan dan pembiayaan modal usaha sektor riil.
          </p>
          <p>
            Operasional BMT diawasi secara berkala oleh Dewan Pengawas Syariah (DPS) dengan rujukan fatwa Dewan Syariah Nasional - Majelis Ulama Indonesia (DSN-MUI) dan kepatuhan regulasi perkoperasian.
          </p>
        </div>

        <div className="relative z-10 pt-4 flex flex-wrap gap-3 border-t border-[#DDE5DF]">
          <div className="px-3.5 py-1.5 bg-[#F8F9F6] border border-[#DDE5DF] text-xs text-[#17201B]">
            Baitul Maal: ZISWAF & Bantuan Sosial
          </div>
          <div className="px-3.5 py-1.5 bg-[#F8F9F6] border border-[#DDE5DF] text-xs text-[#17201B]">
            Baitul Tamwil: Simpanan & Pembiayaan
          </div>
        </div>
      </div>

      {/* ========================================================
          3 INFORMASI UTAMA: VISI, MISI, LEGALITAS
          ======================================================== */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        {/* Visi */}
        <div className="bg-white border border-[#DDE5DF] card-shadow p-7 flex flex-col justify-between hover:border-[#0F4D2E] transition-all">
          <div>
            <div className="w-10 h-10 bg-[#EAF4EC] border border-[#DDE5DF] flex items-center justify-center text-[#0F4D2E] mb-4">
              <Compass className="w-5 h-5" />
            </div>
            <h3 className="font-headline font-bold text-xl text-[#17201B] mb-2">
              Visi Lembaga
            </h3>
            <p className="text-xs sm:text-sm text-[#66736A] leading-relaxed">
              Menjadi lembaga keuangan syariah yang mandiri, sehat, dan dipercaya dalam menopang perekonomian masyarakat di wilayah Toili.
            </p>
          </div>
        </div>

        {/* Misi */}
        <div className="bg-white border border-[#DDE5DF] card-shadow p-7 flex flex-col justify-between hover:border-[#0F4D2E] transition-all">
          <div>
            <div className="w-10 h-10 bg-[#EAF4EC] border border-[#DDE5DF] flex items-center justify-center text-[#0F4D2E] mb-4">
              <HeartHandshake className="w-5 h-5" />
            </div>
            <h3 className="font-headline font-bold text-xl text-[#17201B] mb-2">
              Misi Lembaga
            </h3>
            <ul className="space-y-2 text-xs sm:text-sm text-[#66736A] leading-relaxed">
              <li className="flex items-start gap-2">
                <span className="w-1.5 h-1.5 bg-[#0F4D2E] shrink-0 mt-1.5" />
                <span>Menghimpun dan menyalurkan dana sesuai prinsip syariat Islam.</span>
              </li>
              <li className="flex items-start gap-2">
                <span className="w-1.5 h-1.5 bg-[#0F4D2E] shrink-0 mt-1.5" />
                <span>Memperkuat permodalan usaha petani, pedagang, dan peternak Toili.</span>
              </li>
              <li className="flex items-start gap-2">
                <span className="w-1.5 h-1.5 bg-[#0F4D2E] shrink-0 mt-1.5" />
                <span>Menyalurkan dana ZISWAF bagi kebutuhan mustahik.</span>
              </li>
            </ul>
          </div>
        </div>

        {/* Legalitas */}
        <div className="bg-white border border-[#DDE5DF] card-shadow p-7 flex flex-col justify-between hover:border-[#0F4D2E] transition-all">
          <div>
            <div className="w-10 h-10 bg-[#EAF4EC] border border-[#DDE5DF] flex items-center justify-center text-[#0F4D2E] mb-4">
              <ShieldCheck className="w-5 h-5" />
            </div>
            <h3 className="font-headline font-bold text-xl text-[#17201B] mb-2">
              Legalitas & Pengawasan
            </h3>
            <p className="text-xs sm:text-sm text-[#66736A] leading-relaxed">
              Berbadan hukum Koperasi Simpan Pinjam dan Pembiayaan Syariah (KSPPS) resmi, dengan pengawasan syariah oleh Dewan Pengawas Syariah (DPS) berpedoman pada fatwa DSN-MUI.
            </p>
          </div>
        </div>
      </div>

      {/* ========================================================
          PENGURUS
          ======================================================== */}
      <div className="bg-white border border-[#DDE5DF] card-shadow p-8 sm:p-12">
        <div className="mb-10 pb-4 border-b border-[#DDE5DF] flex flex-col sm:flex-row sm:items-end justify-between gap-4">
          <div>
            <h2 className="font-headline font-bold text-2xl sm:text-3xl text-[#17201B]">
              Pengurus
            </h2>
            <p className="text-xs sm:text-sm text-[#66736A] mt-1">
              Susunan pengurus KSPPS BMT Al-Muhajirin Toili.
            </p>
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {BOARD_MEMBERS.map((member, idx) => (
            <div
              key={idx}
              className="bg-white border border-[#DDE5DF] card-shadow-sm card-hover-subtle flex flex-col justify-between group hover:border-[#0F4D2E] transition-all"
            >
              <div>
                <div className="relative aspect-[3/4] border-b border-[#DDE5DF] overflow-hidden bg-gray-100">
                  <img
                    src={member.photo}
                    alt={member.name}
                    className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-103"
                    loading="lazy"
                  />
                  <div className="absolute top-3 left-3 bg-[#0F4D2E] text-white text-[10px] font-semibold uppercase tracking-wider px-2.5 py-1 border border-[#083B24]">
                    {member.badge}
                  </div>
                </div>

                <div className="p-6">
                  <h3 className="font-headline font-bold text-lg text-[#17201B] leading-snug group-hover:text-[#0F4D2E] transition-colors">
                    {member.name}
                  </h3>
                  <div className="text-xs font-semibold text-[#0F4D2E] uppercase tracking-wider mt-1">
                    {member.role}
                  </div>

                  <div className="mt-4 p-3.5 bg-[#F8F9F6] border border-[#DDE5DF] text-xs text-[#66736A] leading-relaxed italic relative">
                    <Quote className="w-3.5 h-3.5 text-gray-400 mb-1" />
                    "{member.quote}"
                  </div>
                </div>
              </div>

              <div className="px-6 pb-5 pt-0">
                <div className="text-[10px] font-medium text-[#66736A] uppercase tracking-wider pt-2 border-t border-[#DDE5DF]">
                  BMT Al-Muhajirin Toili
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Callout Action */}
      <div className="relative overflow-hidden bg-[#0F4D2E] text-white border border-[#083B24] elevation-green p-8 sm:p-10 flex flex-col sm:flex-row items-center justify-between gap-6">
        {/* Subtle Islamic Geometric Pattern Layer */}
        <div
          className="absolute inset-0 pointer-events-none islamic-pattern-dark pattern-mask-radial"
          aria-hidden="true"
        />

        <div className="relative z-10">
          <h3 className="font-headline font-bold text-xl sm:text-2xl text-white">
            Pendaftaran Keanggotaan
          </h3>
          <p className="text-xs sm:text-sm text-white/80 mt-1 max-w-lg">
            Kunjungi Kantor Pusat di Toili atau ajukan formulir keanggotaan secara daring.
          </p>
        </div>
        <button
          onClick={onOpenRegister}
          className="btn-institutional relative z-10 shrink-0 bg-white text-[#0F4D2E] text-xs font-semibold uppercase tracking-wider px-6 py-3.5 border border-white hover:bg-[#EAF4EC] transition-colors flex items-center gap-2 cursor-pointer group"
        >
          <span>DAFTAR ANGGOTA</span>
          <ArrowRight className="w-4 h-4 btn-arrow-icon" />
        </button>
      </div>
    </div>
  );
};
