import type { MetadataRoute } from "next";
import { ANSWER_ENGINE_CRAWLERS } from "@/lib/crawlers";
import { SITE_URL } from "@/lib/site-config";

/**
 * robots.txt.
 *
 * El sitio es público entero: no hay panel, ni endpoints, ni rutas con sesión
 * que esconder, así que los dos grupos dicen lo mismo. El segundo existe para
 * dejar por escrito que los motores de respuestas pueden leer y citar este
 * sitio — ver `lib/crawlers.ts` para por qué eso no es redundante.
 *
 * `/llms.txt` no se declara aquí porque robots.txt no tiene un campo para eso;
 * se sirve en su ruta convenida y se enlaza desde el pie del sitio.
 */
export default function robots(): MetadataRoute.Robots {
  return {
    rules: [
      {
        userAgent: "*",
        allow: "/",
      },
      {
        userAgent: [...ANSWER_ENGINE_CRAWLERS],
        allow: "/",
      },
    ],
    sitemap: `${SITE_URL}/sitemap.xml`,
    host: SITE_URL,
  };
}
