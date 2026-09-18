import type { Metadata, Viewport } from "next";
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

/**
 * Los metadatos del layout son, a la vez, los de la portada: `page.tsx` no
 * exporta ninguno, así que estos valores son los suyos.
 *
 * Eso tiene una consecuencia que es la razón de que exista `lib/metadata.ts`:
 * `openGraph` y `twitter` se heredan enteros, de modo que una página que no
 * declare los suyos se anuncia en redes como la portada. Cualquier página nueva
 * tiene que construirlos con `pageMetadata()` —no basta con poner `title` y
 * `description`—, que además le pone la canónica.
 */
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

/**
 * Color de la barra del navegador en móvil. Es el azul oscuro de la marca, el
 * mismo del pie y de la sección de contacto, para que el navegador no rompa el
 * borde superior de la página con su gris por defecto.
 */
export const viewport: Viewport = {
  themeColor: "#004E9B",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="es" className={`${inter.variable} h-full antialiased`}>
      <body className="min-h-full flex flex-col">
        {/*
          Salto al contenido. Invisible hasta que se le da el foco con el
          tabulador: sin él, navegar con teclado obliga a recorrer los seis
          enlaces del menú en cada página antes de llegar al texto.
        */}
        <a
          href="#contenido"
          className="sr-only focus:not-sr-only focus:absolute focus:left-4 focus:top-4 focus:z-[60] focus:rounded-full focus:bg-dark focus:px-5 focus:py-2.5 focus:text-sm focus:font-semibold focus:text-white"
        >
          Saltar al contenido
        </a>
        <Navbar />
        <main id="contenido" className="flex-1">
          {children}
        </main>
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
