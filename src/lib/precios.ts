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
 * De dónde salen (pedido del dueño, 2026-10-27: "un poco más bajo que el
 * mercado para capturar clientes"). Precios publicados por agencias
 * hondureñas en octubre de 2026; dólares a ~L 26.8:
 * - Landing page: ninguna agencia publica una tarifa propia; el sitio
 *   básico más barato encontrado es L 8,500 (Todo Web Media, hasta 5
 *   páginas). Una landing es una sola página, así que va por debajo.
 * - Sitio completo: L 15,000 (Todo Web Media "Profesional", hasta 10
 *   páginas con blog), desde L 12,400 (Ingenio), L 20,000-55,000
 *   (Naranja y Media, diseño a medida). ~10 % bajo el de L 15,000.
 * - Tienda online: desde L 12,000 (Todo Web Media), $660 ≈ L 17,700
 *   (Webs.hn Pyme Pro, plataforma), $2,900 ≈ L 77,700 (Codebrand),
 *   L 80,000+ (Naranja y Media). Se deja por encima del sitio completo
 *   para que la tabla sea coherente y por debajo de casi todo el mercado.
 * - Sistema a medida: no hay tarifas de agencias pequeñas para sistemas.
 *   Lo más cercano es el sitio "empresarial" con integraciones de Naranja
 *   y Media (desde L 55,000); ~10 % por debajo. Codebrand cotiza
 *   aplicaciones a medida desde $10,000. Es el monto menos respaldado.
 * - Mantenimiento: desde L 1,200/mes (Todo Web Media, sin hosting, que
 *   cobran aparte) y $95 ≈ L 2,550/mes (Codebrand). El nuestro incluye
 *   alojamiento, base de datos y 5 horas de cambios, así que se compara
 *   con el de Codebrand y va ~14 % por debajo.
 *
 * Revisar estos montos si el mercado cambia o si no cubren el trabajo
 * real: un "desde" que luego no se respeta resta más confianza que no
 * publicar precios.
 */

const PRICE_LANDING_PAGE: number | null = 5900;
const PRICE_WEBSITE: number | null = 13500;
const PRICE_ONLINE_STORE: number | null = 14900;
const PRICE_CUSTOM_SYSTEM: number | null = 49500;
const PRICE_MAINTENANCE_MONTHLY: number | null = 2200;

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
