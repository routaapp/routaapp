// Resenas a nivel de agencia (proveedor).
// Cada resena queda etiquetada con el tour del que proviene,
// pero el rating impacta a la agencia completa.
// Solo usuarios que reservaron por Routa pueden dejar resena (verificadas).

const REVIEWS = [
  {
    id: "1", traveler: "Maria Gonzalez", country: "🇲🇽",
    experience: "Excursion a Los Haitises", experience_id: "1",
    departure_date: "2026-04-18", rating: 5, verified: true,
    comment: "Increible experiencia! El guia conocia cada rincon del lugar. Lo recomiendo al 100%.",
    date: "2026-04-18",
  },
  {
    id: "2", traveler: "Carlos Vargas", country: "🇨🇴",
    experience: "Tour gastronomico Zona Colonial", experience_id: "2",
    departure_date: "2026-04-15", rating: 5, verified: true,
    comment: "La mejor manera de conocer la gastronomia dominicana. Comimos en lugares autenticos.",
    date: "2026-04-15",
  },
  {
    id: "3", traveler: "Ana Lopez", country: "🇵🇷",
    experience: "Excursion a Los Haitises", experience_id: "1",
    departure_date: "2026-04-10", rating: 4, verified: true,
    comment: "Muy buena experiencia. El paisaje es espectacular. Le doy 4 estrellas por la puntualidad.",
    date: "2026-04-10",
  },
  {
    id: "4", traveler: "Pedro Martinez", country: "🇩🇴",
    experience: "Tour gastronomico Zona Colonial", experience_id: "2",
    departure_date: "2026-04-05", rating: 5, verified: true,
    comment: "Excelente guia, muy conocedor y divertido. Las paradas gastronomicas fueron fantasticas.",
    date: "2026-04-05",
  },
];

const avgRating = (REVIEWS.reduce((sum, r) => sum + r.rating, 0) / REVIEWS.length).toFixed(1);

const byTour: Record<string, number> = {};
REVIEWS.forEach(r => { byTour[r.experience] = (byTour[r.experience] ?? 0) + 1; });

export default function DashboardReviewsPage() {
  return (
    <>
      <div className="flex items-center justify-between mb-8">
        <div>
          <h1 className="text-2xl font-bold text-gray-900">Resenas de tu agencia</h1>
          <p className="text-gray-400 text-sm mt-0.5">
            {REVIEWS.length} resenas verificadas &middot; &#11088; {avgRating} rating de agencia
          </p>
        </div>
      </div>

      {/* Banner */}
      <div className="rounded-2xl p-4 mb-6 flex gap-3 items-start"
        style={{ backgroundColor: "#3DAA7A0D", border: "1px solid #3DAA7A25" }}>
        <span className="text-lg flex-shrink-0">&#10003;</span>
        <div>
          <p className="text-sm font-semibold" style={{ color: "#2B5E41" }}>Resenas 100% verificadas</p>
          <p className="text-sm text-gray-600 mt-0.5">
            Solo viajeros que reservaron y pagaron por Routa pueden dejar resena.
            El rating es de tu <strong>agencia completa</strong> &mdash; se acumula con cada tour.
            Cada resena muestra de que tour viene para que el contexto quede claro.
          </p>
        </div>
      </div>

      {/* Rating de la agencia */}
      <div className="bg-white rounded-2xl border border-gray-100 p-6 shadow-sm mb-6">
        <div className="flex items-start gap-8 flex-wrap">
          <div className="text-center">
            <p className="text-6xl font-bold" style={{ color: "#2B5E41" }}>{avgRating}</p>
            <p className="text-yellow-400 text-xl mt-2">{"&#11088;".repeat(Math.round(parseFloat(avgRating)))}</p>
            <p className="text-xs text-gray-400 mt-2">Rating de agencia</p>
            <p className="text-xs text-gray-400">{REVIEWS.length} resenas totales</p>
          </div>
          <div className="flex-1 space-y-2 min-w-40">
            {[5, 4, 3, 2, 1].map(star => {
              const count = REVIEWS.filter(r => r.rating === star).length;
              const pct = REVIEWS.length ? Math.round((count / REVIEWS.length) * 100) : 0;
              return (
                <div key={star} className="flex items-center gap-2 text-xs text-gray-500">
                  <span className="w-6">{star}&#11088;</span>
                  <div className="flex-1 bg-gray-100 rounded-full h-2 overflow-hidden">
                    <div className="h-full rounded-full" style={{ width: `${pct}%`, backgroundColor: "#3DAA7A" }} />
                  </div>
                  <span className="w-6 text-right">{count}</span>
                </div>
              );
            })}
          </div>
          <div className="min-w-48">
            <p className="text-xs font-semibold text-gray-500 uppercase mb-3">Por tour</p>
            <div className="space-y-2">
              {Object.entries(byTour).map(([tour, count]) => (
                <div key={tour} className="flex items-center justify-between gap-4">
                  <p className="text-xs text-gray-700 truncate max-w-36">{tour}</p>
                  <span className="text-xs font-medium px-2 py-0.5 rounded-full flex-shrink-0"
                    style={{ backgroundColor: "#6FCFAB20", color: "#2B5E41" }}>
                    {count} resena{count !== 1 ? "s" : ""}
                  </span>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>

      {/* Lista de resenas */}
      <div className="space-y-4">
        {REVIEWS.map(review => (
          <div key={review.id} className="bg-white rounded-2xl border border-gray-100 p-6 shadow-sm">
            <div className="flex items-start justify-between gap-4 mb-3">
              <div className="flex items-center gap-3">
                <div className="w-9 h-9 rounded-full flex items-center justify-center text-sm font-semibold flex-shrink-0"
                  style={{ backgroundColor: "#6FCFAB20", color: "#2B5E41" }}>
                  {review.traveler[0]}
                </div>
                <div>
                  <p className="font-semibold text-gray-900 text-sm">{review.traveler} {review.country}</p>
                  <p className="text-xs text-gray-400">{review.date}</p>
                </div>
              </div>
              <div className="flex flex-col items-end gap-1.5 flex-shrink-0">
                <div className="text-yellow-400 text-sm">{"&#11088;".repeat(review.rating)}</div>
                {review.verified && (
                  <span className="text-xs font-medium px-2 py-0.5 rounded-full"
                    style={{ backgroundColor: "#DCFCE7", color: "#166534" }}>
                    &#10003; Verificada
                  </span>
                )}
              </div>
            </div>
            <p className="text-gray-600 text-sm leading-relaxed mb-3">{review.comment}</p>
            <div className="flex items-center gap-2 pt-3 border-t border-gray-50">
              <span className="text-xs text-gray-400">Tour:</span>
              <span className="text-xs font-medium px-2.5 py-1 rounded-full"
                style={{ backgroundColor: "#6FCFAB15", color: "#2B5E41" }}>
                &#128506; {review.experience}
              </span>
              <span className="text-xs text-gray-300">&middot;</span>
              <span className="text-xs text-gray-400">Salida del {review.departure_date}</span>
            </div>
          </div>
        ))}
      </div>
    </>
  );
}
