"use client";

import { useState } from "react";
import Link from "next/link";
import { motion, AnimatePresence } from "framer-motion";
import {
  Users,
  Shield,
  Heart,
  BookOpen,
  Award,
  Palette,
  Laptop,
  Flame,
  Globe2,
  ArrowRight,
  Sparkles,
  X,
  FileText,
} from "lucide-react";
import { SITE_IDENTITY } from "@/lib/constants";

export interface ProgramItem {
  id?: string;
  departemen_id?: string;
  departemen_nama?: string;
  judul: string;
  deskripsi?: string | null;
  file_url?: string | null;
  status: "Rencana" | "Sedang Berjalan" | "Terlaksana";
}

interface ProgramSectionProps {
  programsList?: ProgramItem[];
}

interface DepartemenCard {
  id: number;
  nama: string;
  sekbid: string;
  deskripsi: string;
  icon: any;
  proker: string[];
}

export function ProgramSection({ programsList = [] }: ProgramSectionProps) {
  const [selectedDept, setSelectedDept] = useState<DepartemenCard | null>(null);

  const departments: DepartemenCard[] = [
    {
      id: 1,
      nama: "Keimanan & Ketaqwaan",
      sekbid: "Sekbid 1",
      deskripsi: "Pembinaan rohani, peringatan hari besar keagamaan, dan penanaman toleransi antar umat beragama.",
      icon: Heart,
      proker: ["Peringatan Isra Miraj & Maulid Nabi", "Kajian Rutin Rohis & Rokris", "Bakti Sosial Keagamaan"],
    },
    {
      id: 2,
      nama: "Budi Pekerti Luhur",
      sekbid: "Sekbid 2",
      deskripsi: "Pengembangan etika tata krama, kepemimpinan berkarakter, dan penegakan tata tertib siswa.",
      icon: Users,
      proker: ["Kampanye 5S (Senyum, Sapa, Salam, Sopan, Santun)", "Sosialisasi Stop Bullying", "Duta Karakter Siswa"],
    },
    {
      id: 3,
      nama: "Bela Negara & Kedisiplinan",
      sekbid: "Sekbid 3",
      deskripsi: "Penguatan nasionalisme, kepemimpinan disiplin, dan koordinasi upacara bendera sekolah.",
      icon: Shield,
      proker: ["Pelatihan Petugas Upacara", "Peringatan Hari Pahlawan & HUT RI", "Latihan Baris Berbaris"],
    },
    {
      id: 4,
      nama: "Prestasi Akademik & Olahraga",
      sekbid: "Sekbid 4",
      deskripsi: "Wadah kompetisi sains, kejuaraan olahraga antar kelas (classmeeting), dan bimbingan lomba.",
      icon: Award,
      proker: ["Classmeeting Futsal & Basket", "Olimpiade Sains Sekolah", "Pekan Olahraga Siswa"],
    },
    {
      id: 5,
      nama: "Demokrasi & Pendidikan Politik",
      sekbid: "Sekbid 5",
      deskripsi: "Edukasi musyawarah mufakat, pemilihan umum ketua OSIS (Pemilos), dan forum dialog siswa.",
      icon: Globe2,
      proker: ["Pemilihan Umum Ketua OSIS (Pemilos)", "Sidang Pleno MPK-OSIS", "Debat Calon Pemimpin"],
    },
    {
      id: 6,
      nama: "Kreativitas & Kewirausahaan",
      sekbid: "Sekbid 6",
      deskripsi: "Pengembangan jiwa entrepreneurship muda, pengelolaan bazaar sekolah, dan koperasi siswa.",
      icon: Flame,
      proker: ["Bazaar Karya Siswa", "Pelatihan Bisnis Digital", "Pojok Merchandise Sekolah"],
    },
    {
      id: 7,
      nama: "Kualitas Jasmani & PMR",
      sekbid: "Sekbid 7",
      deskripsi: "Kesehatan lingkungan, kebersihan sekolah, posko pertolongan pertama, dan senam bersama.",
      icon: Users,
      proker: ["Jumat Bersih & Sehat", "Donor Darah Terpadu", "Penyuluhan Gizi Remaja"],
    },
    {
      id: 8,
      nama: "Sastra, Seni & Budaya",
      sekbid: "Sekbid 8",
      deskripsi: "Pentas kreasi seni tradisi, modern, pertunjukan teater, serta apresiasi karya literasi sastra.",
      icon: Palette,
      proker: ["Pentas Seni (Pensi) Tahunan", "Bulan Bahasa & Sastra", "Pameran Galeri Karya Seni"],
    },
    {
      id: 9,
      nama: "Teknologi Informasi & Medinfo",
      sekbid: "Sekbid 9",
      deskripsi: "Dokumentasi publikasi multimedia, pengelolaan website portal OSIS, podcast, dan media sosial.",
      icon: Laptop,
      proker: ["Pengembangan Portal OSIS", "Podcast Suara Sanmar 1", "Liputan & Dokumentasi Event"],
    },
  ];

  return (
    <section id="departemen" className="relative py-16 sm:py-24 bg-white overflow-hidden">
      <div className="max-w-5xl mx-auto px-4 sm:px-6 relative z-10">
        
        {/* Colorful Framing Container with Top Tab */}
        <div className="relative pt-6">
          
          {/* Protruding Tab Top-Left */}
          <div className="inline-block bg-white text-slate-900 font-extrabold text-sm sm:text-base px-6 py-2.5 rounded-t-2xl border-t border-x border-slate-200/80 shadow-sm relative z-20">
            Departemen & Sekbid
          </div>

          {/* Main Colorful Wrapper */}
          <div className="relative rounded-b-[2rem] rounded-tr-[2rem] sm:rounded-b-[2.5rem] sm:rounded-tr-[2.5rem] p-5 sm:p-8 md:p-10 shadow-xl overflow-hidden bg-[#FDB813]">
            
            {/* Background shapes: Red on top-right, Blue on bottom-right */}
            <div
              className="absolute top-0 right-0 w-64 sm:w-80 h-64 sm:h-80 bg-[#EE2D38] rounded-bl-full pointer-events-none"
              aria-hidden="true"
            />
            <div
              className="absolute -bottom-12 right-0 w-56 sm:w-72 h-56 sm:h-72 bg-[#1A56DB] rounded-l-full pointer-events-none"
              aria-hidden="true"
            />

            {/* Pure White Inner Card */}
            <div className="relative z-10 bg-white rounded-3xl p-5 sm:p-8 shadow-md">
              
              <p className="text-slate-600 text-xs sm:text-sm mb-6 max-w-2xl leading-relaxed">
                Temukan berbagai bidang dan program kerja yang digerakkan oleh 9 Sekbid OSIS {SITE_IDENTITY.NAMA_SEKOLAH} untuk mewujudkan aspirasi dan kemajuan bersama.
              </p>

              {/* 2-Column Grid of 9 Department Cards */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                {departments.map((dept) => {
                  const Icon = dept.icon;
                  return (
                    <motion.div
                      key={dept.id}
                      whileHover={{ y: -3 }}
                      className="bg-[#F8FAFC] hover:bg-blue-50/50 border border-slate-100 hover:border-blue-200 rounded-2xl p-4 sm:p-5 transition-all shadow-sm flex items-start space-x-3.5 group cursor-pointer"
                      onClick={() => setSelectedDept(dept)}
                    >
                      {/* Circular Blue Icon Badge */}
                      <div className="w-10 h-10 sm:w-11 sm:h-11 rounded-full bg-[#1A56DB] text-white flex items-center justify-center shrink-0 shadow-md group-hover:scale-105 transition-transform">
                        <Icon className="w-5 h-5" />
                      </div>

                      {/* Content */}
                      <div className="flex-1 min-w-0">
                        <div className="flex items-center space-x-2">
                          <span className="text-[10px] font-bold text-[#1A56DB] bg-blue-100/70 px-2 py-0.5 rounded-full uppercase">
                            {dept.sekbid}
                          </span>
                        </div>
                        <h4 className="font-bold text-slate-900 text-xs sm:text-sm mt-1 line-clamp-1 group-hover:text-[#1A56DB] transition-colors">
                          {dept.nama}
                        </h4>
                        <p className="text-slate-500 text-[11px] sm:text-xs mt-1 line-clamp-2 leading-relaxed">
                          {dept.deskripsi}
                        </p>
                        <button
                          type="button"
                          className="text-[#1A56DB] font-semibold text-xs mt-2.5 flex items-center space-x-1 group-hover:translate-x-1 transition-transform"
                        >
                          <span>Lihat Detail</span>
                          <ArrowRight className="w-3.5 h-3.5" />
                        </button>
                      </div>
                    </motion.div>
                  );
                })}
              </div>

            </div>

          </div>
        </div>

      </div>

      {/* Modal Detail Departemen */}
      <AnimatePresence>
        {selectedDept && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-50 bg-black/60 backdrop-blur-sm flex items-center justify-center p-4"
            onClick={() => setSelectedDept(null)}
          >
            <motion.div
              initial={{ scale: 0.95, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.95, opacity: 0 }}
              className="bg-white rounded-3xl p-6 sm:p-8 max-w-lg w-full shadow-2xl border border-slate-100 relative"
              onClick={(e) => e.stopPropagation()}
            >
              <button
                type="button"
                onClick={() => setSelectedDept(null)}
                className="absolute top-4 right-4 w-8 h-8 rounded-full bg-slate-100 text-slate-500 hover:bg-slate-200 flex items-center justify-center transition-colors"
                aria-label="Tutup detail"
              >
                <X className="w-4 h-4" />
              </button>

              <div className="flex items-center space-x-3 mb-4">
                <div className="w-12 h-12 rounded-2xl bg-[#1A56DB] text-white flex items-center justify-center shadow-lg">
                  {<selectedDept.icon className="w-6 h-6" />}
                </div>
                <div>
                  <span className="text-xs font-bold text-[#1A56DB] uppercase">
                    {selectedDept.sekbid}
                  </span>
                  <h3 className="text-lg font-black text-slate-900">
                    {selectedDept.nama}
                  </h3>
                </div>
              </div>

              <p className="text-slate-600 text-sm leading-relaxed mb-6">
                {selectedDept.deskripsi}
              </p>

              <div>
                <h4 className="text-xs font-bold uppercase tracking-wider text-slate-400 mb-3 flex items-center space-x-1.5">
                  <FileText className="w-3.5 h-3.5 text-[#1A56DB]" />
                  <span>Program Kerja Utama</span>
                </h4>
                <ul className="space-y-2">
                  {selectedDept.proker.map((pro, i) => (
                    <li
                      key={i}
                      className="text-xs sm:text-sm text-slate-700 bg-slate-50 border border-slate-100 p-2.5 rounded-xl flex items-center space-x-2"
                    >
                      <span className="w-1.5 h-1.5 rounded-full bg-[#1A56DB]" />
                      <span>{pro}</span>
                    </li>
                  ))}
                </ul>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </section>
  );
}
