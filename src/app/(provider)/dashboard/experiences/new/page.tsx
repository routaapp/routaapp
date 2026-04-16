"use client";
import { useState } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";

const INPUT = "w-full border border-gray-200 rounded-xl px-4 py-2.5 text-sm text-gray-900 placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-green-400 bg-white";
const SELECT = "w-full border border-gray-200 rounded-xl px-4 py-2.5 text-sm text-gray-900 focus:outline-none focus:ring-2 focus:ring-green-400 bg-white";
const TEXTAREA = "w-full border border-gray-200 rounded-xl px-4 py-2.5 text-sm text-gray-900 placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-green-400 bg-white resize-none";

export default function NewExperiencePage() {
  const router = useRouter();
  const [step, setStep] = useState<1 | 2 | 3>(1);
  const [saving, setSaving] = useState(false);

  async function handlePublish() {
    setSaving(true);
    await new Promise(r => setTimeout(r, 1500));
    router.push("/dashboard/experiences");
  }

  return (
    <>
      <div className="flex items-center gap-3 mb-8">
        <Link href="/dashboard/experiences" className="text-gray-400 hover:text-gray-700 text-sm">← Mis experiencias</Link>
        <span className="text-gray-300">/</span>
        <span className="text-sm font-semibold text-gray-700">Nueva experiencia</span>
      </div>
      <h1 className="text-2xl font-bold text-gray-900 mb-8">Crear experiencia</h1>
      <div className="max-w-2xl">
        {step === 1 && (
          <div className="bg-white rounded-2xl border border-gray-100 p-6 shadow-sm space-y-4">
            <h2 className="font-semibold text-gray-900">Información básica</h2>
            <div><label className="block text-xs font-semibold text-gray-600 mb-1">Título</label><input type="text" placeholder="Ej: Tour nocturno por el centro histórico" className={INPUT} /></div>
            <div><label className="block text-xs font-semibold text-gray-600 mb-1">Categoría</label><select className={SELECT}><option value="">Selecciona una categoría</option><option>Aventura</option><option>Naturaleza</option><option>Playa</option><option>Gastronomía</option><option>Cultural</option><option>Noche</option></select></div>
            <div><label className="block text-xs font-semibold text-gray-600 mb-1">Ubicación</label><input type="text" placeholder="Ej: Samaná, República Dominicana" className={INPUT} /></div>
            <div><label className="block text-xs font-semibold text-gray-600 mb-1">Descripción</label><textarea rows={3} placeholder="Describe tu experiencia..." className={TEXTAREA} /></div>
            <button onClick={() => setStep(2)} className="w-full py-3 rounded-xl text-white font-semibold text-sm" style={{ backgroundColor: "#E8694A" }}>Continuar →</button>
          </div>
        )}
        {step === 2 && (
          <div className="bg-white rounded-2xl border border-gray-100 p-6 shadow-sm space-y-4">
            <h2 className="font-semibold text-gray-900">Detalles</h2>
            <div className="grid grid-cols-2 gap-4">
              <div><label className="block text-xs font-semibold text-gray-600 mb-1">Duración (horas)</label><input type="number" min="1" placeholder="4" className={INPUT} /></div>
              <div><label className="block text-xs font-semibold text-gray-600 mb-1">Grupo máximo</label><input type="number" min="1" placeholder="10" className={INPUT} /></div>
            </div>
            <div><label className="block text-xs font-semibold text-gray-600 mb-1">¿Qué incluye?</label><textarea rows={3} placeholder="Transporte, almuerzo..." className={TEXTAREA} /></div>
            <div className="flex gap-3">
              <button onClick={() => setStep(1)} className="flex-1 py-3 rounded-xl border border-gray-200 text-sm font-medium text-gray-600">← Atrás</button>
              <button onClick={() => setStep(3)} className="flex-1 py-3 rounded-xl text-white font-semibold text-sm" style={{ backgroundColor: "#E8694A" }}>Continuar →</button>
            </div>
          </div>
        )}
        {step === 3 && (
          <div className="bg-white rounded-2xl border border-gray-100 p-6 shadow-sm space-y-4">
            <h2 className="font-semibold text-gray-900">Precio y publicación</h2>
            <div>
              <label className="block text-xs font-semibold text-gray-600 mb-1">Precio por persona (USD)</label>
              <div className="relative"><span className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-500 text-sm font-medium">$</span><input type="number" min="1" placeholder="0" className="w-full border border-gray-200 rounded-xl pl-8 pr-4 py-2.5 text-sm focus:outline-none focus:ring-2 focus:ring-green-400 bg-white" /></div>
              <p className="text-xs text-gray-400 mt-1">Recibirás el 85% de cada reserva.</p>
            </div>
            <div className="flex gap-3">
              <button onClick={() => setStep(2)} className="flex-1 py-3 rounded-xl border border-gray-200 text-sm font-medium text-gray-600">← Atrás</button>
              <button onClick={handlePublish} disabled={saving} className="flex-1 py-3 rounded-xl text-white font-semibold text-sm disabled:opacity-60" style={{ backgroundColor: "#E8694A" }}>
                {saving ? "Publicando..." : "Publicar experiencia"}
              </button>
            </div>
          </div>
        )}
      </div>
    </>
  );
}
