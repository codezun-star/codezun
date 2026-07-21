import type { Metadata } from "next";
import Link from "next/link";
import { ArrowRight, Globe } from "lucide-react";
import FadeIn from "@/components/FadeIn";
import { COUNTRIES } from "@/lib/cities";

export const metadata: Metadata = {
  title: "Desarrollo de software por país",
  description:
    "Codezun desarrolla sitios web, tiendas online, landing pages y plataformas SaaS para negocios en distintos países. Empezamos por Honduras, y seguimos sumando países.",
  alternates: { canonical: "/ciudades" },
};

export default function PaisesPage() {
  return (
    <section className="bg-white py-16 sm:py-24">
      <div className="mx-auto max-w-4xl px-6">
        <FadeIn>
          <h1 className="text-3xl font-bold tracking-tight text-dark sm:text-4xl">
            Desarrollo de software por país
          </h1>
          <p className="mt-4 text-lg text-foreground/70">
            Trabajamos de forma 100% remota y atendemos clientes en todo
            el mundo. Estas páginas son nuestra estrategia de contenido
            local: por ahora arrancamos con Honduras, y iremos sumando
            más países.
          </p>
        </FadeIn>

        <div className="mt-12 grid gap-6 sm:grid-cols-2">
          {COUNTRIES.map((country, index) => (
            <FadeIn key={country.slug} delay={index * 0.1}>
              <Link
                href={`/ciudades/${country.slug}`}
                className="group flex h-full flex-col rounded-2xl bg-white p-6 ring-1 ring-black/5 transition-shadow hover:shadow-lg"
              >
                <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-primary/10 text-primary">
                  <Globe size={20} />
                </div>
                <h2 className="mt-4 flex items-center gap-2 text-xl font-semibold text-dark">
                  {country.name}
                  <ArrowRight
                    size={18}
                    className="shrink-0 text-primary transition-transform group-hover:translate-x-1"
                  />
                </h2>
                <p className="mt-1 text-sm text-foreground/50">
                  {country.cities.length}{" "}
                  {country.cities.length === 1 ? "ciudad" : "ciudades"}
                </p>
              </Link>
            </FadeIn>
          ))}
        </div>
      </div>
    </section>
  );
}
