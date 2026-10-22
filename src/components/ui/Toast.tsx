"use client";

import { motion, AnimatePresence } from "framer-motion";
import { CheckCircle2, AlertCircle, X } from "lucide-react";

interface ToastProps {
  show: boolean;
  type: "success" | "error";
  message: string;
  onClose: () => void;
}

export function Toast({ show, type, message, onClose }: ToastProps) {
  return (
    <AnimatePresence>
      {show && (
        <motion.div
          initial={{ opacity: 0, y: 50, scale: 0.9 }}
          animate={{ opacity: 1, y: 0, scale: 1 }}
          exit={{ opacity: 0, y: 20, scale: 0.95 }}
          className="fixed bottom-6 right-6 z-50 max-w-md"
        >
          <div
            className={`flex items-start space-x-3 p-4 rounded-xl shadow-2xl border backdrop-blur-xl ${
              type === "success"
                ? "bg-slate-900/95 border-emerald-500/40 text-emerald-300"
                : "bg-slate-900/95 border-rose-500/40 text-rose-300"
            }`}
          >
            {type === "success" ? (
              <CheckCircle2 className="w-5 h-5 text-emerald-400 shrink-0 mt-0.5" />
            ) : (
              <AlertCircle className="w-5 h-5 text-rose-400 shrink-0 mt-0.5" />
            )}
            <div className="flex-1 text-sm text-slate-200">{message}</div>
            <button
              type="button"
              onClick={onClose}
              className="text-slate-400 hover:text-white transition-colors p-0.5"
            >
              <X className="w-4 h-4" />
            </button>
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
