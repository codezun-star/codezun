import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { ArrowLeft } from "lucide-react";
import Prose from "@/components/Prose";
import { getAllPosts, getPostBySlug, formatPostDate } from "@/lib/blog";
import { SITE_NAME, SITE_URL } from "@/lib/site-config";

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

  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "Article",
    headline: post.title,
    description: post.description,
    datePublished: post.date,
    inLanguage: "es-HN",
    author: { "@type": "Organization", name: SITE_NAME },
    publisher: { "@type": "Organization", name: SITE_NAME },
    mainEntityOfPage: `${SITE_URL}/blog/${post.slug}`,
  };

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
          {formatPostDate(post.date)}
        </p>

        <Prose className="mt-10" html={post.contentHtml} />
      </div>

      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />
    </section>
  );
}
