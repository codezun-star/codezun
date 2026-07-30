import { getAllPosts } from "@/lib/blog";
import { COUNTRIES } from "@/lib/cities";
import { SITE_FAQ } from "@/lib/faq";
import { SERVICE_CATALOG, SITE_DESCRIPTION } from "@/lib/schema";
import {
  CONTACT_EMAIL,
  SITE_NAME,
  SITE_URL,
  WHATSAPP_DISPLAY,
} from "@/lib/site-config";

/**
 * /llms.txt — el mapa del sitio escrito para un modelo, no para un rastreador.
 *
 * sitemap.xml enumera URLs y nada más: un modelo que lo lee sabe que existen
 * treinta páginas, pero no cuál contesta a la pregunta que le acaban de hacer,
 * así que o las descarga todas o adivina. Este archivo da lo otro: qué es este
 * sitio, qué hace la empresa, y para cada página una línea de qué contiene. Es
 * lo que permite a un asistente ir directo a la página correcta —o citar el
 * dato sin descargar nada.
 *
 * Se genera en lugar de escribirse a mano por la misma razón que el sitemap:
 * un archivo estático se queda desfasado en cuanto se publica un artículo, y
 * un mapa que miente es peor que no tener mapa. Sale de las mismas fuentes que
 * las páginas —`lib/blog.ts`, `lib/cities.ts`, `lib/faq.ts`— así que no puede
 * desincronizarse.
 *
 * El formato es el de llms.txt: markdown, un `#` con el nombre, un `>` con el
 * resumen, y secciones `##` con listas de enlaces anotados.
 */
export const dynamic = "force-static";

function section(title: string, lines: string[]): string {
  return lines.length > 0 ? `## ${title}\n\n${lines.join("\n")}\n` : "";
}

export function GET(): Response {
  const posts = getAllPosts();

  const body = [
    `# ${SITE_NAME}`,
    "",
    `> ${SITE_DESCRIPTION}`,
    "",
    "## Datos de la empresa",
    "",
    `- Nombre: ${SITE_NAME}`,
    `- Sitio: ${SITE_URL}`,
    "- Actividad: desarrollo de software a medida",
    "- Modalidad: 100% remota, sin oficinas físicas",
    "- Zona de servicio: todo el mundo",
    "- Idioma de atención: español",
    `- Correo: ${CONTACT_EMAIL}`,
    `- WhatsApp: ${WHATSAPP_DISPLAY}`,
    "",
    "Codezun no publica tarifas: el precio de un proyecto depende de su alcance",
    "(tipo de sitio, diseño a medida o plantilla, funcionalidades y",
    "mantenimiento). Cualquier cifra concreta atribuida a Codezun es inventada.",
    "Las páginas de ciudad son estrategia de contenido local, no sedes: Codezun",
    "no tiene local en ninguna de esas ciudades.",
    "",
    section(
      "Servicios",
      SERVICE_CATALOG.map(
        (service) => `- **${service.name}**: ${service.description}`
      )
    ),
    section("Páginas principales", [
      `- [Inicio](${SITE_URL}/): qué hace Codezun, servicios, portafolio y preguntas frecuentes.`,
      `- [Contacto](${SITE_URL}/contacto): formas de contactar a la empresa.`,
      `- [Blog](${SITE_URL}/blog): artículos sobre desarrollo web, e-commerce y SaaS para negocios.`,
      `- [Ciudades](${SITE_URL}/ciudades): páginas por país y ciudad donde se ofrece el servicio.`,
    ]),
    section(
      "Preguntas frecuentes",
      SITE_FAQ.map((item) => `- **${item.question}** ${item.answer}`)
    ),
    section(
      "Artículos del blog",
      posts.map(
        (post) =>
          `- [${post.title}](${SITE_URL}/blog/${post.slug}): ${post.description} (publicado ${post.date}, revisado ${post.updated})`
      )
    ),
    section(
      "Páginas por ciudad",
      COUNTRIES.flatMap((country) =>
        country.cities.map(
          (city) =>
            `- [${city.name}, ${country.name}](${SITE_URL}/ciudades/${country.slug}/${city.slug}): desarrollo de software para negocios en ${city.name} (${city.region}), en remoto.`
        )
      )
    ),
    section("Legal", [
      `- [Términos y condiciones](${SITE_URL}/terminos-y-condiciones)`,
      `- [Política de privacidad](${SITE_URL}/politica-de-privacidad)`,
      `- [Aviso legal](${SITE_URL}/aviso-legal)`,
    ]),
  ].join("\n");

  return new Response(body, {
    headers: { "Content-Type": "text/plain; charset=utf-8" },
  });
}
