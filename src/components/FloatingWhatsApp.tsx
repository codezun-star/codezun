"use client";

import { useEffect, useState } from "react";
import { usePathname } from "next/navigation";
import { motion } from "motion/react";
import WhatsAppIcon from "./WhatsAppIcon";
import { WHATSAPP_LINK } from "@/lib/site-config";

/**
 * Botón flotante de WhatsApp, visible en todas las páginas (montado en
 * el layout raíz). Para cambiar el número o el mensaje predefinido,
 * editá WHATSAPP_NUMBER / WHATSAPP_LINK en src/lib/site-config.ts.
 *
 * Se esconde mientras haya en pantalla otro botón de WhatsApp (los que
 * llevan `data-whatsapp-cta`: el de la portada, los de las páginas de
 * servicio, el de contacto) o el pie de página. En esos momentos sería
 * un duplicado, y en móvil tapaba justo lo que estaba al lado: el botón
 * secundario de la portada o la última fila del pie (el enlace a
 * /llms.txt). Mientras está escondido sale también del orden de
 * tabulación.
 *
 * En móvil es más pequeño y va más pegado al borde, y respeta la zona
 * segura de los teléfonos con barra de gestos (`env(safe-area-inset-*)`).
 */
export default function FloatingWhatsApp() {
  const [hidden, setHidden] = useState(false);
  const pathname = usePathname();

  // Cada página tiene sus propios botones: hay que volver a buscarlos al
  // navegar, porque el layout (y este componente) no se vuelve a montar.
  useEffect(() => {
    const targets = document.querySelectorAll("footer, [data-whatsapp-cta]");
    const visible = new Set<Element>();

    const observer = new IntersectionObserver((entries) => {
      for (const entry of entries) {
        if (entry.isIntersecting) visible.add(entry.target);
        else visible.delete(entry.target);
      }
      setHidden(visible.size > 0);
    });
    targets.forEach((target) => observer.observe(target));
    return () => observer.disconnect();
  }, [pathname]);

  return (
    <motion.a
      href={WHATSAPP_LINK}
      target="_blank"
      rel="noopener noreferrer"
      aria-label="Escríbanos por WhatsApp (se abre en una pestaña nueva)"
      aria-hidden={hidden || undefined}
      tabIndex={hidden ? -1 : undefined}
      initial={{ opacity: 0, scale: 0.6 }}
      animate={
        hidden
          ? { opacity: 0, scale: 0.6 }
          : { opacity: 1, scale: 1 }
      }
      transition={{ duration: 0.3, delay: hidden ? 0 : 0.6 }}
      whileHover={{ scale: 1.08 }}
      whileTap={{ scale: 0.95 }}
      className={`fixed bottom-[max(1rem,env(safe-area-inset-bottom))] right-[max(1rem,env(safe-area-inset-right))] z-50 flex h-12 w-12 items-center justify-center rounded-full bg-[#25D366] text-white shadow-lg shadow-black/25 sm:bottom-6 sm:right-6 sm:h-14 sm:w-14 ${
        hidden ? "pointer-events-none" : ""
      }`}
    >
      <span className="absolute inset-0 animate-ping rounded-full bg-[#25D366] opacity-60 motion-reduce:hidden" />
      <WhatsAppIcon size={26} className="relative z-10" />
    </motion.a>
  );
}
