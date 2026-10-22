"use client";

import { useState } from "react";
import Image from "next/image";
import { motion, AnimatePresence } from "framer-motion";
import { Plus, Minus } from "lucide-react";
import { SITE_IDENTITY } from "@/lib/constants";

export interface FaqItem {
  id?: string;
  pertanyaan: string;
  jawaban: string;
  urutan?: number;
}

interface FaqSectionProps {
  faqList?: FaqItem[];
}

export function FaqSection({ faqList = [] }: FaqSectionProps) {
  // First item open by default as in the mockup
  const [openIdx, setOpenIdx] = useState<number | null>(0);

  const defaultFaqs: FaqItem[] = [
    {
      pertanyaan: `Apa visi dan peran utama ${SITE_IDENTITY.NAMA_ORGANISASI}?`,
      jawaban: `${SITE_IDENTITY.NAMA_ORGANISASI} adalah wadah resmi organisasi siswa intra sekolah di ${SITE_IDENTITY.NAMA_SEKOLAH} yang bertugas menggerakkan aspirasi, menyalurkan minat bakat, melatih jiwa kepemimpinan berkarakter, serta mengorganisir agenda dan kegiatan sekolah untuk seluruh peserta didik.`,
    },
    {
      pertanyaan: "Bagaimana alur dan syarat seleksi pendaftaran OSIS?",
      jawaban: "Pendaftaran terbuka bagi seluruh siswa kelas X dan XI aktif. Alur seleksi meliputi: (1) Pengisian formulir online di portal resmi, (2) Pengumpulan berkas administrasi dan surat izin orang tua, (3) Wawancara kepribadian & minat bakat, (4) Latihan Dasar Kepemimpinan Siswa (LDKS), dan (5) Pelantikan resmi pengurus.",
    },
    {
      pertanyaan: "Program kerja apa saja yang menjadi unggulan OSIS?",
      jawaban: "Program unggulan kami meliputi Gelar Seni & Pameran Karya Siswa (Pensi), Pemilihan Umum Ketua OSIS (Pemilos), Peringatan Hari Pahlawan & HUT RI, Classmeeting Antar Jurusan, Kampanye Karakter 5S, hingga Pelatihan Jurnalistik & Multimedia.",
    },
    {
      pertanyaan: "Bagaimana cara menyampaikan aspirasi atau masukan ke OSIS?",
      jawaban: `Siswa dapat menyuarakan kritik, saran, maupun ide melalui Kotak Masukan online di website ini (dapat memilih opsi anonim) atau mendatangi langsung ruang sekretariat ${SITE_IDENTITY.NAMA_ORGANISASI}.`,
    },
  ];

  const faqs = faqList.length > 0 ? faqList : defaultFaqs;

  const toggleFaq = (idx: number) => {
    setOpenIdx(openIdx === idx ? null : idx);
  };

  return (
    <section id="faq" className="relative py-16 sm:py-20 bg-white overflow-hidden">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 relative z-10">
        
        {/* Header */}
        <div className="text-center space-y-2 mb-10 sm:mb-12">
          <h2 className="text-2xl sm:text-3xl font-black text-slate-900 tracking-tight uppercase">
            PUSAT BANTUAN (FAQ)
          </h2>
          <p className="text-xs sm:text-sm text-slate-500 max-w-lg mx-auto">
            Jawaban atas berbagai pertanyaan seputar organisasi dan kegiatan {SITE_IDENTITY.NAMA_SEKOLAH}.
          </p>
        </div>

        {/* Accordion List */}
        <div className="space-y-3">
          {faqs.map((faq, idx) => {
            const isOpen = openIdx === idx;
            return (
              <div
                key={faq.pertanyaan + idx}
                className="border-b border-slate-200 pb-3 transition-colors"
              >
                <button
                  type="button"
                  onClick={() => toggleFaq(idx)}
                  className="w-full py-3.5 flex items-center justify-between text-left focus:outline-none group"
                  aria-expanded={isOpen}
                >
                  <div className="flex items-center space-x-3 pr-4">
                    {/* Active blue tag on first item or open item */}
                    {isOpen && (
                      <span className="hidden sm:inline-flex items-center space-x-1.5 px-2.5 py-1 rounded-full bg-[#1A56DB] text-white text-[10px] font-bold tracking-wider shrink-0 uppercase">
                        <span>{SITE_IDENTITY.NAMA_ORGANISASI.toUpperCase()}</span>
                      </span>
                    )}
                    <span className="text-sm sm:text-base font-bold text-slate-900 group-hover:text-[#1A56DB] transition-colors">
                      {faq.pertanyaan}
                    </span>
                  </div>

                  <div className="w-7 h-7 rounded-full flex items-center justify-center shrink-0 text-slate-500 group-hover:text-[#1A56DB]">
                    {isOpen ? <Minus className="w-4 h-4 text-[#1A56DB]" /> : <Plus className="w-4 h-4" />}
                  </div>
                </button>

                <AnimatePresence initial={false}>
                  {isOpen && (
                    <motion.div
                      initial={{ height: 0, opacity: 0 }}
                      animate={{ height: "auto", opacity: 1 }}
                      exit={{ height: 0, opacity: 0 }}
                      transition={{ duration: 0.2 }}
                      className="overflow-hidden"
                    >
                      <div className="bg-[#F0F5FF] border border-blue-100 rounded-2xl p-4 sm:p-5 text-slate-700 text-xs sm:text-sm leading-relaxed mb-2">
                        {faq.jawaban}
                      </div>
                    </motion.div>
                  )}
                </AnimatePresence>
              </div>
            );
          })}
        </div>

      </div>
    </section>
  );
}
