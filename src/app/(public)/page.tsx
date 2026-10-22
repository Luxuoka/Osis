import { createClientServer } from "@/lib/supabase/server";
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
  const supabase = await createClientServer();

  // 1. Fetch Pengaturan (Hero Stats)
  let heroStats = {
    departemen: "9",
    pengurus: "64",
    proker: "12+",
    periode: "2024/2025",
  };

  try {
    const { data: pengaturanData } = await supabase
      .from("pengaturan")
      .select("stats_departemen, stats_pengurus, stats_proker, stats_periode, periode")
      .limit(1)
      .maybeSingle();

    if (pengaturanData) {
      heroStats = {
        departemen: pengaturanData.stats_departemen || "9",
        pengurus: pengaturanData.stats_pengurus || "64",
        proker: pengaturanData.stats_proker || "12+",
        periode: pengaturanData.stats_periode || pengaturanData.periode || "2024/2025",
      };
    }
  } catch (err) {
    console.error("Error fetching pengaturan:", err);
  }

  // 2. Fetch Pengurus & Departemen
  let pengurusList: PengurusItem[] = [];
  let departemenList: DepartemenItem[] = [];

  try {
    const { data: pengurusData } = await supabase
      .from("pengurus")
      .select("id, nama, jabatan, tipe, departemen_id, foto_url, urutan, instagram")
      .order("urutan", { ascending: true });

    if (pengurusData && pengurusData.length > 0) {
      pengurusList = pengurusData as PengurusItem[];
    }

    const { data: deptData } = await supabase
      .from("departemen")
      .select("id, nama, singkatan, deskripsi, urutan")
      .order("urutan", { ascending: true });

    if (deptData && deptData.length > 0) {
      departemenList = deptData as DepartemenItem[];
    }
  } catch (err) {
    console.error("Error fetching structure data:", err);
  }

  // 3. Fetch Program Kerja
  let programsList: ProgramItem[] = [];
  try {
    const { data: prokerData } = await supabase
      .from("program_kerja")
      .select("id, judul, deskripsi, file_url, status, departemen_id, departemen:departemen_id(nama)")
      .order("created_at", { ascending: false });

    if (prokerData && prokerData.length > 0) {
      programsList = prokerData.map((p) => ({
        id: p.id,
        judul: p.judul,
        deskripsi: p.deskripsi,
        file_url: p.file_url,
        status: p.status as "Rencana" | "Sedang Berjalan" | "Terlaksana",
        departemen_id: p.departemen_id,
        departemen_nama: (p.departemen as any)?.nama || undefined,
      }));
    }
  } catch (err) {
    console.error("Error fetching proker:", err);
  }

  // 4. Fetch 3 Berita Terbaru
  let newsList: NewsItem[] = [];
  try {
    const { data: beritaData } = await supabase
      .from("berita")
      .select("id, judul, slug, cuplikan, thumbnail_url, kategori, penulis, created_at")
      .eq("is_published", true)
      .order("created_at", { ascending: false })
      .limit(3);

    if (beritaData && beritaData.length > 0) {
      newsList = beritaData as NewsItem[];
    }
  } catch (err) {
    console.error("Error fetching news:", err);
  }

  // 5. Fetch FAQ
  let faqList: FaqItem[] = [];
  try {
    const { data: faqData } = await supabase
      .from("faq")
      .select("id, pertanyaan, jawaban, urutan")
      .order("urutan", { ascending: true });

    if (faqData && faqData.length > 0) {
      faqList = faqData as FaqItem[];
    }
  } catch (err) {
    console.error("Error fetching faq:", err);
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
