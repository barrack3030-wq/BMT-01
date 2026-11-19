import React from 'react';
import {
  ArrowRight, BadgeCheck, BookOpenCheck, Building2, CheckCircle2, Coins, Facebook,
  FileCheck2, Handshake, HeartHandshake, Instagram, Landmark, MapPin, MessageCircle,
  Phone, Scale, ShieldCheck, Sprout, Users, Wallet, Clock, ExternalLink,
} from 'lucide-react';
import {
  ABOUT_CONTENT, BOARD_MEMBERS, BRANCHES_DATA, PRODUCTS_DATA, SITE_SETTINGS,
} from '../data/content';
import { SITE_BASE_PATH } from '../utils/seo';

interface HomePageProps {
  onOpenRegister: (service?: 'simpanan' | 'pembiayaan' | 'qurban', amount?: number) => void;
  productsRef: React.RefObject<HTMLDivElement | null>;
  onNavigateToNews?: () => void;
  onNavigateToProducts?: () => void;
}

const QUESTIONS = [
  { id: 'tentang', label: 'Apa itu BMT Al-Muhajirin?' },
  { id: 'pengelola', label: 'Siapa pengelolanya?' },
  { id: 'lokasi', label: 'Di mana kantornya?' },
  { id: 'legalitas', label: 'Dasar hukum & status' },
  { id: 'keuangan', label: 'Pengelolaan uang' },
  { id: 'produk', label: 'Produk tersedia' },
  { id: 'syariah', label: 'Prinsip syariah' },
  { id: 'kontak', label: 'Kontak resmi' },
];

function digitsOf(value: string): string {
  return (value || '').replace(/\D/g, '');
}

function waLink(number: string): string {
  const d = digitsOf(number);
  const intl = d.startsWith('0') ? `62${d.slice(1)}` : d;
  return `https://wa.me/${intl}`;
}

function telLink(number: string): string {
  const d = digitsOf(number);
  const intl = d.startsWith('0') ? `+62${d.slice(1)}` : `+${d}`;
  return `tel:${intl}`;
}

function initials(name: string): string {
  const cleaned = name
    .replace(/\b(H|Hj|Ir|Dr|Drs)\.?\s/gi, '')
    .replace(/,.*$/, '')
    .trim();
  const parts = cleaned.split(/\s+/).filter(Boolean);
  return ((parts[0]?.[0] || '') + (parts[1]?.[0] || '')).toUpperCase();
}

function byOrder<T extends { order?: number | string }>(items: T[]): T[] {
  return [...items].sort((a, b) => (Number(a.order) || 999) - (Number(b.order) || 999));
}

interface SectionProps {
  id: string;
  no: number;
  question: string;
  answer: string;
  tone?: 'white' | 'tint';
  children: React.ReactNode;
}

const Section: React.FC<SectionProps> = ({ id, no, question, answer, tone = 'white', children }) => (
  <section
    id={id}
    className={`scroll-mt-28 py-14 sm:py-20 ${tone === 'tint' ? 'bg-[#EFF6F0]' : 'bg-white'}`}
    aria-labelledby={`${id}-title`}
  >
    <div className="max-w-7xl mx-auto px-5 sm:px-8 lg:px-12">
      <div className="max-w-3xl">
        <div className="flex items-center gap-3 text-[10px] sm:text-xs font-bold tracking-[0.18em] uppercase text-[#A47E36] mb-3">
          <span className="w-8 h-px bg-[#C6A45D]" /> Pertanyaan {String(no).padStart(2, '0')}
        </div>
        <h2 id={`${id}-title`} className="font-headline text-2xl sm:text-4xl font-bold leading-tight text-[#123D2B]">
          {question}
        </h2>
        <p className="mt-4 text-base sm:text-lg leading-relaxed text-[#2F4A3B] font-medium">{answer}</p>
      </div>
      <div className="mt-9">{children}</div>
    </div>
  </section>
);

export const HomePage: React.FC<HomePageProps> = ({ onOpenRegister, productsRef, onNavigateToProducts }) => {
  const products = byOrder(PRODUCTS_DATA.filter((p: any) => p.active !== false) as any[]);
  const branches = byOrder(BRANCHES_DATA.filter((b: any) => b.active !== false) as any[]);
  const board = byOrder(BOARD_MEMBERS.filter((m: any) => m.active !== false) as any[]);
  const headOffice: any = branches.find((b) => b.id === 'toili') || branches[0];

  const goTo = (path: string) => window.location.assign(`${SITE_BASE_PATH}${path}`);

  return (
    <div className="w-full flex flex-col bg-white">
      {/* HERO: jawaban singkat pertanyaan 1 */}
      <section className="relative isolate overflow-hidden bg-[#073B27] text-white">
        <div className="absolute inset-0 islamic-pattern-dark opacity-40 pointer-events-none" aria-hidden="true" />
        <div className="absolute inset-0 bg-gradient-to-br from-[#052D1E] via-[#073B27] to-[#0F4D2E]/80" aria-hidden="true" />
        <div className="relative z-10 max-w-7xl mx-auto px-5 sm:px-8 lg:px-12 py-16 sm:py-24">
          <div className="flex items-center gap-3 mb-5 text-[10px] sm:text-xs font-bold tracking-[0.2em] uppercase text-[#E8D39A]">
            <span>KSPPS Syariah · Toili, Kabupaten Banggai</span>
            <span className="w-12 h-px bg-[#D8B96D]" />
          </div>
          <h1 className="font-headline font-bold text-[2.4rem] sm:text-5xl lg:text-[3.8rem] leading-[1.06] tracking-[-0.03em] max-w-4xl">
            BMT Al-Muhajirin Toili
            <span className="block text-[#F1E5C4] mt-1">Koperasi simpan pinjam dan pembiayaan syariah.</span>
          </h1>
          <p className="mt-6 max-w-2xl text-sm sm:text-lg leading-relaxed text-white/90">
            Melayani masyarakat, petani, pedagang, dan pelaku UMKM di Toili dengan simpanan dan pembiayaan tanpa riba,
            serta pengelolaan dana sosial (ZISWAF) lewat Baitul Maal.
          </p>
          <div className="mt-8 flex flex-wrap gap-3">
            <a
              href="#kontak"
              className="btn-institutional inline-flex items-center gap-2 rounded-full bg-[#D9B96E] hover:bg-[#E7CC8D] text-[#153B2A] px-6 sm:px-7 py-3.5 text-xs sm:text-sm font-bold shadow-lg shadow-black/15"
            >
              Hubungi Petugas Resmi <ArrowRight className="w-4 h-4" />
            </a>
            <button
              type="button"
              onClick={() => onOpenRegister('simpanan')}
              className="btn-institutional inline-flex items-center gap-2 rounded-full border border-white/65 bg-white/10 hover:bg-white/20 text-white px-6 sm:px-7 py-3.5 text-xs sm:text-sm font-semibold backdrop-blur-sm"
            >
              Daftar Anggota
            </button>
          </div>
        </div>
      </section>

      {/* DAFTAR PERTANYAAN */}
      <nav aria-label="Daftar pertanyaan" className="relative z-10 -mt-7 mx-4 sm:mx-8 lg:mx-auto lg:w-[calc(100%-4rem)] max-w-7xl rounded-2xl bg-white border border-[#E4EAE5] shadow-[0_12px_36px_rgba(12,55,34,0.10)]">
        <ol className="grid grid-cols-2 md:grid-cols-4 divide-x divide-y divide-[#E5EBE6]">
          {QUESTIONS.map((q, i) => (
            <li key={q.id}>
              <a href={`#${q.id}`} className="flex items-center gap-3 px-4 sm:px-5 py-4 hover:bg-[#F4F9F5] transition-colors h-full">
                <span className="w-7 h-7 shrink-0 rounded-full bg-[#EAF4ED] text-[#0F6842] text-[11px] font-bold flex items-center justify-center">{i + 1}</span>
                <span className="text-xs sm:text-[13px] font-semibold text-[#123D2B] leading-snug">{q.label}</span>
              </a>
            </li>
          ))}
        </ol>
      </nav>

      <div className="h-6 sm:h-10 bg-white" aria-hidden="true" />

      {/* 1. APA ITU */}
      <Section
        id="tentang"
        no={1}
        question="BMT Al-Muhajirin itu apa?"
        answer="BMT Al-Muhajirin Toili adalah Koperasi Simpan Pinjam dan Pembiayaan Syariah (KSPPS) di Toili, Kabupaten Banggai, Sulawesi Tengah. BMT berarti Baitul Maal wa Tamwil."
      >
        <div className="grid lg:grid-cols-5 gap-8">
          <div className="lg:col-span-3 space-y-4 text-sm sm:text-base leading-relaxed text-[#55665B]">
            {(ABOUT_CONTENT.paragraphs || []).map((p, i) => <p key={i}>{p}</p>)}
            <div className="grid sm:grid-cols-2 gap-4 pt-2">
              <div className="rounded-2xl border border-[#E0EAE1] bg-[#F8FBF8] p-5">
                <HeartHandshake className="w-6 h-6 text-[#0F6842]" />
                <h3 className="mt-3 font-headline font-bold text-lg text-[#123D2B]">Baitul Maal</h3>
                <p className="mt-1 text-sm text-[#55665B]">Mengelola dana sosial keagamaan: zakat, infaq, sedekah, dan wakaf (ZISWAF).</p>
              </div>
              <div className="rounded-2xl border border-[#E0EAE1] bg-[#F8FBF8] p-5">
                <Coins className="w-6 h-6 text-[#0F6842]" />
                <h3 className="mt-3 font-headline font-bold text-lg text-[#123D2B]">Baitul Tamwil</h3>
                <p className="mt-1 text-sm text-[#55665B]">Melayani simpanan dan pembiayaan modal usaha sektor riil.</p>
              </div>
            </div>
          </div>
          <div className="lg:col-span-2 space-y-4">
            {ABOUT_CONTENT.vision && (
              <div className="rounded-2xl bg-[#0F4D2E] text-white p-6">
                <p className="text-[10px] font-bold uppercase tracking-[0.18em] text-[#E8D39A]">Visi</p>
                <p className="mt-2 text-sm leading-relaxed text-white/90">{ABOUT_CONTENT.vision}</p>
              </div>
            )}
            {(ABOUT_CONTENT.mission || []).length > 0 && (
              <div className="rounded-2xl border border-[#E0EAE1] p-6">
                <p className="text-[10px] font-bold uppercase tracking-[0.18em] text-[#A47E36]">Misi</p>
                <ul className="mt-3 space-y-2.5">
                  {ABOUT_CONTENT.mission.map((m, i) => (
                    <li key={i} className="flex items-start gap-2 text-sm text-[#46564C] leading-relaxed">
                      <CheckCircle2 className="w-4 h-4 text-[#168052] shrink-0 mt-0.5" /> {m}
                    </li>
                  ))}
                </ul>
              </div>
            )}
          </div>
        </div>
      </Section>

      {/* 2. PENGELOLA */}
      <Section
        id="pengelola"
        no={2}
        tone="tint"
        question="Siapa yang mengelolanya?"
        answer="BMT dikelola oleh pengurus koperasi, dengan kepatuhan syariah diawasi Dewan Pengawas Syariah (DPS). Pengurus mempertanggungjawabkan pengelolaan kepada anggota dalam Rapat Anggota Tahunan (RAT)."
      >
        <div className="grid grid-cols-1 md:grid-cols-3 gap-5">
          {board.map((m: any) => (
            <article key={m.id || m.name} className="rounded-2xl bg-white border border-[#E0EAE1] p-6 shadow-[0_5px_22px_rgba(17,55,34,0.05)]">
              <div className="flex items-center gap-4">
                <span className="w-14 h-14 rounded-full bg-[#0F4D2E] text-[#F1E5C4] font-headline font-bold text-lg flex items-center justify-center shrink-0" aria-hidden="true">
                  {initials(m.name)}
                </span>
                <div>
                  <h3 className="font-headline font-bold text-lg text-[#123D2B] leading-snug">{m.name}</h3>
                  <p className="text-xs font-bold uppercase tracking-wider text-[#A47E36] mt-0.5">{m.role} · {m.badge}</p>
                </div>
              </div>
              {m.quote && <p className="mt-4 text-sm italic leading-relaxed text-[#55665B]">“{m.quote}”</p>}
            </article>
          ))}
        </div>
        <div className="mt-5 flex items-start gap-3 rounded-2xl border border-[#D6E6D9] bg-white p-5 text-sm text-[#46564C] leading-relaxed">
          <ShieldCheck className="w-5 h-5 text-[#0F6842] shrink-0 mt-0.5" />
          <span>
            <strong className="text-[#123D2B]">Dewan Pengawas Syariah (DPS)</strong> mengawasi lembaga secara berkala dengan rujukan fatwa DSN-MUI.
          </span>
        </div>
      </Section>

      {/* 3. LOKASI */}
      <Section
        id="lokasi"
        no={3}
        question="Di mana kantornya?"
        answer={`Kantor Pusat berada di ${headOffice?.address || 'Toili, Kabupaten Banggai, Sulawesi Tengah'}. Pelayanan juga tersedia di cabang Luwuk dan Bunta.`}
      >
        <div className="grid grid-cols-1 md:grid-cols-3 gap-5">
          {branches.map((b: any) => (
            <article
              key={b.id}
              className={`rounded-2xl bg-white p-6 border ${b.id === headOffice?.id ? 'border-[#0F4D2E] ring-1 ring-[#0F4D2E]' : 'border-[#E0EAE1]'}`}
            >
              <span className="inline-flex items-center gap-1.5 rounded-full bg-[#EAF4ED] text-[#0F4D2E] text-[10px] font-bold uppercase tracking-wider px-3 py-1">
                <Building2 className="w-3.5 h-3.5" /> {b.badgeTitle}
              </span>
              <h3 className="mt-3 font-headline font-bold text-xl text-[#123D2B]">{b.name}</h3>
              <ul className="mt-4 space-y-3 text-sm text-[#46564C]">
                <li className="flex items-start gap-2.5"><MapPin className="w-4 h-4 text-[#0F6842] shrink-0 mt-0.5" /> {b.address}</li>
                <li className="flex items-start gap-2.5"><Clock className="w-4 h-4 text-[#0F6842] shrink-0 mt-0.5" /> {b.hours}</li>
              </ul>
              <a
                href={b.mapsUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="mt-5 inline-flex items-center gap-1.5 text-xs font-bold text-[#0F4D2E] hover:text-[#A47E36] transition-colors"
              >
                Petunjuk arah <ExternalLink className="w-3.5 h-3.5" />
              </a>
            </article>
          ))}
        </div>
        <button
          type="button"
          onClick={() => goTo('/lokasi/')}
          className="mt-6 inline-flex items-center gap-2 text-xs font-bold text-[#0F4D2E] hover:text-[#A47E36] transition-colors"
        >
          Lihat peta lengkap <ArrowRight className="w-4 h-4" />
        </button>
      </Section>

      {/* 4. LEGALITAS */}
      <Section
        id="legalitas"
        no={4}
        tone="tint"
        question="Apa dasar hukum dan status kelembagaannya?"
        answer={ABOUT_CONTENT.legality || 'Berbadan hukum Koperasi Simpan Pinjam dan Pembiayaan Syariah (KSPPS), diawasi Dewan Pengawas Syariah.'}
      >
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5">
          {[
            { icon: Landmark, title: 'Badan hukum', text: 'Koperasi Simpan Pinjam dan Pembiayaan Syariah (KSPPS).' },
            { icon: ShieldCheck, title: 'Pengawasan syariah', text: 'Dewan Pengawas Syariah (DPS) mengawasi lembaga secara berkala.' },
            { icon: BookOpenCheck, title: 'Rujukan fatwa', text: 'Fatwa Dewan Syariah Nasional MUI (DSN-MUI).' },
            { icon: Scale, title: 'Pertanggungjawaban', text: 'Laporan tahunan, neraca, dan pembagian SHU disampaikan terbuka dalam RAT.' },
          ].map(({ icon: Icon, title, text }) => (
            <div key={title} className="rounded-2xl bg-white border border-[#E0EAE1] p-6">
              <span className="w-11 h-11 rounded-full bg-[#EAF4ED] text-[#0F6842] flex items-center justify-center"><Icon className="w-5 h-5" /></span>
              <h3 className="mt-4 font-headline font-bold text-lg text-[#123D2B]">{title}</h3>
              <p className="mt-1.5 text-sm leading-relaxed text-[#55665B]">{text}</p>
            </div>
          ))}
        </div>
        <p className="mt-5 flex items-start gap-2 text-sm text-[#55665B]">
          <FileCheck2 className="w-4 h-4 text-[#0F6842] shrink-0 mt-0.5" />
          Calon anggota dapat menanyakan dokumen legalitas langsung ke Kantor Pusat.
        </p>
      </Section>

      {/* 5. PENGELOLAAN UANG */}
      <Section
        id="keuangan"
        no={5}
        question="Bagaimana sistem pengelolaan uangnya?"
        answer="Simpanan anggota dikelola pada usaha riil yang halal, hasilnya dibagi sesuai akad yang disepakati, sedangkan dana zakat, infaq, sedekah, dan wakaf dikelola terpisah lewat Baitul Maal."
      >
        <ol className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-5">
          {[
            { icon: Wallet, title: 'Anggota menyetor', text: 'Anggota baru menyetor simpanan pokok dan simpanan wajib, lalu dapat menambah simpanan sukarela atau berjangka. Setoran juga dapat dijemput kas keliling di pasar.' },
            { icon: Sprout, title: 'Dikelola di sektor riil', text: 'Dana disalurkan sebagai modal kerja petani, pedagang, peternak, dan usaha mikro pada usaha riil yang halal.' },
            { icon: Handshake, title: 'Hasil dibagi sesuai akad', text: 'Simpanan Mudharabah memperoleh bagi hasil sesuai nisbah. Pembiayaan Murabahah memakai margin yang disepakati di awal dan tetap hingga lunas.' },
            { icon: HeartHandshake, title: 'Dana sosial terpisah', text: 'Baitul Maal menghimpun dan menyalurkan ZISWAF kepada mustahik.' },
          ].map(({ icon: Icon, title, text }, i) => (
            <li key={title} className="relative rounded-2xl border border-[#E0EAE1] bg-[#F8FBF8] p-6">
              <span className="absolute -top-3 left-5 rounded-full bg-[#0F4D2E] text-white text-[11px] font-bold w-7 h-7 flex items-center justify-center">{i + 1}</span>
              <Icon className="w-6 h-6 text-[#0F6842] mt-2" />
              <h3 className="mt-3 font-headline font-bold text-lg text-[#123D2B]">{title}</h3>
              <p className="mt-1.5 text-sm leading-relaxed text-[#55665B]">{text}</p>
            </li>
          ))}
        </ol>
        <div className="mt-6 grid md:grid-cols-2 gap-5">
          <div className="rounded-2xl bg-[#0F4D2E] text-white p-6">
            <h3 className="font-headline font-bold text-lg">Kehati-hatian dan likuiditas</h3>
            <p className="mt-2 text-sm leading-relaxed text-white/85">
              Likuiditas dikelola untuk menjaga keamanan simpanan sekaligus mendukung kelancaran pembiayaan sektor riil.
            </p>
          </div>
          <div className="rounded-2xl border border-[#E0EAE1] p-6">
            <h3 className="font-headline font-bold text-lg text-[#123D2B]">Transparansi kepada anggota</h3>
            <p className="mt-2 text-sm leading-relaxed text-[#55665B]">
              Neraca keuangan dan pembagian Sisa Hasil Usaha (SHU) disampaikan terbuka kepada perwakilan anggota dalam Rapat Anggota Tahunan.
            </p>
          </div>
        </div>
      </Section>

      {/* 6. PRODUK */}
      <section
        id="produk"
        ref={productsRef as React.RefObject<HTMLElement | null> as any}
        className="scroll-mt-28 py-14 sm:py-20 bg-[#EFF6F0]"
        aria-labelledby="produk-title"
      >
        <div className="max-w-7xl mx-auto px-5 sm:px-8 lg:px-12">
          <div className="max-w-3xl">
            <div className="flex items-center gap-3 text-[10px] sm:text-xs font-bold tracking-[0.18em] uppercase text-[#A47E36] mb-3">
              <span className="w-8 h-px bg-[#C6A45D]" /> Pertanyaan 06
            </div>
            <h2 id="produk-title" className="font-headline text-2xl sm:text-4xl font-bold leading-tight text-[#123D2B]">
              Apa saja produk yang tersedia?
            </h2>
            <p className="mt-4 text-base sm:text-lg leading-relaxed text-[#2F4A3B] font-medium">
              Tersedia {products.length} produk: {products.map((p: any) => p.title).join(', ')}.
            </p>
          </div>
          <div className="mt-9 grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-5">
            {products.map((p: any) => (
              <article key={p.id} className="flex flex-col rounded-2xl bg-white border border-[#E0EAE1] p-6 shadow-[0_5px_22px_rgba(17,55,34,0.06)]">
                <div className="flex items-center justify-between gap-3">
                  <span className="text-[10px] font-bold uppercase tracking-widest text-[#A47E36]">{p.akad}</span>
                  <span className="rounded-full bg-[#EAF4ED] px-3 py-1 text-[10px] font-semibold text-[#0F4D2E]">{p.badge}</span>
                </div>
                <h3 className="mt-3 font-headline text-xl font-bold text-[#123D2B]">{p.title}</h3>
                <p className="mt-2 text-sm leading-relaxed text-[#55665B]">{p.description}</p>
                <ul className="mt-4 space-y-2 flex-1">
                  {(p.features || []).map((f: string, i: number) => (
                    <li key={i} className="flex items-start gap-2 text-sm leading-relaxed text-[#46564C]">
                      <CheckCircle2 className="w-4 h-4 text-[#168052] shrink-0 mt-0.5" /> {f}
                    </li>
                  ))}
                </ul>
                <button
                  type="button"
                  onClick={() => onOpenRegister(p.id === 'simpanan-mudharabah' ? 'simpanan' : p.id === 'pembiayaan-syariah' ? 'pembiayaan' : 'qurban')}
                  className="mt-5 inline-flex items-center gap-2 text-xs font-bold text-[#0F4D2E] hover:text-[#A47E36] transition-colors"
                >
                  Tanyakan produk ini <ArrowRight className="w-4 h-4" />
                </button>
              </article>
            ))}
          </div>
          <button
            type="button"
            onClick={() => onNavigateToProducts?.()}
            className="mt-6 inline-flex items-center gap-2 text-xs font-bold text-[#0F4D2E] hover:text-[#A47E36] transition-colors"
          >
            Halaman produk lengkap <ArrowRight className="w-4 h-4" />
          </button>
        </div>
      </section>

      {/* 7. PRINSIP SYARIAH */}
      <Section
        id="syariah"
        no={7}
        question="Bagaimana prinsip syariah diterapkan?"
        answer="Tanpa bunga (riba): setiap layanan memakai akad syariah yang jelas, dijalankan pada usaha riil yang halal, dan diawasi DPS dengan rujukan fatwa DSN-MUI."
      >
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
          {[
            { icon: BadgeCheck, title: 'Bebas riba', text: 'Simpanan syariah tidak memakai bunga. Keuntungan anggota berasal dari nisbah bagi hasil atas pengelolaan modal pada usaha riil halal.' },
            { icon: FileCheck2, title: 'Akad yang jelas', text: 'Mudharabah untuk simpanan bagi hasil, Murabahah untuk pembiayaan jual beli, dan Wadiah untuk Tabungan Qurban.' },
            { icon: Scale, title: 'Margin tetap, tanpa denda bunga', text: 'Margin Murabahah disepakati di awal dan tidak berubah. Keterlambatan tidak dikenai denda bunga.' },
            { icon: Sprout, title: 'Usaha riil yang halal', text: 'Dana disalurkan ke sektor riil seperti pertanian, perdagangan, dan peternakan, bukan transaksi ribawi.' },
            { icon: Users, title: 'Ta’awun, bebas ijon dan rentenir', text: 'BMT didirikan untuk membebaskan masyarakat Toili dari rentenir desa dan sistem ijon pertanian melalui semangat tolong-menolong.' },
            { icon: ShieldCheck, title: 'Diawasi DPS', text: 'Dewan Pengawas Syariah mengawasi lembaga secara berkala dengan rujukan fatwa DSN-MUI.' },
          ].map(({ icon: Icon, title, text }) => (
            <div key={title} className="rounded-2xl bg-white border border-[#E0EAE1] p-6">
              <span className="w-11 h-11 rounded-full bg-[#EAF4ED] text-[#0F6842] flex items-center justify-center"><Icon className="w-5 h-5" /></span>
              <h3 className="mt-4 font-headline font-bold text-lg text-[#123D2B]">{title}</h3>
              <p className="mt-1.5 text-sm leading-relaxed text-[#55665B]">{text}</p>
            </div>
          ))}
        </div>
        <div className="mt-6 grid md:grid-cols-2 gap-5">
          <div className="rounded-2xl border border-[#E0EAE1] bg-[#F8FBF8] p-6">
            <h3 className="font-headline font-bold text-lg text-[#123D2B]">Akad Mudharabah</h3>
            <p className="mt-2 text-sm leading-relaxed text-[#55665B]">
              Kemitraan usaha: anggota menyediakan modal dan BMT mengelolanya. Keuntungan dibagi berdasarkan nisbah yang disepakati bersama.
            </p>
          </div>
          <div className="rounded-2xl border border-[#E0EAE1] bg-[#F8FBF8] p-6">
            <h3 className="font-headline font-bold text-lg text-[#123D2B]">Akad Murabahah</h3>
            <p className="mt-2 text-sm leading-relaxed text-[#55665B]">
              Jual beli: BMT membeli barang yang dibutuhkan anggota, lalu menjualnya kepada anggota dengan margin yang disepakati.
            </p>
          </div>
        </div>
      </Section>

      {/* 8. KONTAK */}
      <Section
        id="kontak"
        no={8}
        tone="tint"
        question="Bagaimana cara menghubungi petugas resmi?"
        answer="Hubungi Kantor Pusat atau cabang lewat WhatsApp dan telepon di bawah ini, atau datang langsung pada jam layanan. Pengajuan pembiayaan juga dapat dilakukan lewat petugas lapangan."
      >
        <div className="grid grid-cols-1 md:grid-cols-3 gap-5">
          {branches.map((b: any) => (
            <article key={b.id} className="rounded-2xl bg-white border border-[#E0EAE1] p-6">
              <h3 className="font-headline font-bold text-lg text-[#123D2B]">{b.name}</h3>
              <p className="mt-1 text-xs text-[#718078]">{b.hours}</p>
              <div className="mt-5 flex flex-col gap-2.5">
                <a
                  href={waLink(b.whatsapp)}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="btn-institutional inline-flex items-center justify-center gap-2 rounded-full bg-[#0F4D2E] hover:bg-[#083B24] text-white px-5 py-3 text-xs font-bold"
                >
                  <MessageCircle className="w-4 h-4" /> WhatsApp {b.whatsapp}
                </a>
                <a
                  href={telLink(b.phone)}
                  className="btn-institutional inline-flex items-center justify-center gap-2 rounded-full border border-[#CFE0D3] bg-white hover:bg-[#F4F9F5] text-[#123D2B] px-5 py-3 text-xs font-bold"
                >
                  <Phone className="w-4 h-4" /> Telepon {b.phone}
                </a>
              </div>
            </article>
          ))}
        </div>

        <div className="mt-6 grid md:grid-cols-2 gap-5">
          <div className="rounded-2xl bg-white border border-[#E0EAE1] p-6">
            <h3 className="font-headline font-bold text-lg text-[#123D2B]">Yang perlu disiapkan</h3>
            <ul className="mt-3 space-y-2.5 text-sm leading-relaxed text-[#46564C]">
              <li className="flex items-start gap-2"><CheckCircle2 className="w-4 h-4 text-[#168052] shrink-0 mt-0.5" /> Menjadi anggota: isi formulir keanggotaan, fotokopi KTP, dan setor simpanan pokok serta simpanan wajib.</li>
              <li className="flex items-start gap-2"><CheckCircle2 className="w-4 h-4 text-[#168052] shrink-0 mt-0.5" /> Mengajukan pembiayaan: bawa KTP dan rincian kebutuhan usaha untuk diverifikasi.</li>
            </ul>
            <button
              type="button"
              onClick={() => onOpenRegister('simpanan')}
              className="mt-5 inline-flex items-center gap-2 text-xs font-bold text-[#0F4D2E] hover:text-[#A47E36] transition-colors"
            >
              Isi formulir pendaftaran <ArrowRight className="w-4 h-4" />
            </button>
          </div>
          <div className="rounded-2xl bg-[#0F4D2E] text-white p-6">
            <h3 className="font-headline font-bold text-lg">Kanal resmi lainnya</h3>
            <div className="mt-4 flex flex-wrap gap-3">
              {SITE_SETTINGS.instagramUrl && (
                <a href={SITE_SETTINGS.instagramUrl} target="_blank" rel="noopener noreferrer" className="inline-flex items-center gap-2 rounded-full border border-white/25 bg-white/10 hover:bg-white/20 px-4 py-2.5 text-xs font-semibold">
                  <Instagram className="w-4 h-4" /> Instagram
                </a>
              )}
              {SITE_SETTINGS.facebookUrl && (
                <a href={SITE_SETTINGS.facebookUrl} target="_blank" rel="noopener noreferrer" className="inline-flex items-center gap-2 rounded-full border border-white/25 bg-white/10 hover:bg-white/20 px-4 py-2.5 text-xs font-semibold">
                  <Facebook className="w-4 h-4" /> Facebook
                </a>
              )}
            </div>
            <p className="mt-4 text-xs leading-relaxed text-white/75">
              Demi keamanan, gunakan hanya nomor dan akun yang tercantum di situs ini sebelum menyerahkan data pribadi atau dana.
            </p>
          </div>
        </div>
      </Section>
    </div>
  );
};
