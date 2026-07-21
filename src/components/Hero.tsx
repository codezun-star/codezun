"use client";

import Image from "next/image";
import Link from "next/link";
import { motion } from "motion/react";
import { ArrowRight } from "lucide-react";

/**
 * Tagline del hero. Opciones de copy propuestas (elegí la que prefieras
 * o escribí la tuya):
 *
 * 1. "Desarrollamos software que impulsa negocios."
 * 2. "Convertimos ideas en aplicaciones web y móviles."
 * 3. "Software a medida, de la idea al producto."
 */
const TAGLINE = "Desarrollamos software que impulsa negocios.";

export default function Hero() {
  return (
    <section className="relative overflow-hidden bg-white">
      {/*
        Foto de fondo del equipo (/public/hero/team.png) con un velo
        blanco semitransparente encima para que el texto siga siendo
        legible. Para reemplazarla, subí un archivo nuevo a esa misma
        ruta (o cambiá el src de abajo si usás otro nombre).
      */}
      <div className="absolute inset-0 z-0">
        <Image
          src="/hero/team.png"
          alt=""
          fill
          priority
          sizes="100vw"
          className="object-cover"
        />
        <div className="absolute inset-0 bg-white/92" />
      </div>

      <div className="relative z-10 mx-auto flex max-w-6xl flex-col items-center px-6 py-20 text-center sm:py-28">
        <motion.span
          initial={{ opacity: 0, y: 12 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="rounded-full bg-secondary px-4 py-1.5 text-sm font-medium text-dark"
        >
          Codezun · Desarrollo de software
        </motion.span>

        <motion.h1
          initial={{ opacity: 0, y: 16 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.1 }}
          className="mt-6 max-w-3xl text-4xl font-bold tracking-tight text-dark sm:text-5xl md:text-6xl"
        >
          {TAGLINE}
        </motion.h1>

        <motion.p
          initial={{ opacity: 0, y: 16 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.2 }}
          className="mt-6 max-w-2xl text-lg text-foreground/70"
        >
          Construimos productos SaaS, tiendas online, landing pages y
          sitios web completos, con más de 5 años de experiencia
          acompañando el crecimiento de nuestros clientes.
        </motion.p>

        <motion.div
          initial={{ opacity: 0, y: 16 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.3 }}
          className="mt-10"
        >
          <Link
            href="/#contacto"
            className="group inline-flex items-center gap-2 rounded-full bg-accent px-7 py-3.5 text-base font-semibold text-white shadow-lg shadow-accent/20 transition-all hover:bg-accent/90 hover:shadow-accent/30"
          >
            Conversemos de tu proyecto
            <ArrowRight
              size={18}
              className="transition-transform group-hover:translate-x-1"
            />
          </Link>
        </motion.div>
      </div>
    </section>
  );
}
