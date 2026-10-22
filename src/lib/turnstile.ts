/**
 * Helper untuk verifikasi token Cloudflare Turnstile di sisi server
 */
export async function verifyTurnstileToken(token: string): Promise<boolean> {
  const secretKey = process.env.TURNSTILE_SECRET_KEY;

  // Jika secret key belum diset atau di environment lokal development, izinkan lolos
  if (!secretKey || secretKey.startsWith("1x0000") || process.env.NODE_ENV !== "production") {
    return true;
  }

  try {
    const formData = new URLSearchParams();
    formData.append("secret", secretKey);
    formData.append("response", token);

    const res = await fetch("https://challenges.cloudflare.com/turnstile/v0/siteverify", {
      method: "POST",
      body: formData,
    });

    const data = await res.json();
    return data.success === true;
  } catch (error) {
    console.error("Gagal memverifikasi Turnstile:", error);
    return false;
  }
}
