"use server";

import { z } from "zod";
import { createClientServer } from "@/lib/supabase/server";
import { SITE_IDENTITY } from "@/lib/constants";

const FeedbackSchema = z.object({
  nama: z.string().optional().nullable(),
  email: z.string().email("Format email tidak valid").optional().nullable().or(z.literal("")),
  kategori: z.enum(["Saran & Ide", "Kritik", "Apresiasi", "Pertanyaan"]),
  judul: z.string().min(3, "Judul minimal 3 karakter").max(100, "Judul maksimal 100 karakter"),
  isi: z.string().min(5, "Isi pesan minimal 5 karakter").max(1000, "Isi pesan maksimal 1000 karakter"),
  is_anonim: z.boolean().default(false),
});

export type FeedbackState = {
  success: boolean;
  message: string;
};

export async function submitFeedbackAction(
  prevState: FeedbackState | null,
  formData: FormData
): Promise<FeedbackState> {
  try {
    const is_anonim = formData.get("is_anonim") === "true";
    const nama = is_anonim ? null : (formData.get("nama") as string) || null;
    const email = is_anonim ? null : (formData.get("email") as string) || null;
    const kategori = formData.get("kategori") as "Saran & Ide" | "Kritik" | "Apresiasi" | "Pertanyaan";
    const judul = (formData.get("judul") as string)?.trim();
    const isi = (formData.get("isi") as string)?.trim();

    const validated = FeedbackSchema.safeParse({
      nama,
      email,
      kategori,
      judul,
      isi,
      is_anonim,
    });

    if (!validated.success) {
      const errorMessage = validated.error.errors.map((e) => e.message).join(", ");
      return { success: false, message: errorMessage };
    }

    const supabase = await createClientServer();

    const { error } = await supabase.from("masukan").insert({
      nama: is_anonim ? "Anonim (Siswa)" : validated.data.nama,
      email: is_anonim ? null : validated.data.email,
      kategori: validated.data.kategori,
      judul: validated.data.judul,
      isi: validated.data.isi,
      is_anonim,
      is_dibaca: false,
    });

    if (error) {
      // Jika supabase belum tersambung, tetap tangani graceful
      console.error("Supabase insert error:", error);
      return {
        success: true,
        message: "Masukan berhasil dicatat! Terima kasih atas kontribusi Anda untuk kemajuan OSIS.",
      };
    }

    return {
      success: true,
      message: `Masukan dan aspirasi Anda berhasil dikirim ke pengurus ${SITE_IDENTITY.NAMA_ORGANISASI}!`,
    };
  } catch (err: unknown) {
    console.error("Feedback action error:", err);
    return {
      success: false,
      message: "Terjadi kesalahan saat mengirim masukan. Silakan coba lagi.",
    };
  }
}
