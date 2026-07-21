import fs from "node:fs";
import path from "node:path";
import matter from "gray-matter";
import { marked } from "marked";

/**
 * Blog interno en markdown.
 *
 * Para agregar un artículo nuevo, creá un archivo .md en /content/blog/
 * con este frontmatter:
 *
 *   ---
 *   title: "Título del artículo"
 *   description: "Meta descripción para SEO (150-160 caracteres)"
 *   date: "YYYY-MM-DD"
 *   keywords:
 *     - palabra clave 1
 *     - palabra clave 2
 *   ---
 *
 * El nombre del archivo (sin .md) se usa como slug de la URL
 * (/blog/nombre-del-archivo). El resto del archivo es el cuerpo en
 * markdown normal.
 */

const BLOG_DIR = path.join(process.cwd(), "content/blog");

export type BlogPostMeta = {
  slug: string;
  title: string;
  description: string;
  date: string;
  keywords: string[];
};

export type BlogPost = BlogPostMeta & {
  contentHtml: string;
};

function getSlugs(): string[] {
  return fs
    .readdirSync(BLOG_DIR)
    .filter((file) => file.endsWith(".md"))
    .map((file) => file.replace(/\.md$/, ""));
}

export function getAllPosts(): BlogPostMeta[] {
  return getSlugs()
    .map((slug) => {
      const raw = fs.readFileSync(path.join(BLOG_DIR, `${slug}.md`), "utf8");
      const { data } = matter(raw);
      return {
        slug,
        title: data.title as string,
        description: data.description as string,
        date: data.date as string,
        keywords: (data.keywords as string[]) ?? [],
      };
    })
    .sort((a, b) => (a.date < b.date ? 1 : -1));
}

export function formatPostDate(dateStr: string): string {
  return new Intl.DateTimeFormat("es-HN", {
    day: "numeric",
    month: "long",
    year: "numeric",
  }).format(new Date(`${dateStr}T00:00:00`));
}

export function getPostBySlug(slug: string): BlogPost | null {
  const filePath = path.join(BLOG_DIR, `${slug}.md`);
  if (!fs.existsSync(filePath)) return null;

  const raw = fs.readFileSync(filePath, "utf8");
  const { data, content } = matter(raw);
  const contentHtml = marked.parse(content) as string;

  return {
    slug,
    title: data.title as string,
    description: data.description as string,
    date: data.date as string,
    keywords: (data.keywords as string[]) ?? [],
    contentHtml,
  };
}
