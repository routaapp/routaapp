import Link from "next/link";
import Navbar from "@/components/ui/Navbar";
import ExperienceCard from "@/components/ui/ExperienceCard";

// Placeholder data por ID
const PLACEHOLDER: Record<string, object> = {
  "1": {
    title: "Excursión a Los Haitises",
    location: "Samaná, República Dominicana",
    price: 65,
    rating: 4.9,
    reviews: 128,
    category: "naturaleza",
    emoji: "🌿",
    duration: 8,
    capacity: 12,
    description: `Los Haitises es uno de los parques nacionales más impresionantes del Caribe. Este tour te lleva a través de sus manglares milenarios, cuevas con pinturas taínas y una biodiversidad única.

Comenzarás con un recorrido en lancha por la bahía, observando las formaciones kársticas características del parque. Visitarás las cuevas de Arena y La Línea, con pictografías de los taínos originales.

El tour incluye snorkel en las aguas cristalinas, almuerzo típico dominicano a bordo, y guía certificado en español e inglés.`,
    includes: ["Transporte ida y vuelta", "Lancha privada", "Guía certificado", "Almuerzo típico", "Equipo de snorkel", "Seguro de viaje"],
    notIncludes: ["Bebidas adicionales", "Propinas", "Fotos profesionales"],
    provider: { name: "Tours Samaná Pro", rating: 4.9, trips: 312, verified: true, whatsapp: "+1809555000" },
    images: ["🌿", "🌊", "🦅", "🏝️"],
  },
};

const RELATED = [
  { id: "4", title: "Snorkel en Isla Catalina", location: "La Romana, RD", price: 55, rating: 4.6, reviews: 93, category: "playa", emoji: "🤿", duration: 6 },
  { id: "7", title: "Cataratas El Limón a caballo", location: "Las Terrenas, RD", price: 50, rating: 4.7, reviews: 76, category: "aventura", emoji: "🐴", duration: 4 },
  { id: "3", title: "Surf en Cabarete", location: "Cabarete, RD", price: 80, rating: 4.8, reviews: 61, category: "aventura", emoji: "🏄", duration: 4 },
];

const REVIEWS_PLACEHOLDER = [
  { name: "María G.", country: "🇲🇽", rating: 5, comment: "Una experiencia increíble. El guía fue muy profesional y los paisajes son impresionantes. 100% recomendado.", date: "Marzo 2026" },
  { name: "Carlos V.", country: "🇨🇴", rating: 5, comment: "Superó todas mis expectativas. El almuerzo típico estaba delicioso y las cuevas taínas son algo que no olvidaré.", date: "Febrero 2026" },
  { name: "Ana L.", country: "🇵🇷", rating: 4, comment: "Muy buena organización. El único detalle es que salimos 20 minutos tarde, pero todo lo demás fue perfecto.", date: "Enero 2026" },
];

interface Props { params: Promise<{ id: string }> }

export default async function ExperienceDetailPage({ params }: Props) {
  const { id } = await params;
  const exp = (PLACEHOLDER[id] ?? PLACEHOLDER["1"]) as {
    title: string; location: string; price: number; rating: number; reviews: number;
    category: string; emoji: string; duration: number; capacity: number; description: string;
    includes: string[]; notIncludes: string[];
    provider: { name: string; rating: number; trips: number; verified: boolean; whatsapp: string };
    images: string[];
  };

  return (
    <div style={{ backgroundColor: "#FAFAF7", minHeight: "100vh" }}>
      <Navbar />

      <div className="max-w-5xl mx-auto px-4 py-8">

        {/* Breadcrumb */}
        <div className="text-sm text-gray-400 mb-4 flex items-center gap-2">
          <Link href="/" className="hover:text-green-700">Inicio</Link>
          <span>/</span>
          <Link href="/experiences" className="hover:text-green-700">Experiencias</Link>
          <span>/</span>
          <span className="text-gray-600">{exp.title}</span>
        </div>

        {/* Galería */}
        <div className="grid grid-cols-4 grid-rows-2 gap-2 h-72 md:h-96 rounded-2xl overflow-hidden mb-8">
          <div className="col-span-2 row-span-2 flex items-center justify-center text-8xl" style={{ backgroundColor: "#6FCFAB30" }}>
            {exp.images[0]}
          </div>
          {exp.images.slice(1).map((img, i) => (
            <div key={i} className="flex items-center justify-center text-5xl" style={{ backgroundColor: "#3DAA7A15" }}>
              {img}
            </div>
          ))}
        </div>

        <div className="flex flex-col lg:flex-row gap-8">

          {/* ── INFO PRINCIPAL ── */}
          <div className="flex-1">
            <div className="flex items-center gap-2 mb-3">
              <span className="text-xs font-semibold px-3 py-1 rounded-full capitalize text-white" style={{ backgroundColor: "#3DAA7A" }}>
                {exp.category}
              </span>
              <span className="text-xs text-gray-500">⭐ {exp.rating} · {exp.reviews} reseñas</span>
            </div>

            <h1 className="text-3xl font-bold text-gray-900 mb-2">{exp.title}</h1>
            <p className="text-gray-400 flex flex-wrap gap-4 text-sm mb-6">
              <span>📍 {exp.location}</span>
              <span>⏱ {exp.duration} horas</span>
              <span>👥 Máx {exp.capacity} personas</span>
            </p>

            {/* Proveedor */}
            <div className="flex items-center gap-3 p-4 bg-white rounded-xl border border-gray-100 mb-6">
              <div className="w-12 h-12 rounded-full flex items-center justify-center text-2xl" style={{ backgroundColor: "#6FCFAB30" }}>
                🧭
              </div>
              <div className="flex-1">
                <div className="flex items-center gap-2">
                  <p className="font-semibold text-gray-900 text-sm">{exp.provider.name}</p>
                  {exp.provider.verified && (
                    <span className="text-xs px-2 py-0.5 rounded-full font-medium text-white" style={{ backgroundColor: "#3DAA7A" }}>✓ Verificado</span>
                  )}
                </div>
                <p className="text-xs text-gray-400">⭐ {exp.provider.rating} · {exp.provider.trips} tours realizados</p>
              </div>
              <a
                href={`https://wa.me/${exp.provider.whatsapp}`}
                className="text-xs font-semibold px-3 py-1.5 rounded-lg text-white"
                style={{ backgroundColor: "#25D366" }}
              >
                WhatsApp
              </a>
            </div>

            {/* Descripción */}
            <div className="mb-6">
              <h2 className="text-lg font-semibold text-gray-900 mb-3">Sobre esta experiencia</h2>
              {exp.description.split("\n\n").map((p, i) => (
                <p key={i} className="text-gray-600 leading-relaxed mb-3 text-sm">{p}</p>
              ))}
            </div>

            {/* Incluye */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-8">
              <div>
                <h3 className="font-semibold text-gray-900 mb-3">✅ Incluye</h3>
                <ul className="space-y-2">
                  {exp.includes.map((item) => (
                    <li key={item} className="text-sm text-gray-600 flex items-start gap-2">
                      <span className="text-green-500 mt-0.5">•</span>{item}
                    </li>
                  ))}
                </ul>
              </div>
              <div>
                <h3 className="font-semibold text-gray-900 mb-3">❌ No incluye</h3>
                <ul className="space-y-2">
                  {exp.notIncludes.map((item) => (
                    <li key={item} className="text-sm text-gray-500 flex items-start gap-2">
                      <span className="text-gray-300 mt-0.5">•</span>{item}
                    </li>
                  ))}
                </ul>
              </div>
            </div>

            {/* Reseñas */}
            <div>
              <div className="flex items-center justify-between mb-4">
                <h2 className="text-lg font-semibold text-gray-900">
                  Reseñas <span className="text-gray-400 font-normal">({exp.reviews})</span>
                </h2>
                <div className="flex items-center gap-1 text-sm font-bold" style={{ color: "#2B5E41" }}>
                  ⭐ {exp.rating}
                </div>
              </div>
              <div className="space-y-4">
                {REVIEWS_PLACEHOLDER.map((rev) => (
                  <div key={rev.name} className="bg-white rounded-xl border border-gray-100 p-4">
                    <div className="flex items-center justify-between mb-2">
                      <div className="flex items-center gap-2">
                        <div className="w-8 h-8 rounded-full flex items-center justify-center text-sm" style={{ backgroundColor: "#6FCFAB30" }}>
                          {rev.name[0]}
                        </div>
                        <div>
                          <p className="text-sm font-semibold text-gray-900">{rev.name} {rev.country}</p>
                          <p className="text-xs text-gray-400">{rev.date}</p>
                        </div>
                      </div>
                      <span className="text-sm">{"⭐".repeat(rev.rating)}</span>
                    </div>
                    <p className="text-sm text-gray-600">{rev.comment}</p>
                  </div>
                ))}
              </div>
            </div>
          </div>

          {/* ── WIDGET RESERVA ── */}
          <div className="lg:w-80">
            <div className="sticky top-24 bg-white border border-gray-200 rounded-2xl p-6 shadow-sm">
              <p className="text-3xl font-bold text-gray-900 mb-1">
                ${exp.price}
                <span className="text-base font-normal text-gray-400 ml-1">USD/persona</span>
              </p>
              <div className="flex items-center gap-1 text-sm text-gray-500 mb-5">
                ⭐ {exp.rating} · {exp.reviews} reseñas
              </div>

              <div className="space-y-3 mb-4">
                <div>
                  <label className="block text-xs font-semibold text-gray-600 mb-1">Fecha</label>
                  <input type="date" className="w-full border border-gray-200 rounded-xl px-4 py-2.5 text-sm focus:outline-none focus:ring-1 focus:ring-green-400" />
                </div>
                <div>
                  <label className="block text-xs font-semibold text-gray-600 mb-1">Participantes</label>
                  <select className="w-full border border-gray-200 rounded-xl px-4 py-2.5 text-sm focus:outline-none focus:ring-1 focus:ring-green-400">
                    {[1,2,3,4,5,6,7,8].map(n => (
                      <option key={n}>{n} {n === 1 ? "persona" : "personas"}</option>
                    ))}
                  </select>
                </div>
                <div className="border-t border-gray-100 pt-3 text-sm text-gray-600 flex justify-between">
                  <span>${exp.price} × 1 persona</span>
                  <span className="font-semibold text-gray-900">${exp.price}</span>
                </div>
                <div className="text-sm text-gray-400 flex justify-between">
                  <span>Tarifa de servicio</span>
                  <span>${Math.round(exp.price * 0.07)}</span>
                </div>
                <div className="border-t border-gray-200 pt-3 text-sm font-bold flex justify-between text-gray-900">
                  <span>Total</span>
                  <span>${exp.price + Math.round(exp.price * 0.07)}</span>
                </div>
              </div>

              <Link
                href="/booking/confirm"
                className="w-full block text-center py-3.5 rounded-xl text-white font-semibold text-base"
                style={{ backgroundColor: "#E8694A" }}
              >
                Reservar ahora
              </Link>
              <p className="text-center text-xs text-gray-400 mt-3">Sin cargos hasta confirmar</p>

              {/* Garantías */}
              <div className="mt-5 pt-4 border-t border-gray-100 space-y-2">
                {["✓ Cancelación gratis hasta 24h antes", "✓ Pago seguro", "✓ Proveedor verificado"].map(g => (
                  <p key={g} className="text-xs text-gray-500">{g}</p>
                ))}
              </div>
            </div>
          </div>
        </div>

        {/* Experiencias relacionadas */}
        <div className="mt-16">
          <h2 className="text-2xl font-bold text-gray-900 mb-6">También te puede gustar</h2>
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-5">
            {RELATED.map(exp => <ExperienceCard key={exp.id} {...exp} />)}
          </div>
        </div>
      </div>
    </div>
  );
}
