import type { ReactNode } from "react";

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

        <div className="mt-10 space-y-6 text-foreground/80 [&_h2]:mt-8 [&_h2]:text-xl [&_h2]:font-semibold [&_h2]:text-dark [&_p]:leading-relaxed [&_ul]:list-disc [&_ul]:space-y-2 [&_ul]:pl-6 [&_li]:leading-relaxed">
          {children}
        </div>
      </div>
    </section>
  );
}
