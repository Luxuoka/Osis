"use client";

import { useState, useEffect } from "react";
import {
  UserCheck,
  Search,
  Download,
  Filter,
  Eye,
  CheckCircle2,
  XCircle,
  Clock,
  Sparkles,
  ExternalLink,
  ChevronDown,
  X,
  FileSpreadsheet,
} from "lucide-react";
import { createClient } from "@/lib/supabase/client";
import { Toast } from "@/components/ui/Toast";
import { formatDate } from "@/lib/utils";

interface PendaftarItem {
  id: string;
  no_pendaftaran: string;
  nama_lengkap: string;
  nis: string;
  kelas: string;
  jurusan: string;
  ttl: string;
  no_wa: string;
  email: string;
  departemen_1_id: string | null;
  departemen_2_id: string | null;
  motivasi: string;
  pengalaman: string | null;
  foto_url: string | null;
  berkas_url: string | null;
  status_seleksi: "Dalam Proses" | "Lolos" | "Tidak Lolos";
  penempatan_departemen_id: string | null;
  catatan_seleksi: string | null;
  created_at: string;
}

export default function AdminPendaftarPage() {
  const [pendaftarList, setPendaftarList] = useState<PendaftarItem[]>([]);
  const [departemenList, setDepartemenList] = useState<{ id: string; nama: string }[]>([]);
  const [searchTerm, setSearchTerm] = useState("");
  const [statusFilter, setStatusFilter] = useState("Semua");
  const [selectedItem, setSelectedItem] = useState<PendaftarItem | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [toast, setToast] = useState<{ show: boolean; type: "success" | "error"; message: string }>({
    show: false,
    type: "success",
    message: "",
  });

  // Edit status modal state
  const [editStatus, setEditStatus] = useState<"Dalam Proses" | "Lolos" | "Tidak Lolos">("Dalam Proses");
  const [editDeptId, setEditDeptId] = useState<string>("");
  const [editCatatan, setEditCatatan] = useState<string>("");
  const [isUpdating, setIsUpdating] = useState(false);

  const fetchPendaftar = async () => {
    setIsLoading(true);
    try {
      const supabase = createClient();
      const { data: pendaftarData } = await supabase
        .from("pendaftar")
        .select("*")
        .order("created_at", { ascending: false });

      const { data: deptData } = await supabase
        .from("departemen")
        .select("id, nama")
        .order("urutan", { ascending: true });

      if (pendaftarData) {
        setPendaftarList(pendaftarData as PendaftarItem[]);
      }
      if (deptData) {
        setDepartemenList(deptData);
      }
    } catch (e) {
      console.error("Error fetching pendaftar:", e);
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    fetchPendaftar();
  }, []);

  const openDetailModal = (item: PendaftarItem) => {
    setSelectedItem(item);
    setEditStatus(item.status_seleksi);
    setEditDeptId(item.penempatan_departemen_id || item.departemen_1_id || "");
    setEditCatatan(item.catatan_seleksi || "");
  };

  const handleUpdateStatus = async () => {
    if (!selectedItem) return;
    setIsUpdating(true);

    try {
      const supabase = createClient();
      const { error } = await supabase
        .from("pendaftar")
        .update({
          status_seleksi: editStatus,
          penempatan_departemen_id: editStatus === "Lolos" ? editDeptId || null : null,
          catatan_seleksi: editCatatan || null,
        })
        .eq("id", selectedItem.id);

      if (error) {
        setToast({ show: true, type: "error", message: "Gagal memperbarui status seleksi." });
      } else {
        setToast({ show: true, type: "success", message: `Status ${selectedItem.nama_lengkap} berhasil diperbarui menjadi ${editStatus}.` });
        setSelectedItem(null);
        fetchPendaftar();
      }
    } catch {
      setToast({ show: true, type: "error", message: "Terjadi kesalahan saat menyimpan data." });
    } finally {
      setIsUpdating(false);
    }
  };

  // Ekspor CSV
  const handleExportCsv = () => {
    if (pendaftarList.length === 0) {
      setToast({ show: true, type: "error", message: "Tidak ada data pendaftar untuk diekspor." });
      return;
    }

    const headers = ["No Pendaftaran", "Nama Lengkap", "NIS", "Kelas", "Jurusan", "TTL", "WhatsApp", "Email", "Status Seleksi", "Tanggal Daftar"];
    const rows = pendaftarList.map((p) => [
      p.no_pendaftaran,
      `"${p.nama_lengkap.replace(/"/g, '""')}"`,
      p.nis,
      p.kelas,
      `"${p.jurusan.replace(/"/g, '""')}"`,
      `"${p.ttl.replace(/"/g, '""')}"`,
      p.no_wa,
      p.email,
      p.status_seleksi,
      formatDate(p.created_at),
    ]);

    const csvContent = "data:text/csv;charset=utf-8,\uFEFF" + [headers.join(","), ...rows.map((e) => e.join(","))].join("\n");
    const encodedUri = encodeURI(csvContent);
    const link = document.createElement("a");
    link.setAttribute("href", encodedUri);
    link.setAttribute("download", `data_pendaftar_osis_${new Date().toISOString().slice(0, 10)}.csv`);
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);

    setToast({ show: true, type: "success", message: "Data pendaftar berhasil diekspor ke CSV!" });
  };

  // Filter Data
  const filteredList = pendaftarList.filter((item) => {
    const matchSearch =
      item.nama_lengkap.toLowerCase().includes(searchTerm.toLowerCase()) ||
      item.nis.includes(searchTerm) ||
      item.no_pendaftaran.toLowerCase().includes(searchTerm.toLowerCase());
    const matchStatus = statusFilter === "Semua" ? true : item.status_seleksi === statusFilter;
    return matchSearch && matchStatus;
  });

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h1 className="text-2xl font-black text-white tracking-tight">
            Data Calon Pengurus & Seleksi OSIS
          </h1>
          <p className="text-xs text-slate-400 mt-1">
            Total {pendaftarList.length} pendaftar terdata di sistem penerimaan.
          </p>
        </div>

        <div className="flex items-center space-x-3">
          <button
            type="button"
            onClick={handleExportCsv}
            className="px-4 py-2.5 rounded-xl bg-emerald-600 hover:bg-emerald-500 text-white text-xs font-bold transition-colors flex items-center space-x-2 shadow-lg shadow-emerald-600/20"
          >
            <Download className="w-4 h-4" />
            <span>Ekspor CSV / Excel</span>
          </button>
        </div>
      </div>

      {/* Bar Pencarian & Filter */}
      <div className="glass-card rounded-2xl p-4 border border-slate-800 flex flex-col sm:flex-row items-center justify-between gap-3">
        <div className="w-full sm:w-80 relative">
          <input
            type="text"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            placeholder="Cari nama, NIS, nomor pendaftaran..."
            className="w-full pl-9 pr-4 py-2 rounded-xl bg-slate-900 border border-slate-700/80 text-white text-xs placeholder-slate-500 focus:outline-none focus:border-amber-400"
          />
          <Search className="w-4 h-4 text-slate-400 absolute left-3 top-1/2 -translate-y-1/2" />
        </div>

        <div className="flex items-center space-x-2 w-full sm:w-auto">
          <span className="text-xs text-slate-400 font-semibold shrink-0">Status:</span>
          {["Semua", "Dalam Proses", "Lolos", "Tidak Lolos"].map((st) => (
            <button
              key={st}
              type="button"
              onClick={() => setStatusFilter(st)}
              className={`px-3 py-1.5 rounded-lg text-xs font-semibold transition-all ${
                statusFilter === st
                  ? "bg-amber-400 text-slate-950 font-bold"
                  : "bg-slate-900 border border-slate-800 text-slate-400 hover:text-white"
              }`}
            >
              {st}
            </button>
          ))}
        </div>
      </div>

      {/* Tabel Pendaftar */}
      <div className="glass-card rounded-2xl border border-slate-800 overflow-hidden shadow-xl">
        <div className="overflow-x-auto">
          <table className="w-full text-left text-xs text-slate-300">
            <thead className="bg-slate-900/90 text-slate-400 uppercase font-bold text-[11px] border-b border-slate-800">
              <tr>
                <th className="px-5 py-4">No. Registrasi</th>
                <th className="px-5 py-4">Nama Lengkap & NIS</th>
                <th className="px-5 py-4">Kelas & Jurusan</th>
                <th className="px-5 py-4">Kontak</th>
                <th className="px-5 py-4">Status Seleksi</th>
                <th className="px-5 py-4 text-right">Aksi</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-800/80">
              {isLoading ? (
                <tr>
                  <td colSpan={6} className="px-5 py-10 text-center text-slate-500">
                    Memuat data pendaftar...
                  </td>
                </tr>
              ) : filteredList.length === 0 ? (
                <tr>
                  <td colSpan={6} className="px-5 py-10 text-center text-slate-500">
                    Tidak ada pendaftar yang sesuai dengan filter.
                  </td>
                </tr>
              ) : (
                filteredList.map((item) => (
                  <tr key={item.id} className="hover:bg-slate-900/50 transition-colors">
                    <td className="px-5 py-4 font-mono font-bold text-amber-400">
                      {item.no_pendaftaran}
                    </td>
                    <td className="px-5 py-4">
                      <span className="font-bold text-white block">{item.nama_lengkap}</span>
                      <span className="text-[11px] text-slate-500">NIS: {item.nis}</span>
                    </td>
                    <td className="px-5 py-4">
                      <span className="text-white block">{item.kelas}</span>
                      <span className="text-[11px] text-slate-400">{item.jurusan}</span>
                    </td>
                    <td className="px-5 py-4">
                      <span className="block text-slate-300">{item.no_wa}</span>
                      <span className="text-[11px] text-slate-500">{item.email}</span>
                    </td>
                    <td className="px-5 py-4">
                      <span
                        className={`inline-block px-2.5 py-1 rounded-md text-[10px] font-bold border ${
                          item.status_seleksi === "Lolos"
                            ? "bg-emerald-500/10 text-emerald-400 border-emerald-500/30"
                            : item.status_seleksi === "Dalam Proses"
                            ? "bg-amber-500/10 text-amber-400 border-amber-500/30"
                            : "bg-rose-500/10 text-rose-400 border-rose-500/30"
                        }`}
                      >
                        {item.status_seleksi}
                      </span>
                    </td>
                    <td className="px-5 py-4 text-right">
                      <button
                        type="button"
                        onClick={() => openDetailModal(item)}
                        className="px-3 py-1.5 rounded-lg bg-slate-900 hover:bg-slate-800 border border-slate-700 text-slate-200 hover:text-white text-xs font-semibold inline-flex items-center space-x-1.5 transition-colors"
                      >
                        <Eye className="w-3.5 h-3.5 text-blue-400" />
                        <span>Detail & Seleksi</span>
                      </button>
                    </td>
                  </tr>
                ))
              )}
            </tbody>
          </table>
        </div>
      </div>

      {/* MODAL DETAIL & STATUS SELEKSI */}
      {selectedItem && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-sm">
          <div className="relative w-full max-w-2xl bg-slate-950 rounded-3xl border border-slate-800 shadow-2xl p-6 sm:p-8 max-h-[90vh] overflow-y-auto space-y-6">
            
            {/* Header Modal */}
            <div className="flex items-center justify-between pb-4 border-b border-slate-800">
              <div>
                <span className="text-xs font-mono text-amber-400 font-bold block">
                  {selectedItem.no_pendaftaran}
                </span>
                <h2 className="text-xl font-black text-white">
                  {selectedItem.nama_lengkap}
                </h2>
              </div>
              <button
                type="button"
                onClick={() => setSelectedItem(null)}
                className="p-1 rounded-lg text-slate-400 hover:text-white hover:bg-slate-900"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            {/* Data Diri Grid */}
            <div className="grid grid-cols-2 gap-4 text-xs">
              <div className="p-3 rounded-xl bg-slate-900 border border-slate-800">
                <span className="text-slate-500 block">NIS</span>
                <span className="font-bold text-white">{selectedItem.nis}</span>
              </div>
              <div className="p-3 rounded-xl bg-slate-900 border border-slate-800">
                <span className="text-slate-500 block">Kelas & Jurusan</span>
                <span className="font-bold text-white">{selectedItem.kelas} - {selectedItem.jurusan}</span>
              </div>
              <div className="p-3 rounded-xl bg-slate-900 border border-slate-800">
                <span className="text-slate-500 block">TTL</span>
                <span className="text-white">{selectedItem.ttl}</span>
              </div>
              <div className="p-3 rounded-xl bg-slate-900 border border-slate-800">
                <span className="text-slate-500 block">WhatsApp / Email</span>
                <span className="text-white">{selectedItem.no_wa} / {selectedItem.email}</span>
              </div>
            </div>

            {/* Motivasi & Pengalaman */}
            <div className="space-y-3 text-xs">
              <div className="p-4 rounded-xl bg-slate-900 border border-slate-800 space-y-1">
                <span className="font-bold text-amber-400 block">Motivasi Bergabung:</span>
                <p className="text-slate-300 leading-relaxed whitespace-pre-line">{selectedItem.motivasi}</p>
              </div>

              {selectedItem.pengalaman && (
                <div className="p-4 rounded-xl bg-slate-900 border border-slate-800 space-y-1">
                  <span className="font-bold text-blue-400 block">Pengalaman Organisasi:</span>
                  <p className="text-slate-300 leading-relaxed whitespace-pre-line">{selectedItem.pengalaman}</p>
                </div>
              )}
            </div>

            {/* FORM UBAH STATUS SELEKSI */}
            <div className="p-5 rounded-2xl bg-slate-900 border border-amber-500/30 space-y-4">
              <h3 className="text-sm font-bold text-white flex items-center space-x-2">
                <UserCheck className="w-4 h-4 text-amber-400" />
                <span>Keputusan Hasil Seleksi Panitia</span>
              </h3>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="block text-xs font-semibold text-slate-300 mb-1.5">
                    Ubah Status Kelulusan
                  </label>
                  <select
                    value={editStatus}
                    onChange={(e) => setEditStatus(e.target.value as any)}
                    className="w-full px-3 py-2.5 rounded-xl bg-slate-950 border border-slate-700 text-white text-xs font-bold focus:outline-none focus:border-amber-400"
                  >
                    <option value="Dalam Proses">⏳ Dalam Proses</option>
                    <option value="Lolos">✅ Lolos Seleksi</option>
                    <option value="Tidak Lolos">❌ Tidak Lolos</option>
                  </select>
                </div>

                {editStatus === "Lolos" && (
                  <div>
                    <label className="block text-xs font-semibold text-slate-300 mb-1.5">
                      Departemen Penempatan
                    </label>
                    <select
                      value={editDeptId}
                      onChange={(e) => setEditDeptId(e.target.value)}
                      className="w-full px-3 py-2.5 rounded-xl bg-slate-950 border border-slate-700 text-white text-xs focus:outline-none focus:border-amber-400"
                    >
                      <option value="">Pilih Departemen...</option>
                      {departemenList.map((d) => (
                        <option key={d.id} value={d.id}>
                          {d.nama}
                        </option>
                      ))}
                    </select>
                  </div>
                )}
              </div>

              <div>
                <label className="block text-xs font-semibold text-slate-300 mb-1.5">
                  Catatan / Instruksi untuk Siswa (Tampil di Cek Hasil)
                </label>
                <textarea
                  rows={3}
                  value={editCatatan}
                  onChange={(e) => setEditCatatan(e.target.value)}
                  placeholder="Contoh: Selamat, harap berkumpul hari Senin membawa seragam OSIS..."
                  className="w-full px-3 py-2.5 rounded-xl bg-slate-950 border border-slate-700 text-white text-xs placeholder-slate-500 focus:outline-none focus:border-amber-400 resize-none"
                />
              </div>

              <div className="flex justify-end space-x-3 pt-2">
                <button
                  type="button"
                  onClick={() => setSelectedItem(null)}
                  className="px-4 py-2 rounded-xl bg-slate-800 text-slate-300 hover:text-white text-xs font-semibold"
                >
                  Batal
                </button>
                <button
                  type="button"
                  disabled={isUpdating}
                  onClick={handleUpdateStatus}
                  className="px-5 py-2 rounded-xl bg-gradient-to-r from-amber-400 to-amber-500 text-slate-950 font-bold text-xs shadow-md disabled:opacity-50"
                >
                  {isUpdating ? "Menyimpan..." : "Simpan Keputusan"}
                </button>
              </div>
            </div>

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
