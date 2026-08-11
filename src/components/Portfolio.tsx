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
 * más ahí con name, description, href, category e image. No hace
 * falta tocar este archivo: con un solo proyecto se muestra una card
 * grande destacada, y con dos o más pasa a mostrarse como grid.
 *
 * El número de columnas está elegido para que no quede una card sola
 * en la última fila, que es lo que peor se ve. Con los diez proyectos
 * actuales las divisiones exactas son 1, 2 y 5, así que el grid va de
 * una a dos y de dos a cinco columnas: 10, 5 y 2 filas llenas. A tres
 * o cuatro columnas la última fila quedaría con 1 y 2 cards sueltas.
 * Si cambia el número de proyectos, esto es lo que hay que revisar.
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
 * la señal que conecta el dominio principal con sus subdominios.
 */
const PROJECT_LINK_REL = "noopener";
export default function Portfolio() {
  const featured = PORTFOLIO_PROJECTS.length === 1;

  return (
    <section id="proyectos" className="bg-white py-20 sm:py-28">
      <div className="mx-auto max-w-6xl px-6">
        <FadeIn className="mx-auto max-w-2xl text-center">
          <h2 className="text-3xl font-bold tracking-tight text-dark sm:text-4xl">
            Nuestros proyectos
          </h2>
          <p className="mt-4 text-lg text-foreground/70">
            Además de trabajar con clientes, desarrollamos nuestros
            propios productos.
          </p>
        </FadeIn>

        <div
          className={
            featured
              ? "mx-auto mt-14 max-w-3xl"
              : "mt-14 grid gap-6 sm:grid-cols-2 lg:grid-cols-5"
          }
        >
          {PORTFOLIO_PROJECTS.map((project, index) => (
            <FadeIn key={project.name} delay={(index % 4) * 0.1}>
              <a
                href={project.href}
                target="_blank"
                rel={PROJECT_LINK_REL}
                className={
                  featured
                    ? "group flex flex-col items-center gap-8 rounded-3xl bg-white p-8 text-center ring-1 ring-black/5 transition-shadow hover:shadow-xl sm:flex-row sm:items-center sm:text-left sm:p-12"
                    : "group flex h-full flex-col overflow-hidden rounded-2xl bg-white ring-1 ring-black/5 transition-shadow hover:shadow-lg"
                }
              >
                <div
                  className={
                    featured
                      ? "flex h-32 w-32 shrink-0 items-center justify-center rounded-2xl bg-secondary/40"
                      : "relative flex h-44 items-center justify-center bg-secondary/40 p-6"
                  }
                >
                  {!featured && (
                    <span className="absolute left-3 top-3 rounded-full bg-white/90 px-2.5 py-1 text-xs font-medium text-dark">
                      {project.category}
                    </span>
                  )}
                  {project.image ? (
                    // eslint-disable-next-line @next/next/no-img-element -- soporta SVG local sin configuración extra del optimizador de next/image
                    <img
                      src={project.image}
                      alt={project.name}
                      /*
                        En el grid, `object-contain` y no `object-cover`:
                        las imágenes son marcas cuadradas y `cover` les
                        recortaba casi la mitad del alto (a Firmiu le comía
                        el sello, al caballo la cabeza).

                        Y `max-h-full max-w-full` sobre un recuadro de
                        altura fija (`h-44`), no `aspect-*`: con `aspect-*`
                        la altura del recuadro sale de su ancho, así que no
                        es definida, un `max-height: 100%` no resuelve
                        contra ella y la imagen acababa imponiendo su propia
                        proporción —el recuadro se estiraba hasta quedar
                        cuadrado y en móvil ocupaba la pantalla entera—.
                        Con una altura fija el hueco manda y la marca se
                        ajusta dentro.
                      */
                      className={
                        featured
                          ? "h-20 w-20 object-contain"
                          : "max-h-full max-w-full object-contain"
                      }
                    />
                  ) : (
                    <span
                      className={
                        featured
                          ? "text-5xl font-bold text-primary/50"
                          : "text-3xl font-bold text-primary/50"
                      }
                    >
                      {getInitials(project.name)}
                    </span>
                  )}
                </div>
                <div className={featured ? "flex-1" : "flex flex-1 flex-col p-5"}>
                  {featured && (
                    <span className="inline-block rounded-full bg-secondary px-3 py-1 text-xs font-medium text-dark">
                      {project.category}
                    </span>
                  )}
                  <div className="mt-2 flex items-center justify-center gap-2 sm:justify-start">
                    <h3
                      className={
                        featured
                          ? "text-2xl font-bold text-dark"
                          : "font-semibold text-dark"
                      }
                    >
                      {project.name}
                    </h3>
                    <ArrowUpRight
                      size={featured ? 22 : 18}
                      className="shrink-0 text-primary transition-transform group-hover:translate-x-0.5 group-hover:-translate-y-0.5"
                    />
                  </div>
                  <p
                    className={
                      featured
                        ? "mt-3 text-base leading-relaxed text-foreground/70"
                        : "mt-2 text-sm leading-relaxed text-foreground/70"
                    }
                  >
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
