import Link from "next/link";
import Navbar from "@/components/ui/Navbar";
import ExperienceCard from "@/components/ui/ExperienceCard";
import Logo from "@/components/ui/Logo";

const EXPERIENCES = [
  { id: "1", title: "Excursión a Los Haitises", location: "Samaná, RD", price: 65, rating: 4.9, reviews: 128, category: "naturaleza", emoji: "🌿", duration: 8, badge: "Más popular" },
  { id: "2", title: "Tour gastronómico Zona Colonial", location: "Santo Domingo, RD", price: 45, rating: 4.7, reviews: 84, category: "gastronomia", emoji: "🍽️", duration: 3 },
  { id: "3", title: "Surf en Cabarete", location: "Cabarete, RD", price: 80, rating: 4.8, reviews: 61, category: "aventura", emoji: "🏄", duration: 4, badge: "Nuevo" },
  { id: "4", title: "Snorkel en Isla Catalina", location: "La Romana, RD", price: 55, rating: 4.6, reviews: 93, category: "playa", emoji: "🤿", duration: 6 },
  { id: "5", title: "Senderismo Pico Duarte", location: "Jarabacoa, RD", price: 120, rating: 5.0, reviews: 37, category: "aventura", emoji: "🏔️", duration: 48, badge: "Exclusivo" },
  { id: "6", title: "Noche de bachata en vivo", location: "Santiago, RD", price: 35, rating: 4.8, reviews: 152, category: "noche", emoji: "💃", duration: 3 },
  { id: "7", title: "Cataratas El Limón a caballo", location: "Las Terrenas, RD", price: 50, rating: 4.7, reviews: 76, category: "aventura", emoji: "🐴", duration: 4 },
  { id: "8", title: "Degustación de ron artesanal", location: "Santo Domingo, RD", price: 40, rating: 4.5, reviews: 44, category: "cultural", emoji: "🥃", duration: 2 },
  { id: "9", title: "Kite surf principiantes", location: "Cabarete, RD", price: 90, rating: 4.9, reviews: 29, category: "aventura", emoji: "🪁", duration: 3 },
];

const CATEGORIES = [
  { label: "Aventura", emoji: "🏄", slug: "aventura" },
  { label: "Naturaleza", emoji: "🌿", slug: "naturaleza" },
  { label: "Playa", emoji: "🏖️", slug: "playa" },
  { label: "Gastronomía", emoji: "🍽️", slug: "gastronomia" },
  { label: "Cultural", emoji: "🏛️", slug: "cultural" },
  { label: "Noche", emoji: "🌆", slug: "noche" },
];

const DESTINATIONS = [
  { name: "República Dominicana", emoji: "🇩🇴", count: 142, active: true },
  { name: "Colombia", emoji: "🇨🇴", count: 87, active: false },
  { name: "México", emoji: "🇲🇽", count: 213, active: false },
  { name: "Perú", emoji: "🇵🇪", count: 64, active: false },
];

export default function HomePage() {
  return (
    <div style={{ backgroundColor: "#FAFAF7", minHeight: "100vh" }}>
      <Navbar />

      {/* HERO */}
      <section className="relative overflow-hidden py-20 px-4 text-center">
        <div className="absolute inset-0 pointer-events-none overflow-hidden">
          <div className="absolute -top-20 -right-20 w-96 h-96 rounded-full opacity-10" style={{ backgroundColor: "#3DAA7A" }} />
          <div className="absolute -bottom-10 -left-10 w-64 h-64 rounded-full opacity-10" style={{ backgroundColor: "#E8694A" }} />
        </div>
        <div className="relative max-w-3xl mx-auto">
          <span className="inline-block text-sm font-semibold px-4 py-1.5 rounded-full mb-6" style={{ backgroundColor: "#3DAA7A20", color: "#2B5E41" }}>
            🌎 El marketplace de turismo para LATAM
          </span>
          <h1 className="text-5xl md:text-6xl font-bold mb-5 leading-tight" style={{ color: "#2B5E41" }}>
            Descubre LATAM<br />
            <span style={{ color: "#E8694A" }}>diferente</span>
          </h1>
          <p className="text-lg text-gray-500 mb-10 max-w-xl mx-auto">
            Reserva experiencias únicas con guías locales verificados en toda Latinoamérica.
          </p>
          <div className="flex flex-col sm:flex-row gap-2 max-w-2xl mx-auto shadow-lg rounded-2xl overflow-hidden bg-white p-2">
            <input type="text" placeholder="¿A dónde vas?" className="flex-1 px-4 py-3 text-gray-700 focus:outline-none text-sm bg-transparent" />
            <div className="w-px bg-gray-200 hidden sm:block" />
            <input type="text" placeholder="¿Qué quieres hacer?" className="flex-1 px-4 py-3 text-gray-700 focus:outline-none text-sm bg-transparent" />
            <Link href="/experiences" className="px-6 py-3 rounded-xl text-white font-semibold text-sm whitespace-nowrap flex items-center gap-2" style={{ backgroundColor: "#E8694A" }}>
              Buscar
            </Link>
          </div>
          <div className="flex flex-wrap justify-center gap-6 mt-10 text-sm text-gray-500">
            {[["500+", "Experiencias"], ["4", "Países"], ["200+", "Guías verificados"], ["⭐ 4.8", "Rating promedio"]].map(([n, l]) => (
              <div key={l} className="flex flex-col items-center">
                <span className="font-bold text-lg" style={{ color: "#2B5E41" }}>{n}</span>
                <span>{l}</span>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CATEGORIAS */}
      <section className="max-w-6xl mx-auto px-4 py-8">
        <div className="flex gap-3 overflow-x-auto pb-2">
          {CATEGORIES.map((cat) => (
            <Link key={cat.slug} href={`/experiences?category=${cat.slug}`}
              className="flex-shrink-0 flex items-center gap-2 px-5 py-2.5 rounded-full bg-white border border-gray-200 text-sm font-medium text-gray-700 hover:border-green-400 hover:text-green-700 transition-colors shadow-sm">
              <span>{cat.emoji}</span>{cat.label}
            </Link>
          ))}
        </div>
      </section>

      {/* EXPERIENCIAS */}
      <section className="max-w-6xl mx-auto px-4 py-6">
        <div className="flex items-end justify-between mb-6">
          <div>
            <h2 className="text-2xl font-bold text-gray-900">Experiencias destacadas</h2>
            <p className="text-gray-400 text-sm mt-1">Las más reservadas de esta semana</p>
          </div>
          <Link href="/experiences" className="text-sm font-semibold hover:underline" style={{ color: "#3DAA7A" }}>Ver todas →</Link>
        </div>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5">
          {EXPERIENCES.map((exp) => (<ExperienceCard key={exp.id} {...exp} />))}
        </div>
      </section>

      {/* DESTINOS */}
      <section className="max-w-6xl mx-auto px-4 py-12">
        <div className="flex items-end justify-between mb-6">
          <div>
            <h2 className="text-2xl font-bold text-gray-900">Explora por destino</h2>
            <p className="text-gray-400 text-sm mt-1">Encuentra lo mejor de cada país</p>
          </div>
          <Link href="/destinations" className="text-sm font-semibold hover:underline" style={{ color: "#3DAA7A" }}>Ver todos →</Link>
        </div>
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
          {DESTINATIONS.map((dest) => dest.active ? (
            <Link key={dest.name} href={`/experiences?country=${dest.name}`}
              className="bg-white rounded-2xl p-5 border border-gray-100 hover:border-green-300 hover:shadow-md transition-all text-center group">
              <div className="text-4xl mb-2">{dest.emoji}</div>
              <p className="font-semibold text-gray-900 text-sm group-hover:text-green-700">{dest.name}</p>
              <p className="text-xs text-gray-400 mt-0.5">{dest.count} experiencias</p>
            </Link>
          ) : (
            <div key={dest.name} className="bg-white rounded-2xl p-5 border border-gray-100 text-center relative opacity-70">
              <div className="text-4xl mb-2 grayscale">{dest.emoji}</div>
              <p className="font-semibold text-gray-500 text-sm">{dest.name}</p>
              <span className="inline-block mt-1.5 text-xs font-semibold px-2 py-0.5 rounded-full" style={{ backgroundColor: "#E8694A15", color: "#E8694A" }}>Próximamente</span>
            </div>
          ))}
        </div>
      </section>

      {/* CTA PROVEEDOR */}
      <section className="max-w-6xl mx-auto px-4 py-8 pb-16">
        <div className="rounded-3xl p-10 md:p-14 flex flex-col md:flex-row items-center justify-between gap-8" style={{ backgroundColor: "#2B5E41" }}>
          <div className="text-white text-center md:text-left">
            <h2 className="text-3xl font-bold mb-3">¿Eres guía o tienes una agencia?</h2>
            <p className="text-green-200 max-w-md">Lista tus experiencias gratis. Sin costo hasta tu primera reserva.</p>
          </div>
          <div className="flex flex-col sm:flex-row gap-3 flex-shrink-0">
            <Link href="/provider/register" className="px-8 py-3 rounded-xl font-semibold text-white border-2 border-white hover:bg-white hover:text-green-800 transition-colors text-center">
              Registrarme como proveedor
            </Link>
            <Link href="/about" className="px-8 py-3 rounded-xl font-semibold text-green-200 hover:text-white transition-colors text-center">
              Saber más →
            </Link>
          </div>
        </div>
      </section>

      {/* FOOTER */}
      <footer className="border-t border-gray-200 bg-white">
        <div className="max-w-6xl mx-auto px-4 py-10 flex flex-col md:flex-row justify-between gap-8">
          <div>
            <Logo size="sm" />
            <p className="text-sm text-gray-400 mt-3 max-w-xs">El marketplace de experiencias turísticas para Latinoamérica.</p>
          </div>
          <div className="flex gap-12 text-sm text-gray-500">
            <div className="flex flex-col gap-2">
              <p className="font-semibold text-gray-800">Plataforma</p>
              <Link href="/experiences" className="hover:text-green-700">Experiencias</Link>
              <Link href="/destinations" className="hover:text-green-700">Destinos</Link>
              <Link href="/provider/register" className="hover:text-green-700">Sé proveedor</Link>
            </div>
            <div className="flex flex-col gap-2">
              <p className="font-semibold text-gray-800">Empresa</p>
              <Link href="/about" className="hover:text-green-700">Nosotros</Link>
              <Link href="/contact" className="hover:text-green-700">Contacto</Link>
              <Link href="/terms" className="hover:text-green-700">Términos</Link>
            </div>
          </div>
        </div>
        <div className="border-t border-gray-100 py-4 text-center text-xs text-gray-400">
          © 2026 Routa — itsrouta.com
        </div>
      </footer>
    </div>
  );
}
