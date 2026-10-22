"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import Image from "next/image";
import { usePathname } from "next/navigation";
import { motion, AnimatePresence } from "framer-motion";
import {
  Menu,
  X,
  ChevronDown,
  UserCheck,
  ShieldCheck,
  Newspaper,
  ExternalLink,
  MessageSquare,
  Users,
  FileText,
  HelpCircle,
  Sparkles,
} from "lucide-react";
import { SITE_IDENTITY } from "@/lib/constants";

export function Navbar() {
  const [isScrolled, setIsScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [profilOpen, setProfilOpen] = useState(false);
  const [layananOpen, setLayananOpen] = useState(false);
  const pathname = usePathname();

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 20);
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  // Tutup menu saat rute berubah
  useEffect(() => {
    setMobileMenuOpen(false);
    setProfilOpen(false);
    setLayananOpen(false);
  }, [pathname]);

  return (
    <header
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
        isScrolled
          ? "glass-nav-light py-3 shadow-md"
          : "bg-white/90 backdrop-blur-md py-4 border-b border-slate-100"
      }`}
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between">
          {/* Logo & Organisasi */}
          <Link
            href="/"
            className="flex items-center space-x-3 group transition-transform duration-200 hover:scale-[1.02]"
          >
            <div className="relative w-10 h-10 md:w-11 md:h-11 rounded-xl bg-white p-1.5 shadow-sm border border-slate-200 flex items-center justify-center overflow-hidden">
              <Image
                src="/osis-logo.jpeg"
                alt="Logo OSIS"
                width={36}
                height={36}
                className="w-full h-full object-contain"
              />
            </div>
            <div>
              <span className="block text-base md:text-lg font-bold text-slate-900 tracking-tight group-hover:text-[#1A56DB] transition-colors">
                {SITE_IDENTITY.NAMA_ORGANISASI}
              </span>
              <span className="block text-[11px] font-semibold text-slate-500 -mt-0.5 tracking-wider uppercase">
                {SITE_IDENTITY.NAMA_JULUKAN_SEKOLAH}
              </span>
            </div>
          </Link>

          {/* Desktop Nav Items */}
          <nav className="hidden lg:flex items-center space-x-1 xl:space-x-2">
            <Link
              href="/"
              className={`px-3.5 py-2 rounded-full text-sm font-semibold transition-colors ${
                pathname === "/"
                  ? "text-[#1A56DB] bg-blue-50"
                  : "text-slate-700 hover:text-[#1A56DB] hover:bg-slate-50"
              }`}
            >
              Beranda
            </Link>

            {/* Dropdown Profil */}
            <div
              className="relative"
              onMouseEnter={() => setProfilOpen(true)}
              onMouseLeave={() => setProfilOpen(false)}
            >
              <button
                type="button"
                className="flex items-center space-x-1.5 px-3.5 py-2 rounded-full text-sm font-semibold text-slate-700 hover:text-[#1A56DB] hover:bg-slate-50 transition-colors"
              >
                <span>Profil</span>
                <ChevronDown
                  className={`w-4 h-4 transition-transform duration-200 ${
                    profilOpen ? "rotate-180 text-[#1A56DB]" : ""
                  }`}
                />
              </button>

              <AnimatePresence>
                {profilOpen && (
                  <motion.div
                    initial={{ opacity: 0, y: 10, scale: 0.95 }}
                    animate={{ opacity: 1, y: 0, scale: 1 }}
                    exit={{ opacity: 0, y: 10, scale: 0.95 }}
                    transition={{ duration: 0.15 }}
                    className="absolute top-full left-0 w-60 pt-2"
                  >
                    <div className="bg-white rounded-2xl p-2 shadow-xl border border-slate-100">
                      <Link
                        href="/#tentang"
                        className="flex items-center space-x-3 px-3 py-2.5 rounded-xl text-sm text-slate-700 hover:text-[#1A56DB] hover:bg-blue-50/70 transition-colors"
                      >
                        <Sparkles className="w-4 h-4 text-[#1A56DB]" />
                        <div>
                          <div className="font-semibold text-slate-900 text-xs">Tentang Kami</div>
                          <div className="text-[11px] text-slate-500">Mengenal lebih dekat OSIS</div>
                        </div>
                      </Link>
                      <Link
                        href="/#struktur"
                        className="flex items-center space-x-3 px-3 py-2.5 rounded-xl text-sm text-slate-700 hover:text-[#1A56DB] hover:bg-blue-50/70 transition-colors mt-1"
                      >
                        <Users className="w-4 h-4 text-[#EE2D38]" />
                        <div>
                          <div className="font-semibold text-slate-900 text-xs">Profil Organisasi</div>
                          <div className="text-[11px] text-slate-500">Tim inti & pengurus</div>
                        </div>
                      </Link>
                      <Link
                        href="/#departemen"
                        className="flex items-center space-x-3 px-3 py-2.5 rounded-xl text-sm text-slate-700 hover:text-[#1A56DB] hover:bg-blue-50/70 transition-colors mt-1"
                      >
                        <FileText className="w-4 h-4 text-[#FDB813]" />
                        <div>
                          <div className="font-semibold text-slate-900 text-xs">Departemen & Sekbid</div>
                          <div className="text-[11px] text-slate-500">9 divisi program kerja</div>
                        </div>
                      </Link>
                    </div>
                  </motion.div>
                )}
              </AnimatePresence>
            </div>

            {/* Dropdown Layanan */}
            <div
              className="relative"
              onMouseEnter={() => setLayananOpen(true)}
              onMouseLeave={() => setLayananOpen(false)}
            >
              <button
                type="button"
                className="flex items-center space-x-1.5 px-3.5 py-2 rounded-full text-sm font-semibold text-slate-700 hover:text-[#1A56DB] hover:bg-slate-50 transition-colors"
              >
                <span>Layanan</span>
                <ChevronDown
                  className={`w-4 h-4 transition-transform duration-200 ${
                    layananOpen ? "rotate-180 text-[#1A56DB]" : ""
                  }`}
                />
              </button>

              <AnimatePresence>
                {layananOpen && (
                  <motion.div
                    initial={{ opacity: 0, y: 10, scale: 0.95 }}
                    animate={{ opacity: 1, y: 0, scale: 1 }}
                    exit={{ opacity: 0, y: 10, scale: 0.95 }}
                    transition={{ duration: 0.15 }}
                    className="absolute top-full left-0 w-64 pt-2"
                  >
                    <div className="bg-white rounded-2xl p-2 shadow-xl border border-slate-100">
                      <Link
                        href="/daftarosis"
                        className="flex items-center space-x-3 px-3 py-2.5 rounded-xl text-sm text-slate-700 hover:text-[#1A56DB] hover:bg-blue-50/70 transition-colors"
                      >
                        <UserCheck className="w-4 h-4 text-[#1A56DB]" />
                        <div>
                          <div className="font-semibold text-slate-900 text-xs">Pendaftaran OSIS</div>
                          <div className="text-[11px] text-slate-500">Formulir calon pengurus</div>
                        </div>
                      </Link>
                      <Link
                        href="/hasilseleksi"
                        className="flex items-center space-x-3 px-3 py-2.5 rounded-xl text-sm text-slate-700 hover:text-[#1A56DB] hover:bg-blue-50/70 transition-colors mt-1"
                      >
                        <ShieldCheck className="w-4 h-4 text-emerald-500" />
                        <div>
                          <div className="font-semibold text-slate-900 text-xs">Cek Hasil Seleksi</div>
                          <div className="text-[11px] text-slate-500">Pengumuman kelulusan calon OSIS</div>
                        </div>
                      </Link>
                      <Link
                        href="/news"
                        className="flex items-center space-x-3 px-3 py-2.5 rounded-xl text-sm text-slate-700 hover:text-[#1A56DB] hover:bg-blue-50/70 transition-colors mt-1"
                      >
                        <Newspaper className="w-4 h-4 text-[#EE2D38]" />
                        <div>
                          <div className="font-semibold text-slate-900 text-xs">Berita & Dokumentasi</div>
                          <div className="text-[11px] text-slate-500">Kabar kegiatan terkini</div>
                        </div>
                      </Link>
                      <Link
                        href="/masukan"
                        className="flex items-center space-x-3 px-3 py-2.5 rounded-xl text-sm text-slate-700 hover:text-[#1A56DB] hover:bg-blue-50/70 transition-colors mt-1"
                      >
                        <MessageSquare className="w-4 h-4 text-[#FDB813]" />
                        <div>
                          <div className="font-semibold text-slate-900 text-xs">Kotak Masukan</div>
                          <div className="text-[11px] text-slate-500">Suarakan ide, kritik & saran</div>
                        </div>
                      </Link>
                    </div>
                  </motion.div>
                )}
              </AnimatePresence>
            </div>

            <Link
              href="/#faq"
              className="px-3.5 py-2 rounded-full text-sm font-semibold text-slate-700 hover:text-[#1A56DB] hover:bg-slate-50 transition-colors"
            >
              Bantuan
            </Link>

            <Link
              href="/#kontak"
              className="px-3.5 py-2 rounded-full text-sm font-semibold text-slate-700 hover:text-[#1A56DB] hover:bg-slate-50 transition-colors"
            >
              Kontak
            </Link>
          </nav>

          {/* CTA & Mobile Hamburger */}
          <div className="flex items-center space-x-3">
            <Link
              href="/daftarosis"
              className="hidden sm:inline-flex items-center space-x-2 px-5 py-2.5 rounded-full text-sm font-semibold text-white bg-[#1A56DB] hover:bg-[#1442AB] shadow-md shadow-blue-500/20 transition-all duration-200 hover:scale-[1.03] active:scale-[0.98]"
            >
              <span>Daftar Seleksi</span>
            </Link>

            {/* Mobile menu trigger */}
            <button
              type="button"
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              className="lg:hidden p-2 rounded-xl text-slate-700 hover:text-slate-900 hover:bg-slate-100 transition-colors focus:outline-none"
              aria-label="Buka menu navigasi"
            >
              {mobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
            </button>
          </div>
        </div>
      </div>

      {/* Mobile Menu Drawer */}
      <AnimatePresence>
        {mobileMenuOpen && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: "auto" }}
            exit={{ opacity: 0, height: 0 }}
            transition={{ duration: 0.25 }}
            className="lg:hidden bg-white border-t border-slate-200 mt-2 px-4 pt-3 pb-6 max-h-[85vh] overflow-y-auto shadow-xl"
          >
            <div className="flex flex-col space-y-1">
              <Link
                href="/"
                className="px-3 py-2.5 rounded-xl text-sm font-semibold text-slate-900 hover:bg-blue-50"
              >
                Beranda
              </Link>

              {/* Sub-group Profil */}
              <div className="pt-2 pb-1">
                <span className="px-3 text-xs font-bold text-[#1A56DB] uppercase tracking-wider">
                  Profil Organisasi
                </span>
                <div className="mt-1 flex flex-col space-y-0.5">
                  <Link
                    href="/#tentang"
                    className="flex items-center space-x-2.5 px-3 py-2 rounded-xl text-sm text-slate-700 hover:bg-slate-100"
                  >
                    <Sparkles className="w-4 h-4 text-[#1A56DB]" />
                    <span>Tentang Kami</span>
                  </Link>
                  <Link
                    href="/#struktur"
                    className="flex items-center space-x-2.5 px-3 py-2 rounded-xl text-sm text-slate-700 hover:bg-slate-100"
                  >
                    <Users className="w-4 h-4 text-[#EE2D38]" />
                    <span>Struktur Organisasi</span>
                  </Link>
                  <Link
                    href="/#departemen"
                    className="flex items-center space-x-2.5 px-3 py-2 rounded-xl text-sm text-slate-700 hover:bg-slate-100"
                  >
                    <FileText className="w-4 h-4 text-[#FDB813]" />
                    <span>Departemen & Sekbid</span>
                  </Link>
                </div>
              </div>

              {/* Sub-group Layanan */}
              <div className="pt-2 pb-1">
                <span className="px-3 text-xs font-bold text-[#EE2D38] uppercase tracking-wider">
                  Layanan & Informasi
                </span>
                <div className="mt-1 flex flex-col space-y-0.5">
                  <Link
                    href="/daftarosis"
                    className="flex items-center space-x-2.5 px-3 py-2 rounded-xl text-sm text-slate-700 hover:bg-slate-100"
                  >
                    <UserCheck className="w-4 h-4 text-[#1A56DB]" />
                    <span>Pendaftaran OSIS</span>
                  </Link>
                  <Link
                    href="/hasilseleksi"
                    className="flex items-center space-x-2.5 px-3 py-2 rounded-xl text-sm text-slate-700 hover:bg-slate-100"
                  >
                    <ShieldCheck className="w-4 h-4 text-emerald-500" />
                    <span>Cek Hasil Seleksi</span>
                  </Link>
                  <Link
                    href="/news"
                    className="flex items-center space-x-2.5 px-3 py-2 rounded-xl text-sm text-slate-700 hover:bg-slate-100"
                  >
                    <Newspaper className="w-4 h-4 text-[#EE2D38]" />
                    <span>Berita & Dokumentasi</span>
                  </Link>
                  <Link
                    href="/masukan"
                    className="flex items-center space-x-2.5 px-3 py-2 rounded-xl text-sm text-slate-700 hover:bg-slate-100"
                  >
                    <MessageSquare className="w-4 h-4 text-[#FDB813]" />
                    <span>Kotak Masukan</span>
                  </Link>
                </div>
              </div>

              <Link
                href="/#faq"
                className="px-3 py-2.5 rounded-xl text-sm font-semibold text-slate-800 hover:bg-slate-100"
              >
                Bantuan (FAQ)
              </Link>
              <Link
                href="/#kontak"
                className="px-3 py-2.5 rounded-xl text-sm font-semibold text-slate-800 hover:bg-slate-100"
              >
                Kontak Kami
              </Link>

              <div className="pt-3">
                <Link
                  href="/daftarosis"
                  className="w-full flex items-center justify-center space-x-2 px-4 py-2.5 rounded-full text-sm font-bold text-white bg-[#1A56DB] shadow-md"
                >
                  <span>Daftar Seleksi Sekarang</span>
                </Link>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </header>
  );
}
