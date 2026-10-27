import { Check } from "lucide-react";
import FadeIn from "./FadeIn";
import {
  MAINTENANCE_INCLUDES,
  MAINTENANCE_MONTHLY,
  PROJECT_PRICES,
  formatLempiras,
} from "@/lib/precios";

/**
 * Precios de referencia y mantenimiento mensual.
 *
 * Los montos viven en `lib/precios.ts`. Cada bloque se pinta solo cuando sus
 * montos están definidos: la tabla, con los cuatro tipos de proyecto; el
 * mantenimiento, con su monto mensual. Sin ninguno de los dos, la sección
 * entera no existe.
 */
export default function Pricing() {
  if (!PROJECT_PRICES && MAINTENANCE_MONTHLY === null) return null;

  return (
    <section id="precios" className="bg-secondary/30 py-20 sm:py-28">
      <div className="mx-auto max-w-4xl px-6">
        <FadeIn className="mx-auto max-w-2xl text-center">
          <h2 className="text-3xl font-bold tracking-tight text-dark sm:text-4xl">
            Precios de referencia
          </h2>
          <p className="mt-4 text-lg text-foreground/70">
            No son precios fijos: son montos de partida. El precio final
            depende de lo que su proyecto necesite y se confirma en la
            propuesta, antes de empezar.
          </p>
        </FadeIn>

        {PROJECT_PRICES && (
          <FadeIn delay={0.1}>
            <div className="mt-12 overflow-hidden rounded-2xl bg-white shadow-sm ring-1 ring-black/5">
              <table className="w-full text-left text-sm sm:text-base">
                <caption className="sr-only">
                  Precios de referencia por tipo de proyecto, en lempiras
                </caption>
                <thead className="bg-dark text-white">
                  <tr>
                    <th scope="col" className="px-4 py-3 font-semibold sm:px-6">
                      Tipo de proyecto
                    </th>
                    <th
                      scope="col"
                      className="px-4 py-3 text-right font-semibold sm:px-6"
                    >
                      Desde
                    </th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-black/5">
                  {PROJECT_PRICES.map((row) => (
                    <tr key={row.project}>
                      <th scope="row" className="px-4 py-4 font-normal sm:px-6">
                        <span className="block font-semibold text-dark">
                          {row.project}
                        </span>
                        <span className="mt-0.5 block text-sm text-foreground/60">
                          {row.description}
                        </span>
                      </th>
                      <td className="whitespace-nowrap px-4 py-4 text-right font-semibold text-dark sm:px-6">
                        desde {formatLempiras(row.from)}
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
            <p className="mt-4 text-center text-sm text-foreground/60">
              El monto final depende de las funcionalidades, la cantidad de
              páginas o sucursales, las integraciones y el diseño que su
              proyecto requiera.
            </p>
          </FadeIn>
        )}

        {MAINTENANCE_MONTHLY !== null && (
          <FadeIn delay={0.15}>
            <div
              id="mantenimiento"
              className="mt-10 rounded-2xl bg-white p-6 shadow-sm ring-1 ring-black/5 sm:p-8"
            >
              <div className="flex flex-col gap-2 sm:flex-row sm:items-baseline sm:justify-between">
                <h3 className="text-xl font-bold text-dark">
                  Mantenimiento mensual
                </h3>
                <p className="text-lg font-semibold text-dark">
                  <span className="text-sm font-normal text-foreground/60">
                    desde{" "}
                  </span>
                  {formatLempiras(MAINTENANCE_MONTHLY)}
                  <span className="text-sm font-normal text-foreground/60">
                    {" "}
                    al mes
                  </span>
                </p>
              </div>
              <p className="mt-2 text-sm text-foreground/70">
                Para que su sitio o sistema siga funcionando después de la
                entrega, sin preocuparse por la parte técnica. El monto
                depende del sitio o sistema que se mantenga: su tamaño, su
                uso y los cambios que necesite. Incluye:
              </p>
              <ul className="mt-5 grid gap-3 sm:grid-cols-2">
                {MAINTENANCE_INCLUDES.map((item) => (
                  <li key={item} className="flex items-start gap-2 text-sm">
                    <Check
                      size={18}
                      className="mt-0.5 shrink-0 text-primary"
                      aria-hidden="true"
                    />
                    <span className="text-foreground/80">{item}</span>
                  </li>
                ))}
              </ul>
            </div>
          </FadeIn>
        )}
      </div>
    </section>
  );
}
