"use client";

import { useState } from "react";
import Link from "next/link";
import Navbar from "@/components/ui/Navbar";

export default function ContactPage() {
  const [sent, setSent] = useState(false);
  const [loading, setLoading] = useState(false);
  const [type, setType] = useState("viajero");

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    setLoading(true);
    await new Promise(r => setTimeout(r, 1200));
    setSent(true);
    setLoading(false);
  }

  return (
    <div style={{ backgroundColor: "#FAFAF7", minHeight: "100vh" }}>
      <Navbar />

      <section className="max-w-4xl mx-auto px-4 py-14">
        <div className="text-center mb-10">
          <span className="inline-block text-sm font-semibold px-4 py-1.5 rounded-full mb-5" style={{ backgroundColor: "#3DAA7A20", color: "#2B5E41" }}>
            Estamos aquí para ayudarte
          </span>
          <h1 className="text-4xl font-bold mb-4" style={{ color: "#2B5E41" }}>Contáctanos</h1>
          <p className="text-gray-500 text-lg max-w-xl mx-auto">
            ¿Tienes una pregunta, sugerencia o quieres ser proveedor? Escríbenos y te respondemos en menos de 24 horas.
          </p>
        </div>

        <div className="grid md:grid-cols-5 gap-8">

          {/* Info */}
          <div className="md:col-span-2 space-y-5">
            {[
              { icon: "📧", title: "Email", detail: "hola@itsrouta.com", sub: "Respuesta en menos de 24h" },
              { icon: "💬", title: "WhatsApp", detail: "+1 809 000 0000", sub: "Lunes a viernes, 9am–6pm" },
              { icon: "🌎", title: "Cobertura", detail: "Rep. Dom · Colombia · México · Perú", sub: "Expandiéndonos a más países" },
            ].map(item => (
              <div key={item.title} className="bg-white rounded-2xl border border-gray-100 p-5 shadow-sm flex gap-4">
                <div className="text-2xl">{item.icon}</div>
                <div>
                  <p className="font-semibold text-gray-900">{item.title}</p>
                  <p className="text-sm text-gray-700 mt-0.5">{item.detail}</p>
                  <p className="text-xs text-gray-400 mt-0.5">{item.sub}</p>
                </div>
              </div>
            ))}
          </div>

          {/* Formulario */}
          <div className="md:col-span-3">
            {sent ? (
              <div className="bg-white rounded-2xl border border-gray-100 p-10 text-center shadow-sm">
                <div className="text-5xl mb-4">🎉</div>
                <h2 className="text-xl font-bold text-gray-900 mb-2">¡Mensaje enviado!</h2>
                <p className="text-gray-500 mb-6">Te respondemos en menos de 24 horas a tu email.</p>
                <Link href="/" className="text-sm font-semibold" style={{ color: "#3DAA7A" }}>Volver al inicio →</Link>
              </div>
            ) : (
              <form onSubmit={handleSubmit} className="bg-white rounded-2xl border border-gray-100 p-6 shadow-sm space-y-4">
                {/* Tipo */}
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">Soy...</label>
                  <div className="flex rounded-xl overflow-hidden border border-gray-200">
                    {[["viajero", "🧳 Viajero"], ["proveedor", "🧭 Proveedor"], ["otro", "💬 Otro"]].map(([val, label]) => (
                      <button
                        key={val}
                        type="button"
                        onClick={() => setType(val)}
                        className="flex-1 py-2.5 text-sm font-medium transition-colors"
                        style={{
                          backgroundColor: type === val ? "#2B5E41" : "white",
                          color: type === val ? "white" : "#6b7280",
                        }}
                      >
                        {label}
                      </button>
                    ))}
                  </div>
                </div>

                {/* Nombre + Email */}
                <div className="grid grid-cols-2 gap-3">
                  <div>
                    <label className="block text-xs font-semibold text-gray-600 mb-1">Nombre</label>
                    <input required type="text" placeholder="Tu nombre" className="w-full border border-gray-200 rounded-xl px-4 py-2.5 text-sm focus:outline-none focus:ring-2 focus:ring-green-400" />
                  </div>
                  <div>
                    <label className="block text-xs font-semibold text-gray-600 mb-1">Email</label>
                    <input required type="email" placeholder="tu@email.com" className="w-full border border-gray-200 rounded-xl px-4 py-2.5 text-sm focus:outline-none focus:ring-2 focus:ring-green-400" />
                  </div>
                </div>

                {/* Asunto */}
                <div>
                  <label className="block text-xs font-semibold text-gray-600 mb-1">Asunto</label>
                  <input required type="text" placeholder="¿En qué te podemos ayudar?" className="w-full border border-gray-200 rounded-xl px-4 py-2.5 text-sm focus:outline-none focus:ring-2 focus:ring-green-400" />
                </div>

                {/* Mensaje */}
                <div>
                  <label className="block text-xs font-semibold text-gray-600 mb-1">Mensaje</label>
                  <textarea required rows={4} placeholder="Cuéntanos más..." className="w-full border border-gray-200 rounded-xl px-4 py-2.5 text-sm focus:outline-none focus:ring-2 focus:ring-green-400 resize-none" />
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
                      Enviando...
                    </>
                  ) : "Enviar mensaje"}
                </button>
              </form>
            )}
          </div>
        </div>
      </section>
    </div>
  );
}
