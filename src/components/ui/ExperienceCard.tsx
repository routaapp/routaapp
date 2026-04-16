import Link from "next/link";

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
          <span className="absolute top-3 right-3 bg-white rounded-full px-2 py-0.5 text-xs font-medium text-gray-600 shadow-sm capitalize">
            {category}
          </span>
        </div>

        {/* Info */}
        <div className="p-4 flex flex-col flex-1">
          <p className="font-semibold text-gray-900 leading-snug">{title}</p>
          <p className="text-sm text-gray-400 mt-1">📍 {location}</p>

          {duration && (
            <p className="text-xs text-gray-400 mt-0.5">⏱ {duration}h</p>
          )}

          <div className="flex items-center justify-between mt-auto pt-3">
            <p className="font-bold text-gray-900">
              <span style={{ color }} className="text-lg">${price}</span>
              <span className="text-xs font-normal text-gray-400 ml-1">USD/persona</span>
            </p>
            {rating && (
              <span className="text-xs text-gray-500 flex items-center gap-1">
                ⭐ {rating.toFixed(1)}
                {reviews && <span className="text-gray-300">({reviews})</span>}
              </span>
            )}
          </div>
        </div>
      </div>
    </Link>
  );
}
