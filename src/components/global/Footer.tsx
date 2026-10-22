"use client";

import Link from "next/link";
import {
  Instagram,
  Mail,
  Phone,
  MapPin,
  Globe,
  Sparkles,
  Youtube,
  Send,
} from "lucide-react";
import { SITE_IDENTITY } from "@/lib/constants";

export function Footer() {
  return (
    <footer className="relative bg-[#1A56DB] text-white pt-16 pb-8 overflow-hidden">
      
      {/* ================= BACKGROUND ORGANIC BLOBS ================= */}
      {/* 1. Top Right Vibrant Red Wave Blob */}
      <div
        className="absolute top-0 right-0 w-[240px] sm:w-[360px] md:w-[420px] h-[200px] sm:h-[300px] md:h-[360px] bg-[#EE2D38] rounded-bl-[160px] sm:rounded-bl-[240px] pointer-events-none z-0"
        aria-hidden="true"
      />

      {/* 2. Bottom Left Golden Yellow Wave Blob */}
      <div
        className="absolute -bottom-10 left-0 w-[260px] sm:w-[380px] md:w-[460px] h-[120px] sm:h-[180px] bg-[#FDB813] rounded-tr-[120px] sm:rounded-tr-[180px] pointer-events-none z-0"
        aria-hidden="true"
      />

      <div className="max-w-6xl mx-auto px-4 sm:px-6 relative z-10">
        
        {/* Columns Grid */}
        <div className="grid grid-cols-1 md:grid-cols-12 gap-8 sm:gap-10 pb-12 border-b border-white/20">
          
          {/* Column 1: School / OSIS Identity */}
          <div className="md:col-span-5 space-y-4">
            <div className="flex items-center space-x-2">
              <Sparkles className="w-5 h-5 text-[#FDB813]" />
              <h3 className="text-xl sm:text-2xl font-black text-white tracking-tight">
                {SITE_IDENTITY.NAMA_ORGANISASI}
              </h3>
            </div>

            <p className="text-xs sm:text-sm text-blue-100 leading-relaxed max-w-sm">
              Satu-satunya wadah resmi organisasi siswa intra sekolah di {SITE_IDENTITY.NAMA_SEKOLAH}. Berdedikasi merajut aspirasi, kepemimpinan inovatif, dan karya nyata siswa.
            </p>

            {/* Social Icons (White round buttons) */}
            <div className="flex items-center space-x-3 pt-2">
              <a
                href={SITE_IDENTITY.INSTAGRAM}
                target="_blank"
                rel="noopener noreferrer"
                className="w-9 h-9 rounded-full bg-white/10 hover:bg-white hover:text-[#1A56DB] flex items-center justify-center transition-all duration-200 border border-white/20 text-white"
                aria-label="Instagram Resmi"
              >
                <Instagram className="w-4 h-4" />
              </a>
              <a
                href={`mailto:${SITE_IDENTITY.EMAIL}`}
                className="w-9 h-9 rounded-full bg-white/10 hover:bg-white hover:text-[#1A56DB] flex items-center justify-center transition-all duration-200 border border-white/20 text-white"
                aria-label="Email Resmi"
              >
                <Mail className="w-4 h-4" />
              </a>
              <a
                href={`https://${SITE_IDENTITY.DOMAIN}`}
                target="_blank"
                rel="noopener noreferrer"
                className="w-9 h-9 rounded-full bg-white/10 hover:bg-white hover:text-[#1A56DB] flex items-center justify-center transition-all duration-200 border border-white/20 text-white"
                aria-label="Website Sekolah"
              >
                <Globe className="w-4 h-4" />
              </a>
              <a
                href="https://youtube.com"
                target="_blank"
                rel="noopener noreferrer"
                className="w-9 h-9 rounded-full bg-white/10 hover:bg-white hover:text-[#1A56DB] flex items-center justify-center transition-all duration-200 border border-white/20 text-white"
                aria-label="YouTube OSIS"
              >
                <Youtube className="w-4 h-4" />
              </a>
            </div>
          </div>

          {/* Column 2: Quick Links */}
          <div className="md:col-span-3 space-y-3">
            <h4 className="text-sm font-extrabold uppercase tracking-wider text-white">
              Navigasi Cepat
            </h4>
            <ul className="space-y-2 text-xs sm:text-sm text-blue-100">
              <li>
                <Link href="/" className="hover:text-white hover:underline transition-colors">
                  Beranda
                </Link>
              </li>
              <li>
                <Link href="/#tentang" className="hover:text-white hover:underline transition-colors">
                  Tentang Kami
                </Link>
              </li>
              <li>
                <Link href="/#struktur" className="hover:text-white hover:underline transition-colors">
                  Struktur Organisasi
                </Link>
              </li>
              <li>
                <Link href="/#departemen" className="hover:text-white hover:underline transition-colors">
                  Departemen & Sekbid
                </Link>
              </li>
              <li>
                <Link href="/news" className="hover:text-white hover:underline transition-colors">
                  Dokumentasi & Berita
                </Link>
              </li>
              <li>
                <Link href="/#faq" className="hover:text-white hover:underline transition-colors">
                  Pusat Bantuan (FAQ)
                </Link>
              </li>
              <li>
                <Link href="/#kontak" className="hover:text-white hover:underline transition-colors">
                  Kontak / Masukan
                </Link>
              </li>
            </ul>
          </div>

          {/* Column 3: Contact Info */}
          <div className="md:col-span-4 space-y-3">
            <h4 className="text-sm font-extrabold uppercase tracking-wider text-white">
              Kontak Kami
            </h4>
            <ul className="space-y-2.5 text-xs sm:text-sm text-blue-100">
              <li className="flex items-start space-x-2.5">
                <MapPin className="w-4 h-4 text-white shrink-0 mt-0.5" />
                <span className="leading-relaxed">{SITE_IDENTITY.ALAMAT}</span>
              </li>
              <li className="flex items-center space-x-2.5">
                <Phone className="w-4 h-4 text-white shrink-0" />
                <span>{SITE_IDENTITY.TELEPON}</span>
              </li>
              <li className="flex items-center space-x-2.5">
                <Mail className="w-4 h-4 text-white shrink-0" />
                <span>{SITE_IDENTITY.EMAIL}</span>
              </li>
            </ul>
          </div>

        </div>

        {/* Bottom Bar with Yellow curve underneath */}
        <div className="pt-6 flex flex-col sm:flex-row items-center justify-between text-xs text-blue-100 gap-4">
          <p className="font-medium text-center sm:text-left z-10 text-slate-900 sm:text-white font-semibold sm:font-normal">
            {SITE_IDENTITY.NAMA_SEKOLAH} &bull; {SITE_IDENTITY.SLOGAN}
          </p>
          <p className="text-center sm:text-right z-10 text-white font-medium">
            &copy; 2024 {SITE_IDENTITY.NAMA_ORGANISASI}. Hak Cipta Dilindungi.
          </p>
        </div>

      </div>
    </footer>
  );
}
