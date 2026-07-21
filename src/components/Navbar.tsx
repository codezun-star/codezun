"use client";

import { useState } from "react";
import Link from "next/link";
import { AnimatePresence, motion } from "motion/react";
import { Menu, X } from "lucide-react";
import Logo from "./Logo";

const NAV_LINKS = [
  { label: "Sobre nosotros", href: "/#sobre-nosotros" },
  { label: "Qué hacemos", href: "/#servicios" },
  { label: "Proyectos", href: "/#proyectos" },
  { label: "Blog", href: "/blog" },
  { label: "Contacto", href: "/#contacto" },
];

export default function Navbar() {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <header className="sticky top-0 z-50 border-b border-secondary/60 bg-white/80 backdrop-blur-md">
      <nav className="mx-auto flex max-w-6xl items-center justify-between px-6 py-3">
        <Logo />

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
          <Link
            href="/#contacto"
            className="rounded-full bg-accent px-5 py-2 text-sm font-semibold text-white transition-colors hover:bg-accent/90"
          >
            Hablemos
          </Link>
        </div>

        <button
          type="button"
          className="text-dark md:hidden"
          onClick={() => setIsOpen((prev) => !prev)}
          aria-label={isOpen ? "Cerrar menú" : "Abrir menú"}
          aria-expanded={isOpen}
        >
          {isOpen ? <X size={26} /> : <Menu size={26} />}
        </button>
      </nav>

      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: "auto", opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            transition={{ duration: 0.25, ease: "easeInOut" }}
            className="overflow-hidden border-t border-secondary/60 md:hidden"
          >
            <div className="flex flex-col gap-4 px-6 py-6">
              {NAV_LINKS.map((link) => (
                <Link
                  key={link.href}
                  href={link.href}
                  onClick={() => setIsOpen(false)}
                  className="text-base font-medium text-foreground/80 transition-colors hover:text-primary"
                >
                  {link.label}
                </Link>
              ))}
              <Link
                href="/#contacto"
                onClick={() => setIsOpen(false)}
                className="rounded-full bg-accent px-5 py-2.5 text-center text-sm font-semibold text-white transition-colors hover:bg-accent/90"
              >
                Hablemos
              </Link>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </header>
  );
}
