import type { Metadata } from "next";
import Link from "next/link";
import { ArrowLeft, ArrowRight } from "lucide-react";
import FadeIn from "@/components/FadeIn";
import { getAllPosts, formatPostDate } from "@/lib/blog";

const PAGE_SIZE = 5;
const BASE_DESCRIPTION =
  "Artículos sobre desarrollo de software, tiendas online, landing pages y SaaS para negocios en Honduras.";

function resolvePage(pageParam: string | undefined, totalPages: number) {
  const requestedPage = Number(pageParam) || 1;
  return Math.min(Math.max(requestedPage, 1), totalPages);
}

export async function generateMetadata({
  searchParams,
}: {
  searchParams: Promise<{ page?: string }>;
}): Promise<Metadata> {
  const { page: pageParam } = await searchParams;
  const totalPages = Math.max(1, Math.ceil(getAllPosts().length / PAGE_SIZE));
  const page = resolvePage(pageParam, totalPages);

  return {
    title: page > 1 ? `Blog — Página ${page}` : "Blog",
    description: BASE_DESCRIPTION,
    alternates: { canonical: page > 1 ? `/blog?page=${page}` : "/blog" },
  };
}

export default async function BlogPage({
  searchParams,
}: {
  searchParams: Promise<{ page?: string }>;
}) {
  const { page: pageParam } = await searchParams;
  const allPosts = getAllPosts();
  const totalPages = Math.max(1, Math.ceil(allPosts.length / PAGE_SIZE));
  const page = resolvePage(pageParam, totalPages);

  const posts = allPosts.slice((page - 1) * PAGE_SIZE, page * PAGE_SIZE);

  return (
    <section className="bg-white py-16 sm:py-24">
      <div className="mx-auto max-w-4xl px-6">
        <FadeIn>
          <h1 className="text-3xl font-bold tracking-tight text-dark sm:text-4xl">
            Blog
          </h1>
          <p className="mt-4 text-lg text-foreground/70">
            Artículos sobre desarrollo de software, tiendas online, landing
            pages y SaaS, pensados para negocios en Honduras.
          </p>
        </FadeIn>

        <div className="mt-12 space-y-6">
          {posts.map((post, index) => (
            <FadeIn key={post.slug} delay={index * 0.08}>
              <Link
                href={`/blog/${post.slug}`}
                className="group block rounded-2xl bg-white p-6 ring-1 ring-black/5 transition-shadow hover:shadow-lg sm:p-8"
              >
                <p className="text-sm text-foreground/50">
                  {formatPostDate(post.date)}
                </p>
                <h2 className="mt-2 flex items-center gap-2 text-xl font-semibold text-dark sm:text-2xl">
                  {post.title}
                  <ArrowRight
                    size={18}
                    className="shrink-0 text-primary transition-transform group-hover:translate-x-1"
                  />
                </h2>
                <p className="mt-3 leading-relaxed text-foreground/70">
                  {post.description}
                </p>
              </Link>
            </FadeIn>
          ))}
        </div>

        {totalPages > 1 && (
          <nav
            aria-label="Paginación del blog"
            className="mt-12 flex items-center justify-between border-t border-black/5 pt-6"
          >
            {page > 1 ? (
              <Link
                href={page === 2 ? "/blog" : `/blog?page=${page - 1}`}
                className="inline-flex items-center gap-1.5 text-sm font-medium text-primary hover:text-primary/80"
              >
                <ArrowLeft size={16} />
                Anterior
              </Link>
            ) : (
              <span />
            )}

            <span className="text-sm text-foreground/50">
              Página {page} de {totalPages}
            </span>

            {page < totalPages ? (
              <Link
                href={`/blog?page=${page + 1}`}
                className="inline-flex items-center gap-1.5 text-sm font-medium text-primary hover:text-primary/80"
              >
                Siguiente
                <ArrowRight size={16} />
              </Link>
            ) : (
              <span />
            )}
          </nav>
        )}
      </div>
    </section>
  );
}
