import type { Metadata } from "next";
import Contact from "@/components/Contact";
import { pageMetadata } from "@/lib/metadata";
import { CONTACT_EMAIL, WHATSAPP_DISPLAY } from "@/lib/site-config";

export const metadata: Metadata = pageMetadata({
  title: "Contacto",
  description: `Escribinos a ${CONTACT_EMAIL} o por WhatsApp al ${WHATSAPP_DISPLAY} y contanos qué necesitás: sitio web, tienda online, landing page o plataforma SaaS.`,
  path: "/contacto",
});

export default function ContactoPage() {
  return <Contact />;
}
