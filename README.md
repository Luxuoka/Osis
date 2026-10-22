<div align="center">

<img src="https://capsule-render.vercel.app/api?type=waving&color=0:0F2744,100:1e3a5f&height=140&section=header" width="100%" />

# 🎓 Website Resmi OSIS SMA Santa Maria 1 Bandung

### *Real Arts*

Sistem informasi terpadu dan portal resmi pendaftaran Organisasi Siswa Intra Sekolah (OSIS) **SMA Santa Maria 1** periode **2026/2027**.

> *"Satu Rasa, Satu Jiwa, Rolas Luar Biasa"*

<br/>

<img src="https://img.shields.io/badge/Next.js-000000?style=for-the-badge&logo=nextdotjs&logoColor=white" alt="Next.js" />
<img src="https://img.shields.io/badge/TypeScript-3178C6?style=for-the-badge&logo=typescript&logoColor=white" alt="TypeScript" />
<img src="https://img.shields.io/badge/Tailwind_CSS-06B6D4?style=for-the-badge&logo=tailwindcss&logoColor=white" alt="Tailwind CSS" />
<img src="https://img.shields.io/badge/Supabase-3FCF8E?style=for-the-badge&logo=supabase&logoColor=white" alt="Supabase" />
<img src="https://img.shields.io/badge/Vercel-000000?style=for-the-badge&logo=vercel&logoColor=white" alt="Vercel" />

</div>

---

## 📖 Tentang Proyek

Website ini menjadi pusat informasi dan layanan digital OSIS: mulai dari profil organisasi, berita, dan dokumen program kerja, hingga **pendaftaran calon pengurus online**, **pengecekan hasil seleksi**, dan **panel admin** untuk mengelola seluruh konten tanpa menyentuh kode.

## ✨ Fitur Utama

### 🌟 Portal Publik

| | Fitur | Deskripsi |
|---|---|---|
| 🏠 | **Hero Section** | Banner selamat datang, slogan, logo animasi, CTA cepat, dan statistik count-up (9 Departemen, 64 Pengurus, 12+ Proker, Periode 2026/2027). |
| 💬 | **Tentang Kami** | Mengenal lebih dekat OSIS SMA Santa Maria 1, dengan modal interaktif pemutar video profil. |
| 👥 | **Struktur Organisasi** | Profil 7 pengurus inti (Ketua Umum, Ketua 1 & 2, Sekretaris 1 & 2, Bendahara 1 & 2) dan tab 9 departemen. |
| 📂 | **Dokumen Program Kerja** | Arsip proker per departemen dengan unduhan PDF dan filter status. |
| 📰 | **Berita & Pengumuman** | Artikel kegiatan siswa, pencarian, filter kategori, dan share ke WhatsApp / Twitter. |
| ❓ | **Pusat Bantuan (FAQ)** | Accordion tanya-jawab seputar pendaftaran dan organisasi. |
| 📮 | **Kotak Masukan Terbuka** | Form aspirasi dengan opsi kirim anonim, counter karakter, dan toast notifikasi. |
| 🖼️ | **Galeri Logo Resmi** | Pusat unduhan logo resolusi tinggi (PNG/SVG) untuk sekolah, OSIS, jurusan, dan ekstrakurikuler. |
| 📝 | **Pendaftaran OSIS Online** | Formulir calon pengurus dengan validasi Zod, anti duplikasi NIS, nomor pendaftaran otomatis, dan cetak bukti pendaftaran. |
| 🔎 | **Cek Hasil Seleksi** | Pengecekan status kelulusan berbasis NIS dengan rate-limiting anti-scraping. |
| 🔗 | **Tautan Penting** | Direktori akses cepat ke web sekolah, e-learning, dan media sosial. |

### 🛡️ Panel Admin Terpadu

| | Fitur | Deskripsi |
|---|---|---|
| 🔐 | **Login Terproteksi** | Autentikasi Supabase Auth dengan middleware session guard. |
| 📊 | **Dashboard Ringkasan** | Statistik pendaftar, masukan belum dibaca, berita terbit, dan pengurus aktif. |
| 🗂️ | **Kelola Pendaftar & Seleksi** | Tabel dengan pencarian dan filter status, ubah keputusan seleksi, penempatan departemen, dan ekspor CSV/Excel. |
| 📥 | **Kelola Kotak Masukan** | Filter kategori, penandaan sudah dibaca, dan penghapusan. |
| ✍️ | **Kelola Berita** | Editor artikel, upload thumbnail, pengaturan slug, dan sakelar publish/draft. |
| 🏛️ | **Kelola Struktur & Departemen** | Manajemen foto, urutan, jabatan pengurus, dan deskripsi 9 departemen. |
| ⚙️ | **Kelola Proker, FAQ, Tautan & Logo** | CRUD aset publik. |
| 🎛️ | **Pengaturan Situs** | Sakelar buka/tutup pendaftaran, sakelar rilis pengumuman, angka statistik hero, dan kontak kesekretariatan. |

## 🧭 Halaman Penting

| Rute | Fungsi |
|---|---|
| `/daftarosis` | Pendaftaran calon pengurus OSIS |
| `/hasilseleksi` | Cek hasil seleksi berdasarkan NIS |
| `/link` | Tautan penting |
| `/admin` | Panel admin (perlu login) |

## 🛠️ Tech Stack

<p>
  <img src="https://skillicons.dev/icons?i=nextjs,ts,tailwind,supabase,vercel&theme=dark" alt="Tech stack" />
</p>

| Kategori | Teknologi |
|---|---|
| **Framework** | Next.js 14+ (App Router) & TypeScript |
| **Styling** | Tailwind CSS (palet kustom Real Arts: Navy `#0F2744`, Gold `#F59E0B`) |
| **Animasi** | Framer Motion & Canvas Confetti |
| **Ikon** | Lucide React |
| **Basis Data & Auth** | Supabase (PostgreSQL, Row Level Security, RPC Functions) |
| **Media Upload** | Cloudinary |
| **Validasi** | Zod & React Hook Form |
| **Deploy** | Vercel |

## 🚀 Panduan Instalasi & Setup

Dokumen lengkap tersedia di 👉 **[PANDUAN_SETUP.md](./PANDUAN_SETUP.md)**

> ⚠️ **Jangan pernah meng-commit file `.env`** atau kunci Supabase (service role) dan Cloudinary ke GitHub.

## 📄 Lisensi & Hak Cipta

&copy; 2026 **OSIS SMA Santa Maria 1 (Real Arts)**. Hak Cipta Dilindungi.
Dikelola dengan bangga untuk generasi penerus bangsa.

---

<div align="center">

**Dibuat dengan 💛 oleh [Putra Cikal Asmarandana](https://github.com/Luxuoka)**

<img src="https://capsule-render.vercel.app/api?type=waving&color=0:1e3a5f,100:0F2744&height=100&section=footer" width="100%" />

</div>
