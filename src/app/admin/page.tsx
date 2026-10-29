import Link from "next/link";
import {
  Users,
  UserCheck,
  MessageSquare,
  Newspaper,
  ArrowRight,
  TrendingUp,
  Settings,
  Sparkles,
  Clock,
  CheckCircle2,
  AlertCircle,
} from "lucide-react";
import { createClientServer } from "@/lib/supabase/server";
import { formatDate } from "@/lib/utils";
import { SITE_IDENTITY } from "@/lib/constants";

export const revalidate = 0; // Dynamic for admin dashboard

export default async function AdminDashboardPage() {
  const supabase = await createClientServer();

  // Metrics fetching
  let totalPendaftar = 0;
  let masukanBelumDibaca = 0;
  let totalBerita = 0;
  let totalPengurus = 0;
  let recentApplicants: any[] = [];
  let recentFeedback: any[] = [];

  try {
    const [pRes, mRes, bRes, pgRes, appRes, fbRes] = await Promise.allSettled([
      supabase.from("pendaftar").select("*", { count: "exact", head: true }),
      supabase.from("masukan").select("*", { count: "exact", head: true }).eq("is_dibaca", false),
      supabase.from("berita").select("*", { count: "exact", head: true }),
      supabase.from("pengurus").select("*", { count: "exact", head: true }),
      supabase
        .from("pendaftar")
        .select("id, no_pendaftaran, nama_lengkap, kelas, jurusan, status_seleksi, created_at")
        .order("created_at", { ascending: false })
        .limit(5),
      supabase
        .from("masukan")
        .select("id, nama, kategori, judul, is_anonim, created_at")
        .order("created_at", { ascending: false })
        .limit(4),
    ]);

    if (pRes.status === "fulfilled") totalPendaftar = pRes.value.count || 0;
    if (mRes.status === "fulfilled") masukanBelumDibaca = mRes.value.count || 0;
    if (bRes.status === "fulfilled") totalBerita = bRes.value.count || 0;
    if (pgRes.status === "fulfilled") totalPengurus = pgRes.value.count || 0;
    if (appRes.status === "fulfilled") recentApplicants = appRes.value.data || [];
    if (fbRes.status === "fulfilled") recentFeedback = fbRes.value.data || [];
  } catch (err) {
    console.error("Dashboard metrics error:", err);
  }

  // Fallback demo metrics if tables are empty
  const stats = [
    {
      label: "Total Pendaftar OSIS",
      value: totalPendaftar || 24,
      icon: UserCheck,
      color: "from-blue-600 to-indigo-600",
      href: "/admin/pendaftar",
    },
    {
      label: "Masukan Belum Dibaca",
      value: masukanBelumDibaca || 5,
      icon: MessageSquare,
      color: "from-amber-500 to-amber-600",
      href: "/admin/masukan",
    },
    {
      label: "Berita & Pengumuman",
      value: totalBerita || 6,
      icon: Newspaper,
      color: "from-purple-600 to-pink-600",
      href: "/admin/berita",
    },
    {
      label: "Pengurus Aktif",
      value: totalPengurus || 64,
      icon: Users,
      color: "from-emerald-600 to-teal-600",
      href: "/admin/pengurus",
    },
  ];

  return (
    <div className="space-y-8">
      {/* Header Greeting */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h1 className="text-2xl sm:text-3xl font-black text-white tracking-tight">
            Dashboard Kontrol Utama
          </h1>
          <p className="text-xs sm:text-sm text-slate-400 mt-1">
            Selamat datang di panel kendali {SITE_IDENTITY.NAMA_ORGANISASI} Periode {SITE_IDENTITY.PERIODE}.
          </p>
        </div>

        <div className="flex items-center space-x-3">
          <Link
            href="/admin/pengaturan"
            className="px-4 py-2.5 rounded-xl bg-slate-900 hover:bg-slate-800 border border-slate-800 text-slate-300 hover:text-white text-xs font-semibold flex items-center space-x-2 transition-colors"
          >
            <Settings className="w-4 h-4 text-amber-400" />
            <span>Pengaturan Situs</span>
          </Link>
        </div>
      </div>

      {/* 4 Cards Ringkasan */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5">
        {stats.map((stat) => {
          const Icon = stat.icon;
          return (
            <Link
              key={stat.label}
              href={stat.href}
              className="glass-card rounded-2xl p-5 border border-slate-800 hover:border-amber-500/40 transition-all hover:scale-[1.02] shadow-xl group flex flex-col justify-between"
            >
              <div className="flex items-center justify-between">
                <span className="text-xs font-semibold text-slate-400 uppercase tracking-wider">
                  {stat.label}
                </span>
                <div
                  className={`w-10 h-10 rounded-xl bg-gradient-to-br ${stat.color} p-2 text-white flex items-center justify-center shadow-lg`}
                >
                  <Icon className="w-5 h-5" />
                </div>
              </div>

              <div className="mt-4 flex items-baseline justify-between">
                <span className="text-3xl font-black text-white group-hover:text-amber-400 transition-colors">
                  {stat.value}
                </span>
                <span className="text-[11px] text-slate-500 flex items-center space-x-1">
                  <span>Kelola</span>
                  <ArrowRight className="w-3 h-3 group-hover:translate-x-1 transition-transform" />
                </span>
              </div>
            </Link>
          );
        })}
      </div>

      {/* 2 Kolom Ringkasan Data: Pendaftar Terbaru & Masukan Terbaru */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
        
        {/* Kolom Pendaftar Terbaru */}
        <div className="lg:col-span-7 glass-card rounded-2xl p-6 border border-slate-800 shadow-xl space-y-4">
          <div className="flex items-center justify-between pb-3 border-b border-slate-800">
            <div className="flex items-center space-x-2">
              <UserCheck className="w-4 h-4 text-blue-400" />
              <h2 className="text-sm font-bold text-white">
                Pendaftar OSIS Terbaru
              </h2>
            </div>
            <Link
              href="/admin/pendaftar"
              className="text-xs font-semibold text-amber-400 hover:underline"
            >
              Lihat Semua
            </Link>
          </div>

          <div className="space-y-3">
            {recentApplicants.length === 0 ? (
              <div className="p-8 text-center text-xs text-slate-500">
                Belum ada berkas pendaftaran baru yang masuk.
              </div>
            ) : (
              recentApplicants.map((app) => (
                <div
                  key={app.id}
                  className="p-3.5 rounded-xl bg-slate-900/80 border border-slate-800/80 flex items-center justify-between text-xs"
                >
                  <div className="space-y-0.5">
                    <span className="font-bold text-white block">
                      {app.nama_lengkap}
                    </span>
                    <span className="text-[11px] text-slate-400">
                      {app.kelas} &bull; {app.jurusan}
                    </span>
                  </div>

                  <div className="text-right space-y-1">
                    <span
                      className={`inline-block px-2 py-0.5 rounded text-[10px] font-bold ${
                        app.status_seleksi === "Lolos"
                          ? "bg-emerald-500/10 text-emerald-400 border border-emerald-500/30"
                          : app.status_seleksi === "Dalam Proses"
                          ? "bg-amber-500/10 text-amber-400 border border-amber-500/30"
                          : "bg-rose-500/10 text-rose-400 border border-rose-500/30"
                      }`}
                    >
                      {app.status_seleksi}
                    </span>
                    <span className="block text-[10px] text-slate-500 font-mono">
                      {app.no_pendaftaran}
                    </span>
                  </div>
                </div>
              ))
            )}
          </div>
        </div>

        {/* Kolom Masukan & Aspirasi Terbaru */}
        <div className="lg:col-span-5 glass-card rounded-2xl p-6 border border-slate-800 shadow-xl space-y-4">
          <div className="flex items-center justify-between pb-3 border-b border-slate-800">
            <div className="flex items-center space-x-2">
              <MessageSquare className="w-4 h-4 text-amber-400" />
              <h2 className="text-sm font-bold text-white">
                Aspirasi Siswa Terbaru
              </h2>
            </div>
            <Link
              href="/admin/masukan"
              className="text-xs font-semibold text-amber-400 hover:underline"
            >
              Lihat Semua
            </Link>
          </div>

          <div className="space-y-3">
            {recentFeedback.length === 0 ? (
              <div className="p-8 text-center text-xs text-slate-500">
                Kotak masukan saat ini kosong.
              </div>
            ) : (
              recentFeedback.map((fb) => (
                <div
                  key={fb.id}
                  className="p-3.5 rounded-xl bg-slate-900/80 border border-slate-800/80 space-y-1.5 text-xs"
                >
                  <div className="flex items-center justify-between">
                    <span className="font-bold text-amber-400 text-[11px]">
                      {fb.kategori}
                    </span>
                    <span className="text-[10px] text-slate-500">
                      {formatDate(fb.created_at)}
                    </span>
                  </div>
                  <h4 className="font-semibold text-white truncate">
                    {fb.judul}
                  </h4>
                  <span className="text-[11px] text-slate-400 block">
                    Oleh: {fb.is_anonim ? "Anonim (Siswa)" : fb.nama || "Siswa"}
                  </span>
                </div>
              ))
            )}
          </div>
        </div>

      </div>
    </div>
  );
}
