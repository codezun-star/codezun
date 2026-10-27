"use client";

import { useEffect, useRef, useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { usePathname } from "next/navigation";
import {
  BookOpen,
  ChevronRight,
  Download,
  FolderKanban,
  House,
  LayoutGrid,
  Mail,
  MapPin,
  MessageSquareText,
  Phone,
  Share,
  Store,
  Tag,
  Workflow,
  X,
  type LucideIcon,
} from "lucide-react";
import WhatsAppIcon from "./WhatsAppIcon";
import { PROJECT_PRICES } from "@/lib/precios";
import {
  CONTACT_EMAIL,
  WHATSAPP_DISPLAY,
  WHATSAPP_LINK,
  WHATSAPP_NUMBER,
} from "@/lib/site-config";

/**
 * Navegación tipo app nativa en el teléfono: barra de pestañas fija abajo,
 * con WhatsApp en el centro, y un menú "Más" que sube como hoja inferior.
 * Es el mismo patrón de grupozh.net. En escritorio no se muestra; ahí manda
 * el menú del encabezado (`Navbar.tsx`).
 *
 * La hoja es un `<dialog>`: atrapa el foco, cierra con Escape y deja el
 * resto de la página inerte sin código extra. Se cierra tocando el fondo,
 * con la X o arrastrándola hacia abajo.
 */

type Tab = { href: string; label: string; icon: LucideIcon };

const TABS_LEFT: Tab[] = [
  { href: "/", label: "Inicio", icon: House },
  { href: "/sistemas-para-restaurantes", label: "Sistemas", icon: Store },
];
const TABS_RIGHT: Tab[] = [{ href: "/blog", label: "Blog", icon: BookOpen }];

/** Páginas sin pestaña propia: cuando se está en una, se marca "Más". */
const MENU_ROUTES = [
  "/contacto",
  "/ciudades",
  "/terminos-y-condiciones",
  "/politica-de-privacidad",
  "/aviso-legal",
];

const MENU_LINKS: { href: string; label: string; detail: string; icon: LucideIcon }[] = [
  {
    href: "/#servicios",
    label: "Qué hacemos",
    detail: "Sitios web, tiendas online y sistemas a medida",
    icon: LayoutGrid,
  },
  {
    href: "/#como-trabajamos",
    label: "Cómo trabajamos",
    detail: "Cuatro pasos, de la idea a la entrega",
    icon: Workflow,
  },
  {
    href: "/#proyectos",
    label: "Proyectos",
    detail: "Productos propios de Codezun",
    icon: FolderKanban,
  },
  ...(PROJECT_PRICES
    ? [
        {
          href: "/#precios",
          label: "Precios",
          detail: "Montos de partida por tipo de proyecto",
          icon: Tag,
        },
      ]
    : []),
  {
    href: "/contacto",
    label: "Contacto",
    detail: "Cuéntenos qué necesita",
    icon: MessageSquareText,
  },
  {
    href: "/ciudades",
    label: "Ciudades",
    detail: "Dónde ofrecemos el servicio",
    icon: MapPin,
  },
];

function isActive(pathname: string, href: string): boolean {
  return href === "/"
    ? pathname === "/"
    : pathname === href || pathname.startsWith(`${href}/`);
}

/* --- Instalar como app (PWA) ------------------------------------------- */

type InstallPromptEvent = Event & {
  prompt: () => Promise<void>;
  userChoice: Promise<unknown>;
};

function isStandalone(): boolean {
  return (
    window.matchMedia("(display-mode: standalone)").matches ||
    (navigator as Navigator & { standalone?: boolean }).standalone === true
  );
}

function isIOS(): boolean {
  return (
    /iphone|ipad|ipod/i.test(navigator.userAgent) ||
    (navigator.platform === "MacIntel" && navigator.maxTouchPoints > 1)
  );
}

/**
 * Botón "Instalar la app". Solo aparece si el navegador permite instalar
 * (Chrome/Android dispara `beforeinstallprompt`) o en iPhone, donde se
 * instala a mano desde Compartir: ahí el botón muestra cómo hacerlo. Si el
 * sitio ya está abierto como app, no aparece.
 */
function InstallApp() {
  const [prompt, setPrompt] = useState<InstallPromptEvent | null>(null);
  const [ios, setIos] = useState(false);
  const [standalone, setStandalone] = useState(true);
  const [showIosHelp, setShowIosHelp] = useState(false);

  useEffect(() => {
    /* eslint-disable react-hooks/set-state-in-effect -- datos del navegador, solo existen tras montar */
    setIos(isIOS());
    setStandalone(isStandalone());
    /* eslint-enable react-hooks/set-state-in-effect */

    const onPrompt = (event: Event) => {
      event.preventDefault();
      setPrompt(event as InstallPromptEvent);
    };
    const onInstalled = () => {
      setPrompt(null);
      setStandalone(true);
    };
    window.addEventListener("beforeinstallprompt", onPrompt);
    window.addEventListener("appinstalled", onInstalled);
    return () => {
      window.removeEventListener("beforeinstallprompt", onPrompt);
      window.removeEventListener("appinstalled", onInstalled);
    };
  }, []);

  if (standalone || (!prompt && !ios)) return null;

  async function install() {
    if (prompt) {
      await prompt.prompt();
      await prompt.userChoice;
      setPrompt(null);
    } else if (ios) {
      setShowIosHelp(true);
    }
  }

  return (
    <div className="mt-5">
      <button
        type="button"
        onClick={install}
        className="flex w-full items-center justify-center gap-2 rounded-2xl bg-dark px-6 py-3.5 text-sm font-semibold text-white active:scale-[0.98]"
      >
        <Download size={18} aria-hidden="true" />
        Instalar la app en su teléfono
      </button>
      {showIosHelp && (
        <p className="mt-2 text-center text-xs leading-relaxed text-foreground/60">
          En iPhone: toque{" "}
          <Share
            size={14}
            className="inline align-text-bottom text-primary"
            aria-label="Compartir"
          />{" "}
          <strong className="text-dark">Compartir</strong> y luego{" "}
          <strong className="text-dark">«Agregar a inicio»</strong>.
        </p>
      )}
    </div>
  );
}

/* --- Hoja inferior ("Más") ----------------------------------------------- */

function MenuSheet({
  dialogRef,
  pathname,
  onClosed,
}: {
  dialogRef: React.RefObject<HTMLDialogElement | null>;
  pathname: string;
  onClosed: () => void;
}) {
  const panelRef = useRef<HTMLDivElement>(null);
  const contentRef = useRef<HTMLDivElement>(null);
  const drag = useRef({ active: false, startY: 0, startT: 0, delta: 0 });

  function close(animate = true) {
    const dialog = dialogRef.current;
    const panel = panelRef.current;
    if (!dialog?.open || !panel) return;

    const reduceMotion = window.matchMedia(
      "(prefers-reduced-motion: reduce)"
    ).matches;
    if (!animate || reduceMotion) {
      dialog.classList.remove("cerrando");
      panel.style.transform = "";
      dialog.close();
      return;
    }
    dialog.classList.add("cerrando");
    panel.addEventListener(
      "animationend",
      () => {
        dialog.classList.remove("cerrando");
        panel.style.transform = "";
        dialog.close();
      },
      { once: true }
    );
  }

  return (
    <dialog
      ref={dialogRef}
      id="menu-app"
      aria-labelledby="menu-app-titulo"
      className="hoja md:hidden"
      onClose={onClosed}
      onCancel={(event) => {
        // Escape: se cierra con la misma animación que el resto.
        event.preventDefault();
        close();
      }}
      onClick={(event) => {
        // Toque en el fondo oscuro (el propio <dialog>, fuera del panel).
        if (event.target === event.currentTarget) close();
      }}
    >
      <div
        ref={panelRef}
        className="hoja-panel"
        onTouchStart={(event) => {
          const fromHandle = (event.target as HTMLElement).closest(
            "[data-hoja-agarre]"
          );
          if (!fromHandle && (contentRef.current?.scrollTop ?? 0) > 0) return;
          drag.current = {
            active: true,
            startY: event.touches[0].clientY,
            startT: Date.now(),
            delta: 0,
          };
          if (panelRef.current) panelRef.current.style.transition = "none";
        }}
        onTouchMove={(event) => {
          if (!drag.current.active || !panelRef.current) return;
          const delta = Math.max(0, event.touches[0].clientY - drag.current.startY);
          drag.current.delta = delta;
          panelRef.current.style.transform = delta ? `translateY(${delta}px)` : "";
        }}
        onTouchEnd={() => {
          const state = drag.current;
          if (!state.active || !panelRef.current) return;
          state.active = false;
          panelRef.current.style.transition = "";
          const speed = state.delta / Math.max(1, Date.now() - state.startT);
          if (state.delta > 110 || (state.delta > 30 && speed > 0.5)) {
            close();
          } else {
            panelRef.current.style.transform = "";
          }
        }}
      >
        <div className="hoja-agarre" data-hoja-agarre aria-hidden="true">
          <span />
        </div>

        <div className="flex items-center gap-3 px-5 pb-4">
          <Image
            src="/logo/logo.png"
            alt="Codezun"
            width={403}
            height={290}
            className="h-10 w-auto shrink-0"
          />
          <p id="menu-app-titulo" className="min-w-0 flex-1 text-sm text-foreground/60">
            Desarrollo de software y sitios web a medida
          </p>
          <button
            type="button"
            onClick={() => close()}
            aria-label="Cerrar menú"
            className="flex h-9 w-9 shrink-0 items-center justify-center rounded-full bg-secondary/60 text-dark active:scale-95"
          >
            <X size={20} aria-hidden="true" />
          </button>
        </div>

        <div ref={contentRef} className="hoja-contenido">
          <ul className="lista-app">
            {MENU_LINKS.map((item) => (
              <li key={item.href}>
                <Link
                  href={item.href}
                  onClick={() => close(false)}
                  aria-current={isActive(pathname, item.href) ? "page" : undefined}
                >
                  <span className="lista-app-icono">
                    <item.icon size={20} aria-hidden="true" />
                  </span>
                  <span className="min-w-0 flex-1">
                    <span className="block font-semibold text-dark">{item.label}</span>
                    <span className="block truncate text-xs text-foreground/60">
                      {item.detail}
                    </span>
                  </span>
                  <ChevronRight size={16} className="shrink-0 text-foreground/30" aria-hidden="true" />
                </Link>
              </li>
            ))}
          </ul>

          <p className="lista-app-titulo">Hable con nosotros</p>
          <ul className="lista-app">
            <li>
              <a
                href={WHATSAPP_LINK}
                target="_blank"
                rel="noopener noreferrer"
                aria-label="WhatsApp (se abre en una pestaña nueva)"
                onClick={() => close(false)}
              >
                <span className="lista-app-icono bg-[#25D366]! text-white!">
                  <WhatsAppIcon size={20} />
                </span>
                <span className="min-w-0 flex-1">
                  <span className="block font-semibold text-dark">WhatsApp</span>
                  <span className="block text-xs text-foreground/60">
                    La forma más rápida de escribirnos
                  </span>
                </span>
                <ChevronRight size={16} className="shrink-0 text-foreground/30" aria-hidden="true" />
              </a>
            </li>
            <li>
              <a href={`tel:+${WHATSAPP_NUMBER}`}>
                <span className="lista-app-icono">
                  <Phone size={20} aria-hidden="true" />
                </span>
                <span className="min-w-0 flex-1">
                  <span className="block font-semibold text-dark">Llamar</span>
                  <span className="block text-xs text-foreground/60">{WHATSAPP_DISPLAY}</span>
                </span>
                <ChevronRight size={16} className="shrink-0 text-foreground/30" aria-hidden="true" />
              </a>
            </li>
            <li>
              <a href={`mailto:${CONTACT_EMAIL}`}>
                <span className="lista-app-icono">
                  <Mail size={20} aria-hidden="true" />
                </span>
                <span className="min-w-0 flex-1">
                  <span className="block font-semibold text-dark">Correo</span>
                  <span className="block truncate text-xs text-foreground/60">
                    {CONTACT_EMAIL}
                  </span>
                </span>
                <ChevronRight size={16} className="shrink-0 text-foreground/30" aria-hidden="true" />
              </a>
            </li>
          </ul>

          <InstallApp />

          <p className="mt-6 flex flex-wrap items-center justify-center gap-x-3 text-xs text-foreground/60">
            <Link href="/politica-de-privacidad" onClick={() => close(false)} className="py-2">
              Privacidad
            </Link>
            <span aria-hidden="true">·</span>
            <Link href="/terminos-y-condiciones" onClick={() => close(false)} className="py-2">
              Términos
            </Link>
            <span aria-hidden="true">·</span>
            <Link href="/aviso-legal" onClick={() => close(false)} className="py-2">
              Aviso legal
            </Link>
          </p>
        </div>
      </div>
    </dialog>
  );
}

/* --- Barra de pestañas ---------------------------------------------------- */

function TabLink({ tab, pathname }: { tab: Tab; pathname: string }) {
  const active = isActive(pathname, tab.href);
  return (
    <li>
      <Link href={tab.href} className="tab" aria-current={active ? "page" : undefined}>
        <span className="tab-icono">
          <tab.icon size={24} strokeWidth={active ? 2.1 : 1.7} aria-hidden="true" />
        </span>
        <span className="tab-texto">{tab.label}</span>
      </Link>
    </li>
  );
}

export default function TabBar() {
  const pathname = usePathname();
  const dialogRef = useRef<HTMLDialogElement>(null);
  const [menuOpen, setMenuOpen] = useState(false);
  const menuActive = MENU_ROUTES.some((route) => isActive(pathname, route));

  return (
    <>
      <nav
        className="tabbar md:hidden"
        aria-label="Navegación de la app"
        style={{ viewTransitionName: "pestanas" }}
      >
        <ul className="grid h-16 grid-cols-5 items-stretch">
          {TABS_LEFT.map((tab) => (
            <TabLink key={tab.href} tab={tab} pathname={pathname} />
          ))}
          <li>
            <a
              href={WHATSAPP_LINK}
              target="_blank"
              rel="noopener noreferrer"
              aria-label="Escríbanos por WhatsApp (se abre en una pestaña nueva)"
              className="tab tab-wa"
            >
              <span className="tab-wa-boton">
                <WhatsAppIcon size={28} />
              </span>
              <span className="tab-texto">WhatsApp</span>
            </a>
          </li>
          {TABS_RIGHT.map((tab) => (
            <TabLink key={tab.href} tab={tab} pathname={pathname} />
          ))}
          <li>
            <button
              type="button"
              className="tab"
              aria-haspopup="dialog"
              aria-controls="menu-app"
              aria-expanded={menuOpen}
              data-activa={menuActive || undefined}
              onClick={() => {
                dialogRef.current?.showModal();
                setMenuOpen(true);
              }}
            >
              <span className="tab-icono">
                <LayoutGrid size={24} strokeWidth={menuActive ? 2.1 : 1.7} aria-hidden="true" />
              </span>
              <span className="tab-texto">Más</span>
            </button>
          </li>
        </ul>
      </nav>

      <MenuSheet
        dialogRef={dialogRef}
        pathname={pathname}
        onClosed={() => setMenuOpen(false)}
      />
    </>
  );
}
