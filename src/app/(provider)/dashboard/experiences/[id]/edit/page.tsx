"use client";
import { useState } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";

const INPUT = "w-full border border-gray-200 rounded-xl px-4 py-2.5 text-sm text-gray-900 focus:outline-none focus:ring-2 focus:ring-green-400 bg-white";
const TEXTAREA = "w-full border border-gray-200 rounded-xl px-4 py-2.5 text-sm text-gray-900 focus:outline-none focus:ring-2 focus:ring-green-400 bg-white resize-none";

export default function EditExperiencePage() {
  const router = useRouter();
  const [saving, setSaving] = useState(false);
  const [saved, setSaved] = useState(false);

  async function handleSave(e: React.FormEvent) {
    e.preventDefault();
    setSaving(true);
    await new Promise(r => setTimeout(r, 1000));
    setSaving(false);
    setSaved(true);
    setTimeout(() => setSaved(false), 3000);
  }

  return (
    <>
      <div className="flex items-center gap-3 mb-8">
        <Link href="/dashboard/experiences" className="text-gray-400 hover:text-gray-700 text-sm">← Mis experiencias</Link>
        <span className="text-gray-300">/</span>
        <span className="text-sm font-semibold text-gray-700">Editar experiencia</span>
      </div>
      <div className="flex items-center justify-between mb-6">
        <h1 className="text-2xl font-bold text-gray-900">Editar experiencia</h1>
        <span className="text-xs px-2.5 py-1 rounded-full font-medium" style={{ backgroundColor: "#DCFCE7", color: "#166534" }}>Activa</span>
      </div>
      <form onSubmit={handleSave} className="max-w-2xl space-y-5">
        <div className="bg-white rounded-2xl border border-gray-100 p-6 shadow-sm space-y-4">
          <h2 className="font-semibold text-gray-900">Información básica</h2>
          <div><label className="block text-xs font-semibold text-gray-600 mb-1">Título</label><input type="text" defaultValue="Excursión a Los Haitises" className={INPUT} /></div>
          <div><label className="block text-xs font-semibold text-gray-600 mb-1">Ubicación</label><input type="text" defaultValue="Samaná, República Dominicana" className={INPUT} /></div>
          <div><label className="block text-xs font-semibold text-gray-600 mb-1">Descripción</label><textarea rows={4} defaultValue="Descubre la majestuosidad del Parque Nacional Los Haitises." className={TEXTAREA} /></div>
        </div>
        <div className="bg-white rounded-2xl border border-gray-100 p-6 shadow-sm space-y-4">
          <h2 className="font-semibold text-gray-900">Detalles</h2>
          <div className="grid grid-cols-2 gap-4">
            <div><label className="block text-xs font-semibold text-gray-600 mb-1">Duración (horas)</label><input type="number" defaultValue={8} className={INPUT} /></div>
            <div><label className="block text-xs font-semibold text-gray-600 mb-1">Precio (USD/persona)</label><input type="number" defaultValue={65} className={INPUT} /></div>
          </div>
        </div>
        <div className="flex items-center justify-between">
          <button type="button" onClick={() => router.back()} className="px-6 py-2.5 rounded-xl border border-gray-200 text-sm font-medium text-gray-600">Cancelar</button>
          <div className="flex items-center gap-3">
            {saved && <span className="text-sm font-medium" style={{ color: "#3DAA7A" }}>✓ Cambios guardados</span>}
            <button type="submit" disabled={saving} className="px-8 py-2.5 rounded-xl text-white font-semibold text-sm disabled:opacity-60" style={{ backgroundColor: "#3DAA7A" }}>
              {saving ? "Guardando..." : "Guardar cambios"}
            </button>
          </div>
        </div>
      </form>
    </>
  );
}
