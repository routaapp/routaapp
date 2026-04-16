import Link from "next/link";
import Navbar from "@/components/ui/Navbar";

const TEAM = [
  {
    name: "Luis Mejía",
    role: "Co-fundador & CEO",
    bio: "Emprendedor con experiencia en tecnología y turismo. Apasionado por conectar viajeros con experiencias auténticas en LATAM.",
    emoji: "👨‍💻",
  },
  // Agregar más miembros del equipo aquí
];

const VALUES = [
  {
    icon: "🤝",
    title: "Autenticidad",
    description: "Cada experiencia es curada y verificada. Sin tours masivos, solo guías locales reales que conocen su tierra.",
  },
  {
    icon: "🌎",
    title: "LATAM primero",
    description: "Construimos para Latinoamérica: en español, con precios locales, y entendiendo la cultura de cada país.",
  },
  {
    icon: "💚",
    title: "Impacto local",
    description: "El 85% de cada reserva va directo al proveedor. Creemos que el turismo debe beneficiar a las comunidades locales.",
  },
  {
    icon: "🔒",
    title: "Confianza y seguridad",
    description: "Todos los guías pasan por un proceso de verificación. Los pagos son seguros y la cancelación es flexible.",
  },
];

export default function AboutPage() {
  return (
    <div style={{ backgroundColor: "#FAFAF7", minHeight: "100vh" }}>
      <Navbar />

      {/* Hero */}
      <section className="max-w-4xl mx-auto px-4 py-16 text-center">
        <span className="inline-block text-sm font-semibold px-4 py-1.5 rounded-full mb-5" style={{ backgroundColor: "#3DAA7A20", color: "#2B5E41" }}>
          Nuestra historia
        </span>
        <h1 className="text-4xl md:text-5xl font-bold mb-6" style={{ color: "#2B5E41" }}>
          Nacimos para conectar<br />viajeros con LATAM real
        </h1>
        <p className="text-gray-500 text-lg max-w-2xl mx-auto leading-relaxed">
          Routa nació de una frustración simple: era demasiado difícil encontrar experiencias turísticas auténticas en Latinoamérica. Las plataformas existentes están llenas de tours masivos en inglés, sin reflejar la riqueza cultural de nuestra región.
        </p>
      </section>

      {/* Historia / Misión */}
      <section className="max-w-4xl mx-auto px-4 py-8 pb-16">
        <div className="bg-white rounded-3xl border border-gray-100 p-8 md:p-12 shadow-sm">
          <div className="grid md:grid-cols-2 gap-12 items-center">
            <div>
              <h2 className="text-2xl font-bold text-gray-900 mb-4">Nuestra misión</h2>
              <p className="text-gray-500 leading-relaxed mb-4">
                Hacer que descubrir Latinoamérica sea tan fácil como reservar un vuelo. Conectamos a viajeros curiosos con guías locales verificados que conocen cada rincón de su país.
              </p>
              <p className="text-gray-500 leading-relaxed">
                No somos una agencia de viajes. Somos una plataforma que empodera a los guías locales para que lleguen a miles de viajeros, y a los viajeros para que encuentren experiencias que no están en ningún folleto.
              </p>
            </div>
            <div className="rounded-2xl p-8 text-center" style={{ backgroundColor: "#2B5E41" }}>
              <p className="text-5xl font-bold text-white mb-2">2026</p>
              <p className="text-green-200 text-sm mb-6">Año de fundación</p>
              <div className="grid grid-cols-2 gap-4 text-white">
                <div>
                  <p className="text-2xl font-bold">500+</p>
                  <p className="text-green-200 text-xs">Experiencias</p>
                </div>
                <div>
                  <p className="text-2xl font-bold">4</p>
                  <p className="text-green-200 text-xs">Países</p>
                </div>
                <div>
                  <p className="text-2xl font-bold">200+</p>
                  <p className="text-green-200 text-xs">Guías verificados</p>
                </div>
                <div>
                  <p className="text-2xl font-bold">⭐ 4.8</p>
                  <p className="text-green-200 text-xs">Rating promedio</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Valores */}
      <section className="max-w-6xl mx-auto px-4 pb-16">
        <h2 className="text-2xl font-bold text-gray-900 mb-8 text-center">Lo que nos guía</h2>
        <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-5">
          {VALUES.map((v) => (
            <div key={v.title} className="bg-white rounded-2xl border border-gray-100 p-6 shadow-sm">
              <div className="text-3xl mb-3">{v.icon}</div>
              <h3 className="font-bold text-gray-900 mb-2">{v.title}</h3>
              <p className="text-sm text-gray-500 leading-relaxed">{v.description}</p>
            </div>
          ))}
        </div>
      </section>

      {/* Equipo */}
      <section className="max-w-4xl mx-auto px-4 pb-16">
        <h2 className="text-2xl font-bold text-gray-900 mb-8 text-center">El equipo detrás de Routa</h2>
        <div className="flex flex-wrap justify-center gap-6">
          {TEAM.map((member) => (
            <div key={member.name} className="bg-white rounded-2xl border border-gray-100 p-6 shadow-sm text-center w-64">
              <div className="w-16 h-16 rounded-full flex items-center justify-center text-3xl mx-auto mb-4" style={{ backgroundColor: "#3DAA7A20" }}>
                {member.emoji}
              </div>
              <h3 className="font-bold text-gray-900">{member.name}</h3>
              <p className="text-xs font-semibold mb-3" style={{ color: "#3DAA7A" }}>{member.role}</p>
              <p className="text-sm text-gray-500 leading-relaxed">{member.bio}</p>
            </div>
          ))}
        </div>
      </section>

      {/* CTA */}
      <section className="max-w-6xl mx-auto px-4 pb-16">
        <div className="rounded-3xl p-10 md:p-14 flex flex-col md:flex-row items-center justify-between gap-8" style={{ backgroundColor: "#2B5E41" }}>
          <div className="text-white text-center md:text-left">
            <h2 className="text-3xl font-bold mb-3">¿Quieres ser parte?</h2>
            <p className="text-green-200 max-w-md">
              Ya sea como viajero o como proveedor de experiencias, hay un lugar para ti en Routa.
            </p>
          </div>
          <div className="flex flex-col sm:flex-row gap-3 flex-shrink-0">
            <Link
              href="/signup"
              className="px-8 py-3 rounded-xl font-semibold text-white border-2 border-white hover:bg-white hover:text-green-800 transition-colors text-center"
            >
              Crear cuenta gratis
            </Link>
            <Link
              href="/contact"
              className="px-8 py-3 rounded-xl font-semibold text-green-200 hover:text-white transition-colors text-center"
            >
              Contactarnos →
            </Link>
          </div>
        </div>
      </section>
    </div>
  );
}
