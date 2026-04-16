"use client";

import { useState } from "react";
import Link from "next/link";
import Navbar from "@/components/ui/Navbar";
import Logo from "@/components/ui/Logo";

export default function BookingConfirmPage() {
  const [step, setStep] = useState<1 | 2 | 3>(1);
  const [loading, setLoading] = useState(false);

  async function handlePay() {
    setLoading(true);
    await new Promise(r => setTimeout(r, 2000));
    setStep(3);
    setLoading(false);
  }

  if (step === 3) {
    return (
      <div style={{ backgroundColor: "#FAFAF7", minHeight: "100vh" }}>
        <Navbar />
        <div className="max-w-lg mx-auto px-4 py-16 text-center">
          <div className="w-24 h-24 rounded-full flex items-center justify-center mx-auto mb-6 text-4xl" style={{ backgroundColor: "#3DAA7A20" }}>
            🎉
          </div>
          <h1 className="text-3xl font-bold text-gray-900 mb-3">¡Reserva confirmada!</h1>
          <p className="text-gray-500 mb-2">Te enviamos los detalles a tu email.</p>
          <p className="text-sm font-semibold mb-8" style={{ color: "#3DAA7A" }}>Código de reserva: #ROT-20260420-001</p>
          <div className="bg-white rounded-2xl border border-gray-100 p-6 text-left mb-8 shadow-sm">
            <h3 className="font-semibold text-gray-900 mb-4">Resumen de tu reserva</h3>
            <div className="space-y-2 text-sm text-gray-600">
              <div className="flex justify-between"><span>Experiencia</span><span className="font-medium text-gray-900">Excursión a Los Haitises</span></div>
              <div className="flex justify-between"><span>Fecha</span><span>20 de abril, 2026</span></div>
              <div className="flex justify-between"><span>Personas</span><span>2 personas</span></div>
              <div className="flex justify-between font-semibold text-gray-900 pt-2 border-t border-gray-100"><span>Total pagado</span><span>$139</span></div>
            </div>
          </div>
          <div className="flex flex-col gap-3">
            <Link href="/" className="py-3 rounded-xl text-white font-semibold text-sm" style={{ backgroundColor: "#E8694A" }}>
              Descubrir más experiencias
            </Link>
            <Link href="/profile/bookings" className="py-3 rounded-xl font-semibold text-sm border border-gray-200 text-gray-700">
              Ver mis reservas
            </Link>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div style={{ backgroundColor: "#FAFAF7", minHeight: "100vh" }}>
      <Navbar />
      <div className="max-w-4xl mx-auto px-4 py-8">
        <h1 className="text-2xl font-bold text-gray-900 mb-2">Confirmar reserva</h1>

        {/* Steps */}
        <div className="flex items-center gap-2 mb-8">
          {[["1", "Datos"], ["2", "Pago"], ["3", "Confirmación"]].map(([n, label], i) => (
            <div key={n} className="flex items-center gap-2">
              <div
                className="w-7 h-7 rounded-full flex items-center justify-center text-xs font-bold"
                style={step > i ? { backgroundColor: "#3DAA7A", color: "white" } : step === i + 1 ? { backgroundColor: "#2B5E41", color: "white" } : { backgroundColor: "#E5E7EB", color: "#9CA3AF" }}
              >
                {step > i + 1 ? "✓" : n}
              </div>
              <span className={`text-sm ${step === i + 1 ? "font-semibold text-gray-900" : "text-gray-400"}`}>{label}</span>
              {i < 2 && <div className="w-8 h-px bg-gray-200" />}
            </div>
          ))}
        </div>

        <div className="flex flex-col lg:flex-row gap-6">

          {/* Formulario */}
          <div className="flex-1">
            {step === 1 && (
              <div className="bg-white rounded-2xl border border-gray-100 p-6 shadow-sm">
                <h2 className="font-semibold text-gray-900 mb-5">Datos del viajero</h2>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  {[["Nombre", "Tu nombre"], ["Apellido", "Tu apellido"], ["Email", "tu@email.com"], ["WhatsApp", "+1 809 000 0000"]].map(([label, placeholder]) => (
                    <div key={label}>
                      <label className="block text-xs font-semibold text-gray-600 mb-1">{label}</label>
                      <input type="text" placeholder={placeholder} className="w-full border border-gray-200 rounded-xl px-4 py-2.5 text-sm focus:outline-none focus:ring-1 focus:ring-green-400" />
                    </div>
                  ))}
                  <div className="md:col-span-2">
                    <label className="block text-xs font-semibold text-gray-600 mb-1">Notas para el proveedor (opcional)</label>
                    <textarea rows={3} placeholder="¿Alergias? ¿Nivel de experiencia? ¿Alguna petición especial?" className="w-full border border-gray-200 rounded-xl px-4 py-2.5 text-sm focus:outline-none focus:ring-1 focus:ring-green-400 resize-none" />
                  </div>
                </div>
                <button
                  onClick={() => setStep(2)}
                  className="mt-6 w-full py-3.5 rounded-xl text-white font-semibold text-sm"
                  style={{ backgroundColor: "#E8694A" }}
                >
                  Continuar al pago →
                </button>
              </div>
            )}

            {step === 2 && (
              <div className="bg-white rounded-2xl border border-gray-100 p-6 shadow-sm">
                <h2 className="font-semibold text-gray-900 mb-5">Método de pago</h2>
                <div className="border-2 border-green-400 rounded-xl p-4 mb-4 flex items-center gap-3 cursor-pointer">
                  <div className="w-5 h-5 rounded-full border-2 border-green-500 flex items-center justify-center">
                    <div className="w-2.5 h-2.5 rounded-full bg-green-500" />
                  </div>
                  <span className="text-sm font-medium text-gray-900">💳 Tarjeta de crédito / débito</span>
                </div>
                <div className="space-y-3">
                  <div>
                    <label className="block text-xs font-semibold text-gray-600 mb-1">Número de tarjeta</label>
                    <input type="text" placeholder="1234 5678 9012 3456" className="w-full border border-gray-200 rounded-xl px-4 py-2.5 text-sm focus:outline-none font-mono" />
                  </div>
                  <div className="grid grid-cols-2 gap-3">
                    <div>
                      <label className="block text-xs font-semibold text-gray-600 mb-1">Vencimiento</label>
                      <input type="text" placeholder="MM/AA" className="w-full border border-gray-200 rounded-xl px-4 py-2.5 text-sm focus:outline-none" />
                    </div>
                    <div>
                      <label className="block text-xs font-semibold text-gray-600 mb-1">CVC</label>
                      <input type="text" placeholder="123" className="w-full border border-gray-200 rounded-xl px-4 py-2.5 text-sm focus:outline-none" />
                    </div>
                  </div>
                </div>
                <div className="mt-4 p-3 bg-gray-50 rounded-xl flex items-center gap-2 text-xs text-gray-500">
                  🔒 Pago seguro procesado por Stripe. Routa nunca almacena tus datos de tarjeta.
                </div>
                <button
                  onClick={handlePay}
                  disabled={loading}
                  className="mt-6 w-full py-3.5 rounded-xl text-white font-semibold text-sm flex items-center justify-center gap-2 disabled:opacity-60"
                  style={{ backgroundColor: "#E8694A" }}
                >
                  {loading ? (
                    <>
                      <svg className="animate-spin" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                        <path d="M21 12a9 9 0 11-18 0 9 9 0 0118 0z" opacity="0.3" />
                        <path d="M3 12a9 9 0 019-9" strokeLinecap="round" />
                      </svg>
                      Procesando pago...
                    </>
                  ) : "Confirmar y pagar $139"}
                </button>
              </div>
            )}
          </div>

          {/* Resumen */}
          <div className="lg:w-72 flex-shrink-0">
            <div className="bg-white rounded-2xl border border-gray-100 p-5 shadow-sm sticky top-24">
              <h3 className="font-semibold text-gray-900 mb-4">Resumen</h3>
              <div className="flex items-center gap-3 mb-4 pb-4 border-b border-gray-100">
                <div className="w-14 h-14 rounded-xl flex items-center justify-center text-2xl flex-shrink-0" style={{ backgroundColor: "#6FCFAB20" }}>🌿</div>
                <div>
                  <p className="font-medium text-gray-900 text-sm">Excursión a Los Haitises</p>
                  <p className="text-xs text-gray-400">20 abr · 2 personas · 8h</p>
                </div>
              </div>
              <div className="space-y-2 text-sm text-gray-600">
                <div className="flex justify-between"><span>$65 × 2 personas</span><span>$130</span></div>
                <div className="flex justify-between"><span>Tarifa de servicio</span><span>$9</span></div>
                <div className="flex justify-between font-bold text-gray-900 pt-2 border-t border-gray-100"><span>Total</span><span>$139</span></div>
              </div>
              <div className="mt-4 pt-4 border-t border-gray-100 text-xs text-gray-400 space-y-1">
                <p>✓ Cancelación gratis hasta 24h antes</p>
                <p>✓ Guía certificado incluido</p>
              </div>
            </div>
          </div>

        </div>
      </div>
    </div>
  );
}
