"use client";

import { useEffect, useRef, useState } from "react";
import { motion, useInView } from "motion/react";
import type { ReactNode } from "react";

type FadeInProps = {
  children: ReactNode;
  delay?: number;
  className?: string;
};

/**
 * Fade-in + slide-up sutil al entrar en el viewport.
 *
 * El contenido llega **visible** en el HTML del servidor. Antes llegaba con
 * `opacity: 0` y solo aparecía cuando cargaba el JavaScript: con señal
 * lenta, quien bajaba rápido veía secciones en blanco y la página parecía
 * trabada. Ahora, al cargar el JavaScript, se mira dónde está cada bloque:
 * - si ya está en pantalla, se queda como está (sin parpadeo);
 * - si está fuera (más abajo, o a un costado dentro de un carrusel), se
 *   oculta sin animación —nadie lo está viendo— y aparece con el fade-in
 *   al llegar a él.
 */
export default function FadeIn({ children, delay = 0, className }: FadeInProps) {
  const ref = useRef<HTMLDivElement>(null);
  /*
   * Margen negativo solo vertical: en los carruseles del teléfono
   * (`carrusel-movil`) la tarjeta siguiente asoma unos pocos píxeles por el
   * costado, y con margen horizontal seguía invisible justo cuando tiene que
   * invitar a deslizar.
   */
  const inView = useInView(ref, { once: true, margin: "-80px 0px" });
  const [deferred, setDeferred] = useState(false);

  useEffect(() => {
    const rect = ref.current?.getBoundingClientRect();
    if (!rect) return;
    const onScreen =
      rect.top < window.innerHeight &&
      rect.bottom > 0 &&
      rect.left < window.innerWidth &&
      rect.right > 0;
    if (!onScreen) setDeferred(true);
  }, []);

  const show = !deferred || inView;

  return (
    <motion.div
      ref={ref}
      initial={false}
      animate={show ? "visible" : "hidden"}
      variants={{
        visible: {
          opacity: 1,
          y: 0,
          transition: { duration: 0.6, delay, ease: "easeOut" },
        },
        hidden: { opacity: 0, y: 24, transition: { duration: 0 } },
      }}
      className={className}
    >
      {children}
    </motion.div>
  );
}
