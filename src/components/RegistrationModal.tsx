import React, { useState } from 'react';
import { X, CheckCircle2, Send, ArrowRight } from 'lucide-react';
import { MemberFormData } from '../types';

interface RegistrationModalProps {
  isOpen: boolean;
  onClose: () => void;
  defaultService?: 'simpanan' | 'pembiayaan' | 'qurban';
  defaultAmount?: number;
}

export const RegistrationModal: React.FC<RegistrationModalProps> = ({
  isOpen,
  onClose,
  defaultService = 'simpanan',
  defaultAmount,
}) => {
  const [formData, setFormData] = useState<MemberFormData>({
    fullName: '',
    nik: '',
    phone: '',
    address: '',
    district: 'Toili',
    serviceType: defaultService,
    estimatedAmount: defaultAmount || 11000000,
    notes: '',
    agreedToTerms: false,
  });

  const [submitted, setSubmitted] = useState(false);
  const [errorMsg, setErrorMsg] = useState('');

  if (!isOpen) return null;

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!formData.fullName.trim() || !formData.phone.trim()) {
      setErrorMsg('Mohon lengkapi Nama Lengkap dan Nomor WhatsApp aktif.');
      return;
    }
    if (!formData.agreedToTerms) {
      setErrorMsg('Harap setujui pernyataan kepatuhan ketentuan syariah.');
      return;
    }
    setErrorMsg('');
    setSubmitted(true);
  };

  const handleWhatsAppRedirect = () => {
    const serviceName =
      formData.serviceType === 'simpanan'
        ? 'Simpanan Mudharabah'
        : formData.serviceType === 'pembiayaan'
        ? 'Pembiayaan Syariah'
        : 'Tabungan Qurban';

    const text = encodeURIComponent(
      `Assalamu'alaikum Wr. Wb. BMT Al-Muhajirin Toili,\n\nSaya ingin mendaftar keanggotaan/layanan syariah:\n• Nama: ${formData.fullName}\n• No. WA: ${formData.phone}\n• Wilayah: Kec. ${formData.district}, Kab. Banggai\n• Layanan: ${serviceName}\n• Estimasi Nominal: Rp ${formData.estimatedAmount?.toLocaleString('id-ID')}\n• Catatan: ${formData.notes || '-'}\n\nTerima kasih.`
    );
    window.open(`https://wa.me/6282198765432?text=${text}`, '_blank');
  };

  const resetForm = () => {
    setSubmitted(false);
    setErrorMsg('');
    onClose();
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/40 backdrop-blur-[2px] animate-fadeIn">
      <div className="relative w-full max-w-xl bg-white border border-[#DDE5DF] card-shadow max-h-[92vh] overflow-y-auto">
        {/* Header */}
        <div className="relative overflow-hidden bg-[#0F4D2E] text-white p-5 sm:p-6 flex items-center justify-between border-b border-[#083B24]">
          {/* Subtle Islamic Geometric Header Layer */}
          <div
            className="absolute inset-0 pointer-events-none islamic-pattern-dark pattern-mask-radial"
            aria-hidden="true"
          />

          <div className="relative z-10">
            <h3 className="font-headline font-bold text-lg sm:text-xl tracking-tight text-white leading-tight">
              Pendaftaran Anggota
            </h3>
            <p className="text-xs text-[#EAF4EC] mt-0.5">
              BMT Al-Muhajirin Toili
            </p>
          </div>
          <button
            onClick={resetForm}
            className="relative z-10 w-8 h-8 bg-white/10 hover:bg-white/20 text-white flex items-center justify-center transition-colors cursor-pointer"
            aria-label="Tutup formulir"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {submitted ? (
          /* Confirmation Success State */
          <div className="p-6 sm:p-8 space-y-6">
            <div className="bg-[#EAF4EC] border border-[#DDE5DF] p-5 flex items-start gap-3.5">
              <CheckCircle2 className="w-6 h-6 text-[#0F4D2E] shrink-0 mt-0.5" />
              <div>
                <h4 className="font-headline font-bold text-[#17201B] text-base">
                  Data Terkirim
                </h4>
                <p className="text-xs text-[#17201B] mt-1 leading-relaxed">
                  Terima kasih, <strong>{formData.fullName}</strong>. Data pengajuan Anda telah tercatat. Petugas kami akan memverifikasi dan menghubungi nomor WhatsApp Anda.
                </p>
              </div>
            </div>

            <div className="border border-[#DDE5DF] p-4 bg-[#F8F9F6] text-xs space-y-2.5">
              <div className="flex justify-between border-b border-[#DDE5DF] pb-2">
                <span className="text-[#66736A]">Layanan:</span>
                <span className="font-semibold text-[#0F4D2E]">
                  {formData.serviceType === 'simpanan'
                    ? 'Simpanan Mudharabah'
                    : formData.serviceType === 'pembiayaan'
                    ? 'Pembiayaan Syariah'
                    : 'Tabungan Qurban'}
                </span>
              </div>
              <div className="flex justify-between border-b border-[#DDE5DF] pb-2">
                <span className="text-[#66736A]">Estimasi Nominal:</span>
                <span className="font-semibold text-[#17201B]">
                  Rp {formData.estimatedAmount?.toLocaleString('id-ID')}
                </span>
              </div>
              <div className="flex justify-between border-b border-[#DDE5DF] pb-2">
                <span className="text-[#66736A]">Wilayah:</span>
                <span className="font-medium text-[#17201B]">
                  Kec. {formData.district}, Kab. Banggai
                </span>
              </div>
              <div className="flex justify-between pt-1">
                <span className="text-[#66736A]">Status:</span>
                <span className="font-semibold text-[#0F4D2E]">Menunggu Verifikasi</span>
              </div>
            </div>

            <div className="space-y-3">
              <button
                onClick={handleWhatsAppRedirect}
                className="w-full bg-[#0F4D2E] text-white font-semibold text-xs uppercase tracking-wider py-3.5 px-4 border border-[#083B24] hover:bg-[#083B24] transition-colors flex items-center justify-center gap-2 card-shadow-sm cursor-pointer"
              >
                <Send className="w-4 h-4" />
                <span>LANJUTKAN KE WHATSAPP</span>
              </button>

              <button
                onClick={resetForm}
                className="w-full bg-white text-[#17201B] font-semibold text-xs uppercase tracking-wider py-3 px-4 border border-[#DDE5DF] hover:bg-[#F8F9F6] transition-colors cursor-pointer"
              >
                TUTUP
              </button>
            </div>
          </div>
        ) : (
          /* Input Form */
          <form onSubmit={handleSubmit} className="p-6 sm:p-8 space-y-4">
            {errorMsg && (
              <div className="p-3 bg-red-50 border border-red-200 text-red-800 text-xs font-medium">
                {errorMsg}
              </div>
            )}

            <div>
              <label className="block text-xs font-semibold uppercase tracking-wider text-[#17201B] mb-1.5">
                Nama Lengkap (Sesuai KTP) <span className="text-red-600">*</span>
              </label>
              <input
                type="text"
                required
                value={formData.fullName}
                onChange={(e) => setFormData({ ...formData, fullName: e.target.value })}
                placeholder="Nama lengkap"
                className="w-full p-2.5 bg-white border border-[#DDE5DF] text-sm text-[#17201B] placeholder:text-gray-400 focus:outline-none focus:border-[#0F4D2E] focus:ring-1 focus:ring-[#0F4D2E]"
              />
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div>
                <label className="block text-xs font-semibold uppercase tracking-wider text-[#17201B] mb-1.5">
                  Nomor WhatsApp <span className="text-red-600">*</span>
                </label>
                <input
                  type="tel"
                  required
                  value={formData.phone}
                  onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                  placeholder="08xxxxxxxxxx"
                  className="w-full p-2.5 bg-white border border-[#DDE5DF] text-sm text-[#17201B] placeholder:text-gray-400 focus:outline-none focus:border-[#0F4D2E] focus:ring-1 focus:ring-[#0F4D2E]"
                />
              </div>

              <div>
                <label className="block text-xs font-semibold uppercase tracking-wider text-[#17201B] mb-1.5">
                  Kecamatan Domisili
                </label>
                <select
                  value={formData.district}
                  onChange={(e) => setFormData({ ...formData, district: e.target.value })}
                  className="w-full p-2.5 bg-white border border-[#DDE5DF] text-sm text-[#17201B] focus:outline-none focus:border-[#0F4D2E] focus:ring-1 focus:ring-[#0F4D2E]"
                >
                  <option value="Toili">Toili</option>
                  <option value="Toili Barat">Toili Barat</option>
                  <option value="Moilong">Moilong</option>
                  <option value="Luwuk">Luwuk</option>
                  <option value="Luwuk Selatan">Luwuk Selatan</option>
                  <option value="Luwuk Utara">Luwuk Utara</option>
                  <option value="Bunta">Bunta</option>
                  <option value="Batui">Batui</option>
                  <option value="Batui Selatan">Batui Selatan</option>
                  <option value="Kintom">Kintom</option>
                  <option value="Lainnya di Banggai">Lainnya</option>
                </select>
              </div>
            </div>

            <div>
              <label className="block text-xs font-semibold uppercase tracking-wider text-[#17201B] mb-1.5">
                Pilihan Layanan
              </label>
              <div className="grid grid-cols-3 gap-2">
                {[
                  { id: 'simpanan', label: 'Simpanan Mudharabah' },
                  { id: 'pembiayaan', label: 'Pembiayaan Syariah' },
                  { id: 'qurban', label: 'Tabungan Qurban' },
                ].map((item) => (
                  <button
                    type="button"
                    key={item.id}
                    onClick={() =>
                      setFormData({
                        ...formData,
                        serviceType: item.id as 'simpanan' | 'pembiayaan' | 'qurban',
                      })
                    }
                    className={`p-2.5 text-center text-xs font-semibold border transition-all cursor-pointer ${
                      formData.serviceType === item.id
                        ? 'bg-[#0F4D2E] text-white border-[#083B24]'
                        : 'bg-[#F8F9F6] text-[#17201B] border-[#DDE5DF] hover:border-[#0F4D2E]'
                    }`}
                  >
                    {item.label}
                  </button>
                ))}
              </div>
            </div>

            <div>
              <label className="block text-xs font-semibold uppercase tracking-wider text-[#17201B] mb-1.5">
                Estimasi Nominal (Rp)
              </label>
              <input
                type="number"
                min="500000"
                step="500000"
                value={formData.estimatedAmount || 11000000}
                onChange={(e) =>
                  setFormData({ ...formData, estimatedAmount: Number(e.target.value) })
                }
                className="w-full p-2.5 bg-white border border-[#DDE5DF] text-sm text-[#17201B] focus:outline-none focus:border-[#0F4D2E] focus:ring-1 focus:ring-[#0F4D2E]"
              />
            </div>

            <div>
              <label className="block text-xs font-semibold uppercase tracking-wider text-[#17201B] mb-1.5">
                Catatan Usaha / Kebutuhan (Opsional)
              </label>
              <textarea
                rows={2}
                value={formData.notes}
                onChange={(e) => setFormData({ ...formData, notes: e.target.value })}
                placeholder="Rincian usaha atau kebutuhan simpanan"
                className="w-full p-2.5 bg-white border border-[#DDE5DF] text-xs text-[#17201B] focus:outline-none focus:border-[#0F4D2E] focus:ring-1 focus:ring-[#0F4D2E]"
              />
            </div>

            <div className="pt-2">
              <label className="flex items-start gap-2.5 cursor-pointer text-xs text-[#66736A]">
                <input
                  type="checkbox"
                  required
                  checked={formData.agreedToTerms}
                  onChange={(e) => setFormData({ ...formData, agreedToTerms: e.target.checked })}
                  className="mt-0.5 w-4 h-4 accent-[#0F4D2E] border border-[#DDE5DF]"
                />
                <span className="leading-relaxed">
                  Saya bersedia menjadi anggota BMT Al-Muhajirin Toili dan menyetujui ketentuan simpanan/pembiayaan syariah yang berlaku.
                </span>
              </label>
            </div>

            <div className="pt-3">
              <button
                type="submit"
                className="w-full bg-[#0F4D2E] text-white text-xs font-semibold uppercase tracking-wider py-3.5 px-4 border border-[#083B24] hover:bg-[#083B24] transition-colors flex items-center justify-center gap-2 card-shadow-sm active:translate-y-px cursor-pointer"
              >
                <span>KIRIM PENDAFTARAN</span>
                <ArrowRight className="w-4 h-4" />
              </button>
            </div>
          </form>
        )}
      </div>
    </div>
  );
};
