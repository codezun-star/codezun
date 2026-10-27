"use client";

import { useEffect } from "react";

/**
 * Registra `public/sw.js`, que deja disponibles sin conexión las páginas ya
 * visitadas y muestra /offline cuando no hay copia. Es parte de que el sitio
 * se pueda instalar y usar como app (ver `app/manifest.ts`).
 *
 * Solo en producción, por lo mismo que la analítica: en `next dev` un
 * service worker cachearía archivos que cambian a cada guardado.
 */
export default function ServiceWorker() {
  useEffect(() => {
    if (process.env.NODE_ENV !== "production" || !("serviceWorker" in navigator)) {
      return;
    }
    navigator.serviceWorker.register("/sw.js").catch(() => {
      // Sin service worker el sitio funciona igual, solo que no sin conexión.
    });
  }, []);

  return null;
}
