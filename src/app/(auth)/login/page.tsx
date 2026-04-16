"use client";

import { useState } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import Logo from "@/components/ui/Logo";
import { setMockUser } from "@/lib/mock-auth";

type AccountType = "traveler" | "provider";

const PANEL_CONTENT = {
  traveler: { title: "Miles de experiencias\nte están esperando", subtitle: "Guías locales verificados. Pagos seguros. Aventuras reales en LATAM.", stats: [["500+", "Experiencias"], ["200+", "Guías"], ["⭐ 4.8", "Rating"]] },
  provider: { title: "Gestiona tu negocio\ndesde cualquier lugar", subtitle: "Dashboard completo. Reservas en tiempo real. Pagos automáticos.", stats: [["27", "Reservas activas"], ["$1,240", "Este mes"], ["⭐ 4.8", "Rating"]] },
};

const DEMO_USERS = {
  traveler: { name: "María González", email: "maria@email.com" },
  provider: { name: "Tours Samaná Pro", email: "tours@samana.com" },
};

export default function LoginPage() {
  const router = useRouter();
  const [accountType, setAccountType] = useState<AccountType>("traveler");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);
  const [socialLoading, setSocialLoading] = useState<string | null>(null);

  const panel = PANEL_CONTENT[accountType];

  async function handleLogin(e: React.FormEvent) {
    e.preventDefault();
    setLoading(true);
    await new Promise(r => setTimeout(r, 1200));
    const demoUser = DEMO_USERS[accountType];
    setMockUser({ type: accountType, name: email.includes("@") ? email.split("@")[0] : demoUser.name, email: email || demoUser.email });
    setLoading(false);
    router.push(accountType === "provider" ? "/dashboard" : "/");
    router.refresh();
  }

  async function handleSocialLogin(provider: string) {
    setSocialLoading(provider);
    await new Promise(r => setTimeout(r, 1000));
    setMockUser({ type: accountType, name: DEMO_USERS[accountType].name, email: DEMO_USERS[accountType].email });
    setSocialLoading(null);
    router.push(accountType === "provider" ? "/dashboard" : "/");
    router.refresh();
  }

  return (
    <div className="min-h-screen flex" style={{ backgroundColor: "#FAFAF7" }}>
      <div className="hidden lg:flex flex-col justify-between w-1/2 p-12" style={{ backgroundColor: "#2B5E41" }}>
        <Link href="/"><Logo size="md" darkBg /></Link>
        <div className="text-white">
          <h2 className="text-4xl font-bold mb-4 leading-tight whitespace-pre-line">{panel.title}</h2>
          <p className="text-green-200 text-lg">{panel.subtitle}</p>
          <div className="flex gap-6 mt-10 text-sm text-green-100">
            {panel.stats.map(([n, l]) => (
              <div key={l}><p className="text-2xl font-bold text-white">{n}</p><p>{l}</p></div>
            ))}
          </div>
        </div>
        <p className="text-green-300 text-xs">© 2026 Routa — itsrouta.com</p>
      </div>
      <div className="flex-1 flex items-center justify-center px-6 py-10">
        <div className="w-full max-w-sm">
          <div className="lg:hidden mb-8 flex justify-center"><Logo size="md" /></div>
          <h1 className="text-2xl font-bold text-gray-900 mb-1">Bienvenido de vuelta</h1>
          <p className="text-gray-400 text-sm mb-6">Inicia sesión en tu cuenta</p>
          <div className="flex rounded-xl overflow-hidden border border-gray-200 mb-6">
            {([["traveler", "🧳 Soy viajero"], ["provider", "🧭 Soy proveedor"]] as [AccountType, string][]).map(([type, label]) => (
              <button key={type} type="button" onClick={() => setAccountType(type)} className="flex-1 py-2.5 text-sm font-semibold transition-colors"
                style={{ backgroundColor: accountType === type ? "#2B5E41" : "white", color: accountType === type ? "white" : "#6b7280" }}>
                {label}
              </button>
            ))}
          </div>
          <div className="space-y-2.5 mb-5">
            {[["google", "Continuar con Google"], ["facebook", "Continuar con Facebook"], ["apple", "Continuar con Apple"]].map(([prov, label]) => (
              <button key={prov} type="button" onClick={() => handleSocialLogin(prov)} disabled={!!socialLoading}
                className="w-full py-3 rounded-xl border border-gray-200 text-sm font-medium text-gray-700 hover:bg-gray-50 flex items-center justify-center gap-3 bg-white disabled:opacity-60 transition-colors">
                {socialLoading === prov ? (
                  <svg className="animate-spin" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                    <path d="M21 12a9 9 0 11-18 0 9 9 0 0118 0z" opacity="0.3" /><path d="M3 12a9 9 0 019-9" strokeLinecap="round" />
                  </svg>
                ) : <span>{prov === "google" ? "G" : prov === "facebook" ? "f" : ""}</span>}
                {label}
              </button>
            ))}
          </div>
          <div className="relative my-5">
            <div className="absolute inset-0 flex items-center"><div className="w-full border-t border-gray-200" /></div>
            <div className="relative flex justify-center text-xs text-gray-400"><span className="px-3 bg-[#FAFAF7]">o inicia sesión con email</span></div>
          </div>
          <form onSubmit={handleLogin} className="space-y-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Email</label>
              <input type="email" value={email} onChange={e => setEmail(e.target.value)} required placeholder="tu@email.com"
                className="w-full border border-gray-200 rounded-xl px-4 py-3 text-sm text-gray-900 placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-green-400 bg-white" />
            </div>
            <div>
              <div className="flex justify-between mb-1">
                <label className="text-sm font-medium text-gray-700">Contraseña</label>
                <Link href="/forgot-password" className="text-xs hover:underline" style={{ color: "#3DAA7A" }}>¿Olvidaste tu contraseña?</Link>
              </div>
              <input type="password" value={password} onChange={e => setPassword(e.target.value)} required placeholder="••••••••"
                className="w-full border border-gray-200 rounded-xl px-4 py-3 text-sm text-gray-900 focus:outline-none focus:ring-2 focus:ring-green-400 bg-white" />
            </div>
            <button type="submit" disabled={loading} className="w-full py-3.5 rounded-xl text-white font-semibold text-sm disabled:opacity-60 flex items-center justify-center gap-2" style={{ backgroundColor: "#E8694A" }}>
              {loading ? (
                <><svg className="animate-spin" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                  <path d="M21 12a9 9 0 11-18 0 9 9 0 0118 0z" opacity="0.3" /><path d="M3 12a9 9 0 019-9" strokeLinecap="round" />
                </svg>Entrando...</>
              ) : (accountType === "provider" ? "Entrar al dashboard →" : "Iniciar sesión")}
            </button>
          </form>
          <p className="text-center text-sm text-gray-500 mt-6">
            ¿No tienes cuenta?{" "}
            <Link href="/signup" className="font-semibold hover:underline" style={{ color: "#3DAA7A" }}>Regístrate gratis</Link>
          </p>
        </div>
      </div>
    </div>
  );
}
