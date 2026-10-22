"use client";

import { useState } from "react";
import Image from "next/image";
import { Download, Sparkles, Image as ImageIcon, Filter, Check } from "lucide-react";
import { SITE_IDENTITY } from "@/lib/constants";

interface LogoItem {
  id: string;
  judul: string;
  kategori: "sekolah" | "osis" | "jurusan" | "ekstrakurikuler";
  file_url: string;
  format: string;
  resolusi: string;
}

export default function LogosPage() {
  const [selectedKategori, setSelectedKategori] = useState<string>("semua");
  const [downloadingId, setDownloadingId] = useState<string | null>(null);

  const defaultLogos: LogoItem[] = [
    {
      id: "1",
      judul: "Logo Resmi OSIS SMA Santa Maria 1 Bandung",
      kategori: "osis",
      file_url: "/osis-logo.jpeg",
      format: "JPEG / High Resolution",
      resolusi: "800 x 800 (HD)",
    },
    {
      id: "2",
      judul: "Logo Resmi SMA Santa Maria 1 Bandung",
      kategori: "sekolah",
      file_url: "/logo-sekolah.jpeg",
      format: "JPEG / High Resolution",
      resolusi: "1200 x 1200 (UHD)",
    },
    {
      id: "3",
      judul: "Emblem Peminatan MIPA (Matematika & Sains)",
      kategori: "jurusan",
      file_url: "/osis-logo.jpeg",
      format: "JPEG",
      resolusi: "1000 x 1000",
    },
    {
      id: "4",
      judul: "Emblem Peminatan IPS (Ilmu Sosial & Humaniora)",
      kategori: "jurusan",
      file_url: "/logo-sekolah.jpeg",
      format: "JPEG",
      resolusi: "1000 x 1000",
    },
    {
      id: "5",
      judul: "Emblem Peminatan Bahasa & Budaya",
      kategori: "jurusan",
      file_url: "/osis-logo.jpeg",
      format: "JPEG",
      resolusi: "1000 x 1000",
    },
    {
      id: "6",
      judul: "Badge Ekstrakurikuler Paduan Suara Santa Maria",
      kategori: "ekstrakurikuler",
      file_url: "/logo-sekolah.jpeg",
      format: "JPEG",
      resolusi: "800 x 800",
    },
    {
      id: "7",
      judul: "Badge Ekstrakurikuler Jurnalistik & Media Sanmar",
      kategori: "ekstrakurikuler",
      file_url: "/osis-logo.jpeg",
      format: "JPEG",
      resolusi: "800 x 800",
    },
    {
      id: "8",
      judul: "Badge Ekstrakurikuler Paskibra Santa Maria 1",
      kategori: "ekstrakurikuler",
      file_url: "/logo-sekolah.jpeg",
      format: "JPEG",
      resolusi: "800 x 800",
    },
  ];

  const filteredLogos =
    selectedKategori === "semua"
      ? defaultLogos
      : defaultLogos.filter((logo) => logo.kategori === selectedKategori);

  const handleDownload = (logo: LogoItem) => {
    setDownloadingId(logo.id);
    const link = document.createElement("a");
    link.href = logo.file_url;
    link.download = `${logo.judul.toLowerCase().replace(/\s+/g, "-")}.png`;
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);

    setTimeout(() => {
      setDownloadingId(null);
    }, 1500);
  };

  const categories = [
    { label: "Semua Aset", value: "semua" },
    { label: "Sekolah", value: "sekolah" },
    { label: "OSIS", value: "osis" },
    { label: "Jurusan", value: "jurusan" },
    { label: "Ekstrakurikuler", value: "ekstrakurikuler" },
  ];

  return (
    <div className="relative min-h-screen pt-28 pb-20 bg-brand-dark overflow-hidden">
      {/* Background Lighting */}
      <div className="absolute top-0 right-1/4 w-[600px] h-[500px] bg-amber-500/10 rounded-full blur-[140px] pointer-events-none" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        
        {/* Header */}
        <div className="text-center space-y-3 mb-12">
          <div className="inline-flex items-center space-x-2 px-3.5 py-1.5 rounded-full bg-amber-500/10 border border-amber-500/20 text-amber-400 text-xs font-semibold uppercase tracking-wider">
            <Sparkles className="w-3.5 h-3.5" />
            <span>Pusat Unduhan Aset Resmi</span>
          </div>

          <h1 className="text-3xl sm:text-4xl lg:text-5xl font-black text-white tracking-tight">
            Galeri Logo & Identitas Visual
          </h1>

          <p className="text-sm sm:text-base text-slate-400 max-w-2xl mx-auto">
            Unduh aset grafis resmi {SITE_IDENTITY.NAMA_ORGANISASI} dan {SITE_IDENTITY.NAMA_SEKOLAH} beresolusi tinggi dengan latar belakang transparan untuk kebutuhan publikasi dan dokumen.
          </p>
        </div>

        {/* Category Filters */}
        <div className="flex flex-wrap items-center justify-center gap-2 mb-10">
          {categories.map((cat) => (
            <button
              key={cat.value}
              type="button"
              onClick={() => setSelectedKategori(cat.value)}
              className={`px-4 py-2 rounded-xl text-xs sm:text-sm font-bold transition-all ${
                selectedKategori === cat.value
                  ? "bg-gradient-to-r from-amber-400 to-amber-500 text-slate-950 shadow-lg shadow-amber-500/20"
                  : "bg-slate-900 border border-slate-800 text-slate-400 hover:text-white"
              }`}
            >
              {cat.label}
            </button>
          ))}
        </div>

        {/* Grid Kartu Logo */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {filteredLogos.map((logo) => (
            <div
              key={logo.id}
              className="glass-card rounded-2xl p-6 border border-slate-800 hover:border-amber-500/40 transition-all duration-300 hover:scale-[1.02] flex flex-col justify-between group shadow-xl"
            >
              <div>
                {/* Preview Frame */}
                <div className="relative aspect-square w-full rounded-xl bg-slate-950/80 p-6 border border-slate-800/80 flex items-center justify-center mb-4 group-hover:border-amber-500/30 transition-colors">
                  <div className="relative w-full h-full flex items-center justify-center">
                    <Image
                      src={logo.file_url}
                      alt={logo.judul}
                      width={160}
                      height={160}
                      className="max-h-full max-w-full object-contain group-hover:scale-110 transition-transform duration-300"
                    />
                  </div>

                  <span className="absolute top-2.5 right-2.5 text-[10px] uppercase font-bold px-2 py-0.5 rounded bg-slate-900/90 text-amber-400 border border-slate-700">
                    {logo.kategori}
                  </span>
                </div>

                {/* Info */}
                <div className="space-y-1.5">
                  <h3 className="text-sm font-bold text-white group-hover:text-amber-400 transition-colors leading-snug">
                    {logo.judul}
                  </h3>
                  
                  <div className="flex items-center justify-between text-[11px] text-slate-500 pt-1">
                    <span>Format: {logo.format}</span>
                    <span className="font-mono text-slate-400">{logo.resolusi}</span>
                  </div>
                </div>
              </div>

              {/* Tombol Unduh */}
              <div className="pt-4 mt-4 border-t border-slate-800/80">
                <button
                  type="button"
                  onClick={() => handleDownload(logo)}
                  className="w-full py-2.5 rounded-xl bg-slate-900 hover:bg-amber-400 text-slate-200 hover:text-slate-950 border border-slate-700 hover:border-amber-400 text-xs font-bold transition-all flex items-center justify-center space-x-1.5"
                >
                  {downloadingId === logo.id ? (
                    <>
                      <Check className="w-3.5 h-3.5 text-emerald-500" />
                      <span>Mengunduh...</span>
                    </>
                  ) : (
                    <>
                      <Download className="w-3.5 h-3.5" />
                      <span>Unduh Logo (PNG)</span>
                    </>
                  )}
                </button>
              </div>
            </div>
          ))}
        </div>

      </div>
    </div>
  );
}
