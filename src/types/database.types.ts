export type Json =
  | string
  | number
  | boolean
  | null
  | { [key: string]: Json | undefined }
  | Json[];

// =====================================================
// Row Types (explicit, no self-references)
// =====================================================
export type PengaturanRow = {
  id: string;
  periode: string;
  pendaftaran_buka: boolean;
  hasil_seleksi_terbuka: boolean;
  stats_departemen: string;
  stats_pengurus: string;
  stats_proker: string;
  stats_periode: string;
  nama_organisasi: string;
  nama_sekolah: string;
  nama_julukan: string;
  slogan: string;
  alamat: string;
  email: string;
  telepon: string;
  instagram: string;
  video_profil_url: string;
  updated_at: string;
};

export type DepartemenRow = {
  id: string;
  nama: string;
  singkatan: string | null;
  deskripsi: string | null;
  urutan: number;
  created_at: string;
};

export type PengurusRow = {
  id: string;
  nama: string;
  jabatan: string;
  tipe: "inti" | "departemen";
  departemen_id: string | null;
  foto_url: string | null;
  urutan: number;
  instagram: string | null;
  created_at: string;
};

export type ProgramKerjaRow = {
  id: string;
  departemen_id: string;
  judul: string;
  deskripsi: string | null;
  file_url: string | null;
  status: "Rencana" | "Sedang Berjalan" | "Terlaksana";
  created_at: string;
};

export type BeritaRow = {
  id: string;
  judul: string;
  slug: string;
  cuplikan: string | null;
  konten: string;
  thumbnail_url: string | null;
  kategori: string;
  penulis: string;
  is_published: boolean;
  views: number;
  created_at: string;
  updated_at: string;
};

export type FaqRow = {
  id: string;
  pertanyaan: string;
  jawaban: string;
  urutan: number;
  created_at: string;
};

export type TautanRow = {
  id: string;
  judul: string;
  deskripsi: string | null;
  url: string;
  ikon: string;
  urutan: number;
  created_at: string;
};

export type LogoRow = {
  id: string;
  judul: string;
  kategori: "sekolah" | "osis" | "jurusan" | "ekstrakurikuler";
  file_url: string;
  format: string;
  resolusi: string;
  created_at: string;
};

export type PendaftarRow = {
  id: string;
  no_pendaftaran: string;
  nama_lengkap: string;
  nis: string;
  kelas: string;
  jurusan: string;
  ttl: string;
  no_wa: string;
  email: string;
  departemen_1_id: string | null;
  departemen_2_id: string | null;
  motivasi: string;
  pengalaman: string | null;
  foto_url: string | null;
  berkas_url: string | null;
  status_seleksi: "Dalam Proses" | "Lolos" | "Tidak Lolos";
  penempatan_departemen_id: string | null;
  catatan_seleksi: string | null;
  created_at: string;
};

export type MasukanRow = {
  id: string;
  nama: string | null;
  email: string | null;
  kategori: "Saran & Ide" | "Kritik" | "Apresiasi" | "Pertanyaan";
  judul: string;
  isi: string;
  is_anonim: boolean;
  is_dibaca: boolean;
  created_at: string;
};

export type AdminProfilesRow = {
  id: string;
  full_name: string;
  role: "super_admin" | "admin";
  created_at: string;
};

// =====================================================
// Database Interface (Supabase-compatible)
// =====================================================
export interface Database {
  public: {
    Tables: {
      pengaturan: {
        Row: PengaturanRow;
        Insert: Partial<PengaturanRow>;
        Update: Partial<PengaturanRow>;
        Relationships: [];
      };
      departemen: {
        Row: DepartemenRow;
        Insert: Omit<DepartemenRow, "id" | "created_at"> & { id?: string };
        Update: Partial<DepartemenRow>;
        Relationships: [];
      };
      pengurus: {
        Row: PengurusRow;
        Insert: Omit<PengurusRow, "id" | "created_at"> & { id?: string };
        Update: Partial<PengurusRow>;
        Relationships: [
          {
            foreignKeyName: "pengurus_departemen_id_fkey";
            columns: ["departemen_id"];
            isOneToOne: false;
            referencedRelation: "departemen";
            referencedColumns: ["id"];
          }
        ];
      };
      program_kerja: {
        Row: ProgramKerjaRow;
        Insert: Omit<ProgramKerjaRow, "id" | "created_at"> & { id?: string };
        Update: Partial<ProgramKerjaRow>;
        Relationships: [
          {
            foreignKeyName: "program_kerja_departemen_id_fkey";
            columns: ["departemen_id"];
            isOneToOne: false;
            referencedRelation: "departemen";
            referencedColumns: ["id"];
          }
        ];
      };
      berita: {
        Row: BeritaRow;
        Insert: Omit<BeritaRow, "id" | "created_at" | "updated_at"> & { id?: string };
        Update: Partial<BeritaRow>;
        Relationships: [];
      };
      faq: {
        Row: FaqRow;
        Insert: Omit<FaqRow, "id" | "created_at"> & { id?: string };
        Update: Partial<FaqRow>;
        Relationships: [];
      };
      tautan: {
        Row: TautanRow;
        Insert: Omit<TautanRow, "id" | "created_at"> & { id?: string };
        Update: Partial<TautanRow>;
        Relationships: [];
      };
      logo: {
        Row: LogoRow;
        Insert: Omit<LogoRow, "id" | "created_at"> & { id?: string };
        Update: Partial<LogoRow>;
        Relationships: [];
      };
      pendaftar: {
        Row: PendaftarRow;
        Insert: Omit<PendaftarRow, "id" | "created_at"> & { id?: string };
        Update: Partial<PendaftarRow>;
        Relationships: [
          {
            foreignKeyName: "pendaftar_departemen_1_id_fkey";
            columns: ["departemen_1_id"];
            isOneToOne: false;
            referencedRelation: "departemen";
            referencedColumns: ["id"];
          },
          {
            foreignKeyName: "pendaftar_departemen_2_id_fkey";
            columns: ["departemen_2_id"];
            isOneToOne: false;
            referencedRelation: "departemen";
            referencedColumns: ["id"];
          },
          {
            foreignKeyName: "pendaftar_penempatan_departemen_id_fkey";
            columns: ["penempatan_departemen_id"];
            isOneToOne: false;
            referencedRelation: "departemen";
            referencedColumns: ["id"];
          }
        ];
      };
      masukan: {
        Row: MasukanRow;
        Insert: Omit<MasukanRow, "id" | "created_at"> & { id?: string };
        Update: Partial<MasukanRow>;
        Relationships: [];
      };
      admin_profiles: {
        Row: AdminProfilesRow;
        Insert: Partial<AdminProfilesRow>;
        Update: Partial<AdminProfilesRow>;
        Relationships: [];
      };
    };
    Views: {
      [_ in never]: never;
    };
    Functions: {
      [_ in never]: never;
    };
    Enums: {
      [_ in never]: never;
    };
    CompositeTypes: {
      [_ in never]: never;
    };
  };
}
