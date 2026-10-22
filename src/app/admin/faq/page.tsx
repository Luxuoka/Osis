"use client";

import { useState, useEffect } from "react";
import { HelpCircle, Plus, Edit3, Trash2, X } from "lucide-react";
import { createClient } from "@/lib/supabase/client";
import { Toast } from "@/components/ui/Toast";

interface FaqItem {
  id: string;
  pertanyaan: string;
  jawaban: string;
  urutan: number;
}

export default function AdminFaqPage() {
  const [faqList, setFaqList] = useState<FaqItem[]>([]);
  const [modalOpen, setModalOpen] = useState(false);
  const [editingItem, setEditingItem] = useState<FaqItem | null>(null);

  const [pertanyaan, setPertanyaan] = useState("");
  const [jawaban, setJawaban] = useState("");
  const [urutan, setUrutan] = useState(1);
  const [isSaving, setIsSaving] = useState(false);

  const [toast, setToast] = useState<{ show: boolean; type: "success" | "error"; message: string }>({
    show: false,
    type: "success",
    message: "",
  });

  const fetchFaq = async () => {
    try {
      const supabase = createClient();
      const { data } = await supabase.from("faq").select("*").order("urutan", { ascending: true });
      if (data) setFaqList(data as FaqItem[]);
    } catch (e) {
      console.error(e);
    }
  };

  useEffect(() => {
    fetchFaq();
  }, []);

  const openAdd = () => {
    setEditingItem(null);
    setPertanyaan("");
    setJawaban("");
    setUrutan(faqList.length + 1);
    setModalOpen(true);
  };

  const openEdit = (item: FaqItem) => {
    setEditingItem(item);
    setPertanyaan(item.pertanyaan);
    setJawaban(item.jawaban);
    setUrutan(item.urutan);
    setModalOpen(true);
  };

  const handleSave = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!pertanyaan || !jawaban) return;

    setIsSaving(true);
    try {
      const supabase = createClient();
      const payload = { pertanyaan, jawaban, urutan: Number(urutan) };

      if (editingItem) {
        await supabase.from("faq").update(payload).eq("id", editingItem.id);
        setToast({ show: true, type: "success", message: "FAQ berhasil diperbarui." });
      } else {
        await supabase.from("faq").insert(payload);
        setToast({ show: true, type: "success", message: "FAQ baru berhasil ditambahkan." });
      }
      setModalOpen(false);
      fetchFaq();
    } catch {
      setToast({ show: true, type: "error", message: "Gagal menyimpan data." });
    } finally {
      setIsSaving(false);
    }
  };

  const handleDelete = async (id: string) => {
    if (!confirm("Hapus pertanyaan ini?")) return;
    try {
      const supabase = createClient();
      await supabase.from("faq").delete().eq("id", id);
      setFaqList((prev) => prev.filter((f) => f.id !== id));
      setToast({ show: true, type: "success", message: "FAQ dihapus." });
    } catch {
      setToast({ show: true, type: "error", message: "Gagal menghapus." });
    }
  };

  return (
    <div className="space-y-6">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h1 className="text-2xl font-black text-white tracking-tight">
            Kelola Tanya Jawab (FAQ)
          </h1>
          <p className="text-xs text-slate-400 mt-1">
            Pertanyaan dan panduan yang sering diajukan seputar seleksi dan organisasi OSIS.
          </p>
        </div>

        <button
          type="button"
          onClick={openAdd}
          className="px-4 py-2.5 rounded-xl bg-gradient-to-r from-amber-400 to-amber-500 text-slate-950 font-bold text-xs shadow-md flex items-center space-x-2"
        >
          <Plus className="w-4 h-4" />
          <span>Tambah Pertanyaan</span>
        </button>
      </div>

      <div className="space-y-4">
        {faqList.map((f) => (
          <div
            key={f.id}
            className="glass-card rounded-2xl p-6 border border-slate-800 flex items-start justify-between gap-4"
          >
            <div className="space-y-2">
              <div className="flex items-center space-x-2">
                <span className="text-[11px] font-mono text-amber-400 font-bold bg-slate-900 px-2 py-0.5 rounded border border-slate-700">
                  #{f.urutan}
                </span>
                <h3 className="text-sm font-bold text-white">{f.pertanyaan}</h3>
              </div>
              <p className="text-xs text-slate-400 leading-relaxed pl-8">
                {f.jawaban}
              </p>
            </div>

            <div className="flex items-center space-x-1.5 shrink-0">
              <button
                type="button"
                onClick={() => openEdit(f)}
                className="p-2 rounded-lg bg-slate-900 hover:bg-slate-800 text-slate-300 border border-slate-700"
              >
                <Edit3 className="w-3.5 h-3.5" />
              </button>
              <button
                type="button"
                onClick={() => handleDelete(f.id)}
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
          <div className="relative w-full max-w-lg bg-slate-950 rounded-3xl border border-slate-800 shadow-2xl p-6 space-y-4">
            <div className="flex items-center justify-between pb-3 border-b border-slate-800">
              <h2 className="text-sm font-black text-white">
                {editingItem ? "Edit Tanya Jawab" : "Tambah Tanya Jawab Baru"}
              </h2>
              <button type="button" onClick={() => setModalOpen(false)}>
                <X className="w-5 h-5 text-slate-400" />
              </button>
            </div>

            <form onSubmit={handleSave} className="space-y-4 text-xs">
              <div>
                <label className="block font-semibold text-slate-300 mb-1">
                  Pertanyaan <span className="text-amber-400">*</span>
                </label>
                <input
                  type="text"
                  required
                  value={pertanyaan}
                  onChange={(e) => setPertanyaan(e.target.value)}
                  className="w-full px-3 py-2 rounded-xl bg-slate-900 border border-slate-700 text-white"
                />
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

              <div>
                <label className="block font-semibold text-slate-300 mb-1">
                  Jawaban Penjelasan <span className="text-amber-400">*</span>
                </label>
                <textarea
                  rows={4}
                  required
                  value={jawaban}
                  onChange={(e) => setJawaban(e.target.value)}
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
                  className="px-5 py-2 rounded-xl bg-amber-400 text-slate-950 font-bold text-xs"
                >
                  {isSaving ? "Menyimpan..." : "Simpan FAQ"}
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
