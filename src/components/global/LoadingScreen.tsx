"use client";

import { useEffect, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import Image from "next/image";
import { SITE_IDENTITY } from "@/lib/constants";

export function LoadingScreen() {
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    try {
      // Cek apakah sudah pernah dimuat pada sesi browser saat ini
      const alreadyLoaded = sessionStorage.getItem("osis_session_loaded");
      if (alreadyLoaded) {
        return;
      }

      setIsLoading(true);

      const dismiss = () => {
        setIsLoading(false);
        try {
          sessionStorage.setItem("osis_session_loaded", "true");
        } catch {
          // Ignore private browsing storage restrictions
        }
      };

      // Segera hilangkan saat halaman siap (maksimal 350ms agar tidak memblokir user)
      if (document.readyState === "complete") {
        const timer = setTimeout(dismiss, 350);
        return () => clearTimeout(timer);
      } else {
        const handleLoad = () => setTimeout(dismiss, 150);
        window.addEventListener("load", handleLoad);
        const fallbackTimer = setTimeout(dismiss, 700);
        return () => {
          window.removeEventListener("load", handleLoad);
          clearTimeout(fallbackTimer);
        };
      }
    } catch {
      setIsLoading(false);
    }
  }, []);

  return (
    <AnimatePresence>
      {isLoading && (
        <motion.div
          key="loader"
          initial={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.25, ease: "easeInOut" }}
          className="fixed inset-0 z-[9999] flex flex-col items-center justify-center bg-white pointer-events-none"
        >
          {/* Subtle Ambient Glow */}
          <div className="absolute w-72 h-72 rounded-full bg-blue-100/50 blur-3xl pointer-events-none" />
          <div className="absolute w-60 h-60 rounded-full bg-amber-100/40 blur-3xl pointer-events-none" />

          {/* Logo Animation */}
          <motion.div
            initial={{ scale: 0.85, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            transition={{
              duration: 0.35,
              ease: "easeOut",
            }}
            className="relative w-24 h-24 md:w-28 md:h-28 mb-5"
          >
            <motion.div
              animate={{ rotate: 360 }}
              transition={{ repeat: Infinity, duration: 6, ease: "linear" }}
              className="absolute -inset-2 rounded-full border-2 border-dashed border-[#1A56DB]/30"
            />
            <div className="relative w-full h-full rounded-2xl bg-white p-2.5 shadow-xl border border-slate-200 flex items-center justify-center">
              <Image
                src="/osis-logo.jpeg"
                alt={SITE_IDENTITY.NAMA_ORGANISASI}
                width={96}
                height={96}
                className="w-full h-full object-contain"
                priority
              />
            </div>
          </motion.div>

          {/* Identity & Status */}
          <motion.div
            initial={{ opacity: 0, y: 8 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.1, duration: 0.3 }}
            className="text-center"
          >
            <h1 className="text-base md:text-lg font-bold tracking-wider text-slate-900">
              {SITE_IDENTITY.NAMA_ORGANISASI}
            </h1>
            <p className="text-[11px] tracking-widest text-[#1A56DB] font-semibold mt-0.5 uppercase">
              {SITE_IDENTITY.NAMA_JULUKAN_SEKOLAH}
            </p>
          </motion.div>

          {/* Progress bar loader */}
          <div className="w-32 h-1 bg-slate-100 rounded-full mt-5 overflow-hidden">
            <motion.div
              initial={{ x: "-100%" }}
              animate={{ x: "100%" }}
              transition={{ repeat: Infinity, duration: 0.8, ease: "easeInOut" }}
              className="w-full h-full bg-gradient-to-r from-[#1A56DB] via-[#FDB813] to-[#EE2D38]"
            />
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
