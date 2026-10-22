"use server";

import { z } from "zod";
import { createClientServer } from "@/lib/supabase/server";
import { generateRegistrationNumber } from "@/lib/utils";

const RegistrationSchema = z.object({
  nama_lengkap: z.string().min(3, "Nama lengkap minimal 3 karakter"),
  nis: z.string().min(4, "NIS minimal 4 digit").max(10, "NIS maksimal 10 digit"),
  kelas: z.string().min(1, "Pilih kelas"),
  jurusan: z.string().min(1, "Pilih jurusan"),
  ttl: z.string().min(5, "Tempat, tanggal lahir wajib diisi"),
  no_wa: z.string().min(9, "Nomor WhatsApp tidak valid"),
  email: z.string().email("Format email tidak valid"),
  departemen_1_id: z.string().min(1, "Pilih prioritas departemen 1"),
  departemen_2_id: z.string().min(1, "Pilih prioritas departemen 2"),
  motivasi: z.string().min(15, "Motivasi minimal 15 karakter"),
  pengalaman: z.string().optional().nullable(),
  foto_url: z.string().optional().nullable(),
  berkas_url: z.string().optional().nullable(),
  persetujuan: z.literal(true, {
    errorMap: () => ({ message: "Anda harus menyetujui pernyataan pendaftaran" }),
  }),
});

export type RegisterResult = {
  success: boolean;
  message: string;
  no_pendaftaran?: string;
  data?: {
    nama_lengkap: string;
    nis: string;
    kelas: string;
    jurusan: string;
    no_pendaftaran: string;
  };
};

export async function submitRegistrationAction(
  formData: FormData
): Promise<RegisterResult> {
  try {
    const supabase = await createClientServer();

    // 1. Cek apakah pendaftaran dibuka
    const { data: pengaturan } = await supabase
      .from("pengaturan")
      .select("pendaftaran_buka")
      .limit(1)
      .maybeSingle();

    if (pengaturan && pengaturan.pendaftaran_buka === false) {
      return {
        success: false,
        message: "Mohon maaf, pendaftaran calon pengurus OSIS saat ini belum dibuka atau sudah ditutup.",
      };
    }

    const persetujuanValue = formData.get("persetujuan") === "true";

    const rawData = {
      nama_lengkap: (formData.get("nama_lengkap") as string)?.trim(),
      nis: (formData.get("nis") as string)?.trim(),
      kelas: (formData.get("kelas") as string)?.trim(),
      jurusan: (formData.get("jurusan") as string)?.trim(),
      ttl: (formData.get("ttl") as string)?.trim(),
      no_wa: (formData.get("no_wa") as string)?.trim(),
      email: (formData.get("email") as string)?.trim(),
      departemen_1_id: (formData.get("departemen_1_id") as string)?.trim(),
      departemen_2_id: (formData.get("departemen_2_id") as string)?.trim(),
      motivasi: (formData.get("motivasi") as string)?.trim(),
      pengalaman: (formData.get("pengalaman") as string)?.trim() || null,
      foto_url: (formData.get("foto_url") as string)?.trim() || null,
      berkas_url: (formData.get("berkas_url") as string)?.trim() || null,
      persetujuan: persetujuanValue,
    };

    const validated = RegistrationSchema.safeParse(rawData);
    if (!validated.success) {
      const errorMsg = validated.error.errors.map((e) => e.message).join(". ");
      return { success: false, message: errorMsg };
    }

    // 2. Cek duplikasi NIS
    const { data: existingStudent } = await supabase
      .from("pendaftar")
      .select("id, no_pendaftaran")
      .eq("nis", validated.data.nis)
      .maybeSingle();

    if (existingStudent) {
      return {
        success: false,
        message: `NIS ${validated.data.nis} sudah terdaftar dengan Nomor Pendaftaran: ${existingStudent.no_pendaftaran}. Anda tidak dapat mendaftar dua kali.`,
      };
    }

    // 3. Generate nomor pendaftaran unik
    const noPendaftaran = generateRegistrationNumber();

    // 4. Insert data pendaftar
    const { error: insertError } = await supabase.from("pendaftar").insert({
      no_pendaftaran: noPendaftaran,
      nama_lengkap: validated.data.nama_lengkap,
      nis: validated.data.nis,
      kelas: validated.data.kelas,
      jurusan: validated.data.jurusan,
      ttl: validated.data.ttl,
      no_wa: validated.data.no_wa,
      email: validated.data.email,
      departemen_1_id: validated.data.departemen_1_id || null,
      departemen_2_id: validated.data.departemen_2_id || null,
      motivasi: validated.data.motivasi,
      pengalaman: validated.data.pengalaman,
      foto_url: validated.data.foto_url,
      berkas_url: validated.data.berkas_url,
      status_seleksi: "Dalam Proses",
    });

    if (insertError) {
      console.error("Supabase insert error:", insertError);
      return {
        success: false,
        message: "Gagal menyimpan formulir pendaftaran. Silakan coba kembali.",
      };
    }

    return {
      success: true,
      message: "Pendaftaran berhasil dikirim!",
      no_pendaftaran: noPendaftaran,
      data: {
        nama_lengkap: validated.data.nama_lengkap,
        nis: validated.data.nis,
        kelas: validated.data.kelas,
        jurusan: validated.data.jurusan,
        no_pendaftaran: noPendaftaran,
      },
    };
  } catch (err) {
    console.error("Registration action exception:", err);
    return {
      success: false,
      message: "Terjadi kesalahan server saat memproses pendaftaran.",
    };
  }
}
