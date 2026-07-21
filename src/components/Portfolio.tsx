import Image from "next/image";
import { ArrowUpRight } from "lucide-react";
import FadeIn from "./FadeIn";
import { PORTFOLIO_PROJECTS } from "@/lib/site-config";

/** Iniciales de respaldo cuando el proyecto todavía no tiene imagen. */
function getInitials(name: string) {
  const clean = name.replace(/\.(com|net|org|io|co)$/i, "");
  const words = clean.split(/\s+/).filter(Boolean);
  if (words.length >= 2) {
    return (words[0][0] + words[1][0]).toUpperCase();
  }
  return clean.slice(0, 2).toUpperCase();
}

/*
 * Cómo agregar un proyecto nuevo:
 * Toda la data de esta sección vive en src/lib/site-config.ts, en el
 * array PORTFOLIO_PROJECTS. Para sumar un proyecto, agregá un objeto
 * más ahí con name, description, href, type e image. No hace falta
 * tocar este archivo.
 */
export default function Portfolio() {
  return (
    <section id="proyectos" className="bg-white py-20 sm:py-28">
      <div className="mx-auto max-w-6xl px-6">
        <FadeIn className="mx-auto max-w-2xl text-center">
          <h2 className="text-3xl font-bold tracking-tight text-dark sm:text-4xl">
            Nuestros proyectos
          </h2>
          <p className="mt-4 text-lg text-foreground/70">
            Además de trabajar con clientes, desarrollamos nuestras
            propias herramientas y productos.
          </p>
        </FadeIn>

        <div className="mt-14 grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
          {PORTFOLIO_PROJECTS.map((project, index) => (
            <FadeIn key={project.name} delay={(index % 4) * 0.1}>
              <a
                href={project.href}
                target="_blank"
                rel="noopener noreferrer"
                className="group flex h-full flex-col overflow-hidden rounded-2xl bg-white ring-1 ring-black/5 transition-shadow hover:shadow-lg"
              >
                <div className="relative flex aspect-video items-center justify-center bg-secondary/40">
                  <span className="absolute left-3 top-3 rounded-full bg-white/90 px-2.5 py-1 text-xs font-medium text-dark">
                    {project.type === "app" ? "App" : "Web"}
                  </span>
                  {project.image ? (
                    <Image
                      src={project.image}
                      alt={project.name}
                      width={200}
                      height={120}
                      className="h-full w-full object-cover"
                    />
                  ) : (
                    <span className="text-3xl font-bold text-primary/50">
                      {getInitials(project.name)}
                    </span>
                  )}
                </div>
                <div className="flex flex-1 flex-col p-5">
                  <div className="flex items-center justify-between gap-2">
                    <h3 className="font-semibold text-dark">
                      {project.name}
                    </h3>
                    <ArrowUpRight
                      size={18}
                      className="shrink-0 text-primary transition-transform group-hover:translate-x-0.5 group-hover:-translate-y-0.5"
                    />
                  </div>
                  <p className="mt-2 text-sm leading-relaxed text-foreground/70">
                    {project.description}
                  </p>
                </div>
              </a>
            </FadeIn>
          ))}
        </div>
      </div>
    </section>
  );
}
