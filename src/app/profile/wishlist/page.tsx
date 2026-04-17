import Link from "next/link";
import Navbar from "@/components/ui/Navbar";
import ExperienceCard from "@/components/ui/ExperienceCard";

// Tours guardados por el usuario (en producción vendrá de user_wishlists)
const SAVED_EXPERIENCES = [
  { id: "1", title: "Excursión a Los Haitises", location: "Samaná, RD", price: 65, rating: 4.9, reviews: 128, category: "naturaleza", emoji: "🌿", duration: 8, badge: "Más popular" },
  { id: "5", title: "Senderismo Pico Duarte", location: "Jarabacoa, RD", price: 120, rating: 5.0, reviews: 37, category: "aventura", emoji: "🏔️", duration: 48, badge: "Exclusivo" },
  { id: "8", title: "Degustación de ron artesanal", location: "Santo Domingo, RD", price: 40, rating: 4.5, reviews: 44, category: "cultural", emoji: "🥃", duration: 2 },
];

export default function WishlistPage() {
  return (
    <div style={{ backgroundColor: "#FAFAF7", minHeight: "100vh" }}>
      <Navbar />

      <div className="max-w-5xl mx-auto px-4 py-10">

        {/* Header */}
        <div className="flex items-center justify-between mb-2">
          <div>
            <h1 className="text-2xl font-bold text-gray-900">Tours guardados</h1>
            <p className="text-gray-400 text-sm mt-1">
              {SAVED_EXPERIENCES.length} tours en tu lista · Reserva cuando estés listo
            </p>
          </div>
          <Link
            href="/experiences"
            className="text-sm font-semibold hover:underline"
            style={{ color: "#3DAA7A" }}
          >
            Explorar más →
          </Link>
        </div>

        {/* Nota informativa */}
        <div
          className="rounded-2xl p-4 mb-8 mt-5 flex gap-3 items-start"
          style={{ backgroundColor: "#E8694A0C", border: "1px solid #E8694A20" }}
        >
          <span className="text-lg flex-shrink-0">🤍</span>
          <p className="text-sm text-gray-600">
            Guarda los tours que te llaman la atención y vuelve cuando tengas ganas de reservar.
            Las salidas disponibles pueden cambiar, así que no esperes demasiado si algo te gustó.
          </p>
        </div>

        {SAVED_EXPERIENCES.length === 0 ? (
          /* Estado vacío */
          <div className="text-center py-20">
            <p className="text-6xl mb-4">🤍</p>
            <h2 className="text-xl font-semibold text-gray-800 mb-2">Aún no tienes nada guardado</h2>
            <p className="text-gray-400 text-sm mb-6 max-w-sm mx-auto">
              Cuando explores experiencias y veas algo que te guste, toca el corazón para guardarlo aquí.
            </p>
            <Link
              href="/experiences"
              className="inline-block px-6 py-3 rounded-xl text-white font-semibold text-sm"
              style={{ backgroundColor: "#E8694A" }}
            >
              Explorar experiencias
            </Link>
          </div>
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5">
            {SAVED_EXPERIENCES.map(exp => (
              <ExperienceCard key={exp.id} {...exp} />
            ))}
          </div>
        )}
      </div>
    </div>
  );
}
