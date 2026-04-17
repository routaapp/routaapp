"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";

const NAV_ITEMS = [
  { href: "/dashboard", label: "Dashboard", icon: "📊" },
  { href: "/dashboard/experiences", label: "Mis experiencias", icon: "🗺️" },
  { href: "/dashboard/departures", label: "Salidas", icon: "🗓️" },
  { href: "/dashboard/bookings", label: "Reservas", icon: "📅" },
  { href: "/dashboard/reviews", label: "Reseñas", icon: "⭐" },
  { href: "/dashboard/earnings", label: "Ganancias", icon: "💰" },
  { href: "/dashboard/profile", label: "Mi perfil", icon: "👤" },
];

export default function DashboardNav() {
  const pathname = usePathname();

  return (
    <nav className="flex flex-col gap-1 flex-1">
      {NAV_ITEMS.map(item => {
        const isActive =
          item.href === "/dashboard"
            ? pathname === "/dashboard"
            : pathname.startsWith(item.href);
        return (
          <Link
            key={item.href}
            href={item.href}
            className="flex items-center gap-3 px-3 py-2.5 rounded-xl text-sm font-medium transition-colors"
            style={{
              backgroundColor: isActive ? "#2B5E4115" : "transparent",
              color: isActive ? "#2B5E41" : "#6B7280",
            }}
          >
            <span>{item.icon}</span>
          