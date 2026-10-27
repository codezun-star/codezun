"use client";

import { useEffect, useRef, useState } from "react";
import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";
import { ChevronLeft, Phone, Share } from "lucide-react";
import Logo from "./Logo";
import WhatsAppIcon from "./WhatsAppIcon";
import {
  WHATSAPP_DISPLAY,
  WHATSAPP_LINK,
  WHATSAPP_NUMBER,
} from "@/lib/site-config";

const NAV_LINKS = [
  { label: "Sobre nosotros", href: "/#sobre-nosotros" },
  { label: "Qué hacemos", href: "/#servicios" },
  { label: "Proyectos", href: "/#proyectos" },
  { label: "Blog", href: "/blog" },
  { label: "Contacto", href: "/#contacto" },
];

/**
 * Título de la barra superior en móvil, por primera parte de la ruta. Las
 * rutas que no están aquí (la portada, el 404) muestran el logo.
 */
const MOBILE_TITLES: Record<string, string> = {
  blog: "Blog",
  contacto: "Contacto",
  ciudades: "Ciudades",
  "sistemas-para-restaurantes": "Sistemas para restaurantes",
  "terminos-y-condiciones": "Términos",
  "politica-de-privacidad": "Privacidad",
  "aviso-legal": "Aviso legal",
  offline: "Sin conexión",
};

/**
 * A dónde lleva "atrás" cuando no hay historial dentro del sitio (alguien
 * que entró directo desde Google): del artículo al blog, de la ciudad a su
 * país, del país al índice, y de lo demás a la portada.
 */
function parentPath(pathname: string): string {
  const parts = pathname.split("/").filter(Boolean);
  if (parts.length <= 1) return "/";
  if (parts[0] === "blog" || parts[0] === "ciudades") {
    return `/${parts.slice(0, -1).join("/")}`;
  }
  return "/";
}

/**
 * Navegaciones hechas dentro del sitio en esta pestaña. Si hay alguna,
 * "atrás" vuelve en el historial (conserva el scroll, como en una app);
 * si no, lleva a la sección padre. Vive fuera del componente porque el
 * encabezado está en el layout y no se vuelve a montar al navegar.
 */
let internalNavigations = 0;

/**
 * Encabezado.
 *
 * En escritorio es el menú de siempre. En móvil funciona como la barra
 * superior de una app nativa: en la portada muestra el logo y en el resto
 * un botón "atrás" con el nombre de la sección, y a la derecha llamar (y
 * compartir, en los artículos). El menú completo vive en la pestaña "Más"
 * de la barra inferior (`TabBar.tsx`).
 */
export default function Navbar() {
  const pathname = usePathname();
  const router = useRouter();
  const firstRender = useRef(true);
  const [canShare, setCanShare] = useState(false);

  useEffect(() => {
    if (firstRender.current) {
      firstRender.current = false;
      return;
    }
    internalNavigations += 1;
  }, [pathname]);

  useEffect(() => {
    // eslint-disable-next-line react-hooks/set-state-in-effect -- `navigator.share` solo existe en el navegador
    setCanShare(typeof navigator.share === "function");
  }, []);

  const isHome = pathname === "/";
  const section = pathname.split("/")[1] ?? "";
  const mobileTitle = MOBILE_TITLES[section];
  const isArticle = section === "blog" && pathname !== "/blog";

  function share() {
    const title = document.querySelector("h1")?.textContent?.trim() || document.title;
    navigator.share({ title, url: window.location.href }).catch(() => {});
  }

  return (
    <header
      style={{ viewTransitionName: "cabecera" }}
      className="app-header sticky top-0 z-50 border-b border-secondary/60 bg-white/90 backdrop-blur-md md:bg-white/80">
      <nav className="mx-auto flex h-14 max-w-6xl items-center justify-between gap-2 px-4 md:h-auto md:px-6 md:py-3">
        <div className="flex min-w-0 items-center gap-1">
          {!isHome && (
            <Link
              href={parentPath(pathname)}
              aria-label="Volver"
              className="boton-icono -ml-2 md:hidden"
              onClick={(event) => {
                if (internalNavigations > 0 && window.history.length > 1) {
                  event.preventDefault();
                  router.back();
                }
              }}
            >
              <ChevronLeft size={26} strokeWidth={2.2} aria-hidden="true" />
            </Link>
          )}

          <div className={mobileTitle ? "hidden md:block" : undefined}>
            <Logo priority className="h-10 md:h-16" />
          </div>
          {mobileTitle && (
            <span className="truncate text-lg font-bold tracking-tight text-dark md:hidden">
              {mobileTitle}
            </span>
          )}
        </div>

        <div className="hidden items-center gap-8 md:flex">
          {NAV_LINKS.map((link) => (
            <Link
              key={link.href}
              href={link.href}
              className="text-sm font-medium text-foreground/80 transition-colors hover:text-primary"
            >
              {link.label}
            </Link>
          ))}
          {/*
            "Hablemos" abre WhatsApp, que es la vía más rápida de contacto.
            El formulario sigue en la sección de contacto (enlace "Contacto").
          */}
          <a
            href={WHATSAPP_LINK}
            target="_blank"
            rel="noopener noreferrer"
            aria-label="Hablemos por WhatsApp (se abre en una pestaña nueva)"
            className="inline-flex items-center gap-2 rounded-full bg-accent px-5 py-2 text-sm font-semibold text-white transition-colors hover:bg-accent/90"
          >
            <WhatsAppIcon size={16} />
            Hablemos
          </a>
        </div>

        {/* Acciones de la barra superior en móvil */}
        <div className="-mr-2 flex shrink-0 items-center md:hidden">
          {isArticle && canShare && (
            <button
              type="button"
              onClick={share}
              aria-label="Compartir artículo"
              className="boton-icono"
            >
              <Share size={22} strokeWidth={1.9} aria-hidden="true" />
            </button>
          )}
          <a
            href={`tel:+${WHATSAPP_NUMBER}`}
            aria-label={`Llamar al ${WHATSAPP_DISPLAY}`}
            className="boton-icono"
          >
            <Phone size={22} strokeWidth={1.9} aria-hidden="true" />
          </a>
        </div>
      </nav>
    </header>
  );
}
