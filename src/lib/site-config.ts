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
 * ID de medición de Google Analytics 4 (propiedad "codezun",
 * flujo https://codezun.com).
 *
 * No es un secreto —viaja en el HTML de todas las páginas, cualquiera
 * puede leerlo en el código fuente— así que vive acá y no en una
 * variable de entorno: una variable `NEXT_PUBLIC_*` terminaría igual de
 * pública, pero además obligaría a configurarla en Vercel para que el
 * sitio midiera algo, y el despliegue se rompería en silencio si se
 * olvidara.
 *
 * Dejalo en cadena vacía para desactivar la analítica sin borrar código
 * (ver `Analytics.tsx`).
 */
export const GA_MEASUREMENT_ID: string = "G-C2DP9BD90V";

/**
 * Fecha de referencia para contenido estático (páginas legales,
 * contacto, ciudades). Se usa tanto en el texto "Última actualización"
 * como en sitemap.xml, para no tener dos fuentes de verdad distintas.
 * Actualizala cuando el contenido de esas páginas cambie de verdad.
 */
export const SITE_CONTENT_DATE = "2026-08-09";

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
 * Para sumar un proyecto, agregá un objeto más a este array:
 * - name: nombre del proyecto/producto, tal como se llama a sí mismo
 * - description: descripción corta (1-2 líneas)
 * - href: link al proyecto
 * - category: etiqueta corta para la card (ej. "SaaS", "E-commerce",
 *             "Landing page", "Sitio web")
 * - applicationCategory: tipo de aplicación según schema.org
 *   (GameApplication, BusinessApplication, FinanceApplication...).
 *   Alimenta los datos estructurados, no la interfaz.
 * - image: ruta a una imagen/logo en /public (ej: "/portfolio/firmiu-icon.svg").
 *          Acepta PNG, JPG o SVG. Si se deja null se muestra un bloque
 *          con las iniciales como placeholder visual.
 *
 * Todos son proyectos propios de Codezun, no trabajos de cliente:
 * es lo que dice el título de la sección, y de ahí que los enlaces
 * pasen autoridad en lugar de marcarse como `nofollow` (ver
 * Portfolio.tsx y `portfolioSchema()` en lib/schema.ts).
 *
 * Íconos (/public/portfolio/*.svg): son marcas dibujadas a mano con la
 * paleta de Codezun, no los logotipos reales de cada producto. Este
 * entorno no tiene salida de red hacia dominios externos —ni siquiera
 * hacia los subdominios propios— así que no se pudieron descargar los
 * originales, y además diez marcas ajenas juntas en un grid no leen
 * como una familia. Cada icono cita el producto que representa, y en
 * dos casos se apartó del logo real a propósito para que la rejilla
 * siga siendo legible:
 * - Petnote tiene por logo una cara de perro, igual que Memecoin
 *   Plaza. Dos perros en la misma rejilla no se distinguen, así que
 *   Petnote es una chapa de collar con huella, que dice lo mismo.
 * - Calzix, CalcFit e Inversax son los tres sitios de calculadoras.
 *   Si los tres llevaran una calculadora serían el mismo icono, así
 *   que solo Calzix la usa: CalcFit es una mancuerna con un pulso
 *   (salud) e Inversax unas barras con una flecha (inversión).
 * Si preferís los logos reales, están en el repositorio de cada
 * proyecto y basta con reemplazar el archivo y apuntar `image` ahí.
 *
 * El grid se acomoda solo según cuántos haya (ver Portfolio.tsx).
 */
export type PortfolioProject = {
  name: string;
  description: string;
  href: string;
  category: string;
  applicationCategory: string;
  image: string | null;
};

export const PORTFOLIO_PROJECTS: PortfolioProject[] = [
  {
    name: "Firmiu",
    description:
      "Plataforma SaaS de firma digital para empresas. Nuestro proyecto propio más consolidado.",
    href: "https://firmiu.com",
    category: "SaaS",
    applicationCategory: "BusinessApplication",
    image: "/portfolio/firmiu-icon.svg",
  },
  {
    name: "botAgedrez",
    description:
      "Ajedrez online contra la máquina, con motor e inteligencia artificial propios: cuatro niveles de dificultad, sistema ELO y logros.",
    href: "https://botagedrez.codezun.com",
    category: "Juego web",
    applicationCategory: "GameApplication",
    image: "/portfolio/botagedrez-icon.svg",
  },
  {
    name: "GeneCV",
    description:
      "Generador de currículums gratuito, con plantillas compatibles con ATS, formatos para Europa, Latinoamérica y el mundo anglosajón, y exportación a PDF.",
    href: "https://genecv.codezun.com",
    category: "Herramienta web",
    applicationCategory: "BusinessApplication",
    image: "/portfolio/genecv-icon.svg",
  },
  {
    name: "Petnote",
    description:
      "Historial de salud de mascotas en un solo sitio: vacunas, peso, documentos y un modo emergencia con código QR que muestra los datos críticos a quien la encuentre.",
    href: "https://petnote.codezun.com",
    category: "SaaS",
    applicationCategory: "HealthApplication",
    image: "/portfolio/petnote-icon.svg",
  },
  {
    name: "Memecoin Plaza",
    description:
      "Precios de meme coins en tiempo real y foro de la comunidad: veinte monedas, gráficos históricos, cuentas y comentarios.",
    href: "https://memecoin.codezun.com",
    category: "Comunidad",
    applicationCategory: "FinanceApplication",
    image: "/portfolio/memecoin-icon.svg",
  },
  {
    name: "Calzix",
    description:
      "Más de 270 calculadoras online gratuitas, de matemáticas y finanzas a obra, energía solar y consumo del hogar. Todo se calcula en el navegador.",
    href: "https://calzix.com",
    category: "Calculadoras",
    applicationCategory: "UtilitiesApplication",
    image: "/portfolio/calzix-icon.svg",
  },
  {
    name: "ToolsFoto",
    description:
      "Más de 240 herramientas para imagen, PDF, vídeo, audio y desarrollo. Los archivos se procesan en el navegador y nunca salen del dispositivo.",
    href: "https://toolsfoto.com",
    category: "Herramientas",
    applicationCategory: "MultimediaApplication",
    image: "/portfolio/toolsfoto-icon.svg",
  },
  {
    name: "CalcFit",
    description:
      "Dieciocho calculadoras de salud y composición corporal con las fórmulas citadas: IMC, calorías diarias, grasa corporal, macros y 1RM.",
    href: "https://calcfit.com",
    category: "Salud",
    applicationCategory: "HealthApplication",
    image: "/portfolio/calcfit-icon.svg",
  },
  {
    name: "Inversax",
    description:
      "Comparador de brókers para inversores de habla hispana, con más de cien calculadoras financieras y guías por país.",
    href: "https://inversax.com",
    category: "Finanzas",
    applicationCategory: "FinanceApplication",
    image: "/portfolio/inversax-icon.svg",
  },
  {
    name: "Grupo Z&H",
    description:
      "Sitio de una firma de servicios contables en Honduras: servicios, blog y páginas de SEO local por ciudad, generado estático.",
    href: "https://grupozh.net",
    category: "Sitio web",
    applicationCategory: "BusinessApplication",
    image: "/portfolio/grupozh-icon.svg",
  },
];
