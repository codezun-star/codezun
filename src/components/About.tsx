import { Globe } from "lucide-react";
import FadeIn from "./FadeIn";

export default function About() {
  return (
    <section id="sobre-nosotros" className="bg-white py-20 sm:py-28">
      <div className="mx-auto max-w-6xl px-6">
        <div className="grid gap-12 md:grid-cols-2 md:items-center">
          <FadeIn>
            <span className="inline-flex items-center gap-2 rounded-full bg-secondary px-4 py-1.5 text-sm font-medium text-dark">
              <Globe size={16} />
              Atendemos clientes en todo el mundo
            </span>

            <h2 className="mt-4 text-3xl font-bold tracking-tight text-dark sm:text-4xl">
              Sobre nosotros
            </h2>
            <p className="mt-6 text-lg leading-relaxed text-foreground/70">
              Codezun es una empresa de desarrollo de software con más de
              5 años de experiencia diseñando y construyendo productos
              SaaS, tiendas online, landing pages y sitios web completos.
              Trabajamos de forma 100% remota con clientes en cualquier
              parte del mundo, acompañándolos en cada etapa del
              producto: desde la idea inicial hasta el desarrollo,
              lanzamiento y mantenimiento a largo plazo.
            </p>
            <p className="mt-4 text-lg leading-relaxed text-foreground/70">
              Además de proyectos para clientes, desarrollamos nuestras
              propias herramientas y productos digitales, lo que nos
              permite mantenernos actualizados con las últimas
              tecnologías y mejores prácticas del sector.
            </p>
          </FadeIn>

          <FadeIn delay={0.15}>
            <div className="grid grid-cols-2 gap-4">
              <div className="rounded-2xl bg-secondary/40 p-6">
                <p className="text-2xl font-bold text-primary sm:text-3xl">5+</p>
                <p className="mt-2 text-sm text-foreground/70">
                  Años de experiencia en desarrollo de software
                </p>
              </div>
              <div className="rounded-2xl bg-secondary/40 p-6">
                <p className="text-2xl font-bold text-primary sm:text-3xl">SaaS</p>
                <p className="mt-2 text-sm text-foreground/70">
                  Plataformas y productos propios
                </p>
              </div>
              <div className="rounded-2xl bg-secondary/40 p-6">
                <p className="text-2xl font-bold text-primary sm:text-3xl">
                  E&#8209;commerce
                </p>
                <p className="mt-2 text-sm text-foreground/70">
                  Tiendas online a medida
                </p>
              </div>
              <div className="rounded-2xl bg-secondary/40 p-6">
                <p className="text-2xl font-bold text-primary sm:text-3xl">
                  Sitios web
                </p>
                <p className="mt-2 text-sm text-foreground/70">
                  Landing pages y sitios completos
                </p>
              </div>
            </div>
          </FadeIn>
        </div>
      </div>
    </section>
  );
}
