export interface Article {
  id: string;
  category: string;
  date: string;
  meta: string;
  title: string;
  excerpt: string;
  image: string;
  imageAlt: string;
  tags?: string[];
  featured?: boolean;
  contentParagraphs?: string[];
}

export interface ProductItem {
  id: string;
  badge: string;
  title: string;
  description: string;
  features: string[];
  image: string;
  imageAlt: string;
  akad: string;
  showOnHome?: boolean;
}

export interface BoardMember {
  name: string;
  role: string;
  badge: string;
  photo: string;
  quote: string;
}

export interface OfficeBranch {
  id: string;
  name: string;
  badgeTitle: string;
  address: string;
  hours: string;
  phone: string;
  whatsapp: string;
  mapsUrl: string;
  image: string;
  mapEmbedQuery: string;
}

export interface FaqItem {
  id: string;
  question: string;
  answer: string;
}

export interface TestimonialItem {
  id: string;
  name: string;
  role: string;
  location: string;
  memberSince: string;
  productUsed: string;
  quote: string;
  avatarText: string;
  avatarImage?: string;
  rating?: number;
}

export const ARTICLES_DATA: Article[] = [
  {
    id: 'art-01',
    category: 'Pemberdayaan',
    date: '24 Sep 2026',
    meta: '24 Sep 2026',
    title: 'Kiprah Pemberdayaan Ekonomi Petani dan Pedagang di Toili',
    excerpt: 'Penyaluran pembiayaan produktif dan pendampingan usaha bagi kelompok tani serta pedagang pasar di wilayah Toili.',
    image: 'https://images.unsplash.com/photo-1595974482597-4b8da8879bc5?auto=format&fit=crop&w=1200&q=80',
    imageAlt: 'Petani di persawahan Toili',
    tags: ['Pertanian', 'Toili'],
    featured: true,
    contentParagraphs: [
      'BMT Al-Muhajirin Toili terus memperkuat peran ta’awun dalam menggerakkan ekonomi riil masyarakat. Melalui penyaluran pembiayaan musyarakah dan murabahah untuk kebutuhan bibit padi, pupuk, serta modal kerja dagang, ratusan anggota di sentra pertanian Toili mendapatkan akses pendanaan yang halal dan adil.',
      'Selain pembiayaan modal, pendampingan tata kelola keuangan keluarga dan kelompok tani terus diadakan secara rutin. Hal ini memastikan petani terbebas dari sistem ijon yang merugikan serta memiliki pencatatan hasil panen yang lebih tertib.',
      'Sinergi antara Baitul Maal dan Baitul Tamwil membuktikan bahwa permodalan syariah dapat berakar kokoh pada sektor riil masyarakat pedesaan.',
    ],
  },
  {
    id: 'art-02',
    category: 'Laporan',
    date: '19 Sep 2026',
    meta: '19 Sep 2026',
    title: 'RAT: Aset Koperasi Tumbuh 24%',
    excerpt: 'Laporan pertanggungjawaban tahunan mencatat pertumbuhan modal dan kelancaran perputaran pembiayaan anggota.',
    image: 'https://images.unsplash.com/photo-1486406146926-c627a92ad1ab?auto=format&fit=crop&w=800&q=80',
    imageAlt: 'Kantor BMT Al-Muhajirin',
    contentParagraphs: [
      'Rapat Anggota Tahunan (RAT) KSPPS BMT Al-Muhajirin Toili mencatatkan kenaikan total aset sebesar 24% pada periode buku terakhir. Peningkatan ini didorong oleh pertumbuhan simpanan mudharabah anggota dan perputaran pembiayaan modal kerja yang lancar.',
      'Pengurus menegaskan bahwa seluruh indikator kesehatan keuangan koperasi berada pada batas aman sesuai regulasi kementerian koperasi dan pengawasan syariah oleh DPS.',
      'Transparansi neraca keuangan dan pembagian Sisa Hasil Usaha (SHU) diserahkan secara terbuka kepada perwakilan anggota dari seluruh unit layanan.',
    ],
  },
  {
    id: 'art-03',
    category: 'Layanan',
    date: '10 Sep 2026',
    meta: '10 Sep 2026',
    title: 'Armada Kas Keliling Layani Transaksi di Pasar Sentral Toili',
    excerpt: 'Fasilitas setoran simpanan dan pembayaran angsuran langsung di kios pedagang untuk efisiensi waktu usaha.',
    image: 'https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?auto=format&fit=crop&w=800&q=80',
    imageAlt: 'Petugas layanan BMT melayani anggota',
    contentParagraphs: [
      'Untuk mempermudah transaksi para pedagang pasar basah dan toko kelontong di Sentra Niaga Toili, armada kas keliling BMT Al-Muhajirin beroperasi setiap pagi.',
      'Layanan jemput bola ini memungkinkan anggota menyetor simpanan harian atau membayar angsuran pembiayaan tanpa harus meninggalkan kios dagangan mereka.',
      'Petugas dilengkapi perangkat pencatatan digital portabel sehingga bukti transaksi langsung tercetak secara real-time di tempat.',
    ],
  },
  {
    id: 'art-04',
    category: 'Pembiayaan',
    date: '5 Sep 2026',
    meta: '5 Sep 2026',
    title: 'Penyaluran Pembiayaan Musim Tanam Rp 4,5 Miliar',
    excerpt: 'Penyediaan modal sarana produksi padi, benih, dan pupuk bagi kelompok tani menjelang musim tanam.',
    image: 'https://images.unsplash.com/photo-1542838132-92c53300491e?auto=format&fit=crop&w=800&q=80',
    imageAlt: 'Pedagang kebutuhan pokok di pasar lokal',
    contentParagraphs: [
      'Menyambut musim tanam serempak di Dataran Toili, BMT Al-Muhajirin menyalurkan fasilitas pembiayaan sarana produksi pertanian senilai Rp 4,5 Miliar.',
      'Pembiayaan menggunakan akad Murabahah pengadaan barang, di mana BMT langsung bekerja sama dengan distributor resmi benih bersertifikat dan pupuk untuk memastikan ketersediaan barang bagi petani anggota.',
      'Skema pembayaran angsuran diselaraskan dengan waktu panen (yarnen/bayar panen) demi meringankan beban operasional petani selama masa tanam.',
    ],
  },
  {
    id: 'art-05',
    category: 'Pemberdayaan',
    date: '28 Agu 2026',
    meta: '28 Agu 2026',
    title: 'Pelatihan Pembukuan Keuangan Usaha Mikro bagi Anggota di Toili',
    excerpt: 'Peningkatan literasi keuangan bagi 45 pelaku UMKM binaan BMT Al-Muhajirin untuk menertibkan arus kas usaha.',
    image: 'https://images.unsplash.com/photo-1454165804606-c3d57bc86b40?auto=format&fit=crop&w=800&q=80',
    imageAlt: 'Sesi pelatihan pembukuan keuangan mikro',
    contentParagraphs: [
      'Sebanyak 45 pelaku usaha mikro dari berbagai desa di Kecamatan Toili mengikuti pelatihan dasar pencatatan buku kas yang diselenggarakan di aula kantor pusat BMT Al-Muhajirin.',
      'Materi mencakup pemisahan uang usaha dan uang pribadi, penghitungan harga pokok penjualan (HPP), serta perencanaan cadangan perputaran modal.',
      'Peserta menyambut antusias kegiatan ini sebagai bekal pengembangan kapasitas usaha agar lebih mandiri dan terstruktur.',
    ],
  },
  {
    id: 'art-06',
    category: 'Sosial',
    date: '15 Agu 2026',
    meta: '15 Agu 2026',
    title: 'Penyaluran Paket Perlengkapan Sekolah bagi Anak Yatim Dhuafa',
    excerpt: 'Program Baitul Maal BMT Al-Muhajirin menyalurkan bantuan pendidikan dari titipan zakat dan infaq anggota.',
    image: 'https://images.unsplash.com/photo-1497633762265-9d179a990aa6?auto=format&fit=crop&w=800&q=80',
    imageAlt: 'Pemberian bantuan pendidikan bagi anak sekolah',
    contentParagraphs: [
      'Melalui dana sosial Baitul Maal, BMT Al-Muhajirin Toili mendistribusikan 120 paket perlengkapan sekolah dan beasiswa pendidikan bagi putra-putri yatim dan dhuafa di Dataran Toili.',
      'Dana bersumber dari optimalisasi penghimpunan Zakat, Infaq, dan Sedekah (ZIS) para anggota dan masyarakat umum yang diamanahkan kepada lembaga.',
      'Program ini merupakan bentuk nyata kepedulian sosial ta’awun dalam meringankan beban keluarga mustahik di tahun ajaran baru.',
    ],
  },
];

export const PRODUCTS_DATA: ProductItem[] = [
  {
    id: 'simpanan-mudharabah',
    badge: 'Bagi Hasil s/d 65%',
    title: 'Simpanan Mudharabah',
    description: 'Simpanan sukarela dan berjangka dengan skema bagi hasil kemitraan. Dana dikelola pada usaha riil produktif tanpa potongan biaya administrasi bulanan.',
    features: [
      'Nisbah bagi hasil hingga 65% untuk anggota',
      'Bebas biaya administrasi bulanan',
      'Penyaluran dana pada sektor riil halal',
    ],
    image: 'https://images.unsplash.com/photo-1567532939604-b6b5b0db2604?auto=format&fit=crop&w=800&q=80',
    imageAlt: 'Anggota simpanan syariah',
    akad: 'Akad Mudharabah Muthlaqah',
    showOnHome: true,
  },
  {
    id: 'pembiayaan-syariah',
    badge: 'Margin Tetap',
    title: 'Pembiayaan Syariah',
    description: 'Penyediaan modal kerja, barang dagangan, dan sarana pertanian dengan akad jual beli. Nilai margin disepakati di awal dan tetap hingga lunas.',
    features: [
      'Margin harga tetap tanpa perubahan',
      'Jadwal angsuran disesuaikan dengan siklus panen atau usaha',
      'Tanpa denda bunga keterlambatan',
    ],
    image: 'https://images.unsplash.com/photo-1588964895597-cfccd6e2dbf9?auto=format&fit=crop&w=800&q=80',
    imageAlt: 'Pelaku usaha toko kelontong di Toili',
    akad: 'Akad Murabahah',
    showOnHome: true,
  },
  {
    id: 'tabungan-qurban',
    badge: 'Bebas Biaya Admin',
    title: 'Tabungan Qurban',
    description: 'Simpanan terencana untuk pengadaan hewan qurban tahunan. Setoran berkala tanpa potongan saldo hingga waktu pembelian hewan qurban tiba.',
    features: [
      'Nominal setoran bulanan fleksibel',
      'Nol biaya administrasi dan penarikan',
      'Kerja sama penyediaan hewan bersama peternak lokal',
    ],
    image: 'https://images.unsplash.com/photo-1570042225831-d98fa7577f1e?auto=format&fit=crop&w=800&q=80',
    imageAlt: 'Peternakan sapi lokal penyedia qurban',
    akad: 'Akad Wadiah',
    showOnHome: true,
  },
];

export const BOARD_MEMBERS: BoardMember[] = [
  {
    name: 'H. Achmad Syukron S.E.I., M.E.',
    role: 'Ketua',
    badge: 'Pengurus',
    photo: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&w=800&q=80',
    quote: 'Pengelolaan dana anggota berpegang teguh pada prinsip kehati-hatian, kepatuhan syariah, dan transparansi laporan keuangan.',
  },
  {
    name: 'Hj. Siti Mutmainnah',
    role: 'Sekretaris',
    badge: 'Pengurus',
    photo: 'https://images.unsplash.com/photo-1573497019940-1c28c88b4f3e?auto=format&fit=crop&w=800&q=80',
    quote: 'Ketertiban tata kelola administrasi dan pencatatan anggota menjadi prioritas utama layanan operasional.',
  },
  {
    name: 'Ir. M. Ridwan Arifin',
    role: 'Bendahara',
    badge: 'Pengurus',
    photo: 'https://images.unsplash.com/photo-1500648767791-00dcc994a43e?auto=format&fit=crop&w=800&q=80',
    quote: 'Manajemen likuiditas diarahkan untuk menjaga keamanan simpanan dan mendukung kelancaran pembiayaan sektor riil.',
  },
];

export const BRANCHES_DATA: OfficeBranch[] = [
  {
    id: 'toili',
    name: 'Kantor Pusat Toili',
    badgeTitle: 'Kantor Pusat',
    address: 'Jl. Trans Sulawesi, Toili, Kab. Banggai, Sulawesi Tengah',
    hours: 'Senin – Jumat : 08.00 – 16.00 WITA',
    phone: '(0461) 412-880',
    whatsapp: '0821-9876-5432',
    mapsUrl: 'https://maps.google.com/?q=Toili,+Kabupaten+Banggai,+Sulawesi+Tengah',
    image: 'https://images.unsplash.com/photo-1541888946425-d0fbb186c5f9?auto=format&fit=crop&w=800&q=80',
    mapEmbedQuery: 'Toili,+Kabupaten+Banggai,+Sulawesi+Tengah',
  },
  {
    id: 'luwuk',
    name: 'Cabang Luwuk',
    badgeTitle: 'Cabang Pelayanan',
    address: 'Jl. Trans Sulawesi Luwuk, Kab. Banggai, Sulawesi Tengah',
    hours: 'Senin – Jumat : 08.00 – 16.00 WITA',
    phone: '(0461) 324-589',
    whatsapp: '0821-9876-5432',
    mapsUrl: 'https://maps.google.com/?q=Luwuk,+Kabupaten+Banggai,+Sulawesi+Tengah',
    image: 'https://images.unsplash.com/photo-1486406146926-c627a92ad1ab?auto=format&fit=crop&w=800&q=80',
    mapEmbedQuery: 'Luwuk,+Kabupaten+Banggai,+Sulawesi+Tengah',
  },
  {
    id: 'bunta',
    name: 'Cabang Bunta',
    badgeTitle: 'Cabang Pelayanan',
    address: 'Bunta, Kab. Banggai, Sulawesi Tengah',
    hours: 'Senin – Jumat : 08.00 – 16.00 WITA',
    phone: '(0461) 812-701',
    whatsapp: '0812-4567-8901',
    mapsUrl: 'https://maps.google.com/?q=Bunta,+Kabupaten+Banggai,+Sulawesi+Tengah',
    image: 'https://images.unsplash.com/photo-1497366216548-37526070297c?auto=format&fit=crop&w=800&q=80',
    mapEmbedQuery: 'Bunta,+Kabupaten+Banggai,+Sulawesi+Tengah',
  },
];

export const FAQ_DATA: FaqItem[] = [
  {
    id: 'faq-1',
    question: 'Apa itu BMT?',
    answer: 'BMT (Baitul Maal wa Tamwil) adalah koperasi simpan pinjam dan pembiayaan syariah. Baitul Maal mengelola dana sosial (Zakat, Infaq, Sedekah, Wakaf), sedangkan Baitul Tamwil mengelola simpanan dan pembiayaan produktif anggota.',
  },
  {
    id: 'faq-2',
    question: 'Apa perbedaan simpanan syariah dengan tabungan biasa?',
    answer: 'Simpanan syariah tidak menggunakan bunga pinjaman (riba). Keuntungan anggota diperoleh melalui nisbah bagi hasil atas pengelolaan modal pada usaha riil halal.',
  },
  {
    id: 'faq-3',
    question: 'Apa itu akad Mudharabah?',
    answer: 'Mudharabah adalah akad kemitraan usaha di mana anggota menyediakan modal dan BMT mengelolanya. Hasil keuntungan usaha dibagi berdasarkan persentase (nisbah) yang disepakati bersama sejak awal.',
  },
  {
    id: 'faq-4',
    question: 'Apa itu Murabahah?',
    answer: 'Murabahah adalah akad pembiayaan dengan skema jual beli barang. BMT membeli barang yang dibutuhkan anggota, kemudian menjualnya kepada anggota dengan tambahan margin laba yang disepakati dan diangsur.',
  },
  {
    id: 'faq-5',
    question: 'Bagaimana cara menjadi anggota?',
    answer: 'Pendaftaran dilakukan dengan mengisi formulir keanggotaan, menyerahkan fotokopi KTP, menyetor simpanan pokok dan simpanan wajib sesuai ketentuan koperasi.',
  },
  {
    id: 'faq-6',
    question: 'Apakah BMT melayani UMKM dan petani?',
    answer: 'Ya. Pembiayaan modal kerja petani, pedagang pasar, peternak, dan pelaku usaha mikro di Toili merupakan fokus utama layanan BMT.',
  },
  {
    id: 'faq-7',
    question: 'Di mana kantor BMT Al-Muhajirin Toili?',
    answer: 'Kantor Pusat berlokasi di Toili, didukung kantor cabang pelayanan di Luwuk dan Bunta, serta layanan kas keliling untuk area pasar.',
  },
  {
    id: 'faq-8',
    question: 'Bagaimana cara mengajukan pembiayaan?',
    answer: 'Pengajuan dilakukan melalui kantor pusat, kantor cabang, atau petugas lapangan dengan membawa KTP dan rincian kebutuhan usaha untuk diverifikasi.',
  },
];

export const TESTIMONIALS_DATA: TestimonialItem[] = [
  {
    id: 'testi-1',
    name: 'Pak Slamet Riyadi',
    role: 'Petani Padi Organik',
    location: 'Desa Singkoyo, Kec. Toili',
    memberSince: 'Anggota sejak 2021',
    productUsed: 'Pembiayaan Sarana Tani (Murabahah)',
    quote:
      'Dulu setiap musim tanam kami bingung modal pupuk dan bibit, sering terpaksa pinjam ke tengkulak dengan harga gabah ditekan saat panen. Alhamdulillah lewat pembiayaan Murabahah BMT Al-Muhajirin, kebutuhan sarana produksi terbeli di awal dengan margin yang jelas dan transparan. Panen kami jadi milik kami seutuhnya.',
    avatarText: 'SR',
    avatarImage: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&w=200&q=80',
    rating: 5,
  },
  {
    id: 'testi-2',
    name: 'Ibu Hj. Masnah',
    role: 'Pedagang Bahan Pokok & Sembako',
    location: 'Pasar Sentral Toili',
    memberSince: 'Anggota sejak 2019',
    productUsed: 'Simpanan Mudharabah & Kas Keliling',
    quote:
      'Petugas BMT jemput setoran langsung ke lapak pasar setiap hari, jadi saya tidak perlu repot meninggalkan dagangan. Yang paling menenangkan adalah akadnya murni syariah, tidak ada potongan administrasi memberatkan dan tidak ada bunga berbunga seperti rentenir harian.',
    avatarText: 'HM',
    avatarImage: 'https://images.unsplash.com/photo-1544005313-94ddf0286df2?auto=format&fit=crop&w=200&q=80',
    rating: 5,
  },
  {
    id: 'testi-3',
    name: 'Pak Wayan Sudarma',
    role: 'Peternak Sapi & Pengusaha Pakan',
    location: 'Mansahang, Kec. Toili Barat',
    memberSince: 'Anggota sejak 2020',
    productUsed: 'Pembiayaan Modal Usaha Produktif',
    quote:
      'Bagi kami peternak di Toili Barat, BMT Al-Muhajirin sangat kooperatif. Waktu pengadaan bibit ternak didampingi langsung, jadwal angsuran disesuaikan dengan siklus panen ternak. Semangat ta\'awun dan kekeluargaannya benar-benar nyata membantu kami berkembang.',
    avatarText: 'WS',
    avatarImage: 'https://images.unsplash.com/photo-1500648767791-00dcc994a43e?auto=format&fit=crop&w=200&q=80',
    rating: 5,
  },
];


export interface SiteSettings {
  logoUrl: string;
  logoWidth: number;
  heroImages: string[];
  backgroundImage: string;
  promoImage: string;
  promoTitle: string;
  promoDescription: string;
  promoEnabled: boolean;
  chatLabel: string;
  chatUrl: string;
  instagramUrl: string;
  facebookUrl: string;
  topbarText: string;
  operatingHours: string;
}

export interface AboutContent {
  title: string;
  heading: string;
  paragraphs: string[];
  vision: string;
  mission: string[];
  legality: string;
}

export const SITE_SETTINGS: SiteSettings = {
  logoUrl: '/BMT-01/images/logo/logo%20BMT.png',
  logoWidth: 160,
  heroImages: [
    'https://images.unsplash.com/photo-1500382017468-9049fed747ef?auto=format&fit=crop&w=2000&q=85',
    'https://images.unsplash.com/photo-1595974482597-4b8da8879bc5?auto=format&fit=crop&w=2000&q=85',
    'https://images.unsplash.com/photo-1542838132-92c53300491e?auto=format&fit=crop&w=2000&q=85',
    'https://images.unsplash.com/photo-1497366216548-37526070297c?auto=format&fit=crop&w=2000&q=85',
  ],
  backgroundImage: '',
  promoImage: '',
  promoTitle: 'Promo & Ucapan Hari Besar',
  promoDescription: 'Kolom ini dapat digunakan untuk promo produk, pengumuman, atau ucapan hari besar Islam.',
  promoEnabled: true,
  chatLabel: 'Chat Admin',
  chatUrl: '',
  instagramUrl: 'https://www.instagram.com/bmtalmuhajirin_official/',
  facebookUrl: 'https://web.facebook.com/profile.php?id=61573199156163',
  topbarText: 'KANTOR PUSAT TOILI',
  operatingHours: 'Senin – Jumat 08.00 – 16.00 WITA',
};

export const ABOUT_CONTENT: AboutContent = {
  title: 'Tentang Kami',
  heading: 'KSPPS BMT Al-Muhajirin Toili',
  paragraphs: [
    'BMT AL-MUHAJIRIN didirikan dengan niat membebaskan masyarakat Toili dari transaksi ribawi, rentenir desa, serta sistem ijon pertanian melalui semangat ta\'awun.',
    'Lembaga menjalankan dua fungsi utama: Baitul Maal untuk pengelolaan dana sosial keagamaan (Zakat, Infaq, Sedekah, dan Wakaf), serta Baitul Tamwil untuk layanan simpanan dan pembiayaan modal usaha sektor riil.',
    'Operasional BMT diawasi secara berkala oleh Dewan Pengawas Syariah (DPS) dengan rujukan fatwa DSN-MUI dan kepatuhan regulasi perkoperasian.',
  ],
  vision: 'Menjadi lembaga keuangan syariah yang mandiri, sehat, dan dipercaya dalam menopang perekonomian masyarakat di wilayah Toili.',
  mission: [
    'Menghimpun dan menyalurkan dana sesuai prinsip syariat Islam.',
    'Memperkuat permodalan usaha petani, pedagang, dan peternak Toili.',
    'Menyalurkan dana ZISWAF bagi kebutuhan mustahik.',
  ],
  legality: 'Berbadan hukum Koperasi Simpan Pinjam dan Pembiayaan Syariah (KSPPS) resmi, dengan pengawasan syariah oleh Dewan Pengawas Syariah (DPS).',
};

export function applyCmsContent(payload: any) {
  if (!payload) return;
  if (payload.settings) Object.assign(SITE_SETTINGS, payload.settings);
  if (payload.pages?.about) Object.assign(ABOUT_CONTENT, payload.pages.about);

  const replaceArray = (target: any[], source: any[]) => {
    if (!Array.isArray(source) || source.length === 0) return;
    target.splice(0, target.length, ...source);
  };
  replaceArray(PRODUCTS_DATA, payload.products);
  replaceArray(ARTICLES_DATA, payload.articles);
  replaceArray(BOARD_MEMBERS as any[], payload.board);
  replaceArray(BRANCHES_DATA, payload.branches);
  replaceArray(FAQ_DATA, payload.faq);
  replaceArray(TESTIMONIALS_DATA, payload.testimonials);
}
