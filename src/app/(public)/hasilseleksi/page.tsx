"use client";

import { useState } from "react";
import Link from "next/link";
import {
  UserCheck,
  Search,
  CheckCircle2,
  XCircle,
  Clock,
  Sparkles,
  ArrowRight,
  ShieldCheck,
  Building,
  User,
  GraduationCap,
  MessageCircle,
} from "lucide-react";
import { checkSelectionAction, SelectionResultData } from "@/app/actions/selection";
import { Toast } from "@/components/ui/Toast";
import { SITE_IDENTITY } from "@/lib/constants";

export default function HasilSeleksiPage() {
  const [query, setQuery] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [result, setResult] = useState<SelectionResultData | null>(null);
  const [hasSearched, setHasSearched] = useState(false);
  const [toast, setToast] = useState<{ show: boolean; type: "success" | "error"; message: string }>({
    show: false,
    type: "success",
    message: "",
  });

  const handleSearch = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!query.trim()) {
      setToast({
        show: true,
        type: "error",
        message: "Silakan masukkan NIS atau Nomor Pendaftaran Anda.",
      });
      return;
    }

    setIsLoading(true);
    setResult(null);
    setHasSearched(false);

    try {
      const res = await checkSelectionAction(query);

      if (res.success && res.data) {
        setResult(res.data);
        setHasSearched(true);
      } else {
        setHasSearched(true);
        setToast({
          show: true,
          type: "error",
          message: res.message || "Data pendaftaran tidak ditemukan.",
        });
      }
    } catch {
      setToast({
        show: true,
        type: "error",
        message: "Terjadi kesalahan saat memuat data. Harap coba lagi.",
      });
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="relative min-h-screen pt-28 pb-20 bg-white overflow-hidden text-slate-900">
      
      {/* ================= BACKGROUND ORGANIC SHAPES ================= */}
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
        <div className="text-center space-y-3 mb-10">
          <div className="inline-flex items-center space-x-2 px-4 py-1.5 rounded-full bg-blue-50 border border-blue-200/80 text-[#1A56DB] text-xs sm:text-sm font-semibold shadow-sm">
            <UserCheck className="w-3.5 h-3.5" />
            <span>Pengumuman Hasil Seleksi</span>
          </div>

          <h1 className="text-3xl sm:text-4xl md:text-5xl font-black text-slate-900 tracking-tight leading-tight">
            Cek Hasil Seleksi Calon Pengurus
          </h1>

          <p className="text-sm sm:text-base text-slate-600 max-w-xl mx-auto">
            Masukkan Nomor Induk Siswa (NIS) atau Nomor Pendaftaran Anda untuk melihat status kelulusan seleksi {SITE_IDENTITY.NAMA_ORGANISASI}.
          </p>
        </div>

        {/* Search Form Card */}
        <div className="bg-white rounded-3xl p-6 sm:p-8 border border-slate-100 shadow-xl mb-10 max-w-2xl mx-auto">
          <form onSubmit={handleSearch} className="space-y-4">
            <div>
              <label htmlFor="search-nis" className="block text-xs font-semibold text-slate-700 mb-2">
                Nomor Induk Siswa (NIS) atau No. Pendaftaran
              </label>
              <div className="relative">
                <input
                  id="search-nis"
                  type="text"
                  required
                  value={query}
                  onChange={(e) => setQuery(e.target.value)}
                  placeholder="Contoh: 12345 atau REG-2024-0001"
                  className="w-full pl-11 pr-4 py-3 sm:py-3.5 rounded-xl bg-slate-50 border border-slate-200 text-slate-800 placeholder-slate-400 text-sm focus:bg-white focus:outline-none focus:border-[#1A56DB] focus:ring-2 focus:ring-blue-100 transition-colors uppercase font-mono"
                />
                <Search className="w-5 h-5 text-slate-400 absolute left-3.5 top-1/2 -translate-y-1/2" />
              </div>
            </div>

            <button
              type="submit"
              disabled={isLoading}
              className="w-full py-3.5 rounded-full font-bold text-white bg-[#1A56DB] hover:bg-[#1442AB] shadow-lg shadow-blue-500/20 transition-all flex items-center justify-center space-x-2 text-sm disabled:opacity-50"
            >
              {isLoading ? (
                <>
                  <div className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin" />
                  <span>Mengecek Data Seleksi...</span>
                </>
              ) : (
                <>
                  <UserCheck className="w-4 h-4" />
                  <span>Cek Hasil Seleksi</span>
                </>
              )}
            </button>
          </form>
        </div>

        {/* HASIL SELEKSI CARD */}
        {result && (
          <div className="max-w-2xl mx-auto">
            <div
              className={`bg-white rounded-3xl p-6 sm:p-10 border shadow-2xl relative overflow-hidden ${
                result.status_seleksi === "Lolos"
                  ? "border-emerald-300"
                  : result.status_seleksi === "Dalam Proses"
                  ? "border-amber-300"
                  : "border-rose-300"
              }`}
            >
              {/* Header Status Badge */}
              <div className="text-center space-y-3 pb-6 border-b border-slate-100">
                {result.status_seleksi === "Lolos" && (
                  <>
                    <div className="w-16 h-16 rounded-full bg-emerald-50 border border-emerald-200 flex items-center justify-center text-emerald-600 mx-auto shadow-sm">
                      <CheckCircle2 className="w-10 h-10" />
                    </div>
                    <span className="inline-block px-4 py-1.5 rounded-full bg-emerald-100 text-emerald-800 font-black text-xs sm:text-sm tracking-wider uppercase">
                      SELAMAT, ANDA DINYATAKAN LOLOS!
                    </span>
                    <p className="text-xs sm:text-sm text-slate-600 max-w-md mx-auto">
                      Selamat bergabung menjadi bagian dari dewan pengurus {SITE_IDENTITY.NAMA_ORGANISASI} Periode {SITE_IDENTITY.PERIODE}!
                    </p>
                  </>
                )}

                {result.status_seleksi === "Dalam Proses" && (
                  <>
                    <div className="w-16 h-16 rounded-full bg-amber-50 border border-amber-200 flex items-center justify-center text-amber-600 mx-auto shadow-sm">
                      <Clock className="w-10 h-10" />
                    </div>
                    <span className="inline-block px-4 py-1.5 rounded-full bg-amber-100 text-amber-800 font-black text-xs sm:text-sm tracking-wider uppercase">
                      SEDANG DALAM TAHAP PROSES SELEKSI
                    </span>
                    <p className="text-xs sm:text-sm text-slate-600 max-w-md mx-auto">
                      Berkas administrasi dan data Anda sedang dalam tahap verifikasi panitia seleksi.
                    </p>
                  </>
                )}

                {result.status_seleksi === "Tidak Lolos" && (
                  <>
                    <div className="w-16 h-16 rounded-full bg-rose-50 border border-rose-200 flex items-center justify-center text-[#EE2D38] mx-auto shadow-sm">
                      <XCircle className="w-10 h-10" />
                    </div>
                    <span className="inline-block px-4 py-1.5 rounded-full bg-rose-100 text-[#EE2D38] font-black text-xs sm:text-sm tracking-wider uppercase">
                      MOHON MAAF, BELUM DAPAT DITERIMA
                    </span>
                    <p className="text-xs sm:text-sm text-slate-600 max-w-md mx-auto">
                      Terima kasih atas antusiasme dan partisipasi Anda. Jangan patah semangat untuk terus berprestasi bagi {SITE_IDENTITY.NAMA_SEKOLAH}!
                    </p>
                  </>
                )}
              </div>

              {/* Data Detail Pendaftar */}
              <div className="py-6 space-y-4 text-xs sm:text-sm">
                <div className="grid grid-cols-2 gap-4 p-4 rounded-2xl bg-slate-50 border border-slate-200">
                  <div>
                    <span className="text-slate-500 text-xs block">No. Pendaftaran</span>
                    <span className="font-mono font-bold text-[#1A56DB]">{result.no_pendaftaran}</span>
                  </div>
                  <div>
                    <span className="text-slate-500 text-xs block">Nama Lengkap</span>
                    <span className="font-bold text-slate-900">{result.nama_lengkap}</span>
                  </div>
                  <div>
                    <span className="text-slate-500 text-xs block">Kelas / Tingkat</span>
                    <span className="text-slate-700">{result.kelas}</span>
                  </div>
                  <div>
                    <span className="text-slate-500 text-xs block">Jurusan</span>
                    <span className="text-slate-700">{result.jurusan}</span>
                  </div>
                </div>

                {/* Departemen Penempatan jika lolos */}
                {result.status_seleksi === "Lolos" && result.departemen_nama && (
                  <div className="p-4 rounded-2xl bg-emerald-50 border border-emerald-200 flex items-center space-x-3">
                    <Building className="w-5 h-5 text-emerald-600 shrink-0" />
                    <div>
                      <span className="text-[11px] uppercase tracking-wider text-emerald-700 font-bold block">
                        Departemen / Bidang Penempatan
                      </span>
                      <span className="text-sm font-bold text-slate-900">
                        {result.departemen_nama}
                      </span>
                    </div>
                  </div>
                )}

                {/* Catatan Khusus Panitia */}
                {result.catatan_seleksi && (
                  <div className="p-4 rounded-2xl bg-slate-50 border border-slate-200 space-y-1.5">
                    <span className="text-xs font-bold text-slate-700 flex items-center space-x-1.5">
                      <MessageCircle className="w-3.5 h-3.5 text-[#1A56DB]" />
                      <span>Instruksi & Catatan Panitia Seleksi</span>
                    </span>
                    <p className="text-xs text-slate-600 leading-relaxed">
                      {result.catatan_seleksi}
                    </p>
                  </div>
                )}
              </div>

              {/* Action buttons */}
              <div className="pt-2 flex justify-center">
                <Link
                  href="/"
                  className="px-6 py-2.5 rounded-full bg-slate-100 hover:bg-slate-200 text-slate-700 text-xs font-semibold transition-colors"
                >
                  Kembali ke Beranda
                </Link>
              </div>

            </div>
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
