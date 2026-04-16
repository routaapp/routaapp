import Link from "next/link";

const STATS = [
  { label: "Experiencias activas", value: "3", icon: "🗺️", change: "+1 este mes" },
  { label: "Reservas totales", value: "27", icon: "📅", change: "+8 esta semana" },
  { label: "Ingresos del mes", value: "$1,240", icon: "💰", change: "+18% vs mes anterior" },
  { label: "Rating promedio", value: "4.8 ⭐", icon: "🏆", change: "128 reseñas" },
];

const EXPERIENCES = [
  { id: "1", title: "Excursión a Los Haitises", price: 65, status: "active", bookings: 14, rating: 4.9 },
  { id: "2", title: "Tour gastronómico Colonial", price: 45, status: "active", bookings: 9, rating: 4.7 },
  { id: "3", title: "Snorkel en Catalina", price: 55, status: "draft", bookings: 0, rating: null },
];

const BOOKINGS = [
  { id: "B001", experience: "Excursión a Los Haitises", traveler: "María González", date: "2026-04-20", people: 3, total: 195, status: "confirmed" },
  { id: "B002", experience: "Tour gastronómico Colonial", traveler: "Carlos Vargas", date: "2026-04-22", people: 2, total: 90, status: "pending" },
  { id: "B003", experience: "Excursión a Los Haitises", traveler: "Ana López", date: "2026-04-25", people: 4, total: 260, status: "confirmed" },
  { id: "B004", experience: "Tour gastronómico Colonial", traveler: "Pedro Martínez", date: "2026-04-18", people: 1, total: 45, status: "completed" },
];

const STATUS_STYLES: Record<string, { label: string; bg: string; color: string }> = {
  confirmed: { label: "Confirmada", bg: "#DCFCE7", color: "#166534" },
  pending:   { label: "Pendiente", bg: "#FEF9C3", color: "#854D0E" },
  completed: { label: "Completada", bg: "#F3F4F6", color: "#374151" },
  cancelled: { label: "Cancelada",  bg: "#FEE2E2", color: "#991B1B" },
};

export default function ProviderDashboard() {
  return (
    <>
      {/* Header */}
      <div className="flex items-center justify-between mb-8">
        <div>
          <h1 className="text-2xl font-bold text-gray-900">Dashboard</h1>
          <p className="text-gray-400 text-sm mt-0.5">Bienvenido, Tours Samaná Pro 👋</p>
        </div>
        <Link
          href="/dashboard/experiences/new"
          className="px-4 py-2.5 rounded-xl text-white text-sm font-semibold flex items-center gap-2"
          style={{ backgroundColor: "#3DAA7A" }}
        >
          <span>+</span> Nueva experiencia
        </Link>
      </div>

      {/* Stats */}
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 mb-8">
        {STATS.map(stat => (
          <div key={stat.label} className="bg-white rounded-2xl border border-gray-100 p-5 shadow-sm">
            <div className="flex items-center justify-between mb-2">
              <p className="text-xs text-gray-400 font-medium">{stat.label}</p>
              <span className="text-xl">{stat.icon}</span>
            </div>
            <p className="text-2xl font-bold text-gray-900">{stat.value}</p>
            <p className="text-xs mt-1" style={{ color: "#3DAA7A" }}>{stat.change}</p>
          </div>
        ))}
      </div>

      {/* Reservas recientes */}
      <div className="bg-white rounded-2xl border border-gray-100 shadow-sm mb-6">
        <div className="flex items-center justify-between px-6 py-4 border-b border-gray-50">
          <h2 className="font-semibold text-gray-900">Reservas recientes</h2>
          <Link href="/dashboard/bookings" className="text-xs font-medium" style={{ color: "#3DAA7A" }}>Ver todas</Link>
        </div>
        <div className="overflow-x-auto">
          <table className="w-full text-sm">
            <thead>
              <tr className="text-left text-xs text-gray-400 font-medium border-b border-gray-50">
                <th className="px-6 py-3">Experiencia</th>
                <th className="px-6 py-3">Viajero</th>
                <th className="px-6 py-3">Fecha</th>
                <th className="px-6 py-3">Personas</th>
                <th className="px-6 py-3">Total</th>
                <th className="px-6 py-3">Estado</th>
              </tr>
            </thead>
            <tbody>
              {BOOKINGS.map(b => {
                const s = STATUS_STYLES[b.status];
                return (
                  <tr key={b.id} className="border-b border-gray-50 last:border-0 hover:bg-gray-50/50">
                    <td className="px-6 py-4 font-medium text-gray-800">{b.experience}</td>
                    <td className="px-6 py-4 text-gray-500">{b.traveler}</td>
                    <td className="px-6 py-4 text-gray-500">{b.date}</td>
                    <td className="px-6 py-4 text-gray-500">{b.people}</td>
                    <td className="px-6 py-4 font-semibold text-gray-900">${b.total}</td>
                    <td className="px-6 py-4">
                      <span className="px-2.5 py-1 rounded-full text-xs font-medium" style={{ backgroundColor: s.bg, color: s.color }}>
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

      {/* Mis experiencias */}
      <div className="bg-white rounded-2xl border border-gray-100 shadow-sm">
        <div className="flex items-center justify-between px-6 py-4 border-b border-gray-50">
          <h2 className="font-semibold text-gray-900">Mis experiencias</h2>
          <Link href="/dashboard/experiences" className="text-xs font-medium" style={{ color: "#3DAA7A" }}>Gestionar</Link>
        </div>
        <div className="divide-y divide-gray-50">
          {EXPERIENCES.map(exp => (
            <div key={exp.id} className="flex items-center justify-between px-6 py-4 hover:bg-gray-50/50">
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 rounded-xl flex items-center justify-center text-lg" style={{ backgroundColor: "#6FCFAB20" }}>
                  🗺️
                </div>
                <div>
                  <p className="font-medium text-gray-900 text-sm">{exp.title}</p>
                  <p className="text-xs text-gray-400">${exp.price}/persona · {exp.bookings} reservas{exp.rating ? ` · ⭐${exp.rating}` : ""}</p>
                </div>
              </div>
              <div className="flex items-center gap-3">
                <span
                  className="text-xs px-2.5 py-1 rounded-full font-medium"
                  style={exp.status === "active"
                    ? { backgroundColor: "#DCFCE7", color: "#166534" }
                    : { backgroundColor: "#F3F4F6", color: "#6B7280" }
                  }
                >
                  {exp.status === "active" ? "Activa" : "Borrador"}
                </span>
                <Link href={`/dashboard/experiences/${exp.id}/edit`} className="text-xs text-gray-400 hover:text-gray-700">
                  Editar
                </Link>
              </div>
            </div>
          ))}
          <div className="px-6 py-4">
            <Link
              href="/dashboard/experiences/new"
              className="flex items-center gap-2 text-sm font-medium"
              style={{ color: "#3DAA7A" }}
            >
              <span className="text-lg">+</span> Agregar nueva experiencia
            </Link>
          </div>
        </div>
      </div>
    </>
  );
}
