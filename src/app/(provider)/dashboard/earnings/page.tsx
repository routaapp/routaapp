const MONTHLY = [
  { month: "Ene 2026", gross: 0, net: 0, bookings: 0 },
  { month: "Feb 2026", gross: 0, net: 0, bookings: 0 },
  { month: "Mar 2026", gross: 520, net: 442, bookings: 6 },
  { month: "Abr 2026", gross: 1460, net: 1241, bookings: 17 },
];

const PAYOUTS = [
  { id: "P001", date: "2026-04-01", amount: 442, status: "paid", period: "Marzo 2026" },
  { id: "P002", date: "2026-05-01", amount: 1241, status: "pending", period: "Abril 2026" },
];

export default function DashboardEarningsPage() {
  const totalNet = MONTHLY.reduce((sum, m) => sum + m.net, 0);
  const thisMonth = MONTHLY[MONTHLY.length - 1];

  return (
    <>
      <div className="mb-8">
        <h1 className="text-2xl font-bold text-gray-900">Ganancias</h1>
        <p className="text-gray-400 text-sm mt-0.5">Tus ingresos después de la comisión del 15% de Routa</p>
      </div>

      {/* Resumen */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-8">
        {[
          { label: "Ingresos totales (neto)", value: `$${totalNet}`, note: "Desde el inicio", color: "#2B5E41" },
          { label: "Este mes (neto)", value: `$${thisMonth.net}`, note: `${thisMonth.bookings} reservas`, color: "#3DAA7A" },
          { label: "Próximo pago", value: `$${thisMonth.net}`, note: "Aprox. 1 mayo 2026", color: "#E8694A" },
        ].map(item => (
          <div key={item.label} className="bg-white rounded-2xl border border-gray-100 p-6 shadow-sm">
            <p className="text-xs text-gray-400 mb-1">{item.label}</p>
            <p className="text-3xl font-bold mb-1" style={{ color: item.color }}>{item.value}</p>
            <p className="text-xs text-gray-400">{item.note}</p>
          </div>
        ))}
      </div>

      {/* Tabla mensual */}
      <div className="bg-white rounded-2xl border border-gray-100 shadow-sm mb-6">
        <div className="px-6 py-4 border-b border-gray-50">
          <h2 className="font-semibold text-gray-900">Resumen por mes</h2>
        </div>
        <div className="overflow-x-auto">
          <table className="w-full text-sm">
            <thead>
              <tr className="text-left text-xs text-gray-400 font-medium border-b border-gray-50">
                <th className="px-6 py-3">Mes</th>
                <th className="px-6 py-3">Reservas</th>
                <th className="px-6 py-3">Bruto</th>
                <th className="px-6 py-3">Comisión (15%)</th>
                <th className="px-6 py-3">Neto (tu ingreso)</th>
              </tr>
            </thead>
            <tbody>
              {MONTHLY.map(m => (
                <tr key={m.month} className="border-b border-gray-50 last:border-0 hover:bg-gray-50/50">
                  <td className="px-6 py-4 font-medium text-gray-900">{m.month}</td>
                  <td className="px-6 py-4 text-gray-500">{m.bookings}</td>
                  <td className="px-6 py-4 text-gray-600">${m.gross}</td>
                  <td className="px-6 py-4 text-gray-400">-${Math.round(m.gross * 0.15)}</td>
                  <td className="px-6 py-4 font-semibold" style={{ color: m.net > 0 ? "#2B5E41" : "#9CA3AF" }}>${m.net}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      {/* Pagos */}
      <div className="bg-white rounded-2xl border border-gray-100 shadow-sm">
        <div className="px-6 py-4 border-b border-gray-50">
          <h2 className="font-semibold text-gray-900">Historial de pagos</h2>
        </div>
        <div className="divide-y divide-gray-50">
          {PAYOUTS.map(p => (
            <div key={p.id} className="px-6 py-4 flex items-center justify-between">
              <div>
                <p className="font-medium text-gray-900">{p.period}</p>
                <p className="text-xs text-gray-400">{p.date}</p>
              </div>
              <div className="flex items-center gap-4">
                <p className="font-bold text-gray-900">${p.amount}</p>
                <span
                  className="text-xs px-2.5 py-1 rounded-full font-medium"
                  style={p.status === "paid"
                    ? { backgroundColor: "#DCFCE7", color: "#166534" }
                    : { backgroundColor: "#FEF9C3", color: "#854D0E" }
                  }
                >
                  {p.status === "paid" ? "Pagado" : "Pendiente"}
                </span>
              </div>
            </div>
          ))}
        </div>
      </div>
    </>
  );
}
