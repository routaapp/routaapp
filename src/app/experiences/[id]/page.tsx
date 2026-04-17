import Link from "next/link";
import Navbar from "@/components/ui/Navbar";
import ExperienceCard from "@/components/ui/ExperienceCard";
import WishlistButton from "@/components/ui/WishlistButton";

const DEPARTURES_BY_EXPERIENCE: Record<string, { id: string; date: string; time: string; price: number; spots_left: number }[]> = {
  "1": [
    { id: "D001", date: "2026-04-20", time: "07:00", price: 65, spots_left: 5 },
    { id: "D002", date: "2026-04-27", time: "07:00", price: 65, spots_left: 12 },
    { id: "D003", date: "2026-05-04", time: "07:00", price: 75, spots_left: 8 },
  ],
  "2": [
    { id: "D004", date: "2026-04-22", time: "10:00", price: 45, spots_left: 7 },
    { id: "D005", date: "2026-04-29", time: "10:00", price: 45, spots_left: 10 },
  ],
};

const PLACEHOLDER: Record<string, object> = {
  "1": {
    title: "Excursion a Los Haitises",
    location: "Samana, Republica Dominicana",
    base_price: 65,
    category: "naturaleza",
    emoji: "&#127807;",
    duration: 8,
    capacity: 12,
    description: "Los Haitises es uno de los parques nacionales mas impresionantes del Caribe. Este tour te lleva a traves de sus manglares milenarios, cuevas con pinturas tainas y una biodiversidad unica.\n\nComenzaras con un recorrido en lancha por la bahia, observando las formaciones karsticas del parque. Visitaras las cuevas de Arena y La Linea, con pictografias de los tainos originales.\n\nEl tour incluye snorkel en aguas cristalinas, almuerzo tipico dominicano a bordo, y guia certificado.",
    includes: ["Transporte ida y vuelta", "Lancha privada", "Guia certificado", "Almuerzo tipico", "Equipo de snorkel", "Seguro de viaje"],
    notIncludes: ["Bebidas adicionales", "Propinas", "Fotos profesionales"],
    provider: { id: "p1", name: "Tours Samana Pro", avg_rating: 4.9, total_reviews: 128, trips: 312, verified: true, whatsapp: "+1809555000" },
    images: ["&#127807;", "&#127754;", "&#129413;", "&#127965;"],
  },
};

const RELATED = [
  { id: "4", title: "Snorkel en Isla Catalina", location: "La Romana, RD", price: 55, rating: 4.6, reviews: 93, category: "playa", emoji: "&#129347;", duration: 6 },
  { id: "7", title: "Cataratas El Limon a caballo", location: "Las Terrenas, RD", price: 50, rating: 4.7, reviews: 76, category: "aventura", emoji: "&#128052;", duration: 4 },
  { id: "3", title: "Surf en Cabarete", location: "Cabarete, RD", price: 80, rating: 4.8, reviews: 61, category: "aventura", emoji: "&#127940;", duration: 4 },
];

const REVIEWS_PLACEHOLDER = [
  { name: "Maria G.", country: "🇲🇽", rating: 5, comment: "Una experiencia increible. El guia fue muy profesional y los paisajes son impresionantes.", date: "Marzo 2026", verified: true },
  { name: "Carlos V.", country: "🇨🇴", rating: 5, comment: "Supero todas mis expectativas. El almuerzo tipico estaba delicioso y las cuevas tainas son unicas.", date: "Febrero 2026", verified: true },
  { name: "Ana L.", country: "🇵🇷", rating: 4, comment: "Muy buena organizacion. Salimos un poco tarde pero todo lo demas fue perfecto.", date: "Enero 2026", verified: true },
];

interface Props { params: Promise<{ id: string }> }

export default async function ExperienceDetailPage({ params }: Props) {
  const { id } = await params;
  const exp = (PLACEHOLDER[id] ?? PLACEHOLDER["1"]) as {
    title: string; location: string; base_price: number;
    category: string; emoji: string; duration: number; capacity: number; description: string;
    includes: string[]; notIncludes: string[];
    provider: { id: string; name: string; avg_rating: number; total_reviews: number; trips: number; verified: boolean; whatsapp: string };
    images: string[];
  };

  const departures = DEPARTURES_BY_EXPERIENCE[id] ?? DEPARTURES_BY_EXPERIENCE["1"];
  const lowestPrice = departures.reduce((min, d) => Math.min(min, d.price), Infinity);

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

        {/* Galeria con wishlist button */}
        <div className="relative mb-8">
          <div className="grid grid-cols-4 grid-rows-2 gap-2 h-72 md:h-96 rounded-2xl overflow-hidden">
            <div className="col-span-2 row-span-2 flex items-center justify-center text-8xl" style={{ backgroundColor: "#6FCFAB30" }}>
              <span dangerouslySetInnerHTML={{ __html: exp.images[0] }} />
            </div>
            {exp.images.slice(1).map((img, i) => (
              <div key={i} className="flex items-center justify-center text-5xl" style={{ backgroundColor: "#3DAA7A15" }}>
                <span dangerouslySetInnerHTML={{ __html: img }} />
              </div>
            ))}
          </div>
          <div className="absolute top-4 right-4">
            <WishlistButton experienceId={id} />
          </div>
        </div>

        <div className="flex flex-col lg:flex-row gap-8">

          {/* INFO PRINCIPAL */}
          <div className="flex-1">
            <div className="flex items-center gap-2 mb-3 flex-wrap">
              <span className="text-xs font-semibold px-3 py-1 rounded-full capitalize text-white" style={{ backgroundColor: "#3DAA7A" }}>
                {exp.category}
              </span>
              <span className="text-xs text-gray-500">
                &#11088; {exp.provider.avg_rating} &middot; {exp.provider.total_reviews} resenas de la agencia
              </span>
            </div>

            <h1 className="text-3xl font-bold text-gray-900 mb-2">{exp.title}</h1>
            <p className="text-gray-400 flex flex-wrap gap-4 text-sm mb-6">
              <span>&#128205; {exp.location}</span>
              <span>&#8987; {exp.duration} horas</span>
              <span>&#128101; Max {exp.capacity} personas</span>
            </p>

            {/* Proveedor */}
            <div className="flex items-center gap-3 p-4 bg-white rounded-xl border border-gray-100 mb-6">
              <div className="w-12 h-12 rounded-full flex items-center justify-center text-2xl flex-shrink-0" style={{ backgroundColor: "#6FCFAB30" }}>
                &#129517;
              </div>
              <div className="flex-1 min-w-0">
                <div className="flex items-center gap-2 flex-wrap">
                  <p className="font-semibold text-gray-900 text-sm">{exp.provider.name}</p>
                  {exp.provider.verified && (
                    <span className="text-xs px-2 py-0.5 rounded-full font-medium text-white flex-shrink-0" style={{ backgroundColor: "#3DAA7A" }}>
                      &#10003; Verificado
                    </span>
                  )}
                </div>
                <p className="text-xs text-gray-400 mt-0.5">
                  &#11088; <strong>{exp.provider.avg_rating}</strong> rating de agencia &middot; {exp.provider.total_reviews} resenas &middot; {exp.provider.trips} tours realizados
                </p>
              </div>
              <a href={`https://wa.me/${exp.provider.whatsapp}`}
                className="text-xs font-semibold px-3 py-1.5 rounded-lg text-white flex-shrink-0"
                style={{ backgroundColor: "#25D366" }}>
                WhatsApp
              </a>
            </div>

            {/* Descripcion */}
            <div className="mb-6">
              <h2 className="text-lg font-semibold text-gray-900 mb-3">Sobre esta experiencia</h2>
              {exp.description.split("\n\n").map((p, i) => (
                <p key={i} className="text-gray-600 leading-relaxed mb-3 text-sm">{p}</p>
              ))}
            </div>

            {/* Incluye */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-8">
              <div>
                <h3 className="font-semibold text-gray-900 mb-3">&#10003; Incluye</h3>
                <ul className="space-y-2">
                  {exp.includes.map((item) => (
                    <li key={item} className="text-sm text-gray-600 flex items-start gap-2">
                      <span className="text-green-500 mt-0.5">&bull;</span>{item}
                    </li>
                  ))}
                </ul>
              </div>
              <div>
                <h3 className="font-semibold text-gray-900 mb-3">&#10007; No incluye</h3>
                <ul className="space-y-2">
                  {exp.notIncludes.map((item) => (
                    <li key={item} className="text-sm text-gray-500 flex items-start gap-2">
                      <span className="text-gray-300 mt-0.5">&bull;</span>{item}
                    </li>
                  ))}
                </ul>
              </div>
            </div>

            {/* Resenas verificadas */}
            <div>
              <div className="flex items-center justify-between mb-4">
                <h2 className="text-lg font-semibold text-gray-900">
                  Resenas de este tour{" "}
                  <span className="text-gray-400 font-normal">({REVIEWS_PLACEHOLDER.length})</span>
                </h2>
                <div className="flex items-center gap-1.5 text-sm font-bold" style={{ color: "#2B5E41" }}>
                  &#11088; {exp.provider.avg_rating}
                  <span className="text-xs font-normal text-gray-400">(agencia)</span>
                </div>
              </div>
              <div className="rounded-xl p-3 mb-4 flex items-center gap-2"
                style={{ backgroundColor: "#3DAA7A0C", border: "1px solid #3DAA7A20" }}>
                <span className="text-sm">&#10003;</span>
                <p className="text-xs text-gray-600">
                  Solo viajeros que reservaron y completaron el tour por Routa pueden dejar resena.
                </p>
              </div>
              <div className="space-y-4">
                {REVIEWS_PLACEHOLDER.map((rev) => (
                  <div key={rev.name} className="bg-white rounded-xl border border-gray-100 p-4">
                    <div className="flex items-center justify-between mb-2">
                      <div className="flex items-center gap-2">
                        <div className="w-8 h-8 rounded-full flex items-center justify-center text-sm font-semibold"
                          style={{ backgroundColor: "#6FCFAB30", color: "#2B5E41" }}>
                          {rev.name[0]}
                        </div>
                        <div>
                          <p className="text-sm font-semibold text-gray-900">{rev.name} {rev.country}</p>
                          <p className="text-xs text-gray-400">{rev.date}</p>
                        </div>
                      </div>
                      <div className="flex flex-col items-end gap-1">
                        <span className="text-sm">{"&#11088;".repeat(rev.rating)}</span>
                        {rev.verified && (
                          <span className="text-xs" style={{ color: "#3DAA7A" }}>&#10003; Verificada</span>
                        )}
                      </div>
                    </div>
                    <p className="text-sm text-gray-600">{rev.comment}</p>
                  </div>
                ))}
              </div>
            </div>
          </div>

          {/* WIDGET RESERVA */}
          <div className="lg:w-80">
            <div className="sticky top-24 bg-white border border-gray-200 rounded-2xl p-6 shadow-sm">
              <p className="text-3xl font-bold text-gray-900 mb-1">
                Desde ${lowestPrice}
                <span className="text-base font-normal text-gray-400 ml-1">USD/persona</span>
              </p>
              <div className="flex items-center gap-1 text-sm text-gray-500 mb-5">
                &#11088; {exp.provider.avg_rating} &middot; {exp.provider.total_reviews} resenas de la agencia
              </div>

              <div className="space-y-3 mb-4">
                <div>
                  <label className="block text-xs font-semibold text-gray-600 mb-2">Salidas disponibles</label>
                  <div className="space-y-2">
                    {departures.map((dep, i) => (
                      <label key={dep.id}
                        className="flex items-center justify-between p-3 border rounded-xl cursor-pointer transition-colors"
                        style={{ borderColor: i === 0 ? "#3DAA7A" : "#E5E7EB", backgroundColor: i === 0 ? "#3DAA7A08" : "white" }}>
                        <div className="flex items-center gap-2">
                          <input type="radio" name="departure" value={dep.id} defaultChecked={i === 0} className="accent-green-600" />
                          <div>
                            <p className="text-sm font-medium text-gray-800">{dep.date}</p>
                            <p className="text-xs text-gray-400">{dep.time} hrs &middot; {dep.spots_left} {dep.spots_left === 1 ? "lugar" : "lugares"}</p>
                          </div>
                        </div>
                        <div className="text-right">
                          <p className="text-sm font-bold text-gray-900">${dep.price}</p>
                          {dep.price !== exp.base_price && (
                            <p className="text-xs font-medium" style={{ color: "#E8694A" }}>Precio especial</p>
                          )}
                        </div>
                      </label>
                    ))}
                  </div>
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
                  <span>${lowestPrice} x 1 persona</span>
                  <span className="font-semibold text-gray-900">${lowestPrice}</span>
                </div>
                <div className="text-sm text-gray-400 flex justify-between">
                  <span>Tarifa de servicio</span>
                  <span>${Math.round(lowestPrice * 0.07)}</span>
                </div>
                <div className="border-t border-gray-200 pt-3 text-sm font-bold flex justify-between text-gray-900">
                  <span>Total</span>
                  <span>${lowestPrice + Math.round(lowestPrice * 0.07)}</span>
                </div>
              </div>

              <Link href="/booking/confirm"
                className="w-full block text-center py-3.5 rounded-xl text-white font-semibold text-base"
                style={{ backgroundColor: "#E8694A" }}>
                Reservar ahora
              </Link>
              <p className="text-center text-xs text-gray-400 mt-3">Sin cargos hasta confirmar</p>

              <div className="mt-4 flex justify-center">
                <WishlistButton experienceId={id} variant="text" />
              </div>

              <div className="mt-5 pt-4 border-t border-gray-100 space-y-2">
                {["&#10003; Cancelacion gratis hasta 24h antes", "&#10003; Pago seguro", "&#10003; Proveedor verificado por Routa"].map(g => (
                  <p key={g} className="text-xs text-gray-500" dangerouslySetInnerHTML={{ __html: g }} />
                ))}
              </div>
            </div>
          </div>
        </div>

        {/* Relacionadas */}
        <div className="mt-16">
          <h2 className="text-2xl font-bold text-gray-900 mb-6">Tambien te puede gustar</h2>
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-5">
            {RELATED.map(exp => <ExperienceCard key={exp.id} {...exp} />)}
          </div>
        </div>
      </div>
    </div>
  );
}
