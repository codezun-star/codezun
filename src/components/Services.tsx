import { Code2, Smartphone, Layers, Wrench } from "lucide-react";
import FadeIn from "./FadeIn";

const SERVICES = [
  {
    icon: Code2,
    title: "Desarrollo web",
    description:
      "Sitios y aplicaciones web modernas, rápidas y escalables, construidas con las mejores prácticas del mercado.",
  },
  {
    icon: Smartphone,
    title: "Apps móviles",
    description:
      "Aplicaciones para iOS y Android pensadas para ofrecer una experiencia fluida a tus usuarios.",
  },
  {
    icon: Layers,
    title: "Productos SaaS",
    description:
      "Plataformas de software como servicio, desde el diseño de la arquitectura hasta el producto final.",
  },
  {
    icon: Wrench,
    title: "Herramientas a medida",
    description:
      "Soluciones a medida para procesos específicos de tu negocio, integradas con tus sistemas actuales.",
  },
];

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

        <div className="mt-14 grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
          {SERVICES.map((service, index) => (
            <FadeIn key={service.title} delay={index * 0.1}>
              <div className="h-full rounded-2xl bg-white p-6 shadow-sm ring-1 ring-black/5 transition-shadow hover:shadow-md">
                <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-primary/10 text-primary">
                  <service.icon size={24} />
                </div>
                <h3 className="mt-5 text-lg font-semibold text-dark">
                  {service.title}
                </h3>
                <p className="mt-2 text-sm leading-relaxed text-foreground/70">
                  {service.description}
                </p>
              </div>
            </FadeIn>
          ))}
        </div>
      </div>
    </section>
  );
}
