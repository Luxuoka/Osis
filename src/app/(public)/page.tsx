import { createClientPublic } from "@/lib/supabase/server";
import { HeroSection } from "@/components/home/HeroSection";
import { AboutSection } from "@/components/home/AboutSection";
import { StructureSection, PengurusItem, DepartemenItem } from "@/components/home/StructureSection";
import { ProgramSection, ProgramItem } from "@/components/home/ProgramSection";
import { NewsSection, NewsItem } from "@/components/home/NewsSection";
import { FaqSection, FaqItem } from "@/components/home/FaqSection";
import { FeedbackSection } from "@/components/home/FeedbackSection";
import { LogoBannerSection } from "@/components/home/LogoBannerSection";

export const revalidate = 60; // Revalidate ISR every 60 seconds

export default async function HomePage() {
  const supabase = createClientPublic();

  // Ambil seluruh data publik secara PARALEL untuk menghilangkan waterfall latency
  const [
    pengaturanRes,
    pengurusRes,
    deptRes,
    prokerRes,
    beritaRes,
    faqRes,
  ] = await Promise.allSettled([
    supabase
      .from("pengaturan")
      .select("stats_departemen, stats_pengurus, stats_proker, stats_periode, periode")
      .limit(1)
      .maybeSingle(),
    supabase
      .from("pengurus")
      .select("id, nama, jabatan, tipe, departemen_id, foto_url, urutan, instagram")
      .order("urutan", { ascending: true }),
    supabase
      .from("departemen")
      .select("id, nama, singkatan, deskripsi, urutan")
      .order("urutan", { ascending: true }),
    supabase
      .from("program_kerja")
      .select("id, judul, deskripsi, file_url, status, departemen_id, departemen:departemen_id(nama)")
      .order("created_at", { ascending: false }),
    supabase
      .from("berita")
      .select("id, judul, slug, cuplikan, thumbnail_url, kategori, penulis, created_at")
      .eq("is_published", true)
      .order("created_at", { ascending: false })
      .limit(3),
    supabase
      .from("faq")
      .select("id, pertanyaan, jawaban, urutan")
      .order("urutan", { ascending: true }),
  ]);

  // 1. Hero Stats
  let heroStats = {
    departemen: "9",
    pengurus: "64",
    proker: "12+",
    periode: "2024/2025",
  };
  if (pengaturanRes.status === "fulfilled" && pengaturanRes.value.data) {
    const data = pengaturanRes.value.data;
    heroStats = {
      departemen: data.stats_departemen || "9",
      pengurus: data.stats_pengurus || "64",
      proker: data.stats_proker || "12+",
      periode: data.stats_periode || data.periode || "2024/2025",
    };
  }

  // 2. Pengurus & Departemen
  let pengurusList: PengurusItem[] = [];
  if (pengurusRes.status === "fulfilled" && pengurusRes.value.data && pengurusRes.value.data.length > 0) {
    pengurusList = pengurusRes.value.data as PengurusItem[];
  }

  let departemenList: DepartemenItem[] = [];
  if (deptRes.status === "fulfilled" && deptRes.value.data && deptRes.value.data.length > 0) {
    departemenList = deptRes.value.data as DepartemenItem[];
  }

  // 3. Program Kerja
  let programsList: ProgramItem[] = [];
  if (prokerRes.status === "fulfilled" && prokerRes.value.data && prokerRes.value.data.length > 0) {
    programsList = prokerRes.value.data.map((p) => ({
      id: p.id,
      judul: p.judul,
      deskripsi: p.deskripsi,
      file_url: p.file_url,
      status: p.status as "Rencana" | "Sedang Berjalan" | "Terlaksana",
      departemen_id: p.departemen_id,
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
      departemen_nama: (p.departemen as any)?.nama || undefined,
    }));
  }

  // 4. Berita Terbaru
  let newsList: NewsItem[] = [];
  if (beritaRes.status === "fulfilled" && beritaRes.value.data && beritaRes.value.data.length > 0) {
    newsList = beritaRes.value.data as NewsItem[];
  }

  // 5. FAQ
  let faqList: FaqItem[] = [];
  if (faqRes.status === "fulfilled" && faqRes.value.data && faqRes.value.data.length > 0) {
    faqList = faqRes.value.data as FaqItem[];
  }

  return (
    <>
      {/* SECTION 1 - HERO */}
      <HeroSection stats={heroStats} />

      {/* SECTION 2 - TENTANG KAMI */}
      <AboutSection />

      {/* SECTION 3 - STRUKTUR ORGANISASI */}
      <StructureSection pengurusList={pengurusList} departemenList={departemenList} />

      {/* SECTION 4 - DOKUMEN PROGRAM KERJA */}
      <ProgramSection programsList={programsList} />

      {/* SECTION 5 - BERITA & PENGUMUMAN */}
      <NewsSection newsList={newsList} />

      {/* SECTION 6 - FAQ */}
      <FaqSection faqList={faqList} />

      {/* SECTION 7 - KOTAK MASUKAN */}
      <FeedbackSection />

      {/* SECTION 8 - BANNER LOGO */}
      <LogoBannerSection />
    </>
  );
}
