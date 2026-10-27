import Hero from "@/components/Hero";
import About from "@/components/About";
import Services from "@/components/Services";
import Process from "@/components/Process";
import Portfolio from "@/components/Portfolio";
import ClientCases from "@/components/ClientCases";
import Testimonials from "@/components/Testimonials";
import Pricing from "@/components/Pricing";
import Faq from "@/components/Faq";
import Contact from "@/components/Contact";
import JsonLd from "@/components/JsonLd";
import { SITE_FAQ } from "@/lib/faq";
import {
  portfolioSchema,
  professionalServiceSchema,
  webSiteSchema,
} from "@/lib/schema";

export default function Home() {
  return (
    <>
      {/*
        `WebSite` va solo en la portada: es donde un buscador lo lee para
        decidir con qué nombre rotula el sitio. La organización, que firma
        todas las páginas, viaja en el layout.

        La lista de productos acompaña a la sección visible del portafolio:
        enlaza cada subdominio propio con la organización que lo publica.
      */}
      <JsonLd
        schemas={[webSiteSchema(), professionalServiceSchema(), portfolioSchema()]}
      />
      <Hero />
      <About />
      <Services />
      <Process />
      <Portfolio />
      {/*
        Casos, testimonios y precios se ocultan solos mientras sus datos
        (lib/casos.ts, lib/precios.ts) no estén completos y publicados.
      */}
      <ClientCases />
      <Testimonials />
      <Pricing />
      <Faq
        items={SITE_FAQ}
        intro="Lo que más nos preguntan antes de empezar un proyecto."
      />
      <Contact />
    </>
  );
}
