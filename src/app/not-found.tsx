import Link from "next/link";
import { Compass, Home, ArrowLeft } from "lucide-react";
import { SITE_IDENTITY } from "@/lib/constants";

export default function NotFound() {
  return (
    <div className="min-h-screen flex items-center justify-center px-4 bg-brand-dark relative overflow-hidden">
      {/* Decorative Lights */}
      <div className="absolute top-1/3 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[500px] h-[500px] bg-blue-600/10 rounded-full blur-[140px] pointer-events-none" />

      <div className="relative z-10 max-w-lg text-center space-y-6 glass-card p-10 rounded-3xl border border-slate-800 shadow-2xl">
        <div className="w-20 h-20 rounded-3xl bg-amber-500/10 border border-amber-500/30 flex items-center justify-center text-amber-400 mx-auto">
          <Compass className="w-10 h-10 animate-spin-slow" />
        </div>

        <div className="space-y-2">
          <span className="text-5xl font-black text-amber-400 font-mono tracking-widest block">
            404
          </span>
          <h1 className="text-2xl font-black text-white">
            Halaman Tidak Ditemukan
          </h1>
          <p className="text-xs sm:text-sm text-slate-400 leading-relaxed">
            Halaman yang Anda tuju mungkin telah dipindahkan, dihapus, atau tautan yang dimasukkan salah.
          </p>
        </div>

        <div className="pt-2 flex flex-col sm:flex-row items-center justify-center gap-3">
          <Link
            href="/"
            className="w-full sm:w-auto px-6 py-3 rounded-xl font-bold text-slate-950 bg-gradient-to-r from-amber-400 to-amber-500 hover:from-amber-300 hover:to-amber-400 text-xs shadow-lg shadow-amber-500/20 transition-all flex items-center justify-center space-x-2"
          >
            <Home className="w-4 h-4" />
            <span>Kembali ke Beranda</span>
          </Link>
          <Link
            href="/#faq"
            className="w-full sm:w-auto px-5 py-3 rounded-xl font-semibold text-slate-300 bg-slate-900 border border-slate-700 text-xs hover:text-white transition-all flex items-center justify-center space-x-2"
          >
            <span>Pusat Bantuan</span>
          </Link>
        </div>
      </div>
    </div>
  );
}
