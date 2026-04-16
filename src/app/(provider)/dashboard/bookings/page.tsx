const BOOKINGS = [
  { id: "B001", experience: "Excursión a Los Haitises", traveler: "María González", email: "maria@email.com", date: "2026-04-20", people: 3, total: 195, status: "confirmed" },
  { id: "B002", experience: "Tour gastronómico Colonial", traveler: "Carlos Vargas", email: "carlos@email.com", date: "2026-04-22", people: 2, total: 90, status: "pending" },
  { id: "B003", experience: "Excursión a Los Haitises", traveler: "Ana López", email: "ana@email.com", date: "2026-04-25", people: 4, total: 260, status: "confirmed" },
  { id: "B004", experience: "Tour gastronómico Colonial", traveler: "Pedro Martínez", email: "pedro@email.com", date: "2026-04-18", people: 1, total: 45, status: "completed" },
  { id: "B005", experience: "Excursión a Los Haitises", traveler: "Sofía Ramírez", email: "sofia@email.com", date: "2026-05-01", people: 2, total: 130, status: "confirmed" },
];

const STATUS_STYLES: Record<string, { label: string; bg: string; color: string }> = {
  confirmed: { label: "Confirmada", bg: "#DCFCE7", color: "#166534" },
  pending:   { label: "Pendiente",  bg: "#FEF9C3", color: "#854D0E" },
  completed: { label: "Completada", bg: "#F3F4F6", color: "#374151" },
  cancelled: { label: "Cancelada",  bg: "#FEE2E2", color: "#991B1B" },
};

export default function DashboardBookingsPage() {
  const totalRevenue = BOOKINGS.filter(b => b.status !== "cancelled").reduce((sum, b) => sum + b.total, 0);

  return (
    <>
      {/* Header */}
      <div className="flex items-center justify-between mb-6">
        <div>
          <h1 className="text-2xl font-bold text-gray-900">Reservas</h1>
          <p className="text-gray-400 text-sm mt-0.5">{BOOKINGS.length} reservas en total</p>
        </div>
      </div>

      {/* Resumen rápido */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-8">
        {[
          { label: "Total", value: BOOKINGS.length, color: "#2B5E41" },
          { label: "Confirmadas", value: BOOKINGS.filter(b => b.status === "confirmed").length, color: "#166534" },
          { label: "Pendientes", value: BOOKINGS.filter(b => b.status === "pending").length, color: "#854D0E" },
          { label: "Ingresos", value: `$${totalRevenue}`, color: "#2B5E41" },
        ].map(item => (
          <div key={item.label} className="bg-white rounded-2xl border border-gray-100 p-4 shadow-sm text-center">
            <p className="text-xs text-gray-400 mb-1">{item.label}</p>
            <p className="text-2xl font-bold" style={{ color: item.color }}>{item.value}</p>
          </div>
        ))}
      </div>

      {/* Tabla */}
      <div className="bg-white rounded-2xl border border-gray-100 shadow-sm overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full text-sm">
            <thead>
              <tr className="text-left text-xs text-gray-400 font-medium border-b border-gray-100">
                <th className="px-6 py-4">ID</th>
                <th className="px-6 py-4">Experiencia</th>
                <th className="px-6 py-4">Viajero</th>
                <th className="px-6 py-4">Fecha</th>
                <th className="px-6 py-4">Personas</th>
                <th className="px-6 py-4">Total</th>
                <th className="px-6 py-4">Estado</th>
              </tr>
            </thead>
            <tbody>
              {BOOKINGS.map(b => {
                const s = STATUS_STYLES[b.status];
                return (
                  <tr key={b.id} className="border-b border-gray-50 last:border-0 hover:bg-gray-50/50">
                    <td className="px-6 py-4 text-xs text-gray-400 font-mono">{b.id}</td>
                    <td className="px-6 py-4 font-medium text-gray-900">{b.experience}</td>
                    <td className="px-6 py-4">
                      <p className="text-gray-700">{b.traveler}</p>
                      <p className="text-xs text-gray-400">{b.email}</p>
                    </td>
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
    </>
  );
}
