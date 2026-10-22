"use server";

import { createClientServer } from "@/lib/supabase/server";

// Simple in-memory rate limiting map: IP/Token -> timestamps
const requestLog = new Map<string, number[]>();

export interface SelectionResultData {
  no_pendaftaran: string;
  nama_lengkap: string;
  kelas: string;
  jurusan: string;
  status_seleksi: "Lolos" | "Tidak Lolos" | "Dalam Proses";
  departemen_nama?: string | null;
  catatan_seleksi?: string | null;
  pengumuman_dibuka: boolean;
}

export type SelectionCheckResponse = {
  success: boolean;
  message: string;
  data?: SelectionResultData | null;
};

export async function checkSelectionAction(
  query: string,
  clientIdentifier: string = "default"
): Promise<SelectionCheckResponse> {
  const cleanQuery = query?.trim().toUpperCase();

  if (!cleanQuery || cleanQuery.length < 3) {
    return {
      success: false,
      message: "Masukkan NIS atau Nomor Pendaftaran yang valid (minimal 3 karakter).",
    };
  }

  // Rate Limiting: max 5 requests per 30 seconds per identifier
  const now = Date.now();
  const windowMs = 30000;
  const maxRequests = 5;

  const userRequests = requestLog.get(clientIdentifier) || [];
  const recentRequests = userRequests.filter((ts) => now - ts < windowMs);

  if (recentRequests.length >= maxRequests) {
    return {
      success: false,
      message: "Terlalu banyak permintaan pengecekan. Mohon tunggu 30 detik sebelum mencoba lagi demi keamanan.",
    };
  }

  recentRequests.push(now);
  requestLog.set(clientIdentifier, recentRequests);

  try {
    const supabase = await createClientServer();

    // 1. Cek apakah pengumuman dibuka
    const { data: pengaturan } = await supabase
      .from("pengaturan")
      .select("hasil_seleksi_terbuka")
      .limit(1)
      .maybeSingle();

    if (pengaturan && pengaturan.hasil_seleksi_terbuka === false) {
      return {
        success: false,
        message: "Pengumuman hasil seleksi saat ini belum dibuka atau masih dalam tahap rekapitulasi panitia.",
      };
    }

    // 2. Query data pendaftar berdasarkan NIS atau No Pendaftaran
    const { data: pendaftar, error } = await supabase
      .from("pendaftar")
      .select(`
        no_pendaftaran,
        nama_lengkap,
        kelas,
        jurusan,
        status_seleksi,
        penempatan_departemen_id,
        catatan_seleksi,
        departemen:penempatan_departemen_id(nama)
      `)
      .or(`nis.eq.${cleanQuery},no_pendaftaran.ilike.${cleanQuery}`)
      .limit(1)
      .maybeSingle();

    if (error || !pendaftar) {
      return {
        success: false,
        message: `Data dengan NIS/No. Pendaftaran "${query}" tidak ditemukan. Pastikan data yang dimasukkan sudah sesuai dengan bukti pendaftaran Anda.`,
      };
    }

    const result: SelectionResultData = {
      no_pendaftaran: pendaftar.no_pendaftaran,
      nama_lengkap: pendaftar.nama_lengkap,
      kelas: pendaftar.kelas,
      jurusan: pendaftar.jurusan,
      status_seleksi: pendaftar.status_seleksi as any,
      departemen_nama: (pendaftar.departemen as any)?.nama || null,
      catatan_seleksi: pendaftar.catatan_seleksi || null,
      pengumuman_dibuka: true,
    };

    return {
      success: true,
      message: "Data seleksi berhasil ditemukan.",
      data: result,
    };
  } catch (err) {
    console.error("Selection check error:", err);
    return {
      success: false,
      message: "Terjadi gangguan sistem saat memeriksa hasil seleksi.",
    };
  }
}
