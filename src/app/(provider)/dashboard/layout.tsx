import Link from "next/link";
import Logo from "@/components/ui/Logo";
import DashboardNav from "@/components/ui/DashboardNav";
import LogoutButton from "@/components/ui/LogoutButton";

export default function DashboardLayout({ children }: { children: React.ReactNode }) {
  return (
    <div style={{ backgroundColor: "#FAFAF7", minHeight: "100vh" }}>
      <div className="flex">

        {/* ── SIDEBAR ── */}
        <aside className="hidden md:flex flex-col w-60 min-h-screen bg-white border-r border-gray-100 py-6 px-4 sticky top-0 h-screen">
          <Link href="/" className="mb-8">
            <Logo size="sm" />
          </Link>
          <DashboardNav />
          <div className="border-t border-gray-100 pt-4 mt-4">
            <Link href="/" className="flex items-center gap-3 px-3 py-2.5 rounded-xl text-sm text-gray-500 hover:bg-gray-50">
              <span>🔙</span> Ver marketplace
            </Link>
            <LogoutButton />
          </div>
        </aside>

        {/* ── CONTENIDO PRINCIPAL ── */}
        <main className="flex-1 p-6 md:p-8 min-h-screen">
          {children}
        </main>
      </div>
    </div>
  );
}
