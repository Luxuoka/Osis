import { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { notFound } from "next/navigation";
import {
  Calendar,
  User,
  ArrowLeft,
  Share2,
  Copy,
  MessageCircle,
  Eye,
  Sparkles,
} from "lucide-react";
import { createClientPublic } from "@/lib/supabase/server";
import { formatDate } from "@/lib/utils";
import { SITE_IDENTITY } from "@/lib/constants";

export const revalidate = 60; // ISR

interface NewsDetailPageProps {
  params: {
    slug: string;
  };
}

export async function generateMetadata({ params }: NewsDetailPageProps): Promise<Metadata> {
  const supabase = createClientPublic();
  const { data: article } = await supabase
    .from("berita")
    .select("judul, cuplikan, thumbnail_url")
    .eq("slug", params.slug)
    .maybeSingle();

  if (!article) {
    return {
      title: "Berita Tidak Ditemukan",
    };
  }

  return {
    title: `${article.judul} | ${SITE_IDENTITY.NAMA_ORGANISASI}`,
    description: article.cuplikan || "",
    openGraph: {
      title: article.judul,
      description: article.cuplikan || "",
      images: [
        {
          url: article.thumbnail_url || "/hero-bg.webp",
          width: 1200,
          height: 630,
          alt: article.judul,
        },
      ],
    },
  };
}

export default async function NewsDetailPage({ params }: NewsDetailPageProps) {
  const supabase = createClientPublic();

  // Ambil artikel
  const { data: article } = await supabase
    .from("berita")
    .select("*")
    .eq("slug", params.slug)
    .maybeSingle();

  // Fallback demo article jika DB belum dikonfigurasi
  const fallbackArticle = {
    id: "demo",
    judul: params.slug
      .replace(/-/g, " ")
      .replace(/\b\w/g, (c) => c.toUpperCase()),
    slug: params.slug,
    cuplikan: `Dokumentasi resmi dan publikasi kegiatan terkini dari ${SITE_IDENTITY.NAMA_ORGANISASI}.`,
    konten: `Kegiatan ini merupakan salah satu program kerja strategis yang dirancang untuk mewadahi minat, bakat, dan pembentukan karakter seluruh siswa ${SITE_IDENTITY.NAMA_SEKOLAH}. 

Dengan mengusung semangat kolaborasi dan integritas kepemimpinan yang berlandaskan nilai-nilai luhur Santa Maria, seluruh elemen organisasi bersinergi memberikan dampak positif yang nyata bagi lingkungan sekolah dan masyarakat luas.

Dewan pengurus OSIS mengucapkan terima kasih sebesar-besarnya kepada pihak sekolah, bapak ibu guru pembina, dan seluruh siswa yang telah berpartisipasi aktif dalam menyukseskan agenda ini. Mari terus kobarkan semangat: ${SITE_IDENTITY.SLOGAN}!`,
    thumbnail_url: "https://images.unsplash.com/photo-1523240795612-9a054b0db644?w=1200&auto=format&fit=crop&q=80",
    kategori: "Kegiatan",
    penulis: "Humas OSIS",
    views: 184,
    created_at: new Date().toISOString(),
  };

  const currentArticle = article || fallbackArticle;

  // Rekomendasi 2 artikel lain
  const { data: relatedArticles } = await supabase
    .from("berita")
    .select("id, judul, slug, cuplikan, thumbnail_url, created_at")
    .neq("slug", params.slug)
    .limit(2);

  const shareUrl = `${process.env.NEXT_PUBLIC_SITE_URL || `https://${SITE_IDENTITY.DOMAIN}`}/news/${params.slug}`;

  return (
    <article className="relative min-h-screen pt-28 pb-20 bg-brand-dark overflow-hidden">
      {/* Ambient Lighting */}
      <div className="absolute top-0 left-1/3 w-[600px] h-[500px] bg-blue-600/10 rounded-full blur-[140px] pointer-events-none" />

      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        
        {/* Tombol Kembali */}
        <div className="mb-6">
          <Link
            href="/news"
            className="inline-flex items-center space-x-2 text-xs font-semibold text-slate-400 hover:text-amber-400 transition-colors"
          >
            <ArrowLeft className="w-4 h-4" />
            <span>Kembali ke Arsip Berita</span>
          </Link>
        </div>

        {/* Kategori Badge */}
        <div className="space-y-4 mb-6">
          <span className="inline-block px-3.5 py-1.5 rounded-lg bg-amber-500/10 border border-amber-500/30 text-amber-400 text-xs font-bold uppercase tracking-wider">
            {currentArticle.kategori}
          </span>

          <h1 className="text-3xl sm:text-4xl lg:text-5xl font-black text-white tracking-tight leading-tight">
            {currentArticle.judul}
          </h1>

          {/* Meta Info */}
          <div className="flex flex-wrap items-center gap-4 sm:gap-6 text-xs text-slate-400 pt-2 pb-4 border-b border-slate-800">
            <div className="flex items-center space-x-2">
              <Calendar className="w-4 h-4 text-blue-400" />
              <span>{formatDate(currentArticle.created_at)}</span>
            </div>
            <div className="flex items-center space-x-2">
              <User className="w-4 h-4 text-amber-400" />
              <span>Oleh: {currentArticle.penulis}</span>
            </div>
            <div className="flex items-center space-x-2">
              <Eye className="w-4 h-4 text-emerald-400" />
              <span>Dilihat {currentArticle.views || 100}+ kali</span>
            </div>
          </div>
        </div>

        {/* Hero Featured Image */}
        <div className="relative aspect-[16/9] w-full rounded-3xl overflow-hidden glass-card border border-slate-800 shadow-2xl mb-10">
          <Image
            src={currentArticle.thumbnail_url || "https://images.unsplash.com/photo-1523240795612-9a054b0db644?w=1200&auto=format&fit=crop&q=80"}
            alt={currentArticle.judul}
            fill
            priority
            sizes="(max-width: 1024px) 100vw, 896px"
            className="object-cover"
          />
        </div>

        {/* Isi Artikel (Rich Text formatting) */}
        <div className="glass-card rounded-3xl p-6 sm:p-10 border border-slate-800 shadow-xl mb-12">
          <div className="prose prose-invert max-w-none text-slate-300 text-base sm:text-lg leading-relaxed space-y-5 whitespace-pre-line">
            {currentArticle.konten}
          </div>

          {/* Share Section */}
          <div className="mt-10 pt-6 border-t border-slate-800 flex flex-col sm:flex-row items-center justify-between gap-4">
            <div className="flex items-center space-x-2 text-xs font-semibold text-slate-300">
              <Share2 className="w-4 h-4 text-amber-400" />
              <span>Bagikan Berita Ini:</span>
            </div>

            <div className="flex items-center space-x-3">
              {/* WhatsApp */}
              <a
                href={`https://api.whatsapp.com/send?text=${encodeURIComponent(`${currentArticle.judul}\n${shareUrl}`)}`}
                target="_blank"
                rel="noopener noreferrer"
                className="px-3.5 py-2 rounded-xl bg-emerald-600/20 hover:bg-emerald-600/30 border border-emerald-500/30 text-emerald-400 text-xs font-bold flex items-center space-x-1.5 transition-colors"
              >
                <MessageCircle className="w-4 h-4" />
                <span>WhatsApp</span>
              </a>

              {/* Twitter / X */}
              <a
                href={`https://twitter.com/intent/tweet?text=${encodeURIComponent(currentArticle.judul)}&url=${encodeURIComponent(shareUrl)}`}
                target="_blank"
                rel="noopener noreferrer"
                className="px-3.5 py-2 rounded-xl bg-blue-600/20 hover:bg-blue-600/30 border border-blue-500/30 text-blue-400 text-xs font-bold flex items-center space-x-1.5 transition-colors"
              >
                <span>Twitter / X</span>
              </a>
            </div>
          </div>
        </div>

        {/* Rekomendasi Berita Lain */}
        {relatedArticles && relatedArticles.length > 0 && (
          <div className="space-y-6">
            <h3 className="text-xl font-bold text-white tracking-tight flex items-center space-x-2">
              <Sparkles className="w-5 h-5 text-amber-400" />
              <span>Berita Terkait Lainnya</span>
            </h3>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
              {relatedArticles.map((rel) => (
                <Link
                  key={rel.slug}
                  href={`/news/${rel.slug}`}
                  className="glass-card rounded-2xl p-5 border border-slate-800 hover:border-amber-500/40 transition-all hover:scale-[1.02] flex items-center space-x-4 group"
                >
                  <div className="relative w-20 h-20 rounded-xl overflow-hidden shrink-0 bg-slate-900">
                    <Image
                      src={rel.thumbnail_url || "https://images.unsplash.com/photo-1523240795612-9a054b0db644?w=400&auto=format&fit=crop&q=80"}
                      alt={rel.judul}
                      fill
                      sizes="80px"
                      className="object-cover group-hover:scale-110 transition-transform duration-300"
                    />
                  </div>
                  <div>
                    <h4 className="text-sm font-bold text-white group-hover:text-amber-400 transition-colors line-clamp-2">
                      {rel.judul}
                    </h4>
                    <span className="text-[11px] text-slate-500 mt-1 block">
                      {formatDate(rel.created_at)}
                    </span>
                  </div>
                </Link>
              ))}
            </div>
          </div>
        )}

      </div>
    </article>
  );
}
