"use client";

import { useState } from "react";

export default function DashboardProfilePage() {
  const [saved, setSaved] = useState(false);

  async function handleSave(e: React.FormEvent) {
    e.preventDefault();
    await new Promise(r => setTimeout(r, 800));
    setSaved(true);
    setTimeout(() => setSaved(false), 3000);
  }

  return (
    <>
      <div className="mb-8">
        <h1 className="text-2xl font-bold text-gray-900">Mi perfil</h1>
        <p className="text-gray-400 text-sm mt-0.5">Información de tu cuenta de proveedor</p>
      </div>

      <div className="grid md:grid-cols-3 gap-6">

        {/* Avatar / identidad */}
        <div className="bg-white rounded-2xl border border-gray-100 p-6 shadow-sm text-center h-fit">
          <div className="w-20 h-20 rounded-full flex items-center justify-center text-4xl mx-auto mb-4" style={{ backgroundColor: "#3DAA7A20" }}>
            🧭
          </div>
          <h2 className="font-bold text-gray-900">Tours Samaná Pro</h2>
          <p className="text-sm text-gray-400 mt-0.5">Proveedor verificado ✓</p>
          <div className="mt-4 pt-4 border-t border-gray-100 space-y-2 text-sm text-gray-600">
            <div className="flex justify-between"><span className="text-gray-400">Experiencias</span><span className="font-medium">3</span></div>
            <div className="flex justify-between"><span className="text-gray-400">Reservas</span><span className="font-medium">27</span></div>
            <div className="flex justify-between"><span className="text-gray-400">Rating</span><span className="font-medium">⭐ 4.8</span></div>
          </div>
          <button className="mt-5 w-full py-2 rounded-xl border border-gray-200 text-sm text-gray-600 hover:bg-gray-50">
            Cambiar foto
          </button>
        </div>

        {/* Formulario */}
        <div className="md:col-span-2">
          <form onSubmit={handleSave} className="bg-white rounded-2xl border border-gray-100 p-6 shadow-sm space-y-5">
            <h2 className="font-semibold text-gray-900 mb-1">Información del negocio</h2>

            <div className="grid grid-cols-2 gap-4">
              <div>
                <label className="block text-xs font-semibold text-gray-600 mb-1">Nombre del negocio</label>
                <input type="text" defaultValue="Tours Samaná Pro" className="w-full border border-gray-200 rounded-xl px-4 py-2.5 text-sm focus:outline-none focus:ring-2 focus:ring-green-400" />
              </div>
              <div>
                <label className="block text-xs font-semibold text-gray-600 mb-1">Tipo de negocio</label>
                <select className="w-full border border-gray-200 rounded-xl px-4 py-2.5 text-sm focus:outline-none focus:ring-2 focus:ring-green-400 bg-white">
                  <option>Guía independiente</option>
                  <option>Agencia de viajes</option>
                  <option>Empresa turística</option>
                </select>
              </div>
            </div>

            <div className="grid grid-cols-2 gap-4">
              <div>
                <label className="block text-xs font-semibold text-gray-600 mb-1">Email</label>
                <input type="email" defaultValue="tours@samana.com" className="w-full border border-gray-200 rounded-xl px-4 py-2.5 text-sm focus:outline-none focus:ring-2 focus:ring-green-400" />
              </div>
              <div>
                <label className="block text-xs font-semibold text-gray-600 mb-1">WhatsApp</label>
                <input type="text" defaultValue="+1 809 555 0000" className="w-full border border-gray-200 rounded-xl px-4 py-2.5 text-sm focus:outline-none focus:ring-2 focus:ring-green-400" />
              </div>
            </div>

            <div>
              <label className="block text-xs font-semibold text-gray-600 mb-1">Ubicación principal</label>
              <input type="text" defaultValue="Samaná, República Dominicana" className="w-full border border-gray-200 rounded-xl px-4 py-2.5 text-sm focus:outline-none focus:ring-2 focus:ring-green-400" />
            </div>

            <div>
              <label className="block text-xs font-semibold text-gray-600 mb-1">Descripción del negocio</label>
              <textarea rows={4} defaultValue="Somos un equipo de guías locales especializados en la región de Samaná. Ofrecemos experiencias auténticas en contacto con la naturaleza y la cultura local dominicana." className="w-full border border-gray-200 rounded-xl px-4 py-2.5 text-sm focus:outline-none focus:ring-2 focus:ring-green-400 resize-none" />
            </div>

            <div className="flex items-center justify-between pt-2">
              {saved && (
                <span className="text-sm font-medium" style={{ color: "#3DAA7A" }}>✓ Cambios guardados</span>
              )}
              <button
                type="submit"
                className="ml-auto px-6 py-2.5 rounded-xl text-white text-sm font-semibold"
                style={{ backgroundColor: "#3DAA7A" }}
              >
                Guardar cambios
              </button>
            </div>
          </form>
        </div>
      </div>
    </>
  );
}
