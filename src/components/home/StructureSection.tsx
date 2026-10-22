"use client";

import { useState } from "react";
import Image from "next/image";
import { motion } from "framer-motion";
import { ChevronLeft, ChevronRight, Sparkles } from "lucide-react";

export interface PengurusItem {
  id?: string;
  nama: string;
  jabatan: string;
  tipe: "inti" | "departemen";
  departemen_id?: string | null;
  departemen_nama?: string | null;
  foto_url?: string | null;
  urutan: number;
  instagram?: string | null;
}

export interface DepartemenItem {
  id: string;
  nama: string;
  singkatan?: string | null;
  deskripsi?: string | null;
  urutan: number;
}

interface StructureSectionProps {
  pengurusList?: PengurusItem[];
  departemenList?: DepartemenItem[];
}

export function StructureSection({
  pengurusList = [],
}: StructureSectionProps) {
  // Default 7 pengurus inti matching the 4 + 3 layout in the mockup
  const defaultInti: PengurusItem[] = [
    {
      nama: "Arya Satria Pratama",
      jabatan: "Ketua Umum",
      tipe: "inti",
      foto_url: "https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=500&auto=format&fit=crop&q=80",
      urutan: 1,
    },
    {
      nama: "Nadia Clarissa Putri",
      jabatan: "Ketua 1",
      tipe: "inti",
      foto_url: "https://images.unsplash.com/photo-1517841905240-472988babdf9?w=500&auto=format&fit=crop&q=80",
      urutan: 2,
    },
    {
      nama: "Bima Wicaksono",
      jabatan: "Ketua 2",
      tipe: "inti",
      foto_url: "https://images.unsplash.com/photo-1539571696357-5a69c17a67c6?w=500&auto=format&fit=crop&q=80",
      urutan: 3,
    },
    {
      nama: "Zahra Aulia Rahmadani",
      jabatan: "Sekretaris 1",
      tipe: "inti",
      foto_url: "https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=500&auto=format&fit=crop&q=80",
      urutan: 4,
    },
    {
      nama: "Farel Akbar Hidayat",
      jabatan: "Sekretaris 2",
      tipe: "inti",
      foto_url: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=500&auto=format&fit=crop&q=80",
      urutan: 5,
    },
    {
      nama: "Cinta Laura Maharani",
      jabatan: "Bendahara 1",
      tipe: "inti",
      foto_url: "https://images.unsplash.com/photo-1524504388940-b1c1722653e1?w=500&auto=format&fit=crop&q=80",
      urutan: 6,
    },
    {
      nama: "Dimas Rizky Ananta",
      jabatan: "Bendahara 2",
      tipe: "inti",
      foto_url: "https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=500&auto=format&fit=crop&q=80",
      urutan: 7,
    },
  ];

  const intiMembers = pengurusList.filter((p) => p.tipe === "inti");
  const members = intiMembers.length >= 7 ? intiMembers : defaultInti;

  const topRow = members.slice(0, 4);
  const bottomRow = members.slice(4, 7);

  return (
    <section id="struktur" className="relative py-16 sm:py-24 bg-white overflow-hidden">
      <div className="max-w-5xl mx-auto px-4 sm:px-6 relative z-10">
        
        {/* Section Heading */}
        <div className="text-center space-y-2 mb-10 sm:mb-12">
          <div className="inline-flex items-center space-x-2 px-3.5 py-1 rounded-full bg-red-50 border border-red-200/80 text-[#EE2D38] text-xs font-semibold uppercase tracking-wider">
            <Sparkles className="w-3.5 h-3.5" />
            <span>Struktur Organisasi</span>
          </div>

          <h2 className="text-2xl sm:text-4xl md:text-5xl font-black text-slate-900 tracking-tight">
            Profil Organisasi
          </h2>
          {/* Small red accent underline */}
          <div className="w-12 h-1 bg-[#EE2D38] rounded-full mx-auto mt-2" />
        </div>

        {/* Colorful Framing Container */}
        <div className="relative rounded-[2rem] sm:rounded-[2.5rem] p-5 sm:p-8 md:p-10 shadow-xl overflow-hidden bg-[#EE2D38]">
          
          {/* Background shapes: Blue on left, Yellow patch on bottom-right */}
          <div
            className="absolute top-0 -left-12 w-64 sm:w-96 h-full bg-[#1A56DB] rounded-r-3xl pointer-events-none"
            aria-hidden="true"
          />
          <div
            className="absolute -bottom-10 -right-10 w-44 sm:w-60 h-44 sm:h-60 bg-[#FDB813] rounded-full pointer-events-none"
            aria-hidden="true"
          />

          {/* Pure White Inner Card */}
          <div className="relative z-10 bg-white rounded-3xl p-5 sm:p-8 shadow-md">
            
            {/* Sub-header with Navigation arrows */}
            <div className="flex items-center justify-between mb-8 pb-4 border-b border-slate-100">
              <button
                type="button"
                className="w-8 h-8 rounded-full border border-slate-200 flex items-center justify-center text-slate-600 hover:bg-slate-50 hover:text-[#1A56DB] transition-colors"
                aria-label="Sebelumnya"
              >
                <ChevronLeft className="w-4 h-4" />
              </button>

              <h3 className="text-base sm:text-lg font-black text-[#1A56DB] tracking-wider uppercase">
                TIM INTI
              </h3>

              <button
                type="button"
                className="w-8 h-8 rounded-full border border-slate-200 flex items-center justify-center text-slate-600 hover:bg-slate-50 hover:text-[#1A56DB] transition-colors"
                aria-label="Selanjutnya"
              >
                <ChevronRight className="w-4 h-4" />
              </button>
            </div>

            {/* Grid Member Cards */}
            <div className="space-y-6">
              
              {/* Row 1: 4 Member Cards */}
              <div className="grid grid-cols-2 sm:grid-cols-4 gap-4 sm:gap-6">
                {topRow.map((member, idx) => (
                  <motion.div
                    key={member.nama + idx}
                    whileHover={{ y: -4 }}
                    className="flex flex-col items-center text-center group"
                  >
                    {/* Photo with Decorative OSIS Frame */}
                    <div className="relative w-full aspect-[4/5] rounded-2xl overflow-hidden p-1 bg-gradient-to-br from-indigo-500 via-purple-500 to-blue-600 shadow-md group-hover:shadow-xl transition-shadow">
                      <div className="relative w-full h-full rounded-xl overflow-hidden bg-slate-100">
                        {/* OSIS Top Bar Decoration */}
                        <div className="absolute top-0 inset-x-0 z-10 bg-gradient-to-r from-blue-700 via-indigo-600 to-purple-700 py-1 px-2 flex items-center justify-center">
                          <span className="text-[9px] font-black tracking-widest text-white uppercase">
                            OSIS
                          </span>
                        </div>

                        {member.foto_url ? (
                          <Image
                            src={member.foto_url}
                            alt={member.nama}
                            fill
                            className="object-cover group-hover:scale-105 transition-transform duration-500 pt-3"
                          />
                        ) : (
                          <div className="w-full h-full flex items-center justify-center bg-slate-200 text-slate-400 font-bold">
                            {member.nama.charAt(0)}
                          </div>
                        )}
                      </div>
                    </div>

                    {/* Member Info */}
                    <h4 className="font-bold text-slate-900 text-xs sm:text-sm mt-2.5 line-clamp-1 group-hover:text-[#1A56DB] transition-colors">
                      {member.nama}
                    </h4>
                    <p className="text-[11px] sm:text-xs font-semibold text-[#1A56DB]">
                      {member.jabatan}
                    </p>
                  </motion.div>
                ))}
              </div>

              {/* Row 2: 3 Member Cards (Centered) */}
              <div className="grid grid-cols-2 sm:grid-cols-3 max-w-2xl mx-auto gap-4 sm:gap-6">
                {bottomRow.map((member, idx) => (
                  <motion.div
                    key={member.nama + idx}
                    whileHover={{ y: -4 }}
                    className="flex flex-col items-center text-center group"
                  >
                    {/* Photo with Decorative OSIS Frame */}
                    <div className="relative w-full aspect-[4/5] rounded-2xl overflow-hidden p-1 bg-gradient-to-br from-indigo-500 via-purple-500 to-blue-600 shadow-md group-hover:shadow-xl transition-shadow">
                      <div className="relative w-full h-full rounded-xl overflow-hidden bg-slate-100">
                        {/* OSIS Top Bar Decoration */}
                        <div className="absolute top-0 inset-x-0 z-10 bg-gradient-to-r from-blue-700 via-indigo-600 to-purple-700 py-1 px-2 flex items-center justify-center">
                          <span className="text-[9px] font-black tracking-widest text-white uppercase">
                            OSIS
                          </span>
                        </div>

                        {member.foto_url ? (
                          <Image
                            src={member.foto_url}
                            alt={member.nama}
                            fill
                            className="object-cover group-hover:scale-105 transition-transform duration-500 pt-3"
                          />
                        ) : (
                          <div className="w-full h-full flex items-center justify-center bg-slate-200 text-slate-400 font-bold">
                            {member.nama.charAt(0)}
                          </div>
                        )}
                      </div>
                    </div>

                    {/* Member Info */}
                    <h4 className="font-bold text-slate-900 text-xs sm:text-sm mt-2.5 line-clamp-1 group-hover:text-[#1A56DB] transition-colors">
                      {member.nama}
                    </h4>
                    <p className="text-[11px] sm:text-xs font-semibold text-[#1A56DB]">
                      {member.jabatan}
                    </p>
                  </motion.div>
                ))}
              </div>

            </div>

            {/* Pagination Indicators */}
            <div className="flex items-center justify-center space-x-1.5 mt-8 pt-4">
              <span className="w-6 h-2 rounded-full bg-[#1A56DB]" />
              <span className="w-2 h-2 rounded-full bg-slate-200" />
              <span className="w-2 h-2 rounded-full bg-slate-200" />
              <span className="w-2 h-2 rounded-full bg-slate-200" />
              <span className="w-2 h-2 rounded-full bg-slate-200" />
            </div>

          </div>
        </div>

      </div>
    </section>
  );
}
