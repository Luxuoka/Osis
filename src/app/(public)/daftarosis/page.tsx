"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import confetti from "canvas-confetti";
import {
  UserPlus,
  CheckCircle2,
  AlertTriangle,
  Upload,
  FileCheck,
  ArrowRight,
  ShieldAlert,
  Sparkles,
  Printer,
  Copy,
  Check,
  User,
  GraduationCap,
  Building,
} from "lucide-react";
import { Toast } from "@/components/ui/Toast";
import { submitRegistrationAction, RegisterResult } from "@/app/actions/register";
import { SITE_IDENTITY } from "@/lib/constants";
import { createClient } from "@/lib/supabase/client";

export default function DaftarOsisPage() {
  const [isOpen, setIsOpen] = useState<boolean | null>(null);
  const [departemenList, setDepartemenList] = useState<{ id: string; nama: string }[]>([]);
  const [isLoading, setIsLoading] = useState(false);
  const [isSuccess, setIsSuccess] = useState(false);
  const [successData, setSuccessData] = useState<RegisterResult["data"] | null>(null);
  const [copied, setCopied] = useState(false);

  // Form State
  const [formData, setFormData] = useState({
    nama_lengkap: "",
    nis: "",
    kelas: "X (Sepuluh)",
    jurusan: SITE_IDENTITY.JURUSAN[0],
    ttl: "",
    no_wa: "",
    email: "",
    departemen_1_id: "",
    departemen_2_id: "",
    motivasi: "",
    pengalaman: "",
    foto_url: "",
    berkas_url: "",
    persetujuan: false,
  });

  const [toast, setToast] = useState<{ show: boolean; type: "success" | "error"; message: string }>({
    show: false,
    type: "success",
    message: "",
  });

  useEffect(() => {
    const fetchInitialData = async () => {
      try {
        const supabase = createClient();

        // Ambil status buka/tutup & daftar departemen secara paralel
        const [pengaturanRes, deptsRes] = await Promise.allSettled([
          supabase
            .from("pengaturan")
            .select("pendaftaran_buka")
            .limit(1)
            .maybeSingle(),
          supabase
            .from("departemen")
            .select("id, nama")
            .order("urutan", { ascending: true }),
        ]);

        if (pengaturanRes.status === "fulfilled" && pengaturanRes.value.data) {
          const pengaturan = pengaturanRes.value.data;
          if (typeof pengaturan.pendaftaran_buka === "boolean") {
            setIsOpen(pengaturan.pendaftaran_buka);
          } else {
            setIsOpen(true);
          }
        } else {
          setIsOpen(true);
        }

        const depts = deptsRes.status === "fulfilled" ? deptsRes.value.data : null;

        if (depts && depts.length > 0) {
          setDepartemenList(depts);
          setFormData((prev) => ({
            ...prev,
            departemen_1_id: depts[0].id,
            departemen_2_id: depts[1]?.id || depts[0].id,
          }));
        } else {
          const fallbackDepts = [
            { id: "1", nama: "Sekbid 1: Keimanan & Ketaqwaan" },
            { id: "2", nama: "Sekbid 2: Budi Pekerti Luhur" },
            { id: "3", nama: "Sekbid 3: Bela Negara & Kedisiplinan" },
            { id: "4", nama: "Sekbid 4: Prestasi Akademik & Olahraga" },
            { id: "5", nama: "Sekbid 5: Demokrasi & HAM" },
            { id: "6", nama: "Sekbid 6: Kreativitas & Kewirausahaan" },
            { id: "7", nama: "Sekbid 7: Kualitas Jasmani & PMR" },
            { id: "8", nama: "Sekbid 8: Sastra, Seni & Budaya" },
            { id: "9", nama: "Sekbid 9: Teknologi Informasi & Medinfo" },
          ];
          setDepartemenList(fallbackDepts);
          setFormData((prev) => ({
            ...prev,
            departemen_1_id: fallbackDepts[0].id,
            departemen_2_id: fallbackDepts[1].id,
          }));
        }
      } catch (e) {
        console.error("Error fetching registration status:", e);
        setIsOpen(true);
      }
    };

    fetchInitialData();
  }, []);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>) => {
    const { name, value, type } = e.target;
    if (type === "checkbox") {
      const checked = (e.target as HTMLInputElement).checked;
      setFormData((prev) => ({ ...prev, [name]: checked }));
    } else {
      setFormData((prev) => ({ ...prev, [name]: value }));
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!formData.persetujuan) {
      setToast({
        show: true,
        type: "error",
        message: "Anda wajib menyetujui pernyataan pakta integritas pendaftaran.",
      });
      return;
    }

    if (formData.departemen_1_id === formData.departemen_2_id) {
      setToast({
        show: true,
        type: "error",
        message: "Pilihan Departemen 1 dan Departemen 2 tidak boleh sama.",
      });
      return;
    }

    setIsLoading(true);

    try {
      const formPayload = new FormData();
      Object.entries(formData).forEach(([k, v]) => {
        formPayload.append(k, String(v));
      });

      const res = await submitRegistrationAction(formPayload);

      if (res.success && res.data) {
        setIsSuccess(true);
        setSuccessData(res.data);
        confetti({
          particleCount: 100,
          spread: 70,
          origin: { y: 0.6 },
        });
        window.scrollTo({ top: 0, behavior: "smooth" });
      } else {
        setToast({
          show: true,
          type: "error",
          message: res.message || "Gagal mengirimkan formulir pendaftaran.",
        });
      }
    } catch {
      setToast({
        show: true,
        type: "error",
        message: "Terjadi gangguan jaringan saat mengirim data. Coba lagi.",
      });
    } finally {
      setIsLoading(false);
    }
  };

  const copyRegistrationNumber = () => {
    if (successData?.no_pendaftaran) {
      navigator.clipboard.writeText(successData.no_pendaftaran);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    }
  };

  return (
    <div className="relative min-h-screen pt-28 pb-20 bg-white overflow-hidden text-slate-900">
      
      {/* ================= BACKGROUND ORGANIC SHAPES (Matching Mockup) ================= */}
      {/* Top Right Vibrant Red Organic Shape */}
      <div
        className="absolute top-0 right-0 w-[280px] sm:w-[480px] h-[280px] sm:h-[460px] bg-[#EE2D38] rounded-bl-[160px] sm:rounded-bl-[260px] pointer-events-none z-0"
        aria-hidden="true"
      />

      {/* Middle Right Vibrant Blue Organic Shape */}
      <div
        className="absolute top-[40%] right-0 w-[140px] sm:w-[220px] h-[200px] sm:h-[300px] bg-[#1A56DB] rounded-l-full pointer-events-none z-0"
        aria-hidden="true"
      />

      {/* Left Middle Golden Yellow Organic Shape */}
      <div
        className="absolute top-[30%] left-0 w-[160px] sm:w-[280px] h-[260px] sm:h-[400px] bg-[#FDB813] rounded-r-full pointer-events-none z-0"
        aria-hidden="true"
      />

      <div className="max-w-4xl mx-auto px-4 sm:px-6 relative z-10">

        {/* Header Title */}
        <div className="text-center space-y-3 mb-10 sm:mb-12">
          <div className="inline-flex items-center space-x-2 px-4 py-1.5 rounded-full bg-blue-50 border border-blue-200/80 text-[#1A56DB] text-xs sm:text-sm font-semibold shadow-sm">
            <UserPlus className="w-3.5 h-3.5" />
            <span>Penerimaan Pengurus Baru Periode {SITE_IDENTITY.PERIODE}</span>
          </div>

          <h1 className="text-3xl sm:text-4xl md:text-5xl font-black text-slate-900 tracking-tight leading-tight">
            Pendaftaran Calon Pengurus OSIS
          </h1>

          <p className="text-sm sm:text-base text-slate-600 max-w-2xl mx-auto">
            Mari melangkah bersama, mengabdi untuk almamater tercinta <strong>{SITE_IDENTITY.NAMA_SEKOLAH}</strong>.
          </p>
        </div>

        {/* Jika Pendaftaran Ditutup */}
        {isOpen === false && (
          <div className="bg-white rounded-3xl p-8 sm:p-12 text-center max-w-xl mx-auto border border-red-200 shadow-xl space-y-4">
            <div className="w-16 h-16 rounded-2xl bg-red-50 border border-red-200 flex items-center justify-center text-[#EE2D38] mx-auto">
              <ShieldAlert className="w-8 h-8" />
            </div>
            <h2 className="text-2xl font-black text-slate-900">
              Pendaftaran Belum Dibuka / Sudah Ditutup
            </h2>
            <p className="text-sm text-slate-600 leading-relaxed">
              Saat ini sistem penerimaan calon pengurus {SITE_IDENTITY.NAMA_ORGANISASI} sedang dinonaktifkan oleh panitia seleksi. Silakan memantau pengumuman berkala di halaman Berita & Info.
            </p>
            <div className="pt-2">
              <Link
                href="/"
                className="inline-flex items-center space-x-2 px-6 py-2.5 rounded-full bg-[#1A56DB] text-white hover:bg-[#1442AB] text-sm font-semibold shadow-md transition-all"
              >
                <span>Kembali ke Beranda</span>
              </Link>
            </div>
          </div>
        )}

        {/* Jika Berhasil Mendaftar (Success Card) */}
        {isSuccess && successData && (
          <div className="bg-white rounded-3xl p-8 sm:p-12 border border-emerald-200 shadow-2xl space-y-6">
            <div className="text-center space-y-3">
              <div className="w-16 h-16 rounded-full bg-emerald-50 border border-emerald-200 flex items-center justify-center text-emerald-600 mx-auto">
                <CheckCircle2 className="w-10 h-10" />
              </div>
              <h2 className="text-2xl sm:text-3xl font-black text-slate-900">
                Pendaftaran Berhasil Terkirim!
              </h2>
              <p className="text-sm text-slate-600 max-w-md mx-auto">
                Simpan nomor pendaftaran Anda di bawah ini untuk mengecek status kelulusan di portal seleksi.
              </p>
            </div>

            {/* Kartu Bukti Registrasi */}
            <div className="p-6 rounded-2xl bg-slate-50 border border-slate-200 space-y-4 max-w-lg mx-auto">
              <div className="flex items-center justify-between pb-3 border-b border-slate-200">
                <span className="text-xs uppercase tracking-wider text-slate-500 font-bold">
                  Nomor Pendaftaran Resmi
                </span>
                <span className="text-xs bg-emerald-100 text-emerald-700 px-2.5 py-0.5 rounded-full font-mono font-bold">
                  TERVERIFIKASI
                </span>
              </div>

              <div className="flex items-center justify-between">
                <span className="text-2xl sm:text-3xl font-black text-[#1A56DB] font-mono tracking-wider">
                  {successData.no_pendaftaran}
                </span>
                <button
                  type="button"
                  onClick={copyRegistrationNumber}
                  className="px-3.5 py-1.5 rounded-full bg-white border border-slate-200 hover:bg-slate-100 text-xs font-semibold text-slate-700 transition-colors flex items-center space-x-1.5 shadow-sm"
                >
                  {copied ? (
                    <>
                      <Check className="w-3.5 h-3.5 text-emerald-600" />
                      <span className="text-emerald-600">Tersalin!</span>
                    </>
                  ) : (
                    <>
                      <Copy className="w-3.5 h-3.5 text-slate-500" />
                      <span>Salin No</span>
                    </>
                  )}
                </button>
              </div>

              <div className="grid grid-cols-2 gap-3 pt-2 text-xs">
                <div>
                  <span className="text-slate-500 block">Nama Lengkap</span>
                  <span className="font-bold text-slate-900">{successData.nama_lengkap}</span>
                </div>
                <div>
                  <span className="text-slate-500 block">NIS</span>
                  <span className="font-bold text-slate-900">{successData.nis}</span>
                </div>
                <div>
                  <span className="text-slate-500 block">Kelas</span>
                  <span className="font-bold text-slate-900">{successData.kelas}</span>
                </div>
                <div>
                  <span className="text-slate-500 block">Jurusan</span>
                  <span className="font-bold text-slate-900">{successData.jurusan}</span>
                </div>
              </div>
            </div>

            {/* Aksi Selanjutnya */}
            <div className="flex flex-wrap items-center justify-center gap-4 pt-2">
              <Link
                href="/hasilseleksi"
                className="px-6 py-3 rounded-full font-bold text-white bg-[#1A56DB] hover:bg-[#1442AB] shadow-lg shadow-blue-500/20 transition-all flex items-center space-x-2 text-sm"
              >
                <span>Cek Hasil Seleksi</span>
                <ArrowRight className="w-4 h-4" />
              </Link>
              <button
                type="button"
                onClick={() => window.print()}
                className="px-6 py-3 rounded-full font-semibold text-slate-700 bg-white border border-slate-300 hover:bg-slate-50 transition-all flex items-center space-x-2 text-sm shadow-sm"
              >
                <Printer className="w-4 h-4 text-slate-500" />
                <span>Cetak Bukti Pendaftaran</span>
              </button>
            </div>
          </div>
        )}

        {/* Form Pendaftaran Utama (Jika Terbuka & Belum Berhasil) */}
        {isOpen !== false && !isSuccess && (
          <div className="bg-white rounded-3xl p-6 sm:p-10 border border-slate-100 shadow-xl relative">
            <form onSubmit={handleSubmit} className="space-y-8">

              {/* BAGIAN 1: IDENTITAS DIRI */}
              <div>
                <h3 className="text-base font-bold text-[#1A56DB] uppercase tracking-wider pb-3 border-b border-slate-100 flex items-center space-x-2">
                  <span className="w-2.5 h-2.5 rounded-full bg-[#1A56DB]" />
                  <span>1. Identitas Peserta Didik</span>
                </h3>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-5 mt-5">
                  {/* Nama Lengkap */}
                  <div className="sm:col-span-2">
                    <label className="block text-xs font-semibold text-slate-700 mb-1.5">
                      Nama Lengkap (Sesuai Rapor) <span className="text-[#EE2D38]">*</span>
                    </label>
                    <input
                      type="text"
                      name="nama_lengkap"
                      required
                      value={formData.nama_lengkap}
                      onChange={handleChange}
                      placeholder="Contoh: Raden Bagus Muhammad"
                      className="w-full px-4 py-2.5 sm:py-3 rounded-xl bg-slate-50/70 border border-slate-200 text-slate-800 placeholder-slate-400 text-sm focus:bg-white focus:outline-none focus:border-[#1A56DB] focus:ring-2 focus:ring-blue-100 transition-all"
                    />
                  </div>

                  {/* NIS */}
                  <div>
                    <label className="block text-xs font-semibold text-slate-700 mb-1.5">
                      Nomor Induk Siswa (NIS) <span className="text-[#EE2D38]">*</span>
                    </label>
                    <input
                      type="text"
                      name="nis"
                      required
                      value={formData.nis}
                      onChange={handleChange}
                      placeholder="Contoh: 12345"
                      className="w-full px-4 py-2.5 sm:py-3 rounded-xl bg-slate-50/70 border border-slate-200 text-slate-800 placeholder-slate-400 text-sm focus:bg-white focus:outline-none focus:border-[#1A56DB] focus:ring-2 focus:ring-blue-100 transition-all"
                    />
                    <span className="text-[11px] text-slate-500 mt-1 block">
                      Pastikan NIS benar untuk verifikasi pengumuman hasil seleksi
                    </span>
                  </div>

                  {/* Kelas */}
                  <div>
                    <label className="block text-xs font-semibold text-slate-700 mb-1.5">
                      Tingkat Kelas <span className="text-[#EE2D38]">*</span>
                    </label>
                    <select
                      name="kelas"
                      value={formData.kelas}
                      onChange={handleChange}
                      className="w-full px-4 py-2.5 sm:py-3 rounded-xl bg-slate-50/70 border border-slate-200 text-slate-800 text-sm focus:bg-white focus:outline-none focus:border-[#1A56DB] focus:ring-2 focus:ring-blue-100 transition-all"
                    >
                      {SITE_IDENTITY.KELAS.map((k) => (
                        <option key={k} value={k}>
                          {k}
                        </option>
                      ))}
                    </select>
                  </div>

                  {/* Jurusan */}
                  <div className="sm:col-span-2">
                    <label className="block text-xs font-semibold text-slate-700 mb-1.5">
                      Program Keahlian / Jurusan <span className="text-[#EE2D38]">*</span>
                    </label>
                    <select
                      name="jurusan"
                      value={formData.jurusan}
                      onChange={handleChange}
                      className="w-full px-4 py-2.5 sm:py-3 rounded-xl bg-slate-50/70 border border-slate-200 text-slate-800 text-sm focus:bg-white focus:outline-none focus:border-[#1A56DB] focus:ring-2 focus:ring-blue-100 transition-all"
                    >
                      {SITE_IDENTITY.JURUSAN.map((j) => (
                        <option key={j} value={j}>
                          {j}
                        </option>
                      ))}
                    </select>
                  </div>

                  {/* TTL */}
                  <div className="sm:col-span-2">
                    <label className="block text-xs font-semibold text-slate-700 mb-1.5">
                      Tempat & Tanggal Lahir <span className="text-[#EE2D38]">*</span>
                    </label>
                    <input
                      type="text"
                      name="ttl"
                      required
                      value={formData.ttl}
                      onChange={handleChange}
                      placeholder="Contoh: Bandung, 15 Juli 2008"
                      className="w-full px-4 py-2.5 sm:py-3 rounded-xl bg-slate-50/70 border border-slate-200 text-slate-800 placeholder-slate-400 text-sm focus:bg-white focus:outline-none focus:border-[#1A56DB] focus:ring-2 focus:ring-blue-100 transition-all"
                    />
                  </div>

                  {/* Kontak WhatsApp */}
                  <div>
                    <label className="block text-xs font-semibold text-slate-700 mb-1.5">
                      Nomor WhatsApp Aktif <span className="text-[#EE2D38]">*</span>
                    </label>
                    <input
                      type="tel"
                      name="no_wa"
                      required
                      value={formData.no_wa}
                      onChange={handleChange}
                      placeholder="08xxxxxxxxxx"
                      className="w-full px-4 py-2.5 sm:py-3 rounded-xl bg-slate-50/70 border border-slate-200 text-slate-800 placeholder-slate-400 text-sm focus:bg-white focus:outline-none focus:border-[#1A56DB] focus:ring-2 focus:ring-blue-100 transition-all"
                    />
                  </div>

                  {/* Email */}
                  <div>
                    <label className="block text-xs font-semibold text-slate-700 mb-1.5">
                      Alamat Email Aktif <span className="text-[#EE2D38]">*</span>
                    </label>
                    <input
                      type="email"
                      name="email"
                      required
                      value={formData.email}
                      onChange={handleChange}
                      placeholder="nama@email.com"
                      className="w-full px-4 py-2.5 sm:py-3 rounded-xl bg-slate-50/70 border border-slate-200 text-slate-800 placeholder-slate-400 text-sm focus:bg-white focus:outline-none focus:border-[#1A56DB] focus:ring-2 focus:ring-blue-100 transition-all"
                    />
                  </div>
                </div>
              </div>

              {/* BAGIAN 2: PILIHAN DEPARTEMEN */}
              <div>
                <h3 className="text-base font-bold text-[#EE2D38] uppercase tracking-wider pb-3 border-b border-slate-100 flex items-center space-x-2">
                  <span className="w-2.5 h-2.5 rounded-full bg-[#EE2D38]" />
                  <span>2. Pilihan Bidang / Departemen OSIS</span>
                </h3>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-5 mt-5">
                  <div>
                    <label className="block text-xs font-semibold text-slate-700 mb-1.5">
                      Pilihan Prioritas 1 <span className="text-[#EE2D38]">*</span>
                    </label>
                    <select
                      name="departemen_1_id"
                      value={formData.departemen_1_id}
                      onChange={handleChange}
                      className="w-full px-4 py-2.5 sm:py-3 rounded-xl bg-slate-50/70 border border-slate-200 text-slate-800 text-sm focus:bg-white focus:outline-none focus:border-[#1A56DB] focus:ring-2 focus:ring-blue-100 transition-all"
                    >
                      {departemenList.map((d) => (
                        <option key={`p1-${d.id}`} value={d.id}>
                          {d.nama}
                        </option>
                      ))}
                    </select>
                  </div>

                  <div>
                    <label className="block text-xs font-semibold text-slate-700 mb-1.5">
                      Pilihan Prioritas 2 <span className="text-[#EE2D38]">*</span>
                    </label>
                    <select
                      name="departemen_2_id"
                      value={formData.departemen_2_id}
                      onChange={handleChange}
                      className="w-full px-4 py-2.5 sm:py-3 rounded-xl bg-slate-50/70 border border-slate-200 text-slate-800 text-sm focus:bg-white focus:outline-none focus:border-[#1A56DB] focus:ring-2 focus:ring-blue-100 transition-all"
                    >
                      {departemenList.map((d) => (
                        <option key={`p2-${d.id}`} value={d.id}>
                          {d.nama}
                        </option>
                      ))}
                    </select>
                  </div>
                </div>
              </div>

              {/* BAGIAN 3: MOTIVASI & PENGALAMAN */}
              <div>
                <h3 className="text-base font-bold text-[#FDB813] uppercase tracking-wider pb-3 border-b border-slate-100 flex items-center space-x-2">
                  <span className="w-2.5 h-2.5 rounded-full bg-[#FDB813]" />
                  <span>3. Motivasi & Pengalaman Organisasi</span>
                </h3>

                <div className="space-y-5 mt-5">
                  <div>
                    <label className="block text-xs font-semibold text-slate-700 mb-1.5">
                      Motivasi & Alasan Ingin Menjadi Pengurus OSIS <span className="text-[#EE2D38]">*</span>
                    </label>
                    <textarea
                      name="motivasi"
                      rows={4}
                      required
                      value={formData.motivasi}
                      onChange={handleChange}
                      placeholder="Jelaskan apa yang mendorong Anda untuk bergabung dan kontribusi apa yang ingin Anda berikan..."
                      className="w-full px-4 py-3 rounded-xl bg-slate-50/70 border border-slate-200 text-slate-800 placeholder-slate-400 text-sm focus:bg-white focus:outline-none focus:border-[#1A56DB] focus:ring-2 focus:ring-blue-100 transition-all resize-none"
                    />
                  </div>

                  <div>
                    <label className="block text-xs font-semibold text-slate-700 mb-1.5">
                      Pengalaman Organisasi / Kepanitiaan Sebelumnya (Opsional)
                    </label>
                    <textarea
                      name="pengalaman"
                      rows={3}
                      value={formData.pengalaman}
                      onChange={handleChange}
                      placeholder="Contoh: Pengurus OSIS SMP, Ketua Panitia Pentas Seni Kelas, Anggota Pramuka..."
                      className="w-full px-4 py-3 rounded-xl bg-slate-50/70 border border-slate-200 text-slate-800 placeholder-slate-400 text-sm focus:bg-white focus:outline-none focus:border-[#1A56DB] focus:ring-2 focus:ring-blue-100 transition-all resize-none"
                    />
                  </div>
                </div>
              </div>

              {/* BAGIAN 4: UPLOAD BERKAS */}
              <div>
                <h3 className="text-base font-bold text-[#1A56DB] uppercase tracking-wider pb-3 border-b border-slate-100 flex items-center space-x-2">
                  <span className="w-2.5 h-2.5 rounded-full bg-[#1A56DB]" />
                  <span>4. Tautan Foto & Berkas Administrasi</span>
                </h3>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-5 mt-5">
                  <div>
                    <label className="block text-xs font-semibold text-slate-700 mb-1.5">
                      URL Foto Diri / Pas Foto (Google Drive / Cloudinary)
                    </label>
                    <input
                      type="url"
                      name="foto_url"
                      value={formData.foto_url}
                      onChange={handleChange}
                      placeholder="https://drive.google.com/..."
                      className="w-full px-4 py-2.5 sm:py-3 rounded-xl bg-slate-50/70 border border-slate-200 text-slate-800 placeholder-slate-400 text-sm focus:bg-white focus:outline-none focus:border-[#1A56DB] focus:ring-2 focus:ring-blue-100 transition-all"
                    />
                    <span className="text-[11px] text-slate-500 mt-1 block">
                      Tautan foto formal seragam sekolah (pastikan akses publik/view only)
                    </span>
                  </div>

                  <div>
                    <label className="block text-xs font-semibold text-slate-700 mb-1.5">
                      URL Berkas Persyaratan / Surat Izin Ortu
                    </label>
                    <input
                      type="url"
                      name="berkas_url"
                      value={formData.berkas_url}
                      onChange={handleChange}
                      placeholder="https://drive.google.com/..."
                      className="w-full px-4 py-2.5 sm:py-3 rounded-xl bg-slate-50/70 border border-slate-200 text-slate-800 placeholder-slate-400 text-sm focus:bg-white focus:outline-none focus:border-[#1A56DB] focus:ring-2 focus:ring-blue-100 transition-all"
                    />
                    <span className="text-[11px] text-slate-500 mt-1 block">
                      Tautan berkas PDF scan izin orang tua & rekam jejak
                    </span>
                  </div>
                </div>
              </div>

              {/* PERSETUJUAN */}
              <div className="p-4 rounded-2xl bg-blue-50/60 border border-blue-100 flex items-start space-x-3">
                <input
                  type="checkbox"
                  id="persetujuan"
                  name="persetujuan"
                  checked={formData.persetujuan}
                  onChange={handleChange}
                  className="w-5 h-5 mt-0.5 rounded text-[#1A56DB] focus:ring-[#1A56DB] bg-white border-slate-300"
                />
                <label htmlFor="persetujuan" className="text-xs text-slate-700 leading-relaxed cursor-pointer">
                  Dengan ini saya menyatakan bahwa seluruh data yang diisikan adalah benar dan dapat dipertanggungjawabkan. Saya berkomitmen mengikuti seluruh tahapan seleksi calon pengurus {SITE_IDENTITY.NAMA_ORGANISASI} dengan penuh integritas dan kedisiplinan.
                </label>
              </div>

              {/* Submit Button */}
              <div>
                <button
                  type="submit"
                  disabled={isLoading}
                  className="w-full py-3.5 sm:py-4 rounded-full font-bold text-white bg-[#1A56DB] hover:bg-[#1442AB] shadow-lg shadow-blue-500/25 transition-all duration-200 flex items-center justify-center space-x-2 text-base hover:scale-[1.01] active:scale-[0.98] disabled:opacity-50"
                >
                  {isLoading ? (
                    <>
                      <div className="w-5 h-5 border-2 border-white border-t-transparent rounded-full animate-spin" />
                      <span>Memproses Pendaftaran...</span>
                    </>
                  ) : (
                    <>
                      <FileCheck className="w-5 h-5" />
                      <span>Kirim Formulir Pendaftaran OSIS</span>
                    </>
                  )}
                </button>
              </div>

            </form>
          </div>
        )}

      </div>

      <Toast
        show={toast.show}
        type={toast.type}
        message={toast.message}
        onClose={() => setToast((prev) => ({ ...prev, show: false }))}
      />
    </div>
  );
}
