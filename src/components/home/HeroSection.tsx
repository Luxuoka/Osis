"use client";

import { useEffect, useState, useRef } from "react";
import Image from "next/image";
import Link from "next/link";
import { motion, useInView } from "framer-motion";
import {
  Sparkles,
  ArrowRight,
  UserCheck,
  ChevronDown,
  FileText,
  Camera,
} from "lucide-react";
import { SITE_IDENTITY } from "@/lib/constants";

interface HeroStats {
  departemen: string;
  pengurus: string;
  proker: string;
  periode: string;
}

interface HeroSectionProps {
  stats?: HeroStats;
}

function StatCounter({
  target,
  label,
  suffix = "",
}: {
  target: number;
  label: string;
  suffix?: string;
}) {
  const [count, setCount] = useState(0);
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-50px" });

  useEffect(() => {
    if (!isInView) return;

    let start = 0;
    const duration = 1500; // ms
    const increment = target / (duration / 25);
    const timer = setInterval(() => {
      start += increment;
      if (start >= target) {
        setCount(target);
        clearInterval(timer);
      } else {
        setCount(Math.floor(start));
      }
    }, 25);

    return () => clearInterval(timer);
  }, [isInView, target]);

  return (
    <div ref={ref} className="text-center px-2">
      <div className="text-3xl sm:text-4xl lg:text-5xl font-black text-[#1A56DB] tracking-tight flex items-center justify-center">
        <span>{count}</span>
        {suffix && <span className="text-[#1A56DB]">{suffix}</span>}
      </div>
      <p className="text-xs sm:text-sm font-semibold text-slate-500 mt-1 uppercase tracking-wider">
        {label}
      </p>
    </div>
  );
}

export function HeroSection({
  stats = {
    departemen: "9",
    pengurus: "64",
    proker: "12+",
    periode: "2024/2025",
  },
}: HeroSectionProps) {
  const deptNum = parseInt(stats.departemen, 10) || 9;
  const pengurusNum = parseInt(stats.pengurus, 10) || 64;
  const prokerNum = parseInt(stats.proker.replace(/\+/g, ""), 10) || 12;

  return (
    <section
      id="home"
      className="relative min-h-screen bg-white overflow-hidden flex flex-col justify-between pt-28 pb-12"
    >
      {/* ================= BACKGROUND ORGANIC SHAPES ================= */}
      {/* 1. Top Right Vibrant Red Organic Shape */}
      <div
        className="absolute top-0 right-0 w-[280px] sm:w-[460px] md:w-[540px] h-[280px] sm:h-[440px] md:h-[500px] bg-[#EE2D38] rounded-bl-[160px] sm:rounded-bl-[260px] pointer-events-none z-0 transition-transform duration-700"
        aria-hidden="true"
      />

      {/* 2. Middle Right Vibrant Blue Organic Shape */}
      <div
        className="absolute top-[36%] sm:top-[38%] right-0 w-[140px] sm:w-[220px] md:w-[260px] h-[200px] sm:h-[280px] md:h-[320px] bg-[#1A56DB] rounded-l-full pointer-events-none z-0"
        aria-hidden="true"
      />

      {/* 3. Left Middle Golden Yellow Organic Shape */}
      <div
        className="absolute top-[30%] sm:top-[32%] left-0 w-[180px] sm:w-[280px] md:w-[340px] h-[260px] sm:h-[380px] md:h-[440px] bg-[#FDB813] rounded-r-full pointer-events-none z-0"
        aria-hidden="true"
      />

      {/* ================= HERO CONTENT ================= */}
      <div className="relative z-10 max-w-4xl mx-auto px-4 sm:px-6 text-center flex-1 flex flex-col items-center justify-center">
        {/* Top Tag Badge */}
        <motion.div
          initial={{ opacity: 0, y: -15 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="inline-flex items-center space-x-2 px-4 py-1.5 rounded-full bg-blue-50/90 border border-blue-200/80 text-[#1A56DB] text-xs sm:text-sm font-semibold shadow-sm mb-4"
        >
          <Sparkles className="w-3.5 h-3.5 text-[#1A56DB]" />
          <span>Selamat datang di...</span>
        </motion.div>

        {/* H1 Heading */}
        <motion.h1
          initial={{ opacity: 0, y: 15 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.1 }}
          className="text-3xl sm:text-5xl md:text-6xl font-black text-slate-900 tracking-tight leading-[1.15] max-w-2xl"
        >
          Website Resmi <br />
          <span className="text-slate-900">{SITE_IDENTITY.NAMA_ORGANISASI}</span>
        </motion.h1>

        {/* Slogan */}
        <motion.p
          initial={{ opacity: 0, y: 15 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.2 }}
          className="text-base sm:text-lg text-slate-600 font-medium mt-3 max-w-xl"
        >
          {SITE_IDENTITY.SLOGAN}...
        </motion.p>

        {/* Action Buttons */}
        <motion.div
          initial={{ opacity: 0, y: 15 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.3 }}
          className="flex flex-wrap items-center justify-center gap-3 sm:gap-4 mt-6"
        >
          {/* Red Button: Jelajahi Program */}
          <a
            href="#departemen"
            className="px-6 py-2.5 sm:py-3 rounded-full font-semibold text-white bg-[#EE2D38] hover:bg-[#D6232D] shadow-md shadow-red-500/20 transition-all duration-200 hover:scale-[1.03] active:scale-[0.98] text-sm sm:text-base flex items-center space-x-1.5"
          >
            <span>Jelajahi Program</span>
          </a>

          {/* Blue Button: Daftar Seleksi */}
          <Link
            href="/daftarosis"
            className="px-6 py-2.5 sm:py-3 rounded-full font-semibold text-white bg-[#1A56DB] hover:bg-[#1442AB] shadow-md shadow-blue-500/20 transition-all duration-200 hover:scale-[1.03] active:scale-[0.98] text-sm sm:text-base flex items-center space-x-1.5"
          >
            <UserCheck className="w-4 h-4" />
            <span>Daftar Seleksi</span>
          </Link>

          {/* Dark Button: Dokumentasi */}
          <Link
            href="/news"
            className="px-6 py-2.5 sm:py-3 rounded-full font-semibold text-white bg-slate-900 hover:bg-slate-800 shadow-md transition-all duration-200 hover:scale-[1.03] active:scale-[0.98] text-sm sm:text-base flex items-center space-x-1.5"
          >
            <Camera className="w-4 h-4" />
            <span>Dokumentasi</span>
          </Link>
        </motion.div>

        {/* Group Photo Card */}
        <motion.div
          initial={{ opacity: 0, scale: 0.95 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.7, delay: 0.35 }}
          className="mt-8 sm:mt-10 w-full max-w-lg mx-auto"
        >
          <div className="bg-white rounded-3xl p-3 shadow-2xl border-4 border-white overflow-hidden relative">
            {/* School & OSIS mini badges */}
            <div className="flex items-center justify-center space-x-3 mb-2.5 pt-1">
              <div className="w-8 h-8 rounded-lg bg-blue-50 p-1 border border-blue-200 flex items-center justify-center">
                <Image
                  src="/osis-logo.jpeg"
                  alt="Logo OSIS"
                  width={28}
                  height={28}
                  className="w-full h-full object-contain"
                />
              </div>
              <div className="w-8 h-8 rounded-lg bg-slate-50 p-1 border border-slate-200 flex items-center justify-center">
                <Image
                  src="/logo-sekolah.jpeg"
                  alt="Logo Sekolah"
                  width={28}
                  height={28}
                  className="w-full h-full object-contain"
                />
              </div>
              <span className="text-xs font-bold text-slate-800 uppercase tracking-wider">
                {SITE_IDENTITY.NAMA_SEKOLAH}
              </span>
            </div>

            {/* Photo Thumbnail */}
            <div className="relative aspect-[16/10] sm:aspect-[16/9] rounded-2xl overflow-hidden shadow-inner">
              <Image
                src="https://images.unsplash.com/photo-1529156069898-49953e39b3ac?w=1000&auto=format&fit=crop&q=80"
                alt={`Pengurus ${SITE_IDENTITY.NAMA_ORGANISASI}`}
                fill
                priority
                className="object-cover hover:scale-105 transition-transform duration-700"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/40 via-transparent to-transparent pointer-events-none" />
            </div>
          </div>
        </motion.div>
      </div>

      {/* ================= STATS COUNTER BAR ================= */}
      <div className="relative z-10 max-w-5xl mx-auto px-4 sm:px-6 w-full mt-10 sm:mt-14">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.45 }}
          className="bg-white rounded-2xl py-6 px-4 shadow-sm border border-slate-100 grid grid-cols-2 md:grid-cols-4 gap-6 sm:gap-8 items-center"
        >
          <StatCounter target={deptNum} label="Departemen" />
          <StatCounter target={pengurusNum} label="Pengurus" />
          <StatCounter target={prokerNum} label="Program Kerja" suffix="+" />
          <div className="text-center px-2">
            <div className="text-3xl sm:text-4xl lg:text-5xl font-black text-[#1A56DB] tracking-tight">
              {stats.periode}
            </div>
            <p className="text-xs sm:text-sm font-semibold text-slate-500 mt-1 uppercase tracking-wider">
              Periode Aktif
            </p>
          </div>
        </motion.div>
      </div>

      {/* Scroll Down Indicator */}
      <div className="relative z-10 flex justify-center pt-6">
        <a
          href="#tentang"
          className="text-slate-400 hover:text-[#1A56DB] transition-colors animate-bounce p-2"
          aria-label="Gulir ke bagian tentang kami"
        >
          <ChevronDown className="w-5 h-5" />
        </a>
      </div>
    </section>
  );
}
