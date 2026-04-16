import Link from "next/link";
import Navbar from "@/components/ui/Navbar";

export default function TermsPage() {
  return (
    <div style={{ backgroundColor: "#FAFAF7", minHeight: "100vh" }}>
      <Navbar />
      <div className="max-w-3xl mx-auto px-4 py-14">
        <div className="mb-10">
          <h1 className="text-3xl font-bold mb-2" style={{ color: "#2B5E41" }}>Términos de uso</h1>
          <p className="text-sm text-gray-400">Última actualización: Abril 2026</p>
        </div>

        <div className="bg-white rounded-2xl border border-gray-100 p-8 shadow-sm prose prose-gray max-w-none space-y-8">

          <section>
            <h2 className="text-lg font-bold text-gray-900 mb-3">1. Aceptación de los términos</h2>
            <p className="text-gray-500 text-sm leading-relaxed">
              Al acceder y usar Routa (itsrouta.com), aceptas estos Términos de Uso. Si no estás de acuerdo con alguno de estos términos, por favor no uses nuestra plataforma. Estos términos aplican a todos los usuarios, incluidos viajeros y proveedores de experiencias.
            </p>
          </section>

          <section>
            <h2 className="text-lg font-bold text-gray-900 mb-3">2. Descripción del servicio</h2>
            <p className="text-gray-500 text-sm leading-relaxed">
              Routa es un marketplace que conecta a viajeros con proveedores locales de experiencias turísticas en Latinoamérica. Actuamos como intermediarios y no somos responsables directos de la calidad o ejecución de las experiencias ofrecidas por proveedores independientes.
            </p>
          </section>

          <section>
            <h2 className="text-lg font-bold text-gray-900 mb-3">3. Cuentas de usuario</h2>
            <p className="text-gray-500 text-sm leading-relaxed">
              Para usar ciertos servicios de Routa, necesitarás crear una cuenta. Eres responsable de mantener la confidencialidad de tu contraseña y de todas las actividades que ocurran bajo tu cuenta. Notifícanos inmediatamente ante cualquier uso no autorizado.
            </p>
          </section>

          <section>
            <h2 className="text-lg font-bold text-gray-900 mb-3">4. Reservas y pagos</h2>
            <p className="text-gray-500 text-sm leading-relaxed">
              Al realizar una reserva, aceptas pagar el monto total indicado. Los pagos son procesados de forma segura por Stripe. Routa retiene una comisión del 15% sobre el valor de cada transacción. El 85% restante es transferido al proveedor de la experiencia.
            </p>
          </section>

          <section>
            <h2 className="text-lg font-bold text-gray-900 mb-3">5. Política de cancelación</h2>
            <p className="text-gray-500 text-sm leading-relaxed">
              Las cancelaciones realizadas con más de 24 horas de anticipación recibirán un reembolso completo. Las cancelaciones con menos de 24 horas de anticipación están sujetas a la política del proveedor individual, que se detalla en cada experiencia.
            </p>
          </section>

          <section>
            <h2 className="text-lg font-bold text-gray-900 mb-3">6. Responsabilidades del proveedor</h2>
            <p className="text-gray-500 text-sm leading-relaxed">
              Los proveedores son responsables de la exactitud de la información de sus experiencias, de contar con los permisos y seguros necesarios, y de cumplir con las experiencias tal como se describen. Routa se reserva el derecho de suspender cuentas de proveedores que incumplan con estas responsabilidades.
            </p>
          </section>

          <section>
            <h2 className="text-lg font-bold text-gray-900 mb-3">7. Limitación de responsabilidad</h2>
            <p className="text-gray-500 text-sm leading-relaxed">
              Routa no se hace responsable por daños, pérdidas o lesiones que puedan ocurrir durante la realización de experiencias. Recomendamos a todos los viajeros contar con seguro de viaje. En ningún caso la responsabilidad de Routa excederá el monto pagado por la reserva en cuestión.
            </p>
          </section>

          <section>
            <h2 className="text-lg font-bold text-gray-900 mb-3">8. Contacto</h2>
            <p className="text-gray-500 text-sm leading-relaxed">
              Para preguntas sobre estos términos, contáctanos en{" "}
              <Link href="/contact" className="font-medium" style={{ color: "#3DAA7A" }}>hola@itsrouta.com</Link>
            </p>
          </section>
        </div>

        <div className="flex gap-4 mt-8">
          <Link href="/privacy" className="text-sm font-medium" style={{ color: "#3DAA7A" }}>Política de privacidad →</Link>
          <Link href="/contact" className="text-sm text-gray-500 hover:text-gray-700">¿Preguntas? Contáctanos</Link>
        </div>
      </div>
    </div>
  );
}
