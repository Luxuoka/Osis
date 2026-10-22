"use client";

import { useState } from "react";
import Image from "next/image";
import { motion, AnimatePresence } from "framer-motion";
import { Play, X, Sparkles, Volume2, Maximize2 } from "lucide-react";
import { SITE_IDENTITY } from "@/lib/constants";

export function AboutSection() {
  const [isVideoOpen, setIsVideoOpen] = useState(false);

  return (
    <section id="tentang" className="relative py-16 sm:py-24 bg-white overflow-hidden">
      <div className="max-w-5xl mx-auto px-4 sm:px-6 relative z-10">
        
        {/* Section Heading */}
        <div className="text-center space-y-3 mb-10 sm:mb-12">
          <div className="inline-flex items-center space-x-2 px-3.5 py-1 rounded-full bg-blue-50 border border-blue-200/80 text-[#1A56DB] text-xs font-semibold uppercase tracking-wider">
            <Sparkles className="w-3.5 h-3.5" />
            <span>Tentang Kami</span>
          </div>

          <h2 className="text-2xl sm:text-4xl md:text-5xl font-black text-slate-900 tracking-tight leading-tight">
            Mengenal Lebih Dekat{" "}
            <span className="text-[#1A56DB]">OSIS</span>{" "}
            <span className="text-[#EE2D38]">{SITE_IDENTITY.NAMA_SEKOLAH}</span>
          </h2>
        </div>

        {/* Colorful Framing Container */}
        <div className="relative rounded-[2rem] sm:rounded-[2.5rem] p-5 sm:p-8 md:p-10 shadow-xl overflow-hidden bg-[#FDB813]">
          
          {/* Background Decorative Shapes inside container */}
          {/* Blue shape on bottom-left */}
          <div
            className="absolute -bottom-10 -left-10 w-48 sm:w-72 h-48 sm:h-72 bg-[#1A56DB] rounded-full pointer-events-none"
            aria-hidden="true"
          />
          {/* Red shape on middle-left / bottom-left */}
          <div
            className="absolute top-1/2 -left-12 w-40 sm:w-56 h-40 sm:h-56 bg-[#EE2D38] rounded-full pointer-events-none"
            aria-hidden="true"
          />

          <div className="relative z-10 space-y-6">
            
            {/* White Rounded Text Card */}
            <div className="bg-white rounded-2xl p-6 sm:p-8 shadow-sm space-y-4 text-slate-700 text-sm sm:text-base leading-relaxed">
              <p>
                Organisasi Siswa Intra Sekolah (OSIS) merupakan satu-satunya wadah organisasi resmi bagi seluruh peserta didik di lingkungan <strong>{SITE_IDENTITY.NAMA_SEKOLAH}</strong> yang menjadi motor penggerak perwujudan visi, misi, dan kreasi siswa. Melalui barisan program kerja yang inovatif, kreatif, dan berdampak positif, OSIS hadir merajut aspirasi siswa menjadi karya nyata.
              </p>
              <p>
                Sebagai garda terdepan kepemimpinan pelajar, OSIS senantiasa menjunjung tinggi nilai integritas, persaudaraan, dan semangat juang <em>&ldquo;{SITE_IDENTITY.SLOGAN}&rdquo;</em>. Melalui sinergi erat antara seluruh civitas akademika, kami berkomitmen mencetak generasi pemimpin masa depan yang berkarakter kuat, berwawasan luas, dan berdaya saing global.
              </p>
            </div>

            {/* Video Player Preview Card */}
            <div
              onClick={() => setIsVideoOpen(true)}
              className="relative max-w-2xl mx-auto aspect-[16/9] rounded-2xl bg-slate-800 border-2 border-white/60 shadow-lg overflow-hidden group cursor-pointer flex flex-col justify-between p-4"
            >
              {/* Video Thumbnail Background */}
              <div className="absolute inset-0">
                <Image
                  src="https://images.unsplash.com/photo-1523240795612-9a054b0db644?w=1000&auto=format&fit=crop&q=80"
                  alt={`Video Profil ${SITE_IDENTITY.NAMA_ORGANISASI}`}
                  fill
                  className="object-cover opacity-60 group-hover:scale-105 group-hover:opacity-75 transition-all duration-500"
                />
                <div className="absolute inset-0 bg-slate-900/40" />
              </div>

              {/* Top Watermark / Badge */}
              <div className="relative z-10 flex items-center justify-between text-xs text-white/90">
                <span className="font-semibold bg-black/40 px-3 py-1 rounded-full backdrop-blur-sm">
                  Profil Resmi OSIS
                </span>
                <span className="text-white/80">{SITE_IDENTITY.NAMA_SEKOLAH}</span>
              </div>

              {/* Large Circular Red Play Button in Center */}
              <div className="relative z-10 flex items-center justify-center my-auto">
                <div className="w-14 h-14 sm:w-16 sm:h-16 rounded-full bg-[#EE2D38] text-white flex items-center justify-center shadow-2xl group-hover:scale-110 transition-transform duration-300">
                  <Play className="w-6 h-6 sm:w-7 sm:h-7 fill-white ml-1" />
                </div>
              </div>

              {/* Bottom Media Player Bar */}
              <div className="relative z-10 bg-black/60 backdrop-blur-md rounded-xl px-4 py-2 flex items-center justify-between text-xs text-white">
                <div className="flex items-center space-x-2">
                  <Play className="w-3.5 h-3.5 fill-white" />
                  <span>0:00 / 02:45</span>
                </div>
                <div className="flex items-center space-x-3">
                  <Volume2 className="w-4 h-4 text-white/80" />
                  <Maximize2 className="w-4 h-4 text-white/80" />
                </div>
              </div>
            </div>

          </div>
        </div>

      </div>

      {/* Video Modal Popup */}
      <AnimatePresence>
        {isVideoOpen && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-50 bg-black/80 backdrop-blur-sm flex items-center justify-center p-4"
            onClick={() => setIsVideoOpen(false)}
          >
            <motion.div
              initial={{ scale: 0.9, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.9, opacity: 0 }}
              className="relative w-full max-w-4xl bg-black rounded-2xl overflow-hidden shadow-2xl border border-slate-700"
              onClick={(e) => e.stopPropagation()}
            >
              <button
                type="button"
                onClick={() => setIsVideoOpen(false)}
                className="absolute top-4 right-4 z-20 w-10 h-10 rounded-full bg-slate-900/80 text-white flex items-center justify-center hover:bg-red-600 transition-colors"
                aria-label="Tutup video"
              >
                <X className="w-5 h-5" />
              </button>

              <div className="relative aspect-video w-full bg-black">
                <iframe
                  className="w-full h-full"
                  src="https://www.youtube.com/embed/dQw4w9WgXcQ?autoplay=1"
                  title={`Profil ${SITE_IDENTITY.NAMA_ORGANISASI}`}
                  allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                  allowFullScreen
                />
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </section>
  );
}
