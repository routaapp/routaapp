/**
 * Mock Auth — Sistema de autenticación simulada para testing
 * Usa localStorage para persistir la sesión sin base de datos.
 * Cuando Supabase esté listo, reemplazar estas funciones por los
 * equivalentes de supabase.auth.*
 */

export type MockUser = {
  type: "traveler" | "provider";
  name: string;
  email: string;
};

const STORAGE_KEY = "routa_mock_user";

export function getMockUser(): MockUser | null {
  if (typeof window === "undefined") return null;
  try {
    const raw = localStorage.getItem(STORAGE_KEY);
    if (!raw) return null;
    return JSON.parse(raw) as MockUser;
  } catch {
    return null;
  }
}

export function setMockUser(user: MockUser): void {
  if (typeof window === "undefined") return;
  localStorage.setItem(STORAGE_KEY, JSON.stringify(user));
}

export function clearMockUser(): void {
  if (typeof window === "undefined") return;
  localStorage.removeItem(STORAGE_KEY);
}

/** Iniciales para el avatar (ej: "Luis Mejía" → "LM") */
export function getInitials(name: string): string {
  return name
    .split(" ")
    .map((n) => n[0])
    .slice(0, 2)
    .join("")
    .toUpperCase();
}
