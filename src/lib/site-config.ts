/**
 * Configuración central del sitio.
 *
 * Editá estos valores para actualizar el email de contacto, las redes
 * sociales y los proyectos del portafolio sin tener que tocar los
 * componentes visuales.
 */

export const SITE_NAME = "Codezun";

export const CONTACT_EMAIL = "codezun@gmail.com";

/**
 * Redes sociales. Son placeholders: reemplazá cada `href: "#"` por el
 * link real cuando estén creadas las cuentas. Si una red no aplica,
 * simplemente borrá su entrada del array.
 */
export const SOCIAL_LINKS = [
  { name: "LinkedIn", href: "#" },
  { name: "Instagram", href: "#" },
  { name: "GitHub", href: "#" },
  { name: "X", href: "#" },
] as const;

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
 * Ícono de Firmiu: no se pudo descargar automáticamente (este entorno
 * no tiene salida de red hacia dominios externos arbitrarios, incluido
 * firmiu.com). Para usarlo: descargá el icon.svg desde las devtools de
 * tu navegador (pestaña Network) y subilo a /public/portfolio/firmiu-icon.svg,
 * después cambiá `image: null` de abajo por "/portfolio/firmiu-icon.svg".
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
    image: null,
  },
];
