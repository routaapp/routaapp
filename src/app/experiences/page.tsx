import Navbar from "@/components/ui/Navbar";
import ExperienceCard from "@/components/ui/ExperienceCard";

const ALL_EXPERIENCES = [
  { id: "1", title: "Excursión a Los Haitises", location: "Samaná, RD", price: 65, rating: 4.9, reviews: 128, category: "naturaleza", emoji: "🌿", duration: 8, badge: "Más popular" },
  { id: "2", title: "Tour gastronómico Zona Colonial", location: "Santo Domingo, RD", price: 45, rating: 4.7, reviews: 84, category: "gastronomia", emoji: "🍽️", duration: 3 },
  { id: "3", title: "Surf en Cabarete", location: "Cabarete, RD", price: 80, rating: 4.8, reviews: 61, category: "aventura", emoji: "🏄", duration: 4, badge: "Nuevo" },
  { id: "4", title: "Snorkel en Isla Catalina", location: "La Romana, RD", price: 55, rating: 4.6, reviews: 93, category: "playa", emoji: "🤿", duration: 6 },
  { id: "5", title: "Senderismo Pico Duarte", location: "Jarabacoa, RD", price: 120, rating: 5.0, reviews: 37, category: "aventura", emoji: "🏔️", duration: 48, badge: "Exclusivo" },
  { id: "6", title: "Noche de bachata en vivo", location: "Santiago, RD", price: 35, rating: 4.8, reviews: 152, category: "noche", emoji: "💃", duration: 3 },
  { id: "7", title: "Cataratas El Limón a caballo", location: "Las Terrenas, RD", price: 50, rating: 4.7, reviews: 76, category: "aventura", emoji: "🐴", duration: 4 },
  { id: "8", title: "Degustación de ron artesanal", location: "Santo Domingo, RD", price: 40, rating: 4.5, reviews: 44, category: "cultural", emoji: "🥃", duration: 2 },
  { id: "9", title: "Kite surf principiantes", location: "Cabarete, RD", price: 90, rating: 4.9, reviews: 29, category: "aventura", emoji: "🪁", duration: 3 },
  { id: "10", title: "Tour de café y cacao", location: "Jarabacoa, RD", price: 38, rating: 4.6, reviews: 55, category: "cultural", emoji: "☕", duration: 3 },
  { id: "11", title: "Kayak en Bahía de las Águilas", location: "Pedernales, RD", price: 70, rating: 4.9, reviews: 22, category: "aventura", emoji: "🚣", duration: 5 },
  { id: "12", title: "City tour Santo Domingo", location: "Santo Domingo, RD", price: 30, rating: 4.4, reviews: 201, category: "ciudad", emoji: "🏛️", duration: 3 },
];

const CATEGORIES = ["Todos", "aventura", "naturaleza", "playa", "gastronomia", "cultural", "noche", "ciudad"];

export default function ExperiencesPage() {
  return (
    <div style={{ backgroundColor: "#FAFAF7", minHeight: "100vh" }}>
      <Navbar />

      <div className="max-w-7xl mx-auto px-4 py-8">
        <div className="flex flex-col md:flex-row gap-6">

          {/* ── FILTROS SIDEBAR ── */}
          <aside className="md:w-60 flex-shrink-0">
            <div className="bg-white rounded-2xl border border-gray-100 p-5 sticky top-24 shadow-sm">
              <h3 className="font-semibold text-gray-900 mb-4">Filtros</h3>

              <div className="mb-5">
                <p className="text-xs font-semibold text-gray-500 uppercase mb-2">Categoría</p>
                <div className="flex flex-col gap-1">
                  {CATEGORIES.map(cat => (
                    <button
                      key={cat}
                      className="text-left text-sm px-3 py-2 rounded-lg hover:bg-gray-50 capitalize transition-colors"
                      style={cat === "Todos" ? { color: "#2B5E41", fontWeight: 600 } : { color: "#6B7280" }}
                    >
                      {cat}
                    </button>
                  ))}
                </div>
              </div>

              <div className="mb-5">
                <p className="text-xs font-semibold text-gray-500 uppercase mb-2">Precio (USD)</p>
                <div className="flex gap-2">
                  <input type="number" placeholder="Min" className="w-full border border-gray-200 rounded-lg px-3 py-2 text-sm focus:outline-none" />
                  <input type="number" placeholder="Max" className="w-full border border-gray-200 rounded-lg px-3 py-2 text-sm focus:outline-none" />
                </div>
              </div>

              <div className="mb-5">
                <p className="text-xs font-semibold text-gray-500 uppercase mb-2">Duración</p>
                {["Menos de 3h", "3–8h", "Día completo", "Multi-día"].map(opt => (
                  <label key={opt} className="flex items-center gap-2 py-1.5 cursor-pointer">
                    <input type="checkbox" className="rounded" />
                    <span className="text-sm text-gray-600">{opt}</span>
                  </label>
                ))}
              </div>

              <div>
                <p className="text-xs font-semibold text-gray-500 uppercase mb-2">Rating mínimo</p>
                {["⭐⭐⭐⭐⭐ 5.0", "⭐⭐⭐⭐ 4.0+", "⭐⭐⭐ 3.0+"].map(opt => (
                  <label key={opt} className="flex items-center gap-2 py-1.5 cursor-pointer">
                    <input type="radio" name="rating" className="rounded" />
                    <span className="text-sm text-gray-600">{opt}</span>
                  </label>
                ))}
              </div>

              <button className="w-full mt-5 py-2.5 rounded-xl text-sm font-semibold text-white" style={{ backgroundColor: "#3DAA7A" }}>
                Aplicar filtros
              </button>
            </div>
          </aside>

          {/* ── RESULTADOS ── */}
          <div className="flex-1">
            {/* Barra de búsqueda */}
            <div className="flex gap-2 mb-5">
              <input
                type="text"
                placeholder="¿Qué quieres hacer?"
                className="flex-1 bg-white border border-gray-200 rounded-xl px-4 py-3 text-sm focus:outline-none shadow-sm"
              />
              <select className="bg-white border border-gray-200 rounded-xl px-4 py-3 text-sm text-gray-600 focus:outline-none shadow-sm">
                <option>Más populares</option>
                <option>Precio: menor a mayor</option>
                <option>Precio: mayor a menor</option>
                <option>Mejor rating</option>
                <option>Más recientes</option>
              </select>
            </div>

            <p className="text-sm text-gray-400 mb-5">{ALL_EXPERIENCES.length} experiencias encontradas</p>

            <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-3 gap-5">
              {ALL_EXPERIENCES.map(exp => (
                <ExperienceCard key={exp.id} {...exp} />
              ))}
            </div>

            {/* Paginación */}
            <div className="flex justify-center gap-2 mt-10">
              {[1, 2, 3].map(page => (
                <button
                  key={page}
                  className="w-9 h-9 rounded-lg text-sm font-medium"
                  style={page === 1
                    ? { backgroundColor: "#2B5E41", color: "white" }
                    : { backgroundColor: "white", color: "#6B7280", border: "1px solid #E5E7EB" }
                  }
                >
                  {page}
                </button>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
