import { MessageSquare, ShieldCheck, HeartHandshake, HelpCircle } from "lucide-react";
import { FeedbackSection } from "@/components/home/FeedbackSection";
import { SITE_IDENTITY } from "@/lib/constants";

export const metadata = {
  title: "Kotak Masukan & Aspirasi Siswa",
  description: `Sampaikan ide, kritik, saran, atau apresiasi untuk ${SITE_IDENTITY.NAMA_ORGANISASI}.`,
};

export default function DedicatedFeedbackPage() {
  return (
    <div className="relative min-h-screen pt-12 pb-16 bg-white overflow-hidden text-slate-900">
      {/* Feedback Section Form */}
      <FeedbackSection />

      {/* Info Tambahan seputar Aspirasi */}
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 mt-4">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <div className="bg-white rounded-2xl p-6 border border-slate-100 shadow-sm text-center space-y-2">
            <div className="w-10 h-10 rounded-xl bg-amber-50 border border-amber-200 text-[#FDB813] flex items-center justify-center mx-auto">
              <ShieldCheck className="w-5 h-5" />
            </div>
            <h3 className="text-sm font-bold text-slate-900">Privasi Terjamin</h3>
            <p className="text-xs text-slate-500">
              Opsi formulir aman menjamin identitas dan pesan Anda terlindungi secara bertanggung jawab.
            </p>
          </div>

          <div className="bg-white rounded-2xl p-6 border border-slate-100 shadow-sm text-center space-y-2">
            <div className="w-10 h-10 rounded-xl bg-blue-50 border border-blue-200 text-[#1A56DB] flex items-center justify-center mx-auto">
              <HeartHandshake className="w-5 h-5" />
            </div>
            <h3 className="text-sm font-bold text-slate-900">Ditinjau Rutin</h3>
            <p className="text-xs text-slate-500">
              Setiap pesan yang masuk akan dibahas dalam koordinasi pengurus OSIS secara berkala.
            </p>
          </div>

          <div className="bg-white rounded-2xl p-6 border border-slate-100 shadow-sm text-center space-y-2">
            <div className="w-10 h-10 rounded-xl bg-emerald-50 border border-emerald-200 text-emerald-600 flex items-center justify-center mx-auto">
              <HelpCircle className="w-5 h-5" />
            </div>
            <h3 className="text-sm font-bold text-slate-900">Solutif & Terbuka</h3>
            <p className="text-xs text-slate-500">
              Kritik membangun menjadi bahan evaluasi peningkatan mutu kegiatan siswa {SITE_IDENTITY.NAMA_SEKOLAH}.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}
