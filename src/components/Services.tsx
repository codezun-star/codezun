import Link from "next/link";
import {
  ArrowRight,
  Globe,
  Layers,
  LayoutDashboard,
  Rocket,
  ShoppingCart,
  type LucideIcon,
} from "lucide-react";
import FadeIn from "./FadeIn";
import { SERVICE_CATALOG } from "@/lib/schema";

/**
 * El texto de cada servicio sale de `SERVICE_CATALOG` (lib/schema.ts), que
 * también alimenta el catálogo de la organización y /llms.txt. Aquí solo se
 * le pone el icono.
 */
const ICONS: Record<string, LucideIcon> = {
  "Productos SaaS": Layers,
  "E-commerce": ShoppingCart,
  "Landing pages": Rocket,
  "Sitios web completos": Globe,
  "Sistemas a medida": LayoutDashboard,
};

/*
 * Cinco tarjetas en una rejilla de dos y de tres columnas: la última
 * ("Sistemas a medida") ocupa dos columnas, así ninguna fila queda con una
 * tarjeta suelta y el servicio que tiene página propia destaca con su
 * enlace.
 */
export default function Services() {
  return (
    <section id="servicios" className="bg-secondary/30 py-20 sm:py-28">
      <div className="mx-auto max-w-6xl px-6">
        <FadeIn className="mx-auto max-w-2xl text-center">
          <h2 className="text-3xl font-bold tracking-tight text-dark sm:text-4xl">
            Qué hacemos
          </h2>
          <p className="mt-4 text-lg text-foreground/70">
            Acompañamos a nuestros clientes con servicios de desarrollo
            de software pensados para cada etapa de su producto.
          </p>
        </FadeIn>

        <div className="mt-14 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {SERVICE_CATALOG.map((service, index) => {
            const Icon = ICONS[service.name] ?? Layers;
            const href = service.href;

            return (
              <FadeIn
                key={service.name}
                delay={index * 0.1}
                className={href ? "sm:col-span-2" : undefined}
              >
                <div className="h-full rounded-2xl bg-white p-6 shadow-sm ring-1 ring-black/5 transition-shadow hover:shadow-md">
                  <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-primary/10 text-primary">
                    <Icon size={24} />
                  </div>
                  <h3 className="mt-5 text-lg font-semibold text-dark">
                    {service.name}
                  </h3>
                  <p className="mt-2 text-sm leading-relaxed text-foreground/70">
                    {service.description}
                  </p>

                  {href && (
                    <Link
                      href={href}
                      className="group mt-5 inline-flex items-center gap-1.5 text-sm font-semibold text-primary transition-colors hover:text-primary/80"
                    >
                      Ver sistemas para restaurantes
                      <ArrowRight
                        size={16}
                        className="transition-transform group-hover:translate-x-1"
                      />
                    </Link>
                  )}
                </div>
              </FadeIn>
            );
          })}
        </div>
      </div>
    </section>
  );
}
