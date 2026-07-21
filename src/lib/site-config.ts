/**
 * Configuración central del sitio.
 *
 * Editá estos valores para actualizar el email de contacto y los
 * proyectos del portafolio sin tener que tocar los componentes
 * visuales.
 */

export const SITE_NAME = "Codezun";

/** Dominio final del sitio, usado para SEO (metadataBase, sitemap, JSON-LD). */
export const SITE_URL = "https://codezun.com";

export const CONTACT_EMAIL = "codezun@gmail.com";

/**
 * Fecha de referencia para contenido estático (páginas legales,
 * contacto, ciudades). Se usa tanto en el texto "Última actualización"
 * como en sitemap.xml, para no tener dos fuentes de verdad distintas.
 * Actualizala cuando el contenido de esas páginas cambie de verdad.
 */
export const SITE_CONTENT_DATE = "2026-07-21";

/**
 * WhatsApp / teléfono de contacto.
 * NUMBER va sin "+" ni espacios (formato que requiere el link de wa.me).
 * DISPLAY es la versión legible que se muestra en la UI.
 */
export const WHATSAPP_NUMBER = "50432279672";
export const WHATSAPP_DISPLAY = "+504 3227-9672";
export const WHATSAPP_LINK = `https://wa.me/${WHATSAPP_NUMBER}?text=${encodeURIComponent(
  "Hola, quiero más información sobre sus servicios."
)}`;

/**
 * Proyectos del portafolio.
 *
 * Por ahora mostramos solo Firmiu como proyecto propio destacado (es
 * el más consolidado). Para sumar otro proyecto más adelante, agregá
 * un objeto más a este array con la misma forma:
 * - name: nombre del proyecto/producto
 * - description: descripción corta (1-2 líneas)
 * - href: link al proyecto
 * - category: etiqueta corta para la card (ej. "SaaS", "E-commerce",
 *             "Landing page", "Sitio web")
 * - image: ruta a una imagen/logo en /public (ej: "/portfolio/firmiu-icon.svg").
 *          Acepta PNG, JPG o SVG. Si se deja null se muestra un bloque
 *          con las iniciales como placeholder visual.
 *
 * Ícono de Firmiu (/public/portfolio/firmiu-icon.svg): no se pudo
 * descargar el ícono real del sitio (este entorno no tiene salida de
 * red hacia dominios externos arbitrarios, incluido firmiu.com), así
 * que se diseñó un ícono propio (documento + firma + sello de
 * verificado) con los colores de marca. Si preferís usar el ícono real
 * del sitio, descargalo desde las devtools de tu navegador (pestaña
 * Network) y reemplazá ese mismo archivo.
 *
 * Si en el futuro se agregan más proyectos, el grid vuelve a acomodarse
 * solo (ver Portfolio.tsx).
 */
export type PortfolioProject = {
  name: string;
  description: string;
  href: string;
  category: string;
  image: string | null;
};

export const PORTFOLIO_PROJECTS: PortfolioProject[] = [
  {
    name: "Firmiu",
    description:
      "Plataforma SaaS de firma digital para empresas. Nuestro proyecto propio más consolidado.",
    href: "https://firmiu.com",
    category: "SaaS",
    image: "/portfolio/firmiu-icon.svg",
  },
];
