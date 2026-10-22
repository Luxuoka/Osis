"use client";

import Link from "next/link";
import Image from "next/image";
import { usePathname } from "next/navigation";
import {
  LayoutDashboard,
  UserCheck,
  MessageSquare,
  Newspaper,
  Users,
  Building2,
  FileText,
  Sparkles,
  HelpCircle,
  Link2,
  Settings,
  ExternalLink,
  LogOut,
} from "lucide-react";
import { SITE_IDENTITY } from "@/lib/constants";
import { createClient } from "@/lib/supabase/client";
import { useRouter } from "next/navigation";

export function AdminSidebar({
  isOpen,
  onClose,
}: {
  isOpen: boolean;
  onClose: () => void;
}) {
  const pathname = usePathname();
  const router = useRouter();

  const handleLogout = async () => {
    try {
      const supabase = createClient();
      await supabase.auth.signOut();
    } catch (e) {
      console.error("Logout error:", e);
    }
    router.push("/admin/login");
    router.refresh();
  };

  const navItems = [
    { label: "Dashboard", href: "/admin", icon: LayoutDashboard },
    { label: "Pendaftar & Seleksi", href: "/admin/pendaftar", icon: UserCheck },
    { label: "Kotak Masukan", href: "/admin/masukan", icon: MessageSquare },
    { label: "Berita & Pengumuman", href: "/admin/berita", icon: Newspaper },
    { label: "Struktur Pengurus", href: "/admin/pengurus", icon: Users },
    { label: "Departemen", href: "/admin/departemen", icon: Building2 },
    { label: "Program Kerja", href: "/admin/program-kerja", icon: FileText },
    { label: "Galeri Logo", href: "/admin/logos", icon: Sparkles },
    { label: "Tanya Jawab (FAQ)", href: "/admin/faq", icon: HelpCircle },
    { label: "Tautan Penting", href: "/admin/tautan", icon: Link2 },
    { label: "Pengaturan Website", href: "/admin/pengaturan", icon: Settings },
  ];

  return (
    <>
      {/* Mobile Backdrop */}
      {isOpen && (
        <div
          className="fixed inset-0 z-40 bg-black/60 backdrop-blur-sm lg:hidden"
          onClick={onClose}
        />
      )}

      <aside
        className={`fixed top-0 bottom-0 left-0 z-50 w-64 bg-[#050A14] border-r border-slate-800 flex flex-col justify-between transition-transform duration-300 ${
          isOpen ? "translate-x-0" : "-translate-x-full lg:translate-x-0"
        }`}
      >
        <div>
          {/* Logo Brand */}
          <div className="h-16 px-6 flex items-center space-x-3 border-b border-slate-800">
            <div className="w-9 h-9 rounded-xl bg-gradient-to-br from-blue-600 to-brand-navy p-1.5 border border-amber-500/30 flex items-center justify-center">
              <Image
                src="/osis-logo.jpeg"
                alt="Logo OSIS"
                width={28}
                height={28}
                className="w-full h-full object-contain"
              />
            </div>
            <div>
              <span className="block text-sm font-bold text-white tracking-wide">
                Admin Panel
              </span>
              <span className="block text-[10px] font-semibold text-amber-400 uppercase tracking-wider">
                {SITE_IDENTITY.NAMA_JULUKAN_SEKOLAH}
              </span>
            </div>
          </div>

          {/* Navigation Links */}
          <nav className="p-4 space-y-1 overflow-y-auto max-h-[calc(100vh-140px)]">
            {navItems.map((item) => {
              const Icon = item.icon;
              const isActive =
                item.href === "/admin"
                  ? pathname === "/admin"
                  : pathname.startsWith(item.href);

              return (
                <Link
                  key={item.href}
                  href={item.href}
                  onClick={onClose}
                  className={`flex items-center space-x-3 px-3 py-2.5 rounded-xl text-xs font-semibold transition-all ${
                    isActive
                      ? "bg-amber-400 text-slate-950 font-bold shadow-md shadow-amber-500/20"
                      : "text-slate-400 hover:text-white hover:bg-slate-900"
                  }`}
                >
                  <Icon className="w-4 h-4 shrink-0" />
                  <span>{item.label}</span>
                </Link>
              );
            })}
          </nav>
        </div>

        {/* Bottom Actions */}
        <div className="p-4 border-t border-slate-800 space-y-2">
          <Link
            href="/"
            target="_blank"
            className="flex items-center justify-between px-3 py-2 rounded-xl text-xs font-semibold text-slate-400 hover:text-white hover:bg-slate-900 transition-colors"
          >
            <div className="flex items-center space-x-2">
              <ExternalLink className="w-4 h-4 text-blue-400" />
              <span>Lihat Web Publik</span>
            </div>
          </Link>

          <button
            type="button"
            onClick={handleLogout}
            className="w-full flex items-center space-x-2 px-3 py-2 rounded-xl text-xs font-semibold text-rose-400 hover:text-rose-300 hover:bg-rose-500/10 transition-colors"
          >
            <LogOut className="w-4 h-4" />
            <span>Keluar Sesi (Logout)</span>
          </button>
        </div>
      </aside>
    </>
  );
}
