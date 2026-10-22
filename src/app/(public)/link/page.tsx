import Link from "next/link";
import {
  ExternalLink,
  Globe,
  BookOpen,
  Instagram,
  MessageSquare,
  Sparkles,
  Link2,
} from "lucide-react";
import { createClientServer } from "@/lib/supabase/server";
import { SITE_IDENTITY } from "@/lib/constants";

export const revalidate = 120; // ISR

const IconMap: { [key: string]: any } = {
  Globe: Globe,
  BookOpen: BookOpen,
  Instagram: Instagram,
  MessageSquare: MessageSquare,
  Link: Link2,
};

export default async function ImportantLinksPage() {
  const supabase = await createClientServer();

  const { data: dbLinks } = await supabase
    .from("tautan")
    .select("*")
    .order("urutan", { ascending: true });

  const defaultLinks = [
    {
      id: "1",
      judul: "Website Resmi SMA Santa Maria 1 Bandung",
      deskripsi: "Portal profil sekolah, informasi akademik, dan kegiatan siswa resmi SMA Santa Maria 1 Bandung.",
      url: `https://${SITE_IDENTITY.DOMAIN}`,
      ikon: "Globe",
    },
    {
      id: "2",
      judul: "Sistem Informasi Belajar (E-Learning)",
      deskripsi: "Platform kegiatan belajar mengajar online terintegrasi siswa dan guru SMA Santa Maria 1 Bandung.",
      url: `https://elearning.${SITE_IDENTITY.DOMAIN}`,
      ikon: "BookOpen",
    },
    {
      id: "3",
      judul: "Instagram Resmi OSIS Santa Maria 1",
      deskripsi: "Publikasi visual harian, poster kegiatan, dan dokumentasi program kerja OSIS SMA Santa Maria 1 Bandung.",
      url: SITE_IDENTITY.INSTAGRAM,
      ikon: "Instagram",
    },
    {
      id: "4",
      judul: "Pusat Kotak Masukan & Aspirasi",
      deskripsi: "Kanal respon cepat penyampaian ide, kritik, dan saran untuk kemajuan bersama.",
      url: "/masukan",
      ikon: "MessageSquare",
    },
  ];

  const links = dbLinks && dbLinks.length > 0 ? dbLinks : defaultLinks;

  return (
    <div className="relative min-h-screen pt-28 pb-20 bg-brand-dark overflow-hidden">
      {/* Ambient Glow */}
      <div className="absolute top-0 right-1/4 w-[600px] h-[500px] bg-purple-600/10 rounded-full blur-[140px] pointer-events-none" />

      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        
        {/* Header */}
        <div className="text-center space-y-3 mb-14">
          <div className="inline-flex items-center space-x-2 px-3.5 py-1.5 rounded-full bg-purple-500/10 border border-purple-500/20 text-purple-400 text-xs font-semibold uppercase tracking-wider">
            <Link2 className="w-3.5 h-3.5" />
            <span>Direktori Portal Digital</span>
          </div>

          <h1 className="text-3xl sm:text-4xl lg:text-5xl font-black text-white tracking-tight">
            Tautan Penting & Layanan Terpadu
          </h1>

          <p className="text-sm sm:text-base text-slate-400 max-w-xl mx-auto">
            Kumpulan jalan pintas ke berbagai portal akademik, media sosial, dan layanan siswa {SITE_IDENTITY.NAMA_SEKOLAH}.
          </p>
        </div>

        {/* Grid Kartu Tautan */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {links.map((link, idx) => {
            const IconComponent = IconMap[link.ikon] || Link2;
            const isInternal = link.url.startsWith("/");

            return (
              <a
                key={link.id || idx}
                href={link.url}
                target={isInternal ? "_self" : "_blank"}
                rel={isInternal ? "" : "noopener noreferrer"}
                className="glass-card rounded-2xl p-6 sm:p-8 border border-slate-800 hover:border-amber-500/40 transition-all duration-300 hover:scale-[1.02] flex items-start space-x-5 group shadow-xl"
              >
                <div className="w-14 h-14 rounded-2xl bg-gradient-to-br from-blue-600/20 to-brand-navy p-3 border border-amber-500/30 flex items-center justify-center shrink-0 group-hover:scale-110 transition-transform duration-300">
                  <IconComponent className="w-7 h-7 text-amber-400" />
                </div>

                <div className="flex-1 space-y-2">
                  <div className="flex items-center justify-between">
                    <h2 className="text-base sm:text-lg font-bold text-white group-hover:text-amber-400 transition-colors">
                      {link.judul}
                    </h2>
                    <ExternalLink className="w-4 h-4 text-slate-500 group-hover:text-amber-400 transition-colors shrink-0 ml-2" />
                  </div>

                  <p className="text-xs sm:text-sm text-slate-400 leading-relaxed">
                    {link.deskripsi}
                  </p>

                  <span className="inline-block text-[11px] font-mono text-blue-400 font-medium pt-1">
                    {link.url.replace(/^https?:\/\//, "")}
                  </span>
                </div>
              </a>
            );
          })}
        </div>

      </div>
    </div>
  );
}
