"use client";

import Link from "next/link";
import { useState } from "react";

interface ExperienceCardProps {
  id: string;
  title: string;
  location: string;
  price: number;
  rating?: number;
  reviews?: number;
  category: string;
  emoji: string;
  duration?: number;
  badge?: string;
}

const categoryColors: Record<string, string> = {
  aventura: "#E8694A",
  cultural: "#3DAA7A",
  gastronomia: "#F59E0B",
  naturaleza: "#10B981",
  playa: "#06B6D4",
  ciudad: "#8B5CF6",
  noche: "#1E293B",
  otro: "#6B7280",
};

export default function ExperienceCard({
  id, title, location, price, rating, reviews,
  category, emoji, duration, badge,
}: ExperienceCardProps) {
  const color = categoryColors[category] ?? "#6B7280";
  const [saved, setSaved] = useState(false);

  const handleWishlist = (e: React.MouseEvent) => {
    e.preventDefault();
    e.stopPropagation();
    setSaved(prev => !prev);
    // TODO: conectar con Supabase user_wishlists
  };

  return (
    <Link href={`/experiences/${id}`}>
      <div className="bg-white rounded-2xl overflow-hidden shadow-sm border border-gray-100 hover:shadow-md hover:-translate-y-0.5 transition-all cursor-pointer h-full flex flex-col">

        {/* Imagen / placeholder */}
        <div
          className="h-48 flex items-center justify-center text-6xl relative"
          style={{ backgroundColor: `${color}15` }}
        >
          <span>{emoji}</span>
          {badge && (
            <span
              className="absolute top-3 left-3 text-xs font-semibold px-2.5 py-1 rounded-full text-white"
              style={{ backgroundColor: color }}
            >
              {badge}
            </span>
          )}
          {/* Boton wishlist */}
          <button
            onClick={handleWishlist}
            className="absolute top-3 right-3 w-8 h-8 rounded-full flex items-center justify-center shadow-sm transition-all hover:scale-110"
            style={{
              backgroundColor: saved ? "#E8694A" : "white",
              border: saved ? "none" : "1px solid #E5E7EB",
            }}
            aria-label={saved ? "Quitar de guardados" : "Guardar tour"}
            title={saved ? "Quitar de guardados" : "Guardar para despues"}
          >
            <span className="text-sm leading-none">{saved ? "❤️" : "🤍"}</span>
          </button>
        </div>

        {/* Info */}
        <div className="p-4 flex flex-col flex-1">
          <p className="font-semibold text-gray-900 leading-snug">{title}</p>
          <p className="text-sm text-gray-400 mt-1">&#128205; {location}</p>

          {duration && (
            <p className="text-xs text-gray-400 mt-0.5">&#8987; {duration}h</p>
          )}

          <div className="flex items-center justify-between mt-auto pt-3">
            <p className="font-bold text-gray-900">
              <span style={{ color }} className="text-lg">${price}</span>
              <span className="text-xs font-normal text-gray-400 ml-1">USD/persona</span>
            </p>
            {rating && (
              <span className="text-xs text-gray-500 flex items-center gap-1">
                &#11088; {rating.toFixed(1)}
                {reviews && <span className="text-gray-300">({reviews})</span>}
              </span>
            )}
          </div>
        </div>
      </div>
    </Link>
  );
}
