"use client";

import { motion } from "motion/react";
import { MessageCircle } from "lucide-react";
import { WHATSAPP_LINK } from "@/lib/site-config";

/**
 * Botón flotante de WhatsApp, visible en todas las páginas (montado en
 * el layout raíz). Para cambiar el número o el mensaje predefinido,
 * editá WHATSAPP_NUMBER / WHATSAPP_LINK en src/lib/site-config.ts.
 */
export default function FloatingWhatsApp() {
  return (
    <motion.a
      href={WHATSAPP_LINK}
      target="_blank"
      rel="noopener noreferrer"
      aria-label="Escribinos por WhatsApp"
      initial={{ opacity: 0, scale: 0.6 }}
      animate={{ opacity: 1, scale: 1 }}
      transition={{ duration: 0.4, delay: 0.6 }}
      whileHover={{ scale: 1.08 }}
      whileTap={{ scale: 0.95 }}
      className="fixed bottom-6 right-6 z-50 flex h-14 w-14 items-center justify-center rounded-full bg-[#25D366] text-white shadow-lg shadow-black/25"
    >
      <span className="absolute inset-0 animate-ping rounded-full bg-[#25D366] opacity-60" />
      <MessageCircle size={28} className="relative z-10" />
    </motion.a>
  );
}
