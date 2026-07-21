import type { ReactNode } from "react";
import Prose from "./Prose";

/** updatedAt: fecha ISO ("YYYY-MM-DD"), normalmente SITE_CONTENT_DATE. */
export default function LegalLayout({
  title,
  updatedAt,
  children,
}: {
  title: string;
  updatedAt: string;
  children: ReactNode;
}) {
  const formattedDate = new Intl.DateTimeFormat("es-HN", {
    day: "numeric",
    month: "long",
    year: "numeric",
  }).format(new Date(`${updatedAt}T00:00:00`));

  return (
    <section className="bg-white py-16 sm:py-24">
      <div className="mx-auto max-w-3xl px-6">
        <h1 className="text-3xl font-bold tracking-tight text-dark sm:text-4xl">
          {title}
        </h1>
        <p className="mt-2 text-sm text-foreground/50">
          Última actualización: {formattedDate}
        </p>

        <Prose className="mt-10">{children}</Prose>
      </div>
    </section>
  );
}
