/**
 * Precios de referencia, en lempiras.
 *
 * TODO: completar los montos. Mientras un valor sea `null`, no se inventa
 * nada: la sección que depende de él no se muestra en el sitio, la pregunta
 * frecuente sobre precios sigue diciendo que se cotiza caso por caso y
 * /llms.txt sigue diciendo que Codezun no publica tarifas.
 *
 * - La tabla "Precios de referencia" solo aparece cuando están definidos
 *   los cuatro montos de proyecto: una tabla a medias da a entender que el
 *   tipo de proyecto que falta no se ofrece.
 * - La sección de mantenimiento solo aparece cuando está definido su monto.
 *
 * Los montos son "desde": el piso de cada tipo de proyecto, no el precio
 * final. Escribirlos como número entero, sin separadores (25000, no
 * "25,000").
 */

// TODO: monto mínimo de una landing page, en lempiras.
const PRICE_LANDING_PAGE: number | null = null;
// TODO: monto mínimo de un sitio web completo, en lempiras.
const PRICE_WEBSITE: number | null = null;
// TODO: monto mínimo de una tienda online, en lempiras.
const PRICE_ONLINE_STORE: number | null = null;
// TODO: monto mínimo de un sistema a medida, en lempiras.
const PRICE_CUSTOM_SYSTEM: number | null = null;
// TODO: monto mensual del mantenimiento, en lempiras.
const PRICE_MAINTENANCE_MONTHLY: number | null = null;

export type PriceRow = {
  project: string;
  description: string;
  from: number;
};

type DraftPriceRow = Omit<PriceRow, "from"> & { from: number | null };

const DRAFT_PRICES: DraftPriceRow[] = [
  {
    project: "Landing page",
    description: "Una página enfocada en una sola acción: campañas y lanzamientos.",
    from: PRICE_LANDING_PAGE,
  },
  {
    project: "Sitio web completo",
    description: "Varias secciones: servicios, empresa, contacto y blog.",
    from: PRICE_WEBSITE,
  },
  {
    project: "Tienda online",
    description: "Catálogo, carrito y pedidos en línea.",
    from: PRICE_ONLINE_STORE,
  },
  {
    project: "Sistema a medida",
    description:
      "Fidelización, paneles administrativos o aplicaciones web instalables.",
    from: PRICE_CUSTOM_SYSTEM,
  },
];

/** Las cuatro filas, o `null` si falta algún monto (la sección se oculta). */
export const PROJECT_PRICES: PriceRow[] | null = DRAFT_PRICES.every(
  (row): row is PriceRow => row.from !== null
)
  ? (DRAFT_PRICES as PriceRow[])
  : null;

/** Lo que incluye el mantenimiento mensual. */
export const MAINTENANCE_INCLUDES = [
  "Alojamiento y base de datos",
  "Respaldos automáticos",
  "Monitoreo del sitio o sistema",
  "Hasta 5 horas al mes de cambios pequeños",
  "Soporte por WhatsApp con respuesta en 24 horas hábiles",
] as const;

/** Monto mensual del mantenimiento, o `null` si no está definido (la sección se oculta). */
export const MAINTENANCE_MONTHLY: number | null = PRICE_MAINTENANCE_MONTHLY;

/** "L 25,000" — formato de Honduras, sin decimales. */
export function formatLempiras(amount: number): string {
  return `L ${new Intl.NumberFormat("es-HN", { maximumFractionDigits: 0 }).format(amount)}`;
}
