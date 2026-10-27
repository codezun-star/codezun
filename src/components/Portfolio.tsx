import { ArrowUpRight, ChevronDown } from "lucide-react";
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
 * más ahí. Con `featured: true` (y su línea `benefit`) sale en la
 * rejilla; con `false`, en la lista plegada de "Otros proyectos".
 *
 * La rejilla está pensada para cuatro destacados: una fila en
 * escritorio, dos de dos en tableta. Si cambia el número de destacados,
 * revisar las columnas para que no quede una tarjeta sola en la última
 * fila. En el teléfono es un carrusel que se pasa con el dedo
 * (`carrusel-movil`, en globals.css).
 *
 * La sección no presenta los proyectos por lo que son sino por lo que un
 * cliente puede ver de su propio proyecto en ellos ("Para su negocio: …").
 * Un dueño de restaurante que ve un generador de currículums no conecta
 * nada; si ve "documentos PDF que se generan solos", sí.
 */

/*
 * `rel="noopener"` a secas, y no `noopener noreferrer`.
 *
 * `noopener` es lo que evita el tabnabbing (la página destino no recibe
 * `window.opener`), así que la parte de seguridad está cubierta.
 * `noreferrer` además borra la cabecera `Referer`, y eso sí tiene coste
 * aquí: estos son productos propios, y sin referente cada visita que sale
 * de codezun.com entra en la analítica del subdominio como tráfico
 * directo, sin rastro de dónde vino.
 *
 * Lo que no lleva ninguno de estos enlaces es `nofollow`: son enlaces
 * editoriales a proyectos propios, que es exactamente el caso en el que
 * un enlace debe transmitir autoridad. Marcarlos como `nofollow` cortaría
 * la señal que conecta el dominio principal con sus subdominios. Eso
 * vale también para los secundarios de la lista plegada: `<details>`
 * deja los enlaces en el HTML aunque esté cerrado.
 */
const PROJECT_LINK_REL = "noopener";

const featuredProjects = PORTFOLIO_PROJECTS.filter((project) => project.featured);
const otherProjects = PORTFOLIO_PROJECTS.filter((project) => !project.featured);

export default function Portfolio() {
  return (
    <section id="proyectos" className="bg-white py-20 sm:py-28">
      <div className="mx-auto max-w-6xl px-6">
        <FadeIn className="mx-auto max-w-2xl text-center">
          <h2 className="text-3xl font-bold tracking-tight text-dark sm:text-4xl">
            Lo que ya construimos
          </h2>
          <p className="mt-4 text-lg text-foreground/70">
            Productos propios, en línea y funcionando. Cada uno usa algo que
            también podemos hacer para su negocio.
          </p>
        </FadeIn>

        <div className="carrusel-movil mt-14 grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
          {featuredProjects.map((project, index) => (
            <FadeIn key={project.name} delay={index * 0.1}>
              <a
                href={project.href}
                target="_blank"
                rel={PROJECT_LINK_REL}
                className="group flex h-full flex-col overflow-hidden rounded-2xl bg-white ring-1 ring-black/5 transition-shadow hover:shadow-lg"
              >
                <div className="relative flex h-40 items-center justify-center bg-secondary/40 p-6">
                  <span className="absolute left-3 top-3 rounded-full bg-white/90 px-2.5 py-1 text-xs font-medium text-dark">
                    {project.category}
                  </span>
                  {project.image ? (
                    // eslint-disable-next-line @next/next/no-img-element -- soporta SVG local sin configuración extra del optimizador de next/image
                    <img
                      src={project.image}
                      alt={project.name}
                      /*
                        `loading="lazy"` no es solo ahorro: sin él React
                        precarga las marcas desde la cabecera del HTML, y
                        esas descargas compiten con la foto del hero —que es
                        el elemento que mide el LCP— por una sección que
                        está dos pantallas más abajo.
                      */
                      loading="lazy"
                      decoding="async"
                      /*
                        `object-contain` y no `object-cover`: las imágenes
                        son marcas cuadradas y `cover` les recortaba casi la
                        mitad del alto. Y `max-h-full max-w-full` sobre un
                        recuadro de altura fija, no `aspect-*`: con
                        `aspect-*` la marca imponía su propia proporción y
                        en móvil ocupaba la pantalla entera.
                      */
                      className="max-h-full max-w-full object-contain"
                    />
                  ) : (
                    <span className="text-3xl font-bold text-primary/50">
                      {getInitials(project.name)}
                    </span>
                  )}
                </div>
                <div className="flex flex-1 flex-col p-5">
                  <div className="flex items-center gap-2">
                    <h3 className="font-semibold text-dark">{project.name}</h3>
                    <ArrowUpRight
                      size={18}
                      className="shrink-0 text-primary transition-transform group-hover:-translate-y-0.5 group-hover:translate-x-0.5"
                      aria-hidden="true"
                    />
                  </div>
                  <p className="mt-2 text-sm leading-relaxed text-foreground/70">
                    {project.description}
                  </p>
                  {project.benefit && (
                    <p className="mt-4 rounded-xl bg-secondary/30 p-3 text-sm leading-relaxed text-dark">
                      <span className="font-semibold">Para su negocio:</span>{" "}
                      {project.benefit}
                    </p>
                  )}
                </div>
              </a>
            </FadeIn>
          ))}
        </div>

        {otherProjects.length > 0 && (
          <FadeIn className="mx-auto mt-10 max-w-3xl">
            <details className="group rounded-2xl bg-secondary/15 ring-1 ring-black/5">
              <summary className="flex cursor-pointer list-none items-center justify-between gap-4 px-5 py-4 text-sm font-semibold text-dark [&::-webkit-details-marker]:hidden">
                Otros proyectos propios ({otherProjects.length})
                <ChevronDown
                  size={18}
                  className="shrink-0 text-primary transition-transform duration-200 group-open:rotate-180"
                  aria-hidden="true"
                />
              </summary>
              <ul className="divide-y divide-black/5 border-t border-black/5">
                {otherProjects.map((project) => (
                  <li key={project.name}>
                    <a
                      href={project.href}
                      target="_blank"
                      rel={PROJECT_LINK_REL}
                      className="group/link flex items-start gap-3 px-5 py-3 transition-colors hover:bg-secondary/25"
                    >
                      <span className="min-w-0 flex-1">
                        <span className="flex items-center gap-1.5 text-sm font-semibold text-dark">
                          {project.name}
                          <ArrowUpRight
                            size={14}
                            className="shrink-0 text-primary"
                            aria-hidden="true"
                          />
                        </span>
                        <span className="mt-0.5 block text-sm text-foreground/60">
                          {project.description}
                        </span>
                      </span>
                      <span className="shrink-0 rounded-full bg-white px-2.5 py-1 text-xs font-medium text-dark ring-1 ring-black/5">
                        {project.category}
                      </span>
                    </a>
                  </li>
                ))}
              </ul>
            </details>
          </FadeIn>
        )}
      </div>
    </section>
  );
}
