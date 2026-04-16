"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import Navbar from "@/components/ui/Navbar";
import { getMockUser, setMockUser, getInitials, type MockUser } from "@/lib/mock-auth";

export default function ProfilePage() {
  const router = useRouter();
  const [user, setUser] = useState<MockUser | null>(null);
  const [saved, setSaved] = useState(false);
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [phone, setPhone] = useState("+1 809 000 0000");
  const [country, setCountry] = useState("República Dominicana");
  const [bio, setBio] = useState("");

  // Secciones expandibles
  const [showPassword, setShowPassword] = useState(false);
  const [showNotifications, setShowNotifications] = useState(false);
  const [showDeactivate, setShowDeactivate] = useState(false);
  const [deactivateConfirm, setDeactivateConfirm] = useState("");

  // Estado contraseña
  const [pwCurrent, setPwCurrent] = useState("");
  const [pwNew, setPwNew] = useState("");
  const [pwConfirm, setPwConfirm] = useState("");
  const [pwSaved, setPwSaved] = useState(false);
  const [pwError, setPwError] = useState("");

  // Notificaciones
  const [notifEmail, setNotifEmail] = useState(true);
  const [notifWhatsapp, setNotifWhatsapp] = useState(true);
  const [notifPromos, setNotifPromos] = useState(false);
  const [notifSaved, setNotifSaved] = useState(false);

  useEffect(() => {
    const u = getMockUser();
    if (!u) { router.push("/login"); return; }
    if (u.type === "provider") { router.push("/dashboard/profile"); return; }
    setUser(u);
    setName(u.name);
    setEmail(u.email);
  }, [router]);

  async function handleSaveProfile(e: React.FormEvent) {
    e.preventDefault();
    if (!user) return;
    const updated = { ...user, name, email };
    setMockUser(updated);
    setUser(updated);
    setSaved(true);
    setTimeout(() => setSaved(false), 3000);
  }

  async function handleChangePassword(e: React.FormEvent) {
    e.preventDefault();
    setPwError("");
    if (pwNew !== pwConfirm) { setPwError("Las contraseñas no coinciden."); return; }
    if (pwNew.length < 8) { setPwError("La nueva contraseña debe tener al menos 8 caracteres."); return; }
    await new Promise(r => setTimeout(r, 800));
    setPwSaved(true);
    setPwCurrent(""); setPwNew(""); setPwConfirm("");
    setTimeout(() => { setPwSaved(false); setShowPassword(false); }, 2500);
  }

  async function handleSaveNotifications() {
    await new Promise(r => setTimeout(r, 600));
    setNotifSaved(true);
    setTimeout(() => { setNotifSaved(false); setShowNotifications(false); }, 2000);
  }

  if (!user) return null;

  const INPUT = "w-full border border-gray-200 rounded-xl px-4 py-2.5 text-sm text-gray-900 placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-green-400 bg-white";

  return (
    <div style={{ backgroundColor: "#FAFAF7", minHeight: "100vh" }}>
      <Navbar />

      <div className="max-w-3xl mx-auto px-4 py-10">
        <div className="mb-8">
          <h1 className="text-2xl font-bold text-gray-900">Mi perfil</h1>
          <p className="text-gray-400 text-sm mt-0.5">Tu información personal en Routa</p>
        </div>

        <div className="grid md:grid-cols-3 gap-6">

          {/* ── Tarjeta lateral ── */}
          <div className="bg-white rounded-2xl border border-gray-100 p-6 shadow-sm h-fit text-center">
            <div
              className="w-20 h-20 rounded-full flex items-center justify-center text-2xl font-bold text-white mx-auto mb-4"
              style={{ backgroundColor: "#E8694A" }}
            >
              {getInitials(user.name)}
            </div>
            <h2 className="font-bold text-gray-900">{user.name}</h2>
            <p className="text-sm text-gray-400 mt-0.5">Viajero</p>
            <div className="mt-4 pt-4 border-t border-gray-100 space-y-2 text-sm">
              <div className="flex justify-between text-gray-600">
                <span className="text-gray-400">Reservas</span><span className="font-medium">2</span>
              </div>
              <div className="flex justify-between text-gray-600">
                <span className="text-gray-400">Países</span><span className="font-medium">1</span>
              </div>
              <div className="flex justify-between text-gray-600">
                <span className="text-gray-400">Reseñas</span><span className="font-medium">1</span>
              </div>
            </div>
            <Link
              href="/profile/bookings"
              className="mt-5 w-full py-2.5 rounded-xl text-sm font-semibold flex items-center justify-center gap-2 border-2"
              style={{ borderColor: "#3DAA7A", color: "#3DAA7A" }}
            >
              📅 Ver mis reservas
            </Link>
          </div>

          {/* ── Columna principal ── */}
          <div className="md:col-span-2 space-y-4">

            {/* Formulario de información */}
            <form onSubmit={handleSaveProfile} className="bg-white rounded-2xl border border-gray-100 p-6 shadow-sm space-y-4">
              <h2 className="font-semibold text-gray-900">Información personal</h2>
              <div className="grid grid-cols-2 gap-4">
                <div className="col-span-2 sm:col-span-1">
                  <label className="block text-xs font-semibold text-gray-600 mb-1">Nombre completo</label>
                  <input type="text" value={name} onChange={e => setName(e.target.value)} required placeholder="Tu nombre" className={INPUT} />
                </div>
                <div className="col-span-2 sm:col-span-1">
                  <label className="block text-xs font-semibold text-gray-600 mb-1">Email</label>
                  <input type="email" value={email} onChange={e => setEmail(e.target.value)} required placeholder="tu@email.com" className={INPUT} />
                </div>
                <div>
                  <label className="block text-xs font-semibold text-gray-600 mb-1">WhatsApp</label>
                  <input type="text" value={phone} onChange={e => setPhone(e.target.value)} placeholder="+1 809 000 0000" className={INPUT} />
                </div>
                <div>
                  <label className="block text-xs font-semibold text-gray-600 mb-1">País de origen</label>
                  <select value={country} onChange={e => setCountry(e.target.value)} className="w-full border border-gray-200 rounded-xl px-4 py-2.5 text-sm text-gray-900 focus:outline-none focus:ring-2 focus:ring-green-400 bg-white">
                    <option>República Dominicana</option>
                    <option>Colombia</option>
                    <option>México</option>
                    <option>Argentina</option>
                    <option>Venezuela</option>
                    <option>España</option>
                    <option>Estados Unidos</option>
                    <option>Otro</option>
                  </select>
                </div>
                <div className="col-span-2">
                  <label className="block text-xs font-semibold text-gray-600 mb-1">¿Qué tipo de experiencias te gustan? <span className="text-gray-400 font-normal">(opcional)</span></label>
                  <textarea value={bio} onChange={e => setBio(e.target.value)} rows={2} placeholder="Ej: Me encanta la naturaleza, el senderismo y probar comida local..." className="w-full border border-gray-200 rounded-xl px-4 py-2.5 text-sm text-gray-900 placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-green-400 bg-white resize-none" />
                </div>
              </div>
              <div className="flex items-center justify-between pt-1">
                {saved && <span className="text-sm font-medium" style={{ color: "#3DAA7A" }}>✓ Cambios guardados</span>}
                <button type="submit" className="ml-auto px-6 py-2.5 rounded-xl text-white text-sm font-semibold" style={{ backgroundColor: "#3DAA7A" }}>
                  Guardar cambios
                </button>
              </div>
            </form>

            {/* ── Sección de cuenta ── */}
            <div className="bg-white rounded-2xl border border-gray-100 p-6 shadow-sm space-y-2">
              <h2 className="font-semibold text-gray-900 mb-3">Cuenta</h2>

              {/* Cambiar contraseña */}
              <button
                onClick={() => { setShowPassword(!showPassword); setShowNotifications(false); setShowDeactivate(false); }}
                className="w-full flex items-center justify-between px-4 py-3 rounded-xl border border-gray-200 text-sm text-gray-700 hover:bg-gray-50"
              >
                <span className="flex items-center gap-2">🔑 Cambiar contraseña</span>
                <span className="text-gray-400">{showPassword ? "↑" : "→"}</span>
              </button>

              {showPassword && (
                <form onSubmit={handleChangePassword} className="px-4 py-4 bg-gray-50 rounded-xl space-y-3">
                  {pwError && <p className="text-xs text-red-500 bg-red-50 px-3 py-2 rounded-lg">{pwError}</p>}
                  {pwSaved && <p className="text-xs font-medium px-3 py-2 rounded-lg" style={{ color: "#3DAA7A", backgroundColor: "#3DAA7A15" }}>✓ Contraseña actualizada correctamente</p>}
                  <div>
                    <label className="block text-xs font-semibold text-gray-600 mb-1">Contraseña actual</label>
                    <input type="password" value={pwCurrent} onChange={e => setPwCurrent(e.target.value)} required placeholder="••••••••" className={INPUT} />
                  </div>
                  <div>
                    <label className="block text-xs font-semibold text-gray-600 mb-1">Nueva contraseña</label>
                    <input type="password" value={pwNew} onChange={e => setPwNew(e.target.value)} required minLength={8} placeholder="Mínimo 8 caracteres" className={INPUT} />
                  </div>
                  <div>
                    <label className="block text-xs font-semibold text-gray-600 mb-1">Confirmar nueva contraseña</label>
                    <input type="password" value={pwConfirm} onChange={e => setPwConfirm(e.target.value)} required placeholder="Repite la contraseña" className={INPUT} />
                  </div>
                  <div className="flex gap-2 pt-1">
                    <button type="button" onClick={() => setShowPassword(false)} className="flex-1 py-2 rounded-xl border border-gray-200 text-sm text-gray-500">Cancelar</button>
                    <button type="submit" className="flex-1 py-2 rounded-xl text-white text-sm font-semibold" style={{ backgroundColor: "#3DAA7A" }}>Actualizar</button>
                  </div>
                </form>
              )}

              {/* Notificaciones */}
              <button
                onClick={() => { setShowNotifications(!showNotifications); setShowPassword(false); setShowDeactivate(false); }}
                className="w-full flex items-center justify-between px-4 py-3 rounded-xl border border-gray-200 text-sm text-gray-700 hover:bg-gray-50"
              >
                <span className="flex items-center gap-2">🔔 Notificaciones</span>
                <span className="text-gray-400">{showNotifications ? "↑" : "→"}</span>
              </button>

              {showNotifications && (
                <div className="px-4 py-4 bg-gray-50 rounded-xl space-y-3">
                  {[
                    { label: "Confirmaciones de reserva por email", value: notifEmail, set: setNotifEmail },
                    { label: "Recordatorios por WhatsApp", value: notifWhatsapp, set: setNotifWhatsapp },
                    { label: "Ofertas y novedades", value: notifPromos, set: setNotifPromos },
                  ].map(({ label, value, set }) => (
                    <label key={label} className="flex items-center justify-between cursor-pointer">
                      <span className="text-sm text-gray-700">{label}</span>
                      <button
                        type="button"
                        onClick={() => set(!value)}
                        className="relative inline-flex h-5 w-9 items-center rounded-full transition-colors flex-shrink-0"
                        style={{ backgroundColor: value ? "#3DAA7A" : "#D1D5DB" }}
                      >
                        <span className="inline-block h-3.5 w-3.5 transform rounded-full bg-white shadow transition-transform" style={{ transform: value ? "translateX(18px)" : "translateX(2px)" }} />
                      </button>
                    </label>
                  ))}
                  <div className="flex gap-2 pt-1">
                    <button type="button" onClick={() => setShowNotifications(false)} className="flex-1 py-2 rounded-xl border border-gray-200 text-sm text-gray-500">Cancelar</button>
                    <button type="button" onClick={handleSaveNotifications} className="flex-1 py-2 rounded-xl text-white text-sm font-semibold" style={{ backgroundColor: "#3DAA7A" }}>
                      {notifSaved ? "✓ Guardado" : "Guardar"}
                    </button>
                  </div>
                </div>
              )}

              {/* Desactivar cuenta */}
              <button
                onClick={() => { setShowDeactivate(!showDeactivate); setShowPassword(false); setShowNotifications(false); }}
                className="w-full flex items-center justify-between px-4 py-3 rounded-xl border border-orange-100 text-sm text-orange-600 hover:bg-orange-50"
              >
                <span className="flex items-center gap-2">⏸️ Desactivar cuenta</span>
                <span className="text-orange-300">{showDeactivate ? "↑" : "→"}</span>
              </button>

              {showDeactivate && (
                <div className="px-4 py-4 bg-orange-50 rounded-xl space-y-3 border border-orange-100">
                  <p className="text-sm text-gray-700 leading-relaxed">
                    Al desactivar tu cuenta, tu perfil quedará oculto y no podrás iniciar sesión. Puedes reactivarla en cualquier momento contactándonos.
                  </p>
                  <p className="text-xs text-gray-500">Para confirmar, escribe <strong>DESACTIVAR</strong> a continuación:</p>
                  <input
                    type="text"
                    value={deactivateConfirm}
                    onChange={e => setDeactivateConfirm(e.target.value)}
                    placeholder="Escribe DESACTIVAR"
                    className={INPUT}
                  />
                  <div className="flex gap-2">
                    <button type="button" onClick={() => { setShowDeactivate(false); setDeactivateConfirm(""); }} className="flex-1 py-2 rounded-xl border border-gray-200 text-sm text-gray-500">
                      Cancelar
                    </button>
                    <button
                      type="button"
                      disabled={deactivateConfirm !== "DESACTIVAR"}
                      className="flex-1 py-2 rounded-xl text-sm font-semibold disabled:opacity-40"
                      style={{ backgroundColor: "#E8694A", color: "white" }}
                      onClick={() => alert("Cuenta desactivada (mock). En producción se procesaría con Supabase.")}
                    >
                      Desactivar cuenta
                    </button>
                  </div>
                </div>
              )}
            </div>

          </div>
        </div>
      </div>
    </div>
  );
}
