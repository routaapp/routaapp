import Link from "next/link";

// Plantillas de tours disponibles
const EXPERIENCES = [
  { id: "1", title: "Excursión a Los Haitises", emoji: "🌿", base_price: 65, max_capacity: 12 },
  { id: "2", title: "Tour gastronómico Zona Colonial", emoji: "🍽️", base_price: 45, max_capacity: 10 },
  { id: "3", title: "Snorkel en Isla Catalina", emoji: "🤿", base_price: 55, max_capacity: 8 },
];

// Salidas programadas (instancias de esos tours en fechas específicas)
const DEPARTURES = [
  {
    id: "D001",
    experience_id: "1",
    experience: "Excursión a Los Haitises",
    emoji: "🌿",
    date: "2026-04-20",
    time: "07:00",
    price: 65,
    capacity: 12,
    spots_taken: 7,
    status: "active",
  },
  {
    id: "D002",
    experience_id: "2",
    experience: "Tour gastronómico Zona Colonial",
    emoji: "🍽️",
    date: "2026-04-22",
    time: "10:00",
    price: 45,
    capacity: 10,
    spots_taken: 3,
    status: "active",
  },
  {
    id: "D003",
    experience_id: "1",
    experience: "Excursión a Los Haitises",
    emoji: "🌿",
    date: "2026-04-27",
    time: "07:00",
    price: 65,
    capacity: 12,
    spots_taken: 0,
    status: "active",
  },
  {
    id: "D004",
    experience_id: "2",
    experience: "Tour gastronómico Zona Colonial",
    emoji: "🍽️",
    date: "2026-05-02",
    time: "10:00",
    price: 55,  // precio especial para esta salida
    capacity: 8,
    spots_taken: 1,
    status: "active",
  },
  {
    id: "D005",
    experience_id: "1",
    experience: "Excursión a Los Haitises",
    emoji: "🌿",
    date: "2026-04-15",
    time: "07:00",
    price: 65,
    capacity: 12,
    spots_taken: 12,
    status: "completed",
  },
];

const STATUS_STYLES: Record<string, { label: string; bg: string; color: string }> = {
  active:    { label: "Activa",     bg: "#DCFCE7", color: "#166534" },
  full:      { label: "Llena",      bg: "#FEF9C3", color: "#854D0E" },
  completed: { label: "Completada", bg: "#F3F4F6", color: "#374151" },
  cancelled: { label: "Cancelada",  bg: "#FEE2E2", color: "#991B1B" },
};

// Salidas próximas (activas y futuras)
const upcoming = DEPARTURES.filter(d => d.status === "active").sort((a, b) => a.date.localeCompare(b.date));
const past     = DEPARTURES.filter(d => d.status === "completed" || d.status === "cancelled");

export default function DashboardDeparturesPage() {
  return (
    <>
      {/* Header */}
      <div className="flex items-center justify-between mb-8">
        <div>
          <h1 className="text-2xl font-bold text-gray-900">Salidas</h1>
          <p className="text-gray-400 text-sm mt-0.5">
            Activa fechas para tus tours sin tener que recrearlos cada vez
          </p>
        </div>
      </div>

      {/* Banner explicativo */}
      <div
        className="rounded-2xl p-5 mb-8 flex gap-4 items-start"
        style={{ backgroundColor: "#3DAA7A10", border: "1px solid #3DAA7A30" }}
      >
        <span className="text-2xl flex-shrink-0">💡</span>
        <div>
          <p className="font-semibold text-sm" style={{ color: "#2B5E41" }}>¿Cómo funcionan las salidas?</p>
          <p className="text-sm text-gray-600 mt-1">
            Cada tour que creaste es una <strong>plantilla</strong>. Aquí programas las fechas específicas en que lo realizarás.
            Puedes reutilizar el mismo tour para múltiples fechas — con el mismo precio o uno diferente para esa salida puntual.
            Las reseñas que recibe cada salida se acumulan en tu perfil como proveedor.
          </p>
        </div>
      </div>

      {/* Agregar nueva salida */}
      <div className="bg-white rounded-2xl border border-gray-100 shadow-sm p-5 mb-8">
        <h2 className="font-semibold text-gray-900 mb-4">Programar nueva salida</h2>
        <div className="grid grid-cols-1 md:grid-cols-4 gap-3">
          <div className="md:col-span-2">
            <label className="block text-xs font-semibold text-gray-500 mb-1.5">Tour</label>
            <select className="w-full border border-gray-200 rounded-xl px-4 py-2.5 text-sm focus:outline-none focus:ring-1 focus:ring-green-400 bg-white">
              <option value="">Seleccionar tour...</option>
              {EXPERIENCES.map(exp => (
                <option key={exp.id} value={exp.id}>
                  {exp.emoji} {exp.title} — ${exp.base_price}/persona
                </option>
              ))}
            </select>
          </div>
          <div>
            <label className="block text-xs font-semibold text-gray-500 mb-1.5">Fecha</label>
            <input
              type="date"
              className="w-full border border-gray-200 rounded-xl px-4 py-2.5 text-sm focus:outline-none focus:ring-1 focus:ring-green-400"
            />
          </div>
          <div>
            <label className="block text-xs font-semibold text-gray-500 mb-1.5">Hora de inicio</label>
            <input
              type="time"
              className="w-full border border-gray-200 rounded-xl px-4 py-2.5 text-sm focus:outline-none focus:ring-1 focus:ring-green-400"
            />
          </div>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-3 mt-3">
          <div>
            <label className="block text-xs font-semibold text-gray-500 mb-1.5">
              Precio especial <span className="text-gray-300 font-normal">(dejar vacío = precio base)</span>
            </label>
            <div className="relative">
              <span className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400 text-sm">$</span>
              <input
                type="number"
                placeholder="Ej: 55"
                className="w-full border border-gray-200 rounded-xl pl-7 pr-4 py-2.5 text-sm focus:outline-none focus:ring-1 focus:ring-green-400"
              />
            </div>
          </div>
          <div>
            <label className="block text-xs font-semibold text-gray-500 mb-1.5">
              Cupo <span className="text-gray-300 font-normal">(dejar vacío = cupo base)</span>
            </label>
            <input
              type="number"
              placeholder="Ej: 8"
              className="w-full border border-gray-200 rounded-xl px-4 py-2.5 text-sm focus:outline-none focus:ring-1 focus:ring-green-400"
            />
          </div>
          <div>
            <label className="block text-xs font-semibold text-gray-500 mb-1.5">Notas internas</label>
            <input
              type="text"
              placeholder="Solo visible para ti"
              className="w-full border border-gray-200 rounded-xl px-4 py-2.5 text-sm focus:outline-none focus:ring-1 focus:ring-green-400"
            />
          </div>
        </div>
        <div className="flex justify-end mt-4">
          <button
            className="px-6 py-2.5 rounded-xl text-white text-sm font-semibold flex items-center gap-2"
            style={{ backgroundColor: "#3DAA7A" }}
          >
            <span>+</span> Agregar salida
          </button>
        </div>
      </div>

      {/* Próximas salidas */}
      <div className="bg-white rounded-2xl border border-gray-100 shadow-sm mb-6">
        <div className="px-6 py-4 border-b border-gray-50 flex items-center justify-between">
          <h2 className="font-semibold text-gray-900">Próximas salidas</h2>
          <span className="text-xs text-gray-400">{upcoming.length} activas</span>
        </div>
        {upcoming.length === 0 ? (
          <div className="px-6 py-10 text-center">
            <p className="text-4xl mb-3">🗓️</p>
            <p className="text-gray-500 text-sm">No tienes salidas programadas.</p>
            <p className="text-gray-400 text-xs mt-1">Usa el formulario de arriba para agregar la primera.</p>
          </div>
        ) : (
          <div className="overflow-x-auto">
            <table className="w-full text-sm">
              <thead>
                <tr className="text-left text-xs text-gray-400 font-medium border-b border-gray-50">
                  <th className="px-6 py-3">Tour</th>
                  <th className="px-6 py-3">Fecha y hora</th>
                  <th className="px-6 py-3">Precio</th>
                  <th className="px-6 py-3">Cupo</th>
                  <th className="px-6 py-3">Estado</th>
                  <th className="px-6 py-3">Acciones</th>
                </tr>
              </thead>
              <tbody>
                {upcoming.map(dep => {
                  const spotsLeft = dep.capacity - dep.spots_taken;
                  const isFull = spotsLeft === 0;
                  const statusKey = isFull ? "full" : dep.status;
                  const s = STATUS_STYLES[statusKey];
                  return (
                    <tr key={dep.id} className="border-b border-gray-50 last:border-0 hover:bg-gray-50/50">
                      <td className="px-6 py-4">
                        <div className="flex items-center gap-3">
                          <div
                            className="w-9 h-9 rounded-xl flex items-center justify-center text-lg flex-shrink-0"
                            style={{ backgroundColor: "#6FCFAB20" }}
                          >
                            {dep.emoji}
                          </div>
                          <div>
                            <p className="font-medium text-gray-900 text-sm leading-tight">{dep.experience}</p>
                            <Link
                              href={`/experiences/${dep.experience_id}`}
                              className="text-xs hover:underline"
                              style={{ color: "#3DAA7A" }}
                            >
                              Ver página →
                            </Link>
                          </div>
                        </div>
                      </td>
                      <td className="px-6 py-4">
                        <p className="font-medium text-gray-800">{dep.date}</p>
                        <p className="text-xs text-gray-400">{dep.time} hrs</p>
                      </td>
                      <td className="px-6 py-4">
                        <p className="font-semibold text-gray-900">${dep.price}</p>
                        <p className="text-xs text-gray-400">USD/persona</p>
                      </td>
                      <td className="px-6 py-4">
                        <div className="flex items-center gap-2">
                          <div className="flex-1 bg-gray-100 rounded-full h-1.5 w-20 overflow-hidden">
                            <div
                              className="h-full rounded-full"
                              style={{
                                width: `${(dep.spots_taken / dep.capacity) * 100}%`,
                                backgroundColor: isFull ? "#E8694A" : "#3DAA7A",
                              }}
                            />
                          </div>
                          <span className="text-xs text-gray-500">
                            {dep.spots_taken}/{dep.capacity}
                          </span>
                        </div>
                        <p className="text-xs text-gray-400 mt-0.5">
                          {isFull ? "Sin cupos" : `${spotsLeft} disponibles`}
                        </p>
                      </td>
                      <td className="px-6 py-4">
                        <span
                          className="text-xs px-2.5 py-1 rounded-full font-medium"
                          style={{ backgroundColor: s.bg, color: s.color }}
                        >
                          {s.label}
                        </span>
                      </td>
                      <td className="px-6 py-4">
                        <div className="flex items-center gap-3">
                          <button className="text-xs font-medium text-gray-500 hover:text-gray-800">
                            Editar
                          </button>
                          <button className="text-xs font-medium text-red-400 hover:text-red-600">
                            Cancelar
                          </button>
                        </div>
                      </td>
                    </tr>
                  );
                })}
              </tbody>
            </table>
          </div>
        )}
      </div>

      {/* Salidas pasadas */}
      {past.length > 0 && (
        <div className="bg-white rounded-2xl border border-gray-100 shadow-sm">
          <div className="px-6 py-4 border-b border-gray-50">
            <h2 className="font-semibold text-gray-900">Salidas anteriores</h2>
          </div>
          <div className="overflow-x-auto">
            <table className="w-full text-sm">
              <thead>
                <tr className="text-left text-xs text-gray-400 font-medium border-b border-gray-50">
                  <th className="px-6 py-3">Tour</th>
                  <th className="px-6 py-3">Fecha</th>
                  <th className="px-6 py-3">Precio</th>
                  <th className="px-6 py-3">Ocupación</th>
                  <th className="px-6 py-3">Estado</th>
                </tr>
              </thead>
              <tbody>
                {past.map(dep => {
                  const s = STATUS_STYLES[dep.status];
                  return (
                    <tr key={dep.id} className="border-b border-gray-50 last:border-0 opacity-70">
                      <td className="px-6 py-4">
                        <div className="flex items-center gap-3">
                          <span className="text-lg">{dep.emoji}</span>
                          <p className="text-sm text-gray-700">{dep.experience}</p>
                        </div>
                      </td>
                      <td className="px-6 py-4 text-gray-500">{dep.date}</td>
                      <td className="px-6 py-4 text-gray-600">${dep.price}</td>
                      <td className="px-6 py-4 text-gray-500">{dep.spots_taken}/{dep.capacity}</td>
                      <td className="px-6 py-4">
                        <span
                          className="text-xs px-2.5 py-1 rounded-full font-medium"
                          style={{ backgroundColor: s.bg, color: s.color }}
                        >
                          {s.label}
                        </span>
                      </td>
                    </tr>
                  );
                })}
              </tbody>
            </table>
          </div>
        </div>
      )}
    </>
  );
}
