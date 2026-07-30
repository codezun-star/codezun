import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { ArrowLeft } from "lucide-react";
import Prose from "@/components/Prose";
import Faq from "@/components/Faq";
import JsonLd from "@/components/JsonLd";
import { getAllPosts, getPostBySlug, formatPostDate } from "@/lib/blog";
import { breadcrumbSchema, organizationRef } from "@/lib/schema";
import { SITE_URL } from "@/lib/site-config";

export async function generateStaticParams() {
  return getAllPosts().map((post) => ({ slug: post.slug }));
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>;
}): Promise<Metadata> {
  const { slug } = await params;
  const post = getPostBySlug(slug);
  if (!post) return {};

  return {
    title: post.title,
    description: post.description,
    keywords: post.keywords,
    alternates: { canonical: `/blog/${post.slug}` },
    openGraph: {
      title: post.title,
      description: post.description,
      type: "article",
      publishedTime: post.date,
      modifiedTime: post.updated,
      url: `/blog/${post.slug}`,
    },
  };
}

export default async function BlogPostPage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const post = getPostBySlug(slug);
  if (!post) notFound();

  /*
   * `dateModified` no es decorativo: es la señal con la que un buscador —y
   * cada vez más un asistente— decide si un artículo que ya conoce sigue
   * vigente. Cae a `datePublished` cuando el artículo no se ha revisado, que
   * es lo cierto; poner ahí la fecha del build diría que se revisa en cada
   * despliegue, y esa señal se descarta en cuanto se comprueba que es falsa.
   */
  const articleJsonLd = {
    "@context": "https://schema.org",
    "@type": "Article",
    headline: post.title,
    description: post.description,
    image: `${SITE_URL}/blog/${post.slug}/opengraph-image`,
    datePublished: post.date,
    dateModified: post.updated,
    inLanguage: "es",
    keywords: post.keywords.join(", "),
    author: organizationRef,
    publisher: organizationRef,
    isPartOf: { "@type": "Blog", name: "Blog de Codezun", url: `${SITE_URL}/blog` },
    mainEntityOfPage: `${SITE_URL}/blog/${post.slug}`,
  };

  const breadcrumbJsonLd = breadcrumbSchema([
    { name: "Blog", path: "/blog" },
    { name: post.title, path: `/blog/${post.slug}` },
  ]);

  return (
    <section className="bg-white py-16 sm:py-24">
      <div className="mx-auto max-w-3xl px-6">
        <Link
          href="/blog"
          className="inline-flex items-center gap-1.5 text-sm font-medium text-primary hover:text-primary/80"
        >
          <ArrowLeft size={16} />
          Volver al blog
        </Link>

        <h1 className="mt-6 text-3xl font-bold tracking-tight text-dark sm:text-4xl">
          {post.title}
        </h1>
        <p className="mt-2 text-sm text-foreground/50">
          <time dateTime={post.date}>{formatPostDate(post.date)}</time>
          {post.updated !== post.date && (
            <>
              {" · Actualizado el "}
              <time dateTime={post.updated}>{formatPostDate(post.updated)}</time>
            </>
          )}
        </p>

        <Prose className="mt-10" html={post.contentHtml} />
      </div>

      {/*
        El bloque de preguntas va al final del artículo, no al principio: quien
        llega ya leyó el cuerpo, y quien lo cita (un asistente) lo extrae del
        esquema, donde el orden dentro de la página no cuenta.
      */}
      {post.faq.length > 0 && (
        <Faq items={post.faq} title="Preguntas frecuentes sobre este tema" />
      )}

      <JsonLd schemas={[articleJsonLd, breadcrumbJsonLd]} />
    </section>
  );
}
