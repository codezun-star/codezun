import Link from "next/link";
import { Mail } from "lucide-react";
import Logo from "./Logo";
import WhatsAppIcon from "./WhatsAppIcon";
import { getAllPosts } from "@/lib/blog";
import { COUNTRIES } from "@/lib/cities";
import {
  CONTACT_EMAIL,
  PORTFOLIO_PROJECTS,
  WHATSAPP_DISPLAY,
  WHATSAPP_LINK,
} from "@/lib/site-config";

const LEGAL_LINKS = [
  { label: "Términos y condiciones", href: "/terminos-y-condiciones" },
  { label: "Política de privacidad", href: "/politica-de-privacidad" },
  { label: "Aviso legal", href: "/aviso-legal" },
];

export default function Footer() {
  const year = new Date().getFullYear();
  const posts = getAllPosts().slice(0, 4);

  return (
    <footer className="bg-dark text-white">
      <div className="mx-auto max-w-6xl px-6 py-12">
        <div className="grid gap-10 sm:grid-cols-2 lg:grid-cols-5">
          <div>
            {/*
              El wordmark del logo usa azul oscuro, que pierde contraste
              sobre este fondo oscuro. Lo mostramos sobre una placa
              blanca para mantenerlo legible sin necesitar una versión
              del logo pensada para fondos oscuros.
            */}
            <div className="inline-block rounded-xl bg-white px-4 py-3">
              <Logo className="h-10" />
            </div>
            <p className="mt-3 max-w-xs text-sm text-white/70">
              SaaS, e-commerce y sitios web a medida.
            </p>

            {/*
              Los productos propios, enlazados desde el pie y por tanto
              desde todas las páginas del sitio. Es lo que convierte un
              enlace suelto en la portada en una señal constante: el
              portafolio los menciona una vez, esto los respalda en cada
              artículo y en cada página de ciudad.

              Van sin `nofollow` y sin `noreferrer` por lo mismo que en
              Portfolio.tsx: son proyectos propios y el enlace debe
              transmitir autoridad y dejar rastro del origen.
            */}
            <h3 className="mt-8 text-sm font-semibold uppercase tracking-wide text-white/60">
              Proyectos
            </h3>
            <ul className="mt-4 space-y-2">
              {PORTFOLIO_PROJECTS.map((project) => (
                <li key={project.href}>
                  <a
                    href={project.href}
                    target="_blank"
                    rel="noopener"
                    className="text-sm text-white/80 transition-colors hover:text-highlight"
                  >
                    {project.name}
                  </a>
                </li>
              ))}
            </ul>
          </div>

          <div>
            <h3 className="text-sm font-semibold uppercase tracking-wide text-white/60">
              Legal
            </h3>
            <ul className="mt-4 space-y-2">
              {LEGAL_LINKS.map((link) => (
                <li key={link.href}>
                  <Link
                    href={link.href}
                    className="text-sm text-white/80 transition-colors hover:text-highlight"
                  >
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          <div>
            <h3 className="text-sm font-semibold uppercase tracking-wide text-white/60">
              Blog
            </h3>
            <ul className="mt-4 space-y-2">
              {posts.map((post) => (
                <li key={post.slug}>
                  <Link
                    href={`/blog/${post.slug}`}
                    className="text-sm text-white/80 transition-colors hover:text-highlight"
                  >
                    {post.title}
                  </Link>
                </li>
              ))}
              <li>
                <Link
                  href="/blog"
                  className="text-sm font-medium text-highlight hover:text-highlight/80"
                >
                  Ver todos los artículos
                </Link>
              </li>
            </ul>
          </div>

          <div>
            <h3 className="text-sm font-semibold uppercase tracking-wide text-white/60">
              Ciudades
            </h3>
            <ul className="mt-4 space-y-2">
              {COUNTRIES.flatMap((country) =>
                country.cities.map((city) => (
                  <li key={`${country.slug}-${city.slug}`}>
                    <Link
                      href={`/ciudades/${country.slug}/${city.slug}`}
                      className="text-sm text-white/80 transition-colors hover:text-highlight"
                    >
                      {city.name}
                    </Link>
                  </li>
                ))
              )}
            </ul>
          </div>

          <div>
            <h3 className="text-sm font-semibold uppercase tracking-wide text-white/60">
              Contacto
            </h3>
            <a
              href={`mailto:${CONTACT_EMAIL}`}
              className="mt-4 flex items-center gap-2 text-sm text-white/80 transition-colors hover:text-highlight"
            >
              <Mail size={16} />
              {CONTACT_EMAIL}
            </a>
            <a
              href={WHATSAPP_LINK}
              target="_blank"
              rel="noopener noreferrer"
              className="mt-2 flex items-center gap-2 text-sm text-white/80 transition-colors hover:text-highlight"
            >
              <WhatsAppIcon size={16} />
              {WHATSAPP_DISPLAY}
            </a>
          </div>
        </div>

        <div className="mt-10 flex flex-col gap-2 border-t border-white/10 pt-6 text-sm text-white/60 sm:flex-row sm:items-center sm:justify-between">
          <span>© {year} Codezun. Todos los derechos reservados.</span>
          {/*
            El enlace a /llms.txt es lo que hace que ese archivo se descubra.
            Su ruta está convenida, pero un rastreador solo la pide si sabe que
            existe, y robots.txt no tiene un campo donde anunciarla.
          */}
          <a
            href="/llms.txt"
            className="transition-colors hover:text-highlight"
            title="Resumen del sitio en texto plano, para modelos de lenguaje"
          >
            llms.txt
          </a>
        </div>
      </div>
    </footer>
  );
}
