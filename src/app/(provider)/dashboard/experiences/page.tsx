import Link from "next/link";

const EXPERIENCES = [
  { id: "1", title: "Excursión a Los Haitises", location: "Samaná, RD", price: 65, status: "active", bookings: 14, rating: 4.9, reviews: 11 },
  { id: "2", title: "Tour gastronómico Zona Colonial", location: "Santo Domingo, RD", price: 45, status: "active", bookings: 9, rating: 4.7, reviews: 8 },
  { id: "3", title: "Snorkel en Isla Catalina", location: "La Romana, RD", price: 55, status: "draft", bookings: 0, rating: null, reviews: 0 },
];

export default function DashboardExperiencesPage() {
  return (
    <>
      {/* Header */}
      <div className="flex items-center justify-between mb-8">
        <div>
          <h1 className="text-2xl font-bold text-gray-900">Mis experiencias</h1>
          <p className="text-gray-400 text-sm mt-0.5">{EXPERIENCES.length} experiencias en total</p>
        </div>
        <Link
          href="/dashboard/experiences/new"
          className="px-4 py-2.5 rounded-xl text-white text-sm font-semibold flex items-center gap-2"
          style={{ backgroundColor: "#3DAA7A" }}
        >
          <span>+</span> Nueva experiencia
        </Link>
      </div>

      {/* Tabla */}
      <div className="bg-white rounded-2xl border border-gray-100 shadow-sm">
        <div className="overflow-x-auto">
          <table className="w-full text-sm">
            <thead>
              <tr className="text-left text-xs text-gray-400 font-medium border-b border-gray-100">
                <th className="px-6 py-4">Experiencia</th>
                <th className="px-6 py-4">Precio</th>
                <th className="px-6 py-4">Reservas</th>
                <th className="px-6 py-4">Rating</th>
                <th className="px-6 py-4">Estado</th>
                <th className="px-6 py-4">Acciones</th>
              </tr>
            </thead>
            <tbody>
              {EXPERIENCES.map(exp => (
                <tr key={exp.id} className="border-b border-gray-50 last:border-0 hover:bg-gray-50/50">
                  <td className="px-6 py-4">
                    <div className="flex items-center gap-3">
                      <div className="w-10 h-10 rounded-xl flex items-center justify-center text-lg flex-shrink-0" style={{ backgroundColor: "#6FCFAB20" }}>
                        🗺️
                      </div>
                      <div>
                        <p className="font-medium text-gray-900">{exp.title}</p>
                        <p className="text-xs text-gray-400">{exp.location}</p>
                      </div>
                    </div>
                  </td>
                  <td className="px-6 py-4 font-semibold text-gray-900">${exp.price}<span className="text-xs text-gray-400 font-normal">/persona</span></td>
                  <td className="px-6 py-4 text-gray-600">{exp.bookings}</td>
                  <td className="px-6 py-4">
                    {exp.rating ? (
                      <span className="text-gray-700">⭐ {exp.rating} <span className="text-gray-400 text-xs">({exp.reviews})</span></span>
                    ) : (
                      <span className="text-gray-300 text-xs">Sin reseñas</span>
                    )}
                  </td>
                  <td className="px-6 py-4">
                    <span
                      className="text-xs px-2.5 py-1 rounded-full font-medium"
                      style={exp.status === "active"
                        ? { backgroundColor: "#DCFCE7", color: "#166534" }
                        : { backgroundColor: "#F3F4F6", color: "#6B7280" }
                      }
                    >
                      {exp.status === "active" ? "Activa" : "Borrador"}
                    </span>
                  </td>
                  <td className="px-6 py-4">
                    <div className="flex items-center gap-3">
                      <Link href={`/dashboard/experiences/${exp.id}/edit`} className="text-xs font-medium text-gray-500 hover:text-gray-800">
                        Editar
                      </Link>
                      <Link href={`/experiences/${exp.id}`} className="text-xs font-medium" style={{ color: "#3DAA7A" }}>
                        Ver
                      </Link>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        {/* Add new row */}
        <div className="px-6 py-4 border-t border-gray-50">
          <Link href="/dashboard/experiences/new" className="flex items-center gap-2 text-sm font-medium" style={{ color: "#3DAA7A" }}>
            <span className="text-lg">+</span> Agregar nueva experiencia
          </Link>
        </div>
      </div>
    </>
  );
}
