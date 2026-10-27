/**
 * Precios de referencia, en lempiras.
 *
 * Mientras un valor sea `null`, la sección que depende de él no se muestra
 * en el sitio, la pregunta frecuente sobre precios dice que se cotiza caso
 * por caso y /llms.txt dice que Codezun no publica tarifas.
 *
 * - La tabla "Precios de referencia" solo aparece cuando están definidos
 *   los cuatro montos de proyecto: una tabla a medias da a entender que el
 *   tipo de proyecto que falta no se ofrece.
 * - La sección de mantenimiento solo aparece cuando está definido su monto.
 *
 * Los montos son "desde": el piso de cada tipo de proyecto, no el precio
 * final. Escribirlos como número entero, sin separadores (25000, no
 * "25,000").
 *
 * Criterio (dueño, 2026-10-27): montos "desde" que no queden por debajo
 * de lo que de verdad se cobra. Un sistema de fidelización completo para
 * varias sucursales se cotiza por encima del piso de "Sistema a medida";
 * el piso es para sistemas más pequeños. Ninguno es un precio fijo: el
 * sitio lo dice junto a la tabla y en el mantenimiento, que depende del
 * sistema que se mantenga.
 *
 * Referencia de mercado (agencias hondureñas, octubre de 2026; dólares a
 * ~L 26.8): sitio básico desde L 8,500 (Todo Web Media); sitio con diseño
 * a medida L 20,000-55,000 (Naranja y Media); tiendas desde L 12,000 en
 * plantilla hasta L 77,700-80,000+ a medida (Codebrand, Naranja y Media);
 * aplicaciones a medida desde $10,000 (Codebrand); mantenimiento desde
 * L 1,200/mes sin hosting (Todo Web Media) o ~L 2,550/mes (Codebrand).
 *
 * Revisar estos montos si el mercado cambia o si no cubren el trabajo
 * real: un "desde" que luego no se respeta resta más confianza que no
 * publicar precios.
 */

const PRICE_LANDING_PAGE: number | null = 8000;
const PRICE_WEBSITE: number | null = 20000;
const PRICE_ONLINE_STORE: number | null = 40000;
const PRICE_CUSTOM_SYSTEM: number | null = 80000;
const PRICE_MAINTENANCE_MONTHLY: number | null = 2500;

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

/**
 * Monto mensual mínimo del mantenimiento ("desde"), o `null` si no está
 * definido (la sección se oculta). El monto real depende del sitio o sistema.
 */
export const MAINTENANCE_MONTHLY: number | null = PRICE_MAINTENANCE_MONTHLY;

/** "L 25,000" — formato de Honduras, sin decimales. */
export function formatLempiras(amount: number): string {
  return `L ${new Intl.NumberFormat("es-HN", { maximumFractionDigits: 0 }).format(amount)}`;
}
