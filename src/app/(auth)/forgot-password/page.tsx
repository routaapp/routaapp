"use client";

import { useState } from "react";
import Link from "next/link";
import Logo from "@/components/ui/Logo";

export default function ForgotPasswordPage() {
  const [email, setEmail] = useState("");
  const [sent, setSent] = useState(false);
  const [loading, setLoading] = useState(false);

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    setLoading(true);
    // MOCK: simula envío de email
    await new Promise(r => setTimeout(r, 1200));
    setSent(true);
    setLoading(false);
  }

  return (
    <div className="min-h-screen flex" style={{ backgroundColor: "#FAFAF7" }}>

      {/* Panel izquierdo */}
      <div className="hidden lg:flex flex-col justify-between w-1/2 p-12" style={{ backgroundColor: "#2B5E41" }}>
        <Link href="/"><Logo size="md" darkBg /></Link>
        <div className="text-white">
          <h2 className="text-4xl font-bold mb-4 leading-tight">
            No te preocupes,<br />te ayudamos a entrar
          </h2>
          <p className="text-green-200 text-lg">
            Te enviamos un enlace para restablecer tu contraseña en segundos.
          </p>
        </div>
        <p className="text-green-300 text-xs">© 2026 Routa — itsrouta.com</p>
      </div>

      {/* Panel derecho */}
      <div className="flex-1 flex items-center justify-center px-6 py-12">
        <div className="w-full max-w-sm">

          <div className="lg:hidden mb-8 flex justify-center">
            <Logo size="md" />
          </div>

          {sent ? (
            <div className="text-center">
              <div className="w-20 h-20 rounded-full flex items-center justify-center mx-auto mb-5 text-3xl" style={{ backgroundColor: "#3DAA7A20" }}>
                ✉️
              </div>
              <h1 className="text-2xl font-bold text-gray-900 mb-2">¡Revisa tu email!</h1>
              <p className="text-gray-400 text-sm mb-6">
                Enviamos un enlace de recuperación a <strong>{email}</strong>.
                Revisa también tu carpeta de spam.
              </p>
              <Link href="/login" className="text-sm font-semibold" style={{ color: "#3DAA7A" }}>
                ← Volver al inicio de sesión
              </Link>
            </div>
          ) : (
            <>
              <h1 className="text-2xl font-bold text-gray-900 mb-1">¿Olvidaste tu contraseña?</h1>
              <p className="text-gray-400 text-sm mb-8">
                Escribe tu email y te enviamos un enlace para restablecerla.
              </p>

              <form onSubmit={handleSubmit} className="space-y-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Email</label>
                  <input
                    type="email"
                    value={email}
                    onChange={e => setEmail(e.target.value)}
                    required
                    placeholder="tu@email.com"
                    className="w-full border border-gray-200 rounded-xl px-4 py-3 text-sm focus:outline-none focus:ring-2 focus:ring-green-400 bg-white"
                  />
                </div>

                <button
                  type="submit"
                  disabled={loading}
                  className="w-full py-3.5 rounded-xl text-white font-semibold text-sm disabled:opacity-60 flex items-center justify-center gap-2"
                  style={{ backgroundColor: "#E8694A" }}
                >
                  {loading ? (
                    <>
                      <svg className="animate-spin" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                        <path d="M21 12a9 9 0 11-18 0 9 9 0 0118 0z" opacity="0.3" />
                        <path d="M3 12a9 9 0 019-9" strokeLinecap="round" />
                      </svg>
                      Enviando enlace...
                    </>
                  ) : "Enviar enlace de recuperación"}
                </button>
              </form>

              <p className="text-center text-sm text-gray-500 mt-8">
                <Link href="/login" className="font-semibold hover:underline" style={{ color: "#3DAA7A" }}>
                  ← Volver al inicio de sesión
                </Link>
              </p>
            </>
          )}
        </div>
      </div>
    </div>
  );
}
