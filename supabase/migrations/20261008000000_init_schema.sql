-- ============================================================
-- OSIS SMA SANTA MARIA 1 BANDUNG - DATABASE SCHEMA & RLS
-- ============================================================

-- 1. EXTENSIONS
CREATE EXTENSION IF NOT EXISTS "uuid-ossp";

-- 2. TABEL PENGATURAN (Situs & Hero Stats)
CREATE TABLE IF NOT EXISTS public.pengaturan (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    periode TEXT NOT NULL DEFAULT '2026/2027',
    pendaftaran_buka BOOLEAN NOT NULL DEFAULT true,
    hasil_seleksi_terbuka BOOLEAN NOT NULL DEFAULT true,
    stats_departemen TEXT NOT NULL DEFAULT '9',
    stats_pengurus TEXT NOT NULL DEFAULT '64',
    stats_proker TEXT NOT NULL DEFAULT '12+',
    stats_periode TEXT NOT NULL DEFAULT '2026/2027',
    nama_organisasi TEXT NOT NULL DEFAULT 'OSIS SMA Santa Maria 1 Bandung',
    nama_sekolah TEXT NOT NULL DEFAULT 'SMA Santa Maria 1 Bandung',
    nama_julukan TEXT NOT NULL DEFAULT 'Sanmar 1 Bandung',
    slogan TEXT NOT NULL DEFAULT 'Born to Lead the Future',
    alamat TEXT NOT NULL DEFAULT 'Jl. Bengawan No. 6, Cihapit, Kec. Bandung Wetan, Kota Bandung, Jawa Barat 40114',
    email TEXT NOT NULL DEFAULT 'osissantamaria1bdg@gmail.com',
    telepon TEXT NOT NULL DEFAULT '(022) 7202534',
    instagram TEXT NOT NULL DEFAULT 'https://instagram.com/osissantamaria1bdg',
    video_profil_url TEXT NOT NULL DEFAULT '/video-profil.mp4',
    updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- 3. TABEL DEPARTEMEN
CREATE TABLE IF NOT EXISTS public.departemen (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    nama TEXT NOT NULL,
    singkatan TEXT,
    deskripsi TEXT,
    urutan INT NOT NULL DEFAULT 0,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- 4. TABEL PENGURUS
CREATE TABLE IF NOT EXISTS public.pengurus (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    nama TEXT NOT NULL,
    jabatan TEXT NOT NULL,
    tipe TEXT NOT NULL DEFAULT 'inti' CHECK (tipe IN ('inti', 'departemen')),
    departemen_id UUID REFERENCES public.departemen(id) ON DELETE SET NULL,
    foto_url TEXT,
    urutan INT NOT NULL DEFAULT 0,
    instagram TEXT,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- 5. TABEL PROGRAM KERJA
CREATE TABLE IF NOT EXISTS public.program_kerja (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    departemen_id UUID REFERENCES public.departemen(id) ON DELETE CASCADE,
    judul TEXT NOT NULL,
    deskripsi TEXT,
    file_url TEXT,
    status TEXT NOT NULL DEFAULT 'Terlaksana' CHECK (status IN ('Rencana', 'Sedang Berjalan', 'Terlaksana')),
    created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- 6. TABEL BERITA
CREATE TABLE IF NOT EXISTS public.berita (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    judul TEXT NOT NULL,
    slug TEXT UNIQUE NOT NULL,
    cuplikan TEXT,
    konten TEXT NOT NULL,
    thumbnail_url TEXT,
    kategori TEXT NOT NULL DEFAULT 'Kegiatan',
    penulis TEXT NOT NULL DEFAULT 'Humas OSIS',
    is_published BOOLEAN NOT NULL DEFAULT true,
    views INT NOT NULL DEFAULT 0,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
    updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- 7. TABEL FAQ
CREATE TABLE IF NOT EXISTS public.faq (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    pertanyaan TEXT NOT NULL,
    jawaban TEXT NOT NULL,
    urutan INT NOT NULL DEFAULT 0,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- 8. TABEL TAUTAN PENTING
CREATE TABLE IF NOT EXISTS public.tautan (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    judul TEXT NOT NULL,
    deskripsi TEXT,
    url TEXT NOT NULL,
    ikon TEXT NOT NULL DEFAULT 'Link',
    urutan INT NOT NULL DEFAULT 0,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- 9. TABEL GALERI LOGO
CREATE TABLE IF NOT EXISTS public.logo (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    judul TEXT NOT NULL,
    kategori TEXT NOT NULL CHECK (kategori IN ('sekolah', 'osis', 'jurusan', 'ekstrakurikuler')),
    file_url TEXT NOT NULL,
    format TEXT NOT NULL DEFAULT 'PNG',
    resolusi TEXT NOT NULL DEFAULT 'High Resolution',
    created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- 10. TABEL PENDAFTAR
CREATE TABLE IF NOT EXISTS public.pendaftar (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    no_pendaftaran TEXT UNIQUE NOT NULL,
    nama_lengkap TEXT NOT NULL,
    nis TEXT UNIQUE NOT NULL,
    kelas TEXT NOT NULL,
    jurusan TEXT NOT NULL,
    ttl TEXT NOT NULL,
    no_wa TEXT NOT NULL,
    email TEXT NOT NULL,
    departemen_1_id UUID REFERENCES public.departemen(id) ON DELETE SET NULL,
    departemen_2_id UUID REFERENCES public.departemen(id) ON DELETE SET NULL,
    motivasi TEXT NOT NULL,
    pengalaman TEXT,
    foto_url TEXT,
    berkas_url TEXT,
    status_seleksi TEXT NOT NULL DEFAULT 'Dalam Proses' CHECK (status_seleksi IN ('Dalam Proses', 'Lolos', 'Tidak Lolos')),
    penempatan_departemen_id UUID REFERENCES public.departemen(id) ON DELETE SET NULL,
    catatan_seleksi TEXT,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- 11. TABEL KOTAK MASUKAN
CREATE TABLE IF NOT EXISTS public.masukan (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    nama TEXT,
    email TEXT,
    kategori TEXT NOT NULL CHECK (kategori IN ('Saran & Ide', 'Kritik', 'Apresiasi', 'Pertanyaan')),
    judul VARCHAR(100) NOT NULL,
    isi VARCHAR(1000) NOT NULL,
    is_anonim BOOLEAN NOT NULL DEFAULT false,
    is_dibaca BOOLEAN NOT NULL DEFAULT false,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- 12. TABEL PROFIL ADMIN
CREATE TABLE IF NOT EXISTS public.admin_profiles (
    id UUID PRIMARY KEY REFERENCES auth.users(id) ON DELETE CASCADE,
    full_name TEXT NOT NULL,
    role TEXT NOT NULL DEFAULT 'admin' CHECK (role IN ('super_admin', 'admin')),
    created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- ============================================================
-- ROW LEVEL SECURITY (RLS) POLICIES
-- ============================================================

ALTER TABLE public.pengaturan ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.departemen ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.pengurus ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.program_kerja ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.berita ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.faq ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.tautan ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.logo ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.pendaftar ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.masukan ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.admin_profiles ENABLE ROW LEVEL SECURITY;

-- Helper Function: Check Admin Role
CREATE OR REPLACE FUNCTION public.is_admin()
RETURNS BOOLEAN AS $$
BEGIN
    RETURN EXISTS (
        SELECT 1 FROM public.admin_profiles
        WHERE id = auth.uid()
    );
END;
$$ LANGUAGE plpgsql SECURITY DEFINER;

-- PENGATURAN: Publik baca, Admin ubah
CREATE POLICY "Publik dapat membaca pengaturan"
    ON public.pengaturan FOR SELECT USING (true);
CREATE POLICY "Admin dapat mengedit pengaturan"
    ON public.pengaturan FOR ALL USING (public.is_admin());

-- DEPARTEMEN: Publik baca, Admin kelola
CREATE POLICY "Publik dapat membaca departemen"
    ON public.departemen FOR SELECT USING (true);
CREATE POLICY "Admin dapat mengelola departemen"
    ON public.departemen FOR ALL USING (public.is_admin());

-- PENGURUS: Publik baca, Admin kelola
CREATE POLICY "Publik dapat membaca pengurus"
    ON public.pengurus FOR SELECT USING (true);
CREATE POLICY "Admin dapat mengelola pengurus"
    ON public.pengurus FOR ALL USING (public.is_admin());

-- PROGRAM KERJA: Publik baca, Admin kelola
CREATE POLICY "Publik dapat membaca program kerja"
    ON public.program_kerja FOR SELECT USING (true);
CREATE POLICY "Admin dapat mengelola program kerja"
    ON public.program_kerja FOR ALL USING (public.is_admin());

-- BERITA: Publik baca berita yang dipublish, Admin kelola semua
CREATE POLICY "Publik dapat membaca berita terbit"
    ON public.berita FOR SELECT USING (is_published = true OR public.is_admin());
CREATE POLICY "Admin dapat mengelola berita"
    ON public.berita FOR ALL USING (public.is_admin());

-- FAQ: Publik baca, Admin kelola
CREATE POLICY "Publik dapat membaca faq"
    ON public.faq FOR SELECT USING (true);
CREATE POLICY "Admin dapat mengelola faq"
    ON public.faq FOR ALL USING (public.is_admin());

-- TAUTAN: Publik baca, Admin kelola
CREATE POLICY "Publik dapat membaca tautan"
    ON public.tautan FOR SELECT USING (true);
CREATE POLICY "Admin dapat mengelola tautan"
    ON public.tautan FOR ALL USING (public.is_admin());

-- LOGO: Publik baca, Admin kelola
CREATE POLICY "Publik dapat membaca logo"
    ON public.logo FOR SELECT USING (true);
CREATE POLICY "Admin dapat mengelola logo"
    ON public.logo FOR ALL USING (public.is_admin());

-- PENDAFTAR: Publik hanya boleh insert jika pendaftaran buka, Admin baca & kelola semua
CREATE POLICY "Publik dapat mendaftar"
    ON public.pendaftar FOR INSERT WITH CHECK (
        EXISTS (SELECT 1 FROM public.pengaturan WHERE pendaftaran_buka = true)
    );
CREATE POLICY "Admin dapat mengelola pendaftar"
    ON public.pendaftar FOR ALL USING (public.is_admin());

-- MASUKAN: Publik hanya boleh insert, Admin kelola semua
CREATE POLICY "Publik dapat mengirim masukan"
    ON public.masukan FOR INSERT WITH CHECK (true);
CREATE POLICY "Admin dapat mengelola masukan"
    ON public.masukan FOR ALL USING (public.is_admin());

-- ADMIN PROFILES: Admin dapat membaca profil mereka sendiri / Super Admin kelola
CREATE POLICY "Admin dapat melihat profil admin"
    ON public.admin_profiles FOR SELECT USING (auth.uid() = id OR public.is_admin());
CREATE POLICY "Super admin kelola profil admin"
    ON public.admin_profiles FOR ALL USING (
        EXISTS (SELECT 1 FROM public.admin_profiles WHERE id = auth.uid() AND role = 'super_admin')
    );

-- ============================================================
-- RPC FUNCTION: Cek Hasil Seleksi Aman (Mencegah Scraping)
-- ============================================================
CREATE OR REPLACE FUNCTION public.cek_hasil_seleksi(search_query TEXT)
RETURNS TABLE (
    no_pendaftaran TEXT,
    nama_lengkap TEXT,
    kelas TEXT,
    jurusan TEXT,
    status_seleksi TEXT,
    departemen_nama TEXT,
    catatan_seleksi TEXT,
    pengumuman_dibuka BOOLEAN
) AS $$
DECLARE
    is_open BOOLEAN;
BEGIN
    SELECT hasil_seleksi_terbuka INTO is_open FROM public.pengaturan LIMIT 1;
    
    IF is_open IS NOT TRUE THEN
        RETURN QUERY SELECT 
            NULL::TEXT, NULL::TEXT, NULL::TEXT, NULL::TEXT,
            'PENGUMUMAN_DITUTUP'::TEXT, NULL::TEXT, NULL::TEXT, false;
        RETURN;
    END IF;

    RETURN QUERY
    SELECT 
        p.no_pendaftaran,
        p.nama_lengkap,
        p.kelas,
        p.jurusan,
        p.status_seleksi,
        d.nama AS departemen_nama,
        p.catatan_seleksi,
        true AS pengumuman_dibuka
    FROM public.pendaftar p
    LEFT JOIN public.departemen d ON p.penempatan_departemen_id = d.id
    WHERE UPPER(TRIM(p.nis)) = UPPER(TRIM(search_query))
       OR UPPER(TRIM(p.no_pendaftaran)) = UPPER(TRIM(search_query))
    LIMIT 1;
END;
$$ LANGUAGE plpgsql SECURITY DEFINER;
