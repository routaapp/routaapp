"use client";
import { useState } from "react";
import Link from "next/link";
import Navbar from "@/components/ui/Navbar";

type BookingStatus = "confirmed" | "pending" | "completed" | "cancelled";
const STATUS_STYLES: Record<BookingStatus, { label: string; bg: string; color: string }> = {
  confirmed: { label: "Confirmada", bg: "#DCFCE7", color: "#166534" },
  pending:   { label: "Pendiente",  bg: "#FEF9C3", color: "#854D0E" },
  completed: { label: "Completada", bg: "#F3F4F6", color: "#374151" },
  cancelled: { label: "Cancelada",  bg: "#FEE2E2", color: "#991B1B" },
};

const MY_BOOKINGS = [
  { id: "ROT-20260420-001", experience: "Excursión a Los Haitises", provider: "Tours Samaná Pro", location: "Samaná, Rep. Dominicana", date: "20 de abril, 2026 · 8:00 AM", people: 2, total: 139, status: "confirmed" as BookingStatus, emoji: "🌿" },
  { id: "ROT-20260315-007", experience: "Tour gastronómico Zona Colonial", provider: "Sabores de Santo Domingo", location: "Santo Domingo, Rep. Dominicana", date: "15 de marzo, 2026 · 10:00 AM", people: 2, total: 90, status: "completed" as BookingStatus, emoji: "🍽️" },
];

export default function ProfileBookingsPage() {
  return (
    <div style={{ backgroundColor: "#FAFAF7", minHeight: "100vh" }}>
      <Navbar />
      <div className="max-w-3xl mx-auto px-4 py-12">
        <div className="flex items-center justify-between mb-8">
          <div>
            <h1 className="text-2xl font-bold text-gray-900">Mis reservas</h1>
            <p className="text-gray-400 text-sm mt-1">{MY_BOOKINGS.length} reservas en total</p>
          </div>
          <Link href="/profile" className="text-sm text-gray-400 hover:text-gray-700">← Mi perfil</Link>
        </div>
        <div className="space-y-4">
          {MY_BOOKINGS.map(b => {
            const s = STATUS_STYLES[b.status];
            return (
              <div key={b.id} className="bg-white rounded-2xl border border-gray-100 shadow-sm p-5">
                <div className="flex items-start gap-4">
                  <div className="w-14 h-14 rounded-xl flex items-center justify-center text-2xl flex-shrink-0" style={{ backgroundColor: "#6FCFAB20" }}>{b.emoji}</div>
                  <div className="flex-1 min-w-0">
                    <div className="flex items-start justify-between gap-3 mb-1">
                      <h2 className="font-bold text-gray-900">{b.experience}</h2>
                      <span className="text-xs px-2.5 py-1 rounded-full font-medium flex-shrink-0" style={{ backgroundColor: s.bg, color: s.color }}>{s.label}</span>
                    </div>
                    <p className="text-sm text-gray-500">{b.provider} · {b.location}</p>
                    <div className="flex flex-wrap gap-3 mt-2 text-sm text-gray-600">
                      <span>📅 {b.date}</span>
                      <span>👥 {b.people} personas</span>
                      <span className="font-semibold text-gray-900">${b.total} total</span>
                    </div>
                    <p className="text-xs text-gray-400 mt-1.5 font-mono">#{b.id}</p>
                  </div>
                </div>
              </div>
            );
          })}
        </div>
        <div className="mt-8 text-center">
          <Link href="/experiences" className="text-sm font-semibold" style={{ color: "#3DAA7A" }}>Descubrir más experiencias →</Link>
        </div>
      </div>
    </div>
  );
}
