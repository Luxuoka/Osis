"use client";

import { useState, useEffect } from "react";
import { FileText, Plus, Edit3, Trash2, X, Download, Eye } from "lucide-react";
import { createClient } from "@/lib/supabase/client";
import { Toast } from "@/components/ui/Toast";
import { getStatusBadgeClass } from "@/lib/utils";

interface ProkerItem {
  id: string;
  departemen_id: string;
  departemen?: { nama: string };
  judul: string;
  deskripsi: string | null;
  file_url: string | null;
  status: "Rencana" | "Sedang Berjalan" | "Terlaksana";
}

export default function AdminProkerPage() {
  const [prokerList, setProkerList] = useState<ProkerItem[]>([]);
  const [departemenList, setDepartemenList] = useState<{ id: string; nama: string }[]>([]);
  const [modalOpen, setModalOpen] = useState(false);
  const [editingItem, setEditingItem] = useState<ProkerItem | null>(null);

  const [judul, setJudul] = useState("");
  const [departemenId, setDepartemenId] = useState("");
  const [deskripsi, setDeskripsi] = useState("");
  const [fileUrl, setFileUrl] = useState("");
  const [status, setStatus] = useState<"Rencana" | "Sedang Berjalan" | "Terlaksana">("Rencana");
  const [isSaving, setIsSaving] = useState(false);

  const [toast, setToast] = useState<{ show: boolean; type: "success" | "error"; message: string }>({
    show: false,
    type: "success",
    message: "",
  });

  const fetchData = async () => {
    try {
      const supabase = createClient();
      const { data: proker } = await supabase
        .from("program_kerja")
        .select("*, departemen:departemen_id(nama)")
        .order("created_at", { ascending: false });

      const { data: dept } = await supabase
        .from("departemen")
        .select("id, nama")
        .order("urutan", { ascending: true });

      if (proker) setProkerList(proker as any);
      if (dept) {
        setDepartemenList(dept);
        if (!departemenId && dept.length > 0) setDepartemenId(dept[0].id);
      }
    } catch (e) {
      console.error(e);
    }
  };

  useEffect(() => {
    fetchData();
  }, []);

  const openAdd = () => {
    setEditingItem(null);
    setJudul("");
    setDeskripsi("");
    setFileUrl("#");
    setStatus("Rencana");
    setModalOpen(true);
  };

  const openEdit = (item: ProkerItem) => {
    setEditingItem(item);
    setJudul(item.judul);
    setDepartemenId(item.departemen_id);
    setDeskripsi(item.deskripsi || "");
    setFileUrl(item.file_url || "#");
    setStatus(item.status);
    setModalOpen(true);
  };

  const handleSave = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!judul || !departemenId) return;

    setIsSaving(true);
    try {
      const supabase = createClient();
      const payload = {
        departemen_id: departemenId,
        judul,
        deskripsi: deskripsi || null,
        file_url: fileUrl || "#",
        status,
      };

      if (editingItem) {
        await supabase.from("program_kerja").update(payload).eq("id", editingItem.id);
        setToast({ show: true, type: "success", message: "Program kerja berhasil diperbarui." });
      } else {
        await supabase.from("program_kerja").insert(payload);
        setToast({ show: true, type: "success", message: "Program kerja baru berhasil ditambahkan." });
      }

      setModalOpen(false);
      fetchData();
    } catch {
      setToast({ show: true, type: "error", message: "Gagal menyimpan data." });
    } finally {
      setIsSaving(false);
    }
  };

  const handleDelete = async (id: string) => {
    if (!confirm("Hapus dokumen program kerja ini?")) return;
    try {
      const supabase = createClient();
      await supabase.from("program_kerja").delete().eq("id", id);
      setProkerList((prev) => prev.filter((p) => p.id !== id));
      setToast({ show: true, type: "success", message: "Proker berhasil dihapus." });
    } catch {
      setToast({ show: true, type: "error", message: "Gagal menghapus proker." });
    }
  };

  return (
    <div className="space-y-6">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h1 className="text-2xl font-black text-white tracking-tight">
            Dokumen & Arsip Program Kerja
          </h1>
          <p className="text-xs text-slate-400 mt-1">
            Kelola rancangan agenda kegiatan, berkas proposal PDF, dan status eksekusi.
          </p>
        </div>

        <button
          type="button"
          onClick={openAdd}
          className="px-4 py-2.5 rounded-xl bg-gradient-to-r from-amber-400 to-amber-500 text-slate-950 font-bold text-xs shadow-md flex items-center space-x-2"
        >
          <Plus className="w-4 h-4" />
          <span>Tambah Program Kerja</span>
        </button>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {prokerList.map((p) => (
          <div
            key={p.id}
            className="glass-card rounded-2xl p-6 border border-slate-800 flex flex-col justify-between group shadow-xl"
          >
            <div className="space-y-3">
              <div className="flex items-center justify-between">
                <span className="text-[11px] font-semibold text-blue-400 bg-blue-500/10 px-2.5 py-0.5 rounded border border-blue-500/20">
                  {p.departemen?.nama || "Departemen"}
                </span>
                <span
                  className={`text-[10px] font-bold px-2 py-0.5 rounded border ${getStatusBadgeClass(
                    p.status
                  )}`}
                >
                  {p.status}
                </span>
              </div>

              <h3 className="text-base font-bold text-white group-hover:text-amber-400 transition-colors leading-snug">
                {p.judul}
              </h3>

              <p className="text-xs text-slate-400 line-clamp-3">
                {p.deskripsi}
              </p>
            </div>

            <div className="pt-4 mt-4 border-t border-slate-800 flex items-center justify-between">
              <span className="text-[11px] text-slate-500">PDF Terlampir</span>
              <div className="flex items-center space-x-1.5">
                <button
                  type="button"
                  onClick={() => openEdit(p)}
                  className="p-1.5 rounded-lg bg-slate-900 hover:bg-slate-800 text-slate-300 border border-slate-700"
                >
                  <Edit3 className="w-3.5 h-3.5" />
                </button>
                <button
                  type="button"
                  onClick={() => handleDelete(p.id)}
                  className="p-1.5 rounded-lg bg-rose-500/10 hover:bg-rose-500/20 text-rose-400"
                >
                  <Trash2 className="w-3.5 h-3.5" />
                </button>
              </div>
            </div>
          </div>
        ))}
      </div>

      {modalOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-sm">
          <div className="relative w-full max-w-lg bg-slate-950 rounded-3xl border border-slate-800 shadow-2xl p-6 space-y-4">
            <div className="flex items-center justify-between pb-3 border-b border-slate-800">
              <h2 className="text-sm font-black text-white">
                {editingItem ? "Edit Program Kerja" : "Tambah Program Kerja Baru"}
              </h2>
              <button type="button" onClick={() => setModalOpen(false)}>
                <X className="w-5 h-5 text-slate-400" />
              </button>
            </div>

            <form onSubmit={handleSave} className="space-y-4 text-xs">
              <div>
                <label className="block font-semibold text-slate-300 mb-1">
                  Departemen Penanggung Jawab <span className="text-amber-400">*</span>
                </label>
                <select
                  value={departemenId}
                  onChange={(e) => setDepartemenId(e.target.value)}
                  className="w-full px-3 py-2 rounded-xl bg-slate-900 border border-slate-700 text-white"
                >
                  {departemenList.map((d) => (
                    <option key={d.id} value={d.id}>
                      {d.nama}
                    </option>
                  ))}
                </select>
              </div>

              <div>
                <label className="block font-semibold text-slate-300 mb-1">
                  Nama / Judul Program Kerja <span className="text-amber-400">*</span>
                </label>
                <input
                  type="text"
                  required
                  value={judul}
                  onChange={(e) => setJudul(e.target.value)}
                  placeholder="Contoh: Santa Maria Youth Leadership 2026"
                  className="w-full px-3 py-2 rounded-xl bg-slate-900 border border-slate-700 text-white"
                />
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="block font-semibold text-slate-300 mb-1">
                    Status Pelaksanaan
                  </label>
                  <select
                    value={status}
                    onChange={(e) => setStatus(e.target.value as any)}
                    className="w-full px-3 py-2 rounded-xl bg-slate-900 border border-slate-700 text-white"
                  >
                    <option value="Rencana">Rencana</option>
                    <option value="Sedang Berjalan">Sedang Berjalan</option>
                    <option value="Terlaksana">Terlaksana</option>
                  </select>
                </div>

                <div>
                  <label className="block font-semibold text-slate-300 mb-1">
                    URL Berkas PDF (Google Drive/Cloudinary)
                  </label>
                  <input
                    type="text"
                    value={fileUrl}
                    onChange={(e) => setFileUrl(e.target.value)}
                    placeholder="https://..."
                    className="w-full px-3 py-2 rounded-xl bg-slate-900 border border-slate-700 text-white"
                  />
                </div>
              </div>

              <div>
                <label className="block font-semibold text-slate-300 mb-1">
                  Deskripsi Lengkap
                </label>
                <textarea
                  rows={4}
                  value={deskripsi}
                  onChange={(e) => setDeskripsi(e.target.value)}
                  placeholder="Penjelasan sasaran kegiatan, target peserta, dan estimasi waktu..."
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
                  {isSaving ? "Menyimpan..." : "Simpan Proker"}
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
