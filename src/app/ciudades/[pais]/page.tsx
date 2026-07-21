import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { ArrowLeft, ArrowRight, MapPin } from "lucide-react";
import FadeIn from "@/components/FadeIn";
import { COUNTRIES, getCountry } from "@/lib/cities";

export async function generateStaticParams() {
  return COUNTRIES.map((country) => ({ pais: country.slug }));
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ pais: string }>;
}): Promise<Metadata> {
  const { pais } = await params;
  const country = getCountry(pais);
  if (!country) return {};

  return {
    title: `Desarrollo de software en ${country.name}`,
    description: `Codezun desarrolla sitios web, tiendas online, landing pages y plataformas SaaS para negocios en ${country.name}.`,
    alternates: { canonical: `/ciudades/${country.slug}` },
  };
}

export default async function PaisPage({
  params,
}: {
  params: Promise<{ pais: string }>;
}) {
  const { pais } = await params;
  const country = getCountry(pais);
  if (!country) notFound();

  return (
    <section className="bg-white py-16 sm:py-24">
      <div className="mx-auto max-w-4xl px-6">
        <Link
          href="/ciudades"
          className="inline-flex items-center gap-1.5 text-sm font-medium text-primary hover:text-primary/80"
        >
          <ArrowLeft size={16} />
          Ver todos los países
        </Link>

        <FadeIn>
          <h1 className="mt-6 text-3xl font-bold tracking-tight text-dark sm:text-4xl">
            Desarrollo de software en {country.name}
          </h1>
          <p className="mt-4 text-lg text-foreground/70">
            Trabajamos de forma 100% remota con negocios en {country.name}.
            Estas son algunas de las ciudades donde ayudamos a construir
            presencia en línea.
          </p>
        </FadeIn>

        <div className="mt-12 grid gap-6 sm:grid-cols-2">
          {country.cities.map((city, index) => (
            <FadeIn key={city.slug} delay={index * 0.1}>
              <Link
                href={`/ciudades/${country.slug}/${city.slug}`}
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
                  {city.region}, {country.name}
                </p>
              </Link>
            </FadeIn>
          ))}
        </div>
      </div>
    </section>
  );
}
