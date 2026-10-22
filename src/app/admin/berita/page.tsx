"use client";

import { useState, useEffect } from "react";
import Image from "next/image";
import {
  Newspaper,
  Plus,
  Edit3,
  Trash2,
  Eye,
  CheckCircle,
  XCircle,
  X,
  Upload,
} from "lucide-react";
import { createClient } from "@/lib/supabase/client";
import { Toast } from "@/components/ui/Toast";
import { formatDate } from "@/lib/utils";

interface BeritaItem {
  id: string;
  judul: string;
  slug: string;
  cuplikan: string;
  konten: string;
  thumbnail_url: string;
  kategori: string;
  penulis: string;
  is_published: boolean;
  views: number;
  created_at: string;
}

export default function AdminBeritaPage() {
  const [beritaList, setBeritaList] = useState<BeritaItem[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [modalOpen, setModalOpen] = useState(false);
  const [editingItem, setEditingItem] = useState<BeritaItem | null>(null);

  // Form State
  const [judul, setJudul] = useState("");
  const [slug, setSlug] = useState("");
  const [cuplikan, setCuplikan] = useState("");
  const [konten, setKonten] = useState("");
  const [thumbnailUrl, setThumbnailUrl] = useState("");
  const [kategori, setKategori] = useState("Kegiatan");
  const [penulis, setPenulis] = useState("Humas OSIS");
  const [isPublished, setIsPublished] = useState(true);
  const [isSaving, setIsSaving] = useState(false);

  const [toast, setToast] = useState<{ show: boolean; type: "success" | "error"; message: string }>({
    show: false,
    type: "success",
    message: "",
  });

  const fetchBerita = async () => {
    setIsLoading(true);
    try {
      const supabase = createClient();
      const { data } = await supabase
        .from("berita")
        .select("*")
        .order("created_at", { ascending: false });

      if (data) {
        setBeritaList(data as BeritaItem[]);
      }
    } catch (e) {
      console.error("Error fetching berita:", e);
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    fetchBerita();
  }, []);

  const openAddModal = () => {
    setEditingItem(null);
    setJudul("");
    setSlug("");
    setCuplikan("");
    setKonten("");
    setThumbnailUrl("https://images.unsplash.com/photo-1523240795612-9a054b0db644?w=800&auto=format&fit=crop&q=80");
    setKategori("Kegiatan");
    setPenulis("Humas OSIS");
    setIsPublished(true);
    setModalOpen(true);
  };

  const openEditModal = (item: BeritaItem) => {
    setEditingItem(item);
    setJudul(item.judul);
    setSlug(item.slug);
    setCuplikan(item.cuplikan || "");
    setKonten(item.konten);
    setThumbnailUrl(item.thumbnail_url || "");
    setKategori(item.kategori);
    setPenulis(item.penulis);
    setIsPublished(item.is_published);
    setModalOpen(true);
  };

  const handleJudulChange = (val: string) => {
    setJudul(val);
    if (!editingItem) {
      const autoSlug = val
        .toLowerCase()
        .replace(/[^a-z0-9]+/g, "-")
        .replace(/^-|-$/g, "");
      setSlug(autoSlug);
    }
  };

  const handleSave = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!judul || !slug || !konten) {
      setToast({ show: true, type: "error", message: "Judul, slug, dan isi berita wajib diisi." });
      return;
    }

    setIsSaving(true);
    try {
      const supabase = createClient();
      const payload = {
        judul,
        slug,
        cuplikan: cuplikan || judul.slice(0, 150),
        konten,
        thumbnail_url: thumbnailUrl,
        kategori,
        penulis,
        is_published: isPublished,
        updated_at: new Date().toISOString(),
      };

      if (editingItem) {
        const { error } = await supabase
          .from("berita")
          .update(payload)
          .eq("id", editingItem.id);
        if (error) throw error;
        setToast({ show: true, type: "success", message: "Berita berhasil diperbarui." });
      } else {
        const { error } = await supabase.from("berita").insert(payload);
        if (error) throw error;
        setToast({ show: true, type: "success", message: "Berita baru berhasil diterbitkan." });
      }

      setModalOpen(false);
      fetchBerita();
    } catch (err: any) {
      setToast({ show: true, type: "error", message: err?.message || "Gagal menyimpan berita." });
    } finally {
      setIsSaving(false);
    }
  };

  const handleDelete = async (id: string) => {
    if (!confirm("Hapus artikel berita ini secara permanen?")) return;
    try {
      const supabase = createClient();
      await supabase.from("berita").delete().eq("id", id);
      setBeritaList((prev) => prev.filter((b) => b.id !== id));
      setToast({ show: true, type: "success", message: "Berita berhasil dihapus." });
    } catch {
      setToast({ show: true, type: "error", message: "Gagal menghapus berita." });
    }
  };

  const handleTogglePublish = async (item: BeritaItem) => {
    try {
      const supabase = createClient();
      const newStatus = !item.is_published;
      await supabase.from("berita").update({ is_published: newStatus }).eq("id", item.id);
      setBeritaList((prev) =>
        prev.map((b) => (b.id === item.id ? { ...b, is_published: newStatus } : b))
      );
      setToast({
        show: true,
        type: "success",
        message: `Status artikel diubah menjadi ${newStatus ? "Terbit (Publish)" : "Draft"}.`,
      });
    } catch {
      setToast({ show: true, type: "error", message: "Gagal mengubah status publish." });
    }
  };

  return (
    <div className="space-y-6">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h1 className="text-2xl font-black text-white tracking-tight">
            Kelola Berita & Publikasi Kegiatan
          </h1>
          <p className="text-xs text-slate-400 mt-1">
            Publikasikan kabar terbaru, dokumentasi seni, dan pengumuman resmi OSIS.
          </p>
        </div>

        <button
          type="button"
          onClick={openAddModal}
          className="px-4 py-2.5 rounded-xl bg-gradient-to-r from-amber-400 to-amber-500 text-slate-950 font-bold text-xs shadow-lg shadow-amber-500/20 flex items-center space-x-2 transition-all hover:scale-[1.02]"
        >
          <Plus className="w-4 h-4" />
          <span>Tulis Berita Baru</span>
        </button>
      </div>

      {/* Grid Berita */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {beritaList.map((item) => (
          <div
            key={item.id}
            className="glass-card rounded-2xl overflow-hidden border border-slate-800 flex flex-col justify-between group shadow-xl"
          >
            <div>
              <div className="relative aspect-video w-full bg-slate-950 overflow-hidden">
                <Image
                  src={item.thumbnail_url || "https://images.unsplash.com/photo-1523240795612-9a054b0db644?w=800&auto=format&fit=crop&q=80"}
                  alt={item.judul}
                  fill
                  sizes="(max-width: 768px) 100vw, 33vw"
                  className="object-cover group-hover:scale-105 transition-transform duration-300"
                />
                <span className="absolute top-2.5 left-2.5 px-2.5 py-0.5 rounded-md bg-slate-950/80 backdrop-blur-md text-[10px] font-bold text-amber-400 border border-slate-700">
                  {item.kategori}
                </span>

                <button
                  type="button"
                  onClick={() => handleTogglePublish(item)}
                  className={`absolute top-2.5 right-2.5 px-2.5 py-0.5 rounded-md text-[10px] font-bold shadow-md ${
                    item.is_published
                      ? "bg-emerald-500/90 text-white"
                      : "bg-slate-800 text-slate-400 border border-slate-700"
                  }`}
                >
                  {item.is_published ? "Terbit" : "Draft"}
                </button>
              </div>

              <div className="p-5 space-y-2">
                <span className="text-[11px] text-slate-500 block">
                  {formatDate(item.created_at)} &bull; {item.penulis}
                </span>
                <h3 className="text-sm font-bold text-white line-clamp-2 leading-snug">
                  {item.judul}
                </h3>
                <p className="text-xs text-slate-400 line-clamp-2">
                  {item.cuplikan}
                </p>
              </div>
            </div>

            <div className="p-5 pt-0 border-t border-slate-800/80 mt-2 flex items-center justify-between">
              <span className="text-[11px] text-slate-500 font-mono">
                /{item.slug}
              </span>

              <div className="flex items-center space-x-1.5">
                <button
                  type="button"
                  onClick={() => openEditModal(item)}
                  className="p-1.5 rounded-lg bg-slate-900 hover:bg-slate-800 text-slate-300 hover:text-white border border-slate-700"
                  title="Edit Berita"
                >
                  <Edit3 className="w-3.5 h-3.5" />
                </button>
                <button
                  type="button"
                  onClick={() => handleDelete(item.id)}
                  className="p-1.5 rounded-lg bg-rose-500/10 hover:bg-rose-500/20 text-rose-400 border border-rose-500/30"
                  title="Hapus Berita"
                >
                  <Trash2 className="w-3.5 h-3.5" />
                </button>
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* MODAL EDITOR BERITA */}
      {modalOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-sm">
          <div className="relative w-full max-w-3xl bg-slate-950 rounded-3xl border border-slate-800 shadow-2xl p-6 sm:p-8 max-h-[90vh] overflow-y-auto space-y-6">
            <div className="flex items-center justify-between pb-4 border-b border-slate-800">
              <h2 className="text-lg font-black text-white">
                {editingItem ? "Edit Artikel Berita" : "Tulis Berita Baru"}
              </h2>
              <button
                type="button"
                onClick={() => setModalOpen(false)}
                className="p-1 rounded-lg text-slate-400 hover:text-white hover:bg-slate-900"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            <form onSubmit={handleSave} className="space-y-4 text-xs">
              <div>
                <label className="block font-semibold text-slate-300 mb-1.5">
                  Judul Berita <span className="text-amber-400">*</span>
                </label>
                <input
                  type="text"
                  required
                  value={judul}
                  onChange={(e) => handleJudulChange(e.target.value)}
                  placeholder="Contoh: Pembukaan Kegiatan Kepemimpinan Siswa Santa Maria 2026"
                  className="w-full px-3.5 py-2.5 rounded-xl bg-slate-900 border border-slate-700 text-white text-xs focus:outline-none focus:border-amber-400"
                />
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="block font-semibold text-slate-300 mb-1.5">
                    Slug URL (otomatis)
                  </label>
                  <input
                    type="text"
                    required
                    value={slug}
                    onChange={(e) => setSlug(e.target.value)}
                    className="w-full px-3.5 py-2.5 rounded-xl bg-slate-900 border border-slate-700 text-amber-400 font-mono text-xs focus:outline-none focus:border-amber-400"
                  />
                </div>

                <div>
                  <label className="block font-semibold text-slate-300 mb-1.5">
                    Kategori Berita
                  </label>
                  <select
                    value={kategori}
                    onChange={(e) => setKategori(e.target.value)}
                    className="w-full px-3.5 py-2.5 rounded-xl bg-slate-900 border border-slate-700 text-white text-xs focus:outline-none focus:border-amber-400"
                  >
                    <option value="Kegiatan">Kegiatan</option>
                    <option value="Pengumuman">Pengumuman</option>
                    <option value="Info Siswa">Info Siswa</option>
                    <option value="Prestasi">Prestasi</option>
                  </select>
                </div>
              </div>

              <div>
                <label className="block font-semibold text-slate-300 mb-1.5">
                  URL Thumbnail Gambar (Cloudinary / Unsplash)
                </label>
                <input
                  type="url"
                  value={thumbnailUrl}
                  onChange={(e) => setThumbnailUrl(e.target.value)}
                  placeholder="https://..."
                  className="w-full px-3.5 py-2.5 rounded-xl bg-slate-900 border border-slate-700 text-white text-xs focus:outline-none focus:border-amber-400"
                />
              </div>

              <div>
                <label className="block font-semibold text-slate-300 mb-1.5">
                  Cuplikan Singkat (Excerpt)
                </label>
                <textarea
                  rows={2}
                  value={cuplikan}
                  onChange={(e) => setCuplikan(e.target.value)}
                  placeholder="Ringkasan 1-2 kalimat untuk kartu depan..."
                  className="w-full px-3.5 py-2.5 rounded-xl bg-slate-900 border border-slate-700 text-white text-xs focus:outline-none focus:border-amber-400 resize-none"
                />
              </div>

              <div>
                <label className="block font-semibold text-slate-300 mb-1.5">
                  Isi Konten Berita Lengkap <span className="text-amber-400">*</span>
                </label>
                <textarea
                  rows={8}
                  required
                  value={konten}
                  onChange={(e) => setKonten(e.target.value)}
                  placeholder="Tuliskan isi berita secara lengkap di sini..."
                  className="w-full px-3.5 py-2.5 rounded-xl bg-slate-900 border border-slate-700 text-white text-xs focus:outline-none focus:border-amber-400 resize-none"
                />
              </div>

              <div className="flex items-center space-x-3 pt-2">
                <label className="flex items-center space-x-2 cursor-pointer">
                  <input
                    type="checkbox"
                    checked={isPublished}
                    onChange={(e) => setIsPublished(e.target.checked)}
                    className="w-4 h-4 rounded text-amber-500 bg-slate-900 border-slate-700"
                  />
                  <span className="text-xs text-white font-semibold">Publikasikan sekarang (Aktifkan tayang)</span>
                </label>
              </div>

              <div className="flex justify-end space-x-3 pt-4 border-t border-slate-800">
                <button
                  type="button"
                  onClick={() => setModalOpen(false)}
                  className="px-4 py-2.5 rounded-xl bg-slate-900 text-slate-300 text-xs font-semibold"
                >
                  Batal
                </button>
                <button
                  type="submit"
                  disabled={isSaving}
                  className="px-6 py-2.5 rounded-xl bg-gradient-to-r from-amber-400 to-amber-500 text-slate-950 font-bold text-xs shadow-md disabled:opacity-50"
                >
                  {isSaving ? "Menyimpan..." : "Simpan Berita"}
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
