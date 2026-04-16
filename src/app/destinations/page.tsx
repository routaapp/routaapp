import Link from "next/link";
import Navbar from "@/components/ui/Navbar";

const DESTINATIONS = [
  { country: "República Dominicana", emoji: "🇩🇴", count: 142, description: "Playas de ensueño, selvas tropicales y la cuna del merengue y la bachata.", highlight: "Los Haitises · Samaná · Punta Cana · Jarabacoa", color: "#3DAA7A" },
  { country: "Colombia", emoji: "🇨🇴", count: 87, description: "Ciudades vibrantes, cafetales eternos y una biodiversidad sin igual.", highlight: "Cartagena · Medellín · Eje Cafetero · Amazonas", color: "#E8694A", badge: "Próximamente" },
  { country: "México", emoji: "🇲🇽", count: 213, description: "Cultura milenaria, gastronomía premiada y costas en dos océanos.", highlight: "CDMX · Oaxaca · Yucatán · Los Cabos", color: "#3DAA7A", badge: "Próximamente" },
  { country: "Perú", emoji: "🇵🇪", count: 64, description: "Cuna de civilizaciones antiguas y la mejor gastronomía de LATAM.", highlight: "Lima · Cusco · Machu Picchu · Amazonía", color: "#E8694A", badge: "Próximamente" },
  { country: "Argentina", emoji: "🇦🇷", count: 38, description: "Patagonia salvaje, vinos Malbec y cultura cosmopolita.", highlight: "Buenos Aires · Bariloche · Mendoza · Ushuaia", color: "#3DAA7A", badge: "Próximamente" },
  { country: "Costa Rica", emoji: "🇨🇷", count: 51, description: "Pura vida entre volcanes, selvas y costas del Pacífico y Caribe.", highlight: "San José · Arenal · Monteverde · Manuel Antonio", color: "#E8694A", badge: "Próximamente" },
];

export default function DestinationsPage() {
  return (
    <div style={{ backgroundColor: "#FAFAF7", minHeight: "100vh" }}>
      <Navbar />
      <section className="max-w-4xl mx-auto px-4 py-14 text-center">
        <span className="inline-block text-sm font-semibold px-4 py-1.5 rounded-full mb-5" style={{ backgroundColor: "#3DAA7A20", color: "#2B5E41" }}>
          🌎 Destinos disponibles
        </span>
        <h1 className="text-4xl md:text-5xl font-bold mb-4" style={{ color: "#2B5E41" }}>Explora Latinoamérica</h1>
        <p className="text-gray-500 text-lg max-w-xl mx-auto">Conectamos viajeros con guías locales verificados en los destinos más fascinantes de LATAM.</p>
      </section>
      <section className="max-w-6xl mx-auto px-4 pb-16">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {DESTINATIONS.map((dest) => (
            <a key={dest.country} href={dest.badge ? "#" : `/experiences?country=${encodeURIComponent(dest.country)}`}
              className="bg-white rounded-2xl border border-gray-100 p-6 hover:border-green-300 hover:shadow-md transition-all group relative overflow-hidden block">
              {dest.badge && (
                <span className="absolute top-4 right-4 text-xs font-semibold px-2.5 py-1 rounded-full" style={{ backgroundColor: "#E8694A20", color: "#E8694A" }}>{dest.badge}</span>
              )}
              <div className="text-5xl mb-3">{dest.emoji}</div>
              <h2 className="text-xl font-bold text-gray-900 mb-1 group-hover:text-green-700 transition-colors">{dest.country}</h2>
              <p className="text-sm text-gray-500 mb-3 leading-relaxed">{dest.description}</p>
              <p className="text-xs text-gray-400 mb-4">{dest.highlight}</p>
              <div className="flex items-center justify-between">
                <span className="text-xs font-semibold px-3 py-1 rounded-full" style={{ backgroundColor: "#3DAA7A20", color: "#2B5E41" }}>{dest.count} experiencias</span>
                {!dest.badge && <span className="text-xs font-medium" style={{ color: "#3DAA7A" }}>Ver todas →</span>}
              </div>
            </a>
          ))}
        </div>
      </section>
      <section className="max-w-6xl mx-auto px-4 pb-16">
        <div className="rounded-3xl p-10 text-center" style={{ backgroundColor: "#2B5E41" }}>
          <h2 className="text-3xl font-bold text-white mb-3">¿Tu destino no está aquí?</h2>
          <p className="text-green-200 mb-6 max-w-md mx-auto">Estamos expandiéndonos. Dinos a dónde quieres ir y te avisamos cuando tengamos experiencias disponibles.</p>
          <a href="/contact" className="inline-block px-8 py-3 rounded-xl font-semibold text-white border-2 border-white hover:bg-white hover:text-green-800 transition-colors">
            Sugerir un destino
          </a>
        </div>
      </section>
    </div>
  );
}
