import type { Metadata } from "next";
import Contact from "@/components/Contact";
import JsonLd from "@/components/JsonLd";
import { pageMetadata } from "@/lib/metadata";
import { professionalServiceSchema } from "@/lib/schema";
import { CONTACT_EMAIL, WHATSAPP_DISPLAY } from "@/lib/site-config";

export const metadata: Metadata = pageMetadata({
  title: "Contacto",
  description: `Escríbanos por WhatsApp al ${WHATSAPP_DISPLAY} o a ${CONTACT_EMAIL} y cuéntenos qué necesita: sitio web, tienda online, landing page, plataforma SaaS o sistema a medida.`,
  path: "/contacto",
});

export default function ContactoPage() {
  return (
    <>
      <Contact />
      <JsonLd schemas={[professionalServiceSchema()]} />
    </>
  );
}
