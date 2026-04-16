"use client";

import Link from "next/link";
import Logo from "./Logo";
import { useState, useEffect, useRef } from "react";
import { usePathname, useRouter } from "next/navigation";
import { getMockUser, clearMockUser, getInitials, type MockUser } from "@/lib/mock-auth";

export default function Navbar() {
  const [menuOpen, setMenuOpen] = useState(false);
  const [userMenuOpen, setUserMenuOpen] = useState(false);
  const [user, setUser] = useState<MockUser | null>(null);
  const pathname = usePathname();
  const router = useRouter();
  const userMenuRef = useRef<HTMLDivElement>(null);

  useEffect(() => { setUser(getMockUser()); }, [pathname]);

  useEffect(() => {
    function handleClickOutside(e: MouseEvent) {
      if (userMenuRef.current && !userMenuRef.current.contains(e.target as Node)) {
        setUserMenuOpen(false);
      }
    }
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  function handleLogout() {
    clearMockUser();
    setUser(null);
    setUserMenuOpen(false);
    router.push("/");
    router.refresh();
  }

  return (
    <nav className="sticky top-0 z-50 bg-white border-b border-gray-100 shadow-sm">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 flex items-center justify-between h-16">
        <Link href="/" className="flex-shrink-0"><Logo size="sm" /></Link>
        <div className="hidden md:flex items-center gap-6 text-sm font-medium text-gray-600">
          <Link href="/experiences" className="hover:text-green-700 transition-colors">Experiencias</Link>
          <Link href="/destinations" className="hover:text-green-700 transition-colors">Destinos</Link>
          <Link href="/about" className="hover:text-green-700 transition-colors">Nosotros</Link>
        </div>
        <div className="hidden md:flex items-center gap-3">
          {user ? (
            <div className="relative" ref={userMenuRef}>
              <button onClick={() => setUserMenuOpen(!userMenuOpen)} className="flex items-center gap-2.5 px-3 py-1.5 rounded-xl hover:bg-gray-50 transition-colors">
                <div className="w-8 h-8 rounded-full flex items-center justify-center text-xs font-bold text-white flex-shrink-0"
                  style={{ backgroundColor: user.type === "provider" ? "#2B5E41" : "#E8694A" }}>
                  {getInitials(user.name)}
                </div>
                <div className="text-left">
                  <p className="text-sm font-semibold text-gray-900 leading-tight">{user.name.split(" ")[0]}</p>
                  <p className="text-xs text-gray-400 leading-tight">{user.type === "provider" ? "Proveedor" : "Viajero"}</p>
                </div>
                <svg className={`w-4 h-4 text-gray-400 transition-transform ${userMenuOpen ? "rotate-180" : ""}`} fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24">
                  <path d="M6 9l6 6 6-6" strokeLinecap="round" strokeLinejoin="round" />
                </svg>
              </button>
              {userMenuOpen && (
                <div className="absolute right-0 mt-2 w-52 bg-white rounded-2xl shadow-lg border border-gray-100 py-2 z-50">
                  <div className="px-4 py-2 border-b border-gray-50 mb-1">
                    <p className="text-sm font-semibold text-gray-900">{user.name}</p>
                    <p className="text-xs text-gray-400">{user.email}</p>
                  </div>
                  {user.type === "traveler" ? (
                    <>
                      <Link href="/profile" onClick={() => setUserMenuOpen(false)} className="flex items-center gap-3 px-4 py-2.5 text-sm text-gray-700 hover:bg-gray-50"><span>👤</span> Mi perfil</Link>
                      <Link href="/profile/bookings" onClick={() => setUserMenuOpen(false)} className="flex items-center gap-3 px-4 py-2.5 text-sm text-gray-700 hover:bg-gray-50"><span>📅</span> Mis reservas</Link>
                      <Link href="/experiences" onClick={() => setUserMenuOpen(false)} className="flex items-center gap-3 px-4 py-2.5 text-sm text-gray-700 hover:bg-gray-50"><span>🗺️</span> Explorar</Link>
                    </>
                  ) : (
                    <>
                      <Link href="/dashboard" onClick={() => setUserMenuOpen(false)} className="flex items-center gap-3 px-4 py-2.5 text-sm text-gray-700 hover:bg-gray-50"><span>📊</span> Dashboard</Link>
                      <Link href="/dashboard/experiences" onClick={() => setUserMenuOpen(false)} className="flex items-center gap-3 px-4 py-2.5 text-sm text-gray-700 hover:bg-gray-50"><span>🗺️</span> Mis experiencias</Link>
                      <Link href="/dashboard/bookings" onClick={() => setUserMenuOpen(false)} className="flex items-center gap-3 px-4 py-2.5 text-sm text-gray-700 hover:bg-gray-50"><span>📅</span> Reservas</Link>
                      <Link href="/dashboard/profile" onClick={() => setUserMenuOpen(false)} className="flex items-center gap-3 px-4 py-2.5 text-sm text-gray-700 hover:bg-gray-50"><span>⚙️</span> Configuración</Link>
                    </>
                  )}
                  <div className="border-t border-gray-50 mt-1 pt-1">
                    <button onClick={handleLogout} className="w-full flex items-center gap-3 px-4 py-2.5 text-sm text-red-500 hover:bg-red-50">
                      <span>🚪</span> Cerrar sesión
                    </button>
                  </div>
                </div>
              )}
            </div>
          ) : (
            <>
              <Link href="/login" className="text-sm font-medium px-4 py-2 rounded-lg border border-gray-200 hover:border-green-400 transition-colors">Iniciar sesión</Link>
              <Link href="/signup" className="text-sm font-semibold px-4 py-2 rounded-lg text-white transition-opacity hover:opacity-90" style={{ backgroundColor: "#E8694A" }}>Registrarse</Link>
            </>
          )}
        </div>
        <button className="md:hidden p-2 rounded-lg text-gray-600" onClick={() => setMenuOpen(!menuOpen)}>
          <svg width="22" height="22" fill="none" stroke="currentColor" strokeWidth="2">
            {menuOpen ? <path d="M6 6l12 12M18 6l-12 12" strokeLinecap="round" /> : (
              <><line x1="3" y1="6" x2="21" y2="6" strokeLinecap="round" /><line x1="3" y1="12" x2="21" y2="12" strokeLinecap="round" /><line x1="3" y1="18" x2="21" y2="18" strokeLinecap="round" /></>
            )}
          </svg>
        </button>
      </div>
      {menuOpen && (
        <div className="md:hidden border-t border-gray-100 px-4 py-4 flex flex-col gap-2 bg-white">
          <Link href="/experiences" onClick={() => setMenuOpen(false)} className="text-sm font-medium text-gray-700 py-2">Experiencias</Link>
          <Link href="/destinations" onClick={() => setMenuOpen(false)} className="text-sm font-medium text-gray-700 py-2">Destinos</Link>
          <Link href="/about" onClick={() => setMenuOpen(false)} className="text-sm font-medium text-gray-700 py-2">Nosotros</Link>
          {user ? (
            <>
              <div className="border-t border-gray-100 pt-3 mt-1 flex items-center gap-3">
                <div className="w-9 h-9 rounded-full flex items-center justify-center text-xs font-bold text-white" style={{ backgroundColor: user.type === "provider" ? "#2B5E41" : "#E8694A" }}>{getInitials(user.name)}</div>
                <div><p className="text-sm font-semibold text-gray-900">{user.name}</p><p className="text-xs text-gray-400">{user.type === "provider" ? "Proveedor" : "Viajero"}</p></div>
              </div>
              {user.type === "traveler" ? (
                <>
                  <Link href="/profile" onClick={() => setMenuOpen(false)} className="text-sm text-gray-600 py-1.5 flex items-center gap-2"><span>👤</span> Mi perfil</Link>
                  <Link href="/profile/bookings" onClick={() => setMenuOpen(false)} className="text-sm text-gray-600 py-1.5 flex items-center gap-2"><span>📅</span> Mis reservas</Link>
                </>
              ) : (
                <>
                  <Link href="/dashboard" onClick={() => setMenuOpen(false)} className="text-sm text-gray-600 py-1.5 flex items-center gap-2"><span>📊</span> Dashboard</Link>
                  <Link href="/dashboard/experiences" onClick={() => setMenuOpen(false)} className="text-sm text-gray-600 py-1.5 flex items-center gap-2"><span>🗺️</span> Mis experiencias</Link>
                </>
              )}
              <button onClick={() => { handleLogout(); setMenuOpen(false); }} className="text-sm text-red-500 py-1.5 flex items-center gap-2 mt-1"><span>🚪</span> Cerrar sesión</button>
            </>
          ) : (
            <div className="flex gap-2 pt-2">
              <Link href="/login" onClick={() => setMenuOpen(false)} className="flex-1 text-center text-sm font-medium py-2 rounded-lg border border-gray-200">Iniciar sesión</Link>
              <Link href="/signup" onClick={() => setMenuOpen(false)} className="flex-1 text-center text-sm font-semibold py-2 rounded-lg text-white" style={{ backgroundColor: "#E8694A" }}>Registrarse</Link>
            </div>
          )}
        </div>
      )}
    </nav>
  );
}
