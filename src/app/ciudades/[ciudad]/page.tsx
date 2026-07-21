import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { ArrowLeft, MapPin } from "lucide-react";
import FadeIn from "@/components/FadeIn";
import Services from "@/components/Services";
import Contact from "@/components/Contact";
import { CITIES } from "@/lib/cities";

export async function generateStaticParams() {
  return CITIES.map((city) => ({ ciudad: city.slug }));
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ ciudad: string }>;
}): Promise<Metadata> {
  const { ciudad } = await params;
  const city = CITIES.find((c) => c.slug === ciudad);
  if (!city) return {};

  const title = `Desarrollo de software en ${city.name}, Honduras`;
  const description = `Sitios web, tiendas online, landing pages y plataformas SaaS a medida para negocios en ${city.name}, Honduras. Trabajamos de forma 100% remota.`;

  return {
    title,
    description,
    alternates: { canonical: `/ciudades/${city.slug}` },
    openGraph: { title, description, url: `/ciudades/${city.slug}` },
  };
}

export default async function CiudadPage({
  params,
}: {
  params: Promise<{ ciudad: string }>;
}) {
  const { ciudad } = await params;
  const city = CITIES.find((c) => c.slug === ciudad);
  if (!city) notFound();

  const otherCities = CITIES.filter((c) => c.slug !== city.slug);

  return (
    <>
      <section className="bg-white py-16 sm:py-24">
        <div className="mx-auto max-w-3xl px-6">
          <Link
            href="/ciudades"
            className="inline-flex items-center gap-1.5 text-sm font-medium text-primary hover:text-primary/80"
          >
            <ArrowLeft size={16} />
            Ver todas las ciudades
          </Link>

          <FadeIn>
            <span className="mt-6 inline-flex items-center gap-2 rounded-full bg-secondary px-4 py-1.5 text-sm font-medium text-dark">
              <MapPin size={16} />
              {city.department}, Honduras
            </span>

            <h1 className="mt-4 text-3xl font-bold tracking-tight text-dark sm:text-4xl">
              Desarrollo de software en {city.name}
            </h1>

            <div className="mt-8 space-y-5 text-lg leading-relaxed text-foreground/70">
              {city.intro.map((paragraph, index) => (
                <p key={index}>{paragraph}</p>
              ))}
            </div>
          </FadeIn>

          {otherCities.length > 0 && (
            <FadeIn delay={0.1} className="mt-10 border-t border-black/5 pt-6">
              <p className="text-sm text-foreground/50">
                También atendemos en:{" "}
                {otherCities.map((c, index) => (
                  <span key={c.slug}>
                    <Link
                      href={`/ciudades/${c.slug}`}
                      className="text-primary underline underline-offset-2 hover:text-primary/80"
                    >
                      {c.name}
                    </Link>
                    {index < otherCities.length - 1 ? ", " : ""}
                  </span>
                ))}
              </p>
            </FadeIn>
          )}
        </div>
      </section>

      <Services />
      <Contact />
    </>
  );
}
