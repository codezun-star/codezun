import type { Metadata } from "next";
import Contact from "@/components/Contact";

export const metadata: Metadata = {
  title: "Contacto",
  description: "Escribinos a codezun@gmail.com o completá el formulario de contacto.",
  alternates: { canonical: "/contacto" },
};

export default function ContactoPage() {
  return <Contact />;
}
