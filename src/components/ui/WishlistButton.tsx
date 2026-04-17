"use client";

import { useState } from "react";

interface WishlistButtonProps {
  experienceId: string;
  /** "icon" = botón redondo con corazón (para galería). "text" = link de texto (para widget). */
  variant?: "icon" | "text";
}

export default function WishlistButton({ experienceId, variant = "icon" }: WishlistButtonProps) {
  const [saved, setSaved] = useState(false);

  const toggle = (e: React.MouseEvent) => {
    e.preventDefault();
    e.stopPropagation();
    setSaved(prev => !prev);
    // TODO: conectar con Supabase user_wishlists
  };

  if (variant === "text") {
    return (
      <button
        onClick={toggle}
        className="flex items-center gap-2 text-sm font-medium transition-colors"
        style={{ color: saved ? "#E8694A" : "#6B7280" }}
        aria-label={saved ? "Quitar de guardados" : "Guardar tour"}
      >
        <span className="text-base">{saved ? "❤️" : "🤍"}</span>
        {saved ? "Guardado en tu lista" : "Guardar para después"}
      </button>
    );
  }

  return (
    <button
      onClick={toggle}
      className="w-10 h-10 rounded-full flex items-center justify-center shadow-md transition-all hover:scale-110"
      style={{
        backgroundColor: saved ? "#E8694A" : "white",
        border: saved ? "none" : "1px solid #E5E7EB",
      }}
      aria-label={saved ? "Quitar de guardados" : "Guardar tour"}
      title={saved ? "Quitar de guardados" : "Guardar para después"}
    >
      <span className="text-lg leading-none">{saved ? "❤️" : "🤍"}</span>
    </button>
  );
}
