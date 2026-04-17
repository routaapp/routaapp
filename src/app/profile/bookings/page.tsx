"use client";
import { useState } from "react";
import Link from "next/link";
import Navbar from "@/components/ui/Navbar";

type BookingStatus = "confirmed" | "pending" | "completed" | "cancelled";
const STATUS_STYLES: Record<BookingStatus, { label: string; bg: string; color: string }> = {
  confirmed: { label: "Confirmada", bg: "#DCFCE7",  color: "#166534" },
  pending:   { label: "Pendiente",  bg: "#FEF9C3",  color: "#854D0E" },
  completed: { label: "Completada", bg: "#F3F4F6",  color: "#374151" },
  cancelled: { label: "Cancelada",  bg: "#FEE2E2",  color: "#991B1B" },
};

const MY_BOOKINGS = [
  {
    id: "ROT-20260420-001",
    experience_id: "1",
    experience: "Excursión a Los Haitises",
    provider: "Tours Samaná Pro",
    location: "Samaná, Rep. Dominicana",
    date: "20 de abril, 2026 · 8:00 AM",
    people: 2,
    total: 139,
    status: "confirmed" as BookingStatus,
    emoji: "&#127807;",
  },
  {
    id: "ROT-20260315-007",
    experience_id: "2",
    experience: "Tour gastronómico Zona Colonial",
    provider: "Sabores de Santo Domingo",
    location: "Santo Domingo, Rep. Dominicana",
    date: "15 de marzo, 2026 · 10:00 AM",
    people: 2,
    total: 90,
    status: "completed" as BookingStatus,
    emoji: "&#127869;",
    reviewed: false,
  },
];

function StarRating({ value, onChange }: { value: number; onChange: (v: number) => void }) {
  const [hover, setHover] = useState(0);
  return (
    <div className="flex gap-1">
      {[1, 2, 3, 4, 5].map(star => (
        <button
          key={star}
          type="button"
          onClick={() => onChange(star)}
          onMouseEnter={() => setHover(star)}
          onMouseLeave={() => setHover(0)}
          className="text-2xl transition-transform hover:scale-110"
        >
          <span style={{ color: star <= (hover || value) ? "#F59E0B" : "#D1D5DB" }}>&#11088;</span>
        </button>
      ))}
    </div>
  );
}

export default function ProfileBookingsPage() {
  const [reviewOpen, setReviewOpen] = useState<string | null>(null);
  const [stars, setStars] = useState<Record<string, number>>({});
  const [comment, setComment] = useState<Record<string, string>>({});
  const [submitted, setSubmitted] = useState<Record<string, boolean>>({});

  function handleSubmitReview(bookingId: string) {
    if (!stars[bookingId]) return;
    setSubmitted(prev => ({ ...prev, [bookingId]: true }));
    setReviewOpen(null);
    // TODO: conectar con Supabase reviews
  }

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
            const isCompleted = b.status === "completed";
            const alreadyReviewed = submitted[b.id] || (b as any).reviewed;
            const isReviewOpen = reviewOpen === b.id;

            return (
              <div key={b.id} className="bg-white rounded-2xl border border-gray-100 shadow-sm overflow-hidden">
                {/* Card principal — clickeable solo para ir al tour */}
                <div className="p-5">
                  <div className="flex items-start gap-4">
                    <Link href={`/experiences/${b.experience_id}`} className="w-14 h-14 rounded-xl flex items-center justify-center text-2xl flex-shrink-0 hover:opacity-80 transition-opacity" style={{ backgroundColor: "#6FCFAB20" }}>
                      <span dangerouslySetInnerHTML={{ __html: b.emoji }} />
                    </Link>
                    <div className="flex-1 min-w-0">
                      <div className="flex items-start justify-between gap-3 mb-1">
                        <Link href={`/experiences/${b.experience_id}`} className="font-bold text-gray-900 hover:underline leading-snug">
                          {b.experience}
                        </Link>
                        <span className="text-xs px-2.5 py-1 rounded-full font-medium flex-shrink-0" style={{ backgroundColor: s.bg, color: s.color }}>{s.label}</span>
                      </div>
                      <p className="text-sm text-gray-500">{b.provider} · {b.location}</p>
                      <div className="flex flex-wrap gap-3 mt-2 text-sm text-gray-600">
                        <span>&#128197; {b.date}</span>
                        <span>&#128101; {b.people} personas</span>
                        <span className="font-semibold text-gray-900">${b.total} total</span>
                      </div>
                      <p className="text-xs text-gray-400 mt-1.5 font-mono">#{b.id}</p>
                    </div>
                  </div>

                  {/* Acciones */}
                  <div className="flex items-center gap-3 mt-4 pt-4 border-t border-gray-50">
                    <Link href={`/experiences/${b.experience_id}`}
                      className="text-xs font-medium px-3 py-1.5 rounded-lg border border-gray-200 text-gray-600 hover:border-gray-400 transition-colors">
                      Ver publicación
                    </Link>
                    {isCompleted && (
                      alreadyReviewed ? (
                        <span className="text-xs font-medium px-3 py-1.5 rounded-lg flex items-center gap-1" style={{ backgroundColor: "#DCFCE7", color: "#166534" }}>
                          &#10003; Reseña enviada
                        </span>
                      ) : (
                        <button
                          onClick={() => setReviewOpen(isReviewOpen ? null : b.id)}
                          className="text-xs font-semibold px-3 py-1.5 rounded-lg text-white transition-opacity hover:opacity-90"
                          style={{ backgroundColor: "#E8694A" }}
                        >
                          &#11088; {isReviewOpen ? "Cerrar" : "Calificar este tour"}
                        </button>
                      )
                    )}
                  </div>
                </div>

                {/* Panel de reseña (se expande) */}
                {isReviewOpen && !alreadyReviewed && (
                  <div className="border-t border-gray-100 px-5 py-5" style={{ backgroundColor: "#FAFAF7" }}>
                    <p className="text-sm font-semibold text-gray-800 mb-3">&#128172; ¿Cómo fue tu experiencia?</p>
                    <StarRating value={stars[b.id] ?? 0} onChange={v => setStars(prev => ({ ...prev, [b.id]: v }))} />
                    {stars[b.id] > 0 && (
                      <div className="mt-3 space-y-3">
                        <textarea
                          rows={3}
                          value={comment[b.id] ?? ""}
                          onChange={e => setComment(prev => ({ ...prev, [b.id]: e.target.value }))}
                          placeholder="Cuéntanos más sobre tu visita... (opcional)"
                          className="w-full border border-gray-200 rounded-xl px-4 py-2.5 text-sm text-gray-800 placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-green-400 bg-white resize-none"
                        />
                        <div className="flex gap-2">
                          <button
                            type="button"
                            onClick={() => setReviewOpen(null)}
                            className="flex-1 py-2 rounded-xl border border-gray-200 text-sm text-gray-500 hover:bg-gray-50"
                          >
                            Cancelar
                          </button>
                          <button
                            type="button"
                            onClick={() => handleSubmitReview(b.id)}
                            className="flex-1 py-2 rounded-xl text-white text-sm font-semibold transition-opacity hover:opacity-90"
                            style={{ backgroundColor: "#3DAA7A" }}
                          >
                            Enviar reseña
                          </button>
                        </div>
                      </div>
                    )}
                  </div>
                )}
              </div>
            );
          })}
        </div>

        <div className="mt-8 text-center">
          <Link href="/experiences" className="text-sm font-semibold" style={{ color: "#3DAA7A" }}>
            Descubrir más experiencias →
          </Link>
        </div>
      </div>
    </div>
  );
}
