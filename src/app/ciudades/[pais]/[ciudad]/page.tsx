import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { MapPin } from "lucide-react";
import FadeIn from "@/components/FadeIn";
import Services from "@/components/Services";
import Faq from "@/components/Faq";
import Contact from "@/components/Contact";
import Breadcrumbs from "@/components/Breadcrumbs";
import JsonLd from "@/components/JsonLd";
import { getAllCityParams, getCity } from "@/lib/cities";
import { cityFaq } from "@/lib/faq";
import { pageMetadata } from "@/lib/metadata";
import { organizationRef } from "@/lib/schema";
import { SITE_URL } from "@/lib/site-config";

export async function generateStaticParams() {
  return getAllCityParams();
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ pais: string; ciudad: string }>;
}): Promise<Metadata> {
  const { pais, ciudad } = await params;
  const found = getCity(pais, ciudad);
  if (!found) return {};
  const { country, city } = found;

  return pageMetadata({
    title: `Desarrollo de software en ${city.name}, ${country.name}`,
    description: `Sitios web, tiendas online, landing pages y plataformas SaaS a medida para negocios en ${city.name}, ${country.name}. Trabajamos de forma 100% remota.`,
    path: `/ciudades/${country.slug}/${city.slug}`,
  });
}

export default async function CiudadPage({
  params,
}: {
  params: Promise<{ pais: string; ciudad: string }>;
}) {
  const { pais, ciudad } = await params;
  const found = getCity(pais, ciudad);
  if (!found) notFound();
  const { country, city } = found;

  const otherCities = country.cities.filter((c) => c.slug !== city.slug);

  const pageUrl = `${SITE_URL}/ciudades/${country.slug}/${city.slug}`;

  /*
   * Usamos "Service" (no "LocalBusiness") porque Codezun trabaja
   * 100% remoto y no tiene oficina física en cada ciudad. LocalBusiness
   * implica una dirección/local físico, que sería falso declarar acá.
   * "Service" + areaServed describe honestamente que ofrecemos el
   * servicio para esa zona, sin inventar presencia física.
   */
  const serviceJsonLd = {
    "@context": "https://schema.org",
    "@type": "Service",
    serviceType: "Desarrollo de software",
    provider: organizationRef,
    areaServed: {
      "@type": "City",
      name: city.name,
      containedInPlace: { "@type": "Country", name: country.name },
    },
    // Que el servicio se presta a distancia forma parte de la respuesta, no es
    // una nota al pie: es lo que impide que un asistente deduzca una oficina
    // en la ciudad a partir del título de la página.
    availableChannel: {
      "@type": "ServiceChannel",
      serviceUrl: `${SITE_URL}/contacto`,
      availableLanguage: ["Spanish"],
    },
    url: pageUrl,
    description: `Sitios web, tiendas online, landing pages y plataformas SaaS a medida para negocios en ${city.name}, ${country.name}. Servicio 100% remoto, sin oficina física en la ciudad.`,
  };

  const faq = cityFaq(country, city);

  return (
    <>
      <section className="bg-white pb-12 pt-10 sm:pb-16 sm:pt-14">
        <div className="mx-auto max-w-3xl px-6">
          <Breadcrumbs
            steps={[
              { name: "Ciudades", path: "/ciudades" },
              { name: country.name, path: `/ciudades/${country.slug}` },
              { name: city.name, path: `/ciudades/${country.slug}/${city.slug}` },
            ]}
          />

          <FadeIn>
            <span className="mt-6 inline-flex items-center gap-2 rounded-full bg-secondary px-4 py-1.5 text-sm font-medium text-dark">
              <MapPin size={16} />
              {city.region}, {country.name}
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
                      href={`/ciudades/${country.slug}/${c.slug}`}
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
      <Faq
        items={faq}
        title={`Preguntas frecuentes sobre desarrollo web en ${city.name}`}
      />
      <Contact />

      <JsonLd schemas={[serviceJsonLd]} />
    </>
  );
}
