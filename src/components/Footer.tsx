import Link from "next/link";
import { Mail } from "lucide-react";
import Logo from "./Logo";
import { CONTACT_EMAIL, SOCIAL_LINKS } from "@/lib/site-config";

const LEGAL_LINKS = [
  { label: "Términos y condiciones", href: "/terminos-y-condiciones" },
  { label: "Política de privacidad", href: "/politica-de-privacidad" },
  { label: "Aviso legal", href: "/aviso-legal" },
];

export default function Footer() {
  const year = new Date().getFullYear();

  return (
    <footer className="bg-dark text-white">
      <div className="mx-auto max-w-6xl px-6 py-12">
        <div className="grid gap-10 sm:grid-cols-2 md:grid-cols-3">
          <div>
            <Logo className="!text-white [&_span]:!text-highlight" />
            <p className="mt-3 max-w-xs text-sm text-white/70">
              Desarrollo de software web y móvil a medida.
            </p>
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
              Contacto
            </h3>
            <a
              href={`mailto:${CONTACT_EMAIL}`}
              className="mt-4 flex items-center gap-2 text-sm text-white/80 transition-colors hover:text-highlight"
            >
              <Mail size={16} />
              {CONTACT_EMAIL}
            </a>

            {/*
              Redes sociales: son placeholders (href: "#").
              Actualizá los links reales en src/lib/site-config.ts (SOCIAL_LINKS).
            */}
            <div className="mt-4 flex gap-4">
              {SOCIAL_LINKS.map((social) => (
                <a
                  key={social.name}
                  href={social.href}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-sm text-white/80 transition-colors hover:text-highlight"
                >
                  {social.name}
                </a>
              ))}
            </div>
          </div>
        </div>

        <div className="mt-10 border-t border-white/10 pt-6 text-sm text-white/60">
          © {year} Codezun. Todos los derechos reservados.
        </div>
      </div>
    </footer>
  );
}
