import type { ReactNode } from "react";
import Prose from "./Prose";

export default function LegalLayout({
  title,
  updatedAt,
  children,
}: {
  title: string;
  updatedAt: string;
  children: ReactNode;
}) {
  return (
    <section className="bg-white py-16 sm:py-24">
      <div className="mx-auto max-w-3xl px-6">
        <h1 className="text-3xl font-bold tracking-tight text-dark sm:text-4xl">
          {title}
        </h1>
        <p className="mt-2 text-sm text-foreground/50">
          Última actualización: {updatedAt}
        </p>

        <Prose className="mt-10">{children}</Prose>
      </div>
    </section>
  );
}
