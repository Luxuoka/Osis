-- ============================================================
-- OSIS SMA SANTA MARIA 1 BANDUNG - SEED DATA
-- ============================================================

-- 1. PENGATURAN AWAL
INSERT INTO public.pengaturan (
    periode,
    pendaftaran_buka,
    hasil_seleksi_terbuka,
    stats_departemen,
    stats_pengurus,
    stats_proker,
    stats_periode,
    nama_organisasi,
    nama_sekolah,
    nama_julukan,
    slogan,
    alamat,
    email,
    telepon,
    instagram,
    video_profil_url
) VALUES (
    '2026/2027',
    true,
    true,
    '9',
    '64',
    '12+',
    '2026/2027',
    'OSIS SMA Santa Maria 1 Bandung',
    'SMA Santa Maria 1 Bandung',
    'Sanmar 1 Bandung',
    'Born to Lead the Future',
    'Jl. Bengawan No. 6, Cihapit, Kec. Bandung Wetan, Kota Bandung, Jawa Barat 40114',
    'osissantamaria1bdg@gmail.com',
    '(022) 7202534',
    'https://instagram.com/osissantamaria1bdg',
    '/video-profil.mp4'
) ON CONFLICT DO NOTHING;

-- 2. DEPARTEMEN (9 Departemen)
INSERT INTO public.departemen (id, nama, singkatan, deskripsi, urutan) VALUES
('d1111111-1111-1111-1111-111111111111', 'Departemen Kedisiplinan & Bela Negara', 'KESTIB', 'Membina kedisiplinan, ketertiban siswa, dan pembinaan karakter kepemimpinan berwibawa.', 1),
('d2222222-2222-2222-2222-222222222222', 'Departemen Seni & Budaya', 'SENBUD', 'Mewadahi apresiasi seni, budaya, dan kreativitas siswa melalui berbagai kegiatan pementasan dan pameran.', 2),
('d3333333-3333-3333-3333-333333333333', 'Departemen Olahraga & Kesehatan', 'ORKES', 'Menyelenggarakan kegiatan olahraga, kebugaran jasmani, dan edukasi kesehatan bagi seluruh siswa.', 3),
('d4444444-4444-4444-4444-444444444444', 'Departemen Komunikasi, Media & Humas', 'MEDINFO', 'Pengelolaan publikasi visual, media sosial, dokumentasi kegiatan, serta relasi eksternal antar-sekolah.', 4),
('d5555555-5555-5555-5555-555555555555', 'Departemen Kewirausahaan & Ekonomi Kreatif', 'KWU', 'Mengembangkan jiwa entrepreneur siswa melalui kegiatan bisnis kreatif dan bazar sekolah.', 5),
('d6666666-6666-6666-6666-666666666666', 'Departemen Akademik & Riset', 'AKADRIS', 'Mendorong prestasi akademik melalui olimpiade, tutor sebaya, dan kegiatan riset ilmiah.', 6),
('d7777777-7777-7777-7777-777777777777', 'Departemen Kerohanian & Budi Pekerti', 'ROHANI', 'Meningkatkan ketakwaan, nilai-nilai iman Katolik, dan kegiatan sosial kepedulian masyarakat.', 7),
('d8888888-8888-8888-8888-888888888888', 'Departemen Lingkungan Hidup & Adiwiyata', 'LH', 'Menjaga kelestarian lingkungan sekolah, penghijauan, dan kebersihan lingkungan belajar.', 8),
('d9999999-9999-9999-9999-999999999999', 'Departemen Teknologi & Inovasi', 'IPTEK', 'Pengembangan portal digital siswa, teknologi informasi, dan tata kelola sistem informasi sekolah.', 9)
ON CONFLICT DO NOTHING;

-- 3. PENGURUS INTI (7 Pengurus Inti Lengkap)
INSERT INTO public.pengurus (nama, jabatan, tipe, foto_url, urutan, instagram) VALUES
('Arya Satria Pratama', 'Ketua Umum', 'inti', 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=500&auto=format&fit=crop&q=80', 1, '@aryasatria_'),
('Nadia Clarissa Putri', 'Ketua 1', 'inti', 'https://images.unsplash.com/photo-1517841905240-472988babdf9?w=500&auto=format&fit=crop&q=80', 2, '@nadiaclarissa'),
('Bima Wicaksono', 'Ketua 2', 'inti', 'https://images.unsplash.com/photo-1539571696357-5a69c17a67c6?w=500&auto=format&fit=crop&q=80', 3, '@bimawicak'),
('Zahra Aulia Rahmadani', 'Sekretaris 1', 'inti', 'https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=500&auto=format&fit=crop&q=80', 4, '@zahrauliarr'),
('Farel Akbar Hidayat', 'Sekretaris 2', 'inti', 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=500&auto=format&fit=crop&q=80', 5, '@farelakbar'),
('Cinta Laura Maharani', 'Bendahara 1', 'inti', 'https://images.unsplash.com/photo-1524504388940-b1c1722653e1?w=500&auto=format&fit=crop&q=80', 6, '@cintalamaharani'),
('Dimas Rizky Ananta', 'Bendahara 2', 'inti', 'https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=500&auto=format&fit=crop&q=80', 7, '@dimasrizkya')
ON CONFLICT DO NOTHING;

-- 4. PROGRAM KERJA
INSERT INTO public.program_kerja (departemen_id, judul, deskripsi, file_url, status) VALUES
('d2222222-2222-2222-2222-222222222222', 'Santa Maria Cultural Festival', 'Festival seni dan budaya tahunan yang menampilkan karya siswa dari berbagai bidang kesenian.', '#', 'Terlaksana'),
('d3333333-3333-3333-3333-333333333333', 'Santa Maria Sport Championship', 'Turnamen olahraga antar kelas dan kegiatan kebugaran siswa SMA Santa Maria 1 Bandung.', '#', 'Sedang Berjalan'),
('d4444444-4444-4444-4444-444444444444', 'Sanmar Media Creative Academy', 'Pelatihan jurnalistik sekolah, podcast siswa, fotografi jurnalistik, dan videografi sinematik.', '#', 'Terlaksana'),
('d5555555-5555-5555-5555-555555555555', 'Creative Marketplace & Bazaar Kewirausahaan', 'Pemasaran produk kreativitas siswa ke masyarakat umum secara daring dan luring di lingkungan sekolah.', '#', 'Rencana'),
('d1111111-1111-1111-1111-111111111111', 'Latihan Dasar Kepemimpinan Siswa (LDKS) 2026', 'Pembekalan kepemimpinan terintegrasi, etika organisasi, dan wawasan kebangsaan untuk calon kader OSIS.', '#', 'Terlaksana'),
('d9999999-9999-9999-9999-999999999999', 'Portal Digital Organisasi Siswa Sanmar', 'Peremajaan website resmi, transparansi sistem aspirasi digital, dan platform pendaftaran paperless.', '#', 'Terlaksana')
ON CONFLICT DO NOTHING;

-- 5. BERITA & PENGUMUMAN
INSERT INTO public.berita (judul, slug, cuplikan, konten, thumbnail_url, kategori, penulis, is_published, views) VALUES
(
    'Pendaftaran Terbuka Calon Pengurus OSIS Periode 2026/2027 Resmi Dimulai',
    'pendaftaran-terbuka-calon-pengurus-osis-periode-2026-2027',
    'Kesempatan emas bagi seluruh siswa kelas X dan XI SMA Santa Maria 1 Bandung untuk bergabung menjadi garda terdepan penggerak prestasi sekolah.',
    'Menyambut masa bakti periode baru 2026/2027, OSIS SMA Santa Maria 1 Bandung membuka pendaftaran calon pengurus baru bagi peserta didik bertalenta. Terdapat 9 departemen yang siap menjadi kawah candradimuka kepemimpinan siswa. Segera persiapkan berkas Anda dan daftarkan diri melalui portal resmi ini sebelum batas akhir.',
    'https://images.unsplash.com/photo-1523240795612-9a054b0db644?w=800&auto=format&fit=crop&q=80',
    'Pengumuman',
    'Humas OSIS',
    true,
    142
),
(
    'Santa Maria Cultural Festival: Menampilkan Kreativitas Terbaik Siswa',
    'santa-maria-cultural-festival-menampilkan-kreativitas-terbaik-siswa',
    'Festival seni dan budaya tahunan SMA Santa Maria 1 Bandung sukses memukau ribuan pengunjung.',
    'Festival budaya SMA Santa Maria 1 Bandung menampilkan beragam karya seni dan pertunjukan dari seluruh siswa. Dengan tema Born to Lead the Future, acara ini menampilkan pentas seni, pameran karya, dan kolaborasi lintas jurusan yang memukau.',
    'https://images.unsplash.com/photo-1460661419201-fd4cecdf8a8b?w=800&auto=format&fit=crop&q=80',
    'Kegiatan',
    'Redaksi Medinfo',
    true,
    389
),
(
    'Sosialisasi Kotak Masukan Terbuka: Suarakan Ide & Aspirasimu Demi Kemajuan Bersama',
    'sosialisasi-kotak-masukan-terbuka-suarakan-ide-dan-aspirasimu',
    'Wadah aspirasi digital kini hadir lebih aman dengan opsi anonim untuk menyampaikan kritik membangun dan ide kreatif.',
    'Sebagai organisasi yang transparan dan inklusif, OSIS SMA Santa Maria 1 Bandung meluncurkan fitur Kotak Masukan online di situs resmi ini. Setiap masukan akan ditinjau secara berkala oleh dewan pengurus dan ditindaklanjuti bersama pihak sekolah.',
    'https://images.unsplash.com/photo-1517048676732-d65bc937f952?w=800&auto=format&fit=crop&q=80',
    'Info Siswa',
    'Biro Aspirasi',
    true,
    95
)
ON CONFLICT DO NOTHING;

-- 6. FAQ
INSERT INTO public.faq (pertanyaan, jawaban, urutan) VALUES
(
    'Apa itu OSIS SMA Santa Maria 1 Bandung?',
    'OSIS SMA Santa Maria 1 Bandung adalah satu-satunya wadah organisasi siswa intra sekolah resmi di SMA Santa Maria 1 Bandung yang mewadahi bakat kepemimpinan, pengembangan karakter, dan kreativitas seluruh siswa.',
    1
),
(
    'Bagaimana alur pendaftaran OSIS?',
    'Alur pendaftaran terdiri dari: (1) Mengisi formulir online di menu Pendaftaran OSIS, (2) Verifikasi berkas administrasi dan surat izin orang tua, (3) Seleksi wawancara dan tes kepribadian, (4) Latihan Dasar Kepemimpinan Siswa (LDKS), dan (5) Pelantikan resmi.',
    2
),
(
    'Siapa saja yang berhak mendaftar?',
    'Seluruh siswa aktif kelas X dan XI SMA Santa Maria 1 Bandung yang memiliki komitmen, integritas, rekam jejak kedisiplinan yang baik, dan semangat memajukan almamater.',
    3
),
(
    'Apa benefit menjadi pengurus OSIS?',
    'Mendapatkan pengalaman manajerial dan kepemimpinan tingkat lanjut, relasi lintas jurusan & instansi luar, sertifikat keaktifan resmi dari sekolah, serta kesempatan mengorganisir acara-acara besar bertaraf daerah maupun nasional.',
    4
)
ON CONFLICT DO NOTHING;

-- 7. TAUTAN PENTING
INSERT INTO public.tautan (judul, deskripsi, url, ikon, urutan) VALUES
('Website Resmi SMA Santa Maria 1 Bandung', 'Portal profil sekolah, kurikulum, dan informasi akademik.', 'https://smasantamaria1bdg.sch.id', 'Globe', 1),
('Sistem Informasi Belajar (E-Learning)', 'Platform pembelajaran digital terintegrasi guru dan siswa.', 'https://elearning.smasantamaria1bdg.sch.id', 'BookOpen', 2),
('Instagram Resmi OSIS Sanmar', 'Update visual harian, poster kegiatan, dan dokumentasi event.', 'https://instagram.com/osissantamaria1bdg', 'Instagram', 3),
('Pusat Bantuan & Pengaduan Siswa', 'Kanal respon cepat aduan kenyamanan lingkungan belajar.', '/masukan', 'MessageSquare', 4)
ON CONFLICT DO NOTHING;

-- 8. GALERI LOGO
INSERT INTO public.logo (judul, kategori, file_url, format, resolusi) VALUES
('Logo Resmi OSIS SMA Santa Maria 1 Bandung', 'osis', '/osis-logo.jpeg', 'JPEG', '800 x 800 (HD)'),
('Logo SMA Santa Maria 1 Bandung', 'sekolah', '/logo-sekolah.jpeg', 'JPEG', '1200 x 1200 (UHD)'),
('Lambang Peminatan MIPA', 'jurusan', '/osis-logo.jpeg', 'JPEG', '1000 x 1000'),
('Badge Resmi Ekstrakurikuler', 'ekstrakurikuler', '/osis-logo.jpeg', 'JPEG', '800 x 800')
ON CONFLICT DO NOTHING;

-- 9. DATA CONTOH PENDAFTAR (UNTUK UJI COBA CEK HASIL SELEKSI)
INSERT INTO public.pendaftar (
    no_pendaftaran, nama_lengkap, nis, kelas, jurusan, ttl, no_wa, email,
    motivasi, pengalaman, status_seleksi, penempatan_departemen_id, catatan_seleksi
) VALUES
(
    'REG-2026-0001',
    'Ahmad Fauzan',
    '12345',
    'X MIPA 1',
    'MIPA',
    'Bandung, 14 Mei 2010',
    '081234567890',
    'ahmadfauzan@gmail.com',
    'Ingin berkontribusi dalam publikasi media kreatif sekolah.',
    'Pernah menjadi pengurus OSIS di SMP dan aktif di klub fotografi.',
    'Lolos',
    'd4444444-4444-4444-4444-444444444444',
    'Selamat! Anda diterima di Departemen Komunikasi, Media & Humas. Harap berkumpul di ruang OSIS pada hari Senin pukul 15.00 WIB mengenakan seragam OSIS lengkap.'
),
(
    'REG-2026-0002',
    'Dinda Ayu Lestari',
    '12346',
    'X IPS 2',
    'IPS',
    'Bandung, 20 Agustus 2010',
    '081298765432',
    'dindaayu@gmail.com',
    'Menyalurkan bakat kepemimpinan dan manajemen organisasi.',
    'Juara 1 lomba debat tingkat kota.',
    'Dalam Proses',
    NULL,
    'Berkas administrasi Anda sedang dalam tahap verifikasi oleh panitia seleksi. Pantau terus pengumuman selanjutnya.'
)
ON CONFLICT DO NOTHING;
