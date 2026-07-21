import type { MetadataRoute } from "next";
import { getAllPosts } from "@/lib/blog";
import { SITE_URL } from "@/lib/site-config";

export default function sitemap(): MetadataRoute.Sitemap {
  const staticRoutes: {
    path: string;
    changeFrequency: MetadataRoute.Sitemap[number]["changeFrequency"];
    priority: number;
  }[] = [
    { path: "", changeFrequency: "monthly", priority: 1 },
    { path: "/contacto", changeFrequency: "yearly", priority: 0.6 },
    { path: "/blog", changeFrequency: "weekly", priority: 0.7 },
    { path: "/terminos-y-condiciones", changeFrequency: "yearly", priority: 0.2 },
    { path: "/politica-de-privacidad", changeFrequency: "yearly", priority: 0.2 },
    { path: "/aviso-legal", changeFrequency: "yearly", priority: 0.2 },
  ];

  const staticEntries = staticRoutes.map(({ path, changeFrequency, priority }) => ({
    url: `${SITE_URL}${path}`,
    lastModified: new Date(),
    changeFrequency,
    priority,
  }));

  const postEntries = getAllPosts().map((post) => ({
    url: `${SITE_URL}/blog/${post.slug}`,
    lastModified: new Date(post.date),
    changeFrequency: "monthly" as const,
    priority: 0.6,
  }));

  return [...staticEntries, ...postEntries];
}
