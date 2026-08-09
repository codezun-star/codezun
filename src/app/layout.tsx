import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import FloatingWhatsApp from "@/components/FloatingWhatsApp";
import JsonLd from "@/components/JsonLd";
import Analytics from "@/components/Analytics";
import { SITE_NAME, SITE_URL } from "@/lib/site-config";
import { SITE_DESCRIPTION, organizationSchema } from "@/lib/schema";

const inter = Inter({
  variable: "--font-inter",
  subsets: ["latin"],
});

const TITLE = "Codezun — SaaS, e-commerce y sitios web a medida";
const DESCRIPTION = SITE_DESCRIPTION;

export const metadata: Metadata = {
  metadataBase: new URL(SITE_URL),
  title: {
    default: TITLE,
    template: `%s | ${SITE_NAME}`,
  },
  description: DESCRIPTION,
  keywords: [
    "desarrollo de software",
    "desarrollo web Honduras",
    "SaaS",
    "e-commerce",
    "landing pages",
    "tienda online Honduras",
  ],
  authors: [{ name: SITE_NAME }],
  alternates: {
    canonical: "/",
  },
  openGraph: {
    type: "website",
    locale: "es_HN",
    url: "/",
    siteName: SITE_NAME,
    title: TITLE,
    description: DESCRIPTION,
  },
  twitter: {
    card: "summary_large_image",
    title: TITLE,
    description: DESCRIPTION,
  },
  robots: {
    index: true,
    follow: true,
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="es" className={`${inter.variable} h-full antialiased`}>
      <body className="min-h-full flex flex-col">
        <Navbar />
        <main className="flex-1">{children}</main>
        <Footer />
        <FloatingWhatsApp />
        {/*
          La organización va en el layout porque es la entidad que firma todo
          el sitio: cualquier página, incluida una a la que se llegue desde un
          asistente sin pasar por la portada, tiene que poder decir quién la
          publica. El resto de esquemas son de cada página.
        */}
        <JsonLd schemas={[organizationSchema()]} />
        <Analytics />
      </body>
    </html>
  );
}
