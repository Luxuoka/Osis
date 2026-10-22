"use client";

import { useState, useEffect } from "react";
import {
  MessageSquare,
  CheckCircle,
  Trash2,
  Filter,
  Eye,
  Mail,
  UserCheck,
  Check,
  AlertTriangle,
} from "lucide-react";
import { createClient } from "@/lib/supabase/client";
import { Toast } from "@/components/ui/Toast";
import { formatDate } from "@/lib/utils";

interface MasukanItem {
  id: string;
  nama: string | null;
  email: string | null;
  kategori: string;
  judul: string;
  isi: string;
  is_anonim: boolean;
  is_dibaca: boolean;
  created_at: string;
}

export default function AdminMasukanPage() {
  const [masukanList, setMasukanList] = useState<MasukanItem[]>([]);
  const [kategoriFilter, setKategoriFilter] = useState("Semua");
  const [isLoading, setIsLoading] = useState(true);
  const [selectedItem, setSelectedItem] = useState<MasukanItem | null>(null);
  const [toast, setToast] = useState<{ show: boolean; type: "success" | "error"; message: string }>({
    show: false,
    type: "success",
    message: "",
  });

  const fetchMasukan = async () => {
    setIsLoading(true);
    try {
      const supabase = createClient();
      const { data } = await supabase
        .from("masukan")
        .select("*")
        .order("created_at", { ascending: false });

      if (data) {
        setMasukanList(data as MasukanItem[]);
      }
    } catch (e) {
      console.error("Error fetching masukan:", e);
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    fetchMasukan();
  }, []);

  const handleToggleRead = async (item: MasukanItem) => {
    try {
      const supabase = createClient();
      const newStatus = !item.is_dibaca;
      await supabase
        .from("masukan")
        .update({ is_dibaca: newStatus })
        .eq("id", item.id);

      setMasukanList((prev) =>
        prev.map((m) => (m.id === item.id ? { ...m, is_dibaca: newStatus } : m))
      );
      if (selectedItem?.id === item.id) {
        setSelectedItem((prev) => (prev ? { ...prev, is_dibaca: newStatus } : null));
      }
    } catch {
      setToast({ show: true, type: "error", message: "Gagal memperbarui status." });
    }
  };

  const handleDelete = async (id: string) => {
    if (!confirm("Apakah Anda yakin ingin menghapus masukan ini?")) return;

    try {
      const supabase = createClient();
      await supabase.from("masukan").delete().eq("id", id);
      setMasukanList((prev) => prev.filter((m) => m.id !== id));
      if (selectedItem?.id === id) setSelectedItem(null);
      setToast({ show: true, type: "success", message: "Masukan berhasil dihapus." });
    } catch {
      setToast({ show: true, type: "error", message: "Gagal menghapus masukan." });
    }
  };

  const filteredList = masukanList.filter((m) =>
    kategoriFilter === "Semua" ? true : m.kategori === kategoriFilter
  );

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h1 className="text-2xl font-black text-white tracking-tight">
            Kotak Masukan & Aspirasi Siswa
          </h1>
          <p className="text-xs text-slate-400 mt-1">
            Menerima ide kreatif, kritik membangun, apresiasi, dan pertanyaan dari siswa.
          </p>
        </div>
      </div>

      {/* Filter Kategori */}
      <div className="flex flex-wrap items-center gap-2">
        {["Semua", "Saran & Ide", "Kritik", "Apresiasi", "Pertanyaan"].map((cat) => (
          <button
            key={cat}
            type="button"
            onClick={() => setKategoriFilter(cat)}
            className={`px-3.5 py-1.5 rounded-xl text-xs font-bold transition-all ${
              kategoriFilter === cat
                ? "bg-amber-400 text-slate-950 shadow-md"
                : "bg-slate-900 border border-slate-800 text-slate-400 hover:text-white"
            }`}
          >
            {cat}
          </button>
        ))}
      </div>

      {/* Grid Masukan */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
        
        {/* List Kolom Kiri */}
        <div className="lg:col-span-6 space-y-3">
          {isLoading ? (
            <div className="glass-card rounded-2xl p-8 text-center text-xs text-slate-500">
              Memuat data masukan...
            </div>
          ) : filteredList.length === 0 ? (
            <div className="glass-card rounded-2xl p-8 text-center text-xs text-slate-500">
              Belum ada masukan untuk kategori ini.
            </div>
          ) : (
            filteredList.map((m) => (
              <div
                key={m.id}
                onClick={() => setSelectedItem(m)}
                className={`glass-card rounded-2xl p-4 border transition-all cursor-pointer relative ${
                  selectedItem?.id === m.id
                    ? "border-amber-400 bg-slate-900"
                    : m.is_dibaca
                    ? "border-slate-800 opacity-75 hover:opacity-100"
                    : "border-blue-500/40 bg-gradient-to-r from-blue-950/20 to-slate-900"
                }`}
              >
                {!m.is_dibaca && (
                  <span className="absolute top-4 right-4 w-2 h-2 rounded-full bg-blue-400 animate-pulse" />
                )}

                <div className="flex items-center space-x-2 text-xs text-amber-400 font-bold mb-1">
                  <span>{m.kategori}</span>
                  <span className="text-slate-600">&bull;</span>
                  <span className="text-[11px] text-slate-500 font-normal">
                    {formatDate(m.created_at)}
                  </span>
                </div>

                <h3 className="text-sm font-bold text-white mb-1 line-clamp-1">
                  {m.judul}
                </h3>

                <p className="text-xs text-slate-400 line-clamp-2">
                  {m.isi}
                </p>

                <div className="mt-3 flex items-center justify-between text-[11px] text-slate-500 pt-2 border-t border-slate-800/80">
                  <span>{m.is_anonim ? "Anonim (Siswa)" : m.nama || "Siswa"}</span>
                  <span className={m.is_dibaca ? "text-slate-500" : "text-emerald-400 font-bold"}>
                    {m.is_dibaca ? "Sudah Dibaca" : "Belum Dibaca"}
                  </span>
                </div>
              </div>
            ))
          )}
        </div>

        {/* Detail Kolom Kanan */}
        <div className="lg:col-span-6">
          {selectedItem ? (
            <div className="glass-card rounded-3xl p-6 sm:p-8 border border-slate-800 shadow-xl space-y-6 sticky top-24">
              <div className="flex items-center justify-between pb-4 border-b border-slate-800">
                <span className="text-xs font-bold px-3 py-1 rounded-full bg-amber-500/10 text-amber-400 border border-amber-500/20">
                  {selectedItem.kategori}
                </span>

                <div className="flex items-center space-x-2">
                  <button
                    type="button"
                    onClick={() => handleToggleRead(selectedItem)}
                    className="p-2 rounded-xl bg-slate-900 hover:bg-slate-800 text-xs text-slate-300 hover:text-white border border-slate-700 flex items-center space-x-1"
                    title={selectedItem.is_dibaca ? "Tandai Belum Dibaca" : "Tandai Sudah Dibaca"}
                  >
                    <CheckCircle className={`w-4 h-4 ${selectedItem.is_dibaca ? "text-emerald-400" : "text-slate-500"}`} />
                    <span className="text-[11px]">{selectedItem.is_dibaca ? "Dibaca" : "Tandai Baca"}</span>
                  </button>

                  <button
                    type="button"
                    onClick={() => handleDelete(selectedItem.id)}
                    className="p-2 rounded-xl bg-rose-500/10 hover:bg-rose-500/20 text-rose-400 border border-rose-500/30"
                    title="Hapus Masukan"
                  >
                    <Trash2 className="w-4 h-4" />
                  </button>
                </div>
              </div>

              <div>
                <h2 className="text-lg font-black text-white leading-snug">
                  {selectedItem.judul}
                </h2>
                <div className="text-xs text-slate-400 mt-2 space-y-0.5">
                  <div className="flex items-center space-x-2">
                    <span className="text-slate-500">Pengirim:</span>
                    <span className="text-white font-semibold">
                      {selectedItem.is_anonim ? "Anonim (Privasi Terjaga)" : selectedItem.nama || "Siswa"}
                    </span>
                  </div>
                  {!selectedItem.is_anonim && selectedItem.email && (
                    <div className="flex items-center space-x-2">
                      <span className="text-slate-500">Email:</span>
                      <span className="text-blue-400">{selectedItem.email}</span>
                    </div>
                  )}
                  <div className="flex items-center space-x-2">
                    <span className="text-slate-500">Waktu:</span>
                    <span>{formatDate(selectedItem.created_at)}</span>
                  </div>
                </div>
              </div>

              <div className="p-5 rounded-2xl bg-slate-900 border border-slate-800 text-slate-300 text-xs sm:text-sm leading-relaxed whitespace-pre-line">
                {selectedItem.isi}
              </div>
            </div>
          ) : (
            <div className="glass-card rounded-3xl p-12 text-center text-xs text-slate-500 border border-slate-800 flex flex-col items-center justify-center space-y-3">
              <MessageSquare className="w-10 h-10 text-slate-600" />
              <span>Pilih salah satu pesan masukan dari daftar di samping untuk melihat rincian lengkap.</span>
            </div>
          )}
        </div>

      </div>

      <Toast
        show={toast.show}
        type={toast.type}
        message={toast.message}
        onClose={() => setToast((prev) => ({ ...prev, show: false }))}
      />
    </div>
  );
}
