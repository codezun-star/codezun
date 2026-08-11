/**
 * Constructores de datos estructurados (JSON-LD).
 *
 * Están centralizados por dos razones.
 *
 * La primera es de identidad: si el nombre, el logo o la URL de la
 * organización se escriben a mano en cada página, tarde o temprano una dice
 * "Codezun" y otra "CodeZun", y tanto un buscador como un asistente las leen
 * como dos entidades distintas. Aquí se declaran una sola vez y el resto de
 * los esquemas apuntan al mismo nodo por `@id`, que es lo que convierte un
 * puñado de bloques sueltos en un grafo: el asistente que lee un artículo
 * puede seguir el `publisher` hasta la organización y saber quién lo firma.
 *
 * La segunda es de extracción. Un motor de respuestas no cita una página, cita
 * un hecho: qué hace la empresa, dónde atiende, cómo se la contacta, qué
 * ofrece. `hasOfferCatalog`, `areaServed`, `knowsAbout` y `contactPoint`
 * declaran justo eso, y sin ellos esos datos solo existen dentro de párrafos
 * que hay que interpretar.
 *
 * Nada de lo que se declara aquí puede ser algo que la página no diga también
 * en texto visible: marcar un dato que el visitante no ve es exactamente lo
 * que penalizan las guías de datos estructurados.
 */
import {
  CONTACT_EMAIL,
  PORTFOLIO_PROJECTS,
  SITE_NAME,
  SITE_URL,
  WHATSAPP_DISPLAY,
} from "./site-config";

/** Identificadores estables del grafo. Se usan para enlazar unos nodos con otros. */
export const ORGANIZATION_ID = `${SITE_URL}/#organizacion`;
export const WEBSITE_ID = `${SITE_URL}/#sitio`;

/** Referencia corta a la organización, para incrustar en otros esquemas. */
export const organizationRef = { "@id": ORGANIZATION_ID } as const;

export const SITE_DESCRIPTION =
  "Codezun es una empresa de desarrollo de software con más de 5 años de experiencia creando productos SaaS, tiendas online, landing pages y sitios web completos. Trabajamos de forma 100% remota con clientes en cualquier parte del mundo.";

/**
 * Los cuatro servicios, en un único lugar.
 *
 * Son los mismos que se listan en `Services.tsx`; viven aquí porque además del
 * bloque visible alimentan el catálogo de la organización, y tener dos listas
 * que se copian a mano acaba con una desactualizada.
 */
export const SERVICE_CATALOG = [
  {
    name: "Productos SaaS",
    description:
      "Plataformas de software como servicio, desde el diseño de la arquitectura hasta el producto final.",
  },
  {
    name: "E-commerce",
    description:
      "Tiendas online a medida, pensadas para vender y para que sean fáciles de mantener.",
  },
  {
    name: "Landing pages",
    description:
      "Páginas de aterrizaje enfocadas en conversión, para lanzar campañas o productos rápido.",
  },
  {
    name: "Sitios web completos",
    description:
      "Sitios institucionales y corporativos completos, a la medida de cada negocio.",
  },
] as const;

/**
 * La organización.
 *
 * `areaServed: Worldwide` no es una fórmula de cortesía: la empresa es 100%
 * remota y las páginas de ciudad son estrategia de contenido, no sedes. Sin
 * este dato, un asistente que encuentre la página de Tegucigalpa concluye que
 * Codezun solo atiende Honduras.
 */
export function organizationSchema(): Record<string, unknown> {
  return {
    "@context": "https://schema.org",
    "@type": "Organization",
    "@id": ORGANIZATION_ID,
    name: SITE_NAME,
    url: `${SITE_URL}/`,
    logo: {
      "@type": "ImageObject",
      url: `${SITE_URL}/logo/logo.png`,
    },
    image: `${SITE_URL}/opengraph-image`,
    description: SITE_DESCRIPTION,
    email: CONTACT_EMAIL,
    telephone: WHATSAPP_DISPLAY,
    areaServed: "Worldwide",
    knowsAbout: [
      "Desarrollo de software a medida",
      "Productos SaaS",
      "Comercio electrónico",
      "Landing pages",
      "Desarrollo web",
    ],
    contactPoint: {
      "@type": "ContactPoint",
      contactType: "customer service",
      email: CONTACT_EMAIL,
      telephone: WHATSAPP_DISPLAY,
      availableLanguage: ["Spanish"],
      areaServed: "Worldwide",
    },
    hasOfferCatalog: {
      "@type": "OfferCatalog",
      name: "Servicios de desarrollo de software",
      itemListElement: SERVICE_CATALOG.map((service) => ({
        "@type": "Offer",
        itemOffered: {
          "@type": "Service",
          name: service.name,
          description: service.description,
          provider: organizationRef,
        },
      })),
    },
  };
}

/**
 * Identidad del sitio. Va en la portada y solo en la portada.
 *
 * De este nodo saca un buscador el nombre con el que rotula el resultado; sin
 * él cae al dominio a secas. Va en la portada porque es donde se lee.
 */
export function webSiteSchema(): Record<string, unknown> {
  return {
    "@context": "https://schema.org",
    "@type": "WebSite",
    "@id": WEBSITE_ID,
    name: SITE_NAME,
    alternateName: "Codezun — desarrollo de software",
    url: `${SITE_URL}/`,
    description: SITE_DESCRIPTION,
    inLanguage: "es",
    publisher: organizationRef,
  };
}

/**
 * Migas de pan.
 *
 * Se pasa la ruta sin el inicio: se añade solo, porque siempre es el mismo y
 * olvidarlo es el error más habitual al escribir este esquema a mano.
 */
export function breadcrumbSchema(
  steps: { name: string; path: string }[]
): Record<string, unknown> {
  const all = [{ name: "Inicio", path: "/" }, ...steps];

  return {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    itemListElement: all.map((step, index) => ({
      "@type": "ListItem",
      position: index + 1,
      name: step.name,
      item: step.path === "/" ? SITE_URL : `${SITE_URL}${step.path}`,
    })),
  };
}

/**
 * Preguntas frecuentes.
 *
 * Es el esquema que más rinde ante un motor de respuestas: le entrega la
 * pregunta y la respuesta ya emparejadas, sin tener que deducir cuál de los
 * párrafos de la página contesta a qué. Requiere que las mismas preguntas y
 * respuestas estén visibles en la página — de ahí que siempre se emita junto
 * al componente que las pinta, nunca por su cuenta.
 */
export function faqSchema(
  items: readonly { question: string; answer: string }[]
): Record<string, unknown> | null {
  if (items.length === 0) return null;

  return {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    mainEntity: items.map((item) => ({
      "@type": "Question",
      name: item.question,
      acceptedAnswer: { "@type": "Answer", text: item.answer },
    })),
  };
}

/**
 * Los productos propios, como entidades enlazadas a la organización.
 *
 * Tres de los cuatro viven en subdominios de codezun.com, y ese es justo el
 * caso en el que un buscador tiende a equivocarse: sin nada que los relacione,
 * `botagedrez.codezun.com` y `codezun.com` son dos sitios que comparten
 * dominio registrable y poco más, o peor, el subdominio aparece rotulado con
 * el nombre del padre. Declarar cada producto con su `url`, su nombre propio y
 * un `publisher`/`author` que apunta por `@id` al mismo nodo de organización
 * dice explícitamente lo que el enlace del portafolio solo insinúa: los hizo
 * Codezun, y Codezun es esta empresa.
 *
 * `SoftwareApplication` y no `Product` porque son aplicaciones web, y esa es
 * la clase que admite `applicationCategory` y `operatingSystem`. Nada de
 * `offers` ni `aggregateRating`: no hay precios publicados ni valoraciones
 * reales que declarar, e inventarlas es exactamente lo que penalizan las
 * guías de datos estructurados.
 *
 * Va en la portada, que es donde está la sección visible que lo respalda.
 */
export function portfolioSchema(): Record<string, unknown> {
  return {
    "@context": "https://schema.org",
    "@type": "ItemList",
    name: `Proyectos propios de ${SITE_NAME}`,
    numberOfItems: PORTFOLIO_PROJECTS.length,
    itemListElement: PORTFOLIO_PROJECTS.map((project, index) => ({
      "@type": "ListItem",
      position: index + 1,
      item: {
        "@type": "SoftwareApplication",
        "@id": `${project.href}/#producto`,
        name: project.name,
        url: `${project.href}/`,
        description: project.description,
        applicationCategory: project.applicationCategory,
        operatingSystem: "Web",
        image: project.image ? `${SITE_URL}${project.image}` : undefined,
        author: organizationRef,
        publisher: organizationRef,
      },
    })),
  };
}

/** Lista ordenada de páginas. Le da al rastreador el catálogo de una tacada. */
export function itemListSchema(
  name: string,
  items: { name: string; path: string }[]
): Record<string, unknown> {
  return {
    "@context": "https://schema.org",
    "@type": "ItemList",
    name,
    numberOfItems: items.length,
    itemListElement: items.map((item, index) => ({
      "@type": "ListItem",
      position: index + 1,
      name: item.name,
      url: `${SITE_URL}${item.path}`,
    })),
  };
}
