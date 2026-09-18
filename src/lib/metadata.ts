/**
 * Metadatos de página, en un solo constructor.
 *
 * Existe por una regla de Next que es fácil de leer al revés: los campos de
 * `metadata` se heredan de forma **superficial**. `openGraph` y `twitter` son
 * objetos enteros, así que una página que no los declara no hereda "lo que le
 * falte" del layout: hereda el bloque completo del layout, con el título, la
 * descripción y la `url` de la portada dentro. Y una página que sí declara
 * `openGraph` no completa el del layout: lo reemplaza, y pierde `siteName` y
 * `locale` sin que nada avise.
 *
 * Las dos mitades de ese error estaban en el sitio: `/contacto`, `/ciudades`,
 * `/ciudades/[pais]` y las tres páginas legales se anunciaban en redes con el
 * título, la descripción y la URL de la portada —compartir cualquiera de ellas
 * mostraba la portada, porque las redes agrupan por `og:url`—, y las páginas de
 * ciudad y los artículos, que sí declaraban `openGraph`, se quedaban sin
 * `og:site_name` ni `og:locale`. La tarjeta de Twitter era peor: la declaraba
 * solo el layout, así que **todas** las páginas del sitio se anunciaban con el
 * título y la descripción de la portada.
 *
 * De ahí este archivo. Cada página describe lo suyo una sola vez —título,
 * descripción, ruta— y aquí se arma el juego completo: canónica, OpenGraph y
 * Twitter coherentes entre sí. Añadir una página nueva ya no puede olvidarse de
 * ninguno de los tres.
 */
import type { Metadata } from "next";
import { SITE_NAME } from "./site-config";

/**
 * El sufijo de marca que `title.template` del layout añade al `<title>`.
 *
 * La plantilla solo alcanza al `<title>`, no a `og:title` ni a `twitter:title`.
 * Se repite aquí a propósito: que la tarjeta social diga lo mismo que el
 * resultado de búsqueda, marca incluida, es lo que hace reconocible un enlace
 * compartido de un sitio que todavía no lo es.
 */
const TITLE_SUFFIX = ` | ${SITE_NAME}`;

/** `og:locale`. El sitio es español de Honduras, entero. */
const LOCALE = "es_HN";

/**
 * La tarjeta social, en un solo sitio.
 *
 * `src/app/opengraph-image.tsx` y `src/app/blog/[slug]/opengraph-image.tsx`
 * importan estas constantes para declarar su `size`, su `contentType` y su
 * `alt`, de modo que el lienzo que dibujan y lo que se anuncia de él no pueden
 * decir medidas distintas.
 */
export const OG_IMAGE_SIZE = { width: 1200, height: 630 } as const;
export const OG_IMAGE_CONTENT_TYPE = "image/png";
export const SITE_OG_IMAGE_ALT =
  "Codezun — SaaS, e-commerce y sitios web a medida";

/**
 * La tarjeta del sitio, para las páginas que no tienen una propia.
 *
 * Hay que declararla a mano, y esta es la parte contraintuitiva: Next inyecta
 * la imagen que genera `opengraph-image.tsx` dentro del `openGraph` **del
 * segmento donde está el archivo**, que aquí es el layout raíz. Una página que
 * declara su propio `openGraph` reemplaza el del layout —imagen incluida— y se
 * queda sin `og:image`, que es lo que le pasaba a las páginas de ciudad: se
 * compartían sin ninguna imagen.
 */
const SITE_OG_IMAGE = [
  {
    url: "/opengraph-image",
    ...OG_IMAGE_SIZE,
    type: OG_IMAGE_CONTENT_TYPE,
    alt: SITE_OG_IMAGE_ALT,
  },
];

export type PageMetadataInput = {
  /** Título de la página, sin el sufijo de marca: lo añaden la plantilla y este constructor. */
  title: string;
  description: string;
  /** Ruta absoluta desde la raíz ("/blog"). Alimenta la canónica y `og:url`. */
  path: string;
  keywords?: string[];
  /**
   * Solo para artículos: cambia `og:type` a `article` y declara las fechas.
   * Son las mismas que el `Article` de datos estructurados, así que salen del
   * frontmatter del artículo y no de la fecha del despliegue.
   */
  article?: { publishedTime: string; modifiedTime: string };
  /**
   * Imagen social propia. Sin ella se usa la tarjeta genérica del sitio. La
   * declaran los artículos, que tienen una con su título dibujado y necesitan
   * además un `alt` propio —el del archivo de imagen es una constante
   * compartida por las veinte rutas que genera—.
   */
  images?: NonNullable<Metadata["openGraph"]>["images"];
};

export function pageMetadata({
  title,
  description,
  path,
  keywords,
  article,
  images,
}: PageMetadataInput): Metadata {
  const socialTitle = `${title}${TITLE_SUFFIX}`;

  return {
    title,
    description,
    ...(keywords && keywords.length > 0 ? { keywords } : {}),
    alternates: { canonical: path },
    openGraph: {
      type: article ? "article" : "website",
      locale: LOCALE,
      siteName: SITE_NAME,
      url: path,
      title: socialTitle,
      description,
      ...(article
        ? {
            publishedTime: article.publishedTime,
            modifiedTime: article.modifiedTime,
          }
        : {}),
      images: images ?? SITE_OG_IMAGE,
    },
    twitter: {
      card: "summary_large_image",
      title: socialTitle,
      description,
      images: images ?? SITE_OG_IMAGE,
    },
  };
}
