import type { MetadataRoute } from "next";
import { SITE_NAME } from "@/lib/site-config";
import { SITE_DESCRIPTION } from "@/lib/schema";

/**
 * Manifiesto web.
 *
 * No convierte el sitio en una aplicación instalable de verdad —no hay service
 * worker ni nada que funcione sin conexión, y no hace falta— pero es lo que
 * decide cómo se ve el sitio cuando alguien lo guarda en la pantalla de inicio
 * del teléfono: con el nombre y el icono de la marca, o con la URL recortada y
 * una miniatura de la página. Los iconos son los mismos archivos que ya sirven
 * de favicon (`src/app/icon.png` y `apple-icon.png`), así que no hay una
 * segunda copia del logo que mantener.
 *
 * `display: "browser"` y no `standalone`: esto es un sitio, no una app, y
 * esconderle la barra de direcciones a quien lo abre desde el escritorio le
 * quita el botón de volver sin darle nada a cambio.
 */
export default function manifest(): MetadataRoute.Manifest {
  return {
    name: `${SITE_NAME} — desarrollo de software`,
    short_name: SITE_NAME,
    description: SITE_DESCRIPTION,
    start_url: "/",
    display: "browser",
    lang: "es",
    background_color: "#FFFFFF",
    theme_color: "#004E9B",
    icons: [
      {
        src: "/icon.png",
        // Los 338x338 reales del archivo. Declarar un tamaño que el PNG no
        // tiene hace que el navegador lo descarte y vuelva a la miniatura.
        sizes: "338x338",
        type: "image/png",
        purpose: "any",
      },
    ],
  };
}
