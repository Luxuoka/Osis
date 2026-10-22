"use client";

import { useState } from "react";
import { MessageSquare, Send, HelpCircle, Lightbulb, AlertTriangle, Handshake, Phone } from "lucide-react";
import { Toast } from "@/components/ui/Toast";
import { submitFeedbackAction } from "@/app/actions/feedback";
import { SITE_IDENTITY } from "@/lib/constants";

export function FeedbackSection() {
  const [nama, setNama] = useState("");
  const [email, setEmail] = useState("");
  const [telepon, setTelepon] = useState("");
  const [kategori, setKategori] = useState("Pertanyaan");
  const [pesan, setPesan] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [toast, setToast] = useState<{ show: boolean; type: "success" | "error"; message: string }>({
    show: false,
    type: "success",
    message: "",
  });

  const categories = [
    { label: "Pertanyaan", icon: HelpCircle, color: "text-blue-500" },
    { label: "Saran", icon: Lightbulb, color: "text-amber-500" },
    { label: "Kritik", icon: AlertTriangle, color: "text-red-500" },
    { label: "Kerjasama", icon: Handshake, color: "text-emerald-500" },
  ];

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!nama.trim() || !pesan.trim()) {
      setToast({
        show: true,
        type: "error",
        message: "Nama dan isi pesan wajib diisi.",
      });
      return;
    }

    setIsLoading(true);

    try {
      const formData = new FormData();
      formData.append("nama", nama);
      formData.append("email", email);
      formData.append("kategori", kategori);
      formData.append("judul", `Masukan dari ${nama} (${kategori})`);
      formData.append("isi", `${pesan}\n\nNo. HP/WA: ${telepon}`);
      formData.append("is_anonim", "false");

      const res = await submitFeedbackAction(null, formData);

      if (res.success) {
        setToast({
          show: true,
          type: "success",
          message: res.message || "Pesan berhasil dikirim!",
        });
        setNama("");
        setEmail("");
        setTelepon("");
        setPesan("");
      } else {
        setToast({
          show: true,
          type: "error",
          message: res.message || "Gagal mengirim pesan.",
        });
      }
    } catch {
      setToast({
        show: true,
        type: "error",
        message: "Terjadi kesalahan jaringan. Silakan coba lagi.",
      });
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <section id="kontak" className="relative py-16 sm:py-24 bg-white overflow-hidden">
      {/* Floating WhatsApp Button on right */}
      <a
        href={`https://wa.me/${SITE_IDENTITY.WHATSAPP}?text=Halo%20${encodeURIComponent(SITE_IDENTITY.NAMA_ORGANISASI)},%20saya%20ingin%20bertanya`}
        target="_blank"
        rel="noopener noreferrer"
        className="fixed bottom-6 right-6 z-40 w-14 h-14 rounded-full bg-[#25D366] text-white flex items-center justify-center shadow-xl hover:scale-110 active:scale-95 transition-all duration-300"
        aria-label="Hubungi via WhatsApp"
      >
        <Phone className="w-6 h-6 fill-white" />
      </a>

      <div className="max-w-2xl mx-auto px-4 sm:px-6 relative z-10">
        
        {/* Header */}
        <div className="text-center space-y-2 mb-8">
          <div className="w-12 h-12 rounded-2xl bg-blue-50 border border-blue-100 flex items-center justify-center mx-auto text-[#1A56DB] shadow-sm mb-3">
            <MessageSquare className="w-6 h-6" />
          </div>

          <h2 className="text-2xl sm:text-3xl font-black text-slate-900 tracking-tight">
            Kontak / Masukan
          </h2>

          <p className="text-xs sm:text-sm text-slate-500 max-w-md mx-auto">
            Punya pertanyaan, kritik, atau saran untuk {SITE_IDENTITY.NAMA_ORGANISASI}? Kirimkan pesanmu di sini.
          </p>
        </div>

        {/* Form Card */}
        <div className="bg-white rounded-3xl p-6 sm:p-8 shadow-xl border border-slate-100">
          
          <div className="flex items-center space-x-2 text-xs font-bold text-slate-700 uppercase tracking-wider mb-6 pb-3 border-b border-slate-100">
            <MessageSquare className="w-4 h-4 text-[#1A56DB]" />
            <span>Kirimkan Pesan Anda</span>
          </div>

          <form onSubmit={handleSubmit} className="space-y-4">
            
            {/* Nama Lengkap */}
            <div>
              <label className="block text-xs font-semibold text-slate-700 mb-1">
                Nama Lengkap
              </label>
              <input
                type="text"
                value={nama}
                onChange={(e) => setNama(e.target.value)}
                placeholder="Masukkan nama lengkap Anda"
                required
                className="w-full px-4 py-2.5 rounded-xl border border-slate-200 text-sm text-slate-800 placeholder-slate-400 focus:outline-none focus:border-[#1A56DB] focus:ring-2 focus:ring-blue-100 transition-all"
              />
            </div>

            {/* Email */}
            <div>
              <label className="block text-xs font-semibold text-slate-700 mb-1">
                Alamat Email
              </label>
              <input
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="nama@email.com"
                className="w-full px-4 py-2.5 rounded-xl border border-slate-200 text-sm text-slate-800 placeholder-slate-400 focus:outline-none focus:border-[#1A56DB] focus:ring-2 focus:ring-blue-100 transition-all"
              />
            </div>

            {/* Kategori Pills (2x2 Grid) */}
            <div>
              <label className="block text-xs font-semibold text-slate-700 mb-2">
                Kategori Pesan
              </label>
              <div className="grid grid-cols-2 gap-2">
                {categories.map((cat) => {
                  const Icon = cat.icon;
                  const isSelected = kategori === cat.label;
                  return (
                    <button
                      key={cat.label}
                      type="button"
                      onClick={() => setKategori(cat.label)}
                      className={`flex items-center space-x-2 px-3 py-2 rounded-xl text-xs font-semibold border transition-all text-left ${
                        isSelected
                          ? "bg-blue-50 border-[#1A56DB] text-[#1A56DB] shadow-sm"
                          : "bg-slate-50 border-slate-200 text-slate-600 hover:bg-slate-100"
                      }`}
                    >
                      <Icon className={`w-3.5 h-3.5 ${cat.color}`} />
                      <span>{cat.label}</span>
                    </button>
                  );
                })}
              </div>
            </div>

            {/* Nomor Telepon / WA */}
            <div>
              <label className="block text-xs font-semibold text-slate-700 mb-1">
                Nomor Telepon / WhatsApp
              </label>
              <input
                type="tel"
                value={telepon}
                onChange={(e) => setTelepon(e.target.value)}
                placeholder="0812xxxxxxx"
                className="w-full px-4 py-2.5 rounded-xl border border-slate-200 text-sm text-slate-800 placeholder-slate-400 focus:outline-none focus:border-[#1A56DB] focus:ring-2 focus:ring-blue-100 transition-all"
              />
            </div>

            {/* Pesan */}
            <div>
              <label className="block text-xs font-semibold text-slate-700 mb-1">
                Isi Pesan
              </label>
              <textarea
                rows={4}
                value={pesan}
                onChange={(e) => setPesan(e.target.value)}
                placeholder="Tuliskan masukan, pertanyaan, atau saran Anda..."
                required
                className="w-full px-4 py-2.5 rounded-xl border border-slate-200 text-sm text-slate-800 placeholder-slate-400 focus:outline-none focus:border-[#1A56DB] focus:ring-2 focus:ring-blue-100 transition-all resize-none"
              />
            </div>

            {/* Submit Button */}
            <div className="pt-2">
              <button
                type="submit"
                disabled={isLoading}
                className="w-full py-3 rounded-full font-bold text-white bg-[#1A56DB] hover:bg-[#1442AB] shadow-lg shadow-blue-500/20 transition-all duration-200 hover:scale-[1.01] active:scale-[0.98] text-sm flex items-center justify-center space-x-2 disabled:opacity-50"
              >
                <Send className="w-4 h-4" />
                <span>{isLoading ? "Mengirimkan..." : "Kirim Masukan"}</span>
              </button>
            </div>

          </form>
        </div>

      </div>

      <Toast
        show={toast.show}
        type={toast.type}
        message={toast.message}
        onClose={() => setToast({ ...toast, show: false })}
      />
    </section>
  );
}
