"use client";

import { useState, useEffect } from "react";
import { Building2, Plus, Edit3, Trash2, X } from "lucide-react";
import { createClient } from "@/lib/supabase/client";
import { Toast } from "@/components/ui/Toast";
import { SITE_IDENTITY } from "@/lib/constants";

interface DeptItem {
  id: string;
  nama: string;
  singkatan: string | null;
  deskripsi: string | null;
  urutan: number;
}

export default function AdminDepartemenPage() {
  const [deptList, setDeptList] = useState<DeptItem[]>([]);
  const [modalOpen, setModalOpen] = useState(false);
  const [editingItem, setEditingItem] = useState<DeptItem | null>(null);

  const [nama, setNama] = useState("");
  const [singkatan, setSingkatan] = useState("");
  const [deskripsi, setDeskripsi] = useState("");
  const [urutan, setUrutan] = useState(1);
  const [isSaving, setIsSaving] = useState(false);

  const [toast, setToast] = useState<{ show: boolean; type: "success" | "error"; message: string }>({
    show: false,
    type: "success",
    message: "",
  });

  const fetchDept = async () => {
    try {
      const supabase = createClient();
      const { data } = await supabase
        .from("departemen")
        .select("*")
        .order("urutan", { ascending: true });
      if (data) setDeptList(data as DeptItem[]);
    } catch (e) {
      console.error(e);
    }
  };

  useEffect(() => {
    fetchDept();
  }, []);

  const openAdd = () => {
    setEditingItem(null);
    setNama("");
    setSingkatan("");
    setDeskripsi("");
    setUrutan(deptList.length + 1);
    setModalOpen(true);
  };

  const openEdit = (item: DeptItem) => {
    setEditingItem(item);
    setNama(item.nama);
    setSingkatan(item.singkatan || "");
    setDeskripsi(item.deskripsi || "");
    setUrutan(item.urutan);
    setModalOpen(true);
  };

  const handleSave = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!nama) return;

    setIsSaving(true);
    try {
      const supabase = createClient();
      const payload = {
        nama,
        singkatan: singkatan || null,
        deskripsi: deskripsi || null,
        urutan: Number(urutan),
      };

      if (editingItem) {
        await supabase.from("departemen").update(payload).eq("id", editingItem.id);
        setToast({ show: true, type: "success", message: "Departemen berhasil diperbarui." });
      } else {
        await supabase.from("departemen").insert(payload);
        setToast({ show: true, type: "success", message: "Departemen berhasil ditambahkan." });
      }
      setModalOpen(false);
      fetchDept();
    } catch {
      setToast({ show: true, type: "error", message: "Gagal menyimpan data." });
    } finally {
      setIsSaving(false);
    }
  };

  const handleDelete = async (id: string) => {
    if (!confirm("Hapus departemen ini? Semua data terkait mungkin ikut terhapus.")) return;
    try {
      const supabase = createClient();
      await supabase.from("departemen").delete().eq("id", id);
      setDeptList((prev) => prev.filter((d) => d.id !== id));
      setToast({ show: true, type: "success", message: "Departemen dihapus." });
    } catch {
      setToast({ show: true, type: "error", message: "Gagal menghapus." });
    }
  };

  return (
    <div className="space-y-6">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h1 className="text-2xl font-black text-white tracking-tight">
            Kelola Departemen Organisasi
          </h1>
          <p className="text-xs text-slate-400 mt-1">
            Total {deptList.length} bidang departemen aktif dalam naungan {SITE_IDENTITY.NAMA_ORGANISASI}.
          </p>
        </div>

        <button
          type="button"
          onClick={openAdd}
          className="px-4 py-2.5 rounded-xl bg-gradient-to-r from-blue-600 to-indigo-600 text-white font-bold text-xs shadow-md flex items-center space-x-2"
        >
          <Plus className="w-4 h-4" />
          <span>Tambah Departemen</span>
        </button>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {deptList.map((d) => (
          <div
            key={d.id}
            className="glass-card rounded-2xl p-6 border border-slate-800 flex flex-col justify-between group shadow-xl"
          >
            <div className="space-y-3">
              <div className="flex items-center justify-between">
                <span className="w-7 h-7 rounded-lg bg-blue-500/10 text-blue-400 font-bold text-xs flex items-center justify-center">
                  #{d.urutan}
                </span>
                {d.singkatan && (
                  <span className="px-2 py-0.5 rounded bg-amber-500/10 text-amber-400 text-xs font-bold border border-amber-500/20">
                    {d.singkatan}
                  </span>
                )}
              </div>
              <h3 className="text-base font-bold text-white group-hover:text-amber-400 transition-colors">
                {d.nama}
              </h3>
              <p className="text-xs text-slate-400 line-clamp-3">
                {d.deskripsi}
              </p>
            </div>

            <div className="pt-4 mt-4 border-t border-slate-800 flex justify-end space-x-2">
              <button
                type="button"
                onClick={() => openEdit(d)}
                className="px-3 py-1.5 rounded-lg bg-slate-900 hover:bg-slate-800 text-slate-300 text-xs font-semibold flex items-center space-x-1"
              >
                <Edit3 className="w-3.5 h-3.5" />
                <span>Edit</span>
              </button>
              <button
                type="button"
                onClick={() => handleDelete(d.id)}
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
                {editingItem ? "Edit Departemen" : "Tambah Departemen"}
              </h2>
              <button type="button" onClick={() => setModalOpen(false)}>
                <X className="w-5 h-5 text-slate-400" />
              </button>
            </div>

            <form onSubmit={handleSave} className="space-y-4 text-xs">
              <div>
                <label className="block font-semibold text-slate-300 mb-1">
                  Nama Departemen <span className="text-amber-400">*</span>
                </label>
                <input
                  type="text"
                  required
                  value={nama}
                  onChange={(e) => setNama(e.target.value)}
                  placeholder="Departemen..."
                  className="w-full px-3 py-2 rounded-xl bg-slate-900 border border-slate-700 text-white"
                />
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="block font-semibold text-slate-300 mb-1">
                    Singkatan
                  </label>
                  <input
                    type="text"
                    value={singkatan}
                    onChange={(e) => setSingkatan(e.target.value)}
                    placeholder="Contoh: SRK"
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
              </div>

              <div>
                <label className="block font-semibold text-slate-300 mb-1">
                  Deskripsi Tugas
                </label>
                <textarea
                  rows={3}
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
                  className="px-5 py-2 rounded-xl bg-blue-600 text-white font-bold text-xs"
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
