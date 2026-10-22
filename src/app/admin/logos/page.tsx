"use client";

import { useState, useEffect } from "react";
import Image from "next/image";
import { Sparkles, Plus, Edit3, Trash2, X, Download } from "lucide-react";
import { createClient } from "@/lib/supabase/client";
import { Toast } from "@/components/ui/Toast";

interface LogoItem {
  id: string;
  judul: string;
  kategori: "sekolah" | "osis" | "jurusan" | "ekstrakurikuler";
  file_url: string;
  format: string;
  resolusi: string;
}

export default function AdminLogosPage() {
  const [logoList, setLogoList] = useState<LogoItem[]>([]);
  const [modalOpen, setModalOpen] = useState(false);
  const [editingItem, setEditingItem] = useState<LogoItem | null>(null);

  const [judul, setJudul] = useState("");
  const [kategori, setKategori] = useState<"sekolah" | "osis" | "jurusan" | "ekstrakurikuler">("osis");
  const [fileUrl, setFileUrl] = useState("");
  const [format, setFormat] = useState("PNG Transparan");
  const [resolusi, setResolusi] = useState("800 x 800 (HD)");
  const [isSaving, setIsSaving] = useState(false);

  const [toast, setToast] = useState<{ show: boolean; type: "success" | "error"; message: string }>({
    show: false,
    type: "success",
    message: "",
  });

  const fetchLogos = async () => {
    try {
      const supabase = createClient();
      const { data } = await supabase.from("logo").select("*").order("created_at", { ascending: false });
      if (data) setLogoList(data as LogoItem[]);
    } catch (e) {
      console.error(e);
    }
  };

  useEffect(() => {
    fetchLogos();
  }, []);

  const openAdd = () => {
    setEditingItem(null);
    setJudul("");
    setKategori("osis");
    setFileUrl("/osis-logo.jpeg");
    setFormat("JPEG / High-Res");
    setResolusi("800 x 800 (HD)");
    setModalOpen(true);
  };

  const openEdit = (item: LogoItem) => {
    setEditingItem(item);
    setJudul(item.judul);
    setKategori(item.kategori);
    setFileUrl(item.file_url);
    setFormat(item.format);
    setResolusi(item.resolusi);
    setModalOpen(true);
  };

  const handleSave = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!judul || !fileUrl) return;

    setIsSaving(true);
    try {
      const supabase = createClient();
      const payload = { judul, kategori, file_url: fileUrl, format, resolusi };

      if (editingItem) {
        await supabase.from("logo").update(payload).eq("id", editingItem.id);
        setToast({ show: true, type: "success", message: "Logo berhasil diperbarui." });
      } else {
        await supabase.from("logo").insert(payload);
        setToast({ show: true, type: "success", message: "Logo baru berhasil ditambahkan." });
      }
      setModalOpen(false);
      fetchLogos();
    } catch {
      setToast({ show: true, type: "error", message: "Gagal menyimpan data." });
    } finally {
      setIsSaving(false);
    }
  };

  const handleDelete = async (id: string) => {
    if (!confirm("Hapus aset logo ini?")) return;
    try {
      const supabase = createClient();
      await supabase.from("logo").delete().eq("id", id);
      setLogoList((prev) => prev.filter((l) => l.id !== id));
      setToast({ show: true, type: "success", message: "Logo dihapus." });
    } catch {
      setToast({ show: true, type: "error", message: "Gagal menghapus." });
    }
  };

  return (
    <div className="space-y-6">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h1 className="text-2xl font-black text-white tracking-tight">
            Kelola Galeri Logo & Aset Grafis
          </h1>
          <p className="text-xs text-slate-400 mt-1">
            Daftar logo resmi resolusi tinggi yang dapat diunduh publik.
          </p>
        </div>

        <button
          type="button"
          onClick={openAdd}
          className="px-4 py-2.5 rounded-xl bg-gradient-to-r from-amber-400 to-amber-500 text-slate-950 font-bold text-xs shadow-md flex items-center space-x-2"
        >
          <Plus className="w-4 h-4" />
          <span>Tambah Aset Logo</span>
        </button>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
        {logoList.map((logo) => (
          <div
            key={logo.id}
            className="glass-card rounded-2xl p-5 border border-slate-800 flex flex-col justify-between group shadow-xl"
          >
            <div>
              <div className="relative aspect-square w-full rounded-xl bg-slate-950 p-4 border border-slate-800 flex items-center justify-center mb-3">
                <Image
                  src={logo.file_url}
                  alt={logo.judul}
                  width={120}
                  height={120}
                  className="max-h-full max-w-full object-contain"
                />
                <span className="absolute top-2 right-2 text-[10px] uppercase font-bold px-2 py-0.5 rounded bg-slate-900 text-amber-400 border border-slate-700">
                  {logo.kategori}
                </span>
              </div>

              <h3 className="text-xs font-bold text-white line-clamp-1">{logo.judul}</h3>
              <p className="text-[11px] text-slate-500 mt-1">{logo.format} &bull; {logo.resolusi}</p>
            </div>

            <div className="pt-3 mt-3 border-t border-slate-800 flex justify-end space-x-2">
              <button
                type="button"
                onClick={() => openEdit(logo)}
                className="p-1.5 rounded-lg bg-slate-900 hover:bg-slate-800 text-slate-300 border border-slate-700"
              >
                <Edit3 className="w-3.5 h-3.5" />
              </button>
              <button
                type="button"
                onClick={() => handleDelete(logo.id)}
                className="p-1.5 rounded-lg bg-rose-500/10 hover:bg-rose-500/20 text-rose-400"
              >
                <Trash2 className="w-3.5 h-3.5" />
              </button>
            </div>
          </div>
        ))}
      </div>

      {modalOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-sm">
          <div className="relative w-full max-w-md bg-slate-950 rounded-3xl border border-slate-800 shadow-2xl p-6 space-y-4">
            <div className="flex items-center justify-between pb-3 border-b border-slate-800">
              <h2 className="text-sm font-black text-white">
                {editingItem ? "Edit Aset Logo" : "Tambah Aset Logo"}
              </h2>
              <button type="button" onClick={() => setModalOpen(false)}>
                <X className="w-5 h-5 text-slate-400" />
              </button>
            </div>

            <form onSubmit={handleSave} className="space-y-4 text-xs">
              <div>
                <label className="block font-semibold text-slate-300 mb-1">
                  Nama / Judul Logo <span className="text-amber-400">*</span>
                </label>
                <input
                  type="text"
                  required
                  value={judul}
                  onChange={(e) => setJudul(e.target.value)}
                  className="w-full px-3 py-2 rounded-xl bg-slate-900 border border-slate-700 text-white"
                />
              </div>

              <div>
                <label className="block font-semibold text-slate-300 mb-1">
                  Kategori
                </label>
                <select
                  value={kategori}
                  onChange={(e) => setKategori(e.target.value as any)}
                  className="w-full px-3 py-2 rounded-xl bg-slate-900 border border-slate-700 text-white"
                >
                  <option value="sekolah">Sekolah</option>
                  <option value="osis">OSIS</option>
                  <option value="jurusan">Jurusan</option>
                  <option value="ekstrakurikuler">Ekstrakurikuler</option>
                </select>
              </div>

              <div>
                <label className="block font-semibold text-slate-300 mb-1">
                  URL File Logo (Cloudinary / File Lokal / SVG)
                </label>
                <input
                  type="text"
                  required
                  value={fileUrl}
                  onChange={(e) => setFileUrl(e.target.value)}
                  className="w-full px-3 py-2 rounded-xl bg-slate-900 border border-slate-700 text-white"
                />
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="block font-semibold text-slate-300 mb-1">
                    Format File
                  </label>
                  <input
                    type="text"
                    value={format}
                    onChange={(e) => setFormat(e.target.value)}
                    className="w-full px-3 py-2 rounded-xl bg-slate-900 border border-slate-700 text-white"
                  />
                </div>
                <div>
                  <label className="block font-semibold text-slate-300 mb-1">
                    Resolusi
                  </label>
                  <input
                    type="text"
                    value={resolusi}
                    onChange={(e) => setResolusi(e.target.value)}
                    className="w-full px-3 py-2 rounded-xl bg-slate-900 border border-slate-700 text-white"
                  />
                </div>
              </div>

              <div className="flex justify-end space-x-2 pt-3 border-t border-slate-800">
                <button
                  type="button"
                  onClick={() => setModalOpen(false)}
                  className="px-4 py-2 rounded-xl bg-slate-900 text-slate-400 text-xs"
                >
                  Batal
                </button>
                <button
                  type="submit"
                  disabled={isSaving}
                  className="px-5 py-2 rounded-xl bg-amber-400 text-slate-950 font-bold text-xs"
                >
                  {isSaving ? "Menyimpan..." : "Simpan Logo"}
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      <Toast
        show={toast.show}
        type={toast.type}
        message={toast.message}
        onClose={() => setToast((prev) => ({ ...prev, show: false }))}
      />
    </div>
  );
}
