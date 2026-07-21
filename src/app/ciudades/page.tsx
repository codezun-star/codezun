import type { Metadata } from "next";
import Link from "next/link";
import { ArrowRight, MapPin } from "lucide-react";
import FadeIn from "@/components/FadeIn";
import { CITIES } from "@/lib/cities";

export const metadata: Metadata = {
  title: "Desarrollo de software en Honduras por ciudad",
  description:
    "Codezun desarrolla sitios web, tiendas online, landing pages y plataformas SaaS para negocios en las principales ciudades de Honduras.",
};

export default function CiudadesPage() {
  return (
    <section className="bg-white py-16 sm:py-24">
      <div className="mx-auto max-w-4xl px-6">
        <FadeIn>
          <h1 className="text-3xl font-bold tracking-tight text-dark sm:text-4xl">
            Desarrollo de software en Honduras
          </h1>
          <p className="mt-4 text-lg text-foreground/70">
            Trabajamos de forma 100% remota con negocios en toda Honduras.
            Estas son algunas de las ciudades donde ayudamos a construir
            presencia en línea.
          </p>
        </FadeIn>

        <div className="mt-12 grid gap-6 sm:grid-cols-2">
          {CITIES.map((city, index) => (
            <FadeIn key={city.slug} delay={index * 0.1}>
              <Link
                href={`/ciudades/${city.slug}`}
                className="group flex h-full flex-col rounded-2xl bg-white p-6 ring-1 ring-black/5 transition-shadow hover:shadow-lg"
              >
                <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-primary/10 text-primary">
                  <MapPin size={20} />
                </div>
                <h2 className="mt-4 flex items-center gap-2 text-xl font-semibold text-dark">
                  {city.name}
                  <ArrowRight
                    size={18}
                    className="shrink-0 text-primary transition-transform group-hover:translate-x-1"
                  />
                </h2>
                <p className="mt-1 text-sm text-foreground/50">
                  {city.department}, Honduras
                </p>
              </Link>
            </FadeIn>
          ))}
        </div>
      </div>
    </section>
  );
}
