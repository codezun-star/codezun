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
 * - href: link al proyecto (dejar "#" si todavía no está publicado)
 * - image: ruta a una imagen/logo en /public (ej: "/portfolio/mi-app.png").
 *          Si se deja null se muestra un bloque con las iniciales como
 *          placeholder visual.
 *
 * No hay límite de proyectos: el grid se acomoda solo.
 */
export type PortfolioProject = {
  name: string;
  description: string;
  href: string;
  image: string | null;
};

export const PORTFOLIO_PROJECTS: PortfolioProject[] = [
  {
    name: "Proyecto 1",
    description:
      "Descripción corta del proyecto: qué problema resuelve y para quién está pensado.",
    href: "#",
    image: null,
  },
  {
    name: "Proyecto 2",
    description:
      "Descripción corta del proyecto: qué problema resuelve y para quién está pensado.",
    href: "#",
    image: null,
  },
  {
    name: "Proyecto 3",
    description:
      "Descripción corta del proyecto: qué problema resuelve y para quién está pensado.",
    href: "#",
    image: null,
  },
  {
    name: "Proyecto 4",
    description:
      "Descripción corta del proyecto: qué problema resuelve y para quién está pensado.",
    href: "#",
    image: null,
  },
];
