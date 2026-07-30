import FadeIn from "./FadeIn";
import JsonLd from "./JsonLd";
import { faqSchema } from "@/lib/schema";
import type { FaqItem } from "@/lib/faq";

/**
 * Bloque de preguntas frecuentes: el texto visible y su `FAQPage`, juntos.
 *
 * Van en el mismo componente a propósito. Declarar preguntas en el marcado que
 * no estén en la página es una violación de las guías de datos estructurados,
 * y la forma más fácil de acabar ahí es tener el esquema en un archivo y el
 * texto en otro. Aquí sale de la misma lista, así que no pueden separarse.
 *
 * Se usa `<details>`, no un acordeón en JavaScript: se abre y se cierra sin
 * cargar nada, funciona con teclado y con lector de pantalla, y —lo que
 * importa aquí— la respuesta viaja en el HTML aunque esté plegada, así que un
 * rastreador que no ejecuta JavaScript la lee igual.
 */
export default function Faq({
  items,
  title = "Preguntas frecuentes",
  intro,
}: {
  items: readonly FaqItem[];
  title?: string;
  intro?: string;
}) {
  if (items.length === 0) return null;

  return (
    <section id="preguntas-frecuentes" className="bg-white py-20 sm:py-28">
      <div className="mx-auto max-w-3xl px-6">
        <FadeIn className="text-center">
          <h2 className="text-3xl font-bold tracking-tight text-dark sm:text-4xl">
            {title}
          </h2>
          {intro && (
            <p className="mt-4 text-lg text-foreground/70">{intro}</p>
          )}
        </FadeIn>

        <div className="mt-12 space-y-3">
          {items.map((item, index) => (
            <FadeIn key={item.question} delay={index * 0.05}>
              <details className="group rounded-2xl bg-secondary/25 p-5 ring-1 ring-black/5 open:bg-secondary/40 sm:p-6">
                <summary className="flex cursor-pointer list-none items-center justify-between gap-4 text-left font-semibold text-dark [&::-webkit-details-marker]:hidden">
                  <h3 className="text-base sm:text-lg">{item.question}</h3>
                  <svg
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth={2}
                    strokeLinecap="round"
                    className="size-5 shrink-0 text-primary transition-transform duration-200 group-open:rotate-45"
                    aria-hidden="true"
                  >
                    <path d="M12 5v14M5 12h14" />
                  </svg>
                </summary>
                <p className="mt-3 leading-relaxed text-foreground/70">
                  {item.answer}
                </p>
              </details>
            </FadeIn>
          ))}
        </div>
      </div>

      <JsonLd schemas={[faqSchema(items)]} />
    </section>
  );
}
