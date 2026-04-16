/**
 * Supabase CLIENT-SIDE client
 *
 * Equivalente a un HttpClient en .NET pero para el browser.
 * Úsalo en Client Components (archivos con "use client" arriba).
 *
 * Ejemplo de uso:
 *   const supabase = createClient()
 *   const { data } = await supabase.from('experiences').select('*')
 */

import { createBrowserClient } from "@supabase/ssr";
import type { Database } from "@/types/database";

export function createClient() {
  return createBrowserClient<Database>(
    process.env.NEXT_PUBLIC_SUPABASE_URL!,
    process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!
  );
}
