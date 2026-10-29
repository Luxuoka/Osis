import { type NextRequest } from "next/server";
import { updateSession } from "@/lib/supabase/middleware";

export async function middleware(request: NextRequest) {
  return await updateSession(request);
}

export const config = {
  matcher: [
    /*
     * Hanya jalankan middleware autentikasi pada rute admin.
     * Rute publik (/ dsb) tidak memerlukan session guard sehingga
     * tidak terkena penalti network roundtrip ke Supabase Auth.
     */
    "/admin/:path*",
  ],
};
