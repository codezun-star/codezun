import type { MetadataRoute } from "next";
import { getAllPosts } from "@/lib/blog";
import { COUNTRIES } from "@/lib/cities";
import { SITE_CONTENT_DATE, SITE_URL } from "@/lib/site-config";

const contentDate = new Date(SITE_CONTENT_DATE);

export default function sitemap(): MetadataRoute.Sitemap {
  const staticRoutes: {
    path: string;
    changeFrequency: MetadataRoute.Sitemap[number]["changeFrequency"];
    priority: number;
    lastModified: Date;
  }[] = [
    // Páginas "agregadoras": reflejan el estado actual del sitio, tiene
    // sentido que su lastModified sea la fecha del build.
    { path: "", changeFrequency: "monthly", priority: 1, lastModified: new Date() },
    { path: "/blog", changeFrequency: "weekly", priority: 0.7, lastModified: new Date() },
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

  const postEntries = getAllPosts().map((post) => ({
    url: `${SITE_URL}/blog/${post.slug}`,
    lastModified: new Date(post.date),
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
