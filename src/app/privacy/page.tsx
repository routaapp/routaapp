import Link from "next/link";
import Navbar from "@/components/ui/Navbar";

export default function PrivacyPage() {
  return (
    <div style={{ backgroundColor: "#FAFAF7", minHeight: "100vh" }}>
      <Navbar />
      <div className="max-w-3xl mx-auto px-4 py-14">
        <div className="mb-10">
          <h1 className="text-3xl font-bold mb-2" style={{ color: "#2B5E41" }}>Política de privacidad</h1>
          <p className="text-sm text-gray-400">Última actualización: Abril 2026</p>
        </div>

        <div className="bg-white rounded-2xl border border-gray-100 p-8 shadow-sm space-y-8">

          <section>
            <h2 className="text-lg font-bold text-gray-900 mb-3">1. Información que recopilamos</h2>
            <p className="text-gray-500 text-sm leading-relaxed">
              Recopilamos información que nos proporcionas directamente (nombre, email, número de teléfono) y datos generados por tu uso de la plataforma (experiencias vistas, reservas realizadas, reseñas escritas). También recopilamos datos técnicos como dirección IP y tipo de dispositivo para mejorar nuestro servicio.
            </p>
          </section>

          <section>
            <h2 className="text-lg font-bold text-gray-900 mb-3">2. Cómo usamos tu información</h2>
            <p className="text-gray-500 text-sm leading-relaxed">
              Usamos tu información para procesar reservas, enviar confirmaciones y actualizaciones, personalizar tu experiencia en la plataforma, mejorar nuestros servicios, y comunicarnos contigo sobre ofertas relevantes (solo si lo has aceptado).
            </p>
          </section>

          <section>
            <h2 className="text-lg font-bold text-gray-900 mb-3">3. Compartir información</h2>
            <p className="text-gray-500 text-sm leading-relaxed">
              Compartimos tu información de contacto con el proveedor de la experiencia que reservas, para que puedan coordinar contigo. No vendemos tu información personal a terceros. Compartimos datos con Stripe para procesar pagos de forma segura.
            </p>
          </section>

          <section>
            <h2 className="text-lg font-bold text-gray-900 mb-3">4. Seguridad de los datos</h2>
            <p className="text-gray-500 text-sm leading-relaxed">
              Implementamos medidas de seguridad técnicas y organizativas para proteger tu información. Los datos de pago son manejados exclusivamente por Stripe y nunca son almacenados en nuestros servidores. Usamos encriptación SSL en todas las comunicaciones.
            </p>
          </section>

          <section>
            <h2 className="text-lg font-bold text-gray-900 mb-3">5. Tus derechos</h2>
            <p className="text-gray-500 text-sm leading-relaxed">
              Tienes derecho a acceder, corregir o eliminar tu información personal. Puedes solicitar una copia de tus datos o solicitar que los eliminemos contactándonos en hola@itsrouta.com. Procesamos estas solicitudes en un plazo máximo de 30 días.
            </p>
          </section>

          <section>
            <h2 className="text-lg font-bold text-gray-900 mb-3">6. Cookies</h2>
            <p className="text-gray-500 text-sm leading-relaxed">
              Usamos cookies esenciales para el funcionamiento de la plataforma y cookies analíticas para entender cómo se usa nuestro servicio. Puedes desactivar las cookies no esenciales desde la configuración de tu navegador.
            </p>
          </section>

          <section>
            <h2 className="text-lg font-bold text-gray-900 mb-3">7. Cambios a esta política</h2>
            <p className="text-gray-500 text-sm leading-relaxed">
              Podemos actualizar esta política ocasionalmente. Te notificaremos por email ante cambios significativos. El uso continuado de Routa después de los cambios implica la aceptación de la nueva política.
            </p>
          </section>

          <section>
            <h2 className="text-lg font-bold text-gray-900 mb-3">8. Contacto</h2>
            <p className="text-gray-500 text-sm leading-relaxed">
              Para preguntas sobre privacidad, escríbenos a{" "}
              <Link href="/contact" className="font-medium" style={{ color: "#3DAA7A" }}>hola@itsrouta.com</Link>
            </p>
          </section>
        </div>

        <div className="flex gap-4 mt-8">
          <Link href="/terms" className="text-sm font-medium" style={{ color: "#3DAA7A" }}>Términos de uso →</Link>
          <Link href="/contact" className="text-sm text-gray-500 hover:text-gray-700">¿Preguntas? Contáctanos</Link>
        </div>
      </div>
    </div>
  );
}
