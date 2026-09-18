import Link from "next/link";
import { ChevronRight } from "lucide-react";
import JsonLd from "./JsonLd";
import { breadcrumbSchema } from "@/lib/schema";

/**
 * Migas de pan: el rastro visible y su `BreadcrumbList`, juntos.
 *
 * Van en el mismo componente por la misma razón que en `Faq.tsx`. El esquema ya
 * se emitía en los artículos y en las páginas de país y ciudad, pero la página
 * solo enseñaba un enlace suelto de "volver": un `BreadcrumbList` que describe
 * una ruta que el visitante no ve es marcado que no respalda nada, y las guías
 * de datos estructurados piden justo lo contrario. Saliendo los dos de la misma
 * lista no pueden decir cosas distintas.
 *
 * De paso arregla un hueco de enlazado interno: cada artículo enlazaba a `/blog`
 * y nada más, y cada ciudad a su país. Ahora todos enlazan también a la portada
 * y a los niveles intermedios, que es lo que convierte una página profunda en
 * parte del sitio y no en un callejón.
 *
 * `steps` va sin el inicio: lo añaden tanto el rastro como el esquema, porque
 * siempre es el mismo. El último paso es la página actual y por eso no es un
 * enlace —enlazarse a sí misma no lleva a ninguna parte— pero sí entra en el
 * esquema, que la necesita para cerrar la ruta.
 */
export default function Breadcrumbs({
  steps,
}: {
  steps: { name: string; path: string }[];
}) {
  if (steps.length === 0) return null;

  const trail = [{ name: "Inicio", path: "/" }, ...steps];

  return (
    <>
      <nav aria-label="Ruta de navegación" className="text-sm">
        <ol className="flex flex-wrap items-center gap-x-1.5 gap-y-1 text-foreground/50">
          {trail.map((step, index) => {
            const isCurrent = index === trail.length - 1;

            return (
              <li key={step.path} className="flex items-center gap-x-1.5">
                {index > 0 && (
                  <ChevronRight
                    size={14}
                    className="shrink-0 text-foreground/30"
                    aria-hidden="true"
                  />
                )}
                {isCurrent ? (
                  /*
                   * `line-clamp-1` porque el último paso de un artículo es su
                   * título entero, y algunos ocupan dos líneas en móvil.
                   */
                  <span aria-current="page" className="line-clamp-1 text-foreground/70">
                    {step.name}
                  </span>
                ) : (
                  <Link
                    href={step.path}
                    className="font-medium text-primary transition-colors hover:text-primary/80"
                  >
                    {step.name}
                  </Link>
                )}
              </li>
            );
          })}
        </ol>
      </nav>

      <JsonLd schemas={[breadcrumbSchema(steps)]} />
    </>
  );
}
