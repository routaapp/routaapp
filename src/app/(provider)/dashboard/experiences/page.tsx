import Link from "next/link";

const EXPERIENCES = [
  { id: "1", title: "Excursion a Los Haitises", location: "Samana, RD", emoji: "&#127807;", base_price: 65, status: "active", bookings: 14, departures: 3, times_activated: 5 },
  { id: "2", title: "Tour gastronomico Zona Colonial", location: "Santo Domingo, RD", emoji: "&#127869;", base_price: 45, status: "active", bookings: 9, departures: 2, times_activated: 4 },
  { id: "3", title: "Snorkel en Isla Catalina", location: "La Romana, RD", emoji: "&#129347;", base_price: 55, status: "draft", bookings: 0, departures: 0, times_activated: 0 },
];

export default function DashboardExperiencesPage() {
  return (
    <>
      <div className="flex items-center justify-between mb-8">
        <div>
          <h1 className="text-2xl font-bold text-gray-900">Mis experiencias</h1>
          <p className="text-gray-400 text-sm mt-0.5">
            {EXPERIENCES.length} plantillas de tour &mdash; programa salidas en{" "}
            <Link href="/dashboard/departures" className="underline" style={{ color: "#3DAA7A" }}>
              Salidas
            </Link>
          </p>
        </div>
        <Link
          href="/dashboard/experiences/new"
          className="px-4 py-2.5 rounded-xl text-white text-sm font-semibold flex items-center gap-2"
          style={{ backgroundColor: "#3DAA7A" }}
        >
          <span>+</span> Nuevo tour
        </Link>
      </div>

      {/* Banner info */}
      <div className="rounded-2xl p-4 mb-6 flex gap-3 items-start"
        style={{ backgroundColor: "#E8694A0D", border: "1px solid #E8694A25" }}>
        <span className="text-lg flex-shrink-0">&#128506;</span>
        <p className="text-sm text-gray-600">
          <strong>Aqui gestionas tus plantillas de tour</strong> &mdash; titulo, descripcion, precio base y fotos.
          Para programar fechas especificas, ve a{" "}
          <Link href="/dashboard/departures" className="font-semibold underline" style={{ color: "#E8694A" }}>
            Salidas
          </Link>
          . No tienes que recrear el tour cada vez.
        </p>
      </div>

      {/* Tabla */}
      <div className="bg-white rounded-2xl border border-gray-100 shadow-sm">
        <div className="overflow-x-auto">
          <table className="w-full text-sm">
            <thead>
              <tr className="text-left text-xs text-gray-400 font-medium border-b border-gray-100">
                <th className="px-6 py-4">Tour</th>
                <th className="px-6 py-4">Precio base</th>
                <th className="px-6 py-4">Salidas activas</th>
                <th className="px-6 py-4">Total realizadas</th>
                <th className="px-6 py-4">Reservas</th>
                <th className="px-6 py-4">Estado</th>
                <th className="px-6 py-4">Acciones</th>
              </tr>
            </thead>
            <tbody>
              {EXPERIENCES.map(exp => (
                <tr key={exp.id} className="border-b border-gray-50 last:border-0 hover:bg-gray-50/50">
                  <td className="px-6 py-4">
                    <div className="flex items-center gap-3">
                      <div className="w-10 h-10 rounded-xl flex items-center justify-center text-lg flex-shrink-0"
                        style={{ backgroundColor: "#6FCFAB20" }}>
                        <span dangerouslySetInnerHTML={{ __html: exp.emoji }} />
                      </div>
                      <div>
                        <p className="font-medium text-gray-900">{exp.title}</p>
                        <p className="text-xs text-gray-400">&#128205; {exp.location}</p>
                      </div>
                    </div>
                  </td>
                  <td className="px-6 py-4">
                    <p className="font-semibold text-gray-900">${exp.base_price}</p>
                    <p className="text-xs text-gray-400">USD/persona</p>
                  </td>
                  <td className="px-6 py-4">
                    {exp.departures > 0 ? (
                      <span className="inline-flex items-center gap-1.5 text-xs font-medium px-2.5 py-1 rounded-full"
                        style={{ backgroundColor: "#DCFCE7", color: "#166534" }}>
                        &#128197; {exp.departures} activas
                      </span>
                    ) : (
                      <span className="text-xs text-gray-400">Sin salidas</span>
                    )}
                  </td>
                  <td className="px-6 py-4 text-gray-600 text-sm">
                    {exp.times_activated > 0 ? `${exp.times_activated}x` : "—"}
                  </td>
                  <td className="px-6 py-4 text-gray-600">{exp.bookings}</td>
                  <td className="px-6 py-4">
                    <span className="text-xs px-2.5 py-1 rounded-full font-medium"
                      style={exp.status === "active"
                        ? { backgroundColor: "#DCFCE7", color: "#166534" }
                        : { backgroundColor: "#F3F4F6", color: "#6B7280" }
                      }>
                      {exp.status === "active" ? "Activa" : "Borrador"}
                    </span>
                  </td>
                  <td className="px-6 py-4">
                    <div className="flex items-center gap-3 flex-wrap">
                      <Link href={`/dashboard/experiences/${exp.id}/edit`}
                        className="text-xs font-medium text-gray-500 hover:text-gray-800">
                        Editar
                      </Link>
                      <Link href="/dashboard/departures"
                        className="text-xs font-medium" style={{ color: "#3DAA7A" }}>
                        + Salida
                      </Link>
                      <Link href={`/experiences/${exp.id}`}
                        className="text-xs font-medium text-gray-400 hover:text-gray-600">
                        Ver
                      </Link>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
        <div className="px-6 py-4 border-t border-gray-50">
          <Link href="/dashboard/experiences/new"
            className="flex items-center gap-2 text-sm font-medium" style={{ color: "#3DAA7A" }}>
            <span className="text-lg">+</span> Crear nuevo tour
          </Link>
        </div>
      </div>
    </>
  );
}
