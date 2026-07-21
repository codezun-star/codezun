import type { Metadata } from "next";
import Link from "next/link";
import { ArrowRight } from "lucide-react";
import FadeIn from "@/components/FadeIn";
import { getAllPosts, formatPostDate } from "@/lib/blog";

export const metadata: Metadata = {
  title: "Blog",
  description:
    "Artículos sobre desarrollo de software, tiendas online, landing pages y SaaS para negocios en Honduras.",
};

export default function BlogPage() {
  const posts = getAllPosts();

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
      </div>
    </section>
  );
}
