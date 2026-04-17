"use client";

import { useState } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import Logo from "@/components/ui/Logo";
import { setMockUser } from "@/lib/mock-auth";

type AccountType = "traveler" | "provider";

const PANEL_CONTENT = {
  traveler: { title: "Miles de experiencias\nte están esperando", subtitle: "Guías locales verificados. Pagos seguros. Aventuras reales en LATAM.", stats: [["500+", "Experiencias"], ["200+", "Guías"], ["★ 4.8", "Rating"]] },
  provider: { title: "Gestiona tu negocio\ndesde cualquier lugar", subtitle: "Dashboard completo. Reservas en tiempo real. Pagos automáticos.", stats: [["27", "Reservas activas"], ["$1,240", "Este mes"], ["★ 4.8", "Rating"]] },
};

const DEMO_USERS = {
  traveler: { name: "María González", email: "maria@email.com" },
  provider: { name: "Tours Samaná Pro", email: "tours@samana.com" },
};

function GoogleIcon() {
  return (
    <svg width="18" height="18" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
      <path d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z" fill="#4285F4"/>
      <path d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z" fill="#34A853"/>
      <path d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l3.66-2.84z" fill="#FBBC05"/>
      <path d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z" fill="#EA4335"/>
    </svg>
  );
}

function FacebookIcon() {
  return (
    <svg width="18" height="18" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg" fill="white">
      <path d="M24 12.073c0-6.627-5.373-12-12-12s-12 5.373-12 12c0 5.99 4.388 10.954 10.125 11.854v-8.385H7.078v-3.47h3.047V9.43c0-3.007 1.792-4.669 4.533-4.669 1.312 0 2.686.235 2.686.235v2.953H15.83c-1.491 0-1.956.925-1.956 1.874v2.25h3.328l-.532 3.47h-2.796v8.385C19.612 23.027 24 18.062 24 12.073z"/>
    </svg>
  );
}

function AppleIcon() {
  return (
    <svg width="18" height="18" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg" fill="white">
      <path d="M18.71 19.5c-.83 1.24-1.71 2.45-3.05 2.47-1.34.03-1.77-.79-3.29-.79-1.53 0-2 .77-3.27.82-1.31.05-2.3-1.32-3.14-2.53C4.25 17 2.94 12.45 4.7 9.39c.87-1.52 2.43-2.48 4.12-2.51 1.28-.02 2.5.87 3.29.87.78 0 2.26-1.07 3.8-.91.65.03 2.47.26 3.64 1.98-.09.06-2.17 1.28-2.15 3.81.03 3.02 2.65 4.03 2.68 4.04-.03.07-.42 1.44-1.38 2.83M13 3.5c.73-.83 1.94-1.46 2.94-1.5.13 1.17-.34 2.35-1.04 3.19-.69.85-1.83 1.51-2.95 1.42-.15-1.15.41-2.35 1.05-3.11z"/>
    </svg>
  );
}

const SOCIAL_PROVIDERS = [
  {
    id: "google",
    label: "Continuar con Google",
    icon: <GoogleIcon />,
    style: { backgroundColor: "white", color: "#374151", border: "1px solid #D1D5DB" },
    hoverClass: "hover:bg-gray-50",
  },
  {
    id: "facebook",
    label: "Continuar con Facebook",
    icon: <FacebookIcon />,
    style: { backgroundColor: "#1877F2", color: "white", border: "none" },
    hoverClass: "hover:opacity-90",
  },
  {
    id: "apple",
    label: "Continuar con Apple",
    icon: <AppleIcon />,
    style: { backgroundColor: "#000000", color: "white", border: "none" },
    hoverClass: "hover:opacity-90",
  },
];

function Spinner() {
  return (
    <svg className="animate-spin" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
      <path d="M21 12a9 9 0 11-18 0 9 9 0 0118 0z" opacity="0.3" />
      <path d="M3 12a9 9 0 019-9" strokeLinecap="round" />
    </svg>
  );
}

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
      {/* Panel lateral */}
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

      {/* Formulario */}
      <div className="flex-1 flex items-center justify-center px-6 py-10">
        <div className="w-full max-w-sm">
          <div className="lg:hidden mb-8 flex justify-center"><Logo size="md" /></div>
          <h1 className="text-2xl font-bold text-gray-900 mb-1">Bienvenido de vuelta</h1>
          <p className="text-gray-400 text-sm mb-6">Inicia sesión en tu cuenta</p>

          {/* Toggle viajero / proveedor */}
          <div className="flex rounded-xl overflow-hidden border border-gray-200 mb-6">
            {([["traveler", "🧳 Soy viajero"], ["provider", "🧭 Soy proveedor"]] as [AccountType, string][]).map(([type, label]) => (
              <button key={type} type="button" onClick={() => setAccountType(type)} className="flex-1 py-2.5 text-sm font-semibold transition-colors"
                style={{ backgroundColor: accountType === type ? "#2B5E41" : "white", color: accountType === type ? "white" : "#6b7280" }}>
                {label}
              </button>
            ))}
          </div>

          {/* Botones sociales */}
          <div className="space-y-2.5 mb-5">
            {SOCIAL_PROVIDERS.map(({ id, label, icon, style, hoverClass }) => (
              <button
                key={id}
                type="button"
                onClick={() => handleSocialLogin(id)}
                disabled={!!socialLoading}
                className={`w-full py-3 rounded-xl text-sm font-medium flex items-center justify-center gap-3 disabled:opacity-60 transition-opacity ${hoverClass}`}
                style={style}
              >
                {socialLoading === id ? <Spinner /> : icon}
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
              {loading ? <><Spinner />Entrando...</> : (accountType === "provider" ? "Entrar al dashboard →" : "Iniciar sesión")}
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
