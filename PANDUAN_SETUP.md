# PANDUAN LENGKAP SETUP & DEPLOYMENT
## Website Resmi OSIS SMKN 12 Surabaya (Real Arts)

Dokumen ini berisi panduan teknis langkah demi langkah untuk melakukan setup basis data Supabase, konfigurasi media Cloudinary, pengujian di komputer lokal, deployment ke Vercel, hingga menghubungkan domain kustom **`osissmkrolas.my.id`**.

---

## 1. Identitas Organisasi
- **Nama Organisasi:** OSIS SMKN 12 Surabaya
- **Nama Sekolah:** SMK Negeri 12 Surabaya
- **Julukan Sekolah:** *Real Arts*
- **Slogan:** *"Satu Rasa, Satu Jiwa, Rolas Luar Biasa"*
- **Periode Kepengurusan:** 2026/2027
- **Alamat Sekretariat:** Jl. Siwalankerto Permai No. 1, Surabaya, Jawa Timur
- **Email:** osissmkrolas@gmail.com
- **Telepon:** (031) 8436687
- **Instagram:** https://instagram.com/osissmkrolas
- **Domain:** osissmkrolas.my.id

---

## 2. Setup Database Supabase & Akun Admin

### Langkah 2.1: Buat Proyek Baru
1. Kunjungi [supabase.com](https://supabase.com) dan masuk ke dashboard.
2. Klik **New Project**, beri nama misal: `osis-smkn12`.
3. Pilih region terdekat (misal: **Singapore**).
4. Buat kata sandi database yang aman dan simpan.

### Langkah 2.2: Jalankan Migrasi Skema Basis Data
1. Buka menu **SQL Editor** pada menu navigasi sebelah kiri Supabase.
2. Buka file [`supabase/migrations/20261008000000_init_schema.sql`](./supabase/migrations/20261008000000_init_schema.sql) di proyek ini.
3. Salin seluruh isi SQL tersebut, tempelkan ke SQL Editor Supabase, lalu klik tombol **Run**.
4. Seluruh tabel (`pengaturan`, `departemen`, `pengurus`, `program_kerja`, `berita`, `faq`, `tautan`, `logo`, `pendaftar`, `masukan`, `admin_profiles`) serta aturan keamanan **Row Level Security (RLS)** dan fungsi RPC `cek_hasil_seleksi` akan otomatis terbentuk.

### Langkah 2.3: Masukkan Data Awal (Seed Data)
1. Buka tab baru di **SQL Editor** Supabase.
2. Buka file [`supabase/seed.sql`](./supabase/seed.sql) di proyek ini.
3. Salin seluruh isi file dan jalankan (**Run**). Data 9 departemen, 7 pengurus inti, proker, artikel berita, FAQ, dan data pendaftar simulasi akan langsung terisi.

### Langkah 2.4: Buat Akun Super Admin Pertama
1. Buka menu **Authentication** -> **Users** di dashboard Supabase.
2. Klik **Add User** -> **Create User**.
3. Masukkan email (misal: `admin@osissmkrolas.my.id`) dan password yang Anda tentukan. Pastikan centang opsi *Auto Confirm User*.
4. Salin **User UID** dari user yang baru dibuat.
5. Buka kembali **SQL Editor**, jalankan perintah SQL berikut untuk mendaftarkan hak akses admin:
```sql
INSERT INTO public.admin_profiles (id, full_name, role)
VALUES ('PASTE_USER_UID_DISINI', 'Pembina / Ketua OSIS Rolas', 'super_admin');
```

### Langkah 2.5: Ambil Kredensial API
1. Buka menu **Project Settings** -> **API**.
2. Salin nilai:
   - **Project URL** (masukkan ke `NEXT_PUBLIC_SUPABASE_URL`)
   - **Project API Keys - anon / public** (masukkan ke `NEXT_PUBLIC_SUPABASE_ANON_KEY`)
   - **Project API Keys - service_role** (masukkan ke `SUPABASE_SERVICE_ROLE_KEY`)

---

## 3. Setup Cloudinary (Upload Gambar & Berkas)

1. Daftar akun di [cloudinary.com](https://cloudinary.com).
2. Dari **Dashboard**, catat nilai **Cloud Name**.
3. Buka menu **Settings (ikon gerigi)** -> pilih tab **Upload**.
4. Gulir ke bawah ke bagian **Upload presets**, lalu klik **Add upload preset**.
5. Isi konfigurasi berikut:
   - **Upload preset name:** `osis_public_uploads`
   - **Signing Mode:** Pilih **Unsigned**
   - **Folder:** `osis-rolas` (opsional)
6. Klik **Save**.
7. Masukkan Cloud Name ke variabel `NEXT_PUBLIC_CLOUDINARY_CLOUD_NAME`.

---

## 4. Konfigurasi File `.env.local`

Buat atau edit file `.env.local` pada root direktori proyek:

```env
# URL SITUS
NEXT_PUBLIC_SITE_URL=http://localhost:3000
NEXT_PUBLIC_SITE_DOMAIN=osissmkrolas.my.id

# SUPABASE
NEXT_PUBLIC_SUPABASE_URL=https://xxxxxxxxxxxxxxxx.supabase.co
NEXT_PUBLIC_SUPABASE_ANON_KEY=eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9...
SUPABASE_SERVICE_ROLE_KEY=eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9...

# CLOUDINARY
NEXT_PUBLIC_CLOUDINARY_CLOUD_NAME=nama-cloud-anda
NEXT_PUBLIC_CLOUDINARY_UPLOAD_PRESET=osis_public_uploads
CLOUDINARY_API_KEY=xxxxxxxxxxxxxxx
CLOUDINARY_API_SECRET=xxxxxxxxxxxxxxx

# ANTI-SPAM (Cloudflare Turnstile)
NEXT_PUBLIC_TURNSTILE_SITE_KEY=1x00000000000000000000AA
TURNSTILE_SECRET_KEY=1x0000000000000000000000000000000AA
```

---

## 5. Menjalankan di Komputer Lokal

Buka terminal di folder proyek (`c:\Users\Luxuoka\Documents\Osis`):

```bash
# 1. Install seluruh dependensi
npm install

# 2. Jalankan server pengembangan
npm run dev
```

Buka peramban di:
- **Halaman Publik:** `http://localhost:3000`
- **Pendaftaran Calon OSIS:** `http://localhost:3000/daftarosis`
- **Cek Hasil Seleksi:** `http://localhost:3000/hasilseleksi`
- **Panel Admin:** `http://localhost:3000/admin/login`

---

## 6. Deployment ke Vercel

1. Unggah kode ke repository GitHub Anda (misal: `github.com/username/osis-smkn12`).
2. Masuk ke [vercel.com](https://vercel.com) menggunakan akun GitHub.
3. Klik tombol **Add New...** -> **Project**.
4. Pilih repositori `osis-smkn12`.
5. Pada bagian **Environment Variables**, masukkan seluruh variabel dari file `.env.local` Anda:
   - `NEXT_PUBLIC_SITE_URL` (isi dengan `https://osissmkrolas.my.id` atau URL vercel)
   - `NEXT_PUBLIC_SUPABASE_URL`
   - `NEXT_PUBLIC_SUPABASE_ANON_KEY`
   - `SUPABASE_SERVICE_ROLE_KEY`
   - `NEXT_PUBLIC_CLOUDINARY_CLOUD_NAME`
   - `NEXT_PUBLIC_CLOUDINARY_UPLOAD_PRESET`
6. Klik tombol **Deploy**.
7. Tunggu build selesai dalam 1-2 menit hingga website aktif.

---

## 7. Menghubungkan Custom Domain (`osissmkrolas.my.id`)

1. Pada halaman project di **Vercel**, buka menu **Settings** -> **Domains**.
2. Ketik nama domain: `osissmkrolas.my.id` lalu klik **Add**.
3. Tambahkan juga redirect `www.osissmkrolas.my.id` ke `osissmkrolas.my.id`.
4. Buka panel kontrol DNS domain Anda (tempat Anda membeli domain, mis. Niagahoster, Domainesia, Cloudflare, dll).
5. Tambahkan record DNS berikut:
   - **Type:** `A`
   - **Name:** `@` (atau kosong)
   - **Value / IP:** `76.76.21.21`
   - **TTL:** Auto / 3600

   *Atau jika menggunakan CNAME:*
   - **Type:** `CNAME`
   - **Name:** `www`
   - **Value:** `cname.vercel-dns.com`
6. Kembali ke Vercel dan klik tombol **Refresh / Verify**.
7. Sertifikat SSL gratis (HTTPS) akan otomatis diterbitkan oleh Vercel dalam hitungan menit.

---

## 8. Pemeliharaan & Tips Admin

- **Membuka/Menutup Pendaftaran:** Masuk ke `/admin/pengaturan` -> aktifkan/nonaktifkan sakelar *Pendaftaran Calon OSIS*.
- **Merilis Pengumuman Seleksi:** Masuk ke `/admin/pengaturan` -> aktifkan sakelar *Publikasi Hasil Seleksi*.
- **Mengubah Status Seleksi Siswa:** Masuk ke `/admin/pendaftar` -> klik tombol *Detail & Seleksi* pada siswa bersangkutan -> ubah status menjadi *Lolos* / *Tidak Lolos* -> pilih Departemen Penempatan -> Simpan.
- **Mengekspor Data:** Klik tombol *Ekspor CSV / Excel* di `/admin/pendaftar` untuk rekapitulasi rapat dewan pembina.
