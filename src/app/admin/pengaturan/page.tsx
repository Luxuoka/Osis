"use client";

import { useState, useEffect } from "react";
import {
  Settings,
  Save,
  CheckCircle2,
  ShieldAlert,
  Sliders,
  Phone,
  Mail,
  MapPin,
  Instagram,
  Video,
} from "lucide-react";
import { createClient } from "@/lib/supabase/client";
import { Toast } from "@/components/ui/Toast";
import { SITE_IDENTITY } from "@/lib/constants";

export default function AdminPengaturanPage() {
  const [isLoading, setIsLoading] = useState(true);
  const [isSaving, setIsSaving] = useState(false);
  const [recordId, setRecordId] = useState<string | null>(null);

  // Form State
  const [periode, setPeriode] = useState("2026/2027");
  const [pendaftaranBuka, setPendaftaranBuka] = useState(true);
  const [hasilSeleksiTerbuka, setHasilSeleksiTerbuka] = useState(true);

  // Hero Stats
  const [statsDepartemen, setStatsDepartemen] = useState("9");
  const [statsPengurus, setStatsPengurus] = useState("64");
  const [statsProker, setStatsProker] = useState("12+");
  const [statsPeriode, setStatsPeriode] = useState("2026/2027");

  // Kontak & Media
  const [alamat, setAlamat] = useState(SITE_IDENTITY.ALAMAT);
  const [email, setEmail] = useState(SITE_IDENTITY.EMAIL);
  const [telepon, setTelepon] = useState(SITE_IDENTITY.TELEPON);
  const [instagram, setInstagram] = useState(SITE_IDENTITY.INSTAGRAM);
  const [videoProfilUrl, setVideoProfilUrl] = useState("/video-profil.mp4");

  const [toast, setToast] = useState<{ show: boolean; type: "success" | "error"; message: string }>({
    show: false,
    type: "success",
    message: "",
  });

  const fetchPengaturan = async () => {
    setIsLoading(true);
    try {
      const supabase = createClient();
      const { data } = await supabase.from("pengaturan").select("*").limit(1).maybeSingle();

      if (data) {
        setRecordId(data.id);
        setPeriode(data.periode || "2026/2027");
        setPendaftaranBuka(data.pendaftaran_buka ?? true);
        setHasilSeleksiTerbuka(data.hasil_seleksi_terbuka ?? true);
        setStatsDepartemen(data.stats_departemen || "9");
        setStatsPengurus(data.stats_pengurus || "64");
        setStatsProker(data.stats_proker || "12+");
        setStatsPeriode(data.stats_periode || "2026/2027");
        setAlamat(data.alamat || SITE_IDENTITY.ALAMAT);
        setEmail(data.email || SITE_IDENTITY.EMAIL);
        setTelepon(data.telepon || SITE_IDENTITY.TELEPON);
        setInstagram(data.instagram || SITE_IDENTITY.INSTAGRAM);
        setVideoProfilUrl(data.video_profil_url || "/video-profil.mp4");
      }
    } catch (e) {
      console.error(e);
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    fetchPengaturan();
  }, []);

  const handleSave = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSaving(true);

    try {
      const supabase = createClient();
      const payload = {
        periode,
        pendaftaran_buka: pendaftaranBuka,
        hasil_seleksi_terbuka: hasilSeleksiTerbuka,
        stats_departemen: statsDepartemen,
        stats_pengurus: statsPengurus,
        stats_proker: statsProker,
        stats_periode: statsPeriode,
        alamat,
        email,
        telepon,
        instagram,
        video_profil_url: videoProfilUrl,
        updated_at: new Date().toISOString(),
      };

      if (recordId) {
        await supabase.from("pengaturan").update(payload).eq("id", recordId);
      } else {
        const { data } = await supabase.from("pengaturan").insert(payload).select("id").single();
        if (data) setRecordId(data.id);
      }

      setToast({
        show: true,
        type: "success",
        message: "Pengaturan situs berhasil disimpan dan diterapkan!",
      });
    } catch {
      setToast({
        show: true,
        type: "error",
        message: "Gagal menyimpan pengaturan situs.",
      });
    } finally {
      setIsSaving(false);
    }
  };

  return (
    <div className="space-y-8 max-w-4xl">
      {/* Header */}
      <div>
        <h1 className="text-2xl font-black text-white tracking-tight">
          Pengaturan Situs & Portal OSIS
        </h1>
        <p className="text-xs text-slate-400 mt-1">
          Kontrol sakelar buka/tutup seleksi, angka statistik hero section, dan informasi kontak organisasi.
        </p>
      </div>

      <form onSubmit={handleSave} className="space-y-8 text-xs">
        
        {/* BAGIAN 1: SAKELAR SISTEM (PENDAFTARAN & PENGUMUMAN) */}
        <div className="glass-card rounded-2xl p-6 border border-slate-800 space-y-4">
          <h2 className="text-sm font-bold text-white flex items-center space-x-2">
            <Sliders className="w-4 h-4 text-amber-400" />
            <span>Status Layanan Online</span>
          </h2>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            {/* Sakelar Pendaftaran */}
            <div className="p-4 rounded-xl bg-slate-900 border border-slate-800 flex items-center justify-between">
              <div>
                <span className="font-bold text-white block text-sm">
                  Pendaftaran Calon OSIS
                </span>
                <span className="text-slate-400 text-[11px]">
                  {pendaftaranBuka ? "Formulir pendaftaran sedang dibuka publik" : "Pendaftaran sedang dinonaktifkan/tutup"}
                </span>
              </div>
              <label className="relative inline-flex items-center cursor-pointer">
                <input
                  type="checkbox"
                  checked={pendaftaranBuka}
                  onChange={(e) => setPendaftaranBuka(e.target.checked)}
                  className="sr-only peer"
                />
                <div className="w-11 h-6 bg-slate-800 peer-focus:outline-none rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-slate-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-emerald-500"></div>
              </label>
            </div>

            {/* Sakelar Pengumuman Seleksi */}
            <div className="p-4 rounded-xl bg-slate-900 border border-slate-800 flex items-center justify-between">
              <div>
                <span className="font-bold text-white block text-sm">
                  Publikasi Hasil Seleksi
                </span>
                <span className="text-slate-400 text-[11px]">
                  {hasilSeleksiTerbuka ? "Pengecekan hasil seleksi dapat diakses siswa" : "Hasil seleksi disembunyikan / ditutup"}
                </span>
              </div>
              <label className="relative inline-flex items-center cursor-pointer">
                <input
                  type="checkbox"
                  checked={hasilSeleksiTerbuka}
                  onChange={(e) => setHasilSeleksiTerbuka(e.target.checked)}
                  className="sr-only peer"
                />
                <div className="w-11 h-6 bg-slate-800 peer-focus:outline-none rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-slate-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-amber-400"></div>
              </label>
            </div>
          </div>
        </div>

        {/* BAGIAN 2: STATISTIK BERANDA (HERO COUNT-UP) */}
        <div className="glass-card rounded-2xl p-6 border border-slate-800 space-y-4">
          <h2 className="text-sm font-bold text-white flex items-center space-x-2">
            <span className="w-2 h-2 rounded-full bg-blue-400" />
            <span>Nilai Statistik Beranda (Count-Up Hero)</span>
          </h2>

          <div className="grid grid-cols-2 sm:grid-cols-4 gap-4">
            <div>
              <label className="block text-slate-400 mb-1 font-semibold">
                Departemen
              </label>
              <input
                type="text"
                value={statsDepartemen}
                onChange={(e) => setStatsDepartemen(e.target.value)}
                className="w-full px-3 py-2 rounded-xl bg-slate-900 border border-slate-700 text-white font-mono font-bold"
              />
            </div>

            <div>
              <label className="block text-slate-400 mb-1 font-semibold">
                Pengurus Aktif
              </label>
              <input
                type="text"
                value={statsPengurus}
                onChange={(e) => setStatsPengurus(e.target.value)}
                className="w-full px-3 py-2 rounded-xl bg-slate-900 border border-slate-700 text-white font-mono font-bold"
              />
            </div>

            <div>
              <label className="block text-slate-400 mb-1 font-semibold">
                Program Kerja
              </label>
              <input
                type="text"
                value={statsProker}
                onChange={(e) => setStatsProker(e.target.value)}
                className="w-full px-3 py-2 rounded-xl bg-slate-900 border border-slate-700 text-white font-mono font-bold"
              />
            </div>

            <div>
              <label className="block text-slate-400 mb-1 font-semibold">
                Tahun Periode
              </label>
              <input
                type="text"
                value={statsPeriode}
                onChange={(e) => setStatsPeriode(e.target.value)}
                className="w-full px-3 py-2 rounded-xl bg-slate-900 border border-slate-700 text-white font-mono font-bold"
              />
            </div>
          </div>
        </div>

        {/* BAGIAN 3: KONTAK & MEDIA SOSIAL */}
        <div className="glass-card rounded-2xl p-6 border border-slate-800 space-y-4">
          <h2 className="text-sm font-bold text-white flex items-center space-x-2">
            <span className="w-2 h-2 rounded-full bg-purple-400" />
            <span>Kontak Kesekretariatan & Tautan Video</span>
          </h2>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div className="sm:col-span-2">
              <label className="block text-slate-400 mb-1 font-semibold">
                Alamat Sekretariat OSIS
              </label>
              <input
                type="text"
                value={alamat}
                onChange={(e) => setAlamat(e.target.value)}
                className="w-full px-3 py-2 rounded-xl bg-slate-900 border border-slate-700 text-white"
              />
            </div>

            <div>
              <label className="block text-slate-400 mb-1 font-semibold">
                Email Resmi Organisasi
              </label>
              <input
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="w-full px-3 py-2 rounded-xl bg-slate-900 border border-slate-700 text-white"
              />
            </div>

            <div>
              <label className="block text-slate-400 mb-1 font-semibold">
                Nomor Telepon Sekolah
              </label>
              <input
                type="text"
                value={telepon}
                onChange={(e) => setTelepon(e.target.value)}
                className="w-full px-3 py-2 rounded-xl bg-slate-900 border border-slate-700 text-white"
              />
            </div>

            <div>
              <label className="block text-slate-400 mb-1 font-semibold">
                URL Instagram Resmi
              </label>
              <input
                type="url"
                value={instagram}
                onChange={(e) => setInstagram(e.target.value)}
                className="w-full px-3 py-2 rounded-xl bg-slate-900 border border-slate-700 text-white"
              />
            </div>

            <div>
              <label className="block text-slate-400 mb-1 font-semibold">
                Path / URL Video Profil
              </label>
              <input
                type="text"
                value={videoProfilUrl}
                onChange={(e) => setVideoProfilUrl(e.target.value)}
                className="w-full px-3 py-2 rounded-xl bg-slate-900 border border-slate-700 text-white"
              />
            </div>
          </div>
        </div>

        {/* Submit Save Button */}
        <div>
          <button
            type="submit"
            disabled={isSaving}
            className="px-8 py-3.5 rounded-xl bg-gradient-to-r from-amber-400 to-amber-500 hover:from-amber-300 text-slate-950 font-bold text-xs shadow-xl shadow-amber-500/20 flex items-center space-x-2 transition-all disabled:opacity-50"
          >
            <Save className="w-4 h-4" />
            <span>{isSaving ? "Menyimpan Perubahan..." : "Simpan Semua Pengaturan"}</span>
          </button>
        </div>

      </form>

      <Toast
        show={toast.show}
        type={toast.type}
        message={toast.message}
        onClose={() => setToast((prev) => ({ ...prev, show: false }))}
      />
    </div>
  );
}
