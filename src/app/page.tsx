import Hero from "@/components/Hero";
import About from "@/components/About";
import Services from "@/components/Services";
import Portfolio from "@/components/Portfolio";
import Faq from "@/components/Faq";
import Contact from "@/components/Contact";
import JsonLd from "@/components/JsonLd";
import { SITE_FAQ } from "@/lib/faq";
import { webSiteSchema } from "@/lib/schema";

export default function Home() {
  return (
    <>
      {/*
        `WebSite` va solo en la portada: es donde un buscador lo lee para
        decidir con qué nombre rotula el sitio. La organización, que firma
        todas las páginas, viaja en el layout.
      */}
      <JsonLd schemas={[webSiteSchema()]} />
      <Hero />
      <About />
      <Services />
      <Portfolio />
      <Faq
        items={SITE_FAQ}
        intro="Lo que más nos preguntan antes de empezar un proyecto."
      />
      <Contact />
    </>
  );
}
