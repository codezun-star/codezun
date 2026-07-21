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
 * Para agregar un proyecto nuevo, sumá un objeto más a este array con
 * la misma forma. Los campos son:
 * - name: nombre del proyecto/producto
 * - description: descripción corta (1-2 líneas)
 * - href: link al proyecto
 * - type: "web" o "app", solo para mostrar una etiqueta en la card
 * - image: ruta a una imagen/logo en /public (ej: "/portfolio/mi-app.png").
 *          Si se deja null se muestra un bloque con las iniciales como
 *          placeholder visual. Los ícono/logos reales de estos sitios
 *          no se pudieron descargar automáticamente (este entorno no
 *          tiene salida de red hacia dominios externos arbitrarios).
 *          Para usar el logo real de cada proyecto: subí el archivo a
 *          /public/portfolio/ (mismo flujo que /public/logo/) y poné
 *          esa ruta acá, ej: "/portfolio/calcfit.png".
 *
 * No hay límite de proyectos: el grid se acomoda solo.
 */
export type PortfolioProject = {
  name: string;
  description: string;
  href: string;
  type: "web" | "app";
  image: string | null;
};

export const PORTFOLIO_PROJECTS: PortfolioProject[] = [
  {
    name: "calcfit.com",
    description: "Calculadoras de salud",
    href: "https://calcfit.com",
    type: "web",
    image: null,
  },
  {
    name: "lotohn.com",
    description: "Resultados de la lotería de Honduras",
    href: "https://lotohn.com",
    type: "web",
    image: null,
  },
  {
    name: "resultpowerball.com",
    description: "Resultados del Powerball (USA)",
    href: "https://resultpowerball.com",
    type: "web",
    image: null,
  },
  {
    name: "firmiu.com",
    description: "SaaS de firma digital",
    href: "https://firmiu.com",
    type: "web",
    image: null,
  },
  {
    name: "toolsfoto.com",
    description: "Herramientas de edición de imágenes",
    href: "https://toolsfoto.com",
    type: "web",
    image: null,
  },
  {
    name: "inversax.com",
    description: "Herramientas de finanzas / brokers",
    href: "https://inversax.com",
    type: "web",
    image: null,
  },
  {
    name: "grupozh.net",
    description: "Contabilidad para empresas en Honduras",
    href: "https://grupozh.net",
    type: "web",
    image: null,
  },
  {
    name: "calzix.com",
    description: "Herramientas variadas",
    href: "https://calzix.com",
    type: "web",
    image: null,
  },
  {
    name: "EasyGratuity",
    // TODO: reemplazar por una descripción real de qué hace la app.
    description: "Aplicación Android publicada en Google Play.",
    href: "https://play.google.com/store/apps/details?id=com.jzuniga1995.EasyGratuity",
    type: "app",
    image: null,
  },
  {
    name: "Mi Control",
    // TODO: reemplazar por una descripción real de qué hace la app.
    description: "Aplicación Android publicada en Google Play.",
    href: "https://play.google.com/store/apps/details?id=com.rundriver.micontrol",
    type: "app",
    image: null,
  },
  {
    name: "Mi promedio",
    // TODO: reemplazar por una descripción real de qué hace la app.
    description: "Aplicación Android publicada en Google Play.",
    href: "https://play.google.com/store/apps/details?id=com.jzuniga1995.Mipromedio",
    type: "app",
    image: null,
  },
];
