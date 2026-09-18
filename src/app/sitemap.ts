import type { MetadataRoute } from "next";
import { getAllPosts } from "@/lib/blog";
import { COUNTRIES } from "@/lib/cities";
import { SITE_CONTENT_DATE, SITE_URL } from "@/lib/site-config";

const contentDate = new Date(SITE_CONTENT_DATE);

export default function sitemap(): MetadataRoute.Sitemap {
  const posts = getAllPosts();

  /*
   * El listado del blog cambia cuando cambia un artículo, así que su fecha es
   * la revisión más reciente de los que enumera. `getAllPosts()` los devuelve
   * ordenados por publicación, no por revisión, de modo que hay que buscar el
   * máximo en lugar de tomar el primero.
   *
   * Antes esto —y la portada— iban con `new Date()`, la hora del despliegue.
   * Eso le dice al buscador que las dos páginas cambian cada vez que se sube
   * cualquier cosa al sitio, y basta con que lo compruebe dos veces y encuentre
   * el mismo HTML para que deje de creerse las fechas del sitemap entero,
   * incluidas las de los artículos, que sí son ciertas.
   */
  const blogDate = posts.reduce((latest, post) => {
    const updated = new Date(post.updated);
    return updated > latest ? updated : latest;
  }, contentDate);

  const staticRoutes: {
    path: string;
    changeFrequency: MetadataRoute.Sitemap[number]["changeFrequency"];
    priority: number;
    lastModified: Date;
  }[] = [
    // La portada la fechan sus propios contenidos (servicios, portafolio,
    // preguntas frecuentes), que es lo que gobierna SITE_CONTENT_DATE.
    { path: "", changeFrequency: "monthly", priority: 1, lastModified: contentDate },
    { path: "/blog", changeFrequency: "weekly", priority: 0.7, lastModified: blogDate },
    // Contenido estático: usa la fecha real de la última edición
    // (SITE_CONTENT_DATE), no la fecha de cada build.
    { path: "/contacto", changeFrequency: "yearly", priority: 0.6, lastModified: contentDate },
    { path: "/ciudades", changeFrequency: "yearly", priority: 0.5, lastModified: contentDate },
    { path: "/terminos-y-condiciones", changeFrequency: "yearly", priority: 0.2, lastModified: contentDate },
    { path: "/politica-de-privacidad", changeFrequency: "yearly", priority: 0.2, lastModified: contentDate },
    { path: "/aviso-legal", changeFrequency: "yearly", priority: 0.2, lastModified: contentDate },
  ];

  const staticEntries = staticRoutes.map(({ path, changeFrequency, priority, lastModified }) => ({
    url: `${SITE_URL}${path}`,
    lastModified,
    changeFrequency,
    priority,
  }));

  // La fecha de la última revisión del artículo, no la de publicación: es la
  // que le dice al buscador que un artículo que ya rastreó ha cambiado.
  const postEntries = posts.map((post) => ({
    url: `${SITE_URL}/blog/${post.slug}`,
    lastModified: new Date(post.updated),
    changeFrequency: "monthly" as const,
    priority: 0.6,
  }));

  const countryEntries = COUNTRIES.map((country) => ({
    url: `${SITE_URL}/ciudades/${country.slug}`,
    lastModified: contentDate,
    changeFrequency: "yearly" as const,
    priority: 0.5,
  }));

  const cityEntries = COUNTRIES.flatMap((country) =>
    country.cities.map((city) => ({
      url: `${SITE_URL}/ciudades/${country.slug}/${city.slug}`,
      lastModified: contentDate,
      changeFrequency: "yearly" as const,
      priority: 0.5,
    }))
  );

  return [...staticEntries, ...postEntries, ...countryEntries, ...cityEntries];
}
