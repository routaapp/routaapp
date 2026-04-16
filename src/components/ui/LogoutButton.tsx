"use client";

import { useRouter } from "next/navigation";
import { clearMockUser } from "@/lib/mock-auth";

export default function LogoutButton() {
  const router = useRouter();

  function handleLogout() {
    clearMockUser();
    router.push("/");
    router.refresh();
  }

  return (
    <button
      onClick={handleLogout}
      className="w-full flex items-center gap-3 px-3 py-2.5 rounded-xl text-sm text-gray-500 hover:bg-gray-50 transition-colors"
    >
      <span>🚪</span> Cerrar sesión
    </button>
  );
}
