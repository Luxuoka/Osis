"use client";

import { useEffect, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import Image from "next/image";
import { SITE_IDENTITY } from "@/lib/constants";

export function LoadingScreen() {
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    // Sembunyikan loading screen setelah 1.2 detik atau saat dokumen selesai dimuat
    const timer = setTimeout(() => {
      setIsLoading(false);
    }, 1200);

    return () => clearTimeout(timer);
  }, []);

  return (
    <AnimatePresence>
      {isLoading && (
        <motion.div
          key="loader"
          initial={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.6, ease: "easeInOut" }}
          className="fixed inset-0 z-[9999] flex flex-col items-center justify-center bg-white"
        >
          {/* Subtle Ambient Glow */}
          <div className="absolute w-72 h-72 rounded-full bg-blue-100/50 blur-3xl pointer-events-none" />
          <div className="absolute w-60 h-60 rounded-full bg-amber-100/40 blur-3xl pointer-events-none" />

          {/* Logo Animation */}
          <motion.div
            initial={{ scale: 0.8, opacity: 0 }}
            animate={{ scale: [0.8, 1.05, 1], opacity: 1 }}
            transition={{
              duration: 0.8,
              ease: "easeOut",
            }}
            className="relative w-28 h-28 md:w-32 md:h-32 mb-6"
          >
            <motion.div
              animate={{ rotate: 360 }}
              transition={{ repeat: Infinity, duration: 8, ease: "linear" }}
              className="absolute -inset-2 rounded-full border-2 border-dashed border-[#1A56DB]/30"
            />
            <div className="relative w-full h-full rounded-2xl bg-white p-3 shadow-xl border border-slate-200 flex items-center justify-center">
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
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.3, duration: 0.5 }}
            className="text-center"
          >
            <h1 className="text-lg md:text-xl font-bold tracking-wider text-slate-900">
              {SITE_IDENTITY.NAMA_ORGANISASI}
            </h1>
            <p className="text-xs tracking-widest text-[#1A56DB] font-semibold mt-1 uppercase">
              {SITE_IDENTITY.NAMA_JULUKAN_SEKOLAH}
            </p>
          </motion.div>

          {/* Progress bar loader */}
          <div className="w-36 h-1.5 bg-slate-100 rounded-full mt-6 overflow-hidden">
            <motion.div
              initial={{ x: "-100%" }}
              animate={{ x: "100%" }}
              transition={{ repeat: Infinity, duration: 1.2, ease: "easeInOut" }}
              className="w-full h-full bg-gradient-to-r from-[#1A56DB] via-[#FDB813] to-[#EE2D38]"
            />
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
