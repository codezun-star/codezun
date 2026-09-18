import Link from "next/link";
import { ArrowRight } from "lucide-react";
import FadeIn from "./FadeIn";
import { formatPostDate } from "@/lib/blog";
import type { BlogPostMeta } from "@/lib/blog";

/**
 * Bloque de artículos relacionados, al final de un artículo.
 *
 * Es enlazado interno, no relleno: sin él un artículo solo enlaza de vuelta al
 * listado, y los veinte del blog quedan colgando en paralelo sin pasarse señal
 * entre ellos. Quien termina de leer sobre cuánto cuesta una página web suele
 * querer leer cuánto tarda, y tanto el visitante como el rastreador llegan ahí
 * por el mismo enlace.
 *
 * Qué artículos salen lo decide `getRelatedPosts()` en `lib/blog.ts`.
 */
export default function RelatedPosts({ posts }: { posts: BlogPostMeta[] }) {
  if (posts.length === 0) return null;

  return (
    <section
      aria-labelledby="articulos-relacionados"
      className="bg-secondary/25 py-16 sm:py-20"
    >
      <div className="mx-auto max-w-5xl px-6">
        <FadeIn>
          <h2
            id="articulos-relacionados"
            className="text-2xl font-bold tracking-tight text-dark sm:text-3xl"
          >
            Seguí leyendo
          </h2>
        </FadeIn>

        <div className="mt-8 grid gap-5 sm:grid-cols-3">
          {posts.map((post, index) => (
            <FadeIn key={post.slug} delay={index * 0.08}>
              <Link
                href={`/blog/${post.slug}`}
                className="group flex h-full flex-col rounded-2xl bg-white p-5 ring-1 ring-black/5 transition-shadow hover:shadow-lg"
              >
                <p className="text-xs text-foreground/50">
                  <time dateTime={post.date}>{formatPostDate(post.date)}</time>
                </p>
                <h3 className="mt-2 flex items-start gap-1.5 font-semibold leading-snug text-dark">
                  {post.title}
                  <ArrowRight
                    size={16}
                    className="mt-0.5 shrink-0 text-primary transition-transform group-hover:translate-x-1"
                  />
                </h3>
                <p className="mt-2 line-clamp-3 text-sm leading-relaxed text-foreground/70">
                  {post.description}
                </p>
              </Link>
            </FadeIn>
          ))}
        </div>
      </div>
    </section>
  );
}
