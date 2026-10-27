/**
 * Prueba social: casos de clientes y testimonios.
 *
 * Nada de lo que hay aquí se publica solo por estar escrito. Cada entrada
 * lleva `publicado`, y las secciones de la portada (`ClientCases.tsx` y
 * `Testimonials.tsx`) filtran por esa bandera y desaparecen enteras cuando no
 * queda ninguna. Así un caso puede redactarse antes de tener el permiso del
 * cliente sin que llegue al sitio por accidente.
 *
 * Reglas de contenido (las mismas del resto del sitio):
 * - Solo clientes reales, con su permiso explícito para nombrarlos.
 * - Ninguna cifra de resultados que el cliente no haya confirmado. Si no hay
 *   un resultado medido, `resultado` se deja vacío y no se pinta.
 * - Los testimonios son citas textuales del cliente, nunca redactadas por
 *   nosotros.
 */

export type ClientCase = {
  /** Nombre del cliente tal como quiere aparecer. */
  client: string;
  /** Sector o tipo de negocio ("Restaurante con varias sucursales"). */
  sector: string;
  /** Qué se construyó, en una línea. */
  title: string;
  /** El problema que tenía el negocio antes del proyecto. */
  problem: string;
  /** Lo que se desarrolló. */
  solution: string;
  /** Resultado medido y confirmado por el cliente. Vacío si no lo hay. */
  result: string;
  /** Enlace público al proyecto, si el cliente lo permite. */
  href: string | null;
  /** Solo se muestra con `true`, y solo con permiso del cliente. */
  published: boolean;
};

export type Testimonial = {
  /** Cita textual del cliente. */
  quote: string;
  name: string;
  /** Cargo y empresa ("Gerente, Nicha's Burger"). */
  role: string;
  /** Solo se muestra con `true`, y solo con permiso de quien lo firma. */
  published: boolean;
};

export const CLIENT_CASES: ClientCase[] = [
  {
    // TODO: borrador. Confirmar con el cliente el texto, el permiso para
    // nombrarlo y, si lo hay, un resultado medido. Después: published: true.
    client: "Nicha's Burger",
    sector: "Restaurante con varias sucursales",
    title: "Sistema de fidelización para clientes frecuentes",
    problem:
      "TODO: describir con el cliente cómo premiaban antes a sus clientes frecuentes y qué querían resolver.",
    solution:
      "Un sistema de fidelización propio: cada compra se registra con un código QR, los clientes acumulan premios por monto de compra en cualquier sucursal y el negocio ve las métricas de cada sucursal en un panel administrativo, con reportes exportables a Excel. Se instala en el teléfono como una aplicación.",
    result: "",
    href: null,
    published: false,
  },
];

/** TODO: agregar testimonios reales (cita textual + permiso de quien firma). */
export const TESTIMONIALS: Testimonial[] = [];

export const PUBLISHED_CASES = CLIENT_CASES.filter((item) => item.published);
export const PUBLISHED_TESTIMONIALS = TESTIMONIALS.filter(
  (item) => item.published
);
