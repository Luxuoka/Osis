import { createServerClient } from "@supabase/ssr";
import { createClient as createSupabaseClient } from "@supabase/supabase-js";
import { cookies } from "next/headers";

// Client server untuk Server Components/Actions yang membutuhkan autentikasi / session cookies (misal admin)
export async function createClientServer() {
  const cookieStore = await cookies();
  const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL || "https://placeholder.supabase.co";
  const supabaseAnonKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY || "placeholder-anon-key";

  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  return createServerClient<any>(supabaseUrl, supabaseAnonKey, {
    cookies: {
      getAll() {
        return cookieStore.getAll();
      },
      setAll(cookiesToSet: { name: string; value: string; options?: Record<string, unknown> }[]) {
        try {
          cookiesToSet.forEach(({ name, value, options }: { name: string; value: string }) =>
            cookieStore.set(name, value, options as any)
          );
        } catch {
          // Can happen in Server Components
        }
      },
    },
  });
}

// Client publik untuk query data publik tanpa cookies.
// Sangat penting agar Next.js tidak memaksa dynamic SSR dan mengaktifkan Static ISR caching.
export function createClientPublic() {
  const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL || "https://placeholder.supabase.co";
  const supabaseAnonKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY || "placeholder-anon-key";

  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  return createSupabaseClient<any>(supabaseUrl, supabaseAnonKey, {
    auth: {
      persistSession: false,
      autoRefreshToken: false,
    },
  });
}
