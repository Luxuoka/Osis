import { type ClassValue, clsx } from "clsx";
import { twMerge } from "tailwind-merge";

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

export function formatDate(dateString: string): string {
  try {
    const date = new Date(dateString);
    return new Intl.DateTimeFormat("id-ID", {
      day: "numeric",
      month: "long",
      year: "numeric",
    }).format(date);
  } catch {
    return dateString;
  }
}

export function generateRegistrationNumber(): string {
  const year = new Date().getFullYear();
  const randomNum = Math.floor(1000 + Math.random() * 9000);
  return `REG-${year}-${randomNum}`;
}

export function getStatusBadgeClass(status: string): string {
  switch (status.toLowerCase()) {
    case "lolos":
    case "terlaksana":
      return "bg-emerald-500/10 text-emerald-400 border-emerald-500/20";
    case "dalam proses":
    case "sedang berjalan":
      return "bg-amber-500/10 text-amber-400 border-amber-500/20";
    case "tidak lolos":
      return "bg-rose-500/10 text-rose-400 border-rose-500/20";
    case "rencana":
      return "bg-blue-500/10 text-blue-400 border-blue-500/20";
    default:
      return "bg-slate-500/10 text-slate-400 border-slate-500/20";
  }
}
