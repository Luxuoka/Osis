"use client";

import Link from "next/link";
import { HelpCircle, ArrowRight, MessageCircle } from "lucide-react";
import { SITE_IDENTITY } from "@/lib/constants";

export function LogoBannerSection() {
  return (
    <section className="relative py-12 sm:py-16 bg-white overflow-hidden">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 relative z-10">
        
        {/* Soft light-blue card */}
        <div className="bg-[#F0F5FF] border border-blue-100 rounded-3xl p-8 sm:p-12 text-center shadow-sm">
          
          {/* Top Circular Icon */}
          <div className="w-12 h-12 rounded-full bg-blue-100 text-[#1A56DB] flex items-center justify-center mx-auto mb-4 shadow-sm">
            <HelpCircle className="w-6 h-6" />
          </div>

          <h2 className="text-2xl sm:text-3xl font-black text-slate-900 tracking-tight">
            Butuh Info Lebih Lanjut?
          </h2>

          <p className="text-slate-600 text-xs sm:text-sm max-w-lg mx-auto mt-2 leading-relaxed">
            Hubungi pengurus OSIS atau kunjungi ruang sekretariat kami di {SITE_IDENTITY.NAMA_SEKOLAH}. Kami siap melayani dan mendengarkan aspirasimu.
          </p>

          <div className="pt-6">
            <a
              href={`https://wa.me/${SITE_IDENTITY.WHATSAPP}?text=Halo%20${encodeURIComponent(SITE_IDENTITY.NAMA_ORGANISASI)},%20saya%20butuh%20informasi%20lebih%20lanjut`}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center space-x-2 px-6 py-3 rounded-full font-bold text-white bg-[#1A56DB] hover:bg-[#1442AB] shadow-md shadow-blue-500/20 transition-all duration-200 hover:scale-[1.03] active:scale-[0.98] text-sm"
            >
              <MessageCircle className="w-4 h-4" />
              <span>Hubungi Kami Sekarang</span>
              <ArrowRight className="w-4 h-4" />
            </a>
          </div>

        </div>

      </div>
    </section>
  );
}
