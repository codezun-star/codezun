/**
 * Páginas locales por país y ciudad, para SEO local.
 *
 * Codezun atiende clientes en todo el mundo (somos 100% remotos), pero
 * la estrategia de contenido local (estas páginas) arranca país por
 * país. Por ahora solo está Honduras. Para agregar un país nuevo más
 * adelante, sumá otro objeto a COUNTRIES con sus ciudades; las rutas
 * en /ciudades se generan automáticamente a partir de esta lista, no
 * hace falta tocar el código de las páginas.
 *
 * Elegimos estas 4 ciudades de Honduras por ser, en general, las más
 * grandes y económicamente relevantes del país.
 */
export type City = {
  slug: string;
  name: string;
  region: string;
  intro: string[];
};

export type Country = {
  slug: string;
  name: string;
  cities: City[];
};

export const COUNTRIES: Country[] = [
  {
    slug: "honduras",
    name: "Honduras",
    cities: [
      {
        slug: "tegucigalpa",
        name: "Tegucigalpa",
        region: "Francisco Morazán",
        intro: [
          "Tegucigalpa, capital de Honduras y cabecera del departamento de Francisco Morazán, concentra buena parte de la actividad comercial, profesional y gubernamental del país. Bufetes de abogados, clínicas, universidades, constructoras, comercios y proveedores de servicios profesionales conviven en una ciudad donde captar clientes es, cada vez más, una tarea digital.",
          "En una ciudad tan grande, con tráfico y distancias que dificultan moverse de un lado a otro, cada vez más personas prefieren buscar e investigar en línea antes de decidir a qué negocio acudir. Tener un sitio web claro, con información de contacto visible y presencia en buscadores, puede ser la diferencia entre ser encontrado por un cliente potencial, o perderlo frente a un competidor con mejor presencia digital.",
          "En Codezun trabajamos de forma 100% remota, por lo que podemos ayudar a negocios en Tegucigalpa a desarrollar sitios web, tiendas online, landing pages y plataformas SaaS a medida, sin importar si tu negocio está en el centro histórico, en Comayagüela o en las colonias del sur de la ciudad.",
          "Si tu negocio en Tegucigalpa ofrece servicios profesionales, buscás vender productos en línea, o necesitás una landing page para una campaña puntual, podemos ayudarte a definir la solución que mejor se ajuste a tu presupuesto y tus objetivos.",
        ],
      },
      {
        slug: "san-pedro-sula",
        name: "San Pedro Sula",
        region: "Cortés",
        intro: [
          "San Pedro Sula, en el departamento de Cortés, es reconocida como uno de los centros industriales y comerciales más importantes de Honduras. La ciudad concentra fábricas, zonas industriales, empresas de manufactura, comercio y servicios financieros, y es un punto de referencia para el comercio del país.",
          "En un entorno tan orientado a los negocios, la presencia en línea deja de ser opcional: empresas que buscan proveedores, distribuidores que necesitan visibilidad, y comercios que quieren vender más allá de su ubicación física, se benefician directamente de tener un sitio web profesional, una tienda en línea o una plataforma que organice sus procesos internos.",
          "En Codezun trabajamos de forma remota, lo que nos permite ayudar a negocios en San Pedro Sula a construir sitios web, tiendas online y soluciones de software a medida, pensadas para el ritmo de una ciudad tan activa comercialmente.",
          "Ya sea que necesites un sitio institucional para tu empresa, una tienda online para vender tus productos, o un sistema a medida que resuelva un proceso específico de tu operación, podemos ayudarte a definir la mejor solución.",
        ],
      },
      {
        slug: "la-ceiba",
        name: "La Ceiba",
        region: "Atlántida",
        intro: [
          "La Ceiba, en el departamento de Atlántida, es la puerta de entrada al Caribe hondureño y a las Islas de la Bahía. Su economía está fuertemente ligada al turismo, con hoteles, operadores de tours, restaurantes y negocios que dependen en buena parte de visitantes nacionales e internacionales.",
          "Para negocios turísticos, la presencia en línea tiene un peso todavía mayor que en otros sectores: la mayoría de los viajeros investigan, comparan y reservan en línea antes de llegar a su destino. Un sitio web claro, con información de servicios y una forma fácil de contactar o reservar, puede ser determinante para captar a ese visitante antes de que elija otra opción.",
          "En Codezun podemos ayudar a negocios en La Ceiba (hoteles, operadores turísticos, restaurantes y comercios) a tener presencia en línea profesional, con sitios web y landing pages pensadas para convertir visitas en reservas o consultas reales.",
          "También trabajamos con negocios locales fuera del sector turístico que buscan vender en línea o simplemente tener una presencia digital sólida en la ciudad.",
        ],
      },
      {
        slug: "choloma",
        name: "Choloma",
        region: "Cortés",
        intro: [
          "Choloma, en el departamento de Cortés, es una de las ciudades de mayor crecimiento poblacional e industrial de Honduras, con una fuerte presencia de parques industriales y empresas manufactureras que forman parte importante de su economía.",
          "Junto a ese sector industrial, Choloma tiene un comercio local en expansión: negocios que atienden a una población que crece rápido y que, cada vez más, busca en internet antes de decidir dónde comprar o a quién contratar. Tener presencia en línea ayuda a estos negocios a diferenciarse en una ciudad donde la competencia también está creciendo.",
          "En Codezun ofrecemos a negocios en Choloma desarrollo de sitios web, tiendas online y plataformas a medida, trabajando de forma 100% remota y adaptándonos a las necesidades reales de cada negocio, sin importar su tamaño.",
          "Si tu negocio en Choloma necesita una presencia en línea profesional, una tienda para vender productos, o un sistema que resuelva un proceso específico, conversemos sobre cómo lograrlo.",
        ],
      },
    ],
  },
];

export function getCountry(countrySlug: string): Country | undefined {
  return COUNTRIES.find((c) => c.slug === countrySlug);
}

export function getCity(
  countrySlug: string,
  citySlug: string
): { country: Country; city: City } | undefined {
  const country = getCountry(countrySlug);
  const city = country?.cities.find((c) => c.slug === citySlug);
  if (!country || !city) return undefined;
  return { country, city };
}

/** Todas las combinaciones país/ciudad, para generateStaticParams. */
export function getAllCityParams(): { pais: string; ciudad: string }[] {
  return COUNTRIES.flatMap((country) =>
    country.cities.map((city) => ({ pais: country.slug, ciudad: city.slug }))
  );
}
