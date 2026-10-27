import type { Metadata } from "next";
import Link from "next/link";
import {
  ChartColumn,
  FileSpreadsheet,
  Gift,
  LayoutDashboard,
  QrCode,
  Smartphone,
} from "lucide-react";
import FadeIn from "@/components/FadeIn";
import Faq from "@/components/Faq";
import Breadcrumbs from "@/components/Breadcrumbs";
import JsonLd from "@/components/JsonLd";
import WhatsAppIcon from "@/components/WhatsAppIcon";
import { RESTAURANT_FAQ } from "@/lib/faq";
import { pageMetadata } from "@/lib/metadata";
import { organizationRef } from "@/lib/schema";
import { SITE_URL, whatsappLink } from "@/lib/site-config";

const PATH = "/sistemas-para-restaurantes";
const TITLE = "Sistemas de fidelización para restaurantes y negocios con sucursales";
const DESCRIPTION =
  "Sistema de fidelización a medida para restaurantes y negocios con varias sucursales: compras con código QR, premios por monto acumulado, panel con métricas por sucursal, reportes en Excel y aplicación instalable en el teléfono.";

/** La conversación llega ya con el tema puesto. */
const WHATSAPP_LOYALTY_LINK = whatsappLink(
  "Hola, me interesa un programa de fidelización para mi negocio. ¿Me pueden dar más información?"
);

export const metadata: Metadata = pageMetadata({
  title: TITLE,
  description: DESCRIPTION,
  path: PATH,
});

const FEATURES = [
  {
    icon: QrCode,
    title: "Registro de compras con código QR",
    description:
      "Cada compra se registra escaneando un código QR, en segundos y sin tarjetas de papel que se pierden.",
  },
  {
    icon: Gift,
    title: "Premios por monto acumulado",
    description:
      "El cliente acumula el monto de sus compras y, al llegar a la meta que usted define, recibe su premio.",
  },
  {
    icon: ChartColumn,
    title: "Panel con métricas por sucursal",
    description:
      "Un panel administrativo para ver compras, clientes y premios de cada sucursal por separado.",
  },
  {
    icon: FileSpreadsheet,
    title: "Reportes exportables a Excel",
    description:
      "Descargue los reportes en Excel para revisarlos con su equipo o llevarlos a su contabilidad.",
  },
  {
    icon: Smartphone,
    title: "Instalable como aplicación",
    description:
      "Sus clientes lo instalan en el teléfono desde el navegador, sin pasar por una tienda de aplicaciones.",
  },
];

const STEPS = [
  {
    title: "El cliente se registra",
    description:
      "Desde su teléfono, y lo instala en la pantalla de inicio como una aplicación más.",
  },
  {
    title: "Compra en cualquier sucursal",
    description: "La compra se registra escaneando el código QR.",
  },
  {
    title: "Acumula el monto de sus compras",
    description:
      "El total se suma automáticamente, sin importar en qué sucursal compre.",
  },
  {
    title: "Recibe su premio",
    description:
      "Al llegar al monto que el negocio definió, el premio queda disponible para canjearlo.",
  },
  {
    title: "Usted mide los resultados",
    description:
      "En el panel ve las métricas de cada sucursal y exporta los reportes a Excel.",
  },
];

/*
 * `Service` y no `LocalBusiness`, por lo mismo que en las páginas de ciudad:
 * Codezun no tiene local. El público al que se dirige la página va en
 * `audience`, que es lo que la distingue del catálogo general.
 */
const serviceJsonLd = {
  "@context": "https://schema.org",
  "@type": "Service",
  name: "Sistema de fidelización para restaurantes",
  serviceType: "Sistema de fidelización de clientes",
  description: DESCRIPTION,
  provider: organizationRef,
  audience: {
    "@type": "BusinessAudience",
    name: "Restaurantes y negocios con varias sucursales",
  },
  url: `${SITE_URL}${PATH}`,
};

function WhatsAppButton({ className = "" }: { className?: string }) {
  return (
    <a
      href={WHATSAPP_LOYALTY_LINK}
      target="_blank"
      rel="noopener noreferrer"
      aria-label="Consultar por WhatsApp sobre un programa de fidelización (se abre en una pestaña nueva)"
      data-whatsapp-cta
      className={`inline-flex items-center justify-center gap-2 rounded-full bg-accent px-7 py-3.5 text-base font-semibold text-white shadow-lg shadow-accent/20 transition-all hover:bg-accent/90 hover:shadow-accent/30 ${className}`}
    >
      <WhatsAppIcon size={20} />
      Consultar por WhatsApp
    </a>
  );
}

export default function SistemasParaRestaurantesPage() {
  return (
    <>
      <section className="bg-white pb-16 pt-10 sm:pb-24 sm:pt-14">
        <div className="mx-auto max-w-4xl px-6">
          <Breadcrumbs steps={[{ name: "Sistemas para restaurantes", path: PATH }]} />

          <FadeIn>
            <span className="mt-6 inline-flex items-center gap-2 rounded-full bg-secondary px-4 py-1.5 text-sm font-medium text-dark">
              <LayoutDashboard size={16} />
              Sistemas a medida
            </span>
            <h1 className="mt-4 text-3xl font-bold tracking-tight text-dark sm:text-5xl">
              Sistemas de fidelización para restaurantes y negocios con
              sucursales
            </h1>
            <p className="mt-6 max-w-2xl text-lg leading-relaxed text-foreground/70">
              Premie a los clientes que vuelven y sepa qué pasa en cada
              sucursal. Desarrollamos un sistema de fidelización propio para
              su negocio: compras con código QR, premios por monto acumulado y
              un panel con las métricas de cada sucursal.
            </p>
            <div className="mt-8 flex flex-col gap-3 sm:flex-row sm:items-center">
              <WhatsAppButton />
              <Link
                href="#como-funciona"
                className="inline-flex items-center justify-center rounded-full px-7 py-3.5 text-base font-semibold text-dark ring-1 ring-dark/15 transition-colors hover:bg-secondary/40"
              >
                Ver cómo funciona
              </Link>
            </div>
          </FadeIn>
        </div>
      </section>

      <section aria-labelledby="problema" className="bg-secondary/30 py-16 sm:py-24">
        <div className="mx-auto max-w-4xl px-6">
          <FadeIn>
            <h2
              id="problema"
              className="text-2xl font-bold tracking-tight text-dark sm:text-3xl"
            >
              El problema que resuelve
            </h2>
            <div className="mt-6 space-y-4 text-lg leading-relaxed text-foreground/70">
              <p>
                Muchos restaurantes premian a sus clientes frecuentes con
                tarjetas de sellos de papel: se pierden, se olvidan en casa y
                no dejan ningún dato. El negocio no sabe quiénes son sus
                mejores clientes, cuánto compran ni cada cuánto vuelven.
              </p>
              <p>
                Con varias sucursales el problema crece: cada una lleva su
                propio control, los puntos de una no valen en otra y no hay
                una forma sencilla de comparar cómo le va a cada sucursal.
              </p>
              <p>
                Un sistema de fidelización propio junta todo en un solo
                lugar: el cliente acumula en cualquier sucursal y usted ve los
                números de todas desde un mismo panel.
              </p>
            </div>
          </FadeIn>
        </div>
      </section>

      <section aria-labelledby="que-incluye" className="bg-white py-16 sm:py-24">
        <div className="mx-auto max-w-6xl px-6">
          <FadeIn className="mx-auto max-w-2xl text-center">
            <h2
              id="que-incluye"
              className="text-2xl font-bold tracking-tight text-dark sm:text-3xl"
            >
              Qué incluye
            </h2>
          </FadeIn>

          <div className="carrusel-movil mt-12 grid gap-6 sm:grid-cols-2 lg:grid-cols-6">
            {FEATURES.map((feature, index) => (
              <FadeIn
                key={feature.title}
                delay={index * 0.08}
                /*
                 * Cinco tarjetas en seis columnas: tres arriba (de dos
                 * columnas cada una) y dos abajo, centradas con un desfase
                 * de una columna, para que no quede una suelta.
                 */
                className={`lg:col-span-2 ${index === 3 ? "lg:col-start-2" : ""} ${
                  index === 4 ? "sm:col-span-2 lg:col-span-2" : ""
                }`}
              >
                <div className="h-full rounded-2xl bg-secondary/25 p-6 ring-1 ring-black/5">
                  <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-primary/10 text-primary">
                    <feature.icon size={24} />
                  </div>
                  <h3 className="mt-5 text-lg font-semibold text-dark">
                    {feature.title}
                  </h3>
                  <p className="mt-2 text-sm leading-relaxed text-foreground/70">
                    {feature.description}
                  </p>
                </div>
              </FadeIn>
            ))}
          </div>
        </div>
      </section>

      <section
        id="como-funciona"
        aria-labelledby="como-funciona-titulo"
        className="scroll-mt-24 bg-secondary/30 py-16 sm:py-24"
      >
        <div className="mx-auto max-w-4xl px-6">
          <FadeIn className="text-center">
            <h2
              id="como-funciona-titulo"
              className="text-2xl font-bold tracking-tight text-dark sm:text-3xl"
            >
              Cómo funciona, en 5 pasos
            </h2>
          </FadeIn>

          <ol className="mt-12 space-y-4">
            {STEPS.map((step, index) => (
              <li key={step.title}>
                <FadeIn
                  delay={index * 0.08}
                  className="flex gap-4 rounded-2xl bg-white p-5 shadow-sm ring-1 ring-black/5 sm:p-6"
                >
                  <span
                    aria-hidden="true"
                    className="flex h-10 w-10 shrink-0 items-center justify-center rounded-full bg-dark text-base font-bold text-white"
                  >
                    {index + 1}
                  </span>
                  <div>
                    <h3 className="font-semibold text-dark">{step.title}</h3>
                    <p className="mt-1 text-sm leading-relaxed text-foreground/70">
                      {step.description}
                    </p>
                  </div>
                </FadeIn>
              </li>
            ))}
          </ol>
        </div>
      </section>

      <Faq
        items={RESTAURANT_FAQ}
        title="Preguntas frecuentes sobre sistemas de fidelización"
      />

      <section className="bg-dark py-16 sm:py-20">
        <div className="mx-auto max-w-3xl px-6 text-center">
          <FadeIn>
            <h2 className="text-2xl font-bold tracking-tight text-white sm:text-3xl">
              ¿Quiere un programa de fidelización para su negocio?
            </h2>
            <p className="mt-4 text-lg text-white/70">
              Escríbanos por WhatsApp y cuéntenos cuántas sucursales tiene y
              cómo premia hoy a sus clientes. Le respondemos con una propuesta.
            </p>
            <div className="mt-8 flex flex-col items-center gap-4">
              <WhatsAppButton />
              <Link
                href="/contacto"
                className="text-sm font-medium text-white/80 underline underline-offset-2 hover:text-highlight"
              >
                Prefiero usar el formulario de contacto
              </Link>
            </div>
          </FadeIn>
        </div>
      </section>

      <JsonLd schemas={[serviceJsonLd]} />
    </>
  );
}
