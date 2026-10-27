import type { MetadataRoute } from "next";
import { SITE_NAME } from "@/lib/site-config";
import { SITE_DESCRIPTION } from "@/lib/schema";

/**
 * Manifiesto web: el sitio se instala como app en el teléfono.
 *
 * `display: "standalone"` abre el sitio instalado a pantalla completa, sin
 * la barra del navegador, que junto con la barra de pestañas de abajo
 * (`TabBar.tsx`) y el encabezado tipo barra superior es lo que lo hace
 * sentir como una app nativa. Es el mismo patrón de grupozh.net. Para
 * funcionar sin conexión está `public/sw.js`, que registra
 * `ServiceWorker.tsx`.
 *
 * Íconos: `/public/icons/` sale de la misma marca que `src/app/icon.png`.
 * Los "maskable" llevan la marca más pequeña, dentro de la zona segura
 * que Android recorta en círculo o en gota; si se usara el mismo archivo,
 * el recorte le comería las orejas al perro.
 */
export default function manifest(): MetadataRoute.Manifest {
  return {
    id: "/",
    name: `${SITE_NAME} — desarrollo de software`,
    short_name: SITE_NAME,
    description: SITE_DESCRIPTION,
    lang: "es-HN",
    dir: "ltr",
    start_url: "/",
    scope: "/",
    display: "standalone",
    display_override: ["standalone", "minimal-ui"],
    background_color: "#ffffff",
    theme_color: "#ffffff",
    categories: ["business", "productivity"],
    icons: [
      { src: "/icons/icon-192.png", sizes: "192x192", type: "image/png", purpose: "any" },
      { src: "/icons/icon-512.png", sizes: "512x512", type: "image/png", purpose: "any" },
      { src: "/icons/maskable-192.png", sizes: "192x192", type: "image/png", purpose: "maskable" },
      { src: "/icons/maskable-512.png", sizes: "512x512", type: "image/png", purpose: "maskable" },
    ],
    shortcuts: [
      {
        name: "Cotizar mi proyecto",
        short_name: "Cotizar",
        description: "Cuéntenos qué necesita",
        url: "/contacto",
        icons: [{ src: "/icons/icon-192.png", sizes: "192x192", type: "image/png" }],
      },
      {
        name: "Sistemas para restaurantes",
        short_name: "Sistemas",
        url: "/sistemas-para-restaurantes",
        icons: [{ src: "/icons/icon-192.png", sizes: "192x192", type: "image/png" }],
      },
      {
        name: "Blog",
        short_name: "Blog",
        url: "/blog",
        icons: [{ src: "/icons/icon-192.png", sizes: "192x192", type: "image/png" }],
      },
    ],
  };
}
