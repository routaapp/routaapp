"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import Logo from "@/components/ui/Logo";
import LogoutButton from "@/components/ui/LogoutButton";

const NAV_ITEMS = [
  { href: "/dashboard", label: "Dashboard", icon: "📊" },
  { href: "/dashboard/experiences", label: "Mis experiencias", icon: "🗺️" },
  { href: "/dashboard/bookings", label: "Reservas", icon: "📅" },
  { href: "/dashboard/reviews", label: "Reseñas", icon: "⭐" },
  { href: "/dashboard/earnings", label: "Ganancias", icon: "💰" },
  { href: "/dashboard/profile", label: "Mi perfil", icon: "👤" },
];

export default function MobileDashboardNav() {
  const [isOpen, setIsOpen] = useState(false);
  const pathname = usePathname();

  // Cerrar el menú al navegar a otra página
  useEffect(() => {
    setIsOpen(false);
  }, [pathname]);

  // Evitar scroll del body cuando el menú está abierto
  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "";
    }
    return () => {
      document.body.style.overflow = "";
    };
  }, [isOpen]);

  return (
    <>
      {/* ── TOP BAR MÓVIL (solo visible en mobile) ── */}
      <header
        className="md:hidden flex items-center justify-between px-4 py-3 bg-white border-b border-gray-100 sticky top-0 z-40"
        style={{ boxShadow: "0 1px 4px rgba(0,0,0,0.06)" }}
      >
        <Link href="/">
          <Logo size="sm" />
        </Link>

        {/* Botón hamburguesa */}
        <button
          onClick={() => setIsOpen(true)}
          aria-label="Abrir menú"
          className="p-2 rounded-xl text-gray-500 hover:bg-gray-100 transition-colors"
        >
          <svg
            width="22"
            height="22"
            viewBox="0 0 22 22"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path
              d="M3 5.5H19M3 11H19M3 16.5H19"
              stroke="currentColor"
              strokeWidth="1.8"
              strokeLinecap="round"
            />
          </svg>
        </button>
      </header>

      {/* ── OVERLAY ── */}
      {isOpen && (
        <div
          className="md:hidden fixed inset-0 bg-black/40 z-50"
          onClick={() => setIsOpen(false)}
        />
      )}

      {/* ── DRAWER SLIDE-IN ── */}
      <div
        className="md:hidden fixed top-0 left-0 h-full w-72 bg-white z-50 flex flex-col py-6 px-4 transition-transform duration-300 ease-in-out"
        style={{
          transform: isOpen ? "translateX(0)" : "translateX(-100%)",
          boxShadow: isOpen ? "4px 0 24px rgba(0,0,0,0.12)" : "none",
        }}
      >
        {/* Header del drawer */}
        <div className="flex items-center justify-between mb-8">
          <Link href="/" onClick={() => setIsOpen(false)}>
            <Logo size="sm" />
          </Link>
          <button
            onClick={() => setIsOpen(false)}
            aria-label="Cerrar menú"
            className="p-2 rounded-xl text-gray-400 hover:bg-gray-100 transition-colors"
          >
            <svg
              width="20"
              height="20"
              viewBox="0 0 20 20"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                d="M4 4L16 16M16 4L4 16"
                stroke="currentColor"
                strokeWidth="1.8"
                strokeLinecap="round"
              />
            </svg>
          </button>
        </div>

        {/* Nav items */}
        <nav className="flex flex-col gap-1 flex-1">
          {NAV_ITEMS.map((item) => {
            const isActive =
              item.href === "/dashboard"
                ? pathname === "/dashboard"
                : pathname.startsWith(item.href);
            return (
              <Link
                key={item.href}
                href={item.href}
                className="flex items-center gap-3 px-3 py-3 rounded-xl text-sm font-medium transition-colors"
                style={{
                  backgroundColor: isActive ? "#3DAA7A18" : "transparent",
                  color: isActive ? "#3DAA7A" : "#6B7280",
                }}
              >
                <span className="text-base">{item.icon}</span>
                {item.label}
              </Link>
            );
          })}
        </nav>

        {/* Footer del drawer */}
        <div className="border-t border-gray-100 pt-4 mt-4">
          <Link
            href="/"
            onClick={() => setIsOpen(false)}
            className="flex items-center gap-3 px-3 py-2.5 rounded-xl text-sm text-gray-500 hover:bg-gray-50"
          >
            <span>🔙</span> Ver marketplace
          </Link>
          <LogoutButton />
        </div>
      </div>
    </>
  );
}
