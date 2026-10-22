"use client";

import { Menu, ShieldCheck, Bell } from "lucide-react";
import { SITE_IDENTITY } from "@/lib/constants";

export function AdminHeader({ onOpenSidebar }: { onOpenSidebar: () => void }) {
  return (
    <header className="h-16 bg-[#050A14] border-b border-slate-800 px-4 sm:px-8 flex items-center justify-between sticky top-0 z-30">
      <div className="flex items-center space-x-3">
        <button
          type="button"
          onClick={onOpenSidebar}
          className="lg:hidden p-2 rounded-xl text-slate-400 hover:text-white hover:bg-slate-900"
          aria-label="Buka menu navigasi"
        >
          <Menu className="w-5 h-5" />
        </button>

        <div className="hidden sm:block">
          <span className="text-xs text-slate-400 font-medium">
            Sistem Informasi Pengelolaan OSIS
          </span>
          <span className="text-slate-600 mx-2">/</span>
          <span className="text-xs font-bold text-amber-400">
            {SITE_IDENTITY.NAMA_ORGANISASI}
          </span>
        </div>
      </div>

      <div className="flex items-center space-x-3">
        <div className="flex items-center space-x-2.5 px-3 py-1.5 rounded-xl bg-slate-900 border border-slate-800">
          <div className="w-6 h-6 rounded-lg bg-amber-400/20 text-amber-400 flex items-center justify-center">
            <ShieldCheck className="w-3.5 h-3.5" />
          </div>
          <div className="text-left">
            <span className="block text-xs font-bold text-white">Administrator</span>
            <span className="block text-[10px] text-emerald-400 leading-tight">Online</span>
          </div>
        </div>
      </div>
    </header>
  );
}
