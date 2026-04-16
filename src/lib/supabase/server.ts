/**
 * Supabase SERVER-SIDE client
 *
 * Equivalente a un servicio inyectado en un Controller en .NET.
 * Úsalo en Server Components, Route Handlers y Server Actions.
 * Maneja cookies automáticamente para mantener la sesión del usuario.
 *
 * Ejemplo de uso en un Server Component:
 *   const supabase = await createClient()
 *   const { data: { user } } = await supabase.auth.getUser()
 */

import { createServerClient } from "@supabase/ssr";
import { cookies } from "next/headers";
import type { Database } from "@/types/database";

export async function createClient() {
  const cookieStore = await cookies();

  return createServerClient<Database>(
    process.env.NEXT_PUBLIC_SUPABASE_URL!,
    process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!,
    {
      cookies: {
        getAll() {
          return cookieStore.getAll();
        },
        setAll(cookiesToSet) {
          try {
            cookiesToSet.forEach(({ name, value, options }) =>
              cookieStore.set(name, value, options)
            );
          } catch {
            // setAll se puede llamar desde un Server Component donde las cookies
            // son de solo lectura. Se puede ignorar si hay middleware refrescando sesiones.
          }
        },
      },
    }
  );
}
