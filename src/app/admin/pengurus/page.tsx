"use client";

import { useState, useEffect } from "react";
import Image from "next/image";
import { Users, Plus, Edit3, Trash2, X, Instagram, ShieldCheck } from "lucide-react";
import { createClient } from "@/lib/supabase/client";
import { Toast } from "@/components/ui/Toast";

interface PengurusItem {
  id: string;
  nama: string;
  jabatan: string;
  tipe: "inti" | "departemen";
  departemen_id: string | null;
  foto_url: string | null;
  urutan: number;
  instagram: string | null;
}

export default function AdminPengurusPage() {
  const [pengurusList, setPengurusList] = useState<PengurusItem[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [modalOpen, setModalOpen] = useState(false);
  const [editingItem, setEditingItem] = useState<PengurusItem | null>(null);

  // Form State
  const [nama, setNama] = useState("");
  const [jabatan, setJabatan] = useState("");
  const [tipe, setTipe] = useState<"inti" | "departemen">("inti");
  const [fotoUrl, setFotoUrl] = useState("");
  const [urutan, setUrutan] = useState(1);
  const [instagram, setInstagram] = useState("");
  const [isSaving, setIsSaving] = useState(false);

  const [toast, setToast] = useState<{ show: boolean; type: "success" | "error"; message: string }>({
    show: false,
    type: "success",
    message: "",
  });

  const fetchPengurus = async () => {
    setIsLoading(true);
    try {
      const supabase = createClient();
      const { data } = await supabase
        .from("pengurus")
        .select("*")
        .order("urutan", { ascending: true });
      if (data) setPengurusList(data as PengurusItem[]);
    } catch (e) {
      console.error("Error fetching pengurus:", e);
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    fetchPengurus();
  }, []);

  const openAddModal = () => {
    setEditingItem(null);
    setNama("");
    setJabatan("");
    setTipe("inti");
    setFotoUrl("");
    setUrutan(pengurusList.length + 1);
    setInstagram("");
    setModalOpen(true);
  };

  const openEditModal = (item: PengurusItem) => {
    setEditingItem(item);
    setNama(item.nama);
    setJabatan(item.jabatan);
    setTipe(item.tipe);
    setFotoUrl(item.foto_url || "");
    setUrutan(item.urutan);
    setInstagram(item.instagram || "");
    setModalOpen(true);
  };

  const handleSave = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!nama || !jabatan) {
      setToast({ show: true, type: "error", message: "Nama dan jabatan wajib diisi." });
      return;
    }

    setIsSaving(true);
    try {
      const supabase = createClient();
      const payload = {
        nama,
        jabatan,
        tipe,
        foto_url: fotoUrl || `https://ui-avatars.com/api/?name=${encodeURIComponent(nama)}&background=0F2744&color=F59E0B`,
        urutan: Number(urutan),
        instagram: instagram || null,
      };

      if (editingItem) {
        const { error } = await supabase
          .from("pengurus")
          .update(payload)
          .eq("id", editingItem.id);
        if (error) throw error;
        setToast({ show: true, type: "success", message: "Data pengurus berhasil diperbarui." });
      } else {
        const { error } = await supabase.from("pengurus").insert(payload);
        if (error) throw error;
        setToast({ show: true, type: "success", message: "Pengurus baru berhasil ditambahkan." });
      }

      setModalOpen(false);
      fetchPengurus();
    } catch (err: any) {
      setToast({ show: true, type: "error", message: err?.message || "Gagal menyimpan pengurus." });
    } finally {
      setIsSaving(false);
    }
  };

  const handleDelete = async (id: string) => {
    if (!confirm("Hapus pengurus ini dari daftar organisasi?")) return;
    try {
      const supabase = createClient();
      await supabase.from("pengurus").delete().eq("id", id);
      setPengurusList((prev) => prev.filter((p) => p.id !== id));
      setToast({ show: true, type: "success", message: "Pengurus berhasil dihapus." });
    } catch {
      setToast({ show: true, type: "error", message: "Gagal menghapus pengurus." });
    }
  };

  return (
    <div className="space-y-6">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h1 className="text-2xl font-black text-white tracking-tight">
            Kelola Struktur Pengurus OSIS
          </h1>
          <p className="text-xs text-slate-400 mt-1">
            Manajemen nama, jabatan, foto, dan urutan dewan pengurus.
          </p>
        </div>

        <button
          type="button"
          onClick={openAddModal}
          className="px-4 py-2.5 rounded-xl bg-gradient-to-r from-amber-400 to-amber-500 text-slate-950 font-bold text-xs shadow-lg shadow-amber-500/20 flex items-center space-x-2"
        >
          <Plus className="w-4 h-4" />
          <span>Tambah Pengurus</span>
        </button>
      </div>

      {/* Grid Pengurus */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
        {pengurusList.map((p) => (
          <div
            key={p.id}
            className="glass-card rounded-2xl p-5 border border-slate-800 flex flex-col items-center text-center justify-between group shadow-xl relative"
          >
            <span className="absolute top-3 left-3 text-[10px] font-mono bg-slate-900 border border-slate-700 px-2 py-0.5 rounded text-amber-400">
              #{p.urutan}
            </span>

            <div className="relative w-24 h-24 rounded-2xl overflow-hidden mb-3 mt-2 border border-slate-700 bg-slate-950">
              <Image
                src={p.foto_url || "https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=500&auto=format&fit=crop&q=80"}
                alt={p.nama}
                fill
                sizes="96px"
                className="object-cover"
              />
            </div>

            <div className="space-y-1 mb-4">
              <h3 className="text-sm font-bold text-white group-hover:text-amber-400 transition-colors">
                {p.nama}
              </h3>
              <span className="inline-block px-2.5 py-0.5 rounded-full bg-blue-500/10 text-blue-400 text-[11px] font-semibold border border-blue-500/20">
                {p.jabatan}
              </span>
              {p.instagram && (
                <span className="text-[10px] text-slate-500 block">
                  {p.instagram}
                </span>
              )}
            </div>

            <div className="w-full pt-3 border-t border-slate-800/80 flex items-center justify-center space-x-2">
              <button
                type="button"
                onClick={() => openEditModal(p)}
                className="px-3 py-1.5 rounded-lg bg-slate-900 hover:bg-slate-800 text-slate-200 border border-slate-700 text-xs font-semibold flex items-center space-x-1"
              >
                <Edit3 className="w-3 h-3" />
                <span>Edit</span>
              </button>
              <button
                type="button"
                onClick={() => handleDelete(p.id)}
                className="p-1.5 rounded-lg bg-rose-500/10 hover:bg-rose-500/20 text-rose-400 border border-rose-500/30"
              >
                <Trash2 className="w-3.5 h-3.5" />
              </button>
            </div>
          </div>
        ))}
      </div>

      {/* Modal Add/Edit */}
      {modalOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-sm">
          <div className="relative w-full max-w-lg bg-slate-950 rounded-3xl border border-slate-800 shadow-2xl p-6 sm:p-8 space-y-4">
            <div className="flex items-center justify-between pb-3 border-b border-slate-800">
              <h2 className="text-base font-black text-white">
                {editingItem ? "Edit Data Pengurus" : "Tambah Pengurus Baru"}
              </h2>
              <button
                type="button"
                onClick={() => setModalOpen(false)}
                className="p-1 rounded-lg text-slate-400 hover:text-white"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            <form onSubmit={handleSave} className="space-y-4 text-xs">
              <div>
                <label className="block font-semibold text-slate-300 mb-1">
                  Nama Lengkap <span className="text-amber-400">*</span>
                </label>
                <input
                  type="text"
                  required
                  value={nama}
                  onChange={(e) => setNama(e.target.value)}
                  placeholder="Contoh: Arya Satria Pratama"
                  className="w-full px-3.5 py-2.5 rounded-xl bg-slate-900 border border-slate-700 text-white text-xs focus:outline-none focus:border-amber-400"
                />
              </div>

              <div>
                <label className="block font-semibold text-slate-300 mb-1">
                  Jabatan Organisasi <span className="text-amber-400">*</span>
                </label>
                <input
                  type="text"
                  required
                  value={jabatan}
                  onChange={(e) => setJabatan(e.target.value)}
                  placeholder="Contoh: Ketua Umum / Ketua 1 / Bendahara"
                  className="w-full px-3.5 py-2.5 rounded-xl bg-slate-900 border border-slate-700 text-white text-xs focus:outline-none focus:border-amber-400"
                />
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="block font-semibold text-slate-300 mb-1">
                    Kelompok Tipe
                  </label>
                  <select
                    value={tipe}
                    onChange={(e) => setTipe(e.target.value as any)}
                    className="w-full px-3.5 py-2.5 rounded-xl bg-slate-900 border border-slate-700 text-white text-xs focus:outline-none focus:border-amber-400"
                  >
                    <option value="inti">Tim Inti</option>
                    <option value="departemen">Departemen</option>
                  </select>
                </div>

                <div>
                  <label className="block font-semibold text-slate-300 mb-1">
                    Nomor Urut Tampil
                  </label>
                  <input
                    type="number"
                    min={1}
                    value={urutan}
                    onChange={(e) => setUrutan(Number(e.target.value))}
                    className="w-full px-3.5 py-2.5 rounded-xl bg-slate-900 border border-slate-700 text-white text-xs focus:outline-none focus:border-amber-400"
                  />
                </div>
              </div>

              <div>
                <label className="block font-semibold text-slate-300 mb-1">
                  URL Foto Profil (Cloudinary / Unsplash)
                </label>
                <input
                  type="url"
                  value={fotoUrl}
                  onChange={(e) => setFotoUrl(e.target.value)}
                  placeholder="https://..."
                  className="w-full px-3.5 py-2.5 rounded-xl bg-slate-900 border border-slate-700 text-white text-xs focus:outline-none focus:border-amber-400"
                />
              </div>

              <div>
                <label className="block font-semibold text-slate-300 mb-1">
                  Username Instagram (Opsional)
                </label>
                <input
                  type="text"
                  value={instagram}
                  onChange={(e) => setInstagram(e.target.value)}
                  placeholder="@username"
                  className="w-full px-3.5 py-2.5 rounded-xl bg-slate-900 border border-slate-700 text-white text-xs focus:outline-none focus:border-amber-400"
                />
              </div>

              <div className="flex justify-end space-x-3 pt-3 border-t border-slate-800">
                <button
                  type="button"
                  onClick={() => setModalOpen(false)}
                  className="px-4 py-2 rounded-xl bg-slate-900 text-slate-300 text-xs font-semibold"
                >
                  Batal
                </button>
                <button
                  type="submit"
                  disabled={isSaving}
                  className="px-5 py-2 rounded-xl bg-gradient-to-r from-amber-400 to-amber-500 text-slate-950 font-bold text-xs shadow-md disabled:opacity-50"
                >
                  {isSaving ? "Menyimpan..." : "Simpan Pengurus"}
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
