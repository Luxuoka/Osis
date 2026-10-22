import Image from "next/image";
import Link from "next/link";
import { Newspaper, Calendar, User, Search, ArrowRight, FolderOpen } from "lucide-react";
import { createClientServer } from "@/lib/supabase/server";
import { formatDate } from "@/lib/utils";
import { SITE_IDENTITY } from "@/lib/constants";

export const revalidate = 60; // ISR

interface NewsPageProps {
  searchParams: {
    q?: string;
    kategori?: string;
    page?: string;
  };
}

export default async function NewsArchivePage({ searchParams }: NewsPageProps) {
  const supabase = await createClientServer();
  const q = searchParams.q || "";
  const kategori = searchParams.kategori || "Semua";
  const currentPage = parseInt(searchParams.page || "1", 10) || 1;
  const pageSize = 6;

  let query = supabase
    .from("berita")
    .select("id, judul, slug, cuplikan, thumbnail_url, kategori, penulis, created_at", { count: "exact" })
    .eq("is_published", true)
    .order("created_at", { ascending: false });

  if (kategori !== "Semua") {
    query = query.eq("kategori", kategori);
  }

  if (q.trim()) {
    query = query.ilike("judul", `%${q.trim()}%`);
  }

  const from = (currentPage - 1) * pageSize;
  const to = from + pageSize - 1;
  query = query.range(from, to);

  const { data: newsItems, count } = await query;

  const totalPages = Math.ceil((count || 0) / pageSize) || 1;

  // Fallback data jika DB belum diisi
  const defaultArticles = [
    {
      id: "1",
      judul: "Pendaftaran Terbuka Calon Pengurus OSIS Periode 2026/2027 Resmi Dimulai",
      slug: "pendaftaran-terbuka-calon-pengurus-osis-periode-2026-2027",
      cuplikan: "Kesempatan emas bagi seluruh siswa kelas X dan XI SMA Santa Maria 1 Bandung untuk bergabung menjadi garda terdepan penggerak prestasi dan karya sekolah.",
      thumbnail_url: "https://images.unsplash.com/photo-1523240795612-9a054b0db644?w=800&auto=format&fit=crop&q=80",
      kategori: "Pengumuman",
      penulis: "Humas OSIS",
      created_at: new Date().toISOString(),
    },
    {
      id: "2",
      judul: "Kemeriahan Festival Seni & Budaya SMA Santa Maria 1 Bandung 2026",
      slug: "kemeriahan-festival-seni-budaya-sma-santa-maria-1-bandung-2026",
      cuplikan: "Pentas kreasi seni dan unjuk talenta kepemimpinan siswa SMA Santa Maria 1 Bandung sukses memukau ratusan pengunjung.",
      thumbnail_url: "https://images.unsplash.com/photo-1460661419201-fd4cecdf8a8b?w=800&auto=format&fit=crop&q=80",
      kategori: "Kegiatan",
      penulis: "Redaksi Medinfo",
      created_at: new Date(Date.now() - 86400000 * 2).toISOString(),
    },
    {
      id: "3",
      judul: "Sosialisasi Kotak Masukan Terbuka: Suarakan Ide & Aspirasimu Demi Kemajuan Bersama",
      slug: "sosialisasi-kotak-masukan-terbuka-suarakan-ide-dan-aspirasimu",
      cuplikan: "Wadah aspirasi digital kini hadir lebih aman dengan opsi anonim untuk menyampaikan kritik membangun dan ide kreatif.",
      thumbnail_url: "https://images.unsplash.com/photo-1517048676732-d65bc937f952?w=800&auto=format&fit=crop&q=80",
      kategori: "Info Siswa",
      penulis: "Biro Aspirasi",
      created_at: new Date(Date.now() - 86400000 * 5).toISOString(),
    },
  ];

  const items = newsItems && newsItems.length > 0 ? newsItems : (q || kategori !== "Semua" ? [] : defaultArticles);

  const categories = ["Semua", "Pengumuman", "Kegiatan", "Info Siswa", "Prestasi"];

  return (
    <div className="relative min-h-screen pt-28 pb-20 bg-white overflow-hidden text-slate-900">
      {/* Background Organic Shapes */}
      <div
        className="absolute top-0 right-0 w-[280px] sm:w-[480px] h-[280px] sm:h-[460px] bg-[#EE2D38] rounded-bl-[160px] sm:rounded-bl-[260px] pointer-events-none z-0"
        aria-hidden="true"
      />
      <div
        className="absolute top-[40%] right-0 w-[140px] sm:w-[220px] h-[200px] sm:h-[300px] bg-[#1A56DB] rounded-l-full pointer-events-none z-0"
        aria-hidden="true"
      />
      <div
        className="absolute top-[30%] left-0 w-[160px] sm:w-[280px] h-[260px] sm:h-[400px] bg-[#FDB813] rounded-r-full pointer-events-none z-0"
        aria-hidden="true"
      />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        
        {/* Header */}
        <div className="text-center space-y-3 mb-12">
          <div className="inline-flex items-center space-x-2 px-4 py-1.5 rounded-full bg-blue-50 border border-blue-200/80 text-[#1A56DB] text-xs sm:text-sm font-semibold shadow-sm">
            <Newspaper className="w-3.5 h-3.5" />
            <span>Arsip Berita & Publikasi</span>
          </div>

          <h1 className="text-3xl sm:text-4xl lg:text-5xl font-black text-slate-900 tracking-tight leading-tight">
            Berita & Pengumuman Resmi
          </h1>

          <p className="text-sm sm:text-base text-slate-600 max-w-xl mx-auto">
            Ikuti informasi terkini, agenda organisasi, dan kabar prestasi siswa {SITE_IDENTITY.NAMA_SEKOLAH}.
          </p>
        </div>

        {/* Filter & Search Bar */}
        <div className="bg-white rounded-2xl p-4 sm:p-5 border border-slate-100 shadow-md mb-10 flex flex-col md:flex-row items-center justify-between gap-4">
          
          {/* Category Tabs */}
          <div className="flex flex-wrap items-center gap-2 w-full md:w-auto">
            {categories.map((cat) => (
              <Link
                key={cat}
                href={`/news?kategori=${encodeURIComponent(cat)}${q ? `&q=${encodeURIComponent(q)}` : ""}`}
                className={`px-3.5 py-1.5 rounded-full text-xs font-bold transition-all ${
                  kategori === cat
                    ? "bg-[#1A56DB] text-white shadow-sm"
                    : "bg-slate-50 border border-slate-200 text-slate-600 hover:bg-slate-100"
                }`}
              >
                {cat}
              </Link>
            ))}
          </div>

          {/* Search Form */}
          <form method="GET" action="/news" className="w-full md:w-72 relative">
            {kategori !== "Semua" && (
              <input type="hidden" name="kategori" value={kategori} />
            )}
            <input
              type="text"
              name="q"
              defaultValue={q}
              placeholder="Cari berita..."
              className="w-full pl-9 pr-4 py-2 rounded-xl bg-slate-50 border border-slate-200 text-slate-800 placeholder-slate-400 text-xs focus:bg-white focus:outline-none focus:border-[#1A56DB]"
            />
            <Search className="w-4 h-4 text-slate-400 absolute left-3 top-1/2 -translate-y-1/2" />
          </form>

        </div>

        {/* Grid Berita */}
        {items.length === 0 ? (
          <div className="bg-white rounded-3xl p-16 text-center max-w-md mx-auto space-y-4 border border-slate-100 shadow-md">
            <FolderOpen className="w-12 h-12 text-slate-400 mx-auto" />
            <h2 className="text-lg font-bold text-slate-800">
              Tidak ada berita yang ditemukan.
            </h2>
            <p className="text-xs text-slate-500">
              Coba gunakan kata kunci pencarian lain atau pilih kategori Semua.
            </p>
            <div className="pt-2">
              <Link
                href="/news"
                className="px-5 py-2 rounded-full bg-[#1A56DB] text-white text-xs font-semibold shadow-sm hover:bg-[#1442AB]"
              >
                Reset Pencarian
              </Link>
            </div>
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {items.map((news) => (
              <article
                key={news.slug}
                className="bg-white rounded-2xl overflow-hidden border border-slate-100 hover:border-blue-200 transition-all duration-300 hover:shadow-xl flex flex-col group"
              >
                <div className="relative aspect-video w-full overflow-hidden bg-slate-100">
                  <Image
                    src={news.thumbnail_url || "https://images.unsplash.com/photo-1523240795612-9a054b0db644?w=800&auto=format&fit=crop&q=80"}
                    alt={news.judul}
                    fill
                    sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
                    className="object-cover group-hover:scale-105 transition-transform duration-500"
                  />
                  {news.kategori && (
                    <span className="absolute top-3 left-3 px-3 py-1 rounded-full bg-white/90 backdrop-blur-md text-[#1A56DB] text-xs font-bold border border-slate-200 shadow-sm">
                      {news.kategori}
                    </span>
                  )}
                </div>

                <div className="p-6 flex-1 flex flex-col justify-between space-y-4">
                  <div className="space-y-2.5">
                    <div className="flex items-center space-x-4 text-xs text-slate-500">
                      <div className="flex items-center space-x-1.5">
                        <Calendar className="w-3.5 h-3.5 text-[#1A56DB]" />
                        <span>{formatDate(news.created_at || new Date().toISOString())}</span>
                      </div>
                      <div className="flex items-center space-x-1.5">
                        <User className="w-3.5 h-3.5 text-slate-400" />
                        <span>{news.penulis || "Humas"}</span>
                      </div>
                    </div>

                    <h2 className="text-base sm:text-lg font-bold text-slate-900 group-hover:text-[#1A56DB] transition-colors leading-snug">
                      <Link href={`/news/${news.slug}`}>
                        {news.judul}
                      </Link>
                    </h2>

                    <p className="text-xs sm:text-sm text-slate-600 line-clamp-3 leading-relaxed">
                      {news.cuplikan}
                    </p>
                  </div>

                  <div className="pt-2 border-t border-slate-100">
                    <Link
                      href={`/news/${news.slug}`}
                      className="inline-flex items-center space-x-1.5 text-xs font-bold text-[#1A56DB] hover:underline"
                    >
                      <span>Baca Selengkapnya</span>
                      <ArrowRight className="w-3.5 h-3.5" />
                    </Link>
                  </div>
                </div>
              </article>
            ))}
          </div>
        )}

        {/* Pagination */}
        {totalPages > 1 && (
          <div className="flex justify-center items-center space-x-2 pt-12">
            {Array.from({ length: totalPages }).map((_, idx) => {
              const p = idx + 1;
              return (
                <Link
                  key={p}
                  href={`/news?page=${p}${kategori !== "Semua" ? `&kategori=${encodeURIComponent(kategori)}` : ""}${q ? `&q=${encodeURIComponent(q)}` : ""}`}
                  className={`w-10 h-10 rounded-xl flex items-center justify-center text-xs font-bold transition-all ${
                    currentPage === p
                      ? "bg-amber-400 text-slate-950 shadow-md"
                      : "bg-slate-900 border border-slate-800 text-slate-400 hover:text-white"
                  }`}
                >
                  {p}
                </Link>
              );
            })}
          </div>
        )}

      </div>
    </div>
  );
}
