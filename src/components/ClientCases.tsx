import { ArrowUpRight } from "lucide-react";
import FadeIn from "./FadeIn";
import { PUBLISHED_CASES } from "@/lib/casos";

/**
 * Casos de clientes.
 *
 * Los datos viven en `lib/casos.ts`. Solo se pintan los casos con
 * `published: true` y, si no hay ninguno, la sección no existe: ni título
 * ni hueco. Un caso no se publica sin el permiso del cliente.
 */
export default function ClientCases() {
  if (PUBLISHED_CASES.length === 0) return null;

  return (
    <section id="casos" className="bg-secondary/30 py-20 sm:py-28">
      <div className="mx-auto max-w-6xl px-6">
        <FadeIn className="mx-auto max-w-2xl text-center">
          <h2 className="text-3xl font-bold tracking-tight text-dark sm:text-4xl">
            Casos de clientes
          </h2>
          <p className="mt-4 text-lg text-foreground/70">
            Proyectos que desarrollamos para negocios reales, publicados con
            su permiso.
          </p>
        </FadeIn>

        <div className="mt-14 grid gap-6 md:grid-cols-2">
          {PUBLISHED_CASES.map((item, index) => (
            <FadeIn key={item.client} delay={index * 0.1} className="h-full">
              <article className="flex h-full flex-col rounded-2xl bg-white p-6 shadow-sm ring-1 ring-black/5 sm:p-8">
                <span className="self-start rounded-full bg-secondary px-3 py-1 text-xs font-medium text-dark">
                  {item.sector}
                </span>
                <h3 className="mt-4 text-xl font-bold text-dark">
                  {item.client}
                </h3>
                <p className="mt-1 font-medium text-primary">{item.title}</p>

                <dl className="mt-5 space-y-4 text-sm leading-relaxed">
                  <div>
                    <dt className="font-semibold text-dark">El reto</dt>
                    <dd className="mt-1 text-foreground/70">{item.problem}</dd>
                  </div>
                  <div>
                    <dt className="font-semibold text-dark">Lo que hicimos</dt>
                    <dd className="mt-1 text-foreground/70">{item.solution}</dd>
                  </div>
                  {item.result && (
                    <div>
                      <dt className="font-semibold text-dark">Resultado</dt>
                      <dd className="mt-1 text-foreground/70">{item.result}</dd>
                    </div>
                  )}
                </dl>

                {item.href && (
                  <a
                    href={item.href}
                    target="_blank"
                    rel="noopener"
                    className="group mt-6 inline-flex items-center gap-1.5 self-start text-sm font-semibold text-primary hover:text-primary/80"
                  >
                    Ver el proyecto
                    <ArrowUpRight
                      size={16}
                      className="transition-transform group-hover:-translate-y-0.5 group-hover:translate-x-0.5"
                    />
                  </a>
                )}
              </article>
            </FadeIn>
          ))}
        </div>
      </div>
    </section>
  );
}
