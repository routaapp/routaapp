const REVIEWS = [
  { id: "1", traveler: "María González", experience: "Excursión a Los Haitises", rating: 5, comment: "¡Increíble experiencia! El guía conocía cada rincón del lugar y nos llevó a sitios que no están en ningún mapa. Lo recomiendo al 100%.", date: "2026-04-18" },
  { id: "2", traveler: "Carlos Vargas", experience: "Tour gastronómico Colonial", rating: 5, comment: "La mejor manera de conocer la gastronomía dominicana. Comimos en lugares auténticos que no encontrarías por tu cuenta.", date: "2026-04-15" },
  { id: "3", traveler: "Ana López", experience: "Excursión a Los Haitises", rating: 4, comment: "Muy buena experiencia en general. El paisaje es espectacular. Le doy 4 estrellas porque llegamos un poco tarde al inicio.", date: "2026-04-10" },
  { id: "4", traveler: "Pedro Martínez", experience: "Tour gastronómico Colonial", rating: 5, comment: "Excelente guía, muy conocedor e divertido. Las paradas gastronómicas fueron fantásticas. Volveré sin duda.", date: "2026-04-05" },
];

export default function DashboardReviewsPage() {
  const avgRating = (REVIEWS.reduce((sum, r) => sum + r.rating, 0) / REVIEWS.length).toFixed(1);

  return (
    <>
      <div className="flex items-center justify-between mb-8">
        <div>
          <h1 className="text-2xl font-bold text-gray-900">Reseñas</h1>
          <p className="text-gray-400 text-sm mt-0.5">{REVIEWS.length} reseñas · ⭐ {avgRating} promedio</p>
        </div>
      </div>

      {/* Promedio */}
      <div className="bg-white rounded-2xl border border-gray-100 p-6 shadow-sm mb-6 flex items-center gap-6">
        <div className="text-center">
          <p className="text-5xl font-bold" style={{ color: "#2B5E41" }}>{avgRating}</p>
          <p className="text-yellow-400 text-xl mt-1">{'⭐'.repeat(Math.round(parseFloat(avgRating)))}</p>
          <p className="text-xs text-gray-400 mt-1">{REVIEWS.length} reseñas</p>
        </div>
        <div className="flex-1 space-y-2">
          {[5,4,3,2,1].map(star => {
            const count = REVIEWS.filter(r => r.rating === star).length;
            const pct = Math.round((count / REVIEWS.length) * 100);
            return (
              <div key={star} className="flex items-center gap-2 text-xs text-gray-500">
                <span className="w-4">{star}⭐</span>
                <div className="flex-1 bg-gray-100 rounded-full h-2 overflow-hidden">
                  <div className="h-full rounded-full" style={{ width: `${pct}%`, backgroundColor: "#3DAA7A" }} />
                </div>
                <span className="w-8 text-right">{count}</span>
              </div>
            );
          })}
        </div>
      </div>

      {/* Lista reseñas */}
      <div className="space-y-4">
        {REVIEWS.map(review => (
          <div key={review.id} className="bg-white rounded-2xl border border-gray-100 p-6 shadow-sm">
            <div className="flex items-start justify-between mb-3">
              <div>
                <p className="font-semibold text-gray-900">{review.traveler}</p>
                <p className="text-xs text-gray-400">{review.experience} · {review.date}</p>
              </div>
              <div className="text-yellow-400">{'⭐'.repeat(review.rating)}</div>
            </div>
            <p className="text-gray-600 text-sm leading-relaxed">{review.comment}</p>
          </div>
        ))}
      </div>
    </>
  );
}
