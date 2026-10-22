"use client";

import { useState, useEffect } from "react";
import { Link2, Plus, Edit3, Trash2, X, ExternalLink } from "lucide-react";
import { createClient } from "@/lib/supabase/client";
import { Toast } from "@/components/ui/Toast";

interface TautanItem {
  id: string;
  judul: string;
  deskripsi: string | null;
  url: string;
  ikon: string;
  urutan: number;
}

export default function AdminTautanPage() {
  const [tautanList, setTautanList] = useState<TautanItem[]>([]);
  const [modalOpen, setModalOpen] = useState(false);
  const [editingItem, setEditingItem] = useState<TautanItem | null>(null);

  const [judul, setJudul] = useState("");
  const [deskripsi, setDeskripsi] = useState("");
  const [url, setUrl] = useState("");
  const [ikon, setIkon] = useState("Globe");
  const [urutan, setUrutan] = useState(1);
  const [isSaving, setIsSaving] = useState(false);

  const [toast, setToast] = useState<{ show: boolean; type: "success" | "error"; message: string }>({
    show: false,
    type: "success",
    message: "",
  });

  const fetchTautan = async () => {
    try {
      const supabase = createClient();
      const { data } = await supabase.from("tautan").select("*").order("urutan", { ascending: true });
      if (data) setTautanList(data as TautanItem[]);
    } catch (e) {
      console.error(e);
    }
  };

  useEffect(() => {
    fetchTautan();
  }, []);

  const openAdd = () => {
    setEditingItem(null);
    setJudul("");
    setDeskripsi("");
    setUrl("https://");
    setIkon("Globe");
    setUrutan(tautanList.length + 1);
    setModalOpen(true);
  };

  const openEdit = (item: TautanItem) => {
    setEditingItem(item);
    setJudul(item.judul);
    setDeskripsi(item.deskripsi || "");
    setUrl(item.url);
    setIkon(item.ikon);
    setUrutan(item.urutan);
    setModalOpen(true);
  };

  const handleSave = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!judul || !url) return;

    setIsSaving(true);
    try {
      const supabase = createClient();
      const payload = { judul, deskripsi: deskripsi || null, url, ikon, urutan: Number(urutan) };

      if (editingItem) {
        await supabase.from("tautan").update(payload).eq("id", editingItem.id);
        setToast({ show: true, type: "success", message: "Tautan berhasil diperbarui." });
      } else {
        await supabase.from("tautan").insert(payload);
        setToast({ show: true, type: "success", message: "Tautan berhasil ditambahkan." });
      }
      setModalOpen(false);
      fetchTautan();
    } catch {
      setToast({ show: true, type: "error", message: "Gagal menyimpan data." });
    } finally {
      setIsSaving(false);
    }
  };

  const handleDelete = async (id: string) => {
    if (!confirm("Hapus tautan ini?")) return;
    try {
      const supabase = createClient();
      await supabase.from("tautan").delete().eq("id", id);
      setTautanList((prev) => prev.filter((t) => t.id !== id));
      setToast({ show: true, type: "success", message: "Tautan dihapus." });
    } catch {
      setToast({ show: true, type: "error", message: "Gagal menghapus." });
    }
  };

  return (
    <div className="space-y-6">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h1 className="text-2xl font-black text-white tracking-tight">
            Kelola Direktori Tautan Penting
          </h1>
          <p className="text-xs text-slate-400 mt-1">
            Daftar pintasan portal sekolah, media sosial, dan platform eksternal.
          </p>
        </div>

        <button
          type="button"
          onClick={openAdd}
          className="px-4 py-2.5 rounded-xl bg-gradient-to-r from-purple-600 to-indigo-600 text-white font-bold text-xs shadow-md flex items-center space-x-2"
        >
          <Plus className="w-4 h-4" />
          <span>Tambah Tautan</span>
        </button>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {tautanList.map((t) => (
          <div
            key={t.id}
            className="glass-card rounded-2xl p-6 border border-slate-800 flex items-start justify-between gap-4"
          >
            <div className="space-y-1.5 flex-1">
              <span className="text-[10px] font-mono text-purple-400 font-bold bg-slate-900 px-2 py-0.5 rounded border border-slate-700">
                #{t.urutan} &bull; Ikon: {t.ikon}
              </span>
              <h3 className="text-base font-bold text-white">{t.judul}</h3>
              <p className="text-xs text-slate-400">{t.deskripsi}</p>
              <a
                href={t.url}
                target="_blank"
                rel="noreferrer"
                className="text-xs text-blue-400 hover:underline inline-flex items-center space-x-1 pt-1 font-mono"
              >
                <span>{t.url}</span>
                <ExternalLink className="w-3 h-3" />
              </a>
            </div>

            <div className="flex items-center space-x-1.5 shrink-0">
              <button
                type="button"
                onClick={() => openEdit(t)}
                className="p-2 rounded-lg bg-slate-900 hover:bg-slate-800 text-slate-300 border border-slate-700"
              >
                <Edit3 className="w-3.5 h-3.5" />
              </button>
              <button
                type="button"
                onClick={() => handleDelete(t.id)}
                className="p-2 rounded-lg bg-rose-500/10 hover:bg-rose-500/20 text-rose-400"
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
                {editingItem ? "Edit Tautan" : "Tambah Tautan Baru"}
              </h2>
              <button type="button" onClick={() => setModalOpen(false)}>
                <X className="w-5 h-5 text-slate-400" />
              </button>
            </div>

            <form onSubmit={handleSave} className="space-y-4 text-xs">
              <div>
                <label className="block font-semibold text-slate-300 mb-1">
                  Judul Tautan <span className="text-amber-400">*</span>
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
                  URL Tujuan <span className="text-amber-400">*</span>
                </label>
                <input
                  type="text"
                  required
                  value={url}
                  onChange={(e) => setUrl(e.target.value)}
                  className="w-full px-3 py-2 rounded-xl bg-slate-900 border border-slate-700 text-white"
                />
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="block font-semibold text-slate-300 mb-1">
                    Jenis Ikon
                  </label>
                  <select
                    value={ikon}
                    onChange={(e) => setIkon(e.target.value)}
                    className="w-full px-3 py-2 rounded-xl bg-slate-900 border border-slate-700 text-white"
                  >
                    <option value="Globe">Globe (Web)</option>
                    <option value="BookOpen">Buku (Belajar)</option>
                    <option value="Instagram">Instagram</option>
                    <option value="MessageSquare">Kotak Masukan</option>
                    <option value="Link">Tautan Umum</option>
                  </select>
                </div>

                <div>
                  <label className="block font-semibold text-slate-300 mb-1">
                    Nomor Urut
                  </label>
                  <input
                    type="number"
                    value={urutan}
                    onChange={(e) => setUrutan(Number(e.target.value))}
                    className="w-full px-3 py-2 rounded-xl bg-slate-900 border border-slate-700 text-white"
                  />
                </div>
              </div>

              <div>
                <label className="block font-semibold text-slate-300 mb-1">
                  Deskripsi
                </label>
                <textarea
                  rows={2}
                  value={deskripsi}
                  onChange={(e) => setDeskripsi(e.target.value)}
                  className="w-full px-3 py-2 rounded-xl bg-slate-900 border border-slate-700 text-white resize-none"
                />
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
                  className="px-5 py-2 rounded-xl bg-purple-600 text-white font-bold text-xs"
                >
                  {isSaving ? "Menyimpan..." : "Simpan"}
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
