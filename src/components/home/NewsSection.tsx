"use client";

import Image from "next/image";
import Link from "next/link";
import { ArrowRight, Calendar, Newspaper } from "lucide-react";
import { formatDate } from "@/lib/utils";

export interface NewsItem {
  id?: string;
  judul: string;
  slug: string;
  cuplikan?: string | null;
  thumbnail_url?: string | null;
  kategori?: string;
  penulis?: string;
  created_at?: string;
}

interface NewsSectionProps {
  newsList?: NewsItem[];
}

export function NewsSection({ newsList = [] }: NewsSectionProps) {
  const defaultNews: NewsItem[] = [
    {
      judul: "Peringatan HUT RI ke-79 & Semarak Kemerdekaan",
      slug: "peringatan-hut-ri-ke-79-dan-semarak-kemerdekaan",
      cuplikan: "Semarak perayaan kemerdekaan yang diadakan oleh OSIS SMA Santa Maria 1 Bandung melalui upacara bendera khidmat, pawai budaya, dan ragam perlombaan kreatif.",
      thumbnail_url: "https://images.unsplash.com/photo-1541829070764-84a7d30dd3f3?w=800&auto=format&fit=crop&q=80",
      kategori: "17 AGUSTUS 2024",
      penulis: "Humas OSIS",
      created_at: new Date("2024-08-17").toISOString(),
    },
    {
      judul: "Latihan Dasar Kepemimpinan Siswa (LDKS) Sanmar 1",
      slug: "latihan-dasar-kepemimpinan-siswa-ldks-sanmar-1",
      cuplikan: "Pembekalan intensif kedisiplinan, manajemen organisasi, dan pembentukan karakter calon pengurus OSIS generasi penerus SMA Santa Maria 1 Bandung.",
      thumbnail_url: "https://images.unsplash.com/photo-1523240795612-9a054b0db644?w=800&auto=format&fit=crop&q=80",
      kategori: "KADERISASI",
      penulis: "Redaksi OSIS",
      created_at: new Date("2024-09-10").toISOString(),
    },
    {
      judul: "Gelar Karya Kreativitas & Pameran Seni Siswa",
      slug: "gelar-karya-kreativitas-dan-pameran-seni-siswa",
      cuplikan: "Unjuk bakat kolaboratif siswa dalam ajang pameran dan festival seni tahunan SMA Santa Maria 1 Bandung.",
      thumbnail_url: "https://images.unsplash.com/photo-1511578314322-379afb476865?w=800&auto=format&fit=crop&q=80",
      kategori: "SENI & BUDAYA",
      penulis: "Medinfo",
      created_at: new Date("2024-10-05").toISOString(),
    },
  ];

  const items = newsList.length > 0 ? newsList : defaultNews;
  const primaryItem = items[0];

  return (
    <section className="relative py-16 sm:py-20 bg-white overflow-hidden">
      <div className="max-w-5xl mx-auto px-4 sm:px-6 relative z-10">
        
        {/* Header */}
        <div className="flex items-center justify-between mb-8 pb-3 border-b border-slate-100">
          <div>
            <h2 className="text-lg sm:text-2xl font-black text-slate-900 tracking-tight uppercase">
              DOKUMENTASI PROGRAM KERJA
            </h2>
          </div>

          <Link
            href="/news"
            className="text-xs sm:text-sm font-bold text-[#1A56DB] hover:underline flex items-center space-x-1"
          >
            <span>Lihat Semua</span>
            <ArrowRight className="w-4 h-4" />
          </Link>
        </div>

        {/* Highlight News Card matching the Mockup */}
        <div className="grid grid-cols-1 md:grid-cols-12 gap-6 items-center bg-white rounded-3xl p-5 border border-slate-100 shadow-sm hover:shadow-md transition-shadow">
          
          {/* Thumbnail */}
          <div className="md:col-span-5 relative aspect-[16/10] rounded-2xl overflow-hidden shadow-inner bg-slate-100">
            <Image
              src={primaryItem.thumbnail_url || "https://images.unsplash.com/photo-1541829070764-84a7d30dd3f3?w=800&auto=format&fit=crop&q=80"}
              alt={primaryItem.judul}
              fill
              className="object-cover hover:scale-105 transition-transform duration-500"
            />
          </div>

          {/* Text Content */}
          <div className="md:col-span-7 space-y-3">
            <div className="inline-flex items-center space-x-2 px-3 py-1 rounded-full bg-blue-50 text-[#1A56DB] text-xs font-bold uppercase tracking-wider">
              <Calendar className="w-3.5 h-3.5" />
              <span>{primaryItem.kategori || "17 AGUSTUS 2024"}</span>
            </div>

            <h3 className="text-xl sm:text-2xl font-black text-slate-900 hover:text-[#1A56DB] transition-colors leading-snug">
              <Link href={`/news/${primaryItem.slug}`}>
                {primaryItem.judul}
              </Link>
            </h3>

            <p className="text-slate-600 text-sm leading-relaxed line-clamp-3">
              {primaryItem.cuplikan}
            </p>

            <div className="pt-2">
              <Link
                href={`/news/${primaryItem.slug}`}
                className="text-xs sm:text-sm font-bold text-[#1A56DB] hover:underline inline-flex items-center space-x-1"
              >
                <span>Baca Selengkapnya</span>
                <ArrowRight className="w-3.5 h-3.5" />
              </Link>
            </div>
          </div>

        </div>

      </div>
    </section>
  );
}
