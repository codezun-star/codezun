import type { Metadata } from "next";
import { notFound } from "next/navigation";
import Prose from "@/components/Prose";
import Faq from "@/components/Faq";
import Breadcrumbs from "@/components/Breadcrumbs";
import RelatedPosts from "@/components/RelatedPosts";
import JsonLd from "@/components/JsonLd";
import {
  getAllPosts,
  getPostBySlug,
  getRelatedPosts,
  formatPostDate,
} from "@/lib/blog";
import { OG_IMAGE_SIZE, pageMetadata } from "@/lib/metadata";
import { organizationRef } from "@/lib/schema";
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

  return pageMetadata({
    title: post.title,
    description: post.description,
    path: `/blog/${post.slug}`,
    keywords: post.keywords,
    article: { publishedTime: post.date, modifiedTime: post.updated },
    /*
     * La tarjeta social de cada artículo la dibuja `opengraph-image.tsx` de este
     * mismo segmento, y Next la recoge sola. Se declara a mano solo para poder
     * darle un `alt` con el título del artículo: el `alt` del archivo de imagen
     * es una constante compartida por las veinte rutas que genera, así que ahí
     * no puede decir de qué va cada una.
     */
    images: [
      {
        url: `/blog/${post.slug}/opengraph-image`,
        ...OG_IMAGE_SIZE,
        type: "image/png",
        alt: post.title,
      },
    ],
  });
}

export default async function BlogPostPage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const post = getPostBySlug(slug);
  if (!post) notFound();

  const related = getRelatedPosts(post.slug);

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

  return (
    <>
      <section className="bg-white pb-12 pt-10 sm:pb-16 sm:pt-14">
        <div className="mx-auto max-w-3xl px-6">
          <Breadcrumbs
            steps={[
              { name: "Blog", path: "/blog" },
              { name: post.title, path: `/blog/${post.slug}` },
            ]}
          />

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
      </section>

      {/*
        No hay aquí una llamada a la acción: todos los artículos ya cierran con
        la suya, escrita para su tema, dentro del markdown. Un bloque genérico
        detrás de "¿Listo para cotizar tu proyecto?" repite la misma petición
        con peores palabras.

        Las preguntas van antes que los relacionados porque quien llega desde
        una búsqueda suele leerlas en diagonal, y los relacionados son la salida
        para quien todavía está investigando. Para un asistente el orden dentro
        de la página no cuenta: extrae la respuesta del esquema.
      */}
      {post.faq.length > 0 && (
        <Faq items={post.faq} title="Preguntas frecuentes sobre este tema" />
      )}

      <RelatedPosts posts={related} />

      <JsonLd schemas={[articleJsonLd]} />
    </>
  );
}
