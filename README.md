# Website Resmi OSIS SMKN 12 Surabaya (Real Arts)

Sistem Informasi Terpadu dan Portal Resmi Pendaftaran Organisasi Siswa Intra Sekolah (OSIS) SMK Negeri 12 Surabaya periode 2026/2027.

> *"Satu Rasa, Satu Jiwa, Rolas Luar Biasa"*

---

## Fitur Utama

### 🌟 Portal Publik
- **Hero Section:** Banner selamat datang, slogan, komposisi logo animasi, CTA cepat, dan statistik count-up (9 Departemen, 64 Pengurus, 12+ Proker, Periode 2026/2027).
- **Tentang Kami:** Mengenal lebih dekat OSIS SMKN 12 Surabaya & modal interaktif pemutar video profil (`/video-profil.mp4`).
- **Struktur Organisasi:** Profil 7 pengurus inti (Ketua Umum, Ketua 1 & 2, Sekretaris 1 & 2, Bendahara 1 & 2) dan tab 9 departemen.
- **Dokumen Program Kerja:** Arsip proker per departemen dengan unduhan PDF dan filter status.
- **Berita & Pengumuman:** Artikel kegiatan siswa, search, filter kategori, dan share WhatsApp/Twitter.
- **Pusat Bantuan (FAQ):** Accordion tanya-jawab seputar pendaftaran dan organisasi.
- **Kotak Masukan Terbuka:** Form aspirasi dengan opsi kirim anonim, counter karakter, dan toast notifikasi.
- **Galeri Logo Resmi:** Pusat unduhan logo resolusi tinggi (PNG/SVG) untuk sekolah, OSIS, jurusan, dan ekstrakurikuler.
- **Pendaftaran OSIS Online (`/daftarosis`):** Formulir pendaftaran calon pengurus dengan validasi Zod, anti duplikasi NIS, nomor pendaftaran otomatis, dan cetak bukti pendaftaran.
- **Cek Hasil Seleksi (`/hasilseleksi`):** Pengecekan status kelulusan seleksi berbasis NIS dengan rate-limiting anti-scraping.
- **Tautan Penting (`/link`):** Direktori akses cepat ke web sekolah, e-learning, dan media sosial.

### 🛡️ Panel Admin Terpadu (`/admin`)
- **Login Terproteksi:** Autentikasi Supabase Auth + middleware session guard.
- **Dashboard Ringkasan:** Statistik pendaftar, masukan belum dibaca, berita terbit, dan pengurus aktif.
- **Kelola Pendaftar & Seleksi:** Tabel data dengan pencarian, filter status, ubah keputusan seleksi, penempatan departemen, dan ekspor CSV/Excel.
- **Kelola Kotak Masukan:** Filter kategori, penandaan sudah dibaca, dan penghapusan.
- **Kelola Berita:** Editor artikel, upload thumbnail, pengaturan slug, dan sakelar publish/draft.
- **Kelola Struktur & Departemen:** Manajemen foto, urutan, jabatan pengurus, dan deskripsi 9 departemen.
- **Kelola Proker, FAQ, Tautan & Logo:** CRUD aset publik.
- **Pengaturan Situs:** Sakelar buka/tutup pendaftaran, sakelar rilis pengumuman, angka statistik hero, dan kontak kesekretariatan.

---

## Tech Stack
- **Framework:** Next.js 14+ (App Router) & TypeScript
- **Styling:** Tailwind CSS (Custom Real Arts Palette: Navy `#0F2744`, Gold `#F59E0B`)
- **Animasi:** Framer Motion & Canvas Confetti
- **Ikon:** Lucide React
- **Basis Data & Auth:** Supabase (PostgreSQL, Row Level Security, RPC Functions)
- **Media Upload:** Cloudinary
- **Validasi:** Zod & React Hook Form
- **Deploy:** Vercel

---

## Panduan Instalasi & Setup

Silakan baca dokumen lengkap:
👉 [**PANDUAN_SETUP.md**](./PANDUAN_SETUP.md)

---

## Lisensi & Hak Cipta
&copy; 2026 **OSIS SMKN 12 Surabaya (Real Arts)**. Hak Cipta Dilindungi.
Dikelola dengan bangga untuk generasi penerus bangsa.
