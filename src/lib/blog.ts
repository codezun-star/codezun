import fs from "node:fs";
import path from "node:path";
import matter from "gray-matter";
import { marked } from "marked";
import type { FaqItem } from "./faq";

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
 *   updated: "YYYY-MM-DD"   # opcional; ver abajo
 *   keywords:
 *     - palabra clave 1
 *     - palabra clave 2
 *   faq:                     # opcional; ver abajo
 *     - question: "¿Pregunta concreta?"
 *       answer: "Respuesta que se entiende sin haber leído el artículo."
 *   ---
 *
 * El nombre del archivo (sin .md) se usa como slug de la URL
 * (/blog/nombre-del-archivo). El resto del archivo es el cuerpo en
 * markdown normal.
 *
 * `updated` es la fecha de la última revisión de fondo del artículo, y solo
 * hay que tocarla cuando el contenido cambie de verdad. Alimenta el
 * `dateModified` del esquema y el `lastModified` del sitemap: lo que mira un
 * buscador para decidir si vuelve a rastrear una página que ya conoce. Si no
 * está, se usa `date`, que es lo honesto para un artículo sin revisar.
 *
 * `faq` es el bloque de preguntas del final del artículo. Se pinta en la
 * página y se declara como `FAQPage`, que es el formato del que un motor de
 * respuestas extrae una respuesta directa sin tener que interpretar el cuerpo
 * entero. Cada respuesta tiene que sostenerse sola: se cita suelta, fuera de
 * la página, así que una que empiece con "como vimos antes" no sirve.
 */

const BLOG_DIR = path.join(process.cwd(), "content/blog");

export type BlogPostMeta = {
  slug: string;
  title: string;
  description: string;
  date: string;
  /** Fecha de la última revisión. Cae a `date` cuando el artículo no se ha revisado. */
  updated: string;
  keywords: string[];
};

export type BlogPost = BlogPostMeta & {
  contentHtml: string;
  faq: FaqItem[];
};

function getSlugs(): string[] {
  return fs
    .readdirSync(BLOG_DIR)
    .filter((file) => file.endsWith(".md"))
    .map((file) => file.replace(/\.md$/, ""));
}

/**
 * El frontmatter lo escribimos nosotros, pero un `faq:` mal indentado en
 * markdown llega como cualquier cosa. Se descarta lo que no tenga las dos
 * mitades en lugar de emitir una pregunta sin respuesta en el esquema.
 */
function parseFaq(raw: unknown): FaqItem[] {
  if (!Array.isArray(raw)) return [];

  return raw.flatMap((entry) => {
    if (typeof entry !== "object" || entry === null) return [];
    const { question, answer } = entry as Record<string, unknown>;
    if (typeof question !== "string" || typeof answer !== "string") return [];
    if (!question.trim() || !answer.trim()) return [];
    return [{ question: question.trim(), answer: answer.trim() }];
  });
}

function parseMeta(slug: string, data: Record<string, unknown>): BlogPostMeta {
  const date = data.date as string;
  return {
    slug,
    title: data.title as string,
    description: data.description as string,
    date,
    updated: (data.updated as string) ?? date,
    keywords: (data.keywords as string[]) ?? [],
  };
}

export function getAllPosts(): BlogPostMeta[] {
  return getSlugs()
    .map((slug) => {
      const raw = fs.readFileSync(path.join(BLOG_DIR, `${slug}.md`), "utf8");
      const { data } = matter(raw);
      return parseMeta(slug, data);
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
    ...parseMeta(slug, data),
    contentHtml,
    faq: parseFaq(data.faq),
  };
}
