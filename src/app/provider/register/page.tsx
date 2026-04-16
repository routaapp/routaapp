import Link from "next/link";
import Navbar from "@/components/ui/Navbar";

const BENEFITS = [
  { icon: "🆓", title: "Lista gratis", description: "Sin costo de alta. Publica tus experiencias sin pagar nada." },
  { icon: "💸", title: "Sin costo hasta tu primera reserva", description: "Empiezas a pagar solo cuando empiezas a ganar." },
  { icon: "💚", title: "Comisión justa del 15%", description: "El 85% de cada reserva va directo a tu cuenta." },
  { icon: "📊", title: "Dashboard completo", description: "Gestiona reservas, ingresos y reseñas desde un solo lugar." },
  { icon: "🌎", title: "Alcance LATAM", description: "Llega a viajeros de toda la región y del mundo hispanohablante." },
  { icon: "🔒", title: "Pagos seguros", description: "Stripe procesa todos los pagos. Recibes tu dinero en 2-3 días." },
];

const STEPS = [
  { step: "1", title: "Crea tu cuenta", description: "Regístrate como proveedor en menos de 2 minutos." },
  { step: "2", title: "Publica tu primera experiencia", description: "Describe qué ofreces, sube fotos y define tu precio." },
  { step: "3", title: "Recibe reservas", description: "Los viajeros encuentran tu experiencia y reservan directamente." },
  { step: "4", title: "Cobra y crece", description: "Recibe pagos automáticos y acumula reseñas positivas." },
];

export default function ProviderRegisterPage() {
  return (
    <div style={{ backgroundColor: "#FAFAF7", minHeight: "100vh" }}>
      <Navbar />

      {/* Hero */}
      <section className="max-w-4xl mx-auto px-4 py-14 text-center">
        <span className="inline-block text-sm font-semibold px-4 py-1.5 rounded-full mb-5" style={{ backgroundColor: "#3DAA7A20", color: "#2B5E41" }}>
          Para guías y agencias
        </span>
        <h1 className="text-4xl md:text-5xl font-bold mb-5" style={{ color: "#2B5E41" }}>
          Llega a miles de viajeros<br />en toda LATAM
        </h1>
        <p className="text-gray-500 text-lg max-w-xl mx-auto mb-8">
          Publica tus experiencias gratis en Routa y conecta con viajeros que buscan lo auténtico. Sin comisiones hasta tu primera reserva.
        </p>
        <div className="flex flex-col sm:flex-row justify-center gap-3">
          <Link
            href="/signup?type=provider"
            className="px-8 py-4 rounded-xl font-semibold text-white text-base"
            style={{ backgroundColor: "#E8694A" }}
          >
            Registrarme como proveedor
          </Link>
          <Link
            href="/contact"
            className="px-8 py-4 rounded-xl font-semibold text-gray-700 border border-gray-200 hover:border-green-300 transition-colors text-base bg-white"
          >
            Hablar con el equipo
          </Link>
        </div>
      </section>

      {/* Beneficios */}
      <section className="max-w-6xl mx-auto px-4 pb-14">
        <h2 className="text-2xl font-bold text-center text-gray-900 mb-8">¿Por qué Routa?</h2>
        <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-5">
          {BENEFITS.map((b) => (
            <div key={b.title} className="bg-white rounded-2xl border border-gray-100 p-6 shadow-sm">
              <div className="text-3xl mb-3">{b.icon}</div>
              <h3 className="font-bold text-gray-900 mb-1">{b.title}</h3>
              <p className="text-sm text-gray-500 leading-relaxed">{b.description}</p>
            </div>
          ))}
        </div>
      </section>

      {/* Cómo funciona */}
      <section className="max-w-4xl mx-auto px-4 pb-14">
        <h2 className="text-2xl font-bold text-center text-gray-900 mb-10">Cómo funciona</h2>
        <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {STEPS.map((s) => (
            <div key={s.step} className="text-center">
              <div className="w-12 h-12 rounded-full flex items-center justify-center text-xl font-bold text-white mx-auto mb-4" style={{ backgroundColor: "#2B5E41" }}>
                {s.step}
              </div>
              <h3 className="font-bold text-gray-900 mb-1">{s.title}</h3>
              <p className="text-sm text-gray-500 leading-relaxed">{s.description}</p>
            </div>
          ))}
        </div>
      </section>

      {/* CTA final */}
      <section className="max-w-4xl mx-auto px-4 pb-16">
        <div className="rounded-3xl p-10 text-center" style={{ backgroundColor: "#2B5E41" }}>
          <h2 className="text-3xl font-bold text-white mb-3">¿Listo para empezar?</h2>
          <p className="text-green-200 mb-6 max-w-md mx-auto">
            Crea tu perfil de proveedor hoy. Es gratis y solo toma 2 minutos.
          </p>
          <Link
            href="/signup?type=provider"
            className="inline-block px-10 py-4 rounded-xl font-semibold text-green-800 bg-white hover:bg-green-50 transition-colors"
          >
            Crear cuenta de proveedor →
          </Link>
        </div>
      </section>
    </div>
  );
}
