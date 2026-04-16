"use client";

import { useState } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import Logo from "@/components/ui/Logo";
import { setMockUser } from "@/lib/mock-auth";

type AccountType = "traveler" | "provider";

export default function SignupPage() {
  const router = useRouter();
  const [accountType, setAccountType] = useState<AccountType>("traveler");
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    setLoading(true);
    await new Promise(r => setTimeout(r, 1500));
    setMockUser({ type: accountType, name: name || "Usuario", email });
    setLoading(false);
    router.push(accountType === "provider" ? "/dashboard" : "/");
    router.refresh();
  }

  return (
    <div className="min-h-screen flex" style={{ backgroundColor: "#FAFAF7" }}>
      <div className="hidden lg:flex flex-col justify-between w-1/2 p-12" style={{ backgroundColor: "#2B5E41" }}>
        <Link href="/"><Logo size="md" darkBg /></Link>
        <div className="text-white">
          <h2 className="text-4xl font-bold mb-4 leading-tight">
            {accountType === "traveler" ? "Descubre experiencias auténticas en LATAM" : "Llega a miles de viajeros en toda LATAM"}
          </h2>
          <ul className="text-green-200 space-y-3 text-sm">
            {(accountType === "traveler" ? ["✓ Guías locales verificados", "✓ Experiencias únicas", "✓ Pagos seguros en español", "✓ Cancelación flexible"] : ["✓ Lista tus experiencias gratis", "✓ Sin costo hasta tu primera reserva", "✓ Comisión justa del 15%", "✓ Dashboard para gestionar todo"]).map(item => <li key={item}>{item}</li>)}
          </ul>
        </div>
        <p className="text-green-300 text-xs">© 2026 Routa — itsrouta.com</p>
      </div>
      <div className="flex-1 flex items-center justify-center px-6 py-12">
        <div className="w-full max-w-sm">
          <div className="lg:hidden mb-8 flex justify-center"><Logo size="md" /></div>
          <h1 className="text-2xl font-bold text-gray-900 mb-1">Crear cuenta</h1>
          <p className="text-gray-400 text-sm mb-6">Únete a Routa gratis</p>
          <div className="flex rounded-xl overflow-hidden border border-gray-200 mb-6">
            {([["traveler", "🧳 Soy viajero"], ["provider", "🧭 Soy proveedor"]] as [AccountType, string][]).map(([type, label]) => (
              <button key={type} type="button" onClick={() => setAccountType(type)} className="flex-1 py-3 text-sm font-semibold transition-colors"
                style={{ backgroundColor: accountType === type ? "#2B5E41" : "white", color: accountType === type ? "white" : "#6b7280" }}>
                {label}
              </button>
            ))}
          </div>
          <form onSubmit={handleSubmit} className="space-y-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">{accountType === "provider" ? "Nombre de tu negocio" : "Nombre completo"}</label>
              <input type="text" value={name} onChange={e => setName(e.target.value)} required
                placeholder={accountType === "provider" ? "Tours Caribe Pro" : "Tu nombre"}
                className="w-full border border-gray-200 rounded-xl px-4 py-3 text-sm focus:outline-none focus:ring-2 focus:ring-green-400 bg-white" />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Email</label>
              <input type="email" value={email} onChange={e => setEmail(e.target.value)} required placeholder="tu@email.com"
                className="w-full border border-gray-200 rounded-xl px-4 py-3 text-sm focus:outline-none focus:ring-2 focus:ring-green-400 bg-white" />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Contraseña</label>
              <input type="password" value={password} onChange={e => setPassword(e.target.value)} required minLength={8} placeholder="Mínimo 8 caracteres"
                className="w-full border border-gray-200 rounded-xl px-4 py-3 text-sm focus:outline-none focus:ring-2 focus:ring-green-400 bg-white" />
            </div>
            <button type="submit" disabled={loading} className="w-full py-3.5 rounded-xl text-white font-semibold text-sm disabled:opacity-60 flex items-center justify-center gap-2" style={{ backgroundColor: "#E8694A" }}>
              {loading ? "Creando cuenta..." : `Crear cuenta ${accountType === "provider" ? "como proveedor" : "gratis"}`}
            </button>
          </form>
          <p className="text-center text-xs text-gray-400 mt-4">
            Al registrarte aceptas nuestros{" "}
            <Link href="/terms" className="underline">Términos de uso</Link>{" "}
            y{" "}
            <Link href="/privacy" className="underline">Política de privacidad</Link>
          </p>
          <p className="text-center text-sm text-gray-500 mt-6">
            ¿Ya tienes cuenta?{" "}
            <Link href="/login" className="font-semibold hover:underline" style={{ color: "#3DAA7A" }}>Iniciar sesión</Link>
          </p>
        </div>
      </div>
    </div>
  );
}
